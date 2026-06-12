/* ============================================================
   js/pages/explore.js
   Logic for Explore Tokens page
   ============================================================ */

import { ContractManager } from '../core/contract.js';
import { Toast } from '../modules/toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  const tokenGrid = document.getElementById('tokenGrid');

  async function loadTokens() {
    try {
      // 1. Ambil list token dari kontrak
      const tokens = await ContractManager.getAllTokens();
      
      // Bersihkan loading state
      tokenGrid.innerHTML = '';

      if (tokens.length === 0) {
        tokenGrid.innerHTML = '<p>No tokens deployed yet.</p>';
        return;
      }

      // 2. Loop dan render setiap token
      tokens.forEach(async (token) => {
        // Asumsi 'token' adalah object atau address. 
        // Jika hanya address, panggil ContractManager.getTokenInfo(address)
        const info = typeof token === 'string' ? await ContractManager.getTokenInfo(token) : token;
        
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
          <h3 class="feature-card__title">${info.name || 'Unknown Token'}</h3>
          <p class="feature-card__desc">Symbol: ${info.symbol || 'N/A'}</p>
          <div class="mt-4">
             <a href="token-detail.html?address=${info.tokenAddress}" class="btn btn--sm">View Details</a>
          </div>
        `;
        tokenGrid.appendChild(card);
      });

    } catch (err) {
      console.error('Error loading tokens:', err);
      tokenGrid.innerHTML = '<p>Failed to load tokens. Please try again.</p>';
      Toast.show('error', 'Error', 'Could not fetch token list.');
    }
  }

  loadTokens();
});
