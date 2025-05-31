# Guida 5: Il Sensore a Infrarossi e Beacon

Il sensore a infrarossi (IR) dell'EV3 è un dispositivo due-in-uno che può essere utilizzato sia per misurare la prossimità di oggetti sia per rilevare segnali da un beacon (trasmettitore) a infrarossi.

## Funzionalità Principali

1.  **Modalità Prossimità (Proximity Mode)**:
    *   Il sensore emette luce infrarossa e misura l'intensità della luce riflessa da un oggetto.
    *   Restituisce un valore che indica la distanza approssimativa dall'oggetto, solitamente in percentuale (0-100%) o in una scala specifica.
    *   **Range di Rilevamento**: Tipicamente fino a circa 70 cm (circa 27 pollici). L'efficacia può variare in base al colore e alla riflettività dell'oggetto.
    *   Utile per rilevare ostacoli a corto raggio o per attivare azioni quando un oggetto si avvicina.

2.  **Modalità Beacon (Beacon Mode / Seek Mode)**:
    *   Il sensore rileva i segnali emessi dal beacon a infrarossi incluso nel kit EV3.
    *   Il beacon può operare su **quattro canali diversi**. Il sensore deve essere impostato per ascoltare sul canale corretto.
    *   Per ciascun canale, il sensore può restituire:
        *   **Direzione (Heading)**: Un valore approssimativo (es. da -25 a +25) che indica la direzione orizzontale del beacon rispetto al sensore. Un valore di 0 significa che il beacon è approssimativamente di fronte.
        *   **Distanza (Distance/Proximity)**: Un valore approssimativo (es. 0-100) che indica quanto è vicino il beacon. Valori più alti indicano maggiore vicinanza.
    *   Il beacon ha dei pulsanti che, se premuti, inviano un segnale specifico che il sensore può rilevare (es. pulsante superiore premuto).
    *   Questa modalità è utile per far seguire al robot il beacon, per controllo remoto di base, o per localizzare il beacon.

## Utilizzo in MakeCode (JavaScript)

MakeCode offre blocchi e API per entrambe le modalità del sensore IR.

**Esempio per leggere la prossimità:**

```javascript
// Assumendo che il sensore IR sia collegato alla porta 4
let prossimita = sensors.infrared4.proximity(); // Restituisce un valore, es. 0-100
brick.showString("Prossimità: " + prossimita, 1);

if (prossimita > 50) { // Esempio: se un oggetto è abbastanza vicino
    // Fai qualcosa
}
```

**Esempio per leggere la direzione e la distanza dal beacon (Canale 1):**

```javascript
// Assumendo che il sensore IR sia collegato alla porta 4
// Imposta il canale su cui ascoltare (es. Canale 1)
// Nota: la gestione dei canali potrebbe essere implicita o richiedere una configurazione specifica
// a seconda dell'implementazione esatta di MakeCode per questa funzionalità.

// Lettura della direzione (heading) verso il beacon sul canale 1
let direzioneBeacon = sensors.infrared4.beaconHeading(InfraredChannel.Channel1);
// Lettura della distanza (proximity) dal beacon sul canale 1
let distanzaBeacon = sensors.infrared4.beaconProximity(InfraredChannel.Channel1);

brick.showString("Dir: " + direzioneBeacon, 2);
brick.showString("Dist: " + distanzaBeacon, 3);

// Esempio per rilevare se il pulsante superiore del beacon è premuto (Canale 1)
if (sensors.infrared4.wasBeaconButtonPressed(InfraredChannel.Channel1, InfraredBeaconButton.Top)) {
    brick.showString("Beacon Btn Premuto!", 4);
}
```
*Nota: I nomi esatti delle funzioni e delle enum (come `InfraredChannel` e `InfraredBeaconButton`) potrebbero variare leggermente. Fai riferimento alla documentazione specifica di MakeCode per EV3.* 

## Considerazioni Pratiche

*   **Interferenze IR**: La luce solare diretta o altre forti sorgenti di luce infrarossa (come alcuni telecomandi TV) possono interferire con il sensore, specialmente in modalità beacon.
*   **Riflettività degli Oggetti (Modalità Prossimità)**: Oggetti scuri o opachi riflettono meno luce IR e potrebbero apparire più distanti o non essere rilevati correttamente rispetto a oggetti chiari o lucidi.
*   **Angolo di Visione**: Il sensore ha un cono di rilevamento. Il beacon deve trovarsi all'interno di questo cono per essere rilevato efficacemente.
*   **Canali del Beacon**: Assicurati che il beacon sia impostato sullo stesso canale che il sensore sta cercando di leggere. È possibile usare più beacon e sensori su canali diversi per interazioni più complesse.
*   **Batterie del Beacon**: Un beacon con batterie scariche emetterà un segnale più debole, influenzando la distanza di rilevamento.

## Applicazioni Comuni

*   **Evitamento Ostacoli a Corto Raggio**: Simile al sensore a ultrasuoni, ma con un range diverso e sensibilità a superfici diverse.
*   **Robot "Seguimi"**: Il robot segue il beacon IR tenuto da una persona.
*   **Controllo Remoto Semplice**: Utilizzare i pulsanti del beacon per inviare comandi al robot.
*   **Localizzazione**: Il robot cerca e si dirige verso il beacon.
*   **Sistemi di "Guardia"**: Il robot reagisce se un oggetto entra nel suo raggio di prossimità.

Il sensore a infrarossi, con la sua doppia funzionalità, aggiunge un altro livello di interazione e percezione ambientale ai tuoi progetti EV3.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)