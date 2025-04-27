# Navigazione nel DOM

La navigazione nel DOM è il processo di spostamento tra i vari nodi dell'albero del documento. Comprendere come navigare efficacemente tra gli elementi è fondamentale per manipolare e interagire con la struttura della pagina web.

## Relazioni tra Nodi nel DOM

Il DOM è strutturato come un albero gerarchico, dove ogni elemento ha relazioni specifiche con altri elementi:

- **Nodo genitore**: L'elemento che contiene direttamente un altro elemento
- **Nodo figlio**: Un elemento contenuto direttamente all'interno di un altro elemento
- **Nodi fratelli**: Elementi che condividono lo stesso genitore diretto
- **Antenati**: Tutti i nodi genitori risalendo l'albero del DOM
- **Discendenti**: Tutti i nodi figli scendendo l'albero del DOM

## Navigazione tra Genitori e Figli

### Accesso al Nodo Genitore

```javascript
const elemento = document.getElementById('elemento');

// Accesso al genitore diretto
const genitore = elemento.parentNode;

// Accesso al genitore elemento (ignora nodi di testo e commenti)
const genitoreElemento = elemento.parentElement;

console.log(genitore === genitoreElemento); // Generalmente true per elementi HTML
```

### Accesso ai Nodi Figli

```javascript
const contenitore = document.getElementById('contenitore');

// Collezione di tutti i nodi figli (inclusi nodi di testo e commenti)
const tuttiIFigli = contenitore.childNodes;

// Collezione di tutti gli elementi figli (solo nodi elemento)
const figliElementi = contenitore.children;

// Primo e ultimo nodo figlio (inclusi nodi di testo e commenti)
const primoFiglio = contenitore.firstChild;
const ultimoFiglio = contenitore.lastChild;

// Primo e ultimo elemento figlio (solo nodi elemento)
const primoElementoFiglio = contenitore.firstElementChild;
const ultimoElementoFiglio = contenitore.lastElementChild;

// Numero di elementi figli
const numeroFigli = contenitore.childElementCount;
// oppure
const numeroFigli2 = contenitore.children.length;
```

**Nota importante**: Le proprietà `childNodes` e `children` restituiscono collezioni live che si aggiornano automaticamente quando il DOM cambia.

## Navigazione tra Fratelli

```javascript
const elemento = document.getElementById('elemento');

// Nodi fratelli (inclusi nodi di testo e commenti)
const fratelloPrecedente = elemento.previousSibling;
const fratelloSuccessivo = elemento.nextSibling;

// Elementi fratelli (solo nodi elemento)
const elementoFratelloPrecedente = elemento.previousElementSibling;
const elementoFratelloSuccessivo = elemento.nextElementSibling;
```

## Navigazione Avanzata

### Risalire l'Albero del DOM

Per risalire l'albero del DOM fino a trovare un elemento con determinate caratteristiche, possiamo utilizzare un ciclo con `parentElement`:

```javascript
function trovaGenitoreConClasse(elemento, classe) {
  let corrente = elemento;
  
  while (corrente !== null) {
    if (corrente.classList.contains(classe)) {
      return corrente;
    }
    corrente = corrente.parentElement;
  }
  
  return null; // Nessun genitore trovato con la classe specificata
}

// Esempio di utilizzo
const pulsante = document.getElementById('pulsante');
const sezione = trovaGenitoreConClasse(pulsante, 'sezione');
```

### closest

Il metodo `closest()` è un modo più moderno e conciso per trovare l'antenato più vicino che corrisponde a un selettore CSS:

```javascript
const pulsante = document.getElementById('pulsante');

// Trova l'antenato più vicino con classe 'sezione'
const sezione = pulsante.closest('.sezione');

// Trova l'antenato più vicino che è un <article>
const articolo = pulsante.closest('article');

// Trova l'antenato con un attributo specifico
const form = pulsante.closest('[data-form-id]');
```

## Attraversamento Completo dell'Albero

### Attraversamento Ricorsivo

Per visitare tutti i nodi di un sottoalbero del DOM, possiamo utilizzare una funzione ricorsiva:

```javascript
function attraversaDOM(elemento, callback) {
  // Applica la callback all'elemento corrente
  callback(elemento);
  
  // Attraversa ricorsivamente tutti i figli
  const figli = elemento.children;
  for (let i = 0; i < figli.length; i++) {
    attraversaDOM(figli[i], callback);
  }
}

// Esempio di utilizzo
const radice = document.getElementById('radice');
attraversaDOM(radice, elemento => {
  console.log(elemento.tagName, elemento.className);
});
```

### Attraversamento con TreeWalker

Per casi più complessi, l'API `TreeWalker` offre un controllo avanzato sull'attraversamento del DOM:

```javascript
// Crea un TreeWalker che visita solo elementi con classe 'importante'
const walker = document.createTreeWalker(
  document.body, // Radice dell'attraversamento
  NodeFilter.SHOW_ELEMENT, // Mostra solo nodi elemento
  {
    acceptNode: function(node) {
      return node.classList.contains('importante')
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    }
  }
);

// Attraversa i nodi
let nodoCorrente = walker.currentNode;
while (nodoCorrente) {
  console.log(nodoCorrente.tagName, nodoCorrente.className);
  nodoCorrente = walker.nextNode();
}
```

## Differenza tra Nodi e Elementi

È importante comprendere la differenza tra nodi e elementi nel DOM:

- **Nodo**: Qualsiasi oggetto nell'albero del DOM, inclusi elementi, testo, commenti, ecc.
- **Elemento**: Un tipo specifico di nodo che rappresenta un tag HTML

Questo spiega perché esistono coppie di proprietà come:
- `childNodes` vs `children`
- `firstChild` vs `firstElementChild`
- `nextSibling` vs `nextElementSibling`

```javascript
// HTML: <div id="esempio">Testo <span>Span</span><!-- commento --></div>
const div = document.getElementById('esempio');

console.log(div.childNodes.length); // 3 (nodo testo, elemento span, nodo commento)
console.log(div.children.length); // 1 (solo l'elemento span)

console.log(div.firstChild.nodeType); // 3 (nodo testo)
console.log(div.firstElementChild.nodeType); // 1 (nodo elemento)
```

### Tipi di Nodo

Ogni nodo ha una proprietà `nodeType` che indica il suo tipo:

- `1`: Nodo elemento (Element)
- `3`: Nodo testo (Text)
- `8`: Nodo commento (Comment)
- `9`: Nodo documento (Document)
- `11`: Nodo frammento di documento (DocumentFragment)

```javascript
function descriviNodo(nodo) {
  switch (nodo.nodeType) {
    case Node.ELEMENT_NODE: // 1
      return `Elemento: ${nodo.tagName}`;
    case Node.TEXT_NODE: // 3
      return `Testo: "${nodo.textContent}"`;
    case Node.COMMENT_NODE: // 8
      return `Commento: "${nodo.textContent}"`;
    default:
      return `Altro tipo di nodo: ${nodo.nodeType}`;
  }
}

// Esempio di utilizzo
const div = document.getElementById('esempio');
div.childNodes.forEach(nodo => {
  console.log(descriviNodo(nodo));
});
```

## Casi d'Uso Comuni

### Trovare Tutti gli Elementi di una Tabella

```javascript
const tabella = document.getElementById('tabella-dati');

// Accesso diretto alle parti della tabella
const intestazioni = tabella.tHead.rows[0].cells;
const righe = tabella.tBodies[0].rows;

// Iterazione sulle righe e celle
for (let i = 0; i < righe.length; i++) {
  const riga = righe[i];
  const celle = riga.cells;
  
  for (let j = 0; j < celle.length; j++) {
    console.log(`Cella [${i},${j}]: ${celle[j].textContent}`);
  }
}
```

### Navigare in un Menu a Più Livelli

```javascript
function espandiSottoMenu(elemento) {
  // Trova il sottomenu diretto (primo livello)
  const sottoMenu = elemento.querySelector('ul');
  if (sottoMenu) {
    sottoMenu.style.display = 'block';
    
    // Espandi ricorsivamente tutti i sottomenu (livelli più profondi)
    const sottoVoci = sottoMenu.children;
    for (let i = 0; i < sottoVoci.length; i++) {
      espandiSottoMenu(sottoVoci[i]);
    }
  }
}

// Esempio di utilizzo
const menuPrincipale = document.getElementById('menu-principale');
const vociMenu = menuPrincipale.children;

for (let i = 0; i < vociMenu.length; i++) {
  espandiSottoMenu(vociMenu[i]);
}
```

## Best Practices per la Navigazione nel DOM

1. **Preferire i metodi specifici per gli elementi**: Utilizzare `children`, `firstElementChild`, ecc. invece di `childNodes`, `firstChild`, ecc. quando si lavora con elementi HTML.

2. **Memorizzare i riferimenti**: Se si naviga ripetutamente attraverso la stessa struttura, memorizzare i riferimenti agli elementi chiave.

3. **Utilizzare selettori CSS quando possibile**: Per casi semplici, `querySelector` e `querySelectorAll` possono essere più leggibili di una navigazione manuale complessa.

4. **Considerare la performance**: L'attraversamento del DOM può essere costoso, specialmente in documenti grandi. Limitare la profondità e la frequenza delle operazioni di navigazione.

5. **Verificare l'esistenza dei nodi**: Prima di accedere a proprietà o metodi di un nodo, verificare che esista per evitare errori.

   ```javascript
   const figlio = elemento.firstElementChild;
   if (figlio) {
     // Sicuro procedere con operazioni su figlio
   }
   ```

## Conclusione

La navigazione nel DOM è una competenza essenziale per lavorare efficacemente con le pagine web. Comprendere le relazioni tra i nodi e come muoversi tra di essi permette di creare script più potenti e flessibili per manipolare la struttura della pagina.

Nella prossima sezione, esploreremo come gestire gli eventi del DOM per creare pagine web interattive che rispondono alle azioni dell'utente.

[Torna all'indice](../README.md) | [Argomento precedente: Manipolazione del DOM](./03_Manipolazione_DOM.md) | [Argomento successivo: Eventi del DOM](./05_Eventi_DOM.md)