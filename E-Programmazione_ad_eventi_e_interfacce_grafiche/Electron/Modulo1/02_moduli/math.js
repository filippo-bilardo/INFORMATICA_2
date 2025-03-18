// math.js
// Esempio di modulo personalizzato in Node.js

// Funzioni matematiche di base
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

function moltiplicazione(a, b) {
  return a * b;
}

function divisione(a, b) {
  if (b === 0) {
    throw new Error('Divisione per zero non consentita');
  }
  return a / b;
}

// Esportazione delle funzioni utilizzando module.exports
module.exports = {
  somma,
  sottrazione,
  moltiplicazione,
  divisione
};

// Nota: questo è il modo CommonJS di esportare moduli
// In ES Modules si utilizzerebbe: export { somma, sottrazione, moltiplicazione, divisione };