-# Service Workers

I Service Workers sono script che il browser esegue in background, separatamente dalla pagina web, permettendo di implementare funzionalità che non richiedono una pagina web o l'interazione dell'utente. Rappresentano la base tecnologica per caratteristiche avanzate come le applicazioni web offline, la sincronizzazione in background e le notifiche push.

## Introduzione ai Service Workers

Un Service Worker è essenzialmente un proxy programmabile che si posiziona tra l'applicazione web e la rete. Questo permette di intercettare e modificare le richieste di rete, gestire la cache in modo granulare e fornire esperienze offline.

```javascript
// Registrazione di un Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrato con successo:', registration.scope);
    })
    .catch(error => {
      console.error('Errore durante la registrazione del Service Worker:', error);
    });
}
```

## Ciclo di Vita

I Service Workers hanno un ciclo di vita ben definito, indipendente dalla pagina web:

1. **Registrazione**: La pagina web richiede la registrazione di un Service Worker
2. **Installazione**: Il browser scarica, analizza ed esegue il file
3. **Attivazione**: Il Service Worker diventa attivo e può controllare le pagine
4. **Inattività**: Quando non è in uso, può essere terminato per risparmiare memoria
5. **Aggiornamento**: Quando viene rilevata una nuova versione del Service Worker

```javascript
// Nel file service-worker.js

// Evento di installazione
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione in corso');
  
  // Precaching delle risorse essenziali
  event.waitUntil(
    caches.open('app-shell-v1').then(cache => {
      console.log('Service Worker: Apertura cache');
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png'
      ]);
    })
  );
});

// Evento di attivazione
self.addEventListener('activate', event => {
  console.log('Service Worker: Attivazione in corso');
  
  // Pulizia delle cache obsolete
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'app-shell-v1') {
            console.log('Service Worker: Eliminazione cache obsoleta', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Forza l'attivazione immediata
  return self.clients.claim();
});
```

## Intercettazione delle Richieste

Una delle funzionalità più potenti dei Service Workers è la capacità di intercettare e gestire le richieste di rete:

```javascript
// Evento fetch per intercettare le richieste
self.addEventListener('fetch', event => {
  console.log('Service Worker: Intercettazione richiesta per', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Restituisce la risorsa dalla cache se presente
        if (response) {
          console.log('Service Worker: Risorsa trovata in cache');
          return response;
        }
        
        // Altrimenti effettua la richiesta di rete
        console.log('Service Worker: Risorsa non in cache, recupero dalla rete');
        return fetch(event.request)
          .then(networkResponse => {
            // Verifica che la risposta sia valida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clona la risposta (perché può essere consumata solo una volta)
            const responseToCache = networkResponse.clone();
            
            // Aggiunge la risposta alla cache per usi futuri
            caches.open('dynamic-v1')
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return networkResponse;
          });
      })
      .catch(error => {
        console.error('Service Worker: Errore durante il recupero della risorsa', error);
        // Qui si potrebbe restituire una pagina di fallback dalla cache
      })
  );
});
```

## Strategie di Caching

Esistono diverse strategie per gestire la cache con i Service Workers:

### Cache First (Cache poi Rete)

Controlla prima la cache e, se la risorsa non è presente, la recupera dalla rete:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### Network First (Rete poi Cache)

Prova prima a recuperare la risorsa dalla rete e, in caso di fallimento, utilizza la versione in cache:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Aggiorna la cache con la nuova risposta
        const responseClone = response.clone();
        caches.open('dynamic-v1').then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
```

### Stale-While-Revalidate

Restituisce immediatamente la versione in cache (anche se potenzialmente obsoleta) mentre aggiorna la cache in background:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic-v1').then(cache => {
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

### Cache Only

Utilizza esclusivamente risorse dalla cache, utile per l'"app shell" (l'interfaccia di base):

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});
```

### Network Only

Utilizza esclusivamente la rete, utile per richieste che devono essere sempre aggiornate:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

## Comunicazione con la Pagina

I Service Workers possono comunicare con le pagine web tramite l'API MessageChannel:

```javascript
// Nella pagina web
navigator.serviceWorker.controller.postMessage({
  tipo: 'COMANDO',
  payload: { azione: 'AGGIORNA_DATI' }
});

// Ascolto delle risposte
navigator.serviceWorker.addEventListener('message', event => {
  console.log('Messaggio dal Service Worker:', event.data);
});

// Nel Service Worker
self.addEventListener('message', event => {
  console.log('Messaggio ricevuto dalla pagina:', event.data);
  
  // Risposta alla pagina
  event.source.postMessage({
    tipo: 'RISPOSTA',
    payload: { stato: 'COMPLETATO' }
  });
});
```

## Sincronizzazione in Background

L'API Background Sync permette di pianificare attività da eseguire quando l'utente ha una connessione stabile:

```javascript
// Nella pagina web
navigator.serviceWorker.ready.then(registration => {
  // Registra un evento di sincronizzazione
  return registration.sync.register('sincronizza-dati');
});

// Nel Service Worker
self.addEventListener('sync', event => {
  if (event.tag === 'sincronizza-dati') {
    event.waitUntil(
      // Recupera le richieste in sospeso da IndexedDB
      getUnsyncedRequests().then(requests => {
        return Promise.all(
          requests.map(request => {
            // Invia le richieste al server
            return fetch(request.url, {
              method: request.method,
              headers: request.headers,
              body: request.body
            }).then(() => {
              // Rimuovi la richiesta da IndexedDB
              return removeFromUnsyncedRequests(request.id);
            });
          })
        );
      })
    );
  }
});
```

## Notifiche Push

I Service Workers possono ricevere notifiche push dal server anche quando l'utente non ha la pagina aperta:

```javascript
// Nella pagina web: richiesta di permesso e sottoscrizione
function sottoscriviNotifiche() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        // Ottieni la chiave pubblica dal server
        return fetch('/api/push-key')
          .then(response => response.json())
          .then(data => {
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(data.publicKey)
            });
          })
          .then(subscription => {
            // Invia la sottoscrizione al server
            return fetch('/api/register-push', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscription)
            });
          });
      });
    }
  });
}

// Nel Service Worker: gestione degli eventi push
self.addEventListener('push', event => {
  console.log('Notifica push ricevuta');
  
  const dati = event.data.json();
  
  const opzioniNotifica = {
    body: dati.messaggio,
    icon: '/images/icon.png',
    badge: '/images/badge.png',
    data: { url: dati.url }
  };
  
  event.waitUntil(
    self.registration.showNotification(dati.titolo, opzioniNotifica)
  );
});

// Gestione del click sulla notifica
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

## Aggiornamento dei Service Workers

Quando viene pubblicata una nuova versione del Service Worker, il browser la scarica in background ma non la attiva immediatamente. La nuova versione rimane in stato "waiting" finché tutte le schede che utilizzano la vecchia versione non vengono chiuse.

Per forzare l'aggiornamento immediato:

```javascript
// Nel Service Worker
self.addEventListener('install', event => {
  // Forza l'attivazione immediata
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  // Prendi il controllo di tutte le pagine client
  event.waitUntil(self.clients.claim());
});

// Nella pagina web: controllo degli aggiornamenti
function controllaAggiornamenti() {
  navigator.serviceWorker.ready.then(registration => {
    registration.update();
  });
}

// Rilevamento di un nuovo Service Worker
navigator.serviceWorker.addEventListener('controllerchange', () => {
  console.log('Un nuovo Service Worker ha preso il controllo, ricarico la pagina');
  window.location.reload();
});
```

## Debugging

Il debugging dei Service Workers può essere effettuato tramite gli strumenti per sviluppatori dei browser moderni:

- Chrome: Apri DevTools > Application > Service Workers
- Firefox: Apri DevTools > Application > Service Workers

È possibile:
- Visualizzare i Service Workers registrati
- Forzare l'aggiornamento o la rimozione
- Simulare eventi offline
- Ispezionare la cache

## Limitazioni e Considerazioni

- I Service Workers funzionano solo su HTTPS (eccetto localhost per lo sviluppo)
- Non hanno accesso diretto al DOM
- Sono event-driven e possono essere terminati quando non in uso
- Non funzionano in modalità di navigazione in incognito in alcuni browser
- Hanno un supporto limitato in Safari (migliorato nelle versioni recenti)

## Best Practices

1. **Implementazione progressiva**: Verifica sempre il supporto prima di utilizzare i Service Workers
2. **Versioning della cache**: Utilizza nomi di cache con versioni per facilitare gli aggiornamenti
3. **Dimensione della cache**: Fai attenzione a non riempire lo storage del browser
4. **Fallback**: Fornisci sempre alternative per browser che non supportano i Service Workers
5. **Testing offline**: Testa regolarmente l'applicazione in modalità offline

## Conclusione

I Service Workers rappresentano una tecnologia fondamentale per lo sviluppo di Progressive Web Apps (PWA) e applicazioni web moderne. Offrono capacità precedentemente riservate alle applicazioni native, come il funzionamento offline, le notifiche push e l'aggiornamento in background, migliorando significativamente l'esperienza utente e le prestazioni delle applicazioni web.

[Torna all'indice](../README.md) | [Prossimo argomento: IndexedDB](./04_IndexedDB.md)