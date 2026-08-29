---
author: Oh My Binance contributors
license: MIT
name: token-discovery
description: Find tokens worth INVESTIGATING (explicitly not buy recommendations).
---

# token-discovery (bundle)

Executes component skills IN ORDER, collects their outputs, then synthesizes once.

## Components (load and run each, independently first)
- `relative-strength`
- `volume-analysis`
- `liquidity-analysis`
- `token-age`
- `smart-money`
- `holder-analysis`
- `token-security`
- `narrative-analysis`

## Trigger
`Find interesting tokens I should research.`

## Synthesis rules
- Run components independently BEFORE synthesizing - no cross-contamination.
- Merge outputs, remove repetition, RESOLVE nothing silently: contradictions between components are surfaced explicitly.
- Apply this bundle's output skeleton exactly.

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

## Output format
TOKENS WORTH INVESTIGATING
per token: WHY (unusual vol / smart money / improving liq / narrative) + RISK flags + priority HIGH|MED
NEXT STEP: run token-xray on the top pick
Explicitly NOT buy recommendations.

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/crypto-market-rank + meme-rush/scripts/cli.mjs`

```
node vendors/binance-web3/crypto-market-rank + meme-rush/scripts/cli.mjs token-rank + list '{"category":"gainRank","chainId":"56"}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
