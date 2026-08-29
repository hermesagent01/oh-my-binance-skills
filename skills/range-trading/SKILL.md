---
name: range-trading
description: Use when analyzing whether a symbol is ranging, where it sits in the range, and whether a Range + MSB (market structure break) setup is live — boundaries, internal bias, trigger status, plan math.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, ta, range, msb, binance-agent-os]
---

# Range Trading (Range + MSB)

A symbol is **ranging** when 4H/1D swing highs and lows define a box <12% wide. The edge is at the edges — with confirmation, never prediction.

## Procedure
1. Pull 4H klines (≥120 bars) via Agent OS. Identify the swing range: last significant 4H swing high and swing low enclosing recent price action.
2. Valid range: width < 12%. Record boundaries, width %, mid, and price position % within the range.
3. Internal structure bias: inside the range, are swing highs/lows making HH+HL (bullish drift) or LH+LL (bearish drift)? Below mid + LH/LL = sell-the-edge bias; above mid + HH/HL = buy-the-edge bias.
4. MSB trigger watch (1H): a 1H candle **CLOSE** beyond the last 1H swing high/low at the range edge = trigger. Wicks don't count. No close = no trigger.
5. If triggered at support: long-bias plan skeleton — entry zone (edge retest or break-retest), SL beyond the range boundary (structure-based), TP at mid then opposite edge; show R:R arithmetic. At resistance: mirror.
6. 4H close beyond either boundary = range broken → setup void, reassess as trend.

## Output
`RANGE`
- Boundaries, width %, mid, position %
- Internal bias (HH/HL or LH/LL)
- MSB status: WATCHING (no trigger) or TRIGGERED (direction, bar)
- Plan skeleton w/ R:R math
- Invalidation
- `CONFIDENCE: high|medium|low` + driver

## Rules
- R:R and levels are analytical output, not instructions. No BUY/SELL calls.
- If width ≥12% or a 4H close is already outside, say "not a range" and route to trend/structure analysis.
- The trigger is a CLOSE. State it every time.

## Binance Agent OS data policy

Binance Agent OS is the **canonical data backend** for this library.
- Use the connected Binance Agent OS capabilities for crypto data.
- Do not replace Binance with another exchange or data provider.
- The skills are runtime/model agnostic; Binance Agent OS remains the data source.
- Prefer capability discovery over hardcoding a particular tool/function name.
- Preserve Binance-native timestamps and venue/market type flags.
- If Agent OS does not expose a required field, record it in the internal evidence layer only — per the Missing Data Silence Rule, never surface it in user-facing output.
- Never fabricate a value or silently substitute an unrelated metric.
