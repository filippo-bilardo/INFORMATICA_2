# Operatori Avanzati in JavaScript

Oltre agli operatori di base, JavaScript offre una serie di operatori avanzati che permettono di eseguire operazioni più complesse o specializzate. Questi operatori sono particolarmente utili in scenari specifici e possono rendere il codice più conciso ed efficiente.

## Operatori Condizionali

### Operatore Ternario (? :)

L'operatore ternario è un'alternativa concisa all'istruzione `if...else`. Ha la seguente sintassi: `condizione ? espressione1 : espressione2`.

```javascript
// Sintassi base
let stato = età >= 18 ? "adulto" : "minorenne";

// Equivalente a:
let stato;
if (età >= 18) {
  stato = "adulto";
} else {
  stato = "minorenne";
}

// Operatori ternari annidati
let messaggio = età < 16 ? "Troppo giovane" : età < 18 ? "Quasi adulto" : "Adulto";

// Più leggibile con parentesi
let messaggio = età < 16 ? "Troppo giovane" : (età < 18 ? "Quasi adulto" : "Adulto");
```

## Operatori Bit a Bit

Gli operatori bit a bit trattano gli operandi come sequenze di 32 bit e operano su di essi bit per bit.

### AND Bit a Bit (&)

Restituisce un 1 in ogni posizione in cui i bit corrispondenti di entrambi gli operandi sono 1.

```javascript
5 & 3;  // 1
// 5 = 101 in binario
// 3 = 011 in binario
// Risultato: 001 (1 in decimale)
```

### OR Bit a Bit (|)

Restituisce un 1 in ogni posizione in cui almeno uno dei bit corrispondenti degli operandi è 1.

```javascript
5 | 3;  // 7
// 5 = 101 in binario
// 3 = 011 in binario
// Risultato: 111 (7 in decimale)
```

### XOR Bit a Bit (^)

Restituisce un 1 in ogni posizione in cui esattamente uno dei bit corrispondenti degli operandi è 1.

```javascript
5 ^ 3;  // 6
// 5 = 101 in binario
// 3 = 011 in binario
// Risultato: 110 (6 in decimale)
```

### NOT Bit a Bit (~)

Inverte tutti i bit dell'operando.

```javascript
~5;  // -6
// 5 = 00000000000000000000000000000101 in binario a 32 bit
// Risultato: 11111111111111111111111111111010 (rappresentazione in complemento a 2 di -6)
```

### Shift a Sinistra (<<)

Sposta i bit dell'operando sinistro a sinistra del numero di posizioni specificato dall'operando destro.

```javascript
5 << 1;  // 10
// 5 = 101 in binario
// Spostato a sinistra di 1: 1010 (10 in decimale)

5 << 2;  // 20
// 5 = 101 in binario
// Spostato a sinistra di 2: 10100 (20 in decimale)
```

### Shift a Destra (>>)

Sposta i bit dell'operando sinistro a destra del numero di posizioni specificato dall'operando destro, mantenendo il segno.

```javascript
5 >> 1;  // 2
// 5 = 101 in binario
// Spostato a destra di 1: 10 (2 in decimale)

-5 >> 1;  // -3
// -5 in complemento a 2 ha il bit di segno a 1
// Lo shift a destra mantiene il bit di segno
```

### Shift a Destra senza segno (>>>)

Sposta i bit dell'operando sinistro a destra del numero di posizioni specificato dall'operando destro, riempiendo con zeri a sinistra.

```javascript
5 >>> 1;  // 2 (stesso risultato di >> per numeri positivi)

-5 >>> 1;  // 2147483645
// -5 in complemento a 2 ha tutti i bit più significativi a 1
// >>> li sostituisce con 0, risultando in un numero positivo molto grande
```

## Operatore di Concatenazione di Stringhe (+)

L'operatore `+` può essere usato per concatenare stringhe.

```javascript
let nome = "Mario";
let saluto = "Ciao, " + nome + "!";
console.log(saluto);  // "Ciao, Mario!"

// Conversione implicita
let età = 30;
let messaggio = "Hai " + età + " anni.";
console.log(messaggio);  // "Hai 30 anni."
```

## Operatore di Spread (...)

Introdotto in ES6, l'operatore di spread espande un iterable (come un array o una stringa) in luoghi dove sono attesi zero o più argomenti o elementi.

```javascript
// Espandere array
let array1 = [1, 2, 3];
let array2 = [...array1, 4, 5];  // [1, 2, 3, 4, 5]

// Copiare array
let copia = [...array1];  // Crea una copia superficiale

// Unire array
let unione = [...array1, ...array2];  // [1, 2, 3, 1, 2, 3, 4, 5]

// Espandere stringhe
let caratteri = [..."Hello"];  // ["H", "e", "l", "l", "o"]

// Usare con funzioni
function somma(a, b, c) {
  return a + b + c;
}

let numeri = [1, 2, 3];
console.log(somma(...numeri));  // 6
```

### Operatore di Spread con Oggetti

In ES2018, l'operatore di spread è stato esteso per funzionare anche con oggetti.

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };

// Unire oggetti
let unione = { ...obj1, ...obj2 };  // { a: 1, b: 2, c: 3, d: 4 }

// Sovrascrivere proprietà
let sovrascrittura = { ...obj1, b: 3 };  // { a: 1, b: 3 }

// Copiare oggetti
let copia = { ...obj1 };  // Crea una copia superficiale
```

## Operatore di Rest (...)

L'operatore di rest ha la stessa sintassi dell'operatore di spread, ma viene usato nei parametri di funzione o nella destrutturazione per raccogliere elementi rimanenti in un array.

```javascript
// Rest nei parametri di funzione
function somma(...numeri) {
  return numeri.reduce((acc, val) => acc + val, 0);
}

console.log(somma(1, 2, 3, 4));  // 10

// Rest nella destrutturazione di array
let [primo, secondo, ...resto] = [1, 2, 3, 4, 5];
console.log(primo, secondo, resto);  // 1 2 [3, 4, 5]

// Rest nella destrutturazione di oggetti
let { a, b, ...rimanenti } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a, b, rimanenti);  // 1 2 { c: 3, d: 4 }
```

## Operatore di Concatenazione Opzionale (?.) (ES2020)

L'operatore di concatenazione opzionale permette di leggere il valore di una proprietà situata in profondità all'interno di una catena di oggetti senza dover verificare esplicitamente che ogni riferimento nella catena sia valido.

```javascript
let utente = {
  nome: "Mario",
  indirizzo: {
    città: "Roma"
  }
};

// Senza concatenazione opzionale
let città;
if (utente && utente.indirizzo) {
  città = utente.indirizzo.città;
}

// Con concatenazione opzionale
let città = utente?.indirizzo?.città;  // "Roma"

// Se un riferimento è null o undefined, l'espressione restituisce undefined
let cap = utente?.indirizzo?.cap;  // undefined

// Funziona anche con metodi
utente.saluta?.();  // Non genera errore se saluta non esiste

// E con accesso agli elementi di array
let primoHobby = utente.hobby?.[0];  // undefined se hobby non esiste
```

## Operatore Nullish Coalescing (??) (ES2020)

L'operatore nullish coalescing (??) è un operatore logico che restituisce il suo operando di destra quando l'operando di sinistra è `null` o `undefined`, altrimenti restituisce l'operando di sinistra. A differenza dell'operatore OR (||), l'operatore ?? non considera falsy i valori come 0, stringa vuota o false.

```javascript
// Operatore OR vs Nullish Coalescing
let valore1 = 0;
let risultatoOR = valore1 || "valore predefinito";  // "valore predefinito" (0 è falsy)
let risultatoNC = valore1 ?? "valore predefinito";  // 0 (0 non è null o undefined)

let valore2 = "";
let risultatoOR2 = valore2 || "valore predefinito";  // "valore predefinito" (stringa vuota è falsy)
let risultatoNC2 = valore2 ?? "valore predefinito";  // "" (stringa vuota non è null o undefined)

let valore3 = null;
let risultatoOR3 = valore3 || "valore predefinito";  // "valore predefinito"
let risultatoNC3 = valore3 ?? "valore predefinito";  // "valore predefinito"

// Uso pratico
function getPreferenze(utente) {
  return utente.preferenze ?? { tema: "chiaro", notifiche: true };
}

// Concatenazione con altri operatori
let risultato = (utente?.preferenze?.tema) ?? "tema predefinito";
```

## Operatore delete

L'operatore `delete` rimuove una proprietà da un oggetto.

```javascript
let persona = {
  nome: "Mario",
  età: 30,
  città: "Roma"
};

delete persona.età;  // Rimuove la proprietà età
console.log(persona);  // { nome: "Mario", città: "Roma" }

// Non funziona con variabili
let x = 10;
delete x;  // false (non ha effetto)
```

## Operatore typeof

L'operatore `typeof` restituisce una stringa che indica il tipo dell'operando.

```javascript
typeof 42;           // "number"
typeof "hello";      // "string"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof null;         // "object" (questo è considerato un bug storico di JavaScript)
typeof {};           // "object"
typeof [];           // "object"
typeof function(){}; // "function"
typeof Symbol();     // "symbol"
typeof BigInt(42);   // "bigint"
```

## Operatore instanceof

L'operatore `instanceof` verifica se un oggetto è un'istanza di un determinato costruttore.

```javascript
let arr = [1, 2, 3];
let obj = {};
let data = new Date();

console.log(arr instanceof Array);    // true
console.log(obj instanceof Object);   // true
console.log(data instanceof Date);    // true
console.log(arr instanceof Object);   // true (gli array sono anche oggetti)
console.log(obj instanceof Array);    // false
```

## Operatore in

L'operatore `in` verifica se una proprietà esiste in un oggetto o se un indice esiste in un array.

```javascript
let persona = { nome: "Mario", età: 30 };

console.log("nome" in persona);  // true
console.log("città" in persona);  // false

let array = [1, 2, 3];
console.log(0 in array);         // true (l'indice 0 esiste)
console.log(5 in array);         // false (l'indice 5 non esiste)
```

## Operatore void

L'operatore `void` valuta un'espressione e restituisce `undefined`.

```javascript
void 0;              // undefined
void(0);             // undefined
void "hello";        // undefined
void function(){}(); // undefined

// Uso comune in link JavaScript
<a href="javascript:void(0)" onclick="funzione()">Clicca qui</a>
```

## Best Practices

1. **Usa l'operatore ternario per assegnazioni semplici**: È conciso e leggibile per condizioni semplici.

```javascript
// Buon uso dell'operatore ternario
let messaggio = età >= 18 ? "Benvenuto" : "Accesso negato";

// Evita ternari troppo complessi o annidati
let complesso = a > b ? x > y ? "A" : "B" : z > w ? "C" : "D";  // Difficile da leggere
```

2. **Usa gli operatori bit a bit con cautela**: Sono potenti ma possono rendere il codice difficile da leggere.

```javascript
// Usa commenti per spiegare operazioni bit a bit complesse
let flag = (FLAG_A | FLAG_B) & ~FLAG_C;  // Attiva A e B, disattiva C
```

3. **Preferisci template literals alla concatenazione di stringhe**: Sono più leggibili e meno soggetti a errori.

```javascript
// Invece di
let messaggio = "Ciao, " + nome + "! Hai " + età + " anni.";

// Preferisci
let messaggio = `Ciao, ${nome}! Hai ${età} anni.`;
```

4. **Usa l'operatore di spread per operazioni non distruttive**: È utile per creare nuovi array o oggetti senza modificare gli originali.

```javascript
// Aggiungere elementi senza mutare l'array originale
let nuovoArray = [...arrayOriginale, nuovoElemento];

// Aggiornare proprietà di un oggetto senza mutarlo
let nuovoOggetto = { ...oggettoOriginale, proprietà: nuovoValore };
```

5. **Usa l'operatore di concatenazione opzionale per percorsi di accesso profondi**: Evita errori quando accedi a proprietà annidate che potrebbero non esistere.

```javascript
// Invece di
let città = utente && utente.indirizzo && utente.indirizzo.città;

// Preferisci
let città = utente?.indirizzo?.città;
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Operatori di Assegnazione](./04_Operatori_Assegnazione.md)