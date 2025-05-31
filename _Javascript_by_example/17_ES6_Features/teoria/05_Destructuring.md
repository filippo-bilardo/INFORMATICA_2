# Destructuring

## Introduzione

Il Destructuring (destrutturazione) è una caratteristica introdotta in ES6 che permette di estrarre dati da array e oggetti in variabili separate utilizzando una sintassi concisa. Questa funzionalità rende il codice più leggibile e riduce la quantità di codice necessario per accedere e lavorare con i dati strutturati.

## Destructuring di Array

### Sintassi di base

La destrutturazione di array consente di estrarre elementi in variabili separate in base alla loro posizione:

```javascript
// Metodo tradizionale
const numeri = [1, 2, 3];
const a = numeri[0];
const b = numeri[1];
const c = numeri[2];

// Con destructuring
const [x, y, z] = numeri;
console.log(x, y, z); // 1 2 3
```

### Caratteristiche avanzate

#### 1. Saltare elementi

È possibile saltare elementi lasciando spazi vuoti nella sintassi di destrutturazione:

```javascript
const colori = ['rosso', 'verde', 'blu', 'giallo'];
const [primo, , terzo] = colori;
console.log(primo, terzo); // rosso blu
```

#### 2. Raccogliere elementi rimanenti (rest operator)

È possibile utilizzare il rest operator (`...`) per raccogliere gli elementi rimanenti in un nuovo array:

```javascript
const numeri = [1, 2, 3, 4, 5];
const [primo, secondo, ...resto] = numeri;
console.log(primo); // 1
console.log(secondo); // 2
console.log(resto); // [3, 4, 5]
```

#### 3. Valori predefiniti

È possibile assegnare valori predefiniti che verranno utilizzati se l'elemento corrispondente è `undefined`:

```javascript
const [a = 1, b = 2, c = 3] = [10, 20];
console.log(a, b, c); // 10 20 3
```

#### 4. Scambio di variabili

La destrutturazione offre un modo elegante per scambiare i valori di due variabili senza utilizzare una variabile temporanea:

```javascript
let a = 5;
let b = 10;

// Scambio con destructuring
[a, b] = [b, a];

console.log(a, b); // 10 5
```

## Destructuring di Oggetti

### Sintassi di base

La destrutturazione di oggetti consente di estrarre proprietà in variabili con lo stesso nome:

```javascript
// Metodo tradizionale
const persona = { nome: 'Mario', età: 30, città: 'Roma' };
const nome = persona.nome;
const età = persona.età;

// Con destructuring
const { nome, età } = persona;
console.log(nome, età); // Mario 30
```

### Caratteristiche avanzate

#### 1. Assegnare a variabili con nomi diversi

È possibile estrarre proprietà e assegnarle a variabili con nomi diversi:

```javascript
const persona = { nome: 'Mario', età: 30 };
const { nome: nomePerson, età: etàPersona } = persona;
console.log(nomePerson, etàPersona); // Mario 30
```

#### 2. Valori predefiniti

Come con gli array, è possibile assegnare valori predefiniti:

```javascript
const persona = { nome: 'Mario', età: 30 };
const { nome, età, professione = 'Sviluppatore' } = persona;
console.log(nome, età, professione); // Mario 30 Sviluppatore
```

È anche possibile combinare la ridenominazione con i valori predefiniti:

```javascript
const { nome: n = 'Anonimo', età: e = 25 } = { nome: 'Luigi' };
console.log(n, e); // Luigi 25
```

#### 3. Rest operator con oggetti

È possibile utilizzare il rest operator anche con gli oggetti per raccogliere le proprietà rimanenti:

```javascript
const persona = { nome: 'Mario', età: 30, città: 'Roma', professione: 'Sviluppatore' };
const { nome, età, ...altreInfo } = persona;
console.log(nome); // Mario
console.log(età); // 30
console.log(altreInfo); // { città: 'Roma', professione: 'Sviluppatore' }
```

#### 4. Destrutturazione nidificata

È possibile destrutturare oggetti nidificati:

```javascript
const persona = {
  nome: 'Mario',
  età: 30,
  indirizzo: {
    via: 'Via Roma 123',
    città: 'Milano',
    cap: '20100'
  }
};

const { nome, indirizzo: { città, cap } } = persona;
console.log(nome, città, cap); // Mario Milano 20100
```

## Destructuring nei parametri di funzione

La destrutturazione può essere utilizzata anche nei parametri di funzione, rendendo più chiaro quali proprietà di un oggetto vengono utilizzate:

```javascript
// Senza destructuring
function mostraInfo(persona) {
  console.log(`${persona.nome} ha ${persona.età} anni e vive a ${persona.città}`);
}

// Con destructuring
function mostraInfo({ nome, età, città = 'sconosciuta' }) {
  console.log(`${nome} ha ${età} anni e vive a ${città}`);
}

mostraInfo({ nome: 'Mario', età: 30 }); // Mario ha 30 anni e vive a sconosciuta
```

Questo è particolarmente utile per le funzioni che accettano oggetti di configurazione con molte opzioni:

```javascript
function creaElemento({ tipo = 'div', testo = '', classe = '', stile = {} }) {
  const elemento = document.createElement(tipo);
  elemento.textContent = testo;
  if (classe) elemento.className = classe;
  Object.assign(elemento.style, stile);
  return elemento;
}

const bottone = creaElemento({
  tipo: 'button',
  testo: 'Clicca qui',
  classe: 'btn-primario',
  stile: { color: 'white', backgroundColor: 'blue' }
});
```

## Casi d'uso comuni

### 1. Importazione di moduli

La destrutturazione è comunemente utilizzata nell'importazione di moduli ES6:

```javascript
// Importare specifiche funzioni o componenti
import { Component, useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
```

### 2. Gestione delle risposte API

```javascript
async function ottieniDatiUtente(id) {
  const risposta = await fetch(`https://api.esempio.com/utenti/${id}`);
  const { nome, email, ruolo, ultimoAccesso } = await risposta.json();
  
  // Utilizzo diretto delle proprietà estratte
  aggiornaInterfaccia(nome, email, ruolo, ultimoAccesso);
}
```

### 3. Ritorno di più valori da una funzione

```javascript
function calcolaStatistiche(numeri) {
  const min = Math.min(...numeri);
  const max = Math.max(...numeri);
  const sum = numeri.reduce((acc, n) => acc + n, 0);
  const avg = sum / numeri.length;
  
  return { min, max, sum, avg };
}

const { min, max, avg } = calcolaStatistiche([1, 5, 3, 9, 2]);
console.log(`Min: ${min}, Max: ${max}, Media: ${avg}`);
```

## Vantaggi del Destructuring

1. **Codice più conciso**: Riduce la quantità di codice necessario per accedere ai dati.
2. **Maggiore leggibilità**: Rende immediatamente chiaro quali proprietà o elementi vengono utilizzati.
3. **Flessibilità**: Offre molte opzioni per estrarre e manipolare i dati.
4. **Meno variabili temporanee**: Elimina la necessità di variabili intermedie.
5. **API più chiare**: Rende le interfacce delle funzioni più esplicite quando utilizzato nei parametri.

## Conclusione

Il destructuring è una delle caratteristiche più utili di ES6 che ha cambiato significativamente il modo in cui i programmatori JavaScript lavorano con array e oggetti. Offre una sintassi elegante e potente per estrarre dati da strutture complesse, rendendo il codice più pulito, più leggibile e più manutenibile.

Padroneggiare il destructuring è essenziale per scrivere JavaScript moderno efficace e per utilizzare al meglio le librerie e i framework contemporanei che fanno ampio uso di questa caratteristica.