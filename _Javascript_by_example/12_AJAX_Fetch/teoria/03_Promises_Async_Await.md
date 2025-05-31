# Promises e Async/Await

La gestione delle operazioni asincrone è fondamentale nello sviluppo web moderno. JavaScript offre diversi meccanismi per gestire l'asincronicità, con le Promises e la sintassi async/await che rappresentano gli approcci più moderni ed eleganti. In questo capitolo, esploreremo in dettaglio questi concetti e come utilizzarli efficacemente nelle applicazioni web.

## Introduzione alle Promises

Una Promise in JavaScript è un oggetto che rappresenta il completamento (o il fallimento) di un'operazione asincrona e il suo valore risultante. Una Promise può trovarsi in uno dei seguenti stati:

- **Pending (in attesa)**: stato iniziale, né completata né fallita
- **Fulfilled (completata)**: l'operazione è stata completata con successo
- **Rejected (fallita)**: l'operazione è fallita
- **Settled (risolta)**: la Promise è stata completata o fallita, non è più in attesa

### Sintassi di Base delle Promises

```javascript
const promessa = new Promise((resolve, reject) => {
  // Operazione asincrona
  const successo = true; // Simulazione del risultato
  
  if (successo) {
    // Operazione completata con successo
    resolve('Operazione completata!');
  } else {
    // Operazione fallita
    reject(new Error('Qualcosa è andato storto'));
  }
});

// Utilizzo della Promise
promessa
  .then(risultato => {
    console.log(risultato); // 'Operazione completata!'
  })
  .catch(errore => {
    console.error(errore); // Errore: Qualcosa è andato storto
  })
  .finally(() => {
    console.log('Eseguito sempre, indipendentemente dal risultato');
  });
```

### Metodi delle Promises

#### then()

Il metodo `then()` viene chiamato quando una Promise viene risolta con successo (fulfilled). Può prendere due argomenti: una funzione di callback per il caso di successo e una funzione di callback per il caso di fallimento (anche se è più comune usare `catch()` per gestire gli errori).

```javascript
promessa.then(
  risultato => console.log(risultato), // Callback per il successo
  errore => console.error(errore)     // Callback per il fallimento (opzionale)
);
```

#### catch()

Il metodo `catch()` viene chiamato quando una Promise viene rifiutata (rejected) o quando si verifica un errore durante l'esecuzione di un callback `then()`.

```javascript
promessa
  .then(risultato => {
    throw new Error('Errore nel callback then');
  })
  .catch(errore => {
    console.error(errore); // Cattura sia gli errori della Promise che quelli generati nei callback then
  });
```

#### finally()

Il metodo `finally()` viene chiamato quando una Promise viene risolta (settled), indipendentemente dal fatto che sia stata completata con successo o fallita.

```javascript
promessa
  .then(risultato => console.log(risultato))
  .catch(errore => console.error(errore))
  .finally(() => {
    console.log('Pulizia delle risorse');
    // Codice che deve essere eseguito in ogni caso
  });
```

## Concatenamento delle Promises

Uno dei principali vantaggi delle Promises è la possibilità di concatenare operazioni asincrone in modo leggibile, evitando il "callback hell".

```javascript
// Esempio di callback hell (difficile da leggere e mantenere)
funzione1(parametro, function(risultato1) {
  funzione2(risultato1, function(risultato2) {
    funzione3(risultato2, function(risultato3) {
      funzione4(risultato3, function(risultatoFinale) {
        console.log(risultatoFinale);
      }, gestisciErrore);
    }, gestisciErrore);
  }, gestisciErrore);
}, gestisciErrore);

// Stesso esempio con le Promises (più leggibile e manutenibile)
funzione1Promise(parametro)
  .then(risultato1 => funzione2Promise(risultato1))
  .then(risultato2 => funzione3Promise(risultato2))
  .then(risultato3 => funzione4Promise(risultato3))
  .then(risultatoFinale => console.log(risultatoFinale))
  .catch(errore => gestisciErrore(errore));
```

Ogni chiamata a `then()` restituisce una nuova Promise, permettendo di concatenare facilmente le operazioni.

## Metodi Statici delle Promises

### Promise.resolve() e Promise.reject()

Questi metodi creano Promises già risolte o rifiutate:

```javascript
// Promise già risolta
const promessaRisolta = Promise.resolve('Valore');
promessaRisolta.then(valore => console.log(valore)); // 'Valore'

// Promise già rifiutata
const promessaRifiutata = Promise.reject(new Error('Motivo del rifiuto'));
promessaRifiutata.catch(errore => console.error(errore)); // Error: Motivo del rifiuto
```

### Promise.all()

Il metodo `Promise.all()` prende un array di Promises e restituisce una nuova Promise che viene risolta quando tutte le Promises nell'array sono risolte, o rifiutata non appena una delle Promises nell'array viene rifiutata.

```javascript
const promessa1 = fetch('https://api.example.com/dati1');
const promessa2 = fetch('https://api.example.com/dati2');
const promessa3 = fetch('https://api.example.com/dati3');

Promise.all([promessa1, promessa2, promessa3])
  .then(risultati => {
    // risultati è un array contenente i valori di risoluzione di tutte le Promises
    const [risposta1, risposta2, risposta3] = risultati;
    return Promise.all([risposta1.json(), risposta2.json(), risposta3.json()]);
  })
  .then(dati => {
    console.log('Tutti i dati:', dati);
  })
  .catch(errore => {
    console.error('Almeno una richiesta è fallita:', errore);
  });
```

### Promise.race()

Il metodo `Promise.race()` prende un array di Promises e restituisce una nuova Promise che viene risolta o rifiutata non appena una delle Promises nell'array viene risolta o rifiutata.

```javascript
const promessa1 = new Promise(resolve => setTimeout(() => resolve('Prima'), 500));
const promessa2 = new Promise(resolve => setTimeout(() => resolve('Seconda'), 200));

Promise.race([promessa1, promessa2])
  .then(risultato => console.log(risultato)) // 'Seconda' (perché è più veloce)
  .catch(errore => console.error(errore));
```

Questo è particolarmente utile per implementare timeout:

```javascript
function fetchConTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

fetchConTimeout('https://api.example.com/dati', 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(errore => console.error(errore.message)); // 'Timeout' se la richiesta impiega più di 3 secondi
```

### Promise.allSettled()

Il metodo `Promise.allSettled()` prende un array di Promises e restituisce una nuova Promise che viene risolta quando tutte le Promises nell'array sono risolte (sia con successo che con fallimento).

```javascript
const promesse = [
  fetch('https://api.example.com/endpoint-1'),
  fetch('https://api.example.com/endpoint-2'),
  Promise.reject(new Error('Errore simulato'))
];

Promise.allSettled(promesse)
  .then(risultati => {
    risultati.forEach((risultato, indice) => {
      if (risultato.status === 'fulfilled') {
        console.log(`Promessa ${indice} completata:`, risultato.value);
      } else {
        console.log(`Promessa ${indice} fallita:`, risultato.reason);
      }
    });
  });
```

### Promise.any()

Il metodo `Promise.any()` prende un array di Promises e restituisce una nuova Promise che viene risolta non appena una delle Promises nell'array viene risolta con successo. Se tutte le Promises vengono rifiutate, la Promise risultante viene rifiutata con un `AggregateError`.

```javascript
const promesse = [
  fetch('https://api.example.com/endpoint-1').then(r => r.json()),
  fetch('https://api.example.com/endpoint-2').then(r => r.json()),
  fetch('https://api.example.com/endpoint-3').then(r => r.json())
];

Promise.any(promesse)
  .then(primoRisultato => {
    console.log('Primo risultato disponibile:', primoRisultato);
  })
  .catch(errore => {
    console.error('Tutte le promesse sono fallite:', errore);
  });
```

## Async/Await

La sintassi async/await, introdotta in ES2017 (ES8), è costruita sulle Promises e fornisce un modo più sintetico e leggibile per lavorare con il codice asincrono, facendolo apparire più simile al codice sincrono tradizionale.

### Funzioni Async

Una funzione async è una funzione che restituisce implicitamente una Promise. All'interno di una funzione async, è possibile utilizzare la parola chiave `await` per attendere che una Promise si risolva.

```javascript
async function fetchDati() {
  try {
    const response = await fetch('https://api.example.com/dati');
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const dati = await response.json();
    console.log('Dati ricevuti:', dati);
    return dati;
  } catch (errore) {
    console.error('Si è verificato un errore:', errore);
    throw errore; // Rilancia l'errore per gestirlo a un livello superiore
  }
}

// Utilizzo della funzione async
fetchDati()
  .then(dati => {
    // Elabora i dati
  })
  .catch(errore => {
    // Gestisci l'errore
  });
```

### Vantaggi di Async/Await

1. **Codice più leggibile**: Il flusso del codice è più simile al codice sincrono tradizionale.
2. **Gestione degli errori più intuitiva**: È possibile utilizzare try/catch come nel codice sincrono.
3. **Debugging più semplice**: Gli stack trace sono più chiari e utili.
4. **Evita il concatenamento eccessivo**: Riduce la necessità di concatenare multiple chiamate `then()`.

### Utilizzo di Async/Await con i Metodi delle Promises

```javascript
async function fetchMultipliDati() {
  try {
    // Promise.all con async/await
    const risposte = await Promise.all([
      fetch('https://api.example.com/dati1'),
      fetch('https://api.example.com/dati2'),
      fetch('https://api.example.com/dati3')
    ]);
    
    const dati = await Promise.all(risposte.map(r => r.json()));
    console.log('Tutti i dati:', dati);
    return dati;
  } catch (errore) {  
    console.error('Si è verificato un errore:', errore);
    throw errore;
  }
}
```

### Esecuzione Parallela vs Sequenziale

È importante comprendere la differenza tra esecuzione parallela e sequenziale quando si utilizza async/await:

```javascript
// Esecuzione sequenziale (più lenta)
async function sequenziale() {
  const dati1 = await fetch('https://api.example.com/dati1').then(r => r.json());
  const dati2 = await fetch('https://api.example.com/dati2').then(r => r.json());
  const dati3 = await fetch('https://api.example.com/dati3').then(r => r.json());
  
  return [dati1, dati2, dati3];
}

// Esecuzione parallela (più veloce)
async function parallela() {
  const promessa1 = fetch('https://api.example.com/dati1').then(r => r.json());
  const promessa2 = fetch('https://api.example.com/dati2').then(r => r.json());
  const promessa3 = fetch('https://api.example.com/dati3').then(r => r.json());
  
  const dati1 = await promessa1;
  const dati2 = await promessa2;
  const dati3 = await promessa3;
  
  return [dati1, dati2, dati3];
  
  // Oppure più semplicemente:
  // return await Promise.all([promessa1, promessa2, promessa3]);
}
```

## Pattern e Best Practices

### Gestione degli Errori

```javascript
async function fetchDatiConGestioneErrori(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Gestione personalizzata degli errori HTTP
      if (response.status === 404) {
        throw new Error('Risorsa non trovata');
      } else if (response.status === 401) {
        throw new Error('Non autorizzato');
      } else {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (errore) {
    // Gestione personalizzata in base al tipo di errore
    if (errore.name === 'TypeError') {
      console.error('Errore di rete:', errore.message);
    } else {
      console.error('Errore durante il fetch:', errore.message);
    }
    
    // Rilancia un errore personalizzato o gestisci l'errore qui
    throw new Error(`Impossibile recuperare i dati: ${errore.message}`);
  }
}
```

### Timeout con Async/Await

```javascript
async function fetchConTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await response.json();
  } catch (errore) {
    clearTimeout(id);
    if (errore.name === 'AbortError') {
      throw new Error('La richiesta è scaduta');
    }
    throw errore;
  }
}

// Utilizzo
try {
  const dati = await fetchConTimeout('https://api.example.com/dati', 3000);
  console.log(dati);
} catch (errore) {
  console.error(errore.message);
}
```

### Retry Pattern

```javascript
async function fetchConRetry(url, opzioni = {}, maxRetry = 3, delay = 1000) {
  let tentativi = 0;
  
  while (tentativi < maxRetry) {
    try {
      return await fetch(url, opzioni).then(r => r.json());
    } catch (errore) {
      tentativi++;
      
      if (tentativi >= maxRetry) {
        throw new Error(`Fallito dopo ${maxRetry} tentativi: ${errore.message}`);
      }
      
      console.log(`Tentativo ${tentativi}/${maxRetry} fallito. Riprovo tra ${delay}ms...`);
      
      // Attendi prima di riprovare
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Aumenta il delay per i tentativi successivi (exponential backoff)
      delay *= 2;
    }
  }
}
```

### Funzioni di Utilità

```javascript
// Funzione per gestire facilmente le richieste fetch
async function fetchJSON(url, opzioni = {}) {
  try {
    const response = await fetch(url, opzioni);
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (errore) {
    console.error('Errore durante il fetch:', errore);
    throw errore;
  }
}

// Funzione per ritardare l'esecuzione
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Esempio di utilizzo
async function esempio() {
  try {
    const dati = await fetchJSON('https://api.example.com/dati');
    console.log('Dati ricevuti:', dati);
    
    // Attendi 2 secondi
    await delay(2000);
    
    console.log('Continuo dopo 2 secondi');
  } catch (errore) {
    console.error('Si è verificato un errore:', errore);
  }
}
```

## Esempio Pratico: App Meteo

Ecco un esempio completo di come utilizzare async/await per creare un'applicazione meteo che recupera dati da un'API:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Meteo</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .ricerca {
      display: flex;
      margin-bottom: 20px;
    }
    .ricerca input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    .ricerca button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      font-size: 16px;
    }
    .ricerca button:hover {
      background-color: #45a049;
    }
    .meteo {
      text-align: center;
      display: none;
    }
    .meteo h2 {
      margin-top: 0;
      color: #333;
    }
    .temperatura {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }
    .descrizione {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .dettagli {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    .dettaglio {
      text-align: center;
    }
    .errore {
      color: red;
      text-align: center;
      display: none;
    }
    .caricamento {
      text-align: center;
      display: none;
    }
    .spinner {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>App Meteo</h1>
    
    <div class="ricerca">
      <input type="text" id="citta" placeholder="Inserisci il nome di una città..." value="Roma">
      <button id="cerca">Cerca</button>
    </div>
    
    <div id="caricamento" class="caricamento">
      <div class="spinner"></div>
      <p>Caricamento dati meteo...</p>
    </div>
    
    <div id="errore" class="errore"></div>
    
    <div id="meteo" class="meteo">
      <h2 id="citta-nome"></h2>
      <div class="temperatura" id="temperatura"></div>
      <div class="descrizione" id="descrizione"></div>
      
      <div class="dettagli">
        <div class="dettaglio">
          <h3>Umidità</h3>
          <div id="umidita"></div>
        </div>
        <div class="dettaglio">
          <h3>Vento</h3>
          <div id="vento"></div>
        </div>
        <div class="dettaglio">
          <h3>Pressione</h3>
          <div id="pressione"></div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // Elementi DOM
    const cercaBtn = document.getElementById('cerca');
    const cittaInput = document.getElementById('citta');
    const caricamentoEl = document.getElementById('caricamento');
    const erroreEl = document.getElementById('errore');
    const meteoEl = document.getElementById('meteo');
    const cittaNomeEl = document.getElementById('citta-nome');
    const temperaturaEl = document.getElementById('temperatura');
    const descrizioneEl = document.getElementById('descrizione');
    const umiditaEl = document.getElementById('umidita');
    const ventoEl = document.getElementById('vento');
    const pressioneEl = document.getElementById('pressione');
    
    // API key (in un'applicazione reale, questa dovrebbe essere protetta)
    const apiKey = '4d8fb5b93d4af21d66a2948710284366';
    
    // Funzione per ottenere i dati meteo
    async function getMeteo(citta) {
      // Mostra il caricamento
      caricamentoEl.style.display = 'block';
      meteoEl.style.display = 'none';
      erroreEl.style.display = 'none';
      
      try {
        // Effettua la richiesta all'API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${apiKey}&units=metric&lang=it`
        );
        
        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Aggiorna l'interfaccia con i dati meteo
        cittaNomeEl.textContent = `${data.name}, ${data.sys.country}`;
        temperaturaEl.textContent = `${Math.round(data.main.temp)}°C`;
        descrizioneEl.textContent = data.weather[0].description;
        umiditaEl.textContent = `${data.main.humidity}%`;
        ventoEl.textContent = `${data.wind.speed} m/s`;
        pressioneEl.textContent = `${data.main.pressure} hPa`;
        
        // Mostra i dati meteo
        meteoEl.style.display = 'block';
      } catch (errore) {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati meteo:', errore);
        
        // Mostra il messaggio di errore
        erroreEl.textContent = `Impossibile ottenere i dati meteo: ${errore.message}`;
        erroreEl.style.display = 'block';
      } finally {
        // Nascondi il caricamento
        caricamentoEl.style.display = 'none';
      }
    }
    
    // Event listener per il pulsante di ricerca
    cercaBtn.addEventListener('click', () => {
      const citta = cittaInput.value.trim();
      if (citta) {
        getMeteo(citta);
      }
    });
    
    // Event listener per il tasto Invio nell'input
    cittaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const citta = cittaInput.value.trim();
        if (citta) {
          getMeteo(citta);
        }
      }
    });
    
    // Carica i dati meteo per Roma all'avvio
    getMeteo('Roma');
  </script>
</body>
</html>
```

## Conclusione

Le Promises e la sintassi async/await rappresentano strumenti potenti per gestire le operazioni asincrone in JavaScript. Mentre le Promises offrono un modo strutturato per gestire il flusso asincrono attraverso i metodi `then()`, `catch()` e `finally()`, async/await fornisce una sintassi più intuitiva e leggibile che semplifica ulteriormente la scrittura e la manutenzione del codice asincrono.

La scelta tra Promises e async/await dipende spesso dalle preferenze personali e dal contesto specifico. In generale, async/await è preferibile per la maggior parte dei casi d'uso grazie alla sua leggibilità e alla gestione degli errori più intuitiva, mentre le Promises pure possono essere più appropriate in scenari specifici, come quando si lavora con i metodi statici come `Promise.all()` o `Promise.race()`.

Indipendentemente dall'approccio scelto, una solida comprensione di entrambi i meccanismi è essenziale per sviluppare applicazioni web moderne ed efficienti.

[Torna all'indice](../README.md) | [Argomento precedente: Fetch API](./02_Fetch_API.md) | [Prossimo argomento: Lavorare con JSON](./04_Lavorare_con_JSON.md)