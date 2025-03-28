# Errori comuni con le funzioni JavaScript e come risolverli

## 1. Confusione tra dichiarazioni di funzioni e espressioni di funzioni

### Problema: Hoisting

```javascript
// Funziona correttamente a causa dell'hoisting
funzioneDichiarata();

function funzioneDichiarata() {
    console.log("Questa funzione è stata sollevata (hoisted)");
}

// Errore: funzioneEspressa non è una funzione
funzioneEspressa(); // TypeError: funzioneEspressa is not a function

var funzioneEspressa = function() {
    console.log("Questa funzione NON è stata sollevata");
};
```

### Soluzione
Dichiara le funzioni prima di chiamarle, soprattutto quando usi espressioni di funzione. Oppure usa le dichiarazioni di funzioni standard se hai bisogno dell'hoisting.

## 2. Problemi con il contesto `this`

### Problema: `this` che cambia contesto

```javascript
const utente = {
    nome: "Mario",
    saluta: function() {
        console.log("Ciao, sono " + this.nome);
    },
    salutaDopo: function(ms) {
        setTimeout(function() {
            console.log("Ciao, sono " + this.nome); // `this` non fa più riferimento a utente
        }, ms);
    }
};

utente.saluta();        // "Ciao, sono Mario" - funziona
utente.salutaDopo(100); // "Ciao, sono undefined" - this punta al contesto globale
```

### Soluzioni