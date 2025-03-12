# Gestione della Memoria in C e C++

## Introduzione

La gestione della memoria è un aspetto fondamentale della programmazione in C e C++. A differenza di linguaggi con garbage collection automatico, C e C++ richiedono che il programmatore gestisca esplicitamente l'allocazione e la deallocazione della memoria. Questo offre maggiore controllo e prestazioni, ma aumenta anche la responsabilità del programmatore.

## Zone di Memoria

I programmi in C e C++ utilizzano diverse aree di memoria, ciascuna con caratteristiche e scopi specifici. Comprendere queste zone è fondamentale per una corretta gestione della memoria.

### Text Segment (Area di Codice)

Il text segment contiene il codice eseguibile del programma. Questa area è in sola lettura per prevenire modifiche accidentali al codice durante l'esecuzione.

```c
int main() {
    // Questo codice è memorizzato nel text segment
    return 0;
}
```

### Data Segment (Area Dati)

L'area dati è suddivisa in diverse sottosezioni:

#### Initialized Data Segment (.data)

Contiene variabili globali e statiche inizializzate con valori non-zero.

```c
int global_var = 42;        // Memorizzato in .data
static int static_var = 10;  // Memorizzato in .data

int main() {
    // ...
}
```

#### Uninitialized Data Segment (.bss)

Contiene variabili globali e statiche non inizializzate o inizializzate a zero. Il sistema operativo inizializza questa area a zero prima dell'esecuzione del programma.

```c
int global_var_uninit;       // Memorizzato in .bss
static int static_var_zero = 0;  // Memorizzato in .bss

int main() {
    // ...
}
```

### Stack

Lo stack è un'area di memoria a crescita e decrescita automatica che memorizza variabili locali, parametri di funzione e informazioni di controllo come gli indirizzi di ritorno delle funzioni.

Caratteristiche principali:
- Allocazione/deallocazione automatica (LIFO - Last In, First Out)
- Dimensione limitata (può causare stack overflow)
- Accesso veloce
- Gestito dal compilatore

```c
void funzione(int parametro) {  // parametro è memorizzato nello stack
    int var_locale = 10;        // var_locale è memorizzata nello stack
    // ...
}  // var_locale e parametro vengono deallocati automaticamente
```

### Heap

L'heap è un'area di memoria per l'allocazione dinamica. A differenza dello stack, la memoria nell'heap deve essere gestita esplicitamente dal programmatore.

Caratteristiche principali:
- Allocazione/deallocazione manuale
- Dimensione limitata solo dalla memoria disponibile nel sistema
- Accesso più lento rispetto allo stack
- Soggetto a frammentazione

```c
#include <stdlib.h>

int main() {
    int *p = (int *)malloc(sizeof(int));  // Allocazione sull'heap
    *p = 10;
    // ...
    free(p);  // Deallocazione manuale
    return 0;
}
```

In C++:

```cpp
int main() {
    int *p = new int;  // Allocazione sull'heap
    *p = 10;
    // ...
    delete p;  // Deallocazione manuale
    return 0;
}
```

### Memoria Statica

La memoria statica comprende le aree .data e .bss e contiene variabili con durata per l'intero programma. Le variabili statiche mantengono il loro valore tra le chiamate di funzione.

```c
void funzione() {
    static int contatore = 0;  // Inizializzato solo la prima volta
    contatore++;               // Il valore persiste tra le chiamate
    printf("%d\n", contatore);
}

int main() {
    funzione();  // Stampa: 1
    funzione();  // Stampa: 2
    funzione();  // Stampa: 3
    return 0;
}
```

### Confronto tra le Zone di Memoria

| Zona di Memoria | Allocazione | Deallocazione | Durata | Accesso | Uso Tipico |
|----------------|-------------|---------------|--------|---------|------------|
| Text Segment   | Compilazione | Mai | Programma | Sola lettura | Codice eseguibile |
| .data          | Compilazione | Mai | Programma | Lettura/Scrittura | Variabili globali/statiche inizializzate |
| .bss           | Compilazione | Mai | Programma | Lettura/Scrittura | Variabili globali/statiche non inizializzate |
| Stack          | Automatica | Automatica | Scope | Veloce | Variabili locali, parametri |
| Heap           | Manuale | Manuale | Manuale | Più lento | Allocazione dinamica |

## Gestione della Memoria in C

### Allocazione Statica

La memoria statica viene allocata durante la compilazione e rimane disponibile per tutta la durata del programma.

```c
int array[100];  // Allocazione statica di un array
```

### Allocazione Automatica (Stack)

La memoria automatica viene allocata sullo stack quando una funzione viene chiamata e viene deallocata automaticamente quando la funzione termina.

```c
void funzione() {
    int x;          // Allocazione automatica
    int array[10];  // Allocazione automatica di un array
}  // x e array vengono deallocati automaticamente
```

### Allocazione Dinamica (Heap)

La memoria dinamica viene allocata sull'heap durante l'esecuzione del programma e deve essere esplicitamente deallocata dal programmatore.

#### malloc()

```c
#include <stdlib.h>

int *p = (int *)malloc(sizeof(int));  // Alloca memoria per un intero
if (p == NULL) {
    // Gestione dell'errore di allocazione
}
*p = 10;  // Utilizzo della memoria allocata
free(p);   // Deallocazione della memoria
```

#### calloc()

```c
int *array = (int *)calloc(10, sizeof(int));  // Alloca e inizializza a zero 10 interi
if (array == NULL) {
    // Gestione dell'errore di allocazione
}
// Utilizzo dell'array
free(array);  // Deallocazione della memoria
```

#### realloc()

```c
int *array = (int *)malloc(10 * sizeof(int));
if (array == NULL) {
    // Gestione dell'errore di allocazione
}
// Ridimensionamento dell'array a 20 elementi
int *new_array = (int *)realloc(array, 20 * sizeof(int));
if (new_array == NULL) {
    // Gestione dell'errore di riallocazione
    free(array);  // Importante: liberare la memoria originale in caso di errore
} else {
    array = new_array;  // Aggiornamento del puntatore
}
// Utilizzo dell'array
free(array);  // Deallocazione della memoria
```

## Gestione della Memoria in C++

### Operatori new e delete

C++ fornisce gli operatori `new` e `delete` per l'allocazione e la deallocazione dinamica della memoria.

```cpp
// Allocazione di un singolo oggetto
int *p = new int;  // Alloca memoria per un intero
*p = 10;           // Utilizzo della memoria allocata
delete p;          // Deallocazione della memoria

// Allocazione di un array
int *array = new int[10];  // Alloca memoria per 10 interi
// Utilizzo dell'array
delete[] array;            // Deallocazione dell'array
```

### Smart Pointers

C++11 ha introdotto gli smart pointers, che gestiscono automaticamente la deallocazione della memoria.

#### unique_ptr

```cpp
#include <memory>

std::unique_ptr<int> p(new int);  // Ownership esclusiva
*p = 10;  // Utilizzo della memoria allocata
// Non è necessario chiamare delete, la memoria viene deallocata automaticamente
// quando p esce dallo scope
```

#### shared_ptr

```cpp
#include <memory>

std::shared_ptr<int> p1(new int);  // Ownership condivisa
*p1 = 10;
std::shared_ptr<int> p2 = p1;      // p1 e p2 condividono la proprietà
// La memoria viene deallocata quando tutti gli shared_ptr che la possiedono escono dallo scope
```

#### weak_ptr

```cpp
#include <memory>

std::shared_ptr<int> p1(new int);
*p1 = 10;
std::weak_ptr<int> wp = p1;  // Non incrementa il contatore di riferimenti

if (auto p2 = wp.lock()) {   // Verifica se l'oggetto esiste ancora
    // Utilizzo dell'oggetto tramite p2
}
```

## Problemi Comuni nella Gestione della Memoria

### Memory Leaks (Perdite di Memoria)

Si verificano quando la memoria allocata dinamicamente non viene mai deallocata.

```c
void funzione_con_leak() {
    int *p = (int *)malloc(sizeof(int));
    *p = 10;
    // Manca free(p) - Memory leak!
}
```

### Dangling Pointers (Puntatori Pendenti)

Si verificano quando si utilizza un puntatore dopo che la memoria a cui punta è stata deallocata.

```c
int *p = (int *)malloc(sizeof(int));
*p = 10;
free(p);  // Deallocazione della memoria
*p = 20;  // ERRORE: p è ora un dangling pointer!
```

### Double Free (Doppia Deallocazione)

Si verifica quando si tenta di deallocare la stessa memoria più di una volta.

```c
int *p = (int *)malloc(sizeof(int));
*p = 10;
free(p);  // Prima deallocazione
free(p);  // ERRORE: Double free!
```

### Buffer Overflow

Si verifica quando si scrive oltre i limiti di un buffer allocato.

```c
int *array = (int *)malloc(5 * sizeof(int));
for (int i = 0; i < 10; i++) {  // ERRORE: Scrive oltre i limiti dell'array!
    array[i] = i;
}
free(array);
```

## Best Practices per la Gestione della Memoria

### In C

1. **Controllare sempre il valore di ritorno delle funzioni di allocazione**
   ```c
   int *p = (int *)malloc(sizeof(int));
   if (p == NULL) {
       // Gestione dell'errore
   }
   ```

2. **Liberare sempre la memoria allocata dinamicamente**
   ```c
   int *p = (int *)malloc(sizeof(int));
   // Utilizzo di p
   free(p);
   p = NULL;  // Buona pratica: impostare il puntatore a NULL dopo free
   ```

3. **Utilizzare strumenti di analisi della memoria** come Valgrind per rilevare memory leaks e altri problemi.

### In C++

1. **Preferire gli smart pointers ai puntatori raw**
   ```cpp
   std::unique_ptr<int> p(new int);  // Invece di int *p = new int;
   ```

2. **Utilizzare make_unique e make_shared** (C++14)
   ```cpp
   auto p = std::make_unique<int>(10);  // Più sicuro e efficiente
   auto sp = std::make_shared<int>(10);
   ```

3. **Seguire la regola delle tre/cinque** (Rule of Three/Five) per classi che gestiscono risorse.

4. **Utilizzare RAII** (Resource Acquisition Is Initialization) per gestire le risorse.
   ```cpp
   class ResourceManager {
   private:
       Resource* res;
   public:
       ResourceManager() : res(new Resource()) {}
       ~ResourceManager() { delete res; }  // Deallocazione automatica
       // Implementare copy constructor, assignment operator, ecc.
   };
   ```

## Conclusioni

La gestione corretta della memoria è cruciale per sviluppare programmi affidabili in C e C++. Mentre C richiede una gestione manuale attraverso funzioni come `malloc` e `free`, C++ offre strumenti più avanzati come gli smart pointers che riducono il rischio di errori. In entrambi i casi, è fondamentale comprendere i meccanismi sottostanti e seguire le best practices per evitare problemi come memory leaks, dangling pointers e buffer overflows.
