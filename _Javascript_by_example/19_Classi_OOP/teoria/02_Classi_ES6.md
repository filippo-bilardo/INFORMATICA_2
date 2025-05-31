# Classi in ES6

## Introduzione alle Classi ES6

Con l'introduzione di ECMAScript 2015 (ES6), JavaScript ha ricevuto una sintassi per le classi che rende più semplice e intuitiva la creazione di oggetti e l'implementazione dell'ereditarietà. È importante sottolineare che questa sintassi è principalmente "zucchero sintattico" sopra il meccanismo di prototipi esistente in JavaScript, ma offre un modo più chiaro e familiare per definire classi e relazioni tra di esse.

## Sintassi di Base delle Classi

```javascript
class Persona {
  // Costruttore: metodo speciale che viene chiamato quando si crea una nuova istanza
  constructor(nome, età) {
    this.nome = nome;
    this.età = età;
  }
  
  // Metodo della classe
  saluta() {
    return `Ciao, mi chiamo ${this.nome} e ho ${this.età} anni.`;
  }
}

// Creazione di un'istanza
const persona1 = new Persona('Mario', 30);
console.log(persona1.saluta()); // Output: Ciao, mi chiamo Mario e ho 30 anni.
```

## Proprietà e Metodi

### Proprietà di Istanza

Le proprietà di istanza sono definite all'interno del costruttore e sono uniche per ogni istanza della classe.

```javascript
class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
    this.dataCreazione = new Date(); // Proprietà aggiuntiva
  }
}

const prodotto1 = new Prodotto('Laptop', 1200);
console.log(prodotto1.nome); // Output: Laptop
console.log(prodotto1.dataCreazione); // Output: Data corrente
```

### Metodi di Istanza

I metodi di istanza sono definiti nel corpo della classe e sono disponibili per tutte le istanze.

```javascript
class Calcolatrice {
  somma(a, b) {
    return a + b;
  }
  
  sottrazione(a, b) {
    return a - b;
  }
  
  moltiplicazione(a, b) {
    return a * b;
  }
  
  divisione(a, b) {
    if (b === 0) throw new Error('Divisione per zero!');
    return a / b;
  }
}

const calc = new Calcolatrice();
console.log(calc.somma(5, 3)); // Output: 8
console.log(calc.divisione(10, 2)); // Output: 5
```

### Metodi Statici

I metodi statici sono chiamati sulla classe stessa, non su un'istanza della classe. Sono spesso utilizzati per funzioni di utilità relative alla classe.

```javascript
class Matematica {
  static PI = 3.14159265359; // Proprietà statica (ES2022)
  
  static quadrato(x) {
    return x * x;
  }
  
  static distanza(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

console.log(Matematica.PI); // Output: 3.14159265359
console.log(Matematica.quadrato(4)); // Output: 16
console.log(Matematica.distanza(0, 0, 3, 4)); // Output: 5
```

### Getter e Setter

I getter e setter permettono di definire metodi di accesso per le proprietà di una classe.

```javascript
class Temperatura {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  // Getter
  get celsius() {
    return this._celsius;
  }
  
  // Setter con validazione
  set celsius(valore) {
    if (valore < -273.15) {
      throw new Error('La temperatura non può essere inferiore allo zero assoluto!');
    }
    this._celsius = valore;
  }
  
  // Getter calcolato
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  // Setter calcolato
  set fahrenheit(valore) {
    this._celsius = (valore - 32) * 5/9;
  }
}

const temp = new Temperatura(25);
console.log(temp.celsius); // Output: 25
console.log(temp.fahrenheit); // Output: 77

temp.fahrenheit = 68;
console.log(temp.celsius); // Output: 20
```

## Proprietà Private

A partire da ES2022, JavaScript supporta ufficialmente le proprietà private utilizzando il prefisso `#`.

```javascript
class ContoBancario {
  #saldo; // Proprietà privata
  #PIN;
  
  constructor(titolare, saldoIniziale, PIN) {
    this.titolare = titolare;
    this.#saldo = saldoIniziale;
    this.#PIN = PIN;
  }
  
  // Metodo pubblico che accede a proprietà private
  getSaldo(pin) {
    if (pin !== this.#PIN) {
      throw new Error('PIN non valido!');
    }
    return this.#saldo;
  }
  
  // Metodo pubblico che modifica proprietà private
  deposita(importo) {
    if (importo <= 0) {
      throw new Error('L\'importo deve essere positivo!');
    }
    this.#saldo += importo;
    return this.#saldo;
  }
  
  preleva(importo, pin) {
    if (pin !== this.#PIN) {
      throw new Error('PIN non valido!');
    }
    if (importo <= 0) {
      throw new Error('L\'importo deve essere positivo!');
    }
    if (importo > this.#saldo) {
      throw new Error('Saldo insufficiente!');
    }
    this.#saldo -= importo;
    return this.#saldo;
  }
}

const conto = new ContoBancario('Mario Rossi', 1000, '1234');
console.log(conto.getSaldo('1234')); // Output: 1000
conto.deposita(500);
console.log(conto.getSaldo('1234')); // Output: 1500
conto.preleva(200, '1234');
console.log(conto.getSaldo('1234')); // Output: 1300

// Questi genererebbero errori:
// console.log(conto.#saldo); // Errore: proprietà privata
// console.log(conto.getSaldo('0000')); // Errore: PIN non valido
```

## Campi di Classe

A partire da ES2022, è possibile dichiarare campi di classe direttamente nel corpo della classe, senza doverli definire nel costruttore.

```javascript
class Prodotto {
  nome; // Campo pubblico
  prezzo; // Campo pubblico
  #codice; // Campo privato
  static contatore = 0; // Campo statico
  
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
    this.#codice = `PROD-${Prodotto.contatore++}`;
  }
  
  get codice() {
    return this.#codice;
  }
}

const prod1 = new Prodotto('Telefono', 800);
const prod2 = new Prodotto('Tablet', 500);

console.log(prod1.nome); // Output: Telefono
console.log(prod1.codice); // Output: PROD-0
console.log(prod2.codice); // Output: PROD-1
console.log(Prodotto.contatore); // Output: 2
```

## Conclusione

La sintassi delle classi in ES6 ha reso la programmazione orientata agli oggetti in JavaScript più accessibile e familiare per gli sviluppatori provenienti da altri linguaggi. Nonostante sia principalmente zucchero sintattico sopra il sistema di prototipi, offre un modo più chiaro e strutturato per organizzare il codice e implementare i principi dell'OOP.

Nel prossimo capitolo, esploreremo l'ereditarietà in JavaScript e come implementarla utilizzando la sintassi delle classi ES6.

---

[Torna all'indice dell'esercitazione](../README.md) | [Precedente: Concetti Fondamentali di OOP](./01_Concetti_Fondamentali.md) | [Prossimo: Ereditarietà e Catena dei Prototipi](./03_Ereditarieta.md)