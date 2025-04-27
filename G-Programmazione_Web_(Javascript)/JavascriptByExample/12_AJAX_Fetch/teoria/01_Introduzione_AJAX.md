# Introduzione ad AJAX e Richieste HTTP

AJAX (Asynchronous JavaScript and XML) è una tecnica di sviluppo web che permette di creare applicazioni web interattive aggiornando parti di una pagina senza doverla ricaricare completamente. Questo approccio migliora significativamente l'esperienza utente, rendendo le applicazioni web più veloci e reattive.

## Cos'è AJAX?

AJAX non è una tecnologia a sé stante, ma piuttosto un insieme di tecnologie esistenti utilizzate insieme:

- **JavaScript**: Per elaborare le richieste e gestire le risposte
- **XMLHttpRequest o Fetch API**: Per effettuare richieste HTTP asincrone al server
- **DOM**: Per modificare dinamicamente il contenuto della pagina
- **JSON o XML**: Per lo scambio di dati tra client e server
- **CSS**: Per lo styling dei contenuti aggiornati

Nonostante il nome faccia riferimento a XML, oggi la maggior parte delle applicazioni AJAX utilizza JSON come formato di scambio dati, essendo più leggero e più facile da elaborare con JavaScript.

## Come Funziona AJAX

Il flusso di base di una richiesta AJAX è il seguente:

1. Un evento si verifica nell'applicazione web (ad esempio, l'utente clicca un pulsante)
2. JavaScript crea un oggetto XMLHttpRequest o utilizza la Fetch API
3. Il browser invia una richiesta HTTP al server in background
4. Il server elabora la richiesta
5. Il server invia una risposta al browser
6. JavaScript legge la risposta
7. JavaScript esegue l'azione appropriata (ad esempio, aggiorna parte della pagina)

![Diagramma del flusso AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started/ajax-lifecycle.png)

## Vantaggi di AJAX

- **Migliore esperienza utente**: Le pagine non devono essere ricaricate completamente, risultando in un'esperienza più fluida
- **Riduzione del traffico di rete**: Solo i dati necessari vengono trasferiti, non l'intera pagina
- **Riduzione del carico sul server**: Le richieste sono più leggere e mirate
- **Maggiore interattività**: Le applicazioni web possono rispondere immediatamente alle azioni dell'utente
- **Aggiornamenti parziali**: Solo le parti necessarie della pagina vengono aggiornate

## Svantaggi e Limitazioni

- **Problemi di accessibilità**: Se non implementato correttamente, può creare problemi per gli screen reader
- **Problemi con il pulsante "Indietro"**: Le modifiche effettuate tramite AJAX non vengono registrate nella cronologia del browser
- **SEO**: I contenuti caricati dinamicamente potrebbero non essere indicizzati dai motori di ricerca (anche se questo problema è stato in gran parte risolto)
- **Dipendenza da JavaScript**: Se l'utente ha disabilitato JavaScript, le funzionalità AJAX non funzioneranno

## XMLHttpRequest: Il Metodo Tradizionale

L'oggetto XMLHttpRequest (XHR) è stato il primo metodo per effettuare richieste HTTP asincrone in JavaScript. Ecco un esempio di base:

```javascript
// Creazione di un nuovo oggetto XMLHttpRequest
const xhr = new XMLHttpRequest();

// Configurazione della richiesta
xhr.open('GET', 'https://api.example.com/data', true); // true indica una richiesta asincrona

// Definizione di cosa fare quando la risposta è pronta
xhr.onreadystatechange = function() {
  // readyState 4 significa che la richiesta è completata
  // status 200 significa che la richiesta ha avuto successo
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Elabora la risposta
    const risposta = JSON.parse(xhr.responseText);
    console.log('Dati ricevuti:', risposta);
    
    // Aggiorna la pagina con i dati ricevuti
    document.getElementById('risultato').textContent = risposta.messaggio;
  } else if (xhr.readyState === 4) {
    // La richiesta è completata ma c'è stato un errore
    console.error('Errore nella richiesta:', xhr.status);
  }
};

// Invio della richiesta
xhr.send();
```

### Stati di XMLHttpRequest

L'oggetto XMLHttpRequest ha diversi stati durante il ciclo di vita di una richiesta:

- **0 (UNSENT)**: L'oggetto è stato creato, ma `open()` non è ancora stato chiamato
- **1 (OPENED)**: `open()` è stato chiamato
- **2 (HEADERS_RECEIVED)**: `send()` è stato chiamato e gli header della risposta sono disponibili
- **3 (LOADING)**: La risposta sta scaricando (responseText contiene dati parziali)
- **4 (DONE)**: L'operazione è completata

### Gestione degli Eventi in XMLHttpRequest

Oltre a `onreadystatechange`, XMLHttpRequest offre altri eventi per gestire le diverse fasi della richiesta:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);

// Evento che si attiva quando la richiesta inizia
xhr.onloadstart = function() {
  console.log('Richiesta iniziata');
};

// Evento che si attiva periodicamente durante il download
xhr.onprogress = function(evento) {
  if (evento.lengthComputable) {
    const percentuale = Math.round((evento.loaded / evento.total) * 100);
    console.log(`Progresso: ${percentuale}%`);
  }
};

// Evento che si attiva quando la richiesta è completata con successo
xhr.onload = function() {
  console.log('Richiesta completata con successo');
  const risposta = JSON.parse(xhr.responseText);
  console.log('Dati:', risposta);
};

// Evento che si attiva in caso di errore
xhr.onerror = function() {
  console.error('Si è verificato un errore durante la richiesta');
};

// Evento che si attiva quando la richiesta è completata (con o senza successo)
xhr.onloadend = function() {
  console.log('Richiesta terminata');
};

xhr.send();
```

## Tipi di Richieste HTTP

Le richieste HTTP possono essere di diversi tipi, ognuno con uno scopo specifico:

### GET

Utilizzato per richiedere dati dal server. I parametri vengono aggiunti all'URL.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/utenti?id=123', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const utente = JSON.parse(xhr.responseText);
    console.log('Utente:', utente);
  }
};
xhr.send();
```

### POST

Utilizzato per inviare dati al server, ad esempio per creare una nuova risorsa. I dati vengono inviati nel corpo della richiesta.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.example.com/utenti', true);

// Imposta l'header Content-Type
xhr.setRequestHeader('Content-Type', 'application/json');

// Prepara i dati da inviare
const dati = {
  nome: 'Mario',
  cognome: 'Rossi',
  email: 'mario.rossi@example.com'
};

xhr.onload = function() {
  if (xhr.status === 201) { // 201 Created
    const risposta = JSON.parse(xhr.responseText);
    console.log('Utente creato:', risposta);
  }
};

// Invia i dati come stringa JSON
xhr.send(JSON.stringify(dati));
```

### PUT

Utilizzato per aggiornare una risorsa esistente sul server.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('PUT', 'https://api.example.com/utenti/123', true);
xhr.setRequestHeader('Content-Type', 'application/json');

const dati = {
  nome: 'Mario',
  cognome: 'Bianchi', // Cognome aggiornato
  email: 'mario.bianchi@example.com' // Email aggiornata
};

xhr.onload = function() {
  if (xhr.status === 200) {
    const risposta = JSON.parse(xhr.responseText);
    console.log('Utente aggiornato:', risposta);
  }
};

xhr.send(JSON.stringify(dati));
```

### DELETE

Utilizzato per eliminare una risorsa dal server.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('DELETE', 'https://api.example.com/utenti/123', true);

xhr.onload = function() {
  if (xhr.status === 204) { // 204 No Content
    console.log('Utente eliminato con successo');
  }
};

xhr.send();
```

### PATCH

Utilizzato per applicare modifiche parziali a una risorsa.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('PATCH', 'https://api.example.com/utenti/123', true);
xhr.setRequestHeader('Content-Type', 'application/json');

// Solo i campi da aggiornare
const dati = {
  email: 'nuova.email@example.com'
};

xhr.onload = function() {
  if (xhr.status === 200) {
    const risposta = JSON.parse(xhr.responseText);
    console.log('Email utente aggiornata:', risposta);
  }
};

xhr.send(JSON.stringify(dati));
```

## Header HTTP

Gli header HTTP forniscono informazioni aggiuntive sulla richiesta o sulla risposta. Ecco alcuni header comuni:

### Header di Richiesta

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/dati', true);

// Imposta gli header della richiesta
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer token123');
xhr.setRequestHeader('Accept-Language', 'it-IT');

xhr.send();
```

### Lettura degli Header di Risposta

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/dati', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    // Leggi un header specifico
    const contentType = xhr.getResponseHeader('Content-Type');
    console.log('Tipo di contenuto:', contentType);
    
    // Leggi tutti gli header
    const headers = xhr.getAllResponseHeaders();
    console.log('Tutti gli header:', headers);
    
    // Elabora la risposta
    const risposta = JSON.parse(xhr.responseText);
    console.log('Dati:', risposta);
  }
};

xhr.send();
```

## CORS (Cross-Origin Resource Sharing)

CORS è un meccanismo di sicurezza che impedisce a una pagina web di effettuare richieste AJAX a un dominio diverso da quello che ha servito la pagina stessa. Questo è noto come "same-origin policy" (politica della stessa origine).

Per consentire richieste cross-origin, il server deve includere header specifici nelle sue risposte:

```
Access-Control-Allow-Origin: https://tuosito.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

Se si verificano errori CORS, è necessario che il server sia configurato correttamente per accettare richieste dal tuo dominio.

### Richieste con Credenziali

Per inviare cookie o altre credenziali di autenticazione in una richiesta cross-origin, è necessario impostare la proprietà `withCredentials` a `true`:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/dati-protetti', true);
xhr.withCredentials = true; // Abilita l'invio di credenziali
xhr.onload = function() { /* ... */ };
xhr.send();
```

In questo caso, il server deve anche includere l'header:

```
Access-Control-Allow-Credentials: true
```

## Gestione del Timeout

È possibile impostare un timeout per le richieste XMLHttpRequest, dopo il quale la richiesta verrà annullata:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/dati', true);

// Imposta un timeout di 5 secondi (5000 ms)
xhr.timeout = 5000;

// Evento che si attiva in caso di timeout
xhr.ontimeout = function() {
  console.error('La richiesta è scaduta');
};

xhr.onload = function() { /* ... */ };
xhr.send();
```

## Annullamento di una Richiesta

È possibile annullare una richiesta in corso utilizzando il metodo `abort()`:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/file-grande', true);

// Pulsante per annullare la richiesta
document.getElementById('annulla').addEventListener('click', function() {
  xhr.abort();
  console.log('Richiesta annullata');
});

xhr.onabort = function() {
  console.log('La richiesta è stata annullata');
};

xhr.send();
```

## Esempio Pratico: Caricamento di Dati JSON

Ecco un esempio completo di come caricare dati JSON da un'API e visualizzarli in una pagina web:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Esempio AJAX</title>
  <style>
    .utente {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
    }
    .caricamento {
      display: inline-block;
      width: 20px;
      height: 20px;
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
  <h1>Elenco Utenti</h1>
  
  <button id="caricaUtenti">Carica Utenti</button>
  <div id="stato"></div>
  
  <div id="elencoUtenti"></div>
  
  <script>
    document.getElementById('caricaUtenti').addEventListener('click', caricaUtenti);
    
    function caricaUtenti() {
      const statoEl = document.getElementById('stato');
      const elencoEl = document.getElementById('elencoUtenti');
      
      // Mostra indicatore di caricamento
      statoEl.innerHTML = '<div class="caricamento"></div> Caricamento in corso...';
      
      // Crea la richiesta XHR
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
      
      xhr.onload = function() {
        if (xhr.status === 200) {
          // Parsing dei dati JSON
          const utenti = JSON.parse(xhr.responseText);
          
          // Aggiorna lo stato
          statoEl.textContent = `Caricati ${utenti.length} utenti`;
          
          // Visualizza gli utenti
          let html = '';
          utenti.forEach(utente => {
            html += `
              <div class="utente">
                <h3>${utente.name}</h3>
                <p><strong>Email:</strong> ${utente.email}</p>
                <p><strong>Telefono:</strong> ${utente.phone}</p>
                <p><strong>Sito web:</strong> ${utente.website}</p>
                <p><strong>Azienda:</strong> ${utente.company.name}</p>
              </div>
            `;
          });
          
          elencoEl.innerHTML = html;
        } else {
          // Gestione degli errori
          statoEl.textContent = `Errore: ${xhr.status} ${xhr.statusText}`;
          elencoEl.innerHTML = '';
        }
      };
      
      xhr.onerror = function() {
        statoEl.textContent = 'Si è verificato un errore di rete';
        elencoEl.innerHTML = '';
      };
      
      xhr.send();
    }
  </script>
</body>
</html>
```

## Conclusione

AJAX ha rivoluzionato il modo in cui le applicazioni web interagiscono con gli utenti, permettendo esperienze più fluide e reattive. Sebbene XMLHttpRequest sia stato il metodo tradizionale per implementare AJAX, le moderne applicazioni web tendono a utilizzare la Fetch API o librerie come Axios, che offrono un'interfaccia più semplice e potente.

Nel prossimo capitolo, esploreremo la Fetch API, che rappresenta un approccio più moderno e flessibile per effettuare richieste HTTP in JavaScript.

[Torna all'indice](../README.md) | [Prossimo argomento: Fetch API](./02_Fetch_API.md)