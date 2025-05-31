# Strumenti di Debugging in JavaScript

Il debugging è una parte essenziale dello sviluppo software. JavaScript offre diversi strumenti e tecniche per identificare e risolvere errori nel codice. In questa guida, esploreremo i principali strumenti di debugging disponibili per gli sviluppatori JavaScript.

## Console del Browser

La console del browser è lo strumento di debugging più immediato e accessibile per JavaScript. È possibile accedervi attraverso gli strumenti di sviluppo del browser (F12 o tasto destro → Ispeziona → Console).

### Metodi principali della console

```javascript
// Messaggi informativi
console.log("Informazione normale");
console.info("Messaggio informativo");

// Messaggi di avviso ed errore
console.warn("Attenzione!");
console.error("Si è verificato un errore");

// Raggruppamento di messaggi
console.group("Gruppo di log");
console.log("Messaggio nel gruppo");
console.log("Altro messaggio nel gruppo");
console.groupEnd();

// Misurazione del tempo
console.time("Timer");
// ... codice da misurare ...
console.timeEnd("Timer"); // Mostra il tempo trascorso

// Tabelle
console.table([{nome: "Mario", età: 30}, {nome: "Luigi", età: 28}]);
```

## Debugger Statement

L'istruzione `debugger` crea un punto di interruzione nel codice, fermando l'esecuzione e permettendo di ispezionare lo stato del programma:

```javascript
function calcolaArea(larghezza, altezza) {
  debugger; // L'esecuzione si fermerà qui quando gli strumenti di sviluppo sono aperti
  return larghezza * altezza;
}
```

## Breakpoints nei DevTools

I browser moderni offrono strumenti di sviluppo avanzati che permettono di impostare breakpoints direttamente nel codice sorgente:

1. Aprire gli strumenti di sviluppo (F12)
2. Navigare alla scheda "Sources" o "Debugger"
3. Trovare il file JavaScript desiderato
4. Fare clic sul numero di riga dove si desidera inserire il breakpoint

### Tipi di breakpoints avanzati

- **Breakpoints condizionali**: si attivano solo quando una condizione è vera
- **DOM breakpoints**: si attivano quando elementi DOM specifici cambiano
- **XHR breakpoints**: si attivano quando vengono effettuate richieste AJAX
- **Event listener breakpoints**: si attivano quando vengono generati eventi specifici

## Try-Catch per la gestione degli errori

Il blocco try-catch permette di catturare e gestire gli errori in modo elegante:

```javascript
try {
  // Codice che potrebbe generare un errore
  let risultato = funzioneInesistente();
} catch (errore) {
  // Gestione dell'errore
  console.error("Si è verificato un errore:", errore.message);
} finally {
  // Codice che viene eseguito sempre, indipendentemente dagli errori
  console.log("Operazione completata");
}
```

## Strumenti di Debugging in Node.js

Per il debugging di applicazioni Node.js, sono disponibili diverse opzioni:

### Debugger integrato

```bash
node inspect mio-script.js
```

### Integrazione con Chrome DevTools

```bash
node --inspect mio-script.js
```
Poi apri Chrome e vai a `chrome://inspect`

### Debugging in Visual Studio Code

VS Code offre un'eccellente integrazione per il debugging di JavaScript e Node.js:

1. Creare un file `.vscode/launch.json`
2. Configurare le impostazioni di debug
3. Utilizzare i breakpoints e il pannello di debug di VS Code

## Tecniche di Debugging Avanzate

### Logging strutturato

```javascript
// Invece di
console.log("utente:", utente);

// Usa oggetti per etichettare i log
console.log({utente, azione: "login", timestamp: new Date()});
```

### Decostruzione per il logging

```javascript
const persona = {nome: "Mario", età: 30, città: "Roma"};

// Logging di proprietà specifiche
const {nome, età} = persona;
console.log({nome, età});
```

### Monitoraggio delle variabili

Nei DevTools dei browser moderni, è possibile:

1. Aggiungere espressioni di controllo (watch expressions)
2. Monitorare variabili specifiche durante l'esecuzione
3. Valutare espressioni nella console durante una pausa del debugger

## Strumenti di Analisi delle Performance

I browser moderni offrono strumenti per analizzare le performance delle applicazioni JavaScript:

- **Performance panel**: registra e analizza l'attività della pagina
- **Memory panel**: identifica perdite di memoria (memory leaks)
- **Network panel**: analizza le richieste di rete

## Conclusione

Padroneggiare gli strumenti di debugging è fondamentale per diventare uno sviluppatore JavaScript efficiente. Combinando console, breakpoints, gestione degli errori e strumenti di analisi delle performance, è possibile identificare e risolvere rapidamente i problemi nel codice, migliorando la qualità e l'affidabilità delle applicazioni.

[Torna all'indice dell'esercitazione](../README.md) | [Vai al precedente argomento teorico](./03_Sintassi_Base.md) | [Vai al prossimo argomento teorico](./05_JavaScript_Browser.md)