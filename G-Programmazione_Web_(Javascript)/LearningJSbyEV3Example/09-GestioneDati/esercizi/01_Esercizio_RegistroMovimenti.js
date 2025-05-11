// Esercizio 01: Registro dei Movimenti del Robot
// Obiettivo: Creare un programma che registra una sequenza di movimenti del robot 
// (es. avanti, gira a destra, avanti, gira a sinistra) in un array. 
// Successivamente, il robot deve rieseguire la sequenza registrata.
//
// Dettagli:
// - Usa i pulsanti del brick EV3 per registrare i comandi (es. Su = Avanti, 
//   Destra = Gira a Destra, Sinistra = Gira a Sinistra, Giù = Termina Registrazione ed Esegui).
// - Ogni comando può essere un oggetto con proprietà come 
//   { azione: "avanti", durata: 1000 } o { azione: "gira", direzione: "destra", angolo: 90 }.
// - Memorizza questi oggetti in un array.
// - Una volta terminata la registrazione, itera sull'array ed esegui i comandi.
//
// Concetti da Applicare: Array, oggetti, gestione eventi dei pulsanti, cicli, controllo motori.
//
// TODO: Implementare la logica dell'esercizio.

brick.showString("Esercizio: Registro Movimenti", 1);
console.log("Avviare la registrazione dei movimenti con i pulsanti.");

// Esempio di struttura dati per i movimenti
let sequenzaMovimenti = [];
let registrando = true; // Diventa false quando si preme 'Giù'

// Qui andrà la logica per la gestione dei pulsanti e la registrazione/esecuzione