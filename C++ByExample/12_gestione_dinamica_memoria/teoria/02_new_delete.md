# Operatori `new` e `delete`

In questa guida, esploreremo in dettaglio gli operatori `new` e `delete` utilizzati per la gestione dinamica della memoria in C++.

## L'Operatore `new`

### Sintassi Base

L'operatore `new` alloca memoria dinamica nello heap e restituisce un puntatore al tipo specificato:

```cpp
tipo* puntatore = new tipo;
```

Esempio:

```cpp
int* p = new int;  // Alloca memoria per un intero
*p = 10;           // Assegna il valore 10 alla memoria allocata
```

### Inizializzazione

È possibile inizializzare la memoria allocata direttamente:

```cpp
int* p = new int(10);  // Alloca e inizializza a 10
double* d = new double(3.14);  // Alloca e inizializza a 3.14
```

Con C++11 e versioni successive, è possibile utilizzare la sintassi di inizializzazione uniforme:

```cpp
int* p = new int{10};  // Inizializzazione uniforme
```

### Gestione degli Errori

Se non c'è abbastanza memoria disponibile, `new` lancia un'eccezione `std::bad_alloc`:

```cpp
try {
    int* array = new int[1000000000];  // Tentativo di allocare molta memoria
} catch (const std::bad_alloc& e) {
    std::cerr << "Allocazione fallita: " << e.what() << std::endl;
}
```

È anche possibile utilizzare la versione `nothrow` che restituisce `nullptr` in caso di fallimento:

```cpp
int* p = new(std::nothrow) int[1000000000];
if (p == nullptr) {
    std::cerr << "Allocazione fallita" << std::endl;
}
```

## L'Operatore `delete`

### Sintassi Base

L'operatore `delete` dealloca la memoria precedentemente allocata con `new`:

```cpp
delete puntatore;  // Dealloca un singolo oggetto
```

Esempio:

```cpp
int* p = new int(10);
// Utilizzo di p
delete p;  // Dealloca la memoria
p = nullptr;  // Buona pratica: assegna nullptr dopo delete
```

### Deallocazione di Array

Per deallocare array allocati con `new[]`, si utilizza `delete[]`:

```cpp
int* array = new int[10];
// Utilizzo dell'array
delete[] array;  // Dealloca l'intero array
array = nullptr;
```

### Errori Comuni

1. **Dimenticare di usare `delete[]` per gli array**:

```cpp
int* array = new int[10];
delete array;  // ERRORE: dovrebbe essere delete[] array;
```

2. **Deallocare due volte la stessa memoria**:

```cpp
int* p = new int;
delete p;
delete p;  // ERRORE: comportamento indefinito
```

3. **Deallocare memoria non allocata con `new`**:

```cpp
int x = 10;
int* p = &x;
delete p;  // ERRORE: p non punta a memoria allocata con new
```

## Esempio Completo

```cpp
#include <iostream>

int main() {
    // Allocazione di un singolo intero
    int* num = new int(42);
    std::cout << "Valore: " << *num << std::endl;
    delete num;
    
    // Allocazione di un array
    int size = 5;
    int* array = new int[size];
    
    // Inizializzazione dell'array
    for (int i = 0; i < size; i++) {
        array[i] = i * 10;
    }
    
    // Utilizzo dell'array
    std::cout << "Elementi dell'array:";
    for (int i = 0; i < size; i++) {
        std::cout << " " << array[i];
    }
    std::cout << std::endl;
    
    // Deallocazione dell'array
    delete[] array;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra `delete` e `delete[]`?
2. Cosa succede se si dimentica di deallocare memoria allocata dinamicamente?
3. Come si può gestire il fallimento dell'allocazione di memoria con `new`?
4. Perché è una buona pratica assegnare `nullptr` a un puntatore dopo averlo deallocato?
5. Quali sono gli errori più comuni nell'uso di `new` e `delete`?

## Esercizi Proposti

1. Scrivi un programma che alloca dinamicamente un array di interi, lo popola con numeri casuali e poi lo dealloca correttamente.
2. Implementa una funzione che alloca dinamicamente una matrice 2D e un'altra funzione che la dealloca correttamente.
3. Scrivi un programma che dimostra l'uso di `new(std::nothrow)` per gestire il fallimento dell'allocazione.

## Prossimo Argomento

Nel prossimo argomento, esploreremo in dettaglio come lavorare con array dinamici in C++.