# Teoria 2: Callback

## Cosa sono le Callback?

Una **callback** (o funzione di richiamo) è semplicemente una funzione che viene passata come argomento a un'altra funzione, con l'intenzione di essere eseguita (o "richiamata") in un secondo momento. Nel contesto della programmazione asincrona, le callback sono uno dei meccanismi più basilari per gestire il completamento di operazioni asincrone.

Quando avviamo un'operazione asincrona (es. leggere un file, fare una richiesta HTTP), forniamo una funzione callback. Questa funzione verrà eseguita automaticamente quando l'operazione asincrona sarà terminata, ricevendo spesso i risultati dell'operazione (o un errore) come argomenti.

## Come Funzionano?

1.  **Passaggio:** La funzione callback viene passata come argomento alla funzione che avvia l'operazione asincrona.
2.  **Esecuzione Asincrona:** L'operazione asincrona viene avviata (spesso da API del browser o di Node.js) e il flusso principale del programma continua.
3.  **Completamento:** Una volta che l'operazione asincrona è completata (con successo o con errore), l'ambiente (browser/Node.js) mette la funzione callback nella *Callback Queue*.
4.  **Richiamo:** L'*Event Loop*, quando la *Call Stack* è vuota, preleva la callback dalla coda e la esegue.

## Esempio: `setTimeout`

L'esempio più semplice di callback è con `setTimeout`:

```javascript
function salutaDopoRitardo(nome, callbackSaluto) {
  console.log('Avvio il timer...');
  setTimeout(() => {
    const messaggio = `Ciao, ${nome}!`;
    callbackSaluto(messaggio); // Richiamo la callback con il risultato
  }, 1500);
  console.log('Timer avviato, in attesa...');
}

function mostraMessaggio(messaggio) {
  console.log(messaggio);
}

// Passiamo 'mostraMessaggio' come callback
salutaDopoRitardo('Mondo', mostraMessaggio);

// Output:
// Avvio il timer...
// Timer avviato, in attesa...
// (dopo 1.5 secondi)
// Ciao, Mondo!
```

## Esempio: Lettura File (Node.js)

In Node.js, molte operazioni di I/O usano callback:

```javascript
const fs = require('fs');

console.log('Inizio lettura file...');

fs.readFile('mio_file.txt', 'utf8', (errore, dati) => {
  // Questa è la funzione callback
  if (errore) {
    console.error('Errore durante la lettura del file:', errore);
    return; // Interrompi l'esecuzione della callback in caso di errore
  }
  console.log('Contenuto del file:', dati);
});

console.log('Lettura file avviata...');

// Output (supponendo che mio_file.txt esista e contenga 'Hello'):
// Inizio lettura file...
// Lettura file avviata...
// (dopo un po' di tempo)
// Contenuto del file: Hello
```

In questo caso, la callback riceve due argomenti: `errore` (che è `null` se non ci sono errori) e `dati` (il contenuto del file).

## Il Problema del "Callback Hell"

Sebbene le callback siano un meccanismo fondamentale, usarle per gestire sequenze complesse di operazioni asincrone dipendenti l'una dall'altra può portare a un codice difficile da leggere e mantenere, noto come **"Callback Hell"** o **"Pyramid of Doom"** (Piramide del Destino). Questo accade quando si annidano molte callback una dentro l'altra.

```javascript
operazioneAsincrona1(param1, (errore1, risultato1) => {
  if (errore1) { /* gestisci errore */ return; }
  operazioneAsincrona2(risultato1, (errore2, risultato2) => {
    if (errore2) { /* gestisci errore */ return; }
    operazioneAsincrona3(risultato2, (errore3, risultato3) => {
      if (errore3) { /* gestisci errore */ return; }
      // ... e così via
      console.log('Tutte le operazioni completate!');
    });
  });
});
```

Questo problema di leggibilità e manutenibilità ha portato allo sviluppo di alternative più moderne come le Promises e async/await, che esploreremo nelle prossime sezioni.