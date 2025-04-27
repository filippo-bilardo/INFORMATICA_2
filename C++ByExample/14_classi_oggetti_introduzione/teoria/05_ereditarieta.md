# Ereditarietà in C++

In questa guida, esploreremo l'ereditarietà, uno dei principi fondamentali della programmazione orientata agli oggetti in C++.

## Cos'è l'Ereditarietà?

L'ereditarietà è un meccanismo che permette di creare una nuova classe (chiamata classe derivata o sottoclasse) basata su una classe esistente (chiamata classe base o superclasse). La classe derivata eredita attributi e metodi dalla classe base, permettendo il riutilizzo del codice e la creazione di gerarchie di classi.

## Vantaggi dell'Ereditarietà

1. **Riutilizzo del codice**: evita la duplicazione implementando funzionalità comuni nella classe base
2. **Estensibilità**: permette di aggiungere nuove funzionalità senza modificare il codice esistente
3. **Organizzazione gerarchica**: consente di modellare relazioni "è un" tra oggetti
4. **Polimorfismo**: permette di trattare oggetti di classi derivate come oggetti della classe base

## Sintassi di Base

```cpp
// Classe base
class ClasseBase {
    // membri della classe base
};

// Classe derivata
class ClasseDerivata : [specificatore_di_accesso] ClasseBase {
    // membri aggiuntivi della classe derivata
};
```

Dove `[specificatore_di_accesso]` può essere:
- **public**: i membri pubblici e protetti della classe base rimangono rispettivamente pubblici e protetti nella classe derivata
- **protected**: i membri pubblici della classe base diventano protetti nella classe derivata
- **private**: i membri pubblici e protetti della classe base diventano privati nella classe derivata

## Tipi di Ereditarietà

### Ereditarietà Pubblica

È il tipo più comune di ereditarietà e stabilisce una relazione "è un" tra la classe derivata e la classe base.

```cpp
class Animale {
public:
    void mangia() {
        std::cout << "L'animale sta mangiando" << std::endl;
    }
    
    void dormi() {
        std::cout << "L'animale sta dormendo" << std::endl;
    }
};

class Cane : public Animale {
public:
    void abbaia() {
        std::cout << "Il cane sta abbaiando" << std::endl;
    }
};

// Utilizzo
Cane fido;
fido.mangia();  // Metodo ereditato dalla classe base
fido.abbaia();  // Metodo specifico della classe derivata
```

### Ereditarietà Protetta e Privata

Sono meno comuni e non stabiliscono una relazione "è un".

```cpp
class A {
public:
    int x;
protected:
    int y;
private:
    int z;
};

class B : protected A {
    // x diventa protected
    // y rimane protected
    // z non è accessibile
};

class C : private A {
    // x diventa private
    // y diventa private
    // z non è accessibile
};
```

## Costruttori e Distruttori nell'Ereditarietà

Quando si crea un oggetto di una classe derivata, viene chiamato prima il costruttore della classe base e poi quello della classe derivata. Per i distruttori, l'ordine è inverso.

```cpp
class Base {
public:
    Base() {
        std::cout << "Costruttore della classe Base" << std::endl;
    }
    
    ~Base() {
        std::cout << "Distruttore della classe Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    Derivata() {
        std::cout << "Costruttore della classe Derivata" << std::endl;
    }
    
    ~Derivata() {
        std::cout << "Distruttore della classe Derivata" << std::endl;
    }
};

// Creazione di un oggetto
Derivata d;  // Output:
             // Costruttore della classe Base
             // Costruttore della classe Derivata

// Quando d esce dallo scope:
// Distruttore della classe Derivata
// Distruttore della classe Base
```

### Inizializzazione della Classe Base

È possibile passare parametri al costruttore della classe base utilizzando la lista di inizializzazione:

```cpp
class Persona {
private:
    std::string nome;
    int età;
    
public:
    Persona(std::string n, int e) : nome(n), età(e) {}
    
    void mostraInfo() {
        std::cout << "Nome: " << nome << ", Età: " << età << std::endl;
    }
};

class Studente : public Persona {
private:
    int matricola;
    
public:
    // Passa parametri al costruttore della classe base
    Studente(std::string n, int e, int m) : Persona(n, e), matricola(m) {}
    
    void mostraMatricola() {
        std::cout << "Matricola: " << matricola << std::endl;
    }
};
```

## Override dei Metodi

Una classe derivata può ridefinire (override) i metodi della classe base per fornire un'implementazione specifica.

```cpp
class Forma {
public:
    virtual void disegna() {
        std::cout << "Disegna una forma generica" << std::endl;
    }
};

class Cerchio : public Forma {
public:
    // Override del metodo disegna
    void disegna() override {
        std::cout << "Disegna un cerchio" << std::endl;
    }
};

class Rettangolo : public Forma {
public:
    // Override del metodo disegna
    void disegna() override {
        std::cout << "Disegna un rettangolo" << std::endl;
    }
};
```

La parola chiave `virtual` nella classe base e `override` nella classe derivata (C++11) sono importanti per il polimorfismo.

## Funzioni Virtuali e Polimorfismo

Il polimorfismo permette di trattare oggetti di classi derivate attraverso puntatori o riferimenti alla classe base.

```cpp
class Animale {
public:
    virtual void emettiSuono() {
        std::cout << "L'animale emette un suono" << std::endl;
    }
    
    virtual ~Animale() {}  // Distruttore virtuale importante!
};

class Cane : public Animale {
public:
    void emettiSuono() override {
        std::cout << "Il cane abbaia" << std::endl;
    }
};

class Gatto : public Animale {
public:
    void emettiSuono() override {
        std::cout << "Il gatto miagola" << std::endl;
    }
};

// Utilizzo del polimorfismo
void faiEmetteresuono(Animale& animale) {
    animale.emettiSuono();  // Chiama la versione appropriata in base al tipo reale
}

Cane fido;
Gatto felix;

faiEmetteresuono(fido);   // Output: "Il cane abbaia"
faiEmetteresuono(felix);  // Output: "Il gatto miagola"
```

### Funzioni Virtuali Pure e Classi Astratte

Una funzione virtuale pura è una funzione virtuale senza implementazione. Una classe con almeno una funzione virtuale pura è chiamata classe astratta e non può essere istanziata direttamente.

```cpp
class FormaGeometrica {
public:
    // Funzione virtuale pura
    virtual double area() const = 0;
    virtual double perimetro() const = 0;
    
    virtual ~FormaGeometrica() {}  // Distruttore virtuale
};

class Rettangolo : public FormaGeometrica {
private:
    double lunghezza;
    double larghezza;
    
public:
    Rettangolo(double l, double w) : lunghezza(l), larghezza(w) {}
    
    double area() const override {
        return lunghezza * larghezza;
    }
    
    double perimetro() const override {
        return 2 * (lunghezza + larghezza);
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

## Ereditarietà Multipla

C++ supporta l'ereditarietà multipla, che permette a una classe di ereditare da più classi base.

```cpp
class A {
public:
    void metodoA() {
        std::cout << "Metodo di A" << std::endl;
    }
};

class B {
public:
    void metodoB() {
        std::cout << "Metodo di B" << std::endl;
    }
};

class C : public A, public B {
public:
    void metodoC() {
        std::cout << "Metodo di C" << std::endl;
    }
};

C oggetto;
oggetto.metodoA();  // Ereditato da A
oggetto.metodoB();  // Ereditato da B
oggetto.metodoC();  // Definito in C
```

### Problema del Diamante

L'ereditarietà multipla può portare al "problema del diamante" quando una classe eredita da due classi che a loro volta ereditano da una stessa classe base.

```cpp
class A {
public:
    void metodo() {
        std::cout << "Metodo di A" << std::endl;
    }
};

class B : public A {};
class C : public A {};

class D : public B, public C {};

D oggetto;
// oggetto.metodo();  // Ambiguità: metodo() è ereditato sia da B che da C
```

Questo problema può essere risolto utilizzando l'ereditarietà virtuale:

```cpp
class A {
public:
    void metodo() {
        std::cout << "Metodo di A" << std::endl;
    }
};

class B : virtual public A {};
class C : virtual public A {};

class D : public B, public C {};

D oggetto;
oggetto.metodo();  // OK, non c'è ambiguità
```

## Esempio Completo

```cpp
#include <iostream>
#include <string>
#include <vector>

// Classe base
class Veicolo {
protected:
    std::string marca;
    std::string modello;
    int anno;
    
public:
    Veicolo(std::string ma, std::string mo, int a) 
        : marca(ma), modello(mo), anno(a) {}
    
    virtual void mostraInfo() const {
        std::cout << "Veicolo: " << marca << " " << modello << " (" << anno << ")" << std::endl;
    }
    
    virtual double calcolaCostoNoleggio() const {
        return 50.0;  // Costo base giornaliero
    }
    
    virtual ~Veicolo() {}
};

// Classe derivata
class Automobile : public Veicolo {
private:
    int numeroPosti;
    bool cambioAutomatico;
    
public:
    Automobile(std::string ma, std::string mo, int a, int np, bool ca) 
        : Veicolo(ma, mo, a), numeroPosti(np), cambioAutomatico(ca) {}
    
    void mostraInfo() const override {
        Veicolo::mostraInfo();  // Chiama il metodo della classe base
        std::cout << "  Numero posti: " << numeroPosti << std::endl;
        std::cout << "  Cambio: " << (cambioAutomatico ? "Automatico" : "Manuale") << std::endl;
    }
    
    double calcolaCostoNoleggio() const override {
        double costoBase = Veicolo::calcolaCostoNoleggio();
        // Aggiungi extra per il cambio automatico
        if (cambioAutomatico) {
            costoBase += 15.0;
        }
        // Aggiungi extra per auto con più di 5 posti
        if (numeroPosti > 5) {
            costoBase += 20.0;
        }
        return costoBase;
    }
};

// Altra classe derivata
class Motocicletta : public Veicolo {
private:
    int cilindrata;
    
public:
    Motocicletta(std::string ma, std::string mo, int a, int c) 
        : Veicolo(ma, mo, a), cilindrata(c) {}
    
    void mostraInfo() const override {
        Veicolo::mostraInfo();
        std::cout << "  Cilindrata: " << cilindrata << " cc" << std::endl;
    }
    
    double calcolaCostoNoleggio() const override {
        double costoBase = Veicolo::calcolaCostoNoleggio() * 0.7;  // Le moto costano meno
        // Aggiungi extra per moto di grossa cilindrata
        if (cilindrata > 500) {
            costoBase += 25.0;
        }
        return costoBase;
    }
};

// Classe per gestire il noleggio
class AgenziaNoleggio {
private:
    std::vector<Veicolo*> flotta;
    
public:
    void aggiungiVeicolo(Veicolo* v) {
        flotta.push_back(v);
    }
    
    void mostraFlotta() const {
        std::cout << "=== Flotta Disponibile ===" << std::endl;
        for (const auto& veicolo : flotta) {
            veicolo->mostraInfo();
            std::cout << "  Costo noleggio giornaliero: €" << veicolo->calcolaCostoNoleggio() << std::endl;
            std::cout << "---------------------------" << std::endl;
        }
    }
    
    ~AgenziaNoleggio() {
        for (auto& veicolo : flotta) {
            delete veicolo;
        }
    }
};

int main() {
    // Creazione dell'agenzia
    AgenziaNoleggio agenzia;
    
    // Aggiunta di veicoli alla flotta
    agenzia.aggiungiVeicolo(new Automobile("Fiat", "Panda", 2020, 5, false));
    agenzia.aggiungiVeicolo(new Automobile("Mercedes", "Classe E", 2021, 5, true));
    agenzia.aggiungiVeicolo(new Automobile("Ford", "Transit", 2019, 9, false));
    agenzia.aggiungiVeicolo(new Motocicletta("Honda", "CB500", 2020, 500));
    agenzia.aggiungiVeicolo(new Motocicletta("Ducati", "Monster", 2021, 900));
    
    // Visualizzazione della flotta
    agenzia.mostraFlotta();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi dell'ereditarietà nella programmazione orientata agli oggetti?
2. Qual è la differenza tra ereditarietà pubblica, protetta e privata?
3. Perché è importante dichiarare i distruttori come virtuali nelle classi base?
4. Cosa sono le funzioni virtuali pure e le classi astratte? Quando è utile utilizzarle?
5. Cos'è il problema del diamante nell'ereditarietà multipla e come può essere risolto?

## Esercizi Proposti

1. Crea una gerarchia di classi per rappresentare diverse figure geometriche (Forma, Cerchio, Rettangolo, Triangolo) con metodi per calcolare area e perimetro.
2. Implementa una gerarchia di classi per un sistema di gestione di una biblioteca con classi come Elemento, Libro, Rivista, DVD, con metodi appropriati per ciascuna classe.
3. Crea un sistema di classi per rappresentare diversi tipi di dipendenti in un'azienda (Dipendente, Manager, Sviluppatore, Venditore) con metodi per calcolare lo stipendio in base al ruolo.
4. Implementa una gerarchia di classi per un gioco con personaggi diversi (Personaggio, Guerriero, Mago, Arciere) con metodi per attaccare, difendersi e mostrare le statistiche.

## Prossimo Argomento

Nel prossimo argomento, esploreremo il polimorfismo in C++ in modo più approfondito, concentrandoci su funzioni virtuali, classi astratte e interfacce.