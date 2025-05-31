# Operazioni con i Puntatori

In questa guida, esploreremo le varie operazioni che si possono eseguire con i puntatori in C++, inclusa l'aritmetica dei puntatori, il confronto tra puntatori e il casting di puntatori.

## Aritmetica dei Puntatori

L'aritmetica dei puntatori è una caratteristica potente di C++ che permette di manipolare gli indirizzi di memoria in modo controllato. Le operazioni aritmetiche sui puntatori funzionano in modo diverso rispetto alle operazioni sui tipi di dati normali.

### Incremento e Decremento

Quando si incrementa o decrementa un puntatore, l'indirizzo memorizzato viene aumentato o diminuito di un valore pari alla dimensione del tipo di dato a cui il puntatore fa riferimento.

```cpp
#include <iostream>

int main() {
    int array[5] = {10, 20, 30, 40, 50};
    int* p = array;  // p punta al primo elemento dell'array
    
    std::cout << "*p = " << *p << std::endl;       // Stampa 10
    
    p++;  // Incrementa p per puntare al secondo elemento
    std::cout << "Dopo p++, *p = " << *p << std::endl;  // Stampa 20
    
    p += 2;  // Avanza di due elementi
    std::cout << "Dopo p += 2, *p = " << *p << std::endl;  // Stampa 40
    
    p--;  // Decrementa p per puntare all'elemento precedente
    std::cout << "Dopo p--, *p = " << *p << std::endl;  // Stampa 30
    
    return 0;
}
```

Output:
```
*p = 10
Dopo p++, *p = 20
Dopo p += 2, *p = 40
Dopo p--, *p = 30
```

### Differenza tra Puntatori

È possibile calcolare la differenza tra due puntatori dello stesso tipo. Il risultato è il numero di elementi (non byte) tra i due indirizzi.

```cpp
#include <iostream>

int main() {
    int array[5] = {10, 20, 30, 40, 50};
    int* inizio = array;        // Punta al primo elemento
    int* fine = &array[4];      // Punta all'ultimo elemento
    
    ptrdiff_t differenza = fine - inizio;  // Calcola la differenza
    
    std::cout << "Differenza: " << differenza << " elementi" << std::endl;
    std::cout << "Dimensione dell'array: " << differenza + 1 << " elementi" << std::endl;
    
    return 0;
}
```

Output:
```
Differenza: 4 elementi
Dimensione dell'array: 5 elementi
```

### Aritmetica dei Puntatori con Tipi di Dati Diversi

L'incremento di un puntatore dipende dalla dimensione del tipo di dato a cui punta:

```cpp
#include <iostream>

int main() {
    char c = 'A';
    int i = 42;
    double d = 3.14;
    
    char* pc = &c;
    int* pi = &i;
    double* pd = &d;
    
    std::cout << "Indirizzo in pc: " << static_cast<void*>(pc) << std::endl;
    std::cout << "Indirizzo in pc+1: " << static_cast<void*>(pc+1) << std::endl;
    std::cout << "Differenza: " << (pc+1) - pc << " byte" << std::endl;
    
    std::cout << "Indirizzo in pi: " << pi << std::endl;
    std::cout << "Indirizzo in pi+1: " << pi+1 << std::endl;
    std::cout << "Differenza: " << sizeof(int) << " byte" << std::endl;
    
    std::cout << "Indirizzo in pd: " << pd << std::endl;
    std::cout << "Indirizzo in pd+1: " << pd+1 << std::endl;
    std::cout << "Differenza: " << sizeof(double) << " byte" << std::endl;
    
    return 0;
}
```

Output (i valori esatti degli indirizzi possono variare):
```
Indirizzo in pc: 0x7ffee13b9a4f
Indirizzo in pc+1: 0x7ffee13b9a50
Differenza: 1 byte

Indirizzo in pi: 0x7ffee13b9a50
Indirizzo in pi+1: 0x7ffee13b9a54
Differenza: 4 byte

Indirizzo in pd: 0x7ffee13b9a58
Indirizzo in pd+1: 0x7ffee13b9a60
Differenza: 8 byte
```

## Confronto tra Puntatori

I puntatori possono essere confrontati utilizzando gli operatori di confronto standard (`==`, `!=`, `<`, `>`, `<=`, `>=`). Questo è particolarmente utile quando si lavora con array o quando si vuole verificare se due puntatori puntano alla stessa posizione di memoria.

```cpp
#include <iostream>

int main() {
    int array[5] = {10, 20, 30, 40, 50};
    int* p1 = &array[1];  // Punta al secondo elemento
    int* p2 = &array[3];  // Punta al quarto elemento
    
    if (p1 == p2) {
        std::cout << "p1 e p2 puntano allo stesso indirizzo" << std::endl;
    } else {
        std::cout << "p1 e p2 puntano a indirizzi diversi" << std::endl;
    }
    
    if (p1 < p2) {
        std::cout << "p1 punta a un indirizzo inferiore rispetto a p2" << std::endl;
    } else {
        std::cout << "p1 punta a un indirizzo superiore o uguale rispetto a p2" << std::endl;
    }
    
    // Confronto con nullptr
    int* pNullo = nullptr;
    if (p1 != nullptr) {
        std::cout << "p1 non è un puntatore nullo" << std::endl;
    }
    
    if (pNullo == nullptr) {
        std::cout << "pNullo è un puntatore nullo" << std::endl;
    }
    
    return 0;
}
```

Output:
```
p1 e p2 puntano a indirizzi diversi
p1 punta a un indirizzo inferiore rispetto a p2
p1 non è un puntatore nullo
pNullo è un puntatore nullo
```

## Casting di Puntatori

Il casting di puntatori permette di convertire un puntatore da un tipo a un altro. Questa operazione deve essere eseguita con cautela, poiché può portare a comportamenti non definiti se non gestita correttamente.

### Cast Statico (static_cast)

```cpp
#include <iostream>

int main() {
    double valore = 3.14159;
    double* pDouble = &valore;
    
    // Casting da double* a void*
    void* pVoid = static_cast<void*>(pDouble);
    
    // Casting da void* a double*
    double* pDoubleDiNuovo = static_cast<double*>(pVoid);
    
    std::cout << "Valore originale: " << valore << std::endl;
    std::cout << "Valore tramite pDoubleDiNuovo: " << *pDoubleDiNuovo << std::endl;
    
    return 0;
}
```

Output:
```
Valore originale: 3.14159
Valore tramite pDoubleDiNuovo: 3.14159
```

### Cast di Reinterpretazione (reinterpret_cast)

Il `reinterpret_cast` è più pericoloso di `static_cast` perché permette conversioni arbitrarie tra tipi di puntatori. Dovrebbe essere usato solo quando si è assolutamente sicuri di ciò che si sta facendo.

```cpp
#include <iostream>

int main() {
    int intero = 0x41424344;  // Rappresentazione esadecimale di "ABCD"
    int* pInt = &intero;
    
    // Reinterpreta l'intero come un array di caratteri
    char* pChar = reinterpret_cast<char*>(pInt);
    
    // Su sistemi little-endian, questo stamperà "DCBA"
    // Su sistemi big-endian, questo stamperà "ABCD"
    for (int i = 0; i < sizeof(int); i++) {
        std::cout << pChar[i];
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Cast Costante (const_cast)

Il `const_cast` è utilizzato per rimuovere o aggiungere la qualifica `const` a un puntatore o riferimento.

```cpp
#include <iostream>

void funzione(const int* ptr) {
    // Non possiamo modificare *ptr direttamente perché è const
    // *ptr = 100;  // Errore di compilazione
    
    // Rimuoviamo la qualifica const (pericoloso!)
    int* ptrModificabile = const_cast<int*>(ptr);
    
    // Ora possiamo modificare il valore
    *ptrModificabile = 100;
}

int main() {
    int valore = 42;
    std::cout << "Valore prima: " << valore << std::endl;
    
    funzione(&valore);
    
    std::cout << "Valore dopo: " << valore << std::endl;
    
    return 0;
}
```

Output:
```
Valore prima: 42
Valore dopo: 100
```

## Puntatori a void

Un puntatore a `void` è un puntatore generico che può puntare a qualsiasi tipo di dato. È utile quando si vuole scrivere codice che lavora con puntatori di tipo sconosciuto o variabile.

```cpp
#include <iostream>

// Funzione che accetta un puntatore a void
void stampaIndirizzo(const void* ptr) {
    std::cout << "Indirizzo: " << ptr << std::endl;
}

int main() {
    int i = 42;
    double d = 3.14;
    char c = 'A';
    
    // Possiamo passare qualsiasi tipo di puntatore a stampaIndirizzo
    stampaIndirizzo(&i);
    stampaIndirizzo(&d);
    stampaIndirizzo(&c);
    
    // Puntatore a void
    void* pVoid;
    
    // Può puntare a un int
    pVoid = &i;
    // Casting necessario per dereferenziare
    std::cout << "Valore di i: " << *static_cast<int*>(pVoid) << std::endl;
    
    // Può puntare a un double
    pVoid = &d;
    // Casting necessario per dereferenziare
    std::cout << "Valore di d: " << *static_cast<double*>(pVoid) << std::endl;
    
    return 0;
}
```

Output:
```
Indirizzo: 0x7ffee13b9a4c
Indirizzo: 0x7ffee13b9a50
Indirizzo: 0x7ffee13b9a5f
Valore di i: 42
Valore di d: 3.14
```

## Puntatori a Funzione

I puntatori a funzione permettono di memorizzare l'indirizzo di una funzione e chiamarla indirettamente. Sono utili per implementare callback, tabelle di dispatch e strategie di design pattern.

```cpp
#include <iostream>

// Definizione di alcune funzioni
int somma(int a, int b) {
    return a + b;
}

int sottrazione(int a, int b) {
    return a - b;
}

int moltiplicazione(int a, int b) {
    return a * b;
}

int divisione(int a, int b) {
    if (b != 0) {
        return a / b;
    }
    return 0;
}

int main() {
    // Dichiarazione di un puntatore a funzione
    int (*operazione)(int, int);
    
    // Assegnazione di diverse funzioni al puntatore
    operazione = somma;
    std::cout << "Somma: " << operazione(10, 5) << std::endl;
    
    operazione = sottrazione;
    std::cout << "Sottrazione: " << operazione(10, 5) << std::endl;
    
    operazione = moltiplicazione;
    std::cout << "Moltiplicazione: " << operazione(10, 5) << std::endl;
    
    operazione = divisione;
    std::cout << "Divisione: " << operazione(10, 5) << std::endl;
    
    // Array di puntatori a funzione
    int (*operazioni[4])(int, int) = {somma, sottrazione, moltiplicazione, divisione};
    
    std::cout << "\nUtilizzo dell'array di puntatori a funzione:" << std::endl;
    for (int i = 0; i < 4; i++) {
        std::cout << "Operazione " << i << ": " << operazioni[i](10, 5) << std::endl;
    }
    
    return 0;
}
```

Output:
```
Somma: 15
Sottrazione: 5
Moltiplicazione: 50
Divisione: 2

Utilizzo dell'array di puntatori a funzione:
Operazione 0: 15
Operazione 1: 5
Operazione 2: 50
Operazione 3: 2
```

## Puntatori Smart (C++11 e successivi)

I puntatori smart sono oggetti che si comportano come puntatori ma forniscono funzionalità aggiuntive, come la gestione automatica della memoria. Sono parte della libreria standard C++ a partire da C++11.

### unique_ptr

Un `unique_ptr` possiede esclusivamente l'oggetto a cui punta e lo dealloca automaticamente quando il puntatore viene distrutto.

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa() {
        std::cout << "Risorsa creata" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa distrutta" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa utilizzata" << std::endl;
    }
};

int main() {
    // Creazione di un unique_ptr
    std::unique_ptr<Risorsa> ptr = std::make_unique<Risorsa>();  // C++14
    // Per C++11: std::unique_ptr<Risorsa> ptr(new Risorsa());
    
    // Utilizzo della risorsa
    ptr->utilizza();
    
    // La risorsa verrà deallocata automaticamente quando ptr esce dallo scope
    return 0;
}
```

Output:
```
Risorsa creata
Risorsa utilizzata
Risorsa distrutta
```

### shared_ptr

Un `shared_ptr` permette a più puntatori di condividere la proprietà di un oggetto. L'oggetto viene deallocato solo quando l'ultimo `shared_ptr` che lo possiede viene distrutto.

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa() {
        std::cout << "Risorsa creata" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa distrutta" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa utilizzata" << std::endl;
    }
};

int main() {
    // Creazione di un shared_ptr
    std::shared_ptr<Risorsa> ptr1 = std::make_shared<Risorsa>();
    
    {
        // Creazione di un secondo shared_ptr che condivide la proprietà
        std::shared_ptr<Risorsa> ptr2 = ptr1;
        
        std::cout << "Conteggio riferimenti: " << ptr1.use_count() << std::endl;
        
        // Utilizzo della risorsa tramite ptr2
        ptr2->utilizza();
        
        // ptr2 viene distrutto alla fine di questo blocco, ma la risorsa non viene deallocata
        // perché ptr1 la possiede ancora
    }
    
    std::cout << "Conteggio riferimenti dopo il blocco: " << ptr1.use_count() << std::endl;
    
    // Utilizzo della risorsa tramite ptr1
    ptr1->utilizza();
    
    // La risorsa verrà deallocata quando ptr1 esce dallo scope
    return 0;
}
```

Output:
```
Risorsa creata
Conteggio riferimenti: 2
Risorsa utilizzata
Conteggio riferimenti dopo il blocco: 1
Risorsa utilizzata
Risorsa distrutta
```

### weak_ptr

Un `weak_ptr` è un puntatore che osserva un oggetto posseduto da uno o più `shared_ptr` senza aumentare il conteggio dei riferimenti. È utile per evitare riferimenti circolari che potrebbero causare memory leak.

```cpp
#include <iostream>
#include <memory>

class B;

class A {
public:
    std::shared_ptr<B> b_ptr;
    
    A() {
        std::cout << "A creato" << std::endl;
    }
    
    ~A() {
        std::cout << "A distrutto" << std::endl;
    }
};

class B {
public:
    // Utilizzo di weak_ptr per evitare riferimenti circolari
    std::weak_ptr<A> a_ptr;
    
    B() {
        std::cout << "B creato" << std::endl;
    }
    
    ~B() {
        std::cout << "B distrutto" << std::endl;
    }
    
    void utilizza() {
        // Verifica se a_ptr è ancora valido
        if (auto a = a_ptr.lock()) {
            std::cout << "A è ancora valido" << std::endl;
        } else {
            std::cout << "A non è più valido" << std::endl;
        }
    }
};

int main() {
    // Creazione degli oggetti
    std::shared_ptr<A> a = std::make_shared<A>();
    std::shared_ptr<B> b = std::make_shared<B>();
    
    // Creazione dei riferimenti incrociati
    a->b_ptr = b;
    b->a_ptr = a;
    
    // Utilizzo di B
    b->utilizza();
    
    // Rimozione del riferimento a A
    a.reset();
    
    // Verifica se A è ancora valido
    b->utilizza();
    
    return 0;
}
```

Output:
```
A creato
B creato
A è ancora valido
A distrutto
A non è più valido
B distrutto
```

## Conclusione

Le operazioni con i puntatori in C++ offrono potenti strumenti per la manipolazione diretta della memoria e la creazione di strutture dati complesse. Tuttavia, è importante utilizzare queste operazioni con cautela per evitare errori comuni come accessi a memoria non valida, memory leak e comportamenti non definiti.

I puntatori smart introdotti in C++11 forniscono un'alternativa più sicura ai puntatori raw, gestendo automaticamente la deallocazione della memoria e riducendo il rischio di memory leak.

Nel prossimo capitolo, esploreremo la relazione tra puntatori e array, e come utilizzare i puntatori per attraversare e manipolare gli array in modo efficiente.