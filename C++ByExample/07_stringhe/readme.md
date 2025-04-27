# Esercitazione 07: Stringhe C-style e `std::string`

## Obiettivo

L'obiettivo di questa esercitazione è comprendere i due principali modi di gestire le stringhe in C++: le stringhe in stile C (array di caratteri) e la classe `std::string` della libreria standard. Imparerai a dichiarare, inizializzare e manipolare entrambi i tipi di stringhe.

## Descrizione

Scrivi un programma C++ che:
1. Dichiara e inizializza una stringa in stile C e una `std::string`.
2. Mostra la lunghezza di entrambe le stringhe.
3. Concatena altre stringhe ad entrambe.
4. Estrae una sottostringa da entrambe.
5. Confronta due stringhe utilizzando entrambi gli approcci.

## Argomenti Teorici Correlati

Per completare questa esercitazione, è utile comprendere i seguenti concetti:

1. [Introduzione alle Stringhe in C++](teoria/01_introduzione_stringhe.md)
2. [Stringhe in Stile C](teoria/02_stringhe_c_style.md)
3. [La Classe `std::string`](teoria/03_std_string.md)
4. [Operazioni Comuni sulle Stringhe](teoria/04_operazioni_comuni.md)
5. [Confronto tra Stringhe C-style e `std::string`](teoria/05_confronto_approcci.md)

## Codice Soluzione (Esempio)

```cpp
#include <iostream>
#include <string>   // Per std::string
#include <cstring>  // Per funzioni di manipolazione stringhe C-style

int main() {
    // 1. Dichiarazione e inizializzazione
    char stringaC[50] = "Hello";  // Stringa in stile C
    std::string stringaCpp = "Hello";  // std::string
    
    // 2. Mostra la lunghezza
    std::cout << "Lunghezza stringaC: " << strlen(stringaC) << std::endl;
    std::cout << "Lunghezza stringaCpp: " << stringaCpp.length() << std::endl;
    
    // 3. Concatenazione
    strcat(stringaC, ", World!");  // Per stringhe C-style
    stringaCpp += ", World!";      // Per std::string
    
    std::cout << "\nDopo la concatenazione:" << std::endl;
    std::cout << "stringaC: " << stringaC << std::endl;
    std::cout << "stringaCpp: " << stringaCpp << std::endl;
    
    // 4. Estrazione di sottostringhe
    char sottoStringaC[10];
    strncpy(sottoStringaC, stringaC + 7, 5);  // Copia 5 caratteri a partire dall'indice 7
    sottoStringaC[5] = '\0';  // Aggiungi manualmente il terminatore
    
    std::string sottoStringaCpp = stringaCpp.substr(7, 5);  // Estrae 5 caratteri a partire dall'indice 7
    
    std::cout << "\nSottostringhe:" << std::endl;
    std::cout << "sottoStringaC: " << sottoStringaC << std::endl;
    std::cout << "sottoStringaCpp: " << sottoStringaCpp << std::endl;
    
    // 5. Confronto di stringhe
    char stringaC2[50] = "Hello, World!";
    std::string stringaCpp2 = "Hello, World!";
    
    std::cout << "\nConfronto di stringhe:" << std::endl;
    
    // Confronto C-style
    if (strcmp(stringaC, stringaC2) == 0) {
        std::cout << "Le stringhe C-style sono uguali" << std::endl;
    } else {
        std::cout << "Le stringhe C-style sono diverse" << std::endl;
    }
    
    // Confronto std::string
    if (stringaCpp == stringaCpp2) {
        std::cout << "Le stringhe std::string sono uguali" << std::endl;
    } else {
        std::cout << "Le stringhe std::string sono diverse" << std::endl;
    }
    
    return 0;
}
```

## Esercizi Proposti

1. **Ricerca di Sottostringhe**: Implementa una funzione che cerca una sottostringa all'interno di una stringa e restituisce la posizione della prima occorrenza (o -1 se non trovata), sia per stringhe C-style che per `std::string`.
2. **Conversione Maiuscolo/Minuscolo**: Scrivi funzioni che convertono una stringa in maiuscolo o minuscolo, implementando entrambe le versioni.
3. **Inversione di Stringhe**: Implementa una funzione che inverte una stringa, sia per stringhe C-style che per `std::string`.
4. **Conteggio Caratteri**: Scrivi una funzione che conta quante volte un determinato carattere appare in una stringa.

## Domande di Auto-valutazione

1. Quali sono le principali differenze tra stringhe C-style e `std::string`?
2. Perché è importante il carattere null terminatore ('\0') nelle stringhe C-style?
3. Quali sono i vantaggi dell'utilizzo di `std::string` rispetto alle stringhe C-style?
4. Come si gestisce la memoria quando si lavora con stringhe C-style? E con `std::string`?
5. In quali situazioni potrebbe essere preferibile utilizzare stringhe C-style invece di `std::string`?