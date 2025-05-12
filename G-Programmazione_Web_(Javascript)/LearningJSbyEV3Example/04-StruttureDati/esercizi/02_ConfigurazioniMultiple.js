// Esercizio 02: Gestione di Configurazioni Multiple per il Robot
// Obiettivo: Creare un sistema che permetta di definire e selezionare diverse configurazioni
// per il robot utilizzando oggetti. Ad esempio, una configurazione "esplorazione veloce"
// e una "movimento preciso".

// Nota: Questo codice è uno scheletro e va completato. Le funzioni di interazione
// con l'EV3 sono simulate o da implementare con le API specifiche.

console.log("Avvio Esercizio 02: Gestione di Configurazioni Multiple");

// --- Definizione delle Configurazioni ---
// Un array di oggetti, dove ogni oggetto è una configurazione.
const configurazioniRobot = [
    {
        nomeConfig: "Esplorazione Veloce",
        descrizione: "Modalità per coprire rapidamente terreno, meno precisa.",
        velocitaBase: 75, // Percentuale
        velocitaCurva: 40,
        sensibilitaOstacoliCm: 25, // Distanza minima per reazione
        sensoriAttivi: { ultrasuoni: true, colore: false, tocco: true },
        logLivello: "info"
    },
    {
        nomeConfig: "Movimento Preciso",
        descrizione: "Modalità per movimenti accurati, velocità ridotta.",
        velocitaBase: 25,
        velocitaCurva: 15,
        sensibilitaOstacoliCm: 10,
        sensoriAttivi: { ultrasuoni: true, colore: true, tocco: true },
        logLivello: "debug"
    },
    {
        nomeConfig: "Segui Linea",
        descrizione: "Modalità ottimizzata per seguire una linea sul pavimento.",
        velocitaBase: 30,
        guadagnoP: 0.8, // Esempio di parametri specifici per la modalità
        guadagnoI: 0.1,
        guadagnoD: 0.05,
        sensoriAttivi: { ultrasuoni: false, colore: true, tocco: false },
        logLivello: "info"
    },
    {
        nomeConfig: "Risparmio Energetico",
        descrizione: "Modalità per massimizzare la durata della batteria.",
        velocitaBase: 20,
        velocitaCurva: 10,
        sensibilitaOstacoliCm: 30,
        sensoriAttivi: { ultrasuoni: true, colore: false, tocco: false }, // Meno sensori attivi
        frequenzaPollingSensoriMs: 1000, // Controlla i sensori meno frequentemente
        logLivello: "warn"
    }
];

// Oggetto per memorizzare la configurazione attualmente attiva
let configAttiva = {};

// --- Funzioni di Gestione delle Configurazioni ---

// Funzione per caricare una configurazione per nome
function caricaConfigurazione(nomeConfigurazione) {
    const trovata = configurazioniRobot.find(config => config.nomeConfig === nomeConfigurazione);
    if (trovata) {
        configAttiva = JSON.parse(JSON.stringify(trovata)); // Crea una copia per evitare modifiche all'originale
        console.log(`\nConfigurazione '${nomeConfigurazione}' caricata e attivata.`);
        applicaConfigurazione(configAttiva);
        return true;
    } else {
        console.warn(`Configurazione '${nomeConfigurazione}' non trovata!`);
        return false;
    }
}

// Funzione per applicare i parametri della configurazione attiva (simulata)
function applicaConfigurazione(config) {
    console.log(`  Applicazione parametri per: ${config.nomeConfig}`);
    console.log(`  - Velocità Base: ${config.velocitaBase}`);
    console.log(`  - Sensibilità Ostacoli: ${config.sensibilitaOstacoliCm} cm`);
    console.log(`  - Sensori Attivi: Ultrasuoni (${config.sensoriAttivi.ultrasuoni}), Colore (${config.sensoriAttivi.colore}), Tocco (${config.sensoriAttivi.tocco})`);

    // Implementazione reale EV3:
    // Esempio: impostare velocità motori, attivare/disattivare sensori,
    // regolare parametri di algoritmi (es. PID per seguilinea).
    // motors.setSpeedPercent(config.velocitaBase); // Imposta velocità base per movimenti futuri
    // sensors.ultrasonic1.setEnabled(config.sensoriAttivi.ultrasuoni);
    // sensors.color1.setEnabled(config.sensoriAttivi.colore);
    // ... e così via
}

// Funzione per visualizzare le configurazioni disponibili
function mostraConfigurazioniDisponibili() {
    console.log("\n--- Configurazioni Disponibili ---");
    configurazioniRobot.forEach((config, index) => {
        console.log(`${index + 1}. ${config.nomeConfig} - ${config.descrizione}`);
    });
    console.log("--------------------------------");
}

// Funzione per ottenere un parametro dalla configurazione attiva
function getParametroConfig(nomeParametro) {
    // Accesso nidificato sicuro (opzionale, per parametri complessi)
    const keys = nomeParametro.split('.');
    let value = configAttiva;
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            console.warn(`Parametro '${nomeParametro}' non trovato nella configurazione attiva.`);
            return undefined;
        }
    }
    return value;
}

// --- Esecuzione e Interazione (Simulata) ---

mostraConfigurazioniDisponibili();

// Tentativo di caricare una configurazione
caricaConfigurazione("Movimento Preciso");

// Utilizzo di un parametro dalla configurazione attiva
let velocitaAttuale = getParametroConfig("velocitaBase");
if (velocitaAttuale !== undefined) {
    console.log(`SIM: Robot si muove a velocità ${velocitaAttuale} (da config '${configAttiva.nomeConfig}')`);
}

let sensoreColoreAttivo = getParametroConfig("sensoriAttivi.colore");
console.log(`SIM: Sensore colore attivo? ${sensoreColoreAttivo}`);

// Caricare un'altra configurazione
caricaConfigurazione("Esplorazione Veloce");
velocitaAttuale = getParametroConfig("velocitaBase");
if (velocitaAttuale !== undefined) {
    console.log(`SIM: Robot si muove ora a velocità ${velocitaAttuale} (da config '${configAttiva.nomeConfig}')`);
}

// Tentativo di caricare una configurazione non esistente
caricaConfigurazione("ModalitaInesistente");

console.log("\nEsercizio 02 Terminato.");

// Sfide aggiuntive:
// 1. Permettere all'utente di selezionare una configurazione tramite i pulsanti del brick EV3.
// 2. Salvare la configurazione attiva (o l'ultima usata) in un file JSON e ricaricarla all'avvio.
// 3. Creare una funzione che modifica un parametro della configurazione *attiva* e
//    opzionalmente salva questa modifica (magari come una nuova configurazione personalizzata).
// 4. Integrare questo sistema di configurazione con l'esercizio 01 (Memorizzazione Percorsi)
//    per far sì che il robot esegua il percorso con i parametri della configurazione selezionata.