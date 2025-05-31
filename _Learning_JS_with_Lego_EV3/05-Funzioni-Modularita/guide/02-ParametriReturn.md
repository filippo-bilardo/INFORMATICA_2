# Guida: Parametri e Valori di Ritorno nelle Funzioni JavaScript

Le funzioni in JavaScript diventano ancora più potenti e flessibili quando si utilizzano parametri per passare dati al loro interno e valori di ritorno per ottenere risultati da esse.

## Parametri delle Funzioni

I parametri sono variabili elencate nella definizione di una funzione. Quando una funzione viene chiamata, gli argomenti sono i valori effettivi passati alla funzione per quei parametri.

### Definizione con Parametri

```javascript
function salutaPersona(nome, eta) {
  console.log("Ciao, " + nome + "! Hai " + eta + " anni.");
}

// Chiamata con argomenti
salutaPersona("Mario", 30);
// Output: Ciao, Mario! Hai 30 anni.

salutaPersona("Luisa", 25);
// Output: Ciao, Luisa! Hai 25 anni.
```

Nell'esempio sopra, `nome` ed `eta` sono parametri della funzione `salutaPersona`. Quando chiamiamo `salutaPersona("Mario", 30)`, "Mario" e `30` sono gli argomenti passati.

### Parametri di Default (ES6+)

JavaScript permette di definire valori di default per i parametri. Se un argomento non viene fornito per un parametro con un valore di default, verrà utilizzato il valore di default.

```javascript
function creaMessaggio(messaggio, mittente = "Sistema") {
  console.log(mittente + ": " + messaggio);
}

creaMessaggio("Benvenuto utente!");
// Output: Sistema: Benvenuto utente!

creaMessaggio("Errore nel caricamento.", "Applicazione");
// Output: Applicazione: Errore nel caricamento.
```

### Parametro Rest (ES6+)

Il parametro rest (`...nomeParametro`) permette a una funzione di trattare un numero indefinito di argomenti come un array.

```javascript
function sommaTutti(...numeri) {
  let totale = 0;
  for (const num of numeri) {
    totale += num;
  }
  return totale;
}

console.log(sommaTutti(1, 2, 3));       // Output: 6
console.log(sommaTutti(10, 20, 30, 40)); // Output: 100
console.log(sommaTutti());              // Output: 0
```
Il parametro rest deve essere l'ultimo parametro nella lista dei parametri della funzione.

## Valori di Ritorno

Una funzione può restituire un valore al codice che l'ha chiamata utilizzando la keyword `return`.

### Utilizzo di `return`

```javascript
function calcolaAreaRettangolo(larghezza, altezza) {
  const area = larghezza * altezza;
  return area; // Restituisce il valore calcolato
}

let areaCalcolata = calcolaAreaRettangolo(5, 10);
console.log("L'area del rettangolo è: " + areaCalcolata);
// Output: L'area del rettangolo è: 50

let altraArea = calcolaAreaRettangolo(7, 3);
console.log("Un'altra area: " + altraArea);
// Output: Un'altra area: 21
```

Quando l'istruzione `return` viene eseguita, la funzione termina immediatamente la sua esecuzione e il valore specificato viene passato indietro.

### Ritorno Implicito di `undefined`

Se una funzione non ha un'istruzione `return`, o ha un `return` senza un valore, restituisce implicitamente `undefined`.

```javascript
function nonRestituisceNulla() {
  console.log("Questa funzione non ha un return esplicito.");
  // return; // opzionale, stesso effetto
}

let risultato = nonRestituisceNulla();
console.log(risultato); // Output: undefined
```

### Ritorno Multiplo (tramite Oggetti o Array)

JavaScript non supporta direttamente il ritorno di valori multipli come alcune altre lingue. Tuttavia, è possibile ottenere un effetto simile restituendo un oggetto o un array che contiene più valori.

```javascript
function ottieniCoordinate() {
  let x = 10;
  let y = 20;
  let z = 30;
  return { x: x, y: y, z: z }; // Ritorna un oggetto
}

let coordinate = ottieniCoordinate();
console.log("X: " + coordinate.x + ", Y: " + coordinate.y + ", Z: " + coordinate.z);
// Output: X: 10, Y: 20, Z: 30

function ottieniMinMax(numeri) {
  if (numeri.length === 0) return [undefined, undefined];
  let min = Math.min(...numeri);
  let max = Math.max(...numeri);
  return [min, max]; // Ritorna un array
}

let [minimo, massimo] = ottieniMinMax([5, 1, 9, 3, 7]);
console.log("Min: " + minimo + ", Max: " + massimo);
// Output: Min: 1, Max: 9
```

## Applicazione nel Contesto EV3 con MakeCode

Nel programmare il robot EV3, i parametri e i valori di ritorno sono cruciali:

- **Parametri**: Permettono di creare funzioni generiche per controllare il robot. Ad esempio, una funzione `muoviMotore(motore, velocita, tempo)` può accettare il motore da muovere, la velocità e la durata come parametri.

  ```javascript
  // Esempio concettuale per EV3
  function giraRobot(direzione, angolo) {
    // Logica per far girare il robot a destra o sinistra
    // di un certo angolo (utilizzando i parametri)
    if (direzione === "destra") {
      motors.largeBC.steer(50, angolo);
    } else if (direzione === "sinistra") {
      motors.largeBC.steer(-50, angolo);
    }
    pause(1000); // Pausa per completare la rotazione
  }

  giraRobot("destra", 90); // Gira il robot a destra di 90 gradi
  ```

- **Valori di Ritorno**: Utili per funzioni che leggono dati dai sensori o eseguono calcoli. Ad esempio, una funzione `leggiDistanzaSensore()` potrebbe restituire la distanza rilevata dal sensore a ultrasuoni.

  ```javascript
  // Esempio concettuale per EV3
  function distanzaOstacolo() {
    let distanza = sensors.ultrasonic4.distance();
    return distanza; // Ritorna la distanza in cm
  }

  let dist = distanzaOstacolo();
  if (dist < 20) {
    brick.showString("Ostacolo vicino!", 4);
  } else {
    brick.showString("Via libera", 4);
  }
  ```

L'uso efficace di parametri e valori di ritorno rende il codice EV3 più modulare, riutilizzabile e facile da capire, permettendo di costruire comportamenti complessi in modo strutturato.

---

[⬅️ Torna alle Guide del Modulo 05](./README.md)
[🏡 Torna all'Indice del Corso](../../../README.md)