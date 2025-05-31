# Strategie di Caching per PWA

Le strategie di caching sono fondamentali per ottimizzare le prestazioni e l'esperienza offline delle Progressive Web Apps (PWA). Una strategia di caching ben implementata può migliorare significativamente i tempi di caricamento, ridurre l'utilizzo dei dati e consentire il funzionamento dell'applicazione anche in assenza di connessione.

## Perché le strategie di caching sono importanti

- **Prestazioni migliori**: Riduzione dei tempi di caricamento servendo le risorse dalla cache locale.
- **Funzionalità offline**: Possibilità di utilizzare l'app anche senza connessione internet.
- **Risparmio di dati**: Riduzione del consumo di dati mobili recuperando le risorse dalla cache.
- **Resilienza**: Maggiore affidabilità in caso di connessioni instabili o lente.

## Principali strategie di caching

### 1. Cache First (Cache poi Network)

Questa strategia controlla prima la cache e, solo se la risorsa non è presente, la recupera dalla rete.

**Vantaggi**:
- Velocità massima di caricamento per le risorse già in cache
- Funzionamento garantito offline per le risorse memorizzate

**Svantaggi**:
- Le risorse possono diventare obsolete se non aggiornate
- Non adatta per contenuti che cambiano frequentemente

**Implementazione**:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Restituisce la risposta dalla cache se presente
        if (cachedResponse) {
          return cachedResponse;
        }
        // Altrimenti fa una richiesta di rete
        return fetch(event.request).then(response => {
          // Verifica che la risposta sia valida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clona la risposta e la memorizza nella cache
          const responseToCache = response.clone();
          caches.open('my-cache-v1').then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
  );
});
```

**Caso d'uso ideale**: Risorse statiche come CSS, JavaScript, immagini, font e HTML che non cambiano frequentemente.

### 2. Network First (Network poi Cache)

Questa strategia tenta prima di recuperare la risorsa dalla rete e, in caso di fallimento, utilizza la versione in cache.

**Vantaggi**:
- Garantisce contenuti sempre aggiornati quando la rete è disponibile
- Fornisce un fallback dalla cache quando la rete non è disponibile

**Svantaggi**:
- Tempi di caricamento più lunghi rispetto a Cache First
- Maggiore consumo di dati

**Implementazione**:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Verifica che la risposta sia valida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clona la risposta e la memorizza nella cache
        const responseToCache = response.clone();
        caches.open('my-cache-v1').then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Se la rete fallisce, utilizza la cache
        return caches.match(event.request);
      })
  );
});
```

**Caso d'uso ideale**: Contenuti dinamici che cambiano frequentemente, come API di notizie, feed social o dati in tempo reale, ma che devono essere disponibili anche offline.

### 3. Stale-While-Revalidate

Questa strategia restituisce immediatamente la versione in cache (anche se "stale", cioè potenzialmente obsoleta) mentre aggiorna la cache con la risposta di rete più recente per le richieste future.

**Vantaggi**:
- Tempi di risposta rapidi grazie all'uso immediato della cache
- Aggiornamento automatico della cache in background
- Buon equilibrio tra prestazioni e freschezza dei contenuti

**Svantaggi**:
- Gli utenti potrebbero vedere contenuti non aggiornati durante la prima visita dopo un aggiornamento

**Implementazione**:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('my-cache-v1').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // Crea una promessa per aggiornare la cache
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        
        // Restituisce la risposta dalla cache se presente, altrimenti dalla rete
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

**Caso d'uso ideale**: Contenuti che beneficiano di aggiornamenti frequenti ma che sono ancora utilizzabili se leggermente obsoleti, come articoli di blog, documentazione o interfacce utente.

### 4. Cache Only

Questa strategia utilizza esclusivamente la cache, senza mai accedere alla rete.

**Vantaggi**:
- Velocità massima di caricamento
- Nessun consumo di dati
- Funzionamento garantito offline

**Svantaggi**:
- Le risorse non vengono mai aggiornate automaticamente
- Richiede un meccanismo separato per aggiornare la cache

**Implementazione**:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});
```

**Caso d'uso ideale**: Risorse statiche che non cambiano mai, come font, icone o versioni specifiche di librerie.

### 5. Network Only

Questa strategia utilizza esclusivamente la rete, senza mai accedere alla cache.

**Vantaggi**:
- Garantisce contenuti sempre aggiornati
- Utile per richieste non cacheable

**Svantaggi**:
- Non funziona offline
- Tempi di caricamento più lunghi
- Maggiore consumo di dati

**Implementazione**:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

**Caso d'uso ideale**: Dati in tempo reale, analitiche, richieste di autenticazione o altre operazioni che richiedono sempre dati freschi.

## Strategie di caching avanzate

### 1. Cache, fallback a Network con timeout

Questa strategia controlla prima la cache e, se la risorsa non è presente, imposta un timeout per la richiesta di rete per evitare attese troppo lunghe.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Imposta un timeout per la richiesta di rete
      const networkPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('timeout')), 3000); // 3 secondi di timeout
        
        fetch(event.request).then(response => {
          // Clona e memorizza nella cache
          const responseToCache = response.clone();
          caches.open('my-cache-v1').then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          resolve(response);
        }).catch(reject);
      });
      
      return networkPromise;
    })
  );
});
```

### 2. Cache con aggiornamento periodico

Questa strategia utilizza la cache ma aggiorna periodicamente le risorse in background.

```javascript
// Nel Service Worker
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});

// Aggiornamento periodico della cache
self.addEventListener('sync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

function updateCache() {
  return caches.open('my-cache-v1').then(cache => {
    return fetch('/api/resources').then(response => {
      return response.json();
    }).then(resources => {
      const cachePromises = resources.map(resource => {
        return fetch(resource.url).then(response => {
          return cache.put(resource.url, response);
        });
      });
      
      return Promise.all(cachePromises);
    });
  });
}

// Nel JavaScript principale
navigator.serviceWorker.ready.then(registration => {
  registration.sync.register('update-cache');
});
```

## Implementazione di strategie di caching con Workbox

[Workbox](https://developers.google.com/web/tools/workbox) è una libreria di Google che semplifica l'implementazione delle strategie di caching nei Service Workers.

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  // Risorse statiche
  ({request}) => request.destination === 'style' ||
                request.destination === 'script' ||
                request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // API
  ({url}) => url.pathname.startsWith('/api/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-responses',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 1 giorno
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // Pagine HTML
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 25,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 settimana
      }),
    ],
  })
);
```

## Best Practices per le strategie di caching

1. **Scegli la strategia giusta per ogni tipo di risorsa**: Non esiste una strategia universale. Adatta la strategia al tipo di contenuto.

2. **Versioning della cache**: Utilizza un sistema di versioning per le cache per facilitare gli aggiornamenti.

```javascript
const CACHE_VERSION = 'v1';
const CACHE_NAME = `my-app-${CACHE_VERSION}`;
```

3. **Limita la dimensione della cache**: Imposta limiti di dimensione o scadenza per evitare di occupare troppo spazio di archiviazione.

4. **Fornisci una pagina offline**: Crea una pagina offline personalizzata per migliorare l'esperienza utente quando non c'è connessione.

5. **Monitora le prestazioni**: Utilizza strumenti come Lighthouse e Chrome DevTools per monitorare l'efficacia delle tue strategie di caching.

6. **Considera la freschezza dei dati**: Bilancia la necessità di prestazioni con quella di avere dati aggiornati.

7. **Implementa un meccanismo di aggiornamento**: Notifica agli utenti quando sono disponibili nuovi contenuti e offri un modo per aggiornare l'app.

## Conclusione

Le strategie di caching sono un elemento cruciale per creare Progressive Web Apps performanti e resilienti. Scegliendo le strategie appropriate per i diversi tipi di risorse e implementandole correttamente, puoi offrire agli utenti un'esperienza fluida e reattiva, anche in condizioni di rete scarse o assenti.