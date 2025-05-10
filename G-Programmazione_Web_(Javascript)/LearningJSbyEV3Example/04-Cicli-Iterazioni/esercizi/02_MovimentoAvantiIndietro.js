// Esercizio 2: Muovere il Robot Avanti e Indietro Ripetutamente
// In questo esercizio, si dovrà scrivere codice JavaScript per far muovere
// il robot EV3 avanti per un breve periodo (es. 2 secondi), poi indietro per
// lo stesso periodo, ripetendo questa sequenza per un numero definito di volte (es. 5 volte).
// Utilizzare cicli e funzioni per temporizzare i movimenti.

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Connetti ai motori (es. motori grandi sulle porte outB e outC per un tank drive)
// let motorB = new ev3.LargeMotor('outB');
// let motorC = new ev3.LargeMotor('outC');

// // Parametri del movimento
// const durataMovimentoMs = 2000; // 2 secondi
// const numeroRipetizioni = 5;
// const velocita = 400;

// console.log(`Esercizio 2 avviato: il robot si muoverà avanti e indietro per ${numeroRipetizioni} volte.`);

// // Verifica che i motori siano connessi
// if (!motorB.connected || !motorC.connected) {
//   console.error('Motori non connessi. Assicurati che siano collegati correttamente.');
//   process.exit(1);
// }

// // Funzione asincrona per gestire la sequenza di movimenti
// async function eseguiMovimenti() {
//   for (let i = 0; i < numeroRipetizioni; i++) {
//     console.log(`Ripetizione ${i + 1} di ${numeroRipetizioni}`);

//     // Muovi avanti
//     console.log('Movimento: Avanti');
//     motorB.runTimed(durataMovimentoMs, velocita);
//     await motorC.runTimed(durataMovimentoMs, velocita); // Attendi il completamento del movimento
//     // Breve pausa per separare i movimenti (opzionale)
//     await new Promise(resolve => setTimeout(resolve, 200));

//     // Muovi indietro
//     console.log('Movimento: Indietro');
//     motorB.runTimed(durataMovimentoMs, -velocita); // Velocità negativa per andare indietro
//     await motorC.runTimed(durataMovimentoMs, -velocita); // Attendi il completamento del movimento
//     // Breve pausa
//     await new Promise(resolve => setTimeout(resolve, 200));
//   }

//   console.log('Sequenza di movimenti completata.');
//   motorB.stop();
//   motorC.stop();
//   console.log('Esercizio 2 terminato.');
// }

// // Avvia la sequenza
// eseguiMovimenti().catch(err => {
//   console.error('Errore durante l\'esecuzione dei movimenti:', err);
//   motorB.stop();
//   motorC.stop();
// });

console.log('File 02_MovimentoAvantiIndietro.js creato.');
console.log('Implementare la logica per muovere il robot avanti e indietro ripetutamente.');