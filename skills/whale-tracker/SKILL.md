---
author: Oh My Binance contributors
license: MIT
name: whale-tracker
description: Track specific whale wallets over time: accumulation/distribution trends.
---

# whale-tracker

Watchlist tracking for named whales.

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
Optional wallet list (defaults to your watchlist file if maintained)

## Method
1. Read watchlist from local file if present (document path in your setup); else use `binance-wallet-tracker` SMY/KOL feeds as the tracked set.
2. Per wallet: current holdings + 24h change via `query-address-info positions`.
3. Net flow signal from launcher data; trend line: accumulating | distributing | idle.

## Output contract (use these exact section headers)
WHALE TRACKER
WALLET | 7D NET FLOW | TREND | LAST ACTION
ALERTS: >$1M moves or first-action-in-90d

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/binance-wallet-tracker/scripts/cli.mjs`

```
node vendors/binance-web3/binance-wallet-tracker/scripts/cli.mjs tracker token query 'requires baw + wallet login'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
