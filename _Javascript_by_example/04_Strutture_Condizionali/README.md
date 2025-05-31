# Strutture Condizionali in JavaScript

## Introduzione

Le strutture condizionali sono fondamentali in qualsiasi linguaggio di programmazione, poiché permettono al codice di prendere decisioni e seguire percorsi diversi in base a determinate condizioni. In JavaScript, queste strutture consentono di controllare il flusso del programma, eseguendo blocchi di codice solo quando specifiche condizioni sono soddisfatte.

In questa esercitazione, esploreremo le diverse strutture condizionali disponibili in JavaScript, come utilizzarle efficacemente e le best practices da seguire.

## Contenuti Teorici

1. [If, Else, Else If](./teoria/01_If_Else.md)
2. [Switch](./teoria/02_Switch.md)
3. [Operatore Ternario](./teoria/03_Operatore_Ternario.md)
4. [Valutazione Condizionale](./teoria/04_Valutazione_Condizionale.md)
5. [Pattern Matching e Destructuring](./teoria/05_Pattern_Matching.md)

## Esempi Pratici

### Esempio 1: Controllo dell'età

```javascript
let età = 18;

if (età < 18) {
  console.log("Sei minorenne.");
} else if (età === 18) {
  console.log("Hai appena raggiunto la maggiore età!");
} else {
  console.log("Sei maggiorenne.");
}
```

### Esempio 2: Controllo del giorno della settimana

```javascript
let giorno = new Date().getDay();
let nomeGiorno;

switch (giorno) {
  case 0:
    nomeGiorno = "Domenica";
    break;
  case 1:
    nomeGiorno = "Lunedì";
    break;
  case 2:
    nomeGiorno = "Martedì";
    break;
  case 3:
    nomeGiorno = "Mercoledì";
    break;
  case 4:
    nomeGiorno = "Giovedì";
    break;
  case 5:
    nomeGiorno = "Venerdì";
    break;
  case 6:
    nomeGiorno = "Sabato";
    break;
  default:
    nomeGiorno = "Giorno non valido";
}

console.log(`Oggi è ${nomeGiorno}`);
```

### Esempio 3: Operatore ternario per assegnazione condizionale

```javascript
let punteggio = 75;
let risultato = punteggio >= 60 ? "Promosso" : "Bocciato";

console.log(`Con un punteggio di ${punteggio}, sei ${risultato}`);
```

### Esempio 4: Valutazione di valori truthy e falsy

```javascript
let username = "";
let defaultName = username || "Ospite";

console.log(`Benvenuto, ${defaultName}!`);

// Controllo di esistenza con operatore &&
let utente = { nome: "Mario", ruolo: "Admin" };
utente.ruolo === "Admin" && console.log("Accesso all'area amministrativa consentito");
```

### Esempio 5: Pattern matching con destructuring

```javascript
let risposta = { stato: "successo", dati: { nome: "Prodotto A", prezzo: 99.99 } };

// Controllo dello stato con destructuring
if (risposta && risposta.stato === "successo") {
  const { dati: { nome, prezzo } } = risposta;
  console.log(`Prodotto trovato: ${nome} a €${prezzo}`);
} else {
  console.log("Nessun prodotto trovato");
}
```

## Esercizi Proposti

1. **Calcolatore di fascia d'età**: Scrivi un programma che, data un'età, determini a quale fascia appartiene (bambino, adolescente, adulto, anziano).

2. **Calcolatore di voto**: Crea una funzione che converta un punteggio numerico (0-100) in un voto letterale (A, B, C, D, F).

3. **Validatore di password**: Scrivi un programma che verifichi se una password soddisfa determinati criteri (lunghezza minima, presenza di numeri, lettere maiuscole, ecc.).

4. **Calcolatore di sconto**: Implementa una funzione che calcoli lo sconto su un prodotto in base a diverse condizioni (importo dell'acquisto, status cliente, codice promozionale).

5. **Selettore di lingua**: Crea un sistema che mostri messaggi in lingue diverse in base alle preferenze dell'utente o alla geolocalizzazione.

## Conclusione

Le strutture condizionali sono strumenti potenti che permettono di creare programmi dinamici e reattivi. Padroneggiare queste strutture è essenziale per scrivere codice JavaScript efficace e flessibile. Nei prossimi moduli, vedremo come combinare queste strutture con i cicli e le funzioni per creare logiche più complesse.

[Torna all'indice principale](../README.md) | [Vai al modulo successivo: Cicli e Iterazioni](../05_Cicli_Iterazioni/README.md) | [Vai al modulo precedente: Operatori](../03_Operatori/README.md)