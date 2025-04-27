# Operatori di Confronto in JavaScript

Gli operatori di confronto in JavaScript permettono di confrontare valori e restituire un risultato booleano (`true` o `false`). Sono fondamentali per il controllo del flusso nei programmi.

## Operatori di Confronto di Base

### Uguale (==)

L'operatore di uguaglianza confronta due valori dopo aver eseguito la conversione di tipo (se necessaria).

```javascript
5 == 5;          // true
"5" == 5;        // true (la stringa "5" viene convertita in numero)
true == 1;       // true (true viene convertito in 1)
false == 0;      // true (false viene convertito in 0)
null == undefined; // true
```

### Strettamente Uguale (===)

L'operatore di uguaglianza stretta confronta due valori senza eseguire conversioni di tipo.

```javascript
5 === 5;          // true
"5" === 5;        // false (tipi diversi: string vs number)
true === 1;       // false (tipi diversi: boolean vs number)
false === 0;      // false (tipi diversi: boolean vs number)
null === undefined; // false (tipi diversi)
```

### Diverso (!=)

L'operatore di disuguaglianza verifica se due valori non sono uguali dopo la conversione di tipo.

```javascript
5 != 8;          // true
"5" != 5;        // false (dopo la conversione sono uguali)
true != 0;       // true
null != undefined; // false (sono considerati uguali con ==)
```

### Strettamente Diverso (!==)

L'operatore di disuguaglianza stretta verifica se due valori non sono uguali senza eseguire conversioni di tipo.

```javascript
5 !== 8;          // true
"5" !== 5;        // true (tipi diversi)
true !== 1;       // true (tipi diversi)
null !== undefined; // true (tipi diversi)
```

### Maggiore (>)

L'operatore maggiore verifica se il primo valore è maggiore del secondo.

```javascript
10 > 5;           // true
5 > 5;            // false
"10" > 5;         // true (la stringa viene convertita in numero)
"10" > "5";       // false (confronto lessicografico tra stringhe)
```

### Minore (<)

L'operatore minore verifica se il primo valore è minore del secondo.

```javascript
5 < 10;           // true
5 < 5;            // false
"5" < 10;         // true (la stringa viene convertita in numero)
"5" < "10";       // true (confronto lessicografico tra stringhe)
```

### Maggiore o Uguale (>=)

L'operatore maggiore o uguale verifica se il primo valore è maggiore o uguale al secondo.

```javascript
10 >= 5;          // true
5 >= 5;           // true
5 >= 10;          // false
```

### Minore o Uguale (<=)

L'operatore minore o uguale verifica se il primo valore è minore o uguale al secondo.

```javascript
5 <= 10;          // true
5 <= 5;           // true
10 <= 5;          // false
```

## Confronto tra Tipi Diversi

Quando si confrontano valori di tipi diversi, JavaScript segue regole specifiche:

1. **Confronto con numeri**: I valori non numerici vengono convertiti in numeri.
2. **Confronto tra stringhe**: Le stringhe vengono confrontate carattere per carattere in base al loro valore Unicode.
3. **Confronto con booleani**: I booleani vengono convertiti in numeri (true = 1, false = 0).

```javascript
// Esempi di confronto tra tipi diversi
"42" > 41;        // true ("42" viene convertito in 42)
"42" < "43";      // true (confronto lessicografico)
"42" < "430";     // true (confronto lessicografico)
"42" < "5";       // true (confronto lessicografico: "4" viene prima di "5")
```

## Casi Speciali

### Confronto con NaN

`NaN` non è uguale a nessun valore, nemmeno a se stesso.

```javascript
NaN == NaN;        // false
NaN === NaN;       // false
NaN != NaN;        // true
```

### Confronto con null e undefined

```javascript
null == undefined;  // true
null === undefined; // false

null == 0;          // false
undefined == 0;     // false

null >= 0;          // true (null viene convertito in 0)
null > 0;           // false
```

## Operatore di Confronto Nullish (??) (ES2020)

L'operatore nullish coalescing restituisce il secondo operando quando il primo è `null` o `undefined`, altrimenti restituisce il primo operando.

```javascript
let nome = null;
let nomeDefault = nome ?? "Utente";  // "Utente"

let conteggio = 0;
let conteggioDefault = conteggio ?? 10;  // 0 (0 è un valore valido)
```

## Best Practices

1. **Preferisci === e !== a == e !=**: Gli operatori di uguaglianza stretta evitano conversioni di tipo inaspettate.

```javascript
// Meglio
if (valore === 5) { /* ... */ }

// Evita
if (valore == 5) { /* ... */ }
```

2. **Attenzione ai confronti con valori speciali**: Fai attenzione quando confronti con `null`, `undefined`, `NaN` o stringhe vuote.

```javascript
// Verifica esplicita per null o undefined
if (valore === null || valore === undefined) { /* ... */ }

// Oppure con l'operatore nullish (ES2020)
let risultato = valore ?? valorePredefinito;
```

3. **Verifica esplicitamente NaN**: Usa `isNaN()` o `Number.isNaN()` per verificare se un valore è NaN.

```javascript
if (isNaN(valore)) { /* ... */ }       // Converte in numero prima di verificare
if (Number.isNaN(valore)) { /* ... */ } // Non esegue conversioni (più preciso)
```

4. **Comprendi il confronto tra stringhe**: Ricorda che il confronto tra stringhe è lessicografico e sensibile alle maiuscole.

```javascript
// Per confronti non sensibili alle maiuscole
if (stringa1.toLowerCase() === stringa2.toLowerCase()) { /* ... */ }
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Operatori Aritmetici](./01_Operatori_Aritmetici.md) | [Vai al prossimo: Operatori Logici](./03_Operatori_Logici.md)