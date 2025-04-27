# Pattern Avanzati con le Promesse in JavaScript

Oltre ai concetti base delle Promesse e alla sintassi `async/await`, JavaScript offre diversi pattern avanzati per gestire scenari complessi di programmazione asincrona. Questo capitolo esplora questi pattern e come possono essere utilizzati per risolvere problemi comuni.

## Metodi Statici delle Promesse

La classe `Promise` fornisce diversi metodi statici utili per lavorare con più promesse contemporaneamente o per creare promesse con comportamenti specifici.

### Promise.all()

`Promise.all()` accetta un array di promesse e restituisce una nuova promessa che si risolve quando tutte le promesse nell'array si sono risolte, o si rifiuta non appena una qualsiasi promessa nell'array si rifiuta.

```javascript
// Esempio: Recuperare dati da più endpoint in parallelo
const promesseAPI = [
  fetch('https://api.example.com/utenti').then(r => r.json()),
  fetch('https://api.example.com/prodotti').then(r => r.json()),
  fetch('https://api.example.com/ordini').then(r => r.json())
];

Promise.all(promesseAPI)
  .then(([utenti, prodotti, ordini]) => {
    console.log('Utenti:', utenti);
    console.log('Prodotti:', prodotti);
    console.log('Ordini:', ordini);
    
    // Ora possiamo lavorare con tutti i dati
    const risultatoCombinato = combina(utenti, prodotti, ordini);
    return risultatoCombinato;
  })
  .catch(errore => {
    console.error('Almeno una richiesta è fallita:', errore);
    // Se una qualsiasi richiesta fallisce, l'intera operazione fallisce
  });
```

**Caratteristiche chiave**:
- Restituisce i risultati nello stesso ordine delle promesse fornite
- Fallisce rapidamente: se una promessa si rifiuta, l'intera operazione fallisce immediatamente
- Utile quando tutte le operazioni devono avere successo per procedere

### Promise.race()

`Promise.race()` accetta un array di promesse e restituisce una nuova promessa che si risolve o si rifiuta non appena una qualsiasi promessa nell'array si risolve o si rifiuta.

```javascript
// Esempio: Implementazione di un timeout per una richiesta
function fetchConTimeout(url, tempoMs) {
  // Promessa per la richiesta effettiva
  const promessaFetch = fetch(url).then(r => r.json());
  
  // Promessa per il timeout
  const promessaTimeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout dopo ${tempoMs}ms`)), tempoMs);
  });
  
  // Restituisce la prima promessa che si risolve/rifiuta
  return Promise.race([promessaFetch, promessaTimeout]);
}

fetchConTimeout('https://api.example.com/dati', 5000)
  .then(dati => {
    console.log('Dati ricevuti:', dati);
  })
  .catch(errore => {
    if (errore.message.includes('Timeout')) {
      console.error('La richiesta è scaduta');
    } else {
      console.error('Errore durante la richiesta:', errore);
    }
  });
```

**Caratteristiche chiave**:
- Restituisce il risultato della prima promessa che si completa (con successo o fallimento)
- Utile per implementare timeout, scegliere la fonte più veloce, o per "gare" tra risorse

### Promise.allSettled()

Introdotto in ES2020, `Promise.allSettled()` accetta un array di promesse e restituisce una nuova promessa che si risolve quando tutte le promesse sono "settled" (risolte o rifiutate), con un array di oggetti che descrive l'esito di ciascuna promessa.

```javascript
// Esempio: Recuperare dati da più endpoint, gestendo successi e fallimenti
const promesseAPI = [
  fetch('https://api.example.com/utenti').then(r => r.json()),
  fetch('https://api.example.com/prodotti').then(r => r.json()),
  fetch('https://api.example.com/servizio-instabile').then(r => r.json())
];

Promise.allSettled(promesseAPI)
  .then(risultati => {
    // risultati è un array di oggetti con status "fulfilled" o "rejected"
    risultati.forEach((risultato, indice) => {
      if (risultato.status === 'fulfilled') {
        console.log(`API ${indice + 1} completata:`, risultato.value);
      } else {
        console.warn(`API ${indice + 1} fallita:`, risultato.reason);
      }
    });
    
    // Filtra solo i risultati di successo
    const datiDisponibili = risultati
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    return elaboraDatiParziali(datiDisponibili);
  });
```

**Caratteristiche chiave**:
- Non fallisce mai: restituisce sempre un array di risultati
- Ogni risultato ha un campo `status` ("fulfilled" o "rejected") e un campo `value` o `reason`
- Utile quando vuoi procedere anche se alcune operazioni falliscono

### Promise.any()

Introdotto in ES2021, `Promise.any()` accetta un array di promesse e restituisce una nuova promessa che si risolve non appena una qualsiasi promessa nell'array si risolve. Se tutte le promesse si rifiutano, restituisce un `AggregateError` contenente tutti gli errori.

```javascript
// Esempio: Tentare più fonti di dati e utilizzare la prima disponibile
const fontiDati = [
  fetch('https://api-primaria.example.com/dati').then(r => r.json()),
  fetch('https://api-backup1.example.com/dati').then(r => r.json()),
  fetch('https://api-backup2.example.com/dati').then(r => r.json())
];

Promise.any(fontiDati)
  .then(dati => {
    console.log('Dati ricevuti dalla prima fonte disponibile:', dati);
    elaboraDati(dati);
  })
  .catch(errore => {
    // AggregateError contiene tutti gli errori individuali
    console.error('Tutte le fonti di dati hanno fallito:', errore.errors);
  });
```

**Caratteristiche chiave**:
- Restituisce il primo risultato di successo, indipendentemente dall'ordine
- Fallisce solo se tutte le promesse falliscono
- Utile per implementare strategie di fallback o per utilizzare la prima risorsa disponibile

## Promisificazione di API basate su Callback

Molte API JavaScript più datate o di terze parti utilizzano ancora callback invece di promesse. La "promisificazione" è il processo di conversione di queste API in versioni che restituiscono promesse.

### Promisificazione Manuale

```javascript
// Funzione basata su callback
function leggiFile(percorso, opzioni, callback) {
  fs.readFile(percorso, opzioni, (errore, dati) => {
    if (errore) {
      callback(errore);
    } else {
      callback(null, dati);
    }
  });
}

// Versione promisificata manualmente
function leggiFilePromise(percorso, opzioni) {
  return new Promise((resolve, reject) => {
    leggiFile(percorso, opzioni, (errore, dati) => {
      if (errore) {
        reject(errore);
      } else {
        resolve(dati);
      }
    });
  });
}

// Utilizzo
leggiFilePromise('config.json', { encoding: 'utf8' })
  .then(dati => {
    console.log('Contenuto file:', dati);
  })
  .catch(errore => {
    console.error('Errore durante la lettura:', errore);
  });
```

### Funzione di Promisificazione Generica

```javascript
// Funzione generica per promisificare funzioni basate su callback
function promisify(funzione) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      funzione(...args, (errore, risultato) => {
        if (errore) {
          reject(errore);
        } else {
          resolve(risultato);
        }
      });
    });
  };
}

// Utilizzo
const leggiFilePromise = promisify(fs.readFile);
const scriviFilePromise = promisify(fs.writeFile);

async function copiaFile(origine, destinazione) {
  try {
    const contenuto = await leggiFilePromise(origine, { encoding: 'utf8' });
    await scriviFilePromise(destinazione, contenuto);
    console.log(`File copiato da ${origine} a ${destinazione}`);
  } catch (errore) {
    console.error('Errore durante la copia:', errore);
  }
}
```

### Utilizzo di util.promisify in Node.js

Node.js fornisce una funzione `promisify` integrata nel modulo `util`:

```javascript
const util = require('util');
const fs = require('fs');

// Promisifica le funzioni di fs
const leggiFile = util.promisify(fs.readFile);
const scriviFile = util.promisify(fs.writeFile);

async function elaboraFile(percorso) {
  try {
    const contenuto = await leggiFile(percorso, 'utf8');
    const contenutoModificato = contenuto.toUpperCase();
    await scriviFile(`${percorso}.upper`, contenutoModificato);
    return contenutoModificato;
  } catch (errore) {
    console.error('Errore durante l\'elaborazione del file:', errore);
    throw errore;
  }
}
```

## Pattern di Composizione delle Promesse

### Sequenza di Promesse

Eseguire una serie di operazioni asincrone in sequenza, dove ogni operazione dipende dal risultato della precedente:

```javascript
async function eseguiInSequenza(arrayDiFunzioni, valoreIniziale) {
  let risultato = valoreIniziale;
  
  for (const funzione of arrayDiFunzioni) {
    risultato = await funzione(risultato);
  }
  
  return risultato;
}

// Esempio di utilizzo
const operazioni = [
  dati => recuperaUtente(dati.userId),
  utente => recuperaOrdini(utente.id),
  ordini => calcolaTotale(ordini)
];

eseguiInSequenza(operazioni, { userId: 123 })
  .then(totale => {
    console.log('Totale ordini:', totale);
  })
  .catch(errore => {
    console.error('Errore durante la sequenza:', errore);
  });
```

### Pipeline di Promesse

Creare una pipeline di trasformazioni asincrone:

```javascript
function pipeline(...funzioni) {
  return input => funzioni.reduce(
    (promessa, funzione) => promessa.then(funzione),
    Promise.resolve(input)
  );
}

// Esempio di utilizzo
const elaboraImmagine = pipeline(
  caricaImmagine,       // Carica l'immagine da un URL
  ridimensiona,         // Ridimensiona l'immagine
  applicaFiltro,        // Applica un filtro
  convertiFormato,      // Converte in un altro formato
  salva                 // Salva l'immagine elaborata
);

elaboraImmagine('https://example.com/immagine.jpg')
  .then(risultato => {
    console.log('Elaborazione completata:', risultato);
  })
  .catch(errore => {
    console.error('Errore durante l\'elaborazione:', errore);
  });
```

## Pattern di Limitazione della Concorrenza

Eseguire più operazioni asincrone in parallelo, ma limitando il numero di operazioni concorrenti:

```javascript
async function mapConLimite(array, funzione, limite = 5) {
  const risultati = [];
  const promesseInCorso = new Set();
  
  // Crea una copia dell'array per non modificare l'originale
  const elementi = [...array];
  
  // Funzione per elaborare un elemento
  async function elaboraElemento(elemento, indice) {
    try {
      const risultato = await funzione(elemento, indice);
      risultati[indice] = risultato;
    } catch (errore) {
      risultati[indice] = { errore };
    } finally {
      promesseInCorso.delete(elaboraElemento);
    }
  }
  
  // Elabora gli elementi rispettando il limite di concorrenza
  let indice = 0;
  while (indice < elementi.length || promesseInCorso.size > 0) {
    // Aggiungi nuove promesse fino al limite
    while (promesseInCorso.size < limite && indice < elementi.length) {
      const nuovaPromessa = elaboraElemento(elementi[indice], indice);
      promesseInCorso.add(nuovaPromessa);
      indice++;
    }
    
    // Attendi che almeno una promessa si completi
    if (promesseInCorso.size > 0) {
      await Promise.race(promesseInCorso);
    }
  }
  
  return risultati;
}

// Esempio di utilizzo
const urls = [
  'https://api.example.com/1',
  'https://api.example.com/2',
  // ... molti altri URL
  'https://api.example.com/100'
];

async function recuperaDati() {
  try {
    // Elabora massimo 3 URL contemporaneamente
    const risultati = await mapConLimite(urls, async url => {
      const response = await fetch(url);
      return response.json();
    }, 3);
    
    console.log('Tutti i dati recuperati:', risultati);
    return risultati;
  } catch (errore) {
    console.error('Errore durante il recupero dei dati:', errore);
  }
}
```

## Pattern di Cancellazione

Le Promesse in JavaScript non hanno un meccanismo integrato per la cancellazione. Tuttavia, è possibile implementare pattern di cancellazione utilizzando l'API `AbortController`:

```javascript
class OperazioneCancellabile {
  constructor() {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  
  async esegui(funzione, ...args) {
    if (this.signal.aborted) {
      throw new Error('Operazione già cancellata');
    }
    
    try {
      // Passa il signal alla funzione
      return await funzione(this.signal, ...args);
    } catch (errore) {
      if (errore.name === 'AbortError') {
        throw new Error('Operazione cancellata dall\'utente');
      }
      throw errore;
    }
  }
  
  cancella() {
    this.controller.abort();
  }
}

// Esempio di utilizzo
async function recuperaDatiCancellabili(url, signal) {
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error(`Errore HTTP: ${response.status}`);
  }
  
  return response.json();
}

// Utilizzo
const operazione = new OperazioneCancellabile();

// Avvia l'operazione
operazione.esegui(recuperaDatiCancellabili, 'https://api.example.com/dati-enormi')
  .then(dati => {
    console.log('Dati recuperati:', dati);
  })
  .catch(errore => {
    console.error('Operazione fallita:', errore.message);
  });

// In un altro punto del codice (es. quando l'utente clicca "Annulla")
setTimeout(() => {
  console.log('Cancellazione dell\'operazione...');
  operazione.cancella();
}, 2000); // Cancella dopo 2 secondi
```

## Pattern di Cache delle Promesse

Evitare di ripetere operazioni asincrone costose memorizzando i risultati:

```javascript
class CachePromesse {
  constructor(tempoScadenzaMs = 60000) {
    this.cache = new Map();
    this.tempoScadenzaMs = tempoScadenzaMs;
  }
  
  async get(chiave, funzioneFactory) {
    const elementoCache = this.cache.get(chiave);
    
    // Verifica se l'elemento è in cache e non è scaduto
    if (elementoCache && Date.now() - elementoCache.timestamp < this.tempoScadenzaMs) {
      return elementoCache.promessa;
    }
    
    // Crea una nuova promessa
    const promessa = funzioneFactory();
    
    // Memorizza la promessa in cache
    this.cache.set(chiave, {
      promessa,
      timestamp: Date.now()
    });
    
    try {
      // Attendi il completamento e restituisci il risultato
      return await promessa;
    } catch (errore) {
      // In caso di errore, rimuovi dalla cache
      this.cache.delete(chiave);
      throw errore;
    }
  }
  
  invalidate(chiave) {
    this.cache.delete(chiave);
  }
  
  clear() {
    this.cache.clear();
  }
}

// Esempio di utilizzo
const cacheAPI = new CachePromesse(5 * 60 * 1000); // 5 minuti

async function recuperaDatiUtente(id) {
  return cacheAPI.get(`utente_${id}`, () => {
    console.log(`Recupero dati per l'utente ${id} dall'API...`);
    return fetch(`https://api.example.com/utenti/${id}`).then(r => r.json());
  });
}

// Prima chiamata: recupera dall'API
recuperaDatiUtente(123).then(utente => console.log('Prima chiamata:', utente));

// Seconda chiamata (dopo 1 secondo): recupera dalla cache
setTimeout(() => {
  recuperaDatiUtente(123).then(utente => console.log('Seconda chiamata:', utente));
}, 1000);

// Terza chiamata (dopo invalidazione): recupera nuovamente dall'API
setTimeout(() => {
  cacheAPI.invalidate('utente_123');
  recuperaDatiUtente(123).then(utente => console.log('Terza chiamata:', utente));
}, 2000);
```

## Conclusione

I pattern avanzati con le Promesse offrono soluzioni potenti per gestire scenari complessi di programmazione asincrona in JavaScript. Combinando questi pattern con la sintassi `async/await`, è possibile creare codice asincrono che è allo stesso tempo potente, leggibile e manutenibile.

Ricorda che la scelta del pattern giusto dipende dalle specifiche esigenze del tuo progetto. Non esiste un approccio universale, ma piuttosto una serie di strumenti tra cui scegliere in base al contesto.

[Torna all'indice](../README.md) | [Argomento precedente: Async/Await](./04_Async_Await.md)