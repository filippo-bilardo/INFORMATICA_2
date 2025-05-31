/**
 * Esempio 4: Utilizzo di generatori per gestire operazioni asincrone
 * 
 * Questo esempio mostra come i generatori possono essere utilizzati per
 * semplificare il codice asincrono e creare un flusso di esecuzione più lineare.
 */

// Funzione di utilità per eseguire generatori con promesse
function eseguiGeneratore(generatore) {
  return new Promise((resolve, reject) => {
    function passo(valorePrecedente) {
      let risultato;
      
      try {
        risultato = generatore.next(valorePrecedente);
      } catch (err) {
        return reject(err);
      }
      
      if (risultato.done) {
        return resolve(risultato.value);
      }
      
      Promise.resolve(risultato.value)
        .then(valore => passo(valore))
        .catch(err => {
          try {
            passo(generatore.throw(err));
          } catch (e) {
            reject(e);
          }
        });
    }
    
    passo();
  });
}

// Simulazione di chiamate API asincrone
function caricaUtente(id) {
  console.log(`Caricamento utente con ID: ${id}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Utente caricato');
      resolve({
        id,
        nome: 'Mario Rossi',
        email: 'mario.rossi@example.com'
      });
    }, 1000);
  });
}

function caricaOrdini(utente) {
  console.log(`Caricamento ordini per l'utente: ${utente.nome}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Ordini caricati');
      resolve([
        { id: 1, prodotto: 'Laptop', prezzo: 1200 },
        { id: 2, prodotto: 'Smartphone', prezzo: 800 },
        { id: 3, prodotto: 'Tablet', prezzo: 400 }
      ]);
    }, 1000);
  });
}

function calcolaTotale(ordini) {
  console.log('Calcolo del totale degli ordini...');
  return new Promise(resolve => {
    setTimeout(() => {
      const totale = ordini.reduce((sum, ordine) => sum + ordine.prezzo, 0);
      console.log(`Totale calcolato: €${totale}`);
      resolve(totale);
    }, 500);
  });
}

// Utilizzo di un generatore per gestire il flusso asincrono
function* flussoOrdiniUtente(userId) {
  try {
    // Ogni yield sospende l'esecuzione fino a quando la promessa non viene risolta
    const utente = yield caricaUtente(userId);
    console.log(`Utente trovato: ${utente.nome}`);
    
    const ordini = yield caricaOrdini(utente);
    console.log(`Numero di ordini: ${ordini.length}`);
    
    const totale = yield calcolaTotale(ordini);
    
    return {
      utente,
      ordini,
      totale,
      messaggio: `L'utente ${utente.nome} ha ${ordini.length} ordini per un totale di €${totale}`
    };
  } catch (err) {
    console.error('Si è verificato un errore:', err);
    throw err;
  }
}

// Esecuzione del flusso asincrono
console.log('Inizio del flusso asincrono');
eseguiGeneratore(flussoOrdiniUtente(123))
  .then(risultato => {
    console.log('\nRisultato finale:');
    console.log(risultato.messaggio);
  })
  .catch(err => {
    console.error('Errore nel flusso asincrono:', err);
  });

// Esempio di gestione degli errori
function simulaErrore() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Errore di connessione al server'));
    }, 500);
  });
}

function* flussoConErrore() {
  try {
    console.log('Tentativo di operazione che fallirà...');
    yield simulaErrore();
    console.log('Questo codice non verrà mai eseguito');
  } catch (err) {
    console.log(`Errore catturato nel generatore: ${err.message}`);
    return 'Ripristino dopo errore';
  }
}

console.log('\n\nEsempio di gestione degli errori:');
eseguiGeneratore(flussoConErrore())
  .then(risultato => {
    console.log(`Risultato dopo la gestione dell'errore: ${risultato}`);
  })
  .catch(err => {
    console.error('Errore non gestito:', err);
  });

// Nota: Questo pattern è stato il precursore di async/await,
// che ora offre una sintassi ancora più pulita per gestire l'asincronicità.
// Esempio equivalente con async/await:

async function flussoOrdiniUtenteAsync(userId) {
  try {
    const utente = await caricaUtente(userId);
    console.log(`Utente trovato: ${utente.nome}`);
    
    const ordini = await caricaOrdini(utente);
    console.log(`Numero di ordini: ${ordini.length}`);
    
    const totale = await calcolaTotale(ordini);
    
    return {
      utente,
      ordini,
      totale,
      messaggio: `L'utente ${utente.nome} ha ${ordini.length} ordini per un totale di €${totale}`
    };
  } catch (err) {
    console.error('Si è verificato un errore:', err);
    throw err;
  }
}

// Non eseguiamo questa funzione per evitare duplicati nell'output
// ma è mostrata per confronto con l'approccio del generatore