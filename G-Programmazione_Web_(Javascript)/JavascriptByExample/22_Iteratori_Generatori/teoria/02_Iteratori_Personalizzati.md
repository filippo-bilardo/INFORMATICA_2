# Creazione di Iteratori Personalizzati

## Implementazione dell'Interfaccia Iterable

Per rendere un oggetto iterabile, dobbiamo implementare il metodo `Symbol.iterator` che restituisce un oggetto iteratore. Questo ci permette di utilizzare l'oggetto in costrutti come il ciclo `for...of` o l'operatore spread (`...`).

## Il Metodo Symbol.iterator

`Symbol.iterator` è un simbolo integrato in JavaScript che specifica la funzione predefinita dell'iteratore per un oggetto. Quando implementiamo questo metodo, stiamo dicendo a JavaScript come deve comportarsi il nostro oggetto quando viene iterato.

```javascript
const mioOggetto = {
  dati: [1, 2, 3, 4, 5],
  
  // Implementazione del metodo Symbol.iterator
  [Symbol.iterator]() {
    let indice = 0;
    const dati = this.dati;
    
    // Restituisce un oggetto iteratore
    return {
      next() {
        if (indice < dati.length) {
          return { value: dati[indice++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// Ora possiamo usare il ciclo for...of
for (const valore of mioOggetto) {
  console.log(valore); // 1, 2, 3, 4, 5
}

// O l'operatore spread
const array = [...mioOggetto]; // [1, 2, 3, 4, 5]
```

## Esempio: Classe Iterabile

Ecco un esempio più completo di una classe che implementa l'interfaccia iterabile:

```javascript
class RangeNumerico {
  constructor(inizio, fine) {
    this.inizio = inizio;
    this.fine = fine;
  }
  
  // Implementazione del metodo Symbol.iterator
  [Symbol.iterator]() {
    let numeroCorrente = this.inizio;
    const numeroFinale = this.fine;
    
    // Restituisce un oggetto iteratore
    return {
      next() {
        if (numeroCorrente <= numeroFinale) {
          return { value: numeroCorrente++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// Utilizzo della classe iterabile
const numeri = new RangeNumerico(1, 5);

for (const num of numeri) {
  console.log(num); // 1, 2, 3, 4, 5
}

const arrayNumeri = [...numeri]; // [1, 2, 3, 4, 5]
```

## Iteratori con Metodi Aggiuntivi

Possiamo estendere i nostri iteratori con metodi aggiuntivi per fornire funzionalità extra:

```javascript
class RangeNumericoAvanzato {
  constructor(inizio, fine) {
    this.inizio = inizio;
    this.fine = fine;
  }
  
  [Symbol.iterator]() {
    let numeroCorrente = this.inizio;
    const numeroFinale = this.fine;
    
    return {
      next() {
        if (numeroCorrente <= numeroFinale) {
          return { value: numeroCorrente++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
      
      // Metodo per resettare l'iteratore
      reset() {
        numeroCorrente = this.inizio;
        return this;
      },
      
      // Metodo per saltare alcuni valori
      skip(n) {
        numeroCorrente += n;
        return this;
      }
    };
  }
}
```

## Iteratori Infiniti

Un vantaggio degli iteratori è che possono rappresentare sequenze potenzialmente infinite, poiché i valori vengono calcolati solo quando richiesti:

```javascript
function creaContatoreSenzaFine() {
  let n = 0;
  
  return {
    [Symbol.iterator]() {
      return this;
    },
    
    next() {
      return { value: n++, done: false };
    }
  };
}

const contatore = creaContatoreSenzaFine();
const iteratore = contatore[Symbol.iterator]();

console.log(iteratore.next().value); // 0
console.log(iteratore.next().value); // 1
console.log(iteratore.next().value); // 2
// Può continuare all'infinito...
```

Nota che con un iteratore infinito, dobbiamo fare attenzione a non utilizzarlo in costrutti che consumano l'intera sequenza (come `[...contatore]`), poiché ciò causerebbe un ciclo infinito.

## Casi d'Uso Pratici

Gli iteratori personalizzati sono particolarmente utili in diversi scenari:

1. **Strutture dati complesse**: per fornire un modo semplice di attraversare strutture dati come alberi, grafi o liste collegate.

2. **Paginazione**: per iterare su grandi set di dati, caricando solo una pagina alla volta.

3. **Generazione di sequenze**: per creare sequenze matematiche come numeri primi, sequenze di Fibonacci, ecc.

4. **Elaborazione di stream di dati**: per elaborare dati in arrivo in modo incrementale.

## Esempio: Iteratore per una Struttura ad Albero

```javascript
class Nodo {
  constructor(valore) {
    this.valore = valore;
    this.figli = [];
  }
  
  aggiungiNodo(nodo) {
    this.figli.push(nodo);
  }
}

class AlberoIterabile {
  constructor(radice) {
    this.radice = radice;
  }
  
  // Implementazione di un attraversamento in ampiezza (BFS)
  [Symbol.iterator]() {
    const coda = [this.radice];
    
    return {
      next() {
        if (coda.length === 0) {
          return { done: true };
        }
        
        const nodoCorrente = coda.shift();
        
        // Aggiungi i figli alla coda
        for (const figlio of nodoCorrente.figli) {
          coda.push(figlio);
        }
        
        return { value: nodoCorrente.valore, done: false };
      }
    };
  }
}

// Utilizzo
const radice = new Nodo('A');
const nodoB = new Nodo('B');
const nodoC = new Nodo('C');
const nodoD = new Nodo('D');
const nodoE = new Nodo('E');

radice.aggiungiNodo(nodoB);
radice.aggiungiNodo(nodoC);
nodoB.aggiungiNodo(nodoD);
nodoB.aggiungiNodo(nodoE);

const albero = new AlberoIterabile(radice);

for (const valore of albero) {
  console.log(valore); // 'A', 'B', 'C', 'D', 'E'
}
```

## Conclusione

Gli iteratori personalizzati offrono un modo potente ed elegante per lavorare con collezioni di dati in JavaScript. Implementando l'interfaccia iterabile, possiamo rendere i nostri oggetti compatibili con i costrutti moderni di JavaScript e fornire un'esperienza di iterazione coerente e intuitiva.

Nella prossima sezione, esploreremo i generatori, che offrono un modo ancora più semplice per creare iteratori.

## Navigazione

- [Indice dell'Esercitazione](../README.md)
- Precedente: [Introduzione agli Iteratori](./01_Introduzione_Iteratori.md)
- Successivo: [Introduzione ai Generatori](./03_Introduzione_Generatori.md)