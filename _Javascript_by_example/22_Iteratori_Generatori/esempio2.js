/**
 * Esempio 2: Utilizzo di generatori per sequenze di numeri
 * 
 * Questo esempio mostra come utilizzare i generatori per creare
 * diverse sequenze numeriche in modo efficiente.
 */

// Generatore per la sequenza di Fibonacci
function* fibonacci(limite) {
  let [prev, curr] = [0, 1];
  
  while (curr <= limite) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Generatore per i numeri primi fino a un limite
function* numeriPrimi(limite) {
  // Funzione di supporto per verificare se un numero è primo
  function isPrimo(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
  }
  
  for (let n = 2; n <= limite; n++) {
    if (isPrimo(n)) yield n;
  }
}

// Generatore per i numeri pari
function* numeriPari(limite) {
  for (let i = 0; i <= limite; i += 2) {
    yield i;
  }
}

// Generatore per i numeri dispari
function* numeriDispari(limite) {
  for (let i = 1; i <= limite; i += 2) {
    yield i;
  }
}

// Generatore che combina più sequenze usando yield*
function* sequenzeCombinate(limite) {
  console.log('Inizio sequenza di Fibonacci:');
  yield* fibonacci(limite);
  
  console.log('\nInizio sequenza di numeri primi:');
  yield* numeriPrimi(limite);
  
  console.log('\nInizio sequenza di numeri pari:');
  yield* numeriPari(limite);
}

// Utilizzo dei generatori
const limite = 50;

console.log(`Numeri di Fibonacci fino a ${limite}:`);
for (const num of fibonacci(limite)) {
  process.stdout.write(`${num} `);
}

console.log(`\n\nNumeri primi fino a ${limite}:`);
for (const num of numeriPrimi(limite)) {
  process.stdout.write(`${num} `);
}

console.log('\n\nUtilizzo del generatore combinato:');
const sequenze = sequenzeCombinate(20);

// Consumiamo il generatore combinato
let risultato = sequenze.next();
while (!risultato.done) {
  process.stdout.write(`${risultato.value} `);
  risultato = sequenze.next();
}

// Esempio di generatore infinito con limitazione esterna
function* contatoreSenzaFine() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

console.log('\n\nPrimi 10 numeri dal generatore infinito:');
const contatore = contatoreSenzaFine();
for (let i = 0; i < 10; i++) {
  console.log(contatore.next().value);
}