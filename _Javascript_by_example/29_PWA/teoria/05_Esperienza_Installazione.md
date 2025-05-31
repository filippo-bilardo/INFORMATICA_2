# Esperienza di Installazione delle PWA

Una delle caratteristiche più potenti delle Progressive Web Apps (PWA) è la possibilità di essere installate sui dispositivi degli utenti, offrendo un'esperienza simile a quella delle app native. In questo capitolo, esploreremo come implementare e ottimizzare l'esperienza di installazione delle PWA.

## Vantaggi dell'installazione di una PWA

- **Accesso rapido**: Icona sulla schermata home o nel menu di avvio
- **Esperienza a schermo intero**: Senza l'interfaccia del browser
- **Maggiore engagement**: Gli utenti interagiscono di più con le app installate
- **Integrazione con il sistema**: Aspetto nativo e accesso alle funzionalità del sistema
- **Avvio offline**: Possibilità di avviare l'app anche senza connessione

## Requisiti per l'installabilità

Affinché una PWA sia installabile, deve soddisfare i seguenti requisiti di base:

1. **Web App Manifest**: Un file manifest.json valido con le proprietà richieste
2. **Service Worker**: Un Service Worker registrato e attivo
3. **HTTPS**: L'applicazione deve essere servita tramite HTTPS
4. **Icone**: Icone di dimensioni appropriate specificate nel manifest
5. **Criteri specifici per piattaforma**: Requisiti aggiuntivi per iOS, Android, Windows, ecc.

### Requisiti specifici per browser

#### Chrome/Edge/Android

- Web App Manifest con almeno:
  - `name` o `short_name`
  - `icons` (almeno un'icona 192x192px e una 512x512px)
  - `start_url`
  - `display` (preferibilmente `standalone` o `fullscreen`)
- Service Worker registrato
- Servita via HTTPS
- L'utente deve interagire con il sito per almeno 30 secondi

#### Safari/iOS

- Web App Manifest (supporto parziale)
- Meta tag specifici per iOS:
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style`
  - `apple-mobile-web-app-title`
  - `apple-touch-icon`
- Servita via HTTPS

## Implementazione dell'esperienza di installazione

### 1. Rilevamento dell'installabilità

Puoi rilevare se la tua PWA è installabile utilizzando l'evento `beforeinstallprompt`:

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Impedisce la visualizzazione automatica del prompt
  e.preventDefault();
  
  // Salva l'evento per mostrarlo in seguito
  deferredPrompt = e;
  
  // Mostra un elemento UI per indicare che l'app è installabile
  showInstallPromotion();
});
```

### 2. Mostrare un prompt di installazione personalizzato

Invece di affidarti al prompt di installazione nativo del browser, puoi creare un'esperienza personalizzata:

```javascript
// Funzione per mostrare un banner di promozione
function showInstallPromotion() {
  const installBanner = document.getElementById('install-banner');
  installBanner.style.display = 'block';
  
  const installButton = document.getElementById('install-button');
  installButton.addEventListener('click', installApp);
}

// Funzione per avviare l'installazione
async function installApp() {
  if (!deferredPrompt) {
    return;
  }
  
  // Mostra il prompt di installazione
  deferredPrompt.prompt();
  
  // Attende la scelta dell'utente
  const { outcome } = await deferredPrompt.userChoice;
  
  // Registra il risultato
  console.log(`Risultato installazione: ${outcome}`);
  
  // Resetta la variabile deferredPrompt
  deferredPrompt = null;
  
  // Nascondi il banner di promozione
  document.getElementById('install-banner').style.display = 'none';
}
```

### 3. Rilevamento dell'installazione completata

Puoi rilevare quando l'utente ha installato la tua PWA utilizzando l'evento `appinstalled`:

```javascript
window.addEventListener('appinstalled', (event) => {
  // Nascondi qualsiasi UI di promozione dell'installazione
  document.getElementById('install-banner').style.display = 'none';
  
  // Registra l'installazione
  console.log('PWA installata con successo');
  
  // Puoi anche inviare un evento di analytics
  sendAnalyticsEvent('pwa-installed');
});
```

### 4. Rilevamento se l'app è già installata

Puoi verificare se la tua PWA è già installata utilizzando `display-mode`:

```javascript
function isPWAInstalled() {
  // Verifica se l'app è in modalità standalone o fullscreen
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true) {
    return true;
  }
  return false;
}

// Utilizzo
if (isPWAInstalled()) {
  // L'app è già installata, nascondi i prompt di installazione
  hideInstallPromotion();
} else {
  // L'app non è installata, mostra i prompt quando appropriato
}
```

## Best Practices per l'esperienza di installazione

### 1. Non essere invadente

Non mostrare immediatamente il prompt di installazione. Attendi che l'utente abbia interagito con il tuo sito e abbia compreso il valore che offri.

### 2. Scegli il momento giusto

Mostra il prompt di installazione in momenti strategici, come:
- Dopo il completamento di un'azione importante
- Quando l'utente ha mostrato interesse (ad esempio, visitando più pagine)
- Dopo un certo tempo di interazione con il sito

### 3. Spiega i vantaggi

Comunica chiaramente i vantaggi dell'installazione della PWA:

```html
<div id="install-banner" style="display: none;">
  <h3>Installa la nostra app!</h3>
  <p>Installa questa applicazione sul tuo dispositivo per:</p>
  <ul>
    <li>Accesso rapido dalla schermata home</li>
    <li>Funzionamento offline</li>
    <li>Esperienza a schermo intero</li>
  </ul>
  <button id="install-button">Installa ora</button>
  <button id="dismiss-button">Non ora</button>
</div>
```

### 4. Offri multiple opportunità

Se l'utente rifiuta l'installazione, non insistere immediatamente. Offri nuove opportunità in momenti diversi dell'esperienza utente.

### 5. Personalizza l'esperienza post-installazione

Riconosci quando l'utente ha installato la tua PWA e personalizza l'esperienza di conseguenza:

```javascript
if (isPWAInstalled()) {
  // Nascondi elementi ridondanti (come link per scaricare l'app)
  document.querySelectorAll('.app-download-link').forEach(el => {
    el.style.display = 'none';
  });
  
  // Mostra funzionalità specifiche per l'app installata
  document.querySelectorAll('.installed-app-feature').forEach(el => {
    el.style.display = 'block';
  });
}
```

## Implementazione per diverse piattaforme

### iOS/Safari

Safari non supporta completamente il prompt di installazione automatico. È necessario guidare manualmente gli utenti:

```html
<div id="ios-install-banner" class="ios-only">
  <h3>Installa questa app sul tuo iPhone</h3>
  <p>Tocca <img src="share-icon.png" alt="Icona condividi"> e poi "Aggiungi a Home"</p>
</div>

<script>
// Mostra il banner solo su iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !isPWAInstalled()) {
  document.getElementById('ios-install-banner').style.display = 'block';
}
</script>
```

### Desktop (Chrome, Edge, Firefox)

Sui browser desktop, puoi utilizzare l'icona nella barra degli indirizzi o un prompt personalizzato:

```javascript
// Verifica se è un dispositivo desktop
const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

if (isDesktop && deferredPrompt) {
  // Mostra un prompt che indica di utilizzare l'icona nella barra degli indirizzi
  showDesktopInstallHint();
}

function showDesktopInstallHint() {
  const desktopHint = document.createElement('div');
  desktopHint.innerHTML = `
    <div class="install-hint">
      <p>Installa questa app cliccando sull'icona <img src="install-icon.png" alt="Installa"> nella barra degli indirizzi</p>
      <button id="hint-dismiss">Chiudi</button>
    </div>
  `;
  document.body.appendChild(desktopHint);
  
  document.getElementById('hint-dismiss').addEventListener('click', () => {
    desktopHint.remove();
  });
}
```

## Misurazione e analisi

È importante monitorare l'efficacia della tua strategia di installazione:

```javascript
// Traccia quando viene mostrato il prompt
function trackInstallPromptShown() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install_prompt_shown');
  }
}

// Traccia quando l'utente accetta l'installazione
function trackInstallAccepted() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install_accepted');
  }
}

// Traccia quando l'utente rifiuta l'installazione
function trackInstallRejected() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install_rejected');
  }
}

// Utilizzo con il prompt di installazione
async function installApp() {
  if (!deferredPrompt) return;
  
  trackInstallPromptShown();
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    trackInstallAccepted();
  } else {
    trackInstallRejected();
  }
  
  deferredPrompt = null;
}
```

## Conclusione

L'esperienza di installazione è un aspetto cruciale delle Progressive Web Apps che può aumentare significativamente l'engagement degli utenti. Implementando un'esperienza di installazione ben progettata e non invasiva, puoi aumentare le probabilità che gli utenti installino la tua PWA e continuino a utilizzarla nel tempo.

Ricorda che l'obiettivo non è semplicemente ottenere l'installazione, ma offrire un valore reale che giustifichi lo spazio che la tua app occuperà sul dispositivo dell'utente. Concentrati prima sul fornire un'esperienza utente eccellente, e l'installazione diventerà una naturale estensione di quel valore.