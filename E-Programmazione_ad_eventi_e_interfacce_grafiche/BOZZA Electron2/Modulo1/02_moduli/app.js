// app.js
// Esempio di utilizzo di un modulo personalizzato in Node.js

// Importazione del modulo math.js
const math = require('./math');

// Utilizzo delle funzioni del modulo
console.log('Somma di 5 e 3:', math.somma(5, 3));
console.log('Sottrazione di 5 e 3:', math.sottrazione(5, 3));
console.log('Moltiplicazione di 5 e 3:', math.moltiplicazione(5, 3));

try {
  console.log('Divisione di 6 e 2:', math.divisione(6, 2));
  console.log('Divisione di 5 e 0:', math.divisione(5, 0)); // Questo genererà un errore
} catch (error) {
  console.error('Errore durante la divisione:', error.message);
}

// Per eseguire: node app.js
// Nota: assicurarsi di essere nella directory 02_moduli