# Incapsulamento e Modificatori di Accesso

## Introduzione all'Incapsulamento

L'incapsulamento è uno dei principi fondamentali della programmazione orientata agli oggetti che consiste nel nascondere i dettagli implementativi di un oggetto e nell'esporre solo ciò che è necessario. Questo principio permette di:

- Proteggere i dati da accessi non autorizzati
- Nascondere la complessità interna
- Modificare l'implementazione interna senza influenzare il codice esterno
- Fornire un'interfaccia chiara e coerente

## Incapsulamento in JavaScript Tradizionale

Storicamente, JavaScript non ha avuto modificatori di accesso nativi come `private`, `protected` e `public` presenti in altri linguaggi OOP. Gli sviluppatori hanno utilizzato varie convenzioni e pattern per simulare l'incapsulamento.

### Convenzione con Underscore

Una convenzione comune è quella di prefissare le proprietà "private" con un underscore, indicando che non dovrebbero essere accedute direttamente dall'esterno.

```javascript
function Persona(nome, età) {
  // Proprietà "private" (per convenzione)
  this._nome = nome;
  this._età = età;
  
  // Metodi pubblici
  this.getNome = function() {
    return this._nome;
  };
  
  this.getEtà = function() {
    return this._età;
  };
  
  this.setEtà = function(nuovaEtà) {
    if (nuovaEtà > 0) {
      this._età = nuovaEtà;
    } else {
      throw new Error("L'età deve essere positiva");
    }
  };
}

const persona = new Persona('Mario', 30);
console.log(persona.getNome()); // Output: Mario
persona.setEtà(31);
console.log(persona.getEtà()); // Output: 31

// Nota: Tecnicamente, _nome e _età sono ancora accessibili
console.log(persona._nome); // Output: Mario (non dovrebbe essere accessibile)
```

### Closure per Variabili Private

Un approccio più robusto utilizza le closure per creare vere variabili private.

```javascript
function Persona(nome, età) {
  // Variabili private (realmente inaccessibili dall'esterno)
  const _nome = nome;
  let _età = età;
  
  // Ritorna un oggetto con i metodi pubblici
  return {
    getNome: function() {
      return _nome;
    },
    getEtà: function() {
      return _età;
    },
    setEtà: function(nuovaEtà) {
      if (nuovaEtà > 0) {
        _età = nuovaEtà;
      } else {
        throw new Error("L'età deve essere positiva");
      }
    },
    presentati: function() {
      return `Ciao, mi chiamo ${_nome} e ho ${_età} anni.`;
    }
  };
}

const persona = new Persona('Mario', 30);
console.log(persona.getNome()); // Output: Mario
persona.setEtà(31);
console.log(persona.presentati()); // Output: Ciao, mi chiamo Mario e ho 31 anni.

// Le variabili private sono realmente inaccessibili
console.log(persona._nome); // Output: undefined
```

## Incapsulamento con Classi ES6

Con l'introduzione delle classi in ES6, la sintassi per l'incapsulamento è diventata più chiara, ma i meccanismi sottostanti rimangono simili.

```javascript
class Persona {
  constructor(nome, età) {
    this._nome = nome;
    this._età = età;
  }
  
  // Getter e setter
  get nome() {
    return this._nome;
  }
  
  get età() {
    return this._età;
  }
  
  set età(nuovaEtà) {
    if (nuovaEtà > 0) {
      this._età = nuovaEtà;
    } else {
      throw new Error("L'età deve essere positiva");
    }
  }
  
  // Metodo pubblico
  presentati() {
    return `Ciao, mi chiamo ${this._nome} e ho ${this._età} anni.`;
  }
}

const persona = new Persona('Mario', 30);
console.log(persona.nome); // Output: Mario (usando il getter)
persona.età = 31; // Usando il setter
console.log(persona.presentati()); // Output: Ciao, mi chiamo Mario e ho 31 anni.
```

## Campi Privati (ES2022)

Con ECMAScript 2022, JavaScript ha introdotto ufficialmente i campi privati nelle classi, utilizzando il prefisso `#`. Questi campi sono realmente privati e non possono essere acceduti dall'esterno della classe.

```javascript
class Persona {
  // Campi privati
  #nome;
  #età;
  
  constructor(nome, età) {
    this.#nome = nome;
    this.#età = età;
  }
  
  // Getter e setter
  get nome() {
    return this.#nome;
  }
  
  get età() {
    return this.#età;
  }
  
  set età(nuovaEtà) {
    if (nuovaEtà > 0) {
      this.#età = nuovaEtà;
    } else {
      throw new Error("L'età deve essere positiva");
    }
  }
  
  // Metodo pubblico
  presentati() {
    return `Ciao, mi chiamo ${this.#nome} e ho ${this.#età} anni.`;
  }
}

const persona = new Persona('Mario', 30);
console.log(persona.nome); // Output: Mario
persona.età = 31;
console.log(persona.presentati()); // Output: Ciao, mi chiamo Mario e ho 31 anni.

// Tentativo di accesso a un campo privato
try {
  console.log(persona.#nome); // SyntaxError: Private field '#nome' must be declared in an enclosing class
} catch (error) {
  console.log('Errore: campo privato non accessibile');
}
```

## Metodi Privati

Oltre ai campi privati, ES2022 supporta anche i metodi privati, che seguono la stessa sintassi con il prefisso `#`.

```javascript
class Calcolatrice {
  // Metodo privato
  #validaNumeri(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('I valori devono essere numeri');
    }
  }
  
  // Metodi pubblici che utilizzano il metodo privato
  somma(a, b) {
    this.#validaNumeri(a, b);
    return a + b;
  }
  
  sottrazione(a, b) {
    this.#validaNumeri(a, b);
    return a - b;
  }
  
  moltiplicazione(a, b) {
    this.#validaNumeri(a, b);
    return a * b;
  }
  
  divisione(a, b) {
    this.#validaNumeri(a, b);
    if (b === 0) {
      throw new Error('Divisione per zero!');
    }
    return a / b;
  }
}

const calc = new Calcolatrice();
console.log(calc.somma(5, 3)); // Output: 8

// Tentativo di chiamare un metodo privato
try {
  calc.#validaNumeri(5, 3); // SyntaxError: Private field '#validaNumeri' must be declared in an enclosing class
} catch (error) {
  console.log('Errore: metodo privato non accessibile');
}
```

## Proprietà Statiche Private

Anche le proprietà statiche possono essere private utilizzando il prefisso `#`.

```javascript
class Contatore {
  // Proprietà statica privata
  static #conteggio = 0;
  
  constructor() {
    Contatore.#incrementa();
  }
  
  // Metodo statico privato
  static #incrementa() {
    this.#conteggio++;
  }
  
  // Metodo statico pubblico
  static getConteggio() {
    return Contatore.#conteggio;
  }
}

const obj1 = new Contatore();
const obj2 = new Contatore();
const obj3 = new Contatore();

console.log(Contatore.getConteggio()); // Output: 3
```

## Conclusione

L'incapsulamento è un principio fondamentale dell'OOP che JavaScript ha supportato in vari modi nel corso della sua evoluzione. Con l'introduzione dei campi e metodi privati in ES2022, JavaScript offre ora un supporto nativo per un vero incapsulamento, rendendo il codice più robusto e manutenibile.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Ereditarietà e Catena dei Prototipi](./03_Ereditarieta.md)
- [Argomento successivo: Polimorfismo in JavaScript](./05_Polimorfismo.md)