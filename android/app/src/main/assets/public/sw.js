
self.addEventListener('install', (event) => {
  console.log('PBRU LDB Service Worker installed');
  event.waitUntil(
    caches.open('pbru-ldb-v1').then(cache => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/pbru-logo.png',
        '/pbru-LDB.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
