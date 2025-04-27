# Parametri e Valori di Ritorno nelle Funzioni JavaScript

I parametri e i valori di ritorno sono elementi fondamentali delle funzioni in JavaScript. Essi permettono alle funzioni di ricevere input, elaborarli e restituire risultati, rendendo il codice più flessibile e riutilizzabile.

## Parametri delle Funzioni

I parametri sono variabili elencate nella definizione di una funzione che fungono da segnaposto per i valori che verranno passati alla funzione quando viene chiamata.

### Parametri Base

```javascript
function somma(a, b) {
  return a + b;
}

console.log(somma(5, 3)); // Output: 8
```

In questo esempio, `a` e `b` sono parametri della funzione `somma`.

### Parametri di Default

A partire da ES6, è possibile assegnare valori predefiniti ai parametri:

```javascript
function saluta(nome = "Ospite") {
  return "Ciao, " + nome + "!";
}

console.log(saluta()); // Output: "Ciao, Ospite!"
console.log(saluta("Mario")); // Output: "Ciao, Mario!"
```

### Parametri Rest

Il parametro rest (`...`) permette di rappresentare un numero indefinito di argomenti come un array:

```javascript
function sommaNumeri(...numeri) {
  return numeri.reduce((totale, numero) => totale + numero, 0);
}

console.log(sommaNumeri(1, 2, 3, 4, 5)); // Output: 15
```

### L'oggetto `arguments`

In ogni funzione è disponibile un oggetto speciale chiamato `arguments` che contiene tutti gli argomenti passati alla funzione:

```javascript
function mostraArgomenti() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

mostraArgomenti("uno", "due", "tre");
// Output:
// "uno"
// "due"
// "tre"
```

Nota: l'oggetto `arguments` non è un vero array, ma un oggetto array-like. Nelle funzioni freccia, `arguments` non è disponibile.

## Valori di Ritorno

Il valore di ritorno è il valore che una funzione restituisce al codice chiamante. In JavaScript, una funzione può restituire un solo valore.

### Ritorno di Valori Semplici

```javascript
function quadrato(numero) {
  return numero * numero;
}

let risultato = quadrato(4);
console.log(risultato); // Output: 16
```

### Ritorno di Oggetti e Array

Una funzione può restituire strutture dati complesse come oggetti o array:

```javascript
function creaPersona(nome, età) {
  return {
    nome: nome,
    età: età,
    saluta: function() {
      return "Ciao, sono " + this.nome;
    }
  };
}

let persona = creaPersona("Mario", 30);
console.log(persona.saluta()); // Output: "Ciao, sono Mario"
```

### Ritorno Anticipato

L'istruzione `return` termina immediatamente l'esecuzione della funzione e restituisce il valore specificato:

```javascript
function verificaEtà(età) {
  if (età < 18) {
    return "Minorenne";
  }
  return "Maggiorenne";
}

console.log(verificaEtà(16)); // Output: "Minorenne"
```

### Funzioni senza Return

Se una funzione non ha un'istruzione `return` o ha un `return` senza valore, restituisce `undefined`:

```javascript
function salutaTutti() {
  console.log("Ciao a tutti!");
  // Nessun return esplicito
}

let risultato = salutaTutti();
console.log(risultato); // Output: undefined
```

## Tecniche Avanzate

### Destrutturazione dei Parametri

La destrutturazione permette di estrarre dati da array o oggetti in modo più conciso:

```javascript
function mostraInfo({ nome, età }) {
  console.log(`${nome} ha ${età} anni`);
}

mostraInfo({ nome: "Mario", età: 30, professione: "Sviluppatore" });
// Output: "Mario ha 30 anni"
```

### Ritorno di Funzioni (Higher-Order Functions)

Una funzione può restituire un'altra funzione:

```javascript
function moltiplicatorePer(fattore) {
  return function(numero) {
    return numero * fattore;
  };
}

let doppio = moltiplicatorePer(2);
let triplo = moltiplicatorePer(3);

console.log(doppio(5)); // Output: 10
console.log(triplo(5)); // Output: 15
```

### Pattern di Callback

Le funzioni possono essere passate come argomenti ad altre funzioni (callback):

```javascript
function elaboraDati(dati, callback) {
  // Elaborazione dei dati
  let risultato = dati.map(item => item * 2);
  
  // Chiamata della callback con il risultato
  callback(risultato);
}

elaboraDati([1, 2, 3], function(risultato) {
  console.log("Risultato elaborato:", risultato);
});
// Output: "Risultato elaborato:" [2, 4, 6]
```

## Best Practices

1. **Nomi Descrittivi**: Usa nomi che descrivono chiaramente lo scopo dei parametri.
2. **Validazione degli Input**: Verifica sempre che i parametri ricevuti siano validi prima di elaborarli.
3. **Valori di Default Sensati**: Fornisci valori predefiniti ragionevoli per i parametri opzionali.
4. **Documentazione**: Documenta chiaramente i parametri attesi e il valore di ritorno della funzione.
5. **Coerenza nei Ritorni**: Assicurati che la funzione restituisca sempre lo stesso tipo di dato, indipendentemente dal percorso di esecuzione.

## Conclusione

I parametri e i valori di ritorno sono strumenti potenti che permettono di creare funzioni flessibili e riutilizzabili. Comprendere come utilizzarli efficacemente è fondamentale per scrivere codice JavaScript di qualità.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Dichiarazione e Invocazione](./01_Dichiarazione_Invocazione.md) | [Vai al successivo: Scope e Closure](./03_Scope_Closure.md)