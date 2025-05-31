# Template di Classe in C++

In questa guida, esploreremo i template di classe in C++, un potente strumento per creare strutture dati generiche che possono lavorare con diversi tipi di dati.

## Sintassi di Base

Un template di classe si definisce utilizzando la parola chiave `template` seguita dai parametri di template tra parentesi angolari:

```cpp
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    T getValore() const { return elemento; }
    void setValore(T val) { elemento = val; }
};
```

Come per i template di funzione, le parole chiave `typename` e `class` sono equivalenti nel contesto dei template:

```cpp
template <class T>  // Equivalente a typename T
class Contenitore {
    // ...
};
```

## Istanziazione di Template di Classe

Per utilizzare un template di classe, è necessario specificare il tipo del parametro di template:

```cpp
// Istanziazione di template di classe
Contenitore<int> ci(42);
Contenitore<std::string> cs("Hello");

// Utilizzo
int i = ci.getValore();  // i = 42
std::string s = cs.getValore();  // s = "Hello"

ci.setValore(100);
```

A differenza dei template di funzione, i template di classe richiedono sempre la specificazione esplicita del tipo.

## Template di Classe con Più Parametri di Tipo

Un template di classe può avere più di un parametro di tipo:

```cpp
template <typename K, typename V>
class Coppia {
private:
    K chiave;
    V valore;
    
public:
    Coppia(const K& k, const V& v) : chiave(k), valore(v) {}
    
    K getChiave() const { return chiave; }
    V getValore() const { return valore; }
    
    void setChiave(const K& k) { chiave = k; }
    void setValore(const V& v) { valore = v; }
};

// Utilizzo
Coppia<int, std::string> persona(1, "Mario");
int id = persona.getChiave();  // id = 1
std::string nome = persona.getValore();  // nome = "Mario"
```

## Membri di Template all'interno di Classi Template

È possibile definire funzioni membro template all'interno di una classe template:

```cpp
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    
    T getValore() const { return elemento; }
    
    // Funzione membro template
    template <typename U>
    U converti() const {
        return static_cast<U>(elemento);
    }
};

// Utilizzo
Contenitore<int> ci(42);
int i = ci.getValore();  // i = 42
double d = ci.converti<double>();  // d = 42.0
```

## Specializzazione di Template di Classe

È possibile fornire un'implementazione specializzata di un template di classe per un tipo specifico:

```cpp
// Template generico
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    
    void stampa() const {
        std::cout << "Valore: " << elemento << std::endl;
    }
};

// Specializzazione completa per il tipo char*
template <>
class Contenitore<char*> {
private:
    char* elemento;
    
public:
    Contenitore(char* val) {
        size_t len = strlen(val) + 1;
        elemento = new char[len];
        strcpy(elemento, val);
    }
    
    ~Contenitore() {
        delete[] elemento;
    }
    
    void stampa() const {
        std::cout << "Stringa: " << elemento << std::endl;
    }
};

// Utilizzo
Contenitore<int> ci(42);
ci.stampa();  // Output: "Valore: 42"

char* s = "Hello";
Contenitore<char*> cs(s);
cs.stampa();  // Output: "Stringa: Hello"
```

## Specializzazione Parziale di Template di Classe

A differenza dei template di funzione, i template di classe supportano la specializzazione parziale, che permette di specializzare solo alcuni parametri di template:

```cpp
// Template generico
template <typename T, typename U>
class Coppia {
public:
    Coppia() {
        std::cout << "Template generico" << std::endl;
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

// Specializzazione parziale per tipi puntatore
template <typename T, typename U>
class Coppia<T*, U*> {
public:
    Coppia() {
        std::cout << "Specializzazione per puntatori" << std::endl;
    }
};

// Utilizzo
Coppia<double, char> c1;  // Usa il template generico
Coppia<double, int> c2;   // Usa la specializzazione per <T, int>
Coppia<int*, char*> c3;   // Usa la specializzazione per puntatori
```

## Template di Classe con Parametri Non-Tipo

I template di classe possono avere anche parametri che non sono tipi, ma valori costanti:

```cpp
template <typename T, int Dimensione>
class Array {
private:
    T elementi[Dimensione];
    
public:
    Array() {
        for (int i = 0; i < Dimensione; ++i) {
            elementi[i] = T();
        }
    }
    
    T& operator[](int indice) {
        return elementi[indice];
    }
    
    const T& operator[](int indice) const {
        return elementi[indice];
    }
    
    int dimensione() const {
        return Dimensione;
    }
};

// Utilizzo
Array<int, 5> numeri;
numeri[0] = 10;
numeri[1] = 20;

for (int i = 0; i < numeri.dimensione(); ++i) {
    std::cout << numeri[i] << " ";
}
```

## Template di Classe con Parametri di Default

I parametri di template possono avere valori di default:

```cpp
template <typename T, typename Allocatore = std::allocator<T>>
class Lista {
    // Implementazione che usa l'allocatore specificato
};

// Utilizzo
Lista<int> lista1;  // Usa std::allocator<int> (default)
Lista<int, MyAllocator<int>> lista2;  // Usa un allocatore personalizzato
```

## Esempio Completo: Implementazione di una Classe Stack Generica

```cpp
#include <iostream>
#include <stdexcept>

template <typename T, int Capacita = 100>
class Stack {
private:
    T elementi[Capacita];
    int top;
    
public:
    // Costruttore
    Stack() : top(-1) {}
    
    // Verifica se lo stack è vuoto
    bool vuoto() const {
        return top == -1;
    }
    
    // Verifica se lo stack è pieno
    bool pieno() const {
        return top == Capacita - 1;
    }
    
    // Inserisce un elemento nello stack
    void push(const T& elemento) {
        if (pieno()) {
            throw std::overflow_error("Stack overflow");
        }
        elementi[++top] = elemento;
    }
    
    // Rimuove e restituisce l'elemento in cima allo stack
    T pop() {
        if (vuoto()) {
            throw std::underflow_error("Stack underflow");
        }
        return elementi[top--];
    }
    
    // Restituisce l'elemento in cima allo stack senza rimuoverlo
    T& peek() {
        if (vuoto()) {
            throw std::underflow_error("Stack underflow");
        }
        return elementi[top];
    }
    
    // Restituisce la dimensione attuale dello stack
    int dimensione() const {
        return top + 1;
    }
    
    // Restituisce la capacità massima dello stack
    int capacita() const {
        return Capacita;
    }
    
    // Svuota lo stack
    void svuota() {
        top = -1;
    }
};

// Specializzazione per il tipo bool
template <int Capacita>
class Stack<bool, Capacita> {
private:
    unsigned char* elementi;
    int numElementi;
    int maxElementi;
    
public:
    // Costruttore
    Stack() : numElementi(0) {
        maxElementi = (Capacita + 7) / 8;  // Arrotonda per eccesso
        elementi = new unsigned char[maxElementi];
        for (int i = 0; i < maxElementi; ++i) {
            elementi[i] = 0;
        }
    }
    
    // Distruttore
    ~Stack() {
        delete[] elementi;
    }
    
    // Verifica se lo stack è vuoto
    bool vuoto() const {
        return numElementi == 0;
    }
    
    // Verifica se lo stack è pieno
    bool pieno() const {
        return numElementi == Capacita;
    }
    
    // Inserisce un elemento nello stack
    void push(bool valore) {
        if (pieno()) {
            throw std::overflow_error("Stack overflow");
        }
        
        int indice = numElementi / 8;
        int bit = numElementi % 8;
        
        if (valore) {
            elementi[indice] |= (1 << bit);  // Imposta il bit
        } else {
            elementi[indice] &= ~(1 << bit);  // Resetta il bit
        }
        
        ++numElementi;
    }
    
    // Rimuove e restituisce l'elemento in cima allo stack
    bool pop() {
        if (vuoto()) {
            throw std::underflow_error("Stack underflow");
        }
        
        --numElementi;
        int indice = numElementi / 8;
        int bit = numElementi % 8;
        
        return (elementi[indice] & (1 << bit)) != 0;
    }
    
    // Restituisce l'elemento in cima allo stack senza rimuoverlo
    bool peek() const {
        if (vuoto()) {
            throw std::underflow_error("Stack underflow");
        }
        
        int indice = (numElementi - 1) / 8;
        int bit = (numElementi - 1) % 8;
        
        return (elementi[indice] & (1 << bit)) != 0;
    }
    
    // Restituisce la dimensione attuale dello stack
    int dimensione() const {
        return numElementi;
    }
    
    // Restituisce la capacità massima dello stack
    int capacita() const {
        return Capacita;
    }
    
    // Svuota lo stack
    void svuota() {
        numElementi = 0;
    }
};

int main() {
    // Test dello stack di interi
    Stack<int, 5> stackInt;
    
    std::cout << "Stack di interi (capacità: " << stackInt.capacita() << "):\n";
    
    try {
        std::cout << "Push: 10, 20, 30, 40, 50" << std::endl;
        stackInt.push(10);
        stackInt.push(20);
        stackInt.push(30);
        stackInt.push(40);
        stackInt.push(50);
        
        std::cout << "Dimensione attuale: " << stackInt.dimensione() << std::endl;
        std::cout << "Elemento in cima: " << stackInt.peek() << std::endl;
        
        std::cout << "Pop: ";
        while (!stackInt.vuoto()) {
            std::cout << stackInt.pop() << " ";
        }
        std::cout << std::endl;
        
        std::cout << "Stack vuoto? " << (stackInt.vuoto() ? "Sì" : "No") << std::endl;
        
        // Questo causerà un'eccezione
        // stackInt.push(60);
        // stackInt.push(70);
    } catch (const std::exception& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
    }
    
    // Test dello stack di bool (specializzazione)
    Stack<bool, 10> stackBool;
    
    std::cout << "\nStack di bool (capacità: " << stackBool.capacita() << "):\n";
    
    try {
        std::cout << "Push: true, false, true, true, false" << std::endl;
        stackBool.push(true);
        stackBool.push(false);
        stackBool.push(true);
        stackBool.push(true);
        stackBool.push(false);
        
        std::cout << "Dimensione attuale: " << stackBool.dimensione() << std::endl;
        std::cout << "Elemento in cima: " << (stackBool.peek() ? "true" : "false") << std::endl;
        
        std::cout << "Pop: ";
        while (!stackBool.vuoto()) {
            std::cout << (stackBool.pop() ? "true" : "false") << " ";
        }
        std::cout << std::endl;
        
        std::cout << "Stack vuoto? " << (stackBool.vuoto() ? "Sì" : "No") << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
    }
    
    // Test dello stack di stringhe
    Stack<std::string> stackString;
    
    std::cout << "\nStack di stringhe (capacità: " << stackString.capacita() << "):\n";
    
    try {
        std::cout << "Push: 'mela', 'banana', 'ciliegia'" << std::endl;
        stackString.push("mela");
        stackString.push("banana");
        stackString.push("ciliegia");
        
        std::cout << "Dimensione attuale: " << stackString.dimensione() << std::endl;
        std::cout << "Elemento in cima: " << stackString.peek() << std::endl;
        
        std::cout << "Pop: ";
        while (!stackString.vuoto()) {
            std::cout << stackString.pop() << " ";
        }
        std::cout << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Best Practices per i Template di Classe

1. **Fornisci un'interfaccia chiara**: Documenta quali operazioni devono supportare i tipi utilizzati
2. **Usa specializzazioni quando necessario**: Per ottimizzare o gestire casi speciali
3. **Considera l'uso di concetti (C++20)**: Per vincolare i tipi in modo più espressivo
4. **Evita dipendenze circolari**: Possono causare problemi di compilazione
5. **Separa dichiarazione e implementazione con cautela**: La separazione in file .h e .cpp può essere problematica con i template

## Problemi Comuni con i Template di Classe

### Separazione Dichiarazione/Implementazione

A differenza delle classi normali, i template di classe non possono essere facilmente separati in file .h e .cpp:

```cpp
// MyTemplate.h
template <typename T>
class MyTemplate {
public:
    void funzione();
};

// MyTemplate.cpp
template <typename T>
void MyTemplate<T>::funzione() {
    // Implementazione
}

// Questo non funzionerà a meno che non si dichiarino esplicitamente
// tutte le istanziazioni possibili del template
template class MyTemplate<int>;
template class MyTemplate<double>;
```

Soluzioni comuni:
1. Definire tutto nel file header
2. Utilizzare un file di implementazione incluso alla fine del header

### Messaggi di Errore Complessi

Gli errori nei template possono generare messaggi di errore molto lunghi e difficili da interpretare. Utilizzare tecniche come i concetti (C++20) o l'enable_if (C++11) può aiutare a generare messaggi di errore più chiari.

## Domande di Autovalutazione

1. Qual è la differenza principale tra un template di funzione e un template di classe?
2. Come si implementa una specializzazione completa di un template di classe?
3. Cosa si intende per specializzazione parziale e perché è utile?
4. Quali sono i problemi comuni nella separazione di dichiarazione e implementazione dei template di classe?
5. Come si possono utilizzare i parametri non-tipo nei template di classe?

## Esercizi Proposti

1. Implementa un template di classe `Vettore` che rappresenti un vettore dinamico di elementi di qualsiasi tipo.
2. Crea un template di classe `Matrice` per rappresentare una matrice bidimensionale con operazioni di base (somma, prodotto, trasposizione).
3. Implementa un template di classe `Dizionario` che mappi chiavi a valori (simile a `std::map`).
4. Crea un template di classe `SmartPointer` che implementi un puntatore intelligente con conteggio dei riferimenti.
5. Implementa un template di classe `Coda` con una specializzazione per il tipo `bool` che ottimizzi l'uso della memoria.

## Prossimo Argomento

Nel prossimo argomento, esploreremo la specializzazione dei template in C++, approfondendo le tecniche per fornire implementazioni specifiche per determinati tipi di dati.