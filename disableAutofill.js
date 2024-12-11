// Disable autofill in DevTools
window.addEventListener('devtools-opened', () => {
    if (window.__TAURI__) {
      window.__TAURI__.event.emit('disable-autofill');
    }
  });
  