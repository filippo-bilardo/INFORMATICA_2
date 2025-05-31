// Esercizio 1: Controllare un Motore per un Numero Fisso di Rotazioni
// In questo esercizio, si dovrà scrivere codice JavaScript per far compiere
// a un motore del robot EV3 un numero specifico di rotazioni (es. 3 rotazioni complete)
// e poi fermarsi. Utilizzare un ciclo (es. `for` o `while`) e le funzionalità
// della libreria EV3 per controllare il motore in base alle rotazioni.

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Connetti al motore (es. motore grande sulla porta outA)
// let motorA = new ev3.LargeMotor('outA');

// // Numero di rotazioni desiderate
// const numeroRotazioni = 3;
// // Gradi per una rotazione completa
// const gradiPerRotazione = 360;
// // Velocità del motore
// const velocita = 300;

// console.log(`Esercizio 1 avviato: il motore A eseguirà ${numeroRotazioni} rotazioni.`);

// // Verifica che il motore sia connesso
// if (!motorA.connected) {
//   console.error('Motore A non connesso. Assicurati che sia collegato correttamente.');
//   process.exit(1);
// }

// // Calcola i gradi totali
// let gradiTotali = numeroRotazioni * gradiPerRotazione;

// console.log(`Gradi totali da percorrere: ${gradiTotali}`);

// // Esegui il movimento
// // La funzione runToRelPos (run to relative position) muove il motore di un certo numero di gradi
// motorA.runToRelPos(gradiTotali, velocita).then(() => {
//   console.log('Movimento completato.');
//   motorA.stop(); // Assicura che il motore sia fermo
//   console.log('Esercizio 1 terminato.');
// }).catch((err) => {
//   console.error('Errore durante il movimento del motore:', err);
// });

// // Nota: l'approccio con `runToRelPos` è spesso il più diretto per questo tipo di task.
// // Un approccio alternativo con un ciclo `for` o `while` potrebbe richiedere
// // di monitorare la posizione attuale del motore (`motorA.position`) e fermarlo
// // quando la posizione target è raggiunta, il che è più complesso e meno preciso
// // rispetto all'uso delle funzioni built-in come `runToRelPos` o `runTimed`.

// // Esempio con ciclo (meno raccomandato per precisione con ev3dev-lang-js per questo specifico task):
// /*
// motorA.reset(); // Resetta la posizione del motore
// motorA.speedSp = velocita;
// motorA.command = 'run-forever';

// let rotazioniCompletate = 0;
// let posizioneIniziale = motorA.position;

// let intervalId = setInterval(() => {
//   let posizioneCorrente = motorA.position;
//   let gradiPercorsi = Math.abs(posizioneCorrente - posizioneIniziale);

//   if (gradiPercorsi >= gradiTotali) {
//     motorA.stop();
//     clearInterval(intervalId);
//     console.log(`${numeroRotazioni} rotazioni completate.`);
//     console.log('Esercizio 1 terminato.');
//   }
// }, 50); // Controlla ogni 50ms
// */

console.log('File 01_ControlloMotoreRotazioni.js creato.');
console.log('Implementare la logica per controllare un motore per un numero fisso di rotazioni.');