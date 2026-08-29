# Oh My Binance — Installer & Capability Provisioner

Run this ONCE after copying `oh-my-binance` into your skills directory. It discovers what
is connected, tells you exactly what to connect, and never lies about availability.

## What it checks

| # | Requirement | How it checks | If missing |
|---|---|---|---|
| 1 | **Binance Agent OS MCP** connected | List MCP tools; look for capability families (klines, tickers, order book, funding, OI, account reads) | Print exact connect command for YOUR agent + stop |
| 2 | **Node.js ≥ 22** | `node --version` | Install from nodejs.org |
| 3 | **Vendored Web3 executables** present | Check `vendors/binance-web3/*/scripts/cli.mjs` exists for: query-token-info, query-address-info, crypto-market-rank, meme-rush, trading-signal, binance-trading-signal, query-token-audit | Report which vendor skill is broken |
| 4 | **binance-cli** (optional, futures depth) | `binance-cli --version` | Optional — only needed for futures order-book depth |

## Run it

```bash
node installer/provision.mjs
```

Output states (per capability):
- `AVAILABLE` — ready to use
- `AVAILABLE_NO_DATA` — tool works, no data for this request
- `AUTH_REQUIRED` — installed but wallet not signed in
- `UNSUPPORTED` — dependency missing/broken
- `PARTIAL` — manifest present but some capability families missing
- `REACHABLE_HOST_CHECK_ONLY` — host reachable; standalone script cannot prove your agent is connected
- `UNREACHABLE` — Agent OS host did not respond

`NOT_CHECKED` is never a final state.

### Agent OS manifest (optional, recommended)
Set `OMB_AGENT_OS_MANIFEST` to a JSON array of your agent's connected MCP tool names (or an object with a `tools`/`capabilities`/`families` array), or a path to such a file. The provisioner matches capability families by name and reports `AVAILABLE`/`PARTIAL` instead of the host-reachability proxy.
`NOT_CHECKED` is never a final state.

## Exact commands printed when Agent OS is missing

| Your agent | Command |
|---|---|
| Claude Code | `claude mcp add binance --transport http https://agent.binance.com/mcp/agentic` then `/mcp` → Authenticate |
| Codex CLI | add to `~/.codex/config.toml`: `[mcp_servers.binance] url = "https://agent.binance.com/mcp/agentic"` |
| Hermes | `hermes mcp add binance --url https://agent.binance.com/mcp/agentic --auth oauth` |
| ChatGPT/Cursor | Use the connector UI with URL `https://agent.binance.com/mcp/agentic` |

Then re-run this script. Do not run any analysis skill until it reports Agent OS `AVAILABLE`.

## Policy

- **Agent OS is mandatory** for market/derivatives/account skills. No REST fallback.
- **Vendored Web3 scripts are mandatory** for token info/audit/address/rank/signals. No explorer fallback.
- Read-only scopes only. Trading toggles stay OFF unless a separate execution skill needs them.
