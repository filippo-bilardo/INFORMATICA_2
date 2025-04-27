# Costruttori e Distruttori in C++

In questa guida, esploreremo i costruttori e i distruttori, componenti fondamentali per la gestione del ciclo di vita degli oggetti nelle classi C++.

## Costruttori

I costruttori sono funzioni membro speciali che vengono chiamate automaticamente quando viene creato un oggetto di una classe. Il loro scopo principale è inizializzare i membri dati dell'oggetto.

### Caratteristiche dei Costruttori

- Hanno lo stesso nome della classe
- Non hanno tipo di ritorno (nemmeno void)
- Possono essere sovraccaricati (overloaded)
- Possono accettare parametri
- Vengono chiamati automaticamente quando un oggetto viene creato

### Tipi di Costruttori

#### 1. Costruttore di Default

Un costruttore senza parametri o con tutti i parametri con valori predefiniti.

```cpp
class Punto {
private:
    int x, y;
    
public:
    // Costruttore di default
    Punto() {
        x = 0;
        y = 0;
    }
};
```

Se non si definisce alcun costruttore, il compilatore genera automaticamente un costruttore di default che non fa nulla (non inizializza i membri).

#### 2. Costruttore Parametrizzato

Un costruttore che accetta uno o più parametri.

```cpp
class Punto {
private:
    int x, y;
    
public:
    // Costruttore parametrizzato
    Punto(int xVal, int yVal) {
        x = xVal;
        y = yVal;
    }
};
```

#### 3. Costruttore di Copia

Un costruttore che crea un nuovo oggetto come copia di un oggetto esistente.

```cpp
class Punto {
private:
    int x, y;
    
public:
    // Costruttore parametrizzato
    Punto(int xVal, int yVal) {
        x = xVal;
        y = yVal;
    }
    
    // Costruttore di copia
    Punto(const Punto &p) {
        x = p.x;
        y = p.y;
    }
};
```

Se non si definisce un costruttore di copia, il compilatore ne genera uno che esegue una copia membro per membro (shallow copy).

### Lista di Inizializzazione

Una sintassi alternativa e spesso più efficiente per inizializzare i membri è la lista di inizializzazione:

```cpp
class Persona {
private:
    std::string nome;
    int età;
    
public:
    // Costruttore con lista di inizializzazione
    Persona(std::string n, int e) : nome(n), età(e) {
        // Il corpo può essere vuoto o contenere codice aggiuntivo
    }
};
```

Vantaggi della lista di inizializzazione:
- Più efficiente per i tipi di dati complessi
- Necessaria per inizializzare membri costanti e riferimenti
- Rispetta l'ordine di dichiarazione dei membri

## Distruttori

I distruttori sono funzioni membro speciali che vengono chiamate automaticamente quando un oggetto viene distrutto (esce dallo scope o viene eliminato con delete).

### Caratteristiche dei Distruttori

- Hanno lo stesso nome della classe preceduto da una tilde (~)
- Non hanno parametri
- Non hanno tipo di ritorno
- Non possono essere sovraccaricati (una classe ha un solo distruttore)
- Vengono chiamati automaticamente quando un oggetto viene distrutto

```cpp
class Risorsa {
private:
    int* dati;
    
public:
    // Costruttore
    Risorsa() {
        dati = new int[100];  // Allocazione di memoria
        std::cout << "Memoria allocata" << std::endl;
    }
    
    // Distruttore
    ~Risorsa() {
        delete[] dati;  // Deallocazione di memoria
        std::cout << "Memoria deallocata" << std::endl;
    }
};
```

### Importanza dei Distruttori

I distruttori sono cruciali per:
- Prevenire memory leak rilasciando memoria allocata dinamicamente
- Liberare altre risorse (file, connessioni di rete, ecc.)
- Eseguire operazioni di pulizia necessarie

## RAII (Resource Acquisition Is Initialization)

RAII è un pattern di programmazione in C++ che lega il ciclo di vita delle risorse al ciclo di vita degli oggetti:

1. Le risorse vengono acquisite durante l'inizializzazione dell'oggetto (nel costruttore)
2. Le risorse vengono rilasciate durante la distruzione dell'oggetto (nel distruttore)

Questo pattern garantisce che le risorse vengano sempre rilasciate correttamente, anche in caso di eccezioni.

```cpp
class FileHandler {
private:
    std::FILE* file;
    
public:
    // Costruttore: acquisisce la risorsa
    FileHandler(const char* filename, const char* mode) {
        file = std::fopen(filename, mode);
        if (!file) {
            throw std::runtime_error("Impossibile aprire il file");
        }
    }
    
    // Distruttore: rilascia la risorsa
    ~FileHandler() {
        if (file) {
            std::fclose(file);
        }
    }
    
    // Metodo per scrivere nel file
    void write(const char* text) {
        if (file) {
            std::fputs(text, file);
        }
    }
};
```

## Costruttori Speciali in C++11 e Successivi

### Costruttore di Spostamento (Move Constructor)

Introdotto in C++11, permette di "spostare" le risorse da un oggetto a un altro invece di copiarle, migliorando l'efficienza.

```cpp
class Buffer {
private:
    int* data;
    size_t size;
    
public:
    // Costruttore normale
    Buffer(size_t s) : size(s) {
        data = new int[size];
    }
    
    // Costruttore di copia
    Buffer(const Buffer& other) : size(other.size) {
        data = new int[size];
        std::copy(other.data, other.data + size, data);
    }
    
    // Costruttore di spostamento
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    
    // Distruttore
    ~Buffer() {
        delete[] data;
    }
};
```

### Delegating Constructors

Permette a un costruttore di chiamare un altro costruttore della stessa classe.

```cpp
class Persona {
private:
    std::string nome;
    int età;
    std::string indirizzo;
    
public:
    // Costruttore principale
    Persona(std::string n, int e, std::string i) : nome(n), età(e), indirizzo(i) {}
    
    // Costruttore che delega al costruttore principale
    Persona(std::string n, int e) : Persona(n, e, "Indirizzo sconosciuto") {}
    
    // Altro costruttore che delega
    Persona() : Persona("Sconosciuto", 0) {}
};
```

## Esempio Completo

```cpp
#include <iostream>
#include <string>

class Automobile {
private:
    std::string marca;
    std::string modello;
    int anno;
    double* chilometraggio;  // Puntatore per dimostrare la gestione della memoria
    
public:
    // Costruttore di default
    Automobile() : marca("Sconosciuta"), modello("Sconosciuto"), anno(0) {
        chilometraggio = new double(0.0);
        std::cout << "Costruttore di default chiamato" << std::endl;
    }
    
    // Costruttore parametrizzato
    Automobile(std::string m, std::string mod, int a, double km) 
        : marca(m), modello(mod), anno(a) {
        chilometraggio = new double(km);
        std::cout << "Costruttore parametrizzato chiamato" << std::endl;
    }
    
    // Costruttore di copia
    Automobile(const Automobile& other) 
        : marca(other.marca), modello(other.modello), anno(other.anno) {
        chilometraggio = new double(*other.chilometraggio);
        std::cout << "Costruttore di copia chiamato" << std::endl;
    }
    
    // Distruttore
    ~Automobile() {
        delete chilometraggio;
        std::cout << "Distruttore chiamato per " << marca << " " << modello << std::endl;
    }
    
    // Metodi
    void mostraInfo() const {
        std::cout << "Marca: " << marca << std::endl;
        std::cout << "Modello: " << modello << std::endl;
        std::cout << "Anno: " << anno << std::endl;
        std::cout << "Chilometraggio: " << *chilometraggio << " km" << std::endl;
    }
    
    void aggiornaChilometraggio(double nuovoKm) {
        *chilometraggio = nuovoKm;
    }
};

int main() {
    // Utilizzo del costruttore di default
    std::cout << "Creazione auto1 con costruttore di default:" << std::endl;
    Automobile auto1;
    auto1.mostraInfo();
    std::cout << std::endl;
    
    // Utilizzo del costruttore parametrizzato
    std::cout << "Creazione auto2 con costruttore parametrizzato:" << std::endl;
    Automobile auto2("Fiat", "Panda", 2020, 15000.5);
    auto2.mostraInfo();
    std::cout << std::endl;
    
    // Utilizzo del costruttore di copia
    std::cout << "Creazione auto3 come copia di auto2:" << std::endl;
    Automobile auto3 = auto2;  // Chiamata al costruttore di copia
    auto3.mostraInfo();
    std::cout << std::endl;
    
    // Modifica di auto3 per dimostrare che è una copia indipendente
    std::cout << "Modifica del chilometraggio di auto3:" << std::endl;
    auto3.aggiornaChilometraggio(20000.0);
    std::cout << "Auto2 dopo la modifica di auto3:" << std::endl;
    auto2.mostraInfo();
    std::cout << "Auto3 dopo la modifica:" << std::endl;
    auto3.mostraInfo();
    std::cout << std::endl;
    
    // I distruttori verranno chiamati automaticamente alla fine del main
    std::cout << "Fine del programma, i distruttori verranno chiamati:" << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono le differenze tra un costruttore di default e un costruttore parametrizzato?
2. Perché è importante definire un costruttore di copia personalizzato quando la classe contiene puntatori?
3. Qual è lo scopo principale di un distruttore e quando è necessario definirne uno personalizzato?
4. Cosa significa RAII e perché è un pattern importante in C++?
5. Quali sono i vantaggi dell'utilizzo della lista di inizializzazione nei costruttori?

## Esercizi Proposti

1. Crea una classe `Stringa` che gestisca dinamicamente una stringa di caratteri, implementando costruttore di default, parametrizzato, di copia e distruttore.
2. Implementa una classe `Matrice` che allochi dinamicamente una matrice bidimensionale nel costruttore e la deallochi nel distruttore.
3. Crea una classe `GestoreRisorse` che implementi il pattern RAII per gestire una risorsa esterna (ad esempio, un file).
4. Modifica la classe `Automobile` dell'esempio per includere un costruttore di spostamento e dimostrarne l'utilizzo.

## Prossimo Argomento

Nel prossimo argomento, esploreremo l'overloading degli operatori in C++, che permette di definire comportamenti personalizzati per gli operatori standard quando applicati a oggetti di classi definite dall'utente.