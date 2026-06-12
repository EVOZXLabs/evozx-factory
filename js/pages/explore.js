document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('tokenGrid');

    try {
        // Fetch tokens (pastikan fungsi ini ada di ContractManager Anda)
        const tokens = await ContractManager.getAllTokens();

        if (!tokens || tokens.length === 0) {
            grid.innerHTML = '<p style="color: var(--color-text-muted);">No tokens found on the network yet.</p>';
            return;
        }

        // Render tokens
        grid.innerHTML = tokens.map(token => `
            <div class="card card--interactive">
                <h3 style="margin-bottom: var(--space-2);">${token.name} (${token.symbol})</h3>
                <p style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-secondary);">
                    Address: ${token.address.slice(0, 10)}...${token.address.slice(-6)}
                </p>
                <div style="margin-top: var(--space-4);">
                    <a href="https://evozscan.com/address/${token.address}" target="_blank" class="btn btn--ghost">View on Explorer</a>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error('Error fetching tokens:', err);
        Toast.show('error', 'Network Error', 'Failed to load tokens. Please try again.');
    }
});

