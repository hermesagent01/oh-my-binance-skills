---
author: Oh My Binance contributors
license: MIT
name: crypto-research-orchestrator
description: Router brain - decides which atomic skills/bundles to load for any crypto question. Does not compute itself.
---

# crypto-research-orchestrator

Top-level router: parse intent, pick the MINIMAL route, delegate to skills.

## Routing table
| Intent (example phrasing) | Route |
|---|---|
| "what is $X" / identity | `token-profile` |
| "analyze $X completely" | `token-xray` |
| "compare A vs B" | `token-comparison` (+ token-profile x2) |
| "is $X safe?" | `token-security` (+ `token-health`) |
| "what is wallet 0x... doing" | `wallet-profile` (+ `wallet-behavior`) |
| "what is smart money doing" | `smart-money-radar` |
| "picture of the market" | `market-xray` |
| "what's weird today" | `anomaly-hunter` |
| "why did X move" | `why-move` |
| "where do signals agree" | `confluence-engine` |
| "contradictions in X" | `contradiction-engine` |
| "find interesting tokens" | `token-discovery` |
| "research X" | `research-report` |
| "deep dive X" | `deep-dive` |
| "is my thesis still valid" | `research-memory` + `thesis-breaker` |
| "morning brief" / scheduled | `daily-intelligence` |
| "journal update/review" | `trade-journal` |

## Execution doctrine
1. Bundle preferred over loose atomics; minimal route always.
2. Load skills progressively - only what the route needs.
3. ONE data layer: venue/MCP data feeds all skills; no duplicated API logic inside skills.
4. Division of labor: the venue provides data, the model synthesizes, the human decides.
5. Every route ends in evidence + confidence. Never a naked recommendation.
6. Route outputs worth keeping get saved to the user's notes store for `research-memory`.

## Setup notes (fill once per agent/environment)
- Notes/vault directory for research memory: ____________
- Trade-journal directory: ____________
- Whale watchlist file (optional): ____________


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
