/* ============================================================
   js/pages/home.js
   Logic for landing page: Connect wallet, load stats.
   ============================================================ */

import { WalletManager } from '../core/wallet.js';
import { ContractManager } from '../core/contract.js';

document.addEventListener('DOMContentLoaded', async () => {
  
  // ── UI References ────────────────────────────────────────
  const connectBtn = document.getElementById('connectWalletBtn');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const statTotalTokens = document.getElementById('statTotalTokens');

  // ── Initialize Stats ─────────────────────────────────────
  async function loadStats() {
    try {
      const total = await ContractManager.getTotalTokens();
      if (statTotalTokens) {
        statTotalTokens.textContent = total.toLocaleString();
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
      if (statTotalTokens) statTotalTokens.textContent = '—';
    }
  }

  loadStats();

  // ── UI Events ────────────────────────────────────────────
  
  // Connect Wallet Action
  connectBtn.addEventListener('click', async () => {
    if (WalletManager.isConnected()) {
      WalletManager.disconnect();
    } else {
      await WalletManager.connect();
    }
  });

  // Hamburger Menu Toggle
  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('active');
  });

  // Listen to Wallet State (Optional: Update UI if wallet state changes)
  WalletManager.on('connected', (data) => {
    console.log('Wallet connected:', data.address);
  });

  WalletManager.on('disconnected', () => {
    console.log('Wallet disconnected');
  });
});
