# Guida: Operatori di Confronto e Logici

Gli operatori di confronto e logici sono essenziali per costruire espressioni condizionali complesse in JavaScript. Permettono di confrontare valori e combinare più condizioni per controllare il flusso del programma.

## Operatori di Confronto

Gli operatori di confronto vengono utilizzati per comparare due valori e restituiscono un valore booleano (`true` o `false`).

| Operatore | Descrizione                      | Esempio (`a = 5`, `b = 10`) | Risultato |
| :-------- | :------------------------------- | :-------------------------- | :-------- |
| `==`      | Uguale a (valore)                | `a == 5`                    | `true`    |
|           |                                  | `a == "5"`                  | `true`    |
| `===`     | Strettamente uguale a (valore e tipo) | `a === 5`                   | `true`    |
|           |                                  | `a === "5"`                 | `false`   |
| `!=`      | Diverso da (valore)              | `a != 10`                   | `true`    |
|           |                                  | `a != "5"`                  | `false`   |
| `!==`     | Strettamente diverso da (valore e tipo) | `a !== 10`                  | `true`    |
|           |                                  | `a !== "5"`                 | `true`    |
| `>`       | Maggiore di                      | `b > a`                     | `true`    |
| `<`       | Minore di                        | `a < b`                     | `true`    |
| `>=`      | Maggiore o uguale a              | `a >= 5`                    | `true`    |
| `<=`      | Minore o uguale a                | `b <= 10`                   | `true`    |

**Esempio con EV3:**
```javascript
let distanza = sensors.ultrasonic1.distance(); // Distanza in cm

if (distanza < 20) {
  brick.showString("Ostacolo Vicino!", 2);
  motors.largeBC.steer(-50, 50, 1, MoveUnit.Rotations); // Gira
} else {
  motors.largeBC.run(50); // Vai avanti
}
```
In questo esempio, il robot EV3 controlla la distanza da un ostacolo. Se la distanza è minore di 20 cm, mostra un messaggio e gira; altrimenti, continua ad andare avanti.

**Nota su `==` vs `===`:**
È buona pratica utilizzare l'operatore di uguaglianza stretta (`===`) e di disuguaglianza stretta (`!==`) per evitare conversioni di tipo implicite che potrebbero portare a comportamenti inaspettati. `==` confronta solo i valori dopo aver tentato di convertirli allo stesso tipo, mentre `===` confronta sia i valori che i tipi.

## Operatori Logici

Gli operatori logici vengono utilizzati per combinare due o più espressioni booleane.

| Operatore | Descrizione                                     | Esempio (`x = true`, `y = false`) | Risultato |
| :-------- | :---------------------------------------------- | :-------------------------------- | :-------- |
| `&&`      | AND Logico (vero se entrambe le espressioni sono vere) | `x && y`                          | `false`   |
| `||`      | OR Logico (vero se almeno una espressione è vera) | `x || y`                          | `true`    |
| `!`       | NOT Logico (inverte il valore booleano)         | `!y`                              | `true`    |

**Esempio con EV3:**
```javascript
let sensoreLuce = sensors.color1.reflectedLightIntensity(); // Intensità luce riflessa (0-100)
let pulsantePremuto = sensors.touch1.isPressed();

// Il robot si muove solo se c'è abbastanza luce E il pulsante è premuto
if (sensoreLuce > 50 && pulsantePremuto) {
  brick.showString("Condizioni OK: Muovo!", 1);
  motors.largeA.run(75, 720, MoveUnit.Degrees);
} else if (sensoreLuce <= 50 && pulsantePremuto) {
  brick.showString("Poca luce, ma pulsante premuto.", 1);
} else if (sensoreLuce > 50 && !pulsantePremuto) {
  brick.showString("Luce OK, ma pulsante non premuto.", 1);
} else {
  brick.showString("Condizioni non soddisfatte.", 1);
  motors.largeA.stop();
}

// Il robot suona se il sensore di luce rileva buio OPPURE il pulsante è premuto
if (sensoreLuce < 30 || pulsantePremuto) {
  brick.sound(Note.E4, 150);
  brick.showString("Attenzione! (Buio o Pulsante)", 3);
}
```

**Ordine di Valutazione (Short-Circuiting):**
- **`&&` (AND):** Se la prima espressione è `false`, la seconda non viene valutata (perché il risultato sarà comunque `false`).
- **`||` (OR):** Se la prima espressione è `true`, la seconda non viene valutata (perché il risultato sarà comunque `true`).
Questo comportamento, noto come "short-circuiting", può essere utile per evitare errori, ad esempio controllando se un oggetto esiste prima di accedere a una sua proprietà:
```javascript
let myObject = null;
// Questo non darà errore grazie allo short-circuiting
if (myObject && myObject.property) {
  console.log("Proprietà accessibile");
}
```

## Combinare Operatori

Puoi combinare più operatori di confronto e logici per creare condizioni complesse. È spesso utile usare le parentesi `()` per chiarire l'ordine di valutazione, anche se JavaScript ha regole di precedenza definite.

**Esempio con EV3:**
```javascript
let temperatura = sensors.infrared1.ambientTemperature(); // Temperatura ambiente
let distanzaOggetto = sensors.infrared1.distance(InfraredSensorMode.Proximity); // Distanza da un oggetto
let batteria = brick.batteryLevel();

// Il robot esegue un'azione speciale se la temperatura è alta E
// (l'oggetto è vicino OPPURE la batteria è scarica)
if (temperatura > 30 && (distanzaOggetto < 15 || batteria < 20)) {
  brick.setStatusLight(StatusLight.RedFlash);
  brick.sound(Note.CSharp5, 500, SoundVolume.Loud);
  brick.showString("ALLARME!", 1);
  motors.stopAll();
} else {
  brick.setStatusLight(StatusLight.Green);
  brick.showString("Tutto normale", 1);
}
```

Comprendere e utilizzare correttamente gli operatori di confronto e logici è cruciale per scrivere codice JavaScript che possa reagire in modo intelligente e flessibile a diverse situazioni, specialmente nella programmazione di robot come l'EV3 che interagiscono con un ambiente dinamico.

---

[⬅️ Torna alle Guide del Modulo 03](./README.md) | [🔙 Torna al Modulo 03](../README.md) | [🏠 Torna alla Home del Corso](../../README.md)