// Esercizio 3: Utilizzare Operatori Logici per Condizioni Complesse
// In questo esercizio, si dovrà scrivere codice JavaScript che utilizzi operatori logici (AND, OR, NOT)
// per prendere decisioni basate su input multipli, ad esempio da due sensori diversi o
// da un sensore e lo stato di un motore.

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Connetti ai sensori (es. sensore tattile su in1, sensore di colore su in2)
// let touchSensor = new ev3.TouchSensor('in1');
// let colorSensor = new ev3.ColorSensor('in2');
// colorSensor.mode = 'COL-COLOR'; // Modalità per rilevare il colore

// // Connetti al motore (es. motore grande sulla porta outA)
// let motorA = new ev3.LargeMotor('outA');
// let speaker = new ev3.Sound();

// console.log('Esercizio 3 avviato. Utilizza i sensori per controllare il motore.');

// // Loop principale o logica di controllo
// setInterval(() => {
//   let isPressed = touchSensor.isPressed;
//   let detectedColor = colorSensor.color;

//   // Esempio di condizione complessa:
//   // Avvia il motore se il sensore tattile è premuto E il sensore di colore rileva il rosso (colore 5)
//   if (isPressed && detectedColor === 5) {
//     console.log('Condizione complessa soddisfatta (premuto E colore rosso): avvio motore A.');
//     motorA.runForever(400);
//     speaker.speak('Motore avviato, rosso rilevato').wait();
//   }
//   // Altra condizione: ferma il motore se il sensore tattile NON è premuto OPPURE il colore rilevato è blu (colore 2)
//   else if (!isPressed || detectedColor === 2) {
//     if (motorA.state.includes('running')) {
//       console.log('Condizione di stop (non premuto O colore blu): fermo motore A.');
//       motorA.stop();
//       speaker.speak('Motore fermo, blu rilevato o non premuto').wait();
//     }
//   }
//   // Altrimenti, se nessuna delle condizioni sopra è vera e il motore è in funzione, fermalo per sicurezza
//   // (Questo è un esempio, la logica specifica dipenderà dai requisiti dell'esercizio)
//   else {
//       if (motorA.state.includes('running')) {
//           console.log('Nessuna condizione specifica, fermo motore A per sicurezza.');
//           motorA.stop();
//       }
//   }

//   // Stampa i valori dei sensori per debug
//   // console.log(`Touch: ${isPressed}, Color: ${detectedColor}`);

// }, 200); // Controlla ogni 200ms

// // Per terminare il programma, di solito si usa Ctrl+C nella console

console.log('File 03_OperatoriLogiciEsercizio.js creato.');
console.log('Implementare la logica per utilizzare operatori logici per condizioni complesse.');