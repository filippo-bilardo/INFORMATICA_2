// Esempio 1: Gestione di un ReferenceError

console.log("--- Esempio 1: ReferenceError ---");
try {
  console.log("Sto per accedere a una variabile non definita...");
  let risultato = variabileInesistente + 5; // Questa riga causerà un ReferenceError
  console.log("Questa riga non verrà eseguita.");
} catch (errore) {
  console.error("Errore catturato!");
  console.error("Tipo di errore:", errore.name);
  console.error("Messaggio:", errore.message);
  // console.error("Stack trace:", errore.stack); // Decommenta per vedere lo stack
}
console.log("L'esecuzione continua dopo il primo try...catch.");

console.log("\n--- Esempio 2: Nessun Errore ---");
// Esempio 2: Blocco try senza errori
try {
  console.log("Questo blocco try non genererà errori.");
  let somma = 10 + 5;
  console.log("La somma è:", somma);
  console.log("Fine del blocco try senza problemi.");
} catch (errore) {
  // Questo blocco catch non verrà eseguito
  console.error("Questo messaggio non dovrebbe apparire:", errore.message);
}
console.log("L'esecuzione continua dopo il secondo try...catch.");

console.log("\n--- Esempio 3: TypeError ---");
// Esempio 3: Gestione di un TypeError
try {
  console.log("Sto per chiamare null come se fosse una funzione...");
  null.metodoInesistente(); // Questo causerà un TypeError
} catch (e) {
  console.error("Errore catturato!");
  console.error("Tipo di errore:", e.name);
  console.error("Messaggio:", e.message);
}
console.log("Fine dello script.");