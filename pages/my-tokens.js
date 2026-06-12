document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('myTokenGrid');

    // 1. Cek koneksi wallet
    if (!WalletManager.isConnected()) {
        grid.innerHTML = '<p style="color: var(--color-text-muted);">Please connect your wallet to view your tokens.</p>';
        return;
    }

    grid.innerHTML = '<p style="color: var(--color-text-muted);">Loading your tokens...</p>';

    try {
        const address = WalletManager.getAddress();
        
        // 2. Ambil token milik user
        const tokens = await ContractManager.getCreatorTokens(address);

        if (!tokens || tokens.length === 0) {
            grid.innerHTML = '<p style="color: var(--color-text-muted);">You haven\'t deployed any tokens yet.</p>';
            return;
        }

        // 3. Render kartu token
        grid.innerHTML = tokens.map(token => `
            <div class="card card--interactive">
                <h3 style="margin-bottom: var(--space-2);">${token.name} (${token.symbol})</h3>
                <p style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: var(--space-4);">
                    ${token.address}
                </p>
                <a href="https://evozscan.com/address/${token.address}" target="_blank" class="btn btn--ghost" style="width: 100%;">
                    View on Explorer
                </a>
            </div>
        `).join('');

    } catch (err) {
        console.error('MyTokens Error:', err);
        grid.innerHTML = '<p style="color: var(--color-error);">Failed to load your tokens.</p>';
        Toast.show('error', 'Load Failed', 'Could not fetch your tokens.');
    }
});

