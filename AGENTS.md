# Oh My Binance — Agent Instructions

You (the AI agent) have just received this folder. Here is everything you need.

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

## What this is

A portable crypto research skill library built around **Binance Agent OS**.
Runtime-agnostic (Hermes, Claude, ChatGPT, Codex, Cursor…), Binance-specific by design.
**Research only** — it never places trades and never issues BUY/SELL instructions.

## First-run checklist (do this before answering any crypto question)

1. Run the provisioner:
   ```bash
   node installer/provision.mjs
   ```
2. Read its output. If Agent OS is not connected, print the fix command for YOUR
   runtime (the script prints them all) and ask the user to connect, then re-run.
3. If `binance-wallet-tracker`/`binance-leaderboard` report `AUTH_REQUIRED`, run
   the sign-in command it prints and have the user approve in the Binance app.
4. Optionally set `OMB_AGENT_OS_MANIFEST` (JSON list of your connected MCP tool
   names) so the provisioner can verify capability families instead of host reachability.

Do not run analysis skills until Agent OS reports connected/available. If it never
connects, say so honestly and stop — do NOT fall back to public REST APIs.

## How to use the skills

- `skills/crypto-research-orchestrator/SKILL.md` — the router. For any crypto
  question, load it first; it maps intent → minimal skill route.
- `skills/*/SKILL.md` — 52 atomic skills and bundles. Bundles run their listed
  components independently, then synthesize once.
- `workflows/*.yaml` — declarative versions of the bundle flows.
- `vendors/binance-web3/<name>/scripts/cli.mjs` — official Binance Web3 data
  launchers. Invoke as `node <cli.mjs> <command> '<json_params>'`.
  `node <cli.mjs> --check` returns `{ok, executable?, version?, authRequired?}`.
- `schemas/evidence-contract.yaml` — the evidence shape every skill must emit.
- `docs/` — architecture, data-layer wiring per runtime, output conventions.
- `tests/validate.py` — lint skills + workflows against the contracts.

## Hard rules (non-negotiable)

1. Binance Agent OS is the canonical data backend. No public-REST fallback, ever.
2. **Missing Data Silence Rule:** If a requested or potentially relevant data point, capability, or source is unavailable, omit it completely from the user-facing response. Do not mention that it is missing, unavailable, unsupported, unchecked, or inaccessible. Use the available evidence and stop at the strongest conclusion it supports. Examples: OI unavailable -> don't mention OI. Funding unavailable -> don't mention funding. Liquidations, whale data, narrative - same. **Only exception:** if the user explicitly asks whether a specific piece of data is available, answer that question directly.
3. Holder/security/wallet data comes from `vendors/binance-web3/` launchers only.
4. Separate OBSERVED / INFERRED / POSSIBLE / UNKNOWN in every conclusion.
5. Preserve source + timestamp for numeric evidence; surface contradictions, never average them.
6. Confidence footer: `CONFIDENCE: high|medium|low` + one line naming the driver.
7. Research/intelligence only — no personalized BUY/SELL/LONG/SHORT output.
8. Read-only scopes. Trading toggles stay OFF.

## Attribution

Vendored Web3 bundles originate from github.com/binance/binance-skills-hub.
License: MIT (see LICENSE).
