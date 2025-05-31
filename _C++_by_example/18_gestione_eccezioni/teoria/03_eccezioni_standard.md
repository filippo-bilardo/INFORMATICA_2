# Eccezioni Standard in C++

In questa lezione, esploreremo le eccezioni standard fornite dalla libreria C++ e come utilizzarle efficacemente nei tuoi programmi.

## La Gerarchia delle Eccezioni Standard

La libreria standard C++ fornisce una gerarchia di classi di eccezioni predefinite, tutte derivate dalla classe base `std::exception`. Questa gerarchia permette di gestire diversi tipi di errori in modo strutturato e coerente.

Ecco la gerarchia principale delle eccezioni standard:

```
std::exception
├── std::logic_error
│   ├── std::domain_error
│   ├── std::invalid_argument
│   ├── std::length_error
│   ├── std::out_of_range
│   └── std::future_error (C++11)
├── std::runtime_error
│   ├── std::range_error
│   ├── std::overflow_error
│   ├── std::underflow_error
│   ├── std::regex_error (C++11)
│   ├── std::system_error (C++11)
│   │   └── std::ios_base::failure (C++11)
│   └── std::filesystem::filesystem_error (C++17)
├── std::bad_alloc
├── std::bad_cast
├── std::bad_typeid
├── std::bad_exception
├── std::bad_function_call (C++11)
├── std::bad_weak_ptr (C++11)
└── std::bad_variant_access (C++17)
```

## La Classe Base `std::exception`

Tutte le eccezioni standard derivano dalla classe base `std::exception`, definita nell'header `<exception>`. Questa classe fornisce un metodo virtuale `what()` che restituisce una descrizione testuale dell'errore.

```cpp
#include <iostream>
#include <exception>

int main() {
    try {
        throw std::exception();
    } catch (const std::exception& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    return 0;
}
```

## Eccezioni di Errori Logici

Le eccezioni derivate da `std::logic_error` rappresentano errori che in teoria potrebbero essere rilevati prima dell'esecuzione del programma. Sono errori nella logica del programma.

### `std::invalid_argument`

Lanciata quando viene passato un argomento non valido a una funzione.

```cpp
#include <iostream>
#include <stdexcept>
#include <string>

void verifica_codice_fiscale(const std::string& codice) {
    if (codice.length() != 16) {
        throw std::invalid_argument("Il codice fiscale deve essere di 16 caratteri");
    }
    // Altre verifiche...
    std::cout << "Codice fiscale valido!" << std::endl;
}

int main() {
    try {
        verifica_codice_fiscale("ABC123"); // Troppo corto
    } catch (const std::invalid_argument& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    return 0;
}
```

### `std::out_of_range`

Lanciata quando si tenta di accedere a un elemento fuori dai limiti di un contenitore.

```cpp
#include <iostream>
#include <vector>
#include <stdexcept>

int main() {
    std::vector<int> numeri = {10, 20, 30, 40, 50};
    
    try {
        // Tentativo di accesso a un indice non valido
        std::cout << numeri.at(10) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Errore di accesso: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### `std::length_error`

Lanciata quando un'operazione tenta di creare un oggetto più grande della dimensione massima consentita.

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

int main() {
    try {
        std::string s;
        s.resize(s.max_size() + 1); // Impossibile
    } catch (const std::length_error& e) {
        std::cout << "Errore di lunghezza: " << e.what() << std::endl;
    }
    return 0;
}
```

## Eccezioni di Errori di Runtime

Le eccezioni derivate da `std::runtime_error` rappresentano errori che possono essere rilevati solo durante l'esecuzione del programma.

### `std::runtime_error`

Una classe base per eccezioni che possono essere lanciate durante l'esecuzione normale del programma.

```cpp
#include <iostream>
#include <stdexcept>
#include <fstream>

void leggi_file(const std::string& nome_file) {
    std::ifstream file(nome_file);
    if (!file) {
        throw std::runtime_error("Impossibile aprire il file: " + nome_file);
    }
    // Operazioni sul file...
    std::cout << "File aperto con successo!" << std::endl;
}

int main() {
    try {
        leggi_file("file_inesistente.txt");
    } catch (const std::runtime_error& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    return 0;
}
```

### `std::overflow_error` e `std::underflow_error`

Lanciate quando un'operazione aritmetica produce un risultato troppo grande o troppo piccolo per essere rappresentato.

```cpp
#include <iostream>
#include <stdexcept>
#include <cmath>

double calcola_esponenziale(double base, int esponente) {
    double risultato = std::pow(base, esponente);
    if (risultato == HUGE_VAL) {
        throw std::overflow_error("Overflow nel calcolo dell'esponenziale");
    }
    return risultato;
}

int main() {
    try {
        double risultato = calcola_esponenziale(1000, 1000);
        std::cout << "Risultato: " << risultato << std::endl;
    } catch (const std::overflow_error& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    return 0;
}
```

## Altre Eccezioni Standard Importanti

### `std::bad_alloc`

Lanciata quando un'operazione di allocazione dinamica della memoria (come `new`) fallisce.

```cpp
#include <iostream>
#include <new>

int main() {
    try {
        // Tentativo di allocare una quantità enorme di memoria
        int* array = new int[10000000000];
        delete[] array; // Non verrà mai eseguito se l'allocazione fallisce
    } catch (const std::bad_alloc& e) {
        std::cout << "Errore di allocazione memoria: " << e.what() << std::endl;
    }
    return 0;
}
```

### `std::bad_cast`

Lanciata quando un'operazione di `dynamic_cast` su un riferimento fallisce.

```cpp
#include <iostream>
#include <typeinfo>

class Base {
 public:
    virtual ~Base() {}
};

class Derivata : public Base {};
class AltraClasse : public Base {};

void processa(Base& obj) {
    try {
        // Tentativo di cast a Derivata
        Derivata& d = dynamic_cast<Derivata&>(obj);
        std::cout << "Cast riuscito!" << std::endl;
    } catch (const std::bad_cast& e) {
        std::cout << "Errore di cast: " << e.what() << std::endl;
    }
}

int main() {
    AltraClasse ac;
    processa(ac); // Questo causerà un bad_cast
    
    return 0;
}
```

## Catturare Eccezioni Standard

Quando si catturano eccezioni standard, è importante seguire l'ordine corretto: dalle classi più derivate alle classi base. Questo perché un handler per una classe base catturerà anche tutte le eccezioni derivate da quella classe.

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    
    try {
        v.at(10) = 5; // Questo lancerà std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Errore di accesso fuori dai limiti: " << e.what() << std::endl;
    } catch (const std::logic_error& e) {
        std::cout << "Errore logico: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Eccezione generica: " << e.what() << std::endl;
    } catch (...) {
        std::cout << "Eccezione sconosciuta" << std::endl;
    }
    
    return 0;
}
```

## Quando Usare le Eccezioni Standard

Le eccezioni standard dovrebbero essere utilizzate quando:

1. Si verifica un errore che corrisponde esattamente a uno dei tipi di eccezioni standard
2. Si desidera integrarsi con il resto della libreria standard C++
3. Si vuole fornire un'interfaccia coerente per la gestione degli errori

In altri casi, potrebbe essere più appropriato definire eccezioni personalizzate, come vedremo nella prossima lezione.

## Domande di Autovalutazione

1. Qual è la classe base di tutte le eccezioni standard in C++?
2. Qual è la differenza principale tra `std::logic_error` e `std::runtime_error`?
3. Quale eccezione viene lanciata quando si tenta di accedere a un elemento fuori dai limiti di un vettore usando il metodo `at()`?
4. Perché è importante l'ordine dei blocchi `catch` quando si catturano eccezioni standard?
5. Quale metodo fornisce la classe `std::exception` per ottenere informazioni sull'errore?

## Esercizi Proposti

1. Scrivi un programma che gestisca diverse eccezioni standard in un'unica funzione, catturandole in modo appropriato.
2. Crea una funzione che verifichi se una stringa rappresenta un numero valido, lanciando `std::invalid_argument` se non lo è.
3. Implementa una classe `Matrice` con un operatore di accesso che lanci `std::out_of_range` quando si tenta di accedere a un elemento fuori dai limiti.
4. Scrivi un programma che tenti di allocare una quantità sempre maggiore di memoria finché non si verifica un'eccezione `std::bad_alloc`.
5. Crea una gerarchia di classi e dimostra l'uso di `dynamic_cast` con gestione dell'eccezione `std::bad_cast`.

## Conclusione

Le eccezioni standard forniscono un modo coerente e strutturato per gestire gli errori nei programmi C++. Conoscere questa gerarchia e sapere quando utilizzare ciascun tipo di eccezione è fondamentale per scrivere codice robusto e manutenibile.

Nella prossima lezione, esploreremo come creare e utilizzare eccezioni personalizzate per gestire situazioni specifiche della tua applicazione.