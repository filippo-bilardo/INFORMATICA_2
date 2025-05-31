# Guida 3: Feedback Sonoro

Il brick EV3 è dotato di un altoparlante integrato che può essere utilizzato per produrre suoni, fornendo un canale di feedback uditivo importante per l'interazione con l'utente. Questo può variare da semplici toni a sequenze musicali o persino alla riproduzione di brevi file audio.

## Capacità Sonore dell'EV3

*   **Toni Semplici**: È possibile generare toni a frequenze specifiche per durate definite.
*   **Note Musicali**: Supporta la riproduzione di note musicali (Do, Re, Mi, ecc.) con durate specifiche (semibreve, minima, semiminima, ecc.), permettendo di creare melodie.
*   **File Audio**: Può riprodurre file audio precaricati o standard in formato `.rsf` (Robot Sound File). MakeCode potrebbe avere un set limitato di suoni di sistema disponibili.
*   **Controllo del Volume**: Il volume dell'altoparlante può essere regolato.

## Utilizzo in MakeCode (JavaScript)

MakeCode, tramite l'oggetto `brick` e `music`, offre diverse funzioni per generare suoni.

### Riprodurre Toni

```javascript
// Riproduce un tono a 440 Hz (La centrale) per 500 millisecondi
brick.playSound(440, 500);

// Attende il completamento del suono prima di procedere
brick.playTone(Note.C4, BeatFraction.Whole); // Riproduce un Do centrale per una semibreve
```

La differenza tra `brick.playSound()` e `brick.playTone()` (o `music.playTone()`) può risiedere nel fatto che `playTone` spesso attende il completamento della nota, mentre `playSound` potrebbe essere non bloccante o avere un comportamento leggermente diverso a seconda dell'implementazione specifica di MakeCode.

### Riprodurre Note e Melodie

Il modulo `music` è più orientato alla creazione di melodie.

```javascript
// Imposta il tempo (battiti al minuto)
music.setTempo(120); // 120 bpm

// Riproduce una singola nota
music.playTone(Note.E4, music.beat(BeatFraction.Quarter)); // Mi4 per una semiminima

// Riproduce una melodia semplice (Do-Re-Mi)
music.playTone(Note.C4, music.beat(BeatFraction.Half));
music.playTone(Note.D4, music.beat(BeatFraction.Half));
music.playTone(Note.E4, music.beat(BeatFraction.Whole));

// Riproduce un suono di sistema predefinito
music.playSoundEffect(sounds.communicationHello); // Esempio di suono di sistema
```

*   `music.beat(BeatFraction)`: Converte una frazione di battuta (es. `BeatFraction.Quarter` per una semiminima) nella durata corrispondente in millisecondi, basandosi sul tempo impostato.

### Controllo del Volume

```javascript
// Imposta il volume al 50% (il range è solitamente 0-100)
music.setVolume(50);

// Legge il volume corrente
let volumeCorrente = music.volume();
brick.showString("Volume: " + volumeCorrente, 7);
```

### Interrompere Suoni

```javascript
// Interrompe tutti i suoni attualmente in riproduzione
music.stopAllSounds();
```

## Considerazioni Pratiche

*   **Suoni Bloccanti vs. Non Bloccanti**: Alcune funzioni sonore attendono che il suono sia completato prima di passare all'istruzione successiva (bloccanti), mentre altre permettono al programma di continuare mentre il suono è in riproduzione (non bloccanti). Comprendere questo comportamento è importante per la temporizzazione del programma.
*   **Qualità del Suono**: L'altoparlante dell'EV3 è piccolo e ha capacità limitate. Non aspettarti una qualità audio hi-fi.
*   **Uso Eccessivo**: Un uso eccessivo o inappropriato di suoni può rendere l'interazione con il robot fastidiosa.
*   **File Audio Personalizzati**: Caricare e riprodurre file audio personalizzati complessi potrebbe essere limitato o non direttamente supportato in MakeCode, che tende a favorire suoni di sistema o toni generati.

## Applicazioni Comuni

*   **Feedback per Azioni**: Un breve suono per confermare la pressione di un pulsante o il completamento di un compito.
*   **Avvisi e Allarmi**: Suoni specifici per indicare errori, batteria scarica, o rilevamento di ostacoli.
*   **Indicatori di Stato**: Differenti toni o melodie per indicare diverse modalità operative del robot.
*   **Migliorare l'Espressività**: Aggiungere suoni per rendere il robot più "vivace" o per comunicare emozioni semplici (es. un suono allegro per il successo, un suono triste per il fallimento).
*   **Giochi Semplici**: Creare effetti sonori per giochi implementati sul robot.

Il feedback sonoro è un potente strumento per arricchire l'esperienza utente e fornire informazioni chiare sullo stato e le azioni del tuo robot EV3.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 08](../README.md)
[Torna alla Home del Corso](../../../README.md)