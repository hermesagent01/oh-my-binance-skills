---
author: Oh My Binance contributors
license: MIT
name: market-xray
description: Complete picture of the whole crypto market right now.
---

# market-xray (bundle)

Executes component skills IN ORDER, collects their outputs, then synthesizes once.

## Components (load and run each, independently first)
- `market-structure`
- `market-breadth`
- `relative-strength`
- `volume-analysis`
- `volatility-analysis`
- `liquidity-analysis`
- `funding-analysis`
- `open-interest-analysis`
- `liquidation-analysis`
- `orderbook-analysis`

## Trigger
`Give me a complete picture of the crypto market right now.`

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
MARKET XRAY - date/time
STRUCTURE -> BREADTH -> LEADERSHIP -> VOLUME -> VOLATILITY -> LIQUIDITY -> DERIVATIVES -> BOOK PRESSURE
STATE OF THE MARKET: one paragraph
TOP 3 THINGS THAT MATTER RIGHT NOW
