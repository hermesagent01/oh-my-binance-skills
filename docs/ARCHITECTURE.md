# Oh My Binance

## Scope

This project is **runtime/model agnostic** but **Binance Agent OS specific**.

The same skills can be loaded by Hermes, Claude, ChatGPT, or another compatible agent.
Binance Agent OS remains the canonical crypto data backend.

## Architecture

## Data layer — two official sources, nothing else

```
Oh My Binance
├── Binance Agent OS (MCP)
│   └── Market / futures / derivatives / account data
└── Official Binance Web3 Skills (vendored launchers)
    ├── query-token-info    → price, volume, holders, liquidity
    ├── query-token-audit   → security / contract risks
    ├── query-address-info  → wallet holdings
    ├── wallet-tracker      → wallet / smart-money activity
    ├── leaderboard         → rankings / smart money
    ├── crypto-market-rank  → market / rank signals
    └── trading-signal      → Binance Web3 trading signals
```

No Solscan. No Etherscan/BscScan. No generic explorer. No public REST substitution.
No other exchange. If Binance's official Web3 skill provides the information,
use that first and exclusively.

User → Agent runtime → Workflow → {Binance Agent OS | Official Binance Web3} → Evidence → Atomic skills → Synthesis → Human decision

## Core rule

Collect shared Binance evidence once and reuse it across analyses. Do not duplicate API/tool calls in every skill.

## Evidence doctrine

Every conclusion separates:
- OBSERVED
- INFERRED
- POSSIBLE
- UNKNOWN

Missing dimensions are silently omitted from user-facing answers; internal evidence records them as unavailable.

## Research only

The library does not place trades or give personalized BUY/SELL/LONG/SHORT instructions.
