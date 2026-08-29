#!/usr/bin/env node
// binance-wallet-tracker CLI — official Binance Web3 wallet tracker (baw dependency)
// Usage:
//   node cli.mjs tracker '<command>' [options...] --json   → passthrough to `baw tracker ...`
//   node cli.mjs --check                                    → dependency + auth status (JSON)
//
// --check CONTRACT (used by installer/provision.mjs):
//   stdout: { ok: boolean, executable?: string, version?: string, authRequired?: boolean,
//             message?: string }
//   - ok=true + authRequired=true  → baw installed, wallet NOT signed in (AUTH_REQUIRED)
//   - ok=true + authRequired=false → baw installed AND wallet signed in (AVAILABLE)
//   - ok=false                     → dependency missing/broken (UNSUPPORTED); message says why
import { spawnSync } from 'node:child_process';

const NPM_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function findBaw() {
  const res = spawnSync(NPM_CMD, ['ls', '-g', '@binance/agentic-wallet', '--json'], {
    encoding: 'utf8', timeout: 30_000, windowsHide: true,
  });
  try {
    const parsed = JSON.parse(res.stdout || '{}');
    const deps = parsed?.dependencies?.['@binance/agentic-wallet'];
    if (deps && deps.version) return { ok: true, version: deps.version };
  } catch { /* fall through */ }
  // Fallback: probe the baw executable directly (works for non-default npm prefixes)
  const exe = process.platform === 'win32' ? 'baw.cmd' : 'baw';
  const probe = spawnSync(exe, ['--version'], {
    encoding: 'utf8', timeout: 15_000, windowsHide: true, shell: process.platform === 'win32',
  });
  const v = (probe.stdout || '').trim();
  if (probe.status === 0 && /^\d+\.\d+/.test(v)) return { ok: true, version: v };
  return { ok: false, message: '@binance/agentic-wallet (baw) not found; install with: npm i -g @binance/agentic-wallet' };
}

function walletStatus() {
  const exe = process.platform === 'win32' ? 'baw.cmd' : 'baw';
  const res = spawnSync(exe, ['wallet', 'status', '--json'], {
    encoding: 'utf8', timeout: 15_000, windowsHide: true, shell: process.platform === 'win32',
  });
  if (res.error || res.status !== 0) return { authRequired: true };
  try {
    const parsed = JSON.parse(res.stdout.trim());
    const status = parsed?.data?.status;
    return { authRequired: !parsed?.success || status === 'UNCONNECTED' || !status };
  } catch {
    return { authRequired: true };
  }
}

function emit(obj) {
  console.log(JSON.stringify(obj, null, 2));
  process.exit(0);
}

const [arg0, ...rest] = process.argv.slice(2);

if (arg0 === '--check') {
  const dep = findBaw();
  if (!dep.ok) emit({ ok: false, message: dep.message });
  const auth = walletStatus();
  emit({
    ok: true,
    executable: process.platform === 'win32' ? 'baw.cmd' : 'baw',
    version: dep.version,
    authRequired: auth.authRequired,
  });
}

// Default: passthrough to `baw tracker ...`
if (!arg0 || arg0 === '--help' || arg0 === '-h') {
  console.log("Usage: node cli.mjs tracker '<subcommand>' [options] --json   (passthrough to baw)");
  console.log('       node cli.mjs --check');
  console.log('\nSubcommands: token query / group / kol / smy ... see references/cli.md');
  process.exit(0);
}

const exe = process.platform === 'win32' ? 'baw.cmd' : 'baw';
const res = spawnSync(exe, [arg0, ...rest], {
  encoding: 'utf8', timeout: 60_000, windowsHide: true, shell: process.platform === 'win32',
});
process.stdout.write(res.stdout || '');
process.stderr.write(res.stderr || '');
process.exit(res.status ?? 1);
