# Gestione delle Risorse e RAII in C++

In questa lezione, esploreremo il concetto di RAII (Resource Acquisition Is Initialization) e come questo pattern di programmazione sia fondamentale per la gestione sicura delle risorse in C++, specialmente in presenza di eccezioni.

## Cos'è RAII?

RAII è un idioma di programmazione C++ che associa la gestione delle risorse (come memoria, file, connessioni di rete, mutex, ecc.) al ciclo di vita degli oggetti:

1. **Acquisizione della risorsa**: La risorsa viene acquisita durante l'inizializzazione dell'oggetto (costruttore)
2. **Utilizzo della risorsa**: La risorsa è disponibile durante il ciclo di vita dell'oggetto
3. **Rilascio della risorsa**: La risorsa viene rilasciata automaticamente quando l'oggetto viene distrutto (distruttore)

Questo approccio garantisce che le risorse vengano sempre rilasciate correttamente, anche in caso di eccezioni.

## Perché RAII è Importante nella Gestione delle Eccezioni?

Quando si verifica un'eccezione, il flusso di esecuzione normale viene interrotto e lo stack viene srotolato (unwinding). Durante questo processo:

- Gli oggetti locali vengono distrutti
- I distruttori vengono chiamati automaticamente
- Le risorse gestite tramite RAII vengono rilasciate correttamente

Senza RAII, sarebbe necessario utilizzare blocchi try-catch in ogni punto in cui una risorsa potrebbe essere rilasciata, rendendo il codice complesso e soggetto a errori.

## Esempio di RAII con Gestione della Memoria

```cpp
#include <iostream>
#include <memory>
#include <stdexcept>

class Risorsa {
public:
    Risorsa() {
        std::cout << "Risorsa acquisita" << std::endl;
    }
    
    void operazione() {
        std::cout << "Operazione sulla risorsa" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa rilasciata" << std::endl;
    }
};

void funzione_che_lancia_eccezione() {
    // Creazione di un oggetto Risorsa con RAII
    std::unique_ptr<Risorsa> risorsa = std::make_unique<Risorsa>();
    
    risorsa->operazione();
    
    // Simulazione di un errore
    throw std::runtime_error("Si è verificato un errore");
    
    // Questo codice non verrà mai eseguito
    std::cout << "Questa riga non verrà mai eseguita" << std::endl;
}

int main() {
    try {
        funzione_che_lancia_eccezione();
    } catch (const std::exception& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    std::cout << "Programma terminato normalmente" << std::endl;
    return 0;
}
```

Output:
```
Risorsa acquisita
Operazione sulla risorsa
Risorsa rilasciata
Eccezione catturata: Si è verificato un errore
Programma terminato normalmente
```

Notare come la risorsa venga rilasciata automaticamente quando l'eccezione viene lanciata, grazie al distruttore chiamato durante l'unwinding dello stack.

## RAII con File

```cpp
#include <iostream>
#include <fstream>
#include <stdexcept>

class FileManager {
private:
    std::fstream file;

public:
    FileManager(const std::string& filename, std::ios_base::openmode mode) {
        file.open(filename, mode);
        if (!file.is_open()) {
            throw std::runtime_error("Impossibile aprire il file: " + filename);
        }
        std::cout << "File aperto con successo" << std::endl;
    }
    
    void scrivi(const std::string& testo) {
        if (!file.good()) {
            throw std::runtime_error("Errore durante la scrittura sul file");
        }
        file << testo;
    }
    
    ~FileManager() {
        if (file.is_open()) {
            file.close();
            std::cout << "File chiuso con successo" << std::endl;
        }
    }
};

void elabora_file() {
    // Il file verrà chiuso automaticamente alla fine della funzione o in caso di eccezione
    FileManager file("esempio.txt", std::ios::out);
    
    file.scrivi("Questo è un esempio di RAII con file\n");
    
    // Simulazione di un errore
    throw std::runtime_error("Errore durante l'elaborazione");
    
    // Questo codice non verrà mai eseguito
    file.scrivi("Questo testo non verrà mai scritto");
}

int main() {
    try {
        elabora_file();
    } catch (const std::exception& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## RAII con Lock (Mutex)

```cpp
#include <iostream>
#include <mutex>
#include <thread>
#include <stdexcept>

std::mutex mtx;

void operazione_thread_safe() {
    // Il lock viene rilasciato automaticamente alla fine della funzione o in caso di eccezione
    std::lock_guard<std::mutex> lock(mtx);
    
    std::cout << "Sezione critica - Inizio" << std::endl;
    
    // Simulazione di un'operazione che potrebbe lanciare un'eccezione
    if (rand() % 2 == 0) {
        throw std::runtime_error("Errore nella sezione critica");
    }
    
    std::cout << "Sezione critica - Fine" << std::endl;
    
    // Il mutex viene rilasciato automaticamente quando lock_guard viene distrutto
}

void thread_function() {
    try {
        operazione_thread_safe();
    } catch (const std::exception& e) {
        std::cout << "Thread ha catturato un'eccezione: " << e.what() << std::endl;
    }
}

int main() {
    std::thread t1(thread_function);
    std::thread t2(thread_function);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

## Smart Pointers come Implementazione di RAII

Gli smart pointer in C++ sono un'implementazione del pattern RAII per la gestione della memoria dinamica:

1. **std::unique_ptr**: Proprietà esclusiva della risorsa
2. **std::shared_ptr**: Proprietà condivisa con conteggio dei riferimenti
3. **std::weak_ptr**: Riferimento debole che non influisce sul conteggio

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa creata" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
    void utilizza() { std::cout << "Risorsa utilizzata" << std::endl; }
};

void esempio_unique_ptr() {
    std::cout << "\n--- Esempio unique_ptr ---" << std::endl;
    
    // Creazione e gestione automatica
    std::unique_ptr<Risorsa> ptr = std::make_unique<Risorsa>();
    ptr->utilizza();
    
    // Trasferimento di proprietà
    std::unique_ptr<Risorsa> altro_ptr = std::move(ptr);
    altro_ptr->utilizza();
    
    // ptr ora è nullptr
    if (!ptr) {
        std::cout << "ptr non possiede più la risorsa" << std::endl;
    }
    
    // La risorsa verrà distrutta automaticamente quando altro_ptr esce dallo scope
}

void esempio_shared_ptr() {
    std::cout << "\n--- Esempio shared_ptr ---" << std::endl;
    
    // Creazione di uno shared_ptr
    std::shared_ptr<Risorsa> ptr1 = std::make_shared<Risorsa>();
    
    {
        // Creazione di un secondo shared_ptr che condivide la proprietà
        std::shared_ptr<Risorsa> ptr2 = ptr1;
        
        std::cout << "Conteggio riferimenti: " << ptr1.use_count() << std::endl;
        ptr2->utilizza();
        
        // ptr2 viene distrutto alla fine di questo blocco, ma la risorsa rimane
    }
    
    std::cout << "Conteggio riferimenti dopo il blocco: " << ptr1.use_count() << std::endl;
    ptr1->utilizza();
    
    // La risorsa verrà distrutta quando ptr1 esce dallo scope
}

int main() {
    esempio_unique_ptr();
    esempio_shared_ptr();
    
    std::cout << "\nProgramma terminato" << std::endl;
    return 0;
}
```

## Vantaggi di RAII

1. **Sicurezza delle eccezioni**: Le risorse vengono rilasciate anche in caso di eccezioni
2. **Codice più pulito**: Nessun bisogno di gestire manualmente il rilascio delle risorse
3. **Prevenzione dei memory leak**: La memoria viene liberata automaticamente
4. **Determinismo**: Il rilascio delle risorse avviene in un momento prevedibile

## Linee Guida per l'Uso di RAII

1. **Incapsula le risorse in classi**: Ogni risorsa dovrebbe essere gestita da una classe dedicata
2. **Acquisisci nel costruttore**: Acquisisci le risorse nel costruttore o subito dopo
3. **Rilascia nel distruttore**: Assicurati che il distruttore rilasci tutte le risorse
4. **Previeni eccezioni nei distruttori**: I distruttori non dovrebbero lanciare eccezioni
5. **Usa gli smart pointer**: Utilizza gli smart pointer per la gestione della memoria dinamica

## Domande di Autovalutazione

1. Cosa significa l'acronimo RAII e qual è il suo scopo principale?
2. Perché RAII è particolarmente importante nella gestione delle eccezioni?
3. Come si implementa correttamente il pattern RAII in una classe?
4. Quali sono i vantaggi dell'utilizzo degli smart pointer rispetto ai puntatori raw?
5. Perché è importante che i distruttori non lancino eccezioni?

## Esercizi Proposti

1. **Implementazione di una classe RAII per la gestione di un buffer di memoria**
   - Crea una classe `MemoryBuffer` che alloca memoria nel costruttore e la libera nel distruttore
   - Implementa metodi per leggere e scrivere nel buffer
   - Testa la classe con e senza eccezioni

2. **Classe RAII per la gestione di una connessione di rete**
   - Simula una connessione di rete con apertura e chiusura
   - Assicurati che la connessione venga chiusa correttamente anche in caso di eccezioni

3. **Confronto tra gestione manuale e RAII**
   - Scrivi due versioni di una funzione che gestisce risorse multiple
   - Una versione con gestione manuale (try-catch-finally)
   - Una versione con RAII
   - Confronta la leggibilità e la robustezza delle due implementazioni

4. **Implementazione di un pool di risorse con RAII**
   - Crea una classe che gestisce un pool di risorse riutilizzabili
   - Usa RAII per garantire che le risorse vengano restituite al pool anche in caso di eccezioni

## Conclusione

RAII è uno dei pattern più importanti in C++ per la gestione sicura delle risorse. Combinato con il sistema di eccezioni, permette di scrivere codice robusto e a prova di errori, eliminando molti problemi comuni come memory leak e risorse non rilasciate. Padroneggiare RAII è essenziale per qualsiasi programmatore C++ che voglia scrivere codice di qualità professionale.