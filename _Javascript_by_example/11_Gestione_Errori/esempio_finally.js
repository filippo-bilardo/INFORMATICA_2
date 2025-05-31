// Esempio 1: Finally con successo nel try

console.log("--- Esempio 1: Successo nel try ---");
try {
  console.log("Blocco try: Operazione avviata.");
  // Simulazione di un'operazione che va a buon fine
  console.log("Blocco try: Operazione completata con successo.");
} catch (errore) {
  console.error("Blocco catch: Questo non dovrebbe essere eseguito.", errore.message);
} finally {
  console.log("Blocco finally: Eseguito dopo il try (anche senza errori).");
  // Qui si metterebbe codice di pulizia, es. chiusura di una risorsa
}

console.log("\n--- Esempio 2: Errore catturato nel catch ---");
// Esempio 2: Finally dopo un errore catturato
try {
  console.log("Blocco try: Provo a eseguire un'operazione rischiosa...");
  throw new Error("Qualcosa è andato storto intenzionalmente!");
  console.log("Blocco try: Questa riga non viene raggiunta.");
} catch (errore) {
  console.error("Blocco catch: Errore catturato -", errore.message);
} finally {
  console.log("Blocco finally: Eseguito dopo il catch.");
  // La pulizia avviene anche se c'è stato un errore
}

console.log("\n--- Esempio 3: try...finally senza catch ---");
// Esempio 3: try...finally (l'errore si propaga dopo finally)
try {
  console.log("Blocco try: Avvio operazione...");
  throw new Error("Errore che non verrà catturato qui.");
} finally {
  console.log("Blocco finally: Eseguito prima della propagazione dell'errore.");
  // Pulizia essenziale anche se l'errore non è gestito qui
}

// Nota: L'errore dell'Esempio 3 interromperà lo script qui,
// a meno che non ci sia un try...catch più esterno.
console.log("Questa riga verrà eseguita solo se l'errore dell'Esempio 3 viene catturato altrove.");