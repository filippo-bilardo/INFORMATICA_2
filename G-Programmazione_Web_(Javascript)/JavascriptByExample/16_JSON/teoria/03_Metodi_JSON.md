# Metodi JSON in JavaScript

## Panoramica dei metodi JSON

JavaScript fornisce due metodi principali per lavorare con JSON:

1. **`JSON.stringify()`**: Converte un oggetto JavaScript in una stringa JSON
2. **`JSON.parse()`**: Converte una stringa JSON in un oggetto JavaScript

Questi due metodi sono fondamentali per qualsiasi operazione che coinvolga JSON in JavaScript.

## JSON.stringify()

### Sintassi di base

```javascript
JSON.stringify(valore, [replacer], [space])
```

- **valore**: L'oggetto JavaScript da convertire in stringa JSON
- **replacer** (opzionale): Una funzione o un array che controlla quali valori vengono inclusi nella stringa JSON
- **space** (opzionale): Un numero o una stringa che controlla la formattazione della stringa JSON

### Esempi di base

```javascript
// Esempio 1: Oggetto semplice
const persona = {
  nome: "Mario",
  età: 30,
  città: "Roma"
};

const personaJSON = JSON.stringify(persona);
console.log(personaJSON);
// Output: '{"nome":"Mario","età":30,"città":"Roma"}'

// Esempio 2: Array
const colori = ["rosso", "verde", "blu"];
const coloriJSON = JSON.stringify(colori);
console.log(coloriJSON);
// Output: '["rosso","verde","blu"]'
```

### Utilizzo del parametro replacer

Il parametro `replacer` può essere una funzione o un array:

```javascript
// Esempio con replacer come funzione
const dati = {
  nome: "Mario",
  password: "12345",
  età: 30
};

// Esclude la password dalla serializzazione
const datiJSON = JSON.stringify(dati, (chiave, valore) => {
  if (chiave === "password") return undefined;
  return valore;
});

console.log(datiJSON);
// Output: '{"nome":"Mario","età":30}'

// Esempio con replacer come array
const datiJSON2 = JSON.stringify(dati, ["nome", "età"]);
console.log(datiJSON2);
// Output: '{"nome":"Mario","età":30}'
```

### Utilizzo del parametro space

Il parametro `space` controlla la formattazione della stringa JSON:

```javascript
const persona = {
  nome: "Mario",
  indirizzo: {
    via: "Via Roma 123",
    città: "Milano"
  },
  hobby: ["calcio", "lettura", "viaggi"]
};

// Senza space
console.log(JSON.stringify(persona));
// Output compatto: '{"nome":"Mario","indirizzo":{"via":"Via Roma 123","città":"Milano"},"hobby":["calcio","lettura","viaggi"]}'

// Con space come numero (numero di spazi)
console.log(JSON.stringify(persona, null, 2));
/* Output formattato:
{
  "nome": "Mario",
  "indirizzo": {
    "via": "Via Roma 123",
    "città": "Milano"
  },
  "hobby": [
    "calcio",
    "lettura",
    "viaggi"
  ]
}
*/

// Con space come stringa
console.log(JSON.stringify(persona, null, "--"));
/* Output formattato con la stringa specificata:
{
--"nome": "Mario",
--"indirizzo": {
----"via": "Via Roma 123",
----"città": "Milano"
--},
--"hobby": [
----"calcio",
----"lettura",
----"viaggi"
--]
}
*/
```

### Gestione di valori speciali

`JSON.stringify()` gestisce alcuni valori JavaScript in modo particolare:

```javascript
// Valori che diventano null
console.log(JSON.stringify(undefined)); // undefined
console.log(JSON.stringify(function() {})); // undefined
console.log(JSON.stringify(Symbol('sym'))); // undefined

// In un oggetto, le proprietà con questi valori vengono omesse
const obj = {
  a: undefined,
  b: function() {},
  c: Symbol('sym'),
  d: 'valore normale'
};
console.log(JSON.stringify(obj)); // '{"d":"valore normale"}'

// In un array, questi valori diventano null
const arr = [undefined, function() {}, Symbol('sym'), 'valore normale'];
console.log(JSON.stringify(arr)); // '[null,null,null,"valore normale"]'
```

## JSON.parse()

### Sintassi di base

```javascript
JSON.parse(testo, [reviver])
```

- **testo**: La stringa JSON da convertire in un oggetto JavaScript
- **reviver** (opzionale): Una funzione che trasforma i risultati del parsing

### Esempi di base

```javascript
// Esempio 1: Oggetto semplice
const personaJSON = '{"nome":"Mario","età":30,"città":"Roma"}';
const persona = JSON.parse(personaJSON);
console.log(persona.nome); // 'Mario'
console.log(persona.età);  // 30

// Esempio 2: Array
const coloriJSON = '["rosso","verde","blu"]';
const colori = JSON.parse(coloriJSON);
console.log(colori[0]); // 'rosso'
console.log(colori.length); // 3
```

### Utilizzo del parametro reviver

Il parametro `reviver` è una funzione che viene chiamata per ogni coppia chiave/valore nel risultato del parsing:

```javascript
const datiJSON = '{"nome":"Mario","nascita":"1990-05-15","città":"Roma"}';

// Converte la stringa della data in un oggetto Date
const dati = JSON.parse(datiJSON, (chiave, valore) => {
  if (chiave === 'nascita') return new Date(valore);
  return valore;
});

console.log(dati.nascita); // Object Date
console.log(dati.nascita.getFullYear()); // 1990
```

## Casi d'uso comuni

### Memorizzazione di dati nel localStorage

```javascript
// Salvataggio di dati nel localStorage
const utente = {
  nome: "Mario",
  preferenze: {
    tema: "scuro",
    notifiche: true
  },
  ultimoAccesso: new Date()
};

// Converti in JSON e salva
localStorage.setItem('utente', JSON.stringify(utente));

// Recupera e converti da JSON
const utenteRecuperato = JSON.parse(localStorage.getItem('utente'));
console.log(utenteRecuperato);
// Nota: la data è ora una stringa, non un oggetto Date
```

### Comunicazione con API

```javascript
// Invio di dati a un'API
const nuovoUtente = {
  nome: "Mario Rossi",
  email: "mario@example.com",
  ruolo: "utente"
};

fetch('https://api.example.com/utenti', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuovoUtente)
})
.then(response => response.json())
.then(data => console.log(data));

// Ricezione di dati da un'API
fetch('https://api.example.com/utenti/1')
  .then(response => response.json())
  .then(utente => {
    console.log(utente.nome);
    console.log(utente.email);
  });
```

## Limitazioni e considerazioni

### Tipi di dati non supportati

JSON non supporta nativamente alcuni tipi di dati JavaScript:

- **Date**: Vengono convertite in stringhe
- **Funzioni**: Vengono omesse o convertite in null
- **RegExp**: Vengono convertite in oggetti vuoti
- **Map, Set, WeakMap, WeakSet**: Non hanno una rappresentazione JSON diretta
- **Undefined**: Viene omesso negli oggetti o convertito in null negli array
- **Symbol**: Viene omesso negli oggetti o convertito in null negli array

### Gestione di date

Per gestire correttamente le date, è necessario convertirle manualmente:

```javascript
// Salvataggio di date
const evento = {
  titolo: "Riunione",
  data: new Date(),
  dataISO: new Date().toISOString() // Formato ISO per le date
};

const eventoJSON = JSON.stringify(evento);
console.log(eventoJSON);
// La data viene convertita in stringa

// Recupero di date
const eventoRecuperato = JSON.parse(eventoJSON, (chiave, valore) => {
  if (chiave === 'data' || chiave === 'dataISO') return new Date(valore);
  return valore;
});

console.log(eventoRecuperato.data instanceof Date); // true
```

### Gestione di riferimenti circolari

JSON non può gestire riferimenti circolari:

```javascript
const oggetto = {};
oggetto.riferimento = oggetto; // Riferimento circolare

try {
  JSON.stringify(oggetto);
} catch (errore) {
  console.error(errore); // TypeError: Converting circular structure to JSON
}
```

Per gestire riferimenti circolari, è necessario utilizzare una funzione replacer personalizzata o librerie di terze parti.

I metodi `JSON.stringify()` e `JSON.parse()` sono strumenti potenti per lavorare con JSON in JavaScript. Nella prossima sezione, esploreremo come gestire gli errori comuni che possono verificarsi durante l'utilizzo di JSON.