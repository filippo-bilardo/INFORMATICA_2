# Struttura di base del progetto Electron

Un progetto Electron tipico contiene:

- **main.js**: Processo principale che gestisce il ciclo di vita dell'app
- **index.html**: Interfaccia utente principale
- **package.json**: Configurazione del progetto

```
mia-app-electron/
├── package.json
├── main.js
├── preload.js
└── index.html
```

## package.json
```json
{
  "name": "mia-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^xx.x.x"
  }
}
```

## main.js
Configurazione base della finestra principale con BrowserWindow

## index.html
Contiene l'UI dell'applicazione con collegamenti agli asset CSS/JS