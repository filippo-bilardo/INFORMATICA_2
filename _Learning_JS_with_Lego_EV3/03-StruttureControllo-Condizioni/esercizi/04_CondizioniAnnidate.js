// Esercizio Avanzato: Condizioni Annidate e Operatori Logici
// Obiettivo: Gestire un robot che deve evitare ostacoli e fermarsi solo se due condizioni sono vere contemporaneamente.

// Simulazione input sensori
let distanza = 15; // cm
let colore = "rosso"; // colore rilevato dal sensore

if ((distanza < 20 && colore === "rosso") || (distanza < 10 && colore !== "verde")) {
  // Il robot si ferma solo se è vicino a un ostacolo rosso oppure molto vicino a un ostacolo non verde
  console.log("Robot FERMO: condizione di sicurezza attivata!");
} else if (distanza < 20 && colore === "verde") {
  // Se è vicino ma il colore è verde, rallenta
  console.log("Robot RALLENTA: ostacolo verde rilevato.");
} else {
  // Altrimenti continua
  console.log("Robot AVANTI: nessun pericolo.");
}

// Modifica i valori di distanza e colore per testare tutti i casi possibili!