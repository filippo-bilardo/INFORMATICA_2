# Esercizi Guidati sulle Funzioni JavaScript

Questa pagina contiene esercizi pratici per consolidare la comprensione delle funzioni in JavaScript. Ogni esercizio include una descrizione, suggerimenti e una soluzione.

## Esercizio 1: Funzione Calcolatrice

**Obiettivo:** Creare una funzione che agisca come una calcolatrice semplice.

**Istruzioni:**
1. Scrivi una funzione `calcolatrice` che accetta tre parametri: `numero1`, `operazione`, e `numero2`.
2. L'operazione può essere: `'somma'`, `'sottrazione'`, `'moltiplicazione'`, `'divisione'`.
3. La funzione deve restituire il risultato dell'operazione.
4. Gestisci il caso in cui l'operazione non sia valida o sia una divisione per zero.

**Suggerimento:** Usa una struttura condizionale (if/else o switch) per gestire le diverse operazioni.

<details>
<summary>Soluzione</summary>

```javascript
function calcolatrice(numero1, operazione, numero2) {
    switch(operazione) {
        case 'somma':
            return numero1 + numero2;
        case 'sottrazione':
            return numero1 - numero2;
        case 'moltiplicazione':
            return numero1 * numero2;
        case 'divisione':
            if (numero2 === 0) {
                return "Errore: divisione per zero";
            }
            return numero1 / numero2;
        default:
            return "Operazione non valida";
    }
}

// Test
console.log(calcolatrice(10, 'somma', 5));         // 15
console.log(calcolatrice(10, 'sottrazione', 5));   // 5
console.log(calcolatrice(10, 'moltiplicazione', 5)); // 50
console.log(calcolatrice(10, 'divisione', 5));     // 2
console.log(calcolatrice(10, 'divisione', 0));     // Errore: divisione per zero
console.log(calcolatrice(10, 'potenza', 2));       // Operazione non valida
```
</details>

## Esercizio 2: Generatore di Password

**Obiettivo:** Creare una funzione che genera password casuali.

**Istruzioni:**
1. Scrivi una funzione `generaPassword` che accetta tre parametri: `lunghezza`, `includiNumeri`, e `includiSimboli`.
2. La password generata deve avere la lunghezza specificata.
3. Se `includiNumeri` è true, la password deve contenere almeno un numero.
4. Se `includiSimboli` è true, la password deve contenere almeno un simbolo speciale.
5. La funzione deve restituire la password generata.

**Suggerimento:** Utilizza `Math.random()` e controlli per assicurare la presenza dei caratteri richiesti.

<details>
<summary>Soluzione</summary>

```javascript
function generaPassword(lunghezza = 8, includiNumeri = true, includiSimboli = true) {
    const lettere = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeri = '0123456789';
    const simboli = '!@#$%^&*()_+{}[]|:;"<>,.?/~`';
    
    let caratteriPermessi = lettere;
    let password = '';
    
    // Aggiungi numeri e simboli se richiesto
    if (includiNumeri) caratteriPermessi += numeri;
    if (includiSimboli) caratteriPermessi += simboli;
    
    // Genera la password casuale
    for (let i = 0; i < lunghezza; i++) {
        const indice = Math.floor(Math.random() * caratteriPermessi.length);
        password += caratteriPermessi[indice];
    }
    
    // Assicura che la password contenga almeno un numero se richiesto
    if (includiNumeri && !/\d/.test(password)) {
        const pos = Math.floor(Math.random() * lunghezza);
        const numeroRandom = numeri[Math.floor(Math.random() * numeri.length)];
        password = password.slice(0, pos) + numeroRandom + password.slice(pos + 1);
    }
    
    // Assicura che la password contenga almeno un simbolo se richiesto
    if (includiSimboli && !/[!@#$%^&*()_+{}[\]|:;"<>,.?/~`]/.test(password)) {
        const pos = Math.floor(Math.random() * lunghezza);
        const simboloRandom = simboli[Math.floor(Math.random() * simboli.length)];
        password = password.slice(0, pos) + simboloRandom + password.slice(pos + 1);
    }
    
    return password;
}

// Test
console.log(generaPassword(10, true, true));    // Password di 10 caratteri con numeri e simboli
console.log(generaPassword(8, true, false));    // Password di 8 caratteri con numeri ma senza simboli
console.log(generaPassword(12, false, false));  // Password di 12 caratteri solo con lettere
```
</details>

## Esercizio 3: Filtraggio Array con Callback

**Obiettivo:** Implementare una funzione di filtraggio personalizzata che utilizzi una callback.

**Istruzioni:**
1. Scrivi una funzione `filtra` che accetta due parametri: un array e una funzione callback.
2. La funzione deve filtrare l'array in base al criterio stabilito dalla callback.
3. La callback deve ricevere ogni elemento dell'array e restituire `true` o `false`.
4. La funzione `filtra` deve restituire un nuovo array contenente solo gli elementi per cui la callback restituisce `true`.

**Suggerimento:** Usa un ciclo per esaminare ogni elemento dell'array e applica la callback a ciascun elemento.

<details>
<summary>Soluzione</summary>

```javascript
function filtra(array, callback) {
    const risultato = [];
    
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            risultato.push(array[i]);
        }
    }
    
    return risultato;
}

// Test
const numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filtra i numeri pari
const pari = filtra(numeri, numero => numero % 2 === 0);
console.log(pari); // [2, 4, 6, 8, 10]

// Filtra i numeri maggiori di 5
const maggioriDi5 = filtra(numeri, numero => numero > 5);
console.log(maggioriDi5); // [6, 7, 8, 9, 10]

// Filtra usando l'indice (solo gli elementi in posizione pari)
const posizioniPari = filtra(numeri, (numero, indice) => indice % 2 === 0);
console.log(posizioniPari); // [1, 3, 5, 7, 9]
```
</details>

## Esercizio 4: Gestione Dati con Closure

**Obiettivo:** Creare un sistema di gestione dati utilizzando le closure.

**Istruzioni:**
1. Scrivi una funzione `creaDatabase` che non accetta parametri.
2. La funzione deve restituire un oggetto con tre metodi:
   - `aggiungi(chiave, valore)`: aggiunge un valore al database
   - `ottieni(chiave)`: restituisce il valore associato alla chiave
   - `rimuovi(chiave)`: rimuove la coppia chiave-valore dal database
3. I dati devono essere memorizzati in una variabile privata all'interno della closure.

**Suggerimento:** Usa una closure per mantenere i dati privati e accessibili solo attraverso i metodi specificati.

<details>
<summary>Soluzione</summary>

```javascript
function creaDatabase() {
    // Dati privati
    const dati = {};
    
    return {
        aggiungi: function(chiave, valore) {
            dati[chiave] = valore;
            return true;
        },
        
        ottieni: function(chiave) {
            if (chiave in dati) {
                return dati[chiave];
            }
            return undefined;
        },
        
        rimuovi: function(chiave) {
            if (chiave in dati) {
                delete dati[chiave];
                return true;
            }
            return false;
        }
    };
}

// Test
const db = creaDatabase();
db.aggiungi("nome", "Mario");
db.aggiungi("età", 30);

console.log(db.ottieni("nome")); // "Mario"
console.log(db.ottieni("età"));  // 30
console.log(db.ottieni("indirizzo")); // undefined

console.log(db.rimuovi("età")); // true
console.log(db.ottieni("età")); // undefined
console.log(db.rimuovi("indirizzo")); // false

// Impossibile accedere direttamente ai dati
console.log(db.dati); // undefined
```
</details>

## Esercizio 5: Memorizzazione dei Risultati (Memoizzazione)

**Obiettivo:** Implementare una funzione di memoizzazione per ottimizzare una funzione ricorsiva.

**Istruzioni:**
1. Scrivi una funzione `fibonacci` che calcola il numero di Fibonacci per un dato indice n.
2. Applica la tecnica di memoizzazione per evitare il ricalcolo di valori già elaborati.
3. Confronta le prestazioni con una versione non memorizzata della stessa funzione.

**Suggerimento:** Usa un oggetto cache per memorizzare i risultati già calcolati.

<details>
<summary>Soluzione</summary>

```javascript
// Funzione Fibonacci senza memoizzazione
function fibonacciSenzaMemo(n) {
    if (n <= 1) return n;
    return fibonacciSenzaMemo(n - 1) + fibonacciSenzaMemo(n - 2);
}

// Funzione Fibonacci con memoizzazione
function fibonacciConMemo() {
    const cache = {};
    
    function calcola(n) {
        if (n in cache) {
            return cache[n];
        }
        
        if (n <= 1) {
            return n;
        }
        
        const risultato = calcola(n - 1) + calcola(n - 2);
        cache[n] = risultato;
        return risultato;
    }
    
    return calcola;
}

const fibMemo = fibonacciConMemo();

// Test prestazioni
console.time('Senza memo');
console.log(fibonacciSenzaMemo(30)); // Molto lento
console.timeEnd('Senza memo');

console.time('Con memo');
console.log(fibMemo(30)); // Molto più veloce
console.timeEnd('Con memo');

// Test per valori più alti
console.time('Con memo - grande');
console.log(fibMemo(100)); // Impossibile da calcolare senza memoizzazione
console.timeEnd('Con memo - grande');
```
</details>

## Conclusioni

Questi esercizi coprono diversi aspetti delle funzioni JavaScript, dalle basi alle tecniche avanzate. Mettere in pratica questi concetti ti aiuterà a diventare più abile nell'uso delle funzioni e a sviluppare soluzioni eleganti per problemi complessi.

---
[← Indice](../index.html) | [Torna alla documentazione →](../README.md)
