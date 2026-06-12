/* ============================================================
   EVOZX ULTIMATE FACTORY — TOAST MODULE
   Usage: Toast.show('success'|'error'|'warning'|'info', title, message)
   ============================================================ */

const Toast = (() => {

  const ICONS = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00AFFF" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  function show(type = 'info', title = '', message = '', duration = 4500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="toast__icon">${ICONS[type] || ICONS.info}</div>
      <div class="toast__body">
        ${title  ? `<div class="toast__title">${title}</div>` : ''}
        ${message ? `<div class="toast__msg">${message}</div>` : ''}
      </div>
    `;

    container.appendChild(el);

        const remove = () => {
      el.classList.add('removing');
      
      // Menggunakan kombinasi event listener dan fallback timer
      const onAnimationEnd = () => {
        el.remove();
      };
      
      el.addEventListener('animationend', onAnimationEnd, { once: true });
      
      // Fallback: Jika CSS animation gagal, hapus paksa setelah 500ms
      setTimeout(onAnimationEnd, 500); 
    };
     

    const timer = setTimeout(remove, duration);
    el.addEventListener('click', () => { clearTimeout(timer); remove(); });
  }

  return { show };

})();
