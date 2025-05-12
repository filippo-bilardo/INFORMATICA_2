// Esercizio: Controllo Avanzato di un Robot EV3 tramite Comandi JSON Complessi

// Contesto:
// Devi sviluppare un sistema per controllare un robot EV3 che riceve comandi complessi
// in formato JSON. Questi comandi possono includere sequenze di azioni, condizioni
// e la gestione di dati dei sensori.

// Obiettivo:
// 1. Definire una struttura dati JavaScript per rappresentare i comandi del robot.
//    Questa struttura dovrebbe essere un array di oggetti, dove ogni oggetto rappresenta
//    un comando o una configurazione.
// 2. Implementare una funzione `eseguiComandiRobot(jsonComandi)` che:
//    a. Prende una stringa JSON `jsonComandi` come input.
//    b. Parsa la stringa JSON in un array di oggetti comando.
//    c. Itera attraverso i comandi e simula la loro esecuzione.
//       - Per ogni comando, stampa sulla console una descrizione dell'azione.
//       - Gestisci diversi tipi di comandi (es. 'muovi', 'ruota', 'leggiSensore', 'attendi', 'loop').
//       - I comandi 'loop' dovrebbero contenere un sotto-array di comandi da ripetere.
//    d. Gestisce eventuali errori durante il parsing del JSON o l'esecuzione dei comandi.
// 3. Implementare una funzione `generaReportStato(robot)` che:
//    a. Prende un oggetto `robot` (che potrebbe contenere lo stato attuale del robot,
//       come posizione, valori dei sensori, ecc.) come input.
//    b. Serializza l'oggetto `robot` in una stringa JSON formattata.
//    c. Restituisce la stringa JSON.
// 4. Creare una stringa JSON di esempio `comandiMissioneComplessaJson` che includa:
//    - Almeno 5 comandi diversi.
//    - Almeno un comando 'loop' che ripeta una sequenza di 2 o più azioni per 3 volte.
//    - Comandi con parametri (es. distanza, angolo, nomeSensore).
// 5. Simulare uno stato del robot `statoRobotAttuale` (un oggetto JavaScript).
// 6. Testare le funzioni:
//    a. Chiamare `eseguiComandiRobot` con `comandiMissioneComplessaJson`.
//    b. Chiamare `generaReportStato` con `statoRobotAttuale` e stampare il risultato.

// --- Inizio Codice Studente ---

// 1. (Opzionale) Definizione della struttura dati per i comandi (puoi definirla implicitamente nel JSON)
// Non è strettamente necessario definire una classe o un'interfaccia formale in JavaScript
// per la struttura dei comandi se si lavora direttamente con oggetti letterali,
// ma è fondamentale avere una convenzione chiara su come i comandi JSON saranno strutturati.
// Ad esempio, ogni comando potrebbe essere un oggetto con una proprietà 'tipo' (stringa)
// e una proprietà 'parametri' (oggetto).

// 2. Funzione eseguiComandiRobot
/**
 * Esegue una serie di comandi per il robot forniti come stringa JSON.
 * @param {string} jsonComandi - Una stringa JSON che rappresenta un array di comandi.
 */
function eseguiComandiRobot(jsonComandi) {
    console.log("\n--- ESECUZIONE COMANDI ROBOT ---");
    try {
        // JSON.parse(): Converte la stringa JSON in un oggetto/array JavaScript.
        // È cruciale che jsonComandi sia una stringa JSON valida, altrimenti verrà lanciato un errore.
        const comandi = JSON.parse(jsonComandi);

        // Validazione: Controlla se il risultato del parsing è effettivamente un array.
        // Questo è importante perché ci aspettiamo una lista di comandi.
        if (!Array.isArray(comandi)) {
            throw new Error("Il JSON fornito non rappresenta un array di comandi.");
        }

        /**
         * Processa un singolo comando dell'array.
         * @param {object} comando - L'oggetto comando da processare.
         */
        function processaComando(comando) {
            // Ogni 'comando' è un OGGETTO JavaScript con proprietà specifiche.
            // La proprietà 'tipo' (stringa) determina l'azione da eseguire.
            console.log(`Processo comando: ${comando.tipo}`);
            switch (comando.tipo) {
                case "muovi":
                    // 'comando.parametri' è un OGGETTO che contiene i dettagli specifici per l'azione 'muovi'.
                    console.log(`  Azione: Muovi ${comando.direzione || 'avanti'} di ${comando.parametri.distanza} ${comando.parametri.unita || 'cm'} a velocità ${comando.parametri.velocita || 'normale'}.`);
                    // Qui, in un'applicazione reale, ci sarebbe la logica per inviare il comando al motore dell'EV3.
                    break;
                case "ruota":
                    console.log(`  Azione: Ruota di ${comando.parametri.angolo} gradi verso ${comando.parametri.direzione}.`);
                    // Logica di simulazione/esecuzione rotazione.
                    break;
                case "leggiSensore":
                    console.log(`  Azione: Leggi valore dal sensore ${comando.parametri.nomeSensore}.`);
                    // Simula la lettura di un valore da un sensore.
                    // In un sistema reale, si interagirebbe con l'hardware del sensore EV3.
                    return Math.random() * 100; // Valore casuale simulato
                case "attendi":
                    console.log(`  Azione: Attendi per ${comando.parametri.tempoMs} millisecondi.`);
                    // Logica di simulazione/esecuzione attesa.
                    break;
                case "loop":
                    // Il comando 'loop' dimostra una struttura dati più complessa:
                    // 'comando.parametri.volte' specifica il numero di ripetizioni.
                    // 'comando.comandiInterni' è un ARRAY di OGGETTI comando, che verranno eseguiti in sequenza ad ogni iterazione.
                    console.log(`  Azione: Inizio loop, ${comando.parametri.volte} ripetizioni.`);
                    for (let i = 0; i < comando.parametri.volte; i++) {
                        console.log(`    Iterazione loop ${i + 1} di ${comando.parametri.volte}`);
                        // Verifica che 'comandiInterni' esista e sia un array prima di iterare.
                        if (comando.comandiInterni && Array.isArray(comando.comandiInterni)) {
                            // Ricorsione o iterazione sui comandi interni al loop.
                            comando.comandiInterni.forEach(cmdInterno => processaComando(cmdInterno));
                        }
                    }
                    console.log(`  Azione: Fine loop.`);
                    break;
                case "configura":
                    console.log(`  Azione: Configura parametro '${comando.parametro}' a '${comando.valore}'.`);
                    // Logica per impostare parametri di configurazione del robot.
                    break;
                default:
                    console.warn(`  Comando non riconosciuto: ${comando.tipo}`);
            }
        }

        // Itera sull'ARRAY 'comandi' usando forEach.
        // 'comando' in ogni iterazione è un singolo OGGETTO comando dall'array.
        comandi.forEach(comando => processaComando(comando));

    } catch (error) {
        // Gestione degli errori che possono verificarsi durante JSON.parse() o nel processamento dei comandi.
        console.error(`Errore durante l'esecuzione dei comandi: ${error.message}`);
        // In un'applicazione reale, potrebbe essere utile loggare error.stack per un debug più dettagliato.
    }
}

// 3. Funzione generaReportStato
/**
 * Genera un report dello stato attuale del robot in formato JSON.
 * @param {object} robot - Un oggetto JavaScript che rappresenta lo stato del robot.
 * @returns {string|null} Una stringa JSON formattata del report, o null in caso di errore.
 */
function generaReportStato(robot) {
    console.log("\n--- GENERAZIONE REPORT STATO ROBOT ---");
    try {
        // JSON.stringify(): Converte l'OGGETTO JavaScript 'robot' in una stringa JSON.
        // Il terzo argomento '2' formatta la stringa JSON con un'indentazione di 2 spazi per una migliore leggibilità.
        const reportJson = JSON.stringify(robot, null, 2);
        return reportJson;
    } catch (error) {
        // Gestione degli errori che possono verificarsi durante JSON.stringify() (raro per oggetti semplici, ma buona pratica).
        console.error(`Errore durante la generazione del report di stato: ${error.message}`);
        return null;
    }
}

// 4. Stringa JSON di esempio per comandi complessi
// Questa è una stringa che rappresenta un ARRAY di OGGETTI comando.
// Nota la sintassi JSON: chiavi e stringhe tra doppi apici, nessuna virgola finale.
const comandiMissioneComplessaJson = `
[
    {
        "tipo": "configura",
        "parametro": "unitaDistanzaDefault",
        "valore": "cm"
    },
    {
        "tipo": "muovi",
        "direzione": "avanti",
        "parametri": { "distanza": 50, "velocita": 70 }
    },
    {
        "tipo": "ruota",
        "parametri": { "angolo": 90, "direzione": "sinistra" }
    },
    {
        "tipo": "leggiSensore",
        "parametri": { "nomeSensore": "ultrasuoni_frontale" }
    },
    {
        "tipo": "loop",
        "parametri": { "volte": 3 },
        "comandiInterni": [
            { "tipo": "muovi", "direzione": "avanti", "parametri": { "distanza": 10 } },
            { "tipo": "attendi", "parametri": { "tempoMs": 500 } }
        ]
    },
    {
        "tipo": "muovi",
        "direzione": "indietro",
        "parametri": { "distanza": 20, "unita": "passi" }
    }
]
`;

// 5. Stato del robot di esempio
// Questo è un OGGETTO JavaScript che rappresenta lo stato simulato del robot.
// Contiene varie proprietà, inclusi altri OGGETTI annidati (es. 'posizione', 'sensori')
// e un ARRAY ('logErroriRecenti').
const statoRobotAttuale = {
    idRobot: "EV3-Delta-007",
    posizione: { x: 10, y: 25, z: 0, unita: "cm" }, // Oggetto annidato per la posizione
    orientamentoGradi: 90, // Rispetto all'asse X positivo
    livelloBatteriaPercento: 85,
    sensori: { // Oggetto annidato per i dati dei sensori
        ultrasuoni_frontale: { valore: 35, unita: "cm", timestamp: new Date().toISOString() },
        colore_inferiore: { valore: "rosso", modalita: "colore", timestamp: new Date().toISOString() }
    },
    missioneCorrente: "Pattugliamento Settore Gamma",
    logErroriRecenti: [] // Array per memorizzare eventuali log di errori
};

// 6. Test delle funzioni
console.log("--- INIZIO SIMULAZIONE CONTROLLO ROBOT ---");

// Chiamata alla funzione per eseguire i comandi definiti nella stringa JSON.
eseguiComandiRobot(comandiMissioneComplessaJson);

// Chiamata alla funzione per generare il report di stato basato sull'oggetto 'statoRobotAttuale'.
const report = generaReportStato(statoRobotAttuale);
if (report) {
    console.log("\nReport Stato Robot (JSON):");
    console.log(report); // Stampa la stringa JSON del report.
}

console.log("\n--- FINE SIMULAZIONE CONTROLLO ROBOT ---");

// --- Fine Codice Studente ---

// Per eseguire questo script:
// 1. Salva il file come controllo_avanzato_robot.js
// 2. Apri un terminale nella cartella dove hai salvato il file.
// 3. Esegui il comando: node controllo_avanzato_robot.js
//    (Assicurati di avere Node.js installato sul tuo sistema)

// Sfide aggiuntive (opzionali):
// - Aggiungi la gestione di comandi condizionali (es. 'ifSensore').
//   Questo richiederebbe di estendere la logica in `processaComando` e la struttura dei comandi JSON.
// - Implementa una funzione 'reviver' per `JSON.parse` per convertire automaticamente
//   le stringhe di data/ora in oggetti Date durante il caricamento dello stato del robot.
//   (Vedi documentazione di JSON.parse per l'argomento 'reviver').
// - Crea una funzione per validare la struttura dei comandi JSON prima dell'esecuzione.
//   Questo può aiutare a prevenire errori dovuti a JSON malformati o comandi non validi.
// - Simula la scrittura e la lettura dei comandi e dello stato da/a file fittizi (usando stringhe).
//   Questo implicherebbe l'uso di `JSON.stringify` per "salvare" e `JSON.parse` per "caricare".