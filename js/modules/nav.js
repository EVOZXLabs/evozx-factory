/* ============================================================
   EVOZX ULTIMATE FACTORY — NAV MODULE
   Hamburger toggle, scroll shrink, active page highlight
   ============================================================ */

(function NavModule() {

  document.addEventListener('DOMContentLoaded', () => {

    const navbar       = document.getElementById('navbar');
    const hamburger    = document.getElementById('hamburgerBtn');
    const drawer       = document.getElementById('mobileDrawer');
    const connectBtn   = document.getElementById('connectWalletBtn');

    // ── Active page highlight ────────────────────────────

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      link.classList.toggle('active', href === currentPage);
    });

    // ── Scroll effect ────────────────────────────────────

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Hamburger ─────────────────────────────────────────

    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        const open = drawer.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
      });

      // Close drawer on link click
      drawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // ── Connect wallet button ─────────────────────────────

    if (connectBtn) {
      connectBtn.addEventListener('click', async () => {
        if (WalletManager.isConnected()) {
          WalletManager.disconnect();
        } else {
          await WalletManager.connect();
        }
      });
    }

  });

})();
