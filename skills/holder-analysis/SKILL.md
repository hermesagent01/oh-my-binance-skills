---
author: Oh My Binance contributors
license: MIT
name: holder-analysis
description: Holder distribution and concentration analysis.
---

# holder-analysis

Who holds the supply and how concentrated is it?

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

## Inputs
Token symbol or contract address

## Method
1. Token metadata + holder context via `query-token-info` (search/meta): supply, liquidity, volume.
2. Smart-money concentration via `binance-wallet-tracker` (`tracker token query --tag-type smy --json`) — SMY/KOL positioning on the token.
3. Wallet-level holdings via `query-address-info positions` for known large wallets (from smart-money output or user-provided watchlist).
4. Classify: exchange / contract / unknown wallets where the data exposes it.
5. Label launcher + retrieval date. If a dimension is unavailable, omit it (Missing Data Silence Rule).

## Output contract (use these exact section headers)
HOLDER ANALYSIS - $SYMBOL
CONCENTRATION: top10 %, top100 %
NOTABLE: exchange reserves, locked/vesting contracts
RISK: LOW|MED|HIGH concentration verdict + why
SOURCE: explorer + date

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-token-info + query-address-info/scripts/cli.mjs`

```
node vendors/binance-web3/query-token-info + query-address-info/scripts/cli.mjs meta + overview 'top holders of token contract'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
