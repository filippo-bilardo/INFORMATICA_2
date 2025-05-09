# Pulsanti del Brick EV3

## Introduzione

I pulsanti del brick EV3 rappresentano uno dei metodi di input più diretti e semplici per interagire con il robot. In questo capitolo, esploreremo come utilizzare i pulsanti integrati nel brick EV3 per creare interfacce utente interattive e controllare il comportamento del robot.

## I Pulsanti del Brick EV3

Il brick EV3 è dotato di sei pulsanti fisici:

1. **Pulsante Centrale** (Enter): Utilizzato principalmente per confermare selezioni o avviare programmi
2. **Pulsante Indietro** (Escape): Utilizzato per annullare operazioni o tornare indietro nei menu
3. **Pulsanti Direzionali**: Quattro pulsanti (Su, Giù, Sinistra, Destra) utilizzati per navigare nei menu o controllare il robot

## Rilevamento della Pressione dei Pulsanti in JavaScript

In MakeCode per EV3, puoi rilevare la pressione dei pulsanti utilizzando l'oggetto `brick.button` seguito dal nome del pulsante specifico. Ecco come accedere ai vari pulsanti:

```javascript
// Riferimenti ai pulsanti
let pulsanteEnter = brick.buttonEnter;
let pulsanteEscape = brick.buttonExit;
let pulsanteSu = brick.buttonUp;
let pulsanteGiu = brick.buttonDown;
let pulsanteSinistra = brick.buttonLeft;
let pulsanteDestra = brick.buttonRight;
```

## Metodi per il Rilevamento dei Pulsanti

Per ogni pulsante, sono disponibili diversi metodi per rilevare lo stato:

### 1. Controllo dello Stato Attuale

```javascript
// Verifica se un pulsante è attualmente premuto
if (brick.buttonEnter.isPressed()) {
    // Codice da eseguire quando il pulsante è premuto
}
```

### 2. Rilevamento di Nuove Pressioni

```javascript
// Verifica se un pulsante è stato premuto dall'ultima volta che è stato controllato
if (brick.buttonEnter.wasPressed()) {
    // Codice da eseguire quando viene rilevata una nuova pressione
}
```

Il metodo `wasPressed()` è particolarmente utile perché rileva solo le nuove pressioni, evitando che lo stesso evento venga rilevato più volte in un ciclo.

## Esempi di Utilizzo

### Esempio 1: Attesa della Pressione di un Pulsante

```javascript
// Mostra un messaggio e attendi che l'utente prema il pulsante Enter
brick.showString("Premi Enter per iniziare", 1);

while (!brick.buttonEnter.wasPressed()) {
    pause(50); // Piccola pausa per non sovraccaricare il processore
}

brick.showString("Programma avviato!", 1);
```

### Esempio 2: Menu di Selezione Semplice

```javascript
let opzioni = ["Programma 1", "Programma 2", "Programma 3"];
let selezioneAttuale = 0;

// Funzione per visualizzare il menu
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString("Seleziona un programma:", 0);
    
    for (let i = 0; i < opzioni.length; i++) {
        // Evidenzia l'opzione selezionata
        if (i === selezioneAttuale) {
            brick.showString("> " + opzioni[i], i + 1);
        } else {
            brick.showString("  " + opzioni[i], i + 1);
        }
    }
}

// Loop principale del menu
visualizzaMenu();

while (true) {
    // Naviga su
    if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
        selezioneAttuale--;
        visualizzaMenu();
    }
    
    // Naviga giù
    if (brick.buttonDown.wasPressed() && selezioneAttuale < opzioni.length - 1) {
        selezioneAttuale++;
        visualizzaMenu();
    }
    
    // Conferma selezione
    if (brick.buttonEnter.wasPressed()) {
        brick.clearScreen();
        brick.showString("Hai selezionato:", 0);
        brick.showString(opzioni[selezioneAttuale], 1);
        break;
    }
    
    pause(50); // Piccola pausa
}
```

### Esempio 3: Controllo Diretto del Robot

```javascript
// Configurazione dei motori
let motoreSinistro = motors.largeA;
let motoreDestro = motors.largeB;
let velocita = 50;

brick.showString("Controllo con pulsanti", 0);
brick.showString("Su: avanti", 1);
brick.showString("Giu: indietro", 2);
brick.showString("Sx/Dx: rotazione", 3);
brick.showString("Exit: termina", 4);

// Loop di controllo
while (true) {
    // Avanti
    if (brick.buttonUp.isPressed()) {
        motoreSinistro.run(velocita);
        motoreDestro.run(velocita);
    }
    // Indietro
    else if (brick.buttonDown.isPressed()) {
        motoreSinistro.run(-velocita);
        motoreDestro.run(-velocita);
    }
    // Sinistra
    else if (brick.buttonLeft.isPressed()) {
        motoreSinistro.run(-velocita);
        motoreDestro.run(velocita);
    }
    // Destra
    else if (brick.buttonRight.isPressed()) {
        motoreSinistro.run(velocita);
        motoreDestro.run(-velocita);
    }
    // Ferma se nessun pulsante è premuto
    else {
        motoreSinistro.stop();
        motoreDestro.stop();
    }
    
    // Esci dal programma
    if (brick.buttonExit.wasPressed()) {
        break;
    }
    
    pause(10); // Piccola pausa
}

// Ferma i motori quando il programma termina
motoreSinistro.stop();
motoreDestro.stop();
brick.showString("Programma terminato", 1);
```

## Combinazione con Altri Elementi di Interfaccia

I pulsanti del brick sono spesso utilizzati in combinazione con il display e altri elementi di feedback per creare interfacce utente complete. Ecco alcuni pattern comuni:

1. **Menu di Navigazione**: Utilizzare i pulsanti Su/Giù per navigare tra le opzioni e il pulsante Enter per selezionare
2. **Regolazione Parametri**: Utilizzare i pulsanti Sinistra/Destra per diminuire/aumentare valori
3. **Controllo Diretto**: Utilizzare i pulsanti direzionali per controllare direttamente i movimenti del robot
4. **Conferma/Annulla**: Utilizzare Enter per confermare e Escape per annullare operazioni

## Considerazioni sulla User Experience

Quando progetti interfacce basate sui pulsanti, considera questi aspetti:

1. **Feedback Chiaro**: Fornisci sempre un feedback visivo o sonoro quando un pulsante viene premuto
2. **Istruzioni Visibili**: Mostra sul display quali pulsanti sono disponibili e cosa fanno
3. **Consistenza**: Mantieni coerenti le funzioni dei pulsanti in tutto il programma
4. **Semplicità**: Limita il numero di operazioni possibili per evitare confusione

## Esercizi Proposti

1. **Menu Multilivello**: Crea un sistema di menu con sottomenu navigabili
2. **Configuratore**: Implementa un'interfaccia per configurare parametri del robot (velocità, sensibilità sensori, ecc.)
3. **Gioco Semplice**: Crea un gioco che utilizza i pulsanti come controlli (es. un semplice gioco di riflessi)

---

**Prossimo Capitolo**: [Feedback Sonoro](03-FeedbackSonoro.md)

**Capitolo Precedente**: [Display EV3](01-DisplayEV3.md)

[Torna all'indice del modulo](README.md)