/**
 * Esempi di base sulle funzioni in JavaScript
 * Questo file contiene esempi pratici che illustrano i concetti fondamentali delle funzioni.
 */

// ----------------------------------------------------------------------
// 1. DICHIARAZIONE E INVOCAZIONE
// ----------------------------------------------------------------------

// Dichiarazione di funzione standard
function saluta(nome) {
    return "Ciao, " + nome + "!";
}

// Invocazione della funzione
console.log(saluta("Marco"));  // Output: Ciao, Marco!

// Funzione con valori predefiniti (ES6+)
function salutaConRuolo(nome, ruolo = "studente") {
    return `Ciao, ${nome}! Sei un ${ruolo}.`;
}

console.log(salutaConRuolo("Anna"));          // Output: Ciao, Anna! Sei un studente.
console.log(salutaConRuolo("Anna", "docente")); // Output: Ciao, Anna! Sei un docente.

// ----------------------------------------------------------------------
// 2. TIPOLOGIA DI FUNZIONI
// ----------------------------------------------------------------------

// Funzione che non restituisce valori (return implicito undefined)
function salutaConsole(nome) {
    console.log(`Ciao ${nome}!`);
    // Nessun return esplicito
}

const risultatoSaluto = salutaConsole("Luca");  // Output: Ciao Luca!
console.log(risultatoSaluto);  // Output: undefined

// Funzione con return esplicito
function somma(a, b) {
    return a + b;  // Restituisce la somma
}

console.log(somma(5, 3));  // Output: 8

// Funzione che restituisce più valori tramite un oggetto
function statistiche(numeri) {
    let somma = 0;
    let minimo = numeri[0];
    let massimo = numeri[0];
    
    for (let n of numeri) {
        somma += n;
        if (n < minimo) minimo = n;
        if (n > massimo) massimo = n;
    }
    
    return {
        somma: somma,
        media: somma / numeri.length,
        min: minimo,
        max: massimo
    };
}

const stats = statistiche([5, 3, 8, 1, 10]);
console.log(stats);  // Output: { somma: 27, media: 5.4, min: 1, max: 10 }

// ----------------------------------------------------------------------
// 3. FUNZIONI COME VALORI (FIRST CLASS FUNCTION)
// ----------------------------------------------------------------------

// Assegnazione di una funzione a una variabile
const quadrato = function(x) {
    return x * x;
};

console.log(quadrato(4));  // Output: 16

// Passaggio di una funzione come parametro
function applicaOperazione(a, b, operazione) {
    return operazione(a, b);
}

function moltiplica(a, b) {
    return a * b;
}

console.log(applicaOperazione(5, 3, somma));       // Output: 8
console.log(applicaOperazione(5, 3, moltiplica));  // Output: 15

// Restituzione di una funzione da un'altra funzione
function creaIncrementatore(incremento) {
    return function(numero) {
        return numero + incremento;
    };
}

const aggiungiDue = creaIncrementatore(2);
console.log(aggiungiDue(10));  // Output: 12

// ----------------------------------------------------------------------
// 4. FUNZIONI ANONIME
// ----------------------------------------------------------------------

// Funzione anonima assegnata a una variabile
const cubo = function(x) {
    return x * x * x;
};

console.log(cubo(3));  // Output: 27

// Funzione anonima passata direttamente come argomento
const numeri = [1, 2, 3, 4, 5];
const quadrati = numeri.map(function(numero) {
    return numero * numero;
});

console.log(quadrati);  // Output: [1, 4, 9, 16, 25]

// IIFE (Immediately Invoked Function Expression)
(function() {
    const messaggio = "Questa funzione si auto-esegue!";
    console.log(messaggio);
})();  // Output: Questa funzione si auto-esegue!

// ----------------------------------------------------------------------
// 5. ARROW FUNCTIONS
// ----------------------------------------------------------------------

// Arrow function semplice
const raddoppia = (x) => x * 2;
console.log(raddoppia(7));  // Output: 14

// Con più parametri
const moltiplica2 = (a, b) => a * b;
console.log(moltiplica2(4, 5));  // Output: 20

// Con blocco di codice
const verificaPositivo = (numero) => {
    if (numero > 0) {
        return true;
    } else {
        return false;
    }
};

console.log(verificaPositivo(10));  // Output: true
console.log(verificaPositivo(-5));  // Output: false

// Arrow function in un metodo di array
const numeriDispari = numeri.filter(n => n % 2 !== 0);
console.log(numeriDispari);  // Output: [1, 3, 5]

// ----------------------------------------------------------------------
// 6. SCOPE E CONTESTO (THIS)
// ----------------------------------------------------------------------

// Variabili con scope diverso
function dimostraScope() {
    var varScope = "Visibile solo nella funzione";
    let letScope = "Anche questo è visibile solo nella funzione";
    
    if (true) {
        var varInIf = "Visibile in tutta la funzione";
        let letInIf = "Visibile solo nel blocco if";
        console.log(letInIf);  // Accessibile qui
    }
    
    console.log(varInIf);  // Accessibile qui perché var ha scope di funzione
    // console.log(letInIf);  // Errore! letInIf non è definita qui
}

dimostraScope();

// Dimostrazione di this in diversi contesti
const persona = {
    nome: "Mario",
    cognome: "Rossi",
    nomeCompleto: function() {
        return this.nome + " " + this.cognome;
    },
    salutaConTimeoutArrow: function() {
        setTimeout(() => {
            // this mantiene il riferimento a 'persona'
            console.log("Arrow: Ciao, sono " + this.nomeCompleto());
        }, 100);
    },
    salutaConTimeoutRegular: function() {
        setTimeout(function() {
            // this qui si riferisce a 'Window' o 'global', non a 'persona'
            // Quindi questo codice produrrà un errore
            console.log("Regular: Ciao, sono " + this.nomeCompleto());
        }, 200);
    }
};

console.log(persona.nomeCompleto());  // Output: Mario Rossi
persona.salutaConTimeoutArrow();      // Funziona correttamente
// persona.salutaConTimeoutRegular();    // Genererà un errore
