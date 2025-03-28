# Best Practices per le Funzioni JavaScript

## Naming

### ✅ Da fare
- **Nomi descrittivi**: Usa verbi che descrivono cosa fa la funzione
- **camelCase**: Segui la convenzione standard di JavaScript
- **Prefissi comuni**: Usa get/set/is/has/should per funzioni specifiche

```javascript
// Buoni esempi
function calcolaImportoTotale(prezzo, quantita) { /* ... */ }
function isValido(input) { /* ... */ }
function getUtente(id) { /* ... */ }
```

### ❌ Da evitare
- **Nomi troppo generici**: func1, doStuff, process
- **Nomi poco chiari**: f, temp, x
- **Nomi ingannevoli**: Una funzione che modifica valori ma si chiama "get..."

```javascript
// Esempi da evitare
function f(x, y) { /* ... */ }
function doThings() { /* ... */ }
function calculate() { /* ... */ } // Troppo generico
```

## Lunghezza e Responsabilità

### ✅ Da fare
- **Funzioni brevi**: Idealmente 10-15 righe o meno
- **Singola responsabilità**: Ogni funzione dovrebbe fare una cosa sola
- **Estrarre in funzioni più piccole** quando la complessità aumenta

```javascript
// Approccio corretto
function validaForm() {
    return validaEmail() && validaPassword() && validaNome();
}

function validaEmail() { /* logica specifica per l'email */ }
function validaPassword() { /* logica specifica per la password */ }
function validaNome() { /* logica specifica per il nome */ }
```

### ❌ Da evitare
- **Funzioni troppo lunghe**: Più di 30-40 righe
- **Troppe responsabilità** in una singola funzione
- **Troppi livelli di annidamento**

## Parametri

### ✅ Da fare
- **Limitare il numero di parametri**: Idealmente non più di 3
- **Usare oggetti** per raggruppare parametri correlati
- **Valori di default** per parametri opzionali

```javascript
// Buon approccio con oggetto per parametri multipli
function creaUtente({ nome, email, ruolo = 'utente', attivo = true }) {
    // ...
}

creaUtente({ 
    nome: 'Mario', 
    email: 'mario@example.com', 
    ruolo: 'admin' 
});
```

### ❌ Da evitare
- **Troppe parametri** in una singola funzione
- **Parametri booleani** che non sono self-documenting
- **Parametri non correlati** che potrebbero indicare troppe responsabilità

```javascript
// Da evitare:
function creaUtente(nome, email, ruolo, attivo, dataNascita, indirizzo, telefono) {
    // Troppi parametri!
}

// Da evitare:
function gestisciUtente(utente, true, false, true) {
    // Cosa significano questi booleani?
}
```

## Return e Output

### ✅ Da fare
- **Return anticipato** per gestire i casi d'errore
- **Return values consistenti**: Stessa tipologia di ritorno
- **Documentazione** del valore di ritorno

```javascript
function dividi(a, b) {
    // Gestione errore all'inizio
    if (b === 0) {
        return { successo: false, errore: 'Divisione per zero' };
    }
    
    // Logica principale
    return { successo: true, risultato: a / b };
}
```