const CACHE_NAME = "stargate.appcache";
const urlsToCache = [
  "/",
  "/potd",
  "/dashboard",
  "/signup",
  "/login",
  "/manifest.json",
  "/css/bootstrap-5.0.2-dist/css/bootstrap.min.css",
  "/css/bootstrap-5.0.2-dist/css/bootstrap-icons.css",
  "/css/bootstrap-5.0.2-dist/css/bootstrap-icons.woff",
  "/css/bootstrap-5.0.2-dist/css/bootstrap-icons.woff2",
  "/css/bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js",
  "/css/hamburgers.css",
  "/css/style.css",
  "/js/activeClass.js",
  "/js/three.min.js",
  "/js/OrbitControls.js",
  "/js/GLTFLoader.js",
  "/js/swhook.js",
  "/js/animateHamburger.js",
  "/js/index.js",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "/favicons/apple-touch-icon-57x57.png",
  "/favicons/apple-touch-icon-60x60.png",
  "/favicons/apple-touch-icon-72x72.png",
  "/favicons/apple-touch-icon-76x76.png",
  "/favicons/apple-touch-icon-114x114.png",
  "/favicons/apple-touch-icon-120x120.png",
  "/favicons/apple-touch-icon-144x144.png",
  "/favicons/apple-touch-icon-152x152.png",
  "/favicons/favicon-16x16.png",
  "/favicons/favicon-32x32.png",
  "/favicons/favicon-96x96.png",
  "/favicons/favicon-128x128.png",
  "/favicons/favicon-196x196.png",
  "/favicons/ms-tile-70x70.png",
  "/favicons/ms-tile-144x144.png",
  "/favicons/ms-tile-150x150.png",
  "/favicons/ms-tile-310x150.png",
  "/favicons/ms-tile-310x310.png",
  "/favicons/favicon.ico",
  "/assets/sphere/earth_atmos_4096.min.jpeg",
  "/assets/sphere/jupiter.min.jpeg",
  "/assets/sphere/mars.min.jpeg",
  "/assets/sphere/mercury.min.jpeg",
  "/assets/sphere/moon.min.jpeg",
  "/assets/sphere/neptune.min.jpeg",
  "/assets/sphere/pluto.min.jpeg",
  "/assets/sphere/saturn.min.jpeg",
  "/assets/sphere/sun.min.jpeg",
  "/assets/sphere/uranus.min.jpeg",
  "/assets/sphere/venus.min.jpeg",
  "/assets/skyBox/eso_dark.min.jpeg",
  "/assets/blackhole.min.jpeg",
  "/assets/sphere/Saturn.glb",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// use network first then cache
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     fetch(event.request).catch(function () {
//       return caches.match(event.request);
//     })
//   );
// });

// use cache first
self.addEventListener("fetch", (event) => {
  // non GET requests are not cached and requests to other origins are not cached
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // handle runtime GET requests for data from /potd route
  if (event.request.url.includes("/potd")) {
    // make network request and fallback to cache if network request fails (offline)
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
    return;
  }

  // use cache first for all other requests for performance
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // request is not in cache. make network request and cache the response
      return caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          return cache.put(event.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
  );
});
