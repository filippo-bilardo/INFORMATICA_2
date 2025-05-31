# Programmazione Concorrente in C++

Benvenuti all'esercitazione sulla programmazione concorrente in C++. In questa sezione, esploreremo come C++ moderno gestisce la programmazione multi-thread e la concorrenza, elementi fondamentali per lo sviluppo di applicazioni performanti su sistemi multicore.

## Obiettivi di Apprendimento

- Comprendere i concetti fondamentali della programmazione concorrente
- Imparare a utilizzare i thread in C++11 e versioni successive
- Conoscere i meccanismi di sincronizzazione (mutex, lock, condition variables)
- Implementare pattern di concorrenza comuni
- Comprendere i problemi di concorrenza (race condition, deadlock, starvation)
- Utilizzare le funzionalità avanzate come future, promise e async

## Contenuti

1. [Introduzione alla Programmazione Concorrente](./teoria/01_introduzione_concorrenza.md)
2. [Thread in C++](./teoria/02_thread_cpp.md)
3. [Mutex e Lock](./teoria/03_mutex_lock.md)
4. [Condition Variables](./teoria/04_condition_variables.md)
5. [Future e Promise](./teoria/05_future_promise.md)
6. [Async e Parallel Algorithms](./teoria/06_async_parallel_algorithms.md)
7. [Atomic Operations](./teoria/07_atomic_operations.md)
8. [Pattern di Concorrenza](./teoria/08_pattern_concorrenza.md)
9. [Problemi di Concorrenza e Debugging](./teoria/09_problemi_debugging.md)

## Prerequisiti

Prima di affrontare questa esercitazione, è consigliabile avere familiarità con:

- Concetti avanzati di C++
- Funzioni e classi in C++
- Smart pointers (esercitazione 17)
- Gestione delle eccezioni (esercitazione 18)

## Importanza della Programmazione Concorrente

La programmazione concorrente è diventata essenziale nel panorama dello sviluppo software moderno per diversi motivi:

- **Sfruttamento dell'hardware**: I processori multicore sono ormai standard, e la programmazione concorrente permette di sfruttarne appieno le potenzialità
- **Reattività delle applicazioni**: Le applicazioni responsive utilizzano thread separati per le operazioni di lunga durata
- **Prestazioni migliori**: Molti algoritmi possono essere parallelizzati per ottenere prestazioni significativamente migliori
- **Gestione efficiente delle risorse**: Operazioni di I/O possono essere eseguite in parallelo, riducendo i tempi di attesa

In questa esercitazione, imparerai come utilizzare efficacemente gli strumenti di concorrenza forniti da C++ moderno per creare applicazioni performanti, scalabili e robuste.