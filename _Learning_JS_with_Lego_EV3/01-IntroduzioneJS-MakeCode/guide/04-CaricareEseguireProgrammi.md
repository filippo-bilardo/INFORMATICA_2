# Guida 4: Caricare ed Eseguire Programmi sul Robot EV3

## Introduzione

Questa guida ti mostrerà come caricare ed eseguire i programmi che hai creato in MakeCode sul tuo robot Lego Mindstorms EV3. Imparerai i diversi metodi di caricamento, come avviare i programmi e come gestire eventuali problemi durante il processo.

## Metodi per Caricare Programmi sull'EV3

### Metodo 1: Connessione WebUSB (Consigliato)

WebUSB è un modo semplice e diretto per caricare i programmi sul tuo EV3, ma funziona solo con browser compatibili come Chrome o Edge.

#### Procedura:

1. Collega il tuo EV3 al computer tramite cavo USB
2. Accendi il robot EV3
3. In MakeCode, clicca sul pulsante "..." nell'angolo in alto a destra
4. Seleziona "Connect device"
5. Scegli "USB" dalle opzioni
6. Segui le istruzioni a schermo per autorizzare la connessione
7. Una volta connesso, clicca sul pulsante "Download" per trasferire il programma

### Metodo 2: File .uf2

Se non puoi utilizzare WebUSB, puoi trasferire il programma tramite file.

#### Procedura:

1. In MakeCode, clicca sul pulsante "Download" per salvare il file .uf2
2. Collega il tuo EV3 al computer tramite cavo USB
3. Il brick EV3 apparirà come un dispositivo di archiviazione USB
4. Copia il file .uf2 scaricato nella cartella principale del dispositivo EV3
5. Attendi il completamento del trasferimento (le luci sul brick lampeggeranno)
6. Il programma verrà automaticamente caricato e sarà pronto per l'esecuzione

### Metodo 3: App MakeCode per Windows 10

MakeCode offre anche un'app per Windows 10 che semplifica la connessione e il caricamento.

#### Procedura:

1. Installa l'app MakeCode dal Microsoft Store
2. Avvia l'app e apri il tuo progetto
3. Collega l'EV3 via USB
4. Usa il pulsante "Connect" nell'app per stabilire la connessione
5. Clicca su "Download" per trasferire il programma

## Eseguire Programmi sul Robot EV3

### Avvio automatico

Quando carichi un programma utilizzando uno dei metodi sopra descritti, il programma verrà:
1. Automaticamente installato sul brick EV3
2. In alcuni casi, avviato automaticamente

### Avvio manuale dal menu del brick EV3

Se il programma non si avvia automaticamente:

1. Usa i pulsanti di navigazione sul brick EV3 per accedere al menu principale
2. Seleziona "File Navigation" o "Apps" (a seconda della versione del firmware)
3. Trova il tuo programma nell'elenco (avrà il nome che hai assegnato in MakeCode)
4. Premi il pulsante centrale per avviare il programma

### Arresto di un programma in esecuzione

Per fermare un programma in esecuzione:
1. Premi il pulsante "Indietro" (il pulsante in alto a sinistra del brick)
2. In alternativa, tieni premuto il pulsante "Indietro" per alcuni secondi per tornare al menu principale

## Gestione dei Programmi sul Brick EV3

### Visualizzare i programmi memorizzati

1. Accedi al menu principale del brick EV3
2. Seleziona "File Navigation"
3. Naviga tra le cartelle per trovare i tuoi programmi

### Eliminare programmi

1. Naviga fino al programma che desideri eliminare
2. Seleziona il file e premi il pulsante centrale
3. Scegli l'opzione "Delete" dal menu che appare
4. Conferma l'eliminazione

### Gestione della memoria

Il brick EV3 ha una memoria limitata. Se riscontri problemi di memoria:

1. Elimina i programmi non necessari
2. Ottimizza il tuo codice per ridurre le dimensioni del programma
3. Considera l'uso di una scheda SD per aumentare lo spazio di archiviazione

## Risoluzione dei Problemi

### Il programma non si carica

- Verifica che il cavo USB sia collegato correttamente
- Assicurati che il brick EV3 sia acceso e abbia una batteria sufficientemente carica
- Prova a riavviare il brick EV3
- Se usi WebUSB, assicurati di utilizzare un browser compatibile (Chrome, Edge)

### Il programma si carica ma non funziona correttamente

- Verifica che i motori e i sensori siano collegati alle porte corrette
- Controlla il codice per eventuali errori logici
- Prova a testare il programma nel simulatore prima di caricarlo
- Aggiungi istruzioni di debug (come visualizzare valori sul display) per identificare il problema

### Il brick EV3 non viene riconosciuto come dispositivo USB

- Prova un cavo USB diverso
- Collega il cavo a una porta USB diversa del computer
- Riavvia il computer
- Verifica che il firmware del brick EV3 sia aggiornato

## Consigli per Test e Debugging

- **Test incrementali**: Sviluppa e testa il tuo programma in piccoli incrementi
- **Usa il simulatore**: Testa il più possibile nel simulatore prima di caricare sul robot
- **Messaggi di debug**: Aggiungi messaggi sul display del brick per capire cosa sta facendo il programma
- **Attendi tra le azioni**: Inserisci brevi pause (`pause(500)`) tra le azioni per vedere meglio cosa succede
- **Suoni di feedback**: Usa suoni diversi per indicare vari stati o eventi nel programma

---

[⬅️ Torna all'indice delle guide](./README.md) | [🔙 Torna al Modulo 01](../README.md)
