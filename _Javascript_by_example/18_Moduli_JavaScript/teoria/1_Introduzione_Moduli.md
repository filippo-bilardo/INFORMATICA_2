# Introduzione ai Moduli JavaScript

## Cos'è un Modulo?

Un modulo JavaScript è un'unità di codice indipendente e riutilizzabile che incapsula funzionalità correlate. I moduli permettono di:

- Organizzare il codice in componenti logici separati
- Nascondere dettagli implementativi (incapsulamento)
- Evitare conflitti di nomi nello spazio globale
- Gestire le dipendenze tra diverse parti dell'applicazione
- Facilitare la manutenzione e il riutilizzo del codice

## Storia dei Moduli in JavaScript

JavaScript non è nato con un sistema di moduli integrato. Ecco come si è evoluto nel tempo:

### 1. Pattern di Moduli Pre-ES6

#### IIFE (Immediately Invoked Function Expression)

```javascript
var ModuloContatore = (function() {
  // Variabili private
  var contatore = 0;
  
  // Funzioni esposte pubblicamente
  return {
    incrementa: function() {
      contatore++;
      return contatore;
    },
    decrementa: function() {
      contatore--;
      return contatore;
    },
    valore: function() {
      return contatore;
    }
  };
})();

// Utilizzo
console.log(ModuloContatore.valore()); // 0
ModuloContatore.incrementa();
console.log(ModuloContatore.valore()); // 1
```

Questo pattern utilizza una funzione auto-invocante per creare uno scope privato, esponendo solo ciò che si desidera rendere pubblico.

### 2. Sistemi di Moduli di Terze Parti

#### CommonJS (utilizzato principalmente in Node.js)

```javascript
// math.js
function somma(a, b) {
  return a + b;
}

module.exports = {
  somma: somma
};

// app.js
const math = require('./math');
console.log(math.somma(5, 3)); // 8
```

#### AMD (Asynchronous Module Definition, utilizzato principalmente nei browser)

```javascript
// math.js
define([], function() {
  return {
    somma: function(a, b) {
      return a + b;
    }
  };
});

// app.js
require(['math'], function(math) {
  console.log(math.somma(5, 3)); // 8
});
```

### 3. ES6 Modules (ECMAScript 2015)

Con ES6, JavaScript ha finalmente ottenuto un sistema di moduli nativo:

```javascript
// math.js
export function somma(a, b) {
  return a + b;
}

// app.js
import { somma } from './math.js';
console.log(somma(5, 3)); // 8
```

## Vantaggi dei Moduli ES6

- **Sintassi standardizzata**: Un unico modo di definire moduli supportato nativamente
- **Analisi statica**: Le importazioni/esportazioni sono analizzabili staticamente
- **Caricamento asincrono**: I moduli possono essere caricati in modo asincrono
- **Importazioni selettive**: Possibilità di importare solo ciò che serve (tree-shaking)
- **Supporto per cicli di dipendenza**: Gestione migliorata delle dipendenze circolari

## Supporto nei Browser

I moduli ES6 sono supportati nativamente nei browser moderni. Per utilizzarli, è necessario:

```html
<script type="module" src="app.js"></script>
```

L'attributo `type="module"` indica al browser che il file deve essere trattato come un modulo ES6.

## Considerazioni Importanti

- I moduli ES6 sono sempre in modalità strict ("use strict") per impostazione predefinita
- Le variabili dichiarate nel modulo non sono aggiunte all'oggetto globale (window)
- I moduli vengono eseguiti una sola volta, indipendentemente da quante volte vengono importati
- Le importazioni sono hoisted (sollevate) all'inizio del modulo
- I moduli hanno il proprio scope

Nella prossima sezione, esploreremo in dettaglio la sintassi di import ed export dei moduli ES6.