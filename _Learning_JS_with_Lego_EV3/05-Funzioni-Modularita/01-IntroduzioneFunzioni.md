# Introduzione alle Funzioni

## Cos'è una Funzione?

Una funzione in JavaScript è un blocco di codice progettato per eseguire un compito specifico. È come una mini-programma all'interno del tuo programma principale, che può essere "chiamato" (eseguito) ogni volta che hai bisogno di eseguire il compito che contiene.

Le funzioni sono uno dei blocchi fondamentali di JavaScript e sono essenziali per creare codice ben organizzato, riutilizzabile e più facile da mantenere. Nella programmazione robotica, le funzioni permettono di suddividere comportamenti complessi in operazioni più semplici e gestibili.

## Sintassi di Base

In JavaScript, puoi definire una funzione in diversi modi. Il modo più comune è utilizzando la dichiarazione di funzione:

```javascript
function nomeFunzione() {
    // Codice da eseguire quando la funzione viene chiamata
    brick.showString("Funzione eseguita!", 1);
}
```

Per eseguire il codice contenuto nella funzione, devi "chiamarla" utilizzando il suo nome seguito da parentesi:

```javascript
nomeFunzione();  // Chiama (esegue) la funzione
```

## Perché Usare le Funzioni?

L'utilizzo delle funzioni offre numerosi vantaggi:

1. **Riutilizzo del codice**: Scrivi il codice una volta, poi richiamalo ogni volta che ti serve.
2. **Modularità**: Suddividi programmi complessi in parti più piccole e gestibili.
3. **Organizzazione**: Mantieni il tuo codice ordinato e logicamente strutturato.
4. **Manutenibilità**: Isola i cambiamenti in componenti specifici senza toccare l'intero programma.
5. **Leggibilità**: Nomi di funzioni significativi rendono il codice più comprensibile.

## Esempio Pratico per EV3

Ecco un esempio pratico di come le funzioni possono migliorare la programmazione di un robot EV3:

```javascript
// Senza funzioni - codice ripetitivo e difficile da mantenere
motors.largeAB.steer(0, 50);
pause(2000);
motors.largeAB.stop();

motors.largeC.run(30, 1, MoveUnit.Rotations);

motors.largeAB.steer(0, 50);
pause(2000);
motors.largeAB.stop();

// Con funzioni - codice organizzato e riutilizzabile
function avanzaDritto() {
    motors.largeAB.steer(0, 50);
    pause(2000);
    motors.largeAB.stop();
}

function gira() {
    motors.largeC.run(30, 1, MoveUnit.Rotations);
}

// Il programma principale diventa più leggibile
avanzaDritto();
gira();
avanzaDritto();
```

## Dichiarazione vs Espressione di Funzione

In JavaScript, esistono principalmente due modi per definire una funzione:

### 1. Dichiarazione di Funzione

```javascript
function saluta() {
    brick.showString("Ciao!", 1);
}
```

Le dichiarazioni di funzione vengono "sollevate" (hoisted) all'inizio del loro contesto di esecuzione, il che significa che puoi chiamare la funzione anche prima di averla dichiarata nel codice.

### 2. Espressione di Funzione

```javascript
let saluta = function() {
    brick.showString("Ciao!", 1);
};
```

Le espressioni di funzione non vengono sollevate, quindi devi definirle prima di chiamarle. Nota il punto e virgola alla fine, poiché si tratta di un'assegnazione.

## Funzioni come Blocchi di Costruzione per i Robot

Nella programmazione dei robot EV3, le funzioni possono rappresentare comportamenti o azioni specifiche:

```javascript
function avanzaFinoAllaLinea() {
    while (sensors.color1.light() > 20) {  // Finché non rileva una linea scura
        motors.largeAB.steer(0, 30);  // Avanza dritto
    }
    motors.largeAB.stop();
}

function eseguiGiroA90Gradi() {
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(500);  // Breve pausa per stabilizzare
}

function emettiSuonoCompletamento() {
    music.playTone(440, 500);  // La a 440Hz per mezzo secondo
    pause(100);
    music.playTone(880, 500);  // La un'ottava sopra
}

// Programma principale che utilizza queste funzioni
function eseguiMissione() {
    avanzaFinoAllaLinea();
    eseguiGiroA90Gradi();
    avanzaFinoAllaLinea();
    emettiSuonoCompletamento();
}

// Avvia la missione
eseguiMissione();
```

## Incapsulamento delle Azioni del Robot

Le funzioni permettono di incapsulare azioni complesse in un singolo comando con un nome descrittivo. Questo rende il codice più facile da comprendere e modificare:

```javascript
// Funzione che implementa il comportamento di seguire una linea
function seguiLinea(velocita, durata) {
    let tempoInizio = control.millis();
    
    while (control.millis() - tempoInizio < durata) {
        // Leggi il valore di luce dal sensore
        let valoreLuce = sensors.color1.light();
        
        if (valoreLuce < 30) {  // Superficie scura (linea)
            // Sterza leggermente a destra
            motors.largeA.run(velocita * 0.7);
            motors.largeB.run(velocita);
        } else {  // Superficie chiara
            // Sterza leggermente a sinistra
            motors.largeA.run(velocita);
            motors.largeB.run(velocita * 0.7);
        }
        
        pause(10);  // Piccola pausa per non sovraccaricare il sistema
    }
    
    motors.largeAB.stop();
}

// Ora puoi seguire una linea con un semplice comando:
seguiLinea(30, 5000);  // Segui la linea a velocità 30 per 5 secondi
```

## Best Practices nella Creazione di Funzioni

1. **Nomi Descrittivi**: Usa nomi che descrivono chiaramente cosa fa la funzione (`avanzaFinoAllaLinea` è meglio di `muovi`).

2. **Principio di Responsabilità Singola**: Ogni funzione dovrebbe fare una cosa sola, ma farla bene.

3. **Lunghezza Moderata**: Se una funzione diventa troppo lunga, considera di dividerla in funzioni più piccole.

4. **Commenti Utili**: Aggiungi commenti che spiegano il "perché" piuttosto che il "cosa" (il codice stesso dovrebbe essere sufficientemente chiaro per spiegare il "cosa").

5. **Funzioni Pure**: Quando possibile, cerca di creare funzioni che non modificano variabili esterne e hanno risultati prevedibili per gli stessi input.

## Funzioni nel Contesto MakeCode per EV3

MakeCode per EV3 supporta pienamente l'uso delle funzioni JavaScript. Puoi definire funzioni sia nell'editor JavaScript che utilizzando i blocchi nella modalità grafica.

Nell'editor a blocchi, le funzioni appaiono come puzzle con ingranaggi, evidenziando il loro ruolo come componenti riutilizzabili del programma.

## Conclusione

Le funzioni sono uno strumento potente che ti permette di organizzare il tuo codice in componenti logici, facilitando la creazione di programmi complessi e mantenibili per il tuo robot EV3. Piuttosto che scrivere lunghe sequenze di istruzioni, puoi suddividere il tuo programma in blocchi funzionali più piccoli e riutilizzabili.

Mentre continui a esplorare la programmazione con JavaScript e EV3, scoprirai che le funzioni ben progettate sono la base di qualsiasi programma robusto e scalabile.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Panoramica del Modulo](README.md)
- [➡️ Parametri e Valori di Ritorno](02-ParametriReturn.md)