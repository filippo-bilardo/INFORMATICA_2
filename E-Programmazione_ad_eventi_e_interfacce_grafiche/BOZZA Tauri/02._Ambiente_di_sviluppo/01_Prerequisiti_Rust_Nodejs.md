# Prerequisiti: Rust, Node.js, e strumenti di sviluppo

## Indice dei contenuti
- [Introduzione](#introduzione)
- [Rust e Cargo](#rust-e-cargo)
- [Node.js e npm](#nodejs-e-npm)
- [Strumenti di sviluppo C++](#strumenti-di-sviluppo-c)
- [WebView2](#webview2)
- [Verifica dell'installazione](#verifica-dellinstallazione)
- [Risoluzione dei problemi comuni](#risoluzione-dei-problemi-comuni)

## Introduzione

Prima di iniziare a sviluppare applicazioni desktop con Tauri, è fondamentale configurare correttamente l'ambiente di sviluppo. Tauri combina tecnologie web con il linguaggio Rust, quindi richiede l'installazione di diversi componenti essenziali. In questa guida, esploreremo tutti i prerequisiti necessari per iniziare a lavorare con Tauri su Windows.

## Rust e Cargo

Rust è il linguaggio di programmazione utilizzato per il backend delle applicazioni Tauri. È un linguaggio moderno focalizzato su sicurezza, velocità e concorrenza.

### Perché Rust per Tauri?

Tauri utilizza Rust per il suo backend per diversi motivi:
- **Prestazioni elevate**: Rust offre prestazioni paragonabili a C/C++ senza sacrificare la sicurezza
- **Sicurezza della memoria**: Il sistema di ownership di Rust previene errori comuni come use-after-free e data races
- **Dimensioni ridotte**: Le applicazioni Rust tendono ad avere un footprint di memoria inferiore
- **Compilazione nativa**: Rust compila direttamente a codice macchina per ogni piattaforma

### Installazione di Rust

Per installare Rust e Cargo (il suo package manager):

1. Visitare [rustup.rs](https://rustup.rs/)
2. Scaricare e eseguire il programma di installazione
3. Seguire le istruzioni a schermo per l'installazione predefinita

```bash
# Dopo l'installazione, verificare che tutto funzioni correttamente aprendo un terminale e digitando:
rustc --version
cargo --version
```

### Componenti Rust importanti

- **rustc**: Il compilatore Rust
- **cargo**: Il package manager e build system di Rust
- **rustup**: Lo strumento per gestire versioni e componenti di Rust

## Node.js e npm

Node.js è l'ambiente di runtime JavaScript necessario per gestire le dipendenze frontend e gli strumenti di build di Tauri.

### Perché Node.js per Tauri?

- **Gestione dipendenze**: npm (Node Package Manager) gestisce le librerie frontend
- **Strumenti di build**: Molti strumenti di build per applicazioni web sono basati su Node.js
- **Sviluppo frontend**: Permette di utilizzare framework moderni come React, Vue o Svelte

### Installazione di Node.js

1. Visitare [nodejs.org](https://nodejs.org/)
2. Scaricare la versione LTS (Long Term Support) consigliata per Windows
3. Eseguire l'installer e seguire le istruzioni

```bash
# Verificare l'installazione con:
node --version
npm --version
```

### Versioni consigliate

Per lo sviluppo con Tauri, si consiglia di utilizzare:
- Node.js: versione LTS (attualmente 18.x o 20.x)
- npm: la versione inclusa con Node.js è generalmente sufficiente

## Strumenti di sviluppo C++

Per compilare alcune dipendenze native di Rust e Node.js, sono necessari gli strumenti di sviluppo C++.

### Visual Studio Build Tools

1. Scaricare e installare da [visualstudio.microsoft.com](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Durante l'installazione, selezionare il carico di lavoro "Sviluppo di applicazioni desktop con C++"
3. Assicurarsi che siano inclusi i seguenti componenti:
   - MSVC (Microsoft Visual C++ Compiler)
   - Windows SDK
   - Supporto C++/CLI

### Alternative

In alternativa, è possibile installare l'intera Visual Studio Community Edition, che include tutti gli strumenti necessari.

## WebView2

Tauri su Windows utilizza Microsoft Edge WebView2 per renderizzare l'interfaccia utente. Questo componente è essenziale per visualizzare il contenuto web all'interno dell'applicazione nativa.

### Installazione di WebView2

1. Nella maggior parte dei sistemi Windows 10/11 recenti è già installato
2. In caso contrario, scaricare il runtime WebView2 da [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
3. Eseguire l'installer e seguire le istruzioni

### Verifica dell'installazione di WebView2

Per verificare se WebView2 è già installato sul sistema:

1. Aprire le Impostazioni di Windows
2. Andare su App > App installate
3. Cercare "Microsoft Edge WebView2 Runtime"

Oppure eseguire questo comando PowerShell:

```powershell
Get-AppxPackage *WebView2*
```

## Verifica dell'installazione

Dopo aver installato tutti i prerequisiti, è importante verificare che tutto sia configurato correttamente.

### Verifica manuale dei componenti

Eseguire i seguenti comandi in un terminale:

```bash
# Verifica Rust
rustc --version
cargo --version

# Verifica Node.js
node --version
npm --version

# Verifica Visual C++ Build Tools (dovrebbe mostrare la versione del compilatore)
where cl
```

### Verifica con Tauri CLI

Una volta installato Tauri CLI (che vedremo nella prossima guida), è possibile eseguire:

```bash
tauri info
```

Questo comando mostrerà informazioni dettagliate sull'ambiente di sviluppo, evidenziando eventuali problemi o componenti mancanti.

## Risoluzione dei problemi comuni

### Problemi con Rust

- **Errore "rustc not found"**: Aggiungere il percorso di Rust alle variabili d'ambiente o riavviare il sistema dopo l'installazione
- **Errori di compilazione**: Assicurarsi che gli strumenti di sviluppo C++ siano installati correttamente
- **Problemi con rustup**: Eseguire `rustup self update` per aggiornare rustup stesso

### Problemi con Node.js

- **Errore "npm not found"**: Verificare che Node.js sia installato correttamente e che il percorso sia nelle variabili d'ambiente
- **Errori di permessi**: Eseguire il terminale come amministratore
- **Problemi con i pacchetti globali**: Considerare l'uso di nvm (Node Version Manager) per Windows

### Problemi con Visual C++ Build Tools

- **Errori di compilazione**: Assicurarsi di aver selezionato tutti i componenti necessari durante l'installazione
- **Versione incompatibile**: Verificare di avere una versione recente degli strumenti di build

### Problemi con WebView2

- **WebView2 non trovato**: Installare manualmente il runtime WebView2
- **Errori di rendering**: Aggiornare WebView2 all'ultima versione

### Problemi di permessi PowerShell

Se si verificano errori relativi alle policy di esecuzione di PowerShell, potrebbe essere necessario eseguire:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Domande di autovalutazione

1. Quali sono i componenti essenziali da installare per sviluppare con Tauri su Windows?
   - A) Solo Node.js e npm
   - B) Rust, Cargo, Node.js, npm e WebView2
   - C) Python, Node.js e Rust
   - D) Visual Studio e .NET Framework

2. Perché Tauri utilizza Rust per il backend?
   - A) Perché è più facile da imparare rispetto ad altri linguaggi
   - B) Per le sue prestazioni elevate e sicurezza della memoria
   - C) Perché è l'unico linguaggio compatibile con WebView2
   - D) Per compatibilità con sistemi legacy

3. Quale componente è responsabile per il rendering dell'interfaccia utente in Tauri su Windows?
   - A) Chromium Embedded Framework
   - B) Microsoft Edge WebView2
   - C) Electron Renderer
   - D) Gecko Engine

4. Quale comando permette di verificare che l'ambiente Rust sia configurato correttamente?
   - A) `rust --version`
   - B) `rustc --version`
   - C) `rustup --version`
   - D) `cargo run --version`

5. Perché sono necessari gli strumenti di sviluppo C++ per Tauri?
   - A) Per compilare il codice C++ scritto dall'utente
   - B) Per compilare alcune dipendenze native di Rust e Node.js
   - C) Per eseguire WebView2
   - D) Per creare installer Windows

## Esercizi proposti

1. Installa tutti i prerequisiti necessari per lo sviluppo Tauri su Windows, documentando ogni passaggio e gli eventuali problemi incontrati.

2. Crea uno script batch o PowerShell che verifichi automaticamente la presenza di tutti i componenti necessari per lo sviluppo Tauri.

3. Ricerca e documenta le differenze tra le versioni LTS e Current di Node.js, spiegando quale sia più adatta per lo sviluppo con Tauri e perché.

4. Configura un ambiente di sviluppo Rust minimale e scrivi un semplice programma "Hello, World!" per verificare che tutto funzioni correttamente.

5. Crea una guida passo-passo per risolvere i problemi più comuni durante l'installazione dei prerequisiti per Tauri su Windows.

## Risposte alle domande di autovalutazione

1. B) Rust, Cargo, Node.js, npm e WebView2
2. B) Per le sue prestazioni elevate e sicurezza della memoria
3. B) Microsoft Edge WebView2
4. B) `rustc --version`
5. B) Per compilare alcune dipendenze native di Rust e Node.js

---
- [⬅️ Introduzione a Tauri](../01._Introduzione_a_Tauri/01_Introduzione_a_Tauri.md)
- [📑 Indice](<../README.md>)
- [➡️ Installazione dell'ambiente Tauri su Windows >>](./02_Installazione_ambiente_Tauri_Windows.md)