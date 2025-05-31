# Array Dinamici

In questa guida, esploreremo come lavorare con array dinamici in C++, una delle applicazioni più comuni della gestione dinamica della memoria.

## Introduzione agli Array Dinamici

Gli array dinamici sono array la cui dimensione viene determinata durante l'esecuzione del programma, anziché essere fissata al momento della compilazione.

### Array Statici vs Array Dinamici

**Array Statici**:
```cpp
int staticArray[10];  // Dimensione fissa, conosciuta a tempo di compilazione
```

**Array Dinamici**:
```cpp
int size = 10;  // La dimensione può essere una variabile
int* dynamicArray = new int[size];  // Dimensione determinata a runtime
```

## Allocazione di Array Dinamici

### Sintassi Base

```cpp
tipo* nome_array = new tipo[dimensione];
```

Esempio:

```cpp
int n;
std::cout << "Inserisci la dimensione dell'array: ";
std::cin >> n;

int* array = new int[n];  // Alloca un array di n interi
```

### Inizializzazione

In C++98/03, non è possibile inizializzare direttamente gli elementi di un array dinamico:

```cpp
// Inizializzazione manuale
int* array = new int[5];
for (int i = 0; i < 5; i++) {
    array[i] = i * 10;
}
```

In C++11 e versioni successive, è possibile utilizzare l'inizializzazione uniforme:

```cpp
int* array = new int[5]{10, 20, 30, 40, 50};  // Inizializzazione diretta
```

## Accesso agli Elementi

L'accesso agli elementi di un array dinamico è identico a quello di un array statico:

```cpp
int* array = new int[5];
array[0] = 10;  // Primo elemento
array[4] = 50;  // Ultimo elemento

std::cout << array[2] << std::endl;  // Accesso in lettura
```

## Deallocazione di Array Dinamici

È fondamentale deallocare gli array dinamici quando non sono più necessari, utilizzando l'operatore `delete[]`:

```cpp
int* array = new int[5];
// Utilizzo dell'array
delete[] array;  // Dealloca l'intero array
array = nullptr;  // Buona pratica: assegna nullptr dopo delete
```

## Ridimensionamento di Array Dinamici

Gli array dinamici in C++ non possono essere ridimensionati direttamente. Per "ridimensionare" un array, è necessario:

1. Allocare un nuovo array con la nuova dimensione
2. Copiare gli elementi dal vecchio array al nuovo
3. Deallocare il vecchio array

```cpp
// Array originale
int oldSize = 5;
int* oldArray = new int[oldSize];
for (int i = 0; i < oldSize; i++) {
    oldArray[i] = i * 10;
}

// Nuovo array con dimensione maggiore
int newSize = 10;
int* newArray = new int[newSize];

// Copia degli elementi
for (int i = 0; i < oldSize; i++) {
    newArray[i] = oldArray[i];
}

// Inizializzazione dei nuovi elementi
for (int i = oldSize; i < newSize; i++) {
    newArray[i] = 0;  // o qualsiasi valore predefinito
}

// Deallocazione del vecchio array
delete[] oldArray;

// Ora newArray è l'array "ridimensionato"
```

## Array Multidimensionali Dinamici

### Approccio con Array di Puntatori

```cpp
// Matrice 3x4
int rows = 3;
int cols = 4;

// Allocazione delle righe
int** matrix = new int*[rows];

// Allocazione delle colonne per ogni riga
for (int i = 0; i < rows; i++) {
    matrix[i] = new int[cols];
}

// Accesso agli elementi
matrix[1][2] = 42;

// Deallocazione
for (int i = 0; i < rows; i++) {
    delete[] matrix[i];  // Dealloca ogni riga
}
delete[] matrix;  // Dealloca l'array di puntatori
```

### Approccio con Array Monodimensionale

```cpp
int rows = 3;
int cols = 4;

// Allocazione di un array monodimensionale
int* matrix = new int[rows * cols];

// Accesso agli elementi usando aritmetica dei puntatori
// Per accedere all'elemento in posizione (i, j): matrix[i * cols + j]
matrix[1 * cols + 2] = 42;  // Equivalente a matrix[1][2]

// Deallocazione
delete[] matrix;
```

## Esempio Completo

```cpp
#include <iostream>

int main() {
    int size;
    std::cout << "Inserisci la dimensione dell'array: ";
    std::cin >> size;
    
    // Allocazione dell'array
    int* numbers = new int[size];
    
    // Inserimento dei valori
    std::cout << "Inserisci " << size << " numeri:" << std::endl;
    for (int i = 0; i < size; i++) {
        std::cout << "Numero " << (i + 1) << ": ";
        std::cin >> numbers[i];
    }
    
    // Calcolo della somma e della media
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    
    double average = static_cast<double>(sum) / size;
    
    // Output dei risultati
    std::cout << "Somma: " << sum << std::endl;
    std::cout << "Media: " << average << std::endl;
    
    // Deallocazione dell'array
    delete[] numbers;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi degli array dinamici rispetto agli array statici?
2. Perché è necessario utilizzare `delete[]` invece di `delete` per deallocare un array dinamico?
3. Come si può "ridimensionare" un array dinamico in C++?
4. Quali sono i due approcci principali per implementare matrici dinamiche in C++?
5. Quali problemi possono verificarsi se si dimentica di deallocare un array dinamico?

## Esercizi Proposti

1. Scrivi un programma che chiede all'utente una dimensione n e crea un array dinamico di n numeri interi. Riempi l'array con numeri casuali e trova il valore massimo e minimo.

2. Implementa una funzione che "ridimensiona" un array dinamico, preservando i valori esistenti.

3. Crea una matrice dinamica 3x3, riempila con valori inseriti dall'utente e calcola la somma di ogni riga e colonna.

## Prossimo Argomento

Nel prossimo argomento, esploreremo i problemi comuni nella gestione della memoria dinamica: memory leak e dangling pointers.