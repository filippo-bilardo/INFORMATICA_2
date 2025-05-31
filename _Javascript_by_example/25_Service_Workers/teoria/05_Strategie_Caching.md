# Strategie di Caching con Service Workers

Le strategie di caching sono fondamentali per ottimizzare le prestazioni delle applicazioni web e fornire un'esperienza utente fluida anche in condizioni di rete instabile o assente. In questo capitolo, esploreremo le diverse strategie di caching che possono essere implementate utilizzando i Service Workers.

## Perché le Strategie di Caching sono Importanti

Non esiste una strategia di caching universale adatta a tutti i tipi di risorse. Ogni applicazione web ha esigenze diverse e richiede un approccio personalizzato. La scelta della strategia di caching dipende da diversi fattori:

- Tipo di risorsa (HTML, CSS, JavaScript, immagini, API, ecc.)
- Frequenza di aggiornamento dei contenuti
- Importanza della freschezza dei dati
- Requisiti di funzionalità offline
- Consumo di banda e prestazioni

## Principali Strategie di Caching

### 1. Cache First (Cache con Fallback alla Rete)

Questa strategia verifica prima la cache e, solo se la risorsa non è presente, effettua una richiesta di rete. È ideale per risorse statiche che cambiano raramente, come font, immagini e librerie JavaScript.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Restituisci la risorsa dalla cache se presente
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Altrimenti, effettua una richiesta di rete
        return fetch(event.request)
          .then(response => {
            // Clona la risposta perché può essere consumata solo una volta
            const responseToCache = response.clone();
            
            // Aggiungi la risposta alla cache per usi futuri
            caches.open('v1').then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return response;
          });
      })
  );
});
```

### 2. Network First (Rete con Fallback alla Cache)

Questa strategia tenta prima di recuperare la risorsa dalla rete e, solo in caso di fallimento, utilizza la versione in cache. È ideale per contenuti che cambiano frequentemente ma per i quali è comunque accettabile mostrare una versione meno recente in caso di problemi di rete.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clona la risposta per memorizzarla nella cache
        const responseToCache = response.clone();
        
        caches.open('v1').then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // In caso di errore di rete, prova a recuperare dalla cache
        return caches.match(event.request);
      })
  );
});
```

### 3. Stale-While-Revalidate

Questa strategia restituisce immediatamente la versione in cache (se disponibile) e contemporaneamente aggiorna la cache con una nuova richiesta di rete. È un ottimo compromesso tra velocità e freschezza dei contenuti.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('v1').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // Avvia una richiesta di rete per aggiornare la cache
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        
        // Restituisci la risposta dalla cache se disponibile, altrimenti aspetta la rete
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

### 4. Cache Only

Questa strategia serve le risorse esclusivamente dalla cache, senza mai effettuare richieste di rete. È utile per risorse che sono state precachiate durante l'installazione del Service Worker e che non cambiano mai.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
  );
});
```

### 5. Network Only

Questa strategia ignora completamente la cache e serve le risorse sempre dalla rete. È utile per richieste che devono sempre essere fresche, come transazioni finanziarie o dati in tempo reale.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
  );
});
```

## Strategie Avanzate

### Strategie Basate sul Tipo di Risorsa

È possibile applicare diverse strategie di caching in base al tipo di risorsa richiesta:

```javascript
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Strategia diversa per le richieste API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Strategia diversa per le immagini
  if (event.request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }
  
  // Strategia predefinita per tutto il resto
  event.respondWith(staleWhileRevalidateStrategy(event.request));
});

// Implementazioni delle strategie
function networkFirstStrategy(request) { /* ... */ }
function cacheFirstStrategy(request) { /* ... */ }
function staleWhileRevalidateStrategy(request) { /* ... */ }
```

### Strategie con Timeout

È possibile implementare strategie con timeout per evitare attese troppo lunghe in caso di rete lenta:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    Promise.race([
      // Timeout dopo 3 secondi
      new Promise(resolve => {
        setTimeout(() => {
          caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) resolve(cachedResponse);
          });
        }, 3000);
      }),
      
      // Richiesta di rete
      fetch(event.request).then(response => {
        // Clona e memorizza nella cache
        const responseToCache = response.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
    ])
  );
});
```

## Implementazione con Workbox

[Workbox](https://developers.google.com/web/tools/workbox) è una libreria che semplifica l'implementazione delle strategie di caching nei Service Workers. Ecco alcuni esempi:

### Cache First con Workbox

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
      }),
    ],
  })
);
```

### Stale-While-Revalidate con Workbox

```javascript
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/articles'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-responses',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
```

## Best Practices per il Caching

1. **Versiona le cache**: Utilizza nomi di cache diversi per versioni diverse dell'applicazione per facilitare gli aggiornamenti.

2. **Pulisci le cache obsolete**: Durante l'attivazione del Service Worker, rimuovi le cache che non sono più necessarie.

3. **Imposta limiti di dimensione e scadenza**: Utilizza plugin come `ExpirationPlugin` di Workbox per evitare che la cache diventi troppo grande o contenga risorse troppo vecchie.

4. **Considera la variabilità delle risorse**: Fai attenzione alle risorse che variano in base a cookie, intestazioni o altri parametri.

5. **Testa in modalità offline**: Verifica sempre il comportamento dell'applicazione in modalità offline per assicurarti che le strategie di caching funzionino come previsto.

## Conclusione

Le strategie di caching sono un elemento cruciale per ottimizzare le prestazioni e la resilienza delle applicazioni web moderne. La scelta della strategia giusta per ogni tipo di risorsa può fare la differenza tra un'esperienza utente eccellente e una mediocre, soprattutto in condizioni di rete non ottimali.

Nel prossimo capitolo, esploreremo come implementare notifiche push utilizzando i Service Workers, un'altra potente funzionalità che permette di mantenere gli utenti coinvolti anche quando non stanno attivamente utilizzando l'applicazione.

[Torna all'indice](../README.md) | [Capitolo precedente: Funzionalità Offline](./04_Funzionalita_Offline.md) | [Prossimo capitolo: Notifiche Push](./06_Notifiche_Push.md)