// Esercizio 2: Eseguire Azioni Diverse a Seconda del Pulsante Premuto
// In questo esercizio, si dovrà scrivere codice JavaScript per far eseguire al robot EV3
// azioni diverse (es. muovere motori specifici, emettere suoni) a seconda di quale pulsante
// sulla brick EV3 viene premuto (Su, Giù, Sinistra, Destra, Centro, Indietro).

// Esempio di struttura:
// const ev3 = require('ev3dev-lang-js');

// // Oggetto per mappare i nomi dei pulsanti alle loro funzioni (opzionale, per chiarezza)
// const buttons = {
//   UP: 'up',
//   DOWN: 'down',
//   LEFT: 'left',
//   RIGHT: 'right',
//   ENTER: 'enter',
//   BACKSPACE: 'backspace'
// };

// // Connetti ai motori (es. motori grandi sulle porte outA e outB)
// let motorA = new ev3.LargeMotor('outA');
// let motorB = new ev3.LargeMotor('outB');
// let speaker = new ev3.Sound();

// console.log('Esercizio 2 avviato. Premi i pulsanti sulla brick EV3.');

// // Funzione per gestire la pressione dei pulsanti
// function handleButtonPress(button) {
//   console.log(`Pulsante premuto: ${button}`);
//   switch (button) {
//     case buttons.UP:
//       console.log('Azione: Muovi motore A avanti');
//       motorA.runForever(200);
//       motorB.stop();
//       speaker.speak('Avanti').wait();
//       break;
//     case buttons.DOWN:
//       console.log('Azione: Muovi motore B avanti');
//       motorB.runForever(200);
//       motorA.stop();
//       speaker.speak('Indietro').wait();
//       break;
//     case buttons.LEFT:
//       console.log('Azione: Ruota a sinistra');
//       motorA.runTimed(1000, -200); // ms, speed
//       motorB.runTimed(1000, 200);
//       speaker.speak('Sinistra').wait();
//       break;
//     case buttons.RIGHT:
//       console.log('Azione: Ruota a destra');
//       motorA.runTimed(1000, 200);
//       motorB.runTimed(1000, -200);
//       speaker.speak('Destra').wait();
//       break;
//     case buttons.ENTER:
//       console.log('Azione: Stop motori');
//       motorA.stop();
//       motorB.stop();
//       speaker.beep();
//       break;
//     case buttons.BACKSPACE:
//       console.log('Azione: Esci dal programma');
//       motorA.stop();
//       motorB.stop();
//       speaker.speak('Uscita').wait();
//       process.exit(); // Termina lo script
//       break;
//     default:
//       console.log('Pulsante non gestito');
//   }
// }

// // Ascolta gli eventi dei pulsanti
// // Nota: la libreria ev3dev-lang-js potrebbe avere un modo specifico per gestire gli eventi dei pulsanti.
// // Questo è un esempio concettuale. Potrebbe essere necessario utilizzare `ev3.ButtonEvents`
// // o un meccanismo simile fornito dalla libreria per la gestione effettiva degli eventi.

// // Esempio ipotetico di ascolto (la sintassi reale dipende dalla libreria):
// /*
// const buttonPoller = new ev3.ButtonPoller();
// buttonPoller.on('up', () => handleButtonPress(buttons.UP));
// buttonPoller.on('down', () => handleButtonPress(buttons.DOWN));
// buttonPoller.on('left', () => handleButtonPress(buttons.LEFT));
// buttonPoller.on('right', () => handleButtonPress(buttons.RIGHT));
// buttonPoller.on('enter', () => handleButtonPress(buttons.ENTER));
// buttonPoller.on('backspace', () => handleButtonPress(buttons.BACKSPACE));
// */

// console.log('Per terminare il programma, premi il pulsante Indietro (Backspace) o usa Ctrl+C.');

console.log('File 02_ControlloPulsanti.js creato.');
console.log('Implementare la logica per eseguire azioni diverse a seconda del pulsante premuto.');