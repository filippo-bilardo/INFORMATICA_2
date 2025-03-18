// promises_example.js
// Esempio di utilizzo delle Promises in Node.js

// Funzione che restituisce una Promise
function fetchData(id) {
  return new Promise((resolve, reject) => {
    // Simulazione di una richiesta asincrona (es. a un database o API)
    setTimeout(() => {
      // Simuliamo un errore per gli ID negativi
      if (id < 0) {
        reject(new Error(`ID non valido: ${id}`));
        return;
      }
      
      // Altrimenti restituiamo dei dati fittizi
      const data = {
        id: id,
        name: `Elemento ${id}`,
        timestamp: new Date().toISOString()
      };
      
      resolve(data);
    }, 1500); // Ritardo di 1.5 secondi
  });
}

// Utilizzo della Promise con then/catch
console.log('Inizio richiesta dati con then/catch...');

fetchData(123)
  .then(data => {
    console.log('Dati ricevuti:', data);
    // Concatenamento di Promise
    return fetchData(456); // Restituisce una nuova Promise
  })
  .then(data => {
    console.log('Altri dati ricevuti:', data);
  })
  .catch(error => {
    console.error('Errore durante il recupero dei dati:', error.message);
  })
  .finally(() => {
    console.log('Operazione completata (finally)');
  });

// Esempio di gestione di errori
console.log('\nInizio richiesta dati con ID non valido...');

fetchData(-1)
  .then(data => {
    console.log('Questo non verrà mai eseguito per ID negativi');
  })
  .catch(error => {
    console.error('Errore gestito:', error.message);
  });

// Esempio di Promise.all per eseguire più Promise in parallelo
console.log('\nInizio richieste multiple con Promise.all...');

Promise.all([
  fetchData(1),
  fetchData(2),
  fetchData(3)
])
  .then(results => {
    console.log('Tutti i risultati ricevuti:');
    results.forEach((data, index) => {
      console.log(`Risultato ${index + 1}:`, data);
    });
  })
  .catch(error => {
    console.error('Almeno una richiesta ha fallito:', error.message);
  });

// Per eseguire: node promises_example.js