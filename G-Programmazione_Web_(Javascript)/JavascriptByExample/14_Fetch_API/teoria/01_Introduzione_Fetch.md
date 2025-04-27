# Introduzione alla Fetch API

## Cos'è la Fetch API

La Fetch API è un'interfaccia JavaScript moderna per effettuare richieste HTTP. Introdotta come parte delle specifiche ECMAScript, rappresenta un significativo miglioramento rispetto al vecchio XMLHttpRequest (XHR), offrendo un'API più potente e flessibile per il recupero di risorse attraverso la rete.

La Fetch API è basata sulle Promise, il che la rende particolarmente adatta per la programmazione asincrona moderna in JavaScript. Il metodo globale `fetch()` è il punto di ingresso principale per questa API.

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

## Vantaggi rispetto a XMLHttpRequest

La Fetch API offre numerosi vantaggi rispetto al tradizionale XMLHttpRequest:

1. **Sintassi più semplice e intuitiva**: La Fetch API richiede meno codice per eseguire le stesse operazioni rispetto a XHR.

2. **Basata su Promise**: Questo permette un codice più pulito e leggibile, evitando il "callback hell" tipico di XHR.

3. **Supporto nativo per JSON**: Metodi come `response.json()` semplificano notevolmente la gestione dei dati JSON.

4. **Gestione avanzata delle richieste**: Maggiore controllo su headers, metodi HTTP, modalità CORS, ecc.

5. **Streaming delle risposte**: Possibilità di elaborare i dati man mano che arrivano, senza dover attendere il completamento dell'intera risposta.

Ecco un confronto tra Fetch e XMLHttpRequest:

**XMLHttpRequest:**

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
  } else if (xhr.readyState === 4) {
    console.error('Errore nella richiesta');
  }
};
xhr.send();
```

**Fetch API:**

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nella richiesta: ' + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

## Browser supportati

La Fetch API è supportata da tutti i browser moderni:

- Chrome 42+ (marzo 2015)
- Firefox 39+ (luglio 2015)
- Safari 10.1+ (marzo 2017)
- Edge 14+ (agosto 2016)
- Opera 29+ (aprile 2015)

Per i browser più vecchi, è possibile utilizzare un polyfill come [whatwg-fetch](https://github.com/github/fetch) o [unfetch](https://github.com/developit/unfetch).

## Considerazioni importanti

1. **La Fetch API non rifiuta le Promise su errori HTTP**: A differenza di quanto ci si potrebbe aspettare, `fetch()` non genera un errore per risposte con stato HTTP 4xx o 5xx. La Promise viene risolta normalmente, e bisogna verificare manualmente la proprietà `response.ok` o `response.status`.

2. **Non invia cookie di default**: Per inviare cookie con le richieste, è necessario specificare l'opzione `credentials: 'include'`.

3. **Non supporta direttamente il timeout**: A differenza di XHR, Fetch non ha un'opzione di timeout nativa, ma è possibile implementarla combinando `fetch()` con `Promise.race()`.

Nella prossima sezione, esploreremo in dettaglio come effettuare richieste GET con la Fetch API.