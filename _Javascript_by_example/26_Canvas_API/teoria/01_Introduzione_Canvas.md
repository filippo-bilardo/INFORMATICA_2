# Introduzione alla Canvas API

## Cos'è la Canvas API

La Canvas API è un'interfaccia di programmazione che fa parte di HTML5 e permette di disegnare grafica 2D dinamicamente tramite JavaScript. È uno strumento potente per creare animazioni, giochi, visualizzazioni di dati, editor di foto e molto altro direttamente nel browser senza bisogno di plugin esterni.

A differenza di altre tecnologie come SVG (Scalable Vector Graphics), che è basato su XML e utilizza un modello a oggetti, Canvas opera a livello di pixel, offrendo un controllo preciso su ogni singolo punto dell'area di disegno.

## Configurazione dell'elemento canvas

Per iniziare a utilizzare la Canvas API, è necessario aggiungere un elemento `<canvas>` al documento HTML:

```html
<canvas id="myCanvas" width="600" height="400"></canvas>
```

L'elemento `canvas` accetta due attributi principali:
- `width`: la larghezza in pixel dell'area di disegno
- `height`: l'altezza in pixel dell'area di disegno

È importante specificare questi attributi direttamente nell'elemento HTML piuttosto che tramite CSS. Se si modificano le dimensioni tramite CSS, l'immagine potrebbe apparire distorta poiché il canvas verrebbe ridimensionato dopo essere stato renderizzato.

### Contenuto alternativo

È buona pratica fornire contenuto alternativo all'interno dell'elemento `canvas` per i browser che non supportano questa tecnologia:

```html
<canvas id="myCanvas" width="600" height="400">
  Il tuo browser non supporta l'elemento canvas.
  <img src="immagine-alternativa.jpg" alt="Descrizione alternativa">
</canvas>
```

## Contesto di rendering

Per disegnare sul canvas, è necessario ottenere un "contesto di rendering". Il contesto è un oggetto con proprietà e metodi che permettono di disegnare sul canvas.

Ecco come ottenere un contesto 2D:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

Il metodo `getContext()` accetta come parametro il tipo di contesto che si desidera utilizzare. Per il disegno 2D, si utilizza `'2d'`. Esistono anche altri contesti come `'webgl'` per la grafica 3D.

### Verifica del supporto

Prima di utilizzare il canvas, è buona pratica verificare se il browser lo supporta:

```javascript
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  // Procedi con il disegno
} else {
  // Canvas non supportato, implementa un fallback
  console.log('Canvas non supportato dal browser');
}
```

## Sistema di coordinate

Il canvas utilizza un sistema di coordinate in cui l'origine (0,0) si trova nell'angolo superiore sinistro. Le coordinate x aumentano verso destra e le coordinate y aumentano verso il basso.

```
(0,0) --> x aumenta
  |
  v
y aumenta
```

Questo è importante da tenere a mente quando si posizionano elementi sul canvas.

## Esempio base

Ecco un esempio completo che mostra come configurare un canvas e disegnare un semplice rettangolo:

```javascript
// Ottieni il riferimento al canvas
const canvas = document.getElementById('myCanvas');

// Verifica il supporto
if (canvas.getContext) {
  // Ottieni il contesto 2D
  const ctx = canvas.getContext('2d');
  
  // Imposta il colore di riempimento
  ctx.fillStyle = 'blue';
  
  // Disegna un rettangolo
  // Parametri: x, y, larghezza, altezza
  ctx.fillRect(50, 50, 100, 75);
} else {
  console.log('Canvas non supportato dal browser');
}
```

Questo codice disegna un rettangolo blu con l'angolo superiore sinistro alle coordinate (50,50) e dimensioni 100x75 pixel.

## Metodi principali del contesto 2D

Il contesto 2D offre numerosi metodi per disegnare sul canvas. Ecco alcuni dei più comuni:

- `fillRect(x, y, width, height)`: disegna un rettangolo pieno
- `strokeRect(x, y, width, height)`: disegna il contorno di un rettangolo
- `clearRect(x, y, width, height)`: cancella un'area rettangolare
- `beginPath()`: inizia un nuovo percorso
- `moveTo(x, y)`: sposta il punto di disegno a una nuova posizione
- `lineTo(x, y)`: aggiunge una linea al percorso
- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`: aggiunge un arco al percorso
- `fill()`: riempie il percorso corrente
- `stroke()`: disegna il contorno del percorso corrente
- `drawImage()`: disegna un'immagine sul canvas

Nei prossimi capitoli esploreremo in dettaglio questi metodi e molti altri.

## Salvare e ripristinare lo stato

Il contesto del canvas mantiene uno stack di stati che include trasformazioni, stili e altre impostazioni. È possibile salvare lo stato corrente con `save()` e ripristinarlo con `restore()`:

```javascript
ctx.fillStyle = 'blue';
ctx.save(); // Salva lo stato corrente

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50); // Disegna un rettangolo rosso

ctx.restore(); // Ripristina lo stato precedente
ctx.fillRect(70, 10, 50, 50); // Disegna un rettangolo blu
```

Questo è particolarmente utile quando si applicano trasformazioni o si cambiano stili temporaneamente.

## Conclusione

In questo capitolo abbiamo introdotto i concetti fondamentali della Canvas API: come configurare l'elemento canvas, ottenere il contesto di rendering e utilizzare i metodi di base per disegnare. Nei prossimi capitoli approfondiremo questi concetti ed esploreremo funzionalità più avanzate come il disegno di forme complesse, l'applicazione di stili, le trasformazioni e le animazioni.