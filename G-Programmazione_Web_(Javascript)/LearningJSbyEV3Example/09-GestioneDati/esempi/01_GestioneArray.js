// Esempio 01: Gestione degli Array in JavaScript per EV3

brick.showString("Esempio Gestione Array", 1);

// 1. Creazione di un Array
// Un array può contenere numeri, stringhe, booleani o anche altri array/oggetti.
let numeri = [10, 20, 30, 40, 50];
let nomi = ["Alice", "Bob", "Charlie"];
let misto = [1, "test", true, 3.14];

brick.showString("Array 'numeri' creato", 3);
pause(1000);

// 2. Accesso agli Elementi dell'Array
// Gli elementi di un array sono accessibili tramite il loro indice (che parte da 0).
brick.showString("Primo numero: " + numeri[0], 4); // Accede al primo elemento (10)
brick.showString("Secondo nome: " + nomi[1], 5); // Accede al secondo elemento ("Bob")
pause(2000);

// 3. Modifica degli Elementi dell'Array
numeri[0] = 15; // Modifica il primo elemento da 10 a 15
brick.showString("Nuovo primo numero: " + numeri[0], 4);
pause(1000);

// 4. Lunghezza dell'Array
// La proprietà 'length' restituisce il numero di elementi nell'array.
brick.showString("Lunghezza 'nomi': " + nomi.length, 6);
pause(1000);

// 5. Iterare su un Array
// Si può usare un ciclo 'for' per scorrere tutti gli elementi.
brick.showString("Iterazione 'numeri':", 3);
for (let i = 0; i < numeri.length; i++) {
  brick.showString("Indice " + i + ": " + numeri[i], 4 + i);
  pause(500);
}
pause(1000);

// Pulizia display per la prossima sezione
for(let i=3; i < 10; i++) brick.showString("                     ", i);

// 6. Aggiungere Elementi
// push(): aggiunge uno o più elementi alla fine dell'array.
nomi.push("David");
brick.showString("Nomi dopo push: " + nomi.join(", "), 3); // .join() per visualizzare l'array come stringa
pause(1000);

// unshift(): aggiunge uno o più elementi all'inizio dell'array.
nomi.unshift("Zoe");
brick.showString("Nomi dopo unshift: " + nomi.join(", "), 4);
pause(1000);

// 7. Rimuovere Elementi
// pop(): rimuove l'ultimo elemento dall'array e lo restituisce.
let ultimoNome = nomi.pop();
brick.showString("Rimosso (pop): " + ultimoNome, 5);
brick.showString("Nomi dopo pop: " + nomi.join(", "), 6);
pause(1000);

// shift(): rimuove il primo elemento dall'array e lo restituisce.
let primoNome = nomi.shift();
brick.showString("Rimosso (shift): " + primoNome, 5);
brick.showString("Nomi dopo shift: " + nomi.join(", "), 6);
pause(1000);

// Pulizia display
for(let i=3; i < 10; i++) brick.showString("                     ", i);

// 8. Trovare Elementi
// indexOf(): restituisce il primo indice a cui un dato elemento può essere trovato nell'array, o -1 se non è presente.
let indiceBob = nomi.indexOf("Bob");
brick.showString("Indice di Bob: " + indiceBob, 3);
pause(1000);

let indiceEve = nomi.indexOf("Eve"); // Eve non c'è
brick.showString("Indice di Eve: " + indiceEve, 4);
pause(1000);

// includes(): determina se un array include un certo valore tra i suoi elementi, restituendo true o false.
let haCharlie = nomi.includes("Charlie");
brick.showString("L'array include Charlie? " + haCharlie, 5);
pause(1000);

// 9. Metodi Utili (Esempi)
// slice(): restituisce una copia superficiale (shallow copy) di una porzione dell'array in un nuovo array.
let primiDueNumeri = numeri.slice(0, 2); // Elementi dall'indice 0 fino a (ma non incluso) l'indice 2
brick.showString("Primi due numeri: " + primiDueNumeri.join(", "), 7);
pause(1000);

// splice(): cambia il contenuto di un array rimuovendo o rimpiazzando elementi esistenti e/o aggiungendone di nuovi.
// Rimuoviamo 1 elemento all'indice 1 e inseriamo "Berta"
let nomiDaModificare = ["Aldo", "Giovanni", "Giacomo"];
nomiDaModificare.splice(1, 1, "Berta"); // All'indice 1, rimuovi 1 elemento, inserisci "Berta"
brick.showString("Splice: " + nomiDaModificare.join(", "), 8);
pause(2000);

// Array di dati da sensore (simulato)
let lettureSensore = [];
for (let i = 0; i < 5; i++) {
  lettureSensore.push(Math.random() * 100); // Valori casuali tra 0 e 100
}

brick.showString("Letture Sensore:", 3);
for (let i = 0; i < lettureSensore.length; i++) {
  brick.showString(lettureSensore[i].toFixed(2), 4 + i); // .toFixed(2) per due cifre decimali
  pause(400);
}
pause(1000);

// Calcolare la media delle letture
let somma = 0;
for (let i = 0; i < lettureSensore.length; i++) {
  somma += lettureSensore[i];
}
let media = somma / lettureSensore.length;
brick.showString("Media letture: " + media.toFixed(2), 9);
pause(2000);

brick.showString("Fine Esempio Array", 1);

// Nota: MakeCode per EV3 potrebbe avere delle limitazioni sulla complessità
// degli array o sui metodi disponibili rispetto a un ambiente JavaScript standard (es. browser o Node.js).
// Fare sempre riferimento alla documentazione di MakeCode.