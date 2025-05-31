// Esempio di utilizzo dell'oggetto Error

function dividi(a, b) {
  if (b === 0) {
    // Creiamo un nuovo oggetto Error con un messaggio specifico
    throw new Error("Divisione per zero non consentita!");
  }
  return a / b;
}

try {
  const risultato = dividi(10, 0);
  console.log("Risultato:", risultato); // Questa riga non verrà eseguita
} catch (errore) {
  console.error("Si è verificato un errore:");
  console.error("Nome dell'errore:", errore.name); // Proprietà 'name' dell'errore (es. 'Error')
  console.error("Messaggio dell'errore:", errore.message); // Proprietà 'message' dell'errore
  // console.error("Stack trace:", errore.stack); // Proprietà 'stack' (può essere lunga)
}

console.log("--- Esempio con tipi di errore specifici ---");

try {
  // Simuliamo un errore di tipo diverso (TypeError)
  let valoreNullo = null;
  console.log(valoreNullo.proprietaInesistente);
} catch (errore) {
  console.error("Si è verificato un errore:");
  console.error("Nome dell'errore:", errore.name); // Sarà 'TypeError'
  console.error("Messaggio dell'errore:", errore.message);

  // Possiamo controllare il tipo di errore
  if (errore instanceof TypeError) {
    console.log("Questo è un TypeError!");
  } else if (errore instanceof ReferenceError) {
    console.log("Questo è un ReferenceError!");
  } else {
    console.log("Questo è un altro tipo di errore.");
  }
}

console.log("Esecuzione completata.");