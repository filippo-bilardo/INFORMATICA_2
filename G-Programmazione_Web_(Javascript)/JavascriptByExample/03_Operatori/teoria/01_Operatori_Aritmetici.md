# Operatori Aritmetici in JavaScript

Gli operatori aritmetici in JavaScript permettono di eseguire operazioni matematiche sui valori numerici.

## Operatori Aritmetici di Base

### Addizione (+)

L'operatore di addizione somma due numeri o concatena stringhe.

```javascript
// Addizione di numeri
let somma = 5 + 3;     // 8

// Concatenazione di stringhe
let testo = "Hello" + " " + "World";  // "Hello World"

// Conversione implicita
let mix = "5" + 3;     // "53" (il numero viene convertito in stringa)
let mix2 = 5 + "3";    // "53"
```

### Sottrazione (-)

L'operatore di sottrazione calcola la differenza tra due numeri.

```javascript
let differenza = 10 - 5;    // 5
let negativo = 5 - 10;      // -5

// Con conversione implicita
let risultato = "10" - 5;    // 5 (la stringa viene convertita in numero)
let invalido = "hello" - 5;  // NaN (Not a Number)
```

### Moltiplicazione (*)

L'operatore di moltiplicazione moltiplica due numeri.

```javascript
let prodotto = 4 * 3;       // 12
let decimale = 2.5 * 2;      // 5

// Con conversione implicita
let risultato = "4" * 2;     // 8 (la stringa viene convertita in numero)
```

### Divisione (/)

L'operatore di divisione divide il primo operando per il secondo.

```javascript
let quoziente = 20 / 4;      // 5
let decimale = 10 / 3;        // 3.3333333333333335
let divisioneZero = 5 / 0;    // Infinity
```

### Modulo (%)

L'operatore modulo restituisce il resto della divisione tra due numeri.

```javascript
let resto = 10 % 3;      // 1 (10 diviso 3 dà 3 con resto 1)
let pari = 4 % 2;         // 0 (4 diviso 2 dà 2 senza resto)
let negativo = -10 % 3;   // -1
```

### Esponente (**)

Introdotto in ES2016, l'operatore di esponente eleva il primo operando alla potenza del secondo.

```javascript
let potenza = 2 ** 3;      // 8 (2 elevato alla potenza di 3)
let radice = 16 ** 0.5;     // 4 (radice quadrata di 16)
```

## Operatori di Incremento e Decremento

### Incremento (++)

L'operatore di incremento aumenta un valore di 1.

```javascript
let a = 5;
let b = a++;    // Incremento postfisso: b = 5, poi a diventa 6
let c = 5;
let d = ++c;    // Incremento prefisso: c diventa 6, poi d = 6
```

### Decremento (--)

L'operatore di decremento diminuisce un valore di 1.

```javascript
let x = 5;
let y = x--;    // Decremento postfisso: y = 5, poi x diventa 4
let z = 5;
let w = --z;    // Decremento prefisso: z diventa 4, poi w = 4
```

## Operatore Unario (+)

L'operatore unario + tenta di convertire un valore in un numero.

```javascript
let stringa = "123";
let numero = +stringa;    // 123 (converte la stringa in numero)

let booleano = true;
let numBooleano = +booleano;  // 1

let nonNumerico = +"hello";   // NaN
```

## Operatore Unario (-)

L'operatore unario - nega un valore numerico o tenta di convertire un valore in un numero negato.

```javascript
let positivo = 5;
let negativo = -positivo;    // -5

let stringa = "123";
let negatoStringa = -stringa;  // -123
```

## Precedenza degli Operatori Aritmetici

Gli operatori aritmetici seguono una precisa precedenza nelle operazioni:

1. Parentesi `()`
2. Esponente `**`
3. Incremento/Decremento `++`, `--` (prefisso)
4. Unario `+`, `-`
5. Moltiplicazione, Divisione, Modulo `*`, `/`, `%`
6. Addizione, Sottrazione `+`, `-`
7. Incremento/Decremento `++`, `--` (postfisso)

```javascript
let risultato = 2 + 3 * 4;      // 14 (3 * 4 = 12, poi 2 + 12 = 14)
let conParentesi = (2 + 3) * 4;  // 20 ((2 + 3) = 5, poi 5 * 4 = 20)
```

## Best Practices

1. **Usa le parentesi per chiarezza**: Anche quando non strettamente necessarie, le parentesi possono rendere il codice più leggibile.

2. **Attenzione alle conversioni implicite**: JavaScript converte automaticamente i tipi, ma questo può portare a risultati inaspettati.

3. **Evita divisioni per zero**: Anche se JavaScript gestisce la divisione per zero restituendo `Infinity`, è una buona pratica evitarla.

4. **Usa con cautela gli operatori di incremento/decremento**: Possono rendere il codice meno leggibile, specialmente quando usati all'interno di espressioni complesse.

5. **Verifica i risultati con valori speciali**: Operazioni con `NaN`, `Infinity` o `-Infinity` possono produrre risultati inaspettati.

```javascript
// Esempio di buona pratica con parentesi
let formula = (a + b) * (c / d);

// Verifica prima della divisione
if (divisore !== 0) {
  let risultato = numeratore / divisore;
}
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al prossimo: Operatori di Confronto](./02_Operatori_Confronto.md)