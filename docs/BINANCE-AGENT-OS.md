# Binance Agent OS

Binance Agent OS is the canonical data backend.

**Web3 source of truth:** on-chain/token/wallet evidence comes exclusively from the vendored official Binance Web3 skills (`vendors/binance-web3/`). No explorers, no public RPC, no third-party APIs.

Atomic skills should request capabilities, not assume a specific tool name. The host agent
discovers the connected Binance Agent OS capabilities and supplies normalized evidence.

Expected capability families include exchange market data, order books, funding, open
interest, liquidations, token information, token audit/security, wallet/address data,
market ranking and smart-money/Web3 signals where exposed.

If a capability is unavailable, record MISSING/UNSUPPORTED internally (renderer omits it per the Missing Data Silence Rule). Do not use generic public REST as a silent substitute for Agent OS data.
