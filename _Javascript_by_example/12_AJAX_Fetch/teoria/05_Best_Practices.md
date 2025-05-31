# Best Practices per Richieste HTTP in JavaScript

Implementare richieste HTTP in modo efficiente e sicuro è fondamentale per lo sviluppo di applicazioni web moderne. Questo capitolo esplora le migliori pratiche da seguire quando si utilizzano AJAX e la Fetch API.

## Ottimizzazione delle Prestazioni

### 1. Minimizzare il Numero di Richieste

- **Combinare Richieste**: Quando possibile, raggruppare più operazioni in un'unica richiesta API.
- **Implementare il Batching**: Raccogliere più operazioni e inviarle come batch al server.

```javascript
// Esempio di batching
const operazioni = [
  { tipo: 'aggiorna', id: 1, dati: { nome: 'Prodotto A' } },
  { tipo: 'elimina', id: 2 },
  { tipo: 'crea', dati: { nome: 'Prodotto C' } }
];

fetch('/api/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ operazioni })
});
```

### 2. Implementare la Cache

- **Cache HTTP**: Utilizzare le intestazioni HTTP appropriate per consentire la cache del browser.
- **Cache Lato Client**: Memorizzare i risultati delle richieste in localStorage o IndexedDB.

```javascript
// Funzione per recuperare dati con cache
async function getDatiConCache(url, tempoScadenzaMs = 5 * 60 * 1000) {
  const chiaveCache = `cache_${url}`;
  const timestampChiave = `timestamp_${url}`;
  
  // Controlla se i dati sono in cache e non scaduti
  const datiCache = localStorage.getItem(chiaveCache);
  const timestamp = localStorage.getItem(timestampChiave);
  
  if (datiCache && timestamp) {
    const eta = Date.now() - parseInt(timestamp);
    if (eta < tempoScadenzaMs) {
      return JSON.parse(datiCache);
    }
  }
  
  // Recupera nuovi dati
  const risposta = await fetch(url);
  const dati = await risposta.json();
  
  // Salva in cache
  localStorage.setItem(chiaveCache, JSON.stringify(dati));
  localStorage.setItem(timestampChiave, Date.now().toString());
  
  return dati;
}
```

### 3. Utilizzare la Compressione

- Assicurarsi che il server supporti la compressione gzip o brotli.
- Verificare che le richieste includano l'header `Accept-Encoding`.

## Sicurezza

### 1. Protezione contro CSRF (Cross-Site Request Forgery)

- Utilizzare token CSRF per le richieste che modificano dati.
- Includere il token in un header personalizzato o nel corpo della richiesta.

```javascript
// Recupera il token CSRF da un meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Includi il token in ogni richiesta
fetch('/api/aggiorna', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(dati)
});
```

### 2. Validazione dei Dati

- Validare sempre i dati sia lato client che lato server.
- Non fidarsi mai dei dati provenienti dal client senza validazione.

### 3. Protezione contro XSS (Cross-Site Scripting)

- Sanitizzare sempre i dati ricevuti prima di inserirli nel DOM.
- Utilizzare metodi sicuri per l'inserimento di contenuti nel DOM.

```javascript
// Funzione per sanitizzare il testo
function sanitizzaTesto(testo) {
  const div = document.createElement('div');
  div.textContent = testo;
  return div.innerHTML;
}

// Inserimento sicuro nel DOM
function mostraMessaggio(messaggio) {
  const contenitore = document.getElementById('messaggi');
  const messaggioSanitizzato = sanitizzaTesto(messaggio);
  contenitore.innerHTML += `<div class="messaggio">${messaggioSanitizzato}</div>`;
}
```

## Usabilità e UX

### 1. Fornire Feedback Visivi

- Mostrare indicatori di caricamento durante le richieste.
- Fornire feedback immediati per le azioni dell'utente.

```javascript
// Esempio di gestione dello stato di caricamento
async function caricaDati(url) {
  const contenitore = document.getElementById('contenuto');
  const loader = document.getElementById('loader');
  
  try {
    // Mostra loader
    loader.style.display = 'block';
    contenitore.style.opacity = '0.5';
    
    // Effettua la richiesta
    const risposta = await fetch(url);
    const dati = await risposta.json();
    
    // Aggiorna UI
    renderizzaDati(dati, contenitore);
    
    return dati;
  } catch (errore) {
    console.error('Errore:', errore);
    contenitore.innerHTML = `<div class="errore">Si è verificato un errore: ${errore.message}</div>`;
  } finally {
    // Nascondi loader
    loader.style.display = 'none';
    contenitore.style.opacity = '1';
  }
}
```

### 2. Implementare la Paginazione

- Utilizzare la paginazione per set di dati di grandi dimensioni.
- Implementare lo scorrimento infinito o il caricamento "load more" quando appropriato.

## Architettura e Manutenibilità

### 1. Centralizzare la Logica delle Richieste

- Creare un servizio o una classe dedicata per gestire le richieste API.
- Standardizzare la gestione degli errori e delle risposte.

```javascript
// Classe per gestire le richieste API
class APIService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }
      
      return await response.json();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  // Metodi di convenienza
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }
  
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
```

### 2. Implementare il Pattern Repository

- Organizzare le chiamate API in repository specifici per dominio.
- Separare la logica di business dalla logica di comunicazione con il server.

## Monitoraggio e Debugging

### 1. Implementare il Logging

- Registrare informazioni sulle richieste e le risposte per il debugging.
- Utilizzare diversi livelli di logging (info, warning, error).

### 2. Implementare Strategie di Retry

- Ritentare automaticamente le richieste fallite quando appropriato.
- Utilizzare backoff esponenziale per evitare sovraccarichi.

```javascript
async function fetchConRetry(url, options = {}, maxRetries = 3, delayMs = 1000) {
  let tentativo = 0;
  
  while (tentativo < maxRetries) {
    try {
      return await fetch(url, options).then(response => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      });
    } catch (error) {
      tentativo++;
      
      // Se è l'ultimo tentativo, rilancia l'errore
      if (tentativo >= maxRetries) throw error;
      
      console.warn(`Tentativo ${tentativo}/${maxRetries} fallito. Riprovo tra ${delayMs}ms...`);
      
      // Attendi prima del prossimo tentativo (con backoff esponenziale)
      await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, tentativo - 1)));
    }
  }
}
```

## Conclusione

Implementare le best practices per le richieste HTTP in JavaScript è essenziale per creare applicazioni web robuste, sicure e performanti. Seguendo queste linee guida, potrai:

- Migliorare le prestazioni delle tue applicazioni
- Aumentare la sicurezza contro vulnerabilità comuni
- Offrire una migliore esperienza utente
- Creare codice più manutenibile e scalabile

Ricorda che queste best practices dovrebbero essere adattate alle specifiche esigenze del tuo progetto e al contesto in cui opera la tua applicazione.

[Torna all'indice](../README.md) | [Argomento precedente: Gestione degli Errori](./04_Gestione_Errori.md)