# Installazione di Electron

Per aggiungere Electron al progetto:

```bash
npm install electron --save-dev
```

Verificare l'installazione controllando le dipendenze nel `package.json`:

```json
"devDependencies": {
  "electron": "^xx.x.x"
}
```

Aggiornare gli script per l'avvio:
```json
"scripts": {
  "start": "electron .",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```