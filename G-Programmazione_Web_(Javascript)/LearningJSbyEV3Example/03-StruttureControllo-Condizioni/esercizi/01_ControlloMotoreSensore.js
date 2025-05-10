// Esercizio 1: Controllare un Motore in Base a un Input del Sensore
// In questo esercizio, si dovrà scrivere codice JavaScript per controllare
// un motore del robot EV3 in base al valore letto da un sensore (es. sensore tattile o di distanza).

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Connetti al sensore (es. sensore tattile sulla porta in1)
// let touchSensor = new ev3.TouchSensor('in1');
// // Connetti al motore (es. motore grande sulla porta outA)
// let motorA = new ev3.LargeMotor('outA');

// console.log('Esercizio 1 avviato. Premi il sensore tattile per avviare il motore.');

// // Loop principale o logica di controllo
// setInterval(() => {
//   if (touchSensor.isPressed) {
//     console.log('Sensore premuto: avvio motore A.');
//     motorA.runForever(300); // Avvia il motore a velocità 300
//   } else {
//     if (motorA.state.includes('running')) {
//       console.log('Sensore rilasciato: fermo motore A.');
//       motorA.stop(); // Ferma il motore
//     }
//   }
// }, 100); // Controlla ogni 100ms

// // Per terminare il programma, di solito si usa Ctrl+C nella console
// // o si implementa una logica di uscita (es. dopo un certo tempo o un altro input)

console.log('File 01_ControlloMotoreSensore.js creato.');
console.log('Implementare la logica per controllare un motore in base a un input del sensore.');