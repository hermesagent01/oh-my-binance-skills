---
author: Oh My Binance contributors
license: MIT
name: trade-journal
description: Automated trade journal built from actual account fill/income history. Grades process, not PnL.
---

# trade-journal

Auto-builds the trade journal from REAL account history. Disk/account data = ground truth. No manual logging.

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

## Data source
Account fill history + income/fee history via your connected venue access
(Binance Agent OS MCP `trade.*`/`income.*` style tools, or official API keys).
Paper/testnet ledgers may be merged if you maintain them - label the venue per entry.
NEVER invent fills. Only recorded reality enters the journal.

## Commands
- `journal update` - pull fills since last checkpoint, append new entries
- `journal review <N days>` - statistics + process audit over window
- Checkpoint: store last processed timestamp in `<journal-dir>/.checkpoint`

## Storage layout
`<journal-dir>/YYYY-MM-DD.md` - appended per day
`<journal-dir>/weekly/YYYY-Www.md` - Sunday rollup
(Default `<journal-dir>` = your notes vault's Journal/trade-journal/; set once in your agent's setup notes.)

## Entry format (appended per closed position)
### SYM SIDE @entry -> exit
- Date/time + timezone
- Venue (live/testnet/paper - always labeled)
- Entry reason: link/reference the analysis that produced it, if one exists
- Planned R:R vs realized R
- TP1 hit? Invalidation exit?
- Fees paid, net PnL
- GRADE: A|B|C on PROCESS adherence (plan followed? kill-switch respected? no double-up?)

## Review format (`journal review`)
WIN RATE | avg R | profit factor | expectancy
PROCESS AUDIT: kill-switch violations, double-ups, ignored stand-asides
BEST/WORST grade behaviors and their outcomes
HONEST LINE: one sentence on what the numbers actually say about the edge

## Rules
- Grade process, NOT outcome: a losing A-grade trade stays A.
- Every fill journaled within the run; missing data gets a MISSING marker - never silent skips.
- Weekly rollup auto-appended (schedule via your agent's cron if available).
