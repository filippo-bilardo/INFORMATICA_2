/**
 * Esempio 3: Generatori per l'attraversamento di strutture ad albero
 * 
 * Questo esempio mostra come utilizzare i generatori per attraversare
 * strutture dati gerarchiche come gli alberi.
 */

class Nodo {
  constructor(valore, figli = []) {
    this.valore = valore;
    this.figli = figli;
  }
  
  aggiungiNodo(nodo) {
    this.figli.push(nodo);
    return nodo; // Per consentire il concatenamento
  }
}

class Albero {
  constructor(radice) {
    this.radice = radice;
  }
  
  // Generatore per attraversamento in profondità (DFS)
  *attraversaInProfondita(nodo = this.radice) {
    yield nodo;
    
    for (const figlio of nodo.figli) {
      yield* this.attraversaInProfondita(figlio);
    }
  }
  
  // Generatore per attraversamento in ampiezza (BFS)
  *attraversaInAmpiezza() {
    const coda = [this.radice];
    
    while (coda.length > 0) {
      const nodo = coda.shift();
      yield nodo;
      
      for (const figlio of nodo.figli) {
        coda.push(figlio);
      }
    }
  }
  
  // Generatore per attraversare solo i nodi foglia
  *attraversaFoglie(nodo = this.radice) {
    if (nodo.figli.length === 0) {
      yield nodo;
    } else {
      for (const figlio of nodo.figli) {
        yield* this.attraversaFoglie(figlio);
      }
    }
  }
  
  // Generatore per attraversare l'albero con un filtro
  *attraversaConFiltro(filtro, nodo = this.radice) {
    if (filtro(nodo)) {
      yield nodo;
    }
    
    for (const figlio of nodo.figli) {
      yield* this.attraversaConFiltro(filtro, figlio);
    }
  }
}

// Creazione di un albero di esempio (struttura di cartelle)
const radice = new Nodo('Documenti');

const cartella1 = radice.aggiungiNodo(new Nodo('Lavoro'));
cartella1.aggiungiNodo(new Nodo('Progetto1.docx'));
cartella1.aggiungiNodo(new Nodo('Progetto2.xlsx'));

const cartella2 = radice.aggiungiNodo(new Nodo('Personale'));
const sottocartella = cartella2.aggiungiNodo(new Nodo('Foto'));
sottocartella.aggiungiNodo(new Nodo('Vacanze2023.jpg'));
sottocartella.aggiungiNodo(new Nodo('Compleanno.png'));

cartella2.aggiungiNodo(new Nodo('Budget.xlsx'));

radice.aggiungiNodo(new Nodo('Appunti.txt'));

// Creazione dell'albero
const albero = new Albero(radice);

// Utilizzo dei generatori per attraversare l'albero
console.log('Attraversamento in profondità (DFS):');
for (const nodo of albero.attraversaInProfondita()) {
  console.log(nodo.valore);
}

console.log('\nAttraversamento in ampiezza (BFS):');
for (const nodo of albero.attraversaInAmpiezza()) {
  console.log(nodo.valore);
}

console.log('\nSolo nodi foglia:');
for (const nodo of albero.attraversaFoglie()) {
  console.log(nodo.valore);
}

// Filtro per trovare solo i file Excel
console.log('\nSolo file Excel:');
const filtroExcel = nodo => nodo.valore.endsWith('.xlsx');
for (const nodo of albero.attraversaConFiltro(filtroExcel)) {
  console.log(nodo.valore);
}

// Utilizzo manuale del generatore
console.log('\nUtilizzo manuale del generatore DFS:');
const iteratore = albero.attraversaInProfondita();
let risultato = iteratore.next();

while (!risultato.done) {
  console.log(risultato.value.valore);
  risultato = iteratore.next();
}