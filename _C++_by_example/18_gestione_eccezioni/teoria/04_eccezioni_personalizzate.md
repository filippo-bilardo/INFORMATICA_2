# Eccezioni Personalizzate in C++

In questa lezione, esploreremo come creare e utilizzare eccezioni personalizzate in C++ per gestire situazioni specifiche della tua applicazione.

## Perché Creare Eccezioni Personalizzate?

Mentre la libreria standard C++ fornisce una gerarchia di eccezioni utile per molte situazioni comuni, ci sono casi in cui è necessario definire eccezioni personalizzate:

1. **Specificità del dominio**: Per rappresentare errori specifici del dominio applicativo
2. **Informazioni aggiuntive**: Per fornire informazioni più dettagliate sull'errore
3. **Gerarchia personalizzata**: Per creare una struttura gerarchica di eccezioni adatta al tuo progetto
4. **Chiarezza del codice**: Per rendere più esplicito il tipo di errore che può verificarsi

## Creazione di Eccezioni Personalizzate

In C++, un'eccezione personalizzata è semplicemente una classe che, per convenzione, deriva da `std::exception` o da una delle sue sottoclassi. La best practice è derivare da `std::exception` per garantire compatibilità con il resto del sistema di gestione delle eccezioni.

### Esempio Base

```cpp
#include <iostream>
#include <exception>
#include <string>

class MiaEccezione : public std::exception {
private:
    std::string messaggio;

public:
    MiaEccezione(const std::string& msg) : messaggio(msg) {}
    
    // Override del metodo what() per fornire un messaggio personalizzato
    const char* what() const noexcept override {
        return messaggio.c_str();
    }
};

void funzione_rischiosa() {
    // Simulazione di un errore
    throw MiaEccezione("Si è verificato un errore personalizzato");
}

int main() {
    try {
        funzione_rischiosa();
    } catch (const MiaEccezione& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Altra eccezione standard: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Creazione di una Gerarchia di Eccezioni

Per applicazioni più complesse, è utile creare una gerarchia di eccezioni personalizzate che rifletta la struttura degli errori possibili.

```cpp
#include <iostream>
#include <exception>
#include <string>

// Eccezione base per la nostra applicazione
class AppException : public std::exception {
protected:
    std::string messaggio;

public:
    AppException(const std::string& msg) : messaggio(msg) {}
    
    const char* what() const noexcept override {
        return messaggio.c_str();
    }
};

// Eccezioni specifiche per il database
class DatabaseException : public AppException {
public:
    DatabaseException(const std::string& msg) : AppException("Errore Database: " + msg) {}
};

class ConnectionException : public DatabaseException {
public:
    ConnectionException(const std::string& msg) : DatabaseException("Errore Connessione: " + msg) {}
};

class QueryException : public DatabaseException {
public:
    QueryException(const std::string& msg) : DatabaseException("Errore Query: " + msg) {}
};

// Eccezioni specifiche per l'interfaccia utente
class UIException : public AppException {
public:
    UIException(const std::string& msg) : AppException("Errore UI: " + msg) {}
};

// Funzioni che simulano operazioni rischiose
void connetti_database() {
    throw ConnectionException("Impossibile connettersi al server");
}

void esegui_query() {
    throw QueryException("Sintassi SQL non valida");
}

void mostra_interfaccia() {
    throw UIException("Componente grafico non trovato");
}

int main() {
    try {
        int scelta = 2; // Simuliamo una scelta dell'utente
        
        switch(scelta) {
            case 1: connetti_database(); break;
            case 2: esegui_query(); break;
            case 3: mostra_interfaccia(); break;
        }
    } catch (const ConnectionException& e) {
        std::cout << "Errore di connessione: " << e.what() << std::endl;
        // Gestione specifica per errori di connessione
    } catch (const QueryException& e) {
        std::cout << "Errore di query: " << e.what() << std::endl;
        // Gestione specifica per errori di query
    } catch (const DatabaseException& e) {
        std::cout << "Errore generico database: " << e.what() << std::endl;
        // Gestione per altri errori di database
    } catch (const UIException& e) {
        std::cout << "Errore interfaccia: " << e.what() << std::endl;
        // Gestione per errori di interfaccia
    } catch (const AppException& e) {
        std::cout << "Errore applicazione: " << e.what() << std::endl;
        // Gestione per altri errori dell'applicazione
    } catch (const std::exception& e) {
        std::cout << "Errore standard: " << e.what() << std::endl;
        // Gestione per eccezioni standard
    } catch (...) {
        std::cout << "Errore sconosciuto" << std::endl;
        // Gestione per eccezioni sconosciute
    }
    
    return 0;
}
```

## Aggiungere Informazioni Contestuali

Un vantaggio delle eccezioni personalizzate è la possibilità di includere informazioni contestuali sull'errore.

```cpp
#include <iostream>
#include <exception>
#include <string>
#include <sstream>

class FileException : public std::exception {
private:
    std::string messaggio;
    std::string nome_file;
    int linea;

public:
    FileException(const std::string& msg, const std::string& file, int line) 
        : messaggio(msg), nome_file(file), linea(line) {
    }
    
    const char* what() const noexcept override {
        static std::string full_message;
        std::ostringstream oss;
        oss << "Errore file: " << messaggio 
            << " (File: " << nome_file 
            << ", Linea: " << linea << ")";
        full_message = oss.str();
        return full_message.c_str();
    }
    
    const std::string& getNomeFile() const {
        return nome_file;
    }
    
    int getLinea() const {
        return linea;
    }
};

void processa_file(const std::string& nome_file) {
    // Simulazione di un errore durante l'elaborazione del file
    throw FileException("Formato non valido", nome_file, 42);
}

int main() {
    try {
        processa_file("dati.csv");
    } catch (const FileException& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
        
        // Possiamo anche accedere ai dettagli specifici
        std::cout << "File problematico: " << e.getNomeFile() << std::endl;
        std::cout << "Alla linea: " << e.getLinea() << std::endl;
        
        // Implementare una strategia di recupero specifica
    }
    
    return 0;
}
```

## Best Practices per le Eccezioni Personalizzate

1. **Deriva da `std::exception`**: Per compatibilità con il resto del sistema di eccezioni C++
2. **Implementa `what()`**: Fornisci un messaggio chiaro e informativo
3. **Usa una gerarchia sensata**: Organizza le eccezioni in una gerarchia che rifletta la struttura degli errori
4. **Includi informazioni contestuali**: Aggiungi dettagli che aiutino a diagnosticare e risolvere il problema
5. **Documenta le eccezioni**: Specifica quali eccezioni possono essere lanciate da una funzione
6. **Usa nomi descrittivi**: I nomi delle classi di eccezione dovrebbero indicare chiaramente il tipo di errore

## Quando Usare Eccezioni Personalizzate vs Standard

- **Usa eccezioni standard** quando l'errore corrisponde esattamente a uno dei tipi standard (es. `std::out_of_range` per accessi fuori dai limiti)
- **Crea eccezioni personalizzate** quando:
  - Hai bisogno di informazioni contestuali specifiche
  - L'errore è specifico del dominio della tua applicazione
  - Vuoi creare una gerarchia di eccezioni per il tuo progetto

## Domande di Autovalutazione

1. Perché è consigliabile derivare le eccezioni personalizzate da `std::exception`?
2. Quale metodo è necessario implementare quando si crea una classe di eccezione personalizzata?
3. Quali vantaggi offre una gerarchia di eccezioni personalizzate?
4. Come puoi aggiungere informazioni contestuali a un'eccezione personalizzata?
5. In quali situazioni è preferibile creare un'eccezione personalizzata invece di utilizzare una standard?

## Esercizi Proposti

1. Crea una gerarchia di eccezioni personalizzate per un'applicazione di gestione bancaria, con eccezioni specifiche per operazioni come prelievo, deposito e trasferimento.
2. Implementa una classe di eccezione `NetworkException` che includa informazioni come l'indirizzo IP, la porta e il codice di errore.
3. Scrivi un programma che utilizzi eccezioni personalizzate per gestire errori in un parser di file XML.
4. Crea un'eccezione personalizzata che memorizzi il timestamp dell'errore e fornisca un metodo per formattarlo in diversi formati (ISO, locale, ecc.).
5. Implementa un sistema di logging che utilizzi le informazioni contenute nelle eccezioni personalizzate per generare messaggi di log dettagliati.

## Conclusione

Le eccezioni personalizzate sono uno strumento potente per gestire errori specifici del dominio applicativo in modo strutturato e informativo. Quando progettate e implementate correttamente, possono migliorare significativamente la robustezza e la manutenibilità del codice.

Nella prossima lezione, esploreremo la gestione delle risorse e il pattern RAII (Resource Acquisition Is Initialization), fondamentale per scrivere codice C++ sicuro in presenza di eccezioni.