/**
 * Esempio 5: Combinazione di iteratori e generatori
 * 
 * Questo esempio mostra come combinare iteratori personalizzati e generatori
 * per creare pipeline di elaborazione dati flessibili ed efficienti.
 */

// Classe con iteratore personalizzato
class RangeNumerico {
  constructor(inizio, fine) {
    this.inizio = inizio;
    this.fine = fine;
  }
  
  // Implementazione dell'interfaccia iterabile
  [Symbol.iterator]() {
    let corrente = this.inizio;
    const fine = this.fine;
    
    return {
      next() {
        if (corrente <= fine) {
          return { value: corrente++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// Generatori per trasformazione dati
function* filtra(iterabile, predicato) {
  for (const valore of iterabile) {
    if (predicato(valore)) {
      yield valore;
    }
  }
}

function* mappa(iterabile, trasformazione) {
  for (const valore of iterabile) {
    yield trasformazione(valore);
  }
}

function* limita(iterabile, n) {
  let contatore = 0;
  for (const valore of iterabile) {
    if (contatore >= n) break;
    yield valore;
    contatore++;
  }
}

function* salta(iterabile, n) {
  let contatore = 0;
  for (const valore of iterabile) {
    if (contatore++ < n) continue;
    yield valore;
  }
}

// Funzione per creare una pipeline di elaborazione
function creaPipeline(fonte, ...operazioni) {
  let risultato = fonte;
  
  for (const operazione of operazioni) {
    risultato = operazione(risultato);
  }
  
  return risultato;
}

// Utilizzo della pipeline
console.log('Pipeline di elaborazione dati:');

// Creiamo un range di numeri da 1 a 20
const numeri = new RangeNumerico(1, 20);

// Definiamo le operazioni della pipeline
const soloDispari = iterabile => filtra(iterabile, n => n % 2 !== 0);
const alQuadrato = iterabile => mappa(iterabile, n => n * n);
const primi5 = iterabile => limita(iterabile, 5);
const saltaPrimi2 = iterabile => salta(iterabile, 2);

// Creiamo la pipeline: numeri dispari -> al quadrato -> salta i primi 2 -> prendi i primi 5
const pipeline = creaPipeline(
  numeri,
  soloDispari,   // Filtra solo i numeri dispari: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19
  alQuadrato,    // Eleva al quadrato: 1, 9, 25, 49, 81, 121, 169, 225, 289, 361
  saltaPrimi2,   // Salta i primi 2: 25, 49, 81, 121, 169, 225, 289, 361
  primi5         // Prendi i primi 5: 25, 49, 81, 121, 169
);

// Consumo della pipeline
console.log('Risultato della pipeline:');
for (const valore of pipeline) {
  console.log(valore);
}

// Esempio di classe che combina iteratori e generatori
class CollezioneFiltrata {
  constructor(elementi) {
    this.elementi = elementi;
  }
  
  // Metodo generatore per filtrare elementi
  *filtra(predicato) {
    for (const elemento of this.elementi) {
      if (predicato(elemento)) {
        yield elemento;
      }
    }
  }
  
  // Metodo generatore per ordinare elementi
  *ordina(comparatore) {
    // Convertiamo in array per ordinare
    const array = [...this.elementi];
    array.sort(comparatore);
    
    for (const elemento of array) {
      yield elemento;
    }
  }
  
  // Metodo generatore per raggruppare elementi
  *raggruppa(chiaveFunc) {
    const gruppi = new Map();
    
    // Raggruppa gli elementi
    for (const elemento of this.elementi) {
      const chiave = chiaveFunc(elemento);
      
      if (!gruppi.has(chiave)) {
        gruppi.set(chiave, []);
      }
      
      gruppi.get(chiave).push(elemento);
    }
    
    // Yield dei gruppi
    for (const [chiave, gruppo] of gruppi) {
      yield { chiave, elementi: gruppo };
    }
  }
}

// Utilizzo della classe CollezioneFiltrata
const prodotti = [
  { id: 1, nome: 'Laptop', categoria: 'Elettronica', prezzo: 1200 },
  { id: 2, nome: 'Smartphone', categoria: 'Elettronica', prezzo: 800 },
  { id: 3, nome: 'Tavolo', categoria: 'Arredamento', prezzo: 350 },
  { id: 4, nome: 'Sedia', categoria: 'Arredamento', prezzo: 120 },
  { id: 5, nome: 'Monitor', categoria: 'Elettronica', prezzo: 400 },
  { id: 6, nome: 'Divano', categoria: 'Arredamento', prezzo: 900 }
];

const collezione = new CollezioneFiltrata(prodotti);

// Filtraggio: solo prodotti con prezzo > 500
console.log('\nProdotti con prezzo > 500:');
for (const prodotto of collezione.filtra(p => p.prezzo > 500)) {
  console.log(`${prodotto.nome}: €${prodotto.prezzo}`);
}

// Ordinamento: per prezzo crescente
console.log('\nProdotti ordinati per prezzo crescente:');
for (const prodotto of collezione.ordina((a, b) => a.prezzo - b.prezzo)) {
  console.log(`${prodotto.nome}: €${prodotto.prezzo}`);
}

// Raggruppamento: per categoria
console.log('\nProdotti raggruppati per categoria:');
for (const gruppo of collezione.raggruppa(p => p.categoria)) {
  console.log(`Categoria: ${gruppo.chiave}`);
  for (const prodotto of gruppo.elementi) {
    console.log(`  - ${prodotto.nome}: €${prodotto.prezzo}`);
  }
}

// Combinazione di operazioni
console.log('\nProdotti elettronici ordinati per prezzo decrescente:');

// Prima filtriamo per categoria
const soloElettronici = collezione.filtra(p => p.categoria === 'Elettronica');

// Poi convertiamo in array e ordiniamo per prezzo decrescente
const elettroniciOrdinati = [...soloElettronici].sort((a, b) => b.prezzo - a.prezzo);

// Stampiamo i risultati
for (const prodotto of elettroniciOrdinati) {
  console.log(`${prodotto.nome}: €${prodotto.prezzo}`);
}