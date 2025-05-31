/**
 * File: 01_FunzioniBase.js
 * Descrizione: Esempi di base sull'uso delle funzioni in JavaScript per il robot EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// ESEMPIO 1: Dichiarazione e chiamata di funzioni
// ==========================================

// Funzione semplice senza parametri
function saluta() {
    brick.showString("Ciao, sono EV3!", 1);
    pause(2000);
    brick.clearScreen();
}

// Funzione che emette un segnale sonoro
function emettiSuono() {
    music.playTone(440, 500); // La a 440Hz per 500ms
    pause(600);
}

// ==========================================
// ESEMPIO 2: Riutilizzo delle funzioni
// ==========================================

// Funzione che fa muovere il robot in avanti per un breve periodo
function muoviAvanti() {
    brick.showString("Movimento in avanti", 1);
    motors.largeAB.steer(0, 50); // Movimento dritto a velocità 50
    pause(2000);
    motors.largeAB.stop();
    pause(500);
}

// Funzione che fa girare il robot a destra
function giraDestra() {
    brick.showString("Girando a destra", 1);
    motors.largeC.run(30, 1, MoveUnit.Rotations); // Ruota di 1 rotazione
    pause(1000);
}

// Funzione che fa girare il robot a sinistra
function giraSinistra() {
    brick.showString("Girando a sinistra", 1);
    motors.largeC.run(-30, 1, MoveUnit.Rotations); // Ruota di 1 rotazione in senso opposto
    pause(1000);
}

// ==========================================
// ESEMPIO 3: Comporre comportamenti complessi
// ==========================================

// Funzione che implementa un percorso a zigzag
function zigzag() {
    brick.showString("Percorso a zigzag", 1);
    
    // Utilizza le funzioni definite in precedenza per creare un pattern
    muoviAvanti();
    giraDestra();
    muoviAvanti();
    giraSinistra();
    muoviAvanti();
    giraDestra();
    muoviAvanti();
    
    brick.showString("Zigzag completato", 1);
    pause(2000);
    brick.clearScreen();
}

// Funzione che implementa un percorso a quadrato
function percorsoQuadrato() {
    brick.showString("Percorso quadrato", 1);
    
    // Ripeti 4 volte per formare un quadrato
    for (let i = 0; i < 4; i++) {
        brick.showValue("Lato", i + 1, 2);
        muoviAvanti();
        giraDestra();
    }
    
    brick.showString("Quadrato completato", 1);
    pause(2000);
    brick.clearScreen();
}

// ==========================================
// ESEMPIO 4: Funzioni come espressioni
// ==========================================

// Funzione dichiarata come espressione
let emettiDoppioSuono = function() {
    music.playTone(440, 200); // La
    pause(300);
    music.playTone(523, 200); // Do
    pause(300);
};

// ==========================================
// ESEMPIO 5: Funzioni auto-invocate (IIFE)
// ==========================================

// Funzione che viene dichiarata e immediatamente eseguita
(function() {
    brick.showString("Funzione auto-invocata", 1);
    pause(1000);
    brick.clearScreen();
})();

// ==========================================
// ESEMPIO 6: Organizzare un programma completo con funzioni
// ==========================================

// Funzione principale (entry point)
function main() {
    brick.showString("Dimostrazione funzioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui una sequenza di dimostrazioni
    saluta();
    emettiSuono();
    
    brick.showString("Demo movimento base", 1);
    muoviAvanti();
    giraDestra();
    giraSinistra();
    pause(1000);
    
    brick.showString("Demo pattern avanzati", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    zigzag();
    
    brick.showString("Demo percorso quadrato", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    percorsoQuadrato();
    
    emettiDoppioSuono();
    brick.showString("Demo completata!", 1);
}

// ==========================================
// ESECUZIONE DEL PROGRAMMA
// ==========================================

// Avvia il programma principale
main();