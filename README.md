# Digital Salekasa — Progressive Web App (PWA) Engine

Official PWA repository and CDN asset bucket for **Digital Salekasa** (`digitalsalekasa.blogspot.com`).

## ⚡ CDN Production Endpoints (via jsDelivr)

- **Manifest (CDN):**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/bucket/app/manifest.cdn.webmanifest`
- **Root Manifest:**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/manifest.json`
- **Service Worker:**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/bucket/app/serviceworker.js`
- **Client Helper:**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/bucket/app/pwa.js`
- **App 192x192 Icon:**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/bucket/app/icons/android-chrome-192x192.png`
- **App 512x512 Icon:**  
  `https://cdn.jsdelivr.net/gh/digitalgondia-creator/pwa-salekasa@main/bucket/app/icons/android-chrome-512x512.png`

## 📁 Repository Structure
```
├── bucket/
│   └── app/
│       ├── icons/                 # Full set of PWA, Apple & Windows tile icons
│       ├── offline/               # Offline fallback screen with emergency contacts
│       ├── browserconfig.xml      # Windows Metro tiles
│       ├── manifest.cdn.webmanifest # Production CDN Web App Manifest
│       ├── manifest.webmanifest   # Standard Web App Manifest
│       ├── pwa.js                 # PWA install prompt handler
│       ├── serviceworker.js       # Background runtime cache worker
│       └── yandex-browser-manifest.json
├── icons/                         # Root icon mirror
├── manifest.json                  # Root manifest mirror
├── pwa.config.ts                  # Configuration specification
└── sw.js                          # Root service worker mirror
```
