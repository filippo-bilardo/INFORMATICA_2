# Approfondimento: Node.js, npm e Gestione Dipendenze

## Node.js in Dettaglio

### Event Loop e Architettura Asincrona
```javascript
// Esempio di operazioni asincrone in Node.js
const fs = require('fs')

console.log('Inizio programma')

// Operazione asincrona di lettura file
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Errore nella lettura:', err)
    return
  }
  console.log('File letto:', data)
})

// Questa riga viene eseguita prima del completamento della lettura
console.log('Fine programma')

// Output:
// Inizio programma
// Fine programma
// File letto: [contenuto del file]
```

### Gestione Moduli in Node.js
```javascript
// modulo.js
class ConfigManager {
  constructor() {
    this.config = {}
  }

  load(path) {
    try {
      this.config = require(path)
      return true
    } catch (error) {
      console.error('Errore caricamento config:', error)
      return false
    }
  }

  get(key) {
    return this.config[key]
  }
}

module.exports = ConfigManager

// uso.js
const ConfigManager = require('./modulo')
const config = new ConfigManager()
```

## npm Avanzato

### Gestione Dipendenze Avanzata
```json
// package.json con configurazioni avanzate
{
  "name": "electron-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --debug",
    "build": "electron-builder",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "electron-store": "^8.1.0",
    "electron-updater": "^5.3.0"
  },
  "devDependencies": {
    "electron": "^25.0.0",
    "electron-builder": "^24.4.0",
    "eslint": "^8.40.0",
    "jest": "^29.5.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "browserslist": [
    "last 2 Chrome versions"
  ]
}
```

### Script npm Personalizzati
```json
{
  "scripts": {
    "prestart": "node scripts/check-env.js",
    "start": "electron .",
    "poststart": "node scripts/cleanup.js",
    "dev": "cross-env NODE_ENV=development electron .",
    "build:win": "electron-builder --win",
    "build:mac": "electron-builder --mac",
    "build:linux": "electron-builder --linux",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint . --fix",
    "clean": "rimraf dist"
  }
}
```

### Configurazione npm per Sviluppo
```bash
# Configurazioni npm per sviluppo ottimale
npm config set save-exact true
npm config set package-lock true
npm config set audit true
npm config set fund false

# Configurazioni per proxy (se necessario)
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configurazioni per sviluppo locale
npm config set cache-min 3600
npm config set progress false
```

## Gestione Versioni Node.js

### nvm (Node Version Manager)
```bash
# Installazione nvm su Windows
winget install CoreyButler.NVMforWindows

# Comandi base nvm
nvm list                  # Lista versioni installate
nvm install 18.16.0       # Installa versione specifica
nvm use 18.16.0          # Usa versione specifica
nvm alias default 18.16.0 # Imposta versione predefinita
```

## Sicurezza e Audit

### Controllo Dipendenze
```bash
# Verifica vulnerabilità
npm audit

# Correggi vulnerabilità automaticamente
npm audit fix

# Aggiorna tutte le dipendenze
npm update

# Visualizza dipendenze obsolete
npm outdated
```

### Configurazione Sicura package.json
```json
{
  "name": "electron-app",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "node scripts/check-npm-version.js",
    "prepare": "husky install"
  },
  "dependencies": {
    // Dipendenze con versioni esatte
    "electron-store": "8.1.0",
    "electron-updater": "5.3.0"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.2.2"
  },
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.{js,css,md}": "prettier --write"
  }
}
```

## Ottimizzazione Performance

### Cache e Installazione
```bash
# Ottimizza cache npm
npm cache verify

# Pulisci cache
npm cache clean --force

# Installa dipendenze in modalità produzione
npm ci --production

# Installa con report dettagliato
npm install --timing
```

### Analisi Dipendenze
```bash
# Visualizza albero dipendenze
npm ls

# Trova dipendenze duplicate
npm dedupe

# Analizza dimensioni bundle
npm install -g source-map-explorer
source-map-explorer dist/main.js
```

## Integrazione con Electron

### Script di Build Ottimizzati
```json
{
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "publish": "electron-forge publish",
    "lint": "echo \"No linting configured\""
  },
  "config": {
    "forge": {
      "packagerConfig": {
        "asar": true,
        "icon": "./assets/icon",
        "prune": true,
        "ignore": [
          "\.git(ignore|modules|attributes)",
          "node_modules/.cache",
          "README.md"
        ]
      },
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "electron_app"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ]
    }
  }
}
```