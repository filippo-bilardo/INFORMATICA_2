# Specializzazione dei Template in C++

In questa guida, esploreremo la specializzazione dei template in C++, una tecnica potente che permette di fornire implementazioni specifiche per determinati tipi di dati.

## Cos'è la Specializzazione dei Template?

La specializzazione dei template è un meccanismo che consente di fornire un'implementazione alternativa di un template per tipi specifici. Questo è utile quando:

1. Un particolare tipo richiede un'implementazione più efficiente
2. Un tipo specifico non supporta tutte le operazioni utilizzate nell'implementazione generica
3. Si desidera aggiungere funzionalità specifiche per determinati tipi

## Specializzazione Completa di Template di Funzione

Una specializzazione completa di un template di funzione fornisce un'implementazione specifica per un determinato tipo:

```cpp
// Template generico
template <typename T>
void stampa(T valore) {
    std::cout << "Valore generico: " << valore << std::endl;
}

// Specializzazione completa per int
template <>
void stampa<int>(int valore) {
    std::cout << "Intero: " << valore << std::endl;
}

// Specializzazione completa per double
template <>
void stampa<double>(double valore) {
    std::cout << "Double: " << valore << std::fixed << std::setprecision(2) << std::endl;
}

// Specializzazione completa per char*
template <>
void stampa<char*>(char* valore) {
    std::cout << "Stringa C: \"" << valore << "\"" << std::endl;
}

// Utilizzo
stampa(42);        // Chiama la specializzazione per int
stampa(3.14159);   // Chiama la specializzazione per double
stampa("Hello");   // Chiama la specializzazione per char*
stampa(std::string("World"));  // Chiama il template generico
```

## Specializzazione Completa di Template di Classe

Una specializzazione completa di un template di classe fornisce un'implementazione completamente diversa per un tipo specifico:

```cpp
// Template generico
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    
    T getValore() const { return elemento; }
    void setValore(T val) { elemento = val; }
    
    void stampa() const {
        std::cout << "Contenitore generico: " << elemento << std::endl;
    }
};

// Specializzazione completa per bool
template <>
class Contenitore<bool> {
private:
    bool elemento;
    
public:
    Contenitore(bool val) : elemento(val) {}
    
    bool getValore() const { return elemento; }
    void setValore(bool val) { elemento = val; }
    
    void stampa() const {
        std::cout << "Contenitore booleano: " << (elemento ? "true" : "false") << std::endl;
    }
    
    // Metodi specifici per bool
    void toggle() {
        elemento = !elemento;
    }
};

// Utilizzo
Contenitore<int> ci(42);
ci.stampa();  // Output: "Contenitore generico: 42"

Contenitore<bool> cb(true);
cb.stampa();  // Output: "Contenitore booleano: true"
cb.toggle();  // Metodo disponibile solo per Contenitore<bool>
cb.stampa();  // Output: "Contenitore booleano: false"
```

## Specializzazione Parziale di Template di Classe

A differenza dei template di funzione, i template di classe supportano la specializzazione parziale, che permette di specializzare solo alcuni parametri di template o di fornire un'implementazione per un pattern di tipi:

```cpp
// Template generico
template <typename T, typename U>
class Coppia {
public:
    Coppia() {
        std::cout << "Template generico per <T, U>" << std::endl;
    }
};

// Specializzazione parziale per il secondo tipo come int
template <typename T>
class Coppia<T, int> {
public:
    Coppia() {
        std::cout << "Specializzazione per <T, int>" << std::endl;
    }
};

// Specializzazione parziale per tipi identici
template <typename T>
class Coppia<T, T> {
public:
    Coppia() {
        std::cout << "Specializzazione per tipi identici <T, T>" << std::endl;
    }
};

// Specializzazione parziale per tipi puntatore
template <typename T, typename U>
class Coppia<T*, U*> {
public:
    Coppia() {
        std::cout << "Specializzazione per puntatori <T*, U*>" << std::endl;
    }
};

// Specializzazione parziale per array
template <typename T, typename U, size_t N>
class Coppia<T[N], U> {
public:
    Coppia() {
        std::cout << "Specializzazione per array <T[N], U>" << std::endl;
    }
};

// Utilizzo
Coppia<double, char> c1;     // Usa il template generico
Coppia<double, int> c2;      // Usa la specializzazione per <T, int>
Coppia<int, int> c3;         // Usa la specializzazione per tipi identici
Coppia<int*, char*> c4;      // Usa la specializzazione per puntatori
int arr[5];
Coppia<int[5], double> c5;   // Usa la specializzazione per array
```

## Ordine di Risoluzione delle Specializzazioni

Quando si utilizzano template con specializzazioni, il compilatore segue un ordine preciso per determinare quale versione utilizzare:

1. Funzioni non-template (se disponibili)
2. Specializzazioni complete di template
3. Specializzazioni parziali di template (solo per classi)
4. Template generico

```cpp
// Funzione non-template
void stampa(int valore) {
    std::cout << "Funzione non-template per int" << std::endl;
}

// Template generico
template <typename T>
void stampa(T valore) {
    std::cout << "Template generico" << std::endl;
}

// Specializzazione completa
template <>
void stampa<double>(double valore) {
    std::cout << "Specializzazione completa per double" << std::endl;
}

// Utilizzo
stampa(42);      // Chiama la funzione non-template
stampa(3.14);    // Chiama la specializzazione completa
stampa("Hello"); // Chiama il template generico
```

## Specializzazione di Membri di Template di Classe

È possibile specializzare singoli membri di un template di classe senza specializzare l'intera classe:

```cpp
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    
    T getValore() const { return elemento; }
    void setValore(T val) { elemento = val; }
    
    // Dichiarazione del metodo template
    void stampa() const;
};

// Implementazione generica
template <typename T>
void Contenitore<T>::stampa() const {
    std::cout << "Valore: " << elemento << std::endl;
}

// Specializzazione per bool
template <>
void Contenitore<bool>::stampa() const {
    std::cout << "Valore booleano: " << (elemento ? "true" : "false") << std::endl;
}

// Specializzazione per char*
template <>
void Contenitore<char*>::stampa() const {
    std::cout << "Stringa C: " << (elemento ? elemento : "(null)") << std::endl;
}
```

## Specializzazione di Template con Parametri Non-Tipo

È possibile specializzare template con parametri non-tipo:

```cpp
// Template generico
template <typename T, int N>
class Array {
public:
    Array() {
        std::cout << "Array generico di dimensione " << N << std::endl;
    }
};

// Specializzazione completa
template <>
class Array<int, 5> {
public:
    Array() {
        std::cout << "Array specializzato di 5 interi" << std::endl;
    }
};

// Specializzazione parziale per N=1 (array di un elemento)
template <typename T>
class Array<T, 1> {
public:
    Array() {
        std::cout << "Array di un singolo elemento" << std::endl;
    }
};

// Utilizzo
Array<double, 10> a1;  // Usa il template generico
Array<int, 5> a2;      // Usa la specializzazione completa
Array<char, 1> a3;     // Usa la specializzazione parziale
```

## Tecniche Avanzate di Specializzazione

### SFINAE (Substitution Failure Is Not An Error)

SFINAE è un principio del C++ che permette di selezionare diverse implementazioni di template in base alle proprietà dei tipi:

```cpp
#include <type_traits>

// Versione per tipi aritmetici
template <typename T>
typename std::enable_if<std::is_arithmetic<T>::value, T>::type
somma(T a, T b) {
    std::cout << "Versione per tipi aritmetici" << std::endl;
    return a + b;
}

// Versione per tipi non aritmetici
template <typename T>
typename std::enable_if<!std::is_arithmetic<T>::value, T>::type
somma(T a, T b) {
    std::cout << "Versione per tipi non aritmetici" << std::endl;
    return a + b;
}

// Utilizzo
int i = somma(1, 2);           // Usa la versione per tipi aritmetici
double d = somma(1.5, 2.5);     // Usa la versione per tipi aritmetici
std::string s = somma(std::string("Hello"), std::string(" World"));  // Usa la versione per tipi non aritmetici
```

### Tag Dispatching

Il tag dispatching è una tecnica che utilizza tipi di tag per selezionare diverse implementazioni:

```cpp
// Tag per le categorie di iteratori
struct input_iterator_tag {};
struct forward_iterator_tag : public input_iterator_tag {};
struct bidirectional_iterator_tag : public forward_iterator_tag {};
struct random_access_iterator_tag : public bidirectional_iterator_tag {};

// Implementazione per iteratori ad accesso casuale
template <typename Iterator>
void advance_impl(Iterator& it, int n, random_access_iterator_tag) {
    std::cout << "Versione per random access iterator" << std::endl;
    it += n;  // Operazione O(1)
}

// Implementazione per iteratori bidirezionali
template <typename Iterator>
void advance_impl(Iterator& it, int n, bidirectional_iterator_tag) {
    std::cout << "Versione per bidirectional iterator" << std::endl;
    if (n >= 0) {
        while (n--) ++it;  // Operazione O(n)
    } else {
        while (n++) --it;  // Operazione O(n)
    }
}

// Implementazione per iteratori forward
template <typename Iterator>
void advance_impl(Iterator& it, int n, forward_iterator_tag) {
    std::cout << "Versione per forward iterator" << std::endl;
    while (n--) ++it;  // Operazione O(n), solo avanzamento positivo
}

// Funzione principale che seleziona l'implementazione appropriata
template <typename Iterator>
void advance(Iterator& it, int n) {
    // Ottiene il tag dell'iteratore e chiama l'implementazione appropriata
    advance_impl(it, n, typename Iterator::iterator_category());
}
```

## Esempio Completo: Implementazione di un Contenitore Ottimizzato

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
#include <cstring>

// Template generico per un contenitore ottimizzato
template <typename T>
class OttimoContenitore {
private:
    T* dati;
    size_t dimensione;
    size_t capacita;
    
public:
    // Costruttore
    OttimoContenitore() : dati(nullptr), dimensione(0), capacita(0) {}
    
    // Costruttore con dimensione iniziale
    explicit OttimoContenitore(size_t dim) : dimensione(dim), capacita(dim) {
        dati = new T[capacita];
        for (size_t i = 0; i < dimensione; ++i) {
            dati[i] = T();
        }
    }
    
    // Distruttore
    ~OttimoContenitore() {
        delete[] dati;
    }
    
    // Aggiunge un elemento
    void aggiungi(const T& elemento) {
        if (dimensione == capacita) {
            // Raddoppia la capacità
            capacita = (capacita == 0) ? 1 : capacita * 2;
            T* nuoviDati = new T[capacita];
            
            // Copia i dati esistenti
            for (size_t i = 0; i < dimensione; ++i) {
                nuoviDati[i] = dati[i];
            }
            
            delete[] dati;
            dati = nuoviDati;
        }
        
        dati[dimensione++] = elemento;
    }
    
    // Accesso agli elementi
    T& operator[](size_t indice) {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return dati[indice];
    }
    
    // Dimensione attuale
    size_t size() const {
        return dimensione;
    }
    
    // Stampa il contenuto
    void stampa() const {
        std::cout << "[ ";
        for (size_t i = 0; i < dimensione; ++i) {
            std::cout << dati[i];
            if (i < dimensione - 1) std::cout << ", ";
        }
        std::cout << " ]" << std::endl;
    }
};

// Specializzazione per bool (ottimizzazione della memoria)
template <>
class OttimoContenitore<bool> {
private:
    unsigned char* dati;
    size_t dimensione;
    size_t capacita;
    
public:
    // Costruttore
    OttimoContenitore() : dati(nullptr), dimensione(0), capacita(0) {}
    
    // Costruttore con dimensione iniziale
    explicit OttimoContenitore(size_t dim) : dimensione(dim) {
        capacita = (dim + 7) / 8;  // Arrotonda per eccesso
        dati = new unsigned char[capacita];
        memset(dati, 0, capacita);
    }
    
    // Distruttore
    ~OttimoContenitore() {
        delete[] dati;
    }
    
    // Aggiunge un elemento
    void aggiungi(bool elemento) {
        size_t byteIndex = dimensione / 8;
        size_t bitIndex = dimensione % 8;
        
        if (byteIndex >= capacita) {
            // Raddoppia la capacità
            capacita = (capacita == 0) ? 1 : capacita * 2;
            unsigned char* nuoviDati = new unsigned char[capacita];
            
            // Copia i dati esistenti
            for (size_t i = 0; i < byteIndex; ++i) {
                nuoviDati[i] = dati[i];
            }
            
            // Inizializza i nuovi byte a 0
            for (size_t i = byteIndex; i < capacita; ++i) {
                nuoviDati[i] = 0;
            }
            
            delete[] dati;
            dati = nuoviDati;
        }
        
        // Imposta o resetta il bit appropriato
        if (elemento) {
            dati[byteIndex] |= (1 << bitIndex);  // Imposta il bit
        } else {
            dati[byteIndex] &= ~(1 << bitIndex);  // Resetta il bit
        }
        
        ++dimensione;
    }
    
    // Classe proxy per l'accesso ai singoli bit
    class RiferimentoBit {
    private:
        unsigned char& byte;
        size_t bit;
        
    public:
        RiferimentoBit(unsigned char& b, size_t i) : byte(b), bit(i) {}
        
        // Operatore di conversione a bool
        operator bool() const {
            return (byte & (1 << bit)) != 0;
        }
        
        // Operatore di assegnamento
        RiferimentoBit& operator=(bool valore) {
            if (valore) {
                byte |= (1 << bit);  // Imposta il bit
            } else {
                byte &= ~(1 << bit);  // Resetta il bit
            }
            return *this;
        }
    };
    
    // Accesso agli elementi
    RiferimentoBit operator[](size_t indice) {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        
        size_t byteIndex = indice / 8;
        size_t bitIndex = indice % 8;
        
        return RiferimentoBit(dati[byteIndex], bitIndex);
    }
    
    // Dimensione attuale
    size_t size() const {
        return dimensione;
    }
    
    // Stampa il contenuto
    void stampa() const {
        std::cout << "[ ";
        for (size_t i = 0; i < dimensione; ++i) {
            // Recupera il valore del bit
            size_t byteIndex = i / 8;
            size_t bitIndex = i % 8;
            bool valore = (dati[byteIndex] & (1 << bitIndex)) != 0;
            
            std::cout << (valore ? "true" : "false");
            if (i < dimensione - 1) std::cout << ", ";
        }
        std::cout << " ]" << std::endl;
    }
};

// Specializzazione per char* (gestione delle stringhe C)
template <>
class OttimoContenitore<char*> {
private:
    char** dati;
    size_t dimensione;
    size_t capacita;
    
public:
    // Costruttore
    OttimoContenitore() : dati(nullptr), dimensione(0), capacita(0) {}
    
    // Costruttore con dimensione iniziale
    explicit OttimoContenitore(size_t dim) : dimensione(dim), capacita(dim) {
        dati = new char*[capacita];
        for (size_t i = 0; i < dimensione; ++i) {
            dati[i] = nullptr;
        }
    }
    
    // Distruttore
    ~OttimoContenitore() {
        for (size_t i = 0; i < dimensione; ++i) {
            delete[] dati[i];
        }
        delete[] dati;
    }
    
    // Aggiunge un elemento
    void aggiungi(const char* elemento) {
        if (dimensione == capacita) {
            // Raddoppia la capacità
            capacita = (capacita == 0) ? 1 : capacita * 2;
            char** nuoviDati = new char*[capacita];
            
            // Copia i puntatori esistenti
            for (size_t i = 0; i < dimensione; ++i) {
                nuoviDati[i] = dati[i];
            }
            
            delete[] dati;
            dati = nuoviDati;
        }
        
        // Copia la stringa
        if (elemento) {
            size_t len = strlen(elemento) + 1;
            dati[dimensione] = new char[len];
            strcpy(dati[dimensione], elemento);
        } else {
            dati[dimensione] = nullptr;
        }
        
        ++dimensione;
    }
    
    // Accesso agli elementi
    char* operator[](size_t indice) {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return dati[indice];
    }
    
    // Dimensione attuale
    size_t size() const {
        return dimensione;
    }
    
    // Stampa il contenuto
    void stampa() const {
        std::cout << "[ ";
        for (size_t i = 0; i < dimensione; ++i) {
            if (dati[i]) {
                std::cout << "\"" << dati[i] << "\"";
            } else {
                std::cout << "null";
            }
            
            if (i < dimensione - 1) std::cout << ", ";
        }
        std::cout << " ]" << std::endl;
    }
};

int main() {
    // Test con interi
    OttimoContenitore<int> interi;
    interi.aggiungi(10);
    interi.aggiungi(20);
    interi.aggiungi(30);
    
    std::cout << "Contenitore di interi:" << std::endl;
    interi.stampa();
    std::cout << "Dimensione: " << interi.size() << std::endl;
    std::cout << "interi[1] = " << interi[1] << std::endl;
    
    // Test con booleani (specializzazione)
    OttimoContenitore<bool> booleani;
    booleani.aggiungi(true);
    booleani.aggiungi(false);
    booleani.aggiungi(true);
    booleani.aggiungi(true);
    booleani.aggiungi(false);
    
    std::cout << "\nContenitore di booleani (specializzazione):" << std::endl;
    booleani.stampa();
    std::cout << "Dimensione: " << booleani.size() << std::endl;
    std::cout << "booleani[2] = " << (booleani[2] ? "true" : "false") << std::endl;
    
    // Modifica di un valore
    booleani[1] = true;
    std::cout << "Dopo la modifica:" << std::endl;
    booleani.stampa();
    
    // Test con stringhe C (specializzazione)
    OttimoContenitore<char*> stringhe;
    stringhe.aggiungi("Hello");
    stringhe.aggiungi("World");
    stringhe.aggiungi(nullptr);
    stringhe.aggiungi("C++");
    
    std::cout << "\nContenitore di stringhe C (specializzazione):" << std::endl;
    stringhe.stampa();
    std::cout << "Dimensione: " << stringhe.size() << std::endl;
    std::cout << "stringhe[1] = " << stringhe[1] << std::endl;
    
    return 0;
}
```

## Best Practices per la Specializzazione dei Template

1. **Usa la specializzazione con parsimonia**: Specializza solo quando è veramente necessario
2. **Mantieni un'interfaccia coerente**: Le specializzazioni dovrebbero offrire la stessa interfaccia del template generico
3. **Documenta le specializzazioni**: Spiega perché una specializzazione è necessaria e come differisce dall'implementazione generica
4. **Considera tecniche alternative**: A volte, l'overloading o il tag dispatching possono essere più appropriati della specializzazione
5. **Testa tutte le specializzazioni**: Assicurati che ogni specializzazione funzioni correttamente

## Domande di Autovalutazione

1. Qual è la differenza tra specializzazione completa e parziale di un template?
2. Perché i template di funzione non supportano la specializzazione parziale?
3. In quale ordine il compilatore seleziona le diverse versioni di un template?
4. Quali sono i casi d'uso tipici per la specializzazione dei template?
5. Quali tecniche alternative alla specializzazione esistono e quando sono preferibili?

## Esercizi Proposti

1. Implementa un template di funzione `converti` che converta un tipo in un altro, con specializzazioni per casi particolari (es. da stringa a numero, da numero a stringa).
2. Crea un template di classe `Allocatore` con specializzazioni per tipi piccoli (allocazione in blocco) e tipi grandi (allocazione individuale).
3. Implementa un template di classe `Serializzatore` che converta oggetti in stringhe, con specializzazioni per tipi primitivi e alcune classi comuni.
4. Crea un template di funzione `ordina` che utilizzi algoritmi di ordinamento diversi in base al tipo e alla dimensione dei dati.
5. Implementa un template di classe `SmartPointer` con specializzazioni per array e per oggetti che richiedono una gestione speciale della distruzione.

## Prossimo Argomento

Nel prossimo argomento, esploreremo i template con parametri non-tipo in C++, che permettono di parametrizzare i template non solo rispetto ai tipi, ma anche rispetto a valori costanti.