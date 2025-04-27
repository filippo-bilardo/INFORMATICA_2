// Proxy e Reflect in JavaScript - Esempio 5: Proxy per la memorizzazione nella cache

/**
 * Questo esempio mostra come utilizzare i Proxy per implementare
 * un meccanismo di memorizzazione nella cache per funzioni costose.
 */

console.log('=== PROXY PER LA MEMORIZZAZIONE NELLA CACHE ===');

// Funzione per creare un proxy di memorizzazione nella cache per qualsiasi funzione
function creaProxyCache(funzione, { dimensioneMax = 100, tempoScadenza = null } = {}) {
  // Cache per memorizzare i risultati
  const cache = new Map();
  
  // Contatore per implementare una strategia LRU (Least Recently Used)
  let contatore = 0;
  
  // Funzione per generare una chiave dalla lista di argomenti
  const generaChiave = (...args) => {
    return JSON.stringify(args);
  };
  
  // Funzione per pulire la cache quando supera la dimensione massima
  const pulisciCache = () => {
    if (cache.size <= dimensioneMax) return;
    
    // Trova la voce meno recentemente utilizzata
    let chiaveVecchia = null;
    let tempoVecchio = Infinity;
    
    for (const [chiave, dati] of cache.entries()) {
      if (dati.ultimoAccesso < tempoVecchio) {
        chiaveVecchia = chiave;
        tempoVecchio = dati.ultimoAccesso;
      }
    }
    
    if (chiaveVecchia) {
      cache.delete(chiaveVecchia);
      console.log(`Cache: rimossa voce meno recentemente utilizzata`);
    }
  };
  
  // Funzione per verificare se una voce della cache è scaduta
  const èScaduta = (timestamp) => {
    if (!tempoScadenza) return false;
    const tempoAttuale = Date.now();
    return (tempoAttuale - timestamp) > tempoScadenza;
  };
  
  // Crea un proxy per la funzione
  return new Proxy(funzione, {
    apply(target, thisArg, args) {
      // Genera una chiave basata sugli argomenti
      const chiave = generaChiave(...args);
      
      // Verifica se il risultato è già in cache e non è scaduto
      if (cache.has(chiave)) {
        const datiCache = cache.get(chiave);
        
        // Verifica se la voce della cache è scaduta
        if (èScaduta(datiCache.timestamp)) {
          console.log(`Cache: voce scaduta per chiave ${chiave}`);
          cache.delete(chiave);
        } else {
          // Aggiorna il contatore di ultimo accesso
          datiCache.ultimoAccesso = ++contatore;
          console.log(`Cache: trovato risultato per chiave ${chiave}`);
          return datiCache.risultato;
        }
      }
      
      // Chiama la funzione originale
      console.log(`Cache: calcolo risultato per chiave ${chiave}`);
      const risultato = Reflect.apply(target, thisArg, args);
      
      // Memorizza il risultato nella cache
      cache.set(chiave, {
        risultato,
        timestamp: Date.now(),
        ultimoAccesso: ++contatore
      });
      
      // Pulisci la cache se necessario
      pulisciCache();
      
      return risultato;
    }
  });
}

// Esempio di funzione costosa da memorizzare nella cache
function calcolaFibonacci(n) {
  console.log(`Calcolo Fibonacci per n=${n}...`);
  
  if (n <= 1) return n;
  
  // Implementazione ricorsiva (inefficiente, ma buona per dimostrare la cache)
  return calcolaFibonacci(n - 1) + calcolaFibonacci(n - 2);
}

// Versione con cache della funzione Fibonacci
const fibonacciConCache = creaProxyCache(calcolaFibonacci, {
  dimensioneMax: 50,
  tempoScadenza: 60000 // 1 minuto
});

console.log('\n--- Calcolo di Fibonacci con cache ---');

// Prima chiamata - deve calcolare il risultato
console.log(`Fibonacci(6) = ${fibonacciConCache(6)}`);

// Seconda chiamata con lo stesso valore - dovrebbe usare la cache
console.log(`Fibonacci(6) = ${fibonacciConCache(6)}`);

// Chiamata con un valore diverso
console.log(`Fibonacci(7) = ${fibonacciConCache(7)}`);

// Chiamata con un valore già calcolato indirettamente
console.log(`Fibonacci(5) = ${fibonacciConCache(5)}`);

// Esempio di funzione con più parametri
function calcolaArea(larghezza, altezza) {
  console.log(`Calcolo area per ${larghezza}x${altezza}...`);
  return larghezza * altezza;
}

const areaConCache = creaProxyCache(calcolaArea, {
  dimensioneMax: 10
});

console.log('\n--- Calcolo di aree con cache ---');

// Prima chiamata
console.log(`Area(5, 3) = ${areaConCache(5, 3)}`);

// Seconda chiamata con gli stessi parametri
console.log(`Area(5, 3) = ${areaConCache(5, 3)}`);

// Chiamata con parametri in ordine diverso
console.log(`Area(3, 5) = ${areaConCache(3, 5)}`);

/**
 * Questo pattern di memorizzazione nella cache è utile per:
 * - Ottimizzare funzioni costose in termini di calcolo
 * - Ridurre chiamate API ripetute
 * - Implementare strategie di caching personalizzate
 * - Migliorare le prestazioni senza modificare la funzione originale
 */