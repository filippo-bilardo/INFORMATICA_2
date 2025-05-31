/**
 * Esercizio 1: Libreria di Funzioni Base
 * 
 * Obiettivo: Creare una libreria di funzioni di base per il movimento del robot EV3
 * e utilizzarle per creare una sequenza di movimenti complessa.
 * 
 * Compiti:
 * 1. Completare le funzioni di base per il movimento (già definite)
 * 2. Implementare la funzione percorsoTest() per creare un percorso complesso
 * 3. Aggiungere una funzione personalizzata per un'azione speciale del robot
 */

// ==========================================
// LIBRERIA DI FUNZIONI DI BASE
// ==========================================

// TODO: Completare questa funzione per far avanzare il robot
function avanti(velocita, millisecondi) {
    // SCRIVI IL TUO CODICE QUI
    // Usa motors.largeAB.steer(0, velocita) per far avanzare il robot
    // Usa pause(millisecondi) per attendere
    // Ricordati di fermare i motori alla fine
}

// TODO: Completare questa funzione per far arretrare il robot
function indietro(velocita, millisecondi) {
    // SCRIVI IL TUO CODICE QUI
    // Usa una velocità negativa per andare indietro
}

// TODO: Completare questa funzione per far girare il robot a destra
function giraDestra(velocita, gradi) {
    // SCRIVI IL TUO CODICE QUI
    // Usa il motore C per girare il robot
    // Converti i gradi in rotazioni in base alla configurazione del tuo robot
}

// TODO: Completare questa funzione per far girare il robot a sinistra
function giraSinistra(velocita, gradi) {
    // SCRIVI IL TUO CODICE QUI
    // Simile a giraDestra, ma nella direzione opposta
}

// TODO: Completare questa funzione per emettere un suono
function suona(frequenza, durata) {
    // SCRIVI IL TUO CODICE QUI
    // Usa music.playTone(frequenza, durata)
}

// TODO: Completare questa funzione per far attendere il robot
function attendi(millisecondi) {
    // SCRIVI IL TUO CODICE QUI
    // Usa pause() per attendere
}

// ==========================================
// FUNZIONE DI PERCORSO TEST
// ==========================================

// TODO: Implementare questa funzione per creare un percorso di test
function percorsoTest() {
    brick.showString("Inizio percorso test", 1);
    
    // SCRIVI IL TUO CODICE QUI
    // Utilizza le funzioni definite sopra per creare un percorso
    // che comprenda:
    // - Movimento in avanti
    // - Una rotazione
    // - Movimento indietro
    // - Un'altra rotazione
    // - Un suono alla fine
    
    brick.showString("Fine percorso test", 1);
}

// ==========================================
// FUNZIONE PERSONALIZZATA
// ==========================================

// TODO: Implementare una funzione personalizzata che faccia compiere
// al robot un'azione speciale (es. una danza, un disegno, ecc.)
function azioneSpeciale() {
    brick.showString("Azione speciale", 1);
    
    // SCRIVI IL TUO CODICE QUI
    // Sii creativo! Utilizza le funzioni definite sopra in modi interessanti
    
    brick.showString("Fine azione speciale", 1);
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Esercizio: Libreria di funzioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui il percorso di test
    percorsoTest();
    
    // Piccola pausa
    brick.showString("Premere per azione speciale", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui l'azione speciale
    azioneSpeciale();
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Esercizio completato!", 1);
}

// Avvia il programma principale
main();