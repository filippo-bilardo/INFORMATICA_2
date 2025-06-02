# Progetto: Dashboard Interattiva con Canvas

Questo progetto avanzato combina molti dei concetti studiati nei vari capitoli per creare una dashboard interattiva con grafici, animazioni e controlli utente.

## Obiettivi di apprendimento
- Integrare molteplici tecniche di Canvas in un'unica applicazione
- Creare visualizzazioni di dati interattive e responsive
- Implementare transizioni fluide tra stati della dashboard
- Organizzare un'applicazione Canvas complessa in componenti riutilizzabili

## Requisiti
- Conoscenza di tutte le tecniche base di Canvas (forme, colori, testo, trasformazioni)
- Familiarità con animazioni e gestione degli eventi
- Comprensione dei concetti di ottimizzazione delle prestazioni

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Interattiva</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
        }
        
        .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        
        .dashboard-title {
            font-size: 24px;
            font-weight: 600;
        }
        
        .controls {
            display: flex;
            gap: 10px;
        }
        
        .btn {
            padding: 8px 15px;
            background-color: #4a6fa5;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #375a8a;
        }
        
        .btn.active {
            background-color: #2c4870;
        }
        
        .btn.secondary {
            background-color: #6c757d;
        }
        
        .btn.secondary:hover {
            background-color: #5a6268;
        }
        
        .time-control {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .time-control select {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        
        .chart-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .chart-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        
        .chart-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .chart-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .chart-cell {
            flex: 1;
            min-height: 300px;
            position: relative;
        }
        
        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1 class="dashboard-title">Dashboard Analitica</h1>
            <div class="controls">
                <button id="viewSales" class="btn active">Vendite</button>
                <button id="viewTraffic" class="btn">Traffico</button>
                <button id="viewConversion" class="btn">Conversione</button>
                <button id="refreshData" class="btn secondary">↻ Aggiorna</button>
            </div>
        </div>
        
        <div class="time-control">
            <label for="timeRange">Periodo:</label>
            <select id="timeRange">
                <option value="7">Ultima settimana</option>
                <option value="30" selected>Ultimo mese</option>
                <option value="90">Ultimo trimestre</option>
                <option value="365">Ultimo anno</option>
            </select>
        </div>
        
        <div class="chart-row">
            <div class="chart-cell">
                <div class="chart-container">
                    <div class="chart-header">
                        <h2 class="chart-title">Distribuzione Vendite</h2>
                    </div>
                    <canvas id="pieChart"></canvas>
                </div>
            </div>
            <div class="chart-cell">
                <div class="chart-container">
                    <div class="chart-header">
                        <h2 class="chart-title">Performance</h2>
                    </div>
                    <canvas id="gaugeChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="chart-row">
            <div class="chart-cell" style="flex: 2;">
                <div class="chart-container">
                    <div class="chart-header">
                        <h2 class="chart-title">Trend</h2>
                    </div>
                    <canvas id="lineChart"></canvas>
                </div>
            </div>
        </div>
    </div>
    
    <script src="dashboard.js"></script>
</body>
</html>
```

### JavaScript (dashboard.js)
```javascript
// Riferimenti ai canvas
const pieChartCanvas = document.getElementById('pieChart');
const gaugeChartCanvas = document.getElementById('gaugeChart');
const lineChartCanvas = document.getElementById('lineChart');

// Assicurati che i canvas occupino tutto lo spazio disponibile
function resizeCanvas(canvas) {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Ridimensiona tutti i canvas
function resizeAllCanvases() {
    resizeCanvas(pieChartCanvas);
    resizeCanvas(gaugeChartCanvas);
    resizeCanvas(lineChartCanvas);
    
    // Ridisegna tutto
    drawAllCharts();
}

// Inizializza i canvas al caricamento e al ridimensionamento
window.addEventListener('load', resizeAllCanvases);
window.addEventListener('resize', resizeAllCanvases);

// Dati di esempio
let salesData = {
    categories: ['Elettronica', 'Abbigliamento', 'Casa', 'Cibo', 'Altro'],
    values: [42, 28, 15, 10, 5],
    colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
};

let performanceData = {
    current: 78, // percentuale attuale
    target: 85,  // percentuale obiettivo
    min: 0,
    max: 100
};

let trendData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    values: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
    previousValues: [40, 45, 60, 70, 50, 45, 30, 35, 45, 60, 75, 80]
};

// ---- Grafico a torta (vendite per categoria) ----
function drawPieChart() {
    const ctx = pieChartCanvas.getContext('2d');
    const width = pieChartCanvas.width;
    const height = pieChartCanvas.height;
    
    // Pulisci il canvas
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    // Calcola il totale per le percentuali
    const total = salesData.values.reduce((sum, value) => sum + value, 0);
    
    // Disegna le fette
    let startAngle = -0.5 * Math.PI; // Inizia dall'alto
    for (let i = 0; i < salesData.categories.length; i++) {
        const value = salesData.values[i];
        const sliceAngle = (value / total) * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;
        
        // Disegna la fetta
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        // Riempimento
        ctx.fillStyle = salesData.colors[i];
        ctx.fill();
        
        // Contorno bianco
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Calcola la posizione del testo (a metà dell'angolo della fetta)
        const midAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7; // Un po' all'interno del bordo
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);
        
        // Disegna la percentuale
        const percentage = Math.round((value / total) * 100) + '%';
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percentage, labelX, labelY);
        
        // Aggiorna l'angolo di partenza per la prossima fetta
        startAngle = endAngle;
    }
    
    // Disegna la legenda
    const legendX = centerX - radius;
    let legendY = centerY + radius + 20;
    
    for (let i = 0; i < salesData.categories.length; i++) {
        // Quadrato colorato
        ctx.fillStyle = salesData.colors[i];
        ctx.fillRect(legendX, legendY, 15, 15);
        
        // Testo della categoria
        ctx.font = '14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            `${salesData.categories[i]} (${salesData.values[i]})`,
            legendX + 20,
            legendY + 7
        );
        
        legendY += 25; // Spazio per la prossima voce
    }
}

// ---- Grafico a gauge (performance) ----
function drawGaugeChart() {
    const ctx = gaugeChartCanvas.getContext('2d');
    const width = gaugeChartCanvas.width;
    const height = gaugeChartCanvas.height;
    
    // Pulisci il canvas
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2 + 20; // Sposta leggermente verso il basso
    const radius = Math.min(width, height) / 2.2;
    
    // Disegna l'arco di sfondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 30;
    ctx.strokeStyle = '#ecf0f1';
    ctx.stroke();
    
    // Calcola la percentuale di riempimento
    const percentage = performanceData.current / performanceData.max;
    const angle = Math.PI + percentage * Math.PI;
    
    // Disegna l'arco colorato
    let gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#e74c3c");   // Rosso
    gradient.addColorStop(0.5, "#f39c12"); // Giallo
    gradient.addColorStop(1, "#2ecc71");   // Verde
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Disegna il valore centrale
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${performanceData.current}%`, centerX, centerY - 30);
    
    // Disegna il target
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '18px Arial';
    ctx.fillText(`Target: ${performanceData.target}%`, centerX, centerY + 10);
    
    // Disegna min e max
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${performanceData.min}%`, width * 0.1, centerY + 50);
    ctx.textAlign = 'right';
    ctx.fillText(`${performanceData.max}%`, width * 0.9, centerY + 50);
}

// ---- Grafico a linee (trend) ----
function drawLineChart() {
    const ctx = lineChartCanvas.getContext('2d');
    const width = lineChartCanvas.width;
    const height = lineChartCanvas.height;
    
    // Pulisci il canvas
    ctx.clearRect(0, 0, width, height);
    
    // Margini
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Calcola il massimo valore per scalare il grafico
    const maxValue = Math.max(
        ...trendData.values, 
        ...trendData.previousValues
    );
    
    // Funzioni di scala
    const xScale = (i) => margin.left + (i * chartWidth / (trendData.labels.length - 1));
    const yScale = (value) => height - margin.bottom - (value / maxValue * chartHeight);
    
    // --- Griglia di sfondo ---
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 1;
    
    // Linee orizzontali
    for (let i = 0; i <= 5; i++) {
        const y = margin.top + (i * chartHeight / 5);
        const value = maxValue * (1 - i / 5);
        
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();
        
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(value), margin.left - 10, y);
    }
    
    // --- Disegna la linea dei dati precedenti (tratteggiata) ---
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    
    for (let i = 0; i < trendData.previousValues.length; i++) {
        const x = xScale(i);
        const y = yScale(trendData.previousValues[i]);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Disegna i punti dei dati precedenti
    for (let i = 0; i < trendData.previousValues.length; i++) {
        const x = xScale(i);
        const y = yScale(trendData.previousValues[i]);
        
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // --- Disegna la linea dei dati attuali ---
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.setLineDash([]); // Rimuovi tratteggio
    ctx.beginPath();
    
    for (let i = 0; i < trendData.values.length; i++) {
        const x = xScale(i);
        const y = yScale(trendData.values[i]);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Disegna i punti dei dati attuali
    for (let i = 0; i < trendData.values.length; i++) {
        const x = xScale(i);
        const y = yScale(trendData.values[i]);
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // --- Disegna l'asse X con le etichette ---
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    for (let i = 0; i < trendData.labels.length; i++) {
        const x = xScale(i);
        ctx.fillText(trendData.labels[i], x, height - margin.bottom + 10);
    }
    
    // --- Legenda ---
    const legendY = margin.top + 20;
    
    // Linea attuale
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(width - 150, legendY);
    ctx.lineTo(width - 120, legendY);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText('Anno corrente', width - 110, legendY + 4);
    
    // Linea precedente
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(width - 150, legendY + 25);
    ctx.lineTo(width - 120, legendY + 25);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.setLineDash([]);
    ctx.fillText('Anno precedente', width - 110, legendY + 29);
}

// Funzione per animare la transizione tra diverse viste
function animateTransition(targetData, callback) {
    // Implementazione base, può essere ampliata per animazioni più complesse
    setTimeout(() => {
        callback();
    }, 300);
}

// Funzione per disegnare tutti i grafici
function drawAllCharts() {
    drawPieChart();
    drawGaugeChart();
    drawLineChart();
}

// Gesture listeners per interazioni mobili
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Determina direzione dello swipe
    const swipeThreshold = 100;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe a sinistra: prossima vista
        console.log('Swipe sinistra');
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe a destra: vista precedente
        console.log('Swipe destra');
    }
}

// Ottieni riferimenti ai pulsanti
const viewSalesButton = document.getElementById('viewSales');
const viewTrafficButton = document.getElementById('viewTraffic');
const viewConversionButton = document.getElementById('viewConversion');
const refreshDataButton = document.getElementById('refreshData');
const timeRangeSelect = document.getElementById('timeRange');

// Aggiungi event listeners per i pulsanti
viewSalesButton.addEventListener('click', () => {
    // Imposta il pulsante come attivo
    setActiveButton(viewSalesButton);
    
    // Cambia i dati per la vista vendite
    salesData.values = [42, 28, 15, 10, 5];
    performanceData.current = 78;
    trendData.values = [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90];
    
    animateTransition(salesData, drawAllCharts);
});

viewTrafficButton.addEventListener('click', () => {
    // Imposta il pulsante come attivo
    setActiveButton(viewTrafficButton);
    
    // Cambia i dati per la vista traffico
    salesData.values = [30, 25, 20, 15, 10];
    performanceData.current = 65;
    trendData.values = [40, 45, 60, 70, 50, 45, 30, 35, 45, 60, 75, 80];
    
    animateTransition(salesData, drawAllCharts);
});

viewConversionButton.addEventListener('click', () => {
    // Imposta il pulsante come attivo
    setActiveButton(viewConversionButton);
    
    // Cambia i dati per la vista conversione
    salesData.values = [50, 20, 15, 10, 5];
    performanceData.current = 92;
    trendData.values = [70, 65, 85, 90, 75, 70, 60, 65, 75, 80, 90, 95];
    
    animateTransition(salesData, drawAllCharts);
});

refreshDataButton.addEventListener('click', () => {
    // Simula l'aggiornamento dei dati
    refreshDataButton.textContent = '⟳ Aggiornamento...';
    
    setTimeout(() => {
        // Genera nuovi valori casuali
        salesData.values = salesData.values.map(() => Math.floor(Math.random() * 50) + 10);
        performanceData.current = Math.floor(Math.random() * 30) + 65; // 65-95
        trendData.values = trendData.values.map(() => Math.floor(Math.random() * 60) + 40); // 40-100
        
        drawAllCharts();
        refreshDataButton.textContent = '↻ Aggiorna';
    }, 800);
});

// Funzione per impostare il pulsante attivo
function setActiveButton(button) {
    viewSalesButton.classList.remove('active');
    viewTrafficButton.classList.remove('active');
    viewConversionButton.classList.remove('active');
    button.classList.add('active');
}

// Listener per il cambio di periodo
timeRangeSelect.addEventListener('change', (e) => {
    const days = parseInt(e.target.value);
    console.log(`Cambiato periodo a ${days} giorni`);
    
    // Qui si aggiornerebbero i dati in base al periodo selezionato
    // simuliamo una modifica ai dati
    const factor = days / 30; // usiamo 30 come riferimento
    
    trendData.values = trendData.values.map(v => 
        Math.min(100, Math.max(10, Math.floor(v * (0.8 + factor * 0.4))))
    );
    
    drawLineChart(); // Aggiorna solo il grafico a linee
});

// Inizializzazione
drawAllCharts();
```

## Spiegazione del progetto

### Architettura dell'applicazione

Questa dashboard interattiva è strutturata in tre componenti principali:

1. **Grafico a torta**: Mostra la distribuzione delle vendite per categoria, con percentuali e legenda
2. **Grafico gauge**: Visualizza la performance attuale rispetto a un target
3. **Grafico a linee**: Confronta i trend dell'anno corrente con quelli dell'anno precedente

L'applicazione implementa diverse funzionalità interattive:
- Cambio di vista (Vendite, Traffico, Conversione)
- Aggiornamento dei dati con animazioni
- Filtro temporale per adattare i dati a diversi periodi
- Supporto per gesture touch su dispositivi mobili

### Struttura responsiva

Il canvas si adatta dinamicamente alle dimensioni del contenitore grazie alla funzione `resizeAllCanvases()`, che viene chiamata sia al caricamento della pagina che al ridimensionamento della finestra. Questo garantisce che i grafici siano sempre proporzionati e visivamente corretti.

### Gestione dei dati

I dati sono organizzati in strutture dedicate per facilitare l'aggiornamento e la manipolazione:

```javascript
let salesData = {
    categories: ['Elettronica', 'Abbigliamento', 'Casa', 'Cibo', 'Altro'],
    values: [42, 28, 15, 10, 5],
    colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
};

let performanceData = {
    current: 78,
    target: 85,
    min: 0,
    max: 100
};

let trendData = { /* ... */ };
```

Ogni grafico ha una funzione dedicata per il disegno che utilizza queste strutture dati.

### Tecniche Canvas avanzate

#### Grafico a torta con percentuali

Il grafico a torta utilizza archi di cerchio per disegnare le fette, calcolando gli angoli in base ai valori:

```javascript
// Calcola il totale per le percentuali
const total = salesData.values.reduce((sum, value) => sum + value, 0);

// Disegna le fette
let startAngle = -0.5 * Math.PI;
for (let i = 0; i < salesData.categories.length; i++) {
    const value = salesData.values[i];
    const sliceAngle = (value / total) * (Math.PI * 2);
    const endAngle = startAngle + sliceAngle;
    
    // Disegna la fetta
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    // ... (riempimento, etichette, ecc.)
    
    startAngle = endAngle;
}
```

#### Grafico gauge con gradiente

Il gauge utilizza un arco semi-circolare con un gradiente di colori per indicare la performance:

```javascript
// Calcola la percentuale di riempimento
const percentage = performanceData.current / performanceData.max;
const angle = Math.PI + percentage * Math.PI;

// Disegna l'arco colorato
let gradient = ctx.createLinearGradient(0, 0, width, 0);
gradient.addColorStop(0, "#e74c3c");   // Rosso
gradient.addColorStop(0.5, "#f39c12"); // Giallo
gradient.addColorStop(1, "#2ecc71");   // Verde

ctx.beginPath();
ctx.arc(centerX, centerY, radius, Math.PI, angle);
ctx.stroke();
```

#### Grafico a linee con griglia e legenda

Il grafico a linee implementa:
- Sistema di coordinate con margini
- Funzioni di scala per mappare i valori dei dati sullo spazio del canvas
- Griglia di sfondo e etichette degli assi
- Linee tratteggiate per i dati storici
- Punti evidenziati con doppio cerchio

### Interattività utente

L'applicazione fornisce diversi metodi di interazione:

1. **Cambio vista**: Pulsanti che aggiornano tutti i grafici con nuovi dati

```javascript
viewSalesButton.addEventListener('click', () => {
    setActiveButton(viewSalesButton);
    
    // Cambia i dati per la vista vendite
    salesData.values = [42, 28, 15, 10, 5];
    // ...altri aggiornamenti dati
    
    animateTransition(salesData, drawAllCharts);
});
```

2. **Filtro temporale**: Un selettore che modifica i dati in base al periodo selezionato

```javascript
timeRangeSelect.addEventListener('change', (e) => {
    const days = parseInt(e.target.value);
    
    // Aggiorna i dati in base al periodo
    const factor = days / 30;
    trendData.values = trendData.values.map(v => 
        Math.min(100, Math.max(10, Math.floor(v * (0.8 + factor * 0.4))))
    );
    
    drawLineChart(); // Aggiorna solo il grafico interessato
});
```

3. **Supporto touch**: Rilevamento di swipe per navigare tra le viste su dispositivi mobili

```javascript
function handleSwipe() {
    const swipeThreshold = 100;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe a sinistra: prossima vista
        // ...
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe a destra: vista precedente
        // ...
    }
}
```

## Estensioni possibili

### 1. Animazioni fluide delle transizioni

```javascript
function animateTransition(oldData, newData, duration = 500, callback) {
    const startTime = performance.now();
    
    // Crea una struttura per i dati intermedi
    let currentData = JSON.parse(JSON.stringify(oldData));
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Interpola i valori
        for (let i = 0; i < oldData.values.length; i++) {
            currentData.values[i] = oldData.values[i] + 
                (newData.values[i] - oldData.values[i]) * progress;
        }
        
        // Ridisegna con i dati interpolati
        drawPieChart(currentData);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }
    
    requestAnimationFrame(animate);
}
```

### 2. Tooltip interattivi

```javascript
lineChartCanvas.addEventListener('mousemove', (e) => {
    const rect = lineChartCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Trova il punto più vicino
    const xValue = xScale.invert(x);
    const index = Math.round(xValue);
    
    if (index >= 0 && index < trendData.values.length) {
        // Disegna tooltip
        drawLineChart(); // Ridisegna il grafico
        
        const pointX = xScale(index);
        const pointY = yScale(trendData.values[index]);
        
        // Disegna un cerchio maggiore sul punto
        ctx.beginPath();
        ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
        ctx.fill();
        
        // Disegna un tooltip con il valore
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(pointX - 40, pointY - 40, 80, 30);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(trendData.values[index], pointX, pointY - 25);
    }
});
```

### 3. Esportazione di immagini

```javascript
function addExportButtons() {
    const charts = [
        { canvas: pieChartCanvas, name: 'pie-chart' },
        { canvas: gaugeChartCanvas, name: 'gauge-chart' },
        { canvas: lineChartCanvas, name: 'trend-chart' }
    ];
    
    charts.forEach(chart => {
        const container = chart.canvas.parentElement;
        const exportBtn = document.createElement('button');
        exportBtn.textContent = 'Esporta';
        exportBtn.className = 'export-btn';
        exportBtn.style.position = 'absolute';
        exportBtn.style.right = '10px';
        exportBtn.style.top = '10px';
        
        exportBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `${chart.name}-${Date.now()}.png`;
            link.href = chart.canvas.toDataURL('image/png');
            link.click();
        });
        
        container.style.position = 'relative';
        container.appendChild(exportBtn);
    });
}

// Chiama questa funzione dopo l'inizializzazione
addExportButtons();
```

### 4. Zoom e pan sul grafico a linee

```javascript
let zoomLevel = 1;
let panOffset = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };

lineChartCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1; // Zoom in o out
    zoomLevel *= delta;
    zoomLevel = Math.max(0.5, Math.min(5, zoomLevel)); // Limita lo zoom
    
    drawLineChart();
});

lineChartCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart.x = e.clientX - panOffset.x;
    dragStart.y = e.clientY - panOffset.y;
    lineChartCanvas.style.cursor = 'grabbing';
});

lineChartCanvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        panOffset.x = e.clientX - dragStart.x;
        panOffset.y = e.clientY - dragStart.y;
        drawLineChart();
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    lineChartCanvas.style.cursor = 'default';
});

// Modifica la funzione drawLineChart per applicare zoom e pan
function drawLineChart() {
    // ...
    
    // Applica zoom e pan alle funzioni di scala
    const xScale = (i) => (margin.left + (i * chartWidth / (trendData.labels.length - 1))) 
                          * zoomLevel + panOffset.x;
    const yScale = (value) => (height - margin.bottom - (value / maxValue * chartHeight)) 
                              * zoomLevel + panOffset.y;
                              
    // ...
}
```

## Conclusioni

Questo progetto dimostra come combinare diversi concetti Canvas per creare un'applicazione interattiva e visivamente accattivante. I principali concetti che abbiamo applicato includono:

1. **Canvas responsivo**: Adattamento dinamico alle dimensioni del contenitore
2. **Visualizzazione dati**: Trasformazione di dati numerici in rappresentazioni visive
3. **Interattività**: Gestione di eventi click, touch e cambio di stato
4. **Gestione modulare**: Separazione delle funzioni di disegno per ogni componente
5. **Ottimizzazione**: Ridisegno selettivo dei grafici quando necessario

Questo esempio fornisce una solida base per lo sviluppo di dashboard più complesse e può essere facilmente esteso per supportare funzionalità aggiuntive come animazioni fluide, tooltips interattivi e integrazione con API di dati reali.
