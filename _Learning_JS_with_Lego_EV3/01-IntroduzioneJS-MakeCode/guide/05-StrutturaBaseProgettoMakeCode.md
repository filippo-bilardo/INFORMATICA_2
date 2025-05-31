# Guida 5: Struttura di Base di un Progetto MakeCode per EV3

## Introduzione

Quando inizi un nuovo progetto in MakeCode per LEGO Mindstorms EV3, l'ambiente ti fornisce una struttura di base e alcuni file predefiniti. Comprendere questa struttura è fondamentale per organizzare il tuo codice JavaScript e utilizzare le funzionalità dell'EV3 in modo efficace.

## L'Interfaccia di MakeCode

L'ambiente MakeCode è diviso in diverse sezioni principali:

1.  **Simulatore EV3**: Sulla sinistra, un simulatore visualizza un brick EV3 virtuale, motori e sensori. Puoi interagire con il simulatore per testare il tuo codice senza un robot fisico.
2.  **Toolbox delle Categorie di Blocchi**: Al centro (nella vista Blocchi) o a sinistra (nella vista JavaScript), trovi le categorie di blocchi (es. `Loops`, `Logic`, `Variables`, `Brick`, `Motors`, `Sensors`). Cliccando su una categoria, espandi i blocchi o le API JavaScript disponibili.
3.  **Area di Lavoro**: L'area principale dove trascini i blocchi o scrivi il codice JavaScript.
4.  **Barra dei Comandi Superiore**:
    *   **Home**: Torna alla pagina principale di MakeCode.
    *   **Share**: Per condividere il tuo progetto.
    *   **Blocchi/JavaScript**: Per passare dalla vista a blocchi a quella testuale JavaScript e viceversa.
    *   **Aiuto (?)**: Link alla documentazione e tutorial.
    *   **Impostazioni (Ingranaggio)**: Opzioni per il linguaggio, estensioni, ecc.
    *   **Download**: Per trasferire il programma compilato sul brick EV3 fisico.

## File Principali di un Progetto

Anche se MakeCode astrae gran parte della gestione dei file, è utile sapere che dietro le quinte ci sono dei file che compongono il tuo progetto. Quando lavori in JavaScript, il codice principale risiede tipicamente in un file chiamato `main.ts` (TypeScript, che viene poi compilato in JavaScript) o `main.js`.

### `main.ts` o `main.js`

Questo è il file dove scriverai la maggior parte del tuo codice JavaScript. All'inizio, potrebbe contenere solo commenti o un blocco `basic.showString("Hello!")` se hai iniziato con un template.

```javascript
// Il tuo codice JavaScript va qui

// Esempio: mostra un'icona all'avvio
brick.showIcon(IconName.Heart, 1);

// Esempio: fai suonare una nota quando premi un pulsante
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    brick.sound(Sound.PlayTone(262, 200)); // Do centrale per 200ms
});

// Esempio: muovi un motore
motors.largeA.run(50); // Avvia il motore A al 50% della velocità
pause(1000);          // Attendi 1 secondo
motors.largeA.stop();   // Ferma il motore A
```

### `pxt.json` (File di Configurazione del Progetto)

Ogni progetto MakeCode ha un file `pxt.json` che definisce le sue proprietà, dipendenze (estensioni) e altre impostazioni. Normalmente non modifichi questo file direttamente tramite l'editor JavaScript, ma viene gestito da MakeCode quando aggiungi estensioni o cambi impostazioni del progetto.

Un esempio semplificato di `pxt.json` potrebbe assomigliare a questo:

```json
{
    "name": "Il Mio Progetto EV3",
    "dependencies": {
        "core": "*",
        "brick": "*",
        "motors": "*",
        "sensors": "*"
        // Altre estensioni potrebbero essere elencate qui
    },
    "description": "Un semplice progetto EV3",
    "files": [
        "main.blocks", // Se usi i blocchi
        "main.ts",     // Il tuo codice TypeScript/JavaScript
        "README.md"    // Un file README per descrivere il progetto
    ],
    "preferredEditor": "tsprj"
}
```

*   **`name`**: Il nome del tuo progetto.
*   **`dependencies`**: Elenca i pacchetti o le librerie necessarie. `core`, `brick`, `motors`, `sensors` sono tipicamente inclusi per i progetti EV3.
*   **`files`**: I file principali del progetto.

### Estensioni

MakeCode permette di aggiungere "Estensioni" per sbloccare funzionalità aggiuntive o blocchi/API per hardware specifico (es. sensori di terze parti). Quando aggiungi un'estensione, questa viene registrata nel file `pxt.json`.

Puoi aggiungere estensioni cliccando sull'icona dell'ingranaggio > "Estensioni".

## Flusso di Esecuzione di Base

1.  **Inizializzazione**: Quando il programma parte sul brick EV3 (o nel simulatore), il codice globale in `main.js` viene eseguito dall'alto verso il basso.
2.  **Registrazione degli Eventi**: Funzioni come `brick.buttonEnter.onEvent(...)` o `sensors.touch1.onEvent(...)` non eseguono immediatamente il codice al loro interno. Invece, registrano una "funzione di callback" che verrà chiamata *solo quando* l'evento specificato si verifica (es. pressione del pulsante).
3.  **Loop degli Eventi**: MakeCode (e il firmware EV3) gestisce un loop degli eventi invisibile che monitora costantemente le sorgenti di eventi (pulsanti, sensori, timer, messaggi Bluetooth).
4.  **Esecuzione dei Gestori di Eventi**: Quando un evento viene rilevato, il loop degli eventi invoca la funzione di callback associata.
5.  **Codice Sequenziale e Parallelo**: Puoi avere codice che viene eseguito sequenzialmente e blocchi `control.runInParallel(function() { ... })` che permettono a porzioni di codice di funzionare in modo apparentemente simultaneo.

## Organizzare il Tuo Codice

Man mano che i tuoi progetti diventano più complessi, considera questi suggerimenti per organizzare il codice:

*   **Funzioni**: Raggruppa blocchi di codice riutilizzabili in funzioni.
*   **Commenti**: Aggiungi commenti per spiegare cosa fa il tuo codice.
*   **Variabili con Nomi Significativi**: Usa nomi descrittivi per le tue variabili.
*   **Modularità**: Se il progetto è molto grande, potresti volerlo suddividere logicamente, anche se MakeCode per EV3 tende a mantenere la maggior parte del codice in `main.js` a meno che non si creino estensioni personalizzate (un argomento più avanzato).

## Conclusione

Comprendere la struttura di base di un progetto MakeCode, il ruolo del file `main.js` e come funziona il modello guidato dagli eventi ti aiuterà a scrivere programmi JavaScript più efficaci e organizzati per il tuo robot LEGO EV3. Inizia con esperimenti semplici e gradualmente esplora le diverse API disponibili per motori, sensori e interazioni con il brick.

---

[Torna all'elenco delle Guide del Modulo 1](./README.md)

[Torna al Modulo 1](../README.md)

[Torna alla Home del Corso](../../README.md)