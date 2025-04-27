# Custom Deleters per Smart Pointers in C++

In questa guida, esploreremo i custom deleters, un meccanismo che permette di personalizzare il comportamento di deallocazione degli smart pointers in C++.

## Cosa sono i Custom Deleters?

I custom deleters sono funzioni o oggetti funzione che vengono utilizzati dagli smart pointers per deallocare o rilasciare le risorse che gestiscono. Invece di utilizzare l'operatore `delete` standard, gli smart pointers possono essere configurati per utilizzare una funzione personalizzata quando devono rilasciare la risorsa.

Questo è particolarmente utile quando:

1. **Gestisci risorse non allocate con `new`**: Come handle di file, connessioni di rete, o risorse di API C.
2. **Hai bisogno di eseguire operazioni aggiuntive prima della deallocazione**: Come logging, notifiche, o pulizia di risorse correlate.
3. **Utilizzi allocatori personalizzati**: Quando la memoria è stata allocata con un allocatore specifico.

## Custom Deleters con unique_ptr

Con `std::unique_ptr`, il custom deleter è parte del tipo, il che significa che due `unique_ptr` con deleters diversi hanno tipi diversi.

```cpp
#include <iostream>
#include <memory>
#include <fstream>

// Custom deleter come funzione
void chiudiFile(std::FILE* file) {
    if (file) {
        std::cout << "Chiusura del file tramite custom deleter" << std::endl;
        std::fclose(file);
    }
}

int main() {
    // Utilizzo di un custom deleter con unique_ptr
    {
        // Il tipo è std::unique_ptr<std::FILE, decltype(&chiudiFile)>
        std::unique_ptr<std::FILE, decltype(&chiudiFile)> filePtr(std::fopen("esempio.txt", "w"), chiudiFile);
        
        if (filePtr) {
            std::fputs("Esempio di utilizzo di custom deleter con unique_ptr", filePtr.get());
            std::cout << "File aperto e scritto" << std::endl;
        }
        
        // Il file verrà chiuso automaticamente quando filePtr esce dallo scope
    }
    
    // Custom deleter come lambda
    {
        auto customDeleter = [](std::FILE* file) {
            if (file) {
                std::cout << "Chiusura del file tramite lambda deleter" << std::endl;
                std::fclose(file);
            }
        };
        
        std::unique_ptr<std::FILE, decltype(customDeleter)> filePtr(std::fopen("esempio2.txt", "w"), customDeleter);
        
        if (filePtr) {
            std::fputs("Esempio di utilizzo di lambda deleter con unique_ptr", filePtr.get());
            std::cout << "File aperto e scritto" << std::endl;
        }
    }
    
    return 0;
}
```

## Custom Deleters con shared_ptr

Con `std::shared_ptr`, il custom deleter non è parte del tipo, il che rende più flessibile il suo utilizzo:

```cpp
#include <iostream>
#include <memory>

struct Risorsa {
    int id;
    
    Risorsa(int id) : id(id) {
        std::cout << "Risorsa " << id << " costruita" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << id << " distrutta normalmente" << std::endl;
    }
};

// Custom deleter come funzione
void customDelete(Risorsa* p) {
    std::cout << "Custom deleter chiamato per Risorsa " << p->id << std::endl;
    delete p;
}

int main() {
    // Utilizzo di un custom deleter con shared_ptr
    {
        // Il tipo è sempre std::shared_ptr<Risorsa>, indipendentemente dal deleter
        std::shared_ptr<Risorsa> ptr1(new Risorsa(1), customDelete);
        
        // Possiamo creare un altro shared_ptr che condivide la proprietà
        // e utilizza lo stesso deleter
        std::shared_ptr<Risorsa> ptr2 = ptr1;
        
        std::cout << "Conteggio riferimenti: " << ptr1.use_count() << std::endl;  // 2
    }
    
    // Custom deleter come lambda
    {
        auto lambdaDeleter = [](Risorsa* p) {
            std::cout << "Lambda deleter chiamato per Risorsa " << p->id << std::endl;
            delete p;
        };
        
        std::shared_ptr<Risorsa> ptr(new Risorsa(2), lambdaDeleter);
    }
    
    // Utilizzo di make_shared con custom deleter (non direttamente supportato)
    // Dobbiamo utilizzare un approccio diverso
    {
        auto ptr = std::shared_ptr<Risorsa>(new Risorsa(3), [](Risorsa* p) {
            std::cout << "Lambda deleter inline per Risorsa " << p->id << std::endl;
            delete p;
        });
    }
    
    return 0;
}
```

## Utilizzo di Custom Deleters con Risorse C

Uno dei casi d'uso più comuni per i custom deleters è la gestione di risorse C, come handle di file, socket, o altre risorse che richiedono funzioni di cleanup specifiche:

```cpp
#include <iostream>
#include <memory>
#include <cstdlib>  // Per malloc e free
#include <cstring>  // Per strlen e strcpy

// Funzione helper per allocare una stringa C
char* allocaStringa(const char* str) {
    size_t len = std::strlen(str) + 1;
    char* p = static_cast<char*>(std::malloc(len));
    if (p) {
        std::strcpy(p, str);
    }
    return p;
}

int main() {
    // Gestione di memoria allocata con malloc
    {
        std::unique_ptr<char, decltype(&std::free)> strPtr(allocaStringa("Esempio di stringa C"), std::free);
        
        if (strPtr) {
            std::cout << "Stringa allocata: " << strPtr.get() << std::endl;
        }
        
        // La memoria verrà liberata con free invece di delete
    }
    
    // Gestione di un handle di file C
    {
        std::shared_ptr<std::FILE> filePtr(std::fopen("esempio3.txt", "w"), [](std::FILE* f) {
            if (f) {
                std::cout << "Chiusura del file tramite shared_ptr" << std::endl;
                std::fclose(f);
            }
        });
        
        if (filePtr) {
            std::fputs("Esempio di utilizzo di shared_ptr con file C", filePtr.get());
            std::cout << "File aperto e scritto" << std::endl;
        }
    }
    
    return 0;
}
```

## Custom Deleters con Oggetti Funzione

Oltre alle funzioni e alle lambda, puoi utilizzare oggetti funzione (functor) come custom deleters, il che può essere utile quando hai bisogno di mantenere uno stato:

```cpp
#include <iostream>
#include <memory>
#include <string>

class Logger {
public:
    Logger(const std::string& nome) : nome_(nome) {
        std::cout << "Logger '" << nome_ << "' creato" << std::endl;
    }
    
    // Operatore di chiamata che agisce come deleter
    void operator()(int* p) const {
        std::cout << "Logger '" << nome_ << "' sta deallocando la risorsa " << *p << std::endl;
        delete p;
    }
    
private:
    std::string nome_;
};

int main() {
    // Utilizzo di un oggetto funzione come deleter
    {
        Logger logger("MainLogger");
        
        std::unique_ptr<int, Logger> ptr(new int(42), logger);
        
        std::cout << "Valore puntato: " << *ptr << std::endl;
    }
    
    // Utilizzo di un oggetto funzione temporaneo
    {
        std::unique_ptr<int, Logger> ptr(new int(100), Logger("TempLogger"));
        
        std::cout << "Valore puntato: " << *ptr << std::endl;
    }
    
    return 0;
}
```

## Considerazioni sulle Prestazioni

L'utilizzo di custom deleters può avere un impatto sulle prestazioni e sulla dimensione degli smart pointers:

1. **unique_ptr**: Con un custom deleter, la dimensione di `unique_ptr` può aumentare per memorizzare il deleter.
2. **shared_ptr**: Il custom deleter viene memorizzato nel blocco di controllo, quindi non influisce sulla dimensione del `shared_ptr` stesso, ma può influire sulle prestazioni di creazione.

```cpp
#include <iostream>
#include <memory>

int main() {
    // Dimensione di unique_ptr con deleter standard
    std::cout << "Dimensione di unique_ptr<int>: " 
              << sizeof(std::unique_ptr<int>) << " byte" << std::endl;
    
    // Dimensione di unique_ptr con custom deleter (funzione)
    std::cout << "Dimensione di unique_ptr<int, void(*)(int*)>: " 
              << sizeof(std::unique_ptr<int, void(*)(int*)>) << " byte" << std::endl;
    
    // Dimensione di unique_ptr con custom deleter (lambda stateless)
    auto deleter1 = [](int* p) { delete p; };
    std::cout << "Dimensione di unique_ptr con lambda stateless: " 
              << sizeof(std::unique_ptr<int, decltype(deleter1)>) << " byte" << std::endl;
    
    // Dimensione di unique_ptr con custom deleter (lambda con stato)
    int counter = 0;
    auto deleter2 = [&counter](int* p) { counter++; delete p; };
    std::cout << "Dimensione di unique_ptr con lambda con stato: " 
              << sizeof(std::unique_ptr<int, decltype(deleter2)>) << " byte" << std::endl;
    
    // Dimensione di shared_ptr (non cambia con il custom deleter)
    std::cout << "Dimensione di shared_ptr<int>: " 
              << sizeof(std::shared_ptr<int>) << " byte" << std::endl;
    
    return 0;
}
```

## Best Practices per l'Utilizzo di Custom Deleters

1. **Preferisci le lambda stateless quando possibile**: Le lambda senza stato sono ottimizzate e non aumentano significativamente la dimensione degli smart pointers.
2. **Utilizza shared_ptr per deleters complessi**: Se il deleter è complesso o ha uno stato significativo, considera l'utilizzo di `shared_ptr` invece di `unique_ptr`.
3. **Crea funzioni helper**: Per risorse comuni, crea funzioni helper che restituiscono smart pointers già configurati con i deleters appropriati.
4. **Documenta il comportamento del deleter**: Assicurati che il comportamento del deleter sia chiaro, specialmente se esegue operazioni oltre alla semplice deallocazione.

## Funzioni Helper per Risorse Comuni

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <fstream>

// Funzione helper per creare un unique_ptr a un file
std::unique_ptr<std::FILE, decltype(&std::fclose)> apriFile(const std::string& nome, const std::string& modo) {
    return std::unique_ptr<std::FILE, decltype(&std::fclose)>(
        std::fopen(nome.c_str(), modo.c_str()),
        &std::fclose
    );
}

// Funzione helper per creare un shared_ptr a una risorsa dinamica
template<typename T, typename... Args>
std::shared_ptr<T> creaRisorsa(Args&&... args) {
    return std::shared_ptr<T>(
        new T(std::forward<Args>(args)...),
        [](T* p) {
            std::cout << "Deleter personalizzato per la risorsa" << std::endl;
            delete p;
        }
    );
}

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
    // Utilizzo della funzione helper per file
    auto file = apriFile("esempio4.txt", "w");
    if (file) {
        std::fputs("Esempio di utilizzo della funzione helper", file.get());
        std::cout << "File aperto e scritto" << std::endl;
    }
    
    // Utilizzo della funzione helper per risorse
    auto risorsa = creaRisorsa<Risorsa>(42);
    risorsa->utilizza();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Cosa sono i custom deleters e perché sono utili con gli smart pointers?
2. Qual è la differenza tra come `unique_ptr` e `shared_ptr` gestiscono i custom deleters?
3. Come influisce un custom deleter sulla dimensione di un `unique_ptr`?
4. Quali sono i modi diversi per definire un custom deleter (funzione, lambda, functor)?
5. In quali situazioni è particolarmente utile utilizzare un custom deleter?
6. Come si può utilizzare un custom deleter per gestire risorse C come file o memoria allocata con `malloc`?
7. Quali sono le best practices per l'utilizzo di custom deleters?

## Esercizi Proposti

1. **Gestore di Risorse di Sistema**
   
   Implementa una classe che gestisce diverse risorse di sistema (file, memoria condivisa, mutex) utilizzando smart pointers con custom deleters appropriati.

2. **Wrapper per una Libreria C**
   
   Crea un wrapper C++ per una libreria C che utilizza smart pointers con custom deleters per gestire le risorse della libreria.

3. **Pool di Oggetti**
   
   Implementa un pool di oggetti che utilizza custom deleters per restituire gli oggetti al pool invece di deallocarli.

4. **Logger di Allocazione**
   
   Crea un sistema che utilizza custom deleters per tracciare tutte le allocazioni e deallocazioni di memoria in un'applicazione.

5. **Gestore di Connessioni di Database**
   
   Implementa un gestore di connessioni di database che utilizza smart pointers con custom deleters per chiudere correttamente le connessioni.

## Conclusione

I custom deleters sono uno strumento potente che estende la flessibilità degli smart pointers in C++, permettendo di gestire in modo sicuro ed efficiente risorse diverse dalla memoria heap standard. Utilizzandoli correttamente, puoi creare codice più robusto e meno soggetto a memory leak o altri problemi di gestione delle risorse. Nel prossimo capitolo, esploreremo come utilizzare gli smart pointers con gli array.