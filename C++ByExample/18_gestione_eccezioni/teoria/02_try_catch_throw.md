# Try, Catch e Throw in C++

In questa lezione, esploreremo in dettaglio i blocchi `try`, `catch` e l'istruzione `throw`, che costituiscono il nucleo del meccanismo di gestione delle eccezioni in C++.

## Il Meccanismo di Base

Il meccanismo delle eccezioni in C++ si basa su tre componenti principali:

1. **`throw`**: Lancia un'eccezione quando si verifica un problema
2. **`try`**: Definisce un blocco di codice in cui potrebbero verificarsi eccezioni
3. **`catch`**: Cattura e gestisce le eccezioni lanciate nel blocco `try` corrispondente

## L'Istruzione `throw`

L'istruzione `throw` viene utilizzata per lanciare un'eccezione. Può lanciare qualsiasi tipo di oggetto, anche se generalmente si utilizzano oggetti derivati da `std::exception`.

```cpp
#include <iostream>
#include <stdexcept>

void verifica_eta(int eta) {
    if (eta < 0) {
        throw std::invalid_argument("L'età non può essere negativa");
    }
    if (eta > 150) {
        throw std::out_of_range("L'età sembra troppo alta");
    }
    std::cout << "Età valida: " << eta << std::endl;
}
```

### Cosa Può Essere Lanciato

In C++ è possibile lanciare:

- Oggetti di classi di eccezioni standard (`std::exception` e derivate)
- Oggetti di classi di eccezioni personalizzate
- Tipi primitivi (int, char, bool, ecc.)
- Stringhe (const char*, std::string)
- Qualsiasi altro tipo di oggetto

Tuttavia, è considerata una best practice lanciare solo oggetti derivati da `std::exception`.

## Il Blocco `try`

Il blocco `try` racchiude il codice che potrebbe generare eccezioni che vogliamo catturare:

```cpp
try {
    // Codice che potrebbe generare eccezioni
    verifica_eta(-5);
    // Questo codice non verrà eseguito se verifica_eta lancia un'eccezione
    std::cout << "Operazione completata con successo" << std::endl;
} catch (/* ... */) {
    // Gestione dell'eccezione
}
```

## Il Blocco `catch`

Il blocco `catch` cattura e gestisce le eccezioni lanciate nel blocco `try` corrispondente:

```cpp
try {
    verifica_eta(-5);
} catch (const std::invalid_argument& e) {
    std::cerr << "Errore di argomento invalido: " << e.what() << std::endl;
} catch (const std::out_of_range& e) {
    std::cerr << "Errore di valore fuori range: " << e.what() << std::endl;
}
```

### Catturare Diversi Tipi di Eccezioni

È possibile avere più blocchi `catch` per gestire diversi tipi di eccezioni:

```cpp
#include <iostream>
#include <stdexcept>
#include <string>
#include <fstream>

int main() {
    try {
        std::ifstream file("file_inesistente.txt");
        if (!file.is_open()) {
            throw std::runtime_error("Impossibile aprire il file");
        }
        
        int numero;
        std::cout << "Inserisci un numero positivo: ";
        std::cin >> numero;
        
        if (numero < 0) {
            throw std::invalid_argument("Il numero deve essere positivo");
        }
        
        if (numero > 100) {
            throw std::out_of_range("Il numero deve essere <= 100");
        }
        
        if (std::cin.fail()) {
            throw std::ios_base::failure("Errore di input");
        }
        
    } catch (const std::invalid_argument& e) {
        std::cerr << "Errore di argomento: " << e.what() << std::endl;
    } catch (const std::out_of_range& e) {
        std::cerr << "Errore di range: " << e.what() << std::endl;
    } catch (const std::ios_base::failure& e) {
        std::cerr << "Errore di I/O: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        // Cattura qualsiasi altra eccezione derivata da std::exception
        std::cerr << "Errore generico: " << e.what() << std::endl;
    } catch (...) {
        // Cattura qualsiasi altro tipo di eccezione
        std::cerr << "Errore sconosciuto" << std::endl;
    }
    
    return 0;
}
```

### L'Ordine dei Blocchi `catch`

L'ordine dei blocchi `catch` è importante: si dovrebbe procedere dal tipo più specifico al più generale. Se si mette un tipo base (come `std::exception`) prima dei suoi derivati, i blocchi `catch` per i tipi derivati non verranno mai eseguiti.

```cpp
// SBAGLIATO: il secondo catch non verrà mai eseguito
try {
    // ...
} catch (const std::exception& e) {
    // Cattura tutte le eccezioni derivate da std::exception
} catch (const std::invalid_argument& e) {
    // Questo blocco non verrà mai eseguito!
}

// CORRETTO: dal più specifico al più generale
try {
    // ...
} catch (const std::invalid_argument& e) {
    // Gestisce specificamente std::invalid_argument
} catch (const std::exception& e) {
    // Gestisce tutte le altre eccezioni derivate da std::exception
}
```

## Cattura per Riferimento vs Cattura per Valore

È generalmente consigliato catturare le eccezioni per riferimento costante per evitare copie non necessarie e per prevenire il problema dello "slicing":

```cpp
// Preferibile: cattura per riferimento costante
catch (const std::exception& e) {
    // ...
}

// Da evitare: cattura per valore (può causare slicing)
catch (std::exception e) {
    // ...
}
```

Lo "slicing" si verifica quando un oggetto di una classe derivata viene copiato in un oggetto di una classe base, perdendo le informazioni specifiche della classe derivata.

## Il Catch-All: `catch(...)`

Il blocco `catch(...)` cattura qualsiasi tipo di eccezione. È utile come ultima risorsa, ma dovrebbe essere usato con cautela poiché non fornisce informazioni sul tipo di eccezione catturata:

```cpp
try {
    // ...
} catch (const std::exception& e) {
    // Gestisce tutte le eccezioni standard
} catch (...) {
    // Gestisce qualsiasi altra eccezione
    std::cerr << "Errore sconosciuto" << std::endl;
}
```

## Rilancio delle Eccezioni

È possibile rilanciare un'eccezione dopo averla catturata, utilizzando l'istruzione `throw` senza argomenti all'interno di un blocco `catch`:

```cpp
try {
    // Codice che potrebbe generare eccezioni
} catch (const std::exception& e) {
    std::cerr << "Eccezione catturata: " << e.what() << std::endl;
    // Esegui alcune operazioni di pulizia
    
    // Rilancia l'eccezione per permettere a un livello superiore di gestirla
    throw;
}
```

È anche possibile lanciare una nuova eccezione in risposta a un'eccezione catturata:

```cpp
try {
    // ...
} catch (const std::runtime_error& e) {
    // Trasforma l'eccezione in un altro tipo
    throw std::logic_error("Errore derivato: " + std::string(e.what()));
}
```

## Eccezioni Annidate

È possibile avere blocchi `try-catch` annidati:

```cpp
try {
    std::cout << "Livello esterno" << std::endl;
    
    try {
        std::cout << "Livello interno" << std::endl;
        throw std::runtime_error("Eccezione interna");
    } catch (const std::exception& e) {
        std::cout << "Catturata nel livello interno: " << e.what() << std::endl;
        throw; // Rilancia l'eccezione al livello esterno
    }
    
} catch (const std::exception& e) {
    std::cout << "Catturata nel livello esterno: " << e.what() << std::endl;
}
```

## Funzione `noexcept`

La specifica `noexcept` indica che una funzione non lancerà eccezioni:

```cpp
void funzione_sicura() noexcept {
    // Questa funzione garantisce di non lanciare eccezioni
    // Se un'eccezione viene lanciata qui, std::terminate verrà chiamata
}
```

Se una funzione marcata come `noexcept` lancia un'eccezione, il programma terminerà chiamando `std::terminate()`.

## Esempio Completo

```cpp
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

class Utente {
public:
    Utente(const std::string& nome, int eta) : nome_(nome) {
        if (nome.empty()) {
            throw std::invalid_argument("Il nome non può essere vuoto");
        }
        
        if (eta < 0 || eta > 150) {
            throw std::out_of_range("Età non valida: " + std::to_string(eta));
        }
        
        eta_ = eta;
    }
    
    std::string getNome() const { return nome_; }
    int getEta() const { return eta_; }
    
private:
    std::string nome_;
    int eta_;
};

class GestoreUtenti {
public:
    void aggiungiUtente(const std::string& nome, int eta) {
        try {
            utenti_.push_back(Utente(nome, eta));
            std::cout << "Utente " << nome << " aggiunto con successo" << std::endl;
        } catch (const std::invalid_argument& e) {
            std::cerr << "Errore nell'aggiunta dell'utente: " << e.what() << std::endl;
            // Rilancia con informazioni aggiuntive
            throw std::invalid_argument("Errore durante l'aggiunta di " + nome + ": " + e.what());
        } catch (const std::exception& e) {
            std::cerr << "Errore generico: " << e.what() << std::endl;
            throw; // Rilancia l'eccezione originale
        }
    }
    
    void stampaUtenti() const noexcept {
        try {
            std::cout << "Elenco utenti:" << std::endl;
            for (const auto& utente : utenti_) {
                std::cout << "- " << utente.getNome() << " (" << utente.getEta() << " anni)" << std::endl;
            }
        } catch (...) {
            std::cerr << "Errore durante la stampa degli utenti" << std::endl;
            // Non rilanciamo l'eccezione perché la funzione è noexcept
        }
    }
    
private:
    std::vector<Utente> utenti_;
};

int main() {
    GestoreUtenti gestore;
    
    try {
        gestore.aggiungiUtente("Mario", 30);
        gestore.aggiungiUtente("", 25);  // Questo genererà un'eccezione
        gestore.aggiungiUtente("Luigi", 28);  // Questo non verrà eseguito
    } catch (const std::invalid_argument& e) {
        std::cerr << "Errore di argomento invalido: " << e.what() << std::endl;
    } catch (const std::out_of_range& e) {
        std::cerr << "Errore di valore fuori range: " << e.what() << std::endl;
    } catch (...) {
        std::cerr << "Errore sconosciuto" << std::endl;
    }
    
    // Questo verrà eseguito nonostante le eccezioni precedenti
    gestore.stampaUtenti();
    
    std::cout << "\nFine del programma" << std::endl;
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra catturare un'eccezione per valore e catturarla per riferimento? Perché è generalmente preferibile catturarla per riferimento costante?
2. Perché l'ordine dei blocchi `catch` è importante? Cosa succede se si mette un tipo base prima dei suoi derivati?
3. Quando è appropriato utilizzare il blocco `catch(...)` e quali sono i suoi limiti?
4. Come funziona il rilancio di un'eccezione e in quali situazioni potrebbe essere utile?
5. Cosa succede se una funzione marcata come `noexcept` lancia un'eccezione?

## Esercizi Proposti

1. Scrivi un programma che gestisca un array di interi e utilizzi le eccezioni per gestire errori come indici fuori range o memoria insufficiente.
2. Implementa una classe `Stack` che utilizzi le eccezioni per gestire operazioni su uno stack vuoto o pieno.
3. Crea una gerarchia di eccezioni personalizzate per un'applicazione di gestione bancaria, con eccezioni specifiche per diversi tipi di errori (saldo insufficiente, conto bloccato, ecc.).
4. Scrivi un programma che legga un file di testo e utilizzi eccezioni annidate per gestire diversi livelli di errori (file non trovato, errori di formato, ecc.).
5. Implementa una funzione che converta una stringa in un numero intero, utilizzando le eccezioni per gestire formati non validi o overflow.

## Conclusione

I blocchi `try`, `catch` e l'istruzione `throw` formano il nucleo del meccanismo di gestione delle eccezioni in C++. Quando utilizzati correttamente, permettono di separare il codice di rilevamento degli errori dal codice di gestione degli errori, rendendo il programma più pulito, più robusto e più facile da mantenere.

Nella prossima lezione, esploreremo le eccezioni standard fornite dalla libreria C++ e come utilizzarle efficacemente nei tuoi programmi.