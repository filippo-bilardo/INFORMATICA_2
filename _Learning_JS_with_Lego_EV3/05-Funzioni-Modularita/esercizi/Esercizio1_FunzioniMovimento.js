/**
 * Esercizio 1: Programmazione Modulare per Robot Lego EV3
 * 
 * Obiettivo: Implementare un sistema di movimento per il robot EV3 utilizzando funzioni
 * per organizzare il codice in modo modulare.
 * 
 * Compiti:
 * 1. Creare funzioni per i movimenti base del robot
 * 2. Creare funzioni per le sequenze di movimento più complesse
 * 3. Utilizzare le funzioni per implementare un percorso completo
 */

// ==========================================
// FUNZIONI DI MOVIMENTO BASE
// ==========================================

/**
 * Fa avanzare il robot in linea retta
 * @param {number} velocita - Velocità da -100 a 100
 * @param {number} durata - Durata del movimento in millisecondi
 */
function avanti(velocita, durata) {
    // TODO: Implementare questa funzione
    // - Impostare i motori per andare avanti alla velocità specificata
    // - Aspettare per la durata specificata
    // - Arrestare i motori
}

/**
 * Fa indietreggiare il robot in linea retta
 * @param {number} velocita - Velocità da -100 a 100 (sarà invertita)
 * @param {number} durata - Durata del movimento in millisecondi
 */
function indietro(velocita, durata) {
    // TODO: Implementare questa funzione
    // - Impostare i motori per andare indietro alla velocità specificata
    // - Aspettare per la durata specificata
    // - Arrestare i motori
}

/**
 * Fa girare il robot a sinistra sul posto
 * @param {number} velocita - Velocità da 0 a 100
 * @param {number} durata - Durata del movimento in millisecondi
 */
function giraSinistra(velocita, durata) {
    // TODO: Implementare questa funzione
    // - Impostare i motori per girare a sinistra alla velocità specificata
    // - Aspettare per la durata specificata
    // - Arrestare i motori
}

/**
 * Fa girare il robot a destra sul posto
 * @param {number} velocita - Velocità da 0 a 100
 * @param {number} durata - Durata del movimento in millisecondi
 */
function giraDestra(velocita, durata) {
    // TODO: Implementare questa funzione
    // - Impostare i motori per girare a destra alla velocità specificata
    // - Aspettare per la durata specificata
    // - Arrestare i motori
}

/**
 * Ferma tutti i motori
 */
function fermati() {
    // TODO: Implementare questa funzione
    // - Arrestare tutti i motori del robot
}

// ==========================================
// FUNZIONI DI MOVIMENTO COMPLESSE
// ==========================================

/**
 * Fa compiere al robot un cerchio completo
 * @param {number} velocita - Velocità da 0 a 100
 * @param {number} durata - Durata del movimento in millisecondi
 * @param {boolean} direzione - true per senso orario, false per senso antiorario
 */
function cerchio(velocita, durata, direzione) {
    // TODO: Implementare questa funzione
    // - Impostare i motori per tracciare un cerchio nella direzione specificata
    // - Aspettare per la durata specificata
    // - Arrestare i motori
}

/**
 * Fa compiere al robot un movimento a zigzag
 * @param {number} velocita - Velocità da 0 a 100
 * @param {number} numeroZigzag - Numero di zigzag da eseguire
 * @param {number} durataSingolo - Durata di ogni tratto in millisecondi
 */
function zigzag(velocita, numeroZigzag, durataSingolo) {
    // TODO: Implementare questa funzione
    // - Utilizzare le funzioni di movimento base per eseguire un movimento a zigzag
    // - Il robot dovrebbe alternare tra leggere curve a destra e a sinistra
}

/**
 * Fa compiere al robot un quadrato
 * @param {number} velocita - Velocità da 0 a 100
 * @param {number} lunghezzaLato - Durata del movimento per ogni lato in millisecondi
 */
function quadrato(velocita, lunghezzaLato) {
    // TODO: Implementare questa funzione
    // - Utilizzare le funzioni di movimento base per tracciare un quadrato
    // - Avanzare per la durata specificata, poi girare a destra di 90°, ripetere 4 volte
}

/**
 * Fa eseguire al robot una danza
 * @param {number} durata - Durata totale della danza in millisecondi
 */
function danza(durata) {
    // TODO: Implementare questa funzione
    // - Creare una coreografia utilizzando varie funzioni di movimento
    // - Si possono usare le funzioni base e complesse create in precedenza
    // - Aggiungere effetti sonori per rendere la danza più divertente
}

// ==========================================
// FUNZIONI PER IL PERCORSO
// ==========================================

/**
 * Implementa un percorso completo utilizzando le funzioni definite
 */
function percorsoCompleto() {
    brick.showString("Percorso completo", 1);
    
    // TODO: Implementare questa funzione
    // - Utilizzare le funzioni precedentemente implementate per creare un percorso completo
    // - Il percorso dovrebbe mostrare l'utilizzo di diverse funzioni in sequenza
    // - Aggiungere messaggi informativi sul display tra un movimento e l'altro
    
    // Esempio di implementazione:
    // brick.showString("Movimento in avanti", 2);
    // avanti(50, 2000);
    // brick.showString("Rotazione a destra", 2);
    // giraDestra(40, 1000);
    // brick.showString("Zigzag", 2);
    // zigzag(60, 3, 1000);
    // Etc...
    
    brick.showString("Percorso completato", 1);
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Esercizio: Funzioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui il percorso completo
    percorsoCompleto();
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Esercizio completato!", 1);
}

// Avvia il programma principale
main();