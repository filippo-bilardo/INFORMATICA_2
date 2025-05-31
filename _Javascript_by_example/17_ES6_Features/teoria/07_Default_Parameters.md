# Default Parameters

## Introduzione

I Default Parameters (parametri predefiniti) sono una caratteristica introdotta in ES6 che consente di assegnare valori predefiniti ai parametri di una funzione. Questi valori vengono utilizzati quando l'argomento corrispondente è `undefined` o non viene fornito durante la chiamata della funzione.

Prima di ES6, per ottenere un comportamento simile, era necessario utilizzare pattern come l'operatore OR (`||`) o controlli condizionali all'interno del corpo della funzione.

## Sintassi di base

La sintassi per definire parametri predefiniti è semplice e intuitiva:

```javascript
function nomeFunzione(parametro1 = valorePredefinito1, parametro2 = valorePredefinito2) {
  // corpo della funzione
}
```

Ecco un esempio concreto:

```javascript
function saluta(nome = 'Utente', saluto = 'Ciao') {
  return `${saluto}, ${nome}!`;
}

console.log(saluta()); // "Ciao, Utente!"
console.log(saluta('Mario')); // "Ciao, Mario!"
console.log(saluta('Luigi', 'Buongiorno')); // "Buongiorno, Luigi!"
```

## Comportamento dei parametri predefiniti

### 1. Attivazione dei valori predefiniti

I valori predefiniti vengono utilizzati solo quando l'argomento corrispondente è `undefined` o non viene fornito. Altri valori "falsy" come `null`, `false`, `0`, o stringhe vuote non attiveranno il valore predefinito:

```javascript
function test(a = 10, b = 20) {
  console.log(a, b);
}

test(); // 10 20
test(5); // 5 20
test(undefined, 5); // 10 5
test(null); // null 20 (null non attiva il valore predefinito)
test(0, ''); // 0 "" (0 e stringa vuota non attivano i valori predefiniti)
```

### 2. Espressioni come valori predefiniti

I valori predefiniti possono essere espressioni, non solo valori statici. Queste espressioni vengono valutate al momento della chiamata della funzione:

```javascript
function getCurrentDate(now = new Date()) {
  return now.toLocaleDateString();
}

console.log(getCurrentDate()); // Data corrente formattata

function random(min = 1, max = min + 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(random()); // Numero casuale tra 1 e 11
console.log(random(5)); // Numero casuale tra 5 e 15
console.log(random(5, 8)); // Numero casuale tra 5 e 8
```

### 3. Riferimento a parametri precedenti

Un parametro predefinito può fare riferimento a parametri definiti in precedenza nella stessa lista di parametri:

```javascript
function creaRettangolo(larghezza = 10, altezza = larghezza * 2) {
  return { larghezza, altezza, area: larghezza * altezza };
}

console.log(creaRettangolo()); // { larghezza: 10, altezza: 20, area: 200 }
console.log(creaRettangolo(5)); // { larghezza: 5, altezza: 10, area: 50 }
console.log(creaRettangolo(5, 8)); // { larghezza: 5, altezza: 8, area: 40 }
```

### 4. Funzioni come valori predefiniti

È possibile utilizzare funzioni come valori predefiniti:

```javascript
function getDefaultValue() {
  console.log('Calcolo valore predefinito...');
  return 42;
}

function test(a = getDefaultValue()) {
  console.log(a);
}

test(); // Stampa "Calcolo valore predefinito..." e poi "42"
test(10); // Stampa solo "10" (getDefaultValue non viene chiamata)
```

## Casi d'uso comuni

### 1. Configurazioni e opzioni

I parametri predefiniti sono particolarmente utili per funzioni che accettano oggetti di configurazione con molte opzioni:

```javascript
function configuraApp({
  tema = 'chiaro',
  lingua = 'it',
  notifiche = true,
  timeout = 30000
} = {}) {
  // L'oggetto vuoto come valore predefinito permette di chiamare la funzione senza argomenti
  console.log(`App configurata: tema=${tema}, lingua=${lingua}, notifiche=${notifiche}, timeout=${timeout}`);
}

configuraApp(); // Usa tutti i valori predefiniti
configuraApp({ tema: 'scuro' }); // Sovrascrive solo il tema
configuraApp({ tema: 'scuro', timeout: 60000 }); // Sovrascrive tema e timeout
```

### 2. API più flessibili

I parametri predefiniti consentono di creare API più flessibili che funzionano con configurazioni minime ma possono essere personalizzate quando necessario:

```javascript
function fetchData(url, {
  method = 'GET',
  headers = { 'Content-Type': 'application/json' },
  body = null,
  timeout = 5000
} = {}) {
  console.log(`Fetching ${url} with:`, { method, headers, body, timeout });
  // Implementazione della richiesta...
}

fetchData('https://api.example.com/data'); // Configurazione minima
fetchData('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ name: 'Mario' })
}); // Configurazione personalizzata
```

### 3. Funzioni di utilità

```javascript
function formattaNumero(numero, {
  decimali = 2,
  separatoreDecimale = ',',
  separatoreMigliaia = '.'
} = {}) {
  // Implementazione della formattazione...
  return numero.toLocaleString('it-IT', {
    minimumFractionDigits: decimali,
    maximumFractionDigits: decimali
  }).replace('.', separatoreDecimale).replace(/\B(?=(\d{3})+(?!\d))/g, separatoreMigliaia);
}

console.log(formattaNumero(1234567.89)); // "1.234.567,89"
console.log(formattaNumero(1234567.89, { decimali: 0 })); // "1.234.568"
console.log(formattaNumero(1234567.89, { separatoreMigliaia: ' ' })); // "1 234 567,89"
```

## Confronto con approcci pre-ES6

Prima di ES6, i valori predefiniti venivano gestiti all'interno del corpo della funzione:

```javascript
// Approccio pre-ES6
function saluta(nome, saluto) {
  // Utilizzo dell'operatore OR
  nome = nome || 'Utente';
  saluto = saluto || 'Ciao';
  
  return saluto + ', ' + nome + '!';
}

// Approccio pre-ES6 più sicuro (gestisce valori falsy)
function salutaSicuro(nome, saluto) {
  // Controllo esplicito per undefined
  nome = (nome === undefined) ? 'Utente' : nome;
  saluto = (saluto === undefined) ? 'Ciao' : saluto;
  
  return saluto + ', ' + nome + '!';
}

// Approccio ES6
function salutaES6(nome = 'Utente', saluto = 'Ciao') {
  return `${saluto}, ${nome}!`;
}
```

I vantaggi dell'approccio ES6 sono:

1. **Sintassi più chiara e concisa**: I valori predefiniti sono dichiarati direttamente nella firma della funzione.
2. **Comportamento più prevedibile**: Solo `undefined` attiva i valori predefiniti, evitando problemi con altri valori falsy.
3. **Supporto per espressioni complesse**: I valori predefiniti possono essere espressioni o chiamate di funzione.
4. **Riferimenti a parametri precedenti**: Un parametro può utilizzare i valori di parametri definiti prima di esso.

## Limitazioni e considerazioni

1. **Parametri obbligatori**: I parametri predefiniti non forniscono un modo nativo per dichiarare parametri obbligatori. È possibile implementare questo comportamento con pattern come:

```javascript
function richiediParametro() {
  throw new Error('Parametro obbligatorio mancante');
}

function esempio(parametroObbligatorio = richiediParametro()) {
  return parametroObbligatorio;
}

esempio(); // Lancia un errore
esempio('valore'); // Funziona correttamente
```

2. **TDZ (Temporal Dead Zone)**: I parametri predefiniti sono soggetti alla TDZ, quindi un parametro non può fare riferimento a variabili dichiarate successivamente nella lista dei parametri:

```javascript
// Questo genererà un errore
function errore(a = b, b = 1) {
  return a + b;
}

// Questo funziona
function corretto(b = 1, a = b) {
  return a + b;
}
```

## Conclusione

I parametri predefiniti sono una caratteristica fondamentale di ES6 che semplifica notevolmente la scrittura di funzioni flessibili e robuste. Offrono una sintassi chiara e concisa per gestire valori mancanti o non definiti, migliorando la leggibilità e la manutenibilità del codice.

Questa caratteristica è particolarmente utile per creare API flessibili, gestire configurazioni complesse e implementare funzioni di utilità versatili. Combinati con altre caratteristiche ES6 come la destrutturazione e i rest parameters, i parametri predefiniti consentono di creare interfacce di funzione potenti ed espressive.