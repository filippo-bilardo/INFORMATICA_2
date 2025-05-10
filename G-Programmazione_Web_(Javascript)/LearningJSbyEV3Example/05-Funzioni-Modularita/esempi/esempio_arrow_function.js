// Esempio 4: Arrow Functions
// Questo esempio mostra come definire e utilizzare le arrow functions in JavaScript.

// Funzione tradizionale
function sommaTradizionale(a: number, b: number): number {
    return a + b;
}

// Arrow function equivalente
const sommaArrow = (a: number, b: number): number => {
    return a + b;
};

// Arrow function concisa (per singola espressione di ritorno)
const moltiplicaArrowConcisa = (a: number, b: number): number => a * b;

// Arrow function con un solo parametro
const quadratoArrow = (x: number): number => x * x;

// Arrow function senza parametri
const salutaArrow = (): void => {
    brick.showString("Ciao dalle Arrow Function!", 6);
};

// Programma principale
brick.showString("Esempio Arrow Functions", 1);

let num1 = 5;
let num2 = 10;

let risultato1 = sommaTradizionale(num1, num2);
brick.showString("Tradizionale: " + num1 + "+" + num2 + "=" + risultato1, 2);
pause(1000);

let risultato2 = sommaArrow(num1, num2);
brick.showString("Arrow: " + num1 + "+" + num2 + "=" + risultato2, 3);
pause(1000);

let risultato3 = moltiplicaArrowConcisa(num1, num2);
brick.showString("Arrow Concisa: " + num1 + "*" + num2 + "=" + risultato3, 4);
pause(1000);

let risultato4 = quadratoArrow(num1);
brick.showString("Quadrato Arrow: " + num1 + "^2=" + risultato4, 5);
pause(1000);

salutaArrow();
pause(1000);

brick.showString("Esecuzione completata.", 8);