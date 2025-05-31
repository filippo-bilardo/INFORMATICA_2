# Overloading degli Operatori in C++

In questa guida, esploreremo l'overloading degli operatori, una potente funzionalità del C++ che permette di ridefinire il comportamento degli operatori standard quando applicati a oggetti di classi definite dall'utente.

## Cos'è l'Overloading degli Operatori?

L'overloading degli operatori consente di definire come gli operatori standard del C++ (+, -, *, /, =, ==, ecc.) dovrebbero comportarsi quando utilizzati con oggetti di classi personalizzate. Questo rende il codice più intuitivo e leggibile.

## Sintassi di Base

L'overloading degli operatori può essere implementato in due modi:

1. **Come funzione membro della classe**:
   ```cpp
   class Classe {
public:
       // Overloading dell'operatore + come funzione membro
       Classe operator+(const Classe& altro) const {
           // Implementazione
       }
   };
   ```

2. **Come funzione globale**:
   ```cpp
   // Overloading dell'operatore + come funzione globale
   Classe operator+(const Classe& a, const Classe& b) {
       // Implementazione
   }
   ```

## Operatori Comunemente Sovraccaricati

### Operatori Aritmetici (+, -, *, /, %)

```cpp
class Vettore {
private:
    double x, y;
    
public:
    Vettore(double xVal = 0, double yVal = 0) : x(xVal), y(yVal) {}
    
    // Overloading dell'operatore +
    Vettore operator+(const Vettore& v) const {
        return Vettore(x + v.x, y + v.y);
    }
    
    // Overloading dell'operatore -
    Vettore operator-(const Vettore& v) const {
        return Vettore(x - v.x, y - v.y);
    }
    
    // Overloading dell'operatore * (prodotto scalare)
    double operator*(const Vettore& v) const {
        return x * v.x + y * v.y;
    }
    
    // Visualizzazione
    void stampa() const {
        std::cout << "(" << x << ", " << y << ")";
    }
};
```

### Operatori di Confronto (==, !=, <, >, <=, >=)

```cpp
class Persona {
private:
    std::string nome;
    int età;
    
public:
    Persona(std::string n, int e) : nome(n), età(e) {}
    
    // Overloading dell'operatore ==
    bool operator==(const Persona& p) const {
        return nome == p.nome && età == p.età;
    }
    
    // Overloading dell'operatore !=
    bool operator!=(const Persona& p) const {
        return !(*this == p);
    }
    
    // Overloading dell'operatore < (confronto per età)
    bool operator<(const Persona& p) const {
        return età < p.età;
    }
};
```

### Operatori di Assegnazione (=, +=, -=, *=, /=, %=)

```cpp
class Contatore {
private:
    int valore;
    
public:
    Contatore(int v = 0) : valore(v) {}
    
    // Overloading dell'operatore =
    Contatore& operator=(const Contatore& c) {
        if (this != &c) {  // Controllo di auto-assegnazione
            valore = c.valore;
        }
        return *this;
    }
    
    // Overloading dell'operatore +=
    Contatore& operator+=(int v) {
        valore += v;
        return *this;
    }
    
    // Overloading dell'operatore -=
    Contatore& operator-=(int v) {
        valore -= v;
        return *this;
    }
    
    // Getter
    int getValore() const {
        return valore;
    }
};
```

### Operatori di Incremento e Decremento (++, --)

Questi operatori hanno due forme: prefisso (++x) e postfisso (x++).

```cpp
class Contatore {
private:
    int valore;
    
public:
    Contatore(int v = 0) : valore(v) {}
    
    // Operatore di incremento prefisso (++x)
    Contatore& operator++() {
        ++valore;
        return *this;
    }
    
    // Operatore di incremento postfisso (x++)
    // Il parametro int è solo un marcatore per distinguere la versione postfissa
    Contatore operator++(int) {
        Contatore temp = *this;
        ++valore;
        return temp;
    }
    
    // Operatore di decremento prefisso (--x)
    Contatore& operator--() {
        --valore;
        return *this;
    }
    
    // Operatore di decremento postfisso (x--)
    Contatore operator--(int) {
        Contatore temp = *this;
        --valore;
        return temp;
    }
    
    // Getter
    int getValore() const {
        return valore;
    }
};
```

### Operatore di Subscript ([])

```cpp
class Array {
private:
    int* dati;
    size_t dimensione;
    
public:
    Array(size_t dim) : dimensione(dim) {
        dati = new int[dimensione]();
    }
    
    ~Array() {
        delete[] dati;
    }
    
    // Overloading dell'operatore [] (versione non-const)
    int& operator[](size_t indice) {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return dati[indice];
    }
    
    // Overloading dell'operatore [] (versione const)
    const int& operator[](size_t indice) const {
        if (indice >= dimensione) {
            throw std::out_of_range("Indice fuori range");
        }
        return dati[indice];
    }
};
```

### Operatori di Stream (<<, >>)

Questi operatori sono solitamente sovraccaricati come funzioni globali.

```cpp
class Punto {
private:
    int x, y;
    
public:
    Punto(int xVal = 0, int yVal = 0) : x(xVal), y(yVal) {}
    
    friend std::ostream& operator<<(std::ostream& os, const Punto& p);
    friend std::istream& operator>>(std::istream& is, Punto& p);
};

// Overloading dell'operatore di output <<
std::ostream& operator<<(std::ostream& os, const Punto& p) {
    os << "(" << p.x << ", " << p.y << ")";
    return os;
}

// Overloading dell'operatore di input >>
std::istream& operator>>(std::istream& is, Punto& p) {
    char parentesi, virgola;
    is >> parentesi >> p.x >> virgola >> p.y >> parentesi;
    return is;
}
```

### Operatore di Chiamata di Funzione (())

Questo operatore permette di utilizzare un oggetto come se fosse una funzione (functor).

```cpp
class Calcolatore {
private:
    double fattore;
    
public:
    Calcolatore(double f) : fattore(f) {}
    
    // Overloading dell'operatore ()
    double operator()(double x) const {
        return x * fattore;
    }
};

// Utilizzo
Calcolatore doppio(2.0);
double risultato = doppio(5.0);  // risultato = 10.0
```

## Operatori di Conversione

È possibile definire operatori di conversione che permettono di convertire un oggetto di una classe in un altro tipo.

```cpp
class Frazione {
private:
    int numeratore;
    int denominatore;
    
public:
    Frazione(int num, int den = 1) : numeratore(num), denominatore(den) {}
    
    // Operatore di conversione a double
    operator double() const {
        return static_cast<double>(numeratore) / denominatore;
    }
};

// Utilizzo
Frazione f(3, 4);  // 3/4
double d = f;      // d = 0.75
```

## Best Practices per l'Overloading degli Operatori

1. **Mantenere il significato intuitivo**: l'operatore sovraccaricato dovrebbe comportarsi in modo simile al suo significato originale.
2. **Rispettare le proprietà matematiche**: se applicabile, rispettare proprietà come la commutatività (a + b = b + a).
3. **Implementare operatori correlati**: se si implementa `==`, implementare anche `!=`; se si implementa `<`, considerare anche `>`, `<=` e `>=`.
4. **Restituire riferimenti per operatori di assegnazione**: operatori come `=`, `+=`, `-=` dovrebbero restituire un riferimento all'oggetto corrente (`*this`).
5. **Evitare effetti collaterali inaspettati**: gli operatori dovrebbero fare ciò che ci si aspetta da loro.
6. **Non sovraccaricaricare operatori senza un buon motivo**: l'overloading dovrebbe migliorare la leggibilità e l'usabilità.

## Esempio Completo

```cpp
#include <iostream>
#include <string>

class NumeroComplesso {
private:
    double reale;
    double immaginario;
    
public:
    // Costruttore
    NumeroComplesso(double r = 0, double i = 0) : reale(r), immaginario(i) {}
    
    // Getter
    double getReale() const { return reale; }
    double getImmaginario() const { return immaginario; }
    
    // Operatori aritmetici
    NumeroComplesso operator+(const NumeroComplesso& c) const {
        return NumeroComplesso(reale + c.reale, immaginario + c.immaginario);
    }
    
    NumeroComplesso operator-(const NumeroComplesso& c) const {
        return NumeroComplesso(reale - c.reale, immaginario - c.immaginario);
    }
    
    NumeroComplesso operator*(const NumeroComplesso& c) const {
        // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
        double nuovoReale = reale * c.reale - immaginario * c.immaginario;
        double nuovoImmaginario = reale * c.immaginario + immaginario * c.reale;
        return NumeroComplesso(nuovoReale, nuovoImmaginario);
    }
    
    // Operatori di assegnazione
    NumeroComplesso& operator+=(const NumeroComplesso& c) {
        reale += c.reale;
        immaginario += c.immaginario;
        return *this;
    }
    
    // Operatori di confronto
    bool operator==(const NumeroComplesso& c) const {
        return reale == c.reale && immaginario == c.immaginario;
    }
    
    bool operator!=(const NumeroComplesso& c) const {
        return !(*this == c);
    }
    
    // Operatore di negazione
    NumeroComplesso operator-() const {
        return NumeroComplesso(-reale, -immaginario);
    }
    
    // Operatore di output (dichiarato come friend)
    friend std::ostream& operator<<(std::ostream& os, const NumeroComplesso& c);
};

// Definizione dell'operatore di output
std::ostream& operator<<(std::ostream& os, const NumeroComplesso& c) {
    os << c.reale;
    if (c.immaginario >= 0) {
        os << "+";
    }
    os << c.immaginario << "i";
    return os;
}

int main() {
    NumeroComplesso c1(3, 4);    // 3+4i
    NumeroComplesso c2(1, -2);   // 1-2i
    
    std::cout << "c1 = " << c1 << std::endl;
    std::cout << "c2 = " << c2 << std::endl;
    
    // Test degli operatori
    NumeroComplesso somma = c1 + c2;
    NumeroComplesso differenza = c1 - c2;
    NumeroComplesso prodotto = c1 * c2;
    
    std::cout << "c1 + c2 = " << somma << std::endl;
    std::cout << "c1 - c2 = " << differenza << std::endl;
    std::cout << "c1 * c2 = " << prodotto << std::endl;
    
    // Test dell'operatore +=
    NumeroComplesso c3 = c1;
    c3 += c2;
    std::cout << "c3 (dopo c3 += c2) = " << c3 << std::endl;
    
    // Test degli operatori di confronto
    std::cout << "c1 == c2: " << (c1 == c2 ? "vero" : "falso") << std::endl;
    std::cout << "c1 != c2: " << (c1 != c2 ? "vero" : "falso") << std::endl;
    
    // Test dell'operatore di negazione
    NumeroComplesso c4 = -c1;
    std::cout << "-c1 = " << c4 << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i due modi per implementare l'overloading degli operatori in C++?
2. Perché è importante restituire un riferimento (`&`) dagli operatori di assegnazione?
3. Qual è la differenza tra l'overloading dell'operatore di incremento prefisso (`++x`) e postfisso (`x++`)?
4. Perché è utile sovraccaricare gli operatori di stream (`<<` e `>>`)?
5. Quali considerazioni dovresti fare prima di sovraccaricare un operatore?

## Esercizi Proposti

1. Crea una classe `Frazione` che rappresenti una frazione matematica e sovraccarica gli operatori aritmetici (+, -, *, /) e di confronto (==, !=, <, >, <=, >=).
2. Implementa una classe `Stringa` che gestisca stringhe di caratteri e sovraccarica gli operatori di concatenazione (+), assegnazione (=), confronto (==, !=) e subscript ([]).
3. Crea una classe `Matrice` che rappresenti una matrice matematica e sovraccarica gli operatori di addizione, sottrazione e moltiplicazione tra matrici.
4. Implementa una classe `Polinomio` che rappresenti un polinomio matematico e sovraccarica gli operatori aritmetici e l'operatore di valutazione () per calcolare il valore del polinomio per un dato valore della variabile.

## Prossimo Argomento

Nel prossimo argomento, esploreremo l'ereditarietà in C++, un altro principio fondamentale della programmazione orientata agli oggetti che permette di creare nuove classi basate su classi esistenti.