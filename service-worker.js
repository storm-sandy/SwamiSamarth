const STATIC_CACHE = 'static-v1';
const API_CACHE = 'api-v1';

const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css',
  '/app.js',
  '/logo.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_FILES))
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== API_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // ❌ NEVER cache payment / transaction
  if (
    url.pathname.includes('/payment') ||
    url.pathname.includes('/transaction') ||
    url.pathname.includes('/verify') ||
    url.href.includes('upi')
  ) {
    event.respondWith(fetch(req));
    return;
  }

  // 🟢 Static files → Cache First
  if (req.destination === 'style' ||
      req.destination === 'script' ||
      req.destination === 'image') {
    event.respondWith(
      caches.match(req).then(res => res || fetch(req))
    );
    return;
  }

  // 🟡 Other APIs → Network First
  event.respondWith(
    fetch(req)
      .then(res => {
        return caches.open(API_CACHE).then(cache => {
          cache.put(req, res.clone());
          return res;
        });
      })
      .catch(() => caches.match(req) || caches.match('/offline.html'))
  );
});
