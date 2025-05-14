# Risoluzione dei Problemi Comuni

Questo documento fornisce soluzioni ai problemi più comuni che potresti incontrare durante la configurazione e l'utilizzo del robot Lego Mindstorms EV3 con MakeCode.

## Problemi Hardware

### Il brick EV3 non si accende

**Possibili cause e soluzioni:**

1. **Batteria scarica**
   - Sostituisci le batterie AA con batterie nuove
   - Ricarica la batteria ricaricabile
   - Verifica che la batteria sia inserita correttamente

2. **Problemi con il pulsante di accensione**
   - Premi il pulsante più a lungo (tenendolo premuto per 1-2 secondi)
   - Verifica che il pulsante non sia bloccato o danneggiato

3. **Problemi interni**
   - Prova un reset forzato: tieni premuti i pulsanti Back, Center e Right per 5 secondi
   - Rimuovi e reinserisci la batteria, poi tenta di riaccendere

### I motori non funzionano

**Possibili cause e soluzioni:**

1. **Cavi non collegati correttamente**
   - Verifica che i cavi siano inseriti completamente sia nel brick che nel motore
   - Assicurati di utilizzare le porte di output (A, B, C, D) per i motori

2. **Porte non configurate correttamente nel codice**
   - Verifica che il codice utilizzi le stesse porte a cui sono fisicamente collegati i motori
   - Esempio: se il motore è collegato alla porta B, usa `motors.largeB` nel codice

3. **Motori danneggiati**
   - Prova a collegare il motore a una porta diversa
   - Prova un motore diverso sulla stessa porta per verificare se è la porta o il motore a essere difettoso

### I sensori non funzionano correttamente

**Possibili cause e soluzioni:**

1. **Cavi non collegati correttamente**
   - Verifica che i cavi siano inseriti completamente
   - Assicurati di utilizzare le porte di input (1, 2, 3, 4) per i sensori

2. **Porte non configurate correttamente nel codice**
   - Verifica che il codice utilizzi le stesse porte a cui sono fisicamente collegati i sensori
   - Esempio: se il sensore di colore è collegato alla porta 3, usa `sensors.color3` nel codice

3. **Sensori danneggiati o sporchi**
   - Pulisci delicatamente la superficie del sensore con un panno morbido
   - Per il sensore di colore, verifica che non ci siano ostruzioni o sporcizia davanti alla lente
   - Per il sensore a ultrasuoni, verifica che le "finestre" degli emettitori/ricevitori siano pulite

4. **Condizioni ambientali inadatte**
   - Il sensore di colore è influenzato dall'illuminazione ambientale
   - Il sensore a ultrasuoni può avere difficoltà con superfici molto riflettenti o assorbenti

## Problemi Software e di Connessione

### Non riesci ad accedere a MakeCode

**Possibili cause e soluzioni:**

1. **Problemi di connessione internet**
   - Verifica la tua connessione internet
   - Prova a utilizzare un'altra rete se disponibile

2. **Browser non compatibile**
   - Utilizza Google Chrome o Microsoft Edge (basato su Chromium)
   - Aggiorna il browser all'ultima versione

3. **Blocco dei cookie o JavaScript disabilitato**
   - Verifica le impostazioni del browser per assicurarti che JavaScript sia abilitato
   - Controlla che i cookie non siano bloccati per il dominio makecode.mindstorms.com

### Il computer non riconosce il brick EV3

**Possibili cause e soluzioni:**

1. **Problemi con il cavo USB**
   - Prova un cavo USB diverso
   - Verifica che il cavo sia un cavo dati e non solo di alimentazione

2. **Problemi con la porta USB**
   - Prova una porta USB diversa sul computer
   - Le porte USB dirette (non tramite hub) funzionano meglio

3. **Driver mancanti o non installati correttamente (Windows)**
   - Verifica nel Gestore dispositivi se ci sono dispositivi con punto esclamativo
   - Reinstalla i driver EV3 dal [sito di supporto LEGO](https://education.lego.com/en-us/support/mindstorms-ev3)

4. **Permessi insufficienti (Linux)**
   - Configura le regole udev come descritto nella sezione di installazione
   - Esegui `sudo dmesg` dopo aver collegato l'EV3 per vedere eventuali errori

### WebUSB non funziona

**Possibili cause e soluzioni:**

1. **Browser non supporta WebUSB**
   - Utilizza Chrome o Edge (Firefox non supporta completamente WebUSB)
   - Verifica di utilizzare una versione recente del browser

2. **Funzionalità WebUSB non attivata**
   - In Chrome, vai a `chrome://flags`, cerca "WebUSB" e attivalo
   - Riavvia il browser dopo la modifica

3. **Problemi di autorizzazione**
   - Quando appare la finestra di dialogo per autorizzare l'accesso al dispositivo, assicurati di selezionare "Allow"
   - Se non vedi la finestra di dialogo, ricarica la pagina e riprova

### Errori durante il caricamento del programma

**Possibili cause e soluzioni:**

1. **Memoria insufficiente sul brick EV3**
   - Elimina programmi non necessari dal brick
   - Semplifica il tuo programma, riducendo l'uso di grandi array o risorse

2. **Errori nel codice JavaScript**
   - Verifica che non ci siano errori di sintassi nel codice
   - Controlla la console del browser per messaggi di errore (premi F12 per aprire gli strumenti di sviluppo)

3. **Connessione USB instabile**
   - Verifica che il cavo USB sia saldamente collegato
   - Prova a utilizzare il metodo di trasferimento file manuale

4. **Problemi con il firmware del brick**
   - Verifica che il firmware del brick sia aggiornato
   - In casi estremi, potrebbe essere necessario reinstallare il firmware

### Il programma non funziona come previsto

**Possibili cause e soluzioni:**

1. **Errori logici nel codice**
   - Semplifica il programma e testalo passo dopo passo
   - Utilizza il display EV3 per mostrare valori e debug (`brick.showValue()`)

2. **Configurazione hardware non corrispondente al codice**
   - Verifica che i motori e i sensori siano collegati alle porte specificate nel codice
   - Controlla che il modello di robot utilizzato sia compatibile con il programma

3. **Problemi di sincronizzazione o timing**
   - Aggiungi pause (`pause()`) tra le azioni per dare tempo ai motori di completare i movimenti
   - Verifica che i valori di velocità e potenza siano appropriati

4. **Batteria scarica**
   - Una batteria con poca carica può causare comportamenti inaspettati nei motori
   - Verifica il livello della batteria e sostituiscila/ricaricala se necessario

## Problemi Specifici di MakeCode

### Errori di compilazione JavaScript

**Possibili cause e soluzioni:**

1. **Errori di sintassi**
   - Verifica che tutte le parentesi siano bilanciate
   - Controlla che tutte le istruzioni terminino con punto e virgola
   - Verifica che le stringhe siano racchiuse tra virgolette

2. **Utilizzo di API non supportate**
   - Non tutte le funzionalità JavaScript standard sono supportate in MakeCode
   - Consulta la documentazione di MakeCode per le API disponibili

3. **Problemi con l'editor**
   - Passa alla modalità blocchi e poi torna a JavaScript
   - Aggiorna la pagina e ricarica il progetto

### Il simulatore non funziona correttamente

**Possibili cause e soluzioni:**

1. **Browser sovraccarico**
   - Chiudi altre schede e applicazioni
   - Riavvia il browser

2. **Limitazioni del simulatore**
   - Il simulatore non può replicare perfettamente il comportamento del robot reale
   - Alcuni sensori e funzionalità hanno un comportamento semplificato nel simulatore

3. **Problemi di prestazioni**
   - Utilizza un computer con hardware più potente
   - Riduci la complessità del programma per i test nel simulatore

## Risorse Aggiuntive per la Risoluzione dei Problemi

Se continui a riscontrare problemi, consulta queste risorse aggiuntive:

1. **Forum ufficiale LEGO Mindstorms**:
   - [https://community.lego.com/t5/MINDSTORMS/bd-p/MINDSTORMS](https://community.lego.com/t5/MINDSTORMS/bd-p/MINDSTORMS)

2. **Forum MakeCode**:
   - [https://forum.makecode.com/](https://forum.makecode.com/)

3. **Documentazione ufficiale MakeCode per EV3**:
   - [https://makecode.mindstorms.com/reference](https://makecode.mindstorms.com/reference)

4. **Centro assistenza LEGO Education**:
   - [https://education.lego.com/en-us/support](https://education.lego.com/en-us/support)

---

[⬅️ Primo collegamento al robot](./03-PrimoCollegamento.md) | [🔙 Torna all'indice](./README.md)
