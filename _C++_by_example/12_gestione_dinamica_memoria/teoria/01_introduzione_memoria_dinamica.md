# Introduzione alla Memoria Dinamica

In questa guida, esploreremo il concetto di memoria dinamica in C++ e perché è fondamentale per lo sviluppo di applicazioni efficienti.

## Tipi di Memoria in C++

In C++, la memoria utilizzata da un programma è generalmente divisa in diverse aree:

1. **Stack (Pila)**: Memoria allocata automaticamente per variabili locali
2. **Heap (Mucchio)**: Memoria allocata dinamicamente durante l'esecuzione
3. **Area Dati Globali/Statici**: Per variabili globali e statiche
4. **Area Codice**: Dove risiede il codice eseguibile

## Memoria Statica vs Memoria Dinamica

### Memoria Statica

- Allocata durante la compilazione
- Dimensione fissa e conosciuta in anticipo
- Gestita automaticamente (allocata all'inizio dell'esecuzione e deallocata alla fine)
- Include variabili globali, statiche e locali

```cpp
int array[100];  // Array statico di 100 elementi
```

### Memoria Dinamica

- Allocata durante l'esecuzione del programma
- Dimensione può essere determinata a runtime
- Deve essere gestita manualmente dal programmatore
- Risiede nell'area di memoria chiamata "heap"

```cpp
int* array = new int[n];  // Array dinamico di n elementi, dove n è determinato a runtime
```

## Perché Usare la Memoria Dinamica?

1. **Flessibilità**: Permette di allocare memoria in base alle necessità durante l'esecuzione
2. **Efficienza**: Consente di utilizzare solo la memoria necessaria
3. **Strutture Dati Dinamiche**: Essenziale per implementare strutture dati come liste collegate, alberi, grafi
4. **Oggetti con Durata Variabile**: Permette di creare oggetti che esistono oltre lo scope in cui sono stati creati

## Sfide della Gestione Dinamica della Memoria

1. **Memory Leak**: Dimenticare di deallocare memoria non più necessaria
2. **Dangling Pointers**: Puntatori che puntano a memoria già deallocata
3. **Frammentazione**: Inefficienza nell'utilizzo della memoria disponibile
4. **Overhead**: Allocazione dinamica richiede più tempo rispetto all'allocazione statica

## Esempio Base

```cpp
#include <iostream>

int main() {
    // Allocazione statica
    int staticVar = 10;
    
    // Allocazione dinamica
    int* dynamicVar = new int;
    *dynamicVar = 20;
    
    std::cout << "Variabile statica: " << staticVar << std::endl;
    std::cout << "Variabile dinamica: " << *dynamicVar << std::endl;
    
    // Deallocazione della memoria dinamica
    delete dynamicVar;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono le principali differenze tra memoria statica e dinamica?
2. In quali situazioni è preferibile utilizzare la memoria dinamica?
3. Quali sono i rischi associati all'uso della memoria dinamica?
4. Come si può determinare quanta memoria allocare dinamicamente?
5. Perché è importante deallocare la memoria dinamica quando non è più necessaria?

## Esercizi Proposti

1. Scrivi un programma che alloca dinamicamente un intero, gli assegna un valore e poi lo dealloca.
2. Modifica il programma precedente per allocare un array di interi di dimensione specificata dall'utente.
3. Crea un programma che dimostra un memory leak e spiega perché si verifica.

## Prossimo Argomento

Nel prossimo argomento, esploreremo in dettaglio gli operatori `new` e `delete` per l'allocazione e la deallocazione della memoria dinamica in C++.