/* Digital Salekasa High-Performance Progressive Web App Service Worker */
const CACHE_NAME = 'salekasa-pwa-v1.0.0';
const OFFLINE_URL = '/app/offline';

const PRECACHE_ASSETS = [
  '/',
  '/app/manifest.webmanifest',
  '/app/manifest.cdn.webmanifest',
  '/app/offline',
  '/app/icons/android-chrome-192x192.png',
  '/app/icons/android-chrome-512x512.png',
  '/app/icons/favicon-32x32.png',
  '/app/icons/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Salekasa PWA] Precache partial error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Salekasa PWA] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Handle document navigations (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the successfully fetched page
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // If offline, try cache first, then offline fallback page
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) return offlinePage;
          return new Response(
            `<!DOCTYPE html><html lang="mr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ऑफलाइन | Digital Salekasa</title><style>body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;color:#1e293b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;text-align:center}.card{background:#fff;border-radius:20px;padding:36px 24px;box-shadow:0 10px 25px rgba(0,0,0,0.06);max-width:420px;width:100%}.icon{font-size:56px;margin-bottom:12px}h1{font-size:22px;color:#0046eb;margin:0 0 10px}p{font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px}.btn{background:#0046eb;color:#fff;border:none;padding:12px 28px;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none;display:inline-block}.btn:hover{background:#0036b3}</style></head><body><div class="card"><div class="icon">📶</div><h1>तुम्ही ऑफलाइन आहात</h1><p>कृपया तुमचे इंटरनेट कनेक्शन सुरू करा आणि पुन्हा प्रयत्न करा. सेव्ह केलेल्या बातम्या वाचण्यासाठी मागे जा.</p><button class="btn" onclick="window.location.reload()">🔄 पुन्हा प्रयत्न करा</button></div></body></html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // Handle static assets (Stale-While-Revalidate)
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        }).catch(() => cachedResponse);
        return cachedResponse || fetchPromise;
      })
    );
  }
});
