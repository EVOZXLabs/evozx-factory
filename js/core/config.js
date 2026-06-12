/* ============================================================
   js/core/config.js
   Single source of truth for chain & contract constants.
   ============================================================ */

export const EVOZX_CONFIG = Object.freeze({
  CHAIN: {
    ID: 805,
    ID_HEX: '0x325',
    NAME: 'EVOZ Mainnet',
    CURRENCY: { name: 'EVOZ', symbol: 'EVOZ', decimals: 18 },
    RPC_URL: 'https://rpc.evozscan.com',
    EXPLORER_URL: 'https://evozscan.com',
  },

  CONTRACTS: {
    FACTORY: '0xbA40773bCF0d30e83c4319796Ec45CA31d6e64bB',
    EVOZX: '0x032a962F62Fc1cbc15B19767Aa138deA3B454B74',
    TREASURY: '0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C',
    DEAD: '0x000000000000000000000000000000000000dEaD',
  }
});
