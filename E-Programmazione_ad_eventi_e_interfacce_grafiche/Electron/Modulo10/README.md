# Modulo 10: Distribuzione e deployment

## Obiettivi di apprendimento
- Pacchettizzare un'applicazione Electron per diverse piattaforme
- Implementare un sistema di auto-aggiornamenti
- Gestire le release delle applicazioni
- Garantire la sicurezza delle applicazioni desktop
- Distribuire un'applicazione completa multi-piattaforma

## Contenuti
1. **Pacchettizzazione dell'applicazione**
   - **Electron Forge e Electron Builder**
     - Confronto tra i due strumenti principali
     - Configurazione del file `package.json` per la distribuzione
     - Gestione delle dipendenze native
   - **Pacchettizzazione per Windows**
     - Creazione di installer `.exe` e `.msi`
     - Code signing e certificati
     - Personalizzazione dell'installer
   - **Pacchettizzazione per macOS**
     - Creazione di bundle `.app` e `.dmg`
     - Notarization e Gatekeeper
     - Gestione delle autorizzazioni
   - **Pacchettizzazione per Linux**
     - Formati `.deb`, `.rpm` e `.AppImage`
     - Integrazione con i package manager
     - Gestione delle dipendenze di sistema
   - **Ottimizzazione delle dimensioni del pacchetto**
     - Tecniche di riduzione delle dimensioni
     - Strategie di packaging delle risorse
   - **Esempi di configurazione**
     ```json
     // Esempio di configurazione electron-builder in package.json
     "build": {
       "appId": "com.example.myapp",
       "productName": "MyApp",
       "mac": {
         "category": "public.app-category.productivity"
       },
       "win": {
         "target": ["nsis", "msi"]
       },
       "linux": {
         "target": ["deb", "rpm", "AppImage"]
       }
     }
     ```
   - **Esercizi pratici**
     - Configurare electron-builder per un'applicazione esistente
     - Creare un installer personalizzato con logo e licenza

2. **Auto-aggiornamenti**
   - **Electron Updater**
     - Integrazione con `electron-builder`
     - Configurazione del server di aggiornamento
     - Gestione delle versioni semantiche
   - **Squirrel.Windows e Squirrel.Mac**
     - Configurazione e utilizzo
     - Vantaggi e limitazioni
   - **Implementazione di un server di aggiornamento**
     - Self-hosted vs servizi cloud
     - GitHub Releases come server di aggiornamento
     - AWS S3 come alternativa
   - **Gestione del ciclo di aggiornamento**
     - Controllo degli aggiornamenti disponibili
     - Download e installazione automatica
     - Notifiche all'utente e riavvii
   - **Rollback e ripristino in caso di errori**
     - Strategie di gestione dei fallimenti
     - Backup delle configurazioni
   - **Esempio implementativo di auto-update**
     ```javascript
     // main.js
     const { app, autoUpdater } = require('electron');
     const log = require('electron-log');
     const { is } = require('electron-util');
     
     function setupAutoUpdater() {
       // URL del server di aggiornamento
       const server = 'https://update.example.com';
       const url = `${server}/update/${process.platform}/${app.getVersion()}`;
       
       autoUpdater.setFeedURL({ url });
       
       // Controlla gli aggiornamenti ogni 10 minuti
       setInterval(() => {
         autoUpdater.checkForUpdates();
       }, 10 * 60 * 1000);
       
       autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
         const dialogOpts = {
           type: 'info',
           buttons: ['Riavvia', 'Più tardi'],
           title: 'Aggiornamento Disponibile',
           message: `È disponibile la versione ${releaseName}`,
           detail: releaseNotes
         };
         
         dialog.showMessageBox(dialogOpts).then((returnValue) => {
           if (returnValue.response === 0) autoUpdater.quitAndInstall();
         });
       });
       
       autoUpdater.on('error', (error) => {
         log.error('Errore durante l\'aggiornamento:', error);
       });
     }
     
     if (!is.development) {
       setupAutoUpdater();
     }
     ```
   - **Esercizi pratici**
     - Implementare un sistema di auto-update usando GitHub Releases
     - Creare un meccanismo di rollback in caso di aggiornamento fallito

3. **Gestione delle release**
   - **Versionamento semantico**
     - Struttura MAJOR.MINOR.PATCH
     - Quando incrementare ciascun numero
     - Gestione delle pre-release e build metadata
   - **Changelog e documentazione**
     - Automazione della generazione del changelog
     - Documentazione delle nuove funzionalità
     - Note di rilascio per gli utenti finali
   - **Continuous Integration/Continuous Deployment (CI/CD)**
     - Integrazione con GitHub Actions
     - Automazione dei build per piattaforme multiple
     - Test automatici prima del rilascio
   - **Canali di distribuzione**
     - Canali alpha, beta e stable
     - Gestione del feedback degli utenti beta
     - Strategie di roll-out progressivo
   - **Esempio di file di configurazione GitHub Actions**
     ```yaml
     # .github/workflows/build.yml
     name: Build/release
     
     on:
       push:
         tags:
           - 'v*'
     
     jobs:
       release:
         runs-on: ${{ matrix.os }}
         
         strategy:
           matrix:
             os: [macos-latest, ubuntu-latest, windows-latest]
             
         steps:
           - name: Check out Git repository
             uses: actions/checkout@v2
             
           - name: Setup Node.js
             uses: actions/setup-node@v1
             with:
               node-version: 16
               
           - name: Install dependencies
             run: npm ci
             
           - name: Build/release Electron app
             uses: samuelmeuli/action-electron-builder@v1
             with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               release: ${{ startsWith(github.ref, 'refs/tags/v') }}
     ```
   - **Esercizi pratici**
     - Configurare un workflow CI/CD con GitHub Actions
     - Implementare la generazione automatica di changelog

4. **Sicurezza delle applicazioni desktop**
   - **Hardening dell'applicazione**
     - Configurazione CSP (Content Security Policy)
     - Disabilitazione di funzionalità pericolose
     - Sandboxing del renderer process
   - **Protezione contro attacchi comuni**
     - Cross-Site Scripting (XSS)
     - Injection attacks
     - Man-in-the-middle attacks
   - **Gestione sicura di dati sensibili**
     - Crittografia dei dati locali
     - Secure storage di credenziali
     - Protezione API keys e secrets
   - **Audit di sicurezza**
     - Strumenti per la scansione delle vulnerabilità
     - Gestione delle dipendenze vulnerabili
     - Aggiornamento regolare dei componenti
   - **Comunicazione sicura con i server**
     - HTTPS e certificati
     - Certificate pinning
     - Autenticazione sicura
   - **Esempi di implementazione sicura**
     ```javascript
     // Configurazione CSP in un'applicazione Electron
     const mainWindow = new BrowserWindow({
       webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         nodeIntegration: false,
         contextIsolation: true,
         sandbox: true,
         webSecurity: true,
         allowRunningInsecureContent: false
       }
     });
     
     // Impostare una Content Security Policy
     mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
       callback({
         responseHeaders: {
           ...details.responseHeaders,
           'Content-Security-Policy': [
             "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
           ]
         }
       });
     });
     
     // Secure Storage usando keytar
     const keytar = require('keytar');
     
     async function saveApiKey(service, account, apiKey) {
       await keytar.setPassword(service, account, apiKey);
     }
     
     async function getApiKey(service, account) {
       return await keytar.getPassword(service, account);
     }
     ```
   - **Esercizi pratici**
     - Eseguire un audit di sicurezza su un'applicazione esistente
     - Implementare un sistema di crittografia per dati sensibili

5. **Progetto finale: Distribuzione di un'applicazione completa multi-piattaforma**
   - **Specifiche del progetto**
     - Obiettivi dell'applicazione
     - Requisiti funzionali e non funzionali
     - Architettura dell'applicazione
   - **Implementazione**
     - Struttura del codice
     - UI/UX design
     - Gestione dello stato e persistenza dei dati
   - **Pacchettizzazione**
     - Configurazione per tutte le piattaforme
     - Gestione delle specificità di ciascuna piattaforma
     - Ottimizzazione delle risorse
   - **Sistema di aggiornamento**
     - Implementazione del sistema di auto-update
     - Server di distribuzione degli aggiornamenti
     - Gestione del ciclo di vita degli aggiornamenti
   - **Distribuzione**
     - Pubblicazione sugli store (Windows Store, Mac App Store)
     - Distribuzione via web
     - Metriche di installazione e utilizzo
   - **Manutenzione**
     - Pianificazione dei rilasci futuri
     - Raccolta feedback e bug tracking
     - Supporto post-rilascio
   - **Milestone del progetto**
     1. Progettazione e definizione dei requisiti (Settimana 1)
     2. Sviluppo delle funzionalità base (Settimana 2)
     3. Implementazione UI/UX (Settimana 3)
     4. Configurazione packaging e distribuzione (Settimana 4)
     5. Implementazione sistema di aggiornamento (Settimana 5)
     6. Testing e debugging (Settimana 6)
     7. Rilascio finale e documentazione (Settimana 7)
   - **Risorse per il progetto finale**
     - Template di progetto iniziale
     - Checklist di sicurezza pre-distribuzione
     - Modelli per documentazione tecnica

## Risorse e strumenti consigliati
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)
- [electron-updater](https://www.electron.build/auto-update)
- [Code Signing Guide](https://www.electronjs.org/docs/tutorial/code-signing)
- [Electron Security Checklist](https://www.electronjs.org/docs/tutorial/security)
- [GitHub Actions per Electron](https://github.com/features/actions)
- [AppImage](https://appimage.org/)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Store](https://github.com/sindresorhus/electron-store) - Persistenza dei dati
- [Spectron](https://github.com/electron-userland/spectron) - Framework di test per Electron
- [electron-notarize](https://github.com/electron/electron-notarize) - Notarizzazione per macOS
- [Snyk](https://snyk.io/) - Analisi vulnerabilità nelle dipendenze
- [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer) - Installazione DevTools estensioni

## Valutazione
Il modulo sarà valutato attraverso:
1. Un progetto finale che comprenda la distribuzione completa di un'applicazione Electron
2. Una presentazione tecnica sulle scelte di deployment effettuate
3. Una documentazione dettagliata del processo di rilascio e manutenzione

## Timeline del corso
- **Settimana 1-2**: Pacchettizzazione dell'applicazione
  - Lezioni teoriche (3 ore)
  - Laboratorio pratico (5 ore)
  - Esercizi individuali (4 ore)
  
- **Settimana 3-4**: Auto-aggiornamenti e gestione delle release
  - Lezioni teoriche (4 ore)
  - Laboratorio pratico (6 ore)
  - Esercizi individuali (4 ore)
  
- **Settimana 5**: Sicurezza delle applicazioni desktop
  - Lezioni teoriche (2 ore)
  - Laboratorio pratico (3 ore)
  - Analisi di casi di studio (2 ore)
  
- **Settimane 6-8**: Progetto finale
  - Pianificazione e design (4 ore)
  - Sviluppo guidato (8 ore)
  - Review e feedback (4 ore)
  - Presentazione finale (2 ore)

## FAQ - Domande frequenti
1. **Qual è la differenza principale tra Electron Forge e Electron Builder?**
   Electron Forge è una soluzione "tutto in uno" che include strumenti per packaging, pubblicazione e template, mentre Electron Builder è focalizzato specificamente sulla creazione di pacchetti distribuibili con configurazioni avanzate.

2. **È necessario avere certificati di code signing per tutte le piattaforme?**
   Non è obbligatorio, ma fortemente raccomandato, specialmente per Windows e macOS dove l'assenza di firma può causare avvisi di sicurezza.

3. **Come posso gestire aggiornamenti in background?**
   Puoi utilizzare la libreria `electron-updater` insieme a processi in background per verificare e scaricare aggiornamenti senza interrompere l'utilizzo dell'applicazione.

4. **Quali sono le strategie migliori per ridurre le dimensioni del pacchetto finale?**
   Utilizza strumenti come `electron-packager` con opzioni di pruning, escludi file non necessari, comprimi assets e considera l'utilizzo di tecniche di lazy-loading.
