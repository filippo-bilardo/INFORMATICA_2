# Confronto con Oggetti e Array

## Introduzione

In JavaScript, esistono diverse strutture dati per memorizzare e manipolare collezioni di valori. Oltre alle strutture tradizionali come oggetti e array, ES6 ha introdotto `Map`, `Set`, `WeakMap` e `WeakSet`. In questo capitolo, confronteremo queste strutture dati, evidenziando le loro differenze, vantaggi e svantaggi per aiutarti a scegliere la struttura più adatta per ogni situazione.

## Oggetti vs Map

### Caratteristiche Comuni

- Entrambi memorizzano coppie chiave-valore
- Entrambi permettono di aggiungere, recuperare e rimuovere elementi

### Differenze Principali

| Caratteristica | Oggetti | Map |
|----------------|---------|-----|
| Tipi di chiavi | Solo stringhe e simboli | Qualsiasi valore (oggetti, funzioni, primitivi) |
| Ordine degli elementi | Non garantito (ma prevedibile nei browser moderni) | Ordine di inserimento garantito |
| Dimensione | Richiede calcolo manuale | Proprietà `size` |
| Iterazione | Richiede metodi aggiuntivi | Metodi nativi (`forEach`, `entries`, `keys`, `values`) |
| Performance | Ottimizzati per proprietà statiche | Ottimizzati per aggiunte/rimozioni frequenti |
| Prototipo | Ereditano proprietà dal prototipo | Nessuna proprietà ereditata |
| Serializzazione | Supporto nativo con `JSON.stringify` | Richiede conversione manuale |

### Esempi di Confronto

```javascript
// Oggetto
const persona = {
  nome: 'Mario',
  età: 30
};

// Accesso alle proprietà
console.log(persona.nome); // 'Mario'
console.log(persona['età']); // 30

// Map
const personaMap = new Map();
personaMap.set('nome', 'Mario');
personaMap.set('età', 30);

// Accesso ai valori
console.log(personaMap.get('nome')); // 'Mario'
console.log(personaMap.get('età')); // 30
```

### Quando Usare Map invece di Oggetti

- Quando le chiavi non sono stringhe o simboli
- Quando l'ordine di inserimento è importante
- Quando aggiungi/rimuovi proprietà frequentemente
- Quando hai bisogno di conoscere facilmente la dimensione
- Quando vuoi evitare collisioni con proprietà del prototipo

```javascript
// Esempio: Chiavi non di tipo stringa
const utenti = new Map();

const utente1 = { id: 1 };
const utente2 = { id: 2 };

utenti.set(utente1, { nome: 'Mario', ruolo: 'Admin' });
utenti.set(utente2, { nome: 'Luigi', ruolo: 'Utente' });

console.log(utenti.get(utente1)); // { nome: 'Mario', ruolo: 'Admin' }
```

## Array vs Set

### Caratteristiche Comuni

- Entrambi memorizzano collezioni di valori
- Entrambi sono iterabili

### Differenze Principali

| Caratteristica | Array | Set |
|----------------|-------|-----|
| Valori duplicati | Permessi | Non permessi (valori unici) |
| Accesso agli elementi | Indice numerico | Solo iterazione o metodo `has()` |
| Ricerca elementi | Metodi come `indexOf`, `includes` (O(n)) | Metodo `has()` (O(1)) |
| Ordine degli elementi | Ordine di inserimento | Ordine di inserimento |
| Manipolazione | Numerosi metodi nativi | Metodi limitati |

### Esempi di Confronto

```javascript
// Array
const numeriArray = [1, 2, 3, 2, 1];
console.log(numeriArray.length); // 5
console.log(numeriArray[2]); // 3

// Set
const numeriSet = new Set([1, 2, 3, 2, 1]);
console.log(numeriSet.size); // 3
console.log([...numeriSet]); // [1, 2, 3]
```

### Quando Usare Set invece di Array

- Quando hai bisogno di valori unici
- Quando la ricerca di elementi è frequente
- Quando l'aggiunta/rimozione di elementi è frequente
- Quando hai bisogno di operazioni su insiemi (unione, intersezione, ecc.)

```javascript
// Esempio: Filtraggio di valori unici
const numeri = [1, 2, 3, 4, 2, 3, 5];
const numeriUnici = [...new Set(numeri)];
console.log(numeriUnici); // [1, 2, 3, 4, 5]

// Esempio: Verifica di appartenenza efficiente
const set = new Set(numeri);
console.log(set.has(3)); // true - O(1)
console.log(numeri.includes(3)); // true - O(n)
```

## Map vs WeakMap

### Caratteristiche Comuni

- Entrambi memorizzano coppie chiave-valore
- Entrambi permettono chiavi di tipo oggetto

### Differenze Principali

| Caratteristica | Map | WeakMap |
|----------------|-----|--------|
| Tipi di chiavi | Qualsiasi valore | Solo oggetti |
| Riferimenti | Forti | Deboli |
| Garbage collection | Impedita per le chiavi | Permessa per le chiavi |
| Iterazione | Supportata | Non supportata |
| Proprietà `size` | Disponibile | Non disponibile |
| Metodi | `set`, `get`, `has`, `delete`, `clear` | `set`, `get`, `has`, `delete` |

### Quando Usare WeakMap invece di Map

- Quando vuoi associare dati a oggetti senza impedirne la garbage collection
- Quando non hai bisogno di iterare sulle chiavi o valori
- Quando non hai bisogno di conoscere la dimensione
- Per implementare cache con pulizia automatica
- Per memorizzare dati privati per oggetti

```javascript
// Esempio: Dati privati con WeakMap
const privateData = new WeakMap();

class Utente {
  constructor(nome, password) {
    this.nome = nome;
    // Memorizza la password in modo privato
    privateData.set(this, { password });
  }
  
  verificaPassword(pwd) {
    return privateData.get(this).password === pwd;
  }
}

const utente = new Utente('Mario', 'password123');
console.log(utente.verificaPassword('password123')); // true
console.log(utente.password); // undefined - non accessibile direttamente
```

## Set vs WeakSet

### Caratteristiche Comuni

- Entrambi memorizzano valori unici

### Differenze Principali

| Caratteristica | Set | WeakSet |
|----------------|-----|--------|
| Tipi di valori | Qualsiasi valore | Solo oggetti |
| Riferimenti | Forti | Deboli |
| Garbage collection | Impedita per i valori | Permessa per i valori |
| Iterazione | Supportata | Non supportata |
| Proprietà `size` | Disponibile | Non disponibile |
| Metodi | `add`, `has`, `delete`, `clear` | `add`, `has`, `delete` |

### Quando Usare WeakSet invece di Set

- Quando vuoi tenere traccia di oggetti senza impedirne la garbage collection
- Quando non hai bisogno di iterare sui valori
- Quando non hai bisogno di conoscere la dimensione
- Per marcare oggetti come "visitati" o "processati"

```javascript
// Esempio: Tracciamento di oggetti visitati
const visitati = new WeakSet();

function processaOggetto(oggetto) {
  if (visitati.has(oggetto)) {
    console.log('Oggetto già processato, salto...');
    return;
  }
  
  console.log('Processo l\'oggetto...');
  // Elaborazione dell'oggetto
  
  // Marca come visitato
  visitati.add(oggetto);
}

const obj1 = { id: 1 };
processaOggetto(obj1); // 'Processo l'oggetto...'
processaOggetto(obj1); // 'Oggetto già processato, salto...'
```

## Tabella di Confronto Completa

| Caratteristica | Oggetto | Array | Map | Set | WeakMap | WeakSet |
|----------------|---------|-------|-----|-----|---------|--------|
| Struttura | Chiave-valore | Indicizzata | Chiave-valore | Valori | Chiave-valore | Valori |
| Chiavi/Indici | Stringhe, simboli | Numerici | Qualsiasi | N/A | Solo oggetti | N/A |
| Valori | Qualsiasi | Qualsiasi | Qualsiasi | Qualsiasi | Qualsiasi | Solo oggetti |
| Duplicati | No (chiavi) | Sì | No (chiavi) | No | No (chiavi) | No |
| Ordine | Non garantito | Garantito | Garantito | Garantito | N/A | N/A |
| Iterazione | Indiretta | Diretta | Diretta | Diretta | No | No |
| Dimensione | Manuale | `.length` | `.size` | `.size` | No | No |
| Riferimenti | Forti | Forti | Forti | Forti | Deboli | Deboli |
| Garbage collection | Impedita | Impedita | Impedita | Impedita | Permessa | Permessa |
| Caso d'uso principale | Dati strutturati | Sequenze ordinate | Mappe complesse | Valori unici | Dati privati, cache | Tracciamento oggetti |

## Linee Guida per la Scelta

### Scegli Oggetti quando:

- Hai bisogno di una struttura dati semplice con chiavi di tipo stringa
- Hai un numero fisso o raramente modificato di proprietà
- Hai bisogno di serializzare/deserializzare con JSON
- Hai bisogno di accedere alle proprietà con la notazione punto (obj.prop)

### Scegli Array quando:

- Hai bisogno di una sequenza ordinata di elementi
- Hai bisogno di accedere agli elementi per indice
- Hai bisogno di manipolare frequentemente la sequenza (push, pop, shift, ecc.)
- I duplicati sono accettabili o desiderati

### Scegli Map quando:

- Hai bisogno di chiavi che non sono stringhe
- L'ordine di inserimento è importante
- Aggiungi e rimuovi proprietà frequentemente
- Hai bisogno di conoscere facilmente la dimensione
- Vuoi evitare collisioni con proprietà del prototipo

### Scegli Set quando:

- Hai bisogno di memorizzare valori unici
- Hai bisogno di verificare frequentemente l'appartenenza
- Hai bisogno di operazioni su insiemi (unione, intersezione, ecc.)

### Scegli WeakMap quando:

- Hai bisogno di associare dati a oggetti senza impedirne la garbage collection
- Stai implementando dati privati per classi o oggetti
- Stai creando una cache che si pulisce automaticamente

### Scegli WeakSet quando:

- Hai bisogno di tenere traccia di oggetti senza impedirne la garbage collection
- Stai marcando oggetti come "visitati" o "processati"

## Conclusione

La scelta della struttura dati giusta può avere un impatto significativo sulle prestazioni e sulla leggibilità del codice. JavaScript offre una varietà di strutture dati, ognuna con i propri punti di forza e limitazioni. Comprendere le differenze tra queste strutture ti permetterà di scegliere quella più adatta per ogni situazione specifica.

Nel prossimo capitolo, esploreremo pattern comuni e best practices per l'utilizzo di queste strutture dati in scenari reali.

## Navigazione

- [Torna all'indice](../README.md)
- [Precedente: WeakMap e WeakSet](./03_WeakMap_WeakSet.md)
- [Prossimo: Pattern e Best Practices](./05_Pattern_Best_Practices.md)