# Debugging Avanzato per Applicazioni Canvas

Questo documento fornisce tecniche avanzate per il debugging di applicazioni basate su Canvas HTML5, con strumenti e metodi pratici per risolvere problemi comuni.

## Strumenti di Sviluppo del Browser

### 1. Timeline delle Performance

La timeline di performance nei DevTools dei browser moderni è uno strumento potente per analizzare il rendimento di un'applicazione Canvas:

1. Apri DevTools (F12 o Ctrl+Shift+I)
2. Vai alla scheda "Performance" (Chrome) o "Prestazioni" (Firefox)
3. Clicca su "Record" e interagisci con l'applicazione Canvas
4. Ferma la registrazione e analizza i risultati

![Timeline Performance](https://example.com/timeline-example.png)

**Cosa cercare:**
- Lunghi periodi di esecuzione JavaScript
- Frame rate irregolare
- Operazioni di rendering frequenti

### 2. JavaScript Profiler

Per identificare funzioni che consumano troppo tempo di CPU:

```javascript
console.profile('Canvas Rendering');
drawComplexScene();
console.profileEnd();
```

### 3. Punti di interruzione condizionali

Imposta punti di interruzione che si attivano solo quando si verificano determinate condizioni:

```javascript
// In DevTools, imposta un breakpoint su questa condizione
if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
    debugger; // Si attiva solo quando le coordinate escono dai limiti
}
```

## Tecniche di Visualizzazione per Debugging

### 1. Visualizzazione degli hitbox

```javascript
function drawObject(obj) {
    // Disegna l'oggetto normalmente
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    
    // In modalità debug, visualizza l'area di collisione
    if (DEBUG_MODE) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            obj.x - 1, 
            obj.y - 1, 
            obj.width + 2, 
            obj.height + 2
        );
        
        // Mostra il punto centrale
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + obj.height/2, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}
```

### 2. Tracciamento dei movimenti

```javascript
const trail = []; // Array per le ultime posizioni
const TRAIL_LENGTH = 20;

function updateObjectPosition(obj) {
    // Aggiorna la posizione
    obj.x += obj.velocityX;
    obj.y += obj.velocityY;
    
    // Aggiungi la posizione corrente al tracciamento
    if (DEBUG_MODE) {
        trail.push({x: obj.x, y: obj.y});
        if (trail.length > TRAIL_LENGTH) {
            trail.shift();
        }
    }
}

function drawTrail() {
    if (!DEBUG_MODE || trail.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    
    for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
}
```

### 3. Overlay informativo

```javascript
function drawDebugInfo() {
    if (!DEBUG_MODE) return;
    
    const info = [
        `FPS: ${currentFPS.toFixed(1)}`,
        `Objects: ${objects.length}`,
        `Mouse: (${mouseX}, ${mouseY})`,
        `Memory: ${(performance.memory?.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        `State: ${currentState}`
    ];
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 18 * info.length + 10);
    
    ctx.font = '14px monospace';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    
    info.forEach((text, i) => {
        ctx.fillText(text, 15, 15 + i * 18);
    });
}
```

## Debug delle Prestazioni

### 1. Monitora il Frame Rate

```javascript
// Monitora il framerate con media mobile
const frameTimes = [];
const MAX_FRAME_COUNT = 60;
let lastFrameTime = performance.now();
let currentFPS = 60;

function updateFPS() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    
    frameTimes.push(delta);
    
    if (frameTimes.length > MAX_FRAME_COUNT) {
        frameTimes.shift();
    }
    
    // Calcola la media
    const sum = frameTimes.reduce((a, b) => a + b, 0);
    currentFPS = 1000 / (sum / frameTimes.length);
}

function animationLoop() {
    updateFPS();
    
    // Usa currentFPS per debugging o adattamento
    if (DEBUG_MODE) {
        console.log(`Current FPS: ${currentFPS.toFixed(1)}`);
    }
    
    // Resto del loop di animazione...
    
    requestAnimationFrame(animationLoop);
}
```

### 2. Identifica i colli di bottiglia

```javascript
function profilingDraw() {
    const timings = {};
    
    // Misura il tempo di cancellazione
    const clearStart = performance.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timings.clear = performance.now() - clearStart;
    
    // Misura il tempo di disegno dello sfondo
    const bgStart = performance.now();
    drawBackground();
    timings.background = performance.now() - bgStart;
    
    // Misura il tempo di rendering degli oggetti
    const objStart = performance.now();
    for (const obj of objects) {
        obj.draw();
    }
    timings.objects = performance.now() - objStart;
    
    // Misura il tempo di rendering dell'UI
    const uiStart = performance.now();
    drawUI();
    timings.ui = performance.now() - uiStart;
    
    // Registra i tempi
    console.table(timings);
}
```

### 3. Utilizza un canvas di analisi

```javascript
// Canvas separato per l'analisi visiva delle prestazioni
const perfCanvas = document.createElement('canvas');
perfCanvas.width = 300;
perfCanvas.height = 100;
perfCanvas.style.position = 'absolute';
perfCanvas.style.bottom = '10px';
perfCanvas.style.right = '10px';
perfCanvas.style.border = '1px solid #333';
document.body.appendChild(perfCanvas);

const perfCtx = perfCanvas.getContext('2d');
const perfData = new Array(60).fill(0);

function updatePerfGraph(frameTime) {
    // Aggiungi il nuovo tempo
    perfData.push(frameTime);
    perfData.shift();
    
    // Pulisci il canvas
    perfCtx.clearRect(0, 0, perfCanvas.width, perfCanvas.height);
    
    // Disegna lo sfondo
    perfCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    perfCtx.fillRect(0, 0, perfCanvas.width, perfCanvas.height);
    
    // Disegna la linea di riferimento per 60fps (16.67ms)
    perfCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    perfCtx.beginPath();
    const y60fps = perfCanvas.height - (16.67 / 50 * perfCanvas.height);
    perfCtx.moveTo(0, y60fps);
    perfCtx.lineTo(perfCanvas.width, y60fps);
    perfCtx.stroke();
    
    // Disegna il grafico
    perfCtx.beginPath();
    for (let i = 0; i < perfData.length; i++) {
        const x = i * (perfCanvas.width / perfData.length);
        // Converti ms in altezza (max 50ms)
        const y = perfCanvas.height - (Math.min(perfData[i], 50) / 50 * perfCanvas.height);
        
        if (i === 0) {
            perfCtx.moveTo(x, y);
        } else {
            perfCtx.lineTo(x, y);
        }
    }
    perfCtx.strokeStyle = 'lime';
    perfCtx.lineWidth = 2;
    perfCtx.stroke();
    
    // Mostra il valore corrente
    perfCtx.font = '12px monospace';
    perfCtx.fillStyle = 'white';
    perfCtx.fillText(`${frameTime.toFixed(2)}ms (${(1000/frameTime).toFixed(1)} FPS)`, 5, 15);
}
```

## Debugging delle immagini e delle risorse

### 1. Verifica il caricamento delle risorse

```javascript
function preloadImages(urls) {
    const promises = [];
    const imageMap = {};
    
    urls.forEach(url => {
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`✓ Loaded: ${url}`);
                imageMap[url] = img;
                resolve(img);
            };
            img.onerror = () => {
                console.error(`✗ Failed: ${url}`);
                reject(new Error(`Failed to load image: ${url}`));
            };
            img.src = url;
        });
        promises.push(promise);
    });
    
    return Promise.all(promises)
        .then(() => {
            console.log('All images loaded successfully');
            return imageMap;
        })
        .catch(error => {
            console.error('Image loading failed:', error);
            throw error;
        });
}
```

### 2. Debug della manipolazione dei pixel

```javascript
function debugPixelManipulation(imageData, x, y, width, height) {
    // Crea un canvas di debug
    const debugCanvas = document.createElement('canvas');
    debugCanvas.width = width;
    debugCanvas.height = height;
    debugCanvas.style.position = 'absolute';
    debugCanvas.style.top = '10px';
    debugCanvas.style.left = '10px';
    debugCanvas.style.border = '2px solid red';
    debugCanvas.style.zIndex = 1000;
    document.body.appendChild(debugCanvas);
    
    const debugCtx = debugCanvas.getContext('2d');
    debugCtx.putImageData(imageData, 0, 0);
    
    console.log(`Debug canvas creato per l'area (${x}, ${y}, ${width}, ${height})`);
    console.log(`Primo pixel RGBA: ${
        imageData.data[0]},${
        imageData.data[1]},${
        imageData.data[2]},${
        imageData.data[3]}`
    );
    
    return debugCanvas; // Restituisce il riferimento per rimuoverlo in seguito
}
```

## Debugging Interattivo

### 1. Attivatore di debug con tastiera

```javascript
let DEBUG_MODE = false;
let DEBUG_LEVEL = 0; // 0=off, 1=basic, 2=advanced

document.addEventListener('keydown', (e) => {
    // Attiva/disattiva modalità debug con il tasto backtick (`)
    if (e.key === '`') {
        DEBUG_MODE = !DEBUG_MODE;
        console.log(`Debug mode: ${DEBUG_MODE ? 'ON' : 'OFF'}`);
    }
    
    // Solo in modalità debug
    if (DEBUG_MODE) {
        // Cambia livello debug con + e -
        if (e.key === '+') {
            DEBUG_LEVEL = Math.min(DEBUG_LEVEL + 1, 2);
            console.log(`Debug level: ${DEBUG_LEVEL}`);
        } else if (e.key === '-') {
            DEBUG_LEVEL = Math.max(DEBUG_LEVEL - 1, 0);
            console.log(`Debug level: ${DEBUG_LEVEL}`);
        }
        
        // Pausa/riprendi animazione
        if (e.key === 'p') {
            togglePause();
        }
        
        // Avanza di un frame (utile in pausa)
        if (e.key === 'n') {
            if (isPaused) {
                drawSingleFrame();
            }
        }
    }
});
```

### 2. Strumento di ispezione interattivo

```javascript
function setupInspectionTool() {
    let inspectionActive = false;
    let inspectedObject = null;
    
    canvas.addEventListener('click', (e) => {
        if (!DEBUG_MODE) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Cerca oggetti sotto il punto cliccato
        inspectedObject = findObjectAt(x, y);
        
        if (inspectedObject) {
            console.log('Oggetto ispezionato:', inspectedObject);
            inspectionActive = true;
        } else {
            inspectionActive = false;
        }
    });
    
    // Aggiungi al loop di rendering
    function renderInspection() {
        if (DEBUG_MODE && inspectionActive && inspectedObject) {
            // Disegna un contorno evidenziato
            ctx.strokeStyle = 'magenta';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                inspectedObject.x - 2,
                inspectedObject.y - 2,
                inspectedObject.width + 4,
                inspectedObject.height + 4
            );
            
            // Mostra dettagli dell'oggetto
            const details = [
                `ID: ${inspectedObject.id || 'N/A'}`,
                `Type: ${inspectedObject.type || 'Object'}`,
                `Pos: (${inspectedObject.x}, ${inspectedObject.y})`,
                `Size: ${inspectedObject.width}x${inspectedObject.height}`,
                `Velocity: (${inspectedObject.vx || 0}, ${inspectedObject.vy || 0})`
            ];
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(
                inspectedObject.x,
                inspectedObject.y - 20 - details.length * 20,
                200,
                details.length * 20
            );
            
            ctx.font = '14px monospace';
            ctx.fillStyle = 'white';
            details.forEach((detail, i) => {
                ctx.fillText(
                    detail,
                    inspectedObject.x + 5,
                    inspectedObject.y - 10 - (details.length - 1 - i) * 20
                );
            });
        }
    }
    
    // Aggiungi questa funzione al tuo loop di rendering
    return renderInspection;
}

const renderInspectionTool = setupInspectionTool();

// Nel loop di rendering principale:
function render() {
    // Rendering normale
    // ...
    
    // Rendering debug
    if (DEBUG_MODE) {
        renderInspectionTool();
    }
}
```

## Integrazione con console.log avanzato

```javascript
// Console.log con stili per diversi tipi di log
const Logger = {
    styles: {
        debug: 'color: #7f7f7f',
        info: 'color: #0099ff',
        warning: 'color: #ffcc00; font-weight: bold',
        error: 'color: #ff0000; font-weight: bold',
        success: 'color: #00cc00'
    },
    
    debug(...args) {
        if (DEBUG_MODE && DEBUG_LEVEL >= 2) {
            console.log('%c[DEBUG]', this.styles.debug, ...args);
        }
    },
    
    info(...args) {
        if (DEBUG_MODE) {
            console.log('%c[INFO]', this.styles.info, ...args);
        }
    },
    
    warning(...args) {
        console.log('%c[WARNING]', this.styles.warning, ...args);
    },
    
    error(...args) {
        console.log('%c[ERROR]', this.styles.error, ...args);
    },
    
    success(...args) {
        console.log('%c[SUCCESS]', this.styles.success, ...args);
    },
    
    table(data, title = '') {
        if (!DEBUG_MODE) return;
        
        if (title) {
            console.log('%c[TABLE] ' + title, 'color: #0099ff; font-weight: bold');
        }
        console.table(data);
    },
    
    group(title = 'Group', collapsed = false) {
        if (!DEBUG_MODE) return;
        
        const method = collapsed ? console.groupCollapsed : console.group;
        method.call(console, '%c' + title, 'color: #0099ff; font-weight: bold');
    },
    
    groupEnd() {
        if (!DEBUG_MODE) return;
        console.groupEnd();
    }
};

// Esempio di utilizzo
Logger.info('Inizializzazione applicazione...');
Logger.debug('Dettagli:', { x: 100, y: 200 });
Logger.warning('La risorsa audio non è stata caricata');
Logger.error('Impossibile inizializzare WebGL');
Logger.success('Connessione al server riuscita');

Logger.group('Performance');
Logger.table(performanceData);
Logger.groupEnd();
```

## Conclusioni

Il debugging efficace di applicazioni Canvas richiede un approccio sistematico e l'uso di strumenti specializzati. Combinando le tecniche di visualizzazione, monitoraggio delle prestazioni e strumenti interattivi presentati in questo documento, sarà possibile identificare e risolvere rapidamente i problemi più comuni nelle applicazioni Canvas.

Ricordate che un buon sistema di debugging dovrebbe essere:
1. Facilmente attivabile/disattivabile
2. Non intrusivo quando non è necessario
3. Sufficientemente dettagliato per identificare i problemi
4. Visivamente chiaro e informativo

Implementando queste tecniche, sarete in grado di sviluppare applicazioni Canvas più robuste e di risolvere efficacemente i problemi che si presenteranno durante lo sviluppo.

---

[Torna all'indice delle risorse](../README.md)
