# Pattern Avanzati per la Gestione degli Eventi

In questo capitolo esploreremo pattern avanzati per la gestione degli eventi in JavaScript, che consentono di creare architetture più robuste, manutenibili e scalabili. Questi pattern sono particolarmente utili in applicazioni complesse dove una gestione efficiente degli eventi diventa cruciale.

## Pattern Observer

Il pattern Observer (o Publish/Subscribe) è alla base del sistema di eventi in JavaScript. Permette a un oggetto (publisher) di notificare altri oggetti (subscribers) quando si verifica un cambiamento di stato.

### Implementazione Base

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  // Sottoscrizione a un evento
  on(evento, listener) {
    if (!this.events[evento]) {
      this.events[evento] = [];
    }
    this.events[evento].push(listener);
    return this; // Per il chaining
  }
  
  // Rimozione di una sottoscrizione
  off(evento, listener) {
    if (!this.events[evento]) return this;
    
    this.events[evento] = this.events[evento].filter(
      callback => callback !== listener
    );
    return this;
  }
  
  // Emissione di un evento
  emit(evento, ...args) {
    if (!this.events[evento]) return this;
    
    this.events[evento].forEach(listener => {
      listener.apply(this, args);
    });
    return this;
  }
  
  // Sottoscrizione una tantum
  once(evento, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(evento, onceWrapper);
    };
    return this.on(evento, onceWrapper);
  }
}

// Utilizzo
const emitter = new EventEmitter();

// Sottoscrizione a un evento
function gestoreMessaggio(messaggio) {
  console.log('Messaggio ricevuto:', messaggio);
}
emitter.on('messaggio', gestoreMessaggio);

// Emissione di un evento
emitter.emit('messaggio', 'Ciao mondo!'); // Output: Messaggio ricevuto: Ciao mondo!

// Rimozione della sottoscrizione
emitter.off('messaggio', gestoreMessaggio);

// Sottoscrizione una tantum
emitter.once('evento-singolo', () => console.log('Questo verrà eseguito solo una volta'));
```

### Estensione con Funzionalità Avanzate

```javascript
class AdvancedEventEmitter extends EventEmitter {
  // Sottoscrizione a più eventi contemporaneamente
  onMultiple(eventi, listener) {
    eventi.forEach(evento => this.on(evento, listener));
    return this;
  }
  
  // Emissione di eventi con priorità
  emitWithPriority(evento, priorita, ...args) {
    if (!this.events[evento]) return this;
    
    // Ordina i listener per priorità (se definita)
    const listeners = [...this.events[evento]];
    listeners.sort((a, b) => {
      const prioritaA = a.priorita || 0;
      const prioritaB = b.priorita || 0;
      return prioritaB - prioritaA; // Priorità più alta prima
    });
    
    listeners.forEach(listener => {
      listener.apply(this, args);
    });
    return this;
  }
  
  // Sottoscrizione con priorità
  onWithPriority(evento, listener, priorita) {
    if (!this.events[evento]) {
      this.events[evento] = [];
    }
    listener.priorita = priorita;
    this.events[evento].push(listener);
    return this;
  }
  
  // Rimozione di tutti i listener per un evento
  removeAllListeners(evento) {
    if (evento) {
      delete this.events[evento];
    } else {
      this.events = {};
    }
    return this;
  }
}
```

## Pattern Mediator

Il pattern Mediator centralizza la comunicazione tra diversi componenti, riducendo le dipendenze dirette tra di essi.

```javascript
class EventMediator {
  constructor() {
    this.componenti = {};
    this.eventi = {};
  }
  
  // Registrazione di un componente
  registraComponente(nome, componente) {
    this.componenti[nome] = componente;
    componente.mediator = this;
  }
  
  // Registrazione di un evento
  registraEvento(evento, callback, componente) {
    if (!this.eventi[evento]) {
      this.eventi[evento] = [];
    }
    this.eventi[evento].push({ callback, componente });
  }
  
  // Attivazione di un evento
  attivaEvento(evento, dati, mittente) {
    if (!this.eventi[evento]) return;
    
    this.eventi[evento].forEach(({ callback, componente }) => {
      // Evita di notificare il mittente dell'evento
      if (componente !== mittente) {
        callback.call(componente, dati, mittente);
      }
    });
  }
  
  // Comunicazione diretta tra componenti
  comunicaA(destinatario, messaggio, dati, mittente) {
    const componente = this.componenti[destinatario];
    if (componente && componente[messaggio]) {
      componente[messaggio](dati, mittente);
    }
  }
}

// Esempio di utilizzo
class Componente {
  constructor(nome) {
    this.nome = nome;
  }
  
  invia(evento, dati) {
    console.log(`${this.nome} invia evento: ${evento}`);
    this.mediator.attivaEvento(evento, dati, this);
  }
  
  ricevi(dati, mittente) {
    console.log(`${this.nome} riceve dati da ${mittente.nome}:`, dati);
  }
}

// Creazione del mediator e dei componenti
const mediator = new EventMediator();

const componenteA = new Componente('ComponenteA');
const componenteB = new Componente('ComponenteB');
const componenteC = new Componente('ComponenteC');

// Registrazione dei componenti
mediator.registraComponente('A', componenteA);
mediator.registraComponente('B', componenteB);
mediator.registraComponente('C', componenteC);

// Registrazione degli eventi
mediator.registraEvento('evento1', componenteB.ricevi, componenteB);
mediator.registraEvento('evento1', componenteC.ricevi, componenteC);

// Attivazione di un evento
componenteA.invia('evento1', { messaggio: 'Ciao!' });
```

## Pattern State Machine

Una macchina a stati (State Machine) può essere implementata utilizzando gli eventi per gestire transizioni tra stati in modo pulito e prevedibile.

```javascript
class StateMachine extends EventEmitter {
  constructor(stati, statoIniziale) {
    super();
    this.stati = stati || {};
    this.statoCorrente = statoIniziale || null;
    this.statoPrec = null;
  }
  
  // Aggiunta di uno stato
  aggiungiStato(nome, config) {
    this.stati[nome] = config;
    return this;
  }
  
  // Transizione a un nuovo stato
  transizione(nuovoStato, ...args) {
    if (!this.stati[nuovoStato]) {
      throw new Error(`Stato non valido: ${nuovoStato}`);
    }
    
    const statoCorrente = this.statoCorrente;
    const configStatoCorrente = this.stati[statoCorrente] || {};
    const configNuovoStato = this.stati[nuovoStato];
    
    // Verifica se la transizione è consentita
    if (configStatoCorrente.transizioni && 
        !configStatoCorrente.transizioni.includes(nuovoStato)) {
      throw new Error(`Transizione non consentita da ${statoCorrente} a ${nuovoStato}`);
    }
    
    // Esegui l'azione di uscita dallo stato corrente
    if (statoCorrente && configStatoCorrente.onExit) {
      configStatoCorrente.onExit.apply(this, args);
    }
    
    // Aggiorna lo stato
    this.statoPrec = statoCorrente;
    this.statoCorrente = nuovoStato;
    
    // Esegui l'azione di ingresso nel nuovo stato
    if (configNuovoStato.onEnter) {
      configNuovoStato.onEnter.apply(this, args);
    }
    
    // Emetti eventi
    this.emit('transizione', {
      da: this.statoPrec,
      a: this.statoCorrente,
      args
    });
    this.emit(`stato:${this.statoCorrente}`, ...args);
    
    return this;
  }
  
  // Verifica se la macchina è in un determinato stato
  inStato(stato) {
    return this.statoCorrente === stato;
  }
  
  // Ottieni lo stato corrente
  getStato() {
    return this.statoCorrente;
  }
  
  // Esegui un'azione nello stato corrente
  eseguiAzione(azione, ...args) {
    const configStato = this.stati[this.statoCorrente];
    if (configStato && configStato.azioni && configStato.azioni[azione]) {
      return configStato.azioni[azione].apply(this, args);
    }
    return null;
  }
}

// Esempio: Macchina a stati per un player multimediale
const playerStateMachine = new StateMachine({
  'stopped': {
    transizioni: ['playing', 'paused'],
    onEnter: function() {
      console.log('Player fermato');
    },
    azioni: {
      play: function() { this.transizione('playing'); }
    }
  },
  'playing': {
    transizioni: ['paused', 'stopped'],
    onEnter: function() {
      console.log('Player in riproduzione');
    },
    onExit: function() {
      console.log('Uscita dallo stato di riproduzione');
    },
    azioni: {
      pause: function() { this.transizione('paused'); },
      stop: function() { this.transizione('stopped'); }
    }
  },
  'paused': {
    transizioni: ['playing', 'stopped'],
    onEnter: function() {
      console.log('Player in pausa');
    },
    azioni: {
      play: function() { this.transizione('playing'); },
      stop: function() { this.transizione('stopped'); }
    }
  }
}, 'stopped');

// Utilizzo della macchina a stati
playerStateMachine.on('transizione', (info) => {
  console.log(`Transizione da ${info.da} a ${info.a}`);
});

playerStateMachine.on('stato:playing', () => {
  console.log('Evento: il player è ora in riproduzione');
});

// Esecuzione di azioni e transizioni
playerStateMachine.eseguiAzione('play'); // Transizione a 'playing'
playerStateMachine.eseguiAzione('pause'); // Transizione a 'paused'
playerStateMachine.transizione('playing'); // Transizione diretta
playerStateMachine.eseguiAzione('stop'); // Transizione a 'stopped'
```

## Pattern Command

Il pattern Command incapsula un'azione in un oggetto, permettendo di parametrizzare i client con diverse richieste, accodare le richieste e supportare operazioni annullabili.

```javascript
// Interfaccia Command
class Command {
  execute() {}
  undo() {}
}

// Implementazione concreta di un Command
class ToggleElementCommand extends Command {
  constructor(elemento) {
    super();
    this.elemento = elemento;
    this.statoPrec = null;
  }
  
  execute() {
    this.statoPrec = this.elemento.style.display;
    this.elemento.style.display = 
      this.elemento.style.display === 'none' ? 'block' : 'none';
  }
  
  undo() {
    if (this.statoPrec !== null) {
      this.elemento.style.display = this.statoPrec;
    }
  }
}

// Invoker che gestisce i comandi
class CommandManager {
  constructor() {
    this.cronologia = [];
    this.indiceCorrente = -1;
  }
  
  execute(comando) {
    // Rimuovi i comandi annullati se stiamo eseguendo un nuovo comando
    if (this.indiceCorrente < this.cronologia.length - 1) {
      this.cronologia = this.cronologia.slice(0, this.indiceCorrente + 1);
    }
    
    // Esegui il comando e aggiungilo alla cronologia
    comando.execute();
    this.cronologia.push(comando);
    this.indiceCorrente++;
  }
  
  undo() {
    if (this.indiceCorrente >= 0) {
      const comando = this.cronologia[this.indiceCorrente];
      comando.undo();
      this.indiceCorrente--;
      return true;
    }
    return false;
  }
  
  redo() {
    if (this.indiceCorrente < this.cronologia.length - 1) {
      this.indiceCorrente++;
      const comando = this.cronologia[this.indiceCorrente];
      comando.execute();
      return true;
    }
    return false;
  }
}

// Utilizzo
const manager = new CommandManager();
const elemento = document.getElementById('elemento-toggle');

document.getElementById('btn-toggle').addEventListener('click', function() {
  const comando = new ToggleElementCommand(elemento);
  manager.execute(comando);
});

document.getElementById('btn-undo').addEventListener('click', function() {
  manager.undo();
});

document.getElementById('btn-redo').addEventListener('click', function() {
  manager.redo();
});
```

## Pattern Module con Eventi

Il pattern Module può essere combinato con gli eventi per creare moduli disaccoppiati che comunicano tramite un sistema di eventi.

```javascript
// Sistema di eventi centralizzato
const EventBus = (function() {
  const events = {};
  
  return {
    on(evento, callback) {
      if (!events[evento]) events[evento] = [];
      events[evento].push(callback);
    },
    
    off(evento, callback) {
      if (!events[evento]) return;
      events[evento] = events[evento].filter(cb => cb !== callback);
    },
    
    emit(evento, data) {
      if (!events[evento]) return;
      events[evento].forEach(callback => callback(data));
    }
  };
})();

// Modulo Carrello
const Carrello = (function() {
  const prodotti = [];
  
  function aggiungiProdotto(prodotto) {
    prodotti.push(prodotto);
    EventBus.emit('carrello:aggiornato', { prodotti, totale: calcolaTotale() });
  }
  
  function rimuoviProdotto(id) {
    const indice = prodotti.findIndex(p => p.id === id);
    if (indice !== -1) {
      prodotti.splice(indice, 1);
      EventBus.emit('carrello:aggiornato', { prodotti, totale: calcolaTotale() });
    }
  }
  
  function calcolaTotale() {
    return prodotti.reduce((totale, p) => totale + p.prezzo, 0);
  }
  
  return {
    aggiungi: aggiungiProdotto,
    rimuovi: rimuoviProdotto,
    getProdotti: () => [...prodotti],
    getTotale: calcolaTotale
  };
})();

// Modulo UI
const UI = (function() {
  function init() {
    // Ascolta gli aggiornamenti del carrello
    EventBus.on('carrello:aggiornato', aggiornaUI);
    
    // Gestisci eventi UI
    document.querySelectorAll('.aggiungi-al-carrello').forEach(btn => {
      btn.addEventListener('click', function() {
        const prodotto = {
          id: this.dataset.id,
          nome: this.dataset.nome,
          prezzo: parseFloat(this.dataset.prezzo)
        };
        Carrello.aggiungi(prodotto);
      });
    });
  }
  
  function aggiornaUI(dati) {
    const { prodotti, totale } = dati;
    
    // Aggiorna la visualizzazione del carrello
    const carrelloEl = document.getElementById('carrello');
    carrelloEl.innerHTML = '';
    
    prodotti.forEach(p => {
      const elemento = document.createElement('div');
      elemento.textContent = `${p.nome} - €${p.prezzo}`;
      
      const btnRimuovi = document.createElement('button');
      btnRimuovi.textContent = 'Rimuovi';
      btnRimuovi.addEventListener('click', () => Carrello.rimuovi(p.id));
      
      elemento.appendChild(btnRimuovi);
      carrelloEl.appendChild(elemento);
    });
    
    document.getElementById('totale').textContent = `Totale: €${totale}`;
  }
  
  return {
    init
  };
})();

// Inizializzazione
document.addEventListener('DOMContentLoaded', UI.init);
```

## Pattern Decorator con Eventi

Il pattern Decorator può essere utilizzato per aggiungere funzionalità di gestione eventi a oggetti esistenti.

```javascript
// Funzione per decorare un oggetto con funzionalità di eventi
function decoraConEventi(oggetto) {
  const eventi = {};
  
  // Aggiungi metodi per la gestione degli eventi
  oggetto.on = function(evento, callback) {
    if (!eventi[evento]) eventi[evento] = [];
    eventi[evento].push(callback);
    return this;
  };
  
  oggetto.off = function(evento, callback) {
    if (!eventi[evento]) return this;
    if (callback) {
      eventi[evento] = eventi[evento].filter(cb => cb !== callback);
    } else {
      delete eventi[evento];
    }
    return this;
  };
  
  oggetto.emit = function(evento, ...args) {
    if (!eventi[evento]) return this;
    eventi[evento].forEach(callback => callback.apply(this, args));
    return this;
  };
  
  return oggetto;
}

// Esempio di utilizzo
class Utente {
  constructor(nome) {
    this.nome = nome;
  }
  
  setNome(nuovoNome) {
    const vecchioNome = this.nome;
    this.nome = nuovoNome;
    
    // Se l'oggetto è stato decorato con eventi, emetti un evento
    if (this.emit) {
      this.emit('cambio-nome', { vecchio: vecchioNome, nuovo: nuovoNome });
    }
  }
}

// Crea un utente e decoralo con funzionalità di eventi
const utente = decoraConEventi(new Utente('Mario'));

// Aggiungi un listener
utente.on('cambio-nome', function(info) {
  console.log(`Nome cambiato da ${info.vecchio} a ${info.nuovo}`);
});

// Cambia il nome, attivando l'evento
utente.setNome('Luigi'); // Output: Nome cambiato da Mario a Luigi
```

## Pattern Chain of Responsibility con Eventi

Il pattern Chain of Responsibility può essere implementato utilizzando gli eventi per creare una catena di gestori che possono elaborare una richiesta.

```javascript
class Handler extends EventEmitter {
  constructor(nome) {
    super();
    this.nome = nome;
    this.successore = null;
  }
  
  setSuccessore(successore) {
    this.successore = successore;
    return this;
  }
  
  handle(richiesta) {
    // Emetti un evento prima di gestire la richiesta
    this.emit('pre-handle', { handler: this.nome, richiesta });
    
    // Verifica se questo handler può gestire la richiesta
    if (this.puoGestire(richiesta)) {
      const risultato = this.gestisci(richiesta);
      
      // Emetti un evento dopo aver gestito la richiesta
      this.emit('post-handle', { 
        handler: this.nome, 
        richiesta, 
        risultato,
        gestito: true 
      });
      
      return risultato;
    } 
    // Passa al successore se esiste
    else if (this.successore) {
      // Emetti un evento per il passaggio al successore
      this.emit('passa-successore', { 
        da: this.nome, 
        a: this.successore.nome, 
        richiesta 
      });
      
      return this.successore.handle(richiesta);
    } 
    // Nessun handler disponibile
    else {
      // Emetti un evento per richiesta non gestita
      this.emit('non-gestito', { handler: this.nome, richiesta });
      
      return null;
    }
  }
  
  puoGestire(richiesta) {
    // Da implementare nelle sottoclassi
    return false;
  }
  
  gestisci(richiesta) {
    // Da implementare nelle sottoclassi
    return null;
  }
}

// Implementazioni concrete di Handler
class HandlerA extends Handler {
  constructor() {
    super('HandlerA');
  }
  
  puoGestire(richiesta) {
    return richiesta.tipo === 'A';
  }
  
  gestisci(richiesta) {
    return `HandlerA ha gestito la richiesta: ${richiesta.dati}`;
  }
}

class HandlerB extends Handler {
  constructor() {
    super('HandlerB');
  }
  
  puoGestire(richiesta) {
    return richiesta.tipo === 'B';
  }
  
  gestisci(richiesta) {
    return `HandlerB ha gestito la richiesta: ${richiesta.dati}`;
  }
}

class HandlerDefault extends Handler {
  constructor() {
    super('HandlerDefault');
  }
  
  puoGestire(richiesta) {
    // Handler predefinito gestisce tutto
    return true;
  }
  
  
  gestisci(richiesta) {
    return `HandlerDefault ha gestito la richiesta: ${richiesta.dati}`;
  }
}

// Creazione della catena
const handlerA = new HandlerA();
const handlerB = new HandlerB();
const handlerDefault = new HandlerDefault();

handlerA.setSuccessore(handlerB);
handlerB.setSuccessore(handlerDefault);

// Aggiungi listener per monitorare il flusso
handlerA.on('pre-handle', info => {
  console.log(`${info.handler} sta per gestire la richiesta`);
});

handlerA.on('passa-successore', info => {
  console.log(`Passaggio da ${info.da} a ${info.a}`);
});

handlerA.on('post-handle', info => {
  console.log(`${info.handler} ha gestito la richiesta con risultato: ${info.risultato}`);
});

// Utilizzo della catena
console.log(handlerA.handle({ tipo: 'B', dati: 'Dati di esempio' }));
```

## Conclusione

I pattern avanzati per la gestione degli eventi offrono soluzioni eleganti per problemi comuni nello sviluppo di applicazioni JavaScript complesse. Implementando questi pattern, è possibile creare architetture più modulari, manutenibili e scalabili.

Ogni pattern ha i suoi punti di forza e casi d'uso ideali:

- **Observer/EventEmitter**: Ideale per implementare sistemi di notifica e comunicazione disaccoppiata tra componenti.
- **Mediator**: Perfetto per centralizzare e semplificare la comunicazione in applicazioni con molti componenti interdipendenti.
- **State Machine**: Eccellente per gestire comportamenti complessi basati su stati e transizioni.
- **Command**: Utile per incapsulare azioni, supportare operazioni annullabili e implementare cronologie.
- **Module con Eventi**: Ideale per creare moduli disaccoppiati che comunicano tramite eventi.
- **Decorator con Eventi**: Perfetto per aggiungere funzionalità di eventi a oggetti esistenti senza modificarne la struttura base.
- **Chain of Responsibility**: Eccellente per elaborare richieste attraverso una catena di gestori, con la possibilità di monitorare il flusso tramite eventi.

La scelta del pattern più appropriato dipende dalle specifiche esigenze dell'applicazione, dalla complessità del problema e dalle preferenze di design. Spesso, la combinazione di più pattern può portare a soluzioni ancora più potenti e flessibili.

[Torna all'indice](../README.md) | [Argomento precedente: Eventi Touch e Mobile](./04_Eventi_Touch_Mobile.md)