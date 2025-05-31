# Guida: Espressioni Condizionali (Operatore Ternario)

L'operatore condizionale (o ternario) in JavaScript è un modo conciso per scrivere istruzioni `if...else` semplici. È l'unico operatore JavaScript che accetta tre operandi: una condizione seguita da un punto interrogativo (`?`), quindi un'espressione da eseguire se la condizione è `truthy`, seguita da due punti (`:`), e infine un'espressione da eseguire se la condizione è `falsy`.

## Sintassi

```javascript
condizione ? espressioneSeVera : espressioneSeFalsa;
```

**Come funziona:**
1. `condizione`: Un'espressione che viene valutata come `true` (o truthy) o `false` (o falsy).
2. `espressioneSeVera`: Se `condizione` è `truthy`, questa espressione viene eseguita (e il suo valore diventa il risultato dell'operatore ternario).
3. `espressioneSeFalsa`: Se `condizione` è `falsy`, questa espressione viene eseguita (e il suo valore diventa il risultato dell'operatore ternario).

## Esempio di Base

```javascript
let eta = 20;
let tipoAccesso = (eta >= 18) ? "Adulto" : "Minorenne";

console.log(tipoAccesso); // Output: Adulto

let altraEta = 15;
let altroTipoAccesso = (altraEta >= 18) ? "Adulto" : "Minorenne";
console.log(altroTipoAccesso); // Output: Minorenne
```
Questo è equivalente a:
```javascript
let eta = 20;
let tipoAccesso;
if (eta >= 18) {
  tipoAccesso = "Adulto";
} else {
  tipoAccesso = "Minorenne";
}
```

## Esempio con EV3: Regolazione Velocità Motore

Supponiamo di voler regolare la velocità di un motore in base alla distanza rilevata da un sensore ultrasonico. Se l'ostacolo è vicino, il motore va piano; altrimenti, va più veloce.

```javascript
let distanza = sensors.ultrasonic1.distance(); // Distanza in cm

// Imposta la velocità del motore A in base alla distanza
// Se la distanza è < 30 cm, velocità = 20, altrimenti velocità = 60
let velocitaMotore = (distanza < 30) ? 20 : 60;

motors.largeA.run(velocitaMotore);
brick.showString("Velocità: " + velocitaMotore, 1);

// Potremmo anche usarlo direttamente nella chiamata del motore
motors.largeB.run((sensors.ultrasonic1.distance() < 15) ? 10 : 75);

```
In questo caso, l'operatore ternario permette di assegnare `velocitaMotore` in una singola riga, rendendo il codice più compatto.

## Vantaggi

- **Concisenza:** Può rendere il codice più breve e, in alcuni casi, più leggibile, specialmente per assegnazioni condizionali semplici.
- **Espressioni, non Istruzioni:** L'operatore ternario è un'espressione, il che significa che restituisce un valore. Questo lo rende utile in contesti dove è attesa un'espressione, come l'assegnazione di variabili o l'interno di template literal.

## Svantaggi e Quando Evitarlo

- **Leggibilità per Condizioni Complesse:** Se la `condizione`, `espressioneSeVera`, o `espressioneSeFalsa` diventano molto complesse o lunghe, l'operatore ternario può diventare difficile da leggere. In questi casi, una struttura `if...else` tradizionale è preferibile.
- **Nidificazione:** È possibile nidificare operatori ternari, ma questo porta rapidamente a codice molto difficile da comprendere e mantenere. È fortemente sconsigliato.

**Esempio di nidificazione (da evitare):**
```javascript
let punteggio = 75;
let risultato = (punteggio > 90) ? "Eccellente" :
                (punteggio > 70) ? "Buono" :
                (punteggio > 50) ? "Sufficiente" : "Insufficiente";
// Anche se funziona, un if/else if/else sarebbe più chiaro qui.
```

## Utilizzo con Funzioni EV3

L'operatore ternario può essere utile per decidere quale parametro passare a una funzione EV3 o quale funzione chiamare.

```javascript
let sensoreTattoPremuto = sensors.touch1.isPressed();

// Mostra un messaggio diverso a seconda dello stato del sensore
brick.showString(sensoreTattoPremuto ? "Premuto!" : "Rilasciato", 2);

// Esegue un suono diverso
brick.sound(sensoreTattoPremuto ? Note.C5 : Note.G4, 100);

// Controlla la direzione di un motore
let direzione = (sensors.color1.reflectedLightIntensity() > 50) ? 1 : -1; // 1 per avanti, -1 per indietro
motors.largeA.run(50 * direzione); // Velocità positiva o negativa
```

## Conclusione

L'operatore condizionale ternario è uno strumento utile nel toolkit di un programmatore JavaScript per scrivere codice condizionale conciso. Tuttavia, la sua leggibilità diminuisce con l'aumentare della complessità. Usalo con giudizio, privilegiando la chiarezza del codice soprattutto quando lavori con logiche più elaborate, come spesso accade nella programmazione di robot.

---

[⬅️ Torna alle Guide del Modulo 03](./README.md) | [🔙 Torna al Modulo 03](../README.md) | [🏠 Torna alla Home del Corso](../../README.md)