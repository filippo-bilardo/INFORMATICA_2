# Guida 3: Il Sensore di Colore

Il sensore di colore dell'EV3 è un componente versatile che permette al robot di "vedere" e interpretare i colori e l'intensità della luce nell'ambiente circostante. È fondamentale per compiti come seguire linee, riconoscere oggetti colorati o reagire a diverse condizioni di illuminazione.

## Funzionalità Principali

Il sensore di colore può operare in diverse modalità:

1.  **Modalità Colore (Color Mode)**:
    *   Rileva e identifica un set predefinito di colori. Tipicamente:
        *   Nessun Colore (NoColor/None)
        *   Nero (Black)
        *   Blu (Blue)
        *   Verde (Green)
        *   Giallo (Yellow)
        *   Rosso (Red)
        *   Bianco (White)
        *   Marrone (Brown)
    *   Restituisce un valore (spesso un numero o una stringa) che rappresenta il colore rilevato.
    *   L'accuratezza dipende dalla distanza dall'oggetto, dall'illuminazione ambientale e dalla calibrazione.

2.  **Modalità Intensità Luce Riflessa (Reflected Light Intensity Mode)**:
    *   Emette una luce (solitamente rossa) e misura la quantità di luce che viene riflessa da una superficie.
    *   Restituisce un valore percentuale (0-100%), dove 0% indica pochissima luce riflessa (superficie scura/assorbente) e 100% indica molta luce riflessa (superficie chiara/riflettente).
    *   Questa modalità è cruciale per i robot che seguono linee (line follower), dove il sensore distingue tra una linea scura e uno sfondo chiaro (o viceversa).

3.  **Modalità Intensità Luce Ambientale (Ambient Light Intensity Mode)**:
    *   Misura l'intensità della luce presente nell'ambiente, senza emettere luce propria.
    *   Restituisce un valore percentuale (0-100%), dove 0% indica buio e 100% indica luce intensa.
    *   Utile per far reagire il robot a cambiamenti nelle condizioni di illuminazione (es. accendere luci, cercare aree luminose/buie).

## Utilizzo in MakeCode (JavaScript)

MakeCode fornisce blocchi e API JavaScript per accedere facilmente alle diverse modalità del sensore di colore.

**Esempio per leggere il colore rilevato:**

```javascript
// Assumendo che il sensore di colore sia collegato alla porta 3
let coloreRilevato = sensors.color3.color();

if (coloreRilevato == ColorSensorColor.Red) {
    brick.showString("Vedo Rosso!", 1);
} else if (coloreRilevato == ColorSensorColor.Blue) {
    brick.showString("Vedo Blu!", 1);
}
// ... e così via per gli altri colori
```

**Esempio per leggere l'intensità della luce riflessa:**

```javascript
// Assumendo che il sensore di colore sia collegato alla porta 3
let intensitaRiflessa = sensors.color3.reflectedLightIntensity();
brick.showString("Riflessa: " + intensitaRiflessa + "%", 2);

// Esempio di logica per seguire una linea (molto semplificato)
if (intensitaRiflessa < 30) { // Assumendo linea scura su sfondo chiaro
    // Il sensore è sulla linea
} else {
    // Il sensore è fuori dalla linea
}
```

**Esempio per leggere l'intensità della luce ambientale:**

```javascript
// Assumendo che il sensore di colore sia collegato alla porta 3
let intensitaAmbientale = sensors.color3.ambientLightIntensity();
brick.showString("Ambientale: " + intensitaAmbientale + "%", 3);
```

## Calibrazione

Per ottenere letture accurate, specialmente in modalità Luce Riflessa e Colore, la **calibrazione** del sensore può essere molto importante. La calibrazione aiuta il sensore ad adattarsi alle specifiche condizioni di luce e alle superfici con cui interagirà.

MakeCode potrebbe non avere una funzione di calibrazione diretta e semplice come altri ambienti di programmazione EV3 (es. EV3-G). Tuttavia, è possibile implementare una routine di calibrazione manuale:

1.  **Calibrazione per Luce Riflessa (Line Follower)**:
    *   Far leggere al sensore il valore sulla superficie più chiara (es. sfondo bianco) e memorizzarlo come `maxReading`.
    *   Far leggere al sensore il valore sulla superficie più scura (es. linea nera) e memorizzarlo come `minReading`.
    *   Durante l'esecuzione, si può calcolare un valore di soglia (threshold) come `(maxReading + minReading) / 2`. Le letture sopra la soglia indicano la superficie chiara, quelle sotto la soglia indicano la superficie scura.

## Considerazioni Pratiche

*   **Distanza dal Suolo/Oggetto**: Per la modalità Luce Riflessa e Colore, la distanza ottimale del sensore dalla superficie è solitamente di circa 1-2 cm. Troppo lontano o troppo vicino può dare letture errate.
*   **Illuminazione Ambientale**: Forti variazioni di luce ambientale possono influenzare le letture, specialmente in modalità Colore e Luce Ambientale. La modalità Luce Riflessa è generalmente più robusta a queste variazioni grazie alla sua luce emessa.
*   **Angolazione del Sensore**: Assicurarsi che il sensore sia puntato correttamente verso la superficie da analizzare.
*   **Superfici Lucide**: Superfici molto lucide o riflettenti possono causare letture anomale.

Il sensore di colore è uno degli strumenti più espressivi per i robot EV3, aprendo la porta a una vasta gamma di comportamenti interattivi e basati sulla percezione visiva.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)