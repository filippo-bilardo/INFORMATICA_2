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

### ❌ Da evitare
- **Return multipli** con tipi diversi
- **Side effects** invece di return values
- **Return values** non documentati o inaspettati

```javascript
// Da evitare - ritorna tipi diversi
function getValore(id) {
    if (id < 0) {
        return false; // Ritorna un booleano
    }
    return { nome: 'Elemento', valore: 42 }; // Ritorna un oggetto
}
```

## Documenta il tuo codice

### ✅ Da fare
- **JSDoc** per documentare parametri e valori di ritorno
- **Commenti di alto livello** per spiegare la logica complessa
- **Esempi d'uso** per funzioni complesse

```javascript
/**
 * Calcola il prezzo totale includendo le tasse
 * @param {number} prezzo - Il prezzo base senza tasse
 * @param {number} aliquota - L'aliquota fiscale (0.22 per 22%)
 * @returns {number} Il prezzo totale con tasse incluse
 * @example
 *   calcolaPrezzoConTasse(100, 0.22) // restituisce 122
 */
function calcolaPrezzoConTasse(prezzo, aliquota) {
    return prezzo * (1 + aliquota);
}
```

### ❌ Da evitare
- **Commenti ovvi** che ripetono ciò che il codice già dice
- **Commenti obsoleti** che non riflettono più il codice attuale
- **Documentazione incompleta** (ad es., mancanza di @param o @returns)

## Gestione Errori

### ✅ Da fare
- **Validare gli input** all'inizio della funzione
- **Gestire con try/catch** operazioni che potrebbero fallire
- **Ritornare oggetti di errore** strutturati

```javascript
function prelevaDenaro(conto, importo) {
    // Validazione input
    if (!conto || typeof importo !== 'number') {
        throw new Error('Parametri non validi');
    }
    
    if (importo <= 0) {
        return {
            successo: false,
            messaggio: 'L\'importo deve essere positivo'
        };
    }
    
    if (conto.saldo < importo) {
        return {
            successo: false,
            messaggio: 'Saldo insufficiente',
            saldoAttuale: conto.saldo
        };
    }
    
    // Logica principale
    conto.saldo -= importo;
    return {
        successo: true,
        nuovoSaldo: conto.saldo
    };
}
```

### ❌ Da evitare
- **Ignorare le eccezioni**
- **Usare valori di ritorno speciali** (come -1, null) per indicare errori
- **Messaggi di errore generici** o non descrittivi

## Evitare effetti collaterali

### ✅ Da fare
- **Funzioni pure** quando possibile
- **Rendere espliciti** gli effetti collaterali (nel nome, nei commenti)
- **Separare operazioni di lettura** dalle operazioni di modifica

```javascript
// Funzione pura - nessun effetto collaterale
function calcolaMediaArray(numeri) {
    const somma = numeri.reduce((acc, num) => acc + num, 0);
    return numeri.length > 0 ? somma / numeri.length : 0;
}

// Effetto collaterale esplicito nel nome
function salvaUtenteSuDatabase(utente) {
    // ...codice che salva nel database
}
```

### ❌ Da evitare
- **Modificare parametri** ricevuti in input
- **Modificare variabili globali** senza rendere chiara questa intenzione
- **Funzioni con effetti nascosti**

```javascript
// Da evitare - effetto collaterale nascosto
function validaDati(dati) {
    // Dovrebbe solo validare ma modifica anche l'input!
    if (!dati.createdAt) {
        dati.createdAt = new Date();
    }
    return dati.nome && dati.email;
}
```

## Performance

### ✅ Da fare
- **Ottimizzare funzioni critiche** dopo averle profilate
- **Memoizzare** risultati di calcoli costosi
- **Considerare la complessità algoritmica**

```javascript
// Memoizzazione per migliorare prestazioni su operazioni costose
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        cache[key] = cache[key] || fn(...args);
        return cache[key];
    };
};

const fattorialeMemoizzato = memoize((n) => {
    if (n <= 1) return 1;
    return n * fattorialeMemoizzato(n - 1);
});
```

### ❌ Da evitare
- **Ottimizzazioni premature** senza profilazione
- **Micro-ottimizzazioni** che rendono il codice meno leggibile
- **Operazioni ripetute** che potrebbero essere memorizzate

## Conclusioni

Seguire queste best practices ti aiuterà a scrivere funzioni JavaScript:
- Più leggibili e manutenibili
- Più facili da testare e debuggare
- Meno soggette a errori
- Più efficienti e riutilizzabili

Ricorda che non esistono regole assolute nel programmazione: ogni contesto può richiedere approcci diversi. L'obiettivo è trovare il giusto equilibrio tra leggibilità, manutenibilità e prestazioni.

---
[← Precedente (05.10 - Pattern funzionali comuni)](../05.10%20-%20Pattern%20funzionali%20comuni.md) | [Indice](../README.md) | [Successivo (Errori comuni e debugging) →](errori-comuni.md)