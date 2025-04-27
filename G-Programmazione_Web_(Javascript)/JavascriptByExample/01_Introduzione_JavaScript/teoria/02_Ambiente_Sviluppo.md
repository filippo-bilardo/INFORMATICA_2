# Ambiente di Sviluppo per JavaScript

Per iniziare a programmare in JavaScript, è necessario configurare un ambiente di sviluppo adeguato. Fortunatamente, JavaScript richiede strumenti minimi per iniziare, ma esistono numerosi strumenti che possono migliorare significativamente la produttività.

## Strumenti essenziali

### 1. Browser Web

Il browser è l'ambiente nativo di JavaScript. Ogni browser moderno include:

- **Un motore JavaScript**: V8 (Chrome/Edge), SpiderMonkey (Firefox), JavaScriptCore (Safari)
- **Strumenti di sviluppo integrati**: accessibili premendo F12 o tasto destro → Ispeziona

I browser più utilizzati per lo sviluppo JavaScript sono:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### 2. Editor di testo o IDE

Per scrivere codice JavaScript è necessario un buon editor di testo o un ambiente di sviluppo integrato (IDE):

#### Editor di testo leggeri:
- **Visual Studio Code**: Gratuito, open-source, con eccellente supporto per JavaScript
- **Sublime Text**: Veloce e leggero, con buon supporto per JavaScript
- **Atom**: Personalizzabile e con una vasta gamma di plugin

#### IDE completi:
- **WebStorm**: IDE commerciale specifico per JavaScript/TypeScript
- **Visual Studio**: IDE completo con supporto per JavaScript

### 3. Node.js

Node.js è un runtime JavaScript basato sul motore V8 di Chrome che permette di eseguire JavaScript al di fuori del browser:

- Permette di eseguire script JavaScript da riga di comando
- Include npm (Node Package Manager) per gestire le dipendenze
- Essenziale per lo sviluppo back-end in JavaScript
- Utile anche per strumenti di build e automazione

## Configurazione dell'ambiente di sviluppo

### Configurazione base

1. **Installare un browser moderno** (Chrome, Firefox, ecc.)
2. **Installare un editor di codice** (consigliato Visual Studio Code)
3. **Installare Node.js e npm** dal sito ufficiale [nodejs.org](https://nodejs.org/)

### Estensioni utili per Visual Studio Code

- **ESLint**: Per l'analisi statica del codice
- **Prettier**: Per la formattazione automatica del codice
- **JavaScript (ES6) code snippets**: Snippet per JavaScript moderno
- **Live Server**: Server di sviluppo con ricarica automatica
- **Debugger for Chrome**: Per il debugging direttamente dall'editor

## Strumenti avanzati per lo sviluppo

### Gestione pacchetti

- **npm**: Il gestore di pacchetti predefinito di Node.js
- **yarn**: Alternativa a npm, più veloce in alcune operazioni

### Strumenti di build e bundling

- **Webpack**: Bundler per applicazioni JavaScript moderne
- **Parcel**: Bundler zero-configuration
- **Rollup**: Specializzato in ES modules
- **Vite**: Build tool e dev server ultra-veloce

### Transpiler

- **Babel**: Converte JavaScript moderno in versioni compatibili con browser più vecchi
- **TypeScript**: Superset di JavaScript che aggiunge tipizzazione statica

### Testing

- **Jest**: Framework di testing completo
- **Mocha**: Framework di testing flessibile
- **Cypress**: Per test end-to-end

## Il primo progetto JavaScript

Ecco come creare un semplice progetto JavaScript:

1. Creare una cartella per il progetto
2. Inizializzare un progetto npm con `npm init -y`
3. Creare un file HTML di base (index.html):

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Il mio progetto JavaScript</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Il mio progetto JavaScript</h1>
    
    <script src="script.js"></script>
</body>
</html>
```

4. Creare un file JavaScript (script.js):

```javascript
console.log('Il progetto è configurato correttamente!');
```

5. Opzionalmente, creare un file CSS (style.css)
6. Aprire il file HTML nel browser o utilizzare Live Server in VS Code

## Conclusione

Un buon ambiente di sviluppo può migliorare significativamente la produttività quando si lavora con JavaScript. Iniziare con gli strumenti essenziali e aggiungere gradualmente strumenti più avanzati man mano che si acquisisce familiarità con il linguaggio è l'approccio consigliato.

[Torna all'indice dell'esercitazione](../README.md) | [Vai al precedente argomento teorico](./01_Storia_Evoluzione.md) | [Vai al prossimo argomento teorico](./03_Sintassi_Base.md)