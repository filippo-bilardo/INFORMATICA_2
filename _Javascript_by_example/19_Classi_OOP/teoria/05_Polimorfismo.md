# Polimorfismo in JavaScript

## Introduzione al Polimorfismo

Il polimorfismo è uno dei quattro pilastri fondamentali della programmazione orientata agli oggetti. Il termine deriva dal greco e significa "molte forme". Nel contesto della programmazione, il polimorfismo permette a oggetti di classi diverse di rispondere allo stesso messaggio o metodo in modi diversi, consentendo di trattare oggetti di classi diverse in modo uniforme.

In JavaScript, grazie alla sua natura dinamica e flessibile, il polimorfismo è naturalmente supportato e può essere implementato in diversi modi.

## Tipi di Polimorfismo

### 1. Polimorfismo di Sottotipo (Ereditarietà)

Questo è il tipo più comune di polimorfismo, dove una sottoclasse può sovrascrivere i metodi della superclasse per fornire un'implementazione specifica.

```javascript
class Animale {
  verso() {
    return "L'animale fa un verso";
  }
  
  mangia() {
    return "L'animale sta mangiando";
  }
}

class Cane extends Animale {
  verso() {
    return "Bau bau!";
  }
}

class Gatto extends Animale {
  verso() {
    return "Miao miao!";
  }
}

// Funzione polimorfica che accetta qualsiasi Animale
function faiVersare(animale) {
  console.log(animale.verso());
}

const mioCaneFido = new Cane();
const mioGattoFelix = new Gatto();

faiVersare(mioCaneFido); // Output: Bau bau!
faiVersare(mioGattoFelix); // Output: Miao miao!
```

In questo esempio, la funzione `faiVersare()` è polimorfica perché può accettare qualsiasi oggetto che abbia un metodo `verso()`, indipendentemente dalla sua classe specifica.

### 2. Polimorfismo Parametrico (Generici)

Sebbene JavaScript non supporti nativamente i generici come TypeScript, è possibile implementare una forma di polimorfismo parametrico utilizzando la natura dinamica del linguaggio.

```javascript
// Funzione generica che opera su qualsiasi tipo di array
function primoElemento(array) {
  if (array.length > 0) {
    return array[0];
  }
  return null;
}

console.log(primoElemento([1, 2, 3])); // Output: 1
console.log(primoElemento(['a', 'b', 'c'])); // Output: a
console.log(primoElemento([{nome: 'Mario'}, {nome: 'Luigi'}])); // Output: {nome: 'Mario'}
```

### 3. Polimorfismo Ad-hoc (Overloading)

JavaScript non supporta direttamente l'overloading dei metodi (multiple implementazioni dello stesso metodo con firme diverse), ma è possibile simularlo controllando il tipo o il numero di argomenti.

```javascript
class Calcolatrice {
  somma() {
    // Controlla il numero di argomenti
    if (arguments.length === 0) {
      return 0;
    } else if (arguments.length === 1) {
      return arguments[0];
    } else {
      let totale = 0;
      for (let i = 0; i < arguments.length; i++) {
        totale += arguments[i];
      }
      return totale;
    }
  }
}

const calc = new Calcolatrice();
console.log(calc.somma()); // Output: 0
console.log(calc.somma(5)); // Output: 5
console.log(calc.somma(2, 3)); // Output: 5
console.log(calc.somma(1, 2, 3, 4)); // Output: 10
```

## Duck Typing

JavaScript utilizza spesso il "duck typing" ("se cammina come un'anatra e starnazza come un'anatra, allora è un'anatra"), che è una forma di polimorfismo dove l'idoneità di un oggetto è determinata dalla presenza di certi metodi e proprietà, piuttosto che dall'appartenenza a una particolare classe.

```javascript
function nuota(oggetto) {
  // Non importa che tipo di oggetto sia, purché abbia un metodo nuota()
  if (typeof oggetto.nuota === 'function') {
    return oggetto.nuota();
  } else {
    throw new Error("L'oggetto non può nuotare!");
  }
}

const anatra = {
  nuota: function() {
    return "L'anatra sta nuotando";
  }
};

const pesce = {
  nuota: function() {
    return "Il pesce sta nuotando velocemente";
  }
};

const pietra = {
  // Non ha un metodo nuota()
};

console.log(nuota(anatra)); // Output: L'anatra sta nuotando
console.log(nuota(pesce)); // Output: Il pesce sta nuotando velocemente

try {
  nuota(pietra); // Errore: L'oggetto non può nuotare!
} catch (error) {
  console.log(error.message);
}
```

## Polimorfismo con Interfacce

Sebbene JavaScript non abbia un concetto formale di interfacce come Java o TypeScript, è possibile simulare le interfacce utilizzando oggetti o classi astratte.

```javascript
// Simulazione di un'interfaccia Forma
class Forma {
  area() {
    throw new Error('Il metodo area() deve essere implementato');
  }
  
  perimetro() {
    throw new Error('Il metodo perimetro() deve essere implementato');
  }
}

class Rettangolo extends Forma {
  constructor(larghezza, altezza) {
    super();
    this.larghezza = larghezza;
    this.altezza = altezza;
  }
  
  area() {
    return this.larghezza * this.altezza;
  }
  
  perimetro() {
    return 2 * (this.larghezza + this.altezza);
  }
}

class Cerchio extends Forma {
  constructor(raggio) {
    super();
    this.raggio = raggio;
  }
  
  area() {
    return Math.PI * this.raggio * this.raggio;
  }
  
  perimetro() {
    return 2 * Math.PI * this.raggio;
  }
}

// Funzione polimorfica che accetta qualsiasi Forma
function calcolaArea(forma) {
  return forma.area();
}

const rettangolo = new Rettangolo(4, 5);
const cerchio = new Cerchio(3);

console.log(calcolaArea(rettangolo)); // Output: 20
console.log(calcolaArea(cerchio)); // Output: 28.274333882308138
```

## Vantaggi del Polimorfismo

1. **Riutilizzo del codice**: Permette di scrivere funzioni che possono operare su oggetti di diverse classi.

2. **Estensibilità**: Facilita l'aggiunta di nuove classi che possono lavorare con il codice esistente.

3. **Manutenibilità**: Rende il codice più modulare e più facile da mantenere.

4. **Flessibilità**: Consente di sostituire oggetti con altri che hanno la stessa interfaccia.

## Conclusione

Il polimorfismo in JavaScript è un concetto potente che, grazie alla natura dinamica del linguaggio, può essere implementato in vari modi. Che si tratti di ereditarietà, duck typing o simulazione di interfacce, il polimorfismo permette di scrivere codice più flessibile, riutilizzabile e manutenibile.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Incapsulamento e Modificatori di Accesso](./04_Incapsulamento.md)
- [Argomento successivo: Pattern di Design OOP](./06_Pattern_Design.md)