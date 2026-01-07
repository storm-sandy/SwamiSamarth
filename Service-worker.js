self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('tour-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});
