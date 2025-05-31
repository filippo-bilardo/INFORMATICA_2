# Overloading degli Operatori in C++

## Introduzione all'Overloading degli Operatori

L'overloading degli operatori è una caratteristica potente del C++ che permette di ridefinire il comportamento degli operatori standard (come +, -, *, /, =, ==, ecc.) per i tipi definiti dall'utente. Questa funzionalità consente di scrivere codice più intuitivo e leggibile, permettendo di utilizzare gli operatori in modo naturale con le classi personalizzate.

## Perché Utilizzare l'Overloading degli Operatori

L'overloading degli operatori offre diversi vantaggi:

1. **Leggibilità del codice**: Rende il codice più intuitivo e simile al linguaggio naturale.
2. **Coerenza**: Permette di utilizzare gli stessi operatori sia per i tipi predefiniti che per quelli personalizzati.
3. **Espressività**: Consente di esprimere operazioni complesse in modo conciso.

Consideriamo un esempio semplice: una classe `Vettore` che rappresenta un vettore bidimensionale. Senza overloading degli operatori, dovremmo scrivere:

```cpp
Vettore a, b, c;
// ...
c = a.somma(b); // Poco intuitivo
```

Con l'overloading dell'operatore `+`, possiamo scrivere:

```cpp
Vettore a, b, c;
// ...
c = a + b; // Molto più naturale
```

## Regole Generali per l'Overloading degli Operatori

1. **Non tutti gli operatori possono essere sovraccaricati**: Operatori come `.`, `::`, `.*`, `?:` non possono essere sovraccaricati.
2. **Non si può cambiare la precedenza o l'associatività degli operatori**.
3. **Non si possono inventare nuovi operatori**.
4. **Non si può cambiare il numero di operandi** che un operatore accetta.
5. **Almeno uno degli operandi deve essere di un tipo definito dall'utente**.

## Metodi di Implementazione dell'Overloading

Ci sono due modi principali per implementare l'overloading degli operatori in C++:

1. **Come metodi membri della classe**
2. **Come funzioni globali**

### Overloading come Metodi Membri

Quando si implementa un operatore come metodo membro, l'oggetto a sinistra dell'operatore è implicitamente l'oggetto corrente (`this`).

```cpp
class Complesso {
private:
    double reale;
    double immaginario;

public:
    Complesso(double r = 0, double i = 0) : reale(r), immaginario(i) {}
    
    // Overloading dell'operatore + come metodo membro
    Complesso operator+(const Complesso& altro) const {
        return Complesso(reale + altro.reale, immaginario + altro.immaginario);
    }
    
    // Getters
    double getReale() const { return reale; }
    double getImmaginario() const { return immaginario; }
};

// Uso
Complesso a(1, 2);
Complesso b(3, 4);
Complesso c = a + b; // Equivale a: a.operator+(b)
```

### Overloading come Funzioni Globali

Quando si implementa un operatore come funzione globale, entrambi gli operandi sono passati come parametri.

```cpp
class Complesso {
private:
    double reale;
    double immaginario;

public:
    Complesso(double r = 0, double i = 0) : reale(r), immaginario(i) {}
    
    // Getters
    double getReale() const { return reale; }
    double getImmaginario() const { return immaginario; }
    
    // Dichiariamo la funzione globale come friend per accedere ai membri privati
    friend Complesso operator+(const Complesso& a, const Complesso& b);
};

// Overloading dell'operatore + come funzione globale
Complesso operator+(const Complesso& a, const Complesso& b) {
    return Complesso(a.getReale() + b.getReale(), a.getImmaginario() + b.getImmaginario());
}

// Uso
Complesso a(1, 2);
Complesso b(3, 4);
Complesso c = a + b; // Equivale a: operator+(a, b)
```

## Operatori Comuni da Sovraccaricare

### Operatori Aritmetici (+, -, *, /, %)

```cpp
class Vettore {
private:
    double x, y;

public:
    Vettore(double x = 0, double y = 0) : x(x), y(y) {}
    
    // Operatore di addizione
    Vettore operator+(const Vettore& altro) const {
        return Vettore(x + altro.x, y + altro.y);
    }
    
    // Operatore di sottrazione
    Vettore operator-(const Vettore& altro) const {
        return Vettore(x - altro.x, y - altro.y);
    }
    
    // Operatore di moltiplicazione per uno scalare
    Vettore operator*(double scalare) const {
        return Vettore(x * scalare, y * scalare);
    }
    
    // Operatore di divisione per uno scalare
    Vettore operator/(double scalare) const {
        if (scalare == 0) throw std::invalid_argument("Divisione per zero");
        return Vettore(x / scalare, y / scalare);
    }
    
    // Getters
    double getX() const { return x; }
    double getY() const { return y; }
};

// Overloading dell'operatore * per permettere scalare * vettore
Vettore operator*(double scalare, const Vettore& v) {
    return v * scalare; // Riutilizziamo l'operatore * già definito
}
```

### Operatori di Confronto (==, !=, <, >, <=, >=)

```cpp
class Vettore {
    // ... (come sopra)
    
    // Operatore di uguaglianza
    bool operator==(const Vettore& altro) const {
        // Confronto con una piccola tolleranza per i numeri in virgola mobile
        const double epsilon = 1e-9;
        return std::abs(x - altro.x) < epsilon && std::abs(y - altro.y) < epsilon;
    }
    
    // Operatore di disuguaglianza
    bool operator!=(const Vettore& altro) const {
        return !(*this == altro);
    }
    
    // Operatore minore (basato sulla lunghezza del vettore)
    bool operator<(const Vettore& altro) const {
        return lunghezza() < altro.lunghezza();
    }
    
    // Operatore maggiore
    bool operator>(const Vettore& altro) const {
        return altro < *this;
    }
    
    // Operatore minore o uguale
    bool operator<=(const Vettore& altro) const {
        return !(altro < *this);
    }
    
    // Operatore maggiore o uguale
    bool operator>=(const Vettore& altro) const {
        return !(*this < altro);
    }
    
private:
    double lunghezza() const {
        return std::sqrt(x*x + y*y);
    }
};
```

### Operatori di Assegnazione (=, +=, -=, *=, /=, %=)

```cpp
class Vettore {
    // ... (come sopra)
    
    // Operatore di assegnazione con addizione
    Vettore& operator+=(const Vettore& altro) {
        x += altro.x;
        y += altro.y;
        return *this;
    }
    
    // Operatore di assegnazione con sottrazione
    Vettore& operator-=(const Vettore& altro) {
        x -= altro.x;
        y -= altro.y;
        return *this;
    }
    
    // Operatore di assegnazione con moltiplicazione per uno scalare
    Vettore& operator*=(double scalare) {
        x *= scalare;
        y *= scalare;
        return *this;
    }
    
    // Operatore di assegnazione con divisione per uno scalare
    Vettore& operator/=(double scalare) {
        if (scalare == 0) throw std::invalid_argument("Divisione per zero");
        x /= scalare;
        y /= scalare;
        return *this;
    }
};
```

### Operatori di Incremento e Decremento (++, --)

```cpp
class Contatore {
private:
    int valore;

public:
    Contatore(int v = 0) : valore(v) {}
    
    // Operatore di pre-incremento (++c)
    Contatore& operator++() {
        ++valore;
        return *this;
    }
    
    // Operatore di post-incremento (c++)
    // Il parametro int è solo un marcatore per distinguere la versione post-incremento
    Contatore operator++(int) {
        Contatore temp = *this;
        ++(*this); // Riutilizziamo l'operatore di pre-incremento
        return temp;
    }
    
    // Operatore di pre-decremento (--c)
    Contatore& operator--() {
        --valore;
        return *this;
    }
    
    // Operatore di post-decremento (c--)
    Contatore operator--(int) {
        Contatore temp = *this;
        --(*this); // Riutilizziamo l'operatore di pre-decremento
        return temp;
    }
    
    int getValore() const { return valore; }
};
```

### Operatori di I/O (<< e >>)

Gli operatori di I/O devono essere implementati come funzioni globali:

```cpp
#include <iostream>

class Complesso {
    // ... (come sopra)
    
    friend std::ostream& operator<<(std::ostream& os, const Complesso& c);
    friend std::istream& operator>>(std::istream& is, Complesso& c);
};

// Operatore di output
std::ostream& operator<<(std::ostream& os, const Complesso& c) {
    os << c.getReale();
    if (c.getImmaginario() >= 0) {
        os << "+" << c.getImmaginario() << "i";
    } else {
        os << c.getImmaginario() << "i";
    }
    return os;
}

// Operatore di input
std::istream& operator>>(std::istream& is, Complesso& c) {
    double reale, immaginario;
    is >> reale >> immaginario;
    c = Complesso(reale, immaginario);
    return is;
}

// Uso
Complesso c(3, 4);
std::cout << c << std::endl; // Output: 3+4i

Complesso d;
std::cin >> d; // Input: 5 6
std::cout << d << std::endl; // Output: 5+6i
```

### Operatore di Chiamata di Funzione ()

L'operatore `()` permette di utilizzare un oggetto come se fosse una funzione (functor):

```cpp
class Sommatore {
private:
    int valore;

public:
    Sommatore(int v = 0) : valore(v) {}
    
    // Operatore di chiamata di funzione
    int operator()(int x, int y) const {
        return x + y + valore;
    }
};

// Uso
Sommatore somma(5);
int risultato = somma(3, 4); // Equivale a: somma.operator()(3, 4)
// risultato = 3 + 4 + 5 = 12
```

### Operatore di Indicizzazione []

```cpp
class Vettore {
private:
    double* elementi;
    size_t dimensione;

public:
    Vettore(size_t dim) : dimensione(dim) {
        elementi = new double[dimensione]();
    }
    
    ~Vettore() {
        delete[] elementi;
    }
    
    // Costruttore di copia e operatore di assegnazione omessi per brevità
    
    // Operatore di indicizzazione (versione non-const)
    double& operator[](size_t indice) {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return elementi[indice];
    }
    
    // Operatore di indicizzazione (versione const)
    const double& operator[](size_t indice) const {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return elementi[indice];
    }
    
    size_t getDimensione() const { return dimensione; }
};

// Uso
Vettore v(3);
v[0] = 1.0;
v[1] = 2.0;
v[2] = 3.0;
std::cout << v[1] << std::endl; // Output: 2.0
```

### Operatori di Dereferenziazione (*, ->)

Questi operatori sono particolarmente utili per implementare smart pointer o iteratori:

```cpp
template <typename T>
class SmartPointer {
private:
    T* ptr;

public:
    SmartPointer(T* p = nullptr) : ptr(p) {}
    
    ~SmartPointer() {
        delete ptr;
    }
    
    // Operatore di dereferenziazione
    T& operator*() const {
        if (!ptr) throw std::runtime_error("Dereferenziazione di puntatore nullo");
        return *ptr;
    }
    
    // Operatore di accesso ai membri
    T* operator->() const {
        if (!ptr) throw std::runtime_error("Accesso a membro di puntatore nullo");
        return ptr;
    }
    
    // Disabilita la copia
    SmartPointer(const SmartPointer&) = delete;
    SmartPointer& operator=(const SmartPointer&) = delete;
    
    // Permetti lo spostamento
    SmartPointer(SmartPointer&& altro) noexcept : ptr(altro.ptr) {
        altro.ptr = nullptr;
    }
    
    SmartPointer& operator=(SmartPointer&& altro) noexcept {
        if (this != &altro) {
            delete ptr;
            ptr = altro.ptr;
            altro.ptr = nullptr;
        }
        return *this;
    }
};

// Uso
class Persona {
public:
    std::string nome;
    void saluta() { std::cout << "Ciao, sono " << nome << std::endl; }
};

SmartPointer<Persona> p(new Persona{"Mario"});
(*p).saluta(); // Usando l'operatore *
p->saluta();   // Usando l'operatore ->
```

## Best Practices per l'Overloading degli Operatori

1. **Mantieni il significato intuitivo degli operatori**: L'operatore `+` dovrebbe fare un'addizione, non una moltiplicazione.
2. **Rispetta le proprietà matematiche quando possibile**: Se implementi `a + b`, dovresti anche implementare `b + a` con lo stesso risultato (commutatività).
3. **Implementa operatori correlati insieme**: Se implementi `==`, dovresti implementare anche `!=`.
4. **Considera l'efficienza**: Restituisci per riferimento quando appropriato, specialmente per gli operatori di assegnazione.
5. **Usa la keyword `const` correttamente**: Gli operatori che non modificano l'oggetto dovrebbero essere dichiarati `const`.
6. **Evita effetti collaterali inaspettati**: Gli operatori dovrebbero fare ciò che ci si aspetta e nient'altro.
7. **Considera l'implementazione come funzione globale** quando l'operatore deve convertire il primo operando.

## Domande di Autovalutazione

1. Quali sono i vantaggi dell'overloading degli operatori in C++?
2. Quali operatori non possono essere sovraccaricati in C++?
3. Qual è la differenza tra implementare un operatore come metodo membro e come funzione globale?
4. Perché è importante implementare sia la versione pre-incremento che post-incremento dell'operatore `++`?
5. Come si implementa correttamente l'operatore di assegnazione `=` per una classe che gestisce risorse dinamiche?

## Esercizi Proposti

1. Implementa una classe `Frazione` che rappresenta una frazione con numeratore e denominatore, e sovraccarica gli operatori aritmetici (+, -, *, /) e di confronto (==, !=, <, >, <=, >=).
2. Crea una classe `Matrice` che rappresenta una matrice 2x2 e sovraccarica gli operatori di addizione, sottrazione e moltiplicazione tra matrici.
3. Implementa una classe `Data` che rappresenta una data (giorno, mese, anno) e sovraccarica gli operatori di confronto e gli operatori `++` e `--` per incrementare e decrementare la data di un giorno.
4. Crea una classe `Polinomio` che rappresenta un polinomio e sovraccarica gli operatori aritmetici e l'operatore di valutazione `()` per calcolare il valore del polinomio in un punto.
5. Implementa una classe `StringaPersonalizzata` che sovraccarica l'operatore `+` per la concatenazione, l'operatore `[]` per l'accesso ai caratteri e gli operatori di confronto per il confronto lessicografico.