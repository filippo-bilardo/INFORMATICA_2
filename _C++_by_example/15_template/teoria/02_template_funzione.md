# Template di Funzione in C++

In questa guida, esploreremo in dettaglio i template di funzione in C++, un potente strumento per creare funzioni generiche che possono operare su diversi tipi di dati.

## Sintassi di Base

Un template di funzione si definisce utilizzando la parola chiave `template` seguita dai parametri di template tra parentesi angolari:

```cpp
template <typename T>
T funzione(T parametro) {
    // Corpo della funzione
    return parametro;
}
```

Le parole chiave `typename` e `class` sono equivalenti nel contesto dei template:

```cpp
template <class T>  // Equivalente a typename T
T funzione(T parametro) {
    return parametro;
}
```

## Deduzione dei Tipi

Una caratteristica potente dei template di funzione è la deduzione automatica dei tipi. Il compilatore può dedurre il tipo del parametro di template dagli argomenti passati alla funzione:

```cpp
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}

// Utilizzo
int a = 5, b = 7;
int m = massimo(a, b);  // T dedotto come int

double x = 3.14, y = 2.71;
double d = massimo(x, y);  // T dedotto come double
```

## Istanziazione Esplicita

È possibile specificare esplicitamente il tipo del parametro di template:

```cpp
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}

// Istanziazione esplicita
int risultato = massimo<int>(3, 4.5);  // 4.5 viene convertito in 4
```

## Template con Più Parametri di Tipo

Un template di funzione può avere più di un parametro di tipo:

```cpp
template <typename T, typename U>
auto somma(T a, U b) -> decltype(a + b) {
    return a + b;
}

// Utilizzo
int i = 5;
double d = 3.14;
auto risultato = somma(i, d);  // risultato è di tipo double
```

Nota l'uso di `auto` e `decltype` per dedurre automaticamente il tipo di ritorno (C++11).

## Overloading di Template di Funzione

È possibile definire più template di funzione con lo stesso nome ma con parametri diversi:

```cpp
// Template generico
template <typename T>
T massimo(T a, T b) {
    std::cout << "Template generico" << std::endl;
    return (a > b) ? a : b;
}

// Template specifico per puntatori
template <typename T>
T massimo(T* a, T* b) {
    std::cout << "Template per puntatori" << std::endl;
    return (*a > *b) ? *a : *b;
}

// Utilizzo
int x = 5, y = 7;
int m1 = massimo(x, y);  // Chiama il template generico

int* px = &x;
int* py = &y;
int m2 = massimo(px, py);  // Chiama il template per puntatori
```

## Specializzazione di Template di Funzione

È possibile fornire un'implementazione specializzata di un template di funzione per un tipo specifico:

```cpp
// Template generico
template <typename T>
void stampa(T valore) {
    std::cout << "Valore: " << valore << std::endl;
}

// Specializzazione per il tipo char*
template <>
void stampa<char*>(char* valore) {
    std::cout << "Stringa: " << valore << std::endl;
}

// Utilizzo
int i = 42;
stampa(i);  // Chiama il template generico

char* s = "Hello";
stampa(s);  // Chiama la specializzazione per char*
```

## Template di Funzione con Parametri Non-Tipo

I template di funzione possono avere anche parametri che non sono tipi, ma valori costanti:

```cpp
template <typename T, int N>
void stampaArray(T (&arr)[N]) {
    for (int i = 0; i < N; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

// Utilizzo
int numeri[5] = {1, 2, 3, 4, 5};
stampaArray(numeri);  // N dedotto come 5

char lettere[3] = {'a', 'b', 'c'};
stampaArray(lettere);  // N dedotto come 3
```

## Template di Funzione con Argomenti di Default

I parametri di template possono avere valori di default:

```cpp
template <typename T = int>
T valore_default() {
    return T();
}

// Utilizzo
auto v1 = valore_default<>();  // T è int (default)
auto v2 = valore_default<double>();  // T è double
```

## Template Variadic (C++11)

I template variadic permettono di definire funzioni con un numero variabile di argomenti:

```cpp
// Caso base per terminare la ricorsione
template <typename T>
T somma(T v) {
    return v;
}

// Template variadic
template <typename T, typename... Args>
T somma(T primo, Args... resto) {
    return primo + somma(resto...);
}

// Utilizzo
int risultato = somma(1, 2, 3, 4, 5);  // 15
double d = somma(1.1, 2.2, 3.3);  // 6.6
```

## Perfect Forwarding (C++11)

Il perfect forwarding permette di passare argomenti a una funzione preservando le loro caratteristiche di lvalue/rvalue:

```cpp
template <typename T, typename... Args>
auto crea(Args&&... args) -> T {
    return T(std::forward<Args>(args)...);
}

// Utilizzo
class Persona {
public:
    Persona(std::string nome, int eta) {
        std::cout << "Creata persona: " << nome << ", " << eta << " anni" << std::endl;
    }
};

Persona p = crea<Persona>("Mario", 30);
```

## Esempio Completo: Algoritmi Generici

```cpp
#include <iostream>
#include <vector>
#include <string>

// Template di funzione per trovare il valore massimo in un array
template <typename T>
T trovaMax(const T arr[], int dimensione) {
    if (dimensione <= 0) return T();
    
    T max = arr[0];
    for (int i = 1; i < dimensione; ++i) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Template di funzione per trovare il valore minimo in un array
template <typename T>
T trovaMin(const T arr[], int dimensione) {
    if (dimensione <= 0) return T();
    
    T min = arr[0];
    for (int i = 1; i < dimensione; ++i) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// Template di funzione per calcolare la media di un array
template <typename T>
double calcolaMedia(const T arr[], int dimensione) {
    if (dimensione <= 0) return 0.0;
    
    T somma = T();
    for (int i = 0; i < dimensione; ++i) {
        somma += arr[i];
    }
    return static_cast<double>(somma) / dimensione;
}

// Template di funzione per stampare un array
template <typename T>
void stampaArray(const T arr[], int dimensione) {
    std::cout << "[ ";
    for (int i = 0; i < dimensione; ++i) {
        std::cout << arr[i];
        if (i < dimensione - 1) std::cout << ", ";
    }
    std::cout << " ]" << std::endl;
}

// Template di funzione con più parametri di tipo
template <typename T, typename Predicate>
int contaSeVero(const T arr[], int dimensione, Predicate pred) {
    int contatore = 0;
    for (int i = 0; i < dimensione; ++i) {
        if (pred(arr[i])) {
            ++contatore;
        }
    }
    return contatore;
}

int main() {
    // Test con array di interi
    int numeri[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int dim_numeri = sizeof(numeri) / sizeof(numeri[0]);
    
    std::cout << "Array di numeri: ";
    stampaArray(numeri, dim_numeri);
    
    std::cout << "Massimo: " << trovaMax(numeri, dim_numeri) << std::endl;
    std::cout << "Minimo: " << trovaMin(numeri, dim_numeri) << std::endl;
    std::cout << "Media: " << calcolaMedia(numeri, dim_numeri) << std::endl;
    
    // Contare numeri pari
    int pari = contaSeVero(numeri, dim_numeri, [](int n) { return n % 2 == 0; });
    std::cout << "Numeri pari: " << pari << std::endl;
    
    // Test con array di double
    double valori[] = {3.14, 2.71, 1.41, 1.73, 2.0};
    int dim_valori = sizeof(valori) / sizeof(valori[0]);
    
    std::cout << "\nArray di valori: ";
    stampaArray(valori, dim_valori);
    
    std::cout << "Massimo: " << trovaMax(valori, dim_valori) << std::endl;
    std::cout << "Minimo: " << trovaMin(valori, dim_valori) << std::endl;
    std::cout << "Media: " << calcolaMedia(valori, dim_valori) << std::endl;
    
    // Contare valori maggiori di 2.0
    int maggioriDiDue = contaSeVero(valori, dim_valori, [](double v) { return v > 2.0; });
    std::cout << "Valori > 2.0: " << maggioriDiDue << std::endl;
    
    // Test con array di stringhe
    std::string parole[] = {"mela", "banana", "ciliegia", "datteri", "fico"};
    int dim_parole = sizeof(parole) / sizeof(parole[0]);
    
    std::cout << "\nArray di parole: ";
    stampaArray(parole, dim_parole);
    
    std::cout << "Massimo: " << trovaMax(parole, dim_parole) << std::endl;
    std::cout << "Minimo: " << trovaMin(parole, dim_parole) << std::endl;
    
    // Contare parole con lunghezza > 5
    int paroleLunghe = contaSeVero(parole, dim_parole, [](const std::string& s) { return s.length() > 5; });
    std::cout << "Parole con lunghezza > 5: " << paroleLunghe << std::endl;
    
    return 0;
}
```

## Best Practices per i Template di Funzione

1. **Usa vincoli appropriati**: Assicurati che i tipi utilizzati supportino le operazioni necessarie
2. **Fornisci specializzazioni quando necessario**: Per tipi che richiedono un trattamento speciale
3. **Usa nomi descrittivi per i parametri di template**: `typename KeyType` è più chiaro di `typename K`
4. **Documenta le assunzioni sui tipi**: Specifica quali operazioni devono supportare i tipi
5. **Evita l'uso eccessivo di template**: Possono rendere il codice più complesso e aumentare i tempi di compilazione

## Domande di Autovalutazione

1. Qual è la differenza tra `typename` e `class` nella dichiarazione di un template?
2. Come funziona la deduzione dei tipi nei template di funzione?
3. Quando è necessario specificare esplicitamente il tipo di un template di funzione?
4. Come si implementa una specializzazione di un template di funzione?
5. Cosa sono i template variadic e quando sono utili?

## Esercizi Proposti

1. Implementa un template di funzione `scambia` che scambi i valori di due variabili di qualsiasi tipo.
2. Crea un template di funzione `filtra` che, dato un array e un predicato, restituisca un nuovo array contenente solo gli elementi che soddisfano il predicato.
3. Implementa un template di funzione `trasforma` che applichi una funzione a ciascun elemento di un array e restituisca un nuovo array con i risultati.
4. Crea un template di funzione `riduci` che applichi un'operazione binaria a tutti gli elementi di un array per produrre un singolo valore (simile a `std::accumulate`).
5. Implementa un template di funzione `stampaMatrice` che stampi una matrice bidimensionale di qualsiasi tipo.

## Prossimo Argomento

Nel prossimo argomento, esploreremo i template di classe in C++, che permettono di creare strutture dati generiche riutilizzabili con diversi tipi di dati.