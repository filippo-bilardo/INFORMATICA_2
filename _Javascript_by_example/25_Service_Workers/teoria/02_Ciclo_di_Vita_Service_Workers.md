# Ciclo di Vita dei Service Workers

Comprendere il ciclo di vita dei Service Workers è fondamentale per utilizzarli correttamente nelle applicazioni web. A differenza di altri script, i Service Workers seguono un ciclo di vita ben definito che determina quando e come possono interagire con l'applicazione.

## Fasi del ciclo di vita

### 1. Registrazione

Il primo passo è la registrazione del Service Worker. Questo avviene quando l'applicazione richiede al browser di installare e tenere traccia del Service Worker per un determinato ambito (scope).

```javascript
// Registrazione di un Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(registration => {
      console.log('Service Worker registrato con successo:', registration.scope);
    })
    .catch(error => {
      console.error('Errore durante la registrazione del Service Worker:', error);
    });
}
```

Il parametro `scope` è opzionale e definisce l'ambito di controllo del Service Worker. Se non specificato, il valore predefinito è la directory che contiene il file del Service Worker.

### 2. Download

Dopo la registrazione, il browser scarica il file del Service Worker. Questo avviene in background e non blocca il caricamento della pagina.

### 3. Installazione

Una volta scaricato, il browser tenta di installare il Service Worker. Durante questa fase, viene attivato l'evento `install`, che è il momento ideale per precaricare le risorse nella cache.

```javascript
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
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
```

Il metodo `event.waitUntil()` estende l'evento di installazione fino al completamento della Promise passata, assicurando che il Service Worker non proceda alla fase successiva finché la cache non è stata popolata.

### 4. Attivazione

Dopo l'installazione, il Service Worker entra in uno stato di attesa o viene attivato immediatamente. L'attivazione può essere ritardata se esiste già un Service Worker attivo che controlla le pagine aperte.

L'evento `activate` è il momento ideale per pulire le risorse obsolete, come le vecchie cache.

```javascript
self.addEventListener('activate', event => {
  const cacheWhitelist = ['v2']; // Mantieni solo la cache più recente

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina le cache obsolete
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 5. Controllo delle pagine

Una volta attivato, il Service Worker può iniziare a controllare le pagine, ma solo quelle caricate dopo l'attivazione. Per forzare un Service Worker appena installato a prendere il controllo immediato, è possibile utilizzare `self.skipWaiting()` durante l'installazione e `clients.claim()` durante l'attivazione.

```javascript
self.addEventListener('install', event => {
  // Forza l'attivazione immediata
  self.skipWaiting();
  
  // Altre operazioni di installazione...
});

self.addEventListener('activate', event => {
  // Prendi il controllo di tutte le pagine aperte
  event.waitUntil(clients.claim());
  
  // Altre operazioni di attivazione...
});
```

### 6. Idle e Terminazione

Quando non è in uso, il Service Worker entra in uno stato di idle (inattività) e può essere terminato dal browser per risparmiare risorse. Questo non è un problema, poiché il Service Worker verrà riattivato quando necessario, ad esempio quando si verifica un evento di rete.

### 7. Aggiornamento

I browser controllano periodicamente se il file del Service Worker è cambiato. Se viene rilevata una modifica (anche di un solo byte), il nuovo Service Worker viene scaricato e installato in parallelo al vecchio, entrando nello stato di attesa.

Il nuovo Service Worker non prenderà il controllo finché tutte le pagine che utilizzano il vecchio Service Worker non vengono chiuse o aggiornate, a meno che non si utilizzi `skipWaiting()` e `clients.claim()`.

## Gestione degli aggiornamenti

È importante gestire correttamente gli aggiornamenti dei Service Workers per evitare problemi di compatibilità e garantire una transizione fluida.

```javascript
// Nel file principale dell'applicazione
let refreshing = false;

// Ascolta l'evento di aggiornamento del Service Worker
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (!refreshing) {
    refreshing = true;
    window.location.reload(); // Ricarica la pagina per utilizzare il nuovo Service Worker
  }
});
```

## Debug del ciclo di vita

Per il debug del ciclo di vita dei Service Workers, è possibile utilizzare gli strumenti per sviluppatori dei browser moderni:

- Chrome: Aprire DevTools > Application > Service Workers
- Firefox: Aprire DevTools > Application > Service Workers
- Edge: Aprire DevTools > Application > Service Workers

Questi strumenti permettono di visualizzare lo stato dei Service Workers, forzare l'aggiornamento, saltare la fase di attesa e molto altro.

## Conclusione

Il ciclo di vita dei Service Workers è progettato per garantire un'esperienza utente coerente e sicura. Comprendere le diverse fasi e come gestirle correttamente è essenziale per sviluppare applicazioni web robuste che funzionano anche offline.

Nel prossimo capitolo, esploreremo in dettaglio la Cache API e come utilizzarla efficacemente con i Service Workers per implementare strategie di caching avanzate.

[Torna all'indice](../README.md) | [Capitolo precedente: Introduzione ai Service Workers](./01_Introduzione_Service_Workers.md) | [Prossimo capitolo: Cache API](./03_Cache_API.md)