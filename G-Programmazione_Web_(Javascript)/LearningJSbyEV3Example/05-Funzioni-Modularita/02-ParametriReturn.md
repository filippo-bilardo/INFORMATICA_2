# Parametri e Valori di Ritorno

## Introduzione ai Parametri

I parametri sono un modo per passare informazioni a una funzione. Funzionano come variabili locali all'interno della funzione e permettono di personalizzare il comportamento della funzione in base ai valori forniti.

Nella programmazione robotica, i parametri sono particolarmente utili per creare funzioni flessibili che possono essere riutilizzate in diversi contesti, come ad esempio una funzione di movimento che può accettare diverse velocità o durate.

## Sintassi dei Parametri

In JavaScript, i parametri vengono definiti tra parentesi dopo il nome della funzione:

```javascript
function nomeFunzione(parametro1, parametro2, parametro3) {
    // Codice che utilizza i parametri
}
```

Quando chiami la funzione, passi i valori (argomenti) per questi parametri:

```javascript
nomeFunzione(valore1, valore2, valore3);
```

## Esempio Pratico con EV3

Ecco come utilizzare i parametri per rendere più flessibile una funzione di movimento per il robot EV3:

```javascript
// Funzione senza parametri - comportamento fisso
function avanzaDritto() {
    motors.largeAB.steer(0, 50);  // Velocità fissa di 50
    pause(2000);                  // Durata fissa di 2 secondi
    motors.largeAB.stop();
}

// Funzione con parametri - comportamento personalizzabile
function avanzaDrittoPersonalizzato(velocita, durata) {
    motors.largeAB.steer(0, velocita);
    pause(durata);
    motors.largeAB.stop();
}

// Ora puoi chiamare la funzione con diverse velocità e durate
avanzaDrittoPersonalizzato(30, 1000);  // Lentamente per 1 secondo
avanzaDrittoPersonalizzato(70, 3000);  // Velocemente per 3 secondi
```

## Parametri di Default

JavaScript permette di specificare valori predefiniti per i parametri, che vengono utilizzati quando un argomento non viene fornito:

```javascript
function avanzaDrittoConDefault(velocita = 50, durata = 2000) {
    motors.largeAB.steer(0, velocita);
    pause(durata);
    motors.largeAB.stop();
}

// Esempi di chiamata
avanzaDrittoConDefault();          // Usa velocità 50 e durata 2000
avanzaDrittoConDefault(30);        // Usa velocità 30 e durata 2000
avanzaDrittoConDefault(70, 3000);  // Usa velocità 70 e durata 3000
```

## Valori di Ritorno

Oltre a ricevere dati tramite parametri, le funzioni possono anche restituire dati utilizzando l'istruzione `return`. Questo permette alle funzioni di calcolare un valore o ottenere un risultato e passarlo al codice chiamante.

### Sintassi del Return

```javascript
function nomeFunzione(parametri) {
    // Codice che elabora i dati
    return risultato;  // Restituisce un valore
}

// Il valore restituito può essere assegnato a una variabile
let risultato = nomeFunzione(argomenti);
```

## Esempio di Funzioni con Return per EV3

Ecco alcuni esempi di come utilizzare i valori di ritorno nelle funzioni per il robot EV3:

```javascript
// Funzione che legge il sensore e restituisce un valore booleano
function rilevaOstacolo(distanzaMinima = 15) {
    let distanzaAttuale = sensors.ultrasonic4.distance();
    return distanzaAttuale < distanzaMinima;  // Restituisce true o false
}

// Funzione che calcola e restituisce una velocità raccomandata
function calcolaVelocitaSicura() {
    let distanza = sensors.ultrasonic4.distance();
    
    if (distanza < 10) {
        return 0;  // Fermarsi se l'ostacolo è molto vicino
    } else if (distanza < 30) {
        return 20;  // Velocità ridotta se c'è un ostacolo nelle vicinanze
    } else {
        return 50;  // Velocità normale se il percorso è libero
    }
}

// Utilizzo di queste funzioni
if (rilevaOstacolo()) {
    brick.showString("Ostacolo rilevato!", 1);
    motors.largeAB.stop();
} else {
    let velocitaRaccomandata = calcolaVelocitaSicura();
    brick.showValue("Velocità", velocitaRaccomandata, 1);
    motors.largeAB.steer(0, velocitaRaccomandata);
}
```

## Return Anticipato

L'istruzione `return` termina immediatamente l'esecuzione della funzione e restituisce il valore specificato. Questo è utile per creare uscite condizionali da una funzione:

```javascript
function controllaAmbiente() {
    // Verifica la luce ambientale
    let livelloLuce = sensors.color1.light();
    if (livelloLuce < 10) {
        brick.showString("Troppo buio", 1);
        return false;  // Esce dalla funzione con un valore negativo
    }
    
    // Verifica la distanza
    let distanza = sensors.ultrasonic4.distance();
    if (distanza < 5) {
        brick.showString("Ostacolo troppo vicino", 1);
        return false;  // Esce dalla funzione con un valore negativo
    }
    
    // Se arriviamo qui, le condizioni sono buone
    brick.showString("Ambiente OK", 1);
    return true;  // Esce dalla funzione con un valore positivo
}

// Utilizzo
if (controllaAmbiente()) {
    // Procedi con l'operazione
    motors.largeAB.steer(0, 50);
} else {
    // Segnala un errore
    music.playTone(262, 500);  // Suona un Do per mezzo secondo
}
```

## Combinazione di Parametri e Return

La vera potenza delle funzioni si manifesta quando combini parametri e valori di ritorno per creare componenti versatili e riutilizzabili:

```javascript
// Funzione che calcola la distanza percorsa in base a velocità e tempo
function calcolaDistanzaPercorsa(velocita, tempoInSecondi) {
    // Semplificazione: supponiamo che la velocità sia in cm/s
    return velocita * tempoInSecondi;
}

// Funzione che determina il tempo necessario per percorrere una distanza
function calcolaTempoNecessario(distanza, velocita) {
    if (velocita <= 0) {
        return -1;  // Ritorna un valore negativo per indicare un errore
    }
    
    return distanza / velocita;  // Tempo = distanza / velocità
}

// Esempio di utilizzo
let velocitaRobot = 30;  // cm/s
let distanzaDaPercorrere = 100;  // cm

let tempoNecessario = calcolaTempoNecessario(distanzaDaPercorrere, velocitaRobot);
brick.showValue("Tempo (s)", tempoNecessario, 1);

// Muovi il robot per quel tempo
motors.largeAB.steer(0, velocitaRobot);
pause(tempoNecessario * 1000);  // Converti secondi in millisecondi
motors.largeAB.stop();

// Verifica la distanza effettivamente percorsa
let distanzaEffettiva = calcolaDistanzaPercorsa(velocitaRobot, tempoNecessario);
brick.showValue("Distanza (cm)", distanzaEffettiva, 2);
```

## Funzioni che Restituiscono Oggetti

In JavaScript, le funzioni possono restituire oggetti complessi, che sono utili per raggruppare più valori correlati:

```javascript
// Funzione che legge e restituisce tutti i valori dei sensori
function leggiSensori() {
    return {
        distanza: sensors.ultrasonic4.distance(),
        luce: sensors.color1.light(),
        colore: sensors.color1.color(),
        temperatura: brick.temperature()
    };
}

// Utilizzo
let datiSensori = leggiSensori();
brick.showValue("Distanza", datiSensori.distanza, 1);
brick.showValue("Luce", datiSensori.luce, 2);
brick.showValue("Colore", datiSensori.colore, 3);
brick.showValue("Temp", datiSensori.temperatura, 4);
```

## Best Practices per Parametri e Return

1. **Nomi Chiari**: Usa nomi descrittivi per i parametri che indicano il loro scopo.

2. **Validazione degli Input**: Verifica sempre che i parametri siano validi all'inizio della funzione.

3. **Valori di Default Sensati**: Quando usi valori predefiniti, sceglili in modo che la funzione funzioni in modo sicuro e prevedibile con essi.

4. **Limitare il Numero di Parametri**: Se una funzione richiede molti parametri (più di 3-4), considera di raggrupparli in un oggetto.

5. **Documentazione**: Commenta brevemente cosa fa la funzione, cosa significano i parametri e cosa restituisce.

6. **Valori di Ritorno Coerenti**: Assicurati che una funzione restituisca sempre lo stesso tipo di dato, o gestisca esplicitamente i casi speciali.

## Conclusione

I parametri e i valori di ritorno sono strumenti fondamentali che rendono le funzioni versatili e potenti. Nella programmazione robotica con EV3, ti permettono di:

- Creare librerie di funzioni riutilizzabili che possono essere adattate a diverse situazioni
- Incapsulare la logica di lettura dei sensori e restituire informazioni elaborate
- Implementare comportamenti complessi attraverso funzioni che si chiamano tra loro, ciascuna con uno scopo specifico

Padroneggiare l'uso dei parametri e dei valori di ritorno ti permetterà di scrivere codice più modulare, flessibile e facile da mantenere per i tuoi progetti robotici.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Introduzione alle Funzioni](01-IntroduzioneFunzioni.md)
- [➡️ Scope e Visibilità delle Variabili](03-ScopeVisibilita.md)