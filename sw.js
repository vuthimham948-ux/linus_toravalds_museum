const CACHE = "lt-museum-v1";
const SHELL = [
  "./",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "assets/tux.svg",
  "css/00-reset.css",
  "css/01-tokens.css",
  "css/02-base.css",
  "css/03-layout.css",
  "css/04-components.css",
  "css/05-sections.css",
  "css/06-animations.css",
  "css/07-responsive.css",
  "css/08-print.css",
  "css/09-museum.css",
  "css/10-effects.css",
  "js/main.js",
  "js/config.js",
  "js/utils.js",
  "js/theme.js",
  "js/nav.js",
  "js/counters.js",
  "js/lightbox.js",
  "js/search.js",
  "js/fx.js",
  "js/motion.js",
  "js/chrome.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  // HTML navigations: network first, fall back to cache offline.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put("./", copy));
      return res;
    }).catch(() => caches.match("./")));
    return;
  }

  // Everything else same-origin: cache first, then network (and cache it).
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match("./"));
    })
  );
});
