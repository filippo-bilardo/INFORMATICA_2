# Console.log Avanzato

## Introduzione

Il metodo `console.log()` è probabilmente lo strumento di debugging più utilizzato in JavaScript. Tuttavia, la console del browser offre molte altre funzionalità avanzate che possono rendere il debugging più efficace ed efficiente.

## Metodi Avanzati della Console

### Formattazione dei Messaggi

```javascript
// Utilizzo di segnaposto
console.log('Ciao, %s!', 'Mondo'); // Ciao, Mondo!
console.log('Il valore è %d', 42); // Il valore è 42
console.log('Oggetto: %o', {nome: 'Mario', età: 30}); // Oggetto: {nome: 'Mario', età: 30}

// Stili CSS nei log
console.log('%cTesto colorato', 'color: blue; font-size: 20px;');
console.log('%cAttenzione!', 'color: red; font-weight: bold;', 'Messaggio importante');
```

### Tabelle e Strutture Dati

```javascript
// Visualizzazione di array e oggetti in formato tabellare
const utenti = [
  { id: 1, nome: 'Mario', ruolo: 'Admin' },
  { id: 2, nome: 'Luigi', ruolo: 'Editor' },
  { id: 3, nome: 'Peach', ruolo: 'Viewer' }
];

console.table(utenti);

// Filtraggio delle colonne
console.table(utenti, ['nome', 'ruolo']);
```

### Raggruppamento e Indentazione

```javascript
// Raggruppamento semplice
console.group('Dettagli Utente');
console.log('Nome: Mario');
console.log('Età: 30');
console.log('Ruolo: Admin');
console.groupEnd();

// Raggruppamento compresso (chiuso di default)
console.groupCollapsed('Informazioni Avanzate');
console.log('Ultimo accesso: 2023-05-15');
console.log('Dispositivo: Desktop');
console.groupEnd();

// Raggruppamenti annidati
console.group('Utente');
console.log('Nome: Luigi');
console.group('Contatti');
console.log('Email: luigi@esempio.it');
console.log('Telefono: 123456789');
console.groupEnd();
console.groupEnd();
```

### Contatori e Timer

```javascript
// Contatori
function contaChiamate() {
  console.count('contaChiamate');
}

contaChiamate(); // contaChiamate: 1
contaChiamate(); // contaChiamate: 2
contaChiamate(); // contaChiamate: 3
console.countReset('contaChiamate'); // Reset del contatore
contaChiamate(); // contaChiamate: 1

// Timer per misurare le performance
console.time('operazione');
// ... codice da misurare
for (let i = 0; i < 1000000; i++) {
  // Operazione intensiva
}
console.timeEnd('operazione'); // operazione: 10ms

// Checkpoint temporali
console.time('processo');
console.timeLog('processo', 'Fase 1 completata'); // processo: 5ms Fase 1 completata
// ... altro codice
console.timeLog('processo', 'Fase 2 completata'); // processo: 8ms Fase 2 completata
console.timeEnd('processo'); // processo: 12ms
```

## Tracciamento dello Stack

```javascript
function funzione3() {
  console.trace('Traccia dello stack');
}

function funzione2() {
  funzione3();
}

function funzione1() {
  funzione2();
}

funzione1();
// Mostrerà lo stack delle chiamate: funzione1 -> funzione2 -> funzione3
```

## Debug e Assert

```javascript
// Debug - simile a console.log ma può essere filtrato
console.debug('Messaggio di debug');

// Assert - mostra un errore solo se la condizione è falsa
const x = 5;
console.assert(x > 10, 'x non è maggiore di 10'); // Mostra un errore
console.assert(x > 0, 'x non è positivo'); // Non mostra nulla (condizione vera)
```

## Logging Strutturato

### Livelli di Log

Implementare un sistema di logging con diversi livelli di severità:

```javascript
const Logger = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  
  level: 'info', // Livello di default
  
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  
  log: function(level, message, ...args) {
    if (this.levels[level] <= this.levels[this.level]) {
      console[level](`[${level.toUpperCase()}] ${message}`, ...args);
    }
  },
  
  error: function(message, ...args) {
    this.log(this.ERROR, message, ...args);
  },
  
  warn: function(message, ...args) {
    this.log(this.WARN, message, ...args);
  },
  
  info: function(message, ...args) {
    this.log(this.INFO, message, ...args);
  },
  
  debug: function(message, ...args) {
    this.log(this.DEBUG, message, ...args);
  }
};

// Utilizzo
Logger.level = 'debug'; // Imposta il livello di log
Logger.debug('Dettagli di debug'); // Visibile
Logger.info('Informazione'); // Visibile
Logger.warn('Attenzione'); // Visibile
Logger.error('Errore critico'); // Visibile

Logger.level = 'warn'; // Cambia il livello
Logger.debug('Dettagli di debug'); // Non visibile
Logger.info('Informazione'); // Non visibile
Logger.warn('Attenzione'); // Visibile
Logger.error('Errore critico'); // Visibile
```

## Consigli Pratici

1. **Usa console.table() per dati strutturati** - Migliora la leggibilità di array e oggetti
2. **Implementa un sistema di logging personalizzato** - Adatta il logging alle esigenze del tuo progetto
3. **Utilizza i gruppi per organizzare i log** - Mantieni la console ordinata
4. **Aggiungi stili ai messaggi importanti** - Evidenzia le informazioni critiche
5. **Rimuovi o disabilita i log in produzione** - Evita di esporre informazioni sensibili

## Esercizio Pratico

Crea un sistema di logging avanzato che:

1. Utilizzi diversi livelli di log (debug, info, warn, error)
2. Formatti i messaggi con timestamp e contesto
3. Raggruppi i log per moduli o componenti
4. Possa essere facilmente abilitato/disabilitato in produzione

## Navigazione

- [Indice del Modulo](../README.md)
- Lezione Precedente: [Strumenti di Debugging del Browser](./01_Strumenti_Browser.md)
- Prossima Lezione: [Breakpoints e Step Debugging](./03_Breakpoints.md)