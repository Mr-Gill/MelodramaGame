const CACHE_NAME = 'melodrama-werewolf-v2';
const ASSETS = [
  './',
  './index.html',
  './characters.js',
  './V4.html',
  './manifest.json'
  './manifest.json',
  './audio/village-night.mp3',
  './audio/village-day.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
