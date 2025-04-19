# Inizializzazione progetto Node.js

Per iniziare un nuovo progetto Electron:

1. Aprire il terminale nella cartella del progetto
2. Eseguire `npm init -y` per creare un file package.json base
3. Modificare il package.json aggiungendo:
```json
"main": "main.js",
"scripts": {
  "start": "electron ."
}
```
4. Verificare la struttura con `npm list`