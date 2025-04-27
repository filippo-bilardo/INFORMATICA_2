# Struttura di Base di un Programma C++

In questa guida, esploreremo la struttura fondamentale di un programma C++ e i suoi componenti essenziali.

## Componenti Fondamentali

Un programma C++ base è composto da questi elementi:

### 1. Direttive del Preprocessore

Le direttive del preprocessore iniziano con il simbolo `#` e vengono elaborate prima della compilazione effettiva. La più comune è `#include`, che inserisce il contenuto di un file header nel programma.

```cpp
#include <iostream>  // Inclusione della libreria standard per input/output
```

### 2. Funzione `main()`

Ogni programma C++ deve avere una funzione `main()`. Questa è il punto di ingresso del programma, dove inizia l'esecuzione.

```cpp
int main() {
    // Corpo del programma
    return 0;  // Valore di ritorno che indica esecuzione completata con successo
}
```

La funzione `main()` può essere dichiarata in due modi:

```cpp
int main() { /* ... */ }  // Senza parametri
```

oppure

```cpp
int main(int argc, char* argv[]) { /* ... */ }  // Con parametri per argomenti da linea di comando
```

### 3. Corpo del Programma

Il corpo del programma contiene le istruzioni che vengono eseguite quando il programma viene avviato. Queste istruzioni sono racchiuse tra le parentesi graffe `{}` della funzione `main()`.

```cpp
int main() {
    std::cout << "Hello, World!" << std::endl;  // Istruzione che stampa "Hello, World!"
    return 0;  // Valore di ritorno
}
```

### 4. Commenti

I commenti sono note nel codice che vengono ignorate dal compilatore. Sono utili per documentare il codice.

```cpp
// Questo è un commento su una singola linea

/* Questo è un commento
   su più linee */
```

## Esempio Completo

Ecco un esempio completo di un programma C++ base:

```cpp
// Inclusione delle librerie necessarie
#include <iostream>

// Utilizzo del namespace std
using namespace std;

// Funzione principale
int main() {
    // Stampa un messaggio a schermo
    cout << "Hello, World!" << endl;
    
    // Termina il programma con successo
    return 0;
}
```

## Best Practices

1. **Indentazione e Formattazione**: Mantieni un'indentazione coerente per migliorare la leggibilità del codice.
2. **Commenti Utili**: Aggiungi commenti per spiegare il "perché" dietro il codice, non solo il "cosa".
3. **Nomi Significativi**: Usa nomi di variabili e funzioni che descrivono chiaramente il loro scopo.
4. **Gestione degli Errori**: Implementa una corretta gestione degli errori per rendere il programma robusto.

## Domande di Autovalutazione

1. Qual è la funzione obbligatoria in ogni programma C++?
2. Cosa rappresenta il valore di ritorno della funzione `main()`?
3. Quali sono i due tipi di commenti in C++ e come si scrivono?
4. Cosa fa la direttiva `#include`?

## Esercizi Proposti

1. Scrivi un programma C++ minimo che stampi il tuo nome a schermo.
2. Modifica il programma per accettare argomenti da linea di comando e stamparli.
3. Crea un programma che includa commenti esplicativi per ogni sua parte.
4. Scrivi un programma che utilizzi almeno tre diverse librerie standard.