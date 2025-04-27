# Introduzione ai Template in C++

In questa guida, esploreremo i template in C++, un potente strumento per la programmazione generica che permette di scrivere codice indipendente dal tipo di dato.

## Cos'è la Programmazione Generica?

La programmazione generica è un paradigma che consente di scrivere algoritmi e strutture dati in modo indipendente dal tipo di dato su cui operano. In C++, questo paradigma è implementato principalmente attraverso i template.

## Cos'è un Template?

Un template in C++ è un meccanismo che permette di definire funzioni e classi parametrizzate rispetto a uno o più tipi di dati. In altre parole, un template è uno "stampo" che il compilatore utilizza per generare automaticamente diverse versioni di una funzione o classe per diversi tipi di dati.

## Perché Usare i Template?

I template offrono numerosi vantaggi:

1. **Riutilizzo del codice**: Scrivi una volta, usa con molti tipi diversi
2. **Type safety**: Il controllo dei tipi avviene durante la compilazione
3. **Efficienza**: Il codice generato è specifico per ogni tipo, senza overhead di runtime
4. **Flessibilità**: Possono adattarsi a tipi di dati non ancora definiti

## Tipi di Template

In C++ esistono principalmente due tipi di template:

1. **Template di funzione**: Permettono di definire funzioni generiche
2. **Template di classe**: Permettono di definire classi generiche

## Sintassi di Base

### Template di Funzione

```cpp
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}
```

### Template di Classe

```cpp
template <typename T>
class Contenitore {
private:
    T elemento;
    
public:
    Contenitore(T val) : elemento(val) {}
    T getValore() const { return elemento; }
    void setValore(T val) { elemento = val; }
};
```

## Istanziazione dei Template

Quando si utilizza un template, il compilatore genera automaticamente una versione specifica per il tipo di dato utilizzato. Questo processo è chiamato "istanziazione del template".

```cpp
// Istanziazione implicita
int a = 5, b = 7;
int m = massimo(a, b);  // Il compilatore genera massimo<int>

double x = 3.14, y = 2.71;
double d = massimo(x, y);  // Il compilatore genera massimo<double>

// Istanziazione esplicita
char c = massimo<char>('A', 'Z');

// Istanziazione di template di classe
Contenitore<int> ci(42);
Contenitore<std::string> cs("Hello");
```

## Differenze con le Macro

I template potrebbero sembrare simili alle macro del preprocessore, ma offrono vantaggi significativi:

1. **Type safety**: I template sono type-safe, le macro no
2. **Debugging**: I template sono più facili da debuggare
3. **Flessibilità**: I template possono utilizzare funzionalità del linguaggio come l'overloading

## Esempio Completo

```cpp
#include <iostream>
#include <string>

// Template di funzione
template <typename T>
T massimo(T a, T b) {
    std::cout << "Confronto tra valori di tipo generico" << std::endl;
    return (a > b) ? a : b;
}

// Template di classe
template <typename T>
class Coppia {
private:
    T primo;
    T secondo;
    
public:
    Coppia(T a, T b) : primo(a), secondo(b) {}
    
    T getPrimo() const { return primo; }
    T getSecondo() const { return secondo; }
    
    T getMaggiore() const {
        return massimo(primo, secondo);
    }
    
    void stampa() const {
        std::cout << "Coppia: " << primo << ", " << secondo << std::endl;
    }
};

int main() {
    // Utilizzo del template di funzione
    int a = 5, b = 7;
    std::cout << "Massimo tra " << a << " e " << b << ": " << massimo(a, b) << std::endl;
    
    double x = 3.14, y = 2.71;
    std::cout << "Massimo tra " << x << " e " << y << ": " << massimo(x, y) << std::endl;
    
    std::string s1 = "Hello", s2 = "World";
    std::cout << "Massimo tra " << s1 << " e " << s2 << ": " << massimo(s1, s2) << std::endl;
    
    // Utilizzo del template di classe
    Coppia<int> ci(10, 20);
    ci.stampa();
    std::cout << "Il maggiore è: " << ci.getMaggiore() << std::endl;
    
    Coppia<std::string> cs("Apple", "Banana");
    cs.stampa();
    std::cout << "Il maggiore è: " << cs.getMaggiore() << std::endl;
    
    return 0;
}
```

## Limitazioni dei Template

Nonostante i loro vantaggi, i template presentano alcune limitazioni:

1. **Messaggi di errore complessi**: Gli errori nei template possono generare messaggi di errore difficili da interpretare
2. **Aumento delle dimensioni del codice**: Ogni istanziazione genera codice separato (code bloat)
3. **Tempo di compilazione**: L'uso intensivo di template può aumentare il tempo di compilazione
4. **Separazione interfaccia/implementazione**: È più difficile separare l'interfaccia dall'implementazione

## Evoluzione dei Template in C++

I template sono stati introdotti in C++ nel 1991 e hanno subito numerose evoluzioni:

- C++98/03: Template di base
- C++11: Template variadic, alias di template, template di template come parametri
- C++14: Template variadic migliorati
- C++17: Deduzione dei parametri di template per le classi
- C++20: Concetti (concepts) per vincolare i parametri di template

## Domande di Autovalutazione

1. Qual è la differenza principale tra un template di funzione e un template di classe?
2. Come avviene l'istanziazione di un template? Quando viene generato il codice effettivo?
3. Quali sono i vantaggi dei template rispetto alle macro del preprocessore?
4. Quali sono le principali limitazioni dei template in C++?
5. Cosa si intende per "programmazione generica" e come i template la supportano?

## Esercizi Proposti

1. Crea un template di funzione `scambia` che scambi i valori di due variabili di qualsiasi tipo.
2. Implementa un template di funzione `trovaMinimo` che trovi il valore minimo in un array di qualsiasi tipo.
3. Crea un template di classe `Pila` che implementi una struttura dati stack (LIFO) per qualsiasi tipo di dato.
4. Implementa un template di classe `Coppia` che possa contenere due valori di tipi diversi (simile a `std::pair`).
5. Crea un template di funzione `stampaArray` che stampi tutti gli elementi di un array di qualsiasi tipo.

## Prossimo Argomento

Nel prossimo argomento, approfondiremo i template di funzione in C++, esplorando caratteristiche avanzate come la deduzione dei tipi, l'overloading e la specializzazione.