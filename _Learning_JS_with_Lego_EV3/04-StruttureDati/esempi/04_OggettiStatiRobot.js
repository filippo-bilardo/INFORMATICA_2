// Esempio 04: Gestione di Stati Complessi con Oggetti
// Descrizione: Esempio di come un oggetto può rappresentare lo stato corrente del robot
// (es. { mode: 'exploring', speed: 50, obstacleDetected: false }).

// Nota: Questo codice è concettuale e necessita delle API specifiche del tuo ambiente EV3.

console.log("Avvio Esempio 04: Gestione di Stati Complessi con Oggetti");

// Definiamo un oggetto per rappresentare lo stato del robot
let statoRobot = {
    nome: "EV3-Navigator",
    modalitaOperativa: "standby", // Possibili modalità: standby, esplorazione, seguilinea, attesaComando
    velocitaCorrente: 0,
    ostacoloRilevato: false,
    distanzaOstacoloCm: null,
    livelloBatteriaPercentuale: 95,
    ultimoComandoRicevuto: null,
    sensoriAttivi: {
        colore: true,
        ultrasuoni: true,
        tocco: false
    },
    logMessaggi: [] // Array per memorizzare messaggi di log
};

// Funzione per aggiornare lo stato del robot (simulata)
function aggiornaStatoSensori() {
    // Simulazione lettura sensore ultrasuoni
    if (statoRobot.sensoriAttivi.ultrasuoni) {
        const distanzaSimulata = Math.floor(Math.random() * 100) + 5; // 5-104 cm
        statoRobot.distanzaOstacoloCm = distanzaSimulata;
        if (distanzaSimulata < 20) {
            if (!statoRobot.ostacoloRilevato) {
                statoRobot.ostacoloRilevato = true;
                cambiaModalita("evasioneOstacolo");
                aggiungiLog("Ostacolo rilevato a " + distanzaSimulata + "cm!");
            }
        } else {
            statoRobot.ostacoloRilevato = false;
        }
    }

    // Simulazione scaricamento batteria
    if (statoRobot.livelloBatteriaPercentuale > 0 && statoRobot.modalitaOperativa !== "standby") {
        statoRobot.livelloBatteriaPercentuale -= 0.1;
        if (statoRobot.livelloBatteriaPercentuale < 20) {
            aggiungiLog("Attenzione: Batteria scarica! (" + statoRobot.livelloBatteriaPercentuale.toFixed(1) + "%)");
            if (statoRobot.modalitaOperativa !== "ricarica") {
                 // cambiaModalita("ritornoBasePerRicarica"); // Esempio
            }
        }
    }
}

// Funzione per cambiare la modalità operativa del robot
function cambiaModalita(nuovaModalita) {
    if (statoRobot.modalitaOperativa !== nuovaModalita) {
        aggiungiLog(`Cambio modalità: da '${statoRobot.modalitaOperativa}' a '${nuovaModalita}'`);
        statoRobot.modalitaOperativa = nuovaModalita;

        switch (nuovaModalita) {
            case "standby":
                statoRobot.velocitaCorrente = 0;
                // motors.stopAll();
                break;
            case "esplorazione":
                statoRobot.velocitaCorrente = 50;
                // motors.largeA.run(statoRobot.velocitaCorrente);
                // motors.largeB.run(statoRobot.velocitaCorrente);
                break;
            case "seguilinea":
                statoRobot.velocitaCorrente = 30;
                // Inizia logica seguilinea...
                break;
            case "evasioneOstacolo":
                statoRobot.velocitaCorrente = 0;
                // motors.stopAll();
                // Inizia manovra di evasione...
                console.log("INIZIO MANOVRA EVASIONE (simulata)");
                // control.pause(500);
                // motors.largeA.run(-30, 360, 'degrees'); // Indietreggia un po'
                // motors.largeB.run(-30, 360, 'degrees');
                // control.pauseUntilIdle(motors.largeA);
                // motors.largeA.run(30, 180, 'degrees'); // Gira
                // motors.largeB.run(-30, 180, 'degrees');
                // control.pauseUntilIdle(motors.largeA);
                console.log("FINE MANOVRA EVASIONE (simulata)");
                cambiaModalita("esplorazione"); // Torna a esplorare dopo evasione
                break;
            default:
                aggiungiLog(`Modalità '${nuovaModalita}' non gestita.`);
        }
    }
}

// Funzione per aggiungere messaggi al log interno
function aggiungiLog(messaggio) {
    const timestamp = new Date().toLocaleTimeString();
    const messaggioLog = `[${timestamp}] ${messaggio}`;
    statoRobot.logMessaggi.push(messaggioLog);
    console.log(messaggioLog); // Stampa anche su console per debug
    // Mantieni solo gli ultimi N messaggi per non consumare troppa memoria
    if (statoRobot.logMessaggi.length > 50) {
        statoRobot.logMessaggi.shift();
    }
}

// Funzione per stampare lo stato corrente del robot
function stampaStatoRobot() {
    console.log("\n--- Stato Robot Attuale ---");
    console.log(`Nome: ${statoRobot.nome}`);
    console.log(`Modalità: ${statoRobot.modalitaOperativa}`);
    console.log(`Velocità: ${statoRobot.velocitaCorrente}`);
    console.log(`Ostacolo Rilevato: ${statoRobot.ostacoloRilevato}`);
    console.log(`Distanza Ostacolo: ${statoRobot.distanzaOstacoloCm !== null ? statoRobot.distanzaOstacoloCm + ' cm' : 'N/D'}`);
    console.log(`Batteria: ${statoRobot.livelloBatteriaPercentuale.toFixed(1)}%`);
    console.log(`Ultimo Comando: ${statoRobot.ultimoComandoRicevuto || 'Nessuno'}`);
    console.log("Sensori Attivi:", statoRobot.sensoriAttivi);
    console.log("---------------------------\n");
}

// Simulazione del ciclo di vita del robot
stampaStatoRobot();

cambiaModalita("esplorazione");
stampaStatoRobot();

// Simuliamo alcune iterazioni del loop principale del robot
for (let i = 0; i < 15; i++) {
    console.log(`
--- Iterazione ${i + 1} ---
`);
    aggiornaStatoSensori(); // Legge sensori e aggiorna lo stato

    // Logica decisionale basata sullo stato (semplificata)
    if (statoRobot.modalitaOperativa === "esplorazione" && !statoRobot.ostacoloRilevato) {
        // console.log("Robot in esplorazione...");
        // motors.largeA.run(statoRobot.velocitaCorrente);
        // motors.largeB.run(statoRobot.velocitaCorrente);
    }

    // Stampa lo stato ogni tanto per vedere i cambiamenti
    if ((i + 1) % 5 === 0) {
        stampaStatoRobot();
    }

    // Pausa simulata
    // control.pause(300);
    let start = new Date().getTime();
    while (new Date().getTime() < start + 300) {}
}

stampaStatoRobot();
cambiaModalita("standby");
stampaStatoRobot();

console.log("\nLog messaggi finali:");
statoRobot.logMessaggi.forEach(log => console.log(log));

console.log("\nEsempio 04 Terminato.");

// Questo esempio mostra come un singolo oggetto `statoRobot` possa contenere tutte le informazioni
// rilevanti sul robot. Le funzioni possono quindi leggere e modificare questo oggetto
// per implementare comportamenti complessi e reattivi.
// In un'applicazione reale, questo oggetto di stato sarebbe centrale per la logica del robot.