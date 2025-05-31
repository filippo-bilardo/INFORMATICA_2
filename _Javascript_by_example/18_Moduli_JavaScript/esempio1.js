// esempio1.js
// Esempio di importazione e utilizzo di un modulo JavaScript

// Importiamo elementi specifici dal modulo
import { nome, saluta, somma, rivela } from './modulo1.js';

// Utilizziamo le funzioni e variabili importate
console.log(`Nome del modulo: ${nome}`);

const messaggio = saluta('Mario');
console.log(messaggio);

const risultato = somma(5, 3);
console.log(`La somma è: ${risultato}`);

const segreto = rivela();
console.log(segreto);

// Nota: non possiamo accedere direttamente alla variabile 'segreto' del modulo
// console.log(segreto); // Questo genererebbe un errore

/*
 Per eseguire questo esempio in un browser, crea un file HTML con:

 <!DOCTYPE html>
 <html>
 <head>
   <title>Esempio Moduli JavaScript</title>
 </head>
 <body>
   <h1>Esempio Moduli JavaScript</h1>
   <p>Apri la console per vedere i risultati</p>
   
   <!-- Nota l'attributo type="module" necessario per i moduli ES -->
   <script type="module" src="esempio1.js"></script>
 </body>
 </html>

 Per eseguire in Node.js, assicurati di usare una versione recente e
 esegui con: node esempio1.js
 (potrebbe essere necessario rinominare i file con estensione .mjs o
 configurare "type": "module" nel package.json)
*/