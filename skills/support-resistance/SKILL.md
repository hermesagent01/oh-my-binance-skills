---
name: support-resistance
description: Use when mapping support and resistance levels for any Binance symbol — swing-pivot clustering from real klines, never hand-drawn lines.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, ta, levels, binance-agent-os]
---

# Support & Resistance

Map levels from **data**, not memory.

## Procedure
1. Pull 4H klines for the symbol (≥120 bars ≈ 3 weeks) via Binance Agent OS (`spot_klines`).
2. Extract swing pivots: a bar is a swing high if its high is the max of ±2 bars either side; swing low symmetric.
3. Cluster pivots within 0.35% of each other. Touch count = cluster strength.
4. Mark how current price interacts with each cluster: above = support, below = resistance, pinned = active battle.
5. Optional confirmation: order-book walls (`spot_depth`) coinciding with a cluster raise confidence.

## Output
`LEVELS`
- Current price + clustering window
- Resistance table (level, touches, note) — nearest first
- Support table (level, touches, note) — nearest first
- Book confirmation (walls that overlap clusters)
- Trading read: which levels matter next

## Rules
- Never quote a level that does not trace to a pivot in the pulled series.
- A level from 3 weeks ago that price has not revisited is context, not an active level.
- State the clustering window — levels are window-specific.

## Binance Agent OS data policy

Binance Agent OS is the **canonical data backend** for this library.
- Use the connected Binance Agent OS capabilities for crypto data.
- Do not replace Binance with another exchange or data provider.
- The skills are runtime/model agnostic; Binance Agent OS remains the data source.
- Prefer capability discovery over hardcoding a particular tool/function name.
- Preserve Binance-native timestamps and venue/market type flags.
- If Agent OS does not expose a required field, record it in the internal evidence layer only — per the Missing Data Silence Rule, never surface it in user-facing output.
- Never fabricate a value or silently substitute an unrelated metric.
