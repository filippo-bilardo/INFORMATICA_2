# Proprietà e Metodi degli Oggetti in JavaScript

In questa guida, approfondiremo le proprietà e i metodi degli oggetti in JavaScript, esplorando le loro caratteristiche, come manipolarli e le tecniche avanzate per lavorare con essi.

## Proprietà degli Oggetti

Le proprietà sono le coppie chiave-valore che compongono un oggetto. Ogni proprietà ha un nome (o chiave) e un valore associato.

### Tipi di Proprietà

#### Proprietà di Dati

Le proprietà di dati contengono un valore e hanno i seguenti attributi:
- **value**: il valore della proprietà
- **writable**: indica se il valore può essere modificato
- **enumerable**: indica se la proprietà appare durante l'enumerazione delle proprietà
- **configurable**: indica se la proprietà può essere eliminata o i suoi attributi modificati

```javascript
let persona = {
  nome: "Mario", // Proprietà di dati standard
  cognome: "Rossi"
};
```

#### Proprietà di Accesso (Getter e Setter)

Le proprietà di accesso non contengono un valore ma definiscono funzioni che vengono chiamate quando si accede alla proprietà (getter) o quando si assegna un valore (setter):

```javascript
let persona = {
  nome: "Mario",
  cognome: "Rossi",
  
  // Getter
  get nomeCompleto() {
    return `${this.nome} ${this.cognome}`;
  },
  
  // Setter
  set nomeCompleto(valore) {
    let parti = valore.split(" ");
    this.nome = parti[0];
    this.cognome = parti[1];
  }
};

console.log(persona.nomeCompleto); // Output: "Mario Rossi"
persona.nomeCompleto = "Luigi Verdi";
console.log(persona.nome); // Output: "Luigi"
console.log(persona.cognome); // Output: "Verdi"
```

### Definizione di Proprietà

#### Object.defineProperty()

Il metodo `Object.defineProperty()` permette di definire una nuova proprietà o modificare una esistente con un controllo preciso sui suoi attributi:

```javascript
let persona = {};

// Definizione di una proprietà di dati
Object.defineProperty(persona, "nome", {
  value: "Mario",
  writable: true,
  enumerable: true,
  configurable: true
});

// Definizione di una proprietà di accesso
Object.defineProperty(persona, "età", {
  get: function() {
    return this._età;
  },
  set: function(valore) {
    if (valore < 0) {
      throw new Error("L'età non può essere negativa");
    }
    this._età = valore;
  },
  enumerable: true,
  configurable: true
});

persona.età = 30;
console.log(persona.età); // Output: 30

// Tentativo di assegnare un valore non valido
// persona.età = -5; // Genera un errore
```

#### Object.defineProperties()

Il metodo `Object.defineProperties()` permette di definire più proprietà contemporaneamente:

```javascript
let prodotto = {};

Object.defineProperties(prodotto, {
  nome: {
    value: "Laptop",
    writable: true,
    enumerable: true,
    configurable: true
  },
  prezzo: {
    value: 1200,
    writable: true,
    enumerable: true,
    configurable: true
  },
  scontato: {
    get: function() {
      return this.prezzo * 0.9;
    },
    enumerable: true,
    configurable: true
  }
});

console.log(prodotto.nome); // Output: "Laptop"
console.log(prodotto.prezzo); // Output: 1200
console.log(prodotto.scontato); // Output: 1080
```

### Attributi delle Proprietà

È possibile ottenere gli attributi di una proprietà utilizzando `Object.getOwnPropertyDescriptor()`:

```javascript
let persona = { nome: "Mario" };

let descrittore = Object.getOwnPropertyDescriptor(persona, "nome");
console.log(descrittore);
/* Output:
{
  value: "Mario",
  writable: true,
  enumerable: true,
  configurable: true
}
*/

// Per ottenere i descrittori di tutte le proprietà
let descrittori = Object.getOwnPropertyDescriptors(persona);
console.log(descrittori);
```

### Proprietà Simbolo

A partire da ES6, è possibile utilizzare simboli come chiavi delle proprietà, creando proprietà che non vengono enumerate nei cicli standard:

```javascript
let id = Symbol("id");
let persona = {
  nome: "Mario",
  [id]: 12345 // Proprietà simbolo
};

console.log(persona[id]); // Output: 12345

// Le proprietà simbolo non appaiono nei cicli for...in
for (let chiave in persona) {
  console.log(chiave); // Output: solo "nome"
}

// Né in Object.keys()
console.log(Object.keys(persona)); // Output: ["nome"]

// Per ottenere i simboli di un oggetto
console.log(Object.getOwnPropertySymbols(persona)); // Output: [Symbol(id)]
```

## Metodi degli Oggetti

I metodi sono funzioni che appartengono a un oggetto. In JavaScript, i metodi sono semplicemente proprietà che contengono funzioni.

### Definizione di Metodi

```javascript
// Sintassi tradizionale
let calcolatrice = {
  a: 0,
  b: 0,
  somma: function() {
    return this.a + this.b;
  },
  moltiplica: function() {
    return this.a * this.b;
  }
};

// Sintassi abbreviata (ES6+)
let calcolatrice2 = {
  a: 0,
  b: 0,
  somma() {
    return this.a + this.b;
  },
  moltiplica() {
    return this.a * this.b;
  }
};

calcolatrice.a = 5;
calcolatrice.b = 3;
console.log(calcolatrice.somma()); // Output: 8
```

### Il Valore `this` nei Metodi

Nei metodi degli oggetti, `this` si riferisce all'oggetto che sta chiamando il metodo:

```javascript
let persona = {
  nome: "Mario",
  saluta() {
    return `Ciao, sono ${this.nome}`;
  }
};

console.log(persona.saluta()); // Output: "Ciao, sono Mario"

// Attenzione: il valore di `this` può cambiare in base al contesto di chiamata
let saluto = persona.saluta; // Assegnazione della funzione a una variabile
console.log(saluto()); // Output: "Ciao, sono undefined" (this non è più persona)

// Soluzione: utilizzare bind(), call() o arrow function
let salutoLegato = persona.saluta.bind(persona);
console.log(salutoLegato()); // Output: "Ciao, sono Mario"
```

### Metodi di Oggetto Predefiniti

Ogni oggetto in JavaScript eredita alcuni metodi dal prototipo `Object.prototype`:

```javascript
let persona = { nome: "Mario" };

// toString() converte l'oggetto in una stringa
console.log(persona.toString()); // Output: "[object Object]"

// hasOwnProperty() verifica se l'oggetto ha una proprietà propria
console.log(persona.hasOwnProperty("nome")); // Output: true

// valueOf() restituisce il valore primitivo dell'oggetto
console.log(persona.valueOf()); // Output: { nome: "Mario" }
```

### Metodi Statici di Object

La classe `Object` fornisce diversi metodi statici utili per lavorare con gli oggetti:

```javascript
// Object.keys() restituisce un array con le chiavi enumerabili
let persona = { nome: "Mario", età: 30 };
console.log(Object.keys(persona)); // Output: ["nome", "età"]

// Object.values() restituisce un array con i valori
console.log(Object.values(persona)); // Output: ["Mario", 30]

// Object.entries() restituisce un array di coppie [chiave, valore]
console.log(Object.entries(persona)); // Output: [["nome", "Mario"], ["età", 30]]

// Object.assign() copia proprietà da un oggetto a un altro
let target = { a: 1, b: 2 };
let source = { b: 3, c: 4 };
let risultato = Object.assign(target, source);
console.log(risultato); // Output: { a: 1, b: 3, c: 4 }
console.log(target); // Output: { a: 1, b: 3, c: 4 } (target è modificato)

// Object.fromEntries() crea un oggetto da un array di coppie [chiave, valore]
let entries = [["nome", "Mario"], ["età", 30]];
let obj = Object.fromEntries(entries);
console.log(obj); // Output: { nome: "Mario", età: 30 }
```

## Tecniche Avanzate

### Proprietà Calcolate

È possibile utilizzare espressioni all'interno delle parentesi quadre per definire nomi di proprietà dinamici:

```javascript
let prefisso = "app";
let contatore = 0;

let config = {
  [prefisso + "_" + ++contatore]: "valore1",
  [prefisso + "_" + ++contatore]: "valore2",
  [prefisso + "_" + ++contatore]: "valore3"
};

console.log(config); // Output: { app_1: "valore1", app_2: "valore2", app_3: "valore3" }
```

### Destrutturazione degli Oggetti

La destrutturazione permette di estrarre proprietà da un oggetto in modo conciso:

```javascript
let persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  indirizzo: {
    via: "Via Roma",
    città: "Milano"
  }
};

// Destrutturazione di base
let { nome, cognome } = persona;
console.log(nome, cognome); // Output: "Mario" "Rossi"

// Assegnazione a variabili con nomi diversi
let { nome: firstName, cognome: lastName } = persona;
console.log(firstName, lastName); // Output: "Mario" "Rossi"

// Valori predefiniti
let { nome, professione = "Sviluppatore" } = persona;
console.log(professione); // Output: "Sviluppatore"

// Destrutturazione nidificata
let { indirizzo: { città } } = persona;
console.log(città); // Output: "Milano"

// Rest operator nella destrutturazione
let { nome, ...resto } = persona;
console.log(resto); // Output: { cognome: "Rossi", età: 30, indirizzo: {...} }
```

### Spread Operator con Oggetti

Lo spread operator (`...`) permette di copiare proprietà da un oggetto a un altro:

```javascript
let persona = { nome: "Mario", cognome: "Rossi" };
let dettagli = { età: 30, professione: "Sviluppatore" };

// Combinare oggetti
let personaCompleta = { ...persona, ...dettagli };
console.log(personaCompleta);
// Output: { nome: "Mario", cognome: "Rossi", età: 30, professione: "Sviluppatore" }

// Sovrascrivere proprietà
let personaModificata = { ...persona, nome: "Luigi" };
console.log(personaModificata); // Output: { nome: "Luigi", cognome: "Rossi" }

// Creare una copia superficiale
let copia = { ...persona };
persona.nome = "Giovanni";
console.log(copia.nome); // Output: "Mario" (non modificato)
```

### Metodi Object.preventExtensions(), Object.seal() e Object.freeze()

JavaScript offre diversi metodi per limitare le modifiche agli oggetti:

```javascript
// Object.preventExtensions() impedisce l'aggiunta di nuove proprietà
let obj1 = { a: 1 };
Object.preventExtensions(obj1);
obj1.a = 2; // Consentito (modifica di proprietà esistenti)
// obj1.b = 2; // Non consentito (aggiunta di nuove proprietà)
console.log(Object.isExtensible(obj1)); // Output: false

// Object.seal() impedisce l'aggiunta e l'eliminazione di proprietà
let obj2 = { a: 1 };
Object.seal(obj2);
obj2.a = 2; // Consentito (modifica di proprietà esistenti)
// obj2.b = 2; // Non consentito (aggiunta di nuove proprietà)
// delete obj2.a; // Non consentito (eliminazione di proprietà)
console.log(Object.isSealed(obj2)); // Output: true

// Object.freeze() rende l'oggetto completamente immutabile
let obj3 = { a: 1 };
Object.freeze(obj3);
// obj3.a = 2; // Non consentito (modifica di proprietà esistenti)
// obj3.b = 2; // Non consentito (aggiunta di nuove proprietà)
// delete obj3.a; // Non consentito (eliminazione di proprietà)
console.log(Object.isFrozen(obj3)); // Output: true
```

## Conclusione

Le proprietà e i metodi degli oggetti sono fondamentali in JavaScript e offrono una grande flessibilità nella gestione dei dati e del comportamento. Padroneggiare queste tecniche è essenziale per scrivere codice JavaScript efficace e manutenibile.

[Torna all'indice](../README.md) | [Precedente: Introduzione agli Oggetti](./01_Introduzione_Oggetti.md) | [Successivo: Prototipi ed Ereditarietà](./03_Prototipi_Ereditarietà.md)