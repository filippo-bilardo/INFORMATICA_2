# Indicatori LED

## Introduzione

Gli indicatori LED del brick EV3 rappresentano un importante canale di comunicazione visiva tra il robot e l'utente. In questo capitolo, esploreremo come utilizzare i LED di stato del brick EV3 per fornire feedback visivi che complementano altre forme di interazione e migliorano l'esperienza utente complessiva.

## I LED del Brick EV3

Il brick EV3 è dotato di LED di stato posizionati intorno al pulsante centrale. Questi LED possono illuminarsi in diversi colori e modalità:

1. **Verde**: Generalmente indica uno stato normale o di pronto
2. **Arancione**: Spesso utilizzato per stati di avviso o attesa
3. **Rosso**: Tipicamente utilizzato per segnalare errori o stati critici
4. **Verde lampeggiante**: Indica processi in corso
5. **Rosso lampeggiante**: Segnala errori gravi o situazioni che richiedono attenzione immediata
6. **Arancione lampeggiante**: Indica stati di avviso o transizione

## Controllo dei LED in JavaScript

In MakeCode per EV3, puoi controllare i LED di stato utilizzando l'oggetto `brick` e la funzione `setStatusLight`. Ecco come impostare diversi colori:

```javascript
// Imposta il LED su verde (stato normale)
brick.setStatusLight(StatusLight.Green);

// Imposta il LED su arancione (stato di avviso)
brick.setStatusLight(StatusLight.Orange);

// Imposta il LED su rosso (stato di errore)
brick.setStatusLight(StatusLight.Red);

// Spegne il LED
brick.setStatusLight(StatusLight.Off);
```

Per creare effetti lampeggianti, puoi alternare i colori o utilizzare le modalità lampeggianti predefinite:

```javascript
// LED verde lampeggiante
brick.setStatusLight(StatusLight.GreenFlash);

// LED rosso lampeggiante
brick.setStatusLight(StatusLight.RedFlash);

// LED arancione lampeggiante
brick.setStatusLight(StatusLight.OrangeFlash);
```

## Pattern di Utilizzo dei LED

Ecco alcuni pattern comuni per l'utilizzo dei LED di stato:

### 1. Indicazione di Stato del Sistema

```javascript
// Funzione per aggiornare il LED in base allo stato del sistema
function aggiornaStatoLED(livelloBatteria) {
    if (livelloBatteria > 50) {
        // Batteria buona
        brick.setStatusLight(StatusLight.Green);
    } else if (livelloBatteria > 20) {
        // Batteria in esaurimento
        brick.setStatusLight(StatusLight.Orange);
    } else {
        // Batteria quasi scarica
        brick.setStatusLight(StatusLight.RedFlash);
    }
}

// Utilizzo in un programma
let livelloBatteria = 30; // Simulazione livello batteria
aggiornaStatoLED(livelloBatteria);
```

### 2. Feedback per Azioni Utente

```javascript
// Funzione per fornire feedback visivo quando l'utente preme un pulsante
function feedbackPulsante() {
    // Salva lo stato corrente del LED
    let statoCorrente = brick.statusLight();
    
    // Lampeggia brevemente in verde
    brick.setStatusLight(StatusLight.Green);
    pause(200);
    
    // Ripristina lo stato precedente
    brick.setStatusLight(statoCorrente);
}

// Utilizzo in un programma
while (true) {
    if (brick.buttonEnter.wasPressed()) {
        feedbackPulsante();
        // Esegui l'azione associata al pulsante
    }
    pause(50);
}
```

### 3. Indicazione di Progresso

```javascript
// Funzione per indicare il progresso di un'operazione lunga
function indicaProgresso(inCorso) {
    if (inCorso) {
        // Operazione in corso: LED lampeggiante
        brick.setStatusLight(StatusLight.OrangeFlash);
    } else {
        // Operazione completata: LED verde fisso
        brick.setStatusLight(StatusLight.Green);
    }
}

// Utilizzo in un programma
indicaProgresso(true); // Inizia l'operazione

// Simula un'operazione lunga
pause(5000);

indicaProgresso(false); // Operazione completata
```

## Esempi di Utilizzo

### Esempio 1: Semaforo LED

```javascript
// Simula un semaforo utilizzando i LED di stato
function cicloDiSemaforo() {
    // Verde: via libera
    brick.setStatusLight(StatusLight.Green);
    brick.showString("Via libera", 1);
    pause(3000);
    
    // Arancione: prepararsi a fermarsi
    brick.setStatusLight(StatusLight.Orange);
    brick.showString("Rallentare", 1);
    pause(1000);
    
    // Rosso: stop
    brick.setStatusLight(StatusLight.Red);
    brick.showString("Stop", 1);
    pause(3000);
}

// Esegui il ciclo del semaforo ripetutamente
while (true) {
    cicloDiSemaforo();
}
```

### Esempio 2: Indicatore di Rilevamento Ostacoli

```javascript
// Configura il sensore a ultrasuoni
let sensoreDistanza = sensors.ultrasonic1;

// Funzione per aggiornare il LED in base alla distanza rilevata
function monitoraDistanza() {
    let distanza = sensoreDistanza.distance();
    
    if (distanza < 10) {
        // Ostacolo molto vicino: rosso lampeggiante
        brick.setStatusLight(StatusLight.RedFlash);
    } else if (distanza < 30) {
        // Ostacolo vicino: rosso fisso
        brick.setStatusLight(StatusLight.Red);
    } else if (distanza < 50) {
        // Ostacolo a media distanza: arancione
        brick.setStatusLight(StatusLight.Orange);
    } else {
        // Nessun ostacolo nelle vicinanze: verde
        brick.setStatusLight(StatusLight.Green);
    }
    
    // Mostra la distanza sul display
    brick.showString("Distanza: " + distanza + " cm", 1);
}

// Monitora continuamente la distanza
while (true) {
    monitoraDistanza();
    pause(100);
}
```

### Esempio 3: Notifica di Eventi con Pattern Personalizzati

```javascript
// Funzione per creare un pattern di lampeggio personalizzato
function lampeggioPers(colore, ripetizioni, durata) {
    for (let i = 0; i < ripetizioni; i++) {
        brick.setStatusLight(colore);
        pause(durata);
        brick.setStatusLight(StatusLight.Off);
        pause(durata);
    }
}

// Funzione per notificare diversi tipi di eventi
function notificaEvento(tipoEvento) {
    if (tipoEvento === "successo") {
        // Tre lampeggi verdi rapidi
        lampeggioPers(StatusLight.Green, 3, 100);
    } else if (tipoEvento === "avviso") {
        // Due lampeggi arancioni lenti
        lampeggioPers(StatusLight.Orange, 2, 300);
    } else if (tipoEvento === "errore") {
        // Cinque lampeggi rossi rapidi
        lampeggioPers(StatusLight.Red, 5, 100);
    }
}

// Utilizzo in un programma
notificaEvento("successo");
pause(1000);
notificaEvento("avviso");
pause(1000);
notificaEvento("errore");
```

## Combinazione con Altri Feedback

Per un'esperienza utente ottimale, è consigliabile combinare il feedback LED con altre forme di feedback:

```javascript
// Funzione per fornire feedback multimodale
function notificaMultimodale(messaggio, tipoNotifica) {
    // Feedback visivo su display
    brick.clearScreen();
    brick.showString(messaggio, 1);
    
    // Feedback LED
    if (tipoNotifica === "successo") {
        brick.setStatusLight(StatusLight.Green);
        // Feedback sonoro
        music.playTone(880, 200);
        pause(100);
        music.playTone(988, 400);
    } else if (tipoNotifica === "errore") {
        brick.setStatusLight(StatusLight.Red);
        // Feedback sonoro
        music.playTone(440, 200);
        pause(100);
        music.playTone(330, 400);
    }
}

// Utilizzo in un programma
notificaMultimodale("Operazione completata!", "successo");
pause(2000);
notificaMultimodale("Errore di connessione", "errore");
```

## Considerazioni sull'Usabilità

Quando utilizzi i LED per il feedback visivo, considera questi aspetti:

1. **Significato dei Colori**: Rispetta le convenzioni comuni (verde = ok, rosso = errore)
2. **Visibilità**: Assicurati che il LED sia visibile all'utente durante l'interazione
3. **Coerenza**: Usa gli stessi pattern LED per le stesse situazioni in tutto il programma
4. **Semplicità**: Evita pattern troppo complessi che potrebbero confondere l'utente
5. **Accessibilità**: Non fare affidamento solo sul colore, combina sempre con altri feedback

## Esercizi Proposti

1. **Sistema di Notifiche**: Crea un sistema completo di notifiche che utilizzi i LED in combinazione con suoni e messaggi sul display
2. **Monitor di Stato**: Implementa un sistema che monitori diversi parametri del robot e utilizzi i LED per indicare lo stato generale
3. **Interfaccia di Debugging**: Crea un'interfaccia che utilizzi i LED per comunicare lo stato di esecuzione di un programma complesso

---

**Prossimo Capitolo**: [Menu e Navigazione](05-MenuNavigazione.md)

**Capitolo Precedente**: [Feedback Sonoro](03-FeedbackSonoro.md)

[Torna all'indice del modulo](README.md)