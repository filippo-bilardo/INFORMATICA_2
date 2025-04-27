# Teoria 5: Gestione degli Errori Asincroni

La gestione degli errori nel codice asincrono richiede approcci specifici a seconda della tecnica utilizzata (Callback, Promises, Async/Await).

## Gestione Errori con Callback

Nel modello a callback, la convenzione più comune (specialmente in Node.js) è il pattern "error-first callback". La funzione di callback riceve l'errore come primo argomento. Se l'operazione ha successo, il primo argomento è `null` o `undefined`.

```javascript
const fs = require('fs');

fs.readFile('file_inesistente.txt', 'utf8', (errore, dati) => {
  // 1. Controlla sempre l'errore come prima cosa!
  if (errore) {
    console.error('Errore durante la lettura (Callback):', errore.message);
    // Gestisci l'errore (es. termina, usa valori di default, notifica l'utente)
    return; // Interrompi l'esecuzione della callback
  }

  // Se non ci sono errori, procedi con i dati
  console.log('Contenuto del file:', dati);
});
```

**Criticità:**
- Bisogna ricordarsi di controllare l'errore in *ogni* callback.
- La gestione degli errori può diventare verbosa e ripetitiva nel "Callback Hell".

## Gestione Errori con Promises

Le Promises offrono un meccanismo centralizzato per la gestione degli errori tramite il metodo `.catch()`.

- Un errore che si verifica durante l'esecuzione dell'executor della Promise (o una chiamata esplicita a `reject()`) porta la Promise allo stato *rejected*.
- Un errore lanciato all'interno di una callback `.then()` fa sì che la Promise restituita da quel `.then()` venga *rejected*.

```javascript
function operazioneConPromise(successo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (successo) {
        resolve('Operazione riuscita!');
      } else {
        reject(new Error('Operazione fallita deliberatamente.'));
      }
    }, 500);
  });
}

operazioneConPromise(false) // Simula un fallimento
  .then(risultato => {
    console.log('Questo non verrà eseguito:', risultato);
    // Se ci fosse un errore qui, verrebbe catturato dal .catch()
    // throw new Error('Errore nel .then()');
    return risultato;
  })
  .catch(errore => {
    // Cattura sia il reject iniziale sia eventuali errori nei .then() precedenti
    console.error('Errore catturato (Promise):', errore.message);
  })
  .finally(() => {
    console.log('Eseguito sempre (Promise).');
  });
```

**Vantaggi:**
- Un singolo `.catch()` alla fine della catena può gestire errori provenienti da qualsiasi punto precedente.
- Codice più pulito rispetto ai controlli `if (errore)` ripetuti.

**Attenzione:** Se non aggiungi un `.catch()` a una catena di Promises e una Promise viene rifiutata, si verificherà un "Unhandled Promise Rejection", che di solito viene segnalato nella console e in Node.js può terminare il processo.

## Gestione Errori con Async/Await

`async/await` permette di utilizzare i blocchi `try...catch` standard di JavaScript, rendendo la gestione degli errori asincroni quasi identica a quella degli errori sincroni.

- Quando si usa `await` su una Promise che viene *rejected*, `await` lancia l'errore.
- Questo errore può essere catturato dal blocco `catch` più vicino che racchiude l'istruzione `await`.

```javascript
async function eseguiConAsyncAwait() {
  console.log('Inizio esecuzione (Async/Await)...');
  try {
    // await lancia l'errore se operazioneConPromise(false) rifiuta
    const risultato = await operazioneConPromise(false);
    console.log('Questo non verrà eseguito:', risultato);

    // Potresti avere più await qui dentro
    // const risultato2 = await altraOperazione(risultato);

    return 'Tutto ok!'; // Non raggiunto in caso di errore

  } catch (errore) {
    // Cattura l'errore lanciato da await
    console.error('Errore catturato (Async/Await):', errore.message);
    // Puoi gestire l'errore o rilanciarlo
    throw new Error('Esecuzione fallita in async function');
  } finally {
    console.log('Eseguito sempre (Async/Await).');
  }
}

// Chiamiamo la funzione async e gestiamo la Promise che restituisce
eseguiConAsyncAwait()
  .then(msg => console.log('Successo finale:', msg))
  .catch(err => console.error('Fallimento finale:', err.message));
```

**Vantaggi:**
- Sintassi familiare (`try...catch`).
- Gestione unificata per errori sincroni e asincroni all'interno della funzione `async`.
- Codice generalmente più leggibile.

**Conclusione:**
La scelta del meccanismo di gestione degli errori dipende dalla tecnica asincrona utilizzata. Le Promises e, in particolare, `async/await` con `try...catch` offrono i metodi più moderni, leggibili e manutenibili per gestire gli errori nel codice asincrono JavaScript.