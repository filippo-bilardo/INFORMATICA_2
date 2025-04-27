# RAII (Resource Acquisition Is Initialization) in C++

## Introduzione al RAII

RAII (Resource Acquisition Is Initialization) è un pattern di programmazione fondamentale in C++ che lega la gestione delle risorse al ciclo di vita degli oggetti. Il principio è semplice ma potente: una risorsa (come memoria, file, mutex, connessioni di rete) viene acquisita durante l'inizializzazione di un oggetto (tipicamente nel costruttore) e rilasciata automaticamente quando l'oggetto viene distrutto (nel distruttore).

Questo pattern garantisce che le risorse vengano sempre rilasciate correttamente, anche in presenza di eccezioni o percorsi di codice complessi, eliminando molti problemi comuni come memory leak, resource leak e race condition.

## Perché RAII è Importante

In C++, a differenza di linguaggi con garbage collection, la gestione della memoria e delle risorse è responsabilità del programmatore. Senza un approccio sistematico, è facile commettere errori come:

1. **Memory leak**: dimenticare di deallocare memoria
2. **Resource leak**: non chiudere file, connessioni o altre risorse
3. **Uso di risorse dopo il rilascio**: accedere a memoria già deallocata
4. **Rilascio doppio**: deallocare la stessa memoria più volte

RAII risolve questi problemi legando la gestione delle risorse al ciclo di vita degli oggetti, sfruttando il fatto che i distruttori vengono chiamati automaticamente quando gli oggetti escono dallo scope.

## RAII per la Gestione della Memoria

Uno degli esempi più comuni di RAII in C++ è la gestione della memoria dinamica attraverso smart pointer come `std::unique_ptr` e `std::shared_ptr`.

```cpp
#include <memory>
#include <iostream>

class Risorsa {
public:
    Risorsa() {
        std::cout << "Risorsa acquisita" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa utilizzata" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa rilasciata" << std::endl;
    }
};

void funzioneConRAII() {
    // La risorsa viene acquisita qui
    std::unique_ptr<Risorsa> ptr = std::make_unique<Risorsa>();
    
    // Utilizzo della risorsa
    ptr->utilizza();
    
    // La risorsa viene rilasciata automaticamente quando ptr esce dallo scope
    // Non è necessario chiamare delete
}

void funzioneSenzaRAII() {
    // Allocazione manuale
    Risorsa* ptr = new Risorsa();
    
    // Utilizzo della risorsa
    ptr->utilizza();
    
    // Se dimentichiamo questa riga o se si verifica un'eccezione prima, abbiamo un memory leak
    delete ptr;
}
```

### Smart Pointer in C++

C++ fornisce diversi tipi di smart pointer nella libreria standard:

1. **std::unique_ptr**: Rappresenta proprietà esclusiva. Non può essere copiato, solo spostato.
2. **std::shared_ptr**: Implementa il reference counting. Più shared_ptr possono puntare alla stessa risorsa.
3. **std::weak_ptr**: Versione debole di shared_ptr che non incrementa il conteggio dei riferimenti.

```cpp
#include <memory>

void esempiSmartPointer() {
    // unique_ptr - proprietà esclusiva
    std::unique_ptr<int> unico = std::make_unique<int>(42);
    // std::unique_ptr<int> copia = unico; // Errore: non può essere copiato
    std::unique_ptr<int> spostato = std::move(unico); // OK: può essere spostato
    // Ora unico è nullptr
    
    // shared_ptr - proprietà condivisa
    std::shared_ptr<int> condiviso1 = std::make_shared<int>(100);
    std::shared_ptr<int> condiviso2 = condiviso1; // OK: incrementa il conteggio dei riferimenti
    // La risorsa verrà deallocata quando l'ultimo shared_ptr esce dallo scope
    
    // weak_ptr - riferimento debole
    std::weak_ptr<int> debole = condiviso1;
    // debole non incrementa il conteggio dei riferimenti
    // Per usare l'oggetto, devi prima convertirlo in shared_ptr
    if (auto temp = debole.lock()) {
        std::cout << *temp << std::endl;
    } else {
        std::cout << "L'oggetto non esiste più" << std::endl;
    }
}
```

## RAII per la Gestione dei File

La classe `std::fstream` e le sue derivate sono esempi di RAII per la gestione dei file.

```cpp
#include <fstream>
#include <string>

void leggiFile(const std::string& filename) {
    // Il file viene aperto nel costruttore
    std::ifstream file(filename);
    
    if (file.is_open()) {
        std::string line;
        while (std::getline(file, line)) {
            std::cout << line << std::endl;
        }
    }
    
    // Il file viene chiuso automaticamente nel distruttore di file
    // anche se si verifica un'eccezione durante la lettura
}
```

## RAII per la Sincronizzazione

Le classi di sincronizzazione della libreria standard C++ seguono il pattern RAII per garantire che i lock vengano sempre rilasciati.

```cpp
#include <mutex>
#include <thread>

std::mutex mtx;

void funzioneThread() {
    // Il lock viene acquisito nel costruttore
    std::lock_guard<std::mutex> lock(mtx);
    
    // Sezione critica
    // ...
    
    // Il lock viene rilasciato automaticamente nel distruttore di lock
    // anche se si verifica un'eccezione nella sezione critica
}
```

C++17 ha introdotto anche `std::scoped_lock` che può bloccare più mutex contemporaneamente in modo sicuro rispetto ai deadlock:

```cpp
#include <mutex>

std::mutex mtx1, mtx2;

void funzioneMultiLock() {
    // Blocca entrambi i mutex in modo sicuro rispetto ai deadlock
    std::scoped_lock lock(mtx1, mtx2);
    
    // Sezione critica con accesso a risorse protette da entrambi i mutex
    // ...
    
    // Entrambi i mutex vengono rilasciati automaticamente
}
```

## Implementare Classi RAII Personalizzate

Puoi creare le tue classi RAII per gestire qualsiasi tipo di risorsa. Ecco un esempio di una classe RAII per gestire un handle di file C:

```cpp
#include <cstdio>
#include <stdexcept>
#include <string>

class FileHandle {
private:
    FILE* handle;
    
public:
    // Costruttore: acquisisce la risorsa
    FileHandle(const std::string& filename, const std::string& mode) {
        handle = std::fopen(filename.c_str(), mode.c_str());
        if (!handle) {
            throw std::runtime_error("Impossibile aprire il file");
        }
    }
    
    // Distruttore: rilascia la risorsa
    ~FileHandle() {
        if (handle) {
            std::fclose(handle);
        }
    }
    
    // Disabilita la copia
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
    
    // Permetti lo spostamento
    FileHandle(FileHandle&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }
    
    FileHandle& operator=(FileHandle&& other) noexcept {
        if (this != &other) {
            if (handle) {
                std::fclose(handle);
            }
            handle = other.handle;
            other.handle = nullptr;
        }
        return *this;
    }
    
    // Funzioni per utilizzare la risorsa
    void scrivi(const std::string& data) {
        if (std::fputs(data.c_str(), handle) == EOF) {
            throw std::runtime_error("Errore durante la scrittura");
        }
    }
    
    std::string leggi(size_t size) {
        std::string buffer(size, '\0');
        if (std::fread(&buffer[0], 1, size, handle) != size) {
            if (std::feof(handle)) {
                // Fine del file, restituisci ciò che abbiamo letto
                buffer.resize(std::strlen(buffer.c_str()));
                return buffer;
            }
            throw std::runtime_error("Errore durante la lettura");
        }
        return buffer;
    }
    
    // Getter per l'handle (se necessario)
    FILE* get() const {
        return handle;
    }
};
```

## Linee Guida per l'Implementazione di Classi RAII

1. **Acquisisci le risorse nel costruttore**: Assicurati che tutte le risorse necessarie siano acquisite durante l'inizializzazione.
2. **Rilascia le risorse nel distruttore**: Il distruttore deve rilasciare tutte le risorse, anche in caso di eccezioni.
3. **Gestisci correttamente la copia e lo spostamento**: Spesso è meglio disabilitare la copia e implementare lo spostamento.
4. **Gestisci le eccezioni nel costruttore**: Se l'acquisizione fallisce, lancia un'eccezione per evitare di creare oggetti in stato invalido.
5. **Non lanciare eccezioni nel distruttore**: I distruttori non dovrebbero lanciare eccezioni per evitare problemi con lo stack unwinding.

## RAII e la Regola dei Tre/Cinque

Quando implementi una classe RAII, dovresti considerare la "Regola dei Tre" (o la "Regola dei Cinque" in C++11 e successivi):

**Regola dei Tre**: Se una classe richiede uno dei seguenti, probabilmente richiede tutti e tre:
1. Distruttore personalizzato
2. Costruttore di copia personalizzato
3. Operatore di assegnazione per copia personalizzato

**Regola dei Cinque**: In C++11 e successivi, aggiungi:
4. Costruttore di spostamento
5. Operatore di assegnazione per spostamento

```cpp
class RisorsaRAII {
private:
    int* data;
    
public:
    // Costruttore: acquisisce la risorsa
    RisorsaRAII(int size) : data(new int[size]) {}
    
    // Distruttore: rilascia la risorsa
    ~RisorsaRAII() {
        delete[] data;
    }
    
    // Costruttore di copia
    RisorsaRAII(const RisorsaRAII& other) : data(new int[sizeof(other.data)]) {
        std::memcpy(data, other.data, sizeof(other.data));
    }
    
    // Operatore di assegnazione per copia
    RisorsaRAII& operator=(const RisorsaRAII& other) {
        if (this != &other) {
            delete[] data;
            data = new int[sizeof(other.data)];
            std::memcpy(data, other.data, sizeof(other.data));
        }
        return *this;
    }
    
    // Costruttore di spostamento
    RisorsaRAII(RisorsaRAII&& other) noexcept : data(other.data) {
        other.data = nullptr;
    }
    
    // Operatore di assegnazione per spostamento
    RisorsaRAII& operator=(RisorsaRAII&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
};
```

## Vantaggi del RAII

1. **Sicurezza delle eccezioni**: Le risorse vengono rilasciate anche in caso di eccezioni.
2. **Codice più pulito**: Meno codice di gestione delle risorse esplicito.
3. **Meno bug**: Riduce drasticamente memory leak e resource leak.
4. **Migliore manutenibilità**: Il codice è più facile da leggere e mantenere.
5. **Localizzazione della gestione delle risorse**: La gestione delle risorse è incapsulata nelle classi appropriate.

## Domande di Autovalutazione

1. Cosa significa l'acronimo RAII e quale problema risolve in C++?
2. Quali sono le differenze tra `std::unique_ptr` e `std::shared_ptr`?
3. Perché è importante gestire correttamente la copia e lo spostamento nelle classi RAII?
4. Come si può implementare una classe RAII per gestire una risorsa personalizzata?
5. Quali sono i vantaggi principali dell'utilizzo del pattern RAII?

## Esercizi Proposti

1. Implementa una classe RAII per gestire un buffer di memoria dinamica con funzionalità di ridimensionamento.
2. Crea una classe wrapper RAII per una risorsa di sistema operativo (ad esempio, un socket di rete o un handle di file).
3. Implementa una classe `ScopedLock` che segue il pattern RAII per gestire un mutex personalizzato.
4. Scrivi una classe `Transaction` che utilizza RAII per garantire che le operazioni di database vengano sempre confermate o annullate correttamente.
5. Modifica una classe esistente che gestisce risorse manualmente per utilizzare il pattern RAII e confronta le due implementazioni in termini di sicurezza e leggibilità del codice.