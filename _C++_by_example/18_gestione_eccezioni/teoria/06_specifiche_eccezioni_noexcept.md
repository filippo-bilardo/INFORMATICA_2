# Specifiche delle Eccezioni e noexcept in C++

In questa lezione, esploreremo le specifiche delle eccezioni in C++ e l'operatore `noexcept`, strumenti importanti per dichiarare e controllare il comportamento delle eccezioni nelle funzioni.

## Evoluzione delle Specifiche delle Eccezioni in C++

Le specifiche delle eccezioni in C++ hanno subito diverse modifiche nel corso delle versioni del linguaggio:

1. **C++98/03**: Introduzione delle specifiche delle eccezioni dinamiche con `throw()`
2. **C++11**: Introduzione dell'operatore `noexcept` e deprecazione delle specifiche dinamiche
3. **C++17**: Rimozione delle specifiche dinamiche delle eccezioni

## Specifiche Dinamiche delle Eccezioni (Deprecate)

Nelle versioni precedenti di C++, era possibile specificare quali eccezioni una funzione poteva lanciare:

```cpp
// Può lanciare solo std::runtime_error o derivate
void funzione1() throw(std::runtime_error);

// Non può lanciare eccezioni
void funzione2() throw();

// Può lanciare qualsiasi eccezione (comportamento predefinito)
void funzione3();
```

Queste specifiche sono state deprecate in C++11 e rimosse in C++17 per diversi motivi:

1. **Overhead a runtime**: Richiedevano controlli a runtime
2. **Fragilità**: Rendevano difficile la manutenzione del codice
3. **Problemi con i template**: Difficili da usare con la programmazione generica

## L'Operatore noexcept

Introdotto in C++11, `noexcept` è un operatore che specifica se una funzione può lanciare eccezioni. A differenza delle specifiche dinamiche, `noexcept` è verificato al momento della compilazione e non introduce overhead a runtime.

### Sintassi di noexcept

```cpp
// Versione semplice: la funzione non lancia eccezioni
void funzione1() noexcept;

// Versione condizionale: la funzione non lancia eccezioni se l'espressione è vera
template <typename T>
void funzione2(T valore) noexcept(noexcept(T{}));
```

### Esempio di noexcept

```cpp
#include <iostream>
#include <vector>
#include <stdexcept>

// Funzione che non lancia eccezioni
void funzione_sicura() noexcept {
    std::cout << "Questa funzione è garantita non lanciare eccezioni" << std::endl;
}

// Funzione che potrebbe lanciare eccezioni
void funzione_rischiosa() {
    std::cout << "Questa funzione potrebbe lanciare eccezioni" << std::endl;
    throw std::runtime_error("Eccezione di esempio");
}

// Funzione con noexcept condizionale
template <typename T>
void crea_oggetto() noexcept(noexcept(T{})) {
    T oggetto{};
    std::cout << "Oggetto creato" << std::endl;
}

int main() {
    try {
        funzione_sicura();
        
        try {
            funzione_rischiosa();
        } catch (const std::exception& e) {
            std::cout << "Eccezione catturata: " << e.what() << std::endl;
        }
        
        // Esempio di noexcept condizionale
        crea_oggetto<int>();  // noexcept(true) - int{} non lancia eccezioni
        
        // std::vector può lanciare eccezioni durante la costruzione
        // quindi questa chiamata è noexcept(false)
        crea_oggetto<std::vector<int>>();
        
    } catch (...) {
        std::cout << "Eccezione non prevista catturata" << std::endl;
    }
    
    return 0;
}
```

## L'Operatore noexcept come Espressione

`noexcept` può essere usato anche come operatore per verificare se un'espressione può lanciare eccezioni:

```cpp
#include <iostream>
#include <type_traits>

template <typename T>
void verifica_noexcept() {
    std::cout << "T{} è noexcept: " << noexcept(T{}) << std::endl;
}

class ClasseSicura {
public:
    ClasseSicura() noexcept {}
    ~ClasseSicura() noexcept {}
};

class ClasseRischiosa {
public:
    ClasseRischiosa() { /* potrebbe lanciare eccezioni */ }
    ~ClasseRischiosa() { /* potrebbe lanciare eccezioni */ }
};

int main() {
    verifica_noexcept<int>();             // true
    verifica_noexcept<ClasseSicura>();    // true
    verifica_noexcept<ClasseRischiosa>(); // false
    
    return 0;
}
```

## Quando Usare noexcept

`noexcept` dovrebbe essere usato in situazioni specifiche:

1. **Distruttori**: In C++11 e successivi, i distruttori sono implicitamente `noexcept(true)`
2. **Funzioni di spostamento (move)**: Per ottimizzazioni, le operazioni di spostamento dovrebbero essere `noexcept` quando possibile
3. **Funzioni a basso livello**: Funzioni che non dovrebbero mai fallire
4. **Funzioni critiche per le prestazioni**: Dove l'overhead delle eccezioni è inaccettabile

### Esempio con Operazioni di Spostamento

```cpp
#include <iostream>
#include <vector>
#include <string>

class Risorsa {
private:
    std::string nome;
    int* dati;
    size_t dimensione;

public:
    // Costruttore
    Risorsa(const std::string& n, size_t dim) : nome(n), dimensione(dim) {
        dati = new int[dimensione];
        std::cout << "Risorsa " << nome << " creata" << std::endl;
    }
    
    // Distruttore (implicitamente noexcept)
    ~Risorsa() {
        delete[] dati;
        std::cout << "Risorsa " << nome << " distrutta" << std::endl;
    }
    
    // Costruttore di copia (può lanciare eccezioni)
    Risorsa(const Risorsa& altro) : nome(altro.nome), dimensione(altro.dimensione) {
        dati = new int[dimensione];
        std::copy(altro.dati, altro.dati + dimensione, dati);
        std::cout << "Risorsa " << nome << " copiata" << std::endl;
    }
    
    // Operatore di assegnazione per copia
    Risorsa& operator=(const Risorsa& altro) {
        if (this != &altro) {
            delete[] dati;
            nome = altro.nome;
            dimensione = altro.dimensione;
            dati = new int[dimensione];
            std::copy(altro.dati, altro.dati + dimensione, dati);
        }
        std::cout << "Risorsa " << nome << " assegnata per copia" << std::endl;
        return *this;
    }
    
    // Costruttore di spostamento (noexcept)
    Risorsa(Risorsa&& altro) noexcept : nome(std::move(altro.nome)), dati(altro.dati), dimensione(altro.dimensione) {
        altro.dati = nullptr;
        altro.dimensione = 0;
        std::cout << "Risorsa " << nome << " spostata (costruttore)" << std::endl;
    }
    
    // Operatore di assegnazione per spostamento (noexcept)
    Risorsa& operator=(Risorsa&& altro) noexcept {
        if (this != &altro) {
            delete[] dati;
            nome = std::move(altro.nome);
            dati = altro.dati;
            dimensione = altro.dimensione;
            altro.dati = nullptr;
            altro.dimensione = 0;
        }
        std::cout << "Risorsa " << nome << " spostata (assegnazione)" << std::endl;
        return *this;
    }
};

int main() {
    std::vector<Risorsa> risorse;
    
    // Aggiunta di risorse al vettore
    std::cout << "\nAggiunta di risorse al vettore:" << std::endl;
    risorse.push_back(Risorsa("A", 10));
    risorse.push_back(Risorsa("B", 20));
    
    // Ridimensionamento del vettore (può causare spostamenti)
    std::cout << "\nRidimensionamento del vettore:" << std::endl;
    risorse.reserve(10);
    
    // Spostamento di una risorsa
    std::cout << "\nSpostamento di una risorsa:" << std::endl;
    Risorsa r1("C", 30);
    Risorsa r2 = std::move(r1);  // Usa il costruttore di spostamento
    
    return 0;
}
```

## Violazione di noexcept

Se una funzione dichiarata `noexcept` lancia un'eccezione, il programma termina chiamando `std::terminate()`:

```cpp
#include <iostream>
#include <stdexcept>

void funzione_pericolosa() noexcept {
    std::cout << "Questa funzione è dichiarata noexcept ma lancia un'eccezione" << std::endl;
    throw std::runtime_error("Eccezione in funzione noexcept");
}

int main() {
    try {
        funzione_pericolosa();  // Questa chiamata terminerà il programma
    } catch (const std::exception& e) {
        // Questo blocco non verrà mai eseguito
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Vantaggi di noexcept

1. **Ottimizzazioni del compilatore**: Il compilatore può ottimizzare meglio il codice
2. **Garanzie più forti**: Fornisce garanzie sul comportamento delle funzioni
3. **Migliore interoperabilità**: Facilita l'uso di C++ con altri linguaggi
4. **Prestazioni migliori**: Specialmente per le operazioni di spostamento nei container

## Linee Guida per l'Uso di noexcept

1. **Usa noexcept per default nei distruttori**: I distruttori non dovrebbero mai lanciare eccezioni
2. **Usa noexcept nelle funzioni di spostamento**: Per migliorare le prestazioni dei container
3. **Usa noexcept nelle funzioni che non lanciano eccezioni**: Per documentare e garantire il comportamento
4. **Evita noexcept se non sei sicuro**: È meglio non usarlo piuttosto che violare la specifica
5. **Usa noexcept condizionale con i template**: Per adattarsi al comportamento dei tipi parametrizzati

## Domande di Autovalutazione

1. Quali sono le differenze principali tra le specifiche delle eccezioni dinamiche (`throw()`) e l'operatore `noexcept`?
2. Perché i distruttori sono implicitamente `noexcept` in C++11 e successivi?
3. Quando è particolarmente importante dichiarare le funzioni di spostamento come `noexcept`?
4. Cosa succede se una funzione dichiarata `noexcept` lancia un'eccezione?
5. Come si può usare `noexcept` in modo condizionale nei template?

## Esercizi Proposti

1. **Implementazione di una classe con operazioni di spostamento noexcept**
   - Crea una classe che gestisce una risorsa (ad esempio, memoria dinamica)
   - Implementa costruttore di copia e operatore di assegnazione per copia
   - Implementa costruttore di spostamento e operatore di assegnazione per spostamento con `noexcept`
   - Testa le prestazioni con e senza `noexcept` in un container come `std::vector`

2. **Uso di noexcept condizionale**
   - Crea una funzione template che usa `noexcept` condizionale
   - Testa la funzione con tipi che possono e non possono lanciare eccezioni
   - Verifica il comportamento con l'operatore `noexcept`

3. **Analisi di una libreria esistente**
   - Analizza una libreria C++ esistente (ad esempio, una parte della libreria standard)
   - Identifica dove e come viene usato `noexcept`
   - Discuti le motivazioni dietro queste scelte

4. **Implementazione di funzioni di utilità noexcept**
   - Crea una serie di funzioni di utilità che non dovrebbero mai fallire
   - Dichiarale `noexcept`
   - Scrivi test per verificare che rispettino la specifica `noexcept`

## Conclusione

L'operatore `noexcept` è uno strumento potente in C++ moderno per dichiarare e controllare il comportamento delle eccezioni nelle funzioni. Usato correttamente, può migliorare le prestazioni, fornire garanzie più forti e rendere il codice più robusto. Tuttavia, è importante usarlo con attenzione, solo quando si è sicuri che una funzione non lancerà eccezioni, per evitare la terminazione inaspettata del programma.