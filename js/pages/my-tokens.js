/* ============================================================
   js/pages/my-tokens.js
   Logic for "My Tokens" page
   ============================================================ */

import { WalletManager } from '../core/wallet.js';
import { ContractManager } from '../core/contract.js';
import { Toast } from '../modules/toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  const tokenGrid = document.getElementById('myTokenGrid');
  const statusMsg = document.getElementById('statusMsg');

  async function loadMyTokens() {
    const address = WalletManager.getAddress();
    if (!address) {
      statusMsg.textContent = 'Please connect your wallet to view your tokens.';
      return;
    }

    try {
      statusMsg.textContent = 'Loading your tokens...';
      const myTokens = await ContractManager.getCreatorTokens(address);

      if (!myTokens || myTokens.length === 0) {
        statusMsg.textContent = 'You haven\'t deployed any tokens yet.';
        return;
      }

      tokenGrid.innerHTML = '';
      myTokens.forEach(async (tokenAddress) => {
        const info = await ContractManager.getTokenInfo(tokenAddress);
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
          <h3 class="feature-card__title">${info.name} (${info.symbol})</h3>
          <p class="feature-card__desc">Address: ${tokenAddress.slice(0, 6)}...${tokenAddress.slice(-4)}</p>
          <a href="token-detail.html?address=${tokenAddress}" class="btn btn--sm mt-4">Manage</a>
        `;
        tokenGrid.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      statusMsg.textContent = 'Failed to load your tokens.';
      Toast.show('error', 'Error', 'Could not fetch your tokens.');
    }
  }

  // Initial load
  if (WalletManager.isConnected()) {
    loadMyTokens();
  }

  // Listen for connection
  WalletManager.on('connected', loadMyTokens);
});
