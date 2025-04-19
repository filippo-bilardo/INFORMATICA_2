# Configurazione dell'editor di codice

## Indice dei contenuti
- [Introduzione](#introduzione)
- [Visual Studio Code](#visual-studio-code)
- [Altri IDE](#altri-ide)
- [Estensioni essenziali](#estensioni-essenziali)
- [Configurazioni consigliate](#configurazioni-consigliate)
- [Temi e personalizzazione](#temi-e-personalizzazione)

## Introduzione

Un ambiente di sviluppo ben configurato è fondamentale per lavorare efficacemente con Tauri. Poiché Tauri combina tecnologie web (JavaScript/TypeScript) con Rust, è importante scegliere e configurare un editor che supporti adeguatamente entrambi gli ecosistemi. In questa guida, esploreremo le opzioni disponibili, con particolare attenzione a Visual Studio Code, l'editor più popolare per lo sviluppo Tauri.

## Visual Studio Code

Visual Studio Code (VS Code) è l'editor più utilizzato per lo sviluppo Tauri grazie al suo eccellente supporto sia per Rust che per JavaScript/TypeScript, oltre alla vasta gamma di estensioni disponibili.

### Installazione di VS Code

1. Visitare [code.visualstudio.com](https://code.visualstudio.com/)
2. Scaricare l'installer per Windows
3. Eseguire l'installer e seguire le istruzioni
4. Durante l'installazione, si consiglia di selezionare le seguenti opzioni:
   - Aggiungere l'azione "Apri con Code" al menu contestuale di Windows Explorer
   - Registrare Code come editor per i tipi di file supportati
   - Aggiungere VS Code al PATH

### Vantaggi di VS Code per lo sviluppo Tauri

- **Supporto multilingua**: Eccellente supporto sia per Rust che per JavaScript/TypeScript
- **Integrazione con terminale**: Permette di eseguire comandi Tauri direttamente dall'editor
- **Debugging integrato**: Supporto per il debug sia del frontend che del backend Rust
- **Estensioni ufficiali**: Disponibilità di estensioni specifiche per Tauri e Rust
- **Leggerezza**: Prestazioni elevate anche con progetti complessi
- **Personalizzazione**: Altamente configurabile per adattarsi al flusso di lavoro personale

## Altri IDE

Sebbene VS Code sia la scelta più popolare, esistono altre valide alternative per lo sviluppo Tauri.

### JetBrains IDEs

#### IntelliJ IDEA con plugin Rust

IntelliJ IDEA è un potente IDE che può essere utilizzato per lo sviluppo Tauri installando il plugin Rust:

1. Scaricare e installare [IntelliJ IDEA](https://www.jetbrains.com/idea/) (Community Edition è gratuita)
2. Aprire IntelliJ IDEA e andare su File > Settings > Plugins
3. Cercare e installare il plugin "Rust"
4. Riavviare l'IDE

**Vantaggi**:
- Analisi del codice più approfondita
- Refactoring avanzato
- Integrazione con altri strumenti JetBrains

#### CLion

CLion è un IDE specifico per C/C++ e Rust che offre un'esperienza di sviluppo Rust più completa:

1. Scaricare e installare [CLion](https://www.jetbrains.com/clion/) (richiede licenza)
2. Il supporto Rust è integrato, ma potrebbe richiedere configurazione aggiuntiva

**Vantaggi**:
- Supporto nativo per Rust
- Debugging avanzato
- Analisi del codice approfondita

#### WebStorm

WebStorm è un IDE specifico per lo sviluppo web che può essere utilizzato per la parte frontend di Tauri:

1. Scaricare e installare [WebStorm](https://www.jetbrains.com/webstorm/) (richiede licenza)
2. Installare il plugin Rust per il supporto al backend

**Vantaggi**:
- Supporto avanzato per framework JavaScript
- Strumenti di debug frontend integrati
- Completamento intelligente per HTML, CSS e JavaScript

### Sublime Text

Sublime Text è un editor di testo leggero e veloce che può essere configurato per lo sviluppo Tauri:

1. Scaricare e installare [Sublime Text](https://www.sublimetext.com/)
2. Installare Package Control
3. Installare i pacchetti "Rust Enhanced" e "LSP" per il supporto Rust

**Vantaggi**:
- Estremamente veloce e leggero
- Altamente personalizzabile
- Supporto per progetti di grandi dimensioni

### Vim/Neovim

Per gli sviluppatori che preferiscono editor basati su terminale, Vim o Neovim possono essere configurati per lo sviluppo Tauri:

1. Installare Vim o Neovim
2. Configurare plugin come rust.vim, coc.nvim o ALE
3. Impostare Language Server Protocol (LSP) per il supporto Rust

**Vantaggi**:
- Flusso di lavoro basato su tastiera estremamente efficiente
- Funziona in ambienti remoti tramite SSH
- Altamente personalizzabile

## Estensioni essenziali

Indipendentemente dall'editor scelto, alcune estensioni sono fondamentali per lo sviluppo Tauri efficace.

### Estensioni VS Code essenziali

#### Per Rust

- **rust-analyzer**: Fornisce supporto avanzato per Rust, inclusi completamento del codice, navigazione, refactoring e analisi in tempo reale
  - Installazione: Cercare "rust-analyzer" nel marketplace di VS Code
  - Configurazione consigliata:
    ```json
    "rust-analyzer.checkOnSave.command": "clippy",
    "rust-analyzer.cargo.features": ["custom-protocol"]
    ```

- **CodeLLDB**: Debugger per Rust che permette di eseguire il debug del backend Tauri
  - Installazione: Cercare "CodeLLDB" nel marketplace di VS Code

- **crates**: Aiuta a gestire le dipendenze Rust in Cargo.toml
  - Installazione: Cercare "crates" nel marketplace di VS Code

#### Per Tauri

- **Tauri**: Estensione ufficiale per Tauri che fornisce snippets e supporto per la configurazione
  - Installazione: Cercare "Tauri" nel marketplace di VS Code

#### Per il frontend

- **ESLint**: Linting per JavaScript/TypeScript
  - Installazione: Cercare "ESLint" nel marketplace di VS Code

- **Prettier**: Formattazione del codice per JavaScript, TypeScript, HTML e CSS
  - Installazione: Cercare "Prettier" nel marketplace di VS Code

- **JavaScript and TypeScript Nightly**: Supporto avanzato per JavaScript e TypeScript
  - Installazione: Cercare "JavaScript and TypeScript Nightly" nel marketplace di VS Code

- **Estensioni specifiche per framework**: A seconda del framework frontend utilizzato (React, Vue, Svelte), installare le relative estensioni

### Estensioni per altri editor

#### IntelliJ IDEA / CLion / WebStorm

- Plugin Rust
- Tauri Plugin (se disponibile)
- Plugin specifici per il framework frontend utilizzato

#### Sublime Text

- Rust Enhanced
- LSP (Language Server Protocol)
- Tauri Snippets (se disponibile)

#### Vim/Neovim

- rust.vim
- coc.nvim con estensione rust-analyzer
- ALE (Asynchronous Lint Engine)

## Configurazioni consigliate

### Configurazione VS Code per Tauri

Per ottimizzare VS Code per lo sviluppo Tauri, aggiungere queste impostazioni al file `settings.json`:

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
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    }
  }
}
```

### Configurazione per il debugging

Per configurare VS Code per il debugging di applicazioni Tauri, creare un file `.vscode/launch.json` nella radice del progetto:

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
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Frontend",
      "url": "http://localhost:1420",
      "webRoot": "${workspaceFolder}/src"
    }
  ],
  "compounds": [
    {
      "name": "Debug Full Stack",
      "configurations": ["Debug Tauri App", "Debug Frontend"]
    }
  ]
}
```

### Configurazione per altri editor

#### IntelliJ IDEA / CLion

Per configurare JetBrains IDEs per Tauri:

1. Impostare il progetto come progetto Rust
2. Configurare il Run/Debug per eseguire `cargo tauri dev`
3. Impostare il formattatore di codice per Rust e JavaScript/TypeScript

#### Sublime Text

Per configurare Sublime Text per Tauri:

1. Configurare Rust Enhanced per utilizzare rust-analyzer
2. Impostare la formattazione automatica per Rust e JavaScript/TypeScript
3. Configurare build systems per eseguire comandi Tauri

## Temi e personalizzazione

La personalizzazione dell'editor può migliorare significativamente l'esperienza di sviluppo.

### Temi popolari per VS Code

- **One Dark Pro**: Tema scuro ispirato a Atom
- **GitHub Theme**: Tema ufficiale di GitHub (chiaro e scuro)
- **Material Theme**: Tema basato sul Material Design di Google
- **Dracula**: Tema scuro con colori vivaci
- **Winter is Coming**: Tema con varianti chiare e scure

### Font consigliati per la programmazione

- **Fira Code**: Font monospace con legature per simboli di programmazione
- **JetBrains Mono**: Font ottimizzato per la leggibilità del codice
- **Cascadia Code**: Font di Microsoft con legature
- **Source Code Pro**: Font Adobe open source per la programmazione

Per configurare un font con legature in VS Code:

```json
{
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true
}
```

### Personalizzazione dell'interfaccia

Oltre ai temi, è possibile personalizzare ulteriormente l'interfaccia dell'editor:

- **Icone dei file**: Estensioni come "Material Icon Theme" o "vscode-icons"
- **Layout dell'editor**: Configurare la posizione di pannelli e barre degli strumenti
- **Keybindings**: Personalizzare le scorciatoie da tastiera per adattarle al proprio flusso di lavoro

## Domande di autovalutazione

1. Quale estensione VS Code fornisce supporto avanzato per lo sviluppo Rust?
   - A) rust-lang
   - B) rust-analyzer
   - C) rust-dev
   - D) rust-tools

2. Quale debugger è consigliato per il debug del backend Rust in VS Code?
   - A) GDB
   - B) CodeLLDB
   - C) Rust Debugger
   - D) Chrome Debugger

3. Quale impostazione in VS Code abilita la formattazione automatica del codice Rust al salvataggio?
   - A) `"rust.formatOnSave": true`
   - B) `"[rust]": { "editor.formatOnSave": true }`
   - C) `"rust-analyzer.formatOnSave": true`
   - D) `"editor.autoFormat": "rust"`

4. Quale file è necessario creare per configurare il debugging di applicazioni Tauri in VS Code?
   - A) `.vscode/debug.json`
   - B) `.vscode/launch.json`
   - C) `.vscode/tasks.json`
   - D) `.vscode/config.json`

5. Quale di questi NON è un IDE JetBrains che può essere utilizzato per lo sviluppo Tauri?
   - A) IntelliJ IDEA
   - B) CLion
   - C) WebStorm
   - D) PyCharm

## Esercizi proposti

1. Configura VS Code con tutte le estensioni necessarie per lo sviluppo Tauri e crea un file di configurazione personalizzato che includa impostazioni ottimali per Rust e per il tuo framework frontend preferito.

2. Crea un file `.vscode/launch.json` per il debugging di un'applicazione Tauri e testa il debugging sia del backend Rust che del frontend.

3. Esplora almeno tre temi diversi per il tuo editor e documenta pro e contro di ciascuno, scegliendo infine quello che ritieni migliore per lo sviluppo Tauri.

4. Configura un editor alternativo a VS Code (IntelliJ IDEA, Sublime Text o altro) per lo sviluppo Tauri e confronta l'esperienza con quella di VS Code.

5. Crea una guida personalizzata per la configurazione dell'editor che utilizzi, includendo tutte le estensioni, impostazioni e personalizzazioni che ritieni utili per lo sviluppo Tauri.

## Risposte alle domande di autovalutazione

1. B) rust-analyzer
2. B) CodeLLDB
3. B) `"[rust]": { "editor.formatOnSave": true }`
4. B) `.vscode/launch.json`
5. D) PyCharm

---
- [⬅️ Installazione dell'ambiente Tauri su Windows](./02_Installazione_ambiente_Tauri_Windows.md)
- [📑 Indice](<../README.md>)
- [➡️ Strumenti di debug per applicazioni Tauri >>](./04_Strumenti_debug_applicazioni_Tauri.md)

