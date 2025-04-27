# Teoria 3: Promises

## Cosa sono le Promises?

Le **Promises** (Promesse) sono un meccanismo introdotto in ES6 (ECMAScript 2015) per gestire le operazioni asincrone in modo più strutturato e leggibile rispetto alle callback tradizionali. Una Promise rappresenta un valore che potrebbe essere disponibile *ora*, nel *futuro*, o *mai*.

In sostanza, una Promise è un oggetto che funge da segnaposto per il risultato (o l'errore) di un'operazione asincrona. Invece di passare una callback direttamente, la funzione asincrona restituisce una Promise, alla quale possiamo "attaccare" le nostre callback (handler) per gestire il successo o il fallimento dell'operazione.

## Stati di una Promise

Una Promise può trovarsi in uno dei seguenti tre stati:

1.  **Pending (In attesa):** Lo stato iniziale. L'operazione asincrona non è ancora stata completata.
2.  **Fulfilled (Risolta/Completata con successo):** L'operazione asincrona è terminata con successo e la Promise ha un valore risultante.
3.  **Rejected (Rifiutata):** L'operazione asincrona è fallita e la Promise ha un motivo (un errore) per il fallimento.

Una Promise passa dallo stato *pending* a *fulfilled* o *rejected* **una sola volta**. Una volta che è *fulfilled* o *rejected*, si dice che è **settled** (stabilita) e il suo stato non cambierà più.

## Creare una Promise

Si crea una nuova Promise usando il costruttore `new Promise()`. Questo costruttore accetta una funzione (chiamata *executor*) come argomento. L'executor, a sua volta, riceve due funzioni come argomenti: `resolve` e `reject`.

-   `resolve(value)`: Viene chiamata quando l'operazione asincrona ha successo, passando il valore risultante. Cambia lo stato della Promise a *fulfilled*.
-   `reject(error)`: Viene chiamata quando l'operazione asincrona fallisce, passando l'errore. Cambia lo stato della Promise a *rejected*.

```javascript
const miaPromise = new Promise((resolve, reject) => {
  // Simuliamo un'operazione asincrona (es. richiesta di rete)
  console.log('Operazione asincrona avviata...');
  setTimeout(() => {
    const successo = Math.random() > 0.5; // Simula successo o fallimento casuale
    if (successo) {
      resolve('Dati ricevuti con successo!'); // Risolve la Promise
    } else {
      reject(new Error('Errore durante il recupero dei dati.')); // Rifiuta la Promise
    }
  }, 2000);
});

console.log(miaPromise); // Output iniziale: Promise { <pending> }
```

## Consumare una Promise: `.then()`, `.catch()`, `.finally()`

Per gestire il risultato (o l'errore) di una Promise, si usano i metodi `.then()`, `.catch()`, e `.finally()`.

-   **`.then(onFulfilled, onRejected)`**: Permette di registrare callback per gestire sia lo stato *fulfilled* che *rejected*.
    -   `onFulfilled(value)`: Eseguita se la Promise è *fulfilled*. Riceve il valore passato a `resolve`.
    -   `onRejected(error)`: Eseguita se la Promise è *rejected*. Riceve l'errore passato a `reject`. (Opzionale, spesso si preferisce usare `.catch()`)

-   **`.catch(onRejected)`**: Un modo più leggibile per registrare una callback solo per lo stato *rejected*. È equivalente a `.then(null, onRejected)`.

-   **`.finally(onFinally)`**: Registra una callback che viene eseguita *sempre* quando la Promise è *settled* (sia *fulfilled* che *rejected*), indipendentemente dall'esito. Utile per operazioni di pulizia (es. nascondere un indicatore di caricamento).

```javascript
miaPromise
  .then((risultato) => {
    // Gestisce il caso di successo (fulfilled)
    console.log('Successo:', risultato);
    return risultato.toUpperCase(); // Possiamo trasformare il risultato per il prossimo .then()
  })
  .then((risultatoMaiuscolo) => {
    console.log('Risultato trasformato:', risultatoMaiuscolo);
  })
  .catch((errore) => {
    // Gestisce il caso di fallimento (rejected)
    console.error('Errore:', errore.message);
  })
  .finally(() => {
    // Eseguito sempre alla fine
    console.log('Operazione asincrona terminata (pulizia).');
  });

console.log('Promise registrata, in attesa del risultato...');
```

## Concatenamento (Chaining)

Uno dei grandi vantaggi delle Promises è la possibilità di **concatenare** più operazioni asincrone in modo sequenziale e leggibile. Il metodo `.then()` (e `.catch()`) restituisce *sempre* una nuova Promise. Questo permette di chiamare `.then()` sul risultato del `.then()` precedente.

-   Se una callback `onFulfilled` in `.then()` restituisce un valore, la nuova Promise restituita da `.then()` sarà *fulfilled* con quel valore.
-   Se una callback `onFulfilled` restituisce un'altra Promise, la nuova Promise restituita da `.then()` "adotterà" lo stato e il valore/errore di quella Promise interna.
-   Se si verifica un errore (o viene lanciata un'eccezione) in una callback `onFulfilled`, la nuova Promise restituita da `.then()` sarà *rejected* con quell'errore.

Questo meccanismo risolve elegantemente il problema del "Callback Hell":

```javascript
operazioneAsincrona1(param1)
  .then(risultato1 => {
    console.log('Step 1 completato');
    return operazioneAsincrona2(risultato1); // Restituisce un'altra Promise
  })
  .then(risultato2 => {
    console.log('Step 2 completato');
    return operazioneAsincrona3(risultato2);
  })
  .then(risultato3 => {
    console.log('Step 3 completato');
    console.log('Tutte le operazioni completate!', risultato3);
  })
  .catch(errore => {
    // Un singolo .catch() può gestire errori da qualsiasi punto della catena
    console.error('Si è verificato un errore in uno degli step:', errore);
  });
```

Le Promises forniscono una base solida e più gestibile per la programmazione asincrona rispetto alle semplici callback. Nella prossima sezione, vedremo `async/await`, una sintassi ancora più intuitiva costruita sopra le Promises.