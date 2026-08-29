# Binance Agent OS adapter

Binance Agent OS is the canonical crypto data backend for this library.

**Web3 source of truth:** on-chain/token/wallet evidence comes exclusively from the vendored official Binance Web3 skills (`vendors/binance-web3/`). No explorers, no public RPC, no third-party APIs.

The skills are runtime/model agnostic, but the data source is intentionally Binance Agent OS.
The host agent should discover the connected Binance Agent OS capabilities and map requested
capabilities to the available tools.

If a required Binance capability is unavailable, record it MISSING/UNSUPPORTED in the internal evidence layer; the renderer omits it per the Missing Data Silence Rule.
