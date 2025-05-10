// Esempio 3: Scope Locale e Globale delle Variabili
// Questo esempio illustra la differenza tra variabili globali e locali in JavaScript.

let variabileGlobale = "Sono globale";

/**
 * Funzione che dimostra lo scope delle variabili.
 */
function dimostraScope() {
    let variabileLocale = "Sono locale alla funzione";
    brick.showString(variabileGlobale, 2); // Può accedere alla variabile globale
    brick.showString(variabileLocale, 3);

    if (true) {
        let variabileBlocco = "Sono locale al blocco if";
        brick.showString(variabileBlocco, 4);
        // variabileGlobale è accessibile qui
        // variabileLocale è accessibile qui
    }

    // Errore: variabileBlocco non è definita qui (fuori dal suo scope)
    // brick.showString(variabileBlocco, 5); 
    // Decommentare la riga sopra causerebbe un errore in MakeCode
}

/**
 * Altra funzione per mostrare che la variabile locale di dimostraScope() non è accessibile qui.
 */
function altraFunzione() {
    brick.showString(variabileGlobale, 6); // Accesso alla variabile globale
    // Errore: variabileLocale non è definita qui
    // brick.showString(variabileLocale, 7);
    // Decommentare la riga sopra causerebbe un errore in MakeCode
    brick.showString("variabileLocale non accessibile", 7);
}

// Programma principale
brick.showString("Esempio Scope Variabili", 1);

dimostraScope();
pause(3000);
altraFunzione();

brick.showString("Esecuzione completata.", 9);