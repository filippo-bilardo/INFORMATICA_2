# Operatori di Assegnazione in JavaScript

Gli operatori di assegnazione in JavaScript permettono di assegnare valori alle variabili. Oltre all'operatore di assegnazione base, esistono operatori composti che combinano un'operazione aritmetica o logica con l'assegnazione.

## Operatore di Assegnazione Base

### Assegnazione (=)

L'operatore di assegnazione base assegna il valore dell'operando destro all'operando sinistro.

```javascript
let x = 10;      // Assegna 10 a x
let y = x;       // Assegna il valore di x a y

// Assegnazioni multiple
let a, b, c;
a = b = c = 5;   // Assegna 5 a tutte le variabili
```

## Operatori di Assegnazione Composti

Gli operatori di assegnazione composti combinano un'operazione con l'assegnazione, rendendo il codice più conciso.

### Assegnazione con Addizione (+=)

```javascript
let x = 10;
x += 5;      // Equivalente a: x = x + 5
console.log(x);  // 15

// Funziona anche con le stringhe (concatenazione)
let testo = "Hello";
testo += " World";  // Equivalente a: testo = testo + " World"
console.log(testo);  // "Hello World"
```

### Assegnazione con Sottrazione (-=)

```javascript
let x = 10;
x -= 5;      // Equivalente a: x = x - 5
console.log(x);  // 5
```

### Assegnazione con Moltiplicazione (*=)

```javascript
let x = 10;
x *= 2;      // Equivalente a: x = x * 2
console.log(x);  // 20
```

### Assegnazione con Divisione (/=)

```javascript
let x = 10;
x /= 2;      // Equivalente a: x = x / 2
console.log(x);  // 5
```

### Assegnazione con Modulo (%=)

```javascript
let x = 10;
x %= 3;      // Equivalente a: x = x % 3
console.log(x);  // 1
```

### Assegnazione con Esponente (**=)

```javascript
let x = 2;
x **= 3;     // Equivalente a: x = x ** 3
console.log(x);  // 8
```

## Operatori di Assegnazione con Operatori Bit a Bit

### Assegnazione con AND Bit a Bit (&=)

```javascript
let x = 5;    // 101 in binario
x &= 3;       // 3 è 011 in binario, risultato: 001 (1 in decimale)
console.log(x);  // 1
```

### Assegnazione con OR Bit a Bit (|=)

```javascript
let x = 5;    // 101 in binario
x |= 3;       // 3 è 011 in binario, risultato: 111 (7 in decimale)
console.log(x);  // 7
```

### Assegnazione con XOR Bit a Bit (^=)

```javascript
let x = 5;    // 101 in binario
x ^= 3;       // 3 è 011 in binario, risultato: 110 (6 in decimale)
console.log(x);  // 6
```

### Assegnazione con Shift a Sinistra (<<=)

```javascript
let x = 5;    // 101 in binario
x <<= 1;      // Sposta i bit a sinistra di 1 posizione: 1010 (10 in decimale)
console.log(x);  // 10
```

### Assegnazione con Shift a Destra (>>=)

```javascript
let x = 5;    // 101 in binario
x >>= 1;      // Sposta i bit a destra di 1 posizione: 10 (2 in decimale)
console.log(x);  // 2
```

### Assegnazione con Shift a Destra senza segno (>>>=)

```javascript
let x = -5;   // Rappresentazione binaria negativa
x >>>= 1;     // Sposta i bit a destra di 1 posizione, ignorando il segno
console.log(x);  // Risultato positivo molto grande (dipende dall'implementazione)
```

## Operatori di Assegnazione Logica (ES2020)

Introdotti in ES2020, questi operatori combinano operazioni logiche con l'assegnazione.

### Assegnazione con AND Logico (&&=)

Assegna il valore di destra solo se il valore di sinistra è truthy.

```javascript
let x = 1;
x &&= 5;      // Equivalente a: x = x && 5
console.log(x);  // 5

let y = 0;
y &&= 5;      // Equivalente a: y = y && 5
console.log(y);  // 0 (y è falsy, quindi mantiene il suo valore)
```

### Assegnazione con OR Logico (||=)

Assegna il valore di destra solo se il valore di sinistra è falsy.

```javascript
let x = 1;
x ||= 5;      // Equivalente a: x = x || 5
console.log(x);  // 1 (x è truthy, quindi mantiene il suo valore)

let y = 0;
y ||= 5;      // Equivalente a: y = y || 5
console.log(y);  // 5
```

### Assegnazione con Nullish Coalescing (??=)

Assegna il valore di destra solo se il valore di sinistra è null o undefined.

```javascript
let x = 0;
x ??= 5;      // Equivalente a: x = x ?? 5
console.log(x);  // 0 (x non è null o undefined)

let y = null;
y ??= 5;      // Equivalente a: y = y ?? 5
console.log(y);  // 5

let z;
z ??= 5;      // Equivalente a: z = z ?? 5
console.log(z);  // 5 (z è undefined)
```

## Destructuring Assignment

L'assegnazione destrutturante è una sintassi speciale introdotta in ES6 che permette di estrarre dati da array o oggetti in variabili separate.

### Destrutturazione di Array

```javascript
let numeri = [1, 2, 3, 4, 5];

// Assegnazione destrutturante base
let [a, b, c] = numeri;
console.log(a, b, c);  // 1 2 3

// Saltare elementi
let [primo, , terzo] = numeri;
console.log(primo, terzo);  // 1 3

// Rest pattern
let [testa, ...resto] = numeri;
console.log(testa, resto);  // 1 [2, 3, 4, 5]

// Valori predefiniti
let [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z);  // 1 2 0
```

### Destrutturazione di Oggetti

```javascript
let persona = {
  nome: "Mario",
  età: 30,
  città: "Roma"
};

// Assegnazione destrutturante base
let {nome, età} = persona;
console.log(nome, età);  // "Mario" 30

// Assegnazione con nomi di variabili diversi
let {nome: n, età: e} = persona;
console.log(n, e);  // "Mario" 30

// Valori predefiniti
let {nome: n2 = "Anonimo", professione = "Sconosciuta"} = persona;
console.log(n2, professione);  // "Mario" "Sconosciuta"

// Rest pattern con oggetti
let {nome: n3, ...dettagli} = persona;
console.log(n3, dettagli);  // "Mario" {età: 30, città: "Roma"}
```

## Best Practices

1. **Usa operatori composti per codice conciso**: Gli operatori di assegnazione composti rendono il codice più leggibile e conciso.

```javascript
// Meglio
contatore += 1;

// Invece di
contatore = contatore + 1;
```

2. **Attenzione alle conversioni implicite**: Gli operatori di assegnazione possono causare conversioni di tipo inaspettate.

```javascript
let x = "5";
x += 1;  // "51" (concatenazione di stringhe)
x -= 1;  // 50 (conversione a numero)
```

3. **Usa la destrutturazione per estrarre proprietà**: La destrutturazione rende il codice più pulito quando si lavora con oggetti complessi.

```javascript
// Meglio
const {nome, età} = utente;
console.log(nome, età);

// Invece di
const nome = utente.nome;
const età = utente.età;
console.log(nome, età);
```

4. **Evita assegnazioni multiple nella stessa riga**: Possono rendere il codice difficile da leggere e debuggare.

```javascript
// Evita
a = b = c = 5;

// Preferisci
a = 5;
b = 5;
c = 5;
```

5. **Usa gli operatori logici di assegnazione appropriati**: Scegli tra `||=`, `&&=` e `??=` in base al comportamento desiderato.

```javascript
// Inizializza solo se undefined o null
opzioni.timeout ??= 1000;

// Imposta un valore predefinito per qualsiasi valore falsy
opzioni.timeout ||= 1000;

// Modifica solo se il valore corrente è truthy
opzioni.callback &&= nuovaCallback;
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Operatori Logici](./03_Operatori_Logici.md) | [Vai al prossimo: Operatori Avanzati](./05_Operatori_Avanzati.md)