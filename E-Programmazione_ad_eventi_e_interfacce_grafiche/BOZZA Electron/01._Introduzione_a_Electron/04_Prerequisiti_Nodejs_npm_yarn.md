# Prerequisiti: Node.js, npm e yarn

Per sviluppare applicazioni desktop con Electron è necessario configurare correttamente l'ambiente di sviluppo. Questa guida dettagliata ti aiuterà a installare e configurare tutti gli strumenti necessari, seguendo le best practices del settore.

## Node.js

### Installazione su Windows
1. Scarica Node.js LTS (Long Term Support) da [https://nodejs.org/](https://nodejs.org/)
   - Versione raccomandata: 18.x o superiore per compatibilità ottimale con Electron
   - Scegli la versione a 64-bit per prestazioni migliori

2. Esegui l'installer con le seguenti opzioni:
   - Seleziona "Automatically install necessary tools"
   - Includi "Add to PATH" durante l'installazione
   - Installa per tutti gli utenti (opzionale)

### Verifica dell'installazione
```powershell
# Verifica versione Node.js
node -v

# Verifica che npm sia installato
npm -v

# Verifica le variabili d'ambiente
echo %PATH%
```

### Configurazione ambiente di sviluppo
```powershell
# Imposta il registro npm predefinito
npm config set registry https://registry.npmjs.org/

# Configura cache npm per prestazioni migliori
npm config set cache-min 3600

# Imposta configurazioni di sviluppo
npm config set save-exact true
npm config set init-author-name "Il tuo nome"

# Installa strumenti di sviluppo globali essenziali
npm install -g electron-builder electron-packager
```

## npm (Node Package Manager)

### Caratteristiche principali
- Gestione dipendenze del progetto con versionamento semantico
- Esecuzione script automatizzati e task di build
- Pubblicazione e condivisione pacchetti
- Gestione sicura delle dipendenze

### Comandi essenziali per Electron
```powershell
# Inizializza nuovo progetto Electron
npm init

# Configura package.json per Electron
npm pkg set scripts.start="electron ."
npm pkg set main="main.js"

# Installa Electron come dipendenza di sviluppo
npm install electron --save-dev

# Installa dipendenze comuni per Electron
npm install electron-store --save
npm install electron-updater --save

# Aggiorna npm all'ultima versione
npm install -g npm@latest

# Verifica vulnerabilità nelle dipendenze
npm audit
npm audit fix
```

### Gestione versioni
- **Produzione**: `npm install --production`
- **Sviluppo**: `npm install --save-dev`
- **Globale**: `npm install -g`

## yarn (alternativa a npm)

### Vantaggi di yarn
- Installazioni più veloci
- Maggiore sicurezza
- Lockfile deterministico
- Installazioni offline

### Installazione
```bash
# Installa yarn globalmente
npm install -g yarn

# Verifica installazione
yarn -v
```

### Comandi base yarn
```bash
# Inizializza progetto
yarn init

# Aggiunge dipendenza
yarn add [pacchetto]

# Installa dipendenze
yarn install

# Aggiorna dipendenze
yarn upgrade
```

## Troubleshooting

### Problemi comuni
1. **Errori di permessi**
   - Windows: Esegui PowerShell come amministratore
   - Linux/macOS: Usa `sudo` o [configura npm per utente](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

2. **Errori di rete**
   - Verifica connessione internet
   - Controlla proxy/firewall
   - Usa `npm config set proxy [url]` se necessario

3. **Conflitti di versione**
   - Cancella cache: `npm cache clean --force`
   - Rimuovi node_modules: `rm -rf node_modules`
   - Reinstalla: `npm install`

## Prossimi passi
1. Installa un editor di codice (VS Code raccomandato)
2. Configura gli strumenti di sviluppo Electron
3. Crea il tuo primo progetto

## Risorse utili
- [Documentazione Node.js](https://nodejs.org/docs)
- [Guida npm](https://docs.npmjs.com/)
- [Documentazione yarn](https://yarnpkg.com/getting-started)
- [Electron Quick Start](https://www.electronjs.org/docs/tutorial/quick-start)