# Funzioni di Callback

## Introduzione alle Funzioni di Callback

Le funzioni di callback sono un concetto fondamentale in JavaScript, specialmente quando si lavora con operazioni asincrone, eventi o funzioni di ordine superiore. Una funzione di callback è una funzione che viene passata come argomento ad un'altra funzione e viene eseguita dopo che l'operazione principale è stata completata o quando si verifica un determinato evento.

Nella programmazione robotica con EV3, le funzioni di callback sono essenziali per creare comportamenti reattivi, gestire eventi e strutturare il codice in modo modulare ed efficiente.

## Concetto Base e Sintassi

Una funzione di callback viene passata come argomento ad un'altra funzione e viene eseguita in un momento specifico:

```javascript
// Funzione che accetta una callback
function eseguiDopoPausa(millisecondi, callback) {
    // Esegue un'operazione (in questo caso, aspetta)
    pause(millisecondi);
    
    // Quindi esegue la callback
    callback();
}

// Utilizzo della funzione con una callback
eseguiDopoPausa(2000, function() {
    brick.showString("Operazione completata!", 1);
    motors.largeAB.stop();
});
```

## Casi d'Uso per EV3

### 1. Gestione di Eventi e Comportamenti

Le callback sono ideali per implementare comportamenti reattivi nei robot:

```javascript
// Funzione che monitora un sensore e chiama una callback quando rileva un cambio
function monitoraSensoreDistanza(soglia, callbackSottoSoglia, callbackSopraSoglia) {
    forever(function() {
        let distanza = sensors.ultrasonic4.distance();
        
        if (distanza < soglia) {
            callbackSottoSoglia(distanza);
        } else {
            callbackSopraSoglia(distanza);
        }
        
        pause(100);  // Piccola pausa per non sovraccaricare il sistema
    });
}

// Utilizzo con due diverse callback
monitoraSensoreDistanza(15, 
    // Callback per quando la distanza è sotto la soglia
    function(d) {
        brick.showString("Ostacolo vicino!", 1);
        motors.largeAB.stop();
    },
    // Callback per quando la distanza è sopra la soglia
    function(d) {
        brick.showString("Percorso libero", 1);
        motors.largeAB.steer(0, 30);
    }
);
```

### 2. Sequenziamento di Azioni

Le callback sono utili per creare sequenze di azioni che devono essere eseguite in ordine:

```javascript
// Funzione che esegue una sequenza di callback in ordine
function eseguiSequenza(azioni) {
    // Controlla se ci sono ancora azioni da eseguire
    if (azioni.length === 0) return;
    
    // Estrae la prima azione dalla lista
    let azioneCorrente = azioni.shift();
    
    // Esegue l'azione corrente
    azioneCorrente(() => {
        // Dopo che l'azione è completata, continua con la prossima
        eseguiSequenza(azioni);
    });
}

// Definizione delle azioni come funzioni che accettano una callback per la continuazione
function avanza(next) {
    brick.showString("Avanzamento", 1);
    motors.largeAB.steer(0, 50);
    pause(2000);
    motors.largeAB.stop();
    next();  // Chiama la callback per procedere alla prossima azione
}

function gira(next) {
    brick.showString("Rotazione", 1);
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(500);
    next();  // Chiama la callback per procedere alla prossima azione
}

function suona(next) {
    brick.showString("Suono", 1);
    music.playTone(440, 500);
    pause(600);  // Aspetta un po' più del suono
    next();  // Chiama la callback per procedere alla prossima azione
}

// Utilizzo: esegue avanza, poi gira, poi suona
eseguiSequenza([avanza, gira, suona]);
```

### 3. Funzioni di Ordine Superiore

Le funzioni di ordine superiore sono funzioni che operano su altre funzioni, prendendole come argomenti o restituendole. Molti metodi di array in JavaScript, come `map`, `filter`, e `forEach`, sono esempi di funzioni di ordine superiore che utilizzano callback:

```javascript
// Array di comandi per i movimenti del robot
let comandiMovimento = [
    { direzione: "avanti", durata: 2000 },
    { direzione: "sinistra", durata: 1000 },
    { direzione: "avanti", durata: 1500 },
    { direzione: "destra", durata: 800 }
];

// Utilizzo di forEach con una callback
comandiMovimento.forEach(function(comando) {
    brick.showString(`Direzione: ${comando.direzione}`, 1);
    
    if (comando.direzione === "avanti") {
        motors.largeAB.steer(0, 50);
    } else if (comando.direzione === "sinistra") {
        motors.largeC.run(-30, 1, MoveUnit.Rotations);
    } else if (comando.direzione === "destra") {
        motors.largeC.run(30, 1, MoveUnit.Rotations);
    }
    
    pause(comando.durata);
    motors.largeAB.stop();
    pause(500);  // Breve pausa tra i comandi
});
```

## Callback con Arrow Functions

Le arrow functions rendono le callback più concise e leggibili, e sono spesso utilizzate in questo contesto:

```javascript
// Esempio precedente riscritto con arrow functions
monitoraSensoreDistanza(15, 
    // Callback per quando la distanza è sotto la soglia
    (d) => {
        brick.showString("Ostacolo vicino!", 1);
        motors.largeAB.stop();
    },
    // Callback per quando la distanza è sopra la soglia
    (d) => {
        brick.showString("Percorso libero", 1);
        motors.largeAB.steer(0, 30);
    }
);

// Utilizzo di forEach con arrow function
comandiMovimento.forEach(comando => {
    brick.showString(`Direzione: ${comando.direzione}`, 1);
    
    // Resto del codice...
});
```

## Callback Asincroni e Gestione del Tempo

In MakeCode per EV3, alcune operazioni come la lettura dei sensori o il movimento dei motori possono richiedere tempo. Le callback sono utili per gestire questi casi asincroni:

```javascript
// Funzione che esegue un'azione fino a quando una condizione non è soddisfatta
function eseguiFinoACondizione(azione, condizione, callbackCompletamento) {
    // Avvia l'azione
    azione();
    
    // Controlla periodicamente la condizione
    let verificatore = setInterval(() => {
        if (condizione()) {
            // Quando la condizione è vera, ferma il verificatore e chiama la callback
            clearInterval(verificatore);
            callbackCompletamento();
        }
    }, 50);  // Controlla ogni 50ms
}

// Utilizzo: muove il robot finché non trova una linea nera
eseguiFinoACondizione(
    // Azione da eseguire continuamente
    () => {
        motors.largeAB.steer(0, 30);  // Avanza
    },
    // Condizione da verificare
    () => {
        return sensors.color1.light() < 20;  // Vero quando trova una superficie scura
    },
    // Callback da eseguire quando la condizione è vera
    () => {
        motors.largeAB.stop();
        brick.showString("Linea trovata!", 1);
        music.playTone(880, 500);  // Suona un tono
    }
);
```

## Pattern di Callback Comuni

### 1. Error-First Callbacks

Un pattern comune in JavaScript è il "error-first callback", dove il primo parametro di una callback è riservato per un errore (se presente):

```javascript
// Funzione che tenta di rilevare un oggetto di un colore specifico
function trovaColore(coloreTarget, callback) {
    let tentativi = 0;
    const maxTentativi = 20;
    
    // Funzione ricorsiva che cerca il colore
    function cerca() {
        tentativi++;
        let coloreRilevato = sensors.color1.color();
        
        if (coloreRilevato === coloreTarget) {
            // Successo: chiama la callback senza errore
            callback(null, coloreRilevato);
        } else if (tentativi >= maxTentativi) {
            // Fallimento dopo troppi tentativi
            callback(new Error("Colore non trovato dopo max tentativi"), null);
        } else {
            // Continua a cercare
            motors.largeAB.steer(0, 20);
            pause(500);
            motors.largeAB.stop();
            cerca();  // Chiamata ricorsiva
        }
    }
    
    cerca();  // Avvia la ricerca
}

// Utilizzo
trovaColore(Color.Blue, (errore, risultato) => {
    if (errore) {
        brick.showString("Errore: " + errore.message, 1);
        return;
    }
    
    brick.showString("Colore trovato!", 1);
    music.playTone(440, 500);
});
```

### 2. Middleware Pattern

Il pattern middleware è una serie di funzioni di callback che vengono eseguite in sequenza, ognuna con accesso ai dati dell'esecuzione:

```javascript
// Definizione del sistema middleware
function creaControllerRobot() {
    let middleware = [];
    
    // Funzione per aggiungere un middleware
    function usa(fn) {
        middleware.push(fn);
        return { usa };  // Ritorna l'oggetto per permettere il concatenamento
    }
    
    // Funzione per eseguire la catena di middleware
    function esegui(contesto) {
        let indice = 0;
        
        // Funzione next che chiama il prossimo middleware
        function next() {
            if (indice < middleware.length) {
                let currentMiddleware = middleware[indice];
                indice++;
                currentMiddleware(contesto, next);
            }
        }
        
        // Avvia la catena
        next();
    }
    
    return {
        usa,
        esegui
    };
}

// Utilizzo per creare un sistema di controllo del robot
let controlloreRobot = creaControllerRobot();

// Aggiungi middleware per diverse funzionalità
controlloreRobot
    .usa((ctx, next) => {
        // Middleware per il controllo della batteria
        ctx.batteria = brick.batteryLevel();
        if (ctx.batteria < 20) {
            brick.showString("Batteria bassa!", 1);
        }
        next();  // Passa al prossimo middleware
    })
    .usa((ctx, next) => {
        // Middleware per il controllo degli ostacoli
        ctx.distanza = sensors.ultrasonic4.distance();
        if (ctx.distanza < 15) {
            ctx.ostacolo = true;
            brick.showString("Ostacolo rilevato", 2);
        }
        next();  // Passa al prossimo middleware
    })
    .usa((ctx, next) => {
        // Middleware per il movimento
        if (ctx.ostacolo) {
            // Evita l'ostacolo
            motors.largeAB.steer(-50, 30);
            pause(1000);
        } else {
            // Movimento normale
            motors.largeAB.steer(0, 50);
        }
        next();  // Passa al prossimo middleware
    });

// Esegui la catena di middleware con un contesto condiviso
controlloreRobot.esegui({});
```

## Callback Hell e Come Evitarla

Quando si utilizzano molte funzioni di callback annidate, si può incorrere in quello che viene chiamato "callback hell" o "pyramid of doom", dove il codice diventa difficile da leggere e mantenere:

```javascript
// Esempio di callback hell
muoviAvanti(() => {
    rilevaSensore(() => {
        giraDestra(() => {
            muoviAvanti(() => {
                rilevaSensore(() => {
                    giraSinistra(() => {
                        // E così via...
                    });
                });
            });
        });
    });
});
```

### Strategie per Evitare il Callback Hell:

1. **Funzioni Nominate**: Estratte le callback in funzioni separate con nomi significativi

```javascript
function dopoMuoviAvanti() {
    rilevaSensore(dopoRilevamento);
}

function dopoRilevamento() {
    giraDestra(dopoGiroDestra);
}

function dopoGiroDestra() {
    muoviAvanti(dopoSecondoMovimento);
}

// E così via...

// Inizio della sequenza
muoviAvanti(dopoMuoviAvanti);
```

2. **Promises e Async/Await**: Tecniche più avanzate che vedremo in moduli successivi

3. **Composizione di Funzioni**: Creare funzioni di ordine superiore che compongono le operazioni

```javascript
// Funzione che compone una sequenza di azioni
function sequenza(...azioni) {
    return function esegui() {
        let indiceCorrente = 0;
        
        function next() {
            if (indiceCorrente < azioni.length) {
                let azioneCorrente = azioni[indiceCorrente];
                indiceCorrente++;
                azioneCorrente(next);
            }
        }
        
        next();  // Avvia la sequenza
    };
}

// Definizione delle singole azioni
function muoviAvanti(next) {
    motors.largeAB.steer(0, 50);
    pause(2000);
    motors.largeAB.stop();
    next();
}

function giraDestra(next) {
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(500);
    next();
}

function giraSinistra(next) {
    motors.largeC.run(-30, 1, MoveUnit.Rotations);
    pause(500);
    next();
}

// Composizione di una sequenza complessa
let percorsoComplesso = sequenza(
    muoviAvanti,
    giraDestra,
    muoviAvanti,
    giraSinistra,
    muoviAvanti
);

// Esecuzione della sequenza
percorsoComplesso();
```

## Best Practices per le Funzioni di Callback

1. **Mantieni le Callback Concise**: Cerca di mantenere il corpo delle funzioni di callback il più breve e chiaro possibile.

2. **Gestisci Sempre gli Errori**: Nelle operazioni che potrebbero fallire, assicurati di gestire correttamente gli errori nelle tue callback.

3. **Utilizza Arrow Functions** per callback brevi, per migliorare la leggibilità.

4. **Evita Callback Troppo Annidate**: Usa tecniche di composizione o funzioni nominate per evitare il callback hell.

5. **Documenta i Parametri**: Quando crei funzioni che accettano callback, documenta chiaramente i parametri che verranno passati alla callback.

6. **Utilizza Timing Appropriati**: Nelle operazioni temporizzate, assicurati di utilizzare tempi appropriati per non causare problemi di sincronizzazione.

## Conclusione

Le funzioni di callback sono uno strumento potente nella programmazione JavaScript, specialmente nel contesto della robotica EV3. Ti permettono di:

- Implementare comportamenti reattivi e basati su eventi
- Gestire operazioni che richiedono tempo o asincrone
- Creare sistemi modulari e componibili
- Implementare pattern di controllo avanzati

Padroneggiare le callback è un passo fondamentale per creare programmi JavaScript sofisticati per il tuo robot EV3, in grado di reagire all'ambiente e gestire compiti complessi in modo elegante e organizzato.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Arrow Functions](04-ArrowFunctions.md)
- [➡️ Controllo Motori EV3](../06-ControlloMotori/README.md)