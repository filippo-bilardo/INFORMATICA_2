# Primo Collegamento al Robot

In questo modulo, imparerai come stabilire la prima connessione tra il tuo computer e il robot Lego Mindstorms EV3, e come caricare e eseguire un semplice programma di test.

## Preparazione del Robot EV3

Prima di tentare la connessione, assicurati che:

1. **Il brick EV3 sia acceso**:
   - Premi il pulsante centrale (Enter) per accendere il brick
   - Attendi che il sistema operativo si avvii completamente

2. **La batteria sia sufficientemente carica**:
   - Verifica l'indicatore della batteria nell'angolo in alto a destra del display del brick
   - Se è necessario, sostituisci le batterie o ricarica la batteria ricaricabile

3. **I cavi dei motori e dei sensori siano collegati correttamente**:
   - Motori: porte di output (A, B, C, D)
   - Sensori: porte di input (1, 2, 3, 4)

## Collegamento Fisico via USB

1. **Collega un'estremità del cavo USB al brick EV3**:
   - La porta USB si trova accanto alla porta mini-USB host (sono diverse, fai attenzione a usare quella corretta)

2. **Collega l'altra estremità del cavo a una porta USB del tuo computer**:
   - Preferibilmente una porta USB direttamente sulla scheda madre, non attraverso un hub USB
   - Le porte USB 2.0 sono generalmente più affidabili per questo scopo rispetto alle USB 3.0

3. **Attendi che il computer riconosca il dispositivo**:
   - In Windows: potresti vedere un messaggio di installazione driver
   - In macOS/Linux: il dispositivo dovrebbe essere riconosciuto automaticamente

## Connessione tramite MakeCode

Ora che il brick EV3 è fisicamente collegato al computer, stabiliamo la connessione software:

1. **Apri MakeCode for EV3**:
   - Vai a [https://makecode.mindstorms.com/](https://makecode.mindstorms.com/)
   - Oppure avvia l'app MakeCode se l'hai installata

2. **Crea un nuovo progetto o apri il progetto di test**:
   - Dalla pagina iniziale, clicca su "New Project"
   - Assegna un nome al progetto, ad esempio "PrimoCollegamento"

3. **Connetti il brick EV3**:
   - Clicca sul pulsante "..." nell'angolo in alto a destra dell'editor
   - Seleziona "Connect device"
   - Clicca su "Connect" accanto alla voce "USB"
   - Si aprirà una finestra di dialogo per selezionare il dispositivo
   - Seleziona il tuo brick EV3 dall'elenco e clicca "Connect"
   - Se richiesto, autorizza l'accesso al dispositivo

4. **Verifica la connessione**:
   - Se la connessione è riuscita, vedrai un'icona di connessione nell'angolo in alto a destra
   - Il pulsante "Download" cambierà aspetto per indicare che puoi caricare direttamente sul brick

## Creazione di un Programma di Test

Creiamo un semplice programma per verificare che la connessione funzioni correttamente:

1. **Passa alla modalità JavaScript**:
   - Clicca sulla scheda "JavaScript" nella parte superiore dell'editor

2. **Inserisci questo codice di esempio**:
   ```javascript
   // Test di connessione per EV3
   
   // Mostra un messaggio di benvenuto sul display
   brick.clearScreen();
   brick.showString("Connessione", 1);
   brick.showString("riuscita!", 2);
   
   // Riproduci un suono di successo
   music.playSoundEffect(SoundEffect.Success);
   
   // Attendi 2 secondi
   pause(2000);
   
   // Fai lampeggiare il LED del brick (verde)
   for (let i = 0; i < 5; i++) {
       brick.setStatusLight(StatusLight.Green);
       pause(500);
       brick.setStatusLight(StatusLight.Off);
       pause(500);
   }
   
   // Messaggio finale
   brick.clearScreen();
   brick.showString("Test completato", 1);
   brick.showString("con successo!", 2);
   ```

## Caricamento del Programma sul Robot

1. **Clicca sul pulsante "Download"**:
   - Se sei connesso via WebUSB, il programma verrà caricato direttamente sul brick
   - Se non sei connesso via WebUSB, verrà scaricato un file .uf2 che dovrai trasferire manualmente al brick

2. **Trasferimento manuale (se necessario)**:
   - Se hai scaricato un file .uf2, il brick EV3 apparirà come un dispositivo di archiviazione USB
   - Trascina il file .uf2 nella cartella principale del dispositivo
   - Attendi che il trasferimento sia completato

3. **Esecuzione del programma**:
   - Il programma dovrebbe avviarsi automaticamente dopo il caricamento
   - Se non si avvia, naviga nel menu del brick EV3 fino a "File Navigation" e seleziona il tuo programma

## Verifica del Funzionamento

Se tutto funziona correttamente:

1. Il display del brick mostrerà il messaggio "Connessione riuscita!"
2. Sentirai un suono di successo dall'altoparlante del brick
3. Il LED di stato del brick lampeggerà in verde cinque volte
4. Infine, il display mostrerà "Test completato con successo!"

Se riscontri problemi, consulta la sezione di risoluzione dei problemi.

## Test dei Motori (Opzionale)

Se hai già assemblato un robot con motori, puoi estendere il test per verificarne il funzionamento:

```javascript
// Test dei motori
// Assicurati che i motori siano collegati alle porte B e C

// Imposta la velocità dei motori
motors.largeBC.setSpeed(50);

// Avanti per 2 secondi
motors.largeBC.run();
pause(2000);

// Stop
motors.largeBC.stop();
pause(1000);

// Indietro per 2 secondi
motors.largeBC.setSpeed(-50);
motors.largeBC.run();
pause(2000);

// Stop finale
motors.largeBC.stop();
```

## Test dei Sensori (Opzionale)

Se hai collegato dei sensori, puoi testarne il funzionamento:

```javascript
// Test del sensore di colore (collegato alla porta 3)
brick.clearScreen();
forever(function() {
    // Leggi e mostra il valore del sensore
    let colorValue = sensors.color3.color();
    brick.showValue("Colore:", colorValue, 1);
    pause(500);
});
```

## Risoluzione dei Problemi di Connessione

### Il brick EV3 non viene rilevato
- Verifica che il cavo USB sia collegato saldamente a entrambe le estremità
- Prova a utilizzare un'altra porta USB del computer
- Riavvia il brick EV3
- Su Windows, verifica che i driver siano installati correttamente

### Errori durante il caricamento
- Verifica che il brick abbia spazio sufficiente in memoria
- Riavvia il browser o l'app MakeCode
- Prova a utilizzare il metodo di trasferimento file manuale

### Il programma non funziona come previsto
- Controlla che i motori e i sensori siano collegati alle porte corrette
- Verifica che il codice sia corretto
- Prova a caricare uno degli esempi predefiniti di MakeCode per verificare se il problema è nel tuo codice

## Conclusione

Congratulazioni! Hai stabilito con successo la connessione con il tuo robot EV3 e hai caricato ed eseguito il tuo primo programma. Questo è il primo passo nel tuo percorso di apprendimento della programmazione JavaScript con il LEGO Mindstorms EV3.

Nel prossimo modulo, inizierai a esplorare i concetti fondamentali di JavaScript e come applicarli nella programmazione del tuo robot.

---

[⬅️ Installazione e configurazione del software](./02-InstallazioneSoftware.md) | [➡️ Risoluzione dei problemi comuni](./04-RisoluzioneProblemi.md)
