// Esercizio 04: Media Mobile delle Letture del Sensore
// Obiettivo: Implementare un filtro a media mobile per "smussare" le letture 
// di un sensore (es. sensore di colore o ultrasuoni). Questo è utile per 
// ridurre il rumore e ottenere valori più stabili.
//
// Dettagli:
// - Mantieni un array (una "finestra") delle ultime N letture del sensore.
// - Ad ogni nuova lettura, aggiungila all'array e, se l'array supera la 
//   dimensione N, rimuovi la lettura più vecchia.
// - Calcola la media dei valori nell'array e usa questa media come valore 
//   "filtrato" del sensore.
// - Visualizza sia la lettura grezza che quella filtrata sulla console o 
//   sul display dell'EV3.
//
// Concetti da Applicare: Array (come coda/buffer circolare), calcoli numerici, 
// gestione dati da sensori.
//
// TODO: Implementare la logica dell'esercizio.

brick.showString("Esercizio: Media Mobile", 1);
console.log("Testare il filtro a media mobile con un sensore.");

// Esempio di struttura dati per la finestra di letture
const N = 5; // Dimensione della finestra
let lettureSensore = [];

// Qui andrà la logica per leggere il sensore, aggiornare la finestra e calcolare la media