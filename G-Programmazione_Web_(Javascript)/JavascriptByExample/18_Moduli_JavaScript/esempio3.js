// esempio3.js
// Esempio di utilizzo di dynamic import

// Con dynamic import, possiamo caricare i moduli in modo asincrono
// e condizionale, invece di caricarli all'inizio del file

console.log('Inizio del programma');

// Simuliamo una condizione che determina quale modulo caricare
const condizione = Math.random() > 0.5;

// Funzione che utilizza dynamic import
async function caricaModulo() {
  console.log('Caricamento del modulo in corso...');
  
  try {
    if (condizione) {
      // Carica il primo modulo se la condizione è vera
      const modulo = await import('./modulo1.js');
      console.log('Modulo 1 caricato!');
      console.log(modulo.saluta('Utente'));
      console.log(`Somma: ${modulo.somma(10, 20)}`);
    } else {
      // Carica il secondo modulo se la condizione è falsa
      const modulo = await import('./modulo2.js');
      console.log('Modulo 2 caricato!');
      
      // Utilizziamo l'export default
      const ModuloClasse = modulo.default;
      const istanza = new ModuloClasse('Dinamico');
      istanza.inizializza();
      
      // Utilizziamo anche gli export con nome
      console.log(`Versione: ${modulo.versione}`);
      console.log(modulo.metodoSecondario());
    }
  } catch (errore) {
    console.error('Errore durante il caricamento del modulo:', errore);
  }
}

// Simuliamo un'azione utente che attiva il caricamento del modulo
console.log('Clicca un pulsante per caricare il modulo (simulato)');
setTimeout(() => {
  console.log('Pulsante cliccato!');
  caricaModulo();
}, 1500);

console.log('Il programma continua a eseguire altre operazioni mentre il modulo si carica...');

/*
 Per eseguire questo esempio in un browser, crea un file HTML con:

 <!DOCTYPE html>
 <html>
 <head>
   <title>Esempio Dynamic Import</title>
 </head>
 <body>
   <h1>Esempio Dynamic Import</h1>
   <p>Apri la console per vedere i risultati</p>
   <button id="caricaBtn">Carica Modulo</button>
   
   <script type="module">
     // In un'applicazione reale, useresti questo invece del setTimeout
     document.getElementById('caricaBtn').addEventListener('click', async () => {
       console.log('Pulsante cliccato!');
       
       try {
         // Dynamic import in azione
         const modulo = await import('./modulo1.js');
         console.log('Modulo caricato!');
         console.log(modulo.saluta('Utente'));
       } catch (errore) {
         console.error('Errore:', errore);
       }
     });
   </script>
 </body>
 </html>

 Per eseguire in Node.js, assicurati di usare una versione recente e
 esegui con: node esempio3.js
 (potrebbe essere necessario rinominare i file con estensione .mjs o
 configurare "type": "module" nel package.json)
*/