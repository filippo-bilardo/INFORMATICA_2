# std::unique_ptr in C++

In questa guida, esploreremo in dettaglio `std::unique_ptr`, uno degli smart pointer più utilizzati in C++ moderno, che implementa la semantica di proprietà esclusiva di una risorsa.

## Cos'è std::unique_ptr?

`std::unique_ptr` è uno smart pointer che possiede e gestisce un altro oggetto attraverso un puntatore e ne dispone (deallocandolo) quando `std::unique_ptr` esce dallo scope. È definito nell'header `<memory>` e fa parte della libreria standard C++ a partire da C++11.

Le caratteristiche principali di `std::unique_ptr` sono:

1. **Proprietà esclusiva**: Un oggetto può essere posseduto da un solo `unique_ptr` alla volta.
2. **Non copiabile**: Non può essere copiato, solo spostato (move semantics).
3. **Overhead minimo**: Non ha overhead di runtime rispetto a un puntatore raw in termini di dimensione e prestazioni.
4. **Deallocazione automatica**: Quando il `unique_ptr` esce dallo scope, l'oggetto che possiede viene automaticamente deallocato.

## Creazione e Utilizzo Base

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa(int id) : id_(id) {
        std::cout << "Risorsa " << id_ << " costruita" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << id_ << " distrutta" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa " << id_ << " utilizzata" << std::endl;
    }
    
private:
    int id_;
};

int main() {
    // Creazione di un unique_ptr con make_unique (C++14)
    std::unique_ptr<Risorsa> ptr1 = std::make_unique<Risorsa>(1);
    
    // Creazione di un unique_ptr con costruttore esplicito (C++11)
    std::unique_ptr<Risorsa> ptr2(new Risorsa(2));
    
    // Utilizzo dell'oggetto attraverso il puntatore
    ptr1->utilizza();
    (*ptr2).utilizza();  // Equivalente a ptr2->utilizza()
    
    // Verifica se il puntatore è valido
    if (ptr1) {
        std::cout << "ptr1 è valido" << std::endl;
    }
    
    // Reset del puntatore (deallocazione dell'oggetto corrente)
    ptr1.reset();
    
    if (!ptr1) {
        std::cout << "ptr1 non è più valido" << std::endl;
    }
    
    // ptr2 verrà automaticamente deallocato alla fine dello scope
    return 0;
}
```

Output:
```
Risorsa 1 costruita
Risorsa 2 costruita
Risorsa 1 utilizzata
Risorsa 2 utilizzata
ptr1 è valido
Risorsa 1 distrutta
ptr1 non è più valido
Risorsa 2 distrutta
```

## Trasferimento di Proprietà

Una delle caratteristiche fondamentali di `std::unique_ptr` è che non può essere copiato, ma solo spostato. Questo garantisce che ci sia sempre un solo `unique_ptr` che possiede un determinato oggetto.

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Risorsa {
public:
    Risorsa(int id) : id_(id) {
        std::cout << "Risorsa " << id_ << " costruita" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << id_ << " distrutta" << std::endl;
    }
    
    int getId() const { return id_; }
    
private:
    int id_;
};

// Funzione che prende la proprietà di un unique_ptr
void prendi_proprieta(std::unique_ptr<Risorsa> ptr) {
    std::cout << "Funzione ha preso la proprietà della Risorsa " << ptr->getId() << std::endl;
    // ptr verrà deallocato alla fine della funzione
}

// Funzione che restituisce un unique_ptr
std::unique_ptr<Risorsa> crea_risorsa(int id) {
    return std::make_unique<Risorsa>(id);
}

int main() {
    // Creazione di un unique_ptr
    auto ptr1 = std::make_unique<Risorsa>(1);
    
    // Errore di compilazione: non è possibile copiare un unique_ptr
    // auto ptr2 = ptr1;
    
    // Trasferimento di proprietà con std::move
    auto ptr2 = std::move(ptr1);
    
    // Ora ptr1 è nullptr
    if (!ptr1) {
        std::cout << "ptr1 è ora nullptr" << std::endl;
    }
    
    // Trasferimento di proprietà a una funzione
    prendi_proprieta(std::move(ptr2));
    
    // Ricezione di proprietà da una funzione
    auto ptr3 = crea_risorsa(3);
    
    // Utilizzo di unique_ptr con contenitori
    std::vector<std::unique_ptr<Risorsa>> risorse;
    risorse.push_back(std::make_unique<Risorsa>(4));
    risorse.push_back(std::make_unique<Risorsa>(5));
    
    // Iterazione su un vettore di unique_ptr
    for (const auto& ptr : risorse) {
        std::cout << "Risorsa nel vettore: " << ptr->getId() << std::endl;
    }
    
    return 0;
}
```

Output:
```
Risorsa 1 costruita
ptr1 è ora nullptr
Funzione ha preso la proprietà della Risorsa 1
Risorsa 1 distrutta
Risorsa 3 costruita
Risorsa 4 costruita
Risorsa 5 costruita
Risorsa nel vettore: 4
Risorsa nel vettore: 5
Risorsa 5 distrutta
Risorsa 4 distrutta
Risorsa 3 distrutta
```

## Accesso al Puntatore Raw

A volte è necessario accedere al puntatore raw sottostante, ad esempio quando si deve passare il puntatore a una funzione C che si aspetta un puntatore raw.

```cpp
#include <iostream>
#include <memory>

void funzione_c(int* p) {
    std::cout << "Valore puntato: " << *p << std::endl;
}

int main() {
    auto ptr = std::make_unique<int>(42);
    
    // Accesso al puntatore raw senza trasferire la proprietà
    funzione_c(ptr.get());
    
    // ptr mantiene ancora la proprietà
    std::cout << "ptr è ancora valido: " << *ptr << std::endl;
    
    return 0;
}
```

Output:
```
Valore puntato: 42
ptr è ancora valido: 42
```

**Attenzione**: L'uso di `.get()` può essere pericoloso se non gestito correttamente. Non deallocare manualmente la memoria puntata da un `unique_ptr` e non creare un altro `unique_ptr` che punti alla stessa memoria.

## Utilizzo con Tipi Array

`std::unique_ptr` ha una specializzazione per gli array che utilizza automaticamente `delete[]` invece di `delete`.

```cpp
#include <iostream>
#include <memory>

int main() {
    // Creazione di un unique_ptr per un array
    std::unique_ptr<int[]> arr = std::make_unique<int[]>(5);
    
    // Inizializzazione dell'array
    for (int i = 0; i < 5; ++i) {
        arr[i] = i * 10;
    }
    
    // Accesso agli elementi dell'array
    for (int i = 0; i < 5; ++i) {
        std::cout << "arr[" << i << "] = " << arr[i] << std::endl;
    }
    
    // L'array verrà deallocato automaticamente con delete[]
    return 0;
}
```

Output:
```
arr[0] = 0
arr[1] = 10
arr[2] = 20
arr[3] = 30
arr[4] = 40
```

## Custom Deleters

`std::unique_ptr` supporta i custom deleters, che sono funzioni o functor che vengono chiamati per deallocare l'oggetto quando il `unique_ptr` esce dallo scope.

```cpp
#include <iostream>
#include <memory>
#include <fstream>

// Custom deleter come funzione
void chiudi_file(std::FILE* fp) {
    if (fp) {
        std::fclose(fp);
        std::cout << "File chiuso" << std::endl;
    }
}

int main() {
    // Utilizzo di un custom deleter con una funzione
    {
        std::unique_ptr<std::FILE, decltype(&chiudi_file)> fp(std::fopen("test.txt", "w"), chiudi_file);
        if (fp) {
            std::fprintf(fp.get(), "Test di scrittura su file");
        }
    }  // fp viene deallocato qui, chiamando chiudi_file
    
    // Utilizzo di un custom deleter con una lambda
    {
        auto deleter = [](int* p) {
            std::cout << "Deleting int: " << *p << std::endl;
            delete p;
        };
        
        std::unique_ptr<int, decltype(deleter)> ptr(new int(42), deleter);
    }  // ptr viene deallocato qui, chiamando la lambda
    
    return 0;
}
```

Output:
```
File chiuso
Deleting int: 42
```

## Confronto con std::shared_ptr e Puntatori Raw

| Caratteristica | std::unique_ptr | std::shared_ptr | Puntatore Raw |
|----------------|----------------|----------------|---------------|
| Proprietà | Esclusiva | Condivisa | Nessuna gestione |
| Copiabile | No | Sì | Sì |
| Spostabile | Sì | Sì | Sì |
| Overhead | Minimo | Reference counting | Nessuno |
| Deallocazione automatica | Sì | Sì | No |
| Custom deleters | Sì, parte del tipo | Sì, non parte del tipo | No |

## Best Practices

1. **Usa `std::make_unique` (C++14)**: È più sicuro ed efficiente rispetto a `new`.

   ```cpp
   // Preferibile (C++14)
   auto ptr = std::make_unique<Risorsa>(args...);
   
   // Meno preferibile
   std::unique_ptr<Risorsa> ptr(new Risorsa(args...));
   ```

2. **Passa `unique_ptr` per valore solo quando intendi trasferire la proprietà**:

   ```cpp
   // Trasferimento di proprietà
   void prendi_proprieta(std::unique_ptr<Risorsa> ptr);
   
   // Accesso senza trasferimento di proprietà
   void utilizza_risorsa(const Risorsa& risorsa);
   ```

3. **Usa `.get()` con cautela**: Non deallocare manualmente la memoria e non creare un altro `unique_ptr` che punti alla stessa memoria.

4. **Preferisci `unique_ptr` a `shared_ptr` quando possibile**: `unique_ptr` ha meno overhead e rende più chiara la proprietà.

5. **Utilizza la specializzazione per array quando necessario**:

   ```cpp
   auto arr = std::make_unique<int[]>(10);
   ```

## Domande di Autovalutazione

1. Quali sono le principali caratteristiche di `std::unique_ptr`?
2. Perché `std::unique_ptr` non può essere copiato ma solo spostato?
3. Come si può trasferire la proprietà di un `std::unique_ptr` a una funzione?
4. Qual è la differenza tra `delete` e `delete[]` e come gestisce `std::unique_ptr` questa differenza?
5. Quando è appropriato utilizzare un custom deleter con `std::unique_ptr`?

## Esercizi Proposti

1. Scrivi una classe `ResourceManager` che utilizzi `std::unique_ptr` per gestire una risorsa allocata dinamicamente.
2. Implementa una funzione factory che restituisca un `std::unique_ptr` a un oggetto di una gerarchia di classi, determinando il tipo concreto a runtime.
3. Crea un esempio che dimostri come utilizzare `std::unique_ptr` con un custom deleter per gestire una risorsa non di memoria (es. un handle di file o una connessione di rete).
4. Scrivi un programma che utilizzi un vettore di `std::unique_ptr` per gestire una collezione di oggetti polimorfici.
5. Implementa una semplice struttura dati (es. una lista collegata o un albero binario) utilizzando `std::unique_ptr` per gestire i nodi.

## Conclusione

`std::unique_ptr` è uno strumento potente e flessibile per la gestione della memoria in C++ moderno. Fornisce un modo sicuro ed efficiente per esprimere la proprietà esclusiva di una risorsa, eliminando molti dei problemi comuni associati alla gestione manuale della memoria. Utilizzando `std::unique_ptr` correttamente, puoi scrivere codice più robusto, più sicuro e più facile da mantenere, senza sacrificare le prestazioni.