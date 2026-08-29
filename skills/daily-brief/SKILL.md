---
name: daily-brief
description: Use when the user asks for a daily market brief, morning update, "what happened today", or a scannable end-of-day wrap across Binance markets.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, briefing, daily, binance-agent-os]
---

# Daily Brief

One page a trader actually reads. Every number from a fresh Agent OS pull, nothing stale.

## Procedure
1. Pull the briefing set once, at generation time: 24h tickers (FULL) for BTC/ETH/BNB/SOL + top movers; MINI tickers for a ~12-asset alt basket (breadth); latest funding prints + perp basis for majors; 4H klines for structure state.
2. Compose in this exact order:

## Output
`DAILY BRIEF — <date, UTC>`
- **WHAT MOVED** — 24h table for majors + the 3 biggest alt movers (both directions if mixed)
- **BREADTH** — gainers/losers count from the basket; broad vs narrow, streak note
- **DERIVATIVES** — funding prints + basis per major; who is paying, any flip
- **STRUCTURE** — one line per major: trending / ranging / range-floor-test, key level
- **UNUSUAL** — the single strangest datapoint of the day (contradiction, outlier, divergence)
- **TOMORROW'S LEVELS** — the 3-5 numbers that decide the next session

## Rules
- ≤350 words. Scannable. Bold the verdict words.
- Every number from this pull; if you cannot source it now, cut the line.
- No predictions, no advice — state where price sits relative to structure.
- End `Not financial advice.`
- `CONFIDENCE: high|medium|low` + driver.

## Binance Agent OS data policy

Binance Agent OS is the **canonical data backend** for this library.
- Use the connected Binance Agent OS capabilities for crypto data.
- Do not replace Binance with another exchange or data provider.
- The skills are runtime/model agnostic; Binance Agent OS remains the data source.
- Prefer capability discovery over hardcoding a particular tool/function name.
- Preserve Binance-native timestamps and venue/market type flags.
- If Agent OS does not expose a required field, record it in the internal evidence layer only — per the Missing Data Silence Rule, never surface it in user-facing output.
- Never fabricate a value or silently substitute an unrelated metric.
