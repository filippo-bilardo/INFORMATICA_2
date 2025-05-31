// Esercizio 1: Calcolare la Distanza Percorsa
// Definisci una variabile per la velocità (es. cm/s) e una per il tempo (es. secondi).
// Calcola la distanza percorsa (distanza = velocità * tempo).
// Mostra la distanza calcolata sul display dell'EV3.

let velocita = 10 // cm/s
let tempo = 5    // secondi
let distanza = velocita * tempo

brick.showString("Distanza: " + distanza + " cm", 1)