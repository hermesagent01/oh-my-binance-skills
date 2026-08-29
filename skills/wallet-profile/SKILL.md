---
author: Oh My Binance contributors
license: MIT
name: wallet-profile
description: Analyze any wallet address: holdings, age, behavior classification.
---

# wallet-profile

Full dossier on one wallet.

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

## Inputs
Wallet address

## Method
1. Holdings snapshot via `query-address-info positions` (address, chainId, offset=0; paginate).
2. Summarize portfolio composition: token count, value concentration, 24h movers held.
3. Classify archetype: bot / fund / retail / insider - from holding patterns only, evidence cited.

## Output contract (use these exact section headers)
WALLET PROFILE - addr(0x...abcd)
HOLDINGS: top assets + rough USD
AGE: first activity, tx count
BEHAVIOR: frequency, avg hold time, venue links
CLASSIFICATION + evidence

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-address-info/scripts/cli.mjs`

```
node vendors/binance-web3/query-address-info/scripts/cli.mjs overview '{"chainId":"56","address":"0x..."}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
