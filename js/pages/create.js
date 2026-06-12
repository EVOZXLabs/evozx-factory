document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createTokenForm');
    const deployBtn = document.getElementById('deployBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Check wallet connection
        if (!WalletManager.isConnected()) {
            Toast.show('error', 'Wallet', 'Please connect your wallet first.');
            return;
        }

        // 2. Prepare data
        const rawSupply = document.getElementById('tokenSupply').value;
        const config = {
            name: document.getElementById('tokenName').value,
            symbol: document.getElementById('tokenSymbol').value,
            supply: ethers.parseUnits(rawSupply, 18) // Convert to 18 decimals
        };

        // 3. Execute deployment
        try {
            deployBtn.disabled = true;
            deployBtn.innerText = 'Deploying...';
            
            const result = await ContractManager.createToken(config);
            
            Toast.show('success', 'Deployed!', `Token created at: ${result.tokenAddress.slice(0, 10)}...`);
            form.reset();
            
        } catch (err) {
            console.error('Deployment Error:', err);
            Toast.show('error', 'Failed', err.reason || err.message || 'Transaction rejected.');
        } finally {
            deployBtn.disabled = false;
            deployBtn.innerText = 'Deploy Token';
        }
    });
});
