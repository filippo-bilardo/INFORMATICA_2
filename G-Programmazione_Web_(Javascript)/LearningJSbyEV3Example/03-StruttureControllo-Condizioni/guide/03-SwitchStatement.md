# Guida: Lo Statement `switch`

Lo statement `switch` in JavaScript fornisce un modo elegante per eseguire blocchi di codice diversi in base al valore di una singola espressione. È spesso un'alternativa più leggibile a una lunga catena di istruzioni `if...else if...else` quando si confronta una variabile con più valori possibili.

## Sintassi di Base

```javascript
switch (espressione) {
  case valore1:
    // codice da eseguire se espressione === valore1
    break;
  case valore2:
    // codice da eseguire se espressione === valore2
    break;
  // ... altri casi
  default:
    // codice da eseguire se espressione non corrisponde a nessun caso
}
```

**Come funziona:**
1. L'`espressione` viene valutata una sola volta.
2. Il valore dell'`espressione` viene confrontato (usando un confronto stretto `===`) con il valore di ciascun `case`.
3. Se viene trovata una corrispondenza, il blocco di codice associato a quel `case` viene eseguito.
4. L'istruzione `break` è cruciale: termina l'esecuzione dello `switch`. Se `break` viene omesso, l'esecuzione continuerà con il `case` successivo (fall-through), indipendentemente dal fatto che la sua condizione corrisponda o meno. Questo comportamento può essere utile in alcuni scenari specifici, ma spesso è fonte di bug se non intenzionale.
5. Il blocco `default` è opzionale. Viene eseguito se nessun `case` corrisponde al valore dell'`espressione`. È buona pratica includerlo per gestire situazioni impreviste.

## Esempio con EV3: Selezione Modalità Robot

Immaginiamo di voler impostare diverse modalità operative per il nostro robot EV3 in base a un input, ad esempio un numero letto da un file o inserito dall'utente (simulato qui con una variabile).

```javascript
let modalitaOperativa = 2; // Potrebbe venire da un sensore, un input utente, ecc.

switch (modalitaOperativa) {
  case 1:
    brick.showString("Modalità: Esplorazione", 1);
    // Codice per far muovere il robot in modalità esplorazione
    motors.largeBC.run(40); // Muovi avanti lentamente
    // ... logica di esplorazione ...
    break;
  case 2:
    brick.showString("Modalità: Sorveglianza", 1);
    // Codice per la modalità sorveglianza
    motors.largeBC.stop();
    brick.sound(Note.A4, 200);
    // ... logica di sorveglianza, es. ruotare sensore ...
    break;
  case 3:
    brick.showString("Modalità: Ritorno Base", 1);
    // Codice per far tornare il robot alla base
    // ... logica di ritorno ...
    break;
  default:
    brick.showString("Modalità non valida!", 1);
    brick.sound(Note.C3, 500, SoundVolume.Loud);
    break;
}
```
In questo esempio:
- Se `modalitaOperativa` è `1`, il robot entra in modalità esplorazione.
- Se `modalitaOperativa` è `2`, entra in modalità sorveglianza.
- Se `modalitaOperativa` è `3`, tenta di tornare alla base.
- Per qualsiasi altro valore, mostra un messaggio di errore.

## Raggruppamento di `case` (Fall-through Intenzionale)

A volte, si desidera che più valori di `case` eseguano lo stesso blocco di codice. Questo si può ottenere omettendo `break` per i casi che devono "cadere" nel successivo.

**Esempio con EV3: Reazione a Colori Simili**

```javascript
let coloreRilevato = sensors.color1.color();

switch (coloreRilevato) {
  case Color.Red:
  case Color.Orange: // Tratta l'arancione come il rosso per lo stop
    brick.showString("STOP! (Rosso/Arancione)", 2);
    motors.stopAll();
    brick.setStatusLight(StatusLight.RedFlash);
    break;
  case Color.Green:
    brick.showString("VIA! (Verde)", 2);
    motors.largeBC.run(60);
    brick.setStatusLight(StatusLight.Green);
    break;
  case Color.Blue:
  case Color.Violet: // Tratta il viola come il blu per un'azione specifica
    brick.showString("Azione Blu/Viola", 2);
    motors.mediumA.run(50, 180, MoveUnit.Degrees);
    brick.setStatusLight(StatusLight.BluePulse);
    break;
  default:
    brick.showString("Colore non gestito", 2);
    brick.setStatusLight(StatusLight.Orange);
    break;
}
```
Qui, se `coloreRilevato` è `Color.Red` o `Color.Orange`, viene eseguito lo stesso blocco di codice. Lo stesso vale per `Color.Blue` e `Color.Violet`.

## Confronto con `if...else if...else`

- **Leggibilità:** Per un gran numero di condizioni basate sullo stesso valore, `switch` è generalmente più leggibile.
- **Tipo di Confronto:** `switch` usa un confronto stretto (`===`). Se hai bisogno di confronti più complessi (es. `valore > 10 && valore < 20`), `if...else if` è più flessibile.
- **Valutazione dell'Espressione:** L'espressione in `switch` viene valutata una sola volta, il che può essere leggermente più efficiente se l'espressione è complessa rispetto a valutarla ripetutamente in più `if`.

## Considerazioni per EV3

- **Input dei Sensori:** Lo `switch` è ottimo per gestire diversi stati o valori restituiti dai sensori EV3 (es. `sensor.colorN.color()`, `sensor.touchN.isPressed()`, valori numerici da sensori ultrasonici o di luce dopo una categorizzazione).
- **Menu Utente:** Se stai creando un semplice menu sul display dell'EV3 dove l'utente seleziona un'opzione (es. premendo pulsanti diversi), `switch` può gestire le diverse scelte.

Lo statement `switch` è uno strumento utile per rendere il codice più organizzato e facile da capire quando si gestiscono multiple condizioni discrete basate su un singolo valore.

---

[⬅️ Torna alle Guide del Modulo 03](./README.md) | [🔙 Torna al Modulo 03](../README.md) | [🏠 Torna alla Home del Corso](../../README.md)