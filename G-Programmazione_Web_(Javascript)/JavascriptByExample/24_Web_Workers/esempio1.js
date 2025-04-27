// Web Worker per il calcolo dei numeri primi

// Funzione per trovare numeri primi fino a max
function trovaPrimi(max) {
    const inizio = performance.now();
    const numeriPrimi = [];
    
    // Implementazione del Crivello di Eratostene
    const isPrimo = new Array(max + 1).fill(true);
    isPrimo[0] = isPrimo[1] = false;
    
    for (let i = 2; i <= max; i++) {
        if (isPrimo[i]) {
            numeriPrimi.push(i);
            for (let j = i * i; j <= max; j += i) {
                isPrimo[j] = false;
            }
        }
    }
    
    const fine = performance.now();
    return {
        numeriPrimi: numeriPrimi,
        tempo: (fine - inizio).toFixed(2)
    };
}

// Gestione dei messaggi ricevuti dal thread principale
onmessage = function(event) {
    const max = event.data;
    
    console.log('Worker: Inizio calcolo numeri primi fino a', max);
    
    const risultato = trovaPrimi(max);
    
    console.log('Worker: Calcolo completato, trovati', risultato.numeriPrimi.length, 'numeri primi');
    
    // Invia il risultato al thread principale
    postMessage(risultato);
};

// Gestione degli errori
onerror = function(error) {
    console.error('Errore nel worker:', error.message);
    postMessage({
        errore: true,
        messaggio: error.message
    });
};

console.log('Worker inizializzato e pronto per il calcolo');