// Esempio di utilizzo dell'istruzione throw per lanciare errori personalizzati

// Funzione che valida un input numerico
function validaNumeroPositivo(numero) {
  if (typeof numero !== 'number') {
    throw new TypeError("L'input deve essere un numero.");
  }
  if (numero < 0) {
    // Lanciamo un errore personalizzato (RangeError è appropriato qui)
    throw new RangeError("Il numero non può essere negativo.");
  }
  if (numero === 0) {
    // Possiamo anche lanciare stringhe o altri tipi, ma è sconsigliato
    // È sempre meglio lanciare oggetti Error o sue sottoclassi
    // throw "Il numero non può essere zero (lanciato come stringa)";
    throw new Error("Il numero non può essere zero.");
  }
  console.log("Il numero", numero, "è valido.");
}

console.log("--- Tentativo con numero valido ---");
try {
  validaNumeroPositivo(10);
} catch (errore) {
  console.error("Errore catturato:", errore.message);
}

console.log("\n--- Tentativo con input non numerico ---");
try {
  validaNumeroPositivo("abc");
} catch (errore) {
  console.error("Errore catturato:", errore.name, "-", errore.message);
}

console.log("\n--- Tentativo con numero negativo ---");
try {
  validaNumeroPositivo(-5);
} catch (errore) {
  console.error("Errore catturato:", errore.name, "-", errore.message);
}

console.log("\n--- Tentativo con zero ---");
try {
  validaNumeroPositivo(0);
} catch (errore) {
  console.error("Errore catturato:", errore.name, "-", errore.message);
}

console.log("\nEsecuzione completata.");