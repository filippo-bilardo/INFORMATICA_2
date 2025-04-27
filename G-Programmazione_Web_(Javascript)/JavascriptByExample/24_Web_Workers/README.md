# Web Workers in JavaScript

Benvenuti all'esercitazione sui Web Workers, una potente API che consente l'esecuzione di script in background, separati dal thread principale dell'interfaccia utente.

## Cosa imparerai

- Cos'è il modello di concorrenza in JavaScript e il problema del thread singolo
- Come utilizzare i Web Workers per eseguire operazioni intensive senza bloccare l'interfaccia utente
- I diversi tipi di Web Workers (Dedicated, Shared, Service Workers)
- Come comunicare tra il thread principale e i workers
- Pattern e best practices per l'utilizzo efficace dei Web Workers
- Limitazioni e considerazioni di sicurezza

## Contenuti

### Teoria

1. [Introduzione alla Concorrenza](./teoria/01_Introduzione_Concorrenza.md)
2. [API Web Workers](./teoria/02_API_Web_Workers.md)
3. [Comunicazione con i Workers](./teoria/03_Comunicazione_Workers.md)
4. [Tipi di Workers](./teoria/04_Tipi_Workers.md)
5. [Pattern e Best Practices](./teoria/05_Pattern_Best_Practices.md)

### Esempi Pratici

1. `esempio1.js` - Worker di base per calcoli matematici
2. `esempio2.js` - Elaborazione di immagini con Web Workers
3. `esempio3.js` - Comunicazione avanzata tra workers
4. `esempio4.js` - Shared Workers per comunicazione tra più pagine
5. `esempio5.js` - Gestione degli errori nei Web Workers

## Esercizi

1. Crea un worker che esegue un algoritmo di ordinamento su un grande array
2. Implementa un sistema di cache utilizzando un worker
3. Crea un'applicazione che utilizza più workers per elaborare dati in parallelo

## Risorse Aggiuntive

- [MDN Web Docs: Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [HTML Living Standard: Web Workers](https://html.spec.whatwg.org/multipage/workers.html)
- [JavaScript.info: Web Workers](https://javascript.info/web-workers)

## Prossimi Passi

Dopo aver completato questa esercitazione, potrai esplorare i [Service Workers](../25_Service_Workers/) per imparare come implementare funzionalità offline e migliorare le prestazioni delle applicazioni web.