# Casi d'Uso Pratici di Iteratori e Generatori

In questa sezione, esploreremo alcuni casi d'uso pratici di iteratori e generatori in JavaScript, dimostrando come queste potenti funzionalità possano essere applicate per risolvere problemi reali.

## 1. Iterazione su Strutture Dati Complesse

### Attraversamento di Strutture ad Albero

Gli iteratori e i generatori sono particolarmente utili per attraversare strutture dati gerarchiche come gli alberi DOM o le strutture JSON annidate:

```javascript
class Elemento {
  constructor(nome, attributi = {}, figli = []) {
    this.nome = nome;
    this.attributi = attributi;
    this.figli = figli;
  }
  
  // Generatore per attraversare l'albero in profondità
  *attraversaInProfondita() {
    yield this;
    
    for (const figlio of this.figli) {
      yield* figlio.attraversaInProfondita();
    }
  }
  
  // Generatore per attraversare l'albero in ampiezza
  *attraversaInAmpiezza() {
    const coda = [this];
    
    while (coda.length > 0) {
      const elemento = coda.shift();
      yield elemento;
      
      for (const figlio of elemento.figli) {
        coda.push(figlio);
      }
    }
  }
}

// Creazione di un albero DOM semplificato
const documento = new Elemento('html', {}, [
  new Elemento('head', {}, [
    new Elemento('title', {}, [
      new Elemento('text', { content: 'La mia pagina' })
    ]),
    new Elemento('meta', { charset: 'UTF-8' })
  ]),
  new Elemento('body', { class: 'contenuto' }, [
    new Elemento('h1', {}, [
      new Elemento('text', { content: 'Titolo Principale' })
    ]),
    new Elemento('p', {}, [
      new Elemento('text', { content: 'Un paragrafo di testo.' })
    ])
  ])
]);

// Utilizzo dell'attraversamento in profondità
console.log('Attraversamento in profondità:');
for (const elemento of documento.attraversaInProfondita()) {
  console.log(elemento.nome);
}

// Utilizzo dell'attraversamento in ampiezza
console.log('Attraversamento in ampiezza:');
for (const elemento of documento.attraversaInAmpiezza()) {
  console.log(elemento.nome);
}
```

## 2. Generazione di Sequenze Infinite

### Sequenze Matematiche

I generatori sono ideali per rappresentare sequenze matematiche potenzialmente infinite:

```javascript
// Generatore per la sequenza di Fibonacci
function* fibonacci() {
  let [a, b] = [0, 1];
  
  while (true) {
    yield b;
    [a, b] = [b, a + b];
  }
}

// Generatore per i numeri primi
function* numeriPrimi() {
  function isPrimo(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
  }
  
  let n = 2;
  while (true) {
    if (isPrimo(n)) yield n;
    n++;
  }
}

// Utilizzo delle sequenze
const fib = fibonacci();
const primi = numeriPrimi();

// Primi 10 numeri di Fibonacci
const fibonacciArray = Array.from({ length: 10 }, () => fib.next().value);
console.log('Primi 10 numeri di Fibonacci:', fibonacciArray);

// Primi 10 numeri primi
const primiArray = Array.from({ length: 10 }, () => primi.next().value);
console.log('Primi 10 numeri primi:', primiArray);
```

### Pipeline di Trasformazione Dati

I generatori possono essere utilizzati per creare pipeline di trasformazione dati, dove ogni passo della pipeline è un generatore:

```javascript
// Generatore che produce numeri da 1 a n
function* range(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

// Generatore che filtra i numeri pari
function* filtraPari(iterabile) {
  for (const valore of iterabile) {
    if (valore % 2 === 0) yield valore;
  }
}

// Generatore che moltiplica ogni valore per un fattore
function* moltiplica(iterabile, fattore) {
  for (const valore of iterabile) {
    yield valore * fattore;
  }
}

// Generatore che somma tutti i valori
function* somma(iterabile) {
  let totale = 0;
  for (const valore of iterabile) {
    totale += valore;
    yield totale; // Restituisce la somma progressiva
  }
}

// Creazione della pipeline
const pipeline = somma(moltiplica(filtraPari(range(10)), 2));

// Consumo della pipeline
for (const valore of pipeline) {
  console.log(valore);
}
// Output: 4, 12, 24, 40, 60
```

## 3. Gestione dell'Asincronicità

### Generatori per Semplificare il Codice Asincrono

Prima dell'introduzione di `async/await`, i generatori venivano utilizzati per semplificare il codice asincrono, creando un flusso di esecuzione più lineare:

```javascript
// Funzione di utilità per eseguire generatori con promesse
function eseguiGeneratore(generatore) {
  function passo(valore) {
    const risultato = generatore.next(valore);
    
    if (risultato.done) {
      return risultato.value;
    }
    
    return Promise.resolve(risultato.value)
      .then(passo)
      .catch(err => {
        return generatore.throw(err);
      });
  }
  
  return passo();
}

// Funzioni asincrone simulate
function caricaUtente(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, nome: 'Mario Rossi' });
    }, 1000);
  });
}

function caricaOrdini(utente) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, prodotto: 'Laptop', prezzo: 1200 },
        { id: 2, prodotto: 'Smartphone', prezzo: 800 }
      ]);
    }, 1000);
  });
}

// Utilizzo di generatori per gestire il flusso asincrono
function* flussoAsincrono() {
  try {
    console.log('Caricamento utente...');
    const utente = yield caricaUtente(123);
    console.log('Utente caricato:', utente.nome);
    
    console.log('Caricamento ordini...');
    const ordini = yield caricaOrdini(utente);
    console.log('Ordini caricati:', ordini.length);
    
    const totale = ordini.reduce((sum, ordine) => sum + ordine.prezzo, 0);
    console.log('Totale ordini:', totale);
    
    return { utente, ordini, totale };
  } catch (err) {
    console.error('Errore:', err);
    throw err;
  }
}

// Esecuzione del flusso asincrono
eseguiGeneratore(flussoAsincrono())
  .then(risultato => {
    console.log('Flusso completato:', risultato);
  })
  .catch(err => {
    console.error('Errore nel flusso:', err);
  });
```

Questo pattern è stato il precursore di `async/await`, che ora offre una sintassi ancora più pulita per gestire l'asincronicità.

## 4. Implementazione di Iterabili Personalizzati

### Paginazione di Dati

Gli iteratori sono utili per implementare la paginazione di grandi set di dati, caricando solo una pagina alla volta:

```javascript
class PaginazioneAPI {
  constructor(endpoint, dimensionePagina = 10) {
    this.endpoint = endpoint;
    this.dimensionePagina = dimensionePagina;
    this.paginaCorrente = 0;
    this.datiTotali = [];
    this.fineDati = false;
  }
  
  // Simula una chiamata API per ottenere una pagina di dati
  async caricaPagina(pagina) {
    // In un'applicazione reale, questa sarebbe una chiamata fetch
    return new Promise(resolve => {
      setTimeout(() => {
        // Simula la fine dei dati dopo 5 pagine
        if (pagina >= 5) {
          resolve([]);
          return;
        }
        
        const dati = Array.from({ length: this.dimensionePagina }, (_, i) => {
          const id = pagina * this.dimensionePagina + i + 1;
          return { id, nome: `Elemento ${id}` };
        });
        
        resolve(dati);
      }, 500);
    });
  }
  
  // Implementa l'interfaccia iterabile
  [Symbol.asyncIterator]() {
    return {
      paginaCorrente: 0,
      dimensionePagina: this.dimensionePagina,
      endpoint: this.endpoint,
      fineDati: false,
      
      async next() {
        if (this.fineDati) {
          return { done: true };
        }
        
        const api = new PaginazioneAPI(this.endpoint, this.dimensionePagina);
        const dati = await api.caricaPagina(this.paginaCorrente++);
        
        if (dati.length === 0) {
          this.fineDati = true;
          return { done: true };
        }
        
        return { value: dati, done: false };
      }
    };
  }
}

// Utilizzo dell'iteratore asincrono per la paginazione
async function elaboraDati() {
  const api = new PaginazioneAPI('/api/dati');
  let contatore = 0;
  
  for await (const pagina of api) {
    console.log(`Elaborazione pagina con ${pagina.length} elementi`);
    contatore += pagina.length;
  }
  
  console.log(`Elaborati ${contatore} elementi in totale`);
}

elaboraDati();
```

## 5. Gestione di Stream di Dati

### Elaborazione di File di Grandi Dimensioni

I generatori possono essere utilizzati per elaborare file di grandi dimensioni in modo incrementale, evitando di caricare l'intero file in memoria:

```javascript
// Nota: questo esempio è concettuale e richiederebbe Node.js o API specifiche del browser
async function* leggiFileALinee(filePath) {
  // In un'implementazione reale, utilizzeremmo fs.createReadStream in Node.js
  // o fetch con ReadableStream nel browser
  
  // Simuliamo la lettura di un file di grandi dimensioni
  const linee = [
    'Linea 1: Inizio del file',
    'Linea 2: Alcuni dati',
    'Linea 3: Altri dati',
    'Linea 4: Ancora dati',
    'Linea 5: Fine del file'
  ];
  
  for (const linea of linee) {
    // Simuliamo un'operazione asincrona
    await new Promise(resolve => setTimeout(resolve, 100));
    yield linea;
  }
}

async function elaboraFile() {
  const generatore = leggiFileALinee('file_grande.txt');
  
  let numeroLinea = 0;
  for await (const linea of generatore) {
    numeroLinea++;
    console.log(`Elaborazione linea ${numeroLinea}: ${linea}`);
    
    // Qui potremmo fare qualche elaborazione sulla linea
  }
  
  console.log(`Elaborazione completata: ${numeroLinea} linee processate`);
}

elaboraFile();
```

## 6. Implementazione di Macchine a Stati

I generatori sono eccellenti per implementare macchine a stati, grazie alla loro capacità di mantenere lo stato interno e di sospendere/riprendere l'esecuzione:

```javascript
function* macchinaAStati() {
  let stato = 'INIZIALE';
  let input;
  
  while (true) {
    console.log(`Stato corrente: ${stato}`);
    
    switch (stato) {
      case 'INIZIALE':
        input = yield 'Siamo nello stato iniziale. Vuoi procedere? (sì/no)';
        stato = input.toLowerCase() === 'sì' ? 'ELABORAZIONE' : 'FINE';
        break;
        
      case 'ELABORAZIONE':
        input = yield 'Elaborazione in corso. Inserisci un numero:';
        const numero = parseInt(input, 10);
        
        if (isNaN(numero)) {
          yield 'Input non valido. Riprova.';
        } else {
          yield `Hai inserito: ${numero}`;
          stato = 'CONFERMA';
        }
        break;
        
      case 'CONFERMA':
        input = yield 'Vuoi continuare? (sì/no)';
        stato = input.toLowerCase() === 'sì' ? 'ELABORAZIONE' : 'FINE';
        break;
        
      case 'FINE':
        return 'Macchina a stati terminata.';
    }
  }
}

// Simulazione di interazione con la macchina a stati
function simulaInterazione() {
  const macchina = macchinaAStati();
  
  // Avvia la macchina
  console.log(macchina.next().value);
  
  // Simula input utente
  console.log(macchina.next('sì').value);
  console.log(macchina.next('42').value);
  console.log(macchina.next().value);
  console.log(macchina.next('no').value);
}

simulaInterazione();
```

## Conclusione

Gli iteratori e i generatori sono strumenti potenti che possono semplificare notevolmente il codice in molti scenari pratici. Offrono un modo elegante per lavorare con sequenze di dati, gestire l'asincronicità e implementare pattern complessi come macchine a stati o pipeline di elaborazione.

Le loro caratteristiche principali, come la valutazione pigra, la capacità di mantenere lo stato interno e la possibilità di sospendere/riprendere l'esecuzione, li rendono particolarmente adatti per ottimizzare le prestazioni e migliorare la leggibilità del codice in molte applicazioni JavaScript moderne.

Con la pratica e l'esperienza, imparerai a riconoscere le situazioni in cui gli iteratori e i generatori possono offrire vantaggi significativi rispetto ad approcci più tradizionali.

## Navigazione

- [Indice dell'Esercitazione](../README.md)
- Precedente: [Generatori Avanzati](./04_Generatori_Avanzati.md)