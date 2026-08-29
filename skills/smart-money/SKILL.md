---
author: Oh My Binance contributors
license: MIT
name: smart-money
description: Smart-money activity detection from tracked/profitable wallet sources.
---

# smart-money

What are consistently-profitable wallets doing today?

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
Optional sector/token filter

## Method
1. Sources: your own tracked-wallet watchlist (files/vault), public whale feeds via web search.
2. Their recent moves, clustered: how many independent profitable wallets agree on a side?
3. Every move tagged REPEATED or ISOLATED.

## Output contract (use these exact section headers)
SMART MONEY - [scope]
MOVES: who -> what -> size -> when
CLUSTER SCORE: N independent wallets agreeing
REPEATED vs ISOLATED flags
SIGNIFICANCE: high|med|low

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/trading-signal/scripts/cli.mjs`

```
node vendors/binance-web3/trading-signal/scripts/cli.mjs smart-money '{"chainId":"56","pageSize":10}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
