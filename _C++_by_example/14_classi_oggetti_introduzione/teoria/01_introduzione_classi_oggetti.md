# Introduzione alle Classi e agli Oggetti in C++

In questa guida, esploreremo i concetti fondamentali della programmazione orientata agli oggetti (OOP) in C++, concentrandoci su classi e oggetti.

## Cos'è la Programmazione Orientata agli Oggetti?

La programmazione orientata agli oggetti è un paradigma di programmazione che utilizza "oggetti" per modellare dati e comportamenti. Gli oggetti sono istanze di "classi", che possono essere viste come progetti o modelli.

I principi fondamentali dell'OOP sono:

1. **Incapsulamento**: nascondere i dettagli implementativi e mostrare solo le funzionalità necessarie
2. **Ereditarietà**: creare nuove classi basate su classi esistenti
3. **Polimorfismo**: utilizzare un'interfaccia per rappresentare diversi tipi di entità
4. **Astrazione**: rappresentare concetti essenziali senza includere dettagli di background

## Classi in C++

Una classe in C++ è un tipo di dato definito dall'utente che ha membri dati (variabili) e funzioni membro (metodi). È il progetto per creare oggetti.

### Sintassi di Base

```cpp
class NomeClasse {
    // Sezione privata (default)
    int variabilePrivata;  // Accessibile solo all'interno della classe
    
 public:  // Sezione pubblica
    int variabilePubblica;  // Accessibile da qualsiasi parte del programma
    
    // Dichiarazione di un metodo
    void metodo();
    
 private:  // Sezione privata esplicita
    int altraVariabilePrivata;
};
```

### Definizione dei Metodi

I metodi possono essere definiti all'interno o all'esterno della classe:

```cpp
// Definizione all'interno della classe
class Esempio {
public:
    void metodoInterno() {
        // Implementazione direttamente qui
        std::cout << "Metodo definito all'interno" << std::endl;
    }
};

// Definizione all'esterno della classe
class Esempio2 {
public:
    void metodoEsterno();  // Solo dichiarazione
};

// Definizione del metodo usando l'operatore di risoluzione di ambito (::)
void Esempio2::metodoEsterno() {
    std::cout << "Metodo definito all'esterno" << std::endl;
}
```

## Oggetti in C++

Un oggetto è un'istanza di una classe. Quando si definisce una classe, si definisce un tipo di dato; quando si crea un oggetto, si alloca memoria per quel tipo di dato.

### Creazione di Oggetti

```cpp
// Creazione di un oggetto sullo stack
NomeClasse oggetto1;

// Creazione di un oggetto sull'heap (memoria dinamica)
NomeClasse* oggetto2 = new NomeClasse();
// Ricordarsi di deallocare la memoria
delete oggetto2;
```

### Accesso ai Membri

```cpp
// Per oggetti sullo stack
oggetto1.variabilePubblica = 10;
oggetto1.metodo();

// Per oggetti sull'heap
oggetto2->variabilePubblica = 20;
oggetto2->metodo();
```

## Costruttori e Distruttori

I costruttori sono funzioni speciali che vengono chiamate automaticamente quando viene creato un oggetto. I distruttori sono funzioni speciali chiamate quando un oggetto viene distrutto.

### Costruttori

```cpp
class Persona {
private:
    std::string nome;
    int età;
    
public:
    // Costruttore di default (senza parametri)
    Persona() {
        nome = "Sconosciuto";
        età = 0;
    }
    
    // Costruttore parametrizzato
    Persona(std::string n, int e) {
        nome = n;
        età = e;
    }
    
    // Costruttore di copia
    Persona(const Persona &p) {
        nome = p.nome;
        età = p.età;
    }
};
```

### Distruttori

```cpp
class Risorsa {
private:
    int* dati;
    
public:
    // Costruttore
    Risorsa() {
        dati = new int[100];  // Allocazione di memoria
    }
    
    // Distruttore
    ~Risorsa() {
        delete[] dati;  // Deallocazione di memoria
    }
};
```

## Esempio Completo

```cpp
#include <iostream>
#include <string>

class Studente {
private:
    std::string nome;
    int matricola;
    float media;
    
public:
    // Costruttore
    Studente(std::string n, int m) {
        nome = n;
        matricola = m;
        media = 0.0;
    }
    
    // Metodi
    void aggiungiVoto(float voto) {
        // Questo è solo un esempio semplificato
        media = (media + voto) / 2.0;
    }
    
    void mostraInfo() {
        std::cout << "Nome: " << nome << std::endl;
        std::cout << "Matricola: " << matricola << std::endl;
        std::cout << "Media: " << media << std::endl;
    }
};

int main() {
    // Creazione di un oggetto Studente
    Studente s1("Mario Rossi", 12345);
    
    // Utilizzo dei metodi
    s1.aggiungiVoto(28.5);
    s1.aggiungiVoto(30.0);
    
    // Visualizzazione delle informazioni
    s1.mostraInfo();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i quattro principi fondamentali della programmazione orientata agli oggetti?
2. Qual è la differenza tra una classe e un oggetto in C++?
3. A cosa servono i costruttori e i distruttori?
4. Come si può accedere ai membri di un oggetto creato dinamicamente (sull'heap)?
5. Qual è la differenza tra membri pubblici e privati di una classe?

## Esercizi Proposti

1. Crea una classe `Rettangolo` con attributi `lunghezza` e `larghezza` e metodi per calcolare area e perimetro.
2. Implementa una classe `ContoBancario` con metodi per depositare, prelevare e visualizzare il saldo.
3. Crea una classe `Libro` con attributi come titolo, autore e anno di pubblicazione, e metodi per visualizzare le informazioni e modificare i dati.
4. Implementa una classe `Orologio` che tenga traccia dell'ora corrente e fornisca metodi per avanzare di un secondo, un minuto o un'ora.

## Prossimo Argomento

Nel prossimo argomento, approfondiremo i concetti di incapsulamento e accesso ai membri di una classe in C++.