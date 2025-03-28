/**
 * ESEMPI AVANZATI DI FUNZIONI IN JAVASCRIPT
 * Questo file contiene esempi avanzati sull'utilizzo delle funzioni in JavaScript
 */

// ======= CLOSURES =======

function creaContatore() {
    let conteggio = 0;
    
    // Questa funzione interna "ricorda" la variabile conteggio
    // anche dopo che la funzione esterna è terminata
    return function() {
        conteggio++;
        return conteggio;
    };
}

const contatore1 = creaContatore();
const contatore2 = creaContatore();

console.log(contatore1()); // Output: 1
console.log(contatore1()); // Output: 2
console.log(contatore2()); // Output: 1 (contatore2 ha il suo stato separato)

// Esempio pratico: generatore di ID
function creaGeneratoreID(prefisso = 'id-') {
    let contatore = 0;
    return function() {
        contatore++;
        return `${prefisso}${contatore}`;
    };
}

const generaID = creaGeneratoreID('user-');
console.log(generaID()); // Output: user-1
console.log(generaID()); // Output: user-2

// ======= RICORSIONE =======

// Calcolo del fattoriale con ricorsione
function fattoriale(n) {
    // Caso base
    if (n <= 1) {
        return 1;
    }
    // Chiamata ricorsiva
    return n * fattoriale(n - 1);
}

console.log(fattoriale(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)

// Fibonacci con ricorsione
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7)); // Output: 13

// ======= CURRYING =======

// Funzione normale
function somma(a, b, c) {
    return a + b + c;
}

// Versione curried
function sommaC(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(somma(1, 2, 3)); // Output: 6
console.log(sommaC(1)(2)(3)); // Output: 6

// Utilizzo pratico del currying
const aggiungiTasse = (tassaPercentuale) => {
    return (prezzo) => {
        return prezzo * (1 + tassaPercentuale / 100);
    };
};

const aggiungiIVA22 = aggiungiTasse(22);
console.log(aggiungiIVA22(100)); // Output: 122
console.log(aggiungiIVA22(200)); // Output: 244

// ======= COMPOSIZIONE DI FUNZIONI =======

// Funzioni semplici
const doppio = x => x * 2;
const incrementa = x => x + 1;
const quadrato = x => x * x;

// Funzione di composizione
const componi = (...funzioni) => {
    return (valore) => {
        return funzioni.reduceRight((valoreParziale, funzione) => {
            return funzione(valoreParziale);
        }, valore);
    };
};

// Creazione di una nuova funzione composta
const operazioneComplessa = componi(quadrato, incrementa, doppio);

// È equivalente a: quadrato(incrementa(doppio(5)))
console.log(operazioneComplessa(5)); // Output: 121 (((5*2)+1)^2)

// ======= MEMOIZZAZIONE =======

// Funzione costosa senza memoizzazione
function fibonacciLento(n) {
    if (n <= 1) return n;
    return fibonacciLento(n - 1) + fibonacciLento(n - 2);
}

// Creazione di una funzione di memoizzazione generica
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] === undefined) {
            cache[key] = fn(...args);
        }
        return cache[key];
    };
}

// Versione memoizzata di fibonacci
const fibonacciVeloce = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacciVeloce(n - 1) + fibonacciVeloce(n - 2);
});

console.time('Fibonacci lento');
console.log(fibonacciLento(30)); // Molto lento
console.timeEnd('Fibonacci lento');

console.time('Fibonacci veloce');
console.log(fibonacciVeloce(30)); // Molto più veloce
console.timeEnd('Fibonacci veloce');

// ======= ASYNC/AWAIT CON FUNZIONI =======

// Simulazione di chiamata API
function fakeAPICall(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, nome: `Item-${id}` });
        }, 1000);
    });
}

// Funzione asincrona
async function ottieniDati(id) {
    try {
        console.log('Recupero dati...');
        const dati = await fakeAPICall(id);
        console.log('Dati ricevuti:', dati);
        return dati;
    } catch (errore) {
        console.error('Errore:', errore);
    }
}

// Chiamata della funzione asincrona
ottieniDati(42).then(risultato => {
    console.log('Risultato finale:', risultato);
});