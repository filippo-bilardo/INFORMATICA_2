# Gestione degli Errori nelle Richieste AJAX e Fetch

La gestione degli errori è un aspetto fondamentale nello sviluppo di applicazioni web che utilizzano richieste asincrone. Una corretta implementazione della gestione degli errori migliora l'esperienza utente, facilita il debugging e rende l'applicazione più robusta. In questo capitolo, esploreremo le tecniche e le best practices per gestire gli errori nelle richieste AJAX e Fetch API.

## Tipi di Errori nelle Richieste HTTP

Quando si effettuano richieste HTTP, possono verificarsi diversi tipi di errori:

### 1. Errori di Rete

- **Connessione Assente**: L'utente non è connesso a Internet
- **Timeout**: La richiesta impiega troppo tempo per completarsi
- **CORS (Cross-Origin Resource Sharing)**: Problemi di autorizzazione tra domini diversi
- **DNS non risolto**: Impossibile trovare il server

### 2. Errori di Server

- **Codici di stato 5xx**: Errori interni del server (500, 502, 503, etc.)
- **Sovraccarico del server**: Il server non riesce a gestire la richiesta

### 3. Errori di Client

- **Codici di stato 4xx**: Errori lato client (400, 401, 403, 404, etc.)
- **Dati non validi**: I dati inviati non sono nel formato corretto
- **Autenticazione fallita**: Credenziali non valide o scadute

## Gestione degli Errori con XMLHttpRequest

L'oggetto XMLHttpRequest offre diversi eventi per gestire gli errori:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');

// Gestione errori di rete
xhr.onerror = function() {
  console.error('Si è verificato un errore di rete');
  mostraMessaggioErrore('Impossibile connettersi al server. Verifica la tua connessione.');
};

// Gestione timeout
xhr.timeout = 10000; // 10 secondi
xhr.ontimeout = function() {
  console.error('La richiesta ha impiegato troppo tempo');
  mostraMessaggioErrore('Il server non risponde. Riprova più tardi.');
};

// Gestione risposta
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Successo
    const data = JSON.parse(xhr.responseText);
    elaboraDati(data);
  } else {
    // Errore HTTP
    console.error('Errore HTTP:', xhr.status, xhr.statusText);
    gestisciErroreHTTP(xhr.status);
  }
};

xhr.send();

// Funzione per gestire diversi tipi di errori HTTP
function gestisciErroreHTTP(statusCode) {
  switch(statusCode) {
    case 400:
      mostraMessaggioErrore('Richiesta non valida');
      break;
    case 401:
      mostraMessaggioErrore('Autenticazione richiesta');
      // Reindirizza alla pagina di login
      break;
    case 403:
      mostraMessaggioErrore('Accesso negato');
      break;
    case 404:
      mostraMessaggioErrore('Risorsa non trovata');
      break;
    case 500:
      mostraMessaggioErrore('Errore interno del server');
      break;
    default:
      mostraMessaggioErrore('Si è verificato un errore. Riprova più tardi.');
  }
}
```

## Gestione degli Errori con Fetch API

La Fetch API utilizza le Promise, che offrono un modo più elegante per gestire gli errori tramite il metodo `.catch()`:

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // Importante: Fetch non considera gli errori HTTP (4xx, 5xx) come reject della Promise
    // Dobbiamo verificare manualmente lo stato della risposta
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    elaboraDati(data);
  })
  .catch(error => {
    console.error('Errore durante la richiesta:', error);
    
    // Determina il tipo di errore
    if (error instanceof TypeError && error.message.includes('fetch')) {
      mostraMessaggioErrore('Problema di connessione. Verifica la tua rete.');
    } else {
      mostraMessaggioErrore('Si è verificato un errore durante il recupero dei dati.');
    }
  });
```

### Gestione Avanzata degli Errori con Fetch

```javascript
async function fetchConGestioneErrori(url, options = {}) {
  try {
    // Aggiungi timeout alla richiesta
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Gestione errori HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      };
    }
    
    return await response.json();
  } catch (error) {
    // Gestione errori di abort (timeout)
    if (error.name === 'AbortError') {
      throw new Error('La richiesta è scaduta. Il server impiega troppo tempo a rispondere.');
    }
    
    // Rilancia l'errore per gestirlo a livello superiore
    throw error;
  }
}

// Utilizzo
fetchConGestioneErrori('https://api.example.com/data')
  .then(data => {
    elaboraDati(data);
  })
  .catch(error => {
    console.error('Errore:', error);
    
    // Gestione specifica in base al tipo di errore
    if (error.status) {
      // Errore HTTP con codice di stato
      gestisciErroreHTTP(error.status, error.data);
    } else {
      // Altri errori (rete, parsing, etc.)
      mostraMessaggioErrore(error.message || 'Si è verificato un errore sconosciuto');
    }
  });
```

## Gestione degli Errori con Async/Await

L'utilizzo di async/await rende il codice più leggibile, specialmente nella gestione degli errori:

```javascript
async function recuperaDati() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error);
    
    // Rilancia l'errore per gestirlo a livello superiore
    throw error;
  }
}

// Utilizzo
async function inizializzaApp() {
  try {
    mostraIndicatoreDiCaricamento();
    const dati = await recuperaDati();
    visualizzaDati(dati);
  } catch (error) {
    gestisciErroreApplicazione(error);
  } finally {
    nascondiIndicatoreDiCaricamento();
  }
}
```

## Strategie di Retry

In alcuni casi, può essere utile implementare una strategia di retry per gestire errori temporanei:

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

## Gestione Centralizzata degli Errori

Per applicazioni di grandi dimensioni, è consigliabile implementare un sistema centralizzato di gestione degli errori:

```javascript
// Servizio di gestione errori
class ErrorHandler {
  constructor() {
    this.errorListeners = [];
  }
  
  // Registra un listener per gli errori
  addListener(listener) {
    this.errorListeners.push(listener);
  }
  
  // Gestisci un errore
  handleError(error, context = {}) {
    // Log dell'errore
    console.error('Errore applicazione:', error, context);
    
    // Notifica tutti i listener
    this.errorListeners.forEach(listener => {
      try {
        listener(error, context);
      } catch (e) {
        console.error('Errore nel listener:', e);
      }
    });
    
    // Gestione specifica in base al tipo di errore
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      this.handleNetworkError(error);
    } else if (error.status === 401 || error.status === 403) {
      this.handleAuthError(error);
    } else if (error.status >= 500) {
      this.handleServerError(error);
    }
  }
  
  handleNetworkError(error) {
    // Mostra messaggio appropriato
    mostraMessaggioErrore('Problema di connessione. Verifica la tua rete.');
  }
  
  handleAuthError(error) {
    // Reindirizza alla pagina di login o aggiorna il token
    mostraMessaggioErrore('Sessione scaduta. Effettua nuovamente l'accesso.');
    reindirizzaAlLogin();
  }
  
  handleServerError(error) {
    // Notifica l'utente di un problema del server
    mostraMessaggioErrore('Il server ha riscontrato un problema. Riprova più tardi.');
  }
}

// Utilizzo
const errorHandler = new ErrorHandler();

// Aggiungi listener per analytics
errorHandler.addListener((error, context) => {
  inviaErroreAnalytics(error, context);
});

// Wrapper per le chiamate API
async function chiamaAPI(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        url
      };
    }
    
    return await response.json();
  } catch (error) {
    // Passa l'errore al gestore centralizzato
    errorHandler.handleError(error, { url, options });
    throw error; // Rilancia per gestione locale se necessario
  }
}
```

## Best Practices per la Gestione degli Errori

1. **Non ignorare mai gli errori**: Ogni errore dovrebbe essere gestito o registrato.

2. **Fornisci messaggi di errore utili**: I messaggi dovrebbero essere comprensibili per l'utente finale.

3. **Implementa diversi livelli di gestione degli errori**:
   - Gestione locale per errori specifici di una funzionalità
   - Gestione globale per errori non gestiti

4. **Registra gli errori**: Utilizza un sistema di logging per tracciare gli errori in produzione.

5. **Distingui tra errori di sviluppo e produzione**: Mostra dettagli completi in sviluppo, messaggi semplificati in produzione.

6. **Gestisci sempre il caso peggiore**: Prepara l'applicazione a gestire scenari di errore imprevisti.

7. **Implementa strategie di fallback**: Prevedi alternative quando una richiesta fallisce (dati in cache, contenuti predefiniti).

8. **Testa gli scenari di errore**: Simula errori di rete, timeout e risposte del server non valide.

## Esempio Completo di Gestione Errori

```javascript
// Classe per la gestione delle richieste API
class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: options.timeout || 10000
    };
    this.errorHandler = options.errorHandler || console.error;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.defaultOptions.timeout);
    
    try {
      const response = await fetch(url, {
        ...this.defaultOptions,
        ...options,
        headers: {
          ...this.defaultOptions.headers,
          ...options.headers
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Gestione risposta
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          url,
          isHttpError: true
        };
      }
      
      // Parsing della risposta
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Formatta l'errore
      const formattedError = this.formatError(error, url);
      
      // Gestisci l'errore tramite il gestore configurato
      this.errorHandler(formattedError);
      
      // Rilancia l'errore formattato
      throw formattedError;
    }
  }
  
  formatError(error, url) {
    // Errore di timeout
    if (error.name === 'AbortError') {
      return {
        message: 'La richiesta è scaduta per timeout',
        code: 'TIMEOUT_ERROR',
        url
      };
    }
    
    // Errore HTTP già formattato
    if (error.isHttpError) {
      return error;
    }
    
    // Errore di rete
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        message: 'Impossibile connettersi al server',
        code: 'NETWORK_ERROR',
        originalError: error,
        url
      };
    }
    
    // Altri errori
    return {
      message: error.message || 'Si è verificato un errore sconosciuto',
      code: 'UNKNOWN_ERROR',
      originalError: error,
      url
    };
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
  
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Utilizzo
const api = new APIClient('https://api.example.com', {
  headers: {
    'Authorization': 'Bearer token123'
  },
  timeout: 5000,
  errorHandler: (error) => {
    console.error('API Error:', error);
    
    // Gestione specifica in base al codice di errore
    switch(error.code || error.status) {
      case 'NETWORK_ERROR':
        mostraMessaggioOffline();
        break;
      case 'TIMEOUT_ERROR':
        mostraMessaggioTimeout();
        break;
      case 401:
        reindirizzaAlLogin();
        break;
      case 403:
        mostraMessaggioAccessoDenied();
        break;
      case 404:
        mostraMessaggioRisorsaNonTrovata();
        break;
      default:
        if (error.status >= 500) {
          mostraMessaggioErroreServer();
        } else {
          mostraMessaggioErroreGenerico();
        }
    }
  }
});

// Esempio di utilizzo con gestione errori locale
async function caricaDatiUtente(userId) {
  try {
    return await api.get(`/users/${userId}`);
  } catch (error) {
    // Gestione specifica per questa funzionalità
    if (error.status === 404) {
      console.warn(`Utente ${userId} non trovato`);
      return null; // Valore predefinito
    }
    throw error; // Rilancia altri errori
  }
}
```

## Conclusione

Una gestione efficace degli errori nelle richieste AJAX e Fetch è fondamentale per creare applicazioni web robuste e user-friendly. Implementando le tecniche e le best practices descritte in questo capitolo, potrai:

- Migliorare l'esperienza utente fornendo feedback significativi
- Facilitare il debugging e la manutenzione del codice
- Aumentare la resilienza dell'applicazione di fronte a condizioni di errore
- Implementare strategie di recupero per gestire errori temporanei

Ricorda che una buona gestione degli errori non è un'aggiunta opzionale, ma una parte essenziale di qualsiasi applicazione web moderna.

[Torna all'indice](../README.md) | [Argomento precedente: Promises e Async/Await](./03_Promises_Async_Await.md) | [Prossimo argomento: Best Practices per Richieste HTTP](./05_Best_Practices.md)