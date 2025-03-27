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
            background-color: #f5f5f5;
            color: #333;
        }
        
        .dashboard-container {
            display: flex;
            flex-direction: column;
            max-width: 1200px;
            margin: 20px auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 10px;
            overflow: hidden;
            background-color: white;
        }
        
        .dashboard-header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dashboard-controls {
            display: flex;
            padding: 10px;
            background-color: #ecf0f1;
            border-bottom: 1px solid #ddd;
        }
        
        .chart-container {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .chart-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .chart-header {
            padding: 10px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #eee;
            font-weight: bold;
        }
        
        canvas {
            width: 100%;
            height: 300px;
            display: block;
        }
        
        button {
            background-color: #3498db;
            border: none;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            transition: background-color 0.2s;
        }
        
        button:hover {
            background-color: #2980b9;
        }
        
        .date-range {
            display: flex;
            align-items: center;
            margin-left: auto;
        }
        
        .date-range select {
            margin-left: 10px;
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1>Analisi Dati di Vendita</h1>
            <div class="date-range">
                <span>Periodo:</span>
                <select id="timeRange">
                    <option value="7">Ultimi 7 giorni</option>
                    <option value="30" selected>Ultimi 30 giorni</option>
                    <option value="90">Ultimi 90 giorni</option>
                    <option value="365">Ultimo anno</option>
                </select>
            </div>
        </div>
        
        <div class="dashboard-controls">
            <button id="viewSales">Vendite</button>
            <button id="viewTraffic">Traffico</button>
            <button id="viewConversion">Conversione</button>
            <button id="refreshData">↻ Aggiorna</button>
        </div>
        
        <div class="chart-container">
            <div class="chart-card">
                <div class="chart-header">Vendite per Categoria</div>
                <canvas id="pieChart"></canvas>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">Metriche di Performance</div>
                <canvas id="gaugeChart"></canvas>
            </div>
            
            <div class="chart-card" style="grid-column: 1 / span 2;">
                <div class="chart-header">Trend di Vendite</div>
                <canvas id="lineChart"></canvas>
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
        const sliceAngle = (salesData.values[i] / total) * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;
        
        // Disegna la fetta
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        // Riempimento e bordo
        ctx.fillStyle = salesData.colors[i];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Passa alla fetta successiva
        startAngle = endAngle;
    }
    
    // Disegna la legenda
    const legendX = centerX - radius;
    let legendY = centerY + radius + 20;
    
    for (let i = 0; i < salesData.categories.length; i++) {
        // Quadrato colorato
        ctx.fillStyle = salesData.colors[i];
        ctx.fillRect(legendX, legendY, 15, 15);
        
        // Testo
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(
            `${salesData.categories[i]}: ${salesData.values[i]}%`,
            legendX + 25, 
            legendY + 12
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
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();
        
        // Etichette dell'asse Y
        const value = maxValue - (i * maxValue / 5);
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
        
        // Disegna un punto per ogni valore
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.stroke();
    
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

// Event listeners per i pulsanti
document.getElementById('viewSales').addEventListener('click', () => {
    // Cambia i dati per la vista vendite
    salesData.values = [42, 28, 15, 10, 5];
    performanceData.current = 78;
    trendData.values = [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90];
    
    animateTransition(salesData, drawAllCharts);
});

document.getElementById('viewTraffic').addEventListener('click', () => {
    // Cambia i dati per la vista traffico
    salesData.values = [30, 25, 20, 15, 10];
    performanceData.current = 65;
    trendData.values = [40, 45, 60, 70, 50, 45, 30, 35, 45, 60, 75, 80];
    
    animateTransition(salesData, drawAllCharts);
});

document.getElementById('viewConversion').addEventListener('click', () => {
    // Cambia i dati per la vista conversione
    salesData.values = [50, 20, 15, 10, 5];
    performanceData.current = 92;
    trendData.values = [70, 65, 85, 90, 75, 70, 60, 65, 75, 80, 90, 95];
    
    animateTransition(salesData, drawAllCharts);
});

document.getElementById('refreshData').addEventListener('click', () => {
    // Simula l'aggiornamento dei dati
    document.getElementById('refreshData').textContent = '⟳ Aggiornamento...';
    
    setTimeout(() => {
        // Genera nuovi valori casuali
        salesData.values = salesData.values.map(() => Math.floor(Math.random() * 50) + 10);
        performanceData.current = Math.floor(Math.random() * 30) + 65;
        trendData.values = trendData.values.map(() => Math.floor(Math.random() * 50) + 40);
        
        // Ridisegna i grafici
        drawAllCharts();
        
        // Ripristina il testo del pulsante
        document.getElementById('refreshData').textContent = '↻ Aggiorna';
    }, 800);
});

// Listner per il cambio di periodo
document.getElementById('timeRange').addEventListener('change', (e) => {
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

## Funzionalità implementate

Questo progetto implementa:

1. **Visualizzazione di dati** con tre tipi di grafici:
   - Grafico a torta per la distribuzione delle vendite per categoria
   - Grafico a gauge per le metriche di performance
   - Grafico a linee per il trend delle vendite nel tempo

2. **Interattività**:
   - Cambio di vista (vendite, traffico, conversione)
   - Aggiornamento dei dati con animazione
   - Cambio del periodo temporale
   - Supporto gesture touch per dispositivi mobili

3. **Ottimizzazioni**:
   - Canvas responsivi che si adattano alle dimensioni dello schermo
   - Ridisegno efficiente solo dei grafici necessari
   - Gestione degli eventi touch e mouse

4. **Tecniche Canvas avanzate**:
   - Utilizzo di gradienti
   - Gestione del testo e allineamento
   - Trasformazioni per il posizionamento degli elementi
   - Linee tratteggiate e stili diversi

## Possibili estensioni

1. **Salvare i grafici come immagini**
   Implementa una funzione per esportare i grafici come immagini PNG.

2. **Aggiungere tooltip interattivi**
   Mostra informazioni dettagliate quando l'utente passa sopra un elemento del grafico.

3. **Salvataggio delle preferenze utente**
   Usa localStorage per ricordare l'ultima vista selezionata.

4. **Transizioni animate**
   Implementa animazioni fluide quando i dati cambiano.

5. **Integrazione con una API reale**
   Sostituisci i dati di esempio con chiamate a un'API reale.

## Conclusione

Questo progetto dimostra come Canvas possa essere utilizzato per creare visualizzazioni di dati interattive e professionali, combinando concetti di disegno, gestione eventi, animazione e ottimizzazione. La struttura modulare del codice facilita anche l'estensione e la manutenzione dell'applicazione.
