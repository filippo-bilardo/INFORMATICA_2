# Prototipi ed Ereditarietà in JavaScript

Una delle caratteristiche più potenti e uniche di JavaScript è il suo sistema di ereditarietà basato sui prototipi. A differenza dei linguaggi di programmazione orientati agli oggetti tradizionali che utilizzano le classi, JavaScript utilizza i prototipi per implementare l'ereditarietà.

## Il Sistema dei Prototipi

### Cos'è un Prototipo?

In JavaScript, ogni oggetto ha un collegamento interno a un altro oggetto chiamato "prototipo". Quando si tenta di accedere a una proprietà di un oggetto che non esiste direttamente sull'oggetto stesso, JavaScript cerca automaticamente nel suo prototipo, poi nel prototipo del prototipo, e così via lungo la "catena dei prototipi" fino a trovare la proprietà o raggiungere la fine della catena (null).

```javascript
// Creazione di un oggetto
let animale = {
  tipo: "Generico",
  verso: function() {
    return "Verso generico";
  },
  mangia: function() {
    return "L'animale sta mangiando";
  }
};

// Creazione di un oggetto che eredita da animale
let cane = Object.create(animale);
cane.tipo = "Cane";
cane.verso = function() {
  return "Bau bau";
};

console.log(cane.tipo); // Output: "Cane"
console.log(cane.verso()); // Output: "Bau bau"
console.log(cane.mangia()); // Output: "L'animale sta mangiando" (ereditato da animale)
```

### La Proprietà `__proto__` e Object.getPrototypeOf()

Ogni oggetto in JavaScript ha una proprietà speciale `__proto__` che punta al suo prototipo. Tuttavia, è consigliabile utilizzare i metodi `Object.getPrototypeOf()` e `Object.setPrototypeOf()` per accedere e modificare il prototipo di un oggetto.

```javascript
console.log(Object.getPrototypeOf(cane) === animale); // Output: true

// Non consigliato, ma funziona
console.log(cane.__proto__ === animale); // Output: true
```

### La Proprietà `prototype` delle Funzioni

Le funzioni in JavaScript sono oggetti speciali che hanno una proprietà chiamata `prototype`. Questa proprietà diventa il prototipo degli oggetti creati utilizzando la funzione come costruttore con l'operatore `new`.

```javascript
function Animale(tipo) {
  this.tipo = tipo;
}

Animale.prototype.verso = function() {
  return "Verso generico";
};

Animale.prototype.mangia = function() {
  return "L'animale sta mangiando";
};

function Cane(nome) {
  Animale.call(this, "Cane"); // Chiamata al costruttore padre
  this.nome = nome;
}

// Impostazione dell'ereditarietà
Cane.prototype = Object.create(Animale.prototype);
Cane.prototype.constructor = Cane; // Ripristino del costruttore

// Aggiunta di metodi specifici
Cane.prototype.verso = function() {
  return "Bau bau";
};

Cane.prototype.scodinzola = function() {
  return `${this.nome} sta scodinzolando`;
};

let fido = new Cane("Fido");
console.log(fido.tipo); // Output: "Cane"
console.log(fido.nome); // Output: "Fido"
console.log(fido.verso()); // Output: "Bau bau"
console.log(fido.mangia()); // Output: "L'animale sta mangiando"
console.log(fido.scodinzola()); // Output: "Fido sta scodinzolando"
```

## Ereditarietà in JavaScript

### Ereditarietà Prototipale Classica

L'ereditarietà prototipale classica in JavaScript si basa sulla catena dei prototipi e sull'uso di `Object.create()`:

```javascript
// Oggetto base
let Veicolo = {
  init: function(tipo) {
    this.tipo = tipo;
    return this;
  },
  descrizione: function() {
    return `Questo è un ${this.tipo}`;
  }
};

// Oggetto che eredita da Veicolo
let Auto = Object.create(Veicolo);
Auto.init = function(marca, modello) {
  Veicolo.init.call(this, "Auto");
  this.marca = marca;
  this.modello = modello;
  return this;
};
Auto.descrizioneCompleta = function() {
  return `${this.descrizione()}, marca ${this.marca}, modello ${this.modello}`;
};

// Creazione di un'istanza
let miaAuto = Object.create(Auto).init("Fiat", "Panda");
console.log(miaAuto.descrizioneCompleta()); // Output: "Questo è un Auto, marca Fiat, modello Panda"
```

### Ereditarietà con Funzioni Costruttore

Prima dell'introduzione delle classi in ES6, l'ereditarietà in JavaScript veniva comunemente implementata utilizzando funzioni costruttore e manipolando i loro prototipi:

```javascript
// Costruttore base
function Persona(nome, cognome) {
  this.nome = nome;
  this.cognome = cognome;
}

Persona.prototype.nomeCompleto = function() {
  return `${this.nome} ${this.cognome}`;
};

Persona.prototype.saluta = function() {
  return `Ciao, sono ${this.nomeCompleto()}`;
};

// Costruttore derivato
function Studente(nome, cognome, corso) {
  Persona.call(this, nome, cognome); // Chiamata al costruttore padre
  this.corso = corso;
}

// Impostazione dell'ereditarietà
Studente.prototype = Object.create(Persona.prototype);
Studente.prototype.constructor = Studente; // Ripristino del costruttore

// Aggiunta di metodi specifici
Studente.prototype.studia = function() {
  return `${this.nome} sta studiando ${this.corso}`;
};

// Override di un metodo ereditato
Studente.prototype.saluta = function() {
  return `${Persona.prototype.saluta.call(this)}. Studio ${this.corso}`;
};

let mario = new Studente("Mario", "Rossi", "Informatica");
console.log(mario.nomeCompleto()); // Output: "Mario Rossi"
console.log(mario.saluta()); // Output: "Ciao, sono Mario Rossi. Studio Informatica"
console.log(mario.studia()); // Output: "Mario sta studiando Informatica"
```

### Ereditarietà con Classi (ES6+)

Con l'introduzione delle classi in ES6, l'implementazione dell'ereditarietà in JavaScript è diventata più intuitiva e simile ad altri linguaggi orientati agli oggetti:

```javascript
// Classe base
class Persona {
  constructor(nome, cognome) {
    this.nome = nome;
    this.cognome = cognome;
  }
  
  nomeCompleto() {
    return `${this.nome} ${this.cognome}`;
  }
  
  saluta() {
    return `Ciao, sono ${this.nomeCompleto()}`;
  }
}

// Classe derivata
class Studente extends Persona {
  constructor(nome, cognome, corso) {
    super(nome, cognome); // Chiamata al costruttore padre
    this.corso = corso;
  }
  
  studia() {
    return `${this.nome} sta studiando ${this.corso}`;
  }
  
  // Override di un metodo ereditato
  saluta() {
    return `${super.saluta()}. Studio ${this.corso}`;
  }
}

let luigi = new Studente("Luigi", "Verdi", "Matematica");
console.log(luigi.nomeCompleto()); // Output: "Luigi Verdi"
console.log(luigi.saluta()); // Output: "Ciao, sono Luigi Verdi. Studio Matematica"
console.log(luigi.studia()); // Output: "Luigi sta studiando Matematica"
```

## Vantaggi e Svantaggi dell'Ereditarietà Prototipale

### Vantaggi

1. **Flessibilità**: Il sistema di prototipi di JavaScript è molto flessibile e permette di modificare il comportamento degli oggetti anche dopo la loro creazione.
2. **Condivisione di Memoria**: Le proprietà e i metodi definiti nel prototipo sono condivisi tra tutte le istanze, risparmiando memoria.
3. **Ereditarietà Dinamica**: È possibile modificare la catena dei prototipi in fase di esecuzione.

### Svantaggi

1. **Complessità**: Il sistema di prototipi può essere difficile da comprendere per chi è abituato all'ereditarietà basata su classi.
2. **Performance**: L'accesso alle proprietà attraverso la catena dei prototipi può essere meno efficiente rispetto all'accesso diretto.
3. **Debugging**: Può essere più difficile tracciare l'origine di una proprietà o di un metodo quando si utilizza l'ereditarietà prototipale.

## Best Practices

1. **Utilizzare le Classi per Codice Più Leggibile**: Per progetti nuovi, utilizzare la sintassi delle classi ES6 per una maggiore leggibilità e manutenibilità.
2. **Evitare Catene di Prototipi Troppo Lunghe**: Catene di prototipi troppo lunghe possono influire negativamente sulle prestazioni.
3. **Preferire la Composizione all'Ereditarietà**: In molti casi, la composizione (includere oggetti come proprietà di altri oggetti) può essere più flessibile e manutenibile dell'ereditarietà.
4. **Utilizzare i Metodi Standard**: Preferire `Object.create()`, `Object.getPrototypeOf()` e `Object.setPrototypeOf()` invece di manipolare direttamente `__proto__`.

## Conclusione

L'ereditarietà basata sui prototipi è una caratteristica fondamentale di JavaScript che offre grande flessibilità e potenza. Comprendere come funziona il sistema dei prototipi è essenziale per sfruttare appieno le capacità di JavaScript come linguaggio orientato agli oggetti.

Con l'introduzione delle classi in ES6, JavaScript ha reso più accessibile e intuitiva l'implementazione dell'ereditarietà, pur mantenendo sotto il cofano il potente sistema dei prototipi.

[Torna all'indice](../README.md) | [Argomento precedente: Proprietà e Metodi](./02_Proprietà_Metodi.md) | [Argomento successivo: Oggetti Avanzati](./04_Oggetti_Avanzati.md)