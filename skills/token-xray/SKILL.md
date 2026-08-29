---
author: Oh My Binance contributors
license: MIT
name: token-xray
description: Full X-ray of one token: identity through security to risks.
---

# token-xray (bundle)

Executes component skills IN ORDER, collects their outputs, then synthesizes once.

## Components (load and run each, independently first)
- `token-profile`
- `token-health`
- `liquidity-analysis`
- `holder-analysis`
- `whale-analysis`
- `smart-money`
- `token-security`

## Trigger
`Analyze SOL completely.`

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
XRAY - $SYMBOL
1 IDENTITY -> 2 MARKET -> 3 LIQUIDITY -> 4 HOLDERS -> 5 WHALES -> 6 SMART MONEY -> 7 SECURITY
RISKS: ranked
UNKNOWNS: what could not be seen
FINAL GRADE: A-F + one-line justification

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-token-info + query-token-audit/scripts/cli.mjs`

```
node vendors/binance-web3/query-token-info + query-token-audit/scripts/cli.mjs search + audit '{"keyword":"..."} / {"binanceChainId":"56","contractAddress":"0x..."}'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
