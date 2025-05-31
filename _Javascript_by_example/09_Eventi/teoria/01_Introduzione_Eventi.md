# Introduzione agli Eventi in JavaScript

Gli eventi sono azioni o occorrenze che si verificano nel sistema che stai programmando e che il sistema ti informa, permettendoti di rispondere in qualche modo se necessario. Nel contesto del web, gli eventi sono principalmente interazioni dell'utente con la pagina, ma possono anche essere generati dal browser o da altre fonti.

## Cos'è un Evento?

Un evento in JavaScript rappresenta un segnale che qualcosa è accaduto. Questo "qualcosa" può essere:

- Un'interazione dell'utente (clic, pressione di un tasto, movimento del mouse)
- Un cambiamento nello stato del browser (caricamento della pagina, ridimensionamento della finestra)
- Un'azione programmata (timer, animazione)
- Un cambiamento nei dati o nello stato dell'applicazione

Gli eventi sono fondamentali per creare applicazioni web interattive e reattive, poiché permettono al codice di rispondere dinamicamente alle azioni dell'utente e ai cambiamenti nell'ambiente.

## Il Modello di Eventi in JavaScript

Il modello di eventi in JavaScript si basa su tre componenti principali:

1. **Eventi**: I segnali che indicano che qualcosa è accaduto
2. **Target degli eventi**: L'oggetto su cui si verifica l'evento (ad esempio, un elemento HTML)
3. **Gestori di eventi (Event Handlers)**: Le funzioni che vengono eseguite in risposta a un evento

```javascript
// Esempio di base di gestione degli eventi
const button = document.querySelector('button');

button.addEventListener('click', function() {
  console.log('Il pulsante è stato cliccato!');
});
```

In questo esempio:
- L'evento è il 'click'
- Il target dell'evento è l'elemento button
- Il gestore dell'evento è la funzione anonima che registra un messaggio nella console

## Tipi di Eventi

JavaScript e il DOM supportano una vasta gamma di eventi. Ecco alcune categorie principali:

### Eventi del Mouse

```javascript
element.addEventListener('click', function(event) {
  console.log('Elemento cliccato!');
});

element.addEventListener('mouseover', function(event) {
  console.log('Mouse sopra l\'elemento!');
});

element.addEventListener('mouseout', function(event) {
  console.log('Mouse uscito dall\'elemento!');
});

element.addEventListener('mousemove', function(event) {
  console.log(`Posizione del mouse: ${event.clientX}, ${event.clientY}`);
});
```

### Eventi della Tastiera

```javascript
document.addEventListener('keydown', function(event) {
  console.log(`Tasto premuto: ${event.key}`);
});

document.addEventListener('keyup', function(event) {
  console.log(`Tasto rilasciato: ${event.key}`);
});

inputElement.addEventListener('keypress', function(event) {
  console.log(`Carattere inserito: ${event.key}`);
});
```

### Eventi del Form

```javascript
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impedisce l'invio del form
  console.log('Form inviato!');
});

inputElement.addEventListener('focus', function(event) {
  console.log('Input ha ricevuto il focus!');
});

inputElement.addEventListener('blur', function(event) {
  console.log('Input ha perso il focus!');
});

selectElement.addEventListener('change', function(event) {
  console.log(`Nuovo valore selezionato: ${event.target.value}`);
});
```

### Eventi del Documento/Window

```javascript
window.addEventListener('load', function(event) {
  console.log('Pagina completamente caricata!');
});

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM caricato!');
});

window.addEventListener('resize', function(event) {
  console.log(`Nuove dimensioni: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener('scroll', function(event) {
  console.log(`Posizione di scroll: ${window.scrollX}, ${window.scrollY}`);
});
```

### Eventi Touch (per dispositivi mobili)

```javascript
element.addEventListener('touchstart', function(event) {
  console.log('Touch iniziato!');
});

element.addEventListener('touchmove', function(event) {
  console.log('Touch in movimento!');
});

element.addEventListener('touchend', function(event) {
  console.log('Touch terminato!');
});
```

## L'Oggetto Event

Quando si verifica un evento, JavaScript crea un oggetto Event che contiene informazioni sull'evento stesso. Questo oggetto viene passato automaticamente al gestore dell'evento come argomento.

```javascript
document.addEventListener('click', function(event) {
  console.log('Tipo di evento:', event.type);
  console.log('Target dell\'evento:', event.target);
  console.log('Posizione del clic:', event.clientX, event.clientY);
  console.log('Tasti modificatori:', event.ctrlKey, event.shiftKey, event.altKey);
});
```

L'oggetto Event ha proprietà e metodi diversi a seconda del tipo di evento. Alcune proprietà comuni includono:

- **type**: Il tipo di evento (es. 'click', 'keydown')
- **target**: L'elemento su cui si è verificato l'evento
- **currentTarget**: L'elemento a cui è attualmente collegato il gestore dell'evento
- **timeStamp**: Il momento in cui si è verificato l'evento
- **preventDefault()**: Metodo per impedire l'azione predefinita associata all'evento
- **stopPropagation()**: Metodo per fermare la propagazione dell'evento ad altri elementi

## Eventi Personalizzati

Oltre agli eventi standard del browser, JavaScript permette di creare e gestire eventi personalizzati, utili per implementare la comunicazione tra diverse parti di un'applicazione.

```javascript
// Creazione di un evento personalizzato
const eventoPersonalizzato = new CustomEvent('mioEvento', {
  detail: { messaggio: 'Ciao dal mio evento personalizzato!' }
});

// Registrazione di un gestore per l'evento personalizzato
document.addEventListener('mioEvento', function(event) {
  console.log(event.detail.messaggio);
});

// Attivazione dell'evento personalizzato
document.dispatchEvent(eventoPersonalizzato);
```

## Conclusione

Gli eventi sono un concetto fondamentale in JavaScript e nella programmazione web. Permettono di creare applicazioni interattive che rispondono alle azioni dell'utente e ai cambiamenti nell'ambiente. Comprendere come funzionano gli eventi e come gestirli efficacemente è essenziale per qualsiasi sviluppatore web.

Nelle prossime guide, esploreremo più in dettaglio come gestire gli eventi, come funziona la propagazione degli eventi e come implementare pattern avanzati di gestione degli eventi.

[Torna all'indice](../README.md) | [Argomento successivo: Gestione degli Eventi](./02_Gestione_Eventi.md)