# Guida 2: Il Sensore a Ultrasuoni

Il sensore a ultrasuoni dell'EV3 è uno strumento potente per misurare la distanza da oggetti e rilevare la loro presenza. Funziona emettendo onde sonore ad alta frequenza (impercettibili all'orecchio umano) e misurando il tempo che impiegano a tornare dopo aver rimbalzato su un oggetto.

## Funzionamento di Base

*   **Emissione e Ricezione**: Il sensore ha un emettitore e un ricevitore. L'emettitore invia un impulso ultrasonico, e il ricevitore rileva l'eco.
*   **Calcolo della Distanza**: La distanza viene calcolata in base al tempo trascorso tra l'emissione dell'impulso e la ricezione dell'eco. La formula di base è `Distanza = (Velocità del Suono * Tempo) / 2`.
*   **Unità di Misura**: In MakeCode, la distanza può essere letta in centimetri o pollici.

## Modalità del Sensore a Ultrasuoni

Il sensore a ultrasuoni EV3 ha principalmente due modalità operative:

1.  **Modalità Distanza (Measure Mode)**:
    *   È la modalità più comune.
    *   Il sensore emette continuamente impulsi e misura la distanza dall'oggetto più vicino nel suo cono di rilevamento.
    *   Restituisce un valore numerico che rappresenta la distanza.
    *   **Range di Rilevamento**: Tipicamente da circa 3 cm a 250 cm (o da 1 pollice a 100 pollici). L'accuratezza può diminuire agli estremi del range o con superfici particolari (morbide, angolate).

2.  **Modalità Presenza/Ascolto (Listen Mode)**:
    *   In questa modalità, il sensore non emette propri impulsi sonori ma rileva la presenza di altri segnali ultrasonici attivi (ad esempio, un altro sensore a ultrasuoni EV3 che sta emettendo).
    *   Restituisce un valore booleano (vero/falso) che indica se un altro segnale ultrasonico è stato rilevato.
    *   Utile per semplici forme di comunicazione o coordinamento tra robot, o per rilevare la presenza di un altro robot EV3.

## Utilizzo in MakeCode (JavaScript)

In MakeCode, puoi accedere al sensore a ultrasuoni tramite i blocchi dedicati nella categoria "Sensori" o direttamente in JavaScript.

**Esempio base per leggere la distanza in cm:**

```javascript
// Assumendo che il sensore a ultrasuoni sia collegato alla porta 4
let distanzaCm = sensors.ultrasonic4.distance(MesureMode.Centimeters);
brick.showString("Dist: " + distanzaCm + " cm", 1);
```

**Esempio per rilevare la presenza di un altro segnale (modalità Listen):**

```javascript
// Assumendo che il sensore a ultrasuoni sia collegato alla porta 4
// Per attivare la modalità Listen, solitamente si legge il valore in questa modalità.
// MakeCode potrebbe gestire internamente il cambio di modalità.
let altroSensoreRilevato = sensors.ultrasonic4.presence();
if (altroSensoreRilevato) {
    brick.showString("Altro US rilevato!", 2);
} else {
    brick.showString("Nessun altro US", 2);
}
```

## Considerazioni Pratiche

*   **Cono di Rilevamento**: Il sensore non rileva un singolo punto, ma un'area a forma di cono davanti a sé. Oggetti piccoli o ai margini del cono potrebbero non essere rilevati con precisione.
*   **Superfici**: Superfici morbide (come tessuti) o molto angolate possono assorbire o deviare le onde sonore, portando a letture inaccurate o a nessuna lettura.
*   **Oggetti Multipli**: Il sensore solitamente riporta la distanza dall'oggetto più vicino all'interno del suo cono di rilevamento.
*   **Interferenze**: Più sensori a ultrasuoni operanti molto vicini tra loro potrebbero interferire, a meno che non si utilizzi la modalità "Listen" o si sincronizzi la loro attivazione.
*   **Frequenza di Lettura**: Leggere il sensore troppo frequentemente in un loop stretto potrebbe non essere necessario e consumare risorse. Considera di inserire piccole pause se non è richiesta una reattività istantanea.

## Applicazioni Comuni

*   **Evitamento Ostacoli**: La più classica delle applicazioni. Il robot si muove e, se rileva un ostacolo entro una certa distanza, si ferma o cambia direzione.
*   **Seguire un Muro**: Mantenere una distanza costante da un muro.
*   **Rilevamento di Oggetti**: Verificare se un oggetto è presente in una determinata posizione.
*   **Attivazione di Azioni**: Avviare un'azione quando un oggetto (o una mano) si avvicina a una certa distanza.

Il sensore a ultrasuoni è uno strumento versatile per dare al tuo robot la capacità di "vedere" il mondo che lo circonda.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)