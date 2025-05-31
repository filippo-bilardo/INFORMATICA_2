# Lighthouse e Audit per PWA

Lighthouse è uno strumento open-source sviluppato da Google che permette di valutare la qualità delle pagine web e delle Progressive Web Apps (PWA). In questo capitolo, esploreremo come utilizzare Lighthouse per verificare e migliorare la conformità della tua PWA agli standard e alle best practices.

## Cos'è Lighthouse?

Lighthouse è uno strumento di audit automatizzato che analizza una pagina web sotto diversi aspetti:

- **Performance**: Velocità di caricamento e rendering
- **Accessibilità**: Conformità agli standard di accessibilità
- **Best Practices**: Aderenza alle best practices di sviluppo web
- **SEO**: Ottimizzazione per i motori di ricerca
- **Progressive Web App**: Conformità ai requisiti delle PWA

Lighthouse genera un report con punteggi per ciascuna categoria e suggerimenti specifici per migliorare l'applicazione.

## Come eseguire un audit con Lighthouse

### 1. Tramite Chrome DevTools

1. Apri Chrome DevTools (F12 o Ctrl+Shift+I)
2. Vai alla scheda "Lighthouse"
3. Seleziona le categorie da analizzare (assicurati che "Progressive Web App" sia selezionato)
4. Clicca su "Generate report"

### 2. Tramite CLI

Puoi installare Lighthouse come strumento da riga di comando:

```bash
npm install -g lighthouse
lighthouse https://mia-pwa.com --view
```

### 3. Tramite Node.js

Puoi integrare Lighthouse nei tuoi script di test:

```javascript
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port};
  const results = await lighthouse(url, options);
  await chrome.kill();
  return results;
}

runLighthouse('https://mia-pwa.com').then(results => {
  console.log('Punteggio PWA:', results.lhr.categories.pwa.score * 100);
});
```

## Criteri di audit per PWA

Lighthouse valuta le PWA in base a due categorie di criteri:

### 1. Criteri Fast and Reliable

- **Caricamento rapido su reti mobili**: La pagina carica abbastanza velocemente su reti 3G
- **Risposta con codice 200 offline**: La pagina risponde con un codice 200 anche offline
- **Registrazione di un Service Worker**: L'app registra un Service Worker
- **Reindirizzamento del traffico HTTPS**: Tutto il traffico è reindirizzato a HTTPS

### 2. Criteri Installable

- **Utilizzo di HTTPS**: Il sito è servito via HTTPS
- **Registrazione di un Service Worker**: L'app registra un Service Worker con un gestore fetch
- **Web App Manifest**: L'app ha un manifest.json con le proprietà richieste
- **Icone**: Il manifest include icone di dimensioni appropriate
- **Splash screen**: Il manifest ha le proprietà necessarie per generare una splash screen
- **Visualizzazione personalizzata**: Il manifest ha una proprietà `display` impostata su `standalone`, `fullscreen` o `minimal-ui`

## Interpretazione dei risultati di Lighthouse

Dopo aver eseguito un audit, Lighthouse genera un report dettagliato con:

1. **Punteggio complessivo**: Un valore da 0 a 100 per ciascuna categoria
2. **Audit superati e falliti**: Elenco di controlli con stato di superamento o fallimento
3. **Suggerimenti di miglioramento**: Consigli specifici per risolvere i problemi identificati
4. **Dettagli diagnostici**: Informazioni tecniche sui problemi riscontrati

## Risoluzione dei problemi comuni

### 1. "Il sito non risponde con un 200 quando offline"

Questo indica che il Service Worker non sta gestendo correttamente le richieste offline.

**Soluzione**:

```javascript
// Nel Service Worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Restituisce la risposta dalla cache se presente
        if (response) {
          return response;
        }
        
        // Se la risorsa non è nella cache e siamo offline, mostra la pagina offline
        return fetch(event.request)
          .catch(() => {
            return caches.match('/offline.html');
          });
      })
  );
});
```

### 2. "Il manifest non contiene icone di dimensioni adeguate"

**Soluzione**: Aggiungi icone di diverse dimensioni al manifest:

```json
{
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### 3. "Il Service Worker non intercetta le richieste di rete"

**Soluzione**: Assicurati che il Service Worker abbia un gestore `fetch`:

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

### 4. "Il sito non reindirizza il traffico HTTP a HTTPS"

**Soluzione**: Configura il server per reindirizzare tutto il traffico HTTP a HTTPS.

Per un server Apache, aggiungi al file `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Per Nginx:

```nginx
server {
  listen 80;
  server_name mia-pwa.com;
  return 301 https://$host$request_uri;
}
```

## Ottimizzazione del punteggio PWA

### 1. Implementa tutte le funzionalità richieste

- Service Worker con strategia di caching
- Web App Manifest completo
- Pagina offline
- HTTPS

### 2. Migliora le performance

- Ottimizza le immagini
- Minimizza CSS e JavaScript
- Utilizza la lazy loading per le immagini
- Implementa il code splitting

### 3. Segui le best practices

- Utilizza meta tag viewport appropriati
- Implementa la gestione degli errori
- Fornisci feedback visivi durante il caricamento

### 4. Testa su dispositivi reali

- Verifica l'esperienza su diversi dispositivi e browser
- Testa in condizioni di rete variabili
- Verifica l'esperienza di installazione

## Automazione degli audit

Puoi integrare Lighthouse nei tuoi processi di CI/CD per monitorare costantemente la qualità della tua PWA:

```javascript
// lighthouse-ci.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const {exec} = require('child_process');

async function runLighthouse() {
  // Avvia un server locale
  exec('npm run serve');
  
  // Attendi che il server sia pronto
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Esegui Lighthouse
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port};
  const results = await lighthouse('http://localhost:8080', options);
  
  // Termina Chrome e il server
  await chrome.kill();
  exec('killall node');
  
  // Verifica i punteggi
  const pwaScore = results.lhr.categories.pwa.score * 100;
  console.log('Punteggio PWA:', pwaScore);
  
  if (pwaScore < 90) {
    console.error('Il punteggio PWA è inferiore a 90. Build fallita.');
    process.exit(1);
  }
  
  console.log('Audit PWA superato!');
}

runLighthouse();
```

## Strumenti complementari a Lighthouse

### 1. PWA Builder

[PWA Builder](https://www.pwabuilder.com/) è uno strumento online che analizza il tuo sito web e genera automaticamente il manifest e il Service Worker necessari per trasformarlo in una PWA.

### 2. Workbox

[Workbox](https://developers.google.com/web/tools/workbox) è una libreria di Google che semplifica la creazione di Service Workers potenti e affidabili.

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst()
);
```

### 3. Chrome DevTools

La scheda "Application" di Chrome DevTools offre strumenti specifici per il debug di PWA:

- Gestione dei Service Workers
- Visualizzazione e modifica del manifest
- Simulazione offline
- Gestione della cache

## Conclusione

Lighthouse è uno strumento potente per valutare e migliorare la qualità delle tue Progressive Web Apps. Utilizzando regolarmente Lighthouse durante lo sviluppo, puoi identificare e risolvere i problemi prima del rilascio, garantendo che la tua PWA offra la migliore esperienza possibile agli utenti.

Ricorda che un buon punteggio Lighthouse non è solo un obiettivo tecnico, ma si traduce in un'esperienza utente migliore, maggiore engagement e conversioni più elevate. Investi tempo nell'ottimizzazione della tua PWA seguendo i suggerimenti di Lighthouse, e i tuoi utenti ti ringrazieranno con una maggiore fedeltà e soddisfazione.