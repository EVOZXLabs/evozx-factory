document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createTokenForm');
    const deployBtn = document.getElementById('deployBtn');

    form.addEventListener('submit', async (e) => {
        // Prevent default browser behavior
        e.preventDefault();

        // Manual English validation
        const inputs = form.querySelectorAll('input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                Toast.show('error', 'Validation Error', `Please fill in the ${input.name || 'field'}.`, 1500);
                isValid = false;
            }
        });

        if (!isValid) return;

        // Check wallet connection
        if (!WalletManager.isConnected()) {
            Toast.show('error', 'Wallet', 'Please connect your wallet first.');
            return;
        }

        // Prepare data
        const rawSupply = document.getElementById('tokenSupply').value;
        const config = {
            name: document.getElementById('tokenName').value,
            symbol: document.getElementById('tokenSymbol').value,
            supply: ethers.parseUnits(rawSupply, 18) 
        };

        // Execute deployment
        try {
            deployBtn.disabled = true;
            deployBtn.innerText = 'Deploying...';
            
            const result = await ContractManager.createToken(config);
            
            Toast.show('success', 'Deployed!', `Token created at: ${result.tokenAddress.slice(0, 10)}...`, 1500);
            form.reset();
            
        } catch (err) {
            console.error('Deployment Error:', err);
            Toast.show('error', 'Deployment Failed', err.reason || err.message || 'Transaction rejected.', 1500);
        } finally {
            deployBtn.disabled = false;
            deployBtn.innerText = 'Deploy Token';
        }
    });
});
