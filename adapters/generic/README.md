# Runtime compatibility

This package can be loaded by different AI agent runtimes. Runtime portability does not
mean exchange portability: Binance Agent OS remains the canonical data backend.

**Agent OS is REQUIRED.** If Binance Agent OS is not connected, do not fall back to public REST APIs or other exchanges. Tell the user to connect Agent OS first (STEP 0 in AGENTS.md) and stop — bootstrap message, not analysis output. Do not use generic APIs as a silent substitute. Holder/security/wallet data comes from vendored Binance Web3 skills in `vendors/binance-web3/` (query-token-audit, query-token-info, query-address-info, wallet-tracker, leaderboard) — do not use explorer fallback. Web fetch is not allowed for these; use the vendored skills.
