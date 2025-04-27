// Esempio 2: Parsing di stringhe JSON in oggetti JavaScript

// Stringa JSON semplice
const personaJSON = '{"nome":"Mario Rossi","età":35,"professione":"Sviluppatore","città":"Milano"}';

// Parsing della stringa JSON in oggetto JavaScript
try {
  const persona = JSON.parse(personaJSON);
  console.log("JSON convertito in oggetto JavaScript:");
  console.log(persona);
  console.log(`Nome: ${persona.nome}, Età: ${persona.età}`);
} catch (errore) {
  console.error("Errore durante il parsing:", errore.message);
}

// Stringa JSON con array
const linguaggiJSON = '["JavaScript", "Python", "Java", "C++", "PHP"]';

try {
  const linguaggi = JSON.parse(linguaggiJSON);
  console.log("\nArray JSON convertito in array JavaScript:");
  console.log(linguaggi);
  console.log(`Primo linguaggio: ${linguaggi[0]}, Numero di linguaggi: ${linguaggi.length}`);
} catch (errore) {
  console.error("Errore durante il parsing:", errore.message);
}

// Stringa JSON con struttura annidata
const datiAnnidatiJSON = `{
  "azienda": "Tech Solutions",
  "dipendenti": [
    {
      "nome": "Mario",
      "ruolo": "Sviluppatore",
      "competenze": ["JavaScript", "HTML", "CSS"]
    },
    {
      "nome": "Laura",
      "ruolo": "Designer",
      "competenze": ["Photoshop", "Illustrator", "Figma"]
    }
  ],
  "sede": {
    "città": "Milano",
    "indirizzo": "Via Tecnologica 42"
  }
}`;

try {
  const datiAnnidati = JSON.parse(datiAnnidatiJSON);
  console.log("\nJSON annidato convertito in oggetto JavaScript:");
  console.log(datiAnnidati);
  console.log(`Azienda: ${datiAnnidati.azienda}`);
  console.log(`Primo dipendente: ${datiAnnidati.dipendenti[0].nome}`);
  console.log(`Competenze del primo dipendente: ${datiAnnidati.dipendenti[0].competenze.join(", ")}`);
  console.log(`Sede: ${datiAnnidati.sede.città}, ${datiAnnidati.sede.indirizzo}`);
} catch (errore) {
  console.error("Errore durante il parsing:", errore.message);
}

// Utilizzo del parametro reviver per trasformare valori durante il parsing
const eventiJSON = '{"titolo":"Riunione","data":"2023-05-15T14:30:00Z","partecipanti":["Mario","Laura","Giovanni"]}';

try {
  // Utilizziamo il reviver per convertire le stringhe di data in oggetti Date
  const eventi = JSON.parse(eventiJSON, (chiave, valore) => {
    if (chiave === 'data' && typeof valore === 'string') {
      return new Date(valore);
    }
    return valore;
  });
  
  console.log("\nJSON con date convertito in oggetto JavaScript:");
  console.log(eventi);
  console.log(`Titolo: ${eventi.titolo}`);
  console.log(`Data: ${eventi.data.toLocaleString()}`);
  console.log(`La data è un oggetto Date: ${eventi.data instanceof Date}`);
} catch (errore) {
  console.error("Errore durante il parsing:", errore.message);
}

// Gestione degli errori durante il parsing
const jsonNonValido = '{"nome":"Mario","età":30,}';

try {
  const dati = JSON.parse(jsonNonValido);
  console.log(dati);
} catch (errore) {
  console.error("\nErrore durante il parsing di JSON non valido:", errore.message);
}