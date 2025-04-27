# Ottimizzazione delle Prestazioni nella Gestione degli Eventi

La gestione efficiente degli eventi è fondamentale per creare applicazioni web reattive e performanti. Un'implementazione non ottimizzata può causare problemi di prestazioni, specialmente in applicazioni complesse con numerosi gestori di eventi. Questo capitolo esplora tecniche e pattern per ottimizzare la gestione degli eventi in JavaScript.

## Problemi Comuni di Prestazioni

### 1. Eccesso di Gestori di Eventi

Aggiungere troppi gestori di eventi può causare problemi di memoria e rallentare l'applicazione:

```javascript
// Approccio problematico: un gestore per ogni elemento
document.querySelectorAll('.elemento').forEach(elemento => {
  elemento.addEventListener('click', gestoreClick);
  elemento.addEventListener('mouseover', gestoreMouseOver);
  elemento.addEventListener('mouseout', gestoreMouseOut);
});
```

### 2. Eventi ad Alta Frequenza

Alcuni eventi come `scroll`, `resize`, `mousemove` o `touchmove` possono attivarsi decine o centinaia di volte al secondo, causando problemi di prestazioni se i gestori eseguono operazioni costose:

```javascript
// Problema: questo gestore verrà chiamato molto frequentemente durante lo scorrimento
window.addEventListener('scroll', function() {
  // Operazioni costose come manipolazione del DOM, calcoli complessi, ecc.
  ricalcolaLayoutComplesso();
  aggiornaTuttiGliElementi();
});
```

### 3. Memory Leak

Non rimuovere i gestori di eventi quando non sono più necessari può causare memory leak, specialmente in applicazioni a pagina singola (SPA):

```javascript
// Problema: il gestore rimane attivo anche dopo la rimozione dell'elemento
function inizializzaComponente() {
  const elemento = document.getElementById('mio-elemento');
  elemento.addEventListener('click', gestoreClick);
  
  // In seguito, l'elemento viene rimosso ma il gestore rimane in memoria
  elemento.parentNode.removeChild(elemento);
  // Manca: elemento.removeEventListener('click', gestoreClick);
}
```

## Tecniche di Ottimizzazione

### 1. Delega degli Eventi

Come abbiamo visto nel capitolo precedente, la delega degli eventi è una delle tecniche più efficaci per ottimizzare le prestazioni:

```javascript
// Invece di aggiungere gestori a ogni elemento...
document.querySelectorAll('.pulsante').forEach(pulsante => {
  pulsante.addEventListener('click', gestorePulsante);
});

// ...usa la delega degli eventi
document.getElementById('contenitore').addEventListener('click', function(evento) {
  if (evento.target.matches('.pulsante')) {
    gestorePulsante(evento);
  }
});
```

### 2. Throttling e Debouncing

Queste tecniche limitano la frequenza con cui un gestore di eventi viene eseguito, migliorando significativamente le prestazioni per eventi ad alta frequenza.

#### Throttling

Il throttling limita l'esecuzione di una funzione a un intervallo di tempo specifico, ignorando le chiamate intermedie:

```javascript
function throttle(callback, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}

// Utilizzo: esegue la funzione al massimo ogni 100ms
const gestoreScrollThrottled = throttle(function() {
  console.log('Scroll position:', window.scrollY);
  aggiornaPosizione();
}, 100);

window.addEventListener('scroll', gestoreScrollThrottled);
```

#### Debouncing

Il debouncing ritarda l'esecuzione di una funzione fino a quando non c'è stata una pausa nell'attivazione dell'evento per un periodo specificato:

```javascript
function debounce(callback, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

// Utilizzo: esegue la funzione solo dopo che l'utente ha smesso di digitare per 300ms
const inputRicerca = document.getElementById('ricerca');
const cercaDebounced = debounce(function(evento) {
  console.log('Ricerca:', evento.target.value);
  eseguiRicerca(evento.target.value);
}, 300);

inputRicerca.addEventListener('input', cercaDebounced);
```

#### Quando Usare Throttling vs Debouncing

- **Throttling**: Ideale per eventi che richiedono aggiornamenti regolari ma non a ogni attivazione (scroll, resize, mousemove).
- **Debouncing**: Perfetto per eventi che dovrebbero attivarsi solo dopo che l'utente ha completato un'azione (input di ricerca, ridimensionamento della finestra).

### 3. Passive Event Listeners

I listener passivi migliorano le prestazioni di scorrimento informando il browser che il gestore non chiamerà `preventDefault()`:

```javascript
// Il terzo parametro { passive: true } migliora le prestazioni di scorrimento
document.addEventListener('touchstart', gestoreTouchStart, { passive: true });
window.addEventListener('scroll', gestoreScroll, { passive: true });
```

Questo è particolarmente importante per eventi touch su dispositivi mobili, dove il browser normalmente deve attendere per vedere se `preventDefault()` viene chiamato prima di iniziare lo scorrimento.

### 4. Rimozione dei Gestori di Eventi

Rimuovi sempre i gestori di eventi quando non sono più necessari, specialmente per elementi che vengono rimossi dal DOM:

```javascript
class Componente {
  constructor(elemento) {
    this.elemento = elemento;
    this.gestoreClick = this.onClick.bind(this);
    this.elemento.addEventListener('click', this.gestoreClick);
  }
  
  onClick(evento) {
    console.log('Elemento cliccato');
  }
  
  distruggi() {
    // Rimuovi il gestore prima di eliminare il riferimento all'elemento
    this.elemento.removeEventListener('click', this.gestoreClick);
    this.elemento = null;
  }
}

// Utilizzo
const mioComponente = new Componente(document.getElementById('mio-elemento'));

// Quando il componente non è più necessario
mioComponente.distruggi();
```

### 5. Ottimizzazione del Codice nei Gestori di Eventi

I gestori di eventi dovrebbero essere il più efficienti possibile, specialmente per eventi ad alta frequenza:

```javascript
// Gestore non ottimizzato
window.addEventListener('scroll', function() {
  // Accesso ripetuto al DOM (costoso)
  const header = document.querySelector('header');
  const scrollY = window.scrollY;
  
  // Calcoli ripetuti
  if (scrollY > 100) {
    header.classList.add('compatto');
  } else {
    header.classList.remove('compatto');
  }
});

// Gestore ottimizzato
const header = document.querySelector('header'); // Accesso al DOM una sola volta
let isCompatto = false;

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const shouldBeCompatto = scrollY > 100;
  
  // Modifica il DOM solo quando necessario
  if (shouldBeCompatto !== isCompatto) {
    isCompatto = shouldBeCompatto;
    header.classList.toggle('compatto', isCompatto);
  }
});
```

### 6. Utilizzo di requestAnimationFrame

Per aggiornamenti visivi sincronizzati con il refresh del browser, utilizza `requestAnimationFrame` invece di gestori di eventi diretti:

```javascript
let lastScrollY = window.scrollY;
let ticking = false;

function aggiornaInterfaccia() {
  // Aggiorna l'interfaccia in base alla posizione di scorrimento
  console.log('Aggiornamento a scrollY:', lastScrollY);
  
  // Resetta il flag
  ticking = false;
}

window.addEventListener('scroll', function() {
  lastScrollY = window.scrollY;
  
  if (!ticking) {
    // Richiedi un frame di animazione per l'aggiornamento
    window.requestAnimationFrame(aggiornaInterfaccia);
    ticking = true;
  }
});
```

Questo approccio garantisce che gli aggiornamenti visivi avvengano durante il ciclo di rendering del browser, migliorando fluidità e prestazioni.

### 7. Utilizzo di Web Workers per Operazioni Intensive

Per calcoli intensivi che potrebbero bloccare l'interfaccia utente, considera l'utilizzo di Web Workers:

```javascript
// Nel file principale
const worker = new Worker('worker.js');

document.getElementById('pulsante').addEventListener('click', function() {
  const dati = { /* dati da elaborare */ };
  worker.postMessage(dati);
});

worker.onmessage = function(evento) {
  const risultato = evento.data;
  console.log('Risultato dal worker:', risultato);
  aggiornaInterfaccia(risultato);
};

// Nel file worker.js
self.onmessage = function(evento) {
  const dati = evento.data;
  
  // Esegui calcoli intensivi senza bloccare l'interfaccia utente
  const risultato = elaborazionePesante(dati);
  
  self.postMessage(risultato);
};
```

## Misurazione e Monitoraggio delle Prestazioni

### Utilizzo delle DevTools

Le DevTools dei browser moderni offrono strumenti potenti per analizzare le prestazioni degli eventi:

1. **Performance Panel**: Registra l'attività durante l'interazione con la pagina per identificare colli di bottiglia.

2. **JavaScript Profiler**: Analizza il tempo di esecuzione delle funzioni, inclusi i gestori di eventi.

3. **Event Listener Breakpoints**: Imposta breakpoint su specifici tipi di eventi per debuggare i gestori.

### Metriche Chiave da Monitorare

- **Tempo di risposta agli eventi**: Quanto tempo passa tra l'evento e la risposta visibile.
- **Frequenza di attivazione degli eventi**: Quante volte un evento viene attivato in un determinato periodo.
- **Utilizzo della memoria**: Se aumenta costantemente, potrebbe indicare memory leak nei gestori di eventi.

## Pattern Avanzati

### 1. Gestori di Eventi con Priorità

Implementa un sistema che esegua i gestori di eventi in ordine di priorità:

```javascript
const EventManager = {
  listeners: {},
  
  on: function(evento, callback, priorita = 0) {
    if (!this.listeners[evento]) this.listeners[evento] = [];
    
    this.listeners[evento].push({ callback, priorita });
    // Ordina i listener per priorità (numeri più alti = priorità maggiore)
    this.listeners[evento].sort((a, b) => b.priorita - a.priorita);
    
    return this;
  },
  
  trigger: function(evento, dati) {
    if (!this.listeners[evento]) return this;
    
    for (const listener of this.listeners[evento]) {
      listener.callback(dati);
    }
    
    return this;
  },
  
  off: function(evento, callback) {
    if (!this.listeners[evento]) return this;
    
    this.listeners[evento] = this.listeners[evento].filter(
      listener => listener.callback !== callback
    );
    
    return this;
  }
};

// Utilizzo
EventManager.on('caricamento', () => console.log('Preparazione dati'), 2); // Alta priorità
EventManager.on('caricamento', () => console.log('Aggiornamento UI'), 1); // Media priorità
EventManager.on('caricamento', () => console.log('Analytics'), 0); // Bassa priorità

EventManager.trigger('caricamento');
// Output:
// Preparazione dati
// Aggiornamento UI
// Analytics
```

### 2. Lazy Binding degli Eventi

Collega i gestori di eventi solo quando necessario per risparmiare risorse:

```javascript
const LazyEventBinder = {
  bind: function(elemento, evento, callback, condizione) {
    // Collega un gestore temporaneo che verificherà la condizione
    const tempHandler = function(e) {
      // Se la condizione è soddisfatta, collega il gestore reale
      if (condizione()) {
        elemento.removeEventListener(evento, tempHandler);
        elemento.addEventListener(evento, callback);
        callback(e); // Esegui il callback per l'evento corrente
      }
    };
    
    elemento.addEventListener(evento, tempHandler);
  }
};

// Utilizzo: collega il gestore completo solo dopo il primo scroll
LazyEventBinder.bind(
  window,
  'scroll',
  function() { console.log('Gestore completo'); },
  function() { return window.scrollY > 0; }
);
```

### 3. Pooling degli Eventi

Riduce il sovraccarico di creazione di oggetti evento raggruppando e riutilizzando gli eventi:

```javascript
const EventPool = {
  pool: {},
  
  getEvent: function(tipo, dati) {
    if (!this.pool[tipo]) {
      this.pool[tipo] = [];
    }
    
    let evento;
    if (this.pool[tipo].length > 0) {
      // Riutilizza un evento esistente
      evento = this.pool[tipo].pop();
      // Aggiorna i dati
      Object.assign(evento.detail, dati);
    } else {
      // Crea un nuovo evento
      evento = new CustomEvent(tipo, { detail: dati, bubbles: true });
    }
    
    return evento;
  },
  
  releaseEvent: function(evento) {
    // Rimetti l'evento nel pool per riutilizzarlo
    if (!this.pool[evento.type]) {
      this.pool[evento.type] = [];
    }
    this.pool[evento.type].push(evento);
  }
};

// Utilizzo
function attivaEvento(tipo, dati) {
  const evento = EventPool.getEvent(tipo, dati);
  document.dispatchEvent(evento);
  EventPool.releaseEvent(evento);
}

// Attiva eventi riutilizzando gli oggetti evento
attivaEvento('aggiornamento', { valore: 42 });
attivaEvento('aggiornamento', { valore: 43 });
```

## Best Practices

1. **Usa la delega degli eventi** quando possibile per ridurre il numero di gestori.

2. **Applica throttling o debouncing** a eventi ad alta frequenza come scroll, resize e mousemove.

3. **Utilizza listener passivi** per eventi di scorrimento e touch.

4. **Rimuovi sempre i gestori** quando non sono più necessari.

5. **Minimizza le operazioni DOM** nei gestori di eventi, specialmente per eventi frequenti.

6. **Usa `requestAnimationFrame`** per aggiornamenti visivi sincronizzati con il refresh del browser.

7. **Sposta calcoli intensivi** in Web Workers per evitare di bloccare il thread principale.

8. **Misura e monitora** le prestazioni degli eventi per identificare e risolvere i colli di bottiglia.

9. **Evita di modificare il DOM** durante eventi ad alta frequenza; invece, accumula le modifiche e applicale in batch.

10. **Testa su dispositivi reali**, specialmente dispositivi mobili meno potenti, per garantire prestazioni ottimali.

## Conclusione

L'ottimizzazione delle prestazioni nella gestione degli eventi è fondamentale per creare applicazioni web reattive e fluide. Applicando le tecniche e i pattern descritti in questo capitolo, è possibile ridurre significativamente l'impatto degli eventi sulle prestazioni complessive dell'applicazione.

Ricorda che l'ottimizzazione dovrebbe essere guidata da misurazioni reali piuttosto che da supposizioni. Utilizza gli strumenti di profilazione del browser per identificare i veri colli di bottiglia e concentra gli sforzi di ottimizzazione dove avranno il maggiore impatto.

[Torna all'indice](../README.md) | [Argomento precedente: Eventi Personalizzati](./02_Eventi_Personalizzati.md) | [Prossimo argomento: Eventi Touch e Mobile](./04_Eventi_Touch_Mobile.md)