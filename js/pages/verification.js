/* ============================================================
   js/pages/verification.js
   Logic for Verification page
   ============================================================ */

import { WalletManager } from '../core/wallet.js';
import { ContractManager } from '../core/contract.js';
import { Toast } from '../modules/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  const verifyForm = document.getElementById('verifyForm');
  const verifyBtn = document.getElementById('verifyBtn');
  const verifyResult = document.getElementById('verifyResult');

  verifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('tokenAddress').value;

    if (!ethers.isAddress(address)) {
      Toast.show('error', 'Invalid Address', 'Please enter a valid Ethereum address.');
      return;
    }

    try {
      verifyBtn.disabled = true;
      verifyBtn.textContent = 'Submitting...';

      // Panggil fungsi verifikasi di ContractManager
      await ContractManager.submitVerification(address);

      verifyResult.innerHTML = `<p style="color: var(--color-green);">Verification request submitted successfully!</p>`;
      Toast.show('success', 'Submitted', 'Your token is being reviewed.');
      verifyForm.reset();
    } catch (err) {
      console.error(err);
      Toast.show('error', 'Failed', 'Could not submit verification request.');
    } finally {
      verifyBtn.disabled = false;
      verifyBtn.textContent = 'Request Verification';
    }
  });
});

