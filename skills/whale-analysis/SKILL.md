---
author: Oh My Binance contributors
license: MIT
name: whale-analysis
description: Large-wallet activity for a specific token.
---

# whale-analysis

What are the biggest wallets doing with this token right now?

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
1. Large-holder activity via `binance-wallet-tracker` (`tracker token query --tag-type smy --json`, per chain).
2. Per surfaced whale wallet: current positions via `query-address-info positions`.
3. Correlate position changes with price moves from Agent OS klines.
4. Exchange inflow/outflow signals only if exposed by the launchers; otherwise omit the dimension.

## Output contract (use these exact section headers)
WHALE ANALYSIS - $SYMBOL
RECENT MOVES: largest transfers 7d (size, direction, venue)
PATTERN: accumulation | distribution | neutral
PRICE CORRELATION: did moves precede moves?

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/binance-wallet-tracker/scripts/cli.mjs`

```
node vendors/binance-web3/binance-wallet-tracker/scripts/cli.mjs tracker token query '--tag-type smy --json  (baw + login required)'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
