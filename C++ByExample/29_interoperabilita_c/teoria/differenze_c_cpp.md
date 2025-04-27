# Differenze Fondamentali tra C e C++

## Introduzione

C e C++ sono linguaggi di programmazione strettamente correlati, ma con differenze significative nella filosofia, nelle funzionalità e nell'approccio alla programmazione. Comprendere queste differenze è fondamentale per lavorare efficacemente con entrambi i linguaggi e per gestire l'interoperabilità tra di essi.

## Paradigmi di Programmazione

### C: Programmazione Procedurale

C è un linguaggio di programmazione procedurale, focalizzato su funzioni e procedure. Il codice è organizzato in funzioni che operano su dati, con una chiara separazione tra i due.

```c
// Esempio di programmazione procedurale in C
#include <stdio.h>

// Struttura dati
struct Punto {
    double x;
    double y;
};

// Funzione che opera sui dati
double calcola_distanza(struct Punto p1, struct Punto p2) {
    double dx = p2.x - p1.x;
    double dy = p2.y - p1.y;
    return sqrt(dx*dx + dy*dy);
}

int main() {
    struct Punto a = {0.0, 0.0};
    struct Punto b = {3.0, 4.0};
    
    printf("Distanza: %f\n", calcola_distanza(a, b));
    return 0;
}
```

### C++: Programmazione Multi-paradigma

C++ supporta diversi paradigmi di programmazione, inclusi:

1. **Programmazione Procedurale**: Ereditata da C
2. **Programmazione Orientata agli Oggetti**: Classi, ereditarietà, polimorfismo
3. **Programmazione Generica**: Template
4. **Programmazione Funzionale**: Lambda, funzioni di ordine superiore

```cpp
// Esempio di programmazione orientata agli oggetti in C++
#include <iostream>
#include <cmath>

class Punto {
private:
    double x, y;

public:
    Punto(double x = 0.0, double y = 0.0) : x(x), y(y) {}
    
    double getX() const { return x; }
    double getY() const { return y; }
    
    double distanzaDa(const Punto& altro) const {
        double dx = altro.x - x;
        double dy = altro.y - y;
        return std::sqrt(dx*dx + dy*dy);
    }
};

int main() {
    Punto a(0.0, 0.0);
    Punto b(3.0, 4.0);
    
    std::cout << "Distanza: " << a.distanzaDa(b) << std::endl;
    return 0;
}
```

## Differenze Sintattiche e Semantiche

### 1. Dichiarazione di Variabili

**C**:
```c
// Dichiarazione all'inizio del blocco
int main() {
    int i;
    double x;
    
    // Codice...
    i = 10;
    x = 3.14;
}
```

**C++**:
```cpp
// Dichiarazione dove necessario
int main() {
    // Codice...
    int i = 10;
    double x = 3.14;
}
```

### 2. Gestione della Memoria

**C**:
```c
// Allocazione dinamica in C
#include <stdlib.h>

int main() {
    int* array = (int*)malloc(10 * sizeof(int));
    if (array != NULL) {
        // Usa array
        free(array);
    }
    return 0;
}
```

**C++**:
```cpp
// Allocazione dinamica in C++
#include <iostream>

int main() {
    try {
        int* array = new int[10];
        // Usa array
        delete[] array;
    } catch (std::bad_alloc& e) {
        std::cerr << "Allocazione fallita: " << e.what() << std::endl;
    }
    return 0;
}
```

### 3. Gestione degli Errori

**C**:
```c
// Gestione degli errori tramite codici di ritorno
#include <stdio.h>

int dividi(int a, int b, int* risultato) {
    if (b == 0) {
        return -1; // Errore: divisione per zero
    }
    *risultato = a / b;
    return 0; // Successo
}

int main() {
    int risultato;
    int stato = dividi(10, 0, &risultato);
    
    if (stato != 0) {
        printf("Errore nella divisione\n");
    } else {
        printf("Risultato: %d\n", risultato);
    }
    return 0;
}
```

**C++**:
```cpp
// Gestione degli errori tramite eccezioni
#include <iostream>
#include <stdexcept>

int dividi(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("Divisione per zero");
    }
    return a / b;
}

int main() {
    try {
        int risultato = dividi(10, 0);
        std::cout << "Risultato: " << risultato << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Errore: " << e.what() << std::endl;
    }
    return 0;
}
```

### 4. Input/Output

**C**:
```c
// I/O in C
#include <stdio.h>

int main() {
    int numero;
    printf("Inserisci un numero: ");
    scanf("%d", &numero);
    printf("Hai inserito: %d\n", numero);
    return 0;
}
```

**C++**:
```cpp
// I/O in C++
#include <iostream>

int main() {
    int numero;
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    std::cout << "Hai inserito: " << numero << std::endl;
    return 0;
}
```

### 5. Namespace

C non supporta i namespace, mentre C++ li utilizza per organizzare il codice e prevenire conflitti di nomi.

```cpp
// Namespace in C++
namespace Matematica {
    double PI = 3.14159265359;
    
    double area_cerchio(double raggio) {
        return PI * raggio * raggio;
    }
}

int main() {
    double area = Matematica::area_cerchio(5.0);
    return 0;
}
```

### 6. Funzioni Inline

C++ supporta nativamente le funzioni inline, mentre in C questo è possibile solo attraverso macro (con limitazioni significative).

**C** (usando macro):
```c
#define QUADRATO(x) ((x) * (x))

int main() {
    int y = QUADRATO(5); // Diventa: int y = ((5) * (5));
    return 0;
}
```

**C++**:
```cpp
inline int quadrato(int x) {
    return x * x;
}

int main() {
    int y = quadrato(5);
    return 0;
}
```

## Differenze nella Gestione dei Tipi

### 1. Controllo dei Tipi

C++ ha un sistema di tipi più rigoroso rispetto a C.

**C**:
```c
// C permette conversioni implicite più liberamente
void* ptr = malloc(10);
int* int_ptr = ptr; // In C, questo è valido
```

**C++**:
```cpp
// C++ richiede cast espliciti in molti casi
void* ptr = malloc(10);
int* int_ptr = static_cast<int*>(ptr); // Cast esplicito richiesto
```

### 2. Overloading delle Funzioni

C++ supporta l'overloading delle funzioni, C no.

```cpp
// Overloading in C++
void stampa(int valore) {
    std::cout << "Intero: " << valore << std::endl;
}

void stampa(double valore) {
    std::cout << "Double: " << valore << std::endl;
}

void stampa(const std::string& valore) {
    std::cout << "Stringa: " << valore << std::endl;
}
```

### 3. Riferimenti

C++ introduce i riferimenti, che non esistono in C.

```cpp
// Riferimenti in C++
void incrementa(int& valore) {
    valore++;
}

int main() {
    int x = 5;
    incrementa(x); // x diventa 6
    return 0;
}
```

## Implicazioni per l'Interoperabilità

Queste differenze hanno importanti implicazioni quando si lavora con codice misto C/C++:

1. **Mangling dei Nomi**: C++ applica il mangling dei nomi per supportare l'overloading delle funzioni, mentre C no. Questo può causare problemi di linking.

2. **Gestione della Memoria**: Allocazioni fatte con `malloc()` in C devono essere liberate con `free()`, mentre allocazioni fatte con `new` in C++ devono essere liberate con `delete`.

3. **Gestione degli Errori**: Il codice C tipicamente usa codici di errore, mentre il codice C++ può usare eccezioni. Questo richiede una gestione attenta quando si passa da un linguaggio all'altro.

4. **Strutture vs Classi**: Le strutture in C sono semplici aggregati di dati, mentre in C++ possono avere metodi, costruttori, ecc.

## Conclusione

C e C++ sono linguaggi con filosofie e caratteristiche diverse, nonostante la loro relazione storica. C è un linguaggio procedurale semplice e diretto, mentre C++ è un linguaggio multi-paradigma più complesso con supporto per la programmazione orientata agli oggetti, generica e funzionale.

Quando si lavora con entrambi i linguaggi, è importante comprendere queste differenze per gestire efficacemente l'interoperabilità e sfruttare al meglio le caratteristiche di ciascun linguaggio.

## Domande di Autovalutazione

1. Quali sono i principali paradigmi di programmazione supportati da C++?
2. Come differisce la gestione della memoria dinamica tra C e C++?
3. Perché è necessario utilizzare `extern "C"` quando si dichiara una funzione C in un programma C++?
4. Quali sono le differenze tra una struct in C e una struct in C++?
5. Come gestisce C++ l'overloading delle funzioni e perché questo crea problemi di interoperabilità con C?

## Esercizi Proposti

1. Scrivi una funzione in C e chiamala da un programma C++, utilizzando la dichiarazione `extern "C"`.
2. Crea una classe C++ che incapsula una struttura dati C, fornendo un'interfaccia orientata agli oggetti.
3. Implementa una funzione che converte una stringa C-style (char*) in una std::string e viceversa.
4. Scrivi un programma che utilizza sia malloc/free che new/delete, assicurandoti di gestire correttamente la memoria in entrambi i casi.
5. Crea un header file che può essere incluso sia in codice C che C++, utilizzando le direttive del preprocessore appropriate.