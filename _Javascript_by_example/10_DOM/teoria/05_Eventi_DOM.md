# Eventi del DOM

Gli eventi del DOM sono azioni o occorrenze che si verificano nel browser web e che possono essere rilevate e gestite tramite JavaScript. Gli eventi permettono di creare pagine web interattive che rispondono alle azioni dell'utente, come clic, movimenti del mouse, pressioni di tasti o caricamento della pagina.

## Concetti Fondamentali degli Eventi

### Tipi di Eventi

Esistono numerosi tipi di eventi che possono verificarsi in una pagina web:

- **Eventi del mouse**: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`
- **Eventi della tastiera**: `keydown`, `keyup`, `keypress`
- **Eventi del form**: `submit`, `reset`, `change`, `input`, `focus`, `blur`
- **Eventi della finestra**: `load`, `resize`, `scroll`, `unload`, `beforeunload`
- **Eventi del documento**: `DOMContentLoaded`
- **Eventi drag and drop**: `dragstart`, `drag`, `dragend`, `dragenter`, `dragover`, `dragleave`, `drop`
- **Eventi touch**: `touchstart`, `touchmove`, `touchend`, `touchcancel`

### Gestori di Eventi (Event Handlers)

I gestori di eventi sono funzioni JavaScript che vengono eseguite quando si verifica un determinato evento. Ci sono diversi modi per assegnare gestori di eventi agli elementi HTML.

## Metodi per Registrare Eventi

### Attributi HTML

Il modo più semplice (ma meno flessibile) per gestire gli eventi è utilizzare attributi HTML:

```html
<button onclick="alert('Cliccato!')">Cliccami</button>
<a href="#" onmouseover="this.style.color='red'" onmouseout="this.style.color='blue'">Passa sopra</a>
```

**Limitazioni**:
- Mescola HTML e JavaScript, rendendo il codice meno manutenibile
- Permette di assegnare un solo gestore per evento
- Limita la riusabilità del codice

### Proprietà DOM on[event]

Un approccio migliore è assegnare funzioni alle proprietà degli eventi tramite JavaScript:

```javascript
const pulsante = document.getElementById('pulsante');

// Assegnazione di un gestore di eventi
pulsante.onclick = function() {
  alert('Hai cliccato il pulsante!');
};

// Sovrascrittura del gestore precedente
pulsante.onclick = function() {
  console.log('Questo sostituisce il gestore precedente');
};

// Rimozione del gestore
pulsante.onclick = null;
```

**Limitazioni**:
- Permette di assegnare un solo gestore per evento (i gestori successivi sovrascrivono quelli precedenti)
- Non supporta la fase di cattura degli eventi

### addEventListener e removeEventListener

Il metodo più potente e flessibile per gestire gli eventi è `addEventListener`:

```javascript
const pulsante = document.getElementById('pulsante');

// Definizione della funzione gestore
function gestoreClick(evento) {
  console.log('Pulsante cliccato!', evento);
}

// Aggiunta del gestore
pulsante.addEventListener('click', gestoreClick);

// Aggiunta di un altro gestore per lo stesso evento
pulsante.addEventListener('click', function() {
  console.log('Secondo gestore per lo stesso evento');
});

// Rimozione di un gestore specifico
pulsante.removeEventListener('click', gestoreClick);
```

**Vantaggi**:
- Permette di assegnare più gestori allo stesso evento
- Supporta sia la fase di cattura che quella di bubbling
- Separa chiaramente il codice HTML da quello JavaScript
- Offre maggiore controllo e flessibilità

## L'Oggetto Event

Quando si verifica un evento, il browser crea un oggetto `Event` che contiene informazioni dettagliate sull'evento stesso. Questo oggetto viene passato automaticamente alla funzione gestore.

```javascript
document.getElementById('pulsante').addEventListener('click', function(evento) {
  console.log('Tipo di evento:', evento.type); // 'click'
  console.log('Elemento target:', evento.target); // L'elemento che ha generato l'evento
  console.log('Elemento corrente:', evento.currentTarget); // L'elemento a cui è collegato il gestore
  console.log('Coordinate del mouse:', evento.clientX, evento.clientY); // Posizione del mouse
  
  // Prevenire il comportamento predefinito
  // Come ad esempio, prevenire il comportamento predefinito di un link
  // Quindi l'utente non verrà reindirizzato
  evento.preventDefault();
  
  // Fermare la propagazione dell'evento
  // Cioè impedire la propagazione dell'evento verso gli elementi genitori
  // Quindi l'evento non raggiunge gli altri elementi
  evento.stopPropagation();
});
```

### Proprietà Comuni dell'Oggetto Event

- `type`: Il tipo di evento (es. 'click', 'keydown')
- `target`: L'elemento che ha generato l'evento
- `currentTarget`: L'elemento a cui è collegato il gestore dell'evento
- `timeStamp`: Il momento in cui si è verificato l'evento
- `bubbles`: Indica se l'evento si propaga verso l'alto (bubbling)
- `cancelable`: Indica se l'evento può essere annullato

### Proprietà Specifiche per Tipo di Evento

**Eventi del mouse**:
- `clientX`, `clientY`: Coordinate del mouse relative alla finestra del browser
- `pageX`, `pageY`: Coordinate del mouse relative al documento
- `screenX`, `screenY`: Coordinate del mouse relative allo schermo
- `button`: Il pulsante del mouse premuto
- `altKey`, `ctrlKey`, `shiftKey`, `metaKey`: Stato dei tasti modificatori

**Eventi della tastiera**:
- `key`: Il valore del tasto premuto
- `code`: Il codice fisico del tasto premuto
- `keyCode`: Il codice numerico del tasto (deprecato)
- `altKey`, `ctrlKey`, `shiftKey`, `metaKey`: Stato dei tasti modificatori

## Propagazione degli Eventi

Quando si verifica un evento su un elemento che ha elementi genitori, l'evento attraversa tre fasi:

1. **Fase di cattura**: L'evento parte dal `document` e scende verso l'elemento target
2. **Fase target**: L'evento raggiunge l'elemento target
3. **Fase di bubbling**: L'evento risale dall'elemento target fino al `document`

```javascript
// HTML: <div id="esterno"><div id="interno">Cliccami</div></div>

const esterno = document.getElementById('esterno');
const interno = document.getElementById('interno');

// Fase di bubbling (default, terzo parametro false o omesso)
esterno.addEventListener('click', function() {
  console.log('Gestore esterno - bubbling');
});

// Fase di cattura (terzo parametro true)
esterno.addEventListener('click', function() {
  console.log('Gestore esterno - cattura');
}, true);

interno.addEventListener('click', function() {
  console.log('Gestore interno');
});

// Ordine di esecuzione quando si clicca su "interno":
// 1. "Gestore esterno - cattura" (fase di cattura)
// 2. "Gestore interno" (fase target)
// 3. "Gestore esterno - bubbling" (fase di bubbling)
```

### Fermare la Propagazione

È possibile interrompere la propagazione degli eventi in due modi:

```javascript
elemento.addEventListener('click', function(evento) {
  // Ferma la propagazione verso gli elementi genitori (fase di bubbling)
  evento.stopPropagation();
  
  // Ferma la propagazione e impedisce l'esecuzione di altri gestori sullo stesso elemento
  evento.stopImmediatePropagation();
});
```

## Delega degli Eventi

La delega degli eventi è un pattern potente che sfrutta la propagazione (bubbling) per gestire eventi su più elementi con un singolo gestore collegato a un antenato comune.

```javascript
// HTML:
// <ul id="lista">
//   <li>Elemento 1</li>
//   <li>Elemento 2</li>
//   <li>Elemento 3</li>
// </ul>

const lista = document.getElementById('lista');

// Un solo gestore per tutti gli elementi della lista
lista.addEventListener('click', function(evento) {
  // Verifica che l'elemento cliccato sia un <li>
  if (evento.target.tagName === 'LI') {
    console.log('Elemento cliccato:', evento.target.textContent);
    evento.target.style.color = 'red';
  }
});

// Funziona anche per elementi aggiunti dinamicamente!
const nuovoElemento = document.createElement('li');
nuovoElemento.textContent = 'Elemento 4';
lista.appendChild(nuovoElemento);
```

**Vantaggi della delega degli eventi**:
- Riduce il numero di gestori di eventi, migliorando le prestazioni
- Funziona automaticamente per elementi aggiunti dinamicamente
- Riduce l'uso di memoria
- Semplifica il codice quando si hanno molti elementi simili

## Eventi Personalizzati

Oltre agli eventi standard del browser, è possibile creare e attivare eventi personalizzati:

```javascript
// Creazione di un evento personalizzato
const eventoPersonalizzato = new CustomEvent('prodotto-aggiunto', {
  detail: { // Dati personalizzati
    id: 42,
    nome: 'Prodotto XYZ',
    prezzo: 19.99
  },
  bubbles: true, // L'evento si propaga verso l'alto
  cancelable: true // L'evento può essere annullato
});

// Ascolto dell'evento personalizzato
document.getElementById('carrello').addEventListener('prodotto-aggiunto', function(evento) {
  console.log('Prodotto aggiunto al carrello:', evento.detail.nome);
  console.log('Prezzo:', evento.detail.prezzo);
});

// Attivazione dell'evento
document.getElementById('carrello').dispatchEvent(eventoPersonalizzato);
```

## Eventi Comuni e Casi d'Uso

### Eventi di Caricamento della Pagina

```javascript
// Si attiva quando il DOM è completamente caricato, ma prima che risorse esterne (immagini, fogli di stile) siano caricate
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM caricato e pronto');
});

// Si attiva quando la pagina è completamente caricata, incluse tutte le risorse
window.addEventListener('load', function() {
  console.log('Pagina completamente caricata');
});

// Si attiva quando l'utente tenta di lasciare la pagina
window.addEventListener('beforeunload', function(evento) {
  // Mostra un messaggio di conferma
  evento.preventDefault();
  evento.returnValue = 'Ci sono modifiche non salvate. Sei sicuro di voler uscire?';
});
```

### Gestione dei Form

```javascript
const form = document.getElementById('mio-form');

// Gestione dell'invio del form
form.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Impedisce l'invio tradizionale del form
  
  // Validazione
  const email = document.getElementById('email').value;
  if (!email.includes('@')) {
    alert('Inserisci un indirizzo email valido');
    return;
  }
  
  // Invio dei dati (esempio con fetch API)
  fetch('/api/submit', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => console.log('Successo:', data))
  .catch(error => console.error('Errore:', error));
});

// Gestione dei cambiamenti nei campi di input
document.getElementById('username').addEventListener('input', function(evento) {
  const valore = evento.target.value;
  document.getElementById('anteprima-username').textContent = valore;
});

// Validazione in tempo reale
document.getElementById('password').addEventListener('blur', function(evento) {
  const password = evento.target.value;
  const messaggioErrore = document.getElementById('errore-password');
  
  if (password.length < 8) {
    messaggioErrore.textContent = 'La password deve contenere almeno 8 caratteri';
  } else {
    messaggioErrore.textContent = '';
  }
});
```

### Eventi Touch per Dispositivi Mobili

```javascript
const elemento = document.getElementById('elemento-touch');

elemento.addEventListener('touchstart', function(evento) {
  console.log('Touch iniziato');
  // Previene lo zoom su doppio tap
  evento.preventDefault();
});

elemento.addEventListener('touchmove', function(evento) {
  // Accesso al primo punto di contatto
  const touch = evento.touches[0];
  console.log('Posizione:', touch.clientX, touch.clientY);
});

elemento.addEventListener('touchend', function() {
  console.log('Touch terminato');
});
```

## Best Practices per la Gestione degli Eventi

1. **Utilizzare la delega degli eventi** quando possibile, specialmente per liste o tabelle con molti elementi.

2. **Rimuovere i gestori di eventi** quando non sono più necessari, specialmente per elementi che vengono rimossi dal DOM.

   ```javascript
   // Aggiunta del gestore
   function gestoreClick() { /* ... */ }
   elemento.addEventListener('click', gestoreClick);
   
   // Rimozione quando non serve più
   elemento.removeEventListener('click', gestoreClick);
   ```

3. **Limitare le operazioni nei gestori di eventi frequenti** come `mousemove`, `scroll` o `resize` per evitare problemi di prestazioni.

   ```javascript
   // Throttling per limitare la frequenza di esecuzione
   let ultimaEsecuzione = 0;
   window.addEventListener('scroll', function() {
     const ora = new Date().getTime();
     if (ora - ultimaEsecuzione > 100) { // Esegui al massimo ogni 100ms
       console.log('Scroll position:', window.scrollY);
       ultimaEsecuzione = ora;
     }
   });
   ```

4. **Utilizzare eventi passivi** per migliorare le prestazioni di scorrimento, specialmente su dispositivi mobili.

   ```javascript
   document.addEventListener('touchstart', function() {
     // Gestore che non chiama preventDefault()
   }, { passive: true });
   ```

5. **Preferire `addEventListener`** rispetto a `onclick` e attributi HTML per una migliore separazione tra HTML e JavaScript e per supportare più gestori.

6. **Gestire gli errori** nei gestori di eventi per evitare che un errore blocchi altri gestori o funzionalità della pagina.

   ```javascript
   elemento.addEventListener('click', function(evento) {
     try {
       // Codice che potrebbe generare errori
     } catch (errore) {
       console.error('Errore nel gestore di eventi:', errore);
     }
   });
   ```

## Conclusione

Gli eventi del DOM sono fondamentali per creare pagine web interattive e reattive. Comprendere come funzionano gli eventi, come propagano attraverso il DOM e come gestirli in modo efficiente è essenziale per sviluppare applicazioni web moderne.

Con una solida comprensione degli eventi, è possibile creare interfacce utente sofisticate che rispondono alle azioni dell'utente in modo fluido e intuitivo.

[Torna all'indice](../README.md) | [Argomento precedente: Navigazione nel DOM](./04_Navigazione_DOM.md)