---
author: Oh My Binance contributors
license: MIT
name: token-age
description: Newly launched vs established classification.
---

# token-age

How mature is this token and does age change its risk frame?

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
Token symbol

## Method
1. First-listing date from exchange data/kline history length.
2. Classify: <30d NEW, <180d YOUNG, else ESTABLISHED.
3. State age-specific risk implications explicitly.

## Output contract (use these exact section headers)
TOKEN AGE - $SYMBOL
AGE: first trade date, days since listing
CLASS: NEW | YOUNG | ESTABLISHED
IMPLICATIONS: volatility/rug-risk framing for this class

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-token-info/scripts/cli.mjs`

```
node vendors/binance-web3/query-token-info/scripts/cli.mjs meta '{"chainId":"56","contractAddresses":["0x..."]}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
