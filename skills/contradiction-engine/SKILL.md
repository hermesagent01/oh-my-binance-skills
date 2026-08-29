---
author: Oh My Binance contributors
license: MIT
name: contradiction-engine
description: Find contradictions inside a current setup.
---

# contradiction-engine (bundle)

Executes component skills IN ORDER, collects their outputs, then synthesizes once.

## Components (load and run each, independently first)
- `market-structure`
- `volume-analysis`
- `smart-money`
- `whale-analysis`
- `funding-analysis`
- `open-interest-analysis`
- `orderbook-analysis`
- `narrative-analysis`

## Trigger
`Find contradictions in the current BTC setup.`

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
CONTRADICTION REPORT - $SUBJECT
BULLISH EVIDENCE list
BEARISH EVIDENCE list
DIRECT CONFLICTS: paired
CONFLICT LEVEL + what would resolve it
