# Introduzione alle Eccezioni in C++

In questa lezione, esploreremo il concetto di eccezioni in C++ e come questo meccanismo fornisce un modo potente e flessibile per gestire gli errori nei programmi.

## Cos'è un'Eccezione?

Un'eccezione è un evento anomalo che si verifica durante l'esecuzione di un programma e che interrompe il normale flusso di istruzioni. Le eccezioni sono utilizzate per segnalare errori o situazioni impreviste che richiedono un trattamento speciale.

In C++, le eccezioni forniscono un meccanismo strutturato per:

1. **Rilevare** errori o condizioni anomale
2. **Segnalare** tali condizioni al codice chiamante
3. **Gestire** queste situazioni in modo appropriato

## Gestione degli Errori Tradizionale vs Eccezioni

Prima di esaminare le eccezioni, consideriamo i metodi tradizionali di gestione degli errori:

### Approccio con Codici di Errore

```cpp
#include <iostream>

int dividi(int a, int b, int& risultato) {
    if (b == 0) {
        return -1;  // Codice di errore per divisione per zero
    }
    risultato = a / b;
    return 0;  // Successo
}

int main() {
    int risultato;
    int stato = dividi(10, 0, risultato);
    
    if (stato == -1) {
        std::cout << "Errore: divisione per zero!" << std::endl;
    } else {
        std::cout << "Risultato: " << risultato << std::endl;
    }
    
    return 0;
}
```

### Problemi con i Codici di Errore

1. **Mescolamento** del codice di gestione degli errori con la logica principale
2. **Facile da ignorare**: i valori di ritorno possono essere trascurati
3. **Propagazione difficile**: ogni funzione deve verificare e propagare gli errori
4. **Ambiguità**: i valori di ritorno potrebbero essere sia risultati validi che codici di errore

## Il Meccanismo delle Eccezioni

Le eccezioni in C++ risolvono molti di questi problemi separando il codice di rilevamento degli errori dal codice di gestione degli errori.

```cpp
#include <iostream>
#include <stdexcept>

int dividi(int a, int b) {
    if (b == 0) {
        throw std::runtime_error("Divisione per zero");
    }
    return a / b;
}

int main() {
    try {
        int risultato = dividi(10, 0);
        std::cout << "Risultato: " << risultato << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Vantaggi delle Eccezioni

1. **Separazione** tra codice normale e gestione degli errori
2. **Impossibile ignorare**: le eccezioni non gestite terminano il programma
3. **Propagazione automatica**: le eccezioni risalgono automaticamente lo stack delle chiamate
4. **Tipo-sicure**: le eccezioni sono oggetti con tipo
5. **Informazioni dettagliate**: possono trasportare informazioni sull'errore

## Quando Usare le Eccezioni

Le eccezioni sono particolarmente utili per gestire:

1. **Errori di runtime** che non possono essere prevenuti con controlli a compile-time
2. **Condizioni eccezionali** che si verificano raramente
3. **Errori di costruttori** dove non è possibile restituire un codice di errore
4. **Errori in funzioni profondamente annidate** che devono essere gestiti a livelli superiori

## Quando Evitare le Eccezioni

Le eccezioni potrebbero non essere appropriate per:

1. **Errori prevedibili** che fanno parte del normale flusso del programma
2. **Codice critico per le prestazioni** dove il costo delle eccezioni potrebbe essere troppo alto
3. **Sistemi embedded o real-time** con vincoli di tempo o memoria
4. **Interfacce C** o codice che deve interagire con linguaggi che non supportano le eccezioni

## Costo delle Eccezioni

Le eccezioni in C++ seguono il principio "zero-overhead" quando non vengono lanciate:

- **Nessun costo** se non si verificano eccezioni
- **Costo significativo** quando un'eccezione viene effettivamente lanciata

Questo rende le eccezioni ideali per gestire situazioni veramente eccezionali, non per il controllo del flusso normale.

## Esempio Completo

```cpp
#include <iostream>
#include <stdexcept>
#include <string>
#include <fstream>

class FileManager {
public:
    FileManager(const std::string& filename) : filename_(filename) {
        file_.open(filename);
        if (!file_.is_open()) {
            throw std::runtime_error("Impossibile aprire il file: " + filename);
        }
    }
    
    ~FileManager() {
        if (file_.is_open()) {
            file_.close();
        }
    }
    
    std::string leggiLinea() {
        std::string linea;
        if (!std::getline(file_, linea)) {
            if (file_.eof()) {
                throw std::runtime_error("Fine del file raggiunta");
            } else {
                throw std::runtime_error("Errore durante la lettura del file");
            }
        }
        return linea;
    }
    
private:
    std::string filename_;
    std::ifstream file_;
};

int main() {
    try {
        FileManager manager("file_inesistente.txt");
        std::string linea = manager.leggiLinea();
        std::cout << "Prima linea: " << linea << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Errore: " << e.what() << std::endl;
    }
    
    std::cout << "Il programma continua nonostante l'errore" << std::endl;
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i principali vantaggi delle eccezioni rispetto ai codici di errore tradizionali?
2. In quali situazioni è consigliabile utilizzare le eccezioni in C++?
3. Quali sono i potenziali svantaggi o costi associati all'uso delle eccezioni?
4. Come funziona il meccanismo di propagazione delle eccezioni in C++?
5. Perché le eccezioni sono particolarmente utili per gestire gli errori nei costruttori?

## Esercizi Proposti

1. Modifica l'esempio della divisione per gestire anche altri tipi di errori, come overflow o underflow.
2. Implementa una classe `Calculator` che utilizzi le eccezioni per gestire vari errori matematici.
3. Scrivi un programma che legga un file di configurazione e utilizzi le eccezioni per gestire errori di formato o file mancanti.
4. Confronta le prestazioni di un algoritmo che utilizza codici di errore con uno che utilizza eccezioni in vari scenari.
5. Implementa una gerarchia di eccezioni personalizzate per un'applicazione specifica (ad esempio, un database o un parser).

## Conclusione

Le eccezioni in C++ forniscono un potente meccanismo per gestire gli errori, separando il codice di rilevamento degli errori dal codice di gestione degli errori. Quando utilizzate correttamente, le eccezioni possono rendere il codice più pulito, più robusto e più facile da mantenere. Tuttavia, è importante comprendere quando è appropriato utilizzare le eccezioni e quando potrebbero essere preferibili altri approcci alla gestione degli errori.

Nella prossima lezione, esploreremo in dettaglio i blocchi try-catch e il meccanismo throw per lanciare e catturare le eccezioni in C++.