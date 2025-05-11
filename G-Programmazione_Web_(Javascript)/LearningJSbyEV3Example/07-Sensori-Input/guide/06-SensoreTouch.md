# Guida 6: Il Sensore di Contatto (Touch Sensor)

Il sensore di contatto (Touch Sensor) dell'EV3 è uno dei sensori più semplici ma estremamente utili. Permette al robot di rilevare il contatto fisico con oggetti nel suo ambiente.

## Funzionamento di Base

*   **Rilevamento Pressione**: Il sensore ha un pulsante rosso sulla sua estremità. Quando questo pulsante viene premuto contro un oggetto o una superficie, il sensore registra l'evento.
*   **Stati Rilevabili**: Il sensore può distinguere principalmente tre stati:
    1.  **Rilasciato (Released)**: Il pulsante non è premuto.
    2.  **Premuto (Pressed)**: Il pulsante è attualmente premuto.
    3.  **Sbattutto/Toccato (Bumped)**: Rileva un ciclo completo di pressione e rilascio. Questo è utile per contare il numero di volte che il sensore viene toccato, anche se la pressione è breve.

## Utilizzo in MakeCode (JavaScript)

MakeCode fornisce blocchi e API JavaScript per interagire con il sensore di contatto.

**Esempio per verificare se il sensore è premuto:**

```javascript
// Assumendo che il sensore di contatto sia collegato alla porta 1
if (sensors.touch1.isPressed()) {
    brick.showString("Sensore Premuto!", 1);
    // Ferma i motori o esegui un'altra azione
    motors.largeBC.stop();
} else {
    brick.showString("Sensore Rilasciato", 1);
}
```

**Esempio per rilevare un evento "Bumped" (toccato e rilasciato):**

MakeCode gestisce gli eventi "bumped" spesso attraverso gestori di eventi specifici o controllando un cambiamento di stato che indica un ciclo di pressione/rilascio. La capacità di contare i "bump" potrebbe essere implementata manualmente o tramite blocchi specifici.

```javascript
// Assumendo che il sensore di contatto sia collegato alla porta 1
// Questo blocco si attiva ogni volta che il sensore viene premuto e poi rilasciato
sensors.touch1.onEvent(SensorEvent.Bumped, function () {
    brick.showString("Sensore Toccato!", 2);
    // Incrementa un contatore o cambia direzione
});

// Per un conteggio manuale dei bump, potresti dover gestire lo stato precedente:
let contatoreBump = 0;
let eraPremuto = false;

forever(function() {
    let attualmentePremuto = sensors.touch1.isPressed();
    if (eraPremuto && !attualmentePremuto) {
        // È avvenuto un rilascio dopo una pressione -> Bump!
        contatoreBump++;
        brick.showString("Bump n.: " + contatoreBump, 3);
    }
    eraPremuto = attualmentePremuto;
    pause(20); // Piccola pausa per non sovraccaricare il processore
});
```
*Nota: L'API esatta per `SensorEvent.Bumped` o il conteggio dei bump potrebbe variare. Controlla la documentazione di MakeCode per EV3 per l'implementazione specifica.* 

## Considerazioni Pratiche

*   **Forza di Attivazione**: Il sensore richiede una certa forza per essere attivato. Oggetti molto leggeri potrebbero non premerlo a sufficienza.
*   **Montaggio**: Il modo in cui il sensore è montato sul robot è cruciale. Deve essere posizionato in modo da entrare in contatto con gli ostacoli che si desidera rilevare (es. frontalmente per i muri, lateralmente per i bordi).
*   **Debouncing**: In alcuni casi, specialmente con contatti rapidi o instabili, potrebbe essere necessario implementare una logica di "debouncing" per evitare letture multiple per un singolo evento di pressione. MakeCode spesso gestisce questo internamente per gli eventi `Bumped`.
*   **Durabilità**: Anche se robusto, evitare impatti eccessivamente violenti per preservare la vita del sensore.

## Applicazioni Comuni

*   **Rilevamento Ostacoli**: La più comune. Il robot si muove finché non tocca un ostacolo, quindi si ferma, indietreggia o cambia direzione.
*   **Interruttori di Limite**: Usato per rilevare quando una parte mobile del robot ha raggiunto la fine della sua corsa.
*   **Input Utente**: Il sensore può essere usato come un semplice pulsante per avviare o fermare un programma, o per selezionare opzioni.
*   **Contatore di Eventi**: Contare quante volte il robot tocca un muro in un labirinto.
*   **Robot "Sumo"**: Rilevare il contatto con un avversario.

Il sensore di contatto è un componente fondamentale per dare ai robot EV3 una percezione tattile del loro ambiente, consentendo reazioni dirette e immediate agli ostacoli fisici.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)