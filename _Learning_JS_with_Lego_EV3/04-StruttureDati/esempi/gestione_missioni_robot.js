// Esempio: Gestione di una Sequenza di Missioni per un Robot EV3 utilizzando Array, Oggetti e JSON
// Questo file dimostra come strutturare dati complessi per un robot EV3,
// come le missioni, utilizzando array e oggetti JavaScript, e come serializzare
// e deserializzare questi dati in formato JSON.

// 1. Definizione della struttura dati per le missioni
// Utilizziamo un ARRAY chiamato 'missioniRobot' per contenere più missioni.
// Ogni elemento dell'array è un OGGETTO che rappresenta una singola missione.
// Ciascun oggetto missione ha diverse proprietà (chiave-valore), come:
//  - idMissione: Una stringa identificativa unica per la missione.
//  - nome: Una stringa che descrive il nome della missione.
//  - descrizione: Una stringa con maggiori dettagli sulla missione.
//  - priorita: Una stringa che indica l'urgenza della missione (es. "Alta", "Media", "Bassa").
//  - passaggi: Un ALTRO ARRAY di oggetti, dove ogni oggetto definisce un passo specifico della missione.
//    - Ogni oggetto 'passaggio' ha una proprietà 'azione' (es. "avanza", "ruota")
//      e una proprietà 'parametri' che è un ALTRO OGGETTO contenente i dettagli specifici per quell'azione
//      (es. { distanzaCm: 100, velocita: 50 }).
//  - completata: Un valore booleano (true/false) che indica se la missione è stata completata.

// Inizio dell'array 'missioniRobot'. Ogni elemento racchiuso tra {} è un oggetto missione.
const missioniRobot = [
    {
        idMissione: "M001", // Chiave 'idMissione' con valore stringa "M001"
        nome: "Esplorazione Stanza", // Chiave 'nome' con valore stringa
        descrizione: "Il robot esplora una stanza e mappa gli ostacoli.", // Chiave 'descrizione'
        priorita: "Alta", // Chiave 'priorita'
        passaggi: [ // Chiave 'passaggi', il cui valore è un array di oggetti 'passaggio'
            { azione: "avanza", parametri: { distanzaCm: 100, velocita: 50 } }, // Primo oggetto 'passaggio'
            { azione: "ruota", parametri: { angoloGradi: 90, direzione: "destra" } }, // Secondo oggetto 'passaggio'
            { azione: "scansionaOstacoli", parametri: { raggioMetri: 2 } }, // Terzo oggetto 'passaggio'
            { azione: "avanza", parametri: { distanzaCm: 50, velocita: 50 } },
            { azione: "trasmettiMappa", parametri: { formato: "json" } } // Quinto oggetto 'passaggio'
        ], // Fine dell'array 'passaggi' per la missione M001
        completata: false // Chiave 'completata' con valore booleano false
    }, // Fine del primo oggetto missione (M001)
    { // Inizio del secondo oggetto missione (M002)
        idMissione: "M002",
        nome: "Recupero Oggetto",
        descrizione: "Il robot localizza e recupera un oggetto specifico.",
        priorita: "Media",
        passaggi: [ // Array di passaggi per la missione M002
            { azione: "navigaVersoXY", parametri: { x: 5, y: 10, unita: "metri" } }, // Nota come i parametri possono variare per tipo di azione
            { azione: "identificaOggetto", parametri: { tipoOggetto: "palla rossa" } },
            { azione: "raccogliOggetto" }, // Alcune azioni potrebbero non avere parametri espliciti
            { azione: "ritornaAllaBase" }
        ],
        completata: false
    }, // Fine del secondo oggetto missione (M002)
    { // Inizio del terzo oggetto missione (M003)
        idMissione: "M003",
        nome: "Pattugliamento Area",
        descrizione: "Il robot pattuglia un percorso predefinito.",
        priorita: "Bassa",
        passaggi: [
            { azione: "seguiPercorso", parametri: { idPercorso: "P001" } },
            { azione: "attivaSensoriAllarme" },
            { azione: "ripeti", parametri: { volte: 5 } }
        ],
        completata: true // Esempio di missione già marcata come completata
    } // Fine del terzo oggetto missione (M003)
]; // Fine dell'array 'missioniRobot'

// Visualizziamo la struttura dati completa così come è stata definita in JavaScript.
console.log("--- Struttura Dati Iniziale delle Missioni (Array di Oggetti JavaScript) ---");
console.log(missioniRobot);

// 2. Serializzazione in JSON (Conversione da Oggetto/Array JavaScript a Stringa JSON)
// JSON (JavaScript Object Notation) è un formato testuale leggero per lo scambio di dati.
// È facile da leggere per gli umani e facile da parsare e generare per le macchine.
// Il metodo `JSON.stringify()` converte un valore JavaScript (come un array o un oggetto)
// in una stringa JSON.
// Questo è utile per:
//   - Salvare i dati su file.
//   - Inviare i dati tramite una rete (ad esempio, a un server web o a un altro robot).
//   - Memorizzare i dati in localStorage o sessionStorage nel browser.

// `JSON.stringify(value[, replacer[, space]])`
//   - `missioniRobot`: L'array di oggetti che vogliamo convertire.
//   - `null`: Un argomento opzionale 'replacer'. Se è una funzione, altera il comportamento
//             della stringificazione. Se è un array di stringhe e numeri, seleziona le proprietà
//             da includere. `null` significa che tutte le proprietà dell'oggetto sono incluse.
//   - `2`: Un argomento opzionale 'space'. Aggiunge indentazione, spazi bianchi e caratteri di 
//          nuova riga alla stringa JSON di output per renderla più leggibile.
//          Se è un numero, indica il numero di spazi da usare per l'indentazione.
//          Se è una stringa, quella stringa viene usata per l'indentazione (es. '\t').
const missioniJsonString = JSON.stringify(missioniRobot, null, 2);
// La variabile 'missioniJsonString' ora contiene una rappresentazione testuale
// dell'array 'missioniRobot', formattata secondo le regole JSON.
console.log("\n--- Missioni Serializzate in JSON (Stringa) ---");
console.log(missioniJsonString);

// Simulazione: Salvataggio della stringa JSON in un file (concettuale)
// In un ambiente EV3 reale con accesso al file system (es. Node.js sull'EV3), si potrebbe usare qualcosa come:
// const fs = require('fs');
// fs.writeFileSync('missioni_robot_data.json', missioniJsonString);
// console.log("\nDati delle missioni salvati concettualmente in 'missioni_robot_data.json'");

// 3. Deserializzazione da JSON (Conversione da Stringa JSON a Oggetto/Array JavaScript)
// Questo è utile per caricare dati da un file o riceverli da una fonte esterna.

// Supponiamo di aver caricato la stringa JSON da un file o da rete:
const jsonDaFileSimulato = missioniJsonString; // In uno scenario reale, leggeremmo questo da un file

let missioniCaricate; // Variabile per memorizzare l'oggetto/array JavaScript risultante dal parsing.
// È buona pratica usare un blocco try...catch quando si esegue il parsing di JSON,
// poiché la stringa JSON potrebbe essere malformata e causare un errore.
try {
    // `JSON.parse(text[, reviver])`
    //   - `jsonDaFileSimulato`: La stringa JSON da parsare.
    //   - `reviver` (opzionale): Una funzione che può trasformare il risultato.
    missioniCaricate = JSON.parse(jsonDaFileSimulato);
    // Se il parsing ha successo, 'missioniCaricate' conterrà una struttura dati JavaScript
    // identica (in termini di dati) a 'missioniRobot' originale.
    console.log("\n--- Missioni Deserializzate da JSON (Ricostruito come Oggetto/Array JavaScript) ---");
    console.log(missioniCaricate);

    // Ora possiamo lavorare con 'missioniCaricate' come un normale array di oggetti JavaScript.
    // Ad esempio, possiamo iterare su di esso, accedere alle proprietà, modificarle, ecc.
    console.log("\n--- Analisi delle Missioni Caricate (Iterazione sull'Array di Oggetti) ---");
    // Utilizzo del metodo forEach per iterare sull'array 'missioniCaricate'.
    // 'missione' è un singolo oggetto missione in ogni iterazione.
    missioniCaricate.forEach(missione => {
        // Accesso alle proprietà dell'oggetto 'missione' usando la notazione punto (es. missione.nome).
        console.log(`Missione: ${missione.nome} (ID: ${missione.idMissione}), Priorità: ${missione.priorita}`);
        console.log(`  Completata: ${missione.completata}`); // Accesso alla proprietà booleana
        // 'missione.passaggi' è un array, quindi possiamo usare '.length' per ottenere il numero di elementi.
        console.log(`  Numero di passaggi: ${missione.passaggi.length}`);
        // Iterazione sull'array 'passaggi' interno a ciascuna missione.
        missione.passaggi.forEach((passaggio, index) => {
            console.log(`    Passaggio ${index + 1}: ${passaggio.azione}`); // Accesso alla proprietà 'azione' dell'oggetto 'passaggio'
            // Verifica se l'oggetto 'passaggio' ha una proprietà 'parametri'.
            if (passaggio.parametri) {
                // Se esistono parametri, li visualizziamo. Usiamo JSON.stringify per una facile visualizzazione dell'oggetto parametri.
                console.log(`      Parametri: ${JSON.stringify(passaggio.parametri)}`);
            }
        });
    });

    // Esempio di modifica dei dati dopo la deserializzazione:
    // Marchiamo la prima missione caricata come completata e aggiungiamo una data di completamento.
    if (missioniCaricate.length > 0) { // Controlliamo se ci sono missioni caricate
        missioniCaricate[0].completata = true; // Modifichiamo la proprietà 'completata' del primo oggetto missione.
        missioniCaricate[0].dataCompletamento = new Date().toISOString(); // Aggiungiamo una nuova proprietà 'dataCompletamento'.
        console.log("\n--- Prima missione (M001) aggiornata dopo il parsing ---");
        console.log(missioniCaricate[0]);

        // Riserializziamo l'array di missioni modificato in JSON per vedere l'effetto.
        // Questo simulerebbe il salvataggio dei dati aggiornati.
        const missioniAggiornateJsonString = JSON.stringify(missioniCaricate, null, 2);
        console.log("\n--- Missioni Aggiornate (con M001 modificata) Serializzate nuovamente in JSON ---");
        console.log(missioniAggiornateJsonString);
    }

// Blocco catch per gestire eventuali errori durante JSON.parse()
} catch (error) {
    console.error("ERRORE durante il parsing del JSON:", error.message);
    // In un'applicazione reale, qui si potrebbe implementare una logica di fallback
    // o notificare l'utente dell'errore.
    // Gestire l'errore, ad esempio usando dati di default o interrompendo l'esecuzione
}

// 4. Considerazioni aggiuntive sull'uso di JSON
// - Validazione dei dati: Quando si ricevono dati JSON da fonti esterne (file, rete), è cruciale
//   validare la stringa JSON prima di tentare il parsing (`JSON.parse`).
//   Dopo il parsing, è anche importante validare la struttura dell'oggetto JavaScript risultante
//   per assicurarsi che corrisponda a quanto atteso (es. che le proprietà necessarie esistano e siano del tipo corretto).
//   Questo previene errori e vulnerabilità.
// - Tipi di dati non supportati nativamente da JSON:
//   - Date: Gli oggetti Date JavaScript vengono convertiti in stringhe (formato ISO 8601 per `toISOString()`).
//     Quando si esegue il parsing di JSON che contiene date come stringhe, queste rimangono stringhe.
//     È necessario convertirle manualmente in oggetti Date se serve la funzionalità di Date.
//     La funzione 'reviver' di `JSON.parse` può automatizzare questa conversione.
//   - Funzioni: Le funzioni vengono ignorate da `JSON.stringify` (o convertite a `null` se sono valori di proprietà).
//   - `undefined`: Viene omesso se è un valore di proprietà di un oggetto, o convertito a `null` se è in un array.
//   - Simboli: Le proprietà con chiavi di tipo Simbolo vengono ignorate.
// - Commenti: Il formato JSON non supporta commenti.
// - Virgole finali (trailing commas): Non sono permesse in JSON (es. `[1, 2,]` o `{"a":1,}` sono invalidi).

console.log("\nEsempio completato.");

// Per eseguire questo script in un ambiente Node.js:
// 1. Salva il file come gestione_missioni_robot.js
// 2. Esegui da terminale: node gestione_missioni_robot.js

// Per l'uso su EV3, l'esecuzione dipenderà dall'ambiente JavaScript specifico disponibile (es. ev3dev con Node.js).