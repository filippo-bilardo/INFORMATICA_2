// Esempio 1: Callback con setTimeout

function operazioneSimulata(durata, callback) {
  console.log(`Avvio operazione che durerà ${durata}ms...`);
  setTimeout(() => {
    const risultato = `Operazione completata dopo ${durata}ms`;
    callback(null, risultato); // Errore è null, passiamo il risultato
  }, durata);
}

function gestisciRisultato(errore, dati) {
  if (errore) {
    console.error('Si è verificato un errore:', errore);
    return;
  }
  console.log('Successo:', dati);
}

console.log('--- Esempio setTimeout ---');
operazioneSimulata(1000, gestisciRisultato);
console.log('Operazione simulata avviata, il codice continua...');

// Esempio 2: Callback Hell (Piramide del Destino)

function step1(callback) {
  console.log('\n--- Esempio Callback Hell ---');
  console.log('Inizio Step 1...');
  setTimeout(() => {
    console.log('Step 1 completato.');
    callback(null, 'Dati da Step 1');
  }, 500);
}

function step2(datiPrec, callback) {
  console.log('Inizio Step 2 con:', datiPrec);
  setTimeout(() => {
    console.log('Step 2 completato.');
    callback(null, 'Dati da Step 2');
  }, 800);
}

function step3(datiPrec, callback) {
  console.log('Inizio Step 3 con:', datiPrec);
  setTimeout(() => {
    console.log('Step 3 completato.');
    // Simuliamo un errore nello Step 3
    // callback(new Error('Errore nello Step 3!'), null);
    callback(null, 'Dati Finali');
  }, 300);
}

// Esecuzione annidata
step1((errore1, dati1) => {
  if (errore1) {
    console.error('Errore Step 1:', errore1.message);
    return;
  }
  step2(dati1, (errore2, dati2) => {
    if (errore2) {
      console.error('Errore Step 2:', errore2.message);
      return;
    }
    step3(dati2, (errore3, dati3) => {
      if (errore3) {
        console.error('Errore Step 3:', errore3.message);
        return;
      }
      console.log('\nTutti gli step completati con successo!');
      console.log('Risultato finale:', dati3);
    });
  });
});

console.log('Callback Hell avviato...');

/*
Output atteso (l'ordine di alcune linee può variare leggermente a causa dell'asincronicità):

--- Esempio setTimeout ---
Avvio operazione che durerà 1000ms...
Operazione simulata avviata, il codice continua...

--- Esempio Callback Hell ---
Inizio Step 1...
Callback Hell avviato...
(dopo ~500ms)
Step 1 completato.
Inizio Step 2 con: Dati da Step 1
(dopo ~800ms dallo step 2)
Step 2 completato.
Inizio Step 3 con: Dati da Step 2
(dopo ~1000ms dallo step 1)
Successo: Operazione completata dopo 1000ms
(dopo ~300ms dallo step 3)
Step 3 completato.

Tutti gli step completati con successo!
Risultato finale: Dati Finali
*/