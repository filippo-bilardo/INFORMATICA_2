# Service Workers per PWA

I Service Workers sono uno dei componenti fondamentali delle Progressive Web Apps (PWA), che consentono di implementare funzionalità offline, migliorare le prestazioni e offrire un'esperienza utente simile a quella delle app native.

## Cosa sono i Service Workers?

Un Service Worker è uno script JavaScript che il browser esegue in background, separatamente dalla pagina web, permettendo di intercettare e gestire le richieste di rete, memorizzare risorse nella cache e fornire esperienze offline.

I Service Workers agiscono come proxy di rete tra l'applicazione web e il server, consentendo di controllare come vengono gestite le richieste di rete anche quando l'utente non è connesso a Internet.

## Caratteristiche principali dei Service Workers

- **Esecuzione in background**: Funzionano indipendentemente dalla pagina web.
- **Programmabili**: Permettono di definire come gestire le richieste di rete.
- **Utilizzo di promesse**: Basati su JavaScript asincrono e Promises.
- **HTTPS obbligatorio**: Funzionano solo su connessioni sicure (eccetto localhost).
- **Ciclo di vita indipendente**: Possono essere attivi anche quando la pagina è chiusa.

## Ciclo di vita di un Service Worker

1. **Registrazione**: L'applicazione registra il Service Worker.
2. **Installazione**: Il browser installa il Service Worker e attiva l'evento `install`.
3. **Attivazione**: Dopo l'installazione, il Service Worker viene attivato con l'evento `activate`.
4. **Idle**: Il Service Worker rimane in attesa di eventi.
5. **Fetch/Message**: Gestisce le richieste di rete o i messaggi.
6. **Terminazione**: Il browser può terminare il Service Worker quando non è in uso.

## Implementazione di un Service Worker di base

### 1. Registrazione del Service Worker

Nel file JavaScript principale dell'applicazione:

```javascript
// Verifica se il browser supporta i Service Workers
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
```

### 2. Creazione del file Service Worker (sw.js)

```javascript
// Nome della cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Risorse da memorizzare nella cache durante l'installazione
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/images/logo.png'
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
        });
      })
  );
});
```

## Strategie di caching per Service Workers

### 1. Cache First (Cache poi Network)

Controlla prima la cache e, se la risorsa non è presente, la recupera dalla rete.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

### 2. Network First (Network poi Cache)

Prova prima a recuperare la risorsa dalla rete e, in caso di fallimento, utilizza la cache.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
```

### 3. Stale-While-Revalidate

Restituisce la versione in cache mentre aggiorna la cache con la risposta di rete.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
```

### 4. Cache Only

Utilizza solo la cache, senza mai accedere alla rete.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});
```

### 5. Network Only

Utilizza solo la rete, senza mai accedere alla cache.

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

## Funzionalità avanzate dei Service Workers

### 1. Sincronizzazione in background

```javascript
// Nel file JavaScript principale
navigator.serviceWorker.ready.then(registration => {
  return registration.sync.register('mySync');
});

// Nel Service Worker
self.addEventListener('sync', event => {
  if (event.tag === 'mySync') {
    event.waitUntil(sincronizzaDati());
  }
});

function sincronizzaDati() {
  // Logica per sincronizzare i dati quando la connessione è disponibile
}
```

### 2. Notifiche Push

```javascript
// Nel file JavaScript principale
navigator.serviceWorker.ready.then(registration => {
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('chiave-pubblica-server')
  });
});

// Nel Service Worker
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/images/icon.png',
    badge: '/images/badge.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
```

## Debugging dei Service Workers

1. **Chrome DevTools**: Utilizza la scheda "Application" > "Service Workers" per visualizzare, aggiornare e debuggare i Service Workers.
2. **Lighthouse**: Esegui un audit PWA per verificare la corretta implementazione dei Service Workers.
3. **Modalità offline**: Testa l'applicazione in modalità offline utilizzando la casella "Offline" nei DevTools.

## Best Practices

1. **Versioning della cache**: Utilizza un sistema di versioning per le cache per facilitare gli aggiornamenti.
2. **Precaching selettivo**: Memorizza nella cache solo le risorse essenziali durante l'installazione.
3. **Gestione degli errori**: Implementa una gestione robusta degli errori per le richieste di rete fallite.
4. **Pagina offline**: Fornisci una pagina offline personalizzata quando l'utente non è connesso.
5. **Aggiornamenti**: Implementa un meccanismo per notificare agli utenti quando è disponibile un aggiornamento.

## Conclusione

I Service Workers sono una tecnologia potente che consente di trasformare un sito web in una Progressive Web App con funzionalità offline e prestazioni migliorate. Implementando correttamente i Service Workers, puoi offrire agli utenti un'esperienza simile a quella delle app native, anche in condizioni di rete scarse o assenti.