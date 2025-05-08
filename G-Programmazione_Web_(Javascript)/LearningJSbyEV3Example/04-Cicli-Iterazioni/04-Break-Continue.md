# Istruzioni break e continue

## Introduzione

Quando lavoriamo con i cicli in JavaScript, a volte abbiamo bisogno di controllare il flusso dell'esecuzione in modo più preciso. Le istruzioni `break` e `continue` ci permettono di fare esattamente questo, consentendoci di interrompere completamente un ciclo o di saltare un'iterazione. Queste istruzioni sono particolarmente utili nella programmazione dei robot Lego EV3 per gestire situazioni specifiche durante l'esecuzione di compiti ripetitivi.

## L'istruzione break

L'istruzione `break` interrompe completamente l'esecuzione del ciclo e passa il controllo alla prima istruzione dopo il blocco del ciclo.

### Sintassi

```javascript
while (condizione) {
    // codice
    if (altraCondizione) {
        break; // esce immediatamente dal ciclo
    }
    // altro codice
}
```

### Quando usare break

- Quando hai trovato ciò che stavi cercando e non hai bisogno di continuare il ciclo
- Quando si verifica una condizione di errore o una situazione eccezionale
- Quando vuoi implementare un ciclo con condizione di uscita nel mezzo del blocco

### Esempi per EV3

```javascript
// Esempio: Fai muovere il robot finché non trova una linea nera
while (true) { // ciclo infinito
    motors.largeAB.steer(0, 30); // muovi in avanti
    
    // Se il sensore di colore rileva nero, esci dal ciclo
    if (sensors.color1.light() < 20) {
        break;
    }
    
    pause(100); // piccola pausa per evitare letture troppo frequenti
}

// Il robot si ferma dopo aver trovato la linea nera
motors.largeAB.stop();
```

## L'istruzione continue

L'istruzione `continue` salta il resto del codice nell'iterazione corrente del ciclo e passa alla successiva iterazione.

### Sintassi

```javascript
for (let i = 0; i < 10; i++) {
    if (condizione) {
        continue; // salta il resto del codice e passa alla prossima iterazione
    }
    // questo codice non verrà eseguito se continue è stato chiamato
}
```

### Quando usare continue

- Quando vuoi saltare alcune iterazioni basate su una condizione
- Quando vuoi evitare annidamenti profondi di condizioni
- Quando una particolare iterazione non è rilevante per il tuo scopo

### Esempi per EV3

```javascript
// Esempio: Fai suonare il robot solo per numeri pari
for (let i = 1; i <= 10; i++) {
    // Salta i numeri dispari
    if (i % 2 !== 0) {
        continue;
    }
    
    // Questo codice verrà eseguito solo per i numeri pari
    brick.showNumber(i);
    music.playTone(440 + i * 100, 500);
    pause(1000);
}
```

## Break e continue in cicli annidati

Nelle strutture con cicli annidati, `break` e `continue` agiscono solo sul ciclo più interno in cui appaiono. Se hai bisogno di uscire da cicli annidati, dovresti considerare altre tecniche come l'uso di etichette o variabili di controllo.

```javascript
// Esempio con etichetta (meno comune in JavaScript)
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop; // esce da entrambi i cicli
        }
        console.log(`i=${i}, j=${j}`);
    }
}
```

## Applicazioni nei robot EV3

### Utilizzo di break per fermare comportamenti

Nel contesto dei robot EV3, l'istruzione `break` è particolarmente utile per interrompere comportamenti quando vengono rilevate condizioni specifiche:

- Interrompere la navigazione quando viene rilevato un ostacolo
- Fermare la ricerca quando viene trovato un oggetto specifico
- Terminare un pattern di movimento quando viene raggiunta una posizione desiderata

### Utilizzo di continue per ignorare situazioni

L'istruzione `continue` può essere utilizzata per:

- Ignorare letture anomale dei sensori
- Saltare determinati colori durante il tracking di una linea multicolore
- Evitare determinate azioni in specifiche condizioni ambientali

## Best Practices

1. **Usa break e continue con moderazione**: L'uso eccessivo può rendere il codice difficile da seguire.
2. **Documenta sempre il motivo**: Aggiungi commenti per spiegare perché stai interrompendo o saltando un'iterazione.
3. **Considera alternative**: A volte, una condizione aggiuntiva nell'espressione del ciclo può essere più chiara.
4. **Testa accuratamente**: Il comportamento del robot può essere imprevedibile se non consideri tutti i casi d'uso.

## Conclusione

Le istruzioni `break` e `continue` sono strumenti potenti che, se utilizzati correttamente, possono rendere il tuo codice più efficiente e reattivo. Nel contesto della programmazione robotica, ti permettono di creare comportamenti più complessi e reattivi, consentendo al tuo robot EV3 di rispondere in modo appropriato a diverse situazioni ambientali.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Cicli Annidati](03-CicliAnnidati.md)
- [➡️ Forever e Polling](05-Forever-Polling.md)