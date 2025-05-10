// Esercizio 3: Utilizzare un Sensore per Terminare un Ciclo
// In questo esercizio, si dovrà scrivere codice JavaScript per far muovere
// un motore del robot EV3 (o il robot stesso) continuamente fino a quando
// un sensore (es. sensore tattile o sensore di distanza) non rileva un determinato evento
// (es. pressione del sensore, rilevamento di un ostacolo vicino).
// A quel punto, il ciclo di movimento deve terminare e il motore fermarsi.

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Connetti al motore (es. motore grande sulla porta outA)
// let motorA = new ev3.LargeMotor('outA');
// // Connetti al sensore (es. sensore tattile sulla porta in1)
// let touchSensor = new ev3.TouchSensor('in1');
// // Oppure, per un sensore di distanza (ultrasonico) sulla porta in2:
// // let ultrasonicSensor = new ev3.UltrasonicSensor('in2');
// // ultrasonicSensor.mode = 'US-DIST-CM'; // Modalità per distanza in centimetri
// // const distanzaSogliaCm = 10; // Esempio: ferma se l'ostacolo è a meno di 10 cm

// console.log('Esercizio 3 avviato: il motore A si muoverà fino a che il sensore non verrà attivato.');

// // Verifica che i dispositivi siano connessi
// if (!motorA.connected || !touchSensor.connected /* || !ultrasonicSensor.connected */) {
//   console.error('Motore o sensore non connesso. Assicurati che siano collegati correttamente.');
//   process.exit(1);
// }

// // Avvia il motore a una velocità costante
// const velocita = 300;
// motorA.runForever(velocita);
// console.log('Motore A avviato. In attesa dell\'attivazione del sensore...');

// // Loop di controllo basato sul sensore
// let keepRunning = true;
// const checkInterval = setInterval(() => {
//   // Logica per il sensore tattile
//   if (touchSensor.isPressed) {
//     console.log('Sensore tattile premuto. Arresto del motore.');
//     keepRunning = false;
//   }

//   // Logica alternativa per il sensore ultrasonico
//   /*
//   if (ultrasonicSensor.distanceCentimeters < distanzaSogliaCm) {
//     console.log(`Ostacolo rilevato a ${ultrasonicSensor.distanceCentimeters} cm. Arresto del motore.`);
//     keepRunning = false;
//   }
//   */

//   if (!keepRunning) {
//     motorA.stop();
//     clearInterval(checkInterval);
//     console.log('Motore A fermato. Esercizio 3 terminato.');
//     // process.exit(); // Opzionale: termina lo script
//   }
// }, 100); // Controlla lo stato del sensore ogni 100ms

// // Per terminare il programma manualmente, usa Ctrl+C nella console.

console.log('File 03_TerminaCicloConSensore.js creato.');
console.log('Implementare la logica per utilizzare un sensore per terminare un ciclo.');