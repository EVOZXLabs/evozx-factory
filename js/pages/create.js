// js/pages/create.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createTokenForm');
    const deployBtn = document.getElementById('deployBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Cek koneksi wallet
        if (typeof window.ethereum === 'undefined') {
            return alert('Please install MetaMask!');
        }

        const config = {
            name: document.getElementById('tokenName').value,
            symbol: document.getElementById('tokenSymbol').value,
            supply: document.getElementById('tokenSupply').value
        };

        try {
            deployBtn.disabled = true;
            deployBtn.innerText = 'Deploying...';
            
            // Panggil fungsi dari contract.js
            await ContractManager.createToken(config);
            
            alert('Token berhasil di-deploy!');
            form.reset();
        } catch (err) {
            console.error(err);
            alert('Gagal: ' + err.message);
        } finally {
            deployBtn.disabled = false;
            deployBtn.innerText = 'Deploy Token';
        }
    });
});

