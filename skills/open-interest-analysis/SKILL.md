---
name: open-interest-analysis
description: Use when interpreting Binance futures open interest together with price, funding, and liquidation evidence.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, derivatives, open-interest, binance-agent-os]
---

# Open interest analysis

### Procedure
1. Match contract, venue and timeframe.
2. Compare OI with price over the same window.
3. Add funding, liquidation and basis evidence when available.
4. Use quadrants only as descriptive context:
   - Price ↑ + OI ↑: positioning expansion consistent with long-side pressure.
   - Price ↓ + OI ↑: positioning expansion consistent with short-side pressure.
   - Price ↑ + OI ↓: position reduction / short-covering context.
   - Price ↓ + OI ↓: position reduction / long-unwind context.
5. Explicitly state that quadrants do not identify exact trader intent.
6. Flag unusual OI only against a sufficient historical baseline.

### Output
`OPEN INTEREST`
- Current OI
- Change/window
- Price change
- Quadrant context
- Funding/liquidation confirmation
- Contradictions
- Anomaly
- Confidence

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

