# Selezione degli Elementi nel DOM

La selezione degli elementi è il primo passo fondamentale per interagire con il DOM. JavaScript offre diversi metodi per selezionare elementi HTML, ognuno con caratteristiche e casi d'uso specifici.

## Metodi di Selezione Principali

### getElementById

Il metodo `getElementById()` seleziona un elemento in base al suo attributo `id`. Poiché gli ID dovrebbero essere unici all'interno di un documento, questo metodo restituisce un singolo elemento o `null` se nessun elemento corrisponde all'ID specificato.

```javascript
// HTML: <div id="contenitore">Contenuto</div>
const container = document.getElementById('contenitore');
console.log(container); // Output: <div id="contenitore">Contenuto</div>
```

**Vantaggi**:
- Molto veloce, poiché cerca un ID unico
- Sintassi semplice e diretta

**Limitazioni**:
- Funziona solo con gli ID
- Restituisce solo un elemento

### getElementsByClassName

Il metodo `getElementsByClassName()` seleziona tutti gli elementi che hanno una determinata classe CSS.

```javascript
// HTML: 
// <div class="item">Item 1</div>
// <div class="item">Item 2</div>
// <div class="item">Item 3</div>

const items = document.getElementsByClassName('item');
console.log(items.length); // Output: 3

// Iterazione sugli elementi
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}
```

**Nota importante**: `getElementsByClassName()` restituisce una HTMLCollection, che è simile a un array ma non è un array vero e proprio. È una collezione "live" che si aggiorna automaticamente quando il DOM cambia.

### getElementsByTagName

Il metodo `getElementsByTagName()` seleziona tutti gli elementi con un determinato tag HTML.

```javascript
// Seleziona tutti i paragrafi
const paragraphs = document.getElementsByTagName('p');

// Seleziona tutti i link
const links = document.getElementsByTagName('a');

// Seleziona tutti gli elementi (raramente utile)
const allElements = document.getElementsByTagName('*');
```

Come `getElementsByClassName()`, anche questo metodo restituisce una HTMLCollection live.

### querySelector

Il metodo `querySelector()` è più versatile e permette di selezionare elementi utilizzando selettori CSS. Restituisce il primo elemento che corrisponde al selettore specificato.

```javascript
// Seleziona il primo paragrafo
const firstParagraph = document.querySelector('p');

// Seleziona il primo elemento con classe 'highlight'
const highlighted = document.querySelector('.highlight');

// Seleziona l'elemento con ID 'header'
const header = document.querySelector('#header');

// Selettori più complessi
const nestedItem = document.querySelector('ul.menu > li:first-child');
const inputRequired = document.querySelector('input[required]');
```

**Vantaggi**:
- Estremamente flessibile grazie al supporto per i selettori CSS
- Sintassi concisa
- Può sostituire `getElementById`, `getElementsByClassName` e `getElementsByTagName`

**Limitazioni**:
- Leggermente più lento dei metodi specifici
- Restituisce solo il primo elemento corrispondente

### querySelectorAll

Il metodo `querySelectorAll()` funziona come `querySelector()`, ma restituisce tutti gli elementi che corrispondono al selettore specificato, sotto forma di NodeList.

```javascript
// Seleziona tutti i paragrafi
const allParagraphs = document.querySelectorAll('p');

// Seleziona tutti gli elementi con classe 'item'
const allItems = document.querySelectorAll('.item');

// Selettori più complessi
const oddItems = document.querySelectorAll('li:nth-child(odd)');
const disabledInputs = document.querySelectorAll('input[type="text"]:disabled');
```

**Nota importante**: `querySelectorAll()` restituisce una NodeList, che è simile a una HTMLCollection ma non è "live" (non si aggiorna automaticamente quando il DOM cambia).

## Differenze tra HTMLCollection e NodeList

È importante comprendere le differenze tra questi due tipi di collezioni:

| Caratteristica | HTMLCollection | NodeList |
|----------------|----------------|----------|
| Tipo di ritorno | `getElementsByClassName`, `getElementsByTagName` | `querySelectorAll` |
| Aggiornamento automatico | Sì (live) | No (statica) |
| Accesso agli elementi | Per indice o nome | Solo per indice |
| Metodi di array | No | Alcuni (forEach) |

```javascript
// HTMLCollection - live
const divs = document.getElementsByTagName('div');

// NodeList - statica
const divsQuery = document.querySelectorAll('div');

// Aggiunta di un nuovo div
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);

console.log(divs.length); // Aumentato di 1
console.log(divsQuery.length); // Rimane invariato
```

## Conversione in Array

Per utilizzare i metodi degli array su HTMLCollection e NodeList, è possibile convertirli in array:

```javascript
// Conversione di HTMLCollection in array
const divsArray = Array.from(document.getElementsByTagName('div'));
// oppure
const divsArray2 = [...document.getElementsByTagName('div')];

// Ora è possibile utilizzare i metodi degli array
divsArray.forEach(div => {
  div.style.color = 'blue';
});

const filteredDivs = divsArray.filter(div => div.classList.contains('important'));
```

## Selezione Contestuale

Tutti i metodi di selezione possono essere chiamati non solo sull'oggetto `document`, ma anche su qualsiasi elemento del DOM, limitando così la ricerca a un sottoalbero specifico.

```javascript
// Seleziona un contenitore
const container = document.getElementById('main-container');

// Cerca solo all'interno del contenitore
const containerParagraphs = container.querySelectorAll('p');
const containerButtons = container.getElementsByTagName('button');
const containerHighlighted = container.querySelector('.highlight');
```

Questo approccio è utile per:
- Migliorare le prestazioni limitando l'ambito di ricerca
- Evitare conflitti con elementi simili in altre parti della pagina
- Organizzare il codice in modo più modulare

## Verifica dell'Esistenza degli Elementi

Prima di manipolare un elemento, è buona pratica verificare che sia stato effettivamente trovato:

```javascript
const header = document.querySelector('header');

if (header) {
  // L'elemento esiste, è sicuro manipolarlo
  header.classList.add('sticky');
} else {
  // L'elemento non esiste, gestisci il caso
  console.warn('Header non trovato');
}
```

## Selezione di Elementi Multipli con Selettori Combinati

I selettori CSS permettono combinazioni potenti per selezionare elementi in base a relazioni complesse:

```javascript
// Seleziona tutti i paragrafi diretti di div con classe 'content'
const contentParagraphs = document.querySelectorAll('div.content > p');

// Seleziona tutti i link all'interno di liste
const listLinks = document.querySelectorAll('ul li a, ol li a');

// Seleziona elementi in base a attributi
const externalLinks = document.querySelectorAll('a[target="_blank"]');
const placeholderInputs = document.querySelectorAll('input[placeholder]');

// Seleziona elementi in base a stato
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
const invalidInputs = document.querySelectorAll('input:invalid');
```

## Selezione Dinamica con Attributi Data

Gli attributi `data-*` sono utili per selezionare elementi in base a dati personalizzati:

```html
<button data-action="save">Salva</button>
<button data-action="delete">Elimina</button>
<button data-action="cancel">Annulla</button>
```

```javascript
// Seleziona il pulsante di salvataggio
const saveButton = document.querySelector('[data-action="save"]');

// Seleziona tutti i pulsanti di azione
const actionButtons = document.querySelectorAll('[data-action]');

// Filtra i pulsanti in base al valore dell'attributo
actionButtons.forEach(button => {
  const action = button.dataset.action;
  if (action === 'delete') {
    button.classList.add('danger');
  }
});
```

## Best Practices per la Selezione degli Elementi

1. **Preferisci `querySelector` e `querySelectorAll` per la flessibilità**
   ```javascript
   // Meglio questo
   const header = document.querySelector('#header');
   // Rispetto a questo
   const header = document.getElementById('header');
   ```

2. **Usa `getElementById` per prestazioni ottimali quando selezioni per ID**
   ```javascript
   // Più veloce per ID
   const mainContent = document.getElementById('main-content');
   ```

3. **Memorizza i riferimenti agli elementi usati frequentemente**
   ```javascript
   // Memorizza il riferimento
   const navMenu = document.querySelector('.nav-menu');
   
   // Usa il riferimento più volte
   navMenu.classList.add('active');
   navMenu.querySelector('.dropdown').style.display = 'block';
   navMenu.addEventListener('click', handleNavClick);
   ```

4. **Limita l'ambito di ricerca quando possibile**
   ```javascript
   // Limita la ricerca al form
   const form = document.getElementById('registration-form');
   const inputs = form.querySelectorAll('input[required]');
   ```

5. **Usa selettori specifici ma non eccessivamente complessi**
   ```javascript
   // Buono: specifico ma non troppo complesso
   const menuItems = document.querySelectorAll('nav.main-menu > ul > li');
   
   // Da evitare: troppo complesso e fragile
   const deepElement = document.querySelector('header > div.container > div.row > div.col > nav > ul > li:nth-child(3) > a');
   ```

6. **Preferisci classi o attributi data per selezionare elementi per comportamento**
   ```javascript
   // Meglio questo
   const toggleButtons = document.querySelectorAll('.toggle-button');
   // o questo
   const toggleButtons = document.querySelectorAll('[data-toggle]');
   
   // Rispetto a questo
   const toggleButtons = document.querySelectorAll('button.btn.small.rounded');
   ```

## Conclusione

La selezione degli elementi è il fondamento di qualsiasi interazione con il DOM. Scegliere il metodo di selezione appropriato e utilizzare selettori efficaci può migliorare significativamente le prestazioni e la manutenibilità del codice.

Nella prossima sezione, esploreremo come manipolare gli elementi selezionati, modificando il loro contenuto, attributi e stili.

[Torna all'indice](../README.md) | [Argomento precedente: Introduzione al DOM](./01_Introduzione_DOM.md) | [Argomento successivo: Manipolazione del DOM](./03_Manipolazione_DOM.md)