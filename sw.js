const cacheName = 'ledger-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png.jpg',
  '/icon-512.png.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
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