# Cicli Base in JavaScript: for, while, do-while

I cicli sono costrutti fondamentali in JavaScript che permettono di eseguire un blocco di codice ripetutamente fino a quando una condizione specificata è vera. Sono strumenti essenziali per automatizzare compiti ripetitivi e processare collezioni di dati.

## Il Ciclo for

Il ciclo `for` è uno dei costrutti di iterazione più comuni e versatili in JavaScript. È particolarmente utile quando si conosce in anticipo il numero di iterazioni da eseguire.

### Sintassi Base

```javascript
for (inizializzazione; condizione; espressione_finale) {
  // blocco di codice da eseguire
}
```

Dove:
- **inizializzazione**: espressione eseguita una sola volta prima dell'inizio del ciclo
- **condizione**: espressione valutata prima di ogni iterazione; il ciclo continua finché è vera
- **espressione_finale**: espressione eseguita alla fine di ogni iterazione

### Esempio Base

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Iterazione numero: " + i);
}
// Output:
// Iterazione numero: 0
// Iterazione numero: 1
// Iterazione numero: 2
// Iterazione numero: 3
// Iterazione numero: 4
```

### Varianti del Ciclo for

#### Omissione di Parti

È possibile omettere una o più parti della dichiarazione `for`:

```javascript
let i = 0;
for (; i < 5; i++) {
  console.log(i); // Inizializzazione omessa
}

for (let j = 0; j < 5;) {
  console.log(j); // Espressione finale omessa
  j++;
}

let k = 0;
for (;;) {
  if (k >= 5) break; // Tutte le parti omesse, necessario un break
  console.log(k);
  k++;
}
```

#### Cicli Nidificati

I cicli possono essere nidificati uno dentro l'altro:

```javascript
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`i=${i}, j=${j}`);
  }
}
```

## Il Ciclo while

Il ciclo `while` esegue un blocco di codice finché una condizione specificata è vera. È utile quando non si conosce in anticipo il numero di iterazioni.

### Sintassi Base

```javascript
while (condizione) {
  // blocco di codice da eseguire
}
```

### Esempio Base

```javascript
let contatore = 0;
while (contatore < 5) {
  console.log("Contatore: " + contatore);
  contatore++;
}
// Output:
// Contatore: 0
// Contatore: 1
// Contatore: 2
// Contatore: 3
// Contatore: 4
```

### Ciclo Infinito

Se la condizione è sempre vera, si crea un ciclo infinito. È importante assicurarsi che la condizione diventi falsa a un certo punto:

```javascript
// Ciclo infinito (da evitare)
// while (true) {
//   console.log("Questo ciclo non terminerà mai!");
// }

// Ciclo con condizione di uscita
let i = 0;
while (true) {
  console.log(i);
  i++;
  if (i >= 5) break; // Uscita dal ciclo con break
}
```

## Il Ciclo do-while

Il ciclo `do-while` è simile al ciclo `while`, ma con una differenza importante: il blocco di codice viene eseguito almeno una volta, indipendentemente dalla condizione.

### Sintassi Base

```javascript
do {
  // blocco di codice da eseguire
} while (condizione);
```

### Esempio Base

```javascript
let contatore = 0;
do {
  console.log("Contatore: " + contatore);
  contatore++;
} while (contatore < 5);
// Output:
// Contatore: 0
// Contatore: 1
// Contatore: 2
// Contatore: 3
// Contatore: 4
```

### Esecuzione Almeno Una Volta

Anche se la condizione è falsa dall'inizio, il blocco di codice viene eseguito almeno una volta:

```javascript
let x = 10;
do {
  console.log("Questo verrà stampato una volta anche se x > 5");
} while (x < 5);
```

## Controllo del Flusso nei Cicli

### break

L'istruzione `break` termina immediatamente il ciclo corrente:

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Esce dal ciclo quando i è 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

### continue

L'istruzione `continue` salta l'iterazione corrente e passa alla successiva:

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Salta l'iterazione quando i è 2
  }
  console.log(i);
}
// Output: 0, 1, 3, 4
```

### Etichette (Labels)

Le etichette permettono di identificare un ciclo e di utilizzare `break` o `continue` per controllare cicli specifici in strutture nidificate:

```javascript
esterno: for (let i = 0; i < 3; i++) {
  interno: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break esterno; // Esce dal ciclo esterno
    }
    console.log(`i=${i}, j=${j}`);
  }
}
```

## Confronto tra i Cicli

| Ciclo | Quando Usarlo |
|-------|---------------|
| `for` | Quando si conosce il numero di iterazioni in anticipo |
| `while` | Quando la condizione di uscita dipende da fattori che possono cambiare durante l'esecuzione |
| `do-while` | Quando il blocco di codice deve essere eseguito almeno una volta |

## Best Practices

1. **Evitare Cicli Infiniti**: Assicurarsi sempre che ci sia una condizione di uscita.
2. **Prestazioni**: Per grandi collezioni di dati, considerare metodi di array come `forEach`, `map`, `filter` che sono spesso più leggibili ed efficienti.
3. **Leggibilità**: Utilizzare nomi di variabili descrittivi per i contatori e mantenere il corpo del ciclo semplice.
4. **Evitare Modifiche al Contatore**: Evitare di modificare la variabile contatore all'interno del ciclo (tranne che nell'espressione finale).
5. **Preferire for-of e for-in**: Per iterare su array e oggetti, considerare i cicli `for-of` e `for-in` (che vedremo nelle prossime sezioni).

## Conclusione

I cicli base (`for`, `while`, `do-while`) sono strumenti fondamentali in JavaScript per eseguire operazioni ripetitive. La scelta del ciclo più appropriato dipende dal contesto specifico e dalle esigenze del programma. Nelle prossime sezioni, esploreremo metodi più avanzati per iterare su strutture dati specifiche come array e oggetti.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al successivo: Iterazione su Array](./02_Iterazione_Array.md)