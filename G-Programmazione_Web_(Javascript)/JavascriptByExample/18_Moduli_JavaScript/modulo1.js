// modulo1.js
// Un semplice modulo che esporta alcune funzioni e variabili

// Variabile esportata
export const nome = "Modulo Uno";

// Funzione esportata
export function saluta(persona) {
  return `Ciao, ${persona}! Benvenuto in ${nome}.`;
}

// Funzione esportata
export function somma(a, b) {
  return a + b;
}

// Variabile non esportata (privata al modulo)
const segreto = "Questo non sarà accessibile fuori dal modulo";

// Funzione che usa variabili private
export function rivela() {
  return `Il segreto è: ${segreto}`;
}