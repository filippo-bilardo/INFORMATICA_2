# Eventi del Browser in JavaScript

Il browser genera una vasta gamma di eventi durante la sua operatività, dalla navigazione al caricamento delle pagine, dal ridimensionamento della finestra all'interazione con i media. Comprendere questi eventi è fondamentale per creare applicazioni web reattive e per ottimizzare l'esperienza utente.

## Eventi del Ciclo di Vita della Pagina

Questi eventi si verificano durante il caricamento, la visualizzazione e lo scaricamento di una pagina web.

### DOMContentLoaded

L'evento `DOMContentLoaded` si attiva quando il documento HTML è stato completamente caricato e analizzato, senza attendere il caricamento di fogli di stile, immagini e sottoframe.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM completamente caricato e analizzato');
  // Inizializzazione dell'applicazione
  initApp();
});
```

Questo evento è ideale per eseguire script che necessitano solo della struttura DOM, senza dover attendere il caricamento completo di tutte le risorse.

### load

L'evento `load` si attiva quando l'intera pagina, incluse tutte le risorse dipendenti (immagini, script, CSS), è stata completamente caricata.

```javascript
window.addEventListener('load', function() {
  console.log('Pagina completamente caricata');
  // Operazioni che richiedono il caricamento completo di tutte le risorse
  hideLoadingIndicator();
});
```

### beforeunload

L'evento `beforeunload` si attiva quando l'utente sta per lasciare la pagina (chiudendo la finestra, navigando altrove, ecc.). Può essere utilizzato per mostrare una conferma prima di abbandonare la pagina.

```javascript
window.addEventListener('beforeunload', function(event) {
  // Verifica se ci sono modifiche non salvate
  if (hasUnsavedChanges()) {
    // Messaggio standard mostrato dal browser
    event.preventDefault();
    event.returnValue = '';
    // Nota: i browser moderni ignorano messaggi personalizzati per motivi di sicurezza
  }
});
```

### unload

L'evento `unload` si attiva quando la pagina sta per essere scaricata, ad esempio quando l'utente naviga ad un'altra pagina o chiude la finestra.

```javascript
window.addEventListener('unload', function() {
  // Pulizia finale, invio di dati analitici, ecc.
  saveUserSession();
});
```

**Nota**: L'uso di `unload` è sconsigliato per operazioni critiche, poiché non è garantito che venga eseguito in tutti i casi (es. crash del browser, chiusura forzata).

## Eventi della Finestra del Browser

Questi eventi sono relativi alla finestra del browser e alle sue proprietà.

### resize

L'evento `resize` si attiva quando la finestra del browser viene ridimensionata.

```javascript
window.addEventListener('resize', function() {
  console.log(`Nuove dimensioni: ${window.innerWidth}x${window.innerHeight}`);
  // Adattamento del layout
  adjustLayout();
});
```

**Best Practice**: Utilizzare la throttling o debouncing per limitare la frequenza di esecuzione del gestore durante il ridimensionamento continuo.

```javascript
// Debouncing dell'evento resize
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    console.log(`Dimensioni finali: ${window.innerWidth}x${window.innerHeight}`);
    adjustLayout();
  }, 250); // Esegue solo 250ms dopo l'ultimo evento resize
});
```

### scroll

L'evento `scroll` si attiva quando l'utente scorre la pagina o un elemento con overflow.

```javascript
// Scroll della finestra
window.addEventListener('scroll', function() {
  console.log(`Posizione di scroll: ${window.scrollX}, ${window.scrollY}`);
  
  // Esempio: mostra/nascondi header in base alla direzione di scroll
  handleHeaderVisibility();
});

// Scroll di un elemento specifico
document.querySelector('.scrollable-container').addEventListener('scroll', function(event) {
  console.log(`Elemento scrollato: ${event.target.scrollTop}`);
});
```

**Best Practice**: Come per `resize`, è consigliabile utilizzare tecniche di throttling o debouncing per migliorare le prestazioni.

```javascript
// Throttling dell'evento scroll
let lastScrollTime = 0;
window.addEventListener('scroll', function() {
  const now = Date.now();
  if (now - lastScrollTime > 50) { // Esegue al massimo ogni 50ms
    lastScrollTime = now;
    checkScrollPosition();
  }
});
```

### online/offline

Gli eventi `online` e `offline` si attivano quando il browser rileva un cambiamento nello stato della connettività di rete.

```javascript
window.addEventListener('online', function() {
  console.log('Connessione di rete ripristinata');
  syncData(); // Sincronizza i dati con il server
});

window.addEventListener('offline', function() {
  console.log('Connessione di rete persa');
  enableOfflineMode(); // Attiva modalità offline
});
```

## Eventi di Navigazione

### popstate

L'evento `popstate` si attiva quando l'utente naviga nella cronologia del browser (usando i pulsanti avanti/indietro).

```javascript
window.addEventListener('popstate', function(event) {
  console.log('Navigazione nella cronologia', event.state);
  // Ripristina lo stato dell'applicazione
  if (event.state) {
    restoreAppState(event.state);
  }
});

// Quando si cambia stato programmaticamente
function navigateTo(page, data) {
  history.pushState(data, '', page);
  updateUI(data);
}
```

### hashchange

L'evento `hashchange` si attiva quando cambia la parte hash dell'URL (dopo il simbolo #).

```javascript
window.addEventListener('hashchange', function() {
  console.log('Hash cambiato:', window.location.hash);
  // Aggiorna la vista in base al nuovo hash
  routeToView(window.location.hash.substring(1));
});
```

Questo evento è particolarmente utile per implementare routing client-side in applicazioni a pagina singola (SPA).

## Eventi di Visibilità

### visibilitychange

L'evento `visibilitychange` si attiva quando la visibilità della pagina cambia, ad esempio quando l'utente passa a un'altra scheda o minimizza il browser.

```javascript
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') {
    console.log('Pagina non visibile');
    pauseVideos(); // Pausa i video quando la pagina non è visibile
    stopPolling(); // Interrompi le richieste periodiche
  } else if (document.visibilityState === 'visible') {
    console.log('Pagina visibile');
    resumeVideos(); // Riprendi i video
    startPolling(); // Riprendi le richieste periodiche
  }
});
```

Questo evento è utile per ottimizzare le risorse e migliorare l'esperienza utente, ad esempio mettendo in pausa animazioni o video quando la pagina non è visibile.

## Eventi dei Media

Gli elementi media come `<audio>` e `<video>` generano vari eventi durante la loro riproduzione.

```javascript
const video = document.querySelector('video');

video.addEventListener('play', function() {
  console.log('Video avviato');
});

video.addEventListener('pause', function() {
  console.log('Video in pausa');
});

video.addEventListener('ended', function() {
  console.log('Video terminato');
  showNextVideoSuggestion();
});

video.addEventListener('timeupdate', function() {
  updateProgressBar(video.currentTime, video.duration);
});

video.addEventListener('loadedmetadata', function() {
  console.log(`Durata video: ${video.duration} secondi`);
});

video.addEventListener('error', function() {
  console.error('Errore durante il caricamento del video');
  showErrorMessage();
});
```

## Eventi di Animazione e Transizione

Questi eventi si attivano quando le animazioni CSS e le transizioni iniziano, terminano o vengono annullate.

```javascript
const element = document.querySelector('.animated-element');

element.addEventListener('animationstart', function() {
  console.log('Animazione iniziata');
});

element.addEventListener('animationend', function() {
  console.log('Animazione terminata');
  // Pulizia o azioni successive
  element.classList.remove('animated');
});

element.addEventListener('transitionend', function(event) {
  console.log(`Transizione della proprietà ${event.propertyName} terminata`);
  if (event.propertyName === 'opacity') {
    completeElementFade();
  }
});
```

## Eventi di Storage

### storage

L'evento `storage` si attiva quando i dati in `localStorage` o `sessionStorage` vengono modificati in un altro contesto (altra scheda o finestra dello stesso dominio).

```javascript
window.addEventListener('storage', function(event) {
  console.log('Storage modificato in un'altra scheda/finestra');
  console.log('Chiave modificata:', event.key);
  console.log('Vecchio valore:', event.oldValue);
  console.log('Nuovo valore:', event.newValue);
  console.log('URL della pagina che ha effettuato la modifica:', event.url);
  
  // Aggiorna l'UI in base ai nuovi dati
  if (event.key === 'userPreferences') {
    updateUIWithNewPreferences(JSON.parse(event.newValue));
  }
});
```

Questo evento è utile per sincronizzare dati tra diverse istanze della stessa applicazione aperte in più schede.

## Eventi di Drag and Drop

Il browser fornisce un'API nativa per implementare funzionalità di drag and drop.

```javascript
const draggable = document.querySelector('.draggable');
const dropZone = document.querySelector('.drop-zone');

// Elemento trascinabile
draggable.addEventListener('dragstart', function(event) {
  console.log('Inizio trascinamento');
  event.dataTransfer.setData('text/plain', this.id);
  this.classList.add('dragging');
});

draggable.addEventListener('dragend', function() {
  console.log('Fine trascinamento');
  this.classList.remove('dragging');
});

// Zona di rilascio
dropZone.addEventListener('dragover', function(event) {
  // Necessario per permettere il drop
  event.preventDefault();
  this.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', function() {
  this.classList.remove('drag-over');
});

dropZone.addEventListener('drop', function(event) {
  event.preventDefault();
  this.classList.remove('drag-over');
  
  const id = event.dataTransfer.getData('text/plain');
  const element = document.getElementById(id);
  
  if (element) {
    this.appendChild(element);
    console.log(`Elemento ${id} rilasciato nella zona di drop`);
  }
});
```

## Eventi di Clipboard

Gli eventi di clipboard si attivano quando l'utente copia, taglia o incolla contenuto.

```javascript
document.addEventListener('copy', function(event) {
  console.log('Contenuto copiato');
  // Modifica del contenuto copiato
  const selection = document.getSelection();
  const copiedText = selection.toString();
  
  // Aggiungi un'attribuzione quando il testo viene copiato
  event.clipboardData.setData('text/plain', `${copiedText} - Fonte: MioSito.com`);
  event.preventDefault(); // Impedisce la copia predefinita
});

document.addEventListener('paste', function(event) {
  console.log('Contenuto incollato');
  // Accedi al contenuto incollato
  const pastedText = event.clipboardData.getData('text/plain');
  
  // Elabora il testo incollato
  const processedText = processText(pastedText);
  
  // Inserisci il testo elaborato invece di quello originale
  document.execCommand('insertText', false, processedText);
  event.preventDefault(); // Impedisce l'incollaggio predefinito
});
```

## Eventi di Errore

### error

L'evento `error` si attiva quando si verifica un errore durante il caricamento di una risorsa esterna (immagine, script, ecc.) o quando si verifica un errore JavaScript non gestito.

```javascript
// Gestione errori di caricamento delle immagini
document.querySelector('img').addEventListener('error', function() {
  console.error('Impossibile caricare l\'immagine');
  this.src = 'placeholder.jpg'; // Immagine di fallback
});

// Gestione globale degli errori JavaScript
window.addEventListener('error', function(event) {
  console.error('Errore JavaScript:', event.message);
  console.error('File:', event.filename);
  console.error('Linea:', event.lineno);
  console.error('Colonna:', event.colno);
  console.error('Oggetto errore:', event.error);
  
  // Registra l'errore su un servizio di monitoraggio
  logErrorToService({
    message: event.message,
    file: event.filename,
    line: event.lineno,
    stack: event.error?.stack
  });
  
  // Impedisce la visualizzazione dell'errore nella console del browser
  // event.preventDefault();
});
```

### unhandledrejection

L'evento `unhandledrejection` si attiva quando una Promise viene rifiutata e non c'è un gestore di errori per catturare il rifiuto.

```javascript
window.addEventListener('unhandledrejection', function(event) {
  console.error('Promise non gestita:', event.reason);
  
  // Registra l'errore
  logErrorToService({
    type: 'unhandledRejection',
    reason: event.reason
  });
  
  // Impedisce la visualizzazione dell'errore nella console del browser
  // event.preventDefault();
});
```

## Eventi di Rete

L'API Fetch fornisce eventi per monitorare le richieste di rete.

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Ascolta gli eventi di abort
signal.addEventListener('abort', () => {
  console.log('Richiesta fetch annullata');
});

// Esegui la richiesta fetch con il signal
fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log('Dati ricevuti:', data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch annullata dall\'utente');
    } else {
      console.error('Errore fetch:', error);
    }
  });

// Per annullare la richiesta
function cancelRequest() {
  controller.abort();
}
```

## Eventi di Performance

L'API Performance Observer permette di monitorare vari aspetti delle prestazioni della pagina.

```javascript
// Crea un observer per monitorare le metriche di performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Metrica di performance:', entry.name);
    console.log('Durata:', entry.duration);
    console.log('Timestamp di inizio:', entry.startTime);
    console.log('Dettagli:', entry);
  }
});

// Osserva diversi tipi di metriche
observer.observe({ entryTypes: ['navigation', 'resource', 'paint', 'mark', 'measure'] });

// Crea marker personalizzati per misurare parti specifiche del codice
performance.mark('inizio-operazione');
// ... codice da misurare ...
performance.mark('fine-operazione');
performance.measure('durata-operazione', 'inizio-operazione', 'fine-operazione');
```

## Best Practices per gli Eventi del Browser

1. **Ottimizzazione delle Prestazioni**
   - Utilizzare tecniche di throttling o debouncing per eventi ad alta frequenza come `scroll` e `resize`
   - Rimuovere i gestori di eventi quando non sono più necessari
   - Utilizzare la delegazione degli eventi quando appropriato

2. **Gestione del Ciclo di Vita**
   - Utilizzare `DOMContentLoaded` per inizializzare l'applicazione il prima possibile
   - Utilizzare `load` solo per operazioni che richiedono il caricamento completo di tutte le risorse
   - Implementare la gestione dello stato di visibilità per ottimizzare le risorse

3. **Compatibilità e Fallback**
   - Verificare il supporto del browser per eventi specifici prima di utilizzarli
   - Implementare fallback per browser che non supportano determinati eventi
   - Testare su diversi browser e dispositivi

4. **Sicurezza**
   - Essere cauti con gli eventi che possono esporre dati sensibili (es. clipboard)
   - Validare sempre i dati provenienti da eventi esterni
   - Limitare l'uso di `eval()` o `innerHTML` con dati provenienti da eventi

## Conclusione

Gli eventi del browser forniscono un potente meccanismo per creare applicazioni web interattive e reattive. Comprendere i diversi tipi di eventi disponibili e come utilizzarli in modo efficiente è fondamentale per sviluppare applicazioni web moderne che offrono un'esperienza utente ottimale.

Sfruttando gli eventi appropriati e implementando le best practices, è possibile creare applicazioni che rispondono in modo fluido alle azioni dell'utente, si adattano a diversi contesti e gestiscono efficacemente le risorse del browser.

[Torna all'indice](../README.md) | [Argomento precedente: Propagazione degli Eventi](./03_Propagazione_Eventi.md) | [Argomento successivo: Pattern Avanzati](./05_Pattern_Avanzati.md)