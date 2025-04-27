// Funzione che restituisce una Promise (la stessa dell'esempio Promises)
function operazioneConPromise(nome, durata, successo = true) {
  console.log(`Avvio operazione asincrona "${nome}" (durerà ${durata}ms)...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (successo) {
        const risultato = `Operazione "${nome}" completata con successo.`;
        console.log(risultato);
        resolve({ nome, risultato }); // Risolve con un oggetto
      } else {
        const errore = new Error(`Operazione "${nome}" fallita.`);
        console.error(errore.message);
        reject(errore); // Rifiuta con un oggetto Error
      }
    }, durata);
  });
}

// Funzione asincrona che utilizza await per gestire le Promises
async function eseguiSequenzaConAsyncAwait() {
  console.log('\n--- Esempio Async/Await ---');
  console.log('Inizio esecuzione della funzione async...');

  try {
    // 1. Esegui la prima operazione e attendi il risultato
    // 'await' mette in pausa l'esecuzione della funzione async finché la Promise non è risolta
    const risultato1 = await operazioneConPromise('Download Configurazione', 700);
    console.log(`-> Risultato 1 ricevuto: ${risultato1.nome}`);

    // 2. Esegui la seconda operazione usando il risultato della prima (se necessario)
    const risultato2 = await operazioneConPromise('Connessione Database', 400);
    console.log(`-> Risultato 2 ricevuto: ${risultato2.nome}`);

    // 3. Esegui una terza operazione che potrebbe fallire
    console.log('Tentativo operazione che fallirà...');
    const risultato3 = await operazioneConPromise('Verifica Permessi Speciali', 500, false); // false = fallirà

    // Questa linea non verrà raggiunta a causa dell'errore precedente
    console.log('-> Risultato 3 ricevuto (non dovrebbe accadere):', risultato3);

    // Il valore restituito dalla funzione async (se non ci sono errori) è il valore con cui la Promise restituita si risolve
    return 'Sequenza completata con successo!';

  } catch (errore) {
    // Il blocco catch cattura qualsiasi errore da una Promise rifiutata (await lancia l'errore)
    console.error(`-> Errore catturato nel blocco try...catch: ${errore.message}`);
    // Possiamo restituire un valore alternativo o rilanciare l'errore
    // throw new Error('Errore critico durante la sequenza');
    return 'Sequenza terminata a causa di un errore gestito.';

  } finally {
    // Il blocco finally viene eseguito sempre, sia in caso di successo che di errore
    console.log('-> Blocco finally eseguito.');
  }
}

// Chiamare una funzione async restituisce una Promise
console.log('Chiamo la funzione async...');
const promiseRisultante = eseguiSequenzaConAsyncAwait();
console.log('Funzione async chiamata, restituisce una Promise. In attesa del suo completamento...');

// Gestiamo la Promise restituita dalla funzione async
promiseRisultante
  .then(messaggioFinale => {
    console.log(`\nRisultato finale della Promise restituita da async: ${messaggioFinale}`);
  })
  .catch(erroreFinale => {
    // Questo catch verrebbe eseguito solo se rilanciassimo un errore dal catch interno della funzione async
    console.error(`\nErrore finale non gestito dalla funzione async: ${erroreFinale.message}`);
  });

/*
Output atteso (l'ordine esatto dei log iniziali può variare leggermente):

Chiamo la funzione async...

--- Esempio Async/Await ---
Inizio esecuzione della funzione async...
Funzione async chiamata, restituisce una Promise. In attesa del suo completamento...
Avvio operazione asincrona "Download Configurazione" (durerà 700ms)...
(dopo ~700ms)
Operazione "Download Configurazione" completata con successo.
-> Risultato 1 ricevuto: Download Configurazione
Avvio operazione asincrona "Connessione Database" (durerà 400ms)...
(dopo ~400ms)
Operazione "Connessione Database" completata con successo.
-> Risultato 2 ricevuto: Connessione Database
Tentativo operazione che fallirà...
Avvio operazione asincrona "Verifica Permessi Speciali" (durerà 500ms)...
(dopo ~500ms)
Operazione "Verifica Permessi Speciali" fallita.
-> Errore catturato nel blocco try...catch: Operazione "Verifica Permessi Speciali" fallita.
-> Blocco finally eseguito.

Risultato finale della Promise restituita da async: Sequenza terminata a causa di un errore gestito.
*/