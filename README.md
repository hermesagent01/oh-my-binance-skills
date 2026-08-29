# Oh My Binance

## STEP 0 — one-time Binance authorization (~2 min, required for market data)

Most skills read live markets through **Binance Agent OS**. Connect once:

| Your agent | Do this |
|---|---|
| Claude Code | `claude mcp add binance --transport http https://agent.binance.com/mcp/agentic` then `/mcp` → Authenticate |
| Codex CLI | add to `~/.codex/config.toml`: `[mcp_servers.binance] url = "https://agent.binance.com/mcp/agentic"` |
| Hermes | `hermes mcp add binance --url https://agent.binance.com/mcp/agentic --auth oauth` then `hermes mcp test binance` |
| ChatGPT / Cursor | Connector UI → URL `https://agent.binance.com/mcp/agentic` → browser OAuth |

A browser window opens → sign in to Binance → toggle **read** permissions → done.
Token/wallet/Web3 skills use bundled launchers and need no MCP at all.


A shareable crypto research skill library built specifically around **Binance Agent OS**.

### Universal
The skills are portable across AI agent runtimes and models.

### Binance-specific
Binance Agent OS remains the canonical crypto data source. This is intentionally **not**
a multi-exchange abstraction.

### What it does
- token intelligence
- market structure
- derivatives context
- wallet/whale/smart-money analysis
- anomaly detection
- move explanation
- confluence and contradiction analysis
- scenario/thesis research

### What it does not do
It does not autonomously trade and does not issue personalized trading instructions.

**New here (or an AI agent receiving this folder)?** Read `AGENTS.md` first — it is the bootstrap guide.

See:
- `AGENTS.md` (start here)
- `docs/ARCHITECTURE.md`
- `docs/BINANCE-AGENT-OS.md`
- `schemas/evidence-contract.yaml`
- `workflows/`
