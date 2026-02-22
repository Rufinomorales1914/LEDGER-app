const cacheName = 'ledger-v2';
const assets = [
  '/LEDGER-app/',
  '/LEDGER-app/index.html',
  '/LEDGER-app/style.css',
  '/LEDGER-app/manifest.json',
  '/LEDGER-app/icon-192.png',
  '/LEDGER-app/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
