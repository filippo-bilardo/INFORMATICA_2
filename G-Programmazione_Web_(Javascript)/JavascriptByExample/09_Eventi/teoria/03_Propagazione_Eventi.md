# Propagazione degli Eventi in JavaScript

La propagazione degli eventi è uno dei concetti più importanti e potenti del modello di eventi in JavaScript. Comprendere come gli eventi si propagano attraverso il DOM è fondamentale per implementare gestori di eventi efficaci e per sfruttare tecniche avanzate come la delegazione degli eventi.

## Le Fasi della Propagazione degli Eventi

Quando si verifica un evento su un elemento del DOM, questo non rimane confinato a quell'elemento, ma attraversa il DOM in tre fasi distinte:

1. **Fase di Cattura (Capturing Phase)**: L'evento parte dal nodo radice (window) e scende verso l'elemento target attraverso tutti gli elementi antenati.
2. **Fase Target (Target Phase)**: L'evento raggiunge l'elemento su cui si è verificato.
3. **Fase di Bubbling (Bubbling Phase)**: L'evento risale dall'elemento target fino al nodo radice attraverso tutti gli elementi antenati.

![Fasi della propagazione degli eventi](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventphases.png)

```html
<div id="outer">
  <div id="middle">
    <button id="inner">Cliccami</button>
  </div>
</div>
```

```javascript
const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

// Fase di cattura (terzo parametro: true)
outer.addEventListener('click', function() {
  console.log('Cattura: outer');
}, true);

middle.addEventListener('click', function() {
  console.log('Cattura: middle');
}, true);

inner.addEventListener('click', function() {
  console.log('Cattura: inner');
}, true);

// Fase di bubbling (terzo parametro: false o omesso)
outer.addEventListener('click', function() {
  console.log('Bubbling: outer');
});

middle.addEventListener('click', function() {
  console.log('Bubbling: middle');
});

inner.addEventListener('click', function() {
  console.log('Bubbling: inner');
});
```

Se si clicca sul pulsante, l'output nella console sarà:

```
Cattura: outer
Cattura: middle
Cattura: inner
Bubbling: inner
Bubbling: middle
Bubbling: outer
```

Questo dimostra come l'evento attraversi prima tutti gli elementi antenati nella fase di cattura, raggiunga l'elemento target, e poi risalga attraverso gli stessi elementi nella fase di bubbling.

## Controllo della Propagazione degli Eventi

JavaScript fornisce metodi per controllare la propagazione degli eventi:

### event.stopPropagation()

Il metodo `stopPropagation()` interrompe la propagazione dell'evento, impedendogli di raggiungere gli elementi successivi nella catena di propagazione:

```javascript
middle.addEventListener('click', function(event) {
  console.log('Bubbling: middle');
  event.stopPropagation();
  // L'evento non raggiungerà outer nella fase di bubbling
});
```

### event.stopImmediatePropagation()

Il metodo `stopImmediatePropagation()` non solo interrompe la propagazione dell'evento agli elementi successivi, ma impedisce anche l'esecuzione di altri gestori di eventi sullo stesso elemento:

```javascript
inner.addEventListener('click', function(event) {
  console.log('Primo gestore su inner');
  event.stopImmediatePropagation();
  // I gestori successivi su inner non verranno eseguiti
});

inner.addEventListener('click', function(event) {
  console.log('Secondo gestore su inner'); // Non verrà eseguito
});
```

### event.preventDefault()

Il metodo `preventDefault()` non influisce sulla propagazione dell'evento, ma impedisce l'azione predefinita associata all'evento:

```javascript
document.querySelector('a').addEventListener('click', function(event) {
  event.preventDefault(); // Impedisce la navigazione
  console.log('Link cliccato, ma la navigazione è stata bloccata');
  
  // L'evento continuerà a propagarsi normalmente
});
```

## Delegazione degli Eventi

La delegazione degli eventi è una tecnica potente che sfrutta la fase di bubbling per gestire eventi su più elementi con un singolo gestore. Invece di assegnare un gestore a ogni elemento, si assegna un gestore a un elemento antenato comune e si determina quale elemento ha generato l'evento.

### Vantaggi della Delegazione degli Eventi

1. **Efficienza**: Riduce il numero di gestori di eventi, migliorando le prestazioni
2. **Gestione di elementi dinamici**: Funziona con elementi aggiunti dinamicamente dopo l'inizializzazione del gestore
3. **Meno codice**: Semplifica la gestione di gruppi di elementi simili
4. **Meno memoria**: Riduce l'overhead di memoria associato ai gestori di eventi

### Implementazione della Delegazione degli Eventi

```html
<ul id="todo-list">
  <li>Elemento 1 <button class="delete">Elimina</button></li>
  <li>Elemento 2 <button class="delete">Elimina</button></li>
  <li>Elemento 3 <button class="delete">Elimina</button></li>
</ul>
<button id="add">Aggiungi elemento</button>
```

```javascript
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add');

// Un solo gestore per tutti i pulsanti di eliminazione
todoList.addEventListener('click', function(event) {
  // Verifica se l'elemento cliccato è un pulsante di eliminazione
  if (event.target.classList.contains('delete')) {
    // Trova l'elemento li genitore e lo rimuove
    const listItem = event.target.closest('li');
    if (listItem) {
      listItem.remove();
    }
  }
});

// Aggiunta di nuovi elementi
let counter = 4;
addButton.addEventListener('click', function() {
  const newItem = document.createElement('li');
  newItem.innerHTML = `Elemento ${counter} <button class="delete">Elimina</button>`;
  todoList.appendChild(newItem);
  counter++;
});
```

In questo esempio, anche i pulsanti di eliminazione aggiunti dinamicamente funzioneranno correttamente, poiché il gestore è sul contenitore e intercetta gli eventi durante la fase di bubbling.

### Tecniche Avanzate di Delegazione

#### Utilizzo di data-attributes

Gli attributi `data-*` possono essere utilizzati per memorizzare informazioni aggiuntive sugli elementi, utili nella delegazione degli eventi:

```html
<div id="actions">
  <button data-action="save">Salva</button>
  <button data-action="delete">Elimina</button>
  <button data-action="export">Esporta</button>
</div>
```

```javascript
document.getElementById('actions').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const action = event.target.dataset.action;
    
    switch (action) {
      case 'save':
        saveData();
        break;
      case 'delete':
        deleteData();
        break;
      case 'export':
        exportData();
        break;
    }
  }
});
```

#### Utilizzo di closest() per target più precisi

Il metodo `closest()` è particolarmente utile nella delegazione degli eventi per trovare l'elemento più vicino che corrisponde a un selettore:

```html
<table id="data-table">
  <tr>
    <td>Dato 1</td>
    <td>Valore 1</td>
    <td><button class="edit">Modifica</button></td>
  </tr>
  <!-- Altre righe... -->
</table>
```

```javascript
document.getElementById('data-table').addEventListener('click', function(event) {
  // Trova il pulsante di modifica più vicino
  const editButton = event.target.closest('.edit');
  
  if (editButton) {
    // Trova la riga della tabella contenente il pulsante
    const row = editButton.closest('tr');
    if (row) {
      editRow(row);
    }
  }
});
```

## Eventi che Non si Propagano

Non tutti gli eventi in JavaScript si propagano attraverso il DOM. Alcuni eventi, come `focus`, `blur`, `load`, `unload`, `resize`, non hanno una fase di bubbling per impostazione predefinita.

Tuttavia, alcuni di questi eventi hanno versioni che supportano il bubbling:
- `focus` → `focusin` (supporta il bubbling)
- `blur` → `focusout` (supporta il bubbling)

```javascript
// Non si propaga agli elementi antenati
document.querySelector('input').addEventListener('focus', function() {
  console.log('Input ha ricevuto il focus');
});

// Si propaga agli elementi antenati
document.querySelector('form').addEventListener('focusin', function() {
  console.log('Un elemento all\'interno del form ha ricevuto il focus');
});
```

## Event Capturing vs Event Bubbling

La scelta tra cattura e bubbling dipende dalle specifiche esigenze dell'applicazione:

### Quando Usare la Fase di Cattura

- Quando si desidera intercettare un evento prima che raggiunga l'elemento target
- Per implementare funzionalità di pre-elaborazione o validazione
- Per impedire che certi eventi raggiungano elementi specifici

```javascript
document.querySelector('form').addEventListener('click', function(event) {
  // Verifica se l'utente ha i permessi necessari
  if (!userHasPermission() && event.target.type === 'submit') {
    event.stopPropagation();
    event.preventDefault();
    showPermissionError();
  }
}, true); // Fase di cattura
```

### Quando Usare la Fase di Bubbling

- Per la maggior parte dei casi d'uso, inclusa la delegazione degli eventi
- Quando si desidera reagire a un evento dopo che è stato gestito dall'elemento target
- Per implementare funzionalità di post-elaborazione

```javascript
// Delegazione degli eventi (sfrutta il bubbling)
document.querySelector('ul').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    toggleItem(event.target);
  }
});
```

## Conclusione

La propagazione degli eventi è un meccanismo potente che permette di implementare strategie avanzate di gestione degli eventi in JavaScript. Comprendere come gli eventi si muovono attraverso il DOM nelle fasi di cattura e bubbling è essenziale per creare applicazioni web interattive ed efficienti.

La delegazione degli eventi, in particolare, è una tecnica fondamentale che sfrutta la propagazione per gestire eventi su più elementi con un codice più pulito e performante, specialmente in applicazioni con interfacce utente dinamiche.

[Torna all'indice](../README.md) | [Argomento precedente: Gestione degli Eventi](./02_Gestione_Eventi.md) | [Argomento successivo: Eventi del Browser](./04_Eventi_Browser.md)