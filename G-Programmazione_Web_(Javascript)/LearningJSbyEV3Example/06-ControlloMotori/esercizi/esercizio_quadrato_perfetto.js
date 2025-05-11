// Esercizio 1: Quadrato Perfetto
// Descrizione: Programmare il robot per tracciare un percorso quadrato sul pavimento
// utilizzando movimenti precisi dei motori (es. A e B).

brick.showString("Esercizio: Quadrato", 1);

// Definire la lunghezza del lato del quadrato (es. in secondi di movimento o gradi)
var tempoLato = 1500; // Millisecondi per un lato (da calibrare)
var potenza = 50;     // Potenza dei motori
var tempoGira = 750;  // Millisecondi per una rotazione di 90 gradi (da calibrare)

// Funzione per muovere dritto per un tempo definito
function vaiAvanti(durata) {
    brick.showString("Avanti...", 3);
    brick.motorA.run(potenza);
    brick.motorB.run(potenza);
    pause(durata);
    brick.stopAllMotors();
    pause(200); // Piccola pausa tra i movimenti
}

// Funzione per girare a destra sul posto (A avanti, B indietro)
function giraDestra(durata) {
    brick.showString("Gira Dx...", 4);
    brick.motorA.run(potenza);
    brick.motorB.run(-potenza);
    pause(durata);
    brick.stopAllMotors();
    pause(200);
}

// Esecuzione del quadrato
for (var i = 0; i < 4; i++) {
    vaiAvanti(tempoLato);
    giraDestra(tempoGira);
}

brick.showString("Quadrato completato!", 6);

// Suggerimenti:
// 1. Calibrare `tempoLato` e `tempoGira` per ottenere un quadrato preciso.
//    Potrebbe essere necessario misurare la distanza percorsa e l'angolo di rotazione.
// 2. In alternativa a `pause()`, si possono usare i comandi `brick.motorX.move()` con gradi
//    o rotazioni per movimenti più precisi, come visto nell'esempio `02_MovimentiPrecisi.js`.
//    Ad esempio, per girare di 90 gradi, si potrebbe calcolare quanti gradi deve ruotare
//    un singolo motore mentre l'altro è fermo o ruota in senso opposto.
//    `brick.steer()` potrebbe anche essere usato per le curve, ma per girare sul posto `brick.tank()`
//    (simulato con `motorA.run()` e `motorB.run()` separati) è spesso più diretto.

// Esempio con brick.motorX.move() per un lato (da adattare per il tank drive):
// brick.motorA.move(potenza, 1080); // 1080 gradi = 3 rotazioni (esempio)
// brick.motorB.move(potenza, 1080);
// script.waitMotorStops('A');
// script.waitMotorStops('B');

// Per girare di 90 gradi con move (più complesso, dipende dalla geometria del robot):
// Supponiamo che per girare il robot di 90 gradi, le ruote debbano percorrere X gradi in direzioni opposte.
// brick.motorA.move(potenza, GRADI_PER_90_GRADI_ROT_DESTRA);
// brick.motorB.move(potenza, -GRADI_PER_90_GRADI_ROT_DESTRA);
// script.waitMotorStops('A');
// script.waitMotorStops('B');

brick.showString("Fine Esercizio 1", 8);