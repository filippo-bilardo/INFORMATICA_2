# Eventi Personalizzati (Custom Events)

Gli eventi personalizzati in JavaScript permettono di creare un sistema di comunicazione flessibile tra diverse parti di un'applicazione, seguendo il pattern di progettazione Observer. Questa funzionalità consente di definire e attivare eventi specifici per l'applicazione, estendendo il sistema di eventi nativo del browser.

## Introduzione agli Eventi Personalizzati

Mentre il browser fornisce numerosi eventi predefiniti (come `click`, `load`, `submit`), gli eventi personalizzati consentono di definire interazioni specifiche per la propria applicazione. Questo approccio favorisce un'architettura basata su eventi, dove i componenti possono comunicare tra loro senza essere strettamente accoppiati.

## Creazione di Eventi Personalizzati

### Utilizzo del Costruttore CustomEvent

Il modo moderno per creare eventi personalizzati è utilizzare il costruttore `CustomEvent`:

```javascript
// Creazione di un evento personalizzato
const eventoPersonalizzato = new CustomEvent('prodotto-aggiunto', {
  detail: { // Oggetto per passare dati con l'evento
    id: 123,
    nome: 'Smartphone XYZ',
    prezzo: 499.99
  },
  bubbles: true, // L'evento si propaga verso l'alto nella gerarchia DOM
  cancelable: true // L'evento può essere annullato
});

// Attivazione dell'evento su un elemento specifico
document.getElementById('carrello').dispatchEvent(eventoPersonalizzato);
```

### Parametri del Costruttore CustomEvent

- **`type`** (primo parametro): Il nome dell'evento personalizzato (stringa).
- **`options`** (secondo parametro, opzionale): Un oggetto con le seguenti proprietà:
  - **`detail`**: Un oggetto contenente dati da passare con l'evento.
  - **`bubbles`**: Booleano che indica se l'evento si propaga verso l'alto (default: `false`).
  - **`cancelable`**: Booleano che indica se l'evento può essere annullato (default: `false`).
  - **`composed`**: Booleano che indica se l'evento può attraversare i confini dello shadow DOM (default: `false`).

### Metodo Alternativo (Legacy)

Per compatibilità con browser più vecchi, è possibile utilizzare il metodo `createEvent()` seguito da `initCustomEvent()`:

```javascript
// Metodo legacy per creare eventi personalizzati
const evento = document.createEvent('CustomEvent');
evento.initCustomEvent('prodotto-aggiunto', true, true, {
  id: 123,
  nome: 'Smartphone XYZ',
  prezzo: 499.99
});

document.getElementById('carrello').dispatchEvent(evento);
```

## Ascolto di Eventi Personalizzati

Gli eventi personalizzati vengono ascoltati esattamente come gli eventi standard, utilizzando `addEventListener`:

```javascript
// Ascolto dell'evento personalizzato
document.getElementById('carrello').addEventListener('prodotto-aggiunto', function(evento) {
  console.log('Nuovo prodotto aggiunto al carrello!');
  console.log('Dettagli prodotto:', evento.detail);
  
  // Accesso ai dati dell'evento
  const prodotto = evento.detail;
  aggiornaTotaleCarrello(prodotto.prezzo);
  mostraNotifica(`${prodotto.nome} aggiunto al carrello`);
});
```

## Casi d'Uso Comuni

### 1. Comunicazione tra Componenti

Gli eventi personalizzati sono ideali per la comunicazione tra componenti che non hanno un riferimento diretto l'uno all'altro:

```javascript
// Componente A: Attiva un evento quando cambia lo stato
class ComponenteA {
  cambiaStato(nuovoStato) {
    this.stato = nuovoStato;
    
    // Notifica altri componenti del cambiamento
    const evento = new CustomEvent('stato-cambiato', {
      detail: { stato: nuovoStato },
      bubbles: true
    });
    document.dispatchEvent(evento);
  }
}

// Componente B: Reagisce al cambiamento di stato
class ComponenteB {
  constructor() {
    // Ascolta l'evento di cambiamento stato
    document.addEventListener('stato-cambiato', this.onStatoCambiato.bind(this));
  }
  
  onStatoCambiato(evento) {
    console.log('Stato cambiato:', evento.detail.stato);
    this.aggiornaDaStato(evento.detail.stato);
  }
  
  aggiornaDaStato(stato) {
    // Aggiorna il componente in base al nuovo stato
  }
}
```

### 2. Sistema di Notifiche

Gli eventi personalizzati possono essere utilizzati per implementare un sistema di notifiche centralizzato:

```javascript
// Sistema di notifiche
const SistemaDiNotifiche = {
  invia: function(tipo, messaggio, datiAggiuntivi = {}) {
    const evento = new CustomEvent('notifica', {
      detail: {
        tipo: tipo, // 'successo', 'errore', 'avviso', ecc.
        messaggio: messaggio,
        timestamp: new Date(),
        ...datiAggiuntivi
      },
      bubbles: true
    });
    document.dispatchEvent(evento);
  }
};

// Utilizzo del sistema di notifiche
document.addEventListener('notifica', function(evento) {
  const notifica = evento.detail;
  
  // Visualizza la notifica nell'interfaccia utente
  mostraNotificaUI(notifica.tipo, notifica.messaggio);
  
  // Registra la notifica nei log
  console.log(`[${notifica.tipo}] ${notifica.messaggio}`);
});

// Esempio di utilizzo
SistemaDiNotifiche.invia('successo', 'Operazione completata con successo!');
SistemaDiNotifiche.invia('errore', 'Si è verificato un errore', { codice: 404 });
```

### 3. Implementazione di un Pattern Pub/Sub

Gli eventi personalizzati possono essere utilizzati per implementare un pattern Publish/Subscribe (Pub/Sub):

```javascript
const EventBus = {
  subscribe: function(evento, callback) {
    document.addEventListener(evento, callback);
  },
  
  publish: function(evento, dati) {
    const customEvent = new CustomEvent(evento, {
      detail: dati,
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  },
  
  unsubscribe: function(evento, callback) {
    document.removeEventListener(evento, callback);
  }
};

// Utilizzo dell'EventBus
function gestoreNuovoUtente(evento) {
  console.log('Nuovo utente registrato:', evento.detail);
}

// Sottoscrizione all'evento
EventBus.subscribe('utente-registrato', gestoreNuovoUtente);

// Pubblicazione dell'evento
EventBus.publish('utente-registrato', {
  id: 1001,
  nome: 'Mario Rossi',
  email: 'mario@example.com'
});

// Annullamento della sottoscrizione
EventBus.unsubscribe('utente-registrato', gestoreNuovoUtente);
```

## Tecniche Avanzate

### Eventi Personalizzati Gerarchici

È possibile creare una gerarchia di eventi utilizzando nomi separati da punti, simile a come funzionano i namespace:

```javascript
// Eventi gerarchici
EventBus.publish('utente.registrato', { id: 1001, nome: 'Mario' });
EventBus.publish('utente.login', { id: 1001 });
EventBus.publish('utente.logout', { id: 1001 });

// Ascolto di tutti gli eventi relativi all'utente
document.addEventListener('utente', function(evento) {
  console.log('Evento utente:', evento.type);
  // Nota: evento.type conterrà il nome completo dell'evento (es. 'utente.registrato')
}, { capture: true });
```

### Eventi con Namespace

Un pattern comune nelle librerie JavaScript è l'utilizzo di namespace per gli eventi, per facilitare la gestione e la rimozione selettiva:

```javascript
// Implementazione di eventi con namespace
const EventManager = {
  on: function(elemento, evento, callback) {
    const [nomeEvento, namespace] = evento.split('.');
    callback._namespace = namespace;
    elemento.addEventListener(nomeEvento, callback);
    
    // Memorizza il callback per una facile rimozione
    if (!elemento._eventHandlers) elemento._eventHandlers = {};
    if (!elemento._eventHandlers[nomeEvento]) elemento._eventHandlers[nomeEvento] = [];
    elemento._eventHandlers[nomeEvento].push(callback);
  },
  
  off: function(elemento, evento) {
    const [nomeEvento, namespace] = evento.split('.');
    
    if (!elemento._eventHandlers || !elemento._eventHandlers[nomeEvento]) return;
    
    const handlers = elemento._eventHandlers[nomeEvento];
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      if (!namespace || handler._namespace === namespace) {
        elemento.removeEventListener(nomeEvento, handler);
        handlers.splice(i, 1);
        i--;
      }
    }
  }
};

// Utilizzo
const button = document.getElementById('mio-pulsante');

// Aggiunta di gestori con namespace
EventManager.on(button, 'click.feature1', function() { console.log('Feature 1'); });
EventManager.on(button, 'click.feature2', function() { console.log('Feature 2'); });

// Rimozione selettiva per namespace
EventManager.off(button, 'click.feature1'); // Rimuove solo i gestori di 'click' con namespace 'feature1'
```

## Considerazioni sulle Prestazioni

### Ottimizzazione degli Eventi Personalizzati

1. **Limita la propagazione**: Se non è necessario che l'evento si propaghi, imposta `bubbles: false` per migliorare le prestazioni.

2. **Rimuovi i listener non utilizzati**: Assicurati di rimuovere i listener di eventi quando non sono più necessari, specialmente per componenti che vengono distrutti.

3. **Usa la delega degli eventi**: Per eventi personalizzati che potrebbero essere attivati frequentemente su molti elementi, considera l'utilizzo della delega degli eventi.

4. **Evita l'attivazione eccessiva**: Limita la frequenza con cui attivi gli eventi personalizzati, specialmente per operazioni ad alta frequenza come lo scorrimento o il ridimensionamento.

```javascript
// Esempio di throttling per eventi personalizzati
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

// Utilizzo del throttling per limitare l'attivazione di eventi personalizzati
const attivaEventoThrottled = throttle(function(dati) {
  const evento = new CustomEvent('aggiornamento-frequente', {
    detail: dati,
    bubbles: true
  });
  document.dispatchEvent(evento);
}, 100); // Attiva al massimo ogni 100ms

// Durante un'operazione ad alta frequenza
window.addEventListener('scroll', function() {
  attivaEventoThrottled({ scrollY: window.scrollY });
});
```

## Compatibilità e Polyfill

Il costruttore `CustomEvent` è supportato in tutti i browser moderni, ma per garantire la compatibilità con browser più vecchi, è possibile utilizzare un polyfill:

```javascript
// Polyfill per CustomEvent
(function() {
  if (typeof window.CustomEvent === 'function') return;
  
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  
  window.CustomEvent = CustomEvent;
})();
```

## Best Practices

1. **Nomi degli eventi descrittivi**: Utilizza nomi di eventi chiari e descrittivi, possibilmente con un prefisso specifico per l'applicazione per evitare conflitti.

2. **Documentazione**: Documenta gli eventi personalizzati, specificando il loro scopo, i dati che trasportano e quando vengono attivati.

3. **Coerenza dei dati**: Mantieni una struttura coerente per i dati passati attraverso la proprietà `detail` per facilitare l'utilizzo degli eventi.

4. **Gestione degli errori**: Implementa una gestione degli errori robusta nei listener di eventi per evitare che un errore in un listener blocchi l'esecuzione di altri listener.

```javascript
// Esempio di gestione degli errori nei listener di eventi
document.addEventListener('mio-evento', function(evento) {
  try {
    // Logica del listener che potrebbe generare errori
    elaboraDati(evento.detail);
  } catch (errore) {
    console.error('Errore nel listener di mio-evento:', errore);
    // Gestione dell'errore senza bloccare altri listener
  }
});
```

5. **Disaccoppiamento**: Utilizza gli eventi personalizzati per disaccoppiare i componenti dell'applicazione, migliorando la modularità e la manutenibilità.

## Conclusione

Gli eventi personalizzati sono uno strumento potente per implementare un'architettura basata su eventi in JavaScript. Consentono di creare sistemi di comunicazione flessibili e disaccoppiati tra diverse parti di un'applicazione, facilitando lo sviluppo di codice modulare e manutenibile.

Utilizzando gli eventi personalizzati in modo appropriato, è possibile creare applicazioni web più robuste e scalabili, con componenti che possono comunicare efficacemente senza dipendere direttamente l'uno dall'altro.

[Torna all'indice](../README.md) | [Argomento precedente: Delega degli Eventi](./01_Delega_Eventi.md) | [Prossimo argomento: Ottimizzazione delle Prestazioni](./03_Ottimizzazione_Prestazioni.md)