# Introduzione alla Programmazione Concorrente

La programmazione concorrente è un paradigma di programmazione che permette l'esecuzione simultanea di più processi o thread all'interno di un programma. Questo approccio è diventato fondamentale nel panorama dello sviluppo software moderno, specialmente con l'avvento dei processori multicore.

## Concetti Fondamentali

### Concorrenza vs Parallelismo

- **Concorrenza**: Si riferisce alla capacità di un sistema di gestire più attività in corso contemporaneamente. Le attività possono iniziare, essere eseguite e completate in periodi sovrapposti.
- **Parallelismo**: Si riferisce all'esecuzione simultanea di più attività, tipicamente su core o processori diversi.

In sintesi: la concorrenza riguarda la gestione di più attività, mentre il parallelismo riguarda l'esecuzione simultanea di queste attività.

### Processi e Thread

- **Processo**: Un'istanza di un programma in esecuzione con il proprio spazio di memoria isolato.
- **Thread**: Un'unità di esecuzione all'interno di un processo che condivide lo stesso spazio di memoria con altri thread dello stesso processo.

### Vantaggi della Programmazione Concorrente

1. **Miglioramento delle prestazioni**: Sfruttamento efficiente dei processori multicore.
2. **Reattività**: Mantenimento della reattività dell'interfaccia utente durante operazioni intensive.
3. **Efficienza delle risorse**: Ottimizzazione dell'utilizzo delle risorse di sistema.
4. **Gestione I/O**: Miglioramento delle operazioni di input/output attraverso l'esecuzione asincrona.

## Sfide della Programmazione Concorrente

### Race Condition

Una race condition si verifica quando il comportamento di un programma dipende dalla sequenza o dalla tempistica di eventi non controllabili, come l'accesso concorrente a risorse condivise.

```cpp
// Esempio di race condition
#include <iostream>
#include <thread>

int counter = 0;

void increment() {
    for (int i = 0; i < 1000000; ++i) {
        counter++; // Operazione non atomica che può causare race condition
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    
    t1.join();
    t2.join();
    
    std::cout << "Valore finale: " << counter << std::endl;
    // Il risultato sarà probabilmente inferiore a 2000000 a causa della race condition
    
    return 0;
}
```

### Deadlock

Un deadlock si verifica quando due o più thread sono bloccati indefinitamente, ognuno in attesa che l'altro rilasci una risorsa.

```cpp
// Esempio di potenziale deadlock
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mutex1, mutex2;

void threadA() {
    std::lock_guard<std::mutex> lock1(mutex1); // Acquisisce mutex1
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simula lavoro
    std::lock_guard<std::mutex> lock2(mutex2); // Tenta di acquisire mutex2
    
    std::cout << "Thread A ha completato il lavoro" << std::endl;
}

void threadB() {
    std::lock_guard<std::mutex> lock2(mutex2); // Acquisisce mutex2
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simula lavoro
    std::lock_guard<std::mutex> lock1(mutex1); // Tenta di acquisire mutex1
    
    std::cout << "Thread B ha completato il lavoro" << std::endl;
}

int main() {
    std::thread t1(threadA);
    std::thread t2(threadB);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

### Starvation

La starvation si verifica quando un thread non riceve mai accesso a una risorsa condivisa perché altri thread la occupano continuamente.

## Evoluzione della Concorrenza in C++

- **C++98/03**: Nessun supporto nativo per la concorrenza. Si utilizzavano librerie esterne come POSIX threads o Windows threads.
- **C++11**: Introduzione della libreria standard per i thread (`<thread>`, `<mutex>`, `<condition_variable>`).
- **C++14**: Miglioramenti minori alle funzionalità di concorrenza.
- **C++17**: Introduzione di algoritmi paralleli nella libreria standard.
- **C++20**: Introduzione di coroutine e miglioramenti alla concorrenza.

## Approcci alla Programmazione Concorrente

1. **Thread-based**: Utilizzo diretto dei thread per eseguire attività in parallelo.
2. **Task-based**: Definizione di attività che vengono poi assegnate a thread dal sistema.
3. **Async/Await**: Utilizzo di funzioni asincrone che possono essere attese (C++20 con coroutine).
4. **Parallel Algorithms**: Utilizzo di algoritmi paralleli della libreria standard.

## Conclusione

La programmazione concorrente è un potente strumento per migliorare le prestazioni e la reattività delle applicazioni moderne. Tuttavia, richiede una comprensione approfondita dei concetti fondamentali e delle potenziali insidie per essere utilizzata in modo efficace e sicuro.

Nelle prossime sezioni, esploreremo in dettaglio gli strumenti specifici che C++ offre per la programmazione concorrente, a partire dai thread.

## Domande di Autovalutazione

1. Qual è la differenza principale tra concorrenza e parallelismo?
2. Cosa distingue un processo da un thread?
3. Cosa si intende per race condition e come può essere evitata?
4. Descrivi una situazione in cui potrebbe verificarsi un deadlock.
5. Quali sono i principali vantaggi dell'utilizzo della programmazione concorrente?

## Esercizi Proposti

1. Scrivi un programma che crei due thread, ognuno dei quali stampa una serie di numeri. Osserva come l'output dei due thread si intreccia.
2. Modifica l'esempio di race condition fornito per risolvere il problema utilizzando un mutex.
3. Implementa una soluzione al problema del deadlock nell'esempio fornito utilizzando `std::lock`.
4. Crea un programma che simuli una situazione di starvation e proponi una soluzione.
5. Scrivi un programma che utilizzi thread per calcolare la somma degli elementi di un grande array, dividendo il lavoro tra più thread e confronta le prestazioni con un approccio sequenziale.