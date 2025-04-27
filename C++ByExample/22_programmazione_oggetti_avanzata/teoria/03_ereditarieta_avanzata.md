# Ereditarietà Avanzata in C++

## Introduzione all'Ereditarietà Avanzata

L'ereditarietà è uno dei pilastri fondamentali della programmazione orientata agli oggetti. In C++, l'ereditarietà permette di creare nuove classi (derivate) basate su classi esistenti (base), ereditando attributi e metodi. Mentre l'ereditarietà di base è relativamente semplice, C++ offre meccanismi avanzati che permettono di creare gerarchie di classi complesse e flessibili.

## Tipi di Ereditarietà in C++

C++ supporta diversi tipi di ereditarietà, ognuno con caratteristiche e casi d'uso specifici:

1. **Ereditarietà Singola**: Una classe derivata eredita da una singola classe base.
2. **Ereditarietà Multipla**: Una classe derivata eredita da più classi base.
3. **Ereditarietà Multilivello**: Una classe derivata eredita da una classe base, che a sua volta è derivata da un'altra classe.
4. **Ereditarietà Gerarchica**: Più classi derivate ereditano da una singola classe base.
5. **Ereditarietà Ibrida**: Combinazione di due o più tipi di ereditarietà.

## Ereditarietà Multipla

L'ereditarietà multipla è una caratteristica potente ma complessa di C++. Permette a una classe di ereditare da più classi base, combinando funzionalità da diverse fonti.

```cpp
class Base1 {
public:
    void funzioneBase1() {
        std::cout << "Funzione di Base1" << std::endl;
    }
};

class Base2 {
public:
    void funzioneBase2() {
        std::cout << "Funzione di Base2" << std::endl;
    }
};

class Derivata : public Base1, public Base2 {
public:
    void funzioneDerivata() {
        std::cout << "Funzione di Derivata" << std::endl;
        // Possiamo chiamare funzioni di entrambe le classi base
        funzioneBase1();
        funzioneBase2();
    }
};
```

### Il Problema del Diamante

Uno dei problemi più noti dell'ereditarietà multipla è il "problema del diamante", che si verifica quando una classe eredita da due classi che a loro volta ereditano da una classe comune.

```cpp
class Base {
public:
    int valore;
    Base(int v) : valore(v) {}
};

class Derivata1 : public Base {
public:
    Derivata1(int v) : Base(v) {}
};

class Derivata2 : public Base {
public:
    Derivata2(int v) : Base(v) {}
};

// Problema del diamante: Finale eredita due copie di Base
class Finale : public Derivata1, public Derivata2 {
public:
    Finale(int v1, int v2) : Derivata1(v1), Derivata2(v2) {}
    
    // Ambiguità: quale 'valore' usare?
    void stampaValore() {
        // std::cout << valore << std::endl; // Errore: ambiguo
        std::cout << Derivata1::valore << std::endl; // OK, ma non ideale
    }
};
```

### Ereditarietà Virtuale

L'ereditarietà virtuale è la soluzione al problema del diamante. Usando la parola chiave `virtual` nell'ereditarietà, C++ garantisce che esista una sola istanza della classe base comune.

```cpp
class Base {
public:
    int valore;
    Base(int v) : valore(v) {}
};

// Nota l'uso di 'virtual'
class Derivata1 : virtual public Base {
public:
    Derivata1(int v) : Base(v) {}
};

class Derivata2 : virtual public Base {
public:
    Derivata2(int v) : Base(v) {}
};

// Ora Finale ha solo una copia di Base
class Finale : public Derivata1, public Derivata2 {
public:
    // Dobbiamo inizializzare Base direttamente
    Finale(int v) : Base(v), Derivata1(v), Derivata2(v) {}
    
    // Non c'è più ambiguità
    void stampaValore() {
        std::cout << valore << std::endl; // OK
    }
};
```

## Controllo dell'Accesso nell'Ereditarietà

C++ offre tre livelli di controllo dell'accesso per l'ereditarietà:

1. **public**: I membri pubblici e protetti della classe base rimangono rispettivamente pubblici e protetti nella classe derivata.
2. **protected**: I membri pubblici e protetti della classe base diventano protetti nella classe derivata.
3. **private**: I membri pubblici e protetti della classe base diventano privati nella classe derivata.

```cpp
class Base {
public:
    int pubblico;
protected:
    int protetto;
private:
    int privato;
};

class DerivataPublic : public Base {
    // pubblico rimane pubblico
    // protetto rimane protetto
    // privato non è accessibile
};

class DerivataProtected : protected Base {
    // pubblico diventa protetto
    // protetto rimane protetto
    // privato non è accessibile
};

class DerivataPrivate : private Base {
    // pubblico diventa privato
    // protetto diventa privato
    // privato non è accessibile
};
```

## Costruttori e Distruttori nell'Ereditarietà

Quando si lavora con l'ereditarietà, è importante comprendere come vengono chiamati i costruttori e i distruttori:

1. I costruttori vengono chiamati nell'ordine: classe base → classe derivata.
2. I distruttori vengono chiamati nell'ordine inverso: classe derivata → classe base.

```cpp
class Base {
public:
    Base() {
        std::cout << "Costruttore di Base" << std::endl;
    }
    ~Base() {
        std::cout << "Distruttore di Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    Derivata() {
        std::cout << "Costruttore di Derivata" << std::endl;
    }
    ~Derivata() {
        std::cout << "Distruttore di Derivata" << std::endl;
    }
};

// Output per: Derivata d;
// Costruttore di Base
// Costruttore di Derivata
// Distruttore di Derivata
// Distruttore di Base
```

## Ereditarietà e Composizione

Mentre l'ereditarietà è potente, non è sempre la soluzione migliore. La composizione (includere un oggetto di una classe come membro di un'altra classe) è spesso preferibile quando la relazione non è veramente "è un" ma piuttosto "ha un".

```cpp
// Ereditarietà ("è un")
class Veicolo {
public:
    void muovi() { /* ... */ }
};

class Auto : public Veicolo {
    // Un'auto è un veicolo
};

// Composizione ("ha un")
class Motore {
public:
    void avvia() { /* ... */ }
};

class Auto {
private:
    Motore motore; // Un'auto ha un motore
public:
    void avviaMotore() {
        motore.avvia();
    }
};
```

## Best Practices per l'Ereditarietà

1. **Preferisci la composizione all'ereditarietà** quando possibile.
2. **Usa l'ereditarietà pubblica** per modellare relazioni "è un".
3. **Evita l'ereditarietà multipla** a meno che non sia assolutamente necessaria.
4. **Usa l'ereditarietà virtuale** quando utilizzi l'ereditarietà multipla con una base comune.
5. **Dichiara i distruttori virtuali** nelle classi base se prevedi che verranno ereditate.
6. **Non abusare dell'ereditarietà** per il riutilizzo del codice; usa la composizione invece.

## Domande di Autovalutazione

1. Quali sono i diversi tipi di ereditarietà supportati in C++?
2. Cos'è il problema del diamante e come si risolve?
3. Qual è la differenza tra ereditarietà pubblica, protetta e privata?
4. In quale ordine vengono chiamati i costruttori e i distruttori in una gerarchia di classi?
5. Quando dovresti preferire la composizione all'ereditarietà?

## Esercizi Proposti

1. Implementa una gerarchia di classi per un sistema di forme geometriche, utilizzando l'ereditarietà appropriata.
2. Crea un esempio che dimostri il problema del diamante e risolvi il problema usando l'ereditarietà virtuale.
3. Progetta un sistema di veicoli che utilizzi sia l'ereditarietà che la composizione in modo appropriato.
4. Implementa una classe base con un distruttore virtuale e dimostra perché è importante quando si lavora con il polimorfismo.
5. Crea una gerarchia di classi che utilizzi diversi livelli di controllo dell'accesso (public, protected, private) e dimostra come influenzano l'accessibilità dei membri nelle classi derivate.