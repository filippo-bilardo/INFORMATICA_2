# Conversione tra Tipi di Dati in JavaScript

JavaScript è un linguaggio a tipizzazione dinamica, il che significa che le variabili possono cambiare tipo durante l'esecuzione del programma. La conversione tra tipi di dati può avvenire in modo implicito (coercizione) o esplicito (casting).

## Conversione implicita (coercizione)

La conversione implicita avviene automaticamente quando JavaScript tenta di operare su valori di tipi diversi.

### Conversione a String

```javascript
// Operatore +
let num = 42;
let str = num + ""; // "42"

let bool = true;
let strBool = bool + ""; // "true"

let arr = [1, 2, 3];
let strArr = arr + ""; // "1,2,3"

let obj = { nome: "Mario" };
let strObj = obj + ""; // "[object Object]"
```

### Conversione a Number

```javascript
// Operatori matematici (eccetto +)
let str = "42";
let num1 = str - 0; // 42
let num2 = str * 1; // 42
let num3 = str / 1; // 42

// Comparazioni
let confronto = "42" > 40; // true ("42" viene convertito in 42)

// Casi problematici
let strangeNum1 = "ciao" - 0; // NaN
let strangeNum2 = null - 0; // 0 (null diventa 0)
let strangeNum3 = undefined - 0; // NaN (undefined diventa NaN)
let strangeNum4 = true - 0; // 1 (true diventa 1)
let strangeNum5 = false - 0; // 0 (false diventa 0)
```

### Conversione a Boolean

```javascript
// Contesti condizionali (if, while, for, ?:, ||, &&, !)
let str = "ciao";
if (str) {
  console.log("La stringa è truthy"); // Eseguito perché str è truthy
}

let zero = 0;
if (zero) {
  console.log("Questo non verrà eseguito"); // Non eseguito perché zero è falsy
}
```

### Valori Truthy e Falsy

In JavaScript, i seguenti valori sono considerati falsy (valutati come `false` in contesti booleani):

```javascript
false
0, -0, 0n (BigInt zero)
"" (stringa vuota)
null
undefined
NaN
```

Tutti gli altri valori sono truthy (valutati come `true` in contesti booleani).

### Operatori di uguaglianza

L'operatore di uguaglianza non stretta (`==`) esegue la conversione di tipo prima del confronto, mentre l'operatore di uguaglianza stretta (`===`) non lo fa.

```javascript
console.log("42" == 42); // true (conversione di tipo)
console.log("42" === 42); // false (tipi diversi)

console.log(0 == false); // true (entrambi convertiti a 0)
console.log(0 === false); // false (tipi diversi)

console.log(null == undefined); // true
console.log(null === undefined); // false
```

## Conversione esplicita (casting)

La conversione esplicita avviene quando il programmatore utilizza funzioni o costruttori per convertire intenzionalmente un valore da un tipo a un altro.

### Conversione a String

```javascript
// String() constructor
let num = 42;
let str1 = String(num); // "42"

// toString() method
let str2 = num.toString(); // "42"
let bool = true;
let strBool = bool.toString(); // "true"

// Template literals
let str3 = `${num}`; // "42"
```

### Conversione a Number

```javascript
// Number() constructor
let str = "42";
let num1 = Number(str); // 42
let bool = true;
let numBool = Number(bool); // 1

// parseInt() e parseFloat()
let num2 = parseInt("42px"); // 42 (si ferma al primo carattere non numerico)
let num3 = parseFloat("3.14"); // 3.14
let num4 = parseInt("3.14"); // 3 (prende solo la parte intera)
let num5 = parseInt("0xFF"); // 255 (riconosce esadecimale)
let num6 = parseInt("101", 2); // 5 (interpreta come binario)

// Operatore unario +
let num7 = +"42"; // 42
let num8 = +true; // 1
```

### Conversione a Boolean

```javascript
// Boolean() constructor
let str = "ciao";
let bool1 = Boolean(str); // true

let zero = 0;
let bool2 = Boolean(zero); // false

// Doppia negazione !!
let bool3 = !!str; // true
let bool4 = !!zero; // false
```

## Casi particolari e best practices

### Conversione di oggetti

Quando si convertono oggetti in tipi primitivi, JavaScript utilizza i metodi `valueOf()` e `toString()`:

```javascript
let obj = {
  valueOf: function() { return 42; },
  toString: function() { return "oggetto personalizzato"; }
};

console.log(obj + ""); // "42" (usa valueOf per conversione numerica, poi converte in stringa)
console.log(String(obj)); // "oggetto personalizzato" (usa toString direttamente)
```

### Best practices

1. **Preferire la conversione esplicita**: Rende il codice più leggibile e previene comportamenti inaspettati.

```javascript
// Meglio questo
let num = Number(inputValue);

// Che questo
let num = +inputValue;
```

2. **Usare l'uguaglianza stretta (`===`)**: Evita conversioni di tipo inaspettate nelle comparazioni.

```javascript
// Meglio questo
if (value === 42) { ... }

// Che questo
if (value == 42) { ... }
```

3. **Verificare esplicitamente i tipi quando necessario**:

```javascript
if (typeof value === "string") {
  // Logica per le stringhe
} else if (typeof value === "number") {
  // Logica per i numeri
}
```

4. **Attenzione ai valori NaN**:

```javascript
let result = parseInt("non un numero");

// NaN è l'unico valore in JavaScript che non è uguale a se stesso
console.log(result === NaN); // false, non funziona!

// Usa invece
console.log(isNaN(result)); // true
// Oppure (ES6+, più preciso)
console.log(Number.isNaN(result)); // true
```

[Torna all'indice](../README.md#indice-degli-argomenti-teorici) | [Vai al precedente: Tipi di dati complessi](./03_Tipi_Complessi.md) | [Vai al prossimo: Scope e Hoisting](./05_Scope_Hoisting.md)