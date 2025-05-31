# Best Practices nella Gestione delle Eccezioni in C++

In questa lezione, esploreremo le migliori pratiche per utilizzare efficacemente le eccezioni in C++, evitando errori comuni e creando codice più robusto e manutenibile.

## Principi Fondamentali

### 1. Usa le Eccezioni per Errori Eccezionali

Le eccezioni dovrebbero essere utilizzate per gestire situazioni veramente eccezionali, non per il flusso di controllo normale:

- **Da usare per**: Errori di inizializzazione, violazioni di precondizioni, errori di I/O, errori di allocazione memoria
- **Da evitare per**: Controllo del flusso normale, condizioni attese, ottimizzazioni delle prestazioni

```cpp
// Approccio corretto
File* apriFile(const std::string& percorso) {
    File* file = new File(percorso);
    if (!file->isOpen()) {
        delete file;
        throw FileNotFoundException("Impossibile aprire il file: " + percorso);
    }
    return file;
}

// Approccio scorretto (uso delle eccezioni per controllo del flusso)
void processaElementi(const std::vector<int>& elementi) {
    for (int elemento : elementi) {
        try {
            if (elemento < 0) {
                throw std::runtime_error("Elemento negativo");
            }
            // Processa elemento positivo
        } catch (const std::runtime_error&) {
            // Processa elemento negativo
        }
    }
}
```

### 2. Segui il Principio RAII

Utilizza sempre il pattern RAII (Resource Acquisition Is Initialization) per garantire che le risorse vengano rilasciate correttamente anche in caso di eccezioni:

```cpp
// Senza RAII (pericoloso)
void funzioneRischiosa() {
    int* array = new int[1000];
    // Se si verifica un'eccezione qui, la memoria non viene liberata
    processaDati(array);
    delete[] array;
}

// Con RAII (sicuro)
void funzioneSicura() {
    std::unique_ptr<int[]> array(new int[1000]);
    // Anche se si verifica un'eccezione, la memoria viene liberata
    processaDati(array.get());
    // delete[] viene chiamato automaticamente quando array esce dallo scope
}
```

### 3. Cattura per Riferimento

Cattura sempre le eccezioni per riferimento costante per evitare il problema dello slicing e migliorare le prestazioni:

```cpp
try {
    // Codice che potrebbe lanciare eccezioni
} catch (const std::exception& e) {  // Cattura per riferimento costante
    std::cerr << "Errore: " << e.what() << std::endl;
} catch (...) {  // Cattura tutte le altre eccezioni
    std::cerr << "Errore sconosciuto" << std::endl;
}
```

### 4. Specifica Chiaramente le Eccezioni

Documenta sempre quali eccezioni possono essere lanciate da una funzione:

```cpp
/**
 * Calcola la radice quadrata di un numero.
 * @param x Il numero di cui calcolare la radice quadrata
 * @return La radice quadrata di x
 * @throws std::invalid_argument se x è negativo
 */
double radiceQuadrata(double x) {
    if (x < 0) {
        throw std::invalid_argument("Impossibile calcolare la radice quadrata di un numero negativo");
    }
    return std::sqrt(x);
}
```

### 5. Usa Eccezioni Standard quando Possibile

Utilizza le eccezioni standard della libreria C++ quando appropriato, invece di crearne di nuove:

```cpp
// Uso di eccezioni standard
void validaInput(const std::string& input) {
    if (input.empty()) {
        throw std::invalid_argument("Input vuoto");
    }
    if (input.length() > 100) {
        throw std::length_error("Input troppo lungo");
    }
    // ...
}
```

### 6. Crea Gerarchie di Eccezioni Significative

Quando crei eccezioni personalizzate, organizzale in una gerarchia che rifletta la struttura degli errori:

```cpp
// Gerarchia di eccezioni per un'applicazione di database
class DatabaseException : public std::runtime_error {
public:
    DatabaseException(const std::string& msg) : std::runtime_error(msg) {}
};

class ConnectionException : public DatabaseException {
public:
    ConnectionException(const std::string& msg) : DatabaseException(msg) {}
};

class QueryException : public DatabaseException {
public:
    QueryException(const std::string& msg) : DatabaseException(msg) {}
};

class TransactionException : public DatabaseException {
public:
    TransactionException(const std::string& msg) : DatabaseException(msg) {}
};
```

### 7. Fornisci Informazioni Contestuali

Include informazioni contestuali nelle eccezioni per facilitare il debug:

```cpp
class FileException : public std::runtime_error {
private:
    std::string filename;
    int lineNumber;

public:
    FileException(const std::string& msg, const std::string& file, int line)
        : std::runtime_error(msg), filename(file), lineNumber(line) {}
    
    const std::string& getFilename() const { return filename; }
    int getLineNumber() const { return lineNumber; }
    
    std::string fullMessage() const {
        return what() + std::string(" in file '") + filename + 
               "' at line " + std::to_string(lineNumber);
    }
};

// Uso
void processaFile(const std::string& percorso) {
    try {
        // Elaborazione del file
        if (errore) {
            throw FileException("Errore di parsing", percorso, 42);
        }
    } catch (const FileException& e) {
        std::cerr << e.fullMessage() << std::endl;
    }
}
```

## Errori Comuni da Evitare

### 1. Distruttori che Lanciano Eccezioni

I distruttori non dovrebbero mai lanciare eccezioni, poiché potrebbero essere chiamati durante l'unwinding dello stack:

```cpp
// Distruttore pericoloso
class ClassePericolosa {
public:
    ~ClassePericolosa() {
        // NON FARE QUESTO!
        throw std::runtime_error("Eccezione nel distruttore");
    }
};

// Distruttore sicuro
class ClasseSicura {
public:
    ~ClasseSicura() noexcept {
        try {
            // Operazioni che potrebbero lanciare eccezioni
        } catch (const std::exception& e) {
            // Gestisci l'eccezione o registra l'errore
            std::cerr << "Errore nel distruttore: " << e.what() << std::endl;
        }
    }
};
```

### 2. Ignorare le Eccezioni

Non ignorare mai le eccezioni senza una buona ragione:

```cpp
// Approccio scorretto
try {
    operazioneRischiosa();
} catch (...) {
    // Ignora silenziosamente l'eccezione - PERICOLOSO!
}

// Approccio migliore
try {
    operazioneRischiosa();
} catch (const std::exception& e) {
    // Registra l'errore
    std::cerr << "Errore ignorato: " << e.what() << std::endl;
    // Eventualmente, prendi misure alternative
}
```

### 3. Catch Troppo Generici

Evita di catturare eccezioni troppo generiche quando puoi gestire specificamente diversi tipi di errori:

```cpp
// Approccio troppo generico
try {
    // Operazioni varie
} catch (...) {
    // Gestione generica - non sai quale errore si è verificato
}

// Approccio migliore
try {
    // Operazioni varie
} catch (const std::invalid_argument& e) {
    // Gestione specifica per errori di argomento
} catch (const std::runtime_error& e) {
    // Gestione specifica per errori di runtime
} catch (const std::exception& e) {
    // Gestione per altre eccezioni standard
} catch (...) {
    // Gestione per eccezioni sconosciute
}
```

### 4. Rilancio Improprio

Quando rilanci un'eccezione, fallo correttamente per preservare le informazioni originali:

```cpp
// Rilancio corretto
try {
    // Operazioni rischiose
} catch (const std::exception& e) {
    // Registra l'errore
    std::cerr << "Errore catturato: " << e.what() << std::endl;
    // Rilancia l'eccezione originale
    throw;
}

// Rilancio scorretto (perde informazioni)
try {
    // Operazioni rischiose
} catch (const std::exception& e) {
    // Crea una nuova eccezione - perde il tipo originale
    throw std::runtime_error(e.what());
}
```

## Strategie Avanzate

### 1. Exception Safety Guarantees

C++ definisce tre livelli di garanzie di sicurezza delle eccezioni:

1. **Garanzia di base**: Se un'eccezione viene lanciata, non ci sono memory leak e gli oggetti rimangono in uno stato valido (ma non necessariamente prevedibile)
2. **Garanzia forte**: Se un'eccezione viene lanciata, lo stato del programma rimane invariato (transazione atomica)
3. **Garanzia nothrow**: La funzione non lancia mai eccezioni

```cpp
// Esempio di implementazione con garanzia forte
class Vettore {
private:
    int* dati;
    size_t dimensione;

public:
    // Ridimensiona il vettore con garanzia forte
    void ridimensiona(size_t nuovaDimensione) {
        // Crea una copia temporanea
        int* nuoviDati = new int[nuovaDimensione];
        
        try {
            // Copia i dati (potrebbe lanciare eccezioni)
            for (size_t i = 0; i < std::min(dimensione, nuovaDimensione); ++i) {
                nuoviDati[i] = dati[i];
            }
            
            // Se arriviamo qui, lo scambio è sicuro
            delete[] dati;
            dati = nuoviDati;
            dimensione = nuovaDimensione;
        } catch (...) {
            // Pulizia in caso di eccezione
            delete[] nuoviDati;
            throw; // Rilancia l'eccezione
        }
    }
};
```

### 2. Function Try Blocks

I function try block sono utili per catturare eccezioni nei costruttori e nei distruttori:

```cpp
class Risorsa {
private:
    int* dati;

public:
    // Costruttore con function try block
    Risorsa(int dimensione) try : dati(new int[dimensione]) {
        // Inizializzazione che potrebbe lanciare eccezioni
        for (int i = 0; i < dimensione; ++i) {
            dati[i] = i;
        }
    } catch (const std::exception& e) {
        delete[] dati; // Pulizia
        std::cerr << "Errore durante l'inizializzazione: " << e.what() << std::endl;
        throw; // Rilancia l'eccezione
    }
    
    ~Risorsa() {
        delete[] dati;
    }
};
```

### 3. Eccezioni nei Costruttori e Distruttori

Gestisci con attenzione le eccezioni nei costruttori e nei distruttori:

- **Costruttori**: Possono lanciare eccezioni, ma assicurati di rilasciare tutte le risorse
- **Distruttori**: Non dovrebbero mai lanciare eccezioni (usa `noexcept`)

```cpp
class GestoreRisorse {
private:
    Risorsa* risorsa1;
    Risorsa* risorsa2;

public:
    GestoreRisorse() : risorsa1(nullptr), risorsa2(nullptr) {
        try {
            risorsa1 = new Risorsa(100);
            risorsa2 = new Risorsa(200);
        } catch (...) {
            delete risorsa1; // Potrebbe essere nullptr, ma è sicuro
            delete risorsa2; // Potrebbe essere nullptr, ma è sicuro
            throw; // Rilancia l'eccezione
        }
    }
    
    ~GestoreRisorse() noexcept {
        try {
            delete risorsa1;
            delete risorsa2;
        } catch (...) {
            // Registra l'errore ma non lanciare eccezioni
            std::cerr << "Errore durante la distruzione delle risorse" << std::endl;
        }
    }
};
```

### 4. Gestione delle Eccezioni nei Thread

Le eccezioni non attraversano i confini dei thread, quindi è necessario gestirle in modo specifico:

```cpp
#include <iostream>
#include <thread>
#include <exception>
#include <stdexcept>
#include <future>

void funzioneThread() {
    try {
        // Operazioni che potrebbero lanciare eccezioni
        throw std::runtime_error("Errore nel thread");
    } catch (const std::exception& e) {
        std::cerr << "Eccezione nel thread: " << e.what() << std::endl;
    }
}

// Alternativa con std::async e std::future
void esempioAsync() {
    auto future = std::async(std::launch::async, []() {
        // Operazioni che potrebbero lanciare eccezioni
        throw std::runtime_error("Errore in async");
        return 42;
    });
    
    try {
        int risultato = future.get(); // Propaga l'eccezione al chiamante
        std::cout << "Risultato: " << risultato << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Eccezione da async: " << e.what() << std::endl;
    }
}

int main() {
    // Esempio con thread
    std::thread t(funzioneThread);
    t.join();
    
    // Esempio con async
    esempioAsync();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i tre livelli di garanzie di sicurezza delle eccezioni in C++?
2. Perché è importante catturare le eccezioni per riferimento costante?
3. Quali sono i problemi potenziali quando un distruttore lancia un'eccezione?
4. Come si dovrebbero gestire le eccezioni nei thread?
5. Quali sono i vantaggi di utilizzare il pattern RAII nella gestione delle eccezioni?

## Esercizi Proposti

1. **Analisi di Codice per la Sicurezza delle Eccezioni**
   - Analizza un frammento di codice esistente
   - Identifica potenziali problemi nella gestione delle eccezioni
   - Proponi miglioramenti per garantire la sicurezza delle eccezioni

2. **Implementazione di una Classe con Garanzia Forte**
   - Crea una classe che gestisce risorse multiple
   - Implementa metodi che forniscono una garanzia forte di sicurezza delle eccezioni
   - Scrivi test per verificare il comportamento in caso di eccezioni

3. **Gestione delle Eccezioni in un'Applicazione Multi-thread**
   - Implementa un sistema di worker thread che eseguono operazioni rischiose
   - Gestisci correttamente le eccezioni in ogni thread
   - Propaga le informazioni sugli errori al thread principale

4. **Creazione di una Gerarchia di Eccezioni**
   - Progetta una gerarchia di eccezioni per un'applicazione specifica
   - Implementa le classi di eccezione con informazioni contestuali utili
   - Scrivi codice di esempio che utilizza questa gerarchia

## Conclusione

La gestione efficace delle eccezioni è una competenza fondamentale per scrivere codice C++ robusto e manutenibile. Seguendo le best practices discusse in questa lezione, potrai creare applicazioni che gestiscono gli errori in modo elegante, mantengono la coerenza dello stato e forniscono informazioni utili per il debug. Ricorda che l'obiettivo principale della gestione delle eccezioni è separare la logica di gestione degli errori dal flusso principale del programma, rendendo il codice più chiaro, più sicuro e più facile da mantenere.