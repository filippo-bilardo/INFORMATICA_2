// service-worker.js - Service Worker per la PWA Task Manager

const CACHE_NAME = 'task-manager-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/taskManager.js',
  './js/storage.js',
  './js/ui.js',
  './js/notification.js',
  './js/utils.js',
  './manifest.json',
  './assets/icons/favicon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installazione');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching di tutti gli asset');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[Service Worker] Installazione completata');
        return self.skipWaiting();
      })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Attivazione');
  // Rimuovi le vecchie cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Rimozione della vecchia cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Ora è attivo e controlla la pagina');
      return self.clients.claim();
    })
  );
});

// Strategia di caching: Cache First, poi Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Restituisci la risorsa dalla cache se esiste
        if (response) {
          return response;
        }
        
        // Altrimenti, recupera dalla rete
        return fetch(event.request)
          .then((networkResponse) => {
            // Verifica se la risposta è valida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clona la risposta perché è uno stream che può essere consumato solo una volta
            const responseToCache = networkResponse.clone();
            
            // Aggiungi la risposta alla cache per richieste future
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return networkResponse;
          });
      })
      .catch(() => {
        // Fallback per risorse che non possono essere recuperate
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('./index.html');
        }
      })
  );
});

// Gestione delle notifiche push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Notifica push ricevuta', event);
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: './assets/icons/icon-192.png',
    badge: './assets/icons/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Apri'
      },
      {
        action: 'close',
        title: 'Chiudi'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gestione del click sulle notifiche
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Click sulla notifica', event);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Verifica se c'è già una finestra aperta e focalizzala
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Altrimenti apri una nuova finestra
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});