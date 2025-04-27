// Esempio 1: Conversione di oggetti JavaScript in JSON

// Oggetto JavaScript semplice
const persona = {
  nome: "Mario Rossi",
  età: 35,
  professione: "Sviluppatore",
  città: "Milano"
};

// Conversione dell'oggetto in stringa JSON
const personaJSON = JSON.stringify(persona);
console.log("Oggetto convertito in JSON:")
console.log(personaJSON);

// Oggetto JavaScript con tipi di dati diversi
const datiMisti = {
  stringa: "Testo di esempio",
  numero: 42,
  booleano: true,
  nullo: null,
  array: [1, 2, 3, 4, 5],
  oggetto: {
    chiave1: "valore1",
    chiave2: "valore2"
  },
  data: new Date()
};

// Conversione con formattazione (indentazione di 2 spazi)
const datiMistiJSON = JSON.stringify(datiMisti, null, 2);
console.log("\nOggetto con tipi misti convertito in JSON (formattato):")
console.log(datiMistiJSON);

// Utilizzo del parametro replacer per filtrare proprietà
const datiSensibili = {
  utente: "mario_rossi",
  email: "mario@example.com",
  password: "password123",
  token: "abc123xyz789"
};

// Escludiamo password e token dalla serializzazione
const datiSensibiliJSON = JSON.stringify(datiSensibili, (chiave, valore) => {
  if (chiave === "password" || chiave === "token") {
    return undefined; // Esclude questa proprietà
  }
  return valore;
}, 2);

console.log("\nOggetto con dati sensibili filtrati:")
console.log(datiSensibiliJSON);

// Conversione di un array in JSON
const linguaggi = ["JavaScript", "Python", "Java", "C++", "PHP"];
const linguaggiJSON = JSON.stringify(linguaggi);

console.log("\nArray convertito in JSON:")
console.log(linguaggiJSON);

// Gestione di valori non serializzabili
const datiComplessi = {
  funzione: function() { return "Ciao"; },
  simbolo: Symbol("simbolo"),
  undefined: undefined,
  regExp: /pattern/g,
  normale: "Questo è un valore normale"
};

const datiComplessiJSON = JSON.stringify(datiComplessi);
console.log("\nOggetto con valori non serializzabili:")
console.log(datiComplessiJSON);
// Nota: funzione, simbolo e undefined sono stati omessi