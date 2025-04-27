# Manipolazione del DOM

Dopo aver selezionato gli elementi del DOM, il passo successivo è manipolarli. JavaScript offre numerosi metodi e proprietà per modificare contenuti, attributi, stili e struttura degli elementi HTML.

## Manipolazione del Contenuto

### Proprietà textContent e innerText

Le proprietà `textContent` e `innerText` permettono di leggere o modificare il contenuto testuale di un elemento.

```javascript
// HTML: <div id="titolo">Titolo originale</div>
const titolo = document.getElementById('titolo');

// Lettura del contenuto testuale
console.log(titolo.textContent); // Output: "Titolo originale"

// Modifica del contenuto testuale
titolo.textContent = "Nuovo titolo";
```

**Differenze tra textContent e innerText**:
- `textContent` restituisce tutto il contenuto testuale, inclusi gli spazi e il testo nascosto via CSS
- `innerText` rispetta la formattazione CSS e restituisce solo il testo visibile

### Proprietà innerHTML

La proprietà `innerHTML` permette di leggere o modificare il contenuto HTML di un elemento.

```javascript
// HTML: <div id="contenuto"><p>Paragrafo originale</p></div>
const contenuto = document.getElementById('contenuto');

// Lettura del contenuto HTML
console.log(contenuto.innerHTML); // Output: "<p>Paragrafo originale</p>"

// Modifica del contenuto HTML
contenuto.innerHTML = "<p>Nuovo paragrafo con <strong>testo in grassetto</strong></p>";
```

**Attenzione**: L'uso di `innerHTML` con input non controllato può esporre l'applicazione a attacchi di tipo XSS (Cross-Site Scripting). È consigliabile utilizzare metodi più sicuri quando possibile.

## Manipolazione degli Attributi

### Metodi getAttribute, setAttribute, hasAttribute e removeAttribute

```javascript
// HTML: <img id="immagine" src="vecchia.jpg" alt="Descrizione">
const img = document.getElementById('immagine');

// Lettura di un attributo
const src = img.getAttribute('src'); // "vecchia.jpg"

// Verifica dell'esistenza di un attributo
const hasAlt = img.hasAttribute('alt'); // true

// Modifica di un attributo
img.setAttribute('src', 'nuova.jpg');

// Rimozione di un attributo
img.removeAttribute('alt');
```

### Accesso diretto agli attributi come proprietà

Molti attributi HTML standard sono accessibili direttamente come proprietà dell'elemento:

```javascript
const img = document.getElementById('immagine');

// Lettura
const src = img.src; // URL completo
const alt = img.alt;

// Modifica
img.src = 'nuova.jpg';
img.alt = 'Nuova descrizione';
```

### Gestione delle classi CSS

La proprietà `classList` offre metodi per manipolare le classi CSS di un elemento:

```javascript
const elemento = document.getElementById('box');

// Aggiunta di una classe
elemento.classList.add('evidenziato');

// Rimozione di una classe
elemento.classList.remove('nascosto');

// Toggle di una classe (aggiunge se non presente, rimuove se presente)
elemento.classList.toggle('selezionato');

// Verifica della presenza di una classe
const hasClass = elemento.classList.contains('evidenziato'); // true

// Sostituzione di una classe
elemento.classList.replace('vecchia-classe', 'nuova-classe');
```

## Manipolazione degli Stili

### Proprietà style

La proprietà `style` permette di accedere e modificare gli stili inline di un elemento:

```javascript
const box = document.getElementById('box');

// Modifica di singole proprietà CSS
box.style.color = 'blue';
box.style.backgroundColor = '#f0f0f0'; // Nota: in CSS sarebbe background-color
box.style.padding = '10px';
box.style.borderRadius = '5px';

// Lettura di stili inline
console.log(box.style.color); // "blue"
```

**Nota**: La proprietà `style` accede solo agli stili inline (attributo `style`), non agli stili definiti nei fogli di stile CSS.

### Lettura degli stili computati

Per leggere gli stili effettivi applicati a un elemento (inclusi quelli dei fogli di stile), si utilizza `getComputedStyle()`:

```javascript
const box = document.getElementById('box');
const styles = window.getComputedStyle(box);

console.log(styles.color); // Colore effettivo
console.log(styles.fontSize); // Dimensione del font effettiva
```

## Manipolazione della Struttura del DOM

### Creazione di Nuovi Elementi

```javascript
// Creazione di un nuovo elemento
const nuovoParagrafo = document.createElement('p');

// Aggiunta di contenuto
nuovoParagrafo.textContent = 'Questo è un nuovo paragrafo.';

// Aggiunta di attributi
nuovoParagrafo.id = 'paragrafo-nuovo';
nuovoParagrafo.classList.add('importante');
```

### Inserimento di Elementi nel DOM

```javascript
const contenitore = document.getElementById('contenitore');
const nuovoParagrafo = document.createElement('p');
nuovoParagrafo.textContent = 'Nuovo paragrafo';

// Aggiunta come ultimo figlio
contenitore.appendChild(nuovoParagrafo);

// Aggiunta in una posizione specifica
const primoFiglio = contenitore.firstChild;
contenitore.insertBefore(nuovoParagrafo, primoFiglio);

// Metodi più moderni
contenitore.append(nuovoParagrafo); // Aggiunge alla fine
contenitore.prepend(nuovoParagrafo); // Aggiunge all'inizio
contenitore.before(nuovoParagrafo); // Aggiunge prima del contenitore
contenitore.after(nuovoParagrafo); // Aggiunge dopo il contenitore
```

### Rimozione di Elementi

```javascript
const elementoDaRimuovere = document.getElementById('obsoleto');

// Metodo tradizionale
if (elementoDaRimuovere && elementoDaRimuovere.parentNode) {
  elementoDaRimuovere.parentNode.removeChild(elementoDaRimuovere);
}

// Metodo moderno
elementoDaRimuovere.remove();
```

### Sostituzione di Elementi

```javascript
const vecchioElemento = document.getElementById('vecchio');
const nuovoElemento = document.createElement('div');
nuovoElemento.textContent = 'Elemento sostitutivo';

// Metodo tradizionale
if (vecchioElemento && vecchioElemento.parentNode) {
  vecchioElemento.parentNode.replaceChild(nuovoElemento, vecchioElemento);
}

// Metodo moderno
vecchioElemento.replaceWith(nuovoElemento);
```

### Clonazione di Elementi

```javascript
const originale = document.getElementById('originale');

// Clonazione semplice (senza figli)
const cloneSuperficiale = originale.cloneNode(false);

// Clonazione profonda (con tutti i discendenti)
const cloneProfondo = originale.cloneNode(true);

// Inserimento del clone nel DOM
document.getElementById('destinazione').appendChild(cloneProfondo);
```

## Manipolazione Efficiente del DOM

### DocumentFragment

Per migliorare le prestazioni quando si aggiungono molti elementi, è consigliabile utilizzare un `DocumentFragment`:

```javascript
// Creazione di un fragment
const fragment = document.createDocumentFragment();

// Aggiunta di elementi al fragment
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}

// Aggiunta del fragment al DOM (una sola operazione di rendering)
const lista = document.getElementById('lista');
lista.appendChild(fragment);
```

### Batch Updates

Raggruppare le modifiche al DOM per ridurre il numero di reflow e repaint:

```javascript
// Approccio inefficiente (causa multiple operazioni di rendering)
const box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';
box.style.backgroundColor = 'red';
box.style.marginTop = '20px';

// Approccio efficiente (una sola operazione di rendering)
const box = document.getElementById('box');
box.style.cssText = 'width: 100px; height: 100px; background-color: red; margin-top: 20px;';

// Alternativa con classi CSS
box.className = 'box-grande rosso margine-alto';
```

## Best Practices per la Manipolazione del DOM

1. **Minimizzare le operazioni sul DOM**: Ogni modifica al DOM può causare reflow e repaint, operazioni costose in termini di performance.

2. **Utilizzare DocumentFragment**: Per aggiungere multipli elementi in una volta sola.

3. **Preferire le classi CSS**: Invece di modificare stili individuali, aggiungere/rimuovere classi CSS predefinite.

4. **Caching dei riferimenti**: Memorizzare i riferimenti agli elementi DOM che vengono utilizzati più volte.

5. **Delegazione degli eventi**: Invece di aggiungere listener a molti elementi, utilizzare la delegazione degli eventi (vedremo in dettaglio nella sezione sugli eventi).

6. **Evitare innerHTML con input non controllato**: Per prevenire vulnerabilità XSS.

7. **Utilizzare i metodi moderni**: Preferire metodi come `append()`, `prepend()`, `before()`, `after()` e `remove()` quando possibile.

## Esempio Pratico: Creazione di una Lista Dinamica

```javascript
function creaListaDinamica(items) {
  // Creazione del contenitore
  const container = document.createElement('div');
  container.className = 'lista-dinamica';
  
  // Creazione dell'intestazione
  const header = document.createElement('h2');
  header.textContent = 'Lista Dinamica';
  container.appendChild(header);
  
  // Creazione della lista
  const lista = document.createElement('ul');
  
  // Utilizzo di DocumentFragment per ottimizzare
  const fragment = document.createDocumentFragment();
  
  // Aggiunta degli elementi
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.classList.add('item-lista');
    
    // Aggiunta di un pulsante di rimozione
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Rimuovi';
    removeBtn.className = 'btn-rimuovi';
    removeBtn.addEventListener('click', () => li.remove());
    
    li.appendChild(removeBtn);
    fragment.appendChild(li);
  });
  
  lista.appendChild(fragment);
  container.appendChild(lista);
  
  // Aggiunta di un campo per nuovi elementi
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Nuovo elemento';
  
  const addBtn = document.createElement('button');
  addBtn.textContent = 'Aggiungi';
  addBtn.addEventListener('click', () => {
    if (input.value.trim()) {
      const newLi = document.createElement('li');
      newLi.textContent = input.value;
      
      const newRemoveBtn = document.createElement('button');
      newRemoveBtn.textContent = 'Rimuovi';
      newRemoveBtn.className = 'btn-rimuovi';
      newRemoveBtn.addEventListener('click', () => newLi.remove());
      
      newLi.appendChild(newRemoveBtn);
      lista.appendChild(newLi);
      input.value = '';
    }
  });
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(addBtn);
  container.appendChild(inputContainer);
  
  return container;
}

// Utilizzo
const items = ['Item 1', 'Item 2', 'Item 3'];
const listaDinamica = creaListaDinamica(items);
document.body.appendChild(listaDinamica);
```

## Conclusione

La manipolazione del DOM è una delle operazioni più comuni nello sviluppo web front-end. Padroneggiare queste tecniche permette di creare interfacce dinamiche e interattive. Tuttavia, è importante ricordare che le operazioni sul DOM possono essere costose in termini di performance, quindi è consigliabile seguire le best practices per ottimizzare il codice.

Nella prossima sezione, esploreremo la gestione degli eventi nel DOM, che ci permetterà di rendere le nostre pagine web reattive alle interazioni dell'utente.

[Torna all'indice](../README.md) | [Argomento precedente: Selezione degli Elementi](./02_Selezione_Elementi.md) | [Argomento successivo: Eventi nel DOM](./04_Eventi_DOM.md)