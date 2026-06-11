/* ============================================================
   EVOZX ULTIMATE FACTORY — CONTRACT INTERFACE
   Read/write helpers for Factory & Token contracts.
   Depends on: ethers, config.js, wallet.js
   ============================================================ */

const ContractManager = (() => {

  // ── Read-only provider (no wallet needed) ────────────────

  function _readProvider() {
    return new ethers.JsonRpcProvider(EVOZX_CONFIG.CHAIN.RPC_URL);
  }

  function _factoryRead() {
    return new ethers.Contract(
      EVOZX_CONFIG.CONTRACTS.FACTORY,
      EVOZX_CONFIG.FACTORY_ABI,
      _readProvider()
    );
  }

  function _factoryWrite() {
    if (!WalletManager.isConnected()) throw new Error('Wallet not connected');
    return new ethers.Contract(
      EVOZX_CONFIG.CONTRACTS.FACTORY,
      EVOZX_CONFIG.FACTORY_ABI,
      WalletManager.getSigner()
    );
  }

  function _evozxRead() {
    return new ethers.Contract(
      EVOZX_CONFIG.CONTRACTS.EVOZX,
      EVOZX_CONFIG.EVOZX_ABI,
      _readProvider()
    );
  }

  function _evozxWrite() {
    if (!WalletManager.isConnected()) throw new Error('Wallet not connected');
    return new ethers.Contract(
      EVOZX_CONFIG.CONTRACTS.EVOZX,
      EVOZX_CONFIG.EVOZX_ABI,
      WalletManager.getSigner()
    );
  }

  function tokenRead(address) {
    return new ethers.Contract(address, EVOZX_CONFIG.TOKEN_ABI, _readProvider());
  }

  function tokenWrite(address) {
    if (!WalletManager.isConnected()) throw new Error('Wallet not connected');
    return new ethers.Contract(address, EVOZX_CONFIG.TOKEN_ABI, WalletManager.getSigner());
  }

  // ── Factory reads ─────────────────────────────────────────

  async function getTotalTokens() {
    const n = await _factoryRead().totalTokens();
    return Number(n);
  }

  async function getAllTokens() {
    return await _factoryRead().getAllTokens();
  }

  async function getToken(index) {
    return await _factoryRead().getToken(index);
  }

  async function getTokenInfo(address) {
    return await _factoryRead().tokenInfo(address);
  }

  async function getCreatorTokens(address) {
    return await _factoryRead().creatorTokens(address);
  }

  async function getCreatorTokenCount(address) {
    const n = await _factoryRead().creatorTokenCount(address);
    return Number(n);
  }

  async function isFactoryToken(address) {
    return await _factoryRead().isTokenFromFactory(address);
  }

  async function symbolExists(symbol) {
    return await _factoryRead().symbolExists(symbol);
  }

  /**
   * Get deployment fee for a config object.
   * Returns { total, burn, treasury } as BigInt strings.
   */
  async function getDeploymentFee(config) {
    const total = await _factoryRead().getDeploymentFee(config);
    const burn  = (total * 30n) / 100n;
    const treasury = total - burn;
    return { total, burn, treasury };
  }

  // ── EVOZX reads ───────────────────────────────────────────

  async function getEvozxBalance(address) {
    return await _evozxRead().balanceOf(address);
  }

  async function getEvozxAllowance(owner, spender) {
    return await _evozxRead().allowance(owner, spender);
  }

  // ── EVOZX writes ──────────────────────────────────────────

  async function approveEvozx(spender, amount) {
    const tx = await _evozxWrite().approve(spender, amount);
    await tx.wait();
    return tx;
  }

  // ── Factory write: createToken ────────────────────────────

  /**
   * Deploy a new token.
   * @param {object} config - LaunchKitTypes.TokenConfig fields
   * @returns {{ tx, receipt, tokenAddress }}
   */
  async function createToken(config) {
    // 1. Calculate fee
    const { total } = await getDeploymentFee(config);

    // 2. Check balance
    const balance = await getEvozxBalance(WalletManager.getAddress());
    if (balance < total) {
      throw new Error('Insufficient EVOZX balance for deployment fee.');
    }

    // 3. Check & request allowance
    const allowance = await getEvozxAllowance(
      WalletManager.getAddress(),
      EVOZX_CONFIG.CONTRACTS.FACTORY
    );
    if (allowance < total) {
      Toast.show('info', 'Approval Required', 'Approve EVOZX spend to continue.');
      await approveEvozx(EVOZX_CONFIG.CONTRACTS.FACTORY, total);
      Toast.show('success', 'Approved', 'EVOZX spend approved.');
    }

    // 4. Deploy
    const factory = _factoryWrite();
    const tx = await factory.createToken(config);
    Toast.show('info', 'Transaction Sent', 'Waiting for confirmation…');
    const receipt = await tx.wait();

    // 5. Parse TokenCreated event to get token address
    const iface = new ethers.Interface(EVOZX_CONFIG.FACTORY_ABI);
    let tokenAddress = null;
    for (const log of receipt.logs) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed && parsed.name === 'TokenCreated') {
          tokenAddress = parsed.args.token;
          break;
        }
      } catch (_) { /* skip */ }
    }

    return { tx, receipt, tokenAddress };
  }

  // ── Formatters ────────────────────────────────────────────

  function formatEvozx(bigint, decimals = 2) {
    return Number(ethers.formatEther(bigint)).toLocaleString('en-US', {
      maximumFractionDigits: decimals,
    });
  }

  function formatSupply(bigint) {
    return Number(ethers.formatEther(bigint)).toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });
  }

  // ── Public API ────────────────────────────────────────────

  return {
    // Factory reads
    getTotalTokens,
    getAllTokens,
    getToken,
    getTokenInfo,
    getCreatorTokens,
    getCreatorTokenCount,
    isFactoryToken,
    symbolExists,
    getDeploymentFee,
    // EVOZX
    getEvozxBalance,
    getEvozxAllowance,
    approveEvozx,
    // Factory write
    createToken,
    // Token contracts
    tokenRead,
    tokenWrite,
    // Formatters
    formatEvozx,
    formatSupply,
  };

})();
