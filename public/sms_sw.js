
var cacheName = 'smsv1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/styles.css',
        '/assets/bootstrap/css/bootstrap.min.css',
        '/assets/js/init.js',
        '/assets/js/dbindex.js',
        '/assets/img/add64.png',
        '/assets/img/edit64.png',
        '/assets/img/listall64.png',
        '/assets/img/remove64.png',
        '/assets/img/search64.png'
      ]);
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});


