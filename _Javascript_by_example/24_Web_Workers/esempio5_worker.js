// Web Workers - Worker per l'esempio 5 (Worker Pool)

/**
 * Questo worker riceve task dal pool e li elabora,
 * restituendo i risultati al thread principale.
 */

// Gestisce i messaggi in arrivo dal thread principale
self.onmessage = function(event) {
  const { taskId, data } = event.data;
  
  // Verifica che il messaggio contenga i dati necessari
  if (!data || !data.operazione) {
    self.postMessage({
      taskId,
      error: 'Dati o operazione mancanti'
    });
    return;
  }
  
  try {
    let result;
    
    // Esegue l'operazione richiesta
    switch (data.operazione) {
      case 'ordina':
        // Simula un'operazione che richiede tempo
        result = ordinaArray(data.array);
        break;
        
      case 'filtra':
        result = filtraArray(data.array, data.condizione);
        break;
        
      case 'calcola':
        result = eseguiCalcolo(data.valori);
        break;
        
      default:
        throw new Error(`Operazione non supportata: ${data.operazione}`);
    }
    
    // Invia il risultato al thread principale
    self.postMessage({
      taskId,
      result
    });
  } catch (error) {
    // Invia l'errore al thread principale
    self.postMessage({
      taskId,
      error: error.message
    });
  }
};

// Funzione per ordinare un array
function ordinaArray(array) {
  // Crea una copia dell'array per non modificare l'originale
  const risultato = [...array];
  
  // Simula un'operazione che richiede tempo
  // Utilizziamo un algoritmo di ordinamento nativo per efficienza
  return risultato.sort((a, b) => a - b);
}

// Funzione per filtrare un array
function filtraArray(array, condizione) {
  // La condizione è una stringa che rappresenta una funzione
  // Ad esempio: "x => x > 10"
  const funzioneFiltro = new Function('x', `return ${condizione}`);
  
  return array.filter(x => {
    try {
      return funzioneFiltro(x);
    } catch (error) {
      return false;
    }
  });
}

// Funzione per eseguire calcoli complessi
function eseguiCalcolo(valori) {
  // Simula un calcolo complesso
  let risultato = 0;
  
  // Esegue un'operazione che richiede tempo
  for (let i = 0; i < valori.length; i++) {
    // Calcolo fittizio che richiede CPU
    for (let j = 0; j < 10000; j++) {
      risultato += Math.sin(valori[i] * j) * Math.cos(j);
    }
  }
  
  return risultato;
}