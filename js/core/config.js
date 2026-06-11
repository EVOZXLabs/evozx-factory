/* ============================================================
   EVOZX ULTIMATE FACTORY — CORE CONFIG
   Single source of truth for chain & contract constants.
   ============================================================ */

const EVOZX_CONFIG = Object.freeze({

  CHAIN: {
    ID:           805,
    ID_HEX:       '0x325',
    NAME:         'EVOZ Mainnet',
    CURRENCY:     { name: 'EVOZ', symbol: 'EVOZ', decimals: 18 },
    RPC_URL:      'https://rpc.evoz.network',
    EXPLORER_URL: 'https://explorer.evoz.network',
  },

  CONTRACTS: {
    FACTORY:  '0xbA40773bCF0d30e83c4319796Ec45CA31d6e64bB',
    EVOZX:    '0x032a962F62Fc1cbc15B19767Aa138deA3B454B74',
    TREASURY: '0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C',
    DEAD:     '0x000000000000000000000000000000000000dEaD',
  },

  FACTORY_ABI: [
    // Read
    "function totalTokens() view returns (uint256)",
    "function getAllTokens() view returns (tuple(address token, address creator, string name, string symbol, uint256 supply, uint256 createdAt, uint256 chainId, bool active)[])",
    "function getToken(uint256 index) view returns (tuple(address token, address creator, string name, string symbol, uint256 supply, uint256 createdAt, uint256 chainId, bool active))",
    "function tokenInfo(address) view returns (tuple(address token, address creator, string name, string symbol, uint256 supply, uint256 createdAt, uint256 chainId, bool active))",
    "function creatorTokenCount(address) view returns (uint256)",
    "function creatorTokens(address) view returns (address[])",
    "function isTokenFromFactory(address) view returns (bool)",
    "function symbolExists(string) view returns (bool)",
    "function getDeploymentFee(tuple(string name, string symbol, uint256 supply, address owner, uint256 chainId, uint16 launchKitVersion, bool burnable, bool mintable, bool ownershipEnabled, string website, string telegram, string twitter, string logoURI, bool maxWalletEnabled, uint8 maxWalletPercent, bool maxTxEnabled, uint8 maxTxPercent, bool tradingControlEnabled, bool tradingEnabled, bool buyTaxEnabled, uint8 buyTax, bool sellTaxEnabled, uint8 sellTax, uint8 burnTaxShare, address marketingWallet, address developmentWallet) config) view returns (uint256)",
    "function feeMultiplier() view returns (uint256)",
    "function owner() view returns (address)",
    "function treasury() view returns (address)",
    "function VERSION() view returns (string)",
    // Write
    "function createToken(tuple(string name, string symbol, uint256 supply, address owner, uint256 chainId, uint16 launchKitVersion, bool burnable, bool mintable, bool ownershipEnabled, string website, string telegram, string twitter, string logoURI, bool maxWalletEnabled, uint8 maxWalletPercent, bool maxTxEnabled, uint8 maxTxPercent, bool tradingControlEnabled, bool tradingEnabled, bool buyTaxEnabled, uint8 buyTax, bool sellTaxEnabled, uint8 sellTax, uint8 burnTaxShare, address marketingWallet, address developmentWallet) config) external",
    // Events
    "event TokenCreated(address indexed token, address indexed creator, string name, string symbol, uint256 supply, uint256 chainId)",
  ],

  EVOZX_ABI: [
    "function balanceOf(address) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
  ],

  TOKEN_ABI: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)",
    "function owner() view returns (address)",
    "function ownershipEnabled() view returns (bool)",
    "function burnable() view returns (bool)",
    "function mintable() view returns (bool)",
    "function mintUsed() view returns (bool)",
    "function website() view returns (string)",
    "function telegram() view returns (string)",
    "function twitter() view returns (string)",
    "function logoURI() view returns (string)",
    "function maxWalletEnabled() view returns (bool)",
    "function maxWalletPercent() view returns (uint8)",
    "function maxTxEnabled() view returns (bool)",
    "function maxTxPercent() view returns (uint8)",
    "function tradingControlEnabled() view returns (bool)",
    "function tradingEnabled() view returns (bool)",
    "function buyTaxEnabled() view returns (bool)",
    "function buyTax() view returns (uint8)",
    "function sellTaxEnabled() view returns (bool)",
    "function sellTax() view returns (uint8)",
    "function burnTaxShare() view returns (uint8)",
    "function marketingWallet() view returns (address)",
    "function developmentWallet() view returns (address)",
    "function dexPair() view returns (address)",
    "function pairInitialized() view returns (bool)",
    "function isExcluded(address) view returns (bool)",
    "function deployedChainId() view returns (uint256)",
    "function launchKitVersion() view returns (uint16)",
    // Write
    "function enableTrading() external",
    "function disableTrading() external",
    "function setDexPair(address pair) external",
    "function setExcluded(address account, bool excluded) external",
    "function updateMetadata(string,string,string,string) external",
    "function transferOwnership(address newOwner) external",
    "function renounceOwnership() external",
    "function mint(address to, uint256 amount) external",
    "function burn(uint256 amount) external",
  ],

});
