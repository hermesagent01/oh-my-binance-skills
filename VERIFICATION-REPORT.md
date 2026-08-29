# Verification Report — Live Fire
Generated: 2026-08-26 07:37 UTC · Environment: Windows 11, Node 3.14.6 host, live internet

**Method:** every skill's SKILL.md parsed for frontmatter, data policy, output contract,
and resolvable component references; every distinct data path exercised with a real call
(Binance Agent OS MCP host + 7 public Web3 launchers with real HTTP + 2 baw launchers
via the --check contract); renderer leakage rules enforced.

**Totals: 65 PASS · 0 WARN · 0 FAIL**

| Status | Item | Detail |
|---|---|---|
| ✅ PASS | `data: Agent OS MCP (host)` | Host responded. This standalone check does not prove that this agent has connected or auth |
| ✅ PASS | `data: query-token-info` | live JSON returned, shape valid |
| ✅ PASS | `data: query-token-audit` | live JSON returned, shape valid |
| ✅ PASS | `data: crypto-market-rank` | live JSON returned, shape valid |
| ✅ PASS | `data: meme-rush` | live JSON returned, shape valid |
| ✅ PASS | `data: trading-signal` | live JSON returned, shape valid |
| ✅ PASS | `data: binance-trading-signal` | live JSON returned, shape valid |
| ✅ PASS | `data: query-address-info` | live JSON returned, shape valid |
| ✅ PASS | `data: binance-wallet-tracker (--check)` | baw 1.8.0 installed; AUTH_REQUIRED (expected without login) |
| ✅ PASS | `data: binance-leaderboard (--check)` | baw 1.8.0 installed; AUTH_REQUIRED (expected without login) |
| ✅ PASS | `anomaly-hunter` | frontmatter + contracts + refs OK |
| ✅ PASS | `bull-bear-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `confluence-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `confluence-engine` | frontmatter + contracts + refs OK |
| ✅ PASS | `contradiction-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `contradiction-engine` | frontmatter + contracts + refs OK |
| ✅ PASS | `crypto-research-orchestrator` | frontmatter + contracts + refs OK |
| ✅ PASS | `daily-intelligence` | frontmatter + contracts + refs OK |
| ✅ PASS | `data-integrity` | frontmatter + contracts + refs OK |
| ✅ PASS | `deep-dive` | frontmatter + contracts + refs OK |
| ✅ PASS | `derivatives-data` | frontmatter + contracts + refs OK |
| ✅ PASS | `funding-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `historical-analogy` | frontmatter + contracts + refs OK |
| ✅ PASS | `holder-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `liquidation-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `liquidity-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `market-breadth` | frontmatter + contracts + refs OK |
| ✅ PASS | `market-data` | frontmatter + contracts + refs OK |
| ✅ PASS | `market-structure` | frontmatter + contracts + refs OK |
| ✅ PASS | `market-xray` | frontmatter + contracts + refs OK |
| ✅ PASS | `move-explainer` | frontmatter + contracts + refs OK |
| ✅ PASS | `narrative-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `open-interest-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `orderbook-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `relative-strength` | frontmatter + contracts + refs OK |
| ✅ PASS | `research-memory` | frontmatter + contracts + refs OK |
| ✅ PASS | `research-report` | frontmatter + contracts + refs OK |
| ✅ PASS | `scenario-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `signal-attribution` | frontmatter + contracts + refs OK |
| ✅ PASS | `smart-money` | frontmatter + contracts + refs OK |
| ✅ PASS | `smart-money-radar` | frontmatter + contracts + refs OK |
| ✅ PASS | `thesis-breaker` | frontmatter + contracts + refs OK |
| ✅ PASS | `thesis-builder` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-age` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-comparison` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-discovery` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-health` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-profile` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-security` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-similarity` | frontmatter + contracts + refs OK |
| ✅ PASS | `token-xray` | frontmatter + contracts + refs OK |
| ✅ PASS | `trade-journal` | frontmatter + contracts + refs OK |
| ✅ PASS | `trader-explainer` | frontmatter + contracts + refs OK |
| ✅ PASS | `volatility-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `volume-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `wallet-behavior` | frontmatter + contracts + refs OK |
| ✅ PASS | `wallet-data` | frontmatter + contracts + refs OK |
| ✅ PASS | `wallet-overlap` | frontmatter + contracts + refs OK |
| ✅ PASS | `wallet-profile` | frontmatter + contracts + refs OK |
| ✅ PASS | `whale-analysis` | frontmatter + contracts + refs OK |
| ✅ PASS | `whale-tracker` | frontmatter + contracts + refs OK |
| ✅ PASS | `why-move` | frontmatter + contracts + refs OK |
| ✅ PASS | `trader-explainer (renderer)` | no internal-state leakage |
| ✅ PASS | `crypto-research-orchestrator` | all routing targets exist |
| ✅ PASS | `workflows` | 12 workflow files |
