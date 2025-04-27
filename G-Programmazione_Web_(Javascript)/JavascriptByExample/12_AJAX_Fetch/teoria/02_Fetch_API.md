# Fetch API

La Fetch API è un'interfaccia moderna per effettuare richieste HTTP in JavaScript. Introdotta come alternativa più potente e flessibile a XMLHttpRequest, la Fetch API offre un approccio basato su Promise che semplifica la gestione delle richieste asincrone e si integra perfettamente con le moderne funzionalità di JavaScript come async/await.

## Introduzione alla Fetch API

La Fetch API fornisce un'interfaccia JavaScript per accedere e manipolare parti del protocollo HTTP, come richieste e risposte. Fornisce anche un metodo globale `fetch()` che permette di recuperare risorse in modo asincrono attraverso la rete.

### Sintassi di Base

```javascript
fetch(url, [options])
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

A differenza di XMLHttpRequest, la Fetch API:

- Utilizza le Promise, rendendo il codice più leggibile e manutenibile
- Ha un'API più semplice e intuitiva
- Separa la risposta HTTP dai dati effettivi
- Gestisce meglio le richieste CORS
- Si integra naturalmente con async/await

## Effettuare una Richiesta GET

L'esempio più semplice di utilizzo della Fetch API è una richiesta GET:

```javascript
fetch('https://api.example.com/dati')
  .then(response => {
    // Verifica se la richiesta ha avuto successo
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    return response.json(); // Converte la risposta in JSON
  })
  .then(data => {
    console.log('Dati ricevuti:', data);
    // Elabora i dati ricevuti
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
  });
```

### Verifica dello Stato della Risposta

È importante notare che la Fetch API non considera come errori le risposte HTTP con stato di errore (come 404 o 500). Invece, la Promise viene risolta normalmente e bisogna verificare manualmente la proprietà `ok` o `status` dell'oggetto Response:

```javascript
fetch('https://api.example.com/risorsa-inesistente')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

## Opzioni di Configurazione

Il metodo `fetch()` accetta un secondo parametro opzionale, un oggetto di configurazione che permette di personalizzare la richiesta:

```javascript
fetch('https://api.example.com/dati', {
  method: 'GET', // *GET, POST, PUT, DELETE, ecc.
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  timeout: 5000 // Non è un'opzione standard di fetch, richiede implementazione personalizzata
})
.then(response => response.json())
.then(data => console.log(data));
```

## Effettuare Richieste con Diversi Metodi HTTP

### POST

```javascript
fetch('https://api.example.com/utenti', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Utente creato:', data));
```

### PUT

```javascript
fetch('https://api.example.com/utenti/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Mario',
    cognome: 'Bianchi',
    email: 'mario.bianchi@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Utente aggiornato:', data));
```

### DELETE

```javascript
fetch('https://api.example.com/utenti/123', {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Utente eliminato con successo');
  } else {
    throw new Error(`Errore durante l'eliminazione: ${response.status}`);
  }
});
```

### PATCH

```javascript
fetch('https://api.example.com/utenti/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'nuova.email@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Email utente aggiornata:', data));
```

## Gestione delle Risposte

L'oggetto Response restituito dalla Promise di fetch offre diversi metodi per elaborare la risposta in base al tipo di dati:

### JSON

```javascript
fetch('https://api.example.com/dati')
  .then(response => response.json()) // Converte la risposta in JSON
  .then(data => console.log(data));
```

### Testo

```javascript
fetch('https://api.example.com/testo')
  .then(response => response.text()) // Converte la risposta in testo
  .then(text => console.log(text));
```

### Blob (per file binari)

```javascript
fetch('https://api.example.com/immagine.jpg')
  .then(response => response.blob()) // Converte la risposta in Blob
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  });
```

### FormData

```javascript
fetch('https://api.example.com/form')
  .then(response => response.formData()) // Converte la risposta in FormData
  .then(formData => {
    console.log(formData.get('campo1'));
    console.log(formData.get('campo2'));
  });
```

### ArrayBuffer (per dati binari grezzi)

```javascript
fetch('https://api.example.com/dati-binari')
  .then(response => response.arrayBuffer()) // Converte la risposta in ArrayBuffer
  .then(buffer => {
    // Elabora i dati binari
    const view = new Uint8Array(buffer);
    console.log(view);
  });
```

## Proprietà dell'Oggetto Response

L'oggetto Response fornisce diverse proprietà utili:

```javascript
fetch('https://api.example.com/dati')
  .then(response => {
    console.log('Status:', response.status); // Codice di stato HTTP (es. 200, 404)
    console.log('Status Text:', response.statusText); // Testo dello stato (es. "OK", "Not Found")
    console.log('OK:', response.ok); // true se lo stato è tra 200-299
    console.log('Content Type:', response.headers.get('content-type')); // Tipo di contenuto
    console.log('URL:', response.url); // URL della richiesta
    console.log('Type:', response.type); // basic, cors, error, opaque, opaqueredirect
    console.log('Redirected:', response.redirected); // true se ci sono stati redirect
    
    return response.json();
  })
  .then(data => console.log(data));
```

## Gestione degli Header

### Lettura degli Header di Risposta

```javascript
fetch('https://api.example.com/dati')
  .then(response => {
    // Leggi un header specifico
    console.log('Content-Type:', response.headers.get('content-type'));
    
    // Itera su tutti gli header
    response.headers.forEach((valore, nome) => {
      console.log(`${nome}: ${valore}`);
    });
    
    return response.json();
  })
  .then(data => console.log(data));
```

### Impostazione degli Header di Richiesta

```javascript
fetch('https://api.example.com/dati', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'Valore personalizzato'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Gestione delle Credenziali

Per default, fetch non invia cookie nelle richieste cross-origin. Per includere i cookie, è necessario impostare l'opzione `credentials`:

```javascript
fetch('https://api.example.com/dati-protetti', {
  credentials: 'include' // Invia cookie anche per richieste cross-origin
})
.then(response => response.json())
.then(data => console.log(data));
```

Opzioni disponibili per `credentials`:

- **`omit`**: Non invia mai cookie (default)
- **`same-origin`**: Invia cookie solo per richieste same-origin
- **`include`**: Invia cookie per tutte le richieste, anche cross-origin

## Gestione del Timeout

A differenza di XMLHttpRequest, la Fetch API non supporta nativamente un'opzione di timeout. È possibile implementare un timeout utilizzando `Promise.race()`:

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

fetchWithTimeout('https://api.example.com/dati', {}, 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.message === 'Timeout') {
      console.error('La richiesta è scaduta');
    } else {
      console.error('Errore:', error);
    }
  });
```

## Annullamento di una Richiesta

La Fetch API supporta l'annullamento delle richieste tramite l'API AbortController:

```javascript
// Crea un controller per l'annullamento
const controller = new AbortController();
const signal = controller.signal;

// Pulsante per annullare la richiesta
document.getElementById('annulla').addEventListener('click', () => {
  controller.abort();
  console.log('Richiesta annullata');
});

// Effettua la richiesta con il signal
fetch('https://api.example.com/file-grande', {
  signal: signal
})
.then(response => response.json())
.then(data => console.log('Dati ricevuti:', data))
.catch(error => {
  if (error.name === 'AbortError') {
    console.log('Richiesta annullata dall\'utente');
  } else {
    console.error('Errore:', error);
  }
});
```

## Monitoraggio del Progresso

A differenza di XMLHttpRequest, la Fetch API non fornisce un modo diretto per monitorare il progresso del download. È possibile utilizzare l'API Response.body e ReadableStream per implementare questa funzionalità:

```javascript
fetch('https://api.example.com/file-grande')
  .then(response => {
    // Ottieni la dimensione totale del file
    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    
    // Crea un lettore per lo stream
    const reader = response.body.getReader();
    
    // Funzione per leggere lo stream
    let received = 0;
    function read() {
      return reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Download completato');
          return;
        }
        
        // Aggiorna il conteggio dei byte ricevuti
        received += value.length;
        
        // Calcola e mostra la percentuale
        const percentuale = Math.round((received / total) * 100);
        console.log(`Progresso: ${percentuale}%`);
        
        // Continua a leggere
        return read();
      });
    }
    
    return read();
  })
  .catch(error => console.error('Errore:', error));
```

## Utilizzo con Async/Await

La Fetch API si integra perfettamente con la sintassi async/await, rendendo il codice ancora più leggibile:

```javascript
async function caricaDati() {
  try {
    const response = await fetch('https://api.example.com/dati');
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dati ricevuti:', data);
    return data;
  } catch (error) {
    console.error('Si è verificato un errore:', error);
    throw error; // Rilancia l'errore per gestirlo a un livello superiore
  }
}

// Utilizzo della funzione
caricaDati()
  .then(data => {
    // Elabora i dati
  })
  .catch(error => {
    // Gestisci l'errore
  });

// Oppure con async/await
async function init() {
  try {
    const data = await caricaDati();
    // Elabora i dati
  } catch (error) {
    // Gestisci l'errore
  }
}

init();
```

## Esempio Pratico: Galleria di Immagini

Ecco un esempio completo di come utilizzare la Fetch API per creare una galleria di immagini che carica dati da un'API:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galleria di Immagini</title>
  <style>
    .galleria {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card-content {
      padding: 15px;
    }
    .card h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    .caricamento {
      text-align: center;
      padding: 20px;
      font-size: 18px;
    }
    .errore {
      color: red;
      text-align: center;
      padding: 20px;
    }
    .pulsanti {
      text-align: center;
      margin: 20px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin: 0 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h1 style="text-align: center;">Galleria di Immagini</h1>
  
  <div class="pulsanti">
    <button id="caricaImmagini">Carica Immagini</button>
    <button id="annulla" disabled>Annulla</button>
  </div>
  
  <div id="stato" class="caricamento" style="display: none;"></div>
  
  <div id="galleria" class="galleria"></div>
  
  <script>
    // Elementi DOM
    const btnCarica = document.getElementById('caricaImmagini');
    const btnAnnulla = document.getElementById('annulla');
    const statoEl = document.getElementById('stato');
    const galleriaEl = document.getElementById('galleria');
    
    // Controller per l'annullamento
    let controller;
    
    // Funzione per caricare le immagini
    async function caricaImmagini() {
      // Resetta lo stato
      galleriaEl.innerHTML = '';
      statoEl.style.display = 'block';
      statoEl.textContent = 'Caricamento in corso...';
      statoEl.className = 'caricamento';
      
      // Aggiorna i pulsanti
      btnCarica.disabled = true;
      btnAnnulla.disabled = false;
      
      // Crea un nuovo controller per l'annullamento
      controller = new AbortController();
      const signal = controller.signal;
      
      try {
        // Effettua la richiesta
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20', {
          signal: signal
        });
        
        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        // Converte la risposta in JSON
        const immagini = await response.json();
        
        // Aggiorna lo stato
        statoEl.textContent = `Caricate ${immagini.length} immagini`;
        
        // Visualizza le immagini
        immagini.forEach(immagine => {
          const card = document.createElement('div');
          card.className = 'card';
          
          card.innerHTML = `
            <img src="${immagine.url}" alt="${immagine.title}">
            <div class="card-content">
              <h3>${immagine.title}</h3>
              <p>ID: ${immagine.id}</p>
            </div>
          `;
          
          galleriaEl.appendChild(card);
        });
        
        // Nascondi lo stato dopo un breve ritardo
        setTimeout(() => {
          statoEl.style.display = 'none';
        }, 2000);
      } catch (error) {
        // Gestione degli errori
        if (error.name === 'AbortError') {
          statoEl.textContent = 'Caricamento annullato';
        } else {
          statoEl.textContent = `Errore: ${error.message}`;
          statoEl.className = 'errore';
        }
      } finally {
        // Ripristina i pulsanti
        btnCarica.disabled = false;
        btnAnnulla.disabled = true;
      }
    }
    
    // Funzione per annullare il caricamento
    function annullaCaricamento() {
      if (controller) {
        controller.abort();
        btnAnnulla.disabled = true;
      }
    }
    
    // Aggiungi event listener ai pulsanti
    btnCarica.addEventListener('click', caricaImmagini);
    btnAnnulla.addEventListener('click', annullaCaricamento);
  </script>
</body>
</html>
```

## Vantaggi della Fetch API rispetto a XMLHttpRequest

1. **Sintassi più semplice e intuitiva**: La Fetch API richiede meno codice per eseguire le stesse operazioni.

2. **Basata su Promise**: Facilita la gestione del codice asincrono e si integra con async/await.

3. **Separazione della risposta dai dati**: La Fetch API separa chiaramente l'oggetto Response dai dati effettivi.

4. **Gestione migliore delle richieste CORS**: La Fetch API gestisce meglio le richieste cross-origin.

5. **Stream API**: Supporta l'API ReadableStream per gestire grandi quantità di dati.

6. **Annullamento delle richieste**: Supporta l'annullamento delle richieste tramite l'API AbortController.

## Limitazioni della Fetch API

1. **Nessun supporto nativo per il timeout**: È necessario implementare manualmente un timeout.

2. **Nessun evento di progresso nativo**: A differenza di XMLHttpRequest, non c'è un evento di progresso integrato.

3. **Le risposte con stato di errore non vengono rifiutate automaticamente**: È necessario verificare manualmente lo stato della risposta.

4. **Supporto browser**: Non è supportata in Internet Explorer.

## Conclusione

La Fetch API rappresenta un significativo miglioramento rispetto a XMLHttpRequest, offrendo un'interfaccia più moderna e flessibile per effettuare richieste HTTP in JavaScript. Grazie alla sua integrazione con le Promise e async/await, la Fetch API rende il codice più leggibile e manutenibile, semplificando lo sviluppo di applicazioni web che interagiscono con API e servizi esterni.

Nel prossimo capitolo, approfondiremo l'utilizzo delle Promises e della sintassi async/await, che sono fondamentali per sfruttare appieno il potenziale della Fetch API e gestire efficacemente le operazioni asincrone in JavaScript.

[Torna all'indice](../README.md) | [Argomento precedente: Introduzione ad AJAX](./01_Introduzione_AJAX.md) | [Prossimo argomento: Promises e Async/Await](./03_Promises_Async_Await.md)