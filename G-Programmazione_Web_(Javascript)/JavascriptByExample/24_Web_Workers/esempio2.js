// Web Worker per l'elaborazione di immagini

// Funzione per applicare i filtri
function applyFilter(imageData, filter, intensity) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const result = {
        data: new Uint8ClampedArray(data),
        width: width,
        height: height
    };
    const resultData = result.data;
    
    const intensityFactor = intensity / 100;
    
    switch (filter) {
        case 'none':
            // Nessun filtro, restituisci l'immagine originale
            break;
            
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                resultData[i] = avg;     // R
                resultData[i + 1] = avg; // G
                resultData[i + 2] = avg; // B
            }
            break;
            
        case 'invert':
            for (let i = 0; i < data.length; i += 4) {
                resultData[i] = 255 - data[i];         // R
                resultData[i + 1] = 255 - data[i + 1]; // G
                resultData[i + 2] = 255 - data[i + 2]; // B
            }
            break;
            
        case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                const sepiaR = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                const sepiaG = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                const sepiaB = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                
                // Applica l'intensità
                resultData[i] = r + (sepiaR - r) * intensityFactor;
                resultData[i + 1] = g + (sepiaG - g) * intensityFactor;
                resultData[i + 2] = b + (sepiaB - b) * intensityFactor;
            }
            break;
            
        case 'blur':
            // Implementazione semplificata di sfocatura (box blur)
            const radius = Math.floor(intensityFactor * 10) + 1;
            boxBlur(resultData, width, height, radius);
            break;
            
        case 'brightness':
            const brightnessFactor = 1 + intensityFactor;
            for (let i = 0; i < data.length; i += 4) {
                resultData[i] = Math.min(255, data[i] * brightnessFactor);
                resultData[i + 1] = Math.min(255, data[i + 1] * brightnessFactor);
                resultData[i + 2] = Math.min(255, data[i + 2] * brightnessFactor);
            }
            break;
    }
    
    return result;
}

// Funzione per applicare una sfocatura box blur
function boxBlur(data, width, height, radius) {
    // Implementazione semplificata per scopi dimostrativi
    // Una vera implementazione richiederebbe un algoritmo più efficiente
    const tempData = new Uint8ClampedArray(data.length);
    
    // Copia i dati originali
    for (let i = 0; i < data.length; i++) {
        tempData[i] = data[i];
    }
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;
            let count = 0;
            
            // Calcola la media dei pixel nel raggio
            for (let ky = -radius; ky <= radius; ky++) {
                for (let kx = -radius; kx <= radius; kx++) {
                    const posX = Math.min(width - 1, Math.max(0, x + kx));
                    const posY = Math.min(height - 1, Math.max(0, y + ky));
                    const idx = (posY * width + posX) * 4;
                    
                    r += tempData[idx];
                    g += tempData[idx + 1];
                    b += tempData[idx + 2];
                    a += tempData[idx + 3];
                    count++;
                }
            }
            
            // Calcola la media e imposta il nuovo valore
            const idx = (y * width + x) * 4;
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
            data[idx + 3] = a / count;
        }
    }
}

// Gestione dei messaggi ricevuti dal thread principale
onmessage = function(event) {
    const { imageData, filter, intensity } = event.data;
    
    console.log(`Worker: Inizio elaborazione immagine con filtro ${filter} e intensità ${intensity}%`);
    
    const startTime = performance.now();
    
    // Applica il filtro
    const processedData = applyFilter(imageData, filter, intensity);
    
    const endTime = performance.now();
    const processingTime = (endTime - startTime).toFixed(2);
    
    console.log(`Worker: Elaborazione completata in ${processingTime} ms`);
    
    // Invia il risultato al thread principale
    postMessage({
        processedData: processedData,
        processingTime: processingTime
    });
};

// Gestione degli errori
onerror = function(error) {
    console.error('Errore nel worker:', error.message);
    postMessage({
        errore: true,
        messaggio: error.message
    });
};

console.log('Worker per elaborazione immagini inizializzato e pronto');