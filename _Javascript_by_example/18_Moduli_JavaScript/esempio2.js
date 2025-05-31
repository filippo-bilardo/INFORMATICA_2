// esempio2.js
// Esempio di importazione di un modulo con export default e named exports

// Importiamo l'export default (senza parentesi graffe)
// Possiamo dargli il nome che preferiamo
import ModuloPersonalizzato from './modulo2.js';

// Importiamo anche gli export con nome (named exports) dallo stesso modulo
import { versione, metodoSecondario } from './modulo2.js';

// Possiamo anche combinare le importazioni in un'unica riga
// import ModuloPersonalizzato, { versione, metodoSecondario } from './modulo2.js';

// Utilizziamo l'export default (la classe ModuloPrincipale)
const modulo = new ModuloPersonalizzato('Esempio2');
modulo.inizializza();

const risultatoElaborazione = modulo.elabora('testo di esempio');
console.log(risultatoElaborazione);

// Utilizziamo gli export con nome
console.log(`Versione del modulo: ${versione}`);
console.log(metodoSecondario());

// Possiamo anche importare con alias
/*
import ModuloBase, {
  versione as versioneModulo,
  metodoSecondario as metodoAusiliario
} from './modulo2.js';

console.log(`Versione: ${versioneModulo}`);
console.log(metodoAusiliario());
*/

/*
 Per eseguire questo esempio in un browser, crea un file HTML con:

 <!DOCTYPE html>
 <html>
 <head>
   <title>Esempio Moduli JavaScript - Default Export</title>
 </head>
 <body>
   <h1>Esempio Moduli JavaScript - Default Export</h1>
   <p>Apri la console per vedere i risultati</p>
   
   <script type="module" src="esempio2.js"></script>
 </body>
 </html>

 Per eseguire in Node.js, assicurati di usare una versione recente e
 esegui con: node esempio2.js
 (potrebbe essere necessario rinominare i file con estensione .mjs o
 configurare "type": "module" nel package.json)
*/