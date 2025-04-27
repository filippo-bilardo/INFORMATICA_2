# Esercitazione 1: Introduzione a JavaScript

## Descrizione

Benvenuti alla prima esercitazione del nostro corso di JavaScript! In questa lezione introduttiva, esploreremo le basi fondamentali di JavaScript: la sua storia, il suo ruolo nel web moderno e come iniziare a scrivere i primi script.

JavaScript è un linguaggio di programmazione interpretato, orientato agli oggetti e basato su prototipi. È uno dei tre pilastri del web moderno, insieme a HTML e CSS. Mentre HTML si occupa della struttura e CSS dell'aspetto, JavaScript aggiunge interattività e comportamento dinamico alle pagine web.

## Obiettivi dell'esercitazione

- Comprendere cosa è JavaScript e il suo ruolo nello sviluppo web
- Configurare l'ambiente di sviluppo
- Scrivere il primo script JavaScript
- Utilizzare la console per il debugging
- Comprendere i concetti di base della sintassi JavaScript

## Indice degli argomenti teorici

1. [Storia e evoluzione di JavaScript](./teoria/01_Storia_Evoluzione.md)
2. [Ambiente di sviluppo](./teoria/02_Ambiente_Sviluppo.md)
3. [Sintassi di base](./teoria/03_Sintassi_Base.md)
4. [Strumenti di debugging](./teoria/04_Strumenti_Debugging.md)
5. [JavaScript nel browser](./teoria/05_JavaScript_Browser.md)

## Esercizi pratici

### Esercizio 1.1: Il tuo primo script
Crea un file HTML e inserisci uno script JavaScript che mostri un messaggio di alert quando la pagina viene caricata.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Il mio primo script JavaScript</title>
</head>
<body>
    <h1>Benvenuto in JavaScript!</h1>
    
    <script>
        // Il tuo primo script JavaScript
        alert("Ciao, mondo!");
    </script>
</body>
</html>
```

### Esercizio 1.2: Utilizzo della console
Modifica lo script precedente per scrivere un messaggio nella console del browser invece di mostrare un alert.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Utilizzo della console</title>
</head>
<body>
    <h1>Apri la console del browser (F12)</h1>
    
    <script>
        // Scrivere nella console
        console.log("Questo è un messaggio nella console!");
        console.error("Questo è un messaggio di errore!");
        console.warn("Questo è un avviso!");
    </script>
</body>
</html>
```

### Esercizio 1.3: Script esterni
Crea un file JavaScript esterno e collegalo a un documento HTML.

File: script.js
```javascript
// Contenuto del file script.js
console.log("Questo script è caricato da un file esterno!");
alert("Script esterno caricato con successo!");
```

File: index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Script esterni</title>
    <!-- Caricamento dello script esterno -->
    <script src="script.js"></script>
</head>
<body>
    <h1>Script esterni in JavaScript</h1>
</body>
</html>
```

[Torna all'indice principale](../README.md) | [Vai alla prossima esercitazione](../02_Variabili_TipiDati/)