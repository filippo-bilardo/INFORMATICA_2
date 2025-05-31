// usa_operazioni.js
// File che importa e utilizza le funzioni del modulo operazioni_matematiche.js

// Importiamo singole funzioni dal modulo
import { somma, sottrazione, moltiplicazione, divisione } from './operazioni_matematiche.js';

// Importiamo anche il modulo completo con un alias
import operazioniMat from './operazioni_matematiche.js';

console.log('===== Utilizzo delle funzioni importate singolarmente =====');
console.log(`Somma di 10 + 5 = ${somma(10, 5)}`);
console.log(`Sottrazione di 10 - 5 = ${sottrazione(10, 5)}`);
console.log(`Moltiplicazione di 10 * 5 = ${moltiplicazione(10, 5)}`);

try {
  console.log(`Divisione di 10 / 5 = ${divisione(10, 5)}`);
  console.log(`Divisione di 10 / 0 = ${divisione(10, 0)}`);
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

console.log('\n===== Utilizzo delle funzioni tramite l\'oggetto importato =====');
console.log(`Modulo di 10 % 3 = ${operazioniMat.modulo(10, 3)}`);
console.log(`Potenza di 2^8 = ${operazioniMat.potenza(2, 8)}`);

// Esempio di utilizzo in una funzione più complessa
function calcolaEquazioneQuadratica(a, b, c, x) {
  // ax² + bx + c
  const primoTermine = operazioniMat.moltiplicazione(a, operazioniMat.potenza(x, 2));
  const secondoTermine = operazioniMat.moltiplicazione(b, x);
  const risultato = operazioniMat.somma(operazioniMat.somma(primoTermine, secondoTermine), c);
  
  return risultato;
}

const a = 2, b = -5, c = 3, x = 2;
console.log(`\nCalcolo dell'equazione ${a}x² + ${b}x + ${c} per x = ${x}:`);
console.log(`Risultato: ${calcolaEquazioneQuadratica(a, b, c, x)}`);

/*
 Per eseguire questo esempio in un browser, crea un file HTML con:

 <!DOCTYPE html>
 <html>
 <head>
   <title>Esercizio Moduli - Operazioni Matematiche</title>
 </head>
 <body>
   <h1>Esercizio Moduli - Operazioni Matematiche</h1>
   <p>Apri la console per vedere i risultati</p>
   
   <script type="module" src="usa_operazioni.js"></script>
 </body>
 </html>

 Per eseguire in Node.js, assicurati di usare una versione recente e
 esegui con: node usa_operazioni.js
 (potrebbe essere necessario rinominare i file con estensione .mjs o
 configurare "type": "module" nel package.json)
*/