#!/usr/bin/env node
/**
 * Oh My Binance — Capability Provisioner
 * Discovers Agent OS + vendored Web3 executables. Prints exact fix commands.
 * Usage: node installer/provision.mjs
 *
 * Vendor --check contract (each vendors/binance-web3/<skill>/scripts/cli.mjs):
 *   stdout MUST be JSON: { ok: boolean, executable?: string, version?: string,
 *                          authRequired?: boolean, message?: string }
 *   ok=false                     -> dependency missing/broken; message explains fix
 *   ok=true + authRequired=true  -> installed, wallet NOT signed in (AUTH_REQUIRED)
 *   ok=true + authRequired=false -> installed and signed in (AVAILABLE)
 *
 * Agent OS check: set OMB_AGENT_OS_MANIFEST to a JSON array/object (path or inline)
 * describing your agent's connected MCP tools; families are matched by name.
 * Without a manifest, only host reachability is probed (REACHABLE_HOST_CHECK_ONLY).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const SELF = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const ROOT = path.resolve(SELF, '..');
const VENDORS = path.join(ROOT, 'vendors', 'binance-web3');

const REQUIRED_VENDORS = [
  'query-token-info',
  'query-address-info',
  'crypto-market-rank',
  'meme-rush',
  'trading-signal',
  'binance-trading-signal',
  'query-token-audit',
];

// Optional baw-dependent vendors: executable exists but requires @binance/agentic-wallet
const BAW_VENDORS = ['binance-wallet-tracker', 'binance-leaderboard'];

const REQUIRED_AGENT_OS_FAMILIES = [
  'klines/candles',
  'tickers',
  'order book',
  'funding',
];

function canonicalAgentOsFamily(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (/^(klines?[/ ]?candles?|candles?)$/.test(normalized)) return 'klines/candles';
  if (/^(24hr)?tickers?$|price/.test(normalized)) return 'tickers';
  if (/^depth$|order[ -]?book/.test(normalized)) return 'order book';
  if (/^funding|premium[ .]?index|mark[ .]?price/.test(normalized)) return 'funding';
  return null;
}

function readAgentOsManifest() {
  const source = process.env.OMB_AGENT_OS_MANIFEST;
  if (!source) return undefined;

  const text = /^[[{]/.test(source.trim())
    ? source
    : fs.readFileSync(source, 'utf8');
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed) && (typeof parsed !== 'object' || parsed === null)) {
    throw new Error('manifest must be a JSON array or object');
  }
  return parsed;
}

function familiesFromManifest(manifest) {
  const found = new Set();

  function addValue(value) {
    if (typeof value === 'string') {
      const family = canonicalAgentOsFamily(value);
      if (family) found.add(family);
      return;
    }
    if (value && typeof value === 'object') {
      addValue(value.family ?? value.name ?? value.capability ?? value.tool);
    }
  }

  if (Array.isArray(manifest)) {
    manifest.forEach(addValue);
    return [...found];
  }

  const nested = manifest.families ?? manifest.capabilities ?? manifest.tools;
  if (nested !== undefined) {
    if (!Array.isArray(nested)) throw new Error('families/capabilities/tools must be an array');
    nested.forEach(addValue);
    return [...found];
  }

  for (const [key, value] of Object.entries(manifest)) {
    const enabled = Array.isArray(value) ? value.length > 0 : Boolean(value);
    if (!enabled) continue;
    addValue(key);
    if (Array.isArray(value)) value.forEach(addValue);
  }
  return [...found];
}

function checkNode() {
  try {
    const v = process.version.replace('v', '').split('.').map(Number);
    return { name: 'Node.js >= 22', state: v[0] >= 22 ? 'AVAILABLE' : 'UNSUPPORTED', detail: process.version };
  } catch { return { name: 'Node.js >= 22', state: 'UNSUPPORTED', detail: 'node not found' }; }
}

function checkVendors() {
  const rows = [];
  for (const name of REQUIRED_VENDORS) {
    const cli = path.join(VENDORS, name, 'scripts', 'cli.mjs');
    rows.push({ name, state: fs.existsSync(cli) ? 'AVAILABLE' : 'UNSUPPORTED', detail: cli });
  }
  for (const name of BAW_VENDORS) {
    const hasCli = fs.existsSync(path.join(VENDORS, name, 'scripts', 'cli.mjs'));
    if (!hasCli) {
      rows.push({
        name,
        state: 'UNSUPPORTED',
        detail: 'missing scripts/cli.mjs',
        baw: true,
      });
      continue;
    }

    const cli = path.join(VENDORS, name, 'scripts', 'cli.mjs');
    const check = spawnSync(process.execPath, [cli, '--check'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 20_000,
      windowsHide: true,
    });
    let parsed;
    try {
      parsed = JSON.parse(check.stdout.trim());
    } catch {
      parsed = null;
    }

    rows.push({
      name,
      state: check.status !== 0 || !parsed?.ok ? 'UNSUPPORTED' : bawSessionState(parsed),
      detail: !parsed?.ok
        ? parsed?.message || check.stderr.trim() || 'official baw dependency check failed'
        : parsed.authRequired
          ? `official baw ${parsed.version} installed, but wallet is not signed in`
          : `official baw ${parsed.version}; wallet status verified`,
      authRequired: Boolean(parsed?.authRequired),
      cli: parsed?.ok ? cli : undefined,
      baw: true,
    });
  }
  return rows;
}

function bawSessionState(check) {
  const result = spawnSync(check.executable, ['wallet', 'status', '--json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: /\.cmd$/i.test(check.executable),
    timeout: 15_000,
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    return 'UNSUPPORTED';
  }
  try {
    const parsed = JSON.parse(result.stdout.trim());
    const status = parsed?.data?.status;
    if (!parsed.success || !status) return 'UNSUPPORTED';
    return status === 'UNCONNECTED' ? 'AUTH_REQUIRED' : 'AVAILABLE';
  } catch {
    return 'UNSUPPORTED';
  }
}

function installBaw() {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(command, ['install', '-g', '@binance/agentic-wallet'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 120_000,
    windowsHide: true,
  });
  return {
    ok: result.status === 0 && !result.error,
    output: `${result.stdout?.trim() ?? ''}\n${result.stderr?.trim() ?? ''}`.trim(),
  };
}

function repairBawDependency(rows) {
  const broken = rows.filter((row) => row.baw && row.state === 'UNSUPPORTED');
  if (!broken.length) return;

  console.log('\nInstalling the official Binance wallet tool...');
  const installed = installBaw();
  if (!installed.ok) {
    console.log('Automatic installation failed. Install it manually:');
    console.log('  npm i -g @binance/agentic-wallet');
    if (installed.output) console.log(installed.output);
    return;
  }

  for (const row of broken) {
    const cli = path.join(VENDORS, row.name, 'scripts', 'cli.mjs');
    const check = spawnSync(process.execPath, [cli, '--check'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 20_000,
      windowsHide: true,
    });
    let parsed;
    try {
      parsed = JSON.parse(check.stdout.trim());
    } catch {
      parsed = null;
    }

    row.state = check.status !== 0 || !parsed?.ok ? 'UNSUPPORTED' : bawSessionState(parsed);
    row.detail = !parsed?.ok
      ? parsed?.message || check.stderr.trim() || 'official baw dependency check failed after installation'
      : parsed.authRequired
        ? `official baw ${parsed.version} installed, but wallet is not signed in`
        : `official baw ${parsed.version}; wallet status verified`;
    row.authRequired = Boolean(parsed?.authRequired);
    row.cli = parsed?.ok ? cli : undefined;
  }
}

async function checkAgentOS() {
  try {
    const manifest = readAgentOsManifest();
    if (manifest !== undefined) {
      const available = familiesFromManifest(manifest).sort();
      const missing = REQUIRED_AGENT_OS_FAMILIES.filter((family) => !available.includes(family));
      const state = missing.length === 0 ? 'AVAILABLE' : 'PARTIAL';
      const detail = missing.length === 0
        ? `manifest provides: ${available.join(', ')}`
        : `manifest provides ${available.length ? available.join(', ') : 'none'}; missing: ${missing.join(', ')}`;
      return { name: 'Binance Agent OS MCP', state, detail };
    }

    await fetch('https://agent.binance.com/mcp/agentic', {
      signal: AbortSignal.timeout(5000),
    });
    return {
      name: 'Binance Agent OS MCP',
      state: 'REACHABLE_HOST_CHECK_ONLY',
      detail: 'Host responded. This standalone check does not prove that this agent has connected or authenticated tools.',
    };
  } catch (error) {
    const reason = error?.cause?.code || error?.name || error?.message || 'unknown error';
    return {
      name: 'Binance Agent OS MCP',
      state: 'UNREACHABLE',
      detail: process.env.OMB_AGENT_OS_MANIFEST
        ? `Agent OS manifest is unusable: ${reason}`
        : `Host was not reachable: ${reason}`,
    };
  }
}

const FIX_COMMANDS = {
  'Claude Code': 'claude mcp add binance --transport http https://agent.binance.com/mcp/agentic   then /mcp → Authenticate',
  'Codex CLI': 'add to ~/.codex/config.toml → [mcp_servers.binance] url = "https://agent.binance.com/mcp/agentic"',
  'Hermes': 'hermes mcp add binance --url https://agent.binance.com/mcp/agentic --auth oauth   then: hermes mcp test binance',
  'ChatGPT/Cursor/other': 'Connector UI → URL https://agent.binance.com/mcp/agentic → complete browser OAuth once',
};

async function main() {
  const report = [];
  report.push(checkNode());
  const aos = await checkAgentOS();
  report.push(aos);
  report.push(...checkVendors());

  console.log('# Oh My Binance — Capability Provisioner\n');
  repairBawDependency(report.filter((row) => row.baw));
  for (const r of report) {
    console.log(`[${r.state}] ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
  }

  if (['PARTIAL', 'REACHABLE_HOST_CHECK_ONLY', 'UNREACHABLE'].includes(aos.state)) {
    console.log('\n## Connect Binance Agent OS (pick yours):');
    for (const [agent, cmd] of Object.entries(FIX_COMMANDS)) {
      console.log(`\n${agent}:\n  ${cmd}`);
    }
    console.log('\nThen re-run: node installer/provision.mjs');
  }

  const bawMissing = report.filter(r => r.baw && r.state === 'UNSUPPORTED');
  if (bawMissing.length) {
    console.log('\n## Optional Web3 deps missing (@binance/agentic-wallet required):');
    for (const r of bawMissing) console.log(`  - ${r.name}: npm i -g @binance/agentic-wallet`);
  }

  const bawAuth = report.filter(r => r.baw && r.state === 'AUTH_REQUIRED');
  if (bawAuth.length) {
    console.log('\n## Official Binance Web3 login required:');
    const seen = new Set();
    for (const r of bawAuth) {
      if (seen.has('signin')) continue;
      seen.add('signin');
      console.log(`  - ${r.name}: node "${r.cli}" auth signin`);
    }
  }

  console.log('\nRule: host reachability is not connection or authentication.');
  console.log('Rule: NOT_CHECKED is never a final state. Confirm capability availability or mark UNSUPPORTED with a reason.');
}

main().catch(e => { console.error('provision failed:', e.message); process.exit(1); });
