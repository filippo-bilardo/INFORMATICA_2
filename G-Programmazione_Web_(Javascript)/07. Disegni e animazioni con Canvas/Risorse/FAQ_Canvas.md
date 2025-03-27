# FAQ: Canvas HTML5

Questa pagina raccoglie le domande più frequenti su Canvas e le relative risposte per aiutarti a risolvere problemi comuni.

## Domande Generali

### Che differenza c'è tra Canvas e SVG?

**Canvas:**
- Rendering basato su pixel (raster)
- Manipolato tramite JavaScript
- Prestazioni migliori con molti oggetti
- Perde qualità quando scalato
- Buono per: giochi, applicazioni grafiche complesse, elaborazione di immagini

**SVG:**
- Grafica vettoriale
- Parte del DOM, ogni elemento è manipolabile
- Prestazioni migliori con pochi oggetti
- Mantiene la qualità a qualsiasi scala
- Buono per: grafici, icone, illustrazioni

### Posso usare Canvas con React/Angular/Vue?

Sì, puoi utilizzare Canvas con qualsiasi framework JavaScript. I punti chiave sono:
1. Ottieni il riferimento al canvas tramite refs (React), @ViewChild (Angular) o refs (Vue)
2. Accedi al contesto nel lifecycle hook appropriato (componentDidMount, ngAfterViewInit, mounted)
3. Gestisci correttamente la pulizia e la creazione del contesto quando il componente viene distrutto

### Quanto è supportato Canvas nei browser moderni?

Canvas è supportato in tutti i browser moderni. Il supporto base è disponibile da:
- Chrome 4+
- Firefox 2+
- Safari 3.1+
- Edge 12+
- Opera 9+
- Safari iOS 3.2+
- Android Browser 3+

Funzionalità più recenti come `Path2D`, `ImageBitmap` e alcune proprietà del contesto potrebbero richiedere versioni più recenti.

## Problemi di Prestazioni

### Perché il mio Canvas diventa lento?

Le cause comuni di problemi di prestazioni includono:
1. **Troppe operazioni di disegno**: ridurre il numero di chiamate all'API di disegno
2. **Inutile ridisegno dell'intero canvas**: aggiornare solo ciò che cambia
3. **Oggetti non necessari**: minimizzare il numero di oggetti creati nel loop di animazione
4. **Dimensioni eccessive del canvas**: ridurre le dimensioni o usare canvas annidati
5. **Operazioni di pulizia inefficienti**: usare `clearRect()` anziché ridimensionare il canvas

### Come posso migliorare le prestazioni?

Tecniche di ottimizzazione:
1. **Usa canvas multipli**: uno per elementi statici, uno per elementi animati
2. **Layer compositi**: pre-renderizza elementi su canvas offscreen
3. **Raggruppa gli oggetti per stile**: minimizza i cambi di proprietà come `fillStyle`
4. **Usa `requestAnimationFrame`**: sincronizza con il refresh del browser
5. **Implementa caching degli oggetti**: evita di ridisegnare elementi immutati
6. **Limita la frequenza degli eventi**: utilizza throttling per eventi ad alta frequenza
7. **Imposta solo le proprietà che cambiano**: evita di impostare ripetutamente lo stesso valore

### Come gestisco i display ad alta densità (Retina)?

```javascript
function setupHiDPICanvas(canvas, width, height) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Scala il canvas considerando il DPR
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    
    // Imposta le dimensioni CSS
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    // Scala il contesto
    const ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    return ctx;
}
```

## Problemi con Immagini e Media

### Perché ottengo un errore "Tainted Canvas" quando manipolo un'immagine?

Il "tainted canvas" si verifica quando si tenta di utilizzare `getImageData()` su un canvas che ha caricato un'immagine cross-origin senza permessi appropriati. Per risolvere:

1. Servire le immagini dallo stesso dominio
2. Configurare CORS sul server delle immagini
3. Aggiungere l'attributo `crossOrigin` all'elemento immagine:
   ```javascript
   const img = new Image();
   img.crossOrigin = "anonymous";
   img.src = "https://example.com/image.png";
   ```

### Come salvo un'immagine dal canvas?

```javascript
// Convertire il canvas in una URL dati
const dataURL = canvas.toDataURL('image/png');

// Download automatico
const link = document.createElement('a');
link.download = 'canvas-image.png';
link.href = dataURL;
link.click();
```

Per formati diversi dal PNG, usa:
```javascript
canvas.toDataURL('image/jpeg', 0.8); // JPEG con qualità 0.8
```

### Come ridimensiono un'immagine mantenendo le proporzioni?

```javascript
function drawImageProp(ctx, img, x, y, w, h) {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let sx, sy, sWidth, sHeight;
    
    if (imgRatio > canvasRatio) {
        // Immagine più larga rispetto al canvas
        sHeight = img.height;
        sWidth = img.height * canvasRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
    } else {
        // Immagine più alta rispetto al canvas
        sWidth = img.width;
        sHeight = img.width / canvasRatio;
        sx = 0;
        sy = (img.height - sHeight) / 2;
    }
    
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}
```

## Problemi di Eventi

### Perché gli eventi mouse/touch non corrispondono alle coordinate canvas?

Questo accade generalmente perché:
1. Il canvas è stato ridimensionato con CSS
2. Il canvas ha margini o padding
3. Stai usando coordinate relative alla pagina/schermo invece che al canvas

Soluzione:
```javascript
function getCanvasCoordinates(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
}
```

### Come gestisco sia eventi mouse che touch?

```javascript
function setupCanvasEvents(canvas, handlers) {
    // Mouse events
    canvas.addEventListener('mousedown', e => {
        const coords = getCanvasCoordinates(canvas, e);
        handlers.start(coords.x, coords.y);
    });
    
    canvas.addEventListener('mousemove', e => {
        const coords = getCanvasCoordinates(canvas, e);
        handlers.move(coords.x, coords.y);
    });
    
    canvas.addEventListener('mouseup', () => handlers.end());
    
    // Touch events
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const coords = getCanvasCoordinates(canvas, touch);
        handlers.start(coords.x, coords.y);
    });
    
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const coords = getCanvasCoordinates(canvas, touch);
        handlers.move(coords.x, coords.y);
    });
    
    canvas.addEventListener('touchend', () => handlers.end());
}
```

## Problemi con Testo e Font

### Perché il mio font personalizzato non viene visualizzato correttamente?

I font devono essere caricati completamente prima di essere utilizzati nel canvas. Soluzioni:

1. Precarica i font con CSS:
   ```css
   @font-face {
     font-family: 'MyCustomFont';
     src: url('my-font.woff2') format('woff2');
   }
   ```

2. Utilizza Font Loading API:
   ```javascript
   const font = new FontFace('MyCustomFont', 'url(my-font.woff2)');
   font.load().then(() => {
       document.fonts.add(font);
       // Ora puoi usare il font nel canvas
       ctx.font = '16px MyCustomFont';
       ctx.fillText('Testo con font personalizzato', 10, 50);
   });
   ```

### Come allineo il testo al centro?

```javascript
function drawCenteredText(ctx, text, x, y) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

// Esempio di uso: testo al centro del canvas
drawCenteredText(ctx, 'Testo Centrato', canvas.width / 2, canvas.height / 2);
```

## Canvas Animato

### Come creo un loop di animazione efficiente?

```javascript
function createAnimationLoop(drawCallback) {
    let animationId;
    let lastTime = 0;
    
    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        
        // Calcola delta time in secondi
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        // Esegui il rendering
        drawCallback(deltaTime);
        
        // Continua il ciclo
        animationId = requestAnimationFrame(animate);
    }
    
    // Avvia l'animazione
    animationId = requestAnimationFrame(animate);
    
    // Restituisci funzione di stop
    return function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };
}

// Uso
const stop = createAnimationLoop((deltaTime) => {
    // Aggiornamento basato sul tempo
    object.x += object.speed * deltaTime;
    
    // Rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(object.x, object.y, 50, 50);
});

// Ferma l'animazione quando necessario
// stop();
```

---

Se hai altre domande, non esitare a contattare il tuo insegnante o consultare la [documentazione ufficiale MDN su Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
