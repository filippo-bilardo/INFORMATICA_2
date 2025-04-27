# Polimorfismo Avanzato in C++

## Introduzione al Polimorfismo Avanzato

Il polimorfismo è uno dei quattro pilastri della programmazione orientata agli oggetti e permette a oggetti di classi diverse di rispondere allo stesso messaggio in modi diversi. In C++, il polimorfismo si manifesta principalmente attraverso l'overloading delle funzioni, l'override delle funzioni virtuali e le classi astratte. In questa guida, esploreremo i concetti avanzati del polimorfismo in C++.

## Funzioni Virtuali e Polimorfismo Dinamico

Il polimorfismo dinamico in C++ si realizza attraverso le funzioni virtuali. Una funzione virtuale è una funzione membro dichiarata nella classe base e ridefinita (override) in una o più classi derivate.

```cpp
class Base {
public:
    virtual void funzione() {
        std::cout << "Funzione della classe Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    void funzione() override {
        std::cout << "Funzione della classe Derivata" << std::endl;
    }
};

// Uso del polimorfismo
Base* ptr = new Derivata();
ptr->funzione(); // Output: "Funzione della classe Derivata"
delete ptr;
```

### La Keyword `override`

La keyword `override` (introdotta in C++11) è utilizzata per indicare esplicitamente che una funzione nella classe derivata sta facendo l'override di una funzione virtuale della classe base. Questo aiuta a prevenire errori e migliora la leggibilità del codice.

```cpp
class Base {
public:
    virtual void funzione() {
        std::cout << "Base::funzione()" << std::endl;
    }
};

class Derivata : public Base {
public:
    // Uso esplicito di override
    void funzione() override {
        std::cout << "Derivata::funzione()" << std::endl;
    }
    
    // Se si commette un errore di battitura, il compilatore segnalerà un errore
    // void funzion() override { } // Errore: nessuna funzione virtuale da sovrascrivere
};
```

### La Keyword `final`

La keyword `final` (introdotta in C++11) può essere utilizzata per impedire che una classe venga ulteriormente derivata o che una funzione virtuale venga ulteriormente sovrascritta.

```cpp
class Base {
public:
    virtual void funzione() {
        std::cout << "Base::funzione()" << std::endl;
    }
};

class Derivata final : public Base {
public:
    void funzione() override final {
        std::cout << "Derivata::funzione()" << std::endl;
    }
};

// Errore: non è possibile derivare da una classe final
// class UlteriormenteDerivata : public Derivata { };
```

## Funzioni Virtuali Pure e Classi Astratte

Una funzione virtuale pura è una funzione virtuale che non ha implementazione nella classe base e deve essere implementata da qualsiasi classe derivata concreta. Una classe che contiene almeno una funzione virtuale pura è chiamata classe astratta.

```cpp
class FormaGeometrica {
public:
    // Funzione virtuale pura (notare il '= 0')
    virtual double area() const = 0;
    virtual double perimetro() const = 0;
    
    // Distruttore virtuale (buona pratica)
    virtual ~FormaGeometrica() {}
};

// Non possiamo istanziare una classe astratta
// FormaGeometrica forma; // Errore

class Rettangolo : public FormaGeometrica {
private:
    double larghezza, altezza;

public:
    Rettangolo(double l, double a) : larghezza(l), altezza(a) {}
    
    // Implementazione delle funzioni virtuali pure
    double area() const override {
        return larghezza * altezza;
    }
    
    double perimetro() const override {
        return 2 * (larghezza + altezza);
    }
};

class Cerchio : public FormaGeometrica {
private:
    double raggio;

public:
    Cerchio(double r) : raggio(r) {}
    
    double area() const override {
        return 3.14159 * raggio * raggio;
    }
    
    double perimetro() const override {
        return 2 * 3.14159 * raggio;
    }
};
```

## Interfacce in C++

A differenza di linguaggi come Java o C#, C++ non ha un concetto esplicito di interfaccia. Tuttavia, una classe astratta con solo funzioni virtuali pure può essere utilizzata come interfaccia.

```cpp
// Questa classe astratta funziona come un'interfaccia
class Disegnabile {
public:
    virtual void disegna() const = 0;
    virtual ~Disegnabile() {}
};

class Salvabile {
public:
    virtual void salva(const std::string& filename) const = 0;
    virtual ~Salvabile() {}
};

// Una classe può implementare più "interfacce"
class Documento : public Disegnabile, public Salvabile {
public:
    void disegna() const override {
        std::cout << "Disegno del documento" << std::endl;
    }
    
    void salva(const std::string& filename) const override {
        std::cout << "Salvataggio del documento in " << filename << std::endl;
    }
};
```

## CRTP (Curiously Recurring Template Pattern)

Il CRTP è un idioma di programmazione in C++ che implementa il polimorfismo statico. Consiste in una classe template che eredita da una specializzazione di se stessa.

```cpp
template <typename Derived>
class Base {
public:
    void interface() {
        // Chiama l'implementazione nella classe derivata
        static_cast<Derived*>(this)->implementation();
    }
    
    // Implementazione di default che può essere sovrascritta
    void implementation() {
        std::cout << "Implementazione di default nella Base" << std::endl;
    }
};

class Derivata : public Base<Derivata> {
public:
    void implementation() {
        std::cout << "Implementazione specializzata nella Derivata" << std::endl;
    }
};

// Uso
Derivata d;
d.interface(); // Output: "Implementazione specializzata nella Derivata"
```

Il CRTP permette di ottenere un comportamento simile al polimorfismo dinamico, ma senza il costo runtime delle funzioni virtuali, poiché le chiamate vengono risolte a tempo di compilazione.

## Distruttori Virtuali

Quando si lavora con il polimorfismo, è fondamentale dichiarare i distruttori come virtuali nelle classi base. Questo garantisce che il distruttore corretto venga chiamato quando un oggetto viene eliminato attraverso un puntatore alla classe base.

```cpp
class Base {
public:
    // Distruttore non virtuale (problematico)
    ~Base() {
        std::cout << "Distruttore di Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    ~Derivata() {
        std::cout << "Distruttore di Derivata" << std::endl;
    }
};

// Problema: solo il distruttore di Base viene chiamato
Base* ptr = new Derivata();
delete ptr; // Output: solo "Distruttore di Base"

// Soluzione: rendere il distruttore virtuale
class BaseCorretta {
public:
    virtual ~BaseCorretta() {
        std::cout << "Distruttore di BaseCorretta" << std::endl;
    }
};

class DerivataCorretta : public BaseCorretta {
public:
    ~DerivataCorretta() override {
        std::cout << "Distruttore di DerivataCorretta" << std::endl;
    }
};

// Ora entrambi i distruttori vengono chiamati
BaseCorretta* ptrCorretto = new DerivataCorretta();
delete ptrCorretto; // Output: "Distruttore di DerivataCorretta" seguito da "Distruttore di BaseCorretta"
```

## Tabelle Virtuali (vtable)

Il meccanismo sottostante che permette il polimorfismo dinamico in C++ è la tabella virtuale (vtable). Ogni classe con funzioni virtuali ha una vtable associata, che è una tabella di puntatori a funzioni. Ogni oggetto di quella classe contiene un puntatore nascosto (vptr) alla vtable della sua classe.

Quando una funzione virtuale viene chiamata attraverso un puntatore o un riferimento, il compilatore genera codice che:
1. Accede alla vtable dell'oggetto tramite il vptr
2. Trova il puntatore alla funzione appropriata nella vtable
3. Chiama la funzione tramite quel puntatore

Questo meccanismo permette la risoluzione dinamica delle chiamate di funzione a runtime, ma introduce un piccolo overhead in termini di memoria e prestazioni.

## Best Practices per il Polimorfismo

1. **Dichiara sempre i distruttori come virtuali** nelle classi base.
2. **Usa `override` per le funzioni virtuali** nelle classi derivate.
3. **Usa `final` quando appropriato** per prevenire ulteriori override o derivazioni.
4. **Considera il costo del polimorfismo dinamico**: le funzioni virtuali introducono un overhead.
5. **Usa il CRTP** quando hai bisogno di polimorfismo ma vuoi evitare l'overhead delle funzioni virtuali.
6. **Progetta attentamente le interfacce**: una buona interfaccia dovrebbe essere coesa e seguire il principio di responsabilità singola.

## Domande di Autovalutazione

1. Qual è la differenza tra polimorfismo statico e dinamico in C++?
2. Perché è importante dichiarare i distruttori come virtuali nelle classi base?
3. Cosa sono le funzioni virtuali pure e come si dichiarano?
4. Come si implementa un'interfaccia in C++?
5. Cos'è il CRTP e quali vantaggi offre rispetto al polimorfismo dinamico tradizionale?

## Esercizi Proposti

1. Implementa una gerarchia di classi per un sistema di forme geometriche utilizzando funzioni virtuali pure.
2. Crea un'interfaccia `Serializzabile` e implementala in diverse classi.
3. Implementa il pattern CRTP per creare una classe base che fornisce funzionalità di logging alle classi derivate.
4. Progetta un sistema di plugin utilizzando il polimorfismo dinamico.
5. Confronta le prestazioni di una soluzione basata su funzioni virtuali con una soluzione equivalente basata su CRTP.