# Guida 2: I Pulsanti del Brick EV3

Il brick EV3 è dotato di un set di pulsanti fisici che forniscono un metodo diretto per l'interazione utente. Questi pulsanti possono essere utilizzati per avviare o fermare programmi, navigare menu, selezionare opzioni o attivare specifiche funzionalità del robot.

## Pulsanti Disponibili

Il brick EV3 ha sei pulsanti principali:

1.  **Pulsante Centrale (Enter/Select)**: Di forma quadrata, solitamente usato per confermare una selezione o avviare un'azione.
2.  **Pulsanti Freccia (Su, Giù, Sinistra, Destra)**: Utilizzati per la navigazione (es. in un menu) o per incrementare/decrementare valori.
3.  **Pulsante Indietro (Back/Escape)**: Utilizzato per tornare alla schermata precedente, annullare un'azione o uscire da un menu/programma.

## Utilizzo in MakeCode (JavaScript)

MakeCode permette di rilevare la pressione, il rilascio o il "click" (pressione seguita da rilascio) di ciascun pulsante tramite gestori di eventi o controllando direttamente lo stato del pulsante.

### Programmazione Guidata dagli Eventi

Questo è l'approccio più comune e reattivo.

```javascript
// Evento per la pressione del pulsante Enter
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Enter Premuto!", 3);
    // Esegui un'azione
});

// Evento per il click del pulsante Su (premuto e rilasciato)
brick.buttonUp.onEvent(ButtonEvent.Clicked, function () {
    brick.showString("Up Cliccato!", 4);
    // Naviga verso l'alto in un menu
});

// Evento per il rilascio del pulsante Giù
brick.buttonDown.onEvent(ButtonEvent.Released, function () {
    brick.showString("Down Rilasciato!", 5);
});

// Puoi registrare gestori per:
// ButtonEvent.Pressed  (quando il pulsante viene premuto)
// ButtonEvent.Released (quando il pulsante viene rilasciato)
// ButtonEvent.Clicked  (un ciclo completo di pressione e rilascio)
// ButtonEvent.Bumped   (sinonimo di Clicked per i pulsanti del brick)
```

### Controllo Diretto dello Stato (Polling)

È anche possibile controllare lo stato di un pulsante in un ciclo, sebbene sia meno efficiente per la maggior parte delle applicazioni.

```javascript
forever(function () {
    if (brick.buttonLeft.isPressed()) {
        brick.showString("Left è premuto ora", 6);
    } else {
        // brick.showString("Left non è premuto", 6); // Potrebbe sfarfallare
    }
    pause(50); // Pausa per evitare di sovraccaricare il processore
});
```

## Considerazioni Pratiche

*   **Debouncing**: I pulsanti fisici possono talvolta generare segnali multipli per una singola pressione a causa di rimbalzi meccanici. MakeCode generalmente gestisce il "debouncing" internamente per gli eventi `Clicked` o `Bumped`, fornendo una singola rilevazione per una tipica interazione dell'utente.
*   **Risposta Immediata vs. Azioni Prolungate**: Per azioni che devono continuare finché un pulsante è premuto (es. muovere un motore), l'evento `Pressed` e `Released` sono più appropriati. Per azioni singole (es. selezionare un'opzione), `Clicked` è spesso la scelta migliore.
*   **Combinazione di Pulsanti**: È possibile rilevare la pressione simultanea di più pulsanti controllando il loro stato in un ciclo, ma la gestione degli eventi per combinazioni dirette non è solitamente fornita come evento singolo.

## Applicazioni Comuni

*   **Avvio/Arresto di Programmi**: Usare il pulsante Enter o Back.
*   **Navigazione di Menu**: Usare i pulsanti freccia per spostarsi tra le opzioni e Enter per selezionare.
*   **Controllo Manuale del Robot**: Usare le frecce per muovere il robot in diverse direzioni.
*   **Selezione di Modalità**: Cambiare il comportamento del robot premendo un pulsante.
*   **Incremento/Decremento Valori**: Modificare parametri come velocità o sensibilità.

I pulsanti del brick EV3 sono l'interfaccia di input primaria e più diretta per interagire con i tuoi programmi e robot.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 08](../README.md)
[Torna alla Home del Corso](../../../README.md)