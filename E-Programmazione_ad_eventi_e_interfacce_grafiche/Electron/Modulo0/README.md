# Modulo 0: Installazione di Electron e Node.js su Windows

## Prerequisiti
- Windows 10 o successivo
- PowerShell

## Installazione di Node.js

1. Apri PowerShell come amministratore
2. Esegui il seguente comando per installare Node.js:
```powershell
winget install OpenJS.NodeJS
```
3. Verifica l'installazione:
```powershell
node -v
npm -v
```

## Installazione di Electron

1. Crea una nuova directory per il progetto:
```powershell
mkdir my-electron-app
cd my-electron-app
```
2. Inizializza il progetto Node.js:
```powershell
npm init -y
```
3. Installa Electron come dipendenza di sviluppo:
```powershell
npm install electron --save-dev
```
4. Verifica l'installazione:
```powershell
npx electron -v
```

## Esecuzione di un'applicazione Electron

1. Crea un file `main.js` con il seguente contenuto:
```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```
2. Crea un file `index.html` con il contenuto HTML di base
3. Modifica il file `package.json` aggiungendo:
```json
"main": "main.js",
"scripts": {
  "start": "electron ."
}
```
4. Avvia l'applicazione:
```powershell
npm start
```

## Risoluzione dei problemi

- Se riscontri problemi con i permessi, esegui PowerShell come amministratore
- Se riscontri errori di esecuzione degli script in PowerShell, imposta la policy di esecuzione:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
  Questa impostazione permette l'esecuzione di script locali e script firmati da fonti remote, necessaria per eseguire correttamente gli script npm. Esegui questo comando in PowerShell con privilegi di amministratore.
- Per aggiornare Node.js:
```powershell
winget upgrade OpenJS.NodeJS
```
- Per aggiornare Electron:
```powershell
npm update electron
```