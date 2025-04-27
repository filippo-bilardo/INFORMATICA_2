// Nome della cache
const CACHE_NAME = 'pwa-demo-v1';

// Risorse da memorizzare nella cache durante l'installazione
const urlsToCache = [
  './',
  './index.html',
  './esempio1.html',
  './esempio1.js',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Evento di installazione - memorizza le risorse nella cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento di attivazione - pulisce le cache vecchie
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina le cache vecchie
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento fetch - gestisce le richieste di rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Restituisce la risorsa dalla cache se presente
        if (response) {
          return response;
        }
        
        // Altrimenti fa una richiesta di rete
        return fetch(event.request).then(response => {
          // Verifica che la risposta sia valida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clona la risposta perché è uno stream che può essere consumato solo una volta
          const responseToCache = response.clone();
          
          // Aggiunge la risposta alla cache
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch(() => {
          // Se la richiesta fallisce (offline), mostra una pagina offline
          if (event.request.mode === 'navigate') {
            return caches.match('./esempio1.html');
          }
        });
      })
  );
});