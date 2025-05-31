# Guida 4: Indicatori LED

Il brick EV3 è dotato di un set di LED (Light Emitting Diodes) attorno ai pulsanti che possono essere controllati programmaticamente. Questi LED forniscono un canale di feedback visivo semplice ma efficace, capace di indicare stati, notifiche o semplicemente aggiungere un elemento estetico al comportamento del robot.

## Caratteristiche dei LED del Brick

*   **Posizione**: I LED sono situati attorno ai pulsanti fisici del brick EV3.
*   **Colori**: Possono illuminarsi in tre colori: Verde, Arancione (Ambra), Rosso.
*   **Modalità**: Possono essere impostati su acceso fisso, spento, o lampeggiante (pulsante).

## Utilizzo in MakeCode (JavaScript)

MakeCode, tramite l'oggetto `brick`, permette di controllare lo stato dei LED.

```javascript
// Accende i LED con luce verde fissa
brick.setStatusLight(StatusLight.Green);

// Fa lampeggiare i LED con luce arancione
brick.setStatusLight(StatusLight.OrangePulse);

// Fa lampeggiare i LED con luce rossa
brick.setStatusLight(StatusLight.RedPulse);

// Accende i LED con luce arancione fissa
brick.setStatusLight(StatusLight.Orange);

// Accende i LED con luce rossa fissa
brick.setStatusLight(StatusLight.Red);

// Spegne i LED
brick.setStatusLight(StatusLight.Off);
```

L'enumerazione `StatusLight` solitamente include opzioni come:
*   `Off`: LED spenti.
*   `Green`: LED verdi, accesi fissi.
*   `GreenPulse`: LED verdi, lampeggianti.
*   `Red`: LED rossi, accesi fissi.
*   `RedPulse`: LED rossi, lampeggianti.
*   `Orange`: LED arancioni/ambra, accesi fissi.
*   `OrangePulse`: LED arancioni/ambra, lampeggianti.

## Considerazioni Pratiche

*   **Visibilità**: I LED sono più visibili in condizioni di luce ambientale non eccessiva.
*   **Significato dei Colori**: È buona norma associare colori specifici a significati consistenti. Ad esempio:
    *   **Verde**: Operazione normale, successo, pronto.
    *   **Arancione/Ambra**: Attenzione, processo in corso, attesa.
    *   **Rosso**: Errore, batteria scarica, arresto critico.
*   **Lampeggio**: Il lampeggio attira maggiormente l'attenzione rispetto a una luce fissa. Usalo per notifiche importanti.
*   **Consumo Energetico**: I LED consumano energia. Se la durata della batteria è critica, considera di usarli con parsimonia o di spegnerli quando non necessari.

## Applicazioni Comuni

*   **Indicatore di Stato del Robot**:
    *   Verde fisso: Robot pronto e inattivo.
    *   Verde lampeggiante: Robot in esecuzione di un compito normale.
    *   Arancione fisso/lampeggiante: Robot in attesa di input, in pausa, o in elaborazione.
    *   Rosso fisso/lampeggiante: Errore, batteria critica, ostacolo rilevato.
*   **Feedback per Azioni Utente**: Cambiare colore o far lampeggiare i LED brevemente quando un pulsante del brick viene premuto.
*   **Notifiche**: Segnalare il completamento di un'azione o il raggiungimento di un obiettivo.
*   **Effetti Visivi**: Creare pattern di luci per rendere il robot più espressivo o per giochi.
*   **Debug Semplice**: Usare i LED per indicare quale parte di un programma è in esecuzione, specialmente se il display è usato per altre informazioni.

Gli indicatori LED del brick EV3 sono un modo semplice ed efficace per fornire feedback immediato e intuitivo sullo stato e le operazioni del robot.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 08](../README.md)
[Torna alla Home del Corso](../../../README.md)