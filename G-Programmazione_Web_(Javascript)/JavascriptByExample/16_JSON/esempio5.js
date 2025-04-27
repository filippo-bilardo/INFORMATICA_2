// Esempio 5: Memorizzazione di dati JSON nel localStorage

// Funzione per salvare dati nel localStorage come JSON
function salvaInLocalStorage(chiave, dati) {
  try {
    // Converti i dati in formato JSON
    const jsonString = JSON.stringify(dati);
    
    // Salva nel localStorage
    localStorage.setItem(chiave, jsonString);
    
    return { successo: true, messaggio: `Dati salvati con chiave: ${chiave}` };
  } catch (errore) {
    console.error(`Errore durante il salvataggio dei dati: ${errore.message}`);
    return { successo: false, messaggio: errore.message };
  }
}

// Funzione per recuperare dati dal localStorage e convertirli da JSON
function recuperaDaLocalStorage(chiave) {
  try {
    // Recupera la stringa JSON dal localStorage
    const jsonString = localStorage.getItem(chiave);
    
    // Verifica se la chiave esiste
    if (jsonString === null) {
      return { successo: false, messaggio: `Nessun dato trovato per la chiave: ${chiave}`, dati: null };
    }
    
    // Converti la stringa JSON in oggetto JavaScript
    const dati = JSON.parse(jsonString);
    
    return { successo: true, messaggio: `Dati recuperati con successo`, dati };
  } catch (errore) {
    console.error(`Errore durante il recupero dei dati: ${errore.message}`);
    return { successo: false, messaggio: errore.message, dati: null };
  }
}

// Funzione per rimuovere dati dal localStorage
function rimuoviDaLocalStorage(chiave) {
  try {
    // Verifica se la chiave esiste
    if (localStorage.getItem(chiave) === null) {
      return { successo: false, messaggio: `Nessun dato trovato per la chiave: ${chiave}` };
    }
    
    // Rimuovi i dati
    localStorage.removeItem(chiave);
    
    return { successo: true, messaggio: `Dati rimossi con successo per la chiave: ${chiave}` };
  } catch (errore) {
    console.error(`Errore durante la rimozione dei dati: ${errore.message}`);
    return { successo: false, messaggio: errore.message };
  }
}

// Esempi di utilizzo (commentati per evitare modifiche reali al localStorage)

// Esempio di dati utente
const utente = {
  id: 1,
  nome: "Mario Rossi",
  email: "mario@example.com",
  preferenze: {
    tema: "scuro",
    notifiche: true,
    lingua: "it"
  },
  ultimoAccesso: new Date().toISOString()
};

console.log('Dati utente da salvare:');
console.log(utente);

// Simulazione di salvataggio
console.log('\nSimulazione di salvataggio nel localStorage:');
console.log(`localStorage.setItem('utente', '${JSON.stringify(utente)}');`);

// Simulazione di recupero
console.log('\nSimulazione di recupero dal localStorage:');
console.log('const jsonString = localStorage.getItem(\'utente\');');
console.log('const utenteRecuperato = JSON.parse(jsonString);');
console.log('console.log(utenteRecuperato);');

// Gestione di dati con date
console.log('\nGestione di date con localStorage:');

const evento = {
  id: 1,
  titolo: "Riunione importante",
  data: new Date(),
  partecipanti: ["Mario", "Laura", "Giovanni"]
};

console.log('Evento originale con oggetto Date:');
console.log(evento);

// La data viene convertita in stringa durante la serializzazione
const eventoJSON = JSON.stringify(evento);
console.log('\nEvento serializzato in JSON (la data diventa stringa):');
console.log(eventoJSON);

// Quando recuperiamo, dobbiamo riconvertire la data
const eventoRecuperato = JSON.parse(eventoJSON, (chiave, valore) => {
  if (chiave === 'data' && typeof valore === 'string') {
    return new Date(valore);
  }
  return valore;
});

console.log('\nEvento recuperato con data riconvertita in oggetto Date:');
console.log(eventoRecuperato);
console.log(`La data è un oggetto Date: ${eventoRecuperato.data instanceof Date}`);

// Esempio di gestione della persistenza di un carrello acquisti
const carrello = {
  prodotti: [
    { id: 101, nome: "Smartphone", prezzo: 499.99, quantità: 1 },
    { id: 202, nome: "Auricolari Bluetooth", prezzo: 79.99, quantità: 2 }
  ],
  totale: function() {
    return this.prodotti.reduce((sum, prodotto) => sum + (prodotto.prezzo * prodotto.quantità), 0);
  },
  dataAggiornamento: new Date()
};

console.log('\nCarrello acquisti originale:');
console.log(carrello);
console.log(`Totale carrello: ${carrello.totale()} €`);

// Nota: il metodo totale() verrà perso durante la serializzazione
const carrelloJSON = JSON.stringify(carrello);
console.log('\nCarrello serializzato in JSON (il metodo totale() viene perso):');
console.log(carrelloJSON);

const carrelloRecuperato = JSON.parse(carrelloJSON);
console.log('\nCarrello recuperato (senza il metodo totale()):');
console.log(carrelloRecuperato);

// Dobbiamo riaggiungere il metodo manualmente
carrelloRecuperato.totale = function() {
  return this.prodotti.reduce((sum, prodotto) => sum + (prodotto.prezzo * prodotto.quantità), 0);
};

console.log(`Totale carrello dopo il recupero: ${carrelloRecuperato.totale()} €`);