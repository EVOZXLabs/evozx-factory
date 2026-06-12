import { ethers } from 'ethers';
import { CONFIG } from './config.js';

export const WalletManager = {
  provider: null,
  signer: null,

  async connect() {
    if (!window.ethereum) throw new Error("MetaMask is required.");
    
    this.provider = new ethers.BrowserProvider(window.ethereum);
    
    // Check Network
    const network = await this.provider.getNetwork();
    if (network.chainId !== BigInt(CONFIG.NETWORK.chainId)) {
        await this.switchNetwork();
    }

    this.signer = await this.provider.getSigner();
    return this.signer.address;
  },

  async switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: ethers.toBeHex(CONFIG.NETWORK.chainId),
          chainName: CONFIG.NETWORK.chainName,
          rpcUrls: CONFIG.NETWORK.rpcUrls,
          nativeCurrency: CONFIG.NETWORK.nativeCurrency,
          blockExplorerUrls: CONFIG.NETWORK.blockExplorerUrls
        }]
      });
    } catch (e) {
      console.error("Network switch failed", e);
    }
  }
};
