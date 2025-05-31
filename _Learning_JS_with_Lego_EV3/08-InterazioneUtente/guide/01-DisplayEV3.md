# Guida 1: Il Display EV3

Il display del brick EV3 è una piccola schermata LCD monocromatica che offre un modo semplice ma efficace per visualizzare informazioni, fornire feedback all'utente e creare interfacce di base.

## Caratteristiche del Display

*   **Risoluzione**: 178 x 128 pixel.
*   **Monocromatico**: Può visualizzare solo pixel neri su sfondo bianco (o viceversa).
*   **Funzionalità**: Può mostrare testo, forme geometriche semplici (linee, cerchi, rettangoli) e immagini bitmap (con limitazioni dovute alla monocromia e risoluzione).

## Utilizzo in MakeCode (JavaScript)

MakeCode fornisce un set di API JavaScript (e blocchi corrispondenti) per controllare il display, accessibili tramite l'oggetto `brick`.

### Visualizzare Testo

La funzione più comune è la visualizzazione di stringhe di testo.

```javascript
// Visualizza "Ciao Mondo!" sulla prima riga del display
brick.showString("Ciao Mondo!", 1);

// Visualizza un numero sulla seconda riga
let punteggio = 100;
brick.showString("Punteggio: " + punteggio, 2);

// È possibile specificare la colonna (pixel x) e la riga (pixel y) per il testo
// Nota: le coordinate delle righe sono spesso gestite in "linee di testo" (es. riga 1, 2, 3...)
// piuttosto che coordinate y dirette in pixel per showString.
// Per un controllo più fine, si usano funzioni di disegno.
```

*   **Linee di Testo**: Il display può contenere un numero limitato di linee di testo leggibili (circa 8-10 righe a seconda della dimensione del font predefinita).
*   **Cancellazione**: Per aggiornare il display, spesso è necessario cancellarlo prima (`brick.clearScreen()`) e poi ridisegnare il nuovo contenuto.

### Disegnare Forme

È possibile disegnare forme geometriche di base.

```javascript
// Cancella lo schermo prima di disegnare
brick.clearScreen();

// Disegna una linea da (x1, y1) a (x2, y2)
brick.drawLine(10, 10, 100, 10); // x1, y1, x2, y2

// Disegna un rettangolo (x, y, larghezza, altezza)
brick.drawRect(20, 20, 50, 30); // x, y, width, height

// Disegna un cerchio (centroX, centroY, raggio)
brick.drawCircle(89, 64, 20); // cx, cy, radius

// Imposta il colore del pixel (true per nero, false per bianco)
brick.setPixel(5, 5, true);

// Aggiorna il display per mostrare i disegni (necessario dopo le operazioni di disegno)
brick.updateScreen();
```

*   **Coordinate**: Il sistema di coordinate ha l'origine (0,0) nell'angolo in alto a sinistra.
*   `brick.updateScreen()`: Dopo aver usato comandi di disegno come `drawLine`, `drawRect`, `drawCircle`, `setPixel`, è necessario chiamare `brick.updateScreen()` per rendere visibili le modifiche.

### Visualizzare Icone/Immagini

MakeCode permette di visualizzare icone predefinite o immagini personalizzate (sebbene la creazione di immagini personalizzate complesse sia limitata).

```javascript
// Visualizza un'icona predefinita (es. un cuore)
brick.showIcon(IconName.Heart);

// Per immagini personalizzate, si potrebbe dover definire un array di byte
// o utilizzare strumenti specifici se MakeCode li fornisce per la conversione.
// Questa funzionalità è più avanzata e meno comune per semplici script.
```

## Considerazioni Pratiche

*   **Leggibilità**: Usa font e dimensioni del testo appropriati per garantire la leggibilità.
*   **Aggiornamento dello Schermo**: Evita di aggiornare lo schermo troppo frequentemente in un loop stretto se non necessario, poiché può consumare risorse e causare sfarfallio (flickering). Aggiorna solo quando ci sono cambiamenti significativi.
*   **Contrasto**: Il display è monocromatico, quindi il contrasto è fisso. L'illuminazione ambientale può influenzare la visibilità.
*   **Spazio Limitato**: Data la risoluzione, pianifica attentamente cosa visualizzare per non sovraffollare lo schermo.

## Applicazioni Comuni

*   **Feedback di Stato**: Mostrare lo stato attuale del robot (es. "In movimento", "Sensore attivato", "Batteria scarica").
*   **Visualizzazione Dati Sensori**: Mostrare letture dei sensori (distanza, colore, angolo).
*   **Menu Semplici**: Creare menu testuali navigabili con i pulsanti del brick.
*   **Istruzioni o Messaggi**: Fornire indicazioni all'utente.
*   **Debug**: Visualizzare valori di variabili o messaggi di debug durante lo sviluppo.

Il display EV3, sebbene semplice, è uno strumento prezioso per la comunicazione tra il robot e l'utente.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 08](../README.md)
[Torna alla Home del Corso](../../../README.md)