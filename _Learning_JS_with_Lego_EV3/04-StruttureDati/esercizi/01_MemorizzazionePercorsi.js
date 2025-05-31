// Esercizio 01: Memorizzazione e Riproduzione di Percorsi
// Obiettivo: Utilizzare array (o array di oggetti) per memorizzare una sequenza di coordinate
// o comandi di movimento che rappresentano un percorso. Implementare la logica per far seguire
// tale percorso al robot.

// Nota: Questo codice è uno scheletro e va completato. Le funzioni di interazione
// con l'EV3 (movimento, sensori) sono simulate o da implementare con le API specifiche.

console.log("Avvio Esercizio 01: Memorizzazione e Riproduzione di Percorsi");

// --- Definizione del Percorso ---
// Scegli una delle due opzioni (o crea la tua) e commenta l'altra.

// Opzione 1: Array di comandi di movimento (più semplice per iniziare)
// Ogni oggetto definisce un'azione specifica.
const percorsoComandi = [
    { azione: "avanti", velocita: 50, durataMs: 2000 },
    { azione: "giraDestra", velocita: 30, angolo: 90 },
    { azione: "avanti", velocita: 40, durataMs: 1000 },
    { azione: "giraSinistra", velocita: 30, angolo: 45 },
    { azione: "suono", frequenza: 500, durataSuonoMs: 300 },
    { azione: "stop", durataMs: 500 }
];

// Opzione 2: Array di coordinate (più complesso, richiede logica di navigazione)
// Ogni oggetto rappresenta un punto (x, y) da raggiungere. Il robot parte da (0,0).
// const percorsoCoordinate = [
//     { x: 0, y: 50 },  // Vai a (0, 50)
//     { x: 30, y: 50 }, // Vai a (30, 50)
//     { x: 30, y: 0 },  // Vai a (30, 0)
//     { x: 0, y: 0 }   // Torna a (0,0)
// ];

// --- Funzioni di Interazione con EV3 (Simulate/Da Implementare) ---

// Funzione per muovere il robot in avanti
function muoviAvanti(velocita, durataMs) {
    console.log(`SIM: Muovi AVANTI - Velocità: ${velocita}, Durata: ${durataMs}ms`);
    // Implementazione reale EV3:
    // motors.largeB.run(velocita);
    // motors.largeC.run(velocita);
    // control.pause(durataMs);
    // motors.stopAll();
}

// Funzione per girare il robot (es. sul posto)
function gira(direzione, velocita, angolo) {
    console.log(`SIM: Gira ${direzione} - Velocità: ${velocita}, Angolo: ${angolo} gradi`);
    // Implementazione reale EV3:
    // let motorSinistroVel = direzione === "destra" ? velocita : -velocita;
    // let motorDestroVel = direzione === "destra" ? -velocita : velocita;
    // motors.largeB.run(motorSinistroVel);
    // motors.largeC.run(motorDestroVel);
    // // Calcolare la durata necessaria per l'angolo o usare API specifiche per rotazione in gradi
    // control.pause(1000); // Pausa indicativa, da calibrare
    // motors.stopAll();
}

// Funzione per emettere un suono
function emettiSuono(frequenza, durataSuonoMs) {
    console.log(`SIM: Suono - Frequenza: ${frequenza}Hz, Durata: ${durataSuonoMs}ms`);
    // Implementazione reale EV3:
    // brick.sound(frequenza, durataSuonoMs);
    // control.pause(durataSuonoMs);
}

// Funzione per fermare i motori
function fermaMotori(durataMs) {
    console.log(`SIM: Stop motori per ${durataMs}ms`);
    // Implementazione reale EV3:
    // motors.stopAll();
    // control.pause(durataMs);
}

// --- Logica di Riproduzione del Percorso ---

function riproduciPercorsoComandi(percorso) {
    console.log("\nInizio riproduzione percorso (basato su comandi):");
    for (let i = 0; i < percorso.length; i++) {
        const comando = percorso[i];
        console.log(`  Eseguo comando ${i + 1}: ${comando.azione}`);

        switch (comando.azione) {
            case "avanti":
                muoviAvanti(comando.velocita, comando.durataMs);
                break;
            case "giraDestra":
                gira("destra", comando.velocita, comando.angolo);
                break;
            case "giraSinistra":
                gira("sinistra", comando.velocita, comando.angolo);
                break;
            case "suono":
                emettiSuono(comando.frequenza, comando.durataSuonoMs);
                break;
            case "stop":
                fermaMotori(comando.durataMs);
                break;
            default:
                console.warn(`Comando non riconosciuto: ${comando.azione}`);
        }
        // Aggiungi una piccola pausa tra i comandi se necessario
        // control.pause(200); // Esempio
    }
    console.log("Riproduzione percorso comandi terminata.");
}

// TODO (Opzionale, più avanzato): Implementare riproduciPercorsoCoordinate
// function riproduciPercorsoCoordinate(percorso) {
//     console.log("\nInizio riproduzione percorso (basato su coordinate):");
//     let posizioneCorrente = { x: 0, y: 0, orientamento: 0 }; // Orientamento in gradi, 0 = Nord

//     for (const targetPunto of percorso) {
//         console.log(`  Obiettivo: (${targetPunto.x}, ${targetPunto.y}) da (${posizioneCorrente.x}, ${posizioneCorrente.y})`);
//         // 1. Calcolare l'angolo per girarsi verso targetPunto
//         // 2. Girare il robot
//         // 3. Calcolare la distanza per raggiungere targetPunto
//         // 4. Muovere il robot in avanti per quella distanza
//         // 5. Aggiornare posizioneCorrente
//         // Questa parte richiede trigonometria e una gestione più precisa dei movimenti.
//     }
//     console.log("Riproduzione percorso coordinate terminata.");
// }

// --- Esecuzione ---

// Scegli quale percorso riprodurre:
riproduciPercorsoComandi(percorsoComandi);
// riproduciPercorsoCoordinate(percorsoCoordinate); // Decommenta per provare (dopo implementazione)

console.log("\nEsercizio 01 Terminato.");

// Sfide aggiuntive:
// 1. Implementare la logica per `riproduciPercorsoCoordinate`.
// 2. Aggiungere la possibilità di registrare un percorso muovendo manualmente il robot
//    (es. usando i pulsanti del brick) e memorizzando le azioni in un array.
// 3. Salvare e caricare percorsi da/in un file JSON (se l'ambiente lo permette).
// 4. Gestire ostacoli durante la riproduzione del percorso.