const CACHE_NAME = "plantup-ia-cache-v1";
const urlsToCache = [
  "./plantup_ia.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalación y cache inicial
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza cache anterior si existiera
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return null;
        })
      )
    )
  );
});

// Interceptar las solicitudes y responder desde cache si está disponible o de la red en caso contrario
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

