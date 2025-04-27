# Esercitazione 06: Array Monodimensionali

## Obiettivo

L'obiettivo di questa esercitazione è comprendere il concetto di array monodimensionali in C++, imparare a dichiararli, inizializzarli e manipolarli attraverso operazioni comuni.

## Descrizione

Scrivi un programma C++ che:
1. Dichiara e inizializza un array di interi con almeno 5 elementi.
2. Stampa tutti gli elementi dell'array.
3. Calcola e stampa la somma di tutti gli elementi.
4. Trova e stampa il valore massimo e minimo nell'array.
5. Inverte l'ordine degli elementi nell'array e stampa il risultato.

## Argomenti Teorici Correlati

Per completare questa esercitazione, è utile comprendere i seguenti concetti:

1. [Introduzione agli Array](teoria/01_introduzione_array.md)
2. [Dichiarazione e Inizializzazione degli Array](teoria/02_dichiarazione_inizializzazione.md)
3. [Accesso agli Elementi](teoria/03_accesso_elementi.md)
4. [Operazioni Comuni sugli Array](teoria/04_operazioni_comuni.md)
5. [Limiti e Best Practices](teoria/05_limiti_best_practices.md)

## Codice Soluzione (Esempio)

```cpp
#include <iostream>

int main() {
    // 1. Dichiarazione e inizializzazione di un array
    int numeri[5] = {10, 45, 23, 7, 19};
    
    // 2. Stampa di tutti gli elementi
    std::cout << "Elementi dell'array:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << "numeri[" << i << "] = " << numeri[i] << std::endl;
    }
    
    // 3. Calcolo e stampa della somma
    int somma = 0;
    for (int i = 0; i < 5; i++) {
        somma += numeri[i];
    }
    std::cout << "\nLa somma degli elementi è: " << somma << std::endl;
    
    // 4. Trova e stampa il massimo e il minimo
    int massimo = numeri[0];
    int minimo = numeri[0];
    
    for (int i = 1; i < 5; i++) {
        if (numeri[i] > massimo) {
            massimo = numeri[i];
        }
        if (numeri[i] < minimo) {
            minimo = numeri[i];
        }
    }
    
    std::cout << "Il valore massimo è: " << massimo << std::endl;
    std::cout << "Il valore minimo è: " << minimo << std::endl;
    
    // 5. Inversione dell'array
    for (int i = 0; i < 5/2; i++) {
        int temp = numeri[i];
        numeri[i] = numeri[4-i];
        numeri[4-i] = temp;
    }
    
    std::cout << "\nArray invertito:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << "numeri[" << i << "] = " << numeri[i] << std::endl;
    }
    
    return 0;
}
```

## Esercizi Proposti

1. **Ricerca di un Elemento**: Modifica il programma per cercare un valore specifico nell'array e stampare la sua posizione (o un messaggio se non trovato).
2. **Eliminazione di un Elemento**: Implementa una funzione che elimina un elemento dall'array spostando tutti gli elementi successivi di una posizione indietro.
3. **Ordinamento**: Implementa un algoritmo di ordinamento semplice (come il Bubble Sort) per ordinare l'array in ordine crescente.
4. **Frequenza degli Elementi**: Conta quante volte ogni elemento appare nell'array.

## Domande di Auto-valutazione

1. Qual è la differenza tra un array e una variabile semplice?
2. Come si accede a un elemento specifico di un array?
3. Cosa succede se si tenta di accedere a un indice fuori dai limiti dell'array?
4. Come si può passare un array a una funzione in C++?
5. Quali sono i vantaggi e gli svantaggi degli array rispetto ad altre strutture dati?