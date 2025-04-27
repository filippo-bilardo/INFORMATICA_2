// operazioni_matematiche.js
// Modulo che esporta funzioni per operazioni matematiche

/**
 * Funzione che calcola la somma di due numeri
 * @param {number} a - Primo numero
 * @param {number} b - Secondo numero
 * @returns {number} La somma dei due numeri
 */
export function somma(a, b) {
  return a + b;
}

/**
 * Funzione che calcola la sottrazione tra due numeri
 * @param {number} a - Primo numero
 * @param {number} b - Secondo numero
 * @returns {number} La differenza tra i due numeri
 */
export function sottrazione(a, b) {
  return a - b;
}

/**
 * Funzione che calcola la moltiplicazione di due numeri
 * @param {number} a - Primo numero
 * @param {number} b - Secondo numero
 * @returns {number} Il prodotto dei due numeri
 */
export function moltiplicazione(a, b) {
  return a * b;
}

/**
 * Funzione che calcola la divisione tra due numeri
 * @param {number} a - Dividendo
 * @param {number} b - Divisore
 * @returns {number} Il quoziente della divisione
 * @throws {Error} Se il divisore è zero
 */
export function divisione(a, b) {
  if (b === 0) {
    throw new Error('Impossibile dividere per zero');
  }
  return a / b;
}

/**
 * Funzione che calcola il resto della divisione tra due numeri
 * @param {number} a - Dividendo
 * @param {number} b - Divisore
 * @returns {number} Il resto della divisione
 * @throws {Error} Se il divisore è zero
 */
export function modulo(a, b) {
  if (b === 0) {
    throw new Error('Impossibile calcolare il modulo con divisore zero');
  }
  return a % b;
}

/**
 * Funzione che calcola la potenza di un numero
 * @param {number} base - La base
 * @param {number} esponente - L'esponente
 * @returns {number} La potenza calcolata
 */
export function potenza(base, esponente) {
  return Math.pow(base, esponente);
}

// Esportiamo anche un oggetto con tutte le funzioni
export default {
  somma,
  sottrazione,
  moltiplicazione,
  divisione,
  modulo,
  potenza
};