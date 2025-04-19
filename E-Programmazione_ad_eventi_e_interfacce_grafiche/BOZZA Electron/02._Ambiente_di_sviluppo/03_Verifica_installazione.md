# Verifica dell'installazione

Dopo l'installazione di Node.js e npm, verifica il corretto funzionamento:

1. **Controllo versione Node.js**
   ```
   node -v
   ```
   Dovresti vedere una versione come `v20.12.2`

2. **Controllo versione npm**
   ```
   npm -v
   ```
   Versione attesa: `10.7.0` o superiore

3. **Test semplice script**
   Crea un file `test.js` con:
   ```js
   console.log("Node.js funziona!");
   ```
   Esegui con:
   ```
   node test.js
   ```