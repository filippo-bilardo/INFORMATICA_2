# Guida 4: Iterazione in JavaScript (Cicli)

## Introduzione all'Iterazione

L'iterazione, o ciclare, è il processo di ripetere un blocco di codice più volte. In JavaScript, come in molti altri linguaggi di programmazione, i cicli sono fondamentali per eseguire compiti ripetitivi, come elaborare tutti gli elementi di un array, leggere dati da un sensore finché non si verifica una condizione, o eseguire una sequenza di azioni un numero determinato di volte. Per la programmazione dell'EV3, i cicli sono essenziali per creare comportamenti complessi e reattivi.

## Tipi Comuni di Cicli

### 1. Ciclo `for`

Il ciclo `for` è ideale quando si conosce in anticipo il numero di iterazioni da eseguire.

**Sintassi:**
```javascript
for (inizializzazione; condizione; incremento) {
    // Blocco di codice da eseguire
}
```
-   `inizializzazione`: Eseguita una sola volta prima dell'inizio del ciclo (es. `let i = 0`).
-   `condizione`: Valutata prima di ogni iterazione. Se `true`, il blocco di codice viene eseguito. Se `false`, il ciclo termina.
-   `incremento`: Eseguito alla fine di ogni iterazione (es. `i++`).

**Esempio con EV3:** Far lampeggiare un LED 5 volte (concettuale, l'EV3 non ha LED utente diretti, ma si può usare il suono o il display).
```javascript
// Supponiamo di avere una funzione brick.sound(freq, duration)
for (let i = 0; i < 5; i++) {
    brick.sound(440, 200); // Emette un suono
    control.pause(300);     // Pausa
    console.log(`Lampeggio (suono) numero: ${i + 1}`);
}
```

**Iterare su Array con `for`:**
```javascript
let lettureDistanza = [30, 25, 35, 28, 40];
for (let i = 0; i < lettureDistanza.length; i++) {
    console.log(`Lettura ${i}: ${lettureDistanza[i]} cm`);
    // Qui potresti fare qualcosa con ogni lettura, es. controllare se è < soglia
}
```

### 2. Ciclo `while`

Il ciclo `while` esegue un blocco di codice finché una condizione specificata è `true`.

**Sintassi:**
```javascript
while (condizione) {
    // Blocco di codice da eseguire
}
```
La condizione viene valutata *prima* di ogni iterazione.

**Esempio con EV3:** Muovere il robot in avanti finché il sensore di distanza rileva un ostacolo a meno di 20 cm.
```javascript
let distanza = sensors.ultrasonic1.distance(); // Legge la distanza iniziale

while (distanza > 20) {
    motors.largeA.run(50); // Muovi motore A (es. ruota sinistra)
    motors.largeB.run(50); // Muovi motore B (es. ruota destra)
    control.pause(100); // Piccola pausa per permettere il movimento e nuova lettura
    distanza = sensors.ultrasonic1.distance(); // Aggiorna la lettura della distanza
    console.log(`Distanza attuale: ${distanza} cm`);
}
motors.stopAll(); // Ferma i motori quando l'ostacolo è vicino
console.log("Ostacolo rilevato! Robot fermo.");
```
**Attenzione:** È cruciale che la condizione del `while` possa diventare `false` all'interno del ciclo, altrimenti si crea un ciclo infinito.

### 3. Ciclo `do...while`

Simile al `while`, ma il blocco di codice viene eseguito almeno una volta, perché la condizione viene valutata *dopo* l'esecuzione del blocco.

**Sintassi:**
```javascript
do {
    // Blocco di codice da eseguire
} while (condizione);
```

**Esempio con EV3:** Chiedere all'utente di premere un pulsante per avviare un'azione, e continuare a controllare finché non viene premuto.
```javascript
let pulsantePremuto = false;
do {
    console.log("Premi il pulsante centrale per continuare...");
    // In un ambiente EV3 reale, qui si controllerebbe lo stato del pulsante.
    // Simuliamo che dopo un po' venga premuto:
    // pulsantePremuto = brick.buttonEnter.isPressed(); // Esempio API EV3
    control.pause(500);
    // Per questo esempio, lo impostiamo a true dopo un paio di iterazioni simulate
    if (Math.random() < 0.3) { // Simula la pressione casuale per l'esempio
        pulsantePremuto = true;
    }
} while (!pulsantePremuto);

console.log("Pulsante premuto! Avvio azione...");
```

### 4. Ciclo `for...of` (per iterare su oggetti iterabili come Array, String, Map, Set)

Introdotto in ES6, il ciclo `for...of` fornisce un modo più semplice per iterare sugli elementi di collezioni iterabili.

**Sintassi:**
```javascript
for (const elemento of collezione) {
    // Blocco di codice da eseguire con 'elemento'
}
```

**Esempio con EV3 (Array):** Eseguire una sequenza di rotazioni del motore.
```javascript
let sequenzaAngoli = [90, -90, 180, 45];
for (const angolo of sequenzaAngoli) {
    motors.mediumC.run(30, angolo, "degrees"); // Ruota il motore C dell'angolo specificato
    control.pauseUntilIdle(motors.mediumC); // Attendi che il motore completi il movimento
    console.log(`Motore ruotato di ${angolo} gradi.`);
}
console.log("Sequenza di rotazioni completata.");
```

### 5. Ciclo `for...in` (per iterare sulle proprietà enumerabili di un oggetto)

Il ciclo `for...in` itera sulle chiavi (nomi delle proprietà) di un oggetto.

**Sintassi:**
```javascript
for (const chiave in oggetto) {
    // Blocco di codice da eseguire con 'chiave'
    // Per accedere al valore: oggetto[chiave]
}
```

**Esempio con EV3:** Visualizzare la configurazione di un sensore.
```javascript
let configurazioneSensoreColore = {
    porta: "in1",
    modalita: "ColoreRiflesso",
    valoreMinimo: 5,
    valoreMassimo: 95
};

console.log("Configurazione Sensore Colore:");
for (const proprieta in configurazioneSensoreColore) {
    if (configurazioneSensoreColore.hasOwnProperty(proprieta)) { // Buona pratica!
        console.log(`- ${proprieta}: ${configurazioneSensoreColore[proprieta]}`);
    }
}
/* Output:
Configurazione Sensore Colore:
- porta: in1
- modalita: ColoreRiflesso
- valoreMinimo: 5
- valoreMassimo: 95
*/
```
**Nota:** `hasOwnProperty(proprieta)` è usato per assicurarsi che si stia iterando solo sulle proprietà dirette dell'oggetto, e non su quelle ereditate dalla sua catena di prototipi.

## Controllo del Flusso dei Cicli

-   **`break`**: Termina immediatamente il ciclo corrente (o `switch`).
    ```javascript
    let numeri = [1, 5, 10, 15, -2, 20];
    for (const num of numeri) {
        if (num < 0) {
            console.log("Trovato numero negativo, interrompo.");
            break; // Esce dal ciclo for...of
        }
        console.log(num);
    }
    ```

-   **`continue`**: Salta l'iterazione corrente e passa alla successiva.
    ```javascript
    let datiSensore = [10, 12, 0, 15, 8, 0, 11]; // 0 potrebbe essere una lettura non valida
    for (const lettura of datiSensore) {
        if (lettura === 0) {
            console.log("Lettura non valida (0), la salto.");
            continue; // Salta il resto del blocco e va alla prossima lettura
        }
        console.log(`Processo la lettura: ${lettura}`);
    }
    ```

## Scegliere il Ciclo Giusto

-   Usa `for` quando sai quante volte devi iterare.
-   Usa `while` quando l'iterazione dipende da una condizione che può cambiare durante l'esecuzione e non sai quante iterazioni serviranno.
-   Usa `do...while` quando vuoi che il blocco di codice sia eseguito almeno una volta.
-   Usa `for...of` per iterare facilmente sugli elementi di array e altre collezioni iterabili.
-   Usa `for...in` per iterare sulle proprietà di oggetti.

## Conclusione

I cicli sono strumenti potenti per controllare il flusso di esecuzione dei tuoi programmi EV3. Permettono di automatizzare compiti ripetitivi, rispondere a input continui dai sensori e creare sequenze complesse di azioni. Una buona comprensione dei diversi tipi di cicli e di come controllarli ti aiuterà a scrivere codice JavaScript più efficiente ed efficace per il tuo robot.

---

[⬅️ Torna all'elenco delle Guide](./README.md) | [➡️ Vai alla Guida Successiva: JSON](./05-JSON.md)