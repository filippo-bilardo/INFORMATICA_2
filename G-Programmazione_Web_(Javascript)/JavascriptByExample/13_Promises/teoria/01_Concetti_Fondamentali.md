# Concetti Fondamentali delle Promesse in JavaScript

Le Promesse sono uno dei pilastri della programmazione asincrona moderna in JavaScript. Questo capitolo esplora i concetti fondamentali delle Promesse, il loro funzionamento e come utilizzarle efficacemente.

## Cos'è una Promessa?

Una Promessa in JavaScript è un oggetto che rappresenta il completamento (o il fallimento) di un'operazione asincrona e il suo valore risultante. In termini semplici, è un "contenitore" per un valore che potrebbe essere disponibile ora, in futuro, o mai.

Le Promesse sono state introdotte in ES6 (ECMAScript 2015) per risolvere il problema del "callback hell" e fornire un modo più elegante per gestire operazioni asincrone.

## Stati di una Promessa

Una Promessa può trovarsi in uno dei seguenti stati:

1. **Pending (In attesa)**: Stato iniziale, l'operazione non è ancora completata né fallita.
2. **Fulfilled (Completata con successo)**: L'operazione è stata completata con successo e la promessa ha un valore risultante.
3. **Rejected (Fallita)**: L'operazione è fallita e la promessa ha un motivo del fallimento (un errore).

Una promessa che non è più in stato "pending" (quindi è "fulfilled" o "rejected") viene detta "settled" (risolta).

**Importante**: Una volta che una promessa è "settled", il suo stato e il suo valore/errore non possono più cambiare.

## Creazione di una Promessa

Per creare una Promessa, utilizziamo il costruttore `Promise` che accetta una funzione (chiamata "executor") con due parametri: `resolve` e `reject`.

```javascript
const miaPromessa = new Promise((resolve, reject) => {
  // Operazione asincrona
  const successo = true; // Simuliamo un'operazione riuscita
  
  if (successo) {
    // Operazione completata con successo
    resolve('Operazione completata!'); // Passa il valore risultante
  } else {
    // Operazione fallita
    reject(new Error('Qualcosa è andato storto')); // Passa l'errore
  }
});
```

### Esempio Pratico: Simulazione di una Richiesta di Rete

```javascript
function recuperaDati(url) {
  return new Promise((resolve, reject) => {
    // Simuliamo una richiesta di rete con setTimeout
    setTimeout(() => {
      // Simuliamo una probabilità di successo/fallimento
      const casuale = Math.random();
      
      if (casuale > 0.3) { // 70% di probabilità di successo
        const dati = { id: 1, nome: 'Prodotto di esempio', url: url };
        resolve(dati);
      } else { // 30% di probabilità di fallimento
        reject(new Error(`Impossibile recuperare i dati da ${url}`));
      }
    }, 1500); // Simuliamo un ritardo di 1.5 secondi
  });
}
```

## Utilizzo delle Promesse

Una volta creata una Promessa, possiamo utilizzare i suoi metodi per gestire il risultato o l'errore.

### Metodo `.then()`

Il metodo `.then()` viene utilizzato per gestire il caso di successo (quando la promessa viene risolta con `resolve`).

```javascript
miaPromessa.then(risultato => {
  console.log('Successo:', risultato);
});
```

### Metodo `.catch()`

Il metodo `.catch()` viene utilizzato per gestire il caso di errore (quando la promessa viene rifiutata con `reject`).

```javascript
miaPromessa.catch(errore => {
  console.error('Errore:', errore.message);
});
```

### Metodo `.finally()`

Il metodo `.finally()` viene eseguito indipendentemente dal fatto che la promessa sia stata risolta o rifiutata.

```javascript
miaPromessa
  .finally(() => {
    console.log('Operazione completata (con successo o fallimento)');
    // Codice da eseguire in ogni caso, come nascondere un indicatore di caricamento
  });
```

### Esempio Completo

```javascript
recuperaDati('https://api.example.com/prodotti/1')
  .then(dati => {
    console.log('Dati recuperati:', dati);
    return elaboraDati(dati); // Possiamo restituire un'altra promessa
  })
  .catch(errore => {
    console.error('Errore durante il recupero dei dati:', errore.message);
    return datiPredefiniti(); // Possiamo fornire dati di fallback
  })
  .finally(() => {
    console.log('Operazione di recupero dati completata');
    nascondiIndicatoreDiCaricamento();
  });
```

## Promesse già Risolte o Rifiutate

A volte può essere utile creare una promessa che è già risolta o rifiutata:

```javascript
// Promessa già risolta
const promessaRisolta = Promise.resolve('Valore già disponibile');

// Promessa già rifiutata
const promessaRifiutata = Promise.reject(new Error('Errore immediato'));
```

Queste sono utili quando si desidera mantenere un'interfaccia coerente che restituisce sempre una promessa, anche quando il valore è già disponibile o l'errore è già noto.

## Promisificazione di Funzioni Basate su Callback

Un uso comune delle promesse è convertire funzioni basate su callback in funzioni che restituiscono promesse (un processo chiamato "promisificazione").

```javascript
// Funzione basata su callback
function leggiFile(percorso, callback) {
  // Simuliamo la lettura di un file
  setTimeout(() => {
    if (percorso.includes('esistente')) {
      callback(null, 'Contenuto del file');
    } else {
      callback(new Error('File non trovato'));
    }
  }, 1000);
}

// Versione promisificata
function leggiFilePromise(percorso) {
  return new Promise((resolve, reject) => {
    leggiFile(percorso, (errore, contenuto) => {
      if (errore) {
        reject(errore);
      } else {
        resolve(contenuto);
      }
    });
  });
}

// Utilizzo
leggiFilePromise('file_esistente.txt')
  .then(contenuto => console.log('Contenuto:', contenuto))
  .catch(errore => console.error('Errore:', errore.message));
```

## Vantaggi delle Promesse

Le Promesse offrono numerosi vantaggi rispetto ai tradizionali callback:

1. **Composizione**: Le promesse possono essere facilmente concatenate per operazioni sequenziali.
2. **Gestione degli errori migliorata**: Gli errori vengono propagati automaticamente lungo la catena di promesse.
3. **Evitano il callback hell**: Il codice risulta più leggibile e manutenibile.
4. **Garanzie di esecuzione**: Una promessa viene risolta o rifiutata esattamente una volta.
5. **API standardizzata**: Le promesse sono parte del linguaggio e seguono uno standard coerente.

## Limitazioni delle Promesse

Nonostante i loro vantaggi, le promesse hanno alcune limitazioni:

1. **Non cancellabili**: Una volta avviata, una promessa non può essere annullata.
2. **Overhead**: Le promesse introducono un leggero overhead rispetto ai callback puri.
3. **Debugging**: Il debugging può essere più complesso a causa della natura asincrona.

## Conclusione

Le Promesse sono uno strumento fondamentale per gestire operazioni asincrone in JavaScript. Comprendere i loro concetti di base è essenziale per scrivere codice asincrono moderno, leggibile e manutenibile.

Nel prossimo capitolo, esploreremo come concatenare le promesse per gestire sequenze di operazioni asincrone.

[Torna all'indice](../README.md) | [Prossimo argomento: Catene di Promesse](./02_Catene_Promesse.md)