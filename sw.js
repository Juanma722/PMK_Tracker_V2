// sw.js — Service Worker PigTracker V2
const CACHE = 'pigtracker-v2-21';
const BASE  = '/PMK_Tracker_V2';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && (
          e.request.url.includes('juanma722.github.io') ||
          e.request.url.includes('cdnjs.cloudflare.com') ||
          e.request.url.includes('fonts.googleapis.com') ||
          e.request.url.includes('fonts.gstatic.com')
        )) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached || new Response('Offline', {status: 503}));
    })
  );
});
