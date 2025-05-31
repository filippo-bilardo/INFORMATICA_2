// Esercizio 03: Mappatura Semplice dell'Ambiente
// Obiettivo: Il robot esplora un'area limitata e tenta di "mappare" la posizione 
// degli ostacoli rilevati con il sensore a ultrasuoni. La mappa può essere un 
// semplice array di array (griglia) o un array di coordinate.
//
// Dettagli:
// - Il robot si muove in una direzione. Quando rileva un ostacolo, registra la sua 
//   posizione approssimativa (puoi semplificare usando un sistema di coordinate 
//   relativo al punto di partenza del robot).
// - La "mappa" può essere un array di oggetti, dove ogni oggetto rappresenta un 
//   ostacolo con le sue coordinate {x: valore, y: valore}.
// - Visualizza le coordinate degli ostacoli rilevati sulla console di MakeCode.
//
// Concetti da Applicare: Array, oggetti, gestione dati da sensori, logica di movimento, 
// (opzionale) calcoli geometrici semplici.
// Sfida Aggiuntiva: Prova a far sì che il robot eviti gli ostacoli già mappati se li incontra di nuovo.
//
// TODO: Implementare la logica dell'esercizio.

brick.showString("Esercizio: Mappatura", 1);
console.log("Avviare l'esplorazione per mappare gli ostacoli.");

// Esempio di struttura dati per la mappa
let mappaOstacoli = []; // Array di oggetti {x: number, y: number}

// Qui andrà la logica per il movimento, il rilevamento e la mappatura