# XMLHttpRequest (XHR)

L'oggetto `XMLHttpRequest` (spesso abbreviato in XHR) è stato per lungo tempo il meccanismo principale fornito dai browser per effettuare richieste HTTP asincrone tramite JavaScript. Sebbene la Fetch API sia oggi considerata un'alternativa più moderna e flessibile, comprendere XHR è ancora utile, specialmente quando si lavora con codebase legacy o si necessita di funzionalità specifiche come il monitoraggio del progresso dell'upload.

## Creare un Oggetto XHR

Per iniziare, è necessario creare un'istanza dell'oggetto `XMLHttpRequest`:

```javascript
const xhr = new XMLHttpRequest();
```

## Configurare la Richiesta

Una volta creato l'oggetto, si utilizza il metodo `open()` per inizializzare la richiesta, specificando il metodo HTTP e l'URL:

```javascript
// xhr.open(metodo, url, [async], [user], [password])
xhr.open('GET', 'https://api.example.com/data', true); // true indica che la richiesta è asincrona (default)
```

*   **`metodo`**: Il metodo HTTP (es. 'GET', 'POST', 'PUT', 'DELETE').
*   **`url`**: L'URL della risorsa da richiedere.
*   **`async`**: Un booleano opzionale. Se `true` (default), la richiesta è asincrona. Se `false`, la richiesta è sincrona (sconsigliato, blocca l'esecuzione di JavaScript).
*   **`user`, `password`**: Credenziali opzionali per l'autenticazione HTTP di base.

## Gestire gli Eventi

XHR utilizza un sistema basato su eventi per gestire il ciclo di vita della richiesta. L'evento più importante è `onreadystatechange`, che viene attivato ogni volta che lo stato della richiesta (`readyState`) cambia.

```javascript
xhr.onreadystatechange = function() {
  // Controlla se la richiesta è completata (readyState 4) e andata a buon fine (status 200)
  if (xhr.readyState === 4 && xhr.status === 200) {
    // La richiesta è terminata con successo
    console.log('Risposta ricevuta:', xhr.responseText); // o xhr.responseXML per XML
    // Qui puoi elaborare la risposta
  } else if (xhr.readyState === 4) {
    // La richiesta è terminata, ma con un errore (status non è 200)
    console.error('Errore nella richiesta:', xhr.status, xhr.statusText);
  }
};
```

### Stati di `readyState`

*   `0`: UNSENT - `open()` non è ancora stato chiamato.
*   `1`: OPENED - `open()` è stato chiamato.
*   `2`: HEADERS_RECEIVED - `send()` è stato chiamato e gli header e lo status sono disponibili.
*   `3`: LOADING - Download in corso; `responseText` contiene dati parziali.
*   `4`: DONE - Operazione completata.

### Proprietà Utili

*   **`status`**: Il codice di stato HTTP della risposta (es. 200, 404, 500).
*   **`statusText`**: La stringa di stato HTTP (es. 'OK', 'Not Found').
*   **`responseText`**: La risposta del server come stringa di testo.
*   **`responseXML`**: La risposta del server come oggetto `Document` XML (se il `Content-Type` della risposta è XML).
*   **`response`**: La risposta del server nel formato specificato da `responseType`.
*   **`responseType`**: Permette di specificare il formato desiderato per la risposta (es. 'json', 'blob', 'arraybuffer', 'document', 'text').

```javascript
xhr.responseType = 'json'; // Chiede al browser di parsare la risposta come JSON
xhr.onload = function() { // Alternativa a onreadystatechange per gestire solo il successo
  if (xhr.status === 200) {
    console.log('Dati JSON:', xhr.response);
  } else {
    console.error('Errore:', xhr.status);
  }
};
```

## Inviare la Richiesta

Dopo aver configurato la richiesta e impostato i gestori di eventi, si invia la richiesta con il metodo `send()`.

```javascript
xhr.send(null); // Per richieste GET, il corpo è null o omesso
```

Per richieste come `POST` o `PUT` che richiedono l'invio di dati nel corpo, i dati vengono passati come argomento a `send()`.

```javascript
xhr.open('POST', 'https://api.example.com/users');
// Imposta l'header Content-Type per indicare il formato dei dati inviati
xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

const data = JSON.stringify({ name: 'Mario Rossi', email: 'mario.rossi@example.com' });
xhr.send(data);
```

## Gestione degli Errori

Gli errori di rete (es. problemi di connessione) possono essere catturati con l'evento `onerror`.

```javascript
xhr.onerror = function() {
  console.error('Errore di rete durante la richiesta.');
};
```

## Abortire una Richiesta

È possibile interrompere una richiesta in corso utilizzando il metodo `abort()`.

```javascript
xhr.abort();
```

## Limitazioni di XHR

Sebbene potente, XHR ha alcune limitazioni e complessità rispetto alla Fetch API:

*   **API basata su eventi:** Può portare a codice più complesso e annidato (callback hell) rispetto alle Promises usate da Fetch.
*   **Gestione dei dati:** Meno flessibile nella gestione diretta di diversi tipi di risposta rispetto a Fetch.
*   **Configurazione:** Richiede più passaggi per configurare header e altre opzioni.

## Conclusione

`XMLHttpRequest` è stato il pilastro di AJAX per molti anni. Anche se la Fetch API offre un'interfaccia più moderna e basata su Promise, conoscere XHR rimane importante per comprendere le basi delle richieste asincrone nel browser e per lavorare su progetti esistenti.

Nel prossimo capitolo, introdurremo la Fetch API, l'alternativa moderna a XHR.

[Torna all'indice](../README.md) | [Argomento precedente: Introduzione ad AJAX e HTTP](./01_Introduzione_AJAX_HTTP.md) | [Prossimo argomento: Fetch API](./03_Fetch_API.md)