# Installazione dell'ambiente Tauri su Windows

## Indice dei contenuti
- [Introduzione](#introduzione)
- [Installazione CLI di Tauri](#installazione-cli-di-tauri)
- [Verifica dell'installazione](#verifica-dellinstallazione)
- [Configurazione del progetto](#configurazione-del-progetto)
- [Struttura di un progetto Tauri](#struttura-di-un-progetto-tauri)
- [Risoluzione dei problemi comuni](#risoluzione-dei-problemi-comuni)

## Introduzione

Dopo aver installato tutti i prerequisiti necessari (Rust, Node.js, strumenti di sviluppo C++ e WebView2), è possibile procedere con l'installazione e la configurazione dell'ambiente Tauri. Questa guida vi accompagnerà attraverso il processo di installazione della CLI di Tauri, la verifica dell'ambiente e la configurazione iniziale di un progetto.

## Installazione CLI di Tauri

La CLI (Command Line Interface) di Tauri è lo strumento principale per creare, sviluppare e costruire applicazioni Tauri. Fornisce comandi per inizializzare nuovi progetti, eseguire l'applicazione in modalità sviluppo e creare pacchetti per la distribuzione.

### Installazione globale

Il modo più semplice per installare la CLI di Tauri è tramite npm (Node Package Manager):

```bash
npm install -g @tauri-apps/cli
```

Questo comando installa la CLI di Tauri globalmente nel sistema, rendendola disponibile da qualsiasi posizione nel terminale.

### Installazione locale (per progetto)

In alternativa, è possibile installare la CLI di Tauri come dipendenza di sviluppo in un progetto specifico:

```bash
# Creare una cartella per il progetto
mkdir mia-app-tauri
cd mia-app-tauri

# Inizializzare un progetto npm
npm init -y

# Installare Tauri CLI come dipendenza di sviluppo
npm install --save-dev @tauri-apps/cli
```

Con questa configurazione, sarà necessario utilizzare `npx` per eseguire i comandi Tauri:

```bash
npx tauri <comando>
```

### Versioni di Tauri

Tauri segue il versionamento semantico (SemVer). Al momento della scrittura, la versione stabile più recente è la 1.x. È possibile specificare una versione particolare durante l'installazione:

```bash
npm install -g @tauri-apps/cli@1.4.0
```

## Verifica dell'installazione

Dopo aver installato la CLI di Tauri, è importante verificare che tutto sia configurato correttamente.

### Comando `tauri info`

Il comando `tauri info` fornisce informazioni dettagliate sull'ambiente di sviluppo:

```bash
tauri info
```

L'output dovrebbe mostrare:
- Versione di Tauri CLI
- Versione di Rust e Cargo
- Versione di Node.js e npm
- Stato di WebView2
- Altri componenti rilevanti

Esempio di output:

```
✓ Checking for required dependencies...
✓ Checking for installed dependencies...

OS: Windows 10 x64
Tauri CLI: 1.4.0
Rust: 1.70.0
Cargo: 1.70.0
Node.js: v18.16.0
npm: 9.5.1
WebView2: Installed
```

### Risoluzione di problemi rilevati

Se `tauri info` rileva problemi o componenti mancanti, seguire le istruzioni fornite per risolverli. Tipicamente, i problemi più comuni riguardano:

- Mancanza di WebView2
- Versioni obsolete di Rust o Node.js
- Strumenti di build C++ non configurati correttamente

## Configurazione del progetto

Una volta verificato che l'ambiente Tauri sia configurato correttamente, è possibile inizializzare un nuovo progetto.

### Inizializzazione di un progetto Tauri

Esistono due approcci principali per inizializzare un progetto Tauri:

#### 1. Inizializzazione in un progetto frontend esistente

Se si dispone già di un progetto frontend (React, Vue, Svelte, ecc.), è possibile aggiungere Tauri ad esso:

```bash
# Navigare nella cartella del progetto esistente
cd mio-progetto-frontend

# Aggiungere Tauri
npm install --save-dev @tauri-apps/cli
npx tauri init
```

Durante l'inizializzazione, verranno poste alcune domande:

- Nome dell'applicazione
- Finestra (window) dell'applicazione
- Comando per avviare l'applicazione in modalità sviluppo
- Comando per costruire l'applicazione
- Directory di output della build

#### 2. Creazione di un nuovo progetto da zero

Per creare un nuovo progetto Tauri da zero:

```bash
# Creare una nuova cartella per il progetto
mkdir mia-app-tauri
cd mia-app-tauri

# Inizializzare un progetto npm
npm init -y

# Installare Tauri CLI
npm install --save-dev @tauri-apps/cli

# Inizializzare Tauri
npx tauri init
```

In questo caso, sarà necessario configurare manualmente il frontend o utilizzare un template.

### Utilizzo di template

Tauri offre la possibilità di utilizzare template per inizializzare rapidamente progetti con configurazioni predefinite:

```bash
# Esempio con template React
npx create-tauri-app mia-app --template react

# Esempio con template Vue
npx create-tauri-app mia-app --template vue

# Esempio con template Svelte
npx create-tauri-app mia-app --template svelte
```

I template disponibili includono:
- `vanilla`: JavaScript puro
- `react`: React con Vite
- `vue`: Vue.js con Vite
- `svelte`: Svelte con Vite
- `solid`: SolidJS con Vite
- `yew`: Framework Rust per il frontend

## Struttura di un progetto Tauri

Dopo l'inizializzazione, un progetto Tauri avrà tipicamente la seguente struttura:

```
mia-app-tauri/
├── src-tauri/            # Backend Rust
│   ├── src/              # Codice sorgente Rust
│   │   └── main.rs       # Punto di ingresso Rust
│   ├── Cargo.toml        # Dipendenze Rust
│   ├── build.rs          # Script di build
│   ├── icons/            # Icone dell'applicazione
│   └── tauri.conf.json   # Configurazione Tauri
├── src/                  # Frontend
│   ├── assets/           # Risorse statiche
│   ├── components/       # Componenti UI
│   ├── styles/           # File CSS/SCSS
│   └── main.js           # Punto di ingresso frontend
├── package.json          # Dipendenze npm
└── README.md             # Documentazione
```

### File di configurazione principale: `tauri.conf.json`

Il file `src-tauri/tauri.conf.json` è il cuore della configurazione di un'applicazione Tauri. Contiene impostazioni per:

- Metadati dell'applicazione (nome, versione, descrizione)
- Configurazione della finestra (dimensioni, decorazioni, ecc.)
- Permessi e sicurezza
- Bundle e packaging
- Funzionalità abilitate

Esempio di configurazione base:

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devPath": "http://localhost:1420",
    "distDir": "../dist"
  },
  "package": {
    "productName": "Mia App Tauri",
    "version": "0.1.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "dialog": {
        "all": true
      },
      "fs": {
        "readFile": true,
        "writeFile": true
      }
    },
    "bundle": {
      "active": true,
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "identifier": "com.example.mia-app",
      "targets": "all"
    },
    "security": {
      "csp": "default-src 'self'"
    },
    "windows": [
      {
        "fullscreen": false,
        "height": 600,
        "resizable": true,
        "title": "Mia App Tauri",
        "width": 800
      }
    ]
  }
}
```

## Risoluzione dei problemi comuni

### Errori durante l'inizializzazione

- **Errore "Command not found"**: Verificare che la CLI di Tauri sia installata correttamente
- **Errori di permessi**: Eseguire il terminale come amministratore
- **Problemi con rustup**: Eseguire `rustup update` per aggiornare Rust

### Errori durante lo sviluppo

- **Errori di compilazione Rust**: Verificare che gli strumenti di sviluppo C++ siano installati correttamente
- **WebView2 non trovato**: Installare manualmente il runtime WebView2
- **Problemi con le dipendenze npm**: Eseguire `npm install` per reinstallare le dipendenze

### Problemi di permessi PowerShell

Se si verificano errori relativi alle policy di esecuzione di PowerShell, potrebbe essere necessario eseguire:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problemi con il frontend

- **Errori di connessione**: Verificare che il server di sviluppo frontend sia in esecuzione
- **Pagina bianca**: Controllare la configurazione in `tauri.conf.json` e assicurarsi che `devPath` o `distDir` siano corretti

## Domande di autovalutazione

1. Quale comando permette di verificare che l'ambiente Tauri sia configurato correttamente?
   - A) `tauri check`
   - B) `tauri verify`
   - C) `tauri info`
   - D) `tauri doctor`

2. Qual è il file di configurazione principale di un'applicazione Tauri?
   - A) `tauri.json`
   - B) `tauri.config.js`
   - C) `tauri.conf.json`
   - D) `config.tauri.json`

3. Quale di questi NON è un template disponibile per l'inizializzazione di un progetto Tauri?
   - A) `react`
   - B) `angular`
   - C) `vue`
   - D) `svelte`

4. Dove si trova il codice backend Rust in un progetto Tauri?
   - A) `/rust`
   - B) `/backend`
   - C) `/src-tauri`
   - D) `/tauri`

5. Quale sezione del file `tauri.conf.json` controlla quali API native sono accessibili dall'applicazione?
   - A) `permissions`
   - B) `allowlist`
   - C) `security`
   - D) `features`

## Esercizi proposti

1. Inizializza un nuovo progetto Tauri utilizzando il template React e personalizza la configurazione in `tauri.conf.json` per modificare il titolo dell'applicazione, l'icona e altre proprietà.

2. Crea un progetto Tauri partendo da un'applicazione frontend esistente (React, Vue o altro framework a scelta) e documenta il processo di integrazione.

3. Esplora le diverse opzioni di configurazione in `tauri.conf.json` e crea una guida che spieghi le impostazioni più importanti e il loro impatto sull'applicazione.

4. Configura un progetto Tauri con permessi minimi (principio del privilegio minimo) e documenta come abilitare selettivamente solo le API necessarie.

5. Crea uno script che automatizzi l'inizializzazione di un progetto Tauri con una configurazione personalizzata predefinita.

## Risposte alle domande di autovalutazione

1. C) `tauri info`
2. C) `tauri.conf.json`
3. B) `angular`
4. C) `/src-tauri`
5. B) `allowlist`

---
- [⬅️ Prerequisiti: Rust, Node.js, e strumenti di sviluppo](./01_Prerequisiti_Rust_Nodejs.md)
- [📑 Indice](<../README.md>)
- [➡️ Configurazione dell'editor di codice >>](./03_Configurazione_editor_codice.md)