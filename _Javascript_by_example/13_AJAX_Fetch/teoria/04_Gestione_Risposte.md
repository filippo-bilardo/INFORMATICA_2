# Gestione delle Risposte (JSON, Text, etc.)

Quando si effettua una richiesta con la Fetch API, il server invia una risposta. L'oggetto `Response` restituito dalla `Promise` di `fetch()` contiene le informazioni sulla risposta (come lo status e gli header), ma il corpo della risposta (i dati effettivi) deve essere letto separatamente e in modo asincrono.

L'oggetto `Response` fornisce diversi metodi per leggere il corpo in vari formati. Ognuno di questi metodi restituisce una `Promise` che si risolve con il contenuto del corpo nel formato desiderato.

## Leggere Risposte JSON (`response.json()`)

Questo è il metodo più comune quando si lavora con API web, poiché JSON (JavaScript Object Notation) è il formato standard per lo scambio di dati.

Il metodo `response.json()` legge l'intero corpo della risposta, lo interpreta come una stringa JSON e lo converte automaticamente in un oggetto o array JavaScript.

```javascript
fetch('https://api.example.com/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    // Controlla l'header Content-Type per assicurarsi che sia JSON (opzionale ma buona pratica)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, non abbiamo ricevuto JSON!");
    }
    return response.json(); // Restituisce una Promise che si risolve con l'oggetto JS
  })
  .then(data => {
    console.log('Dati JSON ricevuti:', data);
    // Ora puoi usare 'data' come un normale oggetto/array JavaScript
    console.log(data.nome); 
    console.log(data.items[0]);
  })
  .catch(error => {
    console.error('Errore nel recupero o parsing JSON:', error);
  });
```

**Importante:** Se il corpo della risposta non è un JSON valido, la `Promise` restituita da `response.json()` verrà rifiutata con un `SyntaxError`.

## Leggere Risposte Testuali (`response.text()`)

Se la risposta attesa è semplice testo (HTML, testo puro, CSV, ecc.), si usa `response.text()`.

```javascript
fetch('https://example.com/pagina.html')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.text(); // Restituisce una Promise che si risolve con la stringa di testo
  })
  .then(htmlContent => {
    console.log('Contenuto HTML ricevuto:');
    // Puoi inserire questo HTML nel DOM o elaborarlo come stringa
    // document.getElementById('content').innerHTML = htmlContent;
  })
  .catch(error => {
    console.error('Errore nel recupero del testo:', error);
  });
```

## Leggere Dati Binari (`response.blob()`)

Quando la risposta è un file binario, come un'immagine, un PDF o un file audio/video, si utilizza `response.blob()`. Un `Blob` (Binary Large Object) rappresenta dati binari immutabili.

```javascript
fetch('https://example.com/immagine.png')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.blob(); // Restituisce una Promise che si risolve con un oggetto Blob
  })
  .then(imageBlob => {
    console.log('Blob ricevuto:', imageBlob);
    console.log('Tipo MIME:', imageBlob.type); // es. 'image/png'
    console.log('Dimensione:', imageBlob.size, 'bytes');

    // Puoi usare il Blob per creare un URL oggetto e visualizzare l'immagine
    const imageObjectURL = URL.createObjectURL(imageBlob);
    const imgElement = document.createElement('img');
    imgElement.src = imageObjectURL;
    document.body.appendChild(imgElement);
  })
  .catch(error => {
    console.error('Errore nel recupero del Blob:', error);
  });
```

## Leggere Dati Binari (`response.arrayBuffer()`)

Simile a `blob()`, ma `response.arrayBuffer()` legge il corpo come un `ArrayBuffer`, che è una rappresentazione generica di un buffer di dati binari a lunghezza fissa. È utile quando si ha bisogno di manipolare i byte dei dati direttamente.

```javascript
fetch('https://example.com/dati.bin')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.arrayBuffer(); // Restituisce una Promise che si risolve con un ArrayBuffer
  })
  .then(buffer => {
    console.log('ArrayBuffer ricevuto:', buffer);
    // Puoi creare una vista tipizzata per accedere ai dati
    const dataView = new DataView(buffer);
    console.log('Primo byte (come intero a 8 bit):', dataView.getUint8(0));
  })
  .catch(error => {
    console.error('Errore nel recupero dell\'ArrayBuffer:', error);
  });
```

## Leggere Dati di Form (`response.formData()`)

Se la risposta è codificata come `multipart/form-data` o `application/x-www-form-urlencoded` (meno comune per le risposte), puoi usare `response.formData()` per ottenere un oggetto `FormData`.

```javascript
// Meno comune ricevere FormData, più comune inviarlo.
// Questo è un esempio ipotetico.
fetch('https://api.example.com/form-response')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.formData(); // Restituisce una Promise che si risolve con un oggetto FormData
  })
  .then(formData => {
    console.log('FormData ricevuto:');
    // Puoi accedere ai campi del form
    console.log('Valore campo "nome":', formData.get('nome'));
    console.log('Valore campo "email":', formData.get('email'));
  })
  .catch(error => {
    console.error('Errore nel recupero del FormData:', error);
  });
```

## Importante: Leggere il Corpo una Sola Volta

Il corpo di un oggetto `Response` può essere letto **una sola volta**. Dopo aver chiamato uno dei metodi di lettura del corpo (es. `json()`, `text()`, `blob()`), il flusso del corpo viene consumato e non può essere letto di nuovo.

Se hai bisogno di leggere il corpo più volte o in formati diversi, devi prima clonare la risposta usando `response.clone()`:

```javascript
fetch('https://api.example.com/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    // Clona la risposta prima di leggere il corpo
    const clonedResponse = response.clone();

    // Leggi come JSON dalla risposta originale
    response.json().then(data => {
      console.log('Letti come JSON:', data);
    });

    // Leggi come testo dalla risposta clonata
    clonedResponse.text().then(text => {
      console.log('Letti come Testo:', text);
    });
  })
  .catch(error => {
    console.error('Errore:', error);
  });
```

## Conclusione

La Fetch API fornisce metodi flessibili per leggere il corpo delle risposte HTTP in vari formati. Scegliere il metodo corretto (`json()`, `text()`, `blob()`, `arrayBuffer()`, `formData()`) in base al `Content-Type` atteso o alla natura dei dati è fondamentale. Ricorda la regola "leggi una sola volta" e usa `clone()` se necessario.

Nel prossimo capitolo, vedremo come gestire gli errori in modo più efficace con Fetch.

[Torna all'indice](../README.md) | [Argomento precedente: Fetch API](./03_Fetch_API.md) | [Prossimo argomento: Gestione degli Errori con Fetch](./05_Gestione_Errori_Fetch.md)