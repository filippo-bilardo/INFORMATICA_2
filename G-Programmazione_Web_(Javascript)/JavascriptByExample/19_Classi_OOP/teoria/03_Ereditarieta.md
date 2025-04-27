# Ereditarietà e Catena dei Prototipi

## Introduzione all'Ereditarietà in JavaScript

L'ereditarietà è uno dei concetti fondamentali della programmazione orientata agli oggetti che permette a una classe (sottoclasse) di ereditare proprietà e metodi da un'altra classe (superclasse). In JavaScript, l'ereditarietà è implementata attraverso il meccanismo dei prototipi, ma con ES6 è stata introdotta una sintassi più chiara e familiare.

## Ereditarietà con le Classi ES6

Con ES6, l'ereditarietà viene implementata utilizzando la parola chiave `extends`.

```javascript
class Animale {
  constructor(nome) {
    this.nome = nome;
  }
  
  verso() {
    return "L'animale fa un verso";
  }
  
  mangia() {
    return `${this.nome} sta mangiando.`;
  }
}

class Cane extends Animale {
  constructor(nome, razza) {
    // Chiamata al costruttore della superclasse
    super(nome);
    this.razza = razza;
  }
  
  // Sovrascrittura del metodo della superclasse
  verso() {
    return "Bau bau!";
  }
  
  // Metodo specifico della sottoclasse
  scodinzola() {
    return `${this.nome} sta scodinzolando.`;
  }
}

const mioCaneFido = new Cane('Fido', 'Labrador');
console.log(mioCaneFido.nome); // Output: Fido
console.log(mioCaneFido.razza); // Output: Labrador
console.log(mioCaneFido.verso()); // Output: Bau bau!
console.log(mioCaneFido.mangia()); // Output: Fido sta mangiando.
console.log(mioCaneFido.scodinzola()); // Output: Fido sta scodinzolando.
```

## La Parola Chiave `super`

La parola chiave `super` viene utilizzata per chiamare funzioni del genitore e accedere alle sue proprietà:

- `super()` chiama il costruttore della superclasse
- `super.metodo()` chiama un metodo della superclasse

```javascript
class Veicolo {
  constructor(marca, anno) {
    this.marca = marca;
    this.anno = anno;
  }
  
  informazioni() {
    return `Veicolo: ${this.marca}, Anno: ${this.anno}`;
  }
}

class Automobile extends Veicolo {
  constructor(marca, anno, modello) {
    super(marca, anno);
    this.modello = modello;
  }
  
  informazioni() {
    // Utilizzo di super per chiamare il metodo della superclasse
    return `${super.informazioni()}, Modello: ${this.modello}`;
  }
}

const miaAuto = new Automobile('Fiat', 2020, '500');
console.log(miaAuto.informazioni());
// Output: Veicolo: Fiat, Anno: 2020, Modello: 500
```

## Catena dei Prototipi

Nonostante la sintassi delle classi ES6, JavaScript continua a utilizzare il meccanismo dei prototipi sotto il cofano. Ogni oggetto in JavaScript ha un prototipo, che è un altro oggetto da cui eredita proprietà e metodi.

```javascript
// Visualizzazione della catena dei prototipi
const mioCaneFido = new Cane('Fido', 'Labrador');

console.log(mioCaneFido.__proto__ === Cane.prototype); // true
console.log(Cane.prototype.__proto__ === Animale.prototype); // true
console.log(Animale.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

## Ereditarietà Multipla e Mixin

JavaScript non supporta nativamente l'ereditarietà multipla (una classe che eredita da più superclassi), ma è possibile simulare questo comportamento utilizzando i mixin.

```javascript
// Definizione di mixin
const nuotatoreMixin = {
  nuota() {
    return `${this.nome} sta nuotando.`;
  },
  immergiti() {
    return `${this.nome} si è immerso.`;
  }
};

const volatoreMixin = {
  vola() {
    return `${this.nome} sta volando.`;
  },
  plana() {
    return `${this.nome} sta planando.`;
  }
};

class Animale {
  constructor(nome) {
    this.nome = nome;
  }
}

class Uccello extends Animale {
  constructor(nome) {
    super(nome);
  }
}

// Applicazione dei mixin
Object.assign(Uccello.prototype, volatoreMixin);

class Anatra extends Animale {
  constructor(nome) {
    super(nome);
  }
}

// Applicazione di più mixin
Object.assign(Anatra.prototype, nuotatoreMixin, volatoreMixin);

const piccione = new Uccello('Piccione');
console.log(piccione.vola()); // Output: Piccione sta volando.

const paperino = new Anatra('Paperino');
console.log(paperino.nuota()); // Output: Paperino sta nuotando.
console.log(paperino.vola()); // Output: Paperino sta volando.
```

## Limitazioni e Best Practices

1. **Evitare gerarchie profonde**: Le gerarchie di ereditarietà troppo profonde possono diventare difficili da gestire e comprendere.

2. **Composizione vs Ereditarietà**: In molti casi, la composizione (includere istanze di altre classi come proprietà) può essere preferibile all'ereditarietà.

3. **Utilizzare `instanceof` con cautela**: L'operatore `instanceof` può essere utile per verificare l'appartenenza a una classe, ma può dare risultati inaspettati in caso di modifiche dinamiche ai prototipi.

```javascript
console.log(mioCaneFido instanceof Cane); // true
console.log(mioCaneFido instanceof Animale); // true
console.log(mioCaneFido instanceof Object); // true
```

## Conclusione

L'ereditarietà in JavaScript, specialmente con la sintassi delle classi ES6, fornisce un potente meccanismo per organizzare e riutilizzare il codice. Tuttavia, è importante comprendere il meccanismo sottostante dei prototipi e considerare alternative come la composizione quando appropriato.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Classi in ES6](./02_Classi_ES6.md)
- [Argomento successivo: Incapsulamento e Modificatori di Accesso](./04_Incapsulamento.md)