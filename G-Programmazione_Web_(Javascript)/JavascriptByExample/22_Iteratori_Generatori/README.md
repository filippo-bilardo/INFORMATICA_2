# Esercitazione 22: Iteratori e Generatori

## Descrizione

Benvenuti all'esercitazione 22 del nostro corso di JavaScript! In questa lezione, esploreremo due potenti funzionalità di JavaScript: gli Iteratori e i Generatori.

Gli iteratori sono oggetti che consentono di attraversare una collezione di elementi, uno alla volta, fornendo un'interfaccia standardizzata per l'iterazione. I generatori, invece, sono funzioni speciali che possono essere interrotte e riprese, consentendo di generare sequenze di valori in modo efficiente e con un controllo preciso sul flusso di esecuzione.

Queste funzionalità, introdotte con ECMAScript 2015 (ES6), offrono nuovi modi per lavorare con le collezioni di dati e gestire operazioni asincrone, rendendo il codice più leggibile, manutenibile ed efficiente.

## Indice degli Argomenti

1. [Introduzione agli Iteratori](./teoria/01_Introduzione_Iteratori.md)
   - Cos'è un iteratore
   - Il protocollo di iterazione
   - Oggetti iterabili integrati

2. [Creazione di Iteratori Personalizzati](./teoria/02_Iteratori_Personalizzati.md)
   - Implementazione dell'interfaccia Iterable
   - Metodo Symbol.iterator
   - Oggetto iteratore con next()

3. [Introduzione ai Generatori](./teoria/03_Introduzione_Generatori.md)
   - Cos'è un generatore
   - Sintassi della funzione generatore
   - Yield e next()

4. [Generatori Avanzati](./teoria/04_Generatori_Avanzati.md)
   - Passaggio di valori ai generatori
   - Delega con yield*
   - Gestione degli errori

5. [Casi d'Uso Pratici](./teoria/05_Casi_Uso_Pratici.md)
   - Iterazione su strutture dati complesse
   - Generazione di sequenze infinite
   - Gestione dell'asincronicità

## Esempi Pratici

In questa cartella troverai diversi esempi pratici che illustrano l'uso di iteratori e generatori:

- `esempio1.js`: Implementazione di un iteratore personalizzato
- `esempio2.js`: Utilizzo di generatori per sequenze di numeri
- `esempio3.js`: Generatori per l'attraversamento di strutture ad albero
- `esempio4.js`: Utilizzo di generatori per gestire operazioni asincrone
- `esempio5.js`: Combinazione di iteratori e generatori

## Esercizi

Dopo aver studiato la teoria e analizzato gli esempi, mettiti alla prova con questi esercizi:

1. Crea un iteratore personalizzato per una classe che rappresenta una playlist musicale
2. Implementa un generatore che produca una sequenza di numeri di Fibonacci
3. Utilizza i generatori per semplificare l'attraversamento di una struttura dati annidata
4. Crea un generatore che simuli un'operazione asincrona con yield

## Risorse Aggiuntive

- [MDN Web Docs: Iteratori e Generatori](https://developer.mozilla.org/it/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [Exploring JS: Iterables and iterators](https://exploringjs.com/es6/ch_iteration.html)
- [JavaScript.info: Generators](https://javascript.info/generators)

## Navigazione

- [Indice del Corso](../README.md)
- Precedente: [Map, Set, WeakMap, WeakSet](../21_Map_Set/README.md)
- Successivo: [Proxy e Reflect](../23_Proxy_Reflect/README.md)