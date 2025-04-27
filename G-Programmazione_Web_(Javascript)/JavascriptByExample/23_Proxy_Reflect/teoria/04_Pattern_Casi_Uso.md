# Pattern e Casi d'Uso di Proxy e Reflect

In questo capitolo, esploreremo pattern comuni e casi d'uso pratici che sfruttano le API Proxy e Reflect per risolvere problemi reali di programmazione.

## 1. Validazione dei Dati

Uno dei casi d'uso più comuni per i Proxy è la validazione dei dati. Possiamo intercettare le operazioni di scrittura per garantire che i dati soddisfino determinati criteri prima di essere memorizzati.

### Esempio: Schema di Validazione

```javascript
function creaOggettoValidato(schema) {
  return new Proxy({}, {
    set(target, proprietà, valore, receiver) {
      // Verifica se la proprietà ha uno schema di validazione
      if (schema[proprietà]) {
        const { tipo, validatore, messaggio } = schema[proprietà];
        
        // Verifica il tipo
        if (tipo && typeof valore !== tipo) {
          throw new TypeError(`La proprietà '${proprietà}' deve essere di tipo ${tipo}`);
        }
        
        // Esegui il validatore personalizzato
        if (validatore && !validatore(valore)) {
          throw new Error(messaggio || `Valore non valido per la proprietà '${proprietà}'`);
        }
      }
      
      // Se la validazione passa, memorizza il valore
      return Reflect.set(target, proprietà, valore, receiver);
    }
  });
}

// Utilizzo
const utente = creaOggettoValidato({
  nome: {
    tipo: 'string',
    validatore: valore => valore.length >= 3,
    messaggio: 'Il nome deve contenere almeno 3 caratteri'
  },
  email: {
    tipo: 'string',
    validatore: valore => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valore),
    messaggio: 'Email non valida'
  },
  età: {
    tipo: 'number',
    validatore: valore => valore >= 18 && valore <= 120,
    messaggio: "L'età deve essere compresa tra 18 e 120"
  }
});

utente.nome = 'Mario'; // OK
utente.email = 'mario@esempio.it'; // OK
utente.età = 30; // OK

// utente.nome = 'Ma'; // Errore: Il nome deve contenere almeno 3 caratteri
// utente.email = 'non-email'; // Errore: Email non valida
// utente.età = 'trenta'; // Errore: La proprietà 'età' deve essere di tipo number
```

## 2. Oggetti Reattivi

I Proxy possono essere utilizzati per creare sistemi reattivi, dove le modifiche a un oggetto possono innescare automaticamente aggiornamenti o notifiche.

### Esempio: Sistema di Osservazione

```javascript
function creaOggettoReattivo(oggetto) {
  const osservatori = new Map();
  
  return new Proxy(oggetto, {
    set(target, proprietà, valore, receiver) {
      const vecchioValore = Reflect.get(target, proprietà, receiver);
      const risultato = Reflect.set(target, proprietà, valore, receiver);
      
      // Notifica gli osservatori solo se il valore è cambiato
      if (vecchioValore !== valore) {
        if (osservatori.has(proprietà)) {
          const callbacks = osservatori.get(proprietà);
          callbacks.forEach(callback => {
            callback(valore, vecchioValore, proprietà);
          });
        }
      }
      
      return risultato;
    },
    
    // Metodo per aggiungere osservatori
    osserva(proprietà, callback) {
      if (!osservatori.has(proprietà)) {
        osservatori.set(proprietà, new Set());
      }
      osservatori.get(proprietà).add(callback);
      
      return () => {
        // Funzione per rimuovere l'osservatore
        osservatori.get(proprietà).delete(callback);
      };
    }
  });
}

// Utilizzo
const stato = creaOggettoReattivo({
  contatore: 0,
  messaggio: 'Iniziale'
});

// Aggiungiamo un osservatore per la proprietà 'contatore'
stato.osserva('contatore', (nuovoValore, vecchioValore) => {
  console.log(`Contatore cambiato da ${vecchioValore} a ${nuovoValore}`);
});

// Aggiungiamo un osservatore per la proprietà 'messaggio'
stato.osserva('messaggio', (nuovoValore) => {
  console.log(`Nuovo messaggio: ${nuovoValore}`);
});

// Modifichiamo le proprietà
stato.contatore = 1; // Contatore cambiato da 0 a 1
stato.messaggio = 'Aggiornato'; // Nuovo messaggio: Aggiornato
```

## 3. Controllo degli Accessi

I Proxy possono essere utilizzati per implementare meccanismi di controllo degli accessi, limitando la lettura o la modifica di determinate proprietà.

### Esempio: Oggetto con Proprietà Private

```javascript
function creaOggettoConProprietàPrivate(pubbliche = {}, private = {}) {
  return new Proxy(pubbliche, {
    get(target, proprietà, receiver) {
      if (proprietà.startsWith('_')) {
        throw new Error(`Accesso negato alla proprietà privata '${proprietà}'`);
      }
      
      // Controlla se è una proprietà privata accessibile tramite getter pubblico
      if (private.hasOwnProperty(proprietà)) {
        return private[proprietà];
      }
      
      return Reflect.get(target, proprietà, receiver);
    },
    
    set(target, proprietà, valore, receiver) {
      if (proprietà.startsWith('_')) {
        throw new Error(`Modifica negata alla proprietà privata '${proprietà}'`);
      }
      
      // Controlla se è una proprietà privata accessibile tramite setter pubblico
      if (private.hasOwnProperty(proprietà)) {
        private[proprietà] = valore;
        return true;
      }
      
      return Reflect.set(target, proprietà, valore, receiver);
    },
    
    has(target, proprietà) {
      if (proprietà.startsWith('_')) {
        return false; // Nascondi le proprietà private dall'operatore 'in'
      }
      
      return Reflect.has(target, proprietà) || private.hasOwnProperty(proprietà);
    },
    
    ownKeys(target) {
      // Filtra le chiavi private
      return Reflect.ownKeys(target).filter(key => !String(key).startsWith('_'));
    }
  });
}

// Utilizzo
const utente = creaOggettoConProprietàPrivate(
  { // Proprietà pubbliche
    nome: 'Mario',
    saluta() {
      return `Ciao, sono ${this.nome} e ho ${this.età} anni`;
    }
  },
  { // Proprietà private
    età: 30,
    _password: 'segreto123'
  }
);

console.log(utente.nome); // Mario
console.log(utente.età); // 30
console.log(utente.saluta()); // Ciao, sono Mario e ho 30 anni

// console.log(utente._password); // Errore: Accesso negato alla proprietà privata '_password'
// utente._nuovaPrivata = 'valore'; // Errore: Modifica negata alla proprietà privata '_nuovaPrivata'

console.log('nome' in utente); // true
console.log('età' in utente); // true
console.log('_password' in utente); // false

console.log(Object.keys(utente)); // ['nome', 'saluta']
```

## 4. Logging e Debugging

I Proxy sono eccellenti per implementare funzionalità di logging e debugging senza modificare il codice originale.

### Esempio: Logger Automatico

```javascript
function creaLoggerOggetto(oggetto, nomeOggetto = '') {
  const prefisso = nomeOggetto ? `${nomeOggetto}.` : '';
  
  return new Proxy(oggetto, {
    get(target, proprietà, receiver) {
      const valore = Reflect.get(target, proprietà, receiver);
      console.log(`GET: ${prefisso}${proprietà}`);
      
      // Se il valore è una funzione, crea un proxy anche per essa
      if (typeof valore === 'function') {
        return function(...args) {
          console.log(`CALL: ${prefisso}${proprietà}(${args.map(a => JSON.stringify(a)).join(', ')})`);
          const risultato = valore.apply(this === receiver ? target : this, args);
          console.log(`RESULT: ${prefisso}${proprietà} => ${JSON.stringify(risultato)}`);
          return risultato;
        };
      }
      
      return valore;
    },
    
    set(target, proprietà, valore, receiver) {
      console.log(`SET: ${prefisso}${proprietà} = ${JSON.stringify(valore)}`);
      return Reflect.set(target, proprietà, valore, receiver);
    },
    
    apply(target, thisArg, args) {
      console.log(`APPLY: ${prefisso}(${args.map(a => JSON.stringify(a)).join(', ')})`);
      const risultato = Reflect.apply(target, thisArg, args);
      console.log(`APPLY RESULT: ${prefisso} => ${JSON.stringify(risultato)}`);
      return risultato;
    }
  });
}

// Utilizzo
const calcolatrice = creaLoggerOggetto({
  valore: 0,
  aggiungi(n) {
    this.valore += n;
    return this.valore;
  },
  sottrai(n) {
    this.valore -= n;
    return this.valore;
  }
}, 'calcolatrice');

calcolatrice.valore; // GET: calcolatrice.valore
calcolatrice.aggiungi(5); // GET: calcolatrice.aggiungi, CALL: calcolatrice.aggiungi(5), GET: calcolatrice.valore, SET: calcolatrice.valore = 5, RESULT: calcolatrice.aggiungi => 5
calcolatrice.sottrai(2); // GET: calcolatrice.sottrai, CALL: calcolatrice.sottrai(2), GET: calcolatrice.valore, SET: calcolatrice.valore = 3, RESULT: calcolatrice.sottrai => 3
```

## 5. Memorizzazione (Memoization)

I Proxy possono essere utilizzati per implementare la memorizzazione dei risultati di funzioni costose.

### Esempio: Funzione con Memorizzazione

```javascript
function memorizza(funzione) {
  const cache = new Map();
  
  return new Proxy(funzione, {
    apply(target, thisArg, args) {
      // Crea una chiave di cache basata sugli argomenti
      const chiaveCache = JSON.stringify(args);
      
      // Controlla se il risultato è già in cache
      if (cache.has(chiaveCache)) {
        console.log(`Risultato in cache per ${target.name}(${args})`);
        return cache.get(chiaveCache);
      }
      
      // Altrimenti, esegui la funzione e memorizza il risultato
      console.log(`Calcolo risultato per ${target.name}(${args})`);
      const risultato = Reflect.apply(target, thisArg, args);
      cache.set(chiaveCache, risultato);
      return risultato;
    }
  });
}

// Funzione costosa da memorizzare
function calcolaFibonacci(n) {
  if (n <= 1) return n;
  return calcolaFibonacci(n - 1) + calcolaFibonacci(n - 2);
}

// Versione memorizzata
const fibonacciMemo = memorizza(function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.time('Senza memo');
calcolaFibonacci(30); // Molto lento
console.timeEnd('Senza memo');

console.time('Con memo');
fibonacciMemo(30); // Molto più veloce
console.timeEnd('Con memo');

// Chiamata ripetuta usa la cache
fibonacciMemo(30); // Istantaneo, usa la cache
```

## 6. Oggetti Immutabili

I Proxy possono essere utilizzati per creare oggetti immutabili che non possono essere modificati dopo la creazione.

### Esempio: Oggetto Immutabile

```javascript
function creaOggettoImmutabile(oggetto) {
  // Rendi immutabili anche gli oggetti annidati
  for (const key in oggetto) {
    if (typeof oggetto[key] === 'object' && oggetto[key] !== null) {
      oggetto[key] = creaOggettoImmutabile(oggetto[key]);
    }
  }
  
  return new Proxy(oggetto, {
    set() {
      throw new Error('Impossibile modificare un oggetto immutabile');
    },
    
    deleteProperty() {
      throw new Error('Impossibile eliminare proprietà da un oggetto immutabile');
    },
    
    defineProperty() {
      throw new Error('Impossibile definire proprietà su un oggetto immutabile');
    },
    
    setPrototypeOf() {
      throw new Error('Impossibile modificare il prototipo di un oggetto immutabile');
    }
  });
}

// Utilizzo
const configurazione = creaOggettoImmutabile({
  app: {
    nome: 'MyApp',
    versione: '1.0.0'
  },
  server: {
    porta: 3000,
    host: 'localhost'
  }
});

console.log(configurazione.app.nome); // MyApp
console.log(configurazione.server.porta); // 3000

// configurazione.app.versione = '1.0.1'; // Errore: Impossibile modificare un oggetto immutabile
// delete configurazione.server.host; // Errore: Impossibile eliminare proprietà da un oggetto immutabile
// configurazione.nuovaProp = 'valore'; // Errore: Impossibile modificare un oggetto immutabile
```

## 7. Proxy Revocabili

I Proxy revocabili sono utili quando si desidera concedere temporaneamente l'accesso a un oggetto e poi revocarlo.

### Esempio: Accesso Temporaneo

```javascript
function creaAccessoTemporaneo(oggetto, tempoAccesso) {
  const { proxy, revoke } = Proxy.revocable(oggetto, {
    get(target, prop, receiver) {
      console.log(`Accesso alla proprietà: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  });
  
  // Imposta un timer per revocare l'accesso
  setTimeout(() => {
    console.log('Accesso revocato!');
    revoke();
  }, tempoAccesso);
  
  return proxy;
}

// Utilizzo
const dati = { segreto: 'informazione riservata' };
const accessoTemporaneo = creaAccessoTemporaneo(dati, 5000); // 5 secondi di accesso

// Funziona per 5 secondi
console.log(accessoTemporaneo.segreto); // Accesso alla proprietà: segreto, informazione riservata

// Dopo 5 secondi, qualsiasi accesso genererà un errore
setTimeout(() => {
  try {
    console.log(accessoTemporaneo.segreto);
  } catch (e) {
    console.log('Errore:', e.message); // Errore: Cannot perform 'get' on a proxy that has been revoked
  }
}, 6000);
```

## 8. Implementazione di Interfacce

I Proxy possono essere utilizzati per garantire che un oggetto implementi una determinata interfaccia.

### Esempio: Verifica dell'Interfaccia

```javascript
function implementaInterfaccia(oggetto, interfaccia) {
  // Verifica che tutte le proprietà e metodi dell'interfaccia siano implementati
  for (const prop in interfaccia) {
    if (!(prop in oggetto)) {
      throw new Error(`L'oggetto non implementa la proprietà/metodo richiesto: ${prop}`);
    }
    
    // Verifica che il tipo corrisponda
    if (typeof oggetto[prop] !== typeof interfaccia[prop]) {
      throw new Error(`La proprietà ${prop} è di tipo ${typeof oggetto[prop]}, ma dovrebbe essere ${typeof interfaccia[prop]}`);
    }
  }
  
  // Crea un proxy che verifica l'uso corretto dell'interfaccia
  return new Proxy(oggetto, {
    get(target, prop, receiver) {
      const valore = Reflect.get(target, prop, receiver);
      
      // Se la proprietà è nell'interfaccia e il valore è una funzione, verifica gli argomenti
      if (prop in interfaccia && typeof valore === 'function') {
        return function(...args) {
          // Qui si potrebbero aggiungere verifiche sugli argomenti
          return valore.apply(this === receiver ? target : this, args);
        };
      }
      
      return valore;
    }
  });
}

// Definizione dell'interfaccia
const interfacciaRepository = {
  findById: function() {},
  save: function() {},
  delete: function() {},
  findAll: function() {}
};

// Implementazione dell'interfaccia
const utenteRepository = {
  findById(id) { return { id, nome: 'Utente ' + id }; },
  save(utente) { console.log('Salvataggio utente:', utente); return true; },
  delete(id) { console.log('Eliminazione utente:', id); return true; },
  findAll() { return [{ id: 1, nome: 'Utente 1' }, { id: 2, nome: 'Utente 2' }]; }
};

// Verifica e crea proxy
const repository = implementaInterfaccia(utenteRepository, interfacciaRepository);

// Utilizzo
const utente = repository.findById(1);
console.log(utente); // { id: 1, nome: 'Utente 1' }

repository.save({ id: 3, nome: 'Nuovo Utente' }); // Salvataggio utente: { id: 3, nome: 'Nuovo Utente' }
```

## Conclusione

Proxy e Reflect offrono potenti strumenti per la metaprogrammazione in JavaScript, consentendo di implementare pattern avanzati che sarebbero difficili o impossibili da realizzare altrimenti. Questi pattern possono migliorare significativamente la qualità, la manutenibilità e la flessibilità del codice.

Tuttavia, è importante utilizzare queste tecniche con giudizio. La metaprogrammazione può rendere il codice più difficile da comprendere e debuggare se utilizzata in modo eccessivo o inappropriato. Come regola generale, è consigliabile utilizzare Proxy e Reflect quando offrono un chiaro vantaggio in termini di astrazione, sicurezza o funzionalità, mantenendo sempre la leggibilità e la manutenibilità del codice come priorità.