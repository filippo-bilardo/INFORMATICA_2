// Esempio 04: Tecniche di Filtraggio e Analisi dei Dati dei Sensori

brick.showString("Esempio Filtraggio", 1);

// Questo esempio dimostra alcune tecniche base di filtraggio dei dati dei sensori,
// come la media mobile e il filtro mediano, e il rilevamento di soglie.

// === 1. Media Mobile (Moving Average) ===
brick.showString("Test Media Mobile", 2);
pause(1000);

let lightReadingsBuffer = [];
const movingAverageWindow = 5; // Numero di campioni per la media

// Funzione per calcolare la media mobile
function calculateMovingAverage(newDataPoint, buffer, windowSize) {
  buffer.push(newDataPoint);
  if (buffer.length > windowSize) {
    buffer.shift(); // Rimuove il dato più vecchio
  }

  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i];
  }
  return sum / buffer.length;
}

// Simula letture del sensore di luce e applica la media mobile
for (let i = 0; i < 10; i++) {
  // Simula una lettura grezza del sensore di luce (0-100)
  // Aggiungiamo un po' di rumore casuale
  let rawLightValue = 50 + (Math.random() * 20 - 10); // Valore base 50 +/- 10
  rawLightValue = Math.max(0, Math.min(100, rawLightValue)); // Clamp 0-100

  let filteredLightValue = calculateMovingAverage(rawLightValue, lightReadingsBuffer, movingAverageWindow);

  brick.showString("Raw: " + rawLightValue.toFixed(1), 4);
  brick.showString("Avg: " + filteredLightValue.toFixed(1), 5);
  brick.showString("Buffer: " + lightReadingsBuffer.length, 6);
  pause(500);
}
pause(2000);

// Pulizia display
for(let i=2; i < 7; i++) brick.showString("                     ", i);

// === 2. Filtro Mediano (Median Filter) ===
brick.showString("Test Filtro Mediano", 2);
pause(1000);

let distanceReadingsBuffer = [];
const medianFilterWindow = 3; // Finestra più piccola per il mediano, spesso 3 o 5

// Funzione per il filtro mediano
function calculateMedian(buffer) {
  if (buffer.length === 0) return 0;
  // Crea una copia del buffer per non modificare l'originale durante l'ordinamento
  let sortedBuffer = buffer.slice().sort(function(a, b) { return a - b; });

  let median;
  let midIndex = Math.floor(sortedBuffer.length / 2);

  if (sortedBuffer.length % 2 === 0) {
    // Media dei due valori centrali se il numero di campioni è pari
    median = (sortedBuffer[midIndex - 1] + sortedBuffer[midIndex]) / 2;
  } else {
    // Valore centrale se il numero di campioni è dispari
    median = sortedBuffer[midIndex];
  }
  return median;
}

function applyMedianFilter(newDataPoint, buffer, windowSize) {
    buffer.push(newDataPoint);
    if (buffer.length > windowSize) {
        buffer.shift();
    }
    return calculateMedian(buffer);
}

// Simula letture del sensore a ultrasuoni con un outlier
let simulatedDistances = [20, 22, 21, 150, 23, 20, 22]; // 150 è un outlier

for (let i = 0; i < simulatedDistances.length; i++) {
  let rawDistance = simulatedDistances[i];
  let filteredDistance = applyMedianFilter(rawDistance, distanceReadingsBuffer, medianFilterWindow);

  brick.showString("Raw Dist: " + rawDistance.toFixed(1), 4);
  brick.showString("Median Dist: " + filteredDistance.toFixed(1), 5);
  brick.showString("Buffer: " + distanceReadingsBuffer.length, 6);
  pause(1000);
}
pause(2000);

// Pulizia display
for(let i=2; i < 7; i++) brick.showString("                     ", i);

// === 3. Rilevamento di Soglie (Thresholding) ===
brick.showString("Test Soglie", 2);
pause(1000);

const touchSensor = sensors.touch1;
const lightSensor = sensors.color1;
const lightThreshold = 50; // Soglia per il sensore di luce

brick.showString("Premi sensore tocco", 3);
brick.showString("Copri sensore luce", 4);

let running = true;
control.runInParallel(function() {
    while(running) {
        if (touchSensor.isPressed()) {
            brick.showString("Tocco PREMUTO!", 6);
        } else {
            brick.showString("Tocco rilasciato", 6);
        }
        pause(100);
    }
})

control.runInParallel(function() {
    while(running) {
        let currentLight = lightSensor.light(LightIntensityMode.Reflected);
        brick.showString("Luce: " + currentLight, 7);
        if (currentLight < lightThreshold) {
            brick.showString("BUIO rilevato", 8);
            motors.largeAB.stop(); // Esempio di azione
        } else {
            brick.showString("LUCE rilevata", 8);
            motors.largeAB.run(50); // Esempio di azione
        }
        pause(100);
    }
})

// Lascia l'esempio delle soglie in esecuzione per 10 secondi
pause(10000);
running = false; // Ferma i loop paralleli
motors.largeAB.stop();

pause(1000);
brick.showString("Fine Esempio Filtraggio", 1);

// Note:
// - La scelta del filtro e dei suoi parametri (es. dimensione della finestra)
//   dipende dall'applicazione specifica e dalle caratteristiche del rumore del sensore.
// - Il filtraggio introduce un ritardo (lag) nella risposta del sensore.
// - La calibrazione dei sensori è spesso un passo preliminare importante prima del filtraggio.