// The Pages build inserts the exact files and version for this release.
const prefix = 'design-canvas:' + self.registration.scope + ':';
const cacheName = prefix + "892fd40d8436d9a17b2d";
const assets = ["assets/export-BpucLmlX.js","assets/html2canvas.esm-DXEQVQnt.js","assets/index-DHyKty-y.css","assets/index-nQRak757.js","assets/pages-store-Bv77-Oe8.js","index.html","manifest.webmanifest","icon.svg","icon-180.png","icon-192.png","icon-512.png"].map(file => new URL(file, self.registration.scope).href);
const entry = new URL('index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache =>
    cache.addAll(assets.map(url => new Request(url, { cache: 'reload' })))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(prefix) && name !== cacheName) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = '';
  const home = event.request.mode === 'navigate' && (url.href === self.registration.scope || url.href === entry);
  const asset = home ? entry : url.href;
  if (!assets.includes(asset)) return;
  event.respondWith((async () => {
    const cached = await (await caches.open(cacheName)).match(asset);
    return cached || fetch(event.request);
  })());
});
