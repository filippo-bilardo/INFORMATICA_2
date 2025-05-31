# Breakpoints e Step Debugging

## Introduzione

I breakpoints sono uno degli strumenti più potenti per il debugging di JavaScript. Consentono di interrompere l'esecuzione del codice in punti specifici, esaminare lo stato dell'applicazione e procedere con l'esecuzione in modo controllato.

## Tipi di Breakpoints

### Breakpoints di Linea

I breakpoints di linea sono i più comuni e permettono di interrompere l'esecuzione su una specifica riga di codice.

**Come impostare breakpoints di linea:**

1. Apri le DevTools del browser (F12 o tasto destro → Ispeziona)
2. Vai alla scheda "Sources" (Chrome) o "Debugger" (Firefox)
3. Seleziona il file JavaScript desiderato
4. Clicca sul numero di riga dove vuoi inserire il breakpoint

```javascript
function calcolaSconto(prezzo, percentuale) {
  // L'esecuzione si fermerà qui se è impostato un breakpoint
  const sconto = prezzo * (percentuale / 100);
  return prezzo - sconto;
}

const prezzoFinale = calcolaSconto(100, 20); // Risultato: 80
```

### Breakpoints Condizionali

I breakpoints condizionali interrompono l'esecuzione solo quando una determinata condizione è vera.

**Come impostare breakpoints condizionali:**

1. Crea un breakpoint di linea
2. Fai clic destro sul breakpoint
3. Seleziona "Edit breakpoint" o "Add condition"
4. Inserisci un'espressione JavaScript che restituisca un valore booleano

```javascript
function elaboraUtenti(utenti) {
  utenti.forEach((utente, indice) => {
    // Breakpoint condizionale: si attiva solo quando indice === 3
    console.log(`Elaborazione utente: ${utente.nome}`);
    // Resto del codice...
  });
}
```

### Breakpoints di Evento

I breakpoints di evento interrompono l'esecuzione quando si verifica un determinato evento DOM.

**Come impostare breakpoints di evento:**

1. Nelle DevTools, vai alla scheda "Sources" (Chrome)
2. Espandi il pannello "Event Listener Breakpoints"
3. Seleziona la categoria di eventi desiderata (es. "Mouse", "Keyboard")
4. Seleziona l'evento specifico (es. "click", "keydown")

### Breakpoints XHR/Fetch

Interrompono l'esecuzione quando una richiesta di rete corrisponde a un determinato URL.

**Come impostare breakpoints XHR/Fetch:**

1. Nelle DevTools, vai alla scheda "Sources" (Chrome)
2. Espandi il pannello "XHR/fetch Breakpoints"
3. Clicca su "+" e inserisci una stringa che deve essere contenuta nell'URL

### Breakpoints di Eccezione

Interrompono l'esecuzione quando viene lanciata un'eccezione.

**Come impostare breakpoints di eccezione:**

1. Nelle DevTools, vai alla scheda "Sources" (Chrome)
2. Clicca sull'icona "Pause on exceptions" (icona di pausa con un'icona di errore)
3. Opzionalmente, attiva "Pause on caught exceptions" per fermarsi anche sulle eccezioni gestite

## Step Debugging

Una volta che l'esecuzione è stata interrotta da un breakpoint, è possibile controllare il flusso del programma utilizzando i comandi di step debugging.

### Comandi Principali

- **Continue (F8)**: Riprende l'esecuzione normale fino al prossimo breakpoint
- **Step Over (F10)**: Esegue la riga corrente e passa alla successiva (senza entrare nelle funzioni)
- **Step Into (F11)**: Entra nella funzione chiamata nella riga corrente
- **Step Out (Shift+F11)**: Esce dalla funzione corrente e torna al chiamante

### Esempio di Step Debugging

```javascript
function somma(a, b) {
  return a + b; // Step Into entrerà qui
}

function calcolaTotale(prezzi) {
  let totale = 0;
  for (let i = 0; i < prezzi.length; i++) {
    // Step Over eseguirà questa riga senza entrare in somma()
    totale = somma(totale, prezzi[i]);
  }
  return totale;
}

const prezzi = [10, 20, 30];
const totale = calcolaTotale(prezzi); // Imposta un breakpoint qui
```

## Ispezionare lo Stato durante il Debugging

Durante l'interruzione dell'esecuzione, è possibile esaminare lo stato dell'applicazione:

### Visualizzazione delle Variabili

- **Scope Variables**: Nel pannello "Scope" delle DevTools, visualizza tutte le variabili nel contesto corrente
- **Watch Expressions**: Permette di monitorare espressioni JavaScript personalizzate
- **Console**: È possibile eseguire comandi JavaScript nella console per interagire con lo stato corrente

### Modifica dello Stato

Durante il debugging, è possibile modificare i valori delle variabili:

1. Fai doppio clic sul valore di una variabile nel pannello "Scope"
2. Inserisci il nuovo valore
3. Premi Invio per confermare

## Tecniche Avanzate

### Debugging Asincrono

Per il debugging di codice asincrono:

1. Attiva l'opzione "Async" nel pannello delle sorgenti
2. Utilizza breakpoints all'interno di callback, Promise o funzioni async/await

```javascript
async function caricaDati() {
  try {
    const risposta = await fetch('/api/dati');
    const dati = await risposta.json(); // Imposta un breakpoint qui
    return dati;
  } catch (errore) {
    console.error('Errore:', errore);
  }
}
```

### Blackboxing

Il blackboxing permette di ignorare determinati file o framework durante il debugging:

1. Nelle impostazioni delle DevTools, vai a "Blackboxing"
2. Aggiungi pattern per i file da ignorare (es. `/node_modules/`, `/jquery\.js$`)

## Consigli Pratici

1. **Usa breakpoints strategici** - Posizionali in punti chiave del flusso di esecuzione
2. **Combina breakpoints con console.log()** - Per un debugging più efficace
3. **Utilizza breakpoints condizionali** per problemi intermittenti
4. **Salva i breakpoints** nelle DevTools per sessioni future
5. **Impara le scorciatoie da tastiera** per velocizzare il workflow

## Esercizio Pratico

Debugga il seguente codice utilizzando breakpoints e step debugging:

```javascript
function trovaErrore(array) {
  let risultato = 0;
  
  for (let i = 0; i <= array.length; i++) { // Bug: i <= array.length
    risultato += array[i];
  }
  
  return risultato;
}

const numeri = [1, 2, 3, 4, 5];
console.log(trovaErrore(numeri)); // Dovrebbe generare un errore
```

## Navigazione

- [Indice del Modulo](../README.md)
- Lezione Precedente: [Console.log Avanzato](./02_Console_Avanzato.md)
- Prossima Lezione: [Gestione degli Errori](./04_Gestione_Errori.md)