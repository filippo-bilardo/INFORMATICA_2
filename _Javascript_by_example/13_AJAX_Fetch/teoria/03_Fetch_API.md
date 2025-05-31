# Fetch API

La **Fetch API** è un'interfaccia moderna e potente introdotta nei browser per effettuare richieste di rete (HTTP). Rappresenta un'alternativa più flessibile e basata su Promise rispetto al tradizionale `XMLHttpRequest` (XHR).

## Vantaggi della Fetch API

*   **API più pulita e semplice:** L'interfaccia è più intuitiva e facile da usare.
*   **Basata su Promise:** Si integra perfettamente con le `Promise` di JavaScript, rendendo la gestione del codice asincrono più leggibile e manutenibile (evitando il "callback hell").
*   **Flessibilità:** Offre un controllo più granulare su parti della comunicazione HTTP come le richieste e le risposte.
*   **Integrazione con Service Workers:** Fondamentale per funzionalità avanzate come il caching offline.

## Utilizzo Base: Richiesta GET

La funzione `fetch()` è il punto di ingresso principale. Accetta l'URL della risorsa come primo argomento e restituisce una `Promise` che si risolve con l'oggetto `Response`.

```javascript
fetch('https://api.example.com/users') // Restituisce una Promise
  .then(response => {
    // La Promise si risolve non appena gli header della risposta sono disponibili.
    // response è un oggetto Response.
    console.log('Stato della risposta:', response.status, response.statusText);
    console.log('OK?', response.ok); // true se lo status è nel range 200-299

    // Per leggere il corpo della risposta, usiamo metodi come .json(), .text(), etc.
    // Questi metodi restituiscono anch'essi una Promise.
    if (!response.ok) {
      // Se la risposta HTTP non è OK (es. 404, 500), lanciamo un errore
      // per essere catturato dal blocco .catch()
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.json(); // Parsa il corpo della risposta come JSON
  })
  .then(data => {
    // Qui 'data' contiene l'oggetto JavaScript parsato dal JSON
    console.log('Dati ricevuti:', data);
    // Aggiorna l'interfaccia utente con i dati
  })
  .catch(error => {
    // Gestisce errori di rete (es. connessione fallita) o errori lanciati nel .then()
    console.error('Impossibile recuperare i dati:', error);
  });
```

**Spiegazione:**

1.  `fetch(url)`: Inizia la richiesta GET all'URL specificato.
2.  `.then(response => ...)`: Questo blocco viene eseguito quando gli *header* della risposta sono stati ricevuti. L'oggetto `response` contiene informazioni sulla risposta (status, headers, etc.) ma non ancora il corpo completo.
3.  `response.ok`: Una proprietà booleana comoda per verificare se la richiesta HTTP ha avuto successo (status 200-299).
4.  `response.json()`: Legge il corpo della risposta e lo interpreta come JSON. Restituisce una `Promise` che si risolve con l'oggetto JavaScript risultante.
5.  `.then(data => ...)`: Questo blocco viene eseguito quando il corpo è stato letto e parsato con successo. `data` contiene i dati finali.
6.  `.catch(error => ...)`: Cattura eventuali errori che si verificano durante la richiesta (problemi di rete) o durante l'elaborazione della risposta (es. JSON malformato, errore lanciato manualmente se `response.ok` è `false`).

## Oggetti `Request` e `Response`

Fetch API introduce concetti come gli oggetti `Request` e `Response`, che permettono una maggiore flessibilità:

*   **`Request`**: Rappresenta una richiesta HTTP. Può essere creato esplicitamente e passato a `fetch()`.
*   **`Response`**: Rappresenta la risposta a una richiesta.

```javascript
const myRequest = new Request('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

fetch(myRequest)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Configurare la Richiesta (Opzioni)

`fetch()` accetta un secondo argomento opzionale, un oggetto di configurazione, per personalizzare la richiesta (metodo, headers, corpo, etc.).

```javascript
fetch('https://api.example.com/users', {
  method: 'POST', // Specifica il metodo HTTP
  headers: {
    'Content-Type': 'application/json', // Indica che inviamo JSON
    'Authorization': 'Bearer TUO_TOKEN_QUI' // Esempio di header di autenticazione
  },
  body: JSON.stringify({ // Il corpo della richiesta (deve essere una stringa o Blob/BufferSource)
    name: 'Jane Doe',
    email: 'jane.doe@example.com'
  }),
  mode: 'cors', // Gestione Cross-Origin Resource Sharing (altri valori: 'no-cors', 'same-origin')
  cache: 'no-cache' // Controllo della cache del browser
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Errore HTTP! Stato: ${response.status}`);
  }
  return response.json(); // O .text() se il server non risponde con JSON
})
.then(data => {
  console.log('Risposta dal POST:', data);
})
.catch(error => {
  console.error('Errore durante il POST:', error);
});
```

## Leggere Diversi Tipi di Risposta

L'oggetto `Response` fornisce diversi metodi per leggere il corpo in vari formati, tutti restituiscono una `Promise`:

*   `response.json()`: Parsa il corpo come JSON.
*   `response.text()`: Legge il corpo come testo semplice.
*   `response.blob()`: Legge il corpo come un oggetto `Blob` (utile per file/immagini).
*   `response.arrayBuffer()`: Legge il corpo come un `ArrayBuffer` (dati binari).
*   `response.formData()`: Legge il corpo come `FormData`.

## Gestione degli Errori

È importante notare che `fetch()` **non rifiuta la Promise per errori HTTP** (come 404 o 500). La Promise viene rifiutata solo per errori di rete che impediscono il completamento della richiesta.

Per questo motivo, è fondamentale controllare la proprietà `response.ok` o `response.status` nel primo `.then()` e lanciare manualmente un errore se necessario, per farlo catturare dal blocco `.catch()`.

## Conclusione

La Fetch API offre un modo moderno, potente e flessibile per interagire con le risorse di rete dal browser. La sua integrazione con le Promise semplifica notevolmente la gestione del codice asincrono rispetto a XHR. Comprendere `fetch`, gli oggetti `Request` e `Response`, e come gestire correttamente le risposte e gli errori è cruciale per lo sviluppo web moderno.

Nei prossimi capitoli, approfondiremo come gestire specificamente i diversi tipi di risposte e come implementare una gestione degli errori più robusta.

[Torna all'indice](../README.md) | [Argomento precedente: XMLHttpRequest](./02_XMLHttpRequest.md) | [Prossimo argomento: Gestione delle Risposte](./04_Gestione_Risposte.md)