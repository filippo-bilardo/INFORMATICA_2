# Esercizi guidati sulle funzioni JavaScript

Questa serie di esercizi ti permetterà di mettere in pratica i concetti appresi sulle funzioni in JavaScript.
Per ogni esercizio, cerca prima di risolverlo da solo, poi guarda la soluzione proposta.

## Esercizio 1: Funzioni di base

**Obiettivo**: Creare una funzione che calcoli l'area e il perimetro di un rettangolo.

**Istruzioni**:
1. Scrivi una funzione `calcolaRettangolo` che prende come parametri `base` e `altezza`
2. La funzione deve restituire un oggetto con due proprietà: `area` e `perimetro`

**Modello di soluzione**:

```javascript
function calcolaRettangolo(base, altezza) {
    return {
        area: base * altezza,
        perimetro: 2 * (base + altezza)
    };
}

// Esempio di utilizzo:
const rettangolo = calcolaRettangolo(5, 3);
console.log(rettangolo.area);      // 15
console.log(rettangolo.perimetro); // 16
```

## Esercizio 2: Funzioni di ordine superiore

**Obiettivo**: Creare una funzione `applicaOperazione` che accetta un array, una funzione di trasformazione e applica la funzione a ogni elemento dell'array.

**Istruzioni**:
1. Scrivi una funzione `applicaOperazione(array, funzione)`
2. La funzione deve restituire un nuovo array con i risultati

**Modello di soluzione**:

```javascript
function applicaOperazione(array, funzione) {
    const risultato = [];
    for (let i = 0; i < array.length; i++) {
        risultato.push(funzione(array[i]));
    }
    return risultato;
}

// Esempio di utilizzo:
const numeri = [1, 2, 3, 4, 5];
const quadrati = applicaOperazione(numeri, x => x * x);
console.log(quadrati); // [1, 4, 9, 16, 25]

// Nota: questa funzione è simile al metodo map() degli array
```

## Esercizio 3: Closure

**Obiettivo**: Creare una funzione contatore che mantiene il proprio stato.

**Istruzioni**:
1. Scrivi una funzione `creaContatore` che restituisce una funzione
2. La funzione restituita deve incrementare un contatore ogni volta che viene chiamata
3. Il contatore deve essere privato (non accessibile dall'esterno)

**Modello di soluzione**:

```javascript
function creaContatore(valorIniziale = 0) {
    let contatore = valorIniziale;
    
    return function() {
        contatore += 1;
        return contatore;
    };
}

// Esempio di utilizzo:
const contatore1 = creaContatore();
console.log(contatore1()); // 1
console.log(contatore1()); // 2
console.log(contatore1()); // 3

const contatore2 = creaContatore(10);
console.log(contatore2()); // 11
console.log(contatore2()); // 12
```

## Esercizio 4: Ricorsione

**Obiettivo**: Implementare la funzione per il calcolo dei numeri di Fibonacci in modo ricorsivo.

**Istruzioni**:
1. Implementa `fibonacci(n)` che calcola l'n-esimo numero della sequenza di Fibonacci
2. Usa la ricorsione (la funzione deve chiamare se stessa)
3. Aggiungi anche una versione ottimizzata con memoization

**Modello di soluzione**:

```javascript
// Versione base (inefficiente per valori grandi di n)
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Versione ottimizzata con memoization
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Esempio di utilizzo:
console.log(fibonacci(7));     // 13
console.log(fibonacciMemo(7)); // 13

// Misura tempo per un valore grande
console.time('Fibonacci standard');
fibonacci(20);
console.timeEnd('Fibonacci standard');

console.time('Fibonacci memoized');
fibonacciMemo(20);
console.timeEnd('Fibonacci memoized');
```

## Esercizio 5: Funzioni pure e immutabilità

**Obiettivo**: Creare funzioni pure che manipolano array senza modificare gli originali.

**Istruzioni**:
1. Implementa una funzione pura `aggiungiElemento(array, elemento)` che aggiunge un elemento a un array
2. Implementa una funzione pura `rimuoviElemento(array, indice)` che rimuove un elemento a un dato indice
3. Implementa una funzione pura `aggiornaElemento(array, indice, nuovoValore)` che aggiorna un elemento a un dato indice

**Modello di soluzione**:

```javascript
function aggiungiElemento(array, elemento) {
    return [...array, elemento];
}

function rimuoviElemento(array, indice) {
    return array.filter((_, i) => i !== indice);
}

function aggiornaElemento(array, indice, nuovoValore) {
    return array.map((elemento, i) => i === indice ? nuovoValore : elemento);
}

// Esempio di utilizzo:
const originale = [1, 2, 3, 4];
const dopoDAggiunta = aggiungiElemento(originale, 5);
const dopoRimozione = rimuoviElemento(originale, 1);
const dopoAggiornamento = aggiornaElemento(originale, 2, 10);

console.log(originale);        // [1, 2, 3, 4] - non modificato
console.log(dopoDAggiunta);    // [1, 2, 3, 4, 5]
console.log(dopoRimozione);    // [1, 3, 4]
console.log(dopoAggiornamento); // [1, 2, 10, 4]
```

## Esercizio 6: Currying e applicazione parziale

**Obiettivo**: Implementare funzioni per il currying e l'applicazione parziale.

**Istruzioni**:
1. Implementa una funzione `curry(fn)` che trasforma una funzione multiparametro in una serie di funzioni a parametro singolo
2. Implementa una funzione `partial(fn, ...presetArgs)` che crea una nuova funzione con alcuni parametri prefissati

**Modello di soluzione**:

```javascript
function curry(fn) {
    return function curriedFn(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...moreArgs) {
            return curriedFn(...args, ...moreArgs);
        };
    };
}

function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

// Esempio di utilizzo:
function somma(a, b, c) {
    return a + b + c;
}

const sommaCurried = curry(somma);
console.log(sommaCurried(1)(2)(3));   // 6
console.log(sommaCurried(1, 2)(3));   // 6

const somma10 = partial(somma, 10);
console.log(somma10(5, 15));          // 30
```

## Esercizio 7: Gestione degli errori

**Obiettivo**: Implementare funzioni che gestiscono correttamente gli errori.

**Istruzioni**:
1. Scrivi una funzione `dividiSicuro(a, b)` che gestisce il caso di divisione per zero
2. La funzione deve restituire un oggetto che indica il successo o il fallimento dell'operazione

**Modello di soluzione**:

```javascript
function dividiSicuro(a, b) {
    // Validazione dei tipi
    if (typeof a !== 'number' || typeof b !== 'number') {
        return {
            successo: false,
            errore: 'Entrambi i parametri devono essere numeri',
            valore: null
        };
    }
    
    // Gestione divisione per zero
    if (b === 0) {
        return {
            successo: false,
            errore: 'Impossibile dividere per zero',
            valore: null
        };
    }
    
    // Calcolo effettivo
    return {
        successo: true,
        errore: null,
        valore: a / b
    };
}

// Esempio di utilizzo:
console.log(dividiSicuro(10, 2));   // {successo: true, errore: null, valore: 5}
console.log(dividiSicuro(10, 0));   // {successo: false, errore: 'Impossibile dividere per zero', valore: null}
console.log(dividiSicuro('10', 2)); // {successo: false, errore: 'Entrambi i parametri devono essere numeri', valore: null}
```

## Esercizio 8: Composizione di funzioni

**Obiettivo**: Implementare funzioni di composizione.

**Istruzioni**:
1. Scrivi una funzione `compose(...fns)` che compone più funzioni da destra a sinistra
2. Scrivi una funzione `pipe(...fns)` che compone più funzioni da sinistra a destra

**Modello di soluzione**:

```javascript
function compose(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

function pipe(...fns) {
    return function(x) {
        return fns.reduce((acc, fn) => fn(acc), x);
    };
}

// Esempio di utilizzo:
const doppio = x => x * 2;
const incrementa = x => x + 1;
const quadrato = x => x * x;

// compose esegue le funzioni da destra a sinistra
const operazione1 = compose(quadrato, incrementa, doppio);
console.log(operazione1(3));  // quadrato(incrementa(doppio(3))) = quadrato(incrementa(6)) = quadrato(7) = 49

// pipe esegue le funzioni da sinistra a destra
const operazione2 = pipe(doppio, incrementa, quadrato);
console.log(operazione2(3));  // quadrato(incrementa(doppio(3))) = quadrato(incrementa(6)) = quadrato(7) = 49
```

## Esercizio 9: Factory Functions

**Obiettivo**: Creare una factory function per generare oggetti con metodi privati.

**Istruzioni**:
1. Scrivi una funzione `creaCalcolatrice()` che restituisce un oggetto con metodi per operazioni matematiche
2. L'oggetto deve mantenere uno stato interno (il risultato corrente)
3. Deve offrire metodi per somma, sottrazione, moltiplicazione e divisione

**Modello di soluzione**:

```javascript
function creaCalcolatrice(valoreIniziale = 0) {
    let risultato = valoreIniziale;
    
    return {
        valore: function() {
            return risultato;
        },
        somma: function(n) {
            risultato += n;
            return this; // per il method chaining
        },
        sottrai: function(n) {
            risultato -= n;
            return this;
        },
        moltiplica: function(n) {
            risultato *= n;
            return this;
        },
        dividi: function(n) {
            if (n === 0) {
                console.error("Impossibile dividere per zero");
                return this;
            }
            risultato /= n;
            return this;
        },
        reset: function() {
            risultato = valoreIniziale;
            return this;
        }
    };
}

// Esempio di utilizzo:
const calcolatrice = creaCalcolatrice(10);
console.log(calcolatrice.valore());  // 10

// Method chaining
calcolatrice.somma(5).moltiplica(2).sottrai(7).dividi(2);
console.log(calcolatrice.valore());  // 6.5

calcolatrice.reset();
console.log(calcolatrice.valore());  // 10
```

## Esercizio 10: Progetto avanzato - Mini libreria funzionale

**Obiettivo**: Combinare i concetti appresi per creare una mini libreria di funzioni utili.

**Istruzioni**:
1. Crea un oggetto `Toolkit` che contenga varie funzioni utili
2. Implementa funzioni come map, filter, reduce, pipe, compose, curry, etc.

**Modello di soluzione**:

```javascript
const Toolkit = (function() {
    // Funzioni di utilità interne
    function _isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    
    return {
        // forEach personalizzato
        each: function(collezione, callback) {
            if (_isArray(collezione)) {
                for (let i = 0; i < collezione.length; i++) {
                    callback(collezione[i], i, collezione);
                }
            } else {
                for (let key in collezione) {
                    if (collezione.hasOwnProperty(key)) {
                        callback(collezione[key], key, collezione);
                    }
                }
            }
            return collezione;
        },
        
        // map personalizzato
        map: function(collezione, callback) {
            const risultato = _isArray(collezione) ? [] : {};
            
            this.each(collezione, function(valore, chiaveIndice, collezione) {
                risultato[chiaveIndice] = callback(valore, chiaveIndice, collezione);
            });
            
            return risultato;
        },
        
        // filter personalizzato
        filter: function(collezione, predicate) {
            const risultato = _isArray(collezione) ? [] : {};
            
            this.each(collezione, function(valore, chiaveIndice, collezione) {
                if (predicate(valore, chiaveIndice, collezione)) {
                    if (_isArray(collezione)) {
                        risultato.push(valore);
                    } else {
                        risultato[chiaveIndice] = valore;
                    }
                }
            });
            
            return risultato;
        },
        
        // reduce personalizzato
        reduce: function(collezione, callback, valoreIniziale) {
            let accumulatore = valoreIniziale;
            
            this.each(collezione, function(valore, chiaveIndice, collezione) {
                if (accumulatore === undefined && chiaveIndice === 0) {
                    accumulatore = valore;
                } else {
                    accumulatore = callback(accumulatore, valore, chiaveIndice, collezione);
                }
            });
            
            return accumulatore;
        },
        
        // compose (da destra a sinistra)
        compose: function(...fns) {
            return function(x) {
                return fns.reduceRight((acc, fn) => fn(acc), x);
            };
        },
        
        // pipe (da sinistra a destra)
        pipe: function(...fns) {
            return function(x) {
                return fns.reduce((acc, fn) => fn(acc), x);
            };
        },
        
        // curry
        curry: function(fn) {
            return function curriedFn(...args) {
                if (args.length >= fn.length) {
                    return fn(...args);
                }
                return function(...moreArgs) {
                    return curriedFn(...args, ...moreArgs);
                };
            };
        },
        
        // memoize
        memoize: function(fn) {
            const cache = {};
            return function(...args) {
                const key = JSON.stringify(args);
                if (!(key in cache)) {
                    cache[key] = fn(...args);
                }
                return cache[key];
            };
        }
    };
})();

// Esempio di utilizzo:
const numeri = [1, 2, 3, 4, 5];

// Utilizzo di map
const raddoppiati = Toolkit.map(numeri, n => n * 2);
console.log(raddoppiati); // [2, 4, 6, 8, 10]

// Utilizzo di filter
const pari = Toolkit.filter(numeri, n => n % 2 === 0);
console.log(pari); // [2, 4]

// Utilizzo di reduce
const somma = Toolkit.reduce(numeri, (acc, n) => acc + n, 0);
console.log(somma); // 15

// Utilizzo di compose
const doppio = x => x * 2;
const incrementa = x => x + 1;
const operazione = Toolkit.compose(doppio, incrementa);
console.log(operazione(3)); // 8 (doppio(incrementa(3)) = doppio(4) = 8)

// Utilizzo di memoize
const fibMemo = Toolkit.memoize(function(n) {
    if (n <= 1) return n;
    return fibMemo(n - 1) + fibMemo(n - 2);
});

console.time('fibonacci');
console.log(fibMemo(30)); // Veloce grazie alla memoization
console.timeEnd('fibonacci');
```

---

Questi esercizi ti aiuteranno a comprendere meglio e applicare i concetti relativi alle funzioni in JavaScript. Ricorda di sperimentare e modificare le soluzioni proposte per consolidare la tua comprensione.

[Torna agli esempi base](esempi-base.js) | [Torna agli esempi avanzati](esempi-avanzati.js) | [Torna all'indice](../README.md)
