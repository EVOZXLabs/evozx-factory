/* ============================================================
   EVOZX ULTIMATE FACTORY — WALLET MANAGER
   Handles: connect, disconnect, network switch, state sync, persistence
   Depends on: ethers (UMD global), config.js
   ============================================================ */

const WalletManager = (() => {

  // ── State ────────────────────────────────────────────────

  let _provider  = null;
  let _signer    = null;
  let _address   = null;
  let _chainId   = null;
  let _listeners = {};

  // ── Helpers ──────────────────────────────────────────────

  function _short(addr) {
    if (!addr) return '';
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }

  function _emit(event, data) {
    (_listeners[event] || []).forEach(fn => fn(data));
  }

  function _updateUI() {
    const btn   = document.getElementById('connectWalletBtn');
    const label = document.getElementById('connectBtnLabel');
    if (!btn || !label) return;

    if (_address) {
      label.textContent = _short(_address);
      btn.classList.add('connected');
    } else {
      label.textContent = 'Connect Wallet';
      btn.classList.remove('connected');
    }
  }

  // ── Network check & switch ────────────────────────────────

  async function _ensureNetwork() {
    const network = await _provider.getNetwork();
    _chainId = Number(network.chainId);

    if (_chainId !== EVOZX_CONFIG.CHAIN.ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: EVOZX_CONFIG.CHAIN.ID_HEX }],
        });
      } catch (switchErr) {
        if (switchErr.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId:           EVOZX_CONFIG.CHAIN.ID_HEX,
              chainName:         EVOZX_CONFIG.CHAIN.NAME,
              nativeCurrency:    EVOZX_CONFIG.CHAIN.CURRENCY,
              rpcUrls:           [EVOZX_CONFIG.CHAIN.RPC_URL],
              blockExplorerUrls: [EVOZX_CONFIG.CHAIN.EXPLORER_URL],
            }],
          });
        } else {
          throw switchErr;
        }
      }
      _provider = new ethers.BrowserProvider(window.ethereum);
      _chainId  = EVOZX_CONFIG.CHAIN.ID;
    }
  }

  // ── Connect & Persistence ──────────────────────────────────

  async function connect(isAutoConnect = false) {
    if (!window.ethereum) {
      if (!isAutoConnect) Toast.show('error', 'No Wallet Found', 'Install MetaMask to continue.');
      return null;
    }

    try {
      _provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account if not auto-connecting
      if (!isAutoConnect) {
        await _provider.send('eth_requestAccounts', []);
      }

      await _ensureNetwork();

      _signer  = await _provider.getSigner();
      _address = await _signer.getAddress();
      _chainId = EVOZX_CONFIG.CHAIN.ID;

      // Update Persistence
      localStorage.setItem('isWalletConnected', 'true');

      _updateUI();
      if (!isAutoConnect) _emit('connected', { address: _address, chainId: _chainId });
      
      return { provider: _provider, signer: _signer, address: _address };
    } catch (err) {
      if (!isAutoConnect) {
        if (err.code === 4001) {
          Toast.show('warning', 'Connection Rejected', 'You cancelled the request.');
        } else {
          Toast.show('error', 'Connection Failed', err.message || 'Error occurred.');
        }
      }
      disconnect(); // Clear state if connection fails
      return null;
    }
  }

  // ── Disconnect ────────────────────────────────────────────

  function disconnect() {
    _provider  = null;
    _signer    = null;
    _address   = null;
    _chainId   = null;
    localStorage.removeItem('isWalletConnected');
    _updateUI();
    _emit('disconnected', {});
  }

  // ── Getters & Subscriptions ───────────────────────────────

  function getAddress()  { return _address; }
  function getSigner()   { return _signer; }
  function getProvider() { return _provider; }
  function getChainId()  { return _chainId; }
  function isConnected() { return !!_address; }
  function on(event, fn) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(fn);
  }

  // ── Init / Auto-Reconnect ─────────────────────────────────

  async function _init() {
    // Tunggu DOM siap sebelum update UI
    if (localStorage.getItem('isWalletConnected') === 'true') {
      // Tunggu sebentar untuk memastikan provider tersedia
      setTimeout(async () => {
        await connect(true); 
      }, 500);
    }
  }

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        _address = accounts[0];
        _updateUI();
        _emit('accountChanged', { address: _address });
      }
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  // Jalankan auto-init
  _init();

  return { connect, disconnect, getAddress, getSigner, getProvider, getChainId, isConnected, on };

})();
