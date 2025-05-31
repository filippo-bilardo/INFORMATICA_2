/**
 * Esempio 1: Implementazione di un iteratore personalizzato
 * 
 * Questo esempio mostra come implementare un iteratore personalizzato
 * per una classe che rappresenta una collezione di libri.
 */

class BibliotecaLibri {
  constructor() {
    this.libri = [];
  }

  aggiungiLibro(titolo, autore, anno) {
    this.libri.push({ titolo, autore, anno });
  }

  // Implementazione del metodo Symbol.iterator
  [Symbol.iterator]() {
    let indice = 0;
    const libri = this.libri;
    
    // Restituisce un oggetto iteratore
    return {
      next() {
        if (indice < libri.length) {
          return { value: libri[indice++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// Creazione e popolamento della biblioteca
const biblioteca = new BibliotecaLibri();
biblioteca.aggiungiLibro('Il Nome della Rosa', 'Umberto Eco', 1980);
biblioteca.aggiungiLibro('1984', 'George Orwell', 1949);
biblioteca.aggiungiLibro('Il Piccolo Principe', 'Antoine de Saint-Exupéry', 1943);
biblioteca.aggiungiLibro('Orgoglio e Pregiudizio', 'Jane Austen', 1813);

// Utilizzo dell'iteratore con un ciclo for...of
console.log('Elenco dei libri in biblioteca:');
for (const libro of biblioteca) {
  console.log(`"${libro.titolo}" di ${libro.autore} (${libro.anno})`);
}

// Utilizzo manuale dell'iteratore
console.log('\nUtilizzo manuale dell\'iteratore:');
const iteratore = biblioteca[Symbol.iterator]();
let risultato = iteratore.next();

while (!risultato.done) {
  const libro = risultato.value;
  console.log(`"${libro.titolo}" di ${libro.autore}`);
  risultato = iteratore.next();
}

// Utilizzo dell'operatore spread
console.log('\nConversione in array con operatore spread:');
const arrayLibri = [...biblioteca];
console.log(`La biblioteca contiene ${arrayLibri.length} libri`);

// Utilizzo della destrutturazione
const [primoLibro, secondoLibro, ...altriLibri] = biblioteca;
console.log('\nDestrutturazione:');
console.log(`Primo libro: "${primoLibro.titolo}"`);
console.log(`Secondo libro: "${secondoLibro.titolo}"`);
console.log(`Altri libri: ${altriLibri.length}`);