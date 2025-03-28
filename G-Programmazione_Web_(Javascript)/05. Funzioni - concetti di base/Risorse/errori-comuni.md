# Errori comuni con le funzioni JavaScript e come risolverli

## 1. Confusione tra dichiarazioni di funzioni e espressioni di funzioni

### Problema: Hoisting

```javascript
// Funziona correttamente a causa dell'hoisting
funzioneDichiarata();

function funzioneDichiarata() {
    console.log("Questa funzione è stata sollevata (hoisted)");
}

// Errore: funzioneEspressa non è una funzione
funzioneEspressa(); // TypeError: funzioneEspressa is not a function

var funzioneEspressa = function() {
    console.log("Questa funzione NON è stata sollevata");
};
```

### Soluzione
Dichiara le funzioni prima di chiamarle, soprattutto quando usi espressioni di funzione. Oppure usa le dichiarazioni di funzioni standard se hai bisogno dell'hoisting.

## 2. Problemi con il contesto `this`

### Problema: `this` che cambia contesto

```javascript
const utente = {
    nome: "Mario",
    saluta: function() {
        console.log("Ciao, sono " + this.nome);
    },
    salutaDopo: function(ms) {
        setTimeout(function() {
            console.log("Ciao, sono " + this.nome); // `this` non fa più riferimento a utente
        }, ms);
    }
};

utente.saluta();        // "Ciao, sono Mario" - funziona
utente.salutaDopo(100); // "Ciao, sono undefined" - this punta al contesto globale
```

### Soluzioni

#### Usando arrow function (mantiene `this` dal contesto circostante)
```javascript
const utente = {
    nome: "Mario",
    salutaDopo: function(ms) {
        setTimeout(() => {
            console.log("Ciao, sono " + this.nome); // `this` è preservato
        }, ms);
    }
};

utente.salutaDopo(100); // "Ciao, sono Mario" - funziona
```

#### Usando bind, call o apply
```javascript
const utente = {
    nome: "Mario",
    salutaDopo: function(ms) {
        setTimeout(function() {
            console.log("Ciao, sono " + this.nome);
        }.bind(this), ms); // Binding di `this`
    }
};

// Oppure salvando `this` in una variabile
const utente2 = {
    nome: "Luigi",
    salutaDopo: function(ms) {
        const self = this;
        setTimeout(function() {
            console.log("Ciao, sono " + self.nome);
        }, ms);
    }
};
```

## 3. Mancato ritorno di valori

### Problema: Dimenticare `return`

```javascript
function somma(a, b) {
    a + b; // Manca il return!
}

const risultato = somma(5, 3);
console.log(risultato); // undefined, non 8
```

### Soluzione
Assicurati sempre di usare l'istruzione `return` quando la funzione deve restituire un valore.

```javascript
function somma(a, b) {
    return a + b; // Corretto
}
```

## 4. Effetti collaterali indesiderati

### Problema: Modifica dei parametri

```javascript
function aggiungiItem(array, item) {
    array.push(item); // Modifica l'array originale!
    return array;
}

const mieiNumeri = [1, 2, 3];
const nuoviNumeri = aggiungiItem(mieiNumeri, 4);

console.log(mieiNumeri);   // [1, 2, 3, 4] - l'originale è cambiato!
console.log(nuoviNumeri);  // [1, 2, 3, 4]
```

### Soluzione
Crea nuovi oggetti/array invece di modificare quelli esistenti.

```javascript
function aggiungiItem(array, item) {
    return [...array, item]; // Crea un nuovo array
}

const mieiNumeri = [1, 2, 3];
const nuoviNumeri = aggiungiItem(mieiNumeri, 4);

console.log(mieiNumeri);   // [1, 2, 3] - l'originale è invariato
console.log(nuoviNumeri);  // [1, 2, 3, 4]
```

## 5. Errori nella cattura delle eccezioni

### Problema: Try/catch incompleto o assente

```javascript
function dividere(a, b) {
    return a / b; // Potrebbe causare una divisione per zero
}

// Questo codice può fallire senza gestire l'errore
const risultato = dividere(10, 0); // Infinity (non un errore in JS, ma logicamente errato)
```

### Soluzione
Usa il blocco try/catch e gestisci esplicitamente i casi speciali.

```javascript
function dividere(a, b) {
    if (b === 0) {
        throw new Error("Impossibile dividere per zero");
    }
    return a / b;
}

try {
    const risultato = dividere(10, 0);
    console.log(risultato);
} catch (errore) {
    console.error("Si è verificato un errore:", errore.message);
}
```

## 6. Chiusure (closures) e variabili inaspettate

### Problema: Variabile in ciclo errata nel callback

```javascript
function creaFunzioni() {
    var funzioni = [];
    
    // Questo codice non funzionerà come previsto
    for (var i = 0; i < 3; i++) {
        funzioni.push(function() {
            console.log(i);
        });
    }
    
    return funzioni;
}

const funzioni = creaFunzioni();
funzioni[0](); // 3 (non 0 come ci si aspetterebbe)
funzioni[1](); // 3
funzioni[2](); // 3
```

### Soluzione
Usa `let` invece di `var` per creare uno scope di blocco, oppure usa una IIFE.

```javascript
function creaFunzioni() {
    var funzioni = [];
    
    // Soluzione con let (ES6)
    for (let i = 0; i < 3; i++) {
        funzioni.push(function() {
            console.log(i);
        });
    }
    
    /* Soluzione alternativa con IIFE per ES5
    for (var i = 0; i < 3; i++) {
        (function(index) {
            funzioni.push(function() {
                console.log(index);
            });
        })(i);
    }
    */
    
    return funzioni;
}

const funzioni = creaFunzioni();
funzioni[0](); // 0
funzioni[1](); // 1
funzioni[2](); // 2
```

## 7. Callback hell (Inferno delle callback)

### Problema: Annidamento eccessivo di callback

```javascript
getBrani(function(brani) {
    getArticolo(brani[0].id, function(articolo) {
        getCommenti(articolo.id, function(commenti) {
            getAutore(commenti[0].autoreId, function(autore) {
                console.log(autore.nome);
                // Ancora più nidificazioni...
            });
        });
    });
});
```

### Soluzioni

#### Usando Promises

```javascript
getBrani()
    .then(brani => getArticolo(brani[0].id))
    .then(articolo => getCommenti(articolo.id))
    .then(commenti => getAutore(commenti[0].autoreId))
    .then(autore => {
        console.log(autore.nome);
    })
    .catch(errore => {
        console.error("Si è verificato un errore:", errore);
    });
```

#### Usando Async/Await

```javascript
async function mostraNomeAutore() {
    try {
        const brani = await getBrani();
        const articolo = await getArticolo(brani[0].id);
        const commenti = await getCommenti(articolo.id);
        const autore = await getAutore(commenti[0].autoreId);
        console.log(autore.nome);
    } catch (errore) {
        console.error("Si è verificato un errore:", errore);
    }
}

mostraNomeAutore();
```

## 8. Ricorsione senza caso base

### Problema: Stack overflow

```javascript
function contareAllInfinito(n) {
    console.log(n);
    // Manca il caso base!
    return contareAllInfinito(n + 1);
}

contareAllInfinito(1); // Causerà uno stack overflow dopo qualche migliaio di chiamate
```

### Soluzione
Assicurati sempre di avere un caso base nella ricorsione.

```javascript
function contareFino(n, limite) {
    console.log(n);
    // Caso base
    if (n >= limite) {
        return n;
    }
    return contareFino(n + 1, limite);
}

contareFino(1, 10); // Conta da 1 a 10 e poi termina
```

## 9. Uso errato di funzioni asincrone

### Problema: Mancata gestione dell'asincronicità

```javascript
function ottieniDatiUtente(id) {
    let utente;
    // Funzione asincrona
    fetchUtente(id, function(datiUtente) {
        utente = datiUtente;
    });
    return utente; // Restituisce undefined perché fetchUtente non è ancora terminato
}

const utente = ottieniDatiUtente(123);
console.log(utente); // undefined
```

### Soluzioni

#### Con callbacks

```javascript
function ottieniDatiUtente(id, callback) {
    fetchUtente(id, function(datiUtente) {
        callback(datiUtente);
    });
}

ottieniDatiUtente(123, function(utente) {
    console.log(utente); // Ora funziona
});
```

#### Con Promises

```javascript
function ottieniDatiUtente(id) {
    return new Promise((resolve, reject) => {
        fetchUtente(id, function(datiUtente) {
            resolve(datiUtente);
        });
    });
}

ottieniDatiUtente(123)
    .then(utente => {
        console.log(utente);
    });
```

#### Con Async/Await

```javascript
async function mostraUtente(id) {
    const utente = await ottieniDatiUtente(id);
    console.log(utente);
}

mostraUtente(123);
```

## 10. Usare `==` invece di `===`

### Problema: Confronti imprecisi

```javascript
function controllaTipo(valore) {
    if (valore == 1) {
        return "Numero o stringa '1'";
    }
    return "Altro valore";
}

console.log(controllaTipo(1));    // "Numero o stringa '1'"
console.log(controllaTipo("1"));  // "Numero o stringa '1'" - Potrebbe essere inatteso
```

### Soluzione
Usa sempre l'operatore di uguaglianza stretta `===` e disuguaglianza stretta `!==` per evitare conversioni di tipo inattese.

```javascript
function controllaTipo(valore) {
    if (valore === 1) {
        return "Esattamente il numero 1";
    }
    return "Altro valore";
}

console.log(controllaTipo(1));    // "Esattamente il numero 1"
console.log(controllaTipo("1"));  // "Altro valore"
```

## Strumenti di debugging

### Console

- `console.log()`: Per output generici
- `console.error()`: Per errori (in rosso nella console)
- `console.warn()`: Per avvisi (in giallo nella console)
- `console.table()`: Per dati tabulari
- `console.time()` e `console.timeEnd()`: Per misurare le prestazioni

### Strumenti nei browser

- Breakpoint nei devtools
- Variabili watch
- Call stack
- Network monitoring

### Linting e formattazione

- ESLint: Trova errori e pattern problematici
- Prettier: Formatta il codice automaticamente
- TypeScript: Aggiunge tipi statici per prevenire errori

---
[← Precedente (Best Practices)](best-practices.md) | [Indice](../README.md) | [Esempi di base →](../esempi/esempi-base.js)