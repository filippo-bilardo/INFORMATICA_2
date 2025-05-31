// Funzione che restituisce una Promise
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

console.log('--- Esempio Promises ---');

// 1. Consumare una singola Promise
operazioneConPromise('Lettura Config', 500)
  .then(risultato => {
    console.log('-> .then() ricevuto:', risultato);
  })
  .catch(errore => {
    console.error('-> .catch() ricevuto:', errore.message);
  })
  .finally(() => {
    console.log('-> .finally() eseguito per Lettura Config.');
  });

console.log('Promise "Lettura Config" avviata...');

// 2. Concatenamento di Promises (Chaining)
console.log('\n--- Esempio Chaining ---');
operazioneConPromise('Download Dati Utente', 800)
  .then(risultato1 => {
    // Il valore restituito qui (o una nuova Promise) viene passato al prossimo .then()
    console.log(`-> Primo .then() completato (${risultato1.nome})`);
    return operazioneConPromise('Elaborazione Dati', 400); // Restituisce un'altra Promise
  })
  .then(risultato2 => {
    console.log(`-> Secondo .then() completato (${risultato2.nome})`);
    // Simuliamo un successo finale
    return 'Elaborazione finale completata con successo!';
  })
  .then(risultatoFinale => {
    console.log('-> Terzo .then() ricevuto:', risultatoFinale);
  })
  .catch(errore => {
    // Questo catch gestisce errori da qualsiasi punto della catena precedente
    console.error('-> Errore nella catena:', errore.message);
  })
  .finally(() => {
    console.log('-> .finally() della catena eseguito.');
  });

console.log('Catena di Promises avviata...');

// 3. Gestione di un errore nella catena
console.log('\n--- Esempio Errore nel Chaining ---');
operazioneConPromise('Autenticazione', 600)
  .then(risultatoAuth => {
    console.log(`-> ${risultatoAuth.nome} OK`);
    // Simuliamo un fallimento nel secondo passo
    return operazioneConPromise('Caricamento Permessi', 300, false);
  })
  .then(risultatoPermessi => {
    // Questo blocco verrà saltato a causa del fallimento precedente
    console.log('-> Questo non dovrebbe essere stampato:', risultatoPermessi);
  })
  .catch(errore => {
    console.error('-> Errore catturato nella catena con fallimento:', errore.message);
    // Possiamo recuperare dall'errore restituendo un valore
    return 'Recupero dall\'errore: permessi di default applicati.';
  })
  .then(risultatoRecupero => {
    // Questo .then() viene eseguito perché il .catch() precedente ha gestito l'errore
    console.log('-> Dopo il catch:', risultatoRecupero);
  })
  .finally(() => {
    console.log('-> .finally() della catena con fallimento eseguito.');
  });

console.log('Catena con potenziale errore avviata...');

/*
L'output mostrerà l'esecuzione asincrona delle varie operazioni,
con i messaggi .then(), .catch(), e .finally() che appaiono
man mano che le Promises vengono risolte o rifiutate.
L'ordine esatto dei log tra i diversi esempi può variare.
*/