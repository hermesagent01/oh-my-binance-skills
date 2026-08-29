---
author: Oh My Binance contributors
license: MIT
name: token-profile
description: Complete token identity + basic market information.
---

# token-profile

Identity card: what the token is, where it trades, current market state.

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
Token symbol or contract address

## Method
1. Resolve token (exchangeInfo / token search).
2. 24h ticker stats; daily klines x90.
3. All listed pairs; spot/perp availability.
4. Token AI report if the platform offers one.

## Output contract (use these exact section headers)
TOKEN PROFILE - $SYMBOL
IDENTITY: name, chains, sector, launch date
MARKET: price, 24h%, 7d%, volume, mcap rank
LISTINGS: venues/pairs, spot+perp
RANGE: 90d high/low, distance from ATH
UNKNOWN: unverifiable items

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-token-info/scripts/cli.mjs`

```
node vendors/binance-web3/query-token-info/scripts/cli.mjs search '{"keyword":"SYMBOL","chainId":"56"}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
