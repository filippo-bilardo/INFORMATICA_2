# Modulo 7: Testing e strumenti di qualità del codice

[← Torna al corso principale](../README.md)

## Obiettivi di apprendimento
- Comprendere l'importanza del testing nel ciclo di sviluppo
- Utilizzare strumenti di testing come Mocha, Chai e Jest
- Migliorare la qualità del codice con linter e formattatori

## Contenuti
- Introduzione al testing
- Unit test, integration test ed end-to-end test
- Utilizzo di Mocha e Chai
- Testing con Jest
- Configurazione di ESLint e Prettier
- Continuous Integration (CI) con GitHub Actions

### Testing con Mocha e Chai
Mocha è un framework di testing, mentre Chai è una libreria di asserzioni.

```javascript
const { expect } = require('chai');
const { somma } = require('./utils');

describe('Funzione somma', () => {
  it('dovrebbe restituire la somma di due numeri', () => {
    expect(somma(2, 3)).to.equal(5);
  });
});
```

### Configurazione di ESLint
ESLint aiuta a mantenere uno stile di codice coerente e a rilevare errori.

```bash
npm install eslint --save-dev
npx eslint --init
```

### Continuous Integration con GitHub Actions
Esempio di file `.github/workflows/ci.yml` per eseguire i test automaticamente.

```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
