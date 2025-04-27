# Classes

## Introduzione

Le classi in JavaScript, introdotte con ES6, forniscono una sintassi più chiara e semplice per creare oggetti e gestire l'ereditarietà. Sono essenzialmente "zucchero sintattico" sopra il meccanismo di ereditarietà prototipale esistente in JavaScript, ma offrono un modo più familiare e intuitivo per definire costruttori e relazioni tra oggetti, specialmente per gli sviluppatori provenienti da linguaggi orientati agli oggetti come Java o C#.

## Sintassi di base

### Dichiarazione di una classe

```javascript
class Persona {
  constructor(nome, età) {
    this.nome = nome;
    this.età = età;
  }
  
  saluta() {
    return `Ciao, mi chiamo ${this.nome} e ho ${this.età} anni.`;
  }
}

const mario = new Persona('Mario', 30);
console.log(mario.saluta()); // "Ciao, mi chiamo Mario e ho 30 anni."
```

### Componenti principali di una classe

1. **Constructor**: Il metodo speciale `constructor` viene chiamato automaticamente quando si crea una nuova istanza della classe con l'operatore `new`. È utilizzato per inizializzare le proprietà dell'oggetto.

2. **Metodi**: Le funzioni definite all'interno di una classe diventano metodi del prototipo della classe e sono condivise tra tutte le istanze.

3. **Istanze**: Gli oggetti creati dalla classe utilizzando l'operatore `new`.

## Caratteristiche avanzate

### 1. Metodi statici

I metodi statici sono metodi che appartengono alla classe stessa, non alle istanze della classe. Vengono definiti utilizzando la parola chiave `static`:

```javascript
class Matematica {
  static somma(a, b) {
    return a + b;
  }
  
  static PI = 3.14159265359; // Proprietà statica (ES2022)
}

console.log(Matematica.somma(5, 3)); // 8
console.log(Matematica.PI); // 3.14159265359

// Non è possibile chiamare un metodo statico su un'istanza
const math = new Matematica();
// math.somma(1, 2); // TypeError: math.somma is not a function
```

### 2. Proprietà e metodi privati

A partire da ES2022, JavaScript supporta ufficialmente proprietà e metodi privati utilizzando il prefisso `#`:

```javascript
class ContoCorrente {
  #saldo; // Proprietà privata
  #pin; // Proprietà privata
  
  constructor(titolare, saldoIniziale, pin) {
    this.titolare = titolare; // Proprietà pubblica
    this.#saldo = saldoIniziale;
    this.#pin = pin;
  }
  
  #verificaPin(pin) { // Metodo privato
    return pin === this.#pin;
  }
  
  getSaldo(pin) {
    if (this.#verificaPin(pin)) {
      return this.#saldo;
    }
    return "PIN non valido";
  }
  
  preleva(importo, pin) {
    if (!this.#verificaPin(pin)) {
      return "PIN non valido";
    }
    
    if (importo > this.#saldo) {
      return "Saldo insufficiente";
    }
    
    this.#saldo -= importo;
    return `Prelievo di €${importo} effettuato. Nuovo saldo: €${this.#saldo}`;
  }
}

const conto = new ContoCorrente('Mario Rossi', 1000, 1234);
console.log(conto.getSaldo(1234)); // 1000
console.log(conto.preleva(500, 1234)); // "Prelievo di €500 effettuato. Nuovo saldo: €500"

// Tentativi di accesso a membri privati generano errori
// console.log(conto.#saldo); // SyntaxError
// console.log(conto.#verificaPin(1234)); // SyntaxError
```

### 3. Getter e Setter

I getter e setter permettono di definire metodi di accesso per le proprietà di una classe:

```javascript
class Rettangolo {
  constructor(larghezza, altezza) {
    this._larghezza = larghezza;
    this._altezza = altezza;
  }
  
  // Getter
  get area() {
    return this._larghezza * this._altezza;
  }
  
  get larghezza() {
    return this._larghezza;
  }
  
  get altezza() {
    return this._altezza;
  }
  
  // Setter
  set larghezza(valore) {
    if (valore <= 0) {
      throw new Error('La larghezza deve essere positiva');
    }
    this._larghezza = valore;
  }
  
  set altezza(valore) {
    if (valore <= 0) {
      throw new Error('L\'altezza deve essere positiva');
    }
    this._altezza = valore;
  }
}

const rettangolo = new Rettangolo(5, 10);
console.log(rettangolo.area); // 50

rettangolo.larghezza = 8;
console.log(rettangolo.area); // 80

// rettangolo.altezza = -5; // Error: L'altezza deve essere positiva
```

## Ereditarietà

Le classi in JavaScript supportano l'ereditarietà singola attraverso la parola chiave `extends`:

```javascript
class Persona {
  constructor(nome, età) {
    this.nome = nome;
    this.età = età;
  }
  
  saluta() {
    return `Ciao, mi chiamo ${this.nome} e ho ${this.età} anni.`;
  }
}

class Studente extends Persona {
  constructor(nome, età, corso) {
    super(nome, età); // Chiama il costruttore della classe genitore
    this.corso = corso;
  }
  
  saluta() {
    return `${super.saluta()} Studio ${this.corso}.`;
  }
  
  studia() {
    return `${this.nome} sta studiando ${this.corso}.`;
  }
}

const studente = new Studente('Luigi', 20, 'Informatica');
console.log(studente.saluta()); // "Ciao, mi chiamo Luigi e ho 20 anni. Studio Informatica."
console.log(studente.studia()); // "Luigi sta studiando Informatica."
```

### Utilizzo di `super`

La parola chiave `super` ha due utilizzi principali:

1. **Chiamare il costruttore della classe genitore**: `super(arg1, arg2, ...)` all'interno del costruttore della classe figlia.
2. **Chiamare metodi della classe genitore**: `super.metodo(arg1, arg2, ...)` per accedere ai metodi della classe genitore.

```javascript
class Forma {
  constructor(colore) {
    this.colore = colore;
  }
  
  descrivi() {
    return `Una forma di colore ${this.colore}`;
  }
}

class Cerchio extends Forma {
  constructor(colore, raggio) {
    super(colore); // Chiama il costruttore di Forma
    this.raggio = raggio;
  }
  
  area() {
    return Math.PI * this.raggio * this.raggio;
  }
  
  descrivi() {
    return `${super.descrivi()} con raggio ${this.raggio}`; // Chiama il metodo descrivi di Forma
  }
}

const cerchio = new Cerchio('rosso', 5);
console.log(cerchio.descrivi()); // "Una forma di colore rosso con raggio 5"
console.log(cerchio.area()); // 78.53981633974483
```

## Classi vs Funzioni Costruttore

Prima di ES6, gli oggetti in JavaScript venivano creati utilizzando funzioni costruttore e prototipi:

```javascript
// Approccio pre-ES6
function Persona(nome, età) {
  this.nome = nome;
  this.età = età;
}

Persona.prototype.saluta = function() {
  return 'Ciao, mi chiamo ' + this.nome + ' e ho ' + this.età + ' anni.';
};

var mario = new Persona('Mario', 30);
console.log(mario.saluta()); // "Ciao, mi chiamo Mario e ho 30 anni."
```

Le classi ES6 offrono diversi vantaggi rispetto all'approccio tradizionale:

1. **Sintassi più chiara e concisa**: La sintassi delle classi è più intuitiva e meno soggetta a errori.
2. **Ereditarietà più semplice**: L'ereditarietà è gestita in modo più diretto con `extends` e `super`.
3. **Metodi statici nativi**: Supporto nativo per metodi di classe.
4. **Controlli più rigorosi**: Le classi devono essere chiamate con `new`, altrimenti generano un errore.

## Differenze importanti tra classi e funzioni costruttore

1. **Hoisting**: Le dichiarazioni di classe non sono soggette a hoisting, a differenza delle funzioni costruttore.

```javascript
// Funziona
var p = new PersonaFunzione();
function PersonaFunzione() {}

// Non funziona, genera un ReferenceError
// var p = new PersonaClasse(); // ReferenceError
// class PersonaClasse {}
```

2. **Modalità stretta**: Il corpo di una classe è sempre eseguito in modalità stretta (`"use strict"`), anche se non dichiarato esplicitamente.

3. **Metodi non enumerabili**: I metodi definiti in una classe non sono enumerabili per impostazione predefinita.

## Casi d'uso comuni

### 1. Modelli di dati

```javascript
class Prodotto {
  constructor(nome, prezzo, categoria) {
    this.nome = nome;
    this.prezzo = prezzo;
    this.categoria = categoria;
  }
  
  applicaSconto(percentuale) {
    return this.prezzo * (1 - percentuale / 100);
  }
  
  static confrontaPrezzo(prodotto1, prodotto2) {
    return prodotto1.prezzo - prodotto2.prezzo;
  }
}

const prodotti = [
  new Prodotto('Laptop', 1200, 'Elettronica'),
  new Prodotto('Smartphone', 800, 'Elettronica'),
  new Prodotto('Libro', 20, 'Libri')
];

// Ordinamento per prezzo
prodotti.sort(Prodotto.confrontaPrezzo);
```

### 2. Componenti UI

```javascript
class Componente {
  constructor(id) {
    this.elemento = document.getElementById(id);
  }
  
  nascondi() {
    this.elemento.style.display = 'none';
  }
  
  mostra() {
    this.elemento.style.display = 'block';
  }
}

class Pulsante extends Componente {
  constructor(id, testo, onClick) {
    super(id);
    this.elemento.textContent = testo;
    this.elemento.addEventListener('click', onClick);
  }
  
  disabilita() {
    this.elemento.disabled = true;
  }
  
  abilita() {
    this.elemento.disabled = false;
  }
}

const btnInvia = new Pulsante('btnInvia', 'Invia', () => {
  console.log('Pulsante cliccato');
});
```

### 3. Gestione dello stato

```javascript
class StatoApplicazione {
  #stato;
  #osservatori = [];
  
  constructor(statoIniziale) {
    this.#stato = statoIniziale;
  }
  
  aggiungiOsservatore(callback) {
    this.#osservatori.push(callback);
  }
  
  get stato() {
    return { ...this.#stato }; // Restituisce una copia per evitare modifiche dirette
  }
  
  aggiorna(nuovoStato) {
    this.#stato = { ...this.#stato, ...nuovoStato };
    this.#notificaOsservatori();
  }
  
  #notificaOsservatori() {
    for (const callback of this.#osservatori) {
      callback(this.stato);
    }
  }
}

const stato = new StatoApplicazione({ utente: null, caricamento: false, errore: null });

stato.aggiungiOsservatore((nuovoStato) => {
  console.log('Stato aggiornato:', nuovoStato);
});

stato.aggiorna({ caricamento: true });
stato.aggiorna({ utente: { id: 1, nome: 'Mario' }, caricamento: false });
```

## Limitazioni e considerazioni

1. **Ereditarietà singola**: JavaScript supporta solo l'ereditarietà singola, a differenza di alcuni linguaggi che supportano l'ereditarietà multipla.

2. **Prestazioni**: In alcuni casi, l'uso di classi può comportare un leggero overhead rispetto all'uso diretto di oggetti e prototipi.

3. **Compatibilità**: Le classi potrebbero richiedere un transpiler come Babel per funzionare in browser più vecchi.

4. **Proprietà di istanza vs proprietà di prototipo**: Le proprietà definite nel costruttore sono proprietà di istanza, mentre i metodi sono proprietà di prototipo. Questo può influire sull'uso della memoria quando si creano molte istanze.

## Conclusione

Le classi in JavaScript rappresentano un'importante evoluzione del linguaggio, offrendo un modo più intuitivo e strutturato per implementare la programmazione orientata agli oggetti. Sebbene siano essenzialmente zucchero sintattico sopra il sistema di prototipi esistente, forniscono una sintassi più chiara e familiare che facilita la scrittura e la manutenzione del codice.

Le classi sono particolarmente utili per organizzare il codice in applicazioni complesse, definire gerarchie di oggetti e implementare pattern di progettazione comuni. Con l'aggiunta di caratteristiche come proprietà private, metodi statici e getter/setter, le classi JavaScript sono diventate uno strumento potente e versatile per gli sviluppatori moderni.