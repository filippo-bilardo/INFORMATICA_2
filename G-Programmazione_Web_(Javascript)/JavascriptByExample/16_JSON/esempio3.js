// Esempio 3: Utilizzo di JSON con fetch API

// Funzione per effettuare una richiesta GET e ottenere dati JSON
async function ottieniDati(url) {
  try {
    // Effettua la richiesta HTTP
    const risposta = await fetch(url);
    
    // Verifica se la risposta è ok (status 200-299)
    if (!risposta.ok) {
      throw new Error(`Errore HTTP: ${risposta.status}`);
    }
    
    // Converte la risposta in JSON
    const dati = await risposta.json();
    return dati;
  } catch (errore) {
    console.error('Errore durante il recupero dei dati:', errore.message);
    throw errore;
  }
}

// Funzione per inviare dati JSON tramite POST
async function inviaDati(url, dati) {
  try {
    // Effettua la richiesta HTTP POST
    const risposta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dati)
    });
    
    // Verifica se la risposta è ok (status 200-299)
    if (!risposta.ok) {
      throw new Error(`Errore HTTP: ${risposta.status}`);
    }
    
    // Converte la risposta in JSON
    const rispostaDati = await risposta.json();
    return rispostaDati;
  } catch (errore) {
    console.error('Errore durante l\'invio dei dati:', errore.message);
    throw errore;
  }
}

// Esempio di utilizzo (commentato per evitare richieste reali)
/*
// Esempio di GET
ottieniDati('https://jsonplaceholder.typicode.com/posts/1')
  .then(dati => {
    console.log('Dati ricevuti:');
    console.log(dati);
  })
  .catch(errore => {
    console.error('Impossibile completare l\'operazione:', errore.message);
  });

// Esempio di POST
const nuovoPost = {
  title: 'Nuovo post',
  body: 'Contenuto del nuovo post',
  userId: 1
};

inviaDati('https://jsonplaceholder.typicode.com/posts', nuovoPost)
  .then(risposta => {
    console.log('Risposta dal server:');
    console.log(risposta);
  })
  .catch(errore => {
    console.error('Impossibile completare l\'operazione:', errore.message);
  });
*/

// Simulazione di risposta JSON per scopi didattici
console.log('Simulazione di risposta GET:');
const rispostaSimulata = {
  id: 1,
  title: 'Titolo del post',
  body: 'Contenuto del post...',
  userId: 1
};
console.log(rispostaSimulata);

console.log('\nSimulazione di invio POST:');
const datiDaInviare = {
  title: 'Nuovo post',
  body: 'Contenuto del nuovo post',
  userId: 1
};
console.log('Dati inviati:');
console.log(datiDaInviare);

console.log('\nDati convertiti in JSON per l\'invio:');
console.log(JSON.stringify(datiDaInviare));

console.log('\nRisposta simulata dal server:');
const rispostaPostSimulata = {
  id: 101,
  title: 'Nuovo post',
  body: 'Contenuto del nuovo post',
  userId: 1
};
console.log(rispostaPostSimulata);

// Esempio di gestione di headers e opzioni avanzate
console.log('\nEsempio di configurazione avanzata per fetch:');
const opzioniAvanzate = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'Accept': 'application/json'
  },
  body: JSON.stringify(datiDaInviare),
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer'
};
console.log(opzioniAvanzate);