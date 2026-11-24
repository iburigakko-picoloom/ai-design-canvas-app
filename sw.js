// The Pages build inserts the exact files and version for this release.
const prefix = 'design-canvas:' + self.registration.scope + ':';
const cacheName = prefix + "bd8ddaedb568aed54e7b";
const assets = ["assets/export-CStiezdC.js","assets/html2canvas.esm-DXEQVQnt.js","assets/index-DjkF0EUZ.css","assets/index-nlKdLJpf.js","assets/pages-store-OPUu6zG1.js","index.html","manifest.webmanifest","icon.svg","icon-180.png","icon-192.png","icon-512.png"].map(file => new URL(file, self.registration.scope).href);
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
