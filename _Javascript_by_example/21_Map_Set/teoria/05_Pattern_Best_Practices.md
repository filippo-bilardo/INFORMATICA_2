# Pattern e Best Practices

## Introduzione

In questo capitolo, esploreremo pattern comuni e best practices per l'utilizzo efficace delle strutture dati `Map`, `Set`, `WeakMap` e `WeakSet` in JavaScript. Vedremo come queste strutture possono essere utilizzate per risolvere problemi specifici e come integrarle in modo efficiente nelle applicazioni reali.

## Pattern Comuni con Map

### 1. Cache con Memoization

La memoization è una tecnica di ottimizzazione che memorizza i risultati di chiamate a funzione costose per riutilizzarli quando gli stessi input si ripresentano.

```javascript
function creaFunzioneMemoizzata(fn) {
  const cache = new Map();
  
  return function(...args) {
    // Crea una chiave unica basata sugli argomenti
    const chiave = JSON.stringify(args);
    
    // Verifica se il risultato è già in cache
    if (cache.has(chiave)) {
      console.log('Risultato recuperato dalla cache');
      return cache.get(chiave);
    }
    
    // Calcola il risultato
    console.log('Calcolo del risultato...');
    const risultato = fn.apply(this, args);
    
    // Memorizza in cache
    cache.set(chiave, risultato);
    
    return risultato;
  };
}

// Esempio: funzione costosa che calcola il fattoriale
function fattoriale(n) {
  if (n <= 1) return 1;
  return n * fattoriale(n - 1);
}

const fattorialeMemoizzato = creaFunzioneMemoizzata(fattoriale);

console.log(fattorialeMemoizzato(10)); // Calcolo del risultato...
console.log(fattorialeMemoizzato(10)); // Risultato recuperato dalla cache
```

### 2. Gestione dello Stato

```javascript
class GestoreStato {
  constructor(statoIniziale = {}) {
    this.stato = new Map(Object.entries(statoIniziale));
    this.listeners = new Map();
  }
  
  // Ottieni un valore
  get(chiave) {
    return this.stato.get(chiave);
  }
  
  // Imposta un valore e notifica i listener
  set(chiave, valore) {
    const vecchioValore = this.stato.get(chiave);
    this.stato.set(chiave, valore);
    
    // Notifica i listener
    if (this.listeners.has(chiave)) {
      this.listeners.get(chiave).forEach(callback => {
        callback(valore, vecchioValore);
      });
    }
    
    return this;
  }
  
  // Registra un listener per una chiave
  subscribe(chiave, callback) {
    if (!this.listeners.has(chiave)) {
      this.listeners.set(chiave, new Set());
    }
    
    this.listeners.get(chiave).add(callback);
    
    // Restituisci una funzione per annullare l'iscrizione
    return () => {
      this.listeners.get(chiave).delete(callback);
      if (this.listeners.get(chiave).size === 0) {
        this.listeners.delete(chiave);
      }
    };
  }
}

// Esempio di utilizzo
const stato = new GestoreStato({ contatore: 0, utente: null });

// Registra un listener
const unsubscribe = stato.subscribe('contatore', (nuovoValore, vecchioValore) => {
  console.log(`Contatore cambiato da ${vecchioValore} a ${nuovoValore}`);
});

// Modifica lo stato
stato.set('contatore', 1); // Contatore cambiato da 0 a 1
stato.set('contatore', 2); // Contatore cambiato da 1 a 2

// Annulla l'iscrizione
unsubscribe();

// Questa modifica non genererà notifiche
stato.set('contatore', 3);
```

### 3. Grafo e Relazioni

```javascript
class Grafo {
  constructor() {
    this.nodi = new Map();
  }
  
  // Aggiungi un nodo
  aggiungiNodo(chiave, valore = chiave) {
    this.nodi.set(chiave, {
      valore,
      adiacenti: new Map()
    });
    return this;
  }
  
  // Aggiungi un arco tra due nodi
  aggiungiArco(origine, destinazione, peso = 1) {
    // Assicurati che entrambi i nodi esistano
    if (!this.nodi.has(origine)) this.aggiungiNodo(origine);
    if (!this.nodi.has(destinazione)) this.aggiungiNodo(destinazione);
    
    // Aggiungi l'arco
    this.nodi.get(origine).adiacenti.set(destinazione, peso);
    
    return this;
  }
  
  // Ottieni tutti i nodi adiacenti a un nodo
  getAdiacenti(nodo) {
    const adiacenti = this.nodi.get(nodo)?.adiacenti;
    return adiacenti ? [...adiacenti.keys()] : [];
  }
  
  // Verifica se esiste un percorso tra due nodi
  esistePercorso(origine, destinazione) {
    if (!this.nodi.has(origine) || !this.nodi.has(destinazione)) {
      return false;
    }
    
    const visitati = new Set();
    const coda = [origine];
    
    while (coda.length > 0) {
      const nodoCorrente = coda.shift();
      
      if (nodoCorrente === destinazione) {
        return true;
      }
      
      if (!visitati.has(nodoCorrente)) {
        visitati.add(nodoCorrente);
        
        for (const adiacente of this.getAdiacenti(nodoCorrente)) {
          coda.push(adiacente);
        }
      }
    }
    
    return false;
  }
}

// Esempio di utilizzo
const grafo = new Grafo();

grafo.aggiungiNodo('A')
     .aggiungiNodo('B')
     .aggiungiNodo('C')
     .aggiungiNodo('D');

grafo.aggiungiArco('A', 'B', 3)
     .aggiungiArco('B', 'C', 1)
     .aggiungiArco('C', 'D', 2)
     .aggiungiArco('A', 'D', 10);

console.log(grafo.getAdiacenti('A')); // ['B', 'D']
console.log(grafo.esistePercorso('A', 'C')); // true
console.log(grafo.esistePercorso('D', 'A')); // false (grafo direzionato)
```

## Pattern Comuni con Set

### 1. Eliminazione di Duplicati

```javascript
function rimuoviDuplicati(array) {
  return [...new Set(array)];
}

const numeri = [1, 2, 2, 3, 4, 4, 5];
console.log(rimuoviDuplicati(numeri)); // [1, 2, 3, 4, 5]

// Funziona anche con oggetti, ma confronta per riferimento
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const oggetti = [obj1, obj2, obj1];
console.log(rimuoviDuplicati(oggetti).length); // 2
```

### 2. Operazioni su Insiemi

```javascript
class Insieme {
  constructor(elementi = []) {
    this.elementi = new Set(elementi);
  }
  
  // Unione: A ∪ B
  unione(altroInsieme) {
    return new Insieme([...this.elementi, ...altroInsieme.elementi]);
  }
  
  // Intersezione: A ∩ B
  intersezione(altroInsieme) {
    return new Insieme(
      [...this.elementi].filter(elemento => 
        altroInsieme.elementi.has(elemento)
      )
    );
  }
  
  // Differenza: A - B
  differenza(altroInsieme) {
    return new Insieme(
      [...this.elementi].filter(elemento => 
        !altroInsieme.elementi.has(elemento)
      )
    );
  }
  
  // Differenza simmetrica: (A - B) ∪ (B - A)
  differenzaSimmetrica(altroInsieme) {
    return this.differenza(altroInsieme).unione(altroInsieme.differenza(this));
  }
  
  // Verifica se questo insieme è sottoinsieme di un altro
  èSottoinsieme(altroInsieme) {
    for (const elemento of this.elementi) {
      if (!altroInsieme.elementi.has(elemento)) {
        return false;
      }
    }
    return true;
  }
  
  // Converti in array
  toArray() {
    return [...this.elementi];
  }
  
  // Dimensione dell'insieme
  get size() {
    return this.elementi.size;
  }
}

// Esempio di utilizzo
const A = new Insieme([1, 2, 3, 4]);
const B = new Insieme([3, 4, 5, 6]);

console.log(A.unione(B).toArray()); // [1, 2, 3, 4, 5, 6]
console.log(A.intersezione(B).toArray()); // [3, 4]
console.log(A.differenza(B).toArray()); // [1, 2]
console.log(A.differenzaSimmetrica(B).toArray()); // [1, 2, 5, 6]
console.log(new Insieme([1, 2]).èSottoinsieme(A)); // true
```

### 3. Filtro di Elementi Unici

```javascript
function trovaElementiUnici(array) {
  const conteggio = new Map();
  
  // Conta le occorrenze di ogni elemento
  for (const elemento of array) {
    conteggio.set(elemento, (conteggio.get(elemento) || 0) + 1);
  }
  
  // Filtra gli elementi che appaiono esattamente una volta
  return array.filter(elemento => conteggio.get(elemento) === 1);
}

const numeri = [1, 2, 2, 3, 4, 4, 5];
console.log(trovaElementiUnici(numeri)); // [1, 3, 5]
```

## Pattern Comuni con WeakMap

### 1. Dati Privati per Classi

```javascript
// Utilizzo di WeakMap per implementare campi privati
const _privato = new WeakMap();

class Persona {
  constructor(nome, età) {
    // Inizializza i dati privati
    _privato.set(this, {
      nome,
      età
    });
  }
  
  // Getter
  getNome() {
    return _privato.get(this).nome;
  }
  
  getEtà() {
    return _privato.get(this).età;
  }
  
  // Setter
  setNome(nuovoNome) {
    _privato.get(this).nome = nuovoNome;
  }
  
  setEtà(nuovaEtà) {
    if (nuovaEtà < 0) throw new Error('L\'età non può essere negativa');
    _privato.get(this).età = nuovaEtà;
  }
  
  // Metodo pubblico che utilizza dati privati
  saluta() {
    const { nome, età } = _privato.get(this);
    return `Ciao, mi chiamo ${nome} e ho ${età} anni.`;
  }
}

const persona = new Persona('Mario', 30);
console.log(persona.saluta()); // 'Ciao, mi chiamo Mario e ho 30 anni.'

// I dati privati non sono accessibili direttamente
console.log(persona.nome); // undefined

// Ma possono essere modificati tramite i metodi pubblici
persona.setNome('Luigi');
console.log(persona.getNome()); // 'Luigi'
```

### 2. Cache con Pulizia Automatica

```javascript
const cache = new WeakMap();

function elaboraDati(oggetto) {
  // Verifica se i risultati sono già in cache
  if (cache.has(oggetto)) {
    console.log('Risultato recuperato dalla cache');
    return cache.get(oggetto);
  }
  
  console.log('Elaborazione dei dati...');
  // Simula un'elaborazione costosa
  const risultato = { 
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    dati: `Dati elaborati per ${oggetto.id || 'oggetto sconosciuto'}`
  };
  
  // Memorizza il risultato in cache
  cache.set(oggetto, risultato);
  
  return risultato;
}

// Esempio di utilizzo
let oggetto = { id: 'A123' };

console.log(elaboraDati(oggetto)); // Elaborazione dei dati...
console.log(elaboraDati(oggetto)); // Risultato recuperato dalla cache

// Se l'oggetto viene garbage collected, la sua voce nella cache verrà rimossa
oggetto = null; // Ora l'oggetto può essere garbage collected
```

### 3. Associazione di Metadati a DOM Elements

```javascript
const metadati = new WeakMap();

function aggiungiMetadati(elemento, dati) {
  metadati.set(elemento, {
    ...metadati.get(elemento),
    ...dati,
    ultimoAggiornamento: new Date()
  });
}

function ottieniMetadati(elemento) {
  return metadati.get(elemento);
}

// Esempio di utilizzo con elementi DOM
document.querySelectorAll('button').forEach(button => {
  // Associa metadati all'elemento
  aggiungiMetadati(button, {
    clickCount: 0,
    creato: new Date()
  });
  
  // Aggiorna i metadati quando l'utente interagisce con l'elemento
  button.addEventListener('click', function() {
    const dati = ottieniMetadati(this);
    aggiungiMetadati(this, {
      clickCount: dati.clickCount + 1
    });
    
    console.log(`Button cliccato ${ottieniMetadati(this).clickCount} volte`);
  });
});
```

## Pattern Comuni con WeakSet

### 1. Tracciamento di Oggetti Visitati

```javascript
const visitati = new WeakSet();

function processaOggetto(oggetto) {
  // Verifica se l'oggetto è già stato processato
  if (visitati.has(oggetto)) {
    console.log('Oggetto già processato, salto...');
    return false;
  }
  
  // Processa l'oggetto
  console.log('Processo l\'oggetto:', oggetto);
  // ... logica di elaborazione ...
  
  // Marca l'oggetto come visitato
  visitati.add(oggetto);
  return true;
}

// Esempio di utilizzo
const oggetto1 = { id: 1, nome: 'Primo' };
const oggetto2 = { id: 2, nome: 'Secondo' };

processaOggetto(oggetto1); // Processo l'oggetto: { id: 1, nome: 'Primo' }
processaOggetto(oggetto1); // Oggetto già processato, salto...
processaOggetto(oggetto2); // Processo l'oggetto: { id: 2, nome: 'Secondo' }
```

### 2. Prevenzione di Modifiche Circolari

```javascript
const inElaborazione = new WeakSet();

function aggiornaOggetto(oggetto, aggiornamenti) {
  // Verifica se l'oggetto è già in fase di aggiornamento
  if (inElaborazione.has(oggetto)) {
    console.warn('Rilevato aggiornamento circolare, interrompo');
    return oggetto;
  }
  
  // Marca l'oggetto come in elaborazione
  inElaborazione.add(oggetto);
  
  try {
    // Applica gli aggiornamenti
    for (const [chiave, valore] of Object.entries(aggiornamenti)) {
      // Se il valore è un oggetto, aggiorna ricorsivamente
      if (valore && typeof valore === 'object') {
        oggetto[chiave] = aggiornaOggetto(oggetto[chiave] || {}, valore);
      } else {
        oggetto[chiave] = valore;
      }
    }
    
    return oggetto;
  } finally {
    // Rimuovi il marker di elaborazione
    inElaborazione.delete(oggetto);
  }
}

// Esempio di utilizzo
const utente = { nome: 'Mario', indirizzo: { città: 'Roma' } };

// Aggiornamento normale
aggiornaOggetto(utente, { età: 30, indirizzo: { cap: '00100' } });
console.log(utente);
// { nome: 'Mario', indirizzo: { città: 'Roma', cap: '00100' }, età: 30 }

// Aggiornamento circolare (simulato)
const aggiornamentoCircolare = { riferimento: utente };
utente.riferimentoCircolare = aggiornamentoCircolare;

// Questo genererà un avviso
aggiornaOggetto(utente, { riferimentoCircolare: { nuovoCampo: true } });
```

## Best Practices

### 1. Scegliere la Struttura Dati Appropriata

```javascript
// SBAGLIATO: Usare un oggetto quando le chiavi non sono stringhe
function contaOccorrenzeErrato(oggetti) {
  const conteggio = {};
  
  for (const obj of oggetti) {
    // Gli oggetti vengono convertiti in stringhe come chiavi!
    conteggio[obj] = (conteggio[obj] || 0) + 1;
  }
  
  return conteggio;
}

// CORRETTO: Usare Map quando le chiavi sono oggetti
function contaOccorrenzeCorretto(oggetti) {
  const conteggio = new Map();
  
  for (const obj of oggetti) {
    conteggio.set(obj, (conteggio.get(obj) || 0) + 1);
  }
  
  return conteggio;
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };
const array = [obj1, obj2, obj1];

console.log(contaOccorrenzeErrato(array)); 
// { '[object Object]': 3 } - Tutti gli oggetti diventano la stessa chiave!

const risultatoCorretto = contaOccorrenzeCorretto(array);
console.log(risultatoCorretto.get(obj1)); // 2
console.log(risultatoCorretto.get(obj2)); // 1
```

### 2. Evitare Memory Leak

```javascript
// SBAGLIATO: Usare Map per memorizzare dati associati a elementi DOM
const datiElementiErrato = new Map();

function configuraPaginaErrato() {
  const bottone = document.createElement('button');
  bottone.textContent = 'Clicca';
  
  // Memorizza dati associati al bottone
  datiElementiErrato.set(bottone, { clickCount: 0 });
  
  bottone.addEventListener('click', () => {
    const dati = datiElementiErrato.get(bottone);
    dati.clickCount++;
    console.log(`Cliccato ${dati.clickCount} volte`);
  });
  
  document.body.appendChild(bottone);
  
  // Anche se rimuoviamo il bottone, i suoi dati rimangono in memoria
  // document.body.removeChild(bottone);
}

// CORRETTO: Usare WeakMap per evitare memory leak
const datiElementiCorretto = new WeakMap();

function configuraPaginaCorretto() {
  const bottone = document.createElement('button');
  bottone.textContent = 'Clicca';
  
  // Memorizza dati associati al bottone
  datiElementiCorretto.set(bottone, { clickCount: 0 });
  
  bottone.addEventListener('click', () => {
    const dati = datiElementiCorretto.get(bottone);
    dati.clickCount++;
    console.log(`Cliccato ${dati.clickCount} volte`);
  });
  
  document.body.appendChild(bottone);
  
  // Quando rimuoviamo il bottone, i suoi dati verranno garbage collected
  // document.body.removeChild(bottone);
}
```

### 3. Ottimizzare le Prestazioni

```javascript
// SBAGLIATO: Ricerca inefficiente in array
function trovaElementoErrato(array, elemento) {
  return array.includes(elemento); // O(n)
}

// CORRETTO: Ricerca efficiente con Set
function trovaElementoCorretto(array, elemento) {
  // Converti in Set solo una volta, non ad ogni ricerca
  const set = new Set(array);
  return set.has(elemento); // O(1)
}

// Per ricerche multiple, è più efficiente convertire l'array in Set una sola volta
function creaRicercaEfficiente(array) {
  const set = new Set(array);
  return elemento => set.has(elemento);
}

const numeri = Array.from({ length: 10000 }, (_, i) => i);

console.time('Ricerca in array');
for (let i = 0; i < 1000; i++) {
  trovaElementoErrato(numeri, 9999);
}
console.timeEnd('Ricerca in array');

console.time('Ricerca in Set');
for (let i = 0; i < 1000; i++) {
  trovaElementoCorretto(numeri, 9999);
}
console.timeEnd('Ricerca in Set');

console.time('Ricerca con funzione ottimizzata');
const cercaNumero = creaRicercaEfficiente(numeri);
for (let i = 0; i < 1000; i++) {
  cercaNumero(9999);
}
console.timeEnd('Ricerca con funzione ottimizzata');
```

### 4. Serializzazione e Deserializzazione

```javascript
// SBAGLIATO: Tentativo di serializzare Map direttamente
function serializzaMappaErrato(mappa) {
  return JSON.stringify(mappa); // Non funziona come previsto
}

// CORRETTO: Convertire Map in oggetto prima della serializzazione
function serializzaMappa(mappa) {
  return JSON.stringify(Array.from(mappa.entries()));
}

function deserializzaMappa(json) {
  return new Map(JSON.parse(json));
}

// Per Map con chiavi non stringhe, è necessario un approccio più complesso
function serializzaMappaAvanzata(mappa) {
  return JSON.stringify(Array.from(mappa.entries()).map(([k, v]) => {
    // Converti le chiavi in un formato serializzabile
    // Questo è un esempio semplificato, potrebbe richiedere logica più complessa
    return [typeof k === 'object' ? JSON.stringify(k) : k, v];
  }));
}

const mappa = new Map();
mappa.set('chiave1', 'valore1');
mappa.set('chiave2', 'valore2');

const serializzata = serializzaMappa(mappa);
console.log(serializzata); // '[["chiave1","valore1"],["chiave2","valore2"]]'

const deserializzata = deserializzaMappa(serializzata);
console.log(deserializzata.get('chiave1')); // 'valore1'
```

## Conclusione

Le strutture dati `Map`, `Set`, `WeakMap` e `WeakSet` offrono potenti strumenti per risolvere problemi specifici in JavaScript. Utilizzando i pattern e le best practices descritti in questo capitolo, puoi sfruttare al meglio queste strutture dati nelle tue applicazioni.

Ricorda di scegliere sempre la struttura dati più appropriata per il tuo caso d'uso specifico, considerando fattori come il tipo di chiavi/valori, la necessità di iterazione, le prestazioni richieste e la gestione della memoria.

## Navigazione

- [Torna all'indice](../README.md)
- [Precedente: Confronto con Oggetti e Array](./04_Confronto_Strutture.md)