# Esercitazione 11: Puntatori e Aritmetica dei Puntatori

## Obiettivo

L'obiettivo di questa esercitazione è comprendere il concetto di puntatori in C++, come dichiararli, inizializzarli e utilizzarli. Imparerai anche l'aritmetica dei puntatori e come manipolare la memoria attraverso i puntatori.

## Descrizione

Scrivi un programma C++ che:
1. Dichiara e inizializza variabili di diversi tipi (int, double, char).
2. Crea puntatori a queste variabili e visualizza i loro indirizzi e valori.
3. Modifica i valori delle variabili attraverso i puntatori.
4. Dimostra l'aritmetica dei puntatori con un array, accedendo agli elementi tramite incremento del puntatore.
5. Implementa una funzione che scambia due valori utilizzando puntatori (swap).

## Argomenti Teorici Correlati

Per completare questa esercitazione, è utile comprendere i seguenti concetti:

1. [Introduzione ai Puntatori](teoria/01_introduzione_puntatori.md)
2. [Dichiarazione e Inizializzazione dei Puntatori](teoria/02_dichiarazione_inizializzazione.md)
3. [Dereferenziazione e Operatore di Indirizzo](teoria/03_dereferenziazione_indirizzo.md)
4. [Aritmetica dei Puntatori](teoria/04_aritmetica_puntatori.md)
5. [Puntatori e Array](teoria/05_puntatori_array.md)
6. [Puntatori e Funzioni](teoria/06_puntatori_funzioni.md)

## Codice Soluzione (Esempio)

```cpp
#include <iostream>

// Funzione per scambiare due valori usando puntatori
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    // 1. Dichiarazione e inizializzazione di variabili
    int numero = 42;
    double decimale = 3.14;
    char carattere = 'A';
    
    // 2. Creazione di puntatori e visualizzazione di indirizzi e valori
    int* ptrNumero = &numero;
    double* ptrDecimale = &decimale;
    char* ptrCarattere = &carattere;
    
    std::cout << "Variabile numero: valore = " << numero << ", indirizzo = " << &numero << std::endl;
    std::cout << "Puntatore ptrNumero: valore puntato = " << *ptrNumero << ", indirizzo memorizzato = " << ptrNumero << std::endl;
    
    std::cout << "\nVariabile decimale: valore = " << decimale << ", indirizzo = " << &decimale << std::endl;
    std::cout << "Puntatore ptrDecimale: valore puntato = " << *ptrDecimale << ", indirizzo memorizzato = " << ptrDecimale << std::endl;
    
    std::cout << "\nVariabile carattere: valore = " << carattere << ", indirizzo = " << static_cast<void*>(&carattere) << std::endl;
    std::cout << "Puntatore ptrCarattere: valore puntato = " << *ptrCarattere << ", indirizzo memorizzato = " << static_cast<void*>(ptrCarattere) << std::endl;
    
    // 3. Modifica dei valori attraverso i puntatori
    *ptrNumero = 100;
    *ptrDecimale = 2.71828;
    *ptrCarattere = 'Z';
    
    std::cout << "\nDopo la modifica tramite puntatori:" << std::endl;
    std::cout << "numero = " << numero << std::endl;
    std::cout << "decimale = " << decimale << std::endl;
    std::cout << "carattere = " << carattere << std::endl;
    
    // 4. Aritmetica dei puntatori con un array
    int array[5] = {10, 20, 30, 40, 50};
    int* ptrArray = array; // Il nome dell'array è già un puntatore al primo elemento
    
    std::cout << "\nAccesso agli elementi dell'array tramite aritmetica dei puntatori:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << "array[" << i << "] = " << *(ptrArray + i) << std::endl;
    }
    
    // 5. Utilizzo della funzione swap
    int a = 5, b = 10;
    std::cout << "\nPrima dello swap: a = " << a << ", b = " << b << std::endl;
    swap(&a, &b);
    std::cout << "Dopo lo swap: a = " << a << ", b = " << b << std::endl;
    
    return 0;
}
```

## Esercizi Proposti

1. Modifica il programma per utilizzare puntatori a `const` e spiega la differenza tra un puntatore costante e un puntatore a un valore costante.
2. Implementa una funzione che accetta un array e la sua dimensione come parametri e restituisce la somma degli elementi utilizzando l'aritmetica dei puntatori.
3. Crea un programma che utilizza un puntatore a puntatore (doppio puntatore) e dimostra il suo utilizzo.
4. Implementa una funzione che ordina un array di interi utilizzando puntatori.