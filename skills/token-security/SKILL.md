---
name: token-security
description: Use when checking Binance token-audit/security data, contract powers, trading restrictions, or Web3 risk evidence.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, token-security, web3, binance-agent-os]
---

# Token security

### Procedure
1. Resolve chain and contract.
2. Query Binance Agent OS token-audit/security capabilities.
3. Preserve Binance-native availability/validity flags and risk results.
4. When exposed, inspect verification, privileged powers, mint/freeze/blacklist/pause controls, trading restrictions and taxes.
5. Treat audits as evidence, not guarantees.
6. Record unavailable checks `MISSING`/`UNSUPPORTED` internally only (Missing Data Silence Rule — never user-facing).

### Output
`TOKEN SECURITY`
- Contract/chain
- Binance audit availability
- Verification
- Privileged powers
- Trading restrictions/taxes
- Risk flags
- Audit evidence
- Missing checks
- Confidence

Never invent A/B/C/F grades.

## Binance Agent OS data policy

Binance Agent OS is the **canonical data backend** for this library.
- Use the connected Binance Agent OS capabilities for crypto data.
- Do not replace Binance with another exchange or data provider.
- The skills are runtime/model agnostic: they can be loaded by Hermes, Claude, ChatGPT, or another compatible agent, while Binance Agent OS remains the data source.
- Prefer capability discovery over hardcoding a particular tool/function name.
- Preserve Binance-native timestamps, venue/market type, chain, availability and validity flags.
- If Binance Agent OS does not expose a required field, record it `MISSING`/`UNSUPPORTED` in the internal evidence layer only — per the **Missing Data Silence Rule** (see AGENTS.md), never surface it in user-facing output.
- Never fabricate a value or silently substitute an unrelated metric.


## analysis rules

- Separate `OBSERVED`, `INFERRED`, `POSSIBLE`, and `UNKNOWN`.
- Preserve source and timestamp for numeric evidence.
- Prefer asset-relative and historical baselines over universal thresholds.
- Distinguish spot, derivatives and Web3/on-chain evidence.
- Never infer motives, identity, insider status or causation from insufficient evidence.
- Scores are summaries only; evidence comes first.
- Confidence reflects data quality, freshness, coverage and contradictions.
- This library is research/intelligence only. Do not issue personalized BUY/SELL/LONG/SHORT instructions.

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-token-audit/scripts/cli.mjs`

```
node vendors/binance-web3/query-token-audit/scripts/cli.mjs audit '{"binanceChainId":"56","contractAddress":"0x..."}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
