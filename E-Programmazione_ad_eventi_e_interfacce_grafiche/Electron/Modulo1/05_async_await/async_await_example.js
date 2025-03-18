// async_await_example.js
// Esempio di utilizzo di async/await in Node.js

// Funzione che restituisce una Promise (la stessa dell'esempio Promises)
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

// Utilizzo di async/await per gestire la Promise
async function fetchDataExample() {
  console.log('Inizio richiesta dati con async/await...');
  
  try {
    // Attende il completamento della Promise
    const data = await fetchData(123);
    console.log('Dati ricevuti:', data);
    
    // Richiesta sequenziale di altri dati
    const moreData = await fetchData(456);
    console.log('Altri dati ricevuti:', moreData);
    
    return 'Operazione completata con successo';
  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error.message);
    return 'Operazione fallita';
  } finally {
    console.log('Operazione completata (finally)');
  }
}

// Gestione di errori con async/await
async function handleError() {
  console.log('\nInizio richiesta dati con ID non valido (usando async/await)...');
  
  try {
    const data = await fetchData(-1);
    console.log('Questo non verrà mai eseguito per ID negativi');
  } catch (error) {
    console.error('Errore gestito con async/await:', error.message);
  }
}

// Esecuzione parallela di Promise con async/await
async function fetchMultipleData() {
  console.log('\nInizio richieste multiple con Promise.all e async/await...');
  
  try {
    // Promise.all con await per esecuzione parallela
    const results = await Promise.all([
      fetchData(1),
      fetchData(2),
      fetchData(3)
    ]);
    
    console.log('Tutti i risultati ricevuti:');
    results.forEach((data, index) => {
      console.log(`Risultato ${index + 1}:`, data);
    });
  } catch (error) {
    console.error('Almeno una richiesta ha fallito:', error.message);
  }
}

// Esecuzione delle funzioni async
// Nota: le funzioni async restituiscono sempre una Promise
async function runAllExamples() {
  await fetchDataExample();
  await handleError();
  await fetchMultipleData();
  console.log('\nTutti gli esempi sono stati eseguiti');
}

runAllExamples().catch(err => {
  console.error('Errore generale:', err);
});

// Per eseguire: node async_await_example.js