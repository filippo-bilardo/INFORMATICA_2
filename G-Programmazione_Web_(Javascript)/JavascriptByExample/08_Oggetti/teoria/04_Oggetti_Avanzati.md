# Oggetti Avanzati in JavaScript

In questa guida esploreremo le funzionalità avanzate degli oggetti in JavaScript, inclusi i metodi di Object, le proprietà avanzate, e le tecniche moderne per lavorare con gli oggetti.

## Metodi Statici di Object

JavaScript fornisce numerosi metodi statici attraverso l'oggetto globale `Object` che permettono di manipolare e interagire con gli oggetti in modi avanzati.

### Object.keys(), Object.values() e Object.entries()

Questi metodi permettono di estrarre le chiavi, i valori o le coppie chiave-valore di un oggetto:

```javascript
const persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  professione: "Sviluppatore"
};

// Ottenere tutte le chiavi
const chiavi = Object.keys(persona);
console.log(chiavi); // Output: ["nome", "cognome", "età", "professione"]

// Ottenere tutti i valori
const valori = Object.values(persona);
console.log(valori); // Output: ["Mario", "Rossi", 30, "Sviluppatore"]

// Ottenere tutte le coppie chiave-valore
const entries = Object.entries(persona);
console.log(entries);
// Output: [["nome", "Mario"], ["cognome", "Rossi"], ["età", 30], ["professione", "Sviluppatore"]]

// Iterare sulle entries
for (const [chiave, valore] of Object.entries(persona)) {
  console.log(`${chiave}: ${valore}`);
}
```

### Object.assign()

Il metodo `Object.assign()` permette di copiare tutte le proprietà enumerabili da uno o più oggetti sorgente a un oggetto di destinazione:

```javascript
const dettagliBase = {
  tipo: "Utente",
  attivo: true
};

const dettagliPersonali = {
  nome: "Mario",
  cognome: "Rossi"
};

const dettagliProfessionali = {
  professione: "Sviluppatore",
  azienda: "Tech Corp"
};

// Combinare più oggetti in uno nuovo
const utente = Object.assign({}, dettagliBase, dettagliPersonali, dettagliProfessionali);
console.log(utente);
/* Output:
{
  tipo: "Utente",
  attivo: true,
  nome: "Mario",
  cognome: "Rossi",
  professione: "Sviluppatore",
  azienda: "Tech Corp"
}
*/

// Attenzione: Object.assign() esegue una copia superficiale
const originale = { a: 1, b: { c: 2 } };
const copia = Object.assign({}, originale);

copia.a = 3;
copia.b.c = 4;

console.log(originale.a); // Output: 1 (non modificato)
console.log(originale.b.c); // Output: 4 (modificato perché è un riferimento)
```

### Object.freeze() e Object.seal()

Questi metodi permettono di controllare la mutabilità degli oggetti:

```javascript
// Object.freeze() rende un oggetto completamente immutabile
const configurazione = Object.freeze({
  apiKey: "abc123",
  endpoint: "https://api.example.com",
  timeout: 5000
});

// Tentativo di modifica (fallirà in modalità strict)
configurazioni.timeout = 10000;
console.log(configurazione.timeout); // Output: 5000 (non modificato)

// Object.seal() impedisce l'aggiunta o l'eliminazione di proprietà, ma permette la modifica
const utente = Object.seal({
  id: 1,
  nome: "Mario",
  preferenze: { tema: "chiaro" }
});

utente.nome = "Luigi"; // Consentito
utente.preferenze.tema = "scuro"; // Consentito
utente.email = "mario@example.com"; // Non consentito (ignorato in modalità non-strict)
delete utente.nome; // Non consentito (ignorato in modalità non-strict)

console.log(utente); // Output: { id: 1, nome: "Luigi", preferenze: { tema: "scuro" } }
```

### Object.is()

Il metodo `Object.is()` determina se due valori sono lo stesso valore, con alcune differenze rispetto agli operatori `==` e `===`:

```javascript
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, '5')); // false

// Differenze con ===
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
```

## Proprietà Avanzate degli Oggetti

### Proprietà Calcolate (Computed Properties)

Le proprietà calcolate permettono di utilizzare espressioni come nomi di proprietà:

```javascript
const chiave = "stato";
const valore = "attivo";

const utente = {
  nome: "Mario",
  [chiave]: valore, // Proprietà calcolata
  [`info_${chiave}`]: `Informazioni sullo ${valore}` // Proprietà calcolata con template string
};

console.log(utente.stato); // Output: "attivo"
console.log(utente.info_stato); // Output: "Informazioni sullo attivo"
```

### Simboli come Chiavi di Proprietà

I simboli sono un tipo primitivo unico che può essere utilizzato come chiave di proprietà per garantire che non ci siano collisioni di nomi:

```javascript
const idSimbolo = Symbol('id');
const descrizioneSimbolo = Symbol('descrizione');

const prodotto = {
  nome: "Laptop",
  [idSimbolo]: "XYZ123",
  [descrizioneSimbolo]: "Computer portatile di alta qualità"
};

console.log(prodotto[idSimbolo]); // Output: "XYZ123"

// Le proprietà simbolo non sono enumerate con i metodi standard
console.log(Object.keys(prodotto)); // Output: ["nome"]

// Per ottenere i simboli di un oggetto
console.log(Object.getOwnPropertySymbols(prodotto)); // Output: [Symbol(id), Symbol(descrizione)]
```

### Proprietà Private con Simboli

I simboli possono essere utilizzati per implementare proprietà "private" (anche se non sono veramente private):

```javascript
const _password = Symbol('password');

class Utente {
  constructor(nome, password) {
    this.nome = nome;
    this[_password] = password;
  }
  
  verificaPassword(pwd) {
    return this[_password] === pwd;
  }
}

const utente = new Utente("Mario", "secreta123");
console.log(utente.verificaPassword("secreta123")); // Output: true
console.log(utente[_password]); // Output: "secreta123" (non è veramente privata se si ha accesso al simbolo)
```

## Tecniche Moderne per Lavorare con gli Oggetti

### Destrutturazione degli Oggetti

La destrutturazione permette di estrarre proprietà da un oggetto in variabili separate:

```javascript
const persona = {
  nome: "Mario",
  cognome: "Rossi",
  indirizzo: {
    via: "Via Roma 123",
    città: "Milano",
    cap: "20100"
  },
  contatti: {
    email: "mario.rossi@example.com",
    telefono: "123456789"
  }
};

// Destrutturazione base
const { nome, cognome } = persona;
console.log(nome, cognome); // Output: "Mario Rossi"

// Rinominare le variabili durante la destrutturazione
const { nome: firstName, cognome: lastName } = persona;
console.log(firstName, lastName); // Output: "Mario Rossi"

// Destrutturazione annidata
const { indirizzo: { città, cap }, contatti: { email } } = persona;
console.log(città, cap, email); // Output: "Milano 20100 mario.rossi@example.com"

// Valori predefiniti
const { età = 30 } = persona;
console.log(età); // Output: 30 (valore predefinito poiché non presente nell'oggetto)
```

### Spread Operator con Oggetti

L'operatore spread (`...`) permette di copiare e combinare oggetti in modo conciso:

```javascript
const base = { a: 1, b: 2 };
const esteso = { ...base, c: 3 };
console.log(esteso); // Output: { a: 1, b: 2, c: 3 }

// Sovrascrivere proprietà
const modificato = { ...base, b: 5 };
console.log(modificato); // Output: { a: 1, b: 5 }

// Combinare più oggetti
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };
const combinato = { ...obj1, ...obj2, ...obj3 };
console.log(combinato); // Output: { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

// Attenzione: lo spread operator esegue una copia superficiale
const originale = { a: 1, b: { c: 2 } };
const copia = { ...originale };

copia.a = 3;
copia.b.c = 4;

console.log(originale.a); // Output: 1 (non modificato)
console.log(originale.b.c); // Output: 4 (modificato perché è un riferimento)
```

### Rest Pattern con Oggetti

Il pattern rest permette di raccogliere le proprietà rimanenti di un oggetto:

```javascript
const persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  professione: "Sviluppatore",
  città: "Milano"
};

// Estrarre alcune proprietà e raccogliere il resto
const { nome, cognome, ...altreInfo } = persona;
console.log(nome, cognome); // Output: "Mario Rossi"
console.log(altreInfo); // Output: { età: 30, professione: "Sviluppatore", città: "Milano" }

// Utile per filtrare proprietà
function filtraProprietà({ password, token, ...datiSicuri }) {
  return datiSicuri; // Restituisce l'oggetto senza password e token
}

const utente = {
  nome: "Mario",
  email: "mario@example.com",
  password: "secreta123",
  token: "abc123xyz"
};

console.log(filtraProprietà(utente)); // Output: { nome: "Mario", email: "mario@example.com" }
```

### Clonazione Profonda di Oggetti

Per creare una copia completamente indipendente di un oggetto (clonazione profonda), possiamo utilizzare diverse tecniche:

```javascript
// Metodo 1: Utilizzare JSON (con limitazioni)
const originale = {
  a: 1,
  b: { c: 2 },
  d: [3, 4, { e: 5 }]
};

const cloneJSON = JSON.parse(JSON.stringify(originale));
cloneJSON.b.c = 10;
console.log(originale.b.c); // Output: 2 (non modificato)

// Limitazioni del metodo JSON:
// - Non funziona con funzioni, undefined, simboli, Date (convertite in stringhe), ecc.
// - Può causare errori con riferimenti circolari

// Metodo 2: Funzione di clonazione ricorsiva
function clonaProfonda(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => clonaProfonda(item));
  }
  
  const clone = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = clonaProfonda(obj[key]);
    }
  }
  
  return clone;
}

const originale2 = { a: 1, b: { c: 2, d: [3, 4] } };
const clone = clonaProfonda(originale2);
clone.b.c = 10;
clone.b.d[0] = 30;

console.log(originale2.b.c); // Output: 2 (non modificato)
console.log(originale2.b.d[0]); // Output: 3 (non modificato)
```

## Oggetti Proxy e Reflect

### Proxy

L'oggetto `Proxy` permette di creare un wrapper attorno a un altro oggetto che può intercettare e ridefinire operazioni fondamentali su quell'oggetto:

```javascript
const persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30
};

const personaProxy = new Proxy(persona, {
  // Intercetta l'accesso alle proprietà
  get(target, prop, receiver) {
    console.log(`Accesso alla proprietà: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  
  // Intercetta l'assegnazione di valori
  set(target, prop, value, receiver) {
    console.log(`Impostazione della proprietà ${prop} al valore: ${value}`);
    
    // Validazione personalizzata
    if (prop === 'età' && typeof value !== 'number') {
      throw new TypeError('L\'età deve essere un numero');
    }
    
    return Reflect.set(target, prop, value, receiver);
  },
  
  // Intercetta la verifica dell'esistenza di proprietà
  has(target, prop) {
    console.log(`Verifica dell'esistenza della proprietà: ${prop}`);
    return Reflect.has(target, prop);
  }
});

console.log(personaProxy.nome); // Trigger get trap
personaProxy.età = 31; // Trigger set trap
console.log('nome' in personaProxy); // Trigger has trap

// Tentativo di assegnare un valore non valido
try {
  personaProxy.età = "trenta"; // Genera un errore
} catch (e) {
  console.error(e.message);
}
```

### Reflect

L'oggetto `Reflect` fornisce metodi per operazioni JavaScript intercettabili. Questi metodi sono gli stessi delle trap handler di un Proxy:

```javascript
const obj = { a: 1, b: 2 };

// Operazioni di base
console.log(Reflect.get(obj, 'a')); // Output: 1
Reflect.set(obj, 'b', 3);
console.log(obj.b); // Output: 3

// Verifica dell'esistenza di proprietà
console.log(Reflect.has(obj, 'a')); // Output: true

// Eliminazione di proprietà
console.log(Reflect.deleteProperty(obj, 'b')); // Output: true
console.log(obj); // Output: { a: 1 }

// Ottenere tutte le chiavi
console.log(Reflect.ownKeys(obj)); // Output: ['a']

// Definire nuove proprietà
Reflect.defineProperty(obj, 'c', {
  value: 3,
  writable: true,
  enumerable: true,
  configurable: true
});

console.log(obj.c); // Output: 3
```

## Conclusione

Gli oggetti avanzati in JavaScript offrono potenti strumenti per la gestione dei dati, l'incapsulamento e la creazione di API robuste. Tecniche come la destrutturazione, lo spread operator, i proxy e i simboli permettono di scrivere codice più pulito, manutenibile e sicuro.

Comprendere queste funzionalità avanzate è essenziale per sfruttare appieno le capacità di JavaScript come linguaggio orientato agli oggetti e per sviluppare applicazioni moderne ed efficienti.

[Torna all'indice](../README.md) | [Argomento precedente: Prototipi ed Ereditarietà](./03_Prototipi_Ereditarietà.md) | [Argomento successivo: Pattern di Progettazione](./05_Pattern_Progettazione.md)