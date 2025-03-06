const CACHE_NAME = 'olbac-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index-stands.html',
  '/product-details.html',
  '/src/css/style.css',
  '/src/main.js',
  '/src/sub-main.js',
  '/image/header/AnyConv.com__logo%20(1).webp',
  '/image/header/AnyConv.com__LOGO-MOBILE.webp',
  '/image/gaenral/dealzone_LE_auto_x2.jpg',
  '/image/gaenral/mas3.png',
  '/image/gaenral/modal-img.png',
  '/image/gaenral/ico.png',
  // Add other important assets, images and files to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
}); 