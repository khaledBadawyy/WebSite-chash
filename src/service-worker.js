const CACHE_NAME = "olbac-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/index-stands.html",
  "/product-details.html",
  "/src/css/style.css",
  "/src/main.js",
  "/src/sub-main.js",
  "/offline.html",
  // Images
  "/image/header/AnyConv.com__logo%20(1).webp",
  "/image/header/AnyConv.com__LOGO-MOBILE.webp",
  "/image/gaenral/dealzone_LE_auto_x2.jpg",
  "/image/gaenral/mas3.png",
  "/image/gaenral/modal-img.png",
  "/image/gaenral/ico.png",
  // Add CDN resources
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js",
  "https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  // Skip waiting forces the waiting service worker to become the active service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Immediately claim any new clients
  return self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      // Try network first
      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          // Network failed, try to return cached offline page
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }

          // Return cached response if available
          return caches.match(event.request);
        });
    })
  );
});

// Handle Service Worker Updates
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
