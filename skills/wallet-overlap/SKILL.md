---
author: Oh My Binance contributors
license: MIT
name: wallet-overlap
description: Find wallets holding multiple tokens in a set (insider-web detection).
---

# wallet-overlap

Do the same wallets hold several tokens in a narrative?

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
Two or more token symbols

## Method
1. Per token: top smart-money/KOL holders via `binance-wallet-tracker` (`tracker token query --tag-type smy --json`).
2. For each surfaced wallet: full holdings via `query-address-info positions` (paginate with `offset`).
3. Intersect address sets across tokens; compute collective exposure.
4. Name top shared addresses with evidence from the launcher outputs.

## Output contract (use these exact section headers)
OVERLAP - A n B
SHARED HOLDERS: count, % supply collectively
ADDRESSES: top shared wallets
READ: insider cluster? yes/no + why

## Data source (this library)

Web3/on-chain evidence comes from the vendored official launcher(s):
`vendors/binance-web3/query-address-info (xN)/scripts/cli.mjs`

```
node vendors/binance-web3/query-address-info (xN)/scripts/cli.mjs overview 'per address in set'
```

`--check` reports dependency/auth state. If launcher reports UNSUPPORTED/AUTH_REQUIRED,
mark the dimension UNSUPPORTED — never substitute an explorer or public API.
