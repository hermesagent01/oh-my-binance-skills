---
name: signal-attribution
description: Use when explaining which evidence most plausibly contributed to a crypto market event.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, research, attribution, binance-agent-os]
---

# Signal attribution

Rank candidate contributors to a defined event without claiming unsupported causation.

### Procedure
1. Define the event, asset, timeframe and venue.
2. Collect relevant Binance Agent OS evidence.
3. Evaluate each candidate by temporal alignment, magnitude, mechanism, independence and data quality.
4. Label evidence `STRONG`, `MODERATE`, `WEAK`, or `UNKNOWN`.
5. List contradictory evidence and unexplained remainder.

### Output
`SIGNAL ATTRIBUTION`
- Event
- Candidate contributors
- Evidence for
- Evidence against
- Attribution strength
- Unexplained portion
- Missing data
- Confidence

Correlation is not causation.

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

