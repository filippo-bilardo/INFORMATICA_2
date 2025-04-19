// 01_hello_world.js
// Esempio base di Node.js

// Il classico "Hello World" in Node.js
console.log("Hello, Node.js!");

// Utilizzo di setTimeout per dimostrare l'event loop
console.log("Inizio del programma");

setTimeout(() => {
  console.log("Questo messaggio appare dopo 2 secondi");
}, 2000);

console.log("Fine del programma (ma l'esecuzione continua in background)");

// Per eseguire: node 01_hello_world.js