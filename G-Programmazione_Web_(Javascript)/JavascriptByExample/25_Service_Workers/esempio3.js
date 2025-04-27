/**
 * esempio3.js - Strategie di caching per richieste di rete
 * 
 * Questo esempio mostra diverse strategie di caching per gestire le richieste di rete
 * utilizzando i Service Workers, come Cache First, Network First e Stale-While-Revalidate.
 */

// Verifica se il browser supporta i Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw-strategie-caching.js')
      .then(registration => {
        console.log('Service Worker registrato con successo con scope:', registration.scope);
      })
      .catch(error => {
        console.error('Errore durante la registrazione del Service Worker:', error);
      });
  });
}

/**
 * sw-strategie-caching.js - File del Service Worker con diverse strategie di caching
 * 
 * Questo file dovrebbe essere salvato come 'sw-strategie-caching.js' nella root del tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Nomi delle cache
const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_IMMUTABLE = 'immutable-v1';

// Risorse statiche da precaricare
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png',
  '/offline.html'
];

// Risorse immutabili (librerie esterne che non cambiano)
const IMMUTABLE_ASSETS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
];

// Evento 'install' - precaricare le risorse statiche e immutabili
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione in corso');
  
  event.waitUntil(
    Promise.all([
      // Cache delle risorse statiche
      caches.open(CACHE_STATIC)
        .then(cache => {
          console.log('Service Worker: Precaricamento risorse statiche');
          return cache.addAll(STATIC_ASSETS);
        }),
      
      // Cache delle risorse immutabili
      caches.open(CACHE_IMMUTABLE)
        .then(cache => {
          console.log('Service Worker: Precaricamento risorse immutabili');
          return cache.addAll(IMMUTABLE_ASSETS);
        })
    ])
    .then(() => self.skipWaiting())
  );
});

// Evento 'activate' - pulire le cache obsolete
self.addEventListener('activate', event => {
  console.log('Service Worker: Attivazione in corso');
  
  const currentCaches = [CACHE_STATIC, CACHE_DYNAMIC, CACHE_IMMUTABLE];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!currentCaches.includes(cacheName)) {
              console.log('Service Worker: Eliminazione cache obsoleta:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Funzione di utilità per determinare se una richiesta è per una risorsa immutabile
function isImmutableRequest(request) {
  return IMMUTABLE_ASSETS.some(asset => request.url.includes(asset));
}

// Funzione di utilità per determinare se una richiesta è per un'API
function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

// Funzione di utilità per determinare se una richiesta è per un'immagine
function isImageRequest(request) {
  return request.destination === 'image';
}

// Strategia Cache First (Cache con fallback alla rete)
function cacheFirstStrategy(request) {
  return caches.match(request)
    .then(cachedResponse => {
      if (cachedResponse) {
        console.log('Service Worker: Risorsa servita dalla cache (Cache First)');
        return cachedResponse;
      }
      
      console.log('Service Worker: Risorsa non trovata nella cache, richiesta alla rete (Cache First)');
      return fetch(request)
        .then(networkResponse => {
          // Memorizza nella cache dinamica
          return caches.open(CACHE_DYNAMIC)
            .then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
        })
        .catch(error => {
          console.error('Service Worker: Errore di rete (Cache First):', error);
          // Se è una richiesta di navigazione, restituisci la pagina offline
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          // Per altri tipi di risorse, potresti voler restituire un placeholder
          // Ad esempio, per le immagini:
          if (request.destination === 'image') {
            return caches.match('/images/offline-image.png');
          }
        });
    });
}

// Strategia Network First (Rete con fallback alla cache)
function networkFirstStrategy(request) {
  return fetch(request)
    .then(networkResponse => {
      console.log('Service Worker: Risorsa servita dalla rete (Network First)');
      
      // Clona la risposta per memorizzarla nella cache
      const responseToCache = networkResponse.clone();
      
      caches.open(CACHE_DYNAMIC)
        .then(cache => {
          cache.put(request, responseToCache);
        });
      
      return networkResponse;
    })
    .catch(() => {
      console.log('Service Worker: Errore di rete, fallback alla cache (Network First)');
      return caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Se non c'è una risposta nella cache e la richiesta è per una pagina HTML
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    });
}

// Strategia Stale-While-Revalidate
function staleWhileRevalidateStrategy(request) {
  return caches.match(request)
    .then(cachedResponse => {
      // Avvia una richiesta di rete per aggiornare la cache
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          // Aggiorna la cache con la nuova risposta
          caches.open(CACHE_DYNAMIC)
            .then(cache => {
              cache.put(request, networkResponse.clone());
            });
          return networkResponse;
        })
        .catch(() => {
          // Se la rete fallisce, non fare nulla (useremo la cache)
          console.log('Service Worker: Errore di rete, usando solo la cache (Stale-While-Revalidate)');
        });
      
      // Restituisci la risposta dalla cache se disponibile, altrimenti aspetta la rete
      return cachedResponse || fetchPromise;
    });
}

// Evento 'fetch' - applica diverse strategie in base al tipo di richiesta
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Strategia per risorse immutabili (librerie esterne)
  if (isImmutableRequest(request)) {
    console.log('Service Worker: Richiesta per risorsa immutabile:', request.url);
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Strategia per richieste API
  if (isApiRequest(request)) {
    console.log('Service Worker: Richiesta API:', request.url);
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Strategia per immagini
  if (isImageRequest(request)) {
    console.log('Service Worker: Richiesta immagine:', request.url);
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Strategia predefinita per tutte le altre richieste
  console.log('Service Worker: Richiesta generica:', request.url);
  event.respondWith(cacheFirstStrategy(request));
});
*/

/**
 * Nota: Il codice sopra è commentato perché questo file è solo un esempio.
 * In un'applicazione reale, dovresti creare un file separato chiamato 'sw-strategie-caching.js'
 * nella root del tuo sito e includervi il codice non commentato.
 */

/**
 * HTML di esempio per utilizzare questo Service Worker:
 * 
 * <!DOCTYPE html>
 * <html lang="it">
 * <head>
 *   <meta charset="UTF-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *   <title>Strategie di Caching Demo</title>
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
 *   <link rel="stylesheet" href="styles/main.css">
 *   <script src="esempio3.js"></script>
 * </head>
 * <body>
 *   <div class="container mt-5">
 *     <h1>Strategie di Caching Demo</h1>
 *     <p>Questo esempio mostra diverse strategie di caching per le richieste di rete.</p>
 *     
 *     <div class="row mt-4">
 *       <div class="col-md-4">
 *         <div class="card">
 *           <div class="card-header">Cache First</div>
 *           <div class="card-body">
 *             <p>Verifica prima la cache, poi la rete.</p>
 *             <button class="btn btn-primary" id="testCacheFirst">Testa</button>
 *           </div>
 *         </div>
 *       </div>
 *       
 *       <div class="col-md-4">
 *         <div class="card">
 *           <div class="card-header">Network First</div>
 *           <div class="card-body">
 *             <p>Verifica prima la rete, poi la cache.</p>
 *             <button class="btn btn-primary" id="testNetworkFirst">Testa</button>
 *           </div>
 *         </div>
 *       </div>
 *       
 *       <div class="col-md-4">
 *         <div class="card">
 *           <div class="card-header">Stale-While-Revalidate</div>
 *           <div class="card-body">
 *             <p>Usa la cache e aggiorna in background.</p>
 *             <button class="btn btn-primary" id="testStaleWhileRevalidate">Testa</button>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *     
 *     <div class="mt-4">
 *       <h3>Risultati:</h3>
 *       <pre id="results" class="bg-light p-3"></pre>
 *     </div>
 *   </div>
 *   
 *   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
 *   <script>
 *     // Codice per testare le diverse strategie
 *     document.getElementById('testCacheFirst').addEventListener('click', () => {
 *       fetch('/api/test-cache-first')
 *         .then(response => response.text())
 *         .then(data => {
 *           document.getElementById('results').textContent = data;
 *         });
 *     });
 *     
 *     document.getElementById('testNetworkFirst').addEventListener('click', () => {
 *       fetch('/api/test-network-first')
 *         .then(response => response.text())
 *         .then(data => {
 *           document.getElementById('results').textContent = data;
 *         });
 *     });
 *     
 *     document.getElementById('testStaleWhileRevalidate').addEventListener('click', () => {
 *       fetch('/api/test-stale-while-revalidate')
 *         .then(response => response.text())
 *         .then(data => {
 *           document.getElementById('results').textContent = data;
 *         });
 *     });
 *   </script>
 * </body>
 * </html>
 */