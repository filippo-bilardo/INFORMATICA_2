/**
 * esempio2.js - Implementazione della cache per risorse statiche
 * 
 * Questo esempio mostra come utilizzare la Cache API per memorizzare risorse statiche
 * durante l'installazione del Service Worker, permettendo un accesso offline a queste risorse.
 */

// Verifica se il browser supporta i Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw-cache-statica.js')
      .then(registration => {
        console.log('Service Worker registrato con successo con scope:', registration.scope);
      })
      .catch(error => {
        console.error('Errore durante la registrazione del Service Worker:', error);
      });
  });
}

/**
 * sw-cache-statica.js - File del Service Worker con implementazione della cache statica
 * 
 * Questo file dovrebbe essere salvato come 'sw-cache-statica.js' nella root del tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Nome della cache
const CACHE_NAME = 'cache-statica-v1';

// Lista delle risorse da memorizzare nella cache durante l'installazione
const RESOURCES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png',
  '/offline.html'
];

// Evento 'install' - memorizza le risorse nella cache
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione in corso');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Apertura della cache');
        return cache.addAll(RESOURCES_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker: Risorse memorizzate nella cache');
        return self.skipWaiting();
      })
  );
});

// Evento 'activate' - pulisce le cache obsolete
self.addEventListener('activate', event => {
  console.log('Service Worker: Attivazione in corso');
  
  const currentCaches = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          console.log('Service Worker: Eliminazione della cache obsoleta:', cacheToDelete);
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => {
        console.log('Service Worker: Attivato e cache pulita');
        return self.clients.claim();
      })
  );
});

// Evento 'fetch' - serve le risorse dalla cache se disponibili
self.addEventListener('fetch', event => {
  console.log('Service Worker: Richiesta intercettata per', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Se la risorsa è nella cache, restituiscila
        if (cachedResponse) {
          console.log('Service Worker: Risorsa servita dalla cache');
          return cachedResponse;
        }
        
        // Altrimenti, effettua una richiesta di rete
        console.log('Service Worker: Risorsa non trovata nella cache, richiesta alla rete');
        return fetch(event.request)
          .catch(() => {
            // Se la richiesta di rete fallisce e stiamo richiedendo una pagina HTML,
            // restituisci la pagina offline
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
*/

/**
 * Nota: Il codice sopra è commentato perché questo file è solo un esempio.
 * In un'applicazione reale, dovresti creare un file separato chiamato 'sw-cache-statica.js'
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
 *   <title>Cache Statica Demo</title>
 *   <link rel="stylesheet" href="styles/main.css">
 *   <script src="esempio2.js"></script>
 * </head>
 * <body>
 *   <h1>Cache Statica Demo</h1>
 *   <p>Questo esempio mostra come memorizzare risorse statiche nella cache.</p>
 *   <p>Prova a ricaricare la pagina dopo aver disabilitato la connessione di rete!</p>
 *   <img src="images/logo.png" alt="Logo">
 *   <script src="scripts/main.js"></script>
 * </body>
 * </html>
 */

/**
 * offline.html - Pagina da mostrare quando l'utente è offline
 * 
 * <!DOCTYPE html>
 * <html lang="it">
 * <head>
 *   <meta charset="UTF-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *   <title>Sei Offline</title>
 *   <style>
 *     body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
 *     h1 { color: #e74c3c; }
 *   </style>
 * </head>
 * <body>
 *   <h1>Sei Offline</h1>
 *   <p>Sembra che tu sia offline. Controlla la tua connessione e riprova.</p>
 * </body>
 * </html>
 */