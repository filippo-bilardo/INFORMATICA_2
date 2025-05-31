# Guida: Funzioni di Callback in JavaScript

Una funzione di callback è una funzione che viene passata come argomento a un'altra funzione, con l'intenzione di essere "richiamata" (eseguita) in un momento successivo, solitamente dopo il completamento di un'operazione asincrona o di un evento.

Le callback sono un concetto fondamentale in JavaScript, specialmente per la gestione di operazioni che non bloccano il thread principale, come richieste HTTP, eventi utente (click, mouseover), timer, e interazioni con hardware come i sensori EV3.

## Come Funzionano le Callback

L'idea di base è semplice:
1.  Si definisce una funzione (la callback) che contiene il codice da eseguire quando un certo evento accade o un'operazione è completata.
2.  Si passa questa funzione come argomento a un'altra funzione (la funzione di ordine superiore) che si occuperà di invocare la callback al momento opportuno.

```javascript
// Funzione di ordine superiore che accetta una callback
function eseguiOperazione(parametro, callback) {
  console.log("Inizio operazione con: " + parametro);
  // Simula un'operazione che richiede tempo
  setTimeout(function() {
    let risultato = "Risultato dell'operazione con " + parametro;
    callback(risultato); // Chiama la callback passando il risultato
  }, 1000);
}

// Definiamo la nostra funzione di callback
function gestisciRisultato(dati) {
  console.log("Callback eseguita! Dati ricevuti: " + dati);
}

// Passiamo 'gestisciRisultato' come callback a 'eseguiOperazione'
eseguiOperazione("input test", gestisciRisultato);

console.log("Operazione avviata, in attesa della callback...");

/* Output atteso (l'ordine può variare leggermente a causa di setTimeout):
Inizio operazione con: input test
Operazione avviata, in attesa della callback...
(dopo circa 1 secondo)
Callback eseguita! Dati ricevuti: Risultato dell'operazione con input test
*/
```

## Tipi Comuni di Callback

### 1. Callback Sincrone

Le callback sincrone vengono eseguite immediatamente durante l'esecuzione della funzione di ordine superiore. Un esempio comune è l'uso di callback con metodi di array come `map`, `filter`, `forEach`.

```javascript
const numeri = [1, 2, 3, 4, 5];

// 'map' accetta una callback che viene eseguita per ogni elemento dell'array
const numeriRaddoppiati = numeri.map(function(numero) {
  return numero * 2;
});
console.log(numeriRaddoppiati); // Output: [2, 4, 6, 8, 10]

// Usando una arrow function (più concisa)
const numeriTriplicati = numeri.map(numero => numero * 3);
console.log(numeriTriplicati); // Output: [3, 6, 9, 12, 15]
```
In questo caso, la callback `numero => numero * 3` è eseguita sincronicamente per ogni elemento dell'array `numeri`.

### 2. Callback Asincrone

Le callback asincrone vengono eseguite in un momento successivo, dopo che un'operazione non bloccante è stata completata. Questo è il caso d'uso più tipico e potente delle callback.

Esempi includono:
-   **Timer**: `setTimeout`, `setInterval`
    ```javascript
    setTimeout(() => {
      console.log("Questo messaggio appare dopo 2 secondi.");
    }, 2000);
    ```
-   **Event Listener**: Gestione di eventi DOM (es. click di un pulsante)
    ```javascript
    // In un ambiente browser
    // document.getElementById("mioBottone").addEventListener("click", function() {
    //   console.log("Bottone cliccato!");
    // });
    ```
-   **Richieste di Rete (AJAX/Fetch)**: Gestione delle risposte da un server.
-   **Operazioni su File System (in Node.js)**.

## "Callback Hell" o "Pyramid of Doom"

Quando si hanno molte operazioni asincrone che dipendono l'una dall'altra, l'uso intensivo di callback annidate può portare a un codice difficile da leggere e mantenere, noto come "Callback Hell" o "Pyramid of Doom".

```javascript
// Esempio di Callback Hell (struttura piramidale)
operazione1(datiIniziali, function(risultato1) {
  operazione2(risultato1, function(risultato2) {
    operazione3(risultato2, function(risultato3) {
      // ... e così via
      console.log("Risultato finale: " + risultato3);
    }, erroreCallback);
  }, erroreCallback);
}, erroreCallback);

function erroreCallback(errore) {
  console.error("Si è verificato un errore: ", errore);
}
```

Per mitigare questo problema, sono state introdotte tecniche più moderne come le **Promises** e la sintassi **async/await** (che sono costruite sopra le Promises).

## Vantaggi delle Callback

-   **Asincronicità**: Permettono di eseguire operazioni lunghe senza bloccare il thread principale, mantenendo l'applicazione reattiva.
-   **Modularità**: Consentono di separare la logica di un'operazione dalla logica di cosa fare dopo il suo completamento.
-   **Flessibilità**: Una singola funzione di ordine superiore può comportarsi in modi diversi a seconda della callback che le viene passata.

## Applicazione nel Contesto EV3 con MakeCode

Le callback sono fondamentali per la programmazione reattiva dei robot EV3. MakeCode (e l'API JavaScript sottostante per EV3, se disponibile) utilizza ampiamente le callback per gestire:

-   **Eventi dei Sensori**: Reagire quando un sensore rileva qualcosa (es. sensore tattile premuto, sensore di colore rileva un colore specifico, sensore a ultrasuoni rileva un ostacolo).

    ```javascript
    // Esempio concettuale per EV3 (la sintassi API di MakeCode può variare)

    // Registra una callback per l'evento 'onPressed' del sensore tattile sulla porta 1
    sensors.touch1.onPressed(() => {
      brick.showString("Sensore Tattile Premuto!", 2);
      motors.largeAB.run(50, 360, MoveUnit.Degrees); // Muovi i motori
    });

    // Registra una callback per il sensore di colore sulla porta 3
    // che si attiva quando rileva il colore rosso
    sensors.color3.onColorDetected(ColorSensorColor.Red, () => {
      brick.showString("Colore Rosso Rilevato!", 3);
      motors.stopAll();
      brick.soundEvent(SoundEvent.Error);
    });
    ```

-   **Eventi dei Pulsanti del Brick EV3**: Eseguire azioni quando i pulsanti sul mattoncino EV3 vengono premuti.

    ```javascript
    // Esempio concettuale
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
      brick.showString("Pulsante Invio Premuto!", 4);
      // Avvia una sequenza di azioni
    });
    ```

-   **Completamento di Azioni Motorie**: Alcune API motorie potrebbero accettare callback da eseguire una volta che un movimento è completato (anche se spesso i movimenti sono bloccanti o gestiti con `pause`).

L'uso di callback in MakeCode permette al robot di essere **guidato dagli eventi** (event-driven). Invece di controllare costantemente lo stato dei sensori in un ciclo, si definisce cosa fare *quando* un evento specifico si verifica. Questo porta a programmi più efficienti e reattivi.

Ad esempio, invece di:
```javascript
// Approccio con polling (controllo continuo)
forever(() => {
  if (sensors.touch1.isPressed()) {
    // fai qualcosa
  }
  if (sensors.color3.color() === ColorSensorColor.Red) {
    // fai qualcos'altro
  }
  pause(20); // piccolo ritardo per non sovraccaricare la CPU
});
```

Si usa l'approccio event-driven con callback:
```javascript
// Approccio event-driven con callback
sensors.touch1.onPressed(() => {
  // fai qualcosa quando il sensore tattile è premuto
});

sensors.color3.onColorDetected(ColorSensorColor.Red, () => {
  // fai qualcos'altro quando il colore rosso è rilevato
});
```

Questo rende il codice più pulito, più facile da gestire e più efficiente, poiché il codice viene eseguito solo quando è necessario.

Comprendere le callback è essenziale per sfruttare appieno le capacità interattive e reattive del robot Lego EV3 quando si programma in JavaScript con MakeCode.

---

[⬅️ Torna alle Guide del Modulo 05](./README.md)
[🏡 Torna all'Indice del Corso](../../../README.md)