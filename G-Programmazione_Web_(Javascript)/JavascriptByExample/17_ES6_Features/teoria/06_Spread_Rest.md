# Spread e Rest Operator

## Introduzione

Gli operatori Spread (`...`) e Rest (`...`) sono due potenti caratteristiche introdotte in ES6 che condividono la stessa sintassi ma svolgono funzioni opposte. Lo Spread operator "espande" un array o un oggetto, mentre il Rest operator "raccoglie" elementi multipli in un array o proprietà in un oggetto.

## Spread Operator

Lo Spread operator consente di espandere un iterable (come un array o una stringa) in luoghi dove sono attesi zero o più argomenti (per chiamate di funzione) o elementi (per array letterali), o di espandere un oggetto in luoghi dove sono attese zero o più coppie chiave-valore (per oggetti letterali).

### 1. Spread con Array

#### Copiare un array

```javascript
const originale = [1, 2, 3];
const copia = [...originale];

console.log(copia); // [1, 2, 3]
// copia è un nuovo array, modificarlo non influisce su originale
copia.push(4);
console.log(originale); // [1, 2, 3]
console.log(copia); // [1, 2, 3, 4]
```

#### Concatenare array

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Metodo tradizionale
const concatenato1 = array1.concat(array2);

// Con spread operator
const concatenato2 = [...array1, ...array2];

console.log(concatenato2); // [1, 2, 3, 4, 5, 6]

// È possibile inserire elementi aggiuntivi
const concatenatoConExtra = [...array1, 10, 11, ...array2];
console.log(concatenatoConExtra); // [1, 2, 3, 10, 11, 4, 5, 6]
```

#### Passare elementi di un array come argomenti a una funzione

```javascript
function somma(a, b, c) {
  return a + b + c;
}

const numeri = [1, 2, 3];

// Metodo tradizionale
const risultato1 = somma.apply(null, numeri);

// Con spread operator
const risultato2 = somma(...numeri);

console.log(risultato2); // 6
```

#### Convertire un iterable in un array

```javascript
// Convertire una stringa in un array di caratteri
const str = "ciao";
const chars = [...str];
console.log(chars); // ['c', 'i', 'a', 'o']

// Convertire un Set in un array
const set = new Set([1, 2, 3, 3, 4]);
const arrayDaSet = [...set];
console.log(arrayDaSet); // [1, 2, 3, 4]

// Convertire un NodeList in un array
const divs = document.querySelectorAll('div');
const divsArray = [...divs];
// Ora possiamo usare metodi di array come map, filter, ecc.
```

### 2. Spread con Oggetti

A partire da ES2018, lo spread operator può essere utilizzato anche con gli oggetti.

#### Copiare un oggetto

```javascript
const originale = { a: 1, b: 2 };
const copia = { ...originale };

console.log(copia); // { a: 1, b: 2 }
// copia è un nuovo oggetto, modificarlo non influisce su originale
copia.c = 3;
console.log(originale); // { a: 1, b: 2 }
console.log(copia); // { a: 1, b: 2, c: 3 }
```

#### Unire oggetti

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const unito = { ...obj1, ...obj2 };
console.log(unito); // { a: 1, b: 2, c: 3, d: 4 }
```

#### Sovrascrivere proprietà

```javascript
const base = { a: 1, b: 2, c: 3 };
const aggiornato = { ...base, b: 5 };

console.log(aggiornato); // { a: 1, b: 5, c: 3 }

// L'ordine è importante
const aggiornato2 = { b: 5, ...base };
console.log(aggiornato2); // { b: 2, a: 1, c: 3 } - b viene sovrascritto dal valore in base
```

#### Aggiungere proprietà condizionalmente

```javascript
const utente = { nome: "Mario", email: "mario@esempio.it" };

const isAdmin = true;
const utenteCompleto = {
  ...utente,
  ...(isAdmin ? { ruolo: "admin", permessi: ["leggi", "scrivi", "elimina"] } : {})
};

console.log(utenteCompleto);
// { nome: "Mario", email: "mario@esempio.it", ruolo: "admin", permessi: ["leggi", "scrivi", "elimina"] }
```

## Rest Operator

Il Rest operator ha la stessa sintassi dello Spread operator (`...`), ma viene utilizzato per raccogliere elementi rimanenti in un array o proprietà in un oggetto.

### 1. Rest con Array

#### Raccogliere elementi rimanenti in un array

```javascript
const [primo, secondo, ...resto] = [1, 2, 3, 4, 5];

console.log(primo); // 1
console.log(secondo); // 2
console.log(resto); // [3, 4, 5]
```

#### Raccogliere argomenti di funzione

```javascript
function somma(...numeri) {
  return numeri.reduce((totale, numero) => totale + numero, 0);
}

console.log(somma(1, 2)); // 3
console.log(somma(1, 2, 3, 4, 5)); // 15
```

#### Combinare parametri normali e rest

```javascript
function creaSquadra(allenatore, capitano, ...giocatori) {
  return {
    allenatore,
    capitano,
    giocatori,
    numeroGiocatori: giocatori.length + 1 // +1 per il capitano
  };
}

const squadra = creaSquadra("Allegri", "Del Piero", "Buffon", "Chiellini", "Pirlo");
console.log(squadra);
// {
//   allenatore: "Allegri",
//   capitano: "Del Piero",
//   giocatori: ["Buffon", "Chiellini", "Pirlo"],
//   numeroGiocatori: 4
// }
```

### 2. Rest con Oggetti

#### Raccogliere proprietà rimanenti

```javascript
const { nome, età, ...altreInfo } = {
  nome: "Mario",
  età: 30,
  professione: "Sviluppatore",
  città: "Roma",
  hobby: ["calcio", "musica"]
};

console.log(nome); // Mario
console.log(età); // 30
console.log(altreInfo);
// {
//   professione: "Sviluppatore",
//   città: "Roma",
//   hobby: ["calcio", "musica"]
// }
```

#### Omettere proprietà specifiche

```javascript
function filtraProprietà(oggetto, ...proprietàDaOmettere) {
  const { ...risultato } = oggetto;
  
  proprietàDaOmettere.forEach(prop => {
    delete risultato[prop];
  });
  
  return risultato;
}

const persona = {
  nome: "Mario",
  età: 30,
  password: "12345",
  email: "mario@esempio.it"
};

const personaSicura = filtraProprietà(persona, "password");
console.log(personaSicura);
// { nome: "Mario", età: 30, email: "mario@esempio.it" }
```

## Differenze tra Spread e Rest

| Spread Operator | Rest Operator |
|-----------------|---------------|
| Espande un array o un oggetto | Raccoglie elementi in un array o proprietà in un oggetto |
| Utilizzato sul lato destro di un'assegnazione | Utilizzato sul lato sinistro di un'assegnazione o nella definizione dei parametri di una funzione |
| Può essere utilizzato in chiamate di funzione, array letterali e oggetti letterali | Utilizzato principalmente nella destrutturazione e nei parametri di funzione |

## Casi d'uso comuni

### 1. Clonazione profonda (shallow clone)

```javascript
const originale = { a: 1, b: { c: 2 } };
const copia = { ...originale };

// Attenzione: è una copia superficiale!
copia.b.c = 3;
console.log(originale.b.c); // 3 - anche l'originale è stato modificato
```

### 2. Unione di configurazioni

```javascript
const configPredefinita = {
  tema: "chiaro",
  lingua: "it",
  notifiche: true
};

function inizializzaApp(configUtente = {}) {
  const configFinale = { ...configPredefinita, ...configUtente };
  console.log("App inizializzata con:", configFinale);
}

inizializzaApp({ tema: "scuro" });
// App inizializzata con: { tema: "scuro", lingua: "it", notifiche: true }
```

### 3. Funzioni con numero variabile di argomenti

```javascript
function trovaMassimo(...numeri) {
  return Math.max(...numeri);
}

console.log(trovaMassimo(1, 5, 3, 9, 2)); // 9
```

### 4. Manipolazione immutabile di array e oggetti (utile in Redux)

```javascript
// Aggiungere un elemento a un array senza mutarlo
const aggiungiElemento = (array, elemento) => [...array, elemento];

// Rimuovere un elemento da un array senza mutarlo
const rimuoviElemento = (array, indice) => [
  ...array.slice(0, indice),
  ...array.slice(indice + 1)
];

// Aggiornare un oggetto senza mutarlo
const aggiornaOggetto = (oggetto, chiave, valore) => ({
  ...oggetto,
  [chiave]: valore
});
```

## Limitazioni e considerazioni

1. **Copia superficiale**: Sia con array che con oggetti, lo spread operator crea solo una copia superficiale. Gli oggetti nidificati sono ancora riferimenti agli oggetti originali.

2. **Prestazioni**: Per operazioni su grandi array o oggetti, lo spread operator potrebbe non essere la soluzione più efficiente in termini di prestazioni.

3. **Compatibilità**: Lo spread operator per gli oggetti è stato introdotto in ES2018, quindi potrebbe richiedere un transpiler come Babel per funzionare in browser più vecchi.

## Conclusione

Gli operatori Spread e Rest sono strumenti potenti che semplificano molte operazioni comuni in JavaScript. Lo Spread operator rende più facile lavorare con array e oggetti in modo immutabile, mentre il Rest operator offre una sintassi elegante per gestire un numero variabile di elementi o proprietà.

Questi operatori sono diventati parte integrante del JavaScript moderno e vengono ampiamente utilizzati in framework e librerie come React, Redux e molti altri. Padroneggiare questi operatori è essenziale per scrivere codice JavaScript pulito, conciso ed espressivo.