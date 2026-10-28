/* Digital Salekasa Native PWA Controller */
(function() {
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    window.__dgDeferredPrompt = e;
    var btn = document.getElementById('pwa-install-trigger');
    if (btn) btn.style.display = 'flex';
  });

  window.installDigitalSalekasaApp = function() {
    var promptEvent = deferredPrompt || window.__dgDeferredPrompt;
    if (!promptEvent) {
      alert('तुमच्या मोबाईल स्क्रीनवर वरती 3 डॉट्सवर टॅप करून "Add to Home screen" किंवा "Install app" निवडा.');
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then(function(choice) {
      if (choice.outcome === 'accepted') {
        var btn = document.getElementById('pwa-install-trigger');
        if (btn) btn.style.display = 'none';
      }
      deferredPrompt = null;
      window.__dgDeferredPrompt = null;
    });
  };

  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function() {});
    });
  }
})();
