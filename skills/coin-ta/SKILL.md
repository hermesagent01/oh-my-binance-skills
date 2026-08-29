---
name: coin-ta
description: Use when the user asks for full technical analysis of a specific coin — orchestrates market-structure, support-resistance, range-trading, funding/basis and order-book skills into one chained verdict.
author: Oh My Binance contributors
license: MIT
metadata:
  hermes:
    tags: [crypto, ta, orchestrator, binance-agent-os]
---

# Coin TA (orchestrator)

Full technical workup on one symbol by chaining the atomic TA skills — visibly, in order, then synthesizing once.

## Skill chain (run in this order)
1. `market-structure` → trend/range state across 1D/4H, swing map, any structural break.
2. `support-resistance` → clustered pivot levels from ≥120 4H bars.
3. `range-trading` → if a valid range exists: boundaries, position, internal bias, MSB trigger status, plan math. If no range: skip and say trend regime.
4. `funding-analysis` + perp basis → who is paying, crowding direction.
5. `orderbook-analysis` → do live walls confirm/refute the mapped levels?

## Output Format (MANDATORY — every TA must follow this EXACTLY)

```
COIN TA — <SYMBOL> @ $<price> | <TRADE TIMEFRAME: scalp|swing|multi-day>

PIPELINE: market-structure → support-resistance → range-trading → orderbook → computed-funding + computed-CVD ✓

---

STRUCTURE

Weekly: <regime>. <key weekly levels/patterns>.
1D: <HH+HL|LH+LL|Mixed> (<bias>) — <swing description with exact prices>. <trend statement>.
4H: <regime>. <range or trend description>. <volume note if relevant>.
1H: <regime>. <range or trend>. <trigger status>.

---

LEVELS

Resistance
• $<price> — <wall/order book detail>
• $<price> — <detail>

Support
• $<price> — <wall/order book detail>
• $<price> — <detail>

---

RANGE/MSB

Range: $<low>–$<high> (<width>%). Price at <X>% of range.
Internal: <HH+HL|LH+LL|Mixed>. <MSB trigger status>.

---

POSITIONING

Funding: <rate> (<regime>). <what it means: shorts paying = squeeze fuel, longs paying = crowded long>.
OI: $<value> (<48h change>). <what it means: deleveraging, accumulation, etc.>
CVD 1h: <direction> (<value> BTC). <what it means: taker buying/selling, distribution/accumulation>.
CVD 10h: <direction> (<value> BTC). <trend of flow over wider window>.

---

VWAP

Current: $<price>. Price <above/below> VWAP = <fading strength / fading weakness / trend continuation>.
Session VWAP anchor: <time range>.

---

BOOK

Best bid: <size> BTC @ $<price>. Best ask: <size> BTC @ $<price>.
Spread: $<spread>. <Note if book was tracked over time: thickening/thinning/stable>.

---

LIQUIDATION CONTEXT

<$<level> has known liq cluster / clean support / no data available>.

---

VERDICT

🟢 LONG / 🟡 SHORT / 🔴 STAND ASIDE — <one-line reason>
Entry: $<price> | SL: $<price> | TP1: $<price> | TP2: $<price>
Invalidate: <conditions that kill the trade>

RESOLVED JUDGEMENT: <why one side wins despite conflicting signals. State the tiebreaker explicitly.>

CONFIDENCE: <high|medium|low> — <driver>

Not financial advice.
```

## Rules
- EVERY section must appear. If data is unavailable for a section, write "Data unavailable" — never skip the section.
- Each section must carry the numbers its source skill produced — no re-derivation.
- Contradictions between skills are the feature: surface them, then RESOLVE with a tiebreaker.
- No BUY/SELL output. Verdict = state + gates, never an instruction.
- Swing points must include EXACT prices with arrows (→).
- Order book walls must include size (K/M units).
- Trade timeframe MUST be stated (scalp/swing/multi-day).
- VWAP MUST be computed from available kline data.
- Weekly context MUST be included (even if just "no weekly resistance nearby").
- Resolved judgement section is MANDATORY — state why one side wins.

## BIAS CHECK (MANDATORY before verdict)
Before writing the verdict, count the signals:
- Bullish: 1D/4H/1H structure, VWAP position, CVD direction, funding interpretation
- Bearish: same categories

If majority of signals oppose your initial lean, you DO NOT get to pick that lean. The honest answer is STAND ASIDE with named trigger levels.

**RULE:** You cannot argue a signal away. If VWAP is below = bearish. If CVD is negative = bearish. You cannot say "CVD is negative BUT it's shorts building" without explicit proof (e.g. OI increasing + funding negative + liquidation data). Without that proof, CVD negative = bearish. Period.

**RED FLAG:** If your "resolved judgement" contains the word "likely" or "probably" explaining WHY a bearish signal is actually bullish — you're doing motivated reasoning. Stop. Default to the side with more evidence.

## Binance Agent OS data policy

Binance Agent OS is the **canonical data backend** for this library.
- Use the connected Binance Agent OS capabilities for crypto data.
- Do not replace Binance with another exchange or data provider.
- The skills are runtime/model agnostic; Binance Agent OS remains the data source.
- Prefer capability discovery over hardcoding a particular tool/function name.
- Preserve Binance-native timestamps and venue/market type flags.
- If Agent OS does not expose a required field, record it in the internal evidence layer only — per the Missing Data Silence Rule, never surface it in user-facing output.
- Never fabricate a value or silently substitute an unrelated metric.
