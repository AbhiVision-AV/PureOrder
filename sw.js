const CACHE_NAME = 'pureorder-cache-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // PWA install criteria ke liye basic fetch listener zaroori hai
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
