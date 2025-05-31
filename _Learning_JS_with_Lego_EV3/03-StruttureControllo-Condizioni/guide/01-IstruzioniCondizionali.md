# Guida: Istruzioni Condizionali (`if`, `else if`, `else`)

Le istruzioni condizionali sono fondamentali in JavaScript e in qualsiasi linguaggio di programmazione. Permettono al tuo programma di prendere decisioni e di eseguire blocchi di codice specifici solo se determinate condizioni sono soddisfatte.

## `if`

L'istruzione `if` esegue un blocco di codice se la condizione specificata è vera (truthy).

**Sintassi:**
```javascript
if (condizione) {
  // codice da eseguire se la condizione è vera
}
```

**Esempio con EV3:**
```javascript
// Supponiamo di avere un sensore di contatto collegato alla porta 1
let sensoreTatto = sensors.touch1.isPressed();

if (sensoreTatto) {
  brick.showString("Pulsante Premuto!", 1);
  motors.largeA.run(50, 360, MoveUnit.Degrees);
}
```
In questo esempio, se il sensore di contatto è premuto, il robot mostrerà un messaggio sullo schermo e farà girare il motore A.

## `else`

L'istruzione `else` può essere usata in combinazione con `if` per eseguire un blocco di codice alternativo quando la condizione dell' `if` è falsa (falsy).

**Sintassi:**
```javascript
if (condizione) {
  // codice da eseguire se la condizione è vera
} else {
  // codice da eseguire se la condizione è falsa
}
```

**Esempio con EV3:**
```javascript
let livelloBatteria = brick.batteryLevel();

if (livelloBatteria < 20) {
  brick.showString("Batteria Scarica!", 1);
  brick.sound(Note.C4, 200, SoundVolume.Loud);
} else {
  brick.showString("Batteria OK", 1);
}
```
Qui, il robot controlla il livello della batteria: se è inferiore al 20%, mostra un avviso e suona; altrimenti, indica che la batteria è OK.

## `else if`

L'istruzione `else if` permette di specificare una nuova condizione da testare se la condizione precedente (nell'`if` o in un `else if` precedente) era falsa. Puoi usare quanti `else if` desideri.

**Sintassi:**
```javascript
if (condizione1) {
  // codice da eseguire se condizione1 è vera
} else if (condizione2) {
  // codice da eseguire se condizione1 è falsa e condizione2 è vera
} else {
  // codice da eseguire se tutte le condizioni precedenti sono false
}
```

**Esempio con EV3:**
```javascript
// Sensore di colore sulla porta 3, che rileva il colore della superficie
let coloreRilevato = sensors.color3.color();

if (coloreRilevato === Color.Red) {
  brick.setStatusLight(StatusLight.Red);
  motors.largeA.stop();
  brick.showString("Linea Rossa! Stop!", 1);
} else if (coloreRilevato === Color.Green) {
  brick.setStatusLight(StatusLight.Green);
  motors.largeA.run(50);
  brick.showString("Via Libera!", 1);
} else if (coloreRilevato === Color.Blue) {
  brick.setStatusLight(StatusLight.BluePulse);
  motors.largeA.run(25);
  brick.showString("Attenzione, blu!", 1);
} else {
  brick.setStatusLight(StatusLight.Orange);
  motors.largeA.stop();
  brick.showString("Colore non riconosciuto", 1);
}
```
In questo scenario, il robot reagisce in modi diversi a seconda del colore rilevato dal sensore: si ferma sul rosso, avanza sul verde, rallenta sul blu e si ferma per altri colori.

## Considerazioni Aggiuntive

- **Valori Truthy e Falsy:** In JavaScript, non solo `true` e `false` booleani vengono valutati nelle condizioni. Valori come `0`, `""` (stringa vuota), `null`, `undefined`, e `NaN` sono considerati "falsy", mentre tutti gli altri valori (inclusi oggetti e array, anche se vuoti) sono "truthy".
- **Blocchi di Codice:** È buona pratica usare sempre le parentesi graffe `{}` per i blocchi di codice dentro `if`, `else if`, e `else`, anche se il blocco contiene una sola istruzione. Questo migliora la leggibilità e previene errori.

Le istruzioni condizionali sono uno strumento potente per dare logica e intelligenza ai tuoi programmi EV3. Sperimenta con diverse condizioni e sensori per vedere come puoi far reagire il tuo robot all'ambiente!

---

[⬅️ Torna alle Guide del Modulo 03](./README.md) | [🔙 Torna al Modulo 03](../README.md) | [🏠 Torna alla Home del Corso](../../README.md)