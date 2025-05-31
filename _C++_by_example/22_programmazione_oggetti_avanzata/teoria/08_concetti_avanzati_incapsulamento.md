# Concetti Avanzati di Incapsulamento in C++

## Introduzione all'Incapsulamento Avanzato

L'incapsulamento è uno dei quattro pilastri fondamentali della programmazione orientata agli oggetti (insieme a ereditarietà, polimorfismo e astrazione). In C++, l'incapsulamento va oltre la semplice dichiarazione di membri privati e pubblici, offrendo meccanismi avanzati per proteggere i dati e controllare l'accesso alle funzionalità di una classe.

In questa guida, esploreremo tecniche avanzate di incapsulamento in C++, tra cui l'uso di classi amiche, membri privati e protetti, classi nidificate, e pattern di progettazione che migliorano l'incapsulamento.

## Modificatori di Accesso in C++

C++ offre tre livelli di controllo dell'accesso:

1. **public**: I membri pubblici sono accessibili da qualsiasi parte del programma.
2. **protected**: I membri protetti sono accessibili solo dalla classe stessa e dalle classi derivate.
3. **private**: I membri privati sono accessibili solo dalla classe stessa.

```cpp
class Esempio {
public:
    int membroPubblico;      // Accessibile da ovunque
    
protected:
    int membroProtetto;      // Accessibile dalla classe e dalle classi derivate
    
private:
    int membroPrivato;       // Accessibile solo dalla classe stessa
};

class Derivata : public Esempio {
    void funzione() {
        membroPubblico = 1;   // OK
        membroProtetto = 2;   // OK
        // membroPrivato = 3; // Errore: non accessibile
    }
};

int main() {
    Esempio e;
    e.membroPubblico = 1;     // OK
    // e.membroProtetto = 2;  // Errore: non accessibile
    // e.membroPrivato = 3;   // Errore: non accessibile
    return 0;
}
```

## Classi e Funzioni Amiche (Friend)

Il meccanismo `friend` in C++ permette a una classe o funzione esterna di accedere ai membri privati e protetti di una classe. Questo è un'eccezione controllata al principio di incapsulamento.

### Funzioni Amiche

```cpp
class Cerchio {
private:
    double raggio;
    
public:
    Cerchio(double r) : raggio(r) {}
    
    // Dichiarazione di una funzione amica
    friend double calcolaArea(const Cerchio& c);
};

// Definizione della funzione amica
double calcolaArea(const Cerchio& c) {
    // Può accedere al membro privato 'raggio'
    return 3.14159 * c.raggio * c.raggio;
}

// Uso
Cerchio c(5);
std::cout << "Area: " << calcolaArea(c) << std::endl; // Output: Area: 78.5398
```

### Classi Amiche

```cpp
class Motore; // Dichiarazione anticipata

class Auto {
private:
    Motore* motore;
    int velocita;
    
public:
    Auto(Motore* m) : motore(m), velocita(0) {}
    
    // Dichiarazione di una classe amica
    friend class Meccanico;
};

class Motore {
private:
    int potenza;
    bool acceso;
    
public:
    Motore(int p) : potenza(p), acceso(false) {}
    
    // Dichiarazione di una classe amica
    friend class Meccanico;
};

class Meccanico {
public:
    void ripara(Auto& auto) {
        // Può accedere ai membri privati di Auto
        std::cout << "Riparazione dell'auto con velocità " << auto.velocita << std::endl;
        
        // Può accedere ai membri privati di Motore
        std::cout << "Riparazione del motore con potenza " << auto.motore->potenza << std::endl;
    }
    
    void accendiMotore(Motore& motore) {
        // Può accedere ai membri privati di Motore
        motore.acceso = true;
        std::cout << "Motore acceso" << std::endl;
    }
};
```

### Vantaggi e Svantaggi delle Dichiarazioni Friend

**Vantaggi**:
- Permettono un accesso controllato ai membri privati
- Utili per operatori che necessitano di accedere ai dettagli interni di una classe
- Possono migliorare l'efficienza in alcuni casi

**Svantaggi**:
- Violano il principio di incapsulamento
- Aumentano l'accoppiamento tra classi
- Possono rendere il codice più difficile da mantenere

## Classi Nidificate (Nested Classes)

Le classi nidificate sono classi definite all'interno di un'altra classe. Sono utili per incapsulare tipi di supporto che sono strettamente legati alla classe contenitore.

```cpp
class ListaCollegata {
private:
    // Classe nidificata per rappresentare un nodo della lista
    class Nodo {
    public:
        int dato;
        Nodo* successivo;
        
        Nodo(int d, Nodo* s = nullptr) : dato(d), successivo(s) {}
    };
    
    Nodo* testa;
    
public:
    ListaCollegata() : testa(nullptr) {}
    
    void aggiungi(int dato) {
        testa = new Nodo(dato, testa);
    }
    
    void stampa() const {
        for (Nodo* corrente = testa; corrente != nullptr; corrente = corrente->successivo) {
            std::cout << corrente->dato << " ";
        }
        std::cout << std::endl;
    }
    
    ~ListaCollegata() {
        while (testa) {
            Nodo* temp = testa;
            testa = testa->successivo;
            delete temp;
        }
    }
};

// Uso
ListaCollegata lista;
lista.aggiungi(3);
lista.aggiungi(2);
lista.aggiungi(1);
lista.stampa(); // Output: 1 2 3
```

Le classi nidificate hanno accesso ai membri privati della classe contenitore solo se sono istanziate come membri della classe contenitore. Viceversa, la classe contenitore ha accesso ai membri privati della classe nidificata.

## Pimpl Idiom (Pointer to Implementation)

Il Pimpl Idiom (Pointer to Implementation) è una tecnica di programmazione che nasconde i dettagli implementativi di una classe, migliorando l'incapsulamento e riducendo le dipendenze.

```cpp
// Nel file di intestazione (Esempio.h)
class Esempio {
public:
    Esempio();
    ~Esempio();
    Esempio(const Esempio& altro);
    Esempio& operator=(const Esempio& altro);
    Esempio(Esempio&& altro) noexcept;
    Esempio& operator=(Esempio&& altro) noexcept;
    
    void funzione();
    
private:
    class Impl; // Dichiarazione anticipata della classe di implementazione
    std::unique_ptr<Impl> pimpl; // Puntatore all'implementazione
};

// Nel file di implementazione (Esempio.cpp)
#include "Esempio.h"
#include <iostream>

// Definizione completa della classe di implementazione
class Esempio::Impl {
public:
    void funzione() {
        std::cout << "Implementazione della funzione" << std::endl;
    }
    
    int dato;
};

Esempio::Esempio() : pimpl(std::make_unique<Impl>()) {}

Esempio::~Esempio() = default;

Esempio::Esempio(const Esempio& altro) : pimpl(std::make_unique<Impl>(*altro.pimpl)) {}

Esempio& Esempio::operator=(const Esempio& altro) {
    if (this != &altro) {
        *pimpl = *altro.pimpl;
    }
    return *this;
}

Esempio::Esempio(Esempio&& altro) noexcept = default;

Esempio& Esempio::operator=(Esempio&& altro) noexcept = default;

void Esempio::funzione() {
    pimpl->funzione();
}
```

### Vantaggi del Pimpl Idiom

1. **Nasconde i dettagli implementativi**: I client della classe vedono solo l'interfaccia pubblica.
2. **Riduce le dipendenze di compilazione**: Modifiche all'implementazione non richiedono la ricompilazione dei client.
3. **Migliora i tempi di compilazione**: Meno inclusioni di header nei file di intestazione.
4. **Facilita il controllo delle versioni binarie**: L'interfaccia pubblica può rimanere stabile anche se l'implementazione cambia.

## Proprietà e Accessori (Getters e Setters)

Un approccio comune per l'incapsulamento è l'uso di metodi accessori (getters) e mutatori (setters) per controllare l'accesso ai dati privati.

```cpp
class Persona {
private:
    std::string nome;
    int eta;
    
public:
    Persona(const std::string& n, int e) : nome(n), eta(e) {}
    
    // Getter (accessore)
    std::string getNome() const {
        return nome;
    }
    
    // Setter (mutatore) con validazione
    void setEta(int nuovaEta) {
        if (nuovaEta >= 0 && nuovaEta <= 150) {
            eta = nuovaEta;
        } else {
            throw std::invalid_argument("Età non valida");
        }
    }
    
    // Getter (accessore)
    int getEta() const {
        return eta;
    }
};
```

### Proprietà di Sola Lettura

A volte, vogliamo permettere l'accesso in lettura ma non in scrittura a certi membri:

```cpp
class Cerchio {
private:
    double raggio;
    
public:
    Cerchio(double r) : raggio(r) {}
    
    // Getter per il raggio
    double getRaggio() const {
        return raggio;
    }
    
    // Proprietà di sola lettura calcolata
    double getDiametro() const {
        return 2 * raggio;
    }
    
    double getArea() const {
        return 3.14159 * raggio * raggio;
    }
    
    double getCirconferenza() const {
        return 2 * 3.14159 * raggio;
    }
    
    // Setter per il raggio
    void setRaggio(double r) {
        if (r >= 0) {
            raggio = r;
        } else {
            throw std::invalid_argument("Il raggio non può essere negativo");
        }
    }
};
```

## Membri Statici Privati

I membri statici privati sono condivisi tra tutte le istanze di una classe ma non sono accessibili dall'esterno.

```cpp
class Contatore {
private:
    static int conteggio; // Membro statico privato
    int id;
    
public:
    Contatore() : id(++conteggio) {
        std::cout << "Creato oggetto con ID: " << id << std::endl;
    }
    
    ~Contatore() {
        std::cout << "Distrutto oggetto con ID: " << id << std::endl;
        --conteggio;
    }
    
    static int getConteggio() {
        return conteggio;
    }
};

// Inizializzazione del membro statico
int Contatore::conteggio = 0;

// Uso
void funzione() {
    Contatore c1, c2;
    std::cout << "Numero di oggetti: " << Contatore::getConteggio() << std::endl;
} // c1 e c2 vengono distrutti qui
```

## Classi Non Copiabili e Non Spostabili

A volte, vogliamo impedire che gli oggetti di una classe vengano copiati o spostati. In C++11 e successivi, possiamo farlo dichiarando i costruttori di copia e gli operatori di assegnazione come `delete`.

```cpp
class NonCopiabile {
public:
    NonCopiabile() = default;
    
    // Disabilita la copia
    NonCopiabile(const NonCopiabile&) = delete;
    NonCopiabile& operator=(const NonCopiabile&) = delete;
    
    // Permetti lo spostamento
    NonCopiabile(NonCopiabile&&) = default;
    NonCopiabile& operator=(NonCopiabile&&) = default;
};

class NonSpostabile {
public:
    NonSpostabile() = default;
    
    // Permetti la copia
    NonSpostabile(const NonSpostabile&) = default;
    NonSpostabile& operator=(const NonSpostabile&) = default;
    
    // Disabilita lo spostamento
    NonSpostabile(NonSpostabile&&) = delete;
    NonSpostabile& operator=(NonSpostabile&&) = delete;
};

class NéCopiabileNéSpostabile {
public:
    NéCopiabileNéSpostabile() = default;
    
    // Disabilita sia la copia che lo spostamento
    NéCopiabileNéSpostabile(const NéCopiabileNéSpostabile&) = delete;
    NéCopiabileNéSpostabile& operator=(const NéCopiabileNéSpostabile&) = delete;
    NéCopiabileNéSpostabile(NéCopiabileNéSpostabile&&) = delete;
    NéCopiabileNéSpostabile& operator=(NéCopiabileNéSpostabile&&) = delete;
};
```

## Interfacce Non Virtuali (NVI - Non-Virtual Interface)

Il pattern NVI è una tecnica di progettazione che migliora l'incapsulamento separando l'interfaccia pubblica dall'implementazione virtuale.

```cpp
class Base {
public:
    // Interfaccia pubblica non virtuale
    void operazione() {
        // Codice pre-operazione
        operazioneImpl(); // Chiama l'implementazione virtuale
        // Codice post-operazione
    }
    
    virtual ~Base() = default;
    
protected:
    // Implementazione virtuale protetta
    virtual void operazioneImpl() = 0;
};

class Derivata : public Base {
protected:
    // Override dell'implementazione
    void operazioneImpl() override {
        std::cout << "Implementazione in Derivata" << std::endl;
    }
};

// Uso
Base* b = new Derivata();
b->operazione(); // Chiama l'interfaccia non virtuale
delete b;
```

Il pattern NVI offre diversi vantaggi:
1. Garantisce che il codice pre e post-operazione venga sempre eseguito
2. Permette di modificare l'implementazione senza cambiare l'interfaccia pubblica
3. Migliora l'incapsulamento nascondendo i dettagli implementativi

## Membri Privati e Protetti nelle Classi Base

Quando si progettano gerarchie di classi, è importante considerare attentamente quali membri rendere privati e quali protetti.

```cpp
class Base {
private:
    int membroPrivato; // Accessibile solo da Base
    
protected:
    int membroProtetto; // Accessibile da Base e classi derivate
    
public:
    Base(int priv, int prot) : membroPrivato(priv), membroProtetto(prot) {}
    
    void funzioneBase() {
        std::cout << "membroPrivato: " << membroPrivato << std::endl;
        std::cout << "membroProtetto: " << membroProtetto << std::endl;
    }
};

class Derivata : public Base {
private:
    int membroPrivatoDerivata;
    
public:
    Derivata(int priv, int prot, int privDer)
        : Base(priv, prot), membroPrivatoDerivata(privDer) {}
    
    void funzioneDerivata() {
        // std::cout << membroPrivato << std::endl; // Errore: non accessibile
        std::cout << "membroProtetto: " << membroProtetto << std::endl; // OK
        std::cout << "membroPrivatoDerivata: " << membroPrivatoDerivata << std::endl;
    }
};
```

## Best Practices per l'Incapsulamento

1. **Minimizza l'interfaccia pubblica**: Esponi solo ciò che è necessario.
2. **Usa membri privati per i dati**: Proteggi i dati dall'accesso diretto.
3. **Fornisci accessori e mutatori quando necessario**: Controlla l'accesso ai dati.
4. **Considera l'uso del Pimpl Idiom** per nascondere completamente l'implementazione.
5. **Usa classi nidificate** per tipi di supporto strettamente legati.
6. **Usa `friend` con parsimonia**: Le dichiarazioni friend violano l'incapsulamento.
7. **Considera il pattern NVI** per separare l'interfaccia dall'implementazione.
8. **Disabilita esplicitamente la copia e lo spostamento** quando non appropriati.

## Domande di Autovalutazione

1. Quali sono i tre livelli di controllo dell'accesso in C++ e come influenzano l'incapsulamento?
2. Quando è appropriato utilizzare una dichiarazione `friend` e quali sono i potenziali svantaggi?
3. Cos'è il Pimpl Idiom e quali vantaggi offre in termini di incapsulamento?
4. Qual è la differenza tra membri privati e protetti in una classe base?
5. Come può il pattern NVI (Non-Virtual Interface) migliorare l'incapsulamento?

## Esercizi Proposti

1. Implementa una classe `ContoCorrente` che incapsula il saldo e permette solo operazioni valide (ad esempio, non permettere prelievi che porterebbero il saldo sotto zero).
2. Crea una classe `Password` che memorizza una password in modo sicuro, impedendo l'accesso diretto alla stringa della password.
3. Implementa il Pimpl Idiom per una classe `Immagine` che nasconde i dettagli di implementazione del formato dell'immagine.
4. Progetta una gerarchia di classi per un sistema di forme geometriche utilizzando il pattern NVI.
5. Crea una classe `Singleton` thread-safe che utilizza tecniche avanzate di incapsulamento per garantire che esista una sola istanza della classe.