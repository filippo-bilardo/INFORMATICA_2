# Map, Set, WeakMap e WeakSet in JavaScript

## Introduzione

Le strutture dati Map, Set, WeakMap e WeakSet sono state introdotte in JavaScript con ECMAScript 6 (ES6) per offrire alternative più potenti e flessibili agli oggetti tradizionali e agli array. Queste strutture dati risolvono problemi specifici e offrono vantaggi in termini di prestazioni e funzionalità in determinati scenari. Questo modulo ti guiderà attraverso queste strutture dati e il loro utilizzo pratico in JavaScript.

## Contenuti

1. [Map: Concetti e Utilizzo](./teoria/01_Map.md)
2. [Set: Concetti e Utilizzo](./teoria/02_Set.md)
3. [WeakMap e WeakSet](./teoria/03_WeakMap_WeakSet.md)
4. [Confronto con Oggetti e Array](./teoria/04_Confronto_Strutture.md)
5. [Pattern e Best Practices](./teoria/05_Pattern_Best_Practices.md)

## Esempi Pratici

In questa sezione, esploreremo esempi pratici di utilizzo di Map, Set, WeakMap e WeakSet in JavaScript:

- Gestione di dati relazionali con Map
- Eliminazione di duplicati con Set
- Memorizzazione di metadati privati con WeakMap
- Tracciamento di oggetti senza impedirne la garbage collection con WeakSet

## Perché Utilizzare Queste Strutture Dati?

Le strutture dati Map, Set, WeakMap e WeakSet offrono diversi vantaggi rispetto agli oggetti e array tradizionali:

- **Map vs Oggetti**:
  - Chiavi di qualsiasi tipo (non solo stringhe)
  - Mantenimento dell'ordine di inserimento
  - Migliori prestazioni per operazioni frequenti di aggiunta/rimozione
  - Metodi nativi per dimensione e iterazione

- **Set vs Array**:
  - Valori unici garantiti
  - Ricerca più efficiente (O(1) vs O(n))
  - Metodi nativi per operazioni su insiemi (unione, intersezione, differenza)

- **WeakMap e WeakSet**:
  - Gestione automatica della memoria
  - Prevenzione di memory leak
  - Ideali per associare dati a oggetti senza impedirne la garbage collection

## Risorse Aggiuntive

- [MDN Web Docs - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN Web Docs - Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs - WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN Web Docs - WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

## Navigazione

- [Torna all'indice principale](../README.md)
- [Prossimo argomento: Map: Concetti e Utilizzo](./teoria/01_Map.md)