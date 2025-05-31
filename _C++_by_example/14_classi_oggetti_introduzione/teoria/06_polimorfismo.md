# Polimorfismo in C++

In questa guida, esploreremo il polimorfismo, uno dei principi fondamentali della programmazione orientata agli oggetti in C++.

## Cos'è il Polimorfismo?

Il polimorfismo (dal greco "molte forme") è la capacità di oggetti di classi diverse di rispondere allo stesso messaggio in modi diversi. In termini più tecnici, permette di trattare oggetti di classi derivate attraverso riferimenti o puntatori alla loro classe base.

Il polimorfismo si divide principalmente in due tipi:
1. **Polimorfismo in fase di compilazione** (statico): risolto durante la compilazione (overloading di funzioni e operatori)
2. **Polimorfismo in fase di esecuzione** (dinamico): risolto durante l'esecuzione (funzioni virtuali)

## Polimorfismo Statico

Il polimorfismo statico si verifica quando il compilatore può determinare quale funzione chiamare durante la compilazione.

### Overloading di Funzioni

```cpp
class Calcolatrice {
public:
    int somma(int a, int b) {
        return a + b;
    }
    
    double somma(double a, double b) {
        return a + b;
    }
    
    int somma(int a, int b, int c) {
        return a + b + c;
    }
};

// Utilizzo
Calcolatrice calc;
int risultato1 = calc.somma(5, 3);          // Chiama la prima versione
double risultato2 = calc.somma(5.5, 3.5);   // Chiama la seconda versione
int risultato3 = calc.somma(5, 3, 2);       // Chiama la terza versione
```

### Overloading di Operatori

Come visto nella guida precedente, l'overloading degli operatori è un'altra forma di polimorfismo statico.

## Polimorfismo Dinamico

Il polimorfismo dinamico si verifica quando il compilatore non può determinare quale funzione chiamare durante la compilazione, ma deve essere risolto durante l'esecuzione.

### Funzioni Virtuali

Le funzioni virtuali sono il meccanismo principale per implementare il polimorfismo dinamico in C++.

```cpp
class Forma {
public:
    virtual void disegna() {
        std::cout << "Disegna una forma generica" << std::endl;
    }
    
    virtual ~Forma() {}  // Distruttore virtuale importante!
};

class Cerchio : public Forma {
public:
    void disegna() override {
        std::cout << "Disegna un cerchio" << std::endl;
    }
};

class Rettangolo : public Forma {
public:
    void disegna() override {
        std::cout << "Disegna un rettangolo" << std::endl;
    }
};

// Utilizzo del polimorfismo
void disegnaForma(Forma& forma) {
    forma.disegna();  // Chiama la versione appropriata in base al tipo reale
}

Cerchio c;
Rettangolo r;

disegnaForma(c);  // Output: "Disegna un cerchio"
disegnaForma(r);  // Output: "Disegna un rettangolo"
```

### Come Funziona il Polimorfismo Dinamico

Il polimorfismo dinamico in C++ è implementato attraverso una tabella di funzioni virtuali (vtable):

1. Ogni classe con funzioni virtuali ha una vtable associata
2. Ogni oggetto di quella classe contiene un puntatore nascosto (vptr) alla vtable della classe
3. Quando viene chiamata una funzione virtuale attraverso un puntatore o riferimento, il sistema utilizza la vtable per determinare quale funzione chiamare

### Importanza del Distruttore Virtuale

È fondamentale dichiarare il distruttore come virtuale nelle classi base che verranno utilizzate in modo polimorfico:

```cpp
class Base {
public:
    // Senza distruttore virtuale
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

// Problema
Base* ptr = new Derivata();
delete ptr;  // Chiama solo il distruttore di Base, non quello di Derivata!
```

Con distruttore virtuale:

```cpp
class Base {
public:
    // Con distruttore virtuale
    virtual ~Base() {
        std::cout << "Distruttore di Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    ~Derivata() override {
        std::cout << "Distruttore di Derivata" << std::endl;
    }
};

// Soluzione
Base* ptr = new Derivata();
delete ptr;  // Chiama prima il distruttore di Derivata, poi quello di Base
```

## Classi Astratte e Interfacce

### Classi Astratte

Una classe astratta è una classe che contiene almeno una funzione virtuale pura e non può essere istanziata direttamente. Serve come "contratto" che le classi derivate devono implementare.

```cpp
class FormaGeometrica {
public:
    // Funzioni virtuali pure
    virtual double area() const = 0;
    virtual double perimetro() const = 0;
    
    virtual void disegna() const {
        std::cout << "Disegna una forma" << std::endl;
    }
    
    virtual ~FormaGeometrica() {}
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
    
    void disegna() const override {
        std::cout << "Disegna un rettangolo" << std::endl;
    }
};
```

### Interfacce

In C++, un'interfaccia è tipicamente implementata come una classe astratta con solo funzioni virtuali pure e nessun dato membro.

```cpp
// Interfaccia
class Disegnabile {
public:
    virtual void disegna() const = 0;
    virtual ~Disegnabile() {}
};

class Stampabile {
public:
    virtual void stampa() const = 0;
    virtual ~Stampabile() {}
};

// Classe che implementa multiple interfacce
class Documento : public Disegnabile, public Stampabile {
private:
    std::string contenuto;
    
public:
    Documento(std::string c) : contenuto(c) {}
    
    void disegna() const override {
        std::cout << "Disegna il documento: " << contenuto << std::endl;
    }
    
    void stampa() const override {
        std::cout << "Stampa il documento: " << contenuto << std::endl;
    }
};
```

## Binding Dinamico vs Binding Statico

- **Binding statico**: la decisione su quale funzione chiamare viene presa durante la compilazione
- **Binding dinamico**: la decisione su quale funzione chiamare viene presa durante l'esecuzione

```cpp
class Base {
public:
    void funzioneNonVirtuale() {
        std::cout << "Base::funzioneNonVirtuale" << std::endl;
    }
    
    virtual void funzioneVirtuale() {
        std::cout << "Base::funzioneVirtuale" << std::endl;
    }
};

class Derivata : public Base {
public:
    void funzioneNonVirtuale() {
        std::cout << "Derivata::funzioneNonVirtuale" << std::endl;
    }
    
    void funzioneVirtuale() override {
        std::cout << "Derivata::funzioneVirtuale" << std::endl;
    }
};

Base* ptr = new Derivata();

// Binding statico - chiama la versione della classe Base
ptr->funzioneNonVirtuale();  // Output: "Base::funzioneNonVirtuale"

// Binding dinamico - chiama la versione della classe Derivata
ptr->funzioneVirtuale();     // Output: "Derivata::funzioneVirtuale"

delete ptr;
```

## Funzioni Virtuali Pure e Override

### Funzioni Virtuali Pure

Una funzione virtuale pura è dichiarata assegnando 0 alla sua definizione:

```cpp
class Interfaccia {
public:
    virtual void metodo() = 0;  // Funzione virtuale pura
};
```

### Parola Chiave override (C++11)

La parola chiave `override` aiuta a prevenire errori assicurando che una funzione stia effettivamente sovrascrivendo una funzione virtuale della classe base:

```cpp
class Base {
public:
    virtual void funzione(int x) {}
};

class Derivata : public Base {
public:
    // Errore di battitura nel nome o nei parametri
    void funzion(int x) override {}  // Errore di compilazione: non esiste una funzione virtuale da sovrascrivere
    void funzione(double x) override {}  // Errore di compilazione: firma diversa
};
```

## Esempio Completo: Sistema di Forme Geometriche

```cpp
#include <iostream>
#include <vector>
#include <cmath>

// Classe astratta base
class Forma {
public:
    virtual double area() const = 0;
    virtual double perimetro() const = 0;
    virtual void disegna() const = 0;
    virtual std::string getNome() const = 0;
    
    virtual ~Forma() {}
};

// Classe concreta Cerchio
class Cerchio : public Forma {
private:
    double raggio;
    
public:
    Cerchio(double r) : raggio(r) {}
    
    double area() const override {
        return M_PI * raggio * raggio;
    }
    
    double perimetro() const override {
        return 2 * M_PI * raggio;
    }
    
    void disegna() const override {
        std::cout << "Disegna un cerchio di raggio " << raggio << std::endl;
    }
    
    std::string getNome() const override {
        return "Cerchio";
    }
};

// Classe concreta Rettangolo
class Rettangolo : public Forma {
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
    
    void disegna() const override {
        std::cout << "Disegna un rettangolo di dimensioni " << lunghezza << "x" << larghezza << std::endl;
    }
    
    std::string getNome() const override {
        return "Rettangolo";
    }
};

// Classe concreta Triangolo
class Triangolo : public Forma {
private:
    double lato1, lato2, lato3;
    
public:
    Triangolo(double a, double b, double c) : lato1(a), lato2(b), lato3(c) {}
    
    double area() const override {
        // Formula di Erone
        double s = (lato1 + lato2 + lato3) / 2;
        return std::sqrt(s * (s - lato1) * (s - lato2) * (s - lato3));
    }
    
    double perimetro() const override {
        return lato1 + lato2 + lato3;
    }
    
    void disegna() const override {
        std::cout << "Disegna un triangolo con lati " << lato1 << ", " << lato2 << ", " << lato3 << std::endl;
    }
    
    std::string getNome() const override {
        return "Triangolo";
    }
};

// Classe che utilizza il polimorfismo
class EditorForme {
private:
    std::vector<Forma*> forme;
    
public:
    void aggiungiForma(Forma* forma) {
        forme.push_back(forma);
    }
    
    void disegnaTutte() const {
        std::cout << "\nDisegno di tutte le forme:" << std::endl;
        for (const auto& forma : forme) {
            std::cout << forma->getNome() << ": ";
            forma->disegna();
        }
    }
    
    void mostraInfo() const {
        std::cout << "\nInformazioni sulle forme:" << std::endl;
        for (const auto& forma : forme) {
            std::cout << forma->getNome() << ":\n";
            std::cout << "  Area: " << forma->area() << std::endl;
            std::cout << "  Perimetro: " << forma->perimetro() << std::endl;
        }
    }
    
    ~EditorForme() {
        for (auto& forma : forme) {
            delete forma;
        }
    }
};

int main() {
    // Creazione dell'editor
    EditorForme editor;
    
    // Aggiunta di forme diverse
    editor.aggiungiForma(new Cerchio(5.0));
    editor.aggiungiForma(new Rettangolo(4.0, 6.0));
    editor.aggiungiForma(new Triangolo(3.0, 4.0, 5.0));
    editor.aggiungiForma(new Cerchio(2.5));
    
    // Utilizzo del polimorfismo
    editor.disegnaTutte();
    editor.mostraInfo();
    
    return 0;
}
```

## Vantaggi del Polimorfismo

1. **Estensibilità**: facilita l'aggiunta di nuove classi senza modificare il codice esistente
2. **Riutilizzo del codice**: permette di scrivere codice generico che funziona con qualsiasi classe derivata
3. **Flessibilità**: consente di trattare oggetti di tipi diversi in modo uniforme
4. **Manutenibilità**: semplifica la struttura del codice e riduce la duplicazione

## Considerazioni sulle Prestazioni

Il polimorfismo dinamico ha un piccolo costo in termini di prestazioni:

1. Ogni oggetto con funzioni virtuali ha un puntatore aggiuntivo (vptr)
2. Le chiamate a funzioni virtuali richiedono un'indirezione attraverso la vtable
3. Il compilatore non può inline le funzioni virtuali in molti casi

Tuttavia, questi costi sono generalmente trascurabili rispetto ai vantaggi in termini di design e manutenibilità del codice.

## Domande di Autovalutazione

1. Qual è la differenza tra polimorfismo statico e dinamico in C++?
2. Perché è importante dichiarare i distruttori come virtuali nelle classi base?
3. Cosa sono le funzioni virtuali pure e come si dichiarano?
4. Qual è la differenza tra una classe astratta e un'interfaccia in C++?
5. Come funziona il binding dinamico in C++ e quale meccanismo lo implementa?

## Esercizi Proposti

1. Crea un sistema di classi per rappresentare diversi tipi di veicoli (Veicolo, Auto, Moto, Camion) con metodi virtuali per calcolare il consumo di carburante e la velocità massima.
2. Implementa una gerarchia di classi per un sistema di notifiche (Notifica, Email, SMS, PushNotification) con metodi virtuali per inviare e formattare i messaggi.
3. Crea un sistema di classi per un'applicazione di disegno con diverse forme geometriche, aggiungendo funzionalità come il calcolo del centro, la rotazione e il ridimensionamento.
4. Implementa un sistema di classi per rappresentare diversi tipi di account bancari (Account, ContoCorriente, ContoRisparmio, ContoInvestimento) con metodi virtuali per deposito, prelievo e calcolo degli interessi.

## Prossimo Argomento

Nel prossimo argomento, esploreremo i template in C++, un potente strumento per la programmazione generica che permette di scrivere codice indipendente dal tipo di dato.