# Funzionalità Offline con Service Workers

Una delle caratteristiche più potenti dei Service Workers è la capacità di abilitare funzionalità offline nelle applicazioni web. In questo capitolo, esploreremo come implementare un'esperienza offline completa utilizzando i Service Workers e altre API correlate.

## Creazione di un'Esperienza Offline di Base

Per creare un'esperienza offline di base, è necessario combinare la registrazione di un Service Worker con strategie di caching appropriate e pagine di fallback.

### 1. Struttura del Progetto

Una tipica applicazione web con funzionalità offline potrebbe avere questa struttura:

```
/
├── index.html
├── offline.html
├── manifest.json
├── sw.js
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── offline.js
└── images/
    ├── logo.png
    └── offline-image.png
```

### 2. Registrazione del Service Worker

Nel file principale dell'applicazione (`app.js`):

```javascript
// Registra il Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrato con successo:', registration.scope);
      })
      .catch(error => {
        console.error('Errore durante la registrazione del Service Worker:', error);
      });
  });
}

// Rileva lo stato della connessione
function updateOnlineStatus() {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    if (navigator.onLine) {
      statusElement.textContent = 'Online';
      statusElement.className = 'online';
    } else {
      statusElement.textContent = 'Offline';
      statusElement.className = 'offline';
    }
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Controllo iniziale
```

### 3. Implementazione del Service Worker

Nel file `sw.js`:

```javascript
const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/offline.js',
  '/images/logo.png',
  '/images/offline-image.png',
  '/manifest.json'
];

// Installazione: precaricare le risorse essenziali
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione: pulire le cache obsolete
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia di fetch: Network First con fallback alla cache
self.addEventListener('fetch', event => {
  // Ignora le richieste non GET
  if (event.request.method !== 'GET') return;
  
  // Ignora le richieste di analytics o altre richieste esterne
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Memorizza la risposta fresca in cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Se la rete fallisce, prova dalla cache
        return caches.match(event.request)
          .then(cachedResponse => {
            // Se abbiamo una risposta in cache, restituiscila
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Altrimenti, per le richieste di navigazione, mostra la pagina offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // Per le immagini, restituisci un'immagine offline generica
            if (event.request.destination === 'image') {
              return caches.match('/images/offline-image.png');
            }
            
            // Per altri tipi di risorse, restituisci una risposta vuota
            return new Response('', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
```

### 4. Creazione di una Pagina Offline

Nel file `offline.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline - La nostra App</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="offline-page">
  <header>
    <img src="/images/logo.png" alt="Logo" class="logo">
  </header>
  
  <main>
    <h1>Sei offline</h1>
    <p>Sembra che tu sia offline. Controlla la tua connessione internet e riprova.</p>
    <img src="/images/offline-image.png" alt="Offline" class="offline-image">
    
    <div class="cached-content">
      <h2>Contenuti disponibili offline</h2>
      <ul id="offline-content"></ul>
    </div>
  </main>
  
  <script src="/js/offline.js"></script>
</body>
</html>
```

### 5. Gestione dei Contenuti Offline

Nel file `offline.js`:

```javascript
// Mostra i contenuti disponibili offline
if ('caches' in window) {
  const offlineContentList = document.getElementById('offline-content');
  
  caches.open('offline-cache-v1').then(cache => {
    cache.keys().then(keys => {
      if (keys.length === 0) {
        offlineContentList.innerHTML = '<li>Nessun contenuto disponibile offline</li>';
        return;
      }
      
      // Filtra e mostra solo le pagine HTML (esclusa la pagina offline stessa)
      const htmlPages = keys.filter(request => {
        return request.url.endsWith('.html') && !request.url.includes('offline.html');
      });
      
      if (htmlPages.length === 0) {
        offlineContentList.innerHTML = '<li>Nessuna pagina disponibile offline</li>';
        return;
      }
      
      // Crea la lista di link alle pagine disponibili offline
      offlineContentList.innerHTML = htmlPages.map(request => {
        const url = new URL(request.url);
        const pageName = url.pathname === '/' ? 'Home' : url.pathname.split('/').pop().replace('.html', '');
        return `<li><a href="${url.pathname}">${pageName}</a></li>`;
      }).join('');
    });
  });
} else {
  document.querySelector('.cached-content').style.display = 'none';
}

// Rileva quando torniamo online
window.addEventListener('online', () => {
  // Reindirizza alla home page quando torniamo online
  window.location.href = '/';
});
```

## Tecniche Avanzate per Funzionalità Offline

### Sincronizzazione in Background

L'API Background Sync permette di posticipare le azioni fino a quando l'utente non ha una connessione stabile:

```javascript
// Nel file app.js
function saveData(data) {
  // Prima prova a inviare i dati direttamente
  fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(() => {
    // Se fallisce, salva i dati in IndexedDB
    saveToIndexedDB(data)
      .then(() => {
        // Registra un'operazione di sincronizzazione
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready
            .then(registration => {
              return registration.sync.register('sync-data');
            })
            .catch(err => console.error('Errore durante la registrazione della sincronizzazione:', err));
        }
      });
  });
}

// Nel Service Worker (sw.js)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Recupera i dati da IndexedDB e li invia al server
      getAllDataFromIndexedDB().then(dataItems => {
        return Promise.all(dataItems.map(data => {
          return fetch('/api/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(() => {
            // Se l'invio ha successo, rimuovi i dati da IndexedDB
            return removeFromIndexedDB(data.id);
          });
        }));
      })
    );
  }
});
```

### Notifiche Offline

È possibile mostrare notifiche anche quando l'utente è offline:

```javascript
// Nel Service Worker (sw.js)
self.addEventListener('push', event => {
  const options = {
    body: 'Questa notifica funziona anche offline!',
    icon: '/images/notification-icon.png',
    badge: '/images/notification-badge.png',
    data: {
      url: '/notifiche.html'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Notifica Offline', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

### Rilevamento Intelligente dello Stato Offline

Oltre agli eventi `online` e `offline`, è possibile implementare un rilevamento più sofisticato dello stato della connessione:

```javascript
function checkConnectivity() {
  return fetch('/ping', { method: 'HEAD' })
    .then(() => {
      // Se la richiesta ha successo, siamo online
      updateConnectionStatus(true);
      return true;
    })
    .catch(() => {
      // Se la richiesta fallisce, potremmo essere offline
      updateConnectionStatus(false);
      return false;
    });
}

function updateConnectionStatus(isOnline) {
  // Aggiorna l'interfaccia utente
  const statusElement = document.getElementById('connection-status');
  if (statusElement) {
    statusElement.textContent = isOnline ? 'Online' : 'Offline';
    statusElement.className = isOnline ? 'online' : 'offline';
  }
  
  // Invia un evento personalizzato
  const event = new CustomEvent('connectivitychange', { detail: { online: isOnline } });
  window.dispatchEvent(event);
}

// Controlla periodicamente la connettività
setInterval(checkConnectivity, 30000); // Ogni 30 secondi

// Controlla anche quando l'utente interagisce con la pagina
window.addEventListener('focus', checkConnectivity);
```

## Ottimizzazione dell'Esperienza Offline

### Adattamento dei Contenuti

È possibile adattare i contenuti in base allo stato della connessione:

```javascript
window.addEventListener('connectivitychange', event => {
  const isOnline = event.detail.online;
  
  // Elementi che richiedono connessione
  const onlineElements = document.querySelectorAll('.requires-connection');
  onlineElements.forEach(element => {
    element.style.display = isOnline ? 'block' : 'none';
  });
  
  // Elementi da mostrare offline
  const offlineElements = document.querySelectorAll('.offline-only');
  offlineElements.forEach(element => {
    element.style.display = isOnline ? 'none' : 'block';
  });
  
  // Adatta la qualità delle immagini
  if (isOnline) {
    loadHighResImages();
  }
});
```

### Memorizzazione Selettiva

È possibile permettere agli utenti di scegliere quali contenuti salvare per l'uso offline:

```javascript
function saveForOffline(url) {
  if ('caches' in window) {
    caches.open('user-saved-content').then(cache => {
      cache.add(url).then(() => {
        showMessage('Contenuto salvato per l\'uso offline');
      }).catch(error => {
        showMessage('Errore durante il salvataggio: ' + error.message);
      });
    });
  } else {
    showMessage('Il tuo browser non supporta la memorizzazione offline');
  }
}

// Aggiungi pulsanti "Salva per offline