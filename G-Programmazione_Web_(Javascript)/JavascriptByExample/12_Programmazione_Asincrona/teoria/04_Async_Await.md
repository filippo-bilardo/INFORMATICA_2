# Teoria 4: Async/Await

## Introduzione ad Async/Await

Introdotte in ES2017 (ES8), le parole chiave `async` e `await` forniscono una sintassi più pulita e intuitiva per lavorare con le Promises, rendendo il codice asincrono simile nell'aspetto e nel comportamento al codice sincrono.

**`async`**: La parola chiave `async` viene utilizzata per dichiarare una **funzione asincrona**. Una funzione dichiarata con `async` restituisce *implicitamente* una Promise.

**`await`**: La parola chiave `await` può essere utilizzata **solo all'interno di una funzione `async`**. Serve a mettere in pausa l'esecuzione della funzione `async` fino a quando la Promise (a destra di `await`) non è *settled* (risolta o rifiutata).
    - Se la Promise viene *fulfilled*, `await` restituisce il valore risolto.
    - Se la Promise viene *rejected*, `await` lancia l'errore rifiutato (che può essere catturato con `try...catch`).

## Come Funzionano?

```javascript
// Funzione che restituisce una Promise dopo un ritardo
function operazioneLenta(valore, ritardo) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Operazione completata con valore: ${valore}`);
      resolve(valore * 2);
    }, ritardo);
  });
}

// Funzione asincrona che utilizza await
async function eseguiOperazioni() {
  console.log('Inizio esecuzione asincrona...');
  try {
    // await mette in pausa l'esecuzione qui finché la Promise non è risolta
    const risultato1 = await operazioneLenta(10, 1000);
    console.log('Ricevuto risultato 1:', risultato1);

    // L'esecuzione riprende, await mette di nuovo in pausa
    const risultato2 = await operazioneLenta(risultato1, 500);
    console.log('Ricevuto risultato 2:', risultato2);

    // Il valore restituito dalla funzione async sarà una Promise risolta con questo valore
    return `Risultato finale: ${risultato2}`;
  } catch (errore) {
    // Gli errori delle Promises rifiutate vengono catturati qui
    console.error('Errore durante le operazioni:', errore);
    // La Promise restituita dalla funzione async sarà rifiutata con questo errore
    throw new Error('Esecuzione fallita');
  }
}

console.log('Chiamo la funzione asincrona...');

// Chiamare una funzione async restituisce una Promise
eseguiOperazioni()
  .then(risultatoFinale => {
    console.log('Successo:', risultatoFinale);
  })
  .catch(errore => {
    console.error('Fallimento:', errore.message);
  });

console.log('Funzione asincrona chiamata, in attesa del completamento...');

// Output:
// Chiamo la funzione asincrona...
// Inizio esecuzione asincrona...
// Funzione asincrona chiamata, in attesa del completamento...
// (dopo 1 secondo)
// Operazione completata con valore: 10
// Ricevuto risultato 1: 20
// (dopo 0.5 secondi)
// Operazione completata con valore: 20
// Ricevuto risultato 2: 40
// Successo: Risultato finale: 40
```

## Vantaggi di Async/Await

-   **Leggibilità:** Il codice assomiglia molto a codice sincrono, rendendolo più facile da leggere e comprendere, specialmente per sequenze complesse di operazioni asincrone.
-   **Gestione degli Errori:** Permette di usare i blocchi `try...catch` standard per gestire sia errori sincroni che asincroni (Promises rifiutate), unificando la logica di gestione degli errori.
-   **Debugging:** È generalmente più facile eseguire il debug del codice `async/await` rispetto al codice basato su `.then()` concatenati, poiché i punti di interruzione e lo stack trace si comportano in modo più intuitivo.

## Limitazioni e Considerazioni

-   **Solo dentro `async`:** `await` può essere usato solo all'interno di funzioni dichiarate con `async` (o ai livelli più alti dei moduli JavaScript moderni, noto come "top-level await").
-   **Bloccante (all'interno della funzione):** `await` blocca l'esecuzione *all'interno* della funzione `async` fino al completamento della Promise. Non blocca il thread principale di JavaScript, ma impedisce al codice successivo *nella stessa funzione async* di essere eseguito finché l'attesa non è finita.
-   **Restituisce Promises:** Ricorda che una funzione `async` restituisce sempre una Promise. Per ottenere il risultato finale all'esterno della funzione, devi comunque usare `.then()` o un altro `await` (se ti trovi in un'altra funzione `async`).

`async/await` è diventato lo standard de facto per la gestione dell'asincronicità in JavaScript moderno, offrendo un potente miglioramento rispetto alle callback e al concatenamento di `.then()`.