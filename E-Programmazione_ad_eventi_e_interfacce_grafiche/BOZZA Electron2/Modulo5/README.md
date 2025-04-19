# Modulo 5: Debugging avanzato

[← Torna al corso principale](../README.md)

## Obiettivi di apprendimento
- Comprendere le tecniche avanzate di debugging in Node.js
- Utilizzare strumenti come Chrome DevTools e VS Code Debugger
- Risolvere problemi complessi in applicazioni Node.js

## Contenuti
- Introduzione al debugging avanzato
- Utilizzo di `--inspect` e `--inspect-brk`
- Debugging con Chrome DevTools
- Debugging con Visual Studio Code
- Analisi delle performance con `node --prof`
- Strumenti di logging avanzato (es. `debug`, `winston`)

### Debugging con `--inspect`
Il flag `--inspect` consente di avviare Node.js in modalità di debugging, permettendo di collegarsi a strumenti come Chrome DevTools.

```bash
node --inspect index.js
```

### Debugging con Visual Studio Code
1. Configurare un file `launch.json` nella cartella `.vscode`.
2. Eseguire il debug direttamente dall'editor.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Avvia Programma",
      "program": "${workspaceFolder}/index.js"
    }
  ]
}
```

### Analisi delle performance
Utilizzare il flag `--prof` per generare un profilo delle performance.

```bash
node --prof index.js
```

Analizzare il file generato con `node --prof-process`.
