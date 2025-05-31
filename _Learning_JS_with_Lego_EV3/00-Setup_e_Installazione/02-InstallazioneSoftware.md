# Installazione e Configurazione del Software

Per programmare il tuo robot Lego Mindstorms EV3 utilizzando JavaScript, utilizzeremo Microsoft MakeCode for EV3. A differenza di altri ambienti di programmazione per EV3, MakeCode è un'applicazione web che funziona direttamente nel browser, eliminando la necessità di installare software aggiuntivo sul tuo computer.

## Accesso a MakeCode for EV3

1. **Apri un browser web compatibile**:
   - Google Chrome (consigliato)
   - Microsoft Edge (basato su Chromium)
   - Firefox (con alcune limitazioni)

2. **Visita il sito MakeCode for EV3**:
   - Vai all'indirizzo: [https://makecode.mindstorms.com/](https://makecode.mindstorms.com/)

3. **Esplora la pagina iniziale**:
   - La pagina iniziale mostrerà vari tutorial, progetti di esempio e l'opzione per iniziare un nuovo progetto.

## Creazione di un Account MakeCode (Opzionale ma Consigliato)

Creare un account ti permette di salvare i tuoi progetti nel cloud e accedervi da qualsiasi dispositivo.

1. **Clicca sul pulsante "Sign In" nell'angolo in alto a destra**

2. **Scegli un metodo di accesso**:
   - Account Microsoft
   - Account Google
   - Account GitHub
   - Email e password

3. **Segui le istruzioni per completare la registrazione o l'accesso**

## Configurazione del Browser per Supportare WebUSB

WebUSB è una tecnologia che permette al browser di comunicare direttamente con il tuo robot EV3 tramite USB. Per utilizzarla:

1. **Verifica che il tuo browser supporti WebUSB**:
   - Chrome: versione 61 o superiore
   - Edge: versione 79 o superiore
   - Firefox: non supporta completamente WebUSB

2. **Attiva le funzionalità sperimentali (se necessario)**:
   - Chrome: digita `chrome://flags` nella barra degli indirizzi
   - Cerca "Experimental Web Platform features" e imposta su "Enabled"
   - Riavvia il browser

3. **Verifica che il tuo sistema operativo supporti WebUSB**:
   - Windows 10/11: supporto completo
   - macOS: supporto completo
   - Linux: potrebbe richiedere configurazioni aggiuntive dei permessi USB

## Installazione di Driver USB (se necessario)

In alcuni casi, potresti aver bisogno di installare driver USB per il tuo brick EV3:

### Windows
- I driver dovrebbero installarsi automaticamente quando colleghi l'EV3 per la prima volta
- Se ciò non accade, visita il [sito di supporto LEGO](https://www.lego.com/en-us/themes/mindstorms/downloads) per scaricare i driver

### macOS
- Non sono necessari driver aggiuntivi

### Linux
- Potrebbe essere necessario configurare le regole udev per consentire l'accesso all'EV3 senza privilegi di root
- Crea un file `/etc/udev/rules.d/99-ev3.rules` con il seguente contenuto:
  ```
  SUBSYSTEM=="usb", ATTRS{idVendor}=="0694", ATTRS{idProduct}=="0005", MODE="0666"
  ```
- Riavvia il servizio udev: `sudo udevadm control --reload-rules && sudo udevadm trigger`

## Alternativa: Installazione dell'App MakeCode (opzionale)

Per Windows 10/11, è disponibile un'app MakeCode che offre alcune funzionalità aggiuntive:

1. **Apri il Microsoft Store**

2. **Cerca "MakeCode for LEGO MINDSTORMS EV3"**

3. **Clicca su "Ottieni" o "Installa"**

4. **Avvia l'app dopo l'installazione**

L'app offre funzionalità simili alla versione web, ma con alcuni vantaggi:
- Funzionamento offline (una volta caricati i progetti)
- Connessione USB potenzialmente più stabile
- Integrazione con il sistema operativo Windows

## Verifica del Setup Software

Per verificare che tutto sia configurato correttamente:

1. **Accedi a MakeCode for EV3**

2. **Crea un nuovo progetto**:
   - Clicca su "New Project" nella pagina iniziale
   - Assegna un nome al progetto (es. "TestSetup")

3. **Esplora l'interfaccia di MakeCode**:
   - Area blocchi/codice (al centro)
   - Simulatore (a destra)
   - Palette di blocchi/funzioni (a sinistra)

4. **Passa alla modalità JavaScript**:
   - Clicca sulla scheda "JavaScript" nella parte superiore dell'editor

5. **Modifica il codice JavaScript**:
   - Dovresti vedere un codice di base simile a questo:
   ```javascript
   // Programma base
   forever(function() {
       // Il tuo codice qui
   })
   ```

## Installazione di Estensioni Utili (Opzionale)

MakeCode supporta estensioni che aggiungono funzionalità aggiuntive:

1. **Clicca su "Extensions" nel menu blocchi**

2. **Esplora le estensioni disponibili**:
   - Power Functions: per controllare i componenti LEGO Power Functions
   - Bluetooth: per comunicazione Bluetooth avanzata
   - Color Sensor Utilities: funzionalità aggiuntive per il sensore di colore

3. **Clicca su un'estensione per aggiungerla al tuo progetto**

## Configurazione dell'Editor

Personalizza l'ambiente di sviluppo secondo le tue preferenze:

1. **Tema dell'editor**:
   - Clicca sull'icona a forma di ingranaggio in alto a destra
   - Seleziona "Dark Mode" o "High Contrast" se preferisci

2. **Dimensione del carattere**:
   - Clicca sull'icona a forma di ingranaggio
   - Regola la dimensione del carattere secondo le tue esigenze

3. **Lingua dell'interfaccia**:
   - Clicca sull'icona a forma di ingranaggio
   - Seleziona la lingua preferita dall'elenco disponibile

## Risoluzione dei Problemi Software

### La pagina MakeCode non si carica correttamente
- Svuota la cache del browser e ricarica la pagina
- Prova un browser diverso
- Verifica la tua connessione internet

### Non riesci a connetterti all'EV3 via WebUSB
- Assicurati che il cavo USB sia collegato correttamente
- Verifica che il tuo browser supporti WebUSB
- Prova una porta USB diversa sul tuo computer
- Riavvia il brick EV3

### L'editor JavaScript mostra errori inaspettati
- Verifica la sintassi del codice
- Prova a tornare alla modalità blocchi e poi di nuovo a JavaScript
- Aggiorna la pagina e ricarica il progetto

## Conclusione

Con il software configurato correttamente, sei pronto per iniziare a programmare il tuo robot EV3 utilizzando JavaScript in MakeCode. Nel prossimo modulo, imparerai come stabilire il primo collegamento con il tuo robot e caricare un programma di test.

---

[⬅️ Preparazione dell'hardware EV3](./01-PreparazioneHardware.md) | [➡️ Primo collegamento al robot](./03-PrimoCollegamento.md)
