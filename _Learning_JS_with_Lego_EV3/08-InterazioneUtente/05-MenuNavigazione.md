# Menu e Navigazione

## Introduzione

La creazione di menu interattivi è un aspetto fondamentale per sviluppare interfacce utente efficaci nei robot EV3. In questo capitolo, esploreremo come progettare e implementare sistemi di menu che permettano all'utente di navigare tra diverse opzioni e controllare il comportamento del robot in modo intuitivo.

## Concetti Fondamentali dei Menu

Un sistema di menu efficace per EV3 dovrebbe considerare i seguenti aspetti:

1. **Semplicità**: Data la limitata risoluzione del display e i pochi pulsanti disponibili
2. **Chiarezza**: Indicazioni visive chiare su quale opzione è selezionata
3. **Navigabilità**: Facile movimento tra le opzioni e i livelli del menu
4. **Feedback**: Conferma visiva e/o sonora delle selezioni

## Strutture di Menu Comuni

### Menu Lineare

Il tipo più semplice di menu, con opzioni disposte in sequenza verticale:

```
> Opzione 1
  Opzione 2
  Opzione 3
```

### Menu Gerarchico

Menu con sottomenu, che permettono di organizzare le opzioni in categorie:

```
> Categoria 1
  Categoria 2
  Categoria 3

[Selezionando Categoria 1]
> Opzione 1.1
  Opzione 1.2
  Indietro
```

### Menu a Griglia

Utile quando si hanno molte opzioni e si vogliono utilizzare sia i pulsanti verticali che orizzontali:

```
> [Opzione 1] [Opzione 2]
  [Opzione 3] [Opzione 4]
```

## Implementazione di Menu in JavaScript

### Esempio 1: Menu Lineare Semplice

```javascript
// Definizione delle opzioni del menu
let opzioni = ["Programma 1", "Programma 2", "Programma 3", "Impostazioni"];
let selezioneAttuale = 0;

// Funzione per visualizzare il menu
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString("Menu Principale:", 0);
    
    for (let i = 0; i < opzioni.length; i++) {
        // Evidenzia l'opzione selezionata
        if (i === selezioneAttuale) {
            brick.showString("> " + opzioni[i], i + 1);
        } else {
            brick.showString("  " + opzioni[i], i + 1);
        }
    }
}

// Funzione per gestire la selezione
function gestisciSelezione() {
    brick.clearScreen();
    brick.showString("Hai selezionato:", 0);
    brick.showString(opzioni[selezioneAttuale], 1);
    
    // Feedback sonoro di conferma
    music.playTone(880, 200);
    
    // Simula l'esecuzione dell'opzione selezionata
    pause(2000);
    
    // Ritorna al menu
    visualizzaMenu();
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
        gestisciSelezione();
    }
    
    pause(50); // Piccola pausa per non sovraccaricare il processore
}
```

### Esempio 2: Menu Gerarchico

```javascript
// Definizione della struttura del menu
let menuPrincipale = {
    titolo: "Menu Principale",
    opzioni: [
        { nome: "Programmi", tipo: "sottomenu", riferimento: "menuProgrammi" },
        { nome: "Sensori", tipo: "sottomenu", riferimento: "menuSensori" },
        { nome: "Impostazioni", tipo: "sottomenu", riferimento: "menuImpostazioni" },
        { nome: "Info", tipo: "azione", azione: mostraInfo }
    ]
};

let menuProgrammi = {
    titolo: "Programmi",
    opzioni: [
        { nome: "Segui Linea", tipo: "azione", azione: avviaSeguilinea },
        { nome: "Evita Ostacoli", tipo: "azione", azione: avviaEvitaOstacoli },
        { nome: "Telecomando", tipo: "azione", azione: avviaTelecomando },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuSensori = {
    titolo: "Sensori",
    opzioni: [
        { nome: "Test Ultrasuoni", tipo: "azione", azione: testUltrasuoni },
        { nome: "Test Colore", tipo: "azione", azione: testColore },
        { nome: "Test Tocco", tipo: "azione", azione: testTocco },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuImpostazioni = {
    titolo: "Impostazioni",
    opzioni: [
        { nome: "Volume", tipo: "azione", azione: impostaVolume },
        { nome: "Luminosità", tipo: "azione", azione: impostaLuminosita },
        { nome: "Velocità", tipo: "azione", azione: impostaVelocita },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

// Variabili di stato del menu
let menuAttuale = menuPrincipale;
let menuPrecedente = null;
let selezioneAttuale = 0;

// Funzione per visualizzare il menu corrente
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString(menuAttuale.titolo + ":", 0);
    
    for (let i = 0; i < menuAttuale.opzioni.length; i++) {
        // Evidenzia l'opzione selezionata
        if (i === selezioneAttuale) {
            brick.showString("> " + menuAttuale.opzioni[i].nome, i + 1);
        } else {
            brick.showString("  " + menuAttuale.opzioni[i].nome, i + 1);
        }
    }
}

// Funzione per gestire la selezione
function gestisciSelezione() {
    let opzioneSelezionata = menuAttuale.opzioni[selezioneAttuale];
    
    if (opzioneSelezionata.tipo === "sottomenu") {
        // Naviga al sottomenu
        menuPrecedente = menuAttuale;
        menuAttuale = eval(opzioneSelezionata.riferimento); // Nota: eval è usato per semplicità
        selezioneAttuale = 0;
        visualizzaMenu();
    } else if (opzioneSelezionata.tipo === "indietro") {
        // Torna al menu precedente
        if (menuPrecedente) {
            menuAttuale = menuPrecedente;
            menuPrecedente = menuPrincipale; // Semplificazione
            selezioneAttuale = 0;
            visualizzaMenu();
        }
    } else if (opzioneSelezionata.tipo === "azione") {
        // Esegui l'azione associata
        opzioneSelezionata.azione();
    }
}

// Funzioni di esempio per le azioni
function mostraInfo() {
    brick.clearScreen();
    brick.showString("EV3 Menu Demo", 0);
    brick.showString("Versione 1.0", 1);
    brick.showString("Premi Indietro", 3);
    brick.showString("per tornare", 4);
    
    // Attendi che l'utente prema il pulsante indietro
    while (!brick.buttonExit.wasPressed()) {
        pause(50);
    }
    
    visualizzaMenu();
}

function avviaSeguilinea() {
    brick.clearScreen();
    brick.showString("Avvio Seguilinea...", 1);
    pause(2000);
    visualizzaMenu();
}

function avviaEvitaOstacoli() {
    brick.clearScreen();
    brick.showString("Avvio Evita Ostacoli...", 1);
    pause(2000);
    visualizzaMenu();
}

function avviaTelecomando() {
    brick.clearScreen();
    brick.showString("Avvio Telecomando...", 1);
    pause(2000);
    visualizzaMenu();
}

function testUltrasuoni() {
    brick.clearScreen();
    brick.showString("Test Ultrasuoni...", 1);
    pause(2000);
    visualizzaMenu();
}

function testColore() {
    brick.clearScreen();
    brick.showString("Test Colore...", 1);
    pause(2000);
    visualizzaMenu();
}

function testTocco() {
    brick.clearScreen();
    brick.showString("Test Tocco...", 1);
    pause(2000);
    visualizzaMenu();
}

function impostaVolume() {
    brick.clearScreen();
    brick.showString("Impostazione Volume...", 1);
    pause(2000);
    visualizzaMenu();
}

function impostaLuminosita() {
    brick.clearScreen();
    brick.showString("Impostazione Luminosità...", 1);
    pause(2000);
    visualizzaMenu();
}

function impostaVelocita() {
    brick.clearScreen();
    brick.showString("Impostazione Velocità...", 1);
    pause(2000);
    visualizzaMenu();
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
    if (brick.buttonDown.wasPressed() && selezioneAttuale < menuAttuale.opzioni.length - 1) {
        selezioneAttuale++;
        visualizzaMenu();
    }
    
    // Conferma selezione
    if (brick.buttonEnter.wasPressed()) {
        gestisciSelezione();
    }
    
    // Torna indietro (scorciatoia)
    if (brick.buttonExit.wasPressed() && menuPrecedente) {
        menuAttuale = menuPrecedente;
        menuPrecedente = menuPrincipale; // Semplificazione
        selezioneAttuale = 0;
        visualizzaMenu();
    }
    
    pause(50); // Piccola pausa
}
```

### Esempio 3: Menu con Parametri Regolabili

```javascript
// Definizione dei parametri regolabili
let parametri = {
    velocita: 50,  // Valore da 0 a 100
    sensibilita: 3, // Valore da 1 a 5
    volume: 75     // Valore da 0 a 100
};

// Definizione delle opzioni del menu
let opzioni = ["Velocità", "Sensibilità", "Volume", "Salva ed Esci"];
let selezioneAttuale = 0;

// Funzione per visualizzare il menu
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString("Impostazioni:", 0);
    
    // Visualizza le opzioni con i valori attuali
    brick.showString(selezioneAttuale === 0 ? "> Velocità: " + parametri.velocita : "  Velocità: " + parametri.velocita, 1);
    brick.showString(selezioneAttuale === 1 ? "> Sensibilità: " + parametri.sensibilita : "  Sensibilità: " + parametri.sensibilita, 2);
    brick.showString(selezioneAttuale === 2 ? "> Volume: " + parametri.volume : "  Volume: " + parametri.volume, 3);
    brick.showString(selezioneAttuale === 3 ? "> Salva ed Esci" : "  Salva ed Esci", 4);
}

// Funzione per regolare i parametri
function regolaParametro(incremento) {
    if (selezioneAttuale === 0) {
        // Regola velocità (0-100)
        parametri.velocita = Math.max(0, Math.min(100, parametri.velocita + incremento));
    } else if (selezioneAttuale === 1) {
        // Regola sensibilità (1-5)
        parametri.sensibilita = Math.max(1, Math.min(5, parametri.sensibilita + incremento));
    } else if (selezioneAttuale === 2) {
        // Regola volume (0-100)
        parametri.volume = Math.max(0, Math.min(100, parametri.volume + incremento));
        // Applica immediatamente il cambio di volume
        music.setVolume(parametri.volume);
        // Feedback sonoro
        music.playTone(440, 100);
    }
    
    visualizzaMenu();
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
    
    // Aumenta valore (destra)
    if (brick.buttonRight.wasPressed() && selezioneAttuale < 3) {
        let incremento = selezioneAttuale === 1 ? 1 : 5; // Incremento più piccolo per la sensibilità
        regolaParametro(incremento);
    }
    
    // Diminuisci valore (sinistra)
    if (brick.buttonLeft.wasPressed() && selezioneAttuale < 3) {
        let incremento = selezioneAttuale === 1 ? -1 : -5; // Decremento più piccolo per la sensibilità
        regolaParametro(incremento);
    }
    
    // Conferma selezione (per Salva ed Esci)
    if (brick.buttonEnter.wasPressed() && selezioneAttuale === 3) {
        brick.clearScreen();
        brick.showString("Impostazioni salvate!", 1);
        music.playTone(880, 200);
        pause(100);
        music.playTone(988, 400);
        break; // Esci dal loop
    }
    
    pause(50); // Piccola pausa
}
```

## Best Practices per la Progettazione di Menu

### 1. Organizzazione Logica

Organizza le opzioni in modo logico, raggruppando funzionalità correlate e posizionando le opzioni più utilizzate in posizioni facilmente accessibili.

### 2. Feedback Chiaro

Fornisci sempre un feedback visivo e/o sonoro quando l'utente naviga tra le opzioni o effettua una selezione.

### 3. Navigazione Intuitiva

Utilizza i pulsanti in modo coerente: Su/Giù per navigare tra le opzioni, Destra/Sinistra per modificare valori, Enter per confermare, Escape per tornare indietro.

### 4. Indicatori Visivi

Utilizza indicatori visivi chiari (come il simbolo ">") per mostrare quale opzione è attualmente selezionata.

### 5. Scorciatoie

Quando possibile, implementa scorciatoie per operazioni comuni, come il pulsante Escape per tornare al menu precedente.

### 6. Persistenza

Se il menu include impostazioni, considera di salvarle nella memoria del brick per mantenerle tra un'esecuzione e l'altra del programma.

## Pattern di Implementazione Avanzati

### Menu Basati su Oggetti

Per menu più complessi, considera un approccio basato su oggetti:

```javascript
class MenuOpzione {
    constructor(nome, azione) {
        this.nome = nome;
        this.azione = azione;
    }
    
    esegui() {
        this.azione();
    }
}

class Menu {
    constructor(titolo, opzioni) {
        this.titolo = titolo;
        this.opzioni = opzioni;
        this.selezioneAttuale = 0;
    }
    
    visualizza() {
        brick.clearScreen();
        brick.showString(this.titolo + ":", 0);
        
        for (let i = 0; i < this.opzioni.length; i++) {
            if (i === this.selezioneAttuale) {
                brick.showString("> " + this.opzioni[i].nome, i + 1);
            } else {
                brick.showString("  " + this.opzioni[i].nome, i + 1);
            }
        }
    }
    
    selezionaSuccessivo() {
        if (this.selezioneAttuale < this.opzioni.length - 1) {
            this.selezioneAttuale++;
            this.visualizza();
        }
    }
    
    selezionaPrecedente() {
        if (this.selezioneAttuale > 0) {
            this.selezioneAttuale--;
            this.visualizza();
        }
    }
    
    eseguiSelezione() {
        this.opzioni[this.selezioneAttuale].esegui();
    }
}

// Esempio di utilizzo
let menuPrincipale = new Menu("Menu Principale", [
    new MenuOpzione("Opzione 1", () => {
        brick.showString("Hai selezionato Opzione 1", 1);
        pause(2000);
        menuPrincipale.visualizza();
    }),
    new MenuOpzione("Opzione 2", () => {
        brick.showString("Hai selezionato Opzione 2", 1);
        pause(2000);
        menuPrincipale.visualizza();
    }),
    new MenuOpzione("Esci", () => {
        brick.showString("Uscita dal programma", 1);
        pause(1000);
    })
]);

// Loop principale
menuPrincipale.visualizza();

while (true) {
    if (brick.buttonUp.wasPressed()) {
        menuPrincipale.selezionaPrecedente();
    }
    
    if (brick.buttonDown.wasPressed()) {
        menuPrincipale.selezionaSuccessivo();
    }
    
    if (brick.buttonEnter.wasPressed()) {
        menuPrincipale.eseguiSelezione();
    }
    
    pause(50);
}
```

## Esercizi Proposti

1. **Menu Multilivello**: Crea un sistema di menu con almeno tre livelli di profondità
2. **Menu di Configurazione**: Implementa un menu che permetta di configurare diversi parametri del robot
3. **Menu con Feedback Multimodale**: Crea un menu che utilizzi feedback visivi, sonori e LED per migliorare l'esperienza utente
4. **Menu Contestuale**: Implementa un menu che cambi le opzioni disponibili in base allo stato del robot

---

**Prossimo Capitolo**: [Interfacce Multimodali](06-InterfacceMultimodali.md)

**Capitolo Precedente**: [Indicatori LED](04-IndicatoriLED.md)

[Torna all'indice del modulo](README.md)