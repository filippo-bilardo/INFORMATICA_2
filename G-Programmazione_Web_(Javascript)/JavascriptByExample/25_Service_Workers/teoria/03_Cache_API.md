# Cache API e Strategie di Caching

La Cache API è una delle funzionalità più potenti disponibili per i Service Workers, permettendo di memorizzare risorse web e servirle anche quando l'utente è offline. In questo capitolo, esploreremo la Cache API e le diverse strategie di caching che possono essere implementate con i Service Workers.

## Introduzione alla Cache API

La Cache API fornisce un meccanismo di memorizzazione persistente specificamente progettato per archiviare le risposte delle richieste di rete. A differenza di altre API di storage come localStorage o IndexedDB, la Cache API è ottimizzata per memorizzare coppie di richieste/risposte HTTP.

```javascript
// Esempio di base di utilizzo della Cache API
caches.open('my-cache-v1').then(cache => {
  // Aggiunta di una risorsa alla cache
  cache.add('/styles/main.css');
  
  // Aggiunta di multiple risorse alla cache
  cache.addAll([
    '/index.html',
    '/scripts/main.js',
    '/images/logo.png'
  ]);
  
  // Aggiunta manuale di una coppia richiesta/risposta
  fetch('/api/data.json')
    .then(response => {
      return cache.put('/api/data.json', response);
    });
});
```

## Metodi principali della Cache API

### `caches.open(cacheName)`

Apre una cache con il nome specificato. Se la cache non esiste, ne crea una nuova. Restituisce una Promise che si risolve con l'oggetto cache.

### `cache.add(request)`

Effettua una richiesta di rete e aggiunge la coppia richiesta/risposta alla cache. È equivalente a `fetch()` seguito da `cache.put()`.

### `cache.addAll(requests)`

Simile a `cache.add()`, ma accetta un array di URL o oggetti Request. Se una qualsiasi delle richieste fallisce, l'intera operazione fallisce (atomica).

### `cache.put(request, response)`

Aggiunge direttamente una coppia richiesta/risposta alla cache. Utile quando si desidera modificare la risposta prima di memorizzarla.

### `cache.match(request, options)`

Cerca nella cache una richiesta corrispondente e restituisce la risposta associata. Se non viene trovata alcuna corrispondenza, restituisce `undefined`.

### `cache.matchAll(request, options)`

Simile a `cache.match()`, ma restituisce tutte le risposte corrispondenti.

### `cache.delete(request, options)`

Rimuove dalla cache la coppia richiesta/risposta corrispondente alla richiesta specificata.

### `caches.keys()`

Restituisce un array con i nomi di tutte le cache disponibili.

### `caches.delete(cacheName)`

Elimina completamente la cache specificata.

## Strategie di Caching

Le strategie di caching definiscono come e quando utilizzare la cache rispetto alla rete. Ecco le strategie più comuni:

### 1. Cache First (Cache poi Rete)

Questa strategia controlla prima la cache e, solo se la risorsa non è presente, effettua una richiesta di rete. È ideale per risorse statiche che cambiano raramente.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Restituisci la risposta dalla cache se esiste
        if (cachedResponse) {
          return cachedResponse;
        }
        // Altrimenti, vai in rete
        return fetch(event.request).then(response => {
          // Opzionale: memorizza la nuova risposta in cache per usi futuri
          return caches.open('dynamic-cache').then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});
```

### 2. Network First (Rete poi Cache)

Questa strategia tenta prima una richiesta di rete e, solo in caso di fallimento, utilizza la cache. È ideale per contenuti che cambiano frequentemente ma che dovrebbero essere disponibili anche offline.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Memorizza la risposta fresca in cache
        caches.open('dynamic-cache').then(cache => {
          cache.put(event.request, response.clone());
        });
        return response;
      })
      .catch(() => {
        // Se la rete fallisce, prova dalla cache
        return caches.match(event.request);
      })
  );
});
```

### 3. Stale-While-Revalidate

Questa strategia restituisce immediatamente la risposta dalla cache (se disponibile), mentre contemporaneamente aggiorna la cache con una nuova richiesta di rete. È un buon compromesso tra velocità e freschezza dei contenuti.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic-cache').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        // Restituisci la cache immediatamente, ma aggiorna in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

### 4. Cache Only

Questa strategia utilizza esclusivamente la cache, senza mai effettuare richieste di rete. È utile per risorse che sono state precaricate durante l'installazione del Service Worker.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});
```

### 5. Network Only

Questa strategia utilizza esclusivamente la rete, ignorando completamente la cache. È utile per richieste che devono sempre essere fresche, come le API di analisi.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

## Strategie di Caching Avanzate

### Caching Selettivo

Spesso è necessario applicare diverse strategie di caching a diverse tipologie di risorse:

```javascript
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Strategia diversa per le immagini
  if (event.request.destination === 'image') {
    event.respondWith(cacheFirst(event.request));
    return;
  }
  
  // Strategia diversa per le API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  
  // Strategia predefinita per tutto il resto
  event.respondWith(staleWhileRevalidate(event.request));
});

// Funzioni helper per le diverse strategie
function cacheFirst(request) { /* ... */ }
function networkFirst(request) { /* ... */ }
function staleWhileRevalidate(request) { /* ... */ }
```

### Gestione delle Risposte di Fallback

È possibile fornire risposte di fallback personalizzate quando sia la cache che la rete falliscono:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
      .catch(() => {
        // Fornisci una risposta di fallback
        if (event.request.destination === 'image') {
          return caches.match('/images/offline-image.png');
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        return new Response('Contenuto non disponibile offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
```

## Gestione della Cache

### Limitare la Dimensione della Cache

È importante gestire la dimensione della cache per evitare di occupare troppo spazio di archiviazione:

```javascript
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // Elimina le voci più vecchie (FIFO)
    await cache.delete(keys[0]);
    // Chiamata ricorsiva per continuare a eliminare se necessario
    await trimCache(cacheName, maxItems);
  }
}

// Usa questa funzione periodicamente
self.addEventListener('activate', event => {
  event.waitUntil(trimCache('dynamic-cache', 100));
});
```

### Versioning della Cache

Il versioning della cache è fondamentale per gestire gli aggiornamenti dell'applicazione:

```javascript
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Elimina le cache vecchie
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

## Conclusione

La Cache API, combinata con i Service Workers, offre potenti strumenti per migliorare le prestazioni delle applicazioni web e fornire esperienze offline. Scegliere la strategia di caching appropriata per ogni tipo di risorsa è fondamentale per bilanciare velocità, freschezza dei contenuti e resilienza offline.

Nel prossimo capitolo, vedremo come implementare funzionalità offline complete nelle applicazioni web, combinando le strategie di caching con altre tecniche come la sincronizzazione in background.

[Torna all'indice](../README.md) | [Capitolo precedente: Ciclo di Vita dei Service Workers](./02_Ciclo_di_Vita_Service_Workers.md) | [Prossimo capitolo: Funzionalità Offline](./04_Funzionalita_Offline.md)