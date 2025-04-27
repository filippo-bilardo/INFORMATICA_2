# Sintassi Base di JavaScript

La sintassi di JavaScript è progettata per essere accessibile e relativamente facile da imparare, specialmente per chi ha già familiarità con altri linguaggi di programmazione come C, Java o Python. In questa guida, esploreremo gli elementi fondamentali della sintassi JavaScript.

## Inserimento di JavaScript in HTML

Esistono tre modi principali per incorporare JavaScript in una pagina HTML:

### 1. Script inline

```html
<button onclick="alert('Ciao, mondo!')">Clicca qui</button>
```

### 2. Script interno

```html
<script>
  // Codice JavaScript
  console.log('Questo è uno script interno');
</script>
```

### 3. Script esterno (metodo consigliato)

```html
<script src="mio-script.js"></script>
```

File mio-script.js:
```javascript
// Codice JavaScript in un file esterno
console.log('Questo è uno script esterno');
```

## Commenti

I commenti in JavaScript possono essere scritti in due modi:

```javascript
// Commento su una singola linea

/* Commento
   su più
   linee */
```

## Istruzioni e punto e virgola

In JavaScript, le istruzioni sono separate da punto e virgola (;):

```javascript
let x = 5;          // Dichiarazione di una variabile
console.log(x);     // Output nella console
x = x + 1;          // Modifica del valore
```

Sebbene il punto e virgola sia tecnicamente opzionale in molti casi (grazie all'inserimento automatico del punto e virgola), è considerata una buona pratica includerlo sempre per evitare comportamenti imprevisti.

## Case sensitivity

JavaScript è case-sensitive. Questo significa che `variabile`, `Variabile` e `VARIABILE` sono tre identificatori diversi:

```javascript
let nome = "Mario";
let Nome = "Luigi";
console.log(nome);  // Output: Mario
console.log(Nome);  // Output: Luigi
```

## Spazi bianchi

JavaScript ignora gli spazi bianchi extra. È possibile utilizzare spazi, tabulazioni e nuove linee per formattare il codice e renderlo più leggibile:

```javascript
// Entrambe queste dichiarazioni sono equivalenti
let somma = a + b;
let somma=a+b;
```

## Identificatori

Gli identificatori in JavaScript sono nomi utilizzati per variabili, funzioni, ecc. Devono seguire queste regole:

- Possono contenere lettere, numeri, underscore (_) e il simbolo del dollaro ($)
- Devono iniziare con una lettera, underscore o simbolo del dollaro
- Non possono essere parole riservate

Esempi validi:
```javascript
let _variabile;
let $prezzo;
let nome1;
```

Esempi non validi:
```javascript
let 1nome;      // Non può iniziare con un numero
let nome-utente; // Non può contenere trattini
let class;      // Non può essere una parola riservata
```

## Convenzioni di denominazione

In JavaScript si utilizzano comunemente queste convenzioni:

- **camelCase** per variabili e funzioni: `nomeUtente`, `calcolaArea`
- **PascalCase** per classi e costruttori: `Persona`, `ContoBancario`
- **UPPERCASE_WITH_UNDERSCORES** per costanti: `MAX_TENTATIVI`, `PI`

## Output di base

Per visualizzare output in JavaScript, si possono utilizzare diversi metodi:

```javascript
console.log("Messaggio nella console");  // Output nella console di sviluppo
alert("Messaggio di avviso");           // Finestra di dialogo
document.write("Testo nella pagina");   // Scrive direttamente nel documento HTML
```

## Input di base

Per ricevere input dall'utente:

```javascript
let nome = prompt("Inserisci il tuo nome:");  // Finestra di dialogo con campo di input
let conferma = confirm("Sei sicuro?");       // Finestra di dialogo con opzioni Sì/No
```

## Conclusione

Questa introduzione alla sintassi di base di JavaScript fornisce le fondamenta necessarie per iniziare a scrivere codice. Nei prossimi capitoli, approfondiremo variabili, tipi di dati, operatori e strutture di controllo che ti permetteranno di creare programmi JavaScript più complessi e funzionali.

[Torna all'indice dell'esercitazione](../README.md) | [Vai al precedente argomento teorico](./02_Ambiente_Sviluppo.md) | [Vai al prossimo argomento teorico](./04_Strumenti_Debugging.md)