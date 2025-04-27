// Nome della cache
const CACHE_NAME = 'pwa-demo-v2';

// Risorse da memorizzare nella cache durante l'installazione
const urlsToCache = [
  './esempio2.html',
  './esempio2.js',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Strategia di caching corrente
let currentStrategy = 'cache-first';

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

// Implementazione della strategia Cache First
function cacheFirst(event) {
  return caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
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
      });
    });
}

// Implementazione della strategia Network First
function networkFirst(event) {
  return fetch(event.request)
    .then(response => {
      // Verifica che la risposta sia valida
      if (!response || response.status !== 200) {
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
      // Se la rete fallisce, utilizza la cache
      return caches.match(event.request);
    });
}

// Implementazione della strategia Stale While Revalidate
function staleWhileRevalidate(event) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(event.request).then(cachedResponse => {
      // Crea una promessa per aggiornare la cache
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Verifica che la risposta sia valida
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Se la rete fallisce, non fare nulla
        console.log('Fetch fallito, ma abbiamo già servito dalla cache');
      });
      
      // Restituisce la risposta dalla cache se presente, altrimenti dalla rete
      return cachedResponse || fetchPromise;
    });
  });
}

// Evento fetch - gestisce le richieste di rete in base alla strategia corrente
self.addEventListener('fetch', event => {
  // Ignora le richieste non GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Applica la strategia corrente
  switch (currentStrategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(event));
      break;
    case 'network-first':
      event.respondWith(networkFirst(event));
      break;
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(event));
      break;
    default:
      event.respondWith(cacheFirst(event));
  }
});

// Gestisce i messaggi dal client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_STRATEGY') {
    currentStrategy = event.data.strategy;
    console.log(`Strategia di caching impostata a: ${currentStrategy}`);
  } else if (event.data && event.data.type === 'UPDATE_CACHE') {
    // Aggiorna la cache con le risorse essenziali
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Cache aggiornata con successo');
      });
  }
});