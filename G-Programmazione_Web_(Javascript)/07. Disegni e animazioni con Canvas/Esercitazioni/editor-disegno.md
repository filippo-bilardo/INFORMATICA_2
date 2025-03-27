# Progetto: Editor di Disegno con Canvas

Questo progetto ti guiderà nella creazione di un editor di disegno interattivo utilizzando HTML5 Canvas, implementando vari strumenti come disegno a mano libera, forme geometriche, colori personalizzabili e funzionalità di salvataggio.

## Obiettivi di apprendimento
- Implementare interazioni avanzate con il mouse e il touch
- Creare uno stato dell'applicazione per gestire vari strumenti di disegno
- Applicare pattern di design per organizzare codice complesso
- Utilizzare `getImageData` e `putImageData` per manipolazione avanzata del canvas

## Requisiti
- Conoscenza di JavaScript intermedio
- Familiarità con gli eventi mouse/touch in Canvas
- Comprensione di base dei pattern di state management

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor di Disegno</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            display: flex;
            flex-direction: column;
            max-width: 900px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        .canvas-container {
            position: relative;
            margin: 10px auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        canvas {
            background-color: white;
            cursor: crosshair;
            display: block;
            border: 1px solid #ddd;
        }
        
        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            margin-bottom: 10px;
        }
        
        .tool {
            padding: 8px 12px;
            background-color: #eee;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .tool:hover {
            background-color: #ddd;
        }
        
        .tool.active {
            background-color: #4CAF50;
            color: white;
        }
        
        .color-picker {
            width: 40px;
            height: 30px;
            padding: 0;
            border: 1px solid #ccc;
        }
        
        .size-slider {
            width: 100px;
            vertical-align: middle;
        }
        
        .actions {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }
        
        .action-btn {
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .action-btn.danger {
            background-color: #f44336;
        }
        
        .action-btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Editor di Disegno</h1>
        
        <div class="toolbar">
            <button id="pencil" class="tool active">Matita</button>
            <button id="line" class="tool">Linea</button>
            <button id="rect" class="tool">Rettangolo</button>
            <button id="circle" class="tool">Cerchio</button>
            <button id="eraser" class="tool">Gomma</button>
            
            <input type="color" id="colorPicker" class="color-picker" value="#000000">
            
            <span>Spessore: </span>
            <input type="range" id="sizeSlider" class="size-slider" min="1" max="50" value="5">
            <span id="sizeValue">5px</span>
        </div>
        
        <div class="canvas-container">
            <canvas id="drawingCanvas" width="800" height="500"></canvas>
        </div>
        
        <div class="actions">
            <div>
                <button id="undo" class="action-btn">Annulla</button>
                <button id="redo" class="action-btn">Ripristina</button>
            </div>
            <div>
                <button id="save" class="action-btn">Salva Immagine</button>
                <button id="clear" class="action-btn danger">Cancella Tutto</button>
            </div>
        </div>
    </div>
    
    <script src="editor.js"></script>
</body>
</html>
```

### JavaScript (editor.js)
```javascript
// Otteniamo il riferimento al canvas e il suo contesto
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Riferimenti agli elementi UI
const tools = document.querySelectorAll('.tool');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');

// Variabili di stato dell'editor
const state = {
    tool: 'pencil', // Strumento attualmente selezionato
    isDrawing: false, // Se l'utente sta disegnando
    color: '#000000', // Colore attuale
    lineWidth: 5, // Spessore della linea
    startX: 0, // Coordinate iniziali per forme
    startY: 0,
    snapshot: null, // Immagine del canvas per disegnare forme
    history: [], // Cronologia degli stati per annulla/ripristina
    historyIndex: -1, // Posizione attuale nella cronologia
    maxHistoryLength: 20 // Numero massimo di stati nella cronologia
};

// Funzione di inizializzazione
function init() {
    // Imposta lo stato iniziale
    updateCanvasBackground();
    takeSnapshot();
    
    // Aggiungi gli event listener per il canvas
    addDrawingEventListeners();
    
    // Aggiungi gli event listener per gli strumenti UI
    addToolbarEventListeners();
}

// Funzione per gestire il cambio di strumenti
function setActiveTool(toolId) {
    tools.forEach(tool => {
        tool.classList.remove('active');
        if (tool.id === toolId) {
            tool.classList.add('active');
        }
    });
    state.tool = toolId;
}

// Funzione per prendere uno snapshot del canvas corrente
function takeSnapshot() {
    state.snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Funzione per aggiungere uno stato alla cronologia
function addToHistory() {
    // Tronca la cronologia se abbiamo annullato e poi disegnato qualcosa di nuovo
    if (state.historyIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.historyIndex + 1);
    }
    
    // Aggiungi lo stato corrente alla cronologia
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    state.history.push(imageData);
    state.historyIndex++;
    
    // Limita la dimensione della cronologia
    if (state.history.length > state.maxHistoryLength) {
        state.history.shift();
        state.historyIndex--;
    }
    
    // Aggiorna lo stato dei pulsanti annulla/ripristina
    updateUndoRedoButtons();
}

// Aggiorna lo stato dei pulsanti annulla/ripristina
function updateUndoRedoButtons() {
    undoBtn.disabled = state.historyIndex <= 0;
    redoBtn.disabled = state.historyIndex >= state.history.length - 1;
}

// Imposta lo sfondo del canvas a bianco (altrimenti sarebbe trasparente)
function updateCanvasBackground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Annulla l'ultima azione
function undo() {
    if (state.historyIndex > 0) {
        state.historyIndex--;
        ctx.putImageData(state.history[state.historyIndex], 0, 0);
        updateUndoRedoButtons();
    }
}

// Ripristina l'ultima azione annullata
function redo() {
    if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        ctx.putImageData(state.history[state.historyIndex], 0, 0);
        updateUndoRedoButtons();
    }
}

// Pulisci il canvas
function clearCanvas() {
    if (confirm("Sei sicuro di voler cancellare tutto?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateCanvasBackground();
        addToHistory();
    }
}

// Salva il disegno come immagine
function saveImage() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Inizio del disegno
function startDrawing(e) {
    state.isDrawing = true;
    
    // Ottieni le coordinate del mouse/touch
    const { offsetX, offsetY } = getCoordinates(e);
    state.startX = offsetX;
    state.startY = offsetY;
    
    // Imposta lo stile di disegno
    ctx.strokeStyle = state.tool === 'eraser' ? 'white' : state.color;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Inizia un nuovo percorso
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    
    // Se lo strumento è la matita, inizia a disegnare immediatamente
    if (state.tool === 'pencil' || state.tool === 'eraser') {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    } else {
        // Per altri strumenti, prendi uno snapshot per disegno provvisorio
        takeSnapshot();
    }
}

// Disegno in corso
function draw(e) {
    if (!state.isDrawing) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    
    switch(state.tool) {
        case 'pencil':
        case 'eraser':
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
            break;
        case 'line':
            drawShape(() => {
                ctx.beginPath();
                ctx.moveTo(state.startX, state.startY);
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
            });
            break;
        case 'rect':
            drawShape(() => {
                const width = offsetX - state.startX;
                const height = offsetY - state.startY;
                ctx.strokeRect(state.startX, state.startY, width, height);
            });
            break;
        case 'circle':
            drawShape(() => {
                const radius = Math.sqrt(
                    Math.pow(offsetX - state.startX, 2) + 
                    Math.pow(offsetY - state.startY, 2)
                );
                ctx.beginPath();
                ctx.arc(state.startX, state.startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
            });
            break;
    }
}

// Funzione helper per disegnare forme
function drawShape(drawFunction) {
    // Ripristina lo snapshot per pulire il canvas
    ctx.putImageData(state.snapshot, 0, 0);
    drawFunction();
}

// Fine del disegno
function stopDrawing() {
    if (state.isDrawing) {
        state.isDrawing = false;
        // Salva lo stato nella cronologia (eccetto per disegno a mano libera, che viene salvato durante il movimento)
        if (state.tool !== 'pencil' && state.tool !== 'eraser') {
            addToHistory();
        }
    }
}

// Ottieni le coordinate corrette per mouse o touch
function getCoordinates(event) {
    if (event.touches) {
        // Evento touch
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: event.touches[0].clientX - rect.left,
            offsetY: event.touches[0].clientY - rect.top
        };
    } else {
        // Evento mouse
        return {
            offsetX: event.offsetX,
            offsetY: event.offsetY
        };
    }
}

// Aggiungi gli event listener per il disegno
function addDrawingEventListeners() {
    // Eventi mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Eventi touch per dispositivi mobili
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startDrawing(e);
    });
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        draw(e);
    });
    canvas.addEventListener('touchend', stopDrawing);
}

// Aggiungi gli event listener per la toolbar
function addToolbarEventListeners() {
    // Gestione degli strumenti di disegno
    tools.forEach(tool => {
        tool.addEventListener('click', () => setActiveTool(tool.id));
    });
    
    // Gestione del colore
    colorPicker.addEventListener('change', () => {
        state.color = colorPicker.value;
    });
    
    // Gestione della dimensione
    sizeSlider.addEventListener('input', () => {
        state.lineWidth = sizeSlider.value;
        sizeValue.textContent = `${sizeSlider.value}px`;
    });
    
    // Bottoni di azione
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    saveBtn.addEventListener('click', saveImage);
    clearBtn.addEventListener('click', clearCanvas);
}

// Aggiungi un event listener per salvare lo stato quando il disegno a mano libera è fermo
let timeoutId;
canvas.addEventListener('mousemove', function() {
    if (state.isDrawing && (state.tool === 'pencil' || state.tool === 'eraser')) {
        // Cancella il timer precedente
        clearTimeout(timeoutId);
        
        // Imposta un nuovo timer
        timeoutId = setTimeout(() => {
            if (state.isDrawing) {
                addToHistory();
            }
        }, 500); // Salva lo stato dopo 500ms di inattività
    }
});

// Inizializza l'editor
init();
```

## Spiegazione dettagliata

### 1. Architettura dell'applicazione

L'editor di disegno è progettato utilizzando un approccio basato sullo stato. L'oggetto `state` centralizza tutte le informazioni sull'applicazione:

```javascript
const state = {
    tool: 'pencil',      // Strumento corrente
    isDrawing: false,    // Flag di disegno attivo
    color: '#000000',    // Colore selezionato
    lineWidth: 5,        // Spessore linea
    startX: 0,           // Coordinate iniziali per le forme
    startY: 0,
    snapshot: null,      // Immagine Canvas per disegno provvisorio
    history: [],         // Array per funzionalità annulla/ripristina
    historyIndex: -1     // Indice corrente nella cronologia
};
```

Questo approccio rende il codice più manutenibile e facile da estendere.

### 2. Gestione degli strumenti di disegno

Ogni strumento ha un comportamento diverso, implementato attraverso il pattern Strategy:

```javascript
switch(state.tool) {
    case 'pencil':
    case 'eraser':
        // Disegno continuo
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        break;
    case 'line':
        // Traccia una linea
        drawShape(() => { /* ... */ });
        break;
    case 'rect':
        // Disegna un rettangolo
        drawShape(() => { /* ... */ });
        break;
    // altri casi...
}
```

Questo pattern permette di:
- Aggiungere facilmente nuovi strumenti
- Mantenere la logica di ogni strumento separata
- Condividere funzionalità comuni tra strumenti simili

### 3. Sistema di snapshot e preview

Per gli strumenti che richiedono un'anteprima (come linee e forme), utilizziamo un sistema di snapshot:

```javascript
// Prende uno snapshot del canvas
function takeSnapshot() {
    state.snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Disegna una forma con anteprima
function drawShape(drawFunction) {
    ctx.putImageData(state.snapshot, 0, 0);
    drawFunction();
}
```

Questo permette all'utente di vedere in tempo reale l'anteprima della forma che sta disegnando.

### 4. Cronologia delle azioni

L'implementazione di Annulla/Ripristina utilizza una struttura dati simile a uno stack:

```javascript
function addToHistory() {
    // Tronca la cronologia se abbiamo annullato e poi disegnato
    if (state.historyIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.historyIndex + 1);
    }
    
    // Aggiungi lo stato corrente alla cronologia
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    state.history.push(imageData);
    state.historyIndex++;
    
    // Limita la dimensione della cronologia
    if (state.history.length > state.maxHistoryLength) {
        state.history.shift();
        state.historyIndex--;
    }
}
```

Questo meccanismo:
- Mantiene una cronologia limitata per evitare un uso eccessivo di memoria
- Gestisce correttamente il flusso di annullamento/ripristino
- Trattiene una copia completa di ogni stato del canvas

### 5. Supporto multi-dispositivo

L'editor gestisce sia eventi mouse che touch, permettendo l'uso su dispositivi diversi:

```javascript
// Ottieni le coordinate corrette per mouse o touch
function getCoordinates(event) {
    if (event.touches) {
        // Evento touch
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: event.touches[0].clientX - rect.left,
            offsetY: event.touches[0].clientY - rect.top
        };
    } else {
        // Evento mouse
        return {
            offsetX: event.offsetX,
            offsetY: event.offsetY
        };
    }
}
```

## Funzionalità avanzate

### 1. Salvataggio dell'immagine

L'applicazione consente di salvare il disegno come file PNG:

```javascript
function saveImage() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
```

### 2. Throttling degli aggiornamenti della cronologia

Per evitare di salvare ogni piccolo cambiamento durante il disegno a mano libera, implementiamo un meccanismo di throttling:

```javascript
let timeoutId;
canvas.addEventListener('mousemove', function() {
    if (state.isDrawing && (state.tool === 'pencil' || state.tool === 'eraser')) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (state.isDrawing) {
                addToHistory();
            }
        }, 500); // Salva lo stato dopo 500ms di inattività
    }
});
```

Questo riduce il numero di stati salvati e migliora le prestazioni.

## Estensioni possibili

L'editor può essere ulteriormente migliorato con le seguenti funzionalità:

### 1. Riempimento delle forme

```javascript
// Aggiungere un toggle per il riempimento
const fillToggle = document.getElementById('fillToggle');

// Modifica la funzione di disegno del rettangolo
case 'rect':
    drawShape(() => {
        const width = offsetX - state.startX;
        const height = offsetY - state.startY;
        
        if (state.fill) {
            ctx.fillStyle = state.color;
            ctx.fillRect(state.startX, state.startY, width, height);
        }
        ctx.strokeRect(state.startX, state.startY, width, height);
    });
    break;
```

### 2. Selezione e manipolazione degli oggetti

```javascript
// Aggiungi uno strumento di selezione
case 'select':
    // Controlla se il click è su un oggetto esistente
    const clickedObject = findObjectAt(offsetX, offsetY);
    
    if (clickedObject) {
        // Seleziona l'oggetto per la manipolazione
        state.selectedObject = clickedObject;
        showSelectionHandles(clickedObject);
    }
    break;
```

### 3. Livelli

```javascript
// Struttura dati per i livelli
const layers = [
    { name: 'Background', visible: true, canvas: document.createElement('canvas') },
    { name: 'Layer 1', visible: true, canvas: document.createElement('canvas') },
];

// Funzione per comporre i livelli
function composeLayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    layers.forEach(layer => {
        if (layer.visible) {
            ctx.drawImage(layer.canvas, 0, 0);
        }
    });
}
```

### 4. Filtri ed effetti

```javascript
function applyFilter(filterType) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    switch(filterType) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i+1] + data[i+2]) / 3;
                data[i] = data[i+1] = data[i+2] = avg;
            }
            break;
        // Altri filtri...
    }
    
    ctx.putImageData(imageData, 0, 0);
    addToHistory();
}
```

## Conclusione

Questo editor di disegno dimostra l'uso avanzato di Canvas per creare un'applicazione interattiva e funzionale. Implementa concetti chiave come:

- State management per gestire gli strumenti e le loro proprietà
- Manipolazione dei pixel per salvataggio e ripristino degli stati
- Gestione di eventi multipiattaforma
- Tecniche di ottimizzazione per migliorare le prestazioni

Il codice è strutturato in modo da essere facilmente estendibile con nuovi strumenti e funzionalità, rendendo l'applicazione una base solida per sviluppi futuri.
````
