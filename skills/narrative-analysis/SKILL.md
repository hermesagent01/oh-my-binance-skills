---
author: Oh My Binance contributors
license: MIT
name: narrative-analysis
description: Sector/narrative momentum: where story capital is flowing.
---

# narrative-analysis

Which narratives have momentum behind them?

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
Optional narrative filter

## Method
1. Sector baskets (L2, AI, RWA, memes, DePIN...) aggregate 7d/30d performance.
2. Volume share shifts between sectors.
3. News/social heat via web search - LABELED as sentiment, not fact.

## Output contract (use these exact section headers)
NARRATIVE ANALYSIS
SECTOR | 7d | 30d | volume trend | heat
ROTATION READ: capital flowing X -> Y
CAVEAT: social heat is noisy

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/crypto-market-rank/scripts/cli.mjs`

```
node vendors/binance-web3/crypto-market-rank/scripts/cli.mjs social-hype + token-rank '{"category":"social","chainId":"56"}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
