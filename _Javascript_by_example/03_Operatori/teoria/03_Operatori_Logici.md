# Operatori Logici in JavaScript

Gli operatori logici in JavaScript permettono di combinare o invertire valori booleani. Sono fondamentali per creare condizioni complesse e prendere decisioni nel codice.

## Operatori Logici Principali

### AND Logico (&&)

L'operatore AND logico restituisce `true` solo se entrambi gli operandi sono `true`.

```javascript
true && true;    // true
true && false;   // false
false && true;   // false
false && false;  // false
```

#### Valutazione a corto circuito

L'operatore `&&` valuta gli operandi da sinistra a destra e si ferma appena trova un valore falsy, restituendo quel valore. Se tutti gli operandi sono truthy, restituisce l'ultimo valore valutato.

```javascript
// Esempi di corto circuito con &&
let a = 0 && "Hello";     // 0 (si ferma al primo valore falsy)
let b = 1 && "Hello";     // "Hello" (entrambi i valori sono truthy)
let c = 1 && 2 && 0 && 3; // 0 (si ferma quando trova 0)
let d = 1 && 2 && 3;      // 3 (tutti i valori sono truthy, restituisce l'ultimo)
```

### OR Logico (||)

L'operatore OR logico restituisce `true` se almeno uno degli operandi è `true`.

```javascript
true || true;    // true
true || false;   // true
false || true;   // true
false || false;  // false
```

#### Valutazione a corto circuito

L'operatore `||` valuta gli operandi da sinistra a destra e si ferma appena trova un valore truthy, restituendo quel valore. Se tutti gli operandi sono falsy, restituisce l'ultimo valore valutato.

```javascript
// Esempi di corto circuito con ||
let a = 0 || "Hello";     // "Hello" (continua fino a trovare un valore truthy)
let b = "" || 0 || null;  // null (tutti i valori sono falsy, restituisce l'ultimo)
let c = "" || 0 || 42;    // 42 (primo valore truthy trovato)
```

### NOT Logico (!)

L'operatore NOT logico inverte il valore booleano dell'operando.

```javascript
!true;     // false
!false;    // true
!0;        // true (0 è falsy, quindi !0 è true)
!1;        // false (1 è truthy, quindi !1 è false)
!"Hello";  // false (stringhe non vuote sono truthy)
!"";       // true (stringhe vuote sono falsy)
```

#### Doppia negazione (!!)

La doppia negazione può essere usata per convertire un valore nel suo equivalente booleano.

```javascript
!!0;        // false
!!1;        // true
!!"Hello";  // true
!!"";       // false
!!null;     // false
!!undefined; // false
```

## Valori Truthy e Falsy

In JavaScript, i valori vengono automaticamente convertiti in booleani quando usati in un contesto booleano (come condizioni o operatori logici).

### Valori Falsy

I seguenti valori sono considerati falsy:

- `false`
- `0`, `-0`, `0n` (BigInt zero)
- `""` (stringa vuota)
- `null`
- `undefined`
- `NaN`

### Valori Truthy

Tutti gli altri valori sono considerati truthy, inclusi:

- `true`
- Numeri diversi da zero
- Stringhe non vuote
- Array (anche vuoti)
- Oggetti (anche vuoti)
- Funzioni

```javascript
// Esempi di valori truthy e falsy in condizioni
if (0) { /* Non viene eseguito */ }
if ("") { /* Non viene eseguito */ }
if (null) { /* Non viene eseguito */ }

if (1) { /* Viene eseguito */ }
if ("Hello") { /* Viene eseguito */ }
if ([]) { /* Viene eseguito */ }
if ({}) { /* Viene eseguito */ }
```

## Combinare Operatori Logici

Gli operatori logici possono essere combinati per creare condizioni complesse.

```javascript
// Esempio: Verifica se un numero è compreso tra 10 e 20
let numero = 15;
let nelRange = numero >= 10 && numero <= 20;  // true

// Esempio: Verifica se un valore è null o undefined
let valore = null;
let èNullOUndefined = valore === null || valore === undefined;  // true

// Alternativa con operatore !
let èDefinito = !(valore === null || valore === undefined);  // false
// Oppure più semplicemente
let èDefinito2 = valore != null;  // false (anche undefined != null è false)
```

## Precedenza degli Operatori

Gli operatori logici hanno la seguente precedenza (dal più alto al più basso):

1. NOT logico (`!`)
2. AND logico (`&&`)
3. OR logico (`||`)

```javascript
// Esempio di precedenza
let risultato = true || false && false;  // true
// Equivalente a: true || (false && false) = true || false = true

// Uso delle parentesi per chiarezza
let risultatoChiaro = true || (false && false);  // true
```

## Operatore Nullish Coalescing (??)

Introdotto in ES2020, l'operatore nullish coalescing (`??`) è simile all'OR logico ma tratta diversamente i valori falsy.

```javascript
// Differenza tra || e ??
let a = 0 || "default";    // "default" (0 è falsy)
let b = 0 ?? "default";    // 0 (?? considera solo null e undefined come "nulli")

let c = "" || "default";   // "default" (stringa vuota è falsy)
let d = "" ?? "default";   // "" (?? mantiene la stringa vuota)

let e = null ?? "default";  // "default"
let f = undefined ?? "default";  // "default"
```

## Best Practices

1. **Usa le parentesi per chiarezza**: Quando combini più operatori logici, usa le parentesi per rendere chiara l'intenzione.

```javascript
// Più chiaro con parentesi
if ((età >= 18 && haPatente) || èAccompagnato) { /* ... */ }
```

2. **Sfrutta il corto circuito per codice conciso**: Il comportamento a corto circuito può essere usato per scrivere codice più conciso.

```javascript
// Assegna un valore predefinito
let nome = inputUtente || "Utente anonimo";

// Esegui una funzione solo se una condizione è vera
condizione && funzione();
```

3. **Usa l'operatore appropriato**: Scegli tra `||` e `??` in base al comportamento desiderato con i valori falsy.

```javascript
// Usa ?? quando 0 o "" sono valori validi
let quantità = inputQuantità ?? 1;
```

4. **Evita effetti collaterali nelle condizioni**: Quando usi operatori a corto circuito, fai attenzione agli effetti collaterali.

```javascript
// Potenziale problema: incremento potrebbe non avvenire
let x = 5;
false && x++;
console.log(x);  // Ancora 5

// Meglio usare un if esplicito per effetti collaterali
if (condizione) {
  x++;
}
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Operatori di Confronto](./02_Operatori_Confronto.md) | [Vai al prossimo: Operatori di Assegnazione](./04_Operatori_Assegnazione.md)