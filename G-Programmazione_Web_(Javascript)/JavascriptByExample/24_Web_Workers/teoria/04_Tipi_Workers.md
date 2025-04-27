# Tipi di Workers

I Web Workers non sono tutti uguali. Esistono diversi tipi di workers, ognuno con caratteristiche e casi d'uso specifici. In questo capitolo, esploreremo i diversi tipi di workers disponibili in JavaScript.

## Dedicated Workers

I Dedicated Workers sono il tipo più comune e semplice di Web Workers. Sono associati a un singolo script e possono comunicare solo con il thread principale che li ha creati.

### Caratteristiche Principali

- Sono dedicati a una singola istanza della pagina
- Possono comunicare solo con il thread principale
- Vengono terminati quando la pagina viene chiusa
- Hanno un contesto di esecuzione isolato

### Creazione e Utilizzo

```javascript
// Nel thread principale
const worker = new Worker('worker.js');

worker.postMessage('Messaggio al worker');
worker.onmessage = function(event) {
  console.log('Messaggio ricevuto dal worker:', event.data);
};

// Nel file worker.js
onmessage = function(event) {
  console.log('Messaggio ricevuto dal thread principale:', event.data);
  postMessage('Risposta dal worker');
};
```

### Casi d'Uso

- Calcoli matematici complessi
- Elaborazione di dati
- Parsing di file di grandi dimensioni
- Operazioni intensive che non richiedono condivisione tra più schede

## Shared Workers

I Shared Workers possono essere condivisi tra più contesti di navigazione (finestre, schede, iframe) della stessa origine. Questo li rende utili per condividere risorse e coordinare attività tra diverse parti di un'applicazione.

### Caratteristiche Principali

- Possono essere condivisi tra più finestre, schede o iframe della stessa origine
- Rimangono attivi finché esiste almeno una connessione
- Utilizzano un sistema di porte per la comunicazione
- Consentono la comunicazione tra diverse istanze dell'applicazione

### Creazione e Utilizzo

```javascript
// Nel thread principale (può essere in diverse finestre/schede)
const sharedWorker = new SharedWorker('shared-worker.js');

// La comunicazione avviene attraverso la porta
sharedWorker.port.start();
sharedWorker.port.postMessage('Messaggio al shared worker');
sharedWorker.port.onmessage = function(event) {
  console.log('Messaggio ricevuto dal shared worker:', event.data);
};

// Nel file shared-worker.js
const connessioni = [];

// L'evento connect viene attivato quando una nuova connessione viene stabilita
onconnect = function(event) {
  const porta = event.ports[0];
  connessioni.push(porta);
  
  porta.start();
  
  porta.onmessage = function(e) {
    console.log('Shared Worker ha ricevuto:', e.data);
    
    // Invia un messaggio a tutte le connessioni
    connessioni.forEach(p => {
      p.postMessage('Broadcast: ' + e.data);
    });
  };
};
```

### Casi d'Uso

- Sincronizzazione di dati tra diverse schede
- Chat e sistemi di messaggistica
- Notifiche in tempo reale
- Condivisione di risorse costose (come connessioni WebSocket)
- Cache condivisa tra diverse parti dell'applicazione

## Service Workers

I Service Workers sono un tipo speciale di worker che agisce come proxy di rete tra l'applicazione web e il server. Sono progettati principalmente per migliorare l'esperienza offline e le prestazioni.

### Caratteristiche Principali

- Funzionano come proxy di rete
- Possono intercettare e modificare le richieste di rete
- Continuano a esistere anche dopo la chiusura della pagina
- Hanno un ciclo di vita complesso (installazione, attivazione, ecc.)
- Non hanno accesso diretto al DOM
- Sono event-driven e possono essere risvegliati da eventi come push notifications

### Creazione e Utilizzo Base

```javascript
// Nel thread principale
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrato con successo:', registration.scope);
    })
    .catch(error => {
      console.error('Registrazione Service Worker fallita:', error);
    });
}

// Nel file service-worker.js
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione');
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/immagini/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Restituisce la risorsa dalla cache se disponibile, altrimenti fa la richiesta di rete
      return response || fetch(event.request);
    })
  );
});
```

### Casi d'Uso

- Applicazioni web offline
- Caching di risorse
- Strategie di rete avanzate
- Push notifications
- Sincronizzazione in background

## Worklet

I Worklet sono una versione leggera dei workers, progettati per compiti specifici legati al rendering e all'audio. Sono ottimizzati per essere eseguiti in punti specifici della pipeline di rendering o audio.

### Tipi di Worklet

1. **PaintWorklet**: Consente di programmare effetti di pittura personalizzati in CSS
2. **AudioWorklet**: Permette l'elaborazione audio personalizzata di bassa latenza
3. **LayoutWorklet**: (Sperimentale) Consente layout personalizzati
4. **AnimationWorklet**: (Sperimentale) Permette animazioni personalizzate ad alte prestazioni

### Esempio di PaintWorklet

```javascript
// Nel thread principale
CSS.paintWorklet.addModule('paint-worklet.js');

// Nel CSS
.elemento {
  background-image: paint(cerchiColorati);
}

// Nel file paint-worklet.js
registerPaint('cerchiColorati', class {
  static get inputProperties() {
    return ['--circle-color'];
  }
  
  paint(ctx, size, properties) {
    const color = properties.get('--circle-color').toString() || 'blue';
    
    const raggio = Math.min(size.width, size.height) / 4;
    const centerX = size.width / 2;
    const centerY = size.height / 2;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, raggio, 0, 2 * Math.PI);
    ctx.fill();
  }
});
```

### Casi d'Uso

- Effetti grafici personalizzati
- Elaborazione audio in tempo reale
- Animazioni complesse ad alte prestazioni
- Layout personalizzati

## Chrome Workers (Solo Firefox)

I Chrome Workers sono specifici di Firefox e consentono l'accesso a funzionalità privilegiate del browser. Sono utilizzati principalmente per lo sviluppo di estensioni e componenti interni del browser.

## Confronto tra i Diversi Tipi di Workers

| Caratteristica | Dedicated Worker | Shared Worker | Service Worker | Worklet |
|----------------|------------------|---------------|----------------|--------|
| **Condivisione** | Una sola pagina | Più pagine della stessa origine | Tutta l'origine | Specifico per rendering/audio |
| **Ciclo di vita** | Legato alla pagina | Attivo finché c'è una connessione | Può sopravvivere alla chiusura della pagina | Legato al contesto di rendering |
| **Accesso al DOM** | No | No | No | No |
| **Uso principale** | Calcoli intensivi | Condivisione dati tra pagine | Offline e cache | Rendering personalizzato |
| **Comunicazione** | postMessage | porte | eventi | API specifiche |
| **Persistenza** | No | No | Sì | No |

## Scegliere il Tipo di Worker Giusto

La scelta del tipo di worker dipende dalle esigenze specifiche dell'applicazione:

- **Dedicated Worker**: Per operazioni intensive che riguardano solo la pagina corrente
- **Shared Worker**: Quando è necessario condividere dati o logica tra diverse schede o finestre
- **Service Worker**: Per funzionalità offline, caching e intercettazione delle richieste di rete
- **Worklet**: Per personalizzazioni di rendering o audio ad alte prestazioni

## Navigazione tra i Capitoli

- [Precedente: Comunicazione con i Workers](./03_Comunicazione_Workers.md)
- [Successivo: Pattern e Best Practices](./05_Pattern_Best_Practices.md)
- [Torna all'indice](../README.md)