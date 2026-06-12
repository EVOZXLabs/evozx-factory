import { ContractManager } from "../core/contract.js";
import { WalletManager } from "../core/wallet.js";

/**
 * EVOZX Home Page Logic
 * Menangani inisialisasi data dan interaksi UI di halaman utama.
 */
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Update Statistik dari Blockchain
    try {
        const total = await ContractManager.getTotalTokens();
        const totalEl = document.getElementById('statTotalTokens');
        
        if (totalEl) {
            totalEl.textContent = total.toLocaleString();
        }
    } catch (error) {
        console.error("Error saat memuat statistik token:", error);
        const totalEl = document.getElementById('statTotalTokens');
        if (totalEl) totalEl.textContent = "0"; // Fallback jika gagal
    }

    // 2. Inisialisasi Wallet Button
    const connectBtn = document.getElementById('connectWalletBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            try {
                await WalletManager.connect();
                // Opsional: Update label button setelah sukses connect
                const label = document.getElementById('connectBtnLabel');
                if (label) label.textContent = "Connected";
            } catch (error) {
                console.error("Wallet connection failed:", error);
            }
        });
    }

    // 3. (Opsional) Cek status wallet saat page load
    if (WalletManager.isConnected()) {
        const label = document.getElementById('connectBtnLabel');
        if (label) label.textContent = "Connected";
    }
});

