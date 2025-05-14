# Guida 1: Configurazione di MakeCode per EV3

## Introduzione

Questa guida ti mostrerà come configurare l'ambiente MakeCode per programmare il tuo robot Lego Mindstorms EV3. MakeCode è un ambiente di sviluppo online che permette di programmare sia visualmente (con blocchi) che direttamente in JavaScript.

## Requisiti

- Un dispositivo con browser web (Chrome, Edge, Firefox o Safari)
- Un robot Lego Mindstorms EV3
- Connessione a internet

## Accesso a MakeCode for EV3

1. Apri il tuo browser e vai all'indirizzo: [https://makecode.mindstorms.com/](https://makecode.mindstorms.com/)
2. La pagina iniziale presenterà diverse opzioni. Per iniziare un nuovo progetto, clicca su "New Project".

## Configurazione della connessione con il robot EV3

Esistono due modi principali per collegare MakeCode al tuo robot EV3:

### Metodo 1: Connessione USB

1. Collega il tuo EV3 al computer tramite cavo USB
2. Accendi il robot EV3
3. In MakeCode, clicca sull'icona "..." nell'angolo in alto a destra
4. Seleziona "Connect device"
5. Scegli "USB" tra le opzioni disponibili
6. Segui le istruzioni a schermo per completare la connessione

### Metodo 2: Download del file .uf2

1. Sviluppa il tuo programma in MakeCode
2. Clicca su "Download" nell'angolo in basso a destra
3. Salva il file .uf2 sul tuo computer
4. Collega il robot EV3 al computer tramite USB
5. Trascina il file .uf2 sul drive del EV3 (apparirà come un dispositivo di archiviazione)
6. Attendi il completamento del trasferimento
7. Il programma si avvierà automaticamente sul robot

## Passaggio da Blocchi a JavaScript

MakeCode offre due modalità di programmazione: Blocchi e JavaScript. Puoi passare facilmente tra le due:

1. In alto nell'editor, troverai due schede: "Blocks" e "JavaScript"
2. Clicca su "JavaScript" per vedere e modificare il codice corrispondente ai blocchi
3. Ogni modifica fatta in una modalità si rifletterà automaticamente nell'altra

## Test e Debug

Prima di caricare il programma sul robot, puoi testarlo nel simulatore:

1. Il simulatore si trova sulla destra dell'editor
2. Clicca su "Play" per eseguire il programma nel simulatore
3. Puoi interagire con i sensori simulati per testare il comportamento del programma

## Salvataggio del Progetto

1. Clicca sull'icona di salvataggio o premi Ctrl+S (Cmd+S su Mac)
2. Assegna un nome al tuo progetto
3. Il progetto verrà salvato nel cloud di MakeCode e sarà accessibile dal tuo account

## Risoluzione dei problemi comuni

### Il robot non viene rilevato via USB

- Assicurati che il robot sia acceso
- Prova a scollegare e ricollegare il cavo USB
- Riavvia il browser o il computer
- Verifica che il firmware del robot sia aggiornato

### Errori durante il caricamento del programma

- Controlla che il robot abbia spazio sufficiente in memoria
- Verifica che la batteria del robot sia sufficientemente carica
- Riavvia il robot e riprova

---

[⬅️ Torna all'indice delle guide](./README.md) | [🔙 Torna al Modulo 01](../README.md)
