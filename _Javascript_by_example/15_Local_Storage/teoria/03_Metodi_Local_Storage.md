# Metodi del Local Storage

## Interfaccia dell'API Storage

Sia localStorage che sessionStorage implementano l'interfaccia Storage, che fornisce metodi e proprietà per manipolare i dati memorizzati. In questo capitolo, ci concentreremo sui metodi disponibili per interagire con il localStorage.

## Metodi principali

### setItem(chiave, valore)

Il metodo `setItem()` è utilizzato per memorizzare una coppia chiave-valore nel localStorage.

```javascript
localStorage.setItem('username', 'Mario');
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('lastLogin', new Date().toString());
```

È importante notare che tutti i valori vengono memorizzati come stringhe. Se si tenta di memorizzare un numero, un booleano o una data, questi verranno automaticamente convertiti in stringhe.

### getItem(chiave)

Il metodo `getItem()` recupera un valore dal localStorage utilizzando la chiave specificata.

```javascript
const username = localStorage.getItem('username'); // 'Mario'
const isLoggedIn = localStorage.getItem('isLoggedIn'); // 'true' (come stringa, non come booleano)
const lastLogin = localStorage.getItem('lastLogin'); // La data come stringa
```

Se la chiave non esiste, `getItem()` restituisce `null`.

### removeItem(chiave)

Il metodo `removeItem()` rimuove una coppia chiave-valore dal localStorage.

```javascript
localStorage.removeItem('username'); // Rimuove solo questa chiave
console.log(localStorage.getItem('username')); // null
```

### clear()

Il metodo `clear()` rimuove tutte le coppie chiave-valore dal localStorage per il dominio corrente.

```javascript
localStorage.clear(); // Rimuove tutti i dati
```

Attenzione: questo metodo cancella tutti i dati memorizzati per il dominio corrente, quindi va utilizzato con cautela.

### key(indice)

Il metodo `key()` restituisce il nome della chiave alla posizione specificata.

```javascript
localStorage.setItem('username', 'Mario');
localStorage.setItem('isLoggedIn', 'true');

const primaChiave = localStorage.key(0); // Potrebbe essere 'username' o 'isLoggedIn'
```

L'ordine delle chiavi può variare tra browser e implementazioni, quindi non è consigliabile fare affidamento su un ordine specifico.

### Proprietà length

La proprietà `length` restituisce il numero di coppie chiave-valore memorizzate.

```javascript
const numeroItems = localStorage.length;
console.log(`Ci sono ${numeroItems} item nel localStorage`);
```

## Notazione ad oggetto

Oltre ai metodi standard, è possibile utilizzare la notazione ad oggetto per interagire con il localStorage:

```javascript
// Memorizzare dati
localStorage.username = 'Mario';

// Recuperare dati
const username = localStorage.username;

// Rimuovere dati
delete localStorage.username;
```

Questa notazione è più concisa ma meno esplicita. È generalmente consigliabile utilizzare i metodi standard (`setItem`, `getItem`, `removeItem`) per una maggiore chiarezza del codice.

## Iterare sugli elementi del localStorage

È possibile iterare su tutti gli elementi del localStorage utilizzando un ciclo for:

```javascript
// Popolare il localStorage con alcuni dati
localStorage.setItem('nome', 'Mario');
localStorage.setItem('cognome', 'Rossi');
localStorage.setItem('età', '30');

// Iterare su tutti gli elementi
for (let i = 0; i < localStorage.length; i++) {
  const chiave = localStorage.key(i);
  const valore = localStorage.getItem(chiave);
  console.log(`${chiave}: ${valore}`);
}
```

In alternativa, è possibile utilizzare un approccio più moderno con `Object.keys()`:

```javascript
Object.keys(localStorage).forEach(chiave => {
  console.log(`${chiave}: ${localStorage.getItem(chiave)}`);
});
```

## Gestione degli errori

Quando si lavora con il localStorage, è importante gestire potenziali errori. I più comuni sono:

### Quota superata

Se si tenta di memorizzare dati che superano il limite di spazio disponibile (generalmente 5MB), verrà generata un'eccezione `QuotaExceededError`.

```javascript
try {
  // Tentativo di memorizzare una grande quantità di dati
  const grandiDati = 'x'.repeat(10 * 1024 * 1024); // 10MB di dati
  localStorage.setItem('grandiDati', grandiDati);
} catch (e) {
  console.error('Errore di memorizzazione:', e);
  if (e.name === 'QuotaExceededError') {
    alert('Spazio di archiviazione esaurito!');
  }
}
```

### Modalità privata/incognito

In alcuni browser, quando si naviga in modalità privata o incognito, il localStorage potrebbe non essere disponibile o potrebbe generare eccezioni quando si tenta di utilizzarlo.

```javascript
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage è disponibile');
} catch (e) {
  console.log('localStorage non è disponibile:', e);
}
```

Nel prossimo capitolo, vedremo come memorizzare e recuperare oggetti complessi utilizzando JSON con il localStorage.