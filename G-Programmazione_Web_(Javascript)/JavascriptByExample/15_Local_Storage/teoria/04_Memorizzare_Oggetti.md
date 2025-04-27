# Memorizzare oggetti complessi

## Limitazioni del localStorage con i tipi di dati

Come abbiamo visto nei capitoli precedenti, il localStorage può memorizzare solo stringhe. Questo rappresenta una limitazione significativa quando si desidera memorizzare dati più complessi come oggetti, array, numeri, booleani o date.

Tuttavia, JavaScript offre una soluzione elegante a questo problema: la serializzazione e deserializzazione JSON.

## Utilizzo di JSON per memorizzare oggetti

JSON (JavaScript Object Notation) è un formato di scambio dati leggero che è facile da leggere e scrivere per gli esseri umani e facile da analizzare e generare per le macchine. È basato su un sottoinsieme della sintassi di JavaScript, ma è indipendente dal linguaggio.

### Serializzazione con JSON.stringify()

Per memorizzare un oggetto nel localStorage, è necessario prima convertirlo in una stringa JSON utilizzando il metodo `JSON.stringify()`:

```javascript
// Oggetto JavaScript
const utente = {
  id: 1,
  nome: 'Mario',
  cognome: 'Rossi',
  email: 'mario.rossi@example.com',
  isAdmin: false,
  dataNascita: new Date(1990, 5, 15),
  preferenze: {
    tema: 'scuro',
    notifiche: true
  },
  hobby: ['calcio', 'lettura', 'viaggi']
};

// Conversione dell'oggetto in stringa JSON
const utenteJSON = JSON.stringify(utente);

// Memorizzazione nel localStorage
localStorage.setItem('utente', utenteJSON);
```

### Deserializzazione con JSON.parse()

Per recuperare l'oggetto dal localStorage, è necessario convertire la stringa JSON in un oggetto JavaScript utilizzando il metodo `JSON.parse()`:

```javascript
// Recupero della stringa JSON dal localStorage
const utenteJSON = localStorage.getItem('utente');

// Conversione della stringa JSON in oggetto JavaScript
const utente = JSON.parse(utenteJSON);

console.log(utente.nome); // 'Mario'
console.log(utente.preferenze.tema); // 'scuro'
console.log(utente.hobby[0]); // 'calcio'
```

## Gestione dei tipi di dati speciali

È importante notare che JSON ha alcune limitazioni nella rappresentazione di tipi di dati JavaScript:

### Date

Le date vengono convertite in stringhe durante la serializzazione e non vengono automaticamente riconvertite in oggetti Date durante la deserializzazione:

```javascript
const oggetto = {
  data: new Date()
};

// Serializzazione
localStorage.setItem('oggetto', JSON.stringify(oggetto));

// Deserializzazione
const oggettoRecuperato = JSON.parse(localStorage.getItem('oggetto'));

console.log(oggettoRecuperato.data); // Stringa, non un oggetto Date
console.log(typeof oggettoRecuperato.data); // 'string'
```

Per gestire correttamente le date, è possibile utilizzare una funzione di reviver con `JSON.parse()`:

```javascript
function dateReviver(key, value) {
  // Verifica se il valore è una data in formato ISO
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  if (typeof value === 'string' && dateRegex.test(value)) {
    return new Date(value);
  }
  return value;
}

// Deserializzazione con reviver
const oggettoRecuperato = JSON.parse(localStorage.getItem('oggetto'), dateReviver);

console.log(oggettoRecuperato.data); // Oggetto Date
console.log(typeof oggettoRecuperato.data); // 'object'
```

### Funzioni

Le funzioni non possono essere serializzate in JSON e vengono semplicemente omesse durante la serializzazione:

```javascript
const oggetto = {
  nome: 'Mario',
  saluta: function() {
    return `Ciao, sono ${this.nome}`;
  }
};

// Serializzazione
localStorage.setItem('oggetto', JSON.stringify(oggetto));

// Deserializzazione
const oggettoRecuperato = JSON.parse(localStorage.getItem('oggetto'));

console.log(oggettoRecuperato); // { nome: 'Mario' } - la funzione è stata omessa
```

### Valori undefined

I valori `undefined` vengono omessi durante la serializzazione:

```javascript
const oggetto = {
  a: 1,
  b: undefined,
  c: 3
};

// Serializzazione
localStorage.setItem('oggetto', JSON.stringify(oggetto));

// Deserializzazione
const oggettoRecuperato = JSON.parse(localStorage.getItem('oggetto'));

console.log(oggettoRecuperato); // { a: 1, c: 3 } - la proprietà b è stata omessa
```

## Pattern per la gestione degli oggetti nel localStorage

### Funzioni helper

È utile creare funzioni helper per semplificare la gestione degli oggetti nel localStorage:

```javascript
// Funzione per salvare un oggetto nel localStorage
function saveToLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (e) {
    console.error('Errore durante il salvataggio nel localStorage:', e);
    return false;
  }
}

// Funzione per recuperare un oggetto dal localStorage
function getFromLocalStorage(key, defaultValue = null) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (e) {
    console.error('Errore durante il recupero dal localStorage:', e);
    return defaultValue;
  }
}

// Utilizzo
const utente = {
  nome: 'Mario',
  età: 30,
  preferenze: { tema: 'scuro' }
};

saveToLocalStorage('utente', utente);
const utenteRecuperato = getFromLocalStorage('utente');
```

### Classe di gestione del localStorage

Per applicazioni più complesse, può essere utile creare una classe che gestisca il localStorage:

```javascript
class StorageManager {
  constructor(namespace = '') {
    this.namespace = namespace ? `${namespace}_` : '';
  }

  // Genera una chiave con namespace
  _getKey(key) {
    return `${this.namespace}${key}`;
  }

  // Salva un valore
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this._getKey(key), serializedValue);
      return true;
    } catch (e) {
      console.error('Errore durante il salvataggio:', e);
      return false;
    }
  }

  // Recupera un valore
  get(key, defaultValue = null) {
    try {
      const serializedValue = localStorage.getItem(this._getKey(key));
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue);
    } catch (e) {
      console.error('Errore durante il recupero:', e);
      return defaultValue;
    }
  }

  // Rimuove un valore
  remove(key) {
    localStorage.removeItem(this._getKey(key));
  }

  // Rimuove tutti i valori con questo namespace
  clear() {
    if (!this.namespace) {
      localStorage.clear();
      return;
    }

    // Rimuove solo le chiavi con questo namespace
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.namespace))
      .forEach(key => localStorage.removeItem(key));
  }
}

// Utilizzo
const userStorage = new StorageManager('user');
userStorage.set('profile', { nome: 'Mario', età: 30 });
const profile = userStorage.get('profile');
```

Nel prossimo capitolo, esploreremo gli eventi di storage e come utilizzarli per sincronizzare dati tra diverse schede o finestre del browser.