# Introduzione ai Motori EV3

## Tipi di Motori nel kit LEGO EV3

Il kit LEGO Mindstorms EV3 include due tipi principali di motori, ciascuno progettato per scopi specifici:

### 1. Motori Grandi (Large Motors)

![Motore Grande EV3](https://education.lego.com/v3/assets/blt293eea581807678a/blt2e6ec83b5441afc7/5ec7c11f3c9cd5368c35b9fc/45502_45503.png)

I motori grandi (identificati come motori A, B, C o D nel software) sono i più potenti disponibili nel kit EV3. Caratteristiche principali:

- **Potenza elevata**: Ideali per muovere il robot o per azioni che richiedono molta forza
- **Encoder integrato**: Permette un controllo preciso della rotazione (1 grado di precisione)
- **Velocità**: 160-170 RPM (rotazioni al minuto) senza carico
- **Coppia**: Alta, sufficiente per sollevare oggetti o superare ostacoli
- **Utilizzo tipico**: Ruote principali, bracci meccanici, meccanismi di sollevamento

### 2. Motori Medi (Medium Motors)

![Motore Medio EV3](https://education.lego.com/v3/assets/blt293eea581807678a/blt8aff5a3b74ad8b85/5ec7c11f3a90c43dbc3af4df/45503_Angle.png)

I motori medi sono più leggeri e reattivi, anche se meno potenti dei motori grandi. Caratteristiche principali:

- **Dimensioni ridotte**: Più leggeri e compatti, ideali per spazi limitati
- **Reattività**: Rispondono più rapidamente ai comandi, con minore inerzia
- **Velocità**: 240-250 RPM senza carico, più veloci dei motori grandi
- **Coppia**: Minore rispetto ai motori grandi, ma sufficiente per molte applicazioni
- **Utilizzo tipico**: Meccanismi di sterzo, pinze, bracci leggeri, accessori

## Porte Motori sul Brick EV3

Il brick EV3 è dotato di quattro porte di output (A, B, C, D) dove collegare i motori:

```
┌───────────────┐
│      EV3      │
│   ┌───┬───┐   │
│   │ A │ B │   │   Porte per Motori
│   ├───┼───┤   │   (OUTPUT)
│   │ C │ D │   │
│   └───┴───┘   │
│   ┌───┬───┐   │
│   │ 1 │ 2 │   │   Porte per Sensori
│   ├───┼───┤   │   (INPUT)
│   │ 3 │ 4 │   │
│   └───┴───┘   │
└───────────────┘
```

## Principi Fondamentali dei Motori EV3

### Servomotori con Encoder

I motori EV3 non sono semplici motori elettrici, ma servomotori con encoder integrato. Questo significa che:

- Possono rilevare con precisione la propria posizione e rotazione
- Permettono di controllare sia l'angolo di rotazione che la velocità
- Forniscono feedback sul movimento effettivamente eseguito
- Possono mantenere una posizione specifica anche sotto sforzo

### Sistema di Unità di Misura in MakeCode

Quando programmiamo i motori in MakeCode, utilizziamo diverse unità di misura:

- **Potenza (Power)**: Un valore da -100 a 100 che rappresenta la percentuale di potenza applicata
  - Valori positivi: rotazione in senso orario
  - Valori negativi: rotazione in senso antiorario
  - Zero: nessuna potenza (ma non necessariamente fermo)

- **Rotazioni (Rotations)**: Il numero di giri completi dell'albero motore (360°)

- **Gradi (Degrees)**: La misura dell'angolo di rotazione (1 rotazione = 360 gradi)

- **Secondi (Seconds)**: La durata temporale di un'azione

## Libreria Motors in MakeCode

In MakeCode per EV3, i motori vengono controllati tramite la libreria `motors`. Questa libreria offre un accesso semplificato alle funzionalità dei motori attraverso oggetti specifici:

### Motori Singoli

```javascript
// Accesso ai singoli motori
motors.largeA    // Motore grande sulla porta A
motors.largeB    // Motore grande sulla porta B
motors.largeC    // Motore grande sulla porta C
motors.largeD    // Motore grande sulla porta D

motors.mediumA   // Motore medio sulla porta A
motors.mediumB   // Motore medio sulla porta B
// ecc.
```

### Gruppi di Motori

MakeCode offre anche la possibilità di controllare più motori contemporaneamente come gruppo:

```javascript
// Gruppi di motori predefiniti
motors.largeAB   // Controlla i motori grandi A e B insieme (tipicamente le ruote)
motors.largeBC   // Controlla i motori grandi B e C insieme
// ecc.
```

## Configurazioni Comuni del Robot

### Configurazione Base (Differenziale)

La configurazione più comune per i robot EV3 è quella differenziale con due motori grandi per le ruote principali:

```
    ┌─────┐
    │ EV3 │
    └─────┘
      │ │
   ┌──┘ └──┐
┌──┴──┐ ┌──┴──┐
│  A  │ │  B  │ <- Motori grandi per le ruote
└─────┘ └─────┘
```

In questa configurazione:
- Il motore A controlla la ruota sinistra
- Il motore B controlla la ruota destra
- Si usa `motors.largeAB` per il movimento coordinato

### Configurazione con Terzo Motore per lo Sterzo

Molti robot aggiungono un terzo motore (spesso un motore medio) per il controllo di uno sterzo o di un accessorio:

```
    ┌─────┐
    │ EV3 │
    └─────┘
      │ │
   ┌──┘ └──┐
┌──┴──┐ ┌──┴──┐
│  A  │ │  B  │ <- Motori grandi per le ruote
└─────┘ └─────┘
      │
    ┌─┴─┐
    │ C │      <- Motore (spesso medio) per lo sterzo o un accessorio
    └───┘
```

## Conclusione

I motori sono i componenti che danno vita al tuo robot EV3, permettendogli di muoversi e interagire con l'ambiente. Comprendere le caratteristiche e le capacità dei diversi tipi di motori è il primo passo per creare comportamenti complessi e movimenti precisi.

Nei prossimi capitoli, esploreremo in dettaglio come controllare questi motori tramite JavaScript, partendo dalle operazioni di base fino ad arrivare a movimenti sincronizzati e di precisione.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Panoramica del Modulo](README.md)
- [➡️ Controllo Motori di Base](02-ControlloBase.md)