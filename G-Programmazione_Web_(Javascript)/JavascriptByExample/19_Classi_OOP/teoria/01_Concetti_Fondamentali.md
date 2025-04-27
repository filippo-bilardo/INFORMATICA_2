# Concetti Fondamentali di OOP in JavaScript

## Introduzione alla Programmazione Orientata agli Oggetti

La Programmazione Orientata agli Oggetti (OOP) è un paradigma di programmazione basato sul concetto di "oggetti", che possono contenere dati sotto forma di campi (attributi o proprietà) e codice sotto forma di procedure (metodi). JavaScript, pur essendo un linguaggio multi-paradigma, supporta la programmazione orientata agli oggetti attraverso vari meccanismi.

## I Quattro Pilastri dell'OOP

### 1. Incapsulamento

L'incapsulamento è il concetto di raggruppare dati (proprietà) e metodi che operano su quei dati in un'unica unità chiamata classe. Questo permette di nascondere i dettagli implementativi interni e di esporre solo ciò che è necessario.

```javascript
// Esempio di incapsulamento in JavaScript pre-ES6
function Persona(nome, età) {
  // Proprietà private (convenzione con underscore)
  let _età = età;
  
  // Metodo pubblico
  this.presentati = function() {
    return `Ciao, mi chiamo ${nome} e ho ${_età} anni.`;
  };
  
  // Getter e setter
  this.getEtà = function() { return _età; };
  this.setEtà = function(nuovaEtà) {
    if (nuovaEtà > 0) _età = nuovaEtà;
  };
}

const persona = new Persona('Mario', 30);
console.log(persona.presentati()); // Output: Ciao, mi chiamo Mario e ho 30 anni.
```

### 2. Ereditarietà

L'ereditarietà permette a una classe (sottoclasse) di ereditare proprietà e metodi da un'altra classe (superclasse). Questo favorisce il riutilizzo del codice e la creazione di gerarchie di classi.

```javascript
// Esempio di ereditarietà in JavaScript pre-ES6
function Animale(nome) {
  this.nome = nome;
}

Animale.prototype.verso = function() {
  return "L'animale fa un verso";
};

function Cane(nome, razza) {
  // Chiamata al costruttore della superclasse
  Animale.call(this, nome);
  this.razza = razza;
}

// Impostazione dell'ereditarietà
Cane.prototype = Object.create(Animale.prototype);
Cane.prototype.constructor = Cane;

// Sovrascrittura del metodo
Cane.prototype.verso = function() {
  return "Bau bau!";
};

const mioCaneFido = new Cane('Fido', 'Labrador');
console.log(mioCaneFido.verso()); // Output: Bau bau!
```

### 3. Polimorfismo

Il polimorfismo permette a oggetti di classi diverse di rispondere allo stesso messaggio o metodo in modi diversi. In JavaScript, questo è naturalmente supportato grazie alla sua natura dinamica.

```javascript
// Esempio di polimorfismo
function Forma() {
  this.area = function() {
    return 0; // Implementazione di base
  };
}

function Rettangolo(larghezza, altezza) {
  this.larghezza = larghezza;
  this.altezza = altezza;
  
  this.area = function() {
    return this.larghezza * this.altezza;
  };
}

function Cerchio(raggio) {
  this.raggio = raggio;
  
  this.area = function() {
    return Math.PI * this.raggio * this.raggio;
  };
}

// Polimorfismo in azione
const forme = [
  new Rettangolo(4, 5),
  new Cerchio(3)
];

forme.forEach(forma => {
  console.log(`Area: ${forma.area()}`);
});
// Output:
// Area: 20
// Area: 28.274333882308138
```

### 4. Astrazione

L'astrazione consiste nel nascondere i dettagli complessi e mostrare solo le funzionalità essenziali. In JavaScript, questo può essere ottenuto attraverso interfacce e classi astratte (concettualmente, anche se non sono nativamente supportate come in altri linguaggi).

```javascript
// Esempio di astrazione
function VeicoloAstratto() {
  if (this.constructor === VeicoloAstratto) {
    throw new Error("Non puoi istanziare una classe astratta!");
  }
  
  // Metodo che deve essere implementato dalle sottoclassi
  this.accelera = function() {
    throw new Error("Il metodo accelera deve essere implementato!");
  };
}

function Auto() {
  // Implementazione concreta
  this.accelera = function() {
    return "L'auto accelera...";
  };
}

// Impostazione dell'ereditarietà
Auto.prototype = Object.create(VeicoloAstratto.prototype);
Auto.prototype.constructor = Auto;

const miaAuto = new Auto();
console.log(miaAuto.accelera()); // Output: L'auto accelera...

// Questo genererebbe un errore:
// const veicolo = new VeicoloAstratto();
```

## OOP in JavaScript vs Altri Linguaggi

JavaScript implementa l'OOP in modo diverso rispetto a linguaggi come Java o C++:

1. **Basato su prototipi**: JavaScript utilizza un sistema basato su prototipi anziché classi (anche se ES6 ha introdotto una sintassi di classe).
2. **Ereditarietà prototipale**: Gli oggetti ereditano direttamente da altri oggetti, non da classi.
3. **Dinamico**: Le proprietà e i metodi possono essere aggiunti o rimossi dagli oggetti in qualsiasi momento.
4. **Nessun modificatore di accesso nativo**: JavaScript non ha modificatori come `private`, `protected` e `public` (anche se ES2022 ha introdotto i campi privati con `#`).

## Conclusione

Nonostante le differenze rispetto ad altri linguaggi, JavaScript offre potenti strumenti per implementare i principi dell'OOP. Con l'introduzione della sintassi delle classi in ES6 e le continue evoluzioni del linguaggio, la programmazione orientata agli oggetti in JavaScript è diventata più accessibile e familiare per gli sviluppatori provenienti da altri linguaggi.

Nel prossimo capitolo, esploreremo in dettaglio la sintassi delle classi introdotta in ES6 e come questa faciliti l'implementazione dei concetti OOP in JavaScript.

---

[Torna all'indice dell'esercitazione](../README.md) | [Prossimo: Classi in ES6](./02_Classi_ES6.md)