# Prima applicazione con Tauri

## Indice dei contenuti
- [Inizializzazione di un progetto Tauri](#inizializzazione-di-un-progetto-tauri)
- [Struttura del progetto: frontend e backend](#struttura-del-progetto-frontend-e-backend)
- [Configurazione del file tauri.conf.json](#configurazione-del-file-tauriconfjson)
- [Creazione di una semplice interfaccia Hello World](#creazione-di-una-semplice-interfaccia-hello-world)
- [Esecuzione e test dell'applicazione](#esecuzione-e-test-dellapplicazione)

## Inizializzazione di un progetto Tauri

Creare una nuova applicazione Tauri è un processo semplice che può essere eseguito in diversi modi. Vediamo le opzioni principali:

### Utilizzando il CLI di Tauri

Il modo più diretto per iniziare è utilizzare il comando `create` del CLI di Tauri:

```bash
# Assicurarsi che il CLI sia installato
npm install -g @tauri-apps/cli

# Creare un nuovo progetto
npm create tauri-app
```

Questo avvierà una procedura guidata interattiva che chiederà:
1. Il nome del progetto
2. Il framework frontend da utilizzare (React, Vue, Svelte, Vanilla)
3. Il gestore di pacchetti (npm, yarn, pnpm)
4. Il linguaggio (JavaScript o TypeScript)

### Aggiungere Tauri a un progetto esistente

Se si dispone già di un'applicazione frontend, è possibile aggiungere Tauri:

```bash
cd mio-progetto-esistente
npm install -D @tauri-apps/cli
npx tauri init
```

Questo comando configurerà la struttura necessaria per Tauri nel progetto esistente.

## Struttura del progetto: frontend e backend

Dopo l'inizializzazione, il progetto avrà una struttura simile a questa:

```
mia-app/
├── src-tauri/            # Backend Rust
│   ├── icons/            # Icone dell'applicazione
│   ├── src/              # Codice sorgente Rust
│   │   └── main.rs       # Punto di ingresso Rust
│   ├── build.rs          # Script di build
│   ├── Cargo.toml        # Dipendenze Rust
│   └── tauri.conf.json   # Configurazione Tauri
├── src/                  # Frontend
│   ├── assets/           # Risorse statiche
│   ├── styles.css        # Stili CSS
│   └── main.js           # Punto di ingresso JS
├── index.html            # File HTML principale
└── package.json          # Dipendenze npm
```

### Il backend Rust (src-tauri)

Il file `main.rs` è il punto di ingresso del backend Rust:

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!()
    .expect("errore durante l'esecuzione dell'applicazione");
}
```

Questo codice minimale:
1. Nasconde la finestra della console in modalità release
2. Inizializza l'applicazione Tauri con le impostazioni predefinite
3. Avvia l'applicazione utilizzando il contesto generato dal file di configurazione

### Il frontend (src e index.html)

Il frontend è una normale applicazione web. Il file `index.html` è il punto di ingresso:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>La mia app Tauri</title>
  <link rel="stylesheet" href="/src/styles.css" />
  <script type="module" src="/src/main.js" defer></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## Configurazione del file tauri.conf.json

Il file `tauri.conf.json` è il cuore della configurazione dell'applicazione Tauri. Ecco un esempio commentato:

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",  // Comando da eseguire prima di 'tauri dev'
    "beforeBuildCommand": "npm run build",  // Comando da eseguire prima di 'tauri build'
    "devPath": "http://localhost:1420",  // URL di sviluppo (o "../dist")
    "distDir": "../dist"  // Directory di build del frontend
  },
  "package": {
    "productName": "La mia app Tauri",  // Nome del prodotto
    "version": "0.1.0"  // Versione dell'applicazione
  },
  "tauri": {
    "allowlist": {  // API di sistema consentite
      "all": false,  // Non consentire tutte le API per sicurezza
      "dialog": {  // API per dialoghi di sistema
        "all": true
      },
      "fs": {  // API per il filesystem
        "readFile": true,
        "writeFile": true,
        "scope": ["$APPDATA/*"]  // Limita l'accesso a questa directory
      }
    },
    "bundle": {  // Configurazione del pacchetto
      "active": true,
      "icon": ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png"],
      "identifier": "com.esempio.miaapp",  // Identificatore univoco
      "targets": "all"  // Formati di output (msi, nsis, ecc.)
    },
    "security": {  // Impostazioni di sicurezza
      "csp": "default-src 'self'"  // Content Security Policy
    },
    "windows": [  // Configurazione delle finestre
      {
        "title": "La mia app Tauri",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false
      }
    ]
  }
}
```

### Personalizzazione comune

- **Allowlist**: Definisce quali API di sistema sono accessibili dal frontend
- **Windows**: Configura dimensioni, titolo e comportamento delle finestre
- **Bundle**: Imposta come l'applicazione viene pacchettizzata
- **Security**: Configura le politiche di sicurezza

## Creazione di una semplice interfaccia Hello World

Vediamo come creare una semplice interfaccia "Hello World" con interazione tra frontend e backend.

### Frontend (JavaScript)

Modifichiamo il file `src/main.js`:

```javascript
// Importa le funzioni di Tauri
import { invoke } from '@tauri-apps/api/tauri';

// Quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  // Riferimento agli elementi HTML
  const greetingDiv = document.querySelector('#greeting');
  const nameInput = document.querySelector('#name-input');
  const greetButton = document.querySelector('#greet-button');

  // Funzione per chiamare il backend
  async function greet() {
    // Invoca la funzione 'greet' definita in Rust
    const message = await invoke('greet', { name: nameInput.value });
    greetingDiv.textContent = message;
  }

  // Aggiungi event listener al pulsante
  greetButton.addEventListener('click', greet);
});
```

### HTML

Modifichiamo `index.html` per aggiungere i controlli necessari:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello Tauri</title>
  <link rel="stylesheet" href="/src/styles.css" />
  <script type="module" src="/src/main.js" defer></script>
</head>
<body>
  <div id="app">
    <h1>Hello Tauri!</h1>
    <div class="row">
      <input id="name-input" placeholder="Inserisci il tuo nome..." />
      <button id="greet-button" type="button">Saluta</button>
    </div>
    <p id="greeting"></p>
  </div>
</body>
</html>
```

### CSS

Aggiungiamo alcuni stili in `src/styles.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

#app {
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  margin: 1rem 0;
}

input, button {
  padding: 0.5rem;
}

input {
  flex: 1;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #0078e7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

#greeting {
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: bold;
}
```

### Backend (Rust)

Modifichiamo `src-tauri/src/main.rs` per aggiungere la funzione `greet`:

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Comando che può essere chiamato dal frontend
#[tauri::command]
fn greet(name: &str) -> String {
    // Se il nome è vuoto, usa "Mondo"
    let name = if name.is_empty() { "Mondo" } else { name };
    format!("Ciao, {}! Benvenuto nella tua prima app Tauri!", name)
}

fn main() {
    tauri::Builder::default()
        // Registra il comando "greet"
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("errore durante l'esecuzione dell'applicazione");
}
```

## Esecuzione e test dell'applicazione

### Modalità sviluppo

Per avviare l'applicazione in modalità sviluppo:

```bash
npm run tauri dev
```

Questo comando:
1. Avvia il server di sviluppo del frontend
2. Compila il backend Rust
3. Lancia l'applicazione con hot-reload attivo

### Compilazione per la distribuzione

Per creare un pacchetto distribuibile:

```bash
npm run tauri build
```

Questo comando:
1. Compila il frontend in modalità produzione
2. Compila il backend Rust in modalità release
3. Crea i pacchetti di installazione nella directory `src-tauri/target/release/bundle`

### Debugging

Durante lo sviluppo, è possibile:

1. Utilizzare `console.log()` nel frontend
2. Aprire gli strumenti di sviluppo con `F12` o `Ctrl+Shift+I`
3. Utilizzare `println!()` o il crate `log` nel backend Rust

### Risoluzione dei problemi comuni

- **Errori di compilazione Rust**: Verificare che tutte le dipendenze siano correttamente specificate in `Cargo.toml`
- **Frontend non visibile**: Controllare che il percorso in `devPath` o `distDir` sia corretto
- **Errori di comunicazione**: Assicurarsi che i comandi siano registrati con `invoke_handler`
- **Permessi negati**: Verificare che le API necessarie siano incluse nell'`allowlist`

## Domande di autovalutazione

1. Quale comando si utilizza per inizializzare un nuovo progetto Tauri?
   - A) `tauri create`
   - B) `npm create tauri-app`
   - C) `cargo new tauri-app`
   - D) `tauri new`

2. Dove si trova il punto di ingresso del backend Rust in un'applicazione Tauri?
   - A) `src/main.rs`
   - B) `src-tauri/src/main.rs`
   - C) `src-tauri/main.rs`
   - D) `backend/main.rs`

3. Come si definisce una funzione che può essere chiamata dal frontend in Tauri?
   - A) Con l'attributo `#[tauri::export]`
   - B) Con l'attributo `#[tauri::command]`
   - C) Con l'attributo `#[export]`
   - D) Con l'attributo `#[command]`

4. Quale file contiene la configurazione delle finestre dell'applicazione Tauri?
   - A) `window.conf.json`
   - B) `tauri.conf.json`
   - C) `app.config.json`
   - D) `config.json`

5. Come si avvia un'applicazione Tauri in modalità sviluppo?
   - A) `npm start`
   - B) `tauri dev`
   - C) `npm run tauri dev`
   - D) `cargo run`

## Esercizi proposti

1. Crea un'applicazione Tauri che mostri l'ora corrente e si aggiorni ogni secondo, utilizzando sia il frontend che il backend.

2. Modifica l'applicazione "Hello World" per aggiungere un pulsante che cambi il tema dell'interfaccia tra chiaro e scuro.

3. Implementa un'applicazione di gestione delle note che salvi i dati in un file locale, utilizzando le API del filesystem di Tauri.

4. Crea un'applicazione con più finestre, dove una finestra principale può aprire finestre secondarie per diverse funzionalità.

5. Implementa un'applicazione che utilizzi le notifiche di sistema per avvisare l'utente quando un'operazione è completata.

## Risposte alle domande di autovalutazione

1. B) `npm create tauri-app`
2. B) `src-tauri/src/main.rs`
3. B) Con l'attributo `#[tauri::command]`
4. B) `tauri.conf.json`
5. C) `npm run tauri dev`

---
- [⬅️ Ambiente di sviluppo](<02_Ambiente_di_sviluppo.md>)
- [📑 Indice](<../README.md>)
- [➡️ Interfaccia utente](<04_Interfaccia_utente.md>)