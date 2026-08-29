#!/usr/bin/env node
/**
 * Token Security Audit — official Binance Web3 API
 * POST https://web3.binance.com/bapi/defi/v1/public/wallet-direct/security/token/audit
 * Usage: node cli.mjs audit '{"binanceChainId":"56","contractAddress":"0x..."}'
 */
import crypto from 'node:crypto';

const ENDPOINT = 'https://web3.binance.com/bapi/defi/v1/public/wallet-direct/security/token/audit';
const HEADERS = {
  'Content-Type': 'application/json',
  'source': 'agent',
  'Accept-Encoding': 'identity',
  'User-Agent': 'binance-web3/1.4 (Skill)',
};

const CHAINS = new Set(['56', '8453', 'CT_501', '1']);

function fail(msg, extra) {
  console.error(JSON.stringify({ success: false, error: msg, ...extra }, null, 2));
  process.exit(1);
}

async function main() {
  const [cmd, raw] = process.argv.slice(2);
  if (cmd !== 'audit') fail(`Unknown command "${cmd}". Use: audit '{"binanceChainId":"56","contractAddress":"0x..."}'`);

  let params;
  try { params = JSON.parse(raw || '{}'); } catch { fail('Invalid JSON params'); }
  const { binanceChainId, contractAddress } = params;
  if (!binanceChainId || !CHAINS.has(String(binanceChainId)))
    fail(`binanceChainId must be one of ${[...CHAINS].join(', ')}`, { binanceChainId });
  if (!contractAddress || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress) && binanceChainId !== 'CT_501')
    fail('contractAddress must be a valid EVM address (or any address for CT_501/Solana)', { contractAddress });

  const requestId = params.requestId || crypto.randomUUID();

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { ...HEADERS, 'requestId': requestId },
      body: JSON.stringify({ binanceChainId: String(binanceChainId), contractAddress, requestId }),
    });
    if (!res.ok) fail(`HTTP ${res.status}`, { status: res.status });
    const json = await res.json();
    const data = json?.data;

    // Per SKILL.md response-handling rules
    if (!json?.success) return console.log(JSON.stringify({ success: false, availability: 'UNSUPPORTED', reason: 'upstream not successful', code: json?.code }, null, 2));
    if (!data?.hasResult || !data?.isSupported)
      return console.log(JSON.stringify({ success: true, availability: 'AVAILABLE_NO_DATA', hasResult: !!data?.hasResult, isSupported: !!data?.isSupported, note: 'Security audit data is not available for this token on this chain.' }, null, 2));

    const out = {
      success: true,
      availability: 'AVAILABLE',
      source: 'Binance Web3 (token audit)',
      asset: { chainId: String(binanceChainId), contractAddress },
      timestamp: new Date().toISOString(),
      data: {
        riskLevel: data.riskLevel,
        riskLevelEnum: data.riskLevelEnum,
        buyTax: data.extraInfo?.buyTax ?? null,
        sellTax: data.extraInfo?.sellTax ?? null,
        isVerified: data.extraInfo?.isVerified ?? null,
        riskItems: (data.riskItems || []).map(r => ({
          id: r.id,
          name: r.name,
          details: (r.details || []).map(d => ({ title: d.title, description: d.description, isHit: d.isHit, riskType: d.riskType })),
        })),
      },
    };
    console.log(JSON.stringify(out, null, 2));
  } catch (e) {
    fail(e.message);
  }
}

main().catch(e => fail(e.message));
