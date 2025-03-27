# Progetto: Editor di Disegno con Canvas

Questo progetto guida ti mostrerà come creare un editor di disegno completo utilizzando HTML Canvas e JavaScript, simile a strumenti basilari come MS Paint.

## Obiettivi di apprendimento
- Implementare la gestione avanzata degli eventi mouse e touch
- Creare strumenti di disegno interattivi
- Gestire lo stato dell'applicazione
- Implementare funzionalità di salvataggio e caricamento

## Requisiti
- Conoscenza di HTML e CSS di base
- Familiarità con JavaScript e DOM
- Comprensione degli eventi mouse e touch in Canvas

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
            background-color: #f0f0f0;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .toolbar {
            background-color: #333;
            padding: 10px;
            border-radius: 5px 5px 0 0;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .toolbar button {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            background-color: #555;
            color: white;
            cursor: pointer;
        }
        .toolbar button.active {
            background-color: #007bff;
        }
        .toolbar button:hover {
            background-color: #444;
        }
        .toolbar button.active:hover {
            background-color: #0069d9;
        }
        .toolbar .color-picker {
            height: 34px;
        }
        .toolbar .size-slider {
            width: 100px;
            margin: 0 8px;
            vertical-align: middle;
        }
        canvas {
            background-color: white;
            cursor: crosshair;
            display: block;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="toolbar">
            <button id="pencil" class="active">✏️ Matita</button>
            <button id="line">📏 Linea</button>
            <button id="rect">⬜ Rettangolo</button>
            <button id="circle">⭕ Cerchio</button>
            <button id="eraser">🧽 Gomma</button>
            <input type="color" id="colorPicker" class="color-picker" value="#000000">
            <label>
                Spessore:
                <input type="range" id="sizeSlider" class="size-slider" min="1" max="50" value="5">
                <span id="sizeValue">5px</span>
            </label>
            <button id="clear">🗑️ Pulisci</button>
            <button id="save">💾 Salva</button>
            <button id="load">📂 Carica</button>
        </div>
        <canvas id="drawingCanvas" width="1000" height="600"></canvas>
        <input type="file" id="loadInput" style="display: none" accept="image/*">
    </div>
    <script src="editor.js"></script>
</body>
</html>
```

### JavaScript (editor.js)
```javascript
// Riferimenti agli elementi DOM
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const loadInput = document.getElementById('loadInput');
const tools = {
    pencil: document.getElementById('pencil'),
    line: document.getElementById('line'),
    rect: document.getElementById('rect'),
    circle: document.getElementById('circle'),
    eraser: document.getElementById('eraser'),
    clear: document.getElementById('clear'),
    save: document.getElementById('save'),
    load: document.getElementById('load')
};

// Stato dell'applicazione
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pencil';
let startX = 0;
let startY = 0;
let snapshot = null;

// Impostazioni iniziali
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = sizeSlider.value;

// Funzione per aggiornare il tool attivo nella UI
function updateActiveTool(tool) {
    Object.keys(tools).forEach(key => {
        if (tools[key].classList) {
            tools[key].classList.remove('active');
        }
    });
    if (tools[tool].classList) {
        tools[tool].classList.add('active');
    }
    currentTool = tool;
}

// Funzione per ottenere le coordinate del mouse/touch relative al canvas
function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    
    // Gestione eventi touch o mouse
    if (e.touches && e.touches.length > 0) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Funzioni di disegno per ogni strumento

// Matita
function drawPencil(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    lastX = x;
    lastY = y;
}

// Linea
function drawLine(x, y) {
    ctx.putImageData(snapshot, 0, 0);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Rettangolo
function drawRect(x, y) {
    ctx.putImageData(snapshot, 0, 0);
    const width = x - startX;
    const height = y - startY;
    ctx.strokeRect(startX, startY, width, height);
}

// Cerchio
function drawCircle(x, y) {
    ctx.putImageData(snapshot, 0, 0);
    const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Gomma
function erase(x, y) {
    // Salva l'attuale stile e colore
    const currentStrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'white';
    
    drawPencil(x, y);
    
    // Ripristina lo stile originale
    ctx.strokeStyle = currentStrokeStyle;
}

// Event listeners per gli strumenti
for (const [tool, element] of Object.entries(tools)) {
    if (element && element.addEventListener) {
        element.addEventListener('click', () => {
            if (tool !== 'clear' && tool !== 'save' && tool !== 'load') {
                updateActiveTool(tool);
            } else if (tool === 'clear') {
                if (confirm('Sei sicuro di voler cancellare tutto?')) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            } else if (tool === 'save') {
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'disegno.png';
                a.click();
            } else if (tool === 'load') {
                loadInput.click();
            }
        });
    }
}

// Event listener per il selettore di colori
colorPicker.addEventListener('change', () => {
    ctx.strokeStyle = colorPicker.value;
});

// Event listener per il cursore della dimensione
sizeSlider.addEventListener('input', () => {
    const size = sizeSlider.value;
    ctx.lineWidth = size;
    sizeValue.textContent = size + 'px';
});

// Event listener per il caricamento di immagini
loadInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Event listeners per il disegno
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event listeners per touch
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Funzione per iniziare a disegnare
function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    const coords = getCoordinates(e);
    lastX = coords.x;
    lastY = coords.y;
    startX = coords.x;
    startY = coords.y;
    
    // Se stiamo usando strumenti che richiedono un'anteprima, salva lo stato attuale
    if (currentTool !== 'pencil' && currentTool !== 'eraser') {
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    
    // Se stiamo usando la matita o la gomma, inizia a disegnare subito
    if (currentTool === 'pencil' || currentTool === 'eraser') {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
    }
}

// Funzione per disegnare
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const coords = getCoordinates(e);
    const x = coords.x;
    const y = coords.y;
    
    switch(currentTool) {
        case 'pencil':
            drawPencil(x, y);
            break;
        case 'line':
            drawLine(x, y);
            break;
        case 'rect':
            drawRect(x, y);
            break;
        case 'circle':
            drawCircle(x, y);
            break;
        case 'eraser':
            erase(x, y);
            break;
    }
}

// Funzione per smettere di disegnare
function stopDrawing() {
    isDrawing = false;
}

// Gestisci il ridimensionamento della finestra
window.addEventListener('resize', () => {
    // Salva lo stato attuale del canvas
    const currentDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Ridimensiona il canvas se necessario (opzionale)
    // canvas.width = container.offsetWidth;
    
    // Ripristina il disegno
    ctx.putImageData(currentDrawing, 0, 0);
});

// Inizializza il canvas con uno sfondo bianco
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## Funzionalità avanzate da implementare

1. **Livelli multipli**
   Implementare un sistema di livelli che permetta di disegnare su strati separati.

2. **Funzione di annulla/ripeti**
   Aggiungere la possibilità di annullare e ripetere le azioni utilizzando una pila di stati.

3. **Filtri immagine**
   Aggiungere effetti come bianco e nero, seppia, o regolazione di luminosità e contrasto.

4. **Strumento testo**
   Permettere all'utente di aggiungere testo al disegno.

5. **Strumenti di selezione**
   Implementare strumenti per selezionare, tagliare, copiare e incollare parti dell'immagine.

## Conclusione

Questo progetto dimostra come Canvas possa essere utilizzato per creare applicazioni interattive complesse come un editor di disegno. Le tecniche di gestione degli eventi, manipolazione delle immagini e mantenimento dello stato dell'applicazione sono competenze fondamentali che possono essere applicate anche in altri contesti di sviluppo web.
