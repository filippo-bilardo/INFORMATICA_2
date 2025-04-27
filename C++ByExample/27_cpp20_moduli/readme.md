# Esercitazione 27: C++20 - Moduli

## Obiettivo

L'obiettivo di questa esercitazione è esplorare i moduli, una delle caratteristiche più attese introdotte in C++20. I moduli rappresentano un nuovo modo di organizzare il codice C++, superando le limitazioni del sistema di inclusione dei file header tradizionale. Imparerai a creare, importare ed esportare moduli, comprendendo i vantaggi che offrono in termini di tempo di compilazione, organizzazione del codice e incapsulamento.

## Argomenti Trattati

- Introduzione ai moduli in C++20
- Differenze tra moduli e header tradizionali
- Creazione di moduli con `export module`
- Esportazione di dichiarazioni con `export`
- Importazione di moduli con `import`
- Interfacce di modulo e unità di implementazione
- Vantaggi in termini di tempo di compilazione
- Gestione delle dipendenze

## Esercizi

### Esercizio 1: Creazione di un Modulo Base

Crea un semplice modulo che esporta alcune funzioni matematiche.

```cpp
// matematica.ixx
export module matematica;

export int somma(int a, int b) {
    return a + b;
}

export int sottrazione(int a, int b) {
    return a - b;
}

export int moltiplicazione(int a, int b) {
    return a * b;
}

export int divisione(int a, int b) {
    if (b == 0) throw std::invalid_argument("Divisione per zero");
    return a / b;
}
```

### Esercizio 2: Utilizzo di un Modulo

Crea un programma che importa e utilizza il modulo matematica.

```cpp
// main.cpp
import <iostream>;
import matematica;

int main() {
    int a = 10, b = 5;
    
    std::cout << "Somma: " << somma(a, b) << std::endl;
    std::cout << "Sottrazione: " << sottrazione(a, b) << std::endl;
    std::cout << "Moltiplicazione: " << moltiplicazione(a, b) << std::endl;
    std::cout << "Divisione: " << divisione(a, b) << std::endl;
    
    return 0;
}
```

### Esercizio 3: Modulo con Interfaccia e Implementazione Separate

Crea un modulo più complesso con interfaccia e implementazione separate.

```cpp
// geometria.ixx - Interfaccia del modulo
export module geometria;

export namespace geometria {
    // Classe per rappresentare un punto 2D
    class Punto {
    private:
        double x, y;
    
    public:
        Punto(double x, double y);
        
        double getX() const;
        double getY() const;
        
        double distanzaDa(const Punto& altro) const;
    };
    
    // Classe per rappresentare un cerchio
    class Cerchio {
    private:
        Punto centro;
        double raggio;
    
    public:
        Cerchio(const Punto& centro, double raggio);
        
        double getArea() const;
        double getCirconferenza() const;
        
        bool contiene(const Punto& p) const;
    };
}
```

```cpp
// geometria.cpp - Implementazione del modulo
module geometria;

#include <cmath>

namespace geometria {
    // Implementazione della classe Punto
    Punto::Punto(double x, double y) : x(x), y(y) {}
    
    double Punto::getX() const { return x; }
    double Punto::getY() const { return y; }
    
    double Punto::distanzaDa(const Punto& altro) const {
        double dx = x - altro.x;
        double dy = y - altro.y;
        return std::sqrt(dx*dx + dy*dy);
    }
    
    // Implementazione della classe Cerchio
    Cerchio::Cerchio(const Punto& centro, double raggio)
        : centro(centro), raggio(raggio) {
        if (raggio <= 0) throw std::invalid_argument("Il raggio deve essere positivo");
    }
    
    double Cerchio::getArea() const {
        return M_PI * raggio * raggio;
    }
    
    double Cerchio::getCirconferenza() const {
        return 2 * M_PI * raggio;
    }
    
    bool Cerchio::contiene(const Punto& p) const {
        return centro.distanzaDa(p) <= raggio;
    }
}
```

### Esercizio 4: Utilizzo del Modulo Geometria

Crea un programma che utilizza il modulo geometria per calcolare proprietà di punti e cerchi.

```cpp
// main.cpp
import <iostream>;
import geometria;

int main() {
    using namespace geometria;
    
    Punto p1(0, 0);
    Punto p2(3, 4);
    
    std::cout << "Distanza tra p1 e p2: " << p1.distanzaDa(p2) << std::endl;
    
    Cerchio c(p1, 5);
    std::cout << "Area del cerchio: " << c.getArea() << std::endl;
    std::cout << "Circonferenza del cerchio: " << c.getCirconferenza() << std::endl;
    
    std::cout << "Il cerchio contiene p2? " << (c.contiene(p2) ? "Sì" : "No") << std::endl;
    
    return 0;
}
```

## Approfondimenti

- [Introduzione ai Moduli](teoria/introduzione_moduli.md)
- [Moduli vs Header Tradizionali](teoria/moduli_vs_header.md)
- [Organizzazione del Codice con i Moduli](teoria/organizzazione_codice_moduli.md)

## Risorse Aggiuntive

- [C++ Reference: Modules](https://en.cppreference.com/w/cpp/language/modules)
- [C++20 Modules: A Practical Guide](https://www.modernescpp.com/index.php/c-20-modules)
- [Understanding C++20 Modules](https://devblogs.microsoft.com/cppblog/understanding-c20-modules/)