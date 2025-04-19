# Ambiente di sviluppo per Tauri

## Indice dei contenuti
- [Prerequisiti: Rust, Node.js, e strumenti di sviluppo](#prerequisiti-rust-nodejs-e-strumenti-di-sviluppo)
- [Installazione dell'ambiente Tauri su Windows](#installazione-dellambiente-tauri-su-windows)
- [Configurazione dell'editor di codice](#configurazione-delleditor-di-codice)
- [Strumenti di debug per applicazioni Tauri](#strumenti-di-debug-per-applicazioni-tauri)
- [Best practices per l'organizzazione del workspace](#best-practices-per-lorganizzazione-del-workspace)

## Prerequisiti: Rust, Node.js, e strumenti di sviluppo

Prima di iniziare a sviluppare con Tauri, è necessario installare e configurare diversi componenti essenziali:

### Rust e Cargo

Rust è il linguaggio di programmazione utilizzato per il backend delle applicazioni Tauri. Per installarlo:

1. Visitare [rustup.rs](https://rustup.rs/)
2. Scaricare e eseguire il programma di installazione
3. Seguire le istruzioni a schermo per l'installazione predefinita

Dopo l'installazione, verificare che tutto funzioni correttamente aprendo un terminale e digitando:

```bash
rustc --version
cargo --version
```

### Node.js e npm

Node.js è necessario per gestire le dipendenze frontend e gli strumenti di build:

1. Visitare [nodejs.org](https://nodejs.org/)
2. Scaricare la versione LTS (Long Term Support) consigliata per Windows
3. Eseguire l'installer e seguire le istruzioni

Verificare l'installazione con:

```bash
node --version
npm --version
```

### Strumenti di sviluppo C++

Per compilare alcune dipendenze native, sono necessari gli strumenti di sviluppo C++:

1. **Visual Studio Build Tools**: Scaricare e installare da [visualstudio.microsoft.com](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Durante l'installazione, selezionare il carico di lavoro "Sviluppo di applicazioni desktop con C++"

### WebView2

Tauri su Windows utilizza Microsoft Edge WebView2 per renderizzare l'interfaccia utente:

1. Nella maggior parte dei sistemi Windows 10/11 recenti è già installato
2. In caso contrario, scaricare il runtime WebView2 da [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

## Installazione dell'ambiente Tauri su Windows

Una volta installati tutti i prerequisiti, è possibile configurare l'ambiente Tauri:

### Installazione CLI di Tauri

```bash
npm install -g @tauri-apps/cli
```

### Verifica dell'installazione

Per verificare che l'ambiente Tauri sia configurato correttamente:

```bash
tauri info
```

Questo comando mostrerà informazioni dettagliate sull'ambiente di sviluppo, evidenziando eventuali problemi o componenti mancanti.

### Risoluzione dei problemi comuni

- **Errori di compilazione Rust**: Assicurarsi che gli strumenti di sviluppo C++ siano installati correttamente
- **WebView2 non trovato**: Installare manualmente il runtime WebView2
- **Permessi PowerShell**: Potrebbe essere necessario eseguire `Set-ExecutionPolicy RemoteSigned` in PowerShell come amministratore

## Configurazione dell'editor di codice

### Visual Studio Code

VS Code è l'editor più popolare per lo sviluppo Tauri grazie al suo eccellente supporto per Rust e JavaScript/TypeScript:

1. Scaricare e installare [VS Code](https://code.visualstudio.com/)
2. Installare le seguenti estensioni essenziali:
   - **rust-analyzer**: Supporto avanzato per Rust
   - **Tauri**: Supporto ufficiale per Tauri
   - **CodeLLDB**: Debugger per Rust
   - **JavaScript/TypeScript**: Supporto per il frontend

### Configurazione consigliata

Aggiungere queste impostazioni al file `settings.json` di VS Code per un'esperienza ottimale:

```json
{
  "rust-analyzer.checkOnSave.command": "clippy",
  "rust-analyzer.cargo.features": ["custom-protocol"],
  "[rust]": {
    "editor.defaultFormatter": "rust-lang.rust-analyzer",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

### Altri IDE

Altre opzioni valide includono:

- **IntelliJ IDEA** con il plugin Rust
- **CLion** per un'esperienza di sviluppo Rust più completa
- **WebStorm** per chi preferisce gli IDE JetBrains per lo sviluppo frontend

## Strumenti di debug per applicazioni Tauri

Il debug di applicazioni Tauri coinvolge sia il frontend che il backend:

### Debug del frontend

1. **DevTools integrati**: Premere `F12` o `Ctrl+Shift+I` nell'applicazione in esecuzione
2. **Configurazione di ispezione remota**:
   ```json
   // tauri.conf.json
   {
     "build": {
       "devPath": "http://localhost:3000",
       "devtools": true
     }
   }
   ```

### Debug del backend Rust

1. **Logging con `log` crate**:
   ```rust
   use log::{info, warn, error};
   
   fn main() {
     env_logger::init();
     info!("Applicazione avviata");
   }
   ```

2. **Configurazione VS Code per il debug**:
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
         "cwd": "${workspaceFolder}"
       }
     ]
   }
   ```

### Strumenti di analisi

- **Tauri Inspector**: Strumento per ispezionare e debuggare applicazioni Tauri
- **Rust Analyzer**: Fornisce analisi in tempo reale del codice Rust
- **Lighthouse**: Per analizzare le prestazioni del frontend

## Best practices per l'organizzazione del workspace

### Struttura del progetto consigliata

```
mia-app-tauri/
├── src-tauri/            # Backend Rust
│   ├── src/              # Codice sorgente Rust
│   ├── Cargo.toml        # Dipendenze Rust
│   └── tauri.conf.json   # Configurazione Tauri
├── src/                  # Frontend
│   ├── assets/           # Risorse statiche
│   ├── components/       # Componenti UI
│   ├── styles/           # File CSS/SCSS
│   └── main.js           # Punto di ingresso
├── package.json          # Dipendenze npm
└── README.md             # Documentazione
```

### Gestione delle dipendenze

- **Cargo.toml**: Mantenere aggiornate le dipendenze Rust
- **package.json**: Utilizzare versioni fisse per le dipendenze npm
- **Lockfiles**: Committare sempre `Cargo.lock` e `package-lock.json`

### Controllo versione

Creare un file `.gitignore` appropriato:

```
# Rust
/target
**/*.rs.bk

# Node.js
/node_modules

# Build
/dist
/build

# Ambiente
.env
.env.local

# Editor
.vscode/*
!.vscode/extensions.json
!.vscode/launch.json
!.vscode/settings.json
.idea/
```

### Automazione del workflow

Configurare script npm utili in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build",
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}
```

## Domande di autovalutazione

1. Quali sono i componenti essenziali da installare per sviluppare con Tauri su Windows?
   - A) Solo Node.js e npm
   - B) Rust, Cargo, Node.js, npm e WebView2
   - C) Python, Node.js e Rust
   - D) Visual Studio e .NET Framework

2. Quale comando permette di verificare che l'ambiente Tauri sia configurato correttamente?
   - A) `tauri check`
   - B) `tauri verify`
   - C) `tauri info`
   - D) `tauri doctor`

3. Quale estensione di VS Code fornisce supporto avanzato per lo sviluppo Rust?
   - A) rust-lang
   - B) rust-analyzer
   - C) rust-dev
   - D) rust-tools

4. Come si possono aprire gli strumenti di sviluppo (DevTools) in un'applicazione Tauri in esecuzione?
   - A) Non è possibile accedere ai DevTools in Tauri
   - B) Premendo F12 o Ctrl+Shift+I
   - C) Solo tramite configurazione speciale nel codice
   - D) Solo tramite un'estensione di browser

5. Quale file contiene la configurazione principale di un'applicazione Tauri?
   - A) tauri.json
   - B) tauri.config.js
   - C) tauri.conf.json
   - D) config.tauri.json

## Esercizi proposti

1. Configura un ambiente di sviluppo completo per Tauri su Windows, documentando ogni passaggio e gli eventuali problemi incontrati.

2. Crea un progetto Tauri di base e personalizza la configurazione in `tauri.conf.json` per modificare il titolo dell'applicazione, l'icona e altre proprietà.

3. Configura VS Code con tutte le estensioni necessarie per lo sviluppo Tauri e crea un file di configurazione per il debugging del backend Rust.

4. Implementa un sistema di logging avanzato per un'applicazione Tauri che registri eventi sia nel frontend che nel backend.

5. Crea una guida passo-passo per risolvere i problemi più comuni durante la configurazione dell'ambiente Tauri su Windows.

## Risposte alle domande di autovalutazione

1. B) Rust, Cargo, Node.js, npm e WebView2
2. C) `tauri info`
3. B) rust-analyzer
4. B) Premendo F12 o Ctrl+Shift+I
5. C) tauri.conf.json

---
- [⬅️ Introduzione a Tauri](<01_Introduzione_a_Tauri.md>)
- [📑 Indice](<../README.md>)
- [➡️ Prima applicazione con Tauri](<03_Prima_applicazione_con_Tauri.md>)
