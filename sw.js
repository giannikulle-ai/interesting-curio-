/* Shelf offline helper: keeps a copy of the shelf page on the device so it opens with no signal. */
const CACHE = 'shelf-v1';
const FILES = ['./', './index.html', './icon.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).catch(() => {}));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Anything a tool fetches from elsewhere goes straight to the network.
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // "?run=name" is the same page, so the saved copy answers it too.
    const saved = await cache.match(request, { ignoreSearch: true })
      || (request.mode === 'navigate' ? await cache.match('./index.html') : undefined);
    // Refresh the saved copy in the background, so a newer shelf arrives on the next open.
    const fresh = fetch(request).then((response) => {
      if (response && response.ok) cache.put(request.mode === 'navigate' ? './index.html' : request, response.clone());
      return response;
    }).catch(() => undefined);
    return saved || (await fresh) || Response.error();
  })());
});
