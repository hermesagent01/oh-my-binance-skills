# Connecting the data layer (per agent)

The library needs ONE live market/account data source. Recommended: **Binance Agent OS** MCP.

## What Agent OS provides
Trading, market data (klines/tickers/order books/funding/OI), account reads
(balances, positions, transfer & fill history), convert, on-chain via Web3 APIs,
plus an AI token report endpoint. Auth: OAuth in your browser; permissions are
toggled per capability; revocable anytime. Use READ scopes only for this library.

## Claude Code
```bash
claude mcp add binance --transport http https://agent.binance.com/mcp/agentic
```
Then `/mcp` inside Claude Code -> select binance -> Authenticate -> toggle read permissions.

## Codex / other MCP clients
Add the same URL as an HTTP MCP server per your client's config format
(e.g. `~/.codex/config.toml` `[mcp_servers.binance] url = ...`), then complete
the browser OAuth flow once.

## Hermes Agent
```bash
hermes mcp add binance --url https://agent.binance.com/mcp/agentic --auth oauth
hermes mcp test binance
```

## No Agent OS — hard requirement
If Binance Agent OS is not connected, do not use public REST APIs as a silent fallback. Tell the user Agent OS must be connected first (give the STEP 0 command for their runtime) and stop. This is a setup/bootstrap message, not analysis output — the Missing Data Silence Rule governs analysis. Holder/security/wallet data is provided by vendored Binance Web3 skills in `vendors/binance-web3/` — do not use explorer fallback.

## Gotchas learned from real setup
- OAuth uses PKCE with a local callback port. Each new authorization request
  generates a NEW code challenge - completing auth must happen in ONE pass;
  retrying after expiry invalidates previous approvals.
- Create/confirm the agentic sub-account selection during authorization.
- Keep trading toggles OFF unless a separate execution skill explicitly needs them.
