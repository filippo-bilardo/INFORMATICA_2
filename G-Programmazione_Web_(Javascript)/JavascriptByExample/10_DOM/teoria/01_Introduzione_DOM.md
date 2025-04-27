# Introduzione al DOM (Document Object Model)

Il Document Object Model (DOM) è un'interfaccia di programmazione che rappresenta documenti HTML e XML come una struttura ad albero, dove ogni nodo dell'albero è un oggetto che rappresenta una parte del documento. Il DOM fornisce un modo standard per accedere e manipolare la struttura, lo stile e il contenuto di un documento web.

## Cos'è il DOM?

Quando un browser carica una pagina web, crea una rappresentazione ad albero del documento HTML. Questa rappresentazione è chiamata DOM (Document Object Model) e permette a JavaScript di interagire dinamicamente con la pagina.

```
Document
└── html
    ├── head
    │   ├── title
    │   │   └── "La mia pagina"
    │   └── meta
    └── body
        ├── h1
        │   └── "Benvenuto"
        ├── p
        │   └── "Questo è un paragrafo"
        └── div
            └── a
                └── "Link"
```

Il DOM non è parte del linguaggio JavaScript, ma è un'API web che può essere utilizzata con JavaScript (e altri linguaggi di programmazione). Il DOM è implementato in modo coerente in tutti i browser moderni.

## La Relazione tra HTML e DOM

È importante comprendere che il DOM non è la stessa cosa del codice HTML:

1. **HTML** è il codice sorgente che viene inviato dal server al browser.
2. **DOM** è la rappresentazione in memoria di quel documento, creata dal browser dopo aver analizzato l'HTML.

Il DOM può differire dal codice HTML originale per diversi motivi:

- Il browser corregge automaticamente errori nel codice HTML
- JavaScript può modificare il DOM dopo il caricamento della pagina
- Il browser aggiunge nodi impliciti (come `<tbody>` nelle tabelle)

Esempio di HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>La mia pagina</title>
</head>
<body>
  <h1>Benvenuto</h1>
  <p>Questo è un paragrafo</p>
</body>
</html>
```

Dopo il caricamento, il DOM potrebbe includere nodi aggiuntivi non presenti nell'HTML originale, come nodi di testo per gli spazi bianchi o nodi impliciti.

## L'Oggetto Document

L'oggetto `document` è il punto di ingresso al DOM. Rappresenta l'intero documento HTML e fornisce metodi e proprietà per accedere e manipolare il documento.

```javascript
// Accesso al titolo del documento
console.log(document.title); // Output: "La mia pagina"

// Modifica del titolo
document.title = "Nuovo titolo";

// Accesso all'URL del documento
console.log(document.URL);

// Verifica se il documento è completamente caricato
console.log(document.readyState);
```

## Nodi del DOM

Nel DOM, tutto è un nodo. I tipi di nodo più comuni sono:

1. **Document**: Il nodo radice che rappresenta l'intero documento
2. **Element**: Rappresenta un elemento HTML (es. `<div>`, `<p>`, `<a>`)
3. **Text**: Rappresenta il contenuto testuale all'interno di un elemento
4. **Attribute**: Rappresenta un attributo di un elemento
5. **Comment**: Rappresenta un commento HTML

Ogni nodo ha proprietà e metodi specifici in base al suo tipo.

```javascript
// Esempio di accesso a diversi tipi di nodi
const heading = document.querySelector('h1'); // Element node
const headingText = heading.firstChild; // Text node
const bodyAttributes = document.body.attributes; // NamedNodeMap di Attribute nodes
const comments = document.querySelectorAll('comment()'); // NodeList di Comment nodes
```

## Proprietà dei Nodi

Tutti i nodi condividono alcune proprietà comuni:

- `nodeType`: Un numero che identifica il tipo di nodo (1 per Element, 3 per Text, ecc.)
- `nodeName`: Il nome del nodo (tag name per elementi, "#text" per nodi di testo)
- `nodeValue`: Il valore del nodo (null per elementi, contenuto testuale per nodi di testo)
- `parentNode`: Riferimento al nodo genitore
- `childNodes`: Una NodeList contenente tutti i nodi figli
- `firstChild`, `lastChild`: Riferimenti al primo e all'ultimo figlio
- `nextSibling`, `previousSibling`: Riferimenti ai nodi fratelli

```javascript
const paragraph = document.querySelector('p');

console.log(paragraph.nodeType); // 1 (Element)
console.log(paragraph.nodeName); // "P"
console.log(paragraph.nodeValue); // null
console.log(paragraph.firstChild.nodeValue); // "Questo è un paragrafo"
```

## Il DOM e il Browser

Il DOM è parte di un insieme più ampio di API del browser che lavorano insieme:

- **DOM**: Struttura del documento
- **CSSOM**: Modello degli stili CSS
- **BOM (Browser Object Model)**: Oggetti come `window`, `navigator`, `location`
- **Eventi**: Sistema di gestione degli eventi utente
- **API Web**: Fetch, Storage, Canvas, ecc.

Queste API insieme permettono di creare applicazioni web dinamiche e interattive.

## Limitazioni del DOM

Nonostante la sua potenza, il DOM ha alcune limitazioni:

1. **Prestazioni**: Le operazioni DOM possono essere costose in termini di performance, specialmente quando si effettuano molte modifiche
2. **Complessità**: La struttura ad albero può diventare complessa da navigare in documenti grandi
3. **Inconsistenze tra browser**: Nonostante gli standard, possono esistere differenze nell'implementazione tra browser

Per superare queste limitazioni, molti sviluppatori utilizzano librerie e framework (come React, Vue, Angular) che implementano un "Virtual DOM" o altri meccanismi di astrazione.

## Strumenti per Esplorare il DOM

I browser moderni offrono strumenti di sviluppo che permettono di esplorare e manipolare il DOM in tempo reale:

1. **Elements/Inspector**: Visualizza la struttura del DOM
2. **Console**: Permette di eseguire comandi JavaScript per interagire con il DOM
3. **DOM Breakpoints**: Permette di impostare punti di interruzione quando il DOM viene modificato

Utilizzare questi strumenti è fondamentale per il debugging e l'ottimizzazione delle applicazioni web.

## Conclusione

Il DOM è il ponte tra HTML e JavaScript, permettendo di creare pagine web dinamiche e interattive. Comprendere come funziona il DOM è essenziale per qualsiasi sviluppatore web.

Nelle prossime sezioni, esploreremo in dettaglio come selezionare elementi nel DOM, come manipolarli, come navigare tra i nodi e come gestire gli eventi associati agli elementi del DOM.

[Torna all'indice](../README.md) | [Argomento successivo: Selezione degli Elementi](./02_Selezione_Elementi.md)