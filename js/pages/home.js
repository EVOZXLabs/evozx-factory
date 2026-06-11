document.addEventListener('DOMContentLoaded', async () => {
  const statTotalTokens = document.getElementById('statTotalTokens');
  try {
    const total = await ContractManager.getTotalTokens();
    if (statTotalTokens) statTotalTokens.textContent = total.toLocaleString('en-US');
  } catch (err) {
    if (statTotalTokens) statTotalTokens.textContent = 'N/A';
  }
});
