# Strumenti di debug per applicazioni Tauri

## Indice dei contenuti
- [Introduzione](#introduzione)
- [Debug del frontend](#debug-del-frontend)
- [Debug del backend Rust](#debug-del-backend-rust)
- [Logging e tracciamento](#logging-e-tracciamento)
- [Strumenti di analisi](#strumenti-di-analisi)
- [Risoluzione dei problemi comuni](#risoluzione-dei-problemi-comuni)

## Introduzione

Il debugging è una parte essenziale del processo di sviluppo software, e le applicazioni Tauri non fanno eccezione. Tuttavia, poiché Tauri combina un frontend web con un backend Rust, il debugging richiede un approccio su due fronti. In questa guida, esploreremo gli strumenti e le tecniche per il debugging efficace di entrambi i lati di un'applicazione Tauri, oltre a strategie per identificare e risolvere i problemi più comuni.

## Debug del frontend

Il frontend di un'applicazione Tauri è essenzialmente un'applicazione web che viene eseguita all'interno di WebView2. Fortunatamente, è possibile utilizzare gli stessi strumenti di sviluppo web che si utilizzerebbero per un'applicazione web tradizionale.

### DevTools integrati

Tauri include gli strumenti di sviluppo di WebView2, che sono basati su quelli di Chrome/Edge:

1. **Apertura dei DevTools**:
   - Premere `F12` o `Ctrl+Shift+I` nell'applicazione in esecuzione
   - In alternativa, aggiungere un pulsante o una scorciatoia personalizzata nel codice:
     ```javascript
     // Nel frontend
     import { appWindow } from '@tauri-apps/api/window';
     
     // Funzione per aprire i DevTools
     function openDevTools() {
       appWindow.webviewWindow.openDevTools();
     }
     ```

2. **Funzionalità dei DevTools**:
   - **Elements**: Ispezionare e modificare il DOM
   - **Console**: Visualizzare log e messaggi di errore
   - **Network**: Monitorare le richieste di rete
   - **Sources**: Debuggare il codice JavaScript con breakpoint
   - **Application**: Gestire storage, cache e altro

### Configurazione di ispezione remota

Per un'esperienza di debugging più flessibile, è possibile configurare l'ispezione remota:

1. **Abilitare i DevTools in modalità sviluppo**:
   ```json
   // tauri.conf.json
   {
     "build": {
       "devPath": "http://localhost:3000",
       "devtools": true
     }
   }
   ```

2. **Utilizzare un server di sviluppo esterno**:
   - Configurare il frontend per essere servito da un server di sviluppo (Vite, webpack-dev-server, ecc.)
   - Impostare `devPath` nel file `tauri.conf.json` per puntare all'URL del server di sviluppo
   - Avviare l'applicazione con `tauri dev`

3. **Hot Reload**:
   Con questa configurazione, le modifiche al codice frontend verranno automaticamente ricaricate nell'applicazione Tauri.

### Debugging di framework specifici

#### React DevTools

Per applicazioni che utilizzano React:

1. Installare l'estensione React DevTools nel browser
2. Utilizzare la versione di sviluppo di React nel progetto
3. I React DevTools saranno disponibili nella scheda "Components" dei DevTools

#### Vue DevTools

Per applicazioni che utilizzano Vue.js:

1. Installare l'estensione Vue DevTools nel browser
2. Utilizzare la versione di sviluppo di Vue nel progetto
3. I Vue DevTools saranno disponibili nella scheda "Vue" dei DevTools

## Debug del backend Rust

Il debugging del backend Rust richiede un approccio diverso rispetto al frontend, poiché si tratta di codice nativo compilato.

### Logging con `log` crate

Il modo più semplice per debuggare il backend Rust è utilizzare il logging:

1. **Aggiungere le dipendenze necessarie**:
   ```toml
   # Cargo.toml
   [dependencies]
   log = "0.4"
   env_logger = "0.9"
   ```

2. **Inizializzare il logger**:
   ```rust
   // main.rs
   use log::{info, warn, error, debug, trace};
   
   fn main() {
     env_logger::init();
     info!("Applicazione avviata");
     // ...
   }
   ```

3. **Utilizzare le macro di logging**:
   ```rust
   debug!("Valore della variabile: {}", variabile);
   info!("Operazione completata con successo");
   warn!("Attenzione: situazione inaspettata");
   error!("Si è verificato un errore: {}", err);
   ```

4. **Configurare il livello di log**:
   - Impostare la variabile d'ambiente `RUST_LOG` prima di avviare l'applicazione:
     ```bash
     # Windows PowerShell
     $env:RUST_LOG="debug"
     cargo tauri dev
     ```
   - Livelli disponibili: error, warn, info, debug, trace

### Debugging con VS Code e LLDB

Per un debugging più avanzato con breakpoint e ispezione delle variabili:

1. **Installare l'estensione CodeLLDB** in VS Code

2. **Creare un file di configurazione per il debugging**:
   Creare un file `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "lldb",
         "request": "launch",
         "name": "Debug Tauri App",
         "cargo": {
           "args": ["build", "--manifest-path=src-tauri/Cargo.toml"]
         },
         "program": "${workspaceFolder}/src-tauri/target/debug/app",
         "args": [],
         "cwd": "${workspaceFolder}",
         "env": {
           "RUST_BACKTRACE": "1"
         }
       }
     ]
   }
   ```

3. **Avviare il debugging**:
   - Impostare breakpoint nel codice Rust
   - Premere F5 o selezionare "Debug Tauri App" dal menu di debug
   - Utilizzare i controlli di debug per eseguire il codice passo-passo
   - Ispezionare variabili, stack e altro

### Debugging con altri IDE

#### CLion / IntelliJ IDEA

1. Aprire il progetto Tauri
2. Configurare una configurazione di esecuzione Cargo
3. Impostare breakpoint nel codice Rust
4. Avviare il debugging

## Logging e tracciamento

### Logging integrato

Tauri fornisce un sistema di logging integrato che può essere utilizzato sia dal frontend che dal backend:

1. **Configurazione in `tauri.conf.json`**:
   ```json
   {
     "tauri": {
       "allowlist": {
         "log": {
           "all": true
         }
       }
     }
   }
   ```

2. **Utilizzo nel frontend**:
   ```javascript
   import { info, error, warn, debug, trace } from '@tauri-apps/api/log';
   
   info('Informazione dal frontend');
   error('Errore dal frontend');
   ```

3. **Utilizzo nel backend**:
   ```rust
   #[tauri::command]
   fn mia_funzione() -> Result<(), String> {
     tauri::api::log::info("Informazione dal backend");
     tauri::api::log::error("Errore dal backend");
     Ok(())
   }
   ```

### Tracciamento delle prestazioni

Per identificare colli di bottiglia e problemi di prestazioni:

1. **Tracciamento nel frontend**:
   ```javascript
   console.time('operazione');
   // ... codice da misurare
   console.timeEnd('operazione');
   ```

2. **Tracciamento nel backend**:
   ```rust
   use std::time::Instant;
   
   let start = Instant::now();
   // ... codice da misurare
   let duration = start.elapsed();
   log::info!("L'operazione ha richiesto: {:?}", duration);
   ```

## Strumenti di analisi

### Tauri Inspector

Tauri Inspector è uno strumento specifico per ispezionare e debuggare applicazioni Tauri:

1. **Installazione**:
   ```bash
   npm install --save-dev @tauri-apps/tauri-inspector
   ```

2. **Configurazione**:
   Aggiungere al file `tauri.conf.json`:
   ```json
   {
     "build": {
       "beforeDevCommand": "npm run dev",
       "beforeBuildCommand": "npm run build",
       "devPath": "http://localhost:3000",
       "distDir": "../dist",
       "withGlobalTauri": true
     }
   }
   ```

3. **Utilizzo**:
   - Avviare l'applicazione in modalità sviluppo
   - Accedere all'inspector tramite l'URL fornito

### Rust Analyzer

Rust Analyzer fornisce analisi in tempo reale del codice Rust:

1. **Installazione**: Installare l'estensione Rust Analyzer in VS Code

2. **Funzionalità**:
   - Evidenziazione degli errori in tempo reale
   - Suggerimenti di refactoring
   - Navigazione intelligente nel codice
   - Visualizzazione dei tipi e della documentazione

### Lighthouse

Per analizzare le prestazioni del frontend:

1. **Utilizzo con Chrome DevTools**:
   - Aprire i DevTools
   - Andare alla scheda "Lighthouse"
   - Eseguire un'analisi

2. **Metriche importanti**:
   - First Contentful Paint
   - Time to Interactive
   - Total Blocking Time
   - Largest Contentful Paint
   - Cumulative Layout Shift

### Analisi della dimensione del bundle

Per ottimizzare la dimensione dell'applicazione:

1. **Analisi del frontend**:
   - Utilizzare strumenti come `webpack-bundle-analyzer` o `vite-bundle-visualizer`

2. **Analisi del backend**:
   - Utilizzare `cargo bloat` per analizzare la dimensione del binario Rust
   ```bash
   cargo install cargo-bloat
   cargo bloat --release
   ```

## Risoluzione dei problemi comuni

### Problemi di comunicazione frontend-backend

1. **Errori nelle chiamate API**:
   - Verificare che le funzioni siano correttamente esposte con `#[tauri::command]`
   - Controllare che le funzioni siano registrate nel setup di Tauri
   - Verificare i tipi di dati passati tra frontend e backend

2. **Problemi di serializzazione/deserializzazione**:
   - Utilizzare tipi compatibili con serde
   - Aggiungere log per visualizzare i dati prima e dopo la serializzazione

### Problemi di rendering

1. **Schermata bianca**:
   - Verificare che il percorso al frontend sia corretto in `tauri.conf.json`
   - Controllare gli errori nella console dei DevTools
   - Verificare che WebView2 sia installato correttamente

2. **Problemi di layout**:
   - Utilizzare i DevTools per ispezionare il DOM e gli stili
   - Verificare la compatibilità CSS con WebView2

### Problemi di prestazioni

1. **Avvio lento**:
   - Analizzare il tempo di compilazione del backend Rust
   - Ottimizzare il caricamento del frontend
   - Considerare la lazy-loading per componenti non essenziali

2. **Operazioni bloccanti**:
   - Spostare operazioni pesanti in thread separati
   - Utilizzare operazioni asincrone sia nel frontend che nel backend

### Crash e errori fatali

1. **Panic in Rust**:
   - Abilitare i backtrace con `RUST_BACKTRACE=1`
   - Utilizzare `Result` e `Option` per gestire gli errori in modo sicuro
   - Implementare un hook di panic personalizzato per registrare informazioni dettagliate

2. **Errori JavaScript non gestiti**:
   - Implementare gestori di errori globali
   - Utilizzare try/catch intorno al codice critico

## Domande di autovalutazione

1. Come si possono aprire gli strumenti di sviluppo (DevTools) in un'applicazione Tauri in esecuzione?
   - A) Non è possibile accedere ai DevTools in Tauri
   - B) Premendo F12 o Ctrl+Shift+I
   - C) Solo tramite configurazione speciale nel codice
   - D) Solo tramite un'estensione di browser

2. Quale crate Rust è comunemente utilizzato per il logging nel backend di un'applicazione Tauri?
   - A) println
   - B) debug
   - C) log
   - D) console

3. Come si può abilitare il debugging con breakpoint per il backend Rust in VS Code?
   - A) Non è possibile debuggare il backend Rust
   - B) Utilizzando l'estensione CodeLLDB e un file launch.json
   - C) Solo tramite print di debug
   - D) Utilizzando esclusivamente Chrome DevTools

4. Quale variabile d'ambiente controlla il livello di dettaglio dei log in un'applicazione Rust?
   - A) LOG_LEVEL
   - B) RUST_LOG
   - C) DEBUG_LEVEL
   - D) TAURI_LOG

5. Quale strumento può essere utilizzato per analizzare la dimensione del binario Rust in un'applicazione Tauri?
   - A) size-analyzer
   - B) rust-size
   - C) cargo-bloat
   - D) bundle-analyzer

## Esercizi proposti

1. Implementa un sistema di logging avanzato per un'applicazione Tauri che registri eventi sia nel frontend che nel backend, con diversi livelli di dettaglio e output su file.

2. Configura un ambiente di debugging completo in VS Code che permetta di debuggare contemporaneamente il frontend e il backend di un'applicazione Tauri.

3. Crea una funzione di diagnostica che raccolga informazioni sul sistema, sull'applicazione e sulle prestazioni, e le visualizzi in una pagina di debug accessibile dall'applicazione.

4. Implementa un sistema di gestione degli errori che catturi e registri tutti gli errori non gestiti, sia nel frontend che nel backend, e fornisca informazioni dettagliate per il debugging.

5. Utilizza gli strumenti di analisi delle prestazioni per identificare e risolvere colli di bottiglia in un'applicazione Tauri esistente, documentando il processo e i miglioramenti ottenuti.

## Risposte alle domande di autovalutazione

1. B) Premendo F12 o Ctrl+Shift+I
2. C) log
3. B) Utilizzando l'estensione CodeLLDB e un file launch.json
4. B) RUST_LOG
5. C) cargo-bloat

---
- [⬅️ Configurazione dell'editor di codice](./03_Configurazione_editor_codice.md)
- [📑 Indice](<../README.md>)
- [➡️ Best practices per l'organizzazione del workspace >>](./05_Best_practices_organizzazione_workspace.md)

