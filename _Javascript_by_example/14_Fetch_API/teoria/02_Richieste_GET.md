# Effettuare richieste GET con Fetch API

## Sintassi base di fetch()

La sintassi base del metodo `fetch()` è molto semplice. Nella sua forma più elementare, accetta un solo parametro obbligatorio: l'URL della risorsa che si desidera recuperare.

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

Questo esempio mostra una richiesta GET di base. Il metodo `fetch()` restituisce una Promise che si risolve nell'oggetto Response che rappresenta la risposta alla richiesta.

## Gestione delle risposte

L'oggetto Response fornito dalla Promise di fetch contiene numerose proprietà e metodi utili:

### Proprietà principali dell'oggetto Response

- **response.status**: Il codice di stato HTTP (es. 200, 404, 500)
- **response.statusText**: Il messaggio di stato HTTP (es. "OK", "Not Found")
- **response.ok**: Un booleano che indica se la risposta è stata completata con successo (status tra 200-299)
- **response.headers**: Un oggetto Headers che permette di accedere agli header della risposta
- **response.url**: L'URL completo della risposta
- **response.type**: Il tipo di risposta (es. "basic", "cors")
- **response.redirected**: Indica se la risposta è il risultato di un reindirizzamento

### Metodi per estrarre il corpo della risposta

L'oggetto Response fornisce diversi metodi per estrarre il corpo della risposta in vari formati. Tutti questi metodi restituiscono una Promise:

- **response.text()**: Estrae il corpo come testo
- **response.json()**: Analizza il corpo come JSON
- **response.blob()**: Estrae il corpo come Blob (dati binari)
- **response.arrayBuffer()**: Estrae il corpo come ArrayBuffer
- **response.formData()**: Estrae il corpo come FormData

Ecco un esempio di come gestire una risposta HTTP:

```javascript
fetch('https://api.example.com/users')
  .then(response => {
    // Verifica se la risposta è OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
    }
    
    // Controlla il tipo di contenuto
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json(); // Estrai come JSON
    } else {
      return response.text(); // Estrai come testo
    }
  })
  .then(data => {
    console.log('Dati ricevuti:', data);
    // Elabora i dati qui
  })
  .catch(error => {
    console.error('Errore durante la fetch:', error);
  });
```

## Parsing dei dati JSON

Uno dei casi d'uso più comuni della Fetch API è il recupero e l'elaborazione di dati JSON. Il metodo `response.json()` semplifica notevolmente questo processo:

```javascript
fetch('https://api.example.com/products')
  .then(response => {
    if (!response.ok) throw new Error('Errore nella richiesta');
    return response.json();
  })
  .then(products => {
    // Ora 'products' è un array o un oggetto JavaScript
    products.forEach(product => {
      console.log(`Prodotto: ${product.name}, Prezzo: ${product.price}€`);
    });
    
    // Esempio: aggiungere i prodotti al DOM
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - ${product.price}€`;
      productList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
    // Mostra un messaggio di errore all'utente
    document.getElementById('error-message').textContent = 
      'Impossibile caricare i prodotti. Riprova più tardi.';
  });
```

## Configurazione delle richieste GET

È possibile personalizzare le richieste GET passando un oggetto di configurazione come secondo parametro a `fetch()`:

```javascript
fetch('https://api.example.com/data', {
  method: 'GET', // Opzionale per GET, è il default
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Accept': 'application/json'
  },
  credentials: 'include', // Invia cookie con la richiesta
  cache: 'no-cache', // Controlla la cache
  redirect: 'follow', // Gestione dei reindirizzamenti
  referrerPolicy: 'no-referrer', // Politica del referrer
  mode: 'cors' // Modalità CORS
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Errore:', error));
```

## Esempio pratico: Recupero dati da una API pubblica

Ecco un esempio completo che mostra come recuperare e visualizzare dati da una API pubblica (in questo caso, l'API JSONPlaceholder che fornisce dati fittizi):

```javascript
// Funzione per recuperare e visualizzare una lista di utenti
function fetchUsers() {
  // Mostra un indicatore di caricamento
  const userList = document.getElementById('user-list');
  userList.innerHTML = '<p>Caricamento utenti...</p>';
  
  // Effettua la richiesta
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      // Pulisci l'indicatore di caricamento
      userList.innerHTML = '';
      
      // Crea un elemento per ogni utente
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Telefono:</strong> ${user.phone}</p>
          <p><strong>Sito web:</strong> ${user.website}</p>
          <button class="details-btn" data-id="${user.id}">Vedi dettagli</button>
        `;
        userList.appendChild(userCard);
      });
      
      // Aggiungi event listener ai pulsanti
      document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
          const userId = this.getAttribute('data-id');
          fetchUserDetails(userId);
        });
      });
    })
    .catch(error => {
      userList.innerHTML = `<p class="error">Errore nel caricamento degli utenti: ${error.message}</p>`;
    });
}

// Funzione per recuperare i dettagli di un singolo utente
function fetchUserDetails(userId) {
  const detailsContainer = document.getElementById('user-details');
  detailsContainer.innerHTML = '<p>Caricamento dettagli...</p>';
  
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      return response.json();
    })
    .then(user => {
      detailsContainer.innerHTML = `
        <h2>Dettagli di ${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefono:</strong> ${user.phone}</p>
        <p><strong>Sito web:</strong> ${user.website}</p>
        <h3>Indirizzo:</h3>
        <p>${user.address.street}, ${user.address.suite}</p>
        <p>${user.address.city}, ${user.address.zipcode}</p>
        <h3>Azienda:</h3>
        <p><strong>Nome:</strong> ${user.company.name}</p>
        <p><strong>Slogan:</strong> ${user.company.catchPhrase}</p>
      `;
    })
    .catch(error => {
      detailsContainer.innerHTML = `<p class="error">Errore nel caricamento dei dettagli: ${error.message}</p>`;
    });
}

// Carica gli utenti quando la pagina è pronta
document.addEventListener('DOMContentLoaded', fetchUsers);
```

HTML associato:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Esempio Fetch API - GET</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .user-card { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
    .error { color: red; font-weight: bold; }
    #user-details { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
    .details-btn { background-color: #4CAF50; color: white; border: none; padding: 8px 12px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Elenco Utenti</h1>
  <div id="user-list"><!-- Gli utenti verranno caricati qui --></div>
  <div id="user-details"><!-- I dettagli dell'utente verranno caricati qui --></div>
  
  <script src="script.js"></script>
</body>
</html>
```

Nella prossima sezione, esploreremo come effettuare altri tipi di richieste HTTP come POST, PUT e DELETE utilizzando la Fetch API.