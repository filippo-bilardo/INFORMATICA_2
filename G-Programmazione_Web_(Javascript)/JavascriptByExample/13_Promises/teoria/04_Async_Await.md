# Async/Await in JavaScript

La sintassi `async/await` rappresenta uno dei progressi più significativi nella gestione del codice asincrono in JavaScript. Introdotta in ES2017 (ES8), questa funzionalità costruita sulle Promesse offre un modo più intuitivo e leggibile per scrivere codice asincrono che appare e si comporta come codice sincrono.

## Introduzione ad Async/Await

`async/await` è essenzialmente "zucchero sintattico" costruito sulle Promesse. Non introduce nuove funzionalità che non possono essere realizzate con le Promesse, ma rende il codice asincrono molto più leggibile e facile da ragionare.

## Funzioni Async

Una funzione `async` è una funzione che restituisce implicitamente una Promessa. All'interno di una funzione `async`, è possibile utilizzare la parola chiave `await` per attendere che una Promessa si risolva.

```javascript
// Dichiarazione di una funzione async
async function recuperaDati() {
  // Il codice qui può utilizzare await
  return 'Dati recuperati'; // Viene automaticamente avvolto in una Promise
}

// La funzione restituisce una Promise
recuperaDati().then(risultato => {
  console.log(risultato); // Output: "Dati recuperati"
});
```

Le funzioni `async` possono essere dichiarate in diversi modi:

```javascript
// Dichiarazione di funzione
async function nomeFunzione() { /* ... */ }

// Espressione di funzione
const nomeFunzione = async function() { /* ... */ };

// Funzione freccia
const nomeFunzione = async () => { /* ... */ };

// Metodo in classe o oggetto
class MiaClasse {
  async metodo() { /* ... */ }
}
```

## La Parola Chiave Await

La parola chiave `await` può essere utilizzata solo all'interno di funzioni `async`. Essa sospende l'esecuzione della funzione fino a quando la Promessa non viene risolta, e restituisce il valore risolto.

```javascript
async function esempio() {
  console.log('Inizio');
  
  // Attende che la promessa si risolva
  const risultato = await nuovaPromessa();
  
  console.log('Risultato:', risultato);
  console.log('Fine');
}

function nuovaPromessa() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Valore dalla promessa');
    }, 2000);
  });
}

// Output:
// "Inizio"
// (pausa di 2 secondi)
// "Risultato: Valore dalla promessa"
// "Fine"
```

## Conversione da Promesse a Async/Await

Vediamo come convertire il codice basato su Promesse in codice che utilizza `async/await`:

### Prima: Utilizzo di Promesse con .then() e .catch()

```javascript
function recuperaUtente(id) {
  return fetch(`https://api.example.com/utenti/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(utente => {
      return fetch(`https://api.example.com/utenti/${utente.id}/ordini`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(ordini => {
      return { utente, ordini };
    })
    .catch(errore => {
      console.error('Si è verificato un errore:', errore);
      throw errore;
    });
}
```

### Dopo: Utilizzo di Async/Await

```javascript
async function recuperaUtente(id) {
  try {
    // Prima richiesta
    const responseUtente = await fetch(`https://api.example.com/utenti/${id}`);
    if (!responseUtente.ok) {
      throw new Error(`Errore HTTP: ${responseUtente.status}`);
    }
    const utente = await responseUtente.json();
    
    // Seconda richiesta
    const responseOrdini = await fetch(`https://api.example.com/utenti/${utente.id}/ordini`);
    if (!responseOrdini.ok) {
      throw new Error(`Errore HTTP: ${responseOrdini.status}`);
    }
    const ordini = await responseOrdini.json();
    
    // Restituisci i dati combinati
    return { utente, ordini };
  } catch (errore) {
    console.error('Si è verificato un errore:', errore);
    throw errore;
  }
}
```

Come si può notare, il codice con `async/await` è più lineare e leggibile, simile al codice sincrono tradizionale.

## Gestione degli Errori con Try/Catch

Uno dei principali vantaggi di `async/await` è la possibilità di utilizzare i tradizionali blocchi `try/catch` per la gestione degli errori, rendendo il codice più familiare e intuitivo:

```javascript
async function recuperaDati() {
  try {
    const response = await fetch('https://api.example.com/dati');
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const dati = await response.json();
    return dati;
  } catch (errore) {
    console.error('Errore durante il recupero dei dati:', errore);
    // Gestione dell'errore (mostrare un messaggio, fornire dati predefiniti, ecc.)
    return datiPredefiniti();
  } finally {
    // Codice che viene eseguito sempre, indipendentemente da successo o errore
    nascondiIndicatoreDiCaricamento();
  }
}
```

## Esecuzione Parallela con Async/Await

Un errore comune quando si utilizza `async/await` è eseguire operazioni asincrone in sequenza quando potrebbero essere eseguite in parallelo. Ecco come gestire l'esecuzione parallela:

### Esecuzione Sequenziale (Non Ottimale)

```javascript
async function recuperaTuttiIDati() {
  const utenti = await recuperaUtenti();
  const prodotti = await recuperaProdotti();
  const ordini = await recuperaOrdini();
  
  return { utenti, prodotti, ordini };
}
```

In questo esempio, ogni richiesta attende il completamento della precedente, anche se non dipendono l'una dall'altra.

### Esecuzione Parallela (Ottimale)

```javascript
async function recuperaTuttiIDati() {
  // Avvia tutte le richieste contemporaneamente
  const promessaUtenti = recuperaUtenti();
  const promessaProdotti = recuperaProdotti();
  const promessaOrdini = recuperaOrdini();
  
  // Attendi che tutte le promesse si risolvano
  const utenti = await promessaUtenti;
  const prodotti = await promessaProdotti;
  const ordini = await promessaOrdini;
  
  return { utenti, prodotti, ordini };
}
```

Un modo ancora più conciso è utilizzare `Promise.all()`:

```javascript
async function recuperaTuttiIDati() {
  // Esegui tutte le richieste in parallelo e attendi che tutte siano completate
  const [utenti, prodotti, ordini] = await Promise.all([
    recuperaUtenti(),
    recuperaProdotti(),
    recuperaOrdini()
  ]);
  
  return { utenti, prodotti, ordini };
}
```

## Pattern Avanzati con Async/Await

### Timeout con Async/Await

```javascript
async function recuperaDatiConTimeout(url, tempoMs = 5000) {
  // Crea un controller per abortire la richiesta
  const controller = new AbortController();
  const { signal } = controller;
  
  // Imposta il timeout
  const timeoutId = setTimeout(() => controller.abort(), tempoMs);
  
  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); // Cancella il timeout
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (errore) {
    clearTimeout(timeoutId); // Assicurati di cancellare il timeout
    
    if (errore.name === 'AbortError') {
      throw new Error(`La richiesta è scaduta dopo ${tempoMs}ms`);
    }
    
    throw errore; // Rilancia altri errori
  }
}
```

### Retry Pattern con Async/Await

```javascript
async function eseguiConRetry(funzione, maxTentativi = 3, ritardoMs = 1000) {
  let ultimoErrore;
  
  for (let tentativo = 1; tentativo <= maxTentativi; tentativo++) {
    try {
      return await funzione(); // Tenta di eseguire la funzione
    } catch (errore) {
      ultimoErrore = errore;
      
      // Se è l'ultimo tentativo, non attendere
      if (tentativo === maxTentativi) break;
      
      console.warn(`Tentativo ${tentativo}/${maxTentativi} fallito. Riprovo tra ${ritardoMs}ms...`);
      
      // Attendi prima del prossimo tentativo (con backoff esponenziale)
      await new Promise(resolve => setTimeout(resolve, ritardoMs * Math.pow(2, tentativo - 1)));
    }
  }
  
  throw ultimoErrore; // Rilancia l'ultimo errore dopo tutti i tentativi
}

// Utilizzo
async function recuperaDati() {
  try {
    const dati = await eseguiConRetry(
      () => fetch('https://api.example.com/dati-instabili').then(r => r.json()),
      3,  // massimo 3 tentativi
      500 // ritardo iniziale di 500ms
    );
    
    console.log('Dati recuperati:', dati);
    return dati;
  } catch (errore) {
    console.error('Tutti i tentativi sono falliti:', errore);
    throw errore;
  }
}
```

### Gestione di Più Risultati con Async/Await

```javascript
async function recuperaDatiMultipli() {
  try {
    // Utilizzo di Promise.allSettled per gestire sia successi che fallimenti
    const risultati = await Promise.allSettled([
      fetch('https://api.example.com/utenti').then(r => r.json()),
      fetch('https://api.example.com/prodotti').then(r => r.json()),
      fetch('https://api.example.com/ordini').then(r => r.json())
    ]);
    
    // Elabora i risultati
    const dati = {};
    const errori = [];
    
    risultati.forEach((risultato, indice) => {
      const chiavi = ['utenti', 'prodotti', 'ordini'];
      if (risultato.status === 'fulfilled') {
        dati[chiavi[indice]] = risultato.value;
      } else {
        errori.push({
          risorsa: chiavi[indice],
          errore: risultato.reason
        });
      }
    });
    
    // Registra gli errori ma continua con i dati disponibili
    if (errori.length > 0) {
      console.warn('Alcune richieste sono fallite:', errori);
    }
    
    return { dati, errori };
  } catch (errore) {
    console.error('Errore critico:', errore);
    throw errore;
  }
}
```

## Limitazioni e Considerazioni

### 1. Async/Await Funziona Solo con Promesse

`await` può essere utilizzato solo con valori che sono "thenable" (hanno un metodo `.then()`). Non può essere utilizzato con callback tradizionali.

### 2. Funzioni Async Restituiscono Sempre Promesse

Anche se non utilizzi `await` all'interno di una funzione `async`, essa restituirà comunque una Promessa.

```javascript
async function esempio() {
  return 42; // Viene avvolto in Promise.resolve(42)
}

console.log(esempio()); // Output: Promise { 42 }
```

### 3. Top-Level Await

Fino a ES2022, `await` poteva essere utilizzato solo all'interno di funzioni `async`. Con l'introduzione del "top-level await" nei moduli ES, è possibile utilizzare `await` direttamente a livello di modulo:

```javascript
// In un modulo ES (file con estensione .mjs o con type="module")
import { recuperaDati } from './api.js';

// Top-level await (funziona solo nei moduli ES)
const dati = await recuperaDati();
console.log('Dati:', dati);
```

### 4. Gestione degli Errori

Se non gestisci gli errori con `try/catch`, le promesse rifiutate si propagheranno e potrebbero causare errori non gestiti:

```javascript
async function funzioneRischiosa() {
  // Nessun try/catch qui
  const dati = await fetch('https://api-inesistente.example.com/dati');
  return dati.json();
}

// Devi gestire l'errore quando chiami la funzione
funzioneRischiosa().catch(errore => {
  console.error('Errore gestito:', errore);
});
```

## Best Practices

1. **Usa try/catch per la gestione degli errori**: Avvolgi il codice `await` in blocchi `try/catch` per gestire gli errori in modo elegante.

2. **Evita await annidati inutili**: Esegui operazioni indipendenti in parallelo quando possibile.

3. **Estrai funzioni async riutilizzabili**: Crea funzioni helper per operazioni comuni.

4. **Gestisci sempre le promesse rifiutate**: Assicurati che ogni promessa abbia un gestore di errori.

5. **Utilizza async/await in modo coerente**: Evita di mescolare `.then()/.catch()` e `async/await` nello stesso blocco di codice.

6. **Ricorda che le funzioni async restituiscono promesse**: Quando chiami una funzione `async`, devi gestirla come una promessa.

## Conclusione

La sintassi `async/await` rappresenta un enorme passo avanti nella leggibilità e manutenibilità del codice asincrono in JavaScript. Costruita sulle Promesse, offre un modo più intuitivo per gestire operazioni asincrone, rendendo il codice più simile al tradizionale codice sincrono.

Nel prossimo capitolo, esploreremo pattern avanzati con le Promesse, inclusi metodi come `Promise.all()`, `Promise.race()`, `Promise.allSettled()` e `Promise.any()`.

[Torna all'indice](../README.md) | [Argomento precedente: Gestione degli Errori](./03_Gestione_Errori.md) | [Prossimo argomento: Pattern Avanzati](./05_Pattern_Avanzati.md)