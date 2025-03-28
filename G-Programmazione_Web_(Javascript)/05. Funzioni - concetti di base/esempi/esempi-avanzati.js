/**
 * Esempi avanzati sulle funzioni in JavaScript
 * Questo file contiene esempi pratici che illustrano concetti avanzati delle funzioni.
 */

// ----------------------------------------------------------------------
// 4. PATTERN FUNZIONALI
// ----------------------------------------------------------------------

// Currying
function moltiplicazione(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

console.log(moltiplicazione(2)(3)(4)); // 24

// Composizione di funzioni
const doppio = x => x * 2;
const incrementa = x => x + 1;
const quadrato = x => x * x;

function componi(...funzioni) {
    return funzioni.reduce((f, g) => (...args) => f(g(...args)));
}

const elabora = componi(quadrato, incrementa, doppio);
console.log(elabora(3)); // quadrato(incrementa(doppio(3))) = quadrato(incrementa(6)) = quadrato(7) = 49

// Point-free style
const numeri = [1, 2, 3, 4, 5, 6];
const isPari = n => n % 2 === 0;
const pari = numeri.filter(isPari); // point-free style

console.log(pari); // [2, 4, 6]

// ----------------------------------------------------------------------
// 5. FUNZIONI ASINCRONE
// ----------------------------------------------------------------------

// Promise con funzioni
function ritardoPromise(ms, valore) {
    return new Promise(resolve => {
        setTimeout(() => resolve(valore), ms);
    });
}

ritardoPromise(1000, "Operazione completata!")
    .then(risultato => console.log(risultato))
    .catch(errore => console.error(errore));

// Async/Await
async function esempioAsync() {
    try {
        console.log("Inizio");
        const risultato1 = await ritardoPromise(1000, "Primo risultato");
        console.log(risultato1);
        const risultato2 = await ritardoPromise(500, "Secondo risultato");
        console.log(risultato2);
        console.log("Fine");
    } catch (errore) {
        console.error("Si è verificato un errore:", errore);
    }
}

// Richiama questa funzione per vedere il risultato
// esempioAsync();

// ----------------------------------------------------------------------
// 6. GESTIONE ERRORI IN FUNZIONI
// ----------------------------------------------------------------------

// Funzione con lancio errori
function dividi(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Entrambi gli argomenti devono essere numeri");
    }
    if (b === 0) {
        throw new Error("Impossibile dividere per zero");
    }
    return a / b;
}

// Utilizzo con try/catch
try {
    console.log(dividi(10, 2)); // 5
    console.log(dividi(10, 0)); // Errore
} catch (errore) {
    console.error("Errore catturato:", errore.message);
}

// Funzione che ritorna un risultato o un errore
function calcolaRadiceQuadrata(numero) {
    if (typeof numero !== 'number') {
        return { errore: "Input deve essere un numero" };
    }
    if (numero < 0) {
        return { errore: "Impossibile calcolare la radice quadrata di un numero negativo" };
    }
    return { risultato: Math.sqrt(numero) };
}

const risultato1 = calcolaRadiceQuadrata(16);
if (risultato1.errore) {
    console.error(risultato1.errore);
} else {
    console.log("La radice quadrata è:", risultato1.risultato); // La radice quadrata è: 4
}

const risultato2 = calcolaRadiceQuadrata(-5);
if (risultato2.errore) {
    console.error(risultato2.errore); // Impossibile calcolare la radice quadrata di un numero negativo
} else {
    console.log("La radice quadrata è:", risultato2.risultato);
}

// ----------------------------------------------------------------------
// 7. DEBUGGING DI FUNZIONI
// ----------------------------------------------------------------------

function funzioneDaDebuggare(array, moltiplicatore) {
    console.time("Tempo di esecuzione");
    
    // Logging intermedio per debug
    console.log("Input:", array, moltiplicatore);
    
    // Breakpoint condizionale
    if (moltiplicatore === 0) {
        console.warn("Moltiplicatore zero rilevato");
    }
    
    // Tabella per visualizzare dati
    const risultati = array.map((numero, indice) => ({
        indice,
        originale: numero,
        risultato: numero * moltiplicatore
    }));
    console.table(risultati);
    
    console.timeEnd("Tempo di esecuzione");
    return risultati.map(item => item.risultato);
}

funzioneDaDebuggare([1, 2, 3, 4, 5], 2);
// funzioneDaDebuggare([10, 20, 30], 0); // Caso speciale

// ----------------------------------------------------------------------
// Fine esempi avanzati
// ----------------------------------------------------------------------

// Per esercizio, prova a creare una funzione che combina i concetti visti:
// - Closure
// - Ricorsione
// - Memoization
// - Funzioni pure