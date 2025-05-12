// Esempio 02: Oggetti per Configurazione Robot
// Descrizione: Utilizzare un oggetto JavaScript per memorizzare i parametri di configurazione
// del robot (es. velocità di default, porte dei motori, costanti di calibrazione).

// Nota: Questo codice è concettuale e pensato per essere adattato
// all'ambiente di programmazione specifico per EV3 che si sta utilizzando.

console.log("Avvio Esempio 02: Oggetti per Configurazione Robot");

// Definiamo un oggetto per la configurazione del nostro robot
const configurazioneRobot = {
    nome: "EV3-Explorer",
    versioneSoftware: "1.1.0",
    autore: "Studente AI",

    motori: {
        sinistro: {
            porta: "outB",
            tipo: "LargeMotor",
            invertito: false
        },
        destro: {
            porta: "outC",
            tipo: "LargeMotor",
            invertito: false
        },
        braccio: {
            porta: "outA",
            tipo: "MediumMotor",
            invertito: false,
            velocitaPredefinita: 25
        }
    },

    sensori: {
        colore: {
            porta: "in3",
            tipo: "ColorSensor",
            modalita: "ReflectedLight"
        },
        ultrasuoni: {
            porta: "in4",
            tipo: "UltrasonicSensor",
            unitaMisura: "cm"
        },
        tocco: {
            porta: "in1",
            tipo: "TouchSensor"
        }
    },

    parametriNavigazione: {
        velocitaBase: 40, // Percentuale
        velocitaCurva: 25,
        distanzaSicurezzaCm: 15,
        sogliaLuceBianca: 60, // Per line follower
        sogliaLuceNera: 20   // Per line follower
    },

    suoni: {
        avvio: "Hello.wav", // Nome file suono (ipotetico)
        errore: "Error.wav",
        conferma: "Confirm.wav"
    },

    debugAttivo: true
};

// Funzione per stampare la configurazione (o parti di essa)
function stampaConfigurazione(config) {
    console.log(`--- Configurazione Robot: ${config.nome} ---`);
    console.log(`Versione Software: ${config.versioneSoftware}`);
    console.log(`Autore: ${config.autore}`);

    console.log("\nMotori:");
    console.log(`  Sinistro: Porta ${config.motori.sinistro.porta}, Tipo ${config.motori.sinistro.tipo}`);
    console.log(`  Destro:   Porta ${config.motori.destro.porta}, Tipo ${config.motori.destro.tipo}`);
    if (config.motori.braccio) {
        console.log(`  Braccio:  Porta ${config.motori.braccio.porta}, Velocità ${config.motori.braccio.velocitaPredefinita}`);
    }

    console.log("\nSensori:");
    console.log(`  Colore: Porta ${config.sensori.colore.porta}, Modalità ${config.sensori.colore.modalita}`);
    console.log(`  Ultrasuoni: Porta ${config.sensori.ultrasuoni.porta}, Unità ${config.sensori.ultrasuoni.unitaMisura}`);

    console.log("\nParametri Navigazione:");
    console.log(`  Velocità Base: ${config.parametriNavigazione.velocitaBase}`);
    console.log(`  Distanza Sicurezza: ${config.parametriNavigazione.distanzaSicurezzaCm} cm`);

    if (config.debugAttivo) {
        console.log("\nDebug: ATTIVO");
    }
    console.log("---------------------------------------");
}

// Utilizziamo la configurazione
stampaConfigurazione(configurazioneRobot);

// Esempio di accesso a un valore specifico
console.log(`\nLa porta del sensore a ultrasuoni è: ${configurazioneRobot.sensori.ultrasuoni.porta}`);

// Modificare un valore della configurazione (se necessario e se l'oggetto non è bloccato)
configurazioneRobot.parametriNavigazione.velocitaBase = 45;
console.log(`Velocità base aggiornata a: ${configurazioneRobot.parametriNavigazione.velocitaBase}`);

// Aggiungere una nuova proprietà alla configurazione
configurazioneRobot.dataUltimaModifica = new Date().toLocaleDateString();
console.log(`Data ultima modifica: ${configurazioneRobot.dataUltimaModifica}`);

console.log("\nEsempio 02 Terminato.");

// In un'applicazione EV3 reale:
// - Questa configurazione potrebbe essere caricata da un file JSON all'avvio.
// - Le funzioni del robot (movimento, lettura sensori) userebbero questi valori
//   per impostare le porte corrette, le velocità, ecc.

// Esempio di come si potrebbe usare in una funzione motore (concettuale):
/*
function muoviAvanti(durataMs) {
    const vel = configurazioneRobot.parametriNavigazione.velocitaBase;
    const portaSinistra = configurazioneRobot.motori.sinistro.porta;
    const portaDestra = configurazioneRobot.motori.destro.porta;

    // motors.setSpeed(portaSinistra, vel);
    // motors.setSpeed(portaDestra, vel);
    // motors.runForTime(portaSinistra, durataMs, true); // true per non bloccante
    // motors.runForTime(portaDestra, durataMs, false); // false per bloccante
    console.log(`Movimento in avanti a velocità ${vel} per ${durataMs}ms`);
}

muoviAvanti(1000);
*/