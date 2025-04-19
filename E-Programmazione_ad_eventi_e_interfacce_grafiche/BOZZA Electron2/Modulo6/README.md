# Modulo 6: Gestione dei pacchetti e dipendenze

[← Torna al corso principale](../README.md)

## Obiettivi di apprendimento
- Comprendere il funzionamento di npm e yarn
- Gestire le dipendenze di un progetto Node.js
- Creare e pubblicare pacchetti su npm

## Contenuti
- Introduzione a npm e yarn
- Installazione, aggiornamento e rimozione di pacchetti
- Gestione delle dipendenze (`dependencies` e `devDependencies`)
- Creazione di un pacchetto personalizzato
- Pubblicazione di un pacchetto su npm
- Utilizzo di `package-lock.json` e `shrinkwrap`

### Creazione di un pacchetto personalizzato
1. Inizializzare un progetto con `npm init`.
2. Creare il file principale del pacchetto (es. `index.js`).
3. Aggiungere un campo `main` in `package.json` per specificare il file di ingresso.

```json
{
  "name": "mio-pacchetto",
  "version": "1.0.0",
  "main": "index.js"
}
```

### Pubblicazione su npm
1. Accedere con `npm login`.
2. Pubblicare il pacchetto con `npm publish`.

```bash
npm publish
```

### Utilizzo di `package-lock.json`
Il file `package-lock.json` garantisce che le dipendenze siano installate con versioni coerenti tra gli ambienti.
