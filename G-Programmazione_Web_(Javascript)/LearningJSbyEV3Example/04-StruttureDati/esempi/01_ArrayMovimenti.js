// Esempio 01: Array per Sequenze di Movimento
// Descrizione: Come utilizzare un array per memorizzare una sequenza di comandi di movimento
// (es. velocità, durata/distanza, tipo di movimento) e poi eseguirla.

// Nota: Questo codice è concettuale e pensato per essere adattato
// all'ambiente di programmazione specifico per EV3 che si sta utilizzando
// (es. MakeCode, ev3dev con JavaScript/Node.js).
// Le funzioni come `motors.largeA.run()`, `control.pause()` sono illustrative.

console.log("Avvio Esempio 01: Array per Sequenze di Movimento");

// Definiamo una sequenza di movimenti come un array di oggetti.
// Ogni oggetto rappresenta un passo della sequenza.
const sequenzaMovimenti = [
    { tipo: "avanti", velocita: 50, durataMs: 2000 },       // Vai avanti per 2 secondi
    { tipo: "giraDestra", velocita: 30, angoloGradi: 90 }, // Gira a destra di 90 gradi
    { tipo: "avanti", velocita: 60, durataMs: 1500 },       // Vai avanti per 1.5 secondi
    { tipo: "giraSinistra", velocita: 30, angoloGradi: 90 },// Gira a sinistra di 90 gradi
    { tipo: "suono", frequenzaHz: 440, durataMs: 500 },     // Emetti un suono
    { tipo: "stop", durataMs: 1000 }                       // Fermati per 1 secondo
];

// Funzione per eseguire un singolo passo di movimento
// (Questa funzione dovrebbe interagire con le API del tuo EV3)
function eseguiPasso(passo) {
    console.log(`Esecuzione passo: ${passo.tipo}`);

    switch (passo.tipo) {
        case "avanti":
            console.log(`  -> Velocità: ${passo.velocita}, Durata: ${passo.durataMs}ms`);
            // Esempio API EV3 (da adattare):
            // motors.largeA.run(passo.velocita);
            // motors.largeB.run(passo.velocita);
            // control.pause(passo.durataMs);
            // motors.stopAll();
            break;
        case "indietro":
            console.log(`  -> Velocità: ${passo.velocita}, Durata: ${passo.durataMs}ms`);
            // motors.largeA.run(-passo.velocita);
            // motors.largeB.run(-passo.velocita);
            // control.pause(passo.durataMs);
            // motors.stopAll();
            break;
        case "giraDestra":
            console.log(`  -> Velocità: ${passo.velocita}, Angolo: ${passo.angoloGradi} gradi`);
            // Esempio API EV3 (da adattare per una rotazione sul posto):
            // motors.largeA.run(passo.velocita);
            // motors.largeB.run(-passo.velocita);
            // Qui servirebbe un modo per attendere il completamento della rotazione
            // basata sull'angolo, o una pausa calcolata.
            // Per semplicità, usiamo una pausa fissa, ma in pratica si userebbero i gradi.
            // control.pause(1000); // Pausa indicativa
            // motors.stopAll();
            break;
        case "giraSinistra":
            console.log(`  -> Velocità: ${passo.velocita}, Angolo: ${passo.angoloGradi} gradi`);
            // motors.largeA.run(-passo.velocita);
            // motors.largeB.run(passo.velocita);
            // control.pause(1000); // Pausa indicativa
            // motors.stopAll();
            break;
        case "suono":
            console.log(`  -> Frequenza: ${passo.frequenzaHz}Hz, Durata: ${passo.durataMs}ms`);
            // brick.sound(passo.frequenzaHz, passo.durataMs);
            // control.pause(passo.durataMs); // Attendi la fine del suono
            break;
        case "stop":
            console.log(`  -> Durata stop: ${passo.durataMs}ms`);
            // motors.stopAll();
            // control.pause(passo.durataMs);
            break;
        default:
            console.warn(`Tipo di passo non riconosciuto: ${passo.tipo}`);
    }
    // Simula una pausa per l'esecuzione del passo, dato che non abbiamo un EV3 connesso
    // In un ambiente reale, questa pausa sarebbe gestita dalle funzioni del motore o da `control.pause()`
    if (!passo.tipo.includes("suono") && !passo.tipo.includes("stop")) {
        // control.pause(passo.durataMs || 1000); // Usa durataMs se disponibile, altrimenti 1s
    }
}

// Iteriamo sull'array della sequenza di movimenti ed eseguiamo ogni passo
console.log("Inizio esecuzione sequenza movimenti...");

for (let i = 0; i < sequenzaMovimenti.length; i++) {
    const passoCorrente = sequenzaMovimenti[i];
    console.log(`Passo ${i + 1}/${sequenzaMovimenti.length}`);
    eseguiPasso(passoCorrente);
    // Aggiungiamo una piccola pausa tra i passi per chiarezza nell'output
    // In un'applicazione reale, la pausa potrebbe essere parte del passo stesso
    // o non necessaria se i comandi sono bloccanti.
    // control.pause(500); // Pausa di 0.5s tra i comandi
    if (i < sequenzaMovimenti.length -1) {
      console.log("...pausa tra passi...");
    }
}

console.log("Sequenza di movimenti completata.");

// Esempio di come si potrebbe usare for...of
console.log("\nEsecuzione sequenza con for...of:");
for (const passo of sequenzaMovimenti) {
    eseguiPasso(passo);
    // control.pause(500);
    if (passo !== sequenzaMovimenti[sequenzaMovimenti.length - 1]) {
        console.log("...pausa tra passi (for...of)...");
    }
}

console.log("Esempio 01 Terminato.");

// Per eseguire questo script in un ambiente Node.js:
// 1. Salva il file come 01_ArrayMovimenti.js
// 2. Apri il terminale e naviga nella cartella dove hai salvato il file
// 3. Esegui: node 01_ArrayMovimenti.js
// (Assicurati di avere Node.js installato)

// Per l'EV3, dovrai integrare questo con le API specifiche del firmware/ambiente che usi.
// Ad esempio, se usi ev3dev con Node.js, importeresti la libreria 'ev3dev-lang'.
// const ev3 = require('ev3dev-lang');