# Prototipi di Funzione

In questa guida, esploreremo in dettaglio i prototipi di funzione in C++, il loro scopo e come utilizzarli correttamente.

## Cos'è un Prototipo di Funzione?

Un prototipo di funzione (o dichiarazione di funzione) è una dichiarazione che informa il compilatore dell'esistenza di una funzione, specificando il suo nome, il tipo di ritorno e i parametri, senza fornire il corpo della funzione. È essenzialmente una "promessa" che la funzione sarà definita da qualche parte nel codice.

Sintassi di un prototipo:

```cpp
tipo_ritorno nome_funzione(tipo_parametro1 parametro1, tipo_parametro2 parametro2, ...);
```

Esempio:

```cpp
int calcolaArea(int lunghezza, int larghezza);  // Prototipo della funzione calcolaArea
```

## Perché Usare i Prototipi?

I prototipi di funzione sono fondamentali in C++ per diversi motivi:

### 1. Risoluzione delle Dipendenze Forward

I prototipi permettono di risolvere il problema delle dipendenze forward, ovvero quando una funzione viene chiamata prima di essere definita nel codice.

```cpp
#include <iostream>

// Senza questo prototipo, il compilatore genererebbe un errore
int somma(int a, int b);

int main() {
    int risultato = somma(5, 3);  // Chiamata a somma prima della sua definizione
    std::cout << "Risultato: " << risultato << std::endl;
    return 0;
}

// Definizione della funzione somma
int somma(int a, int b) {
    return a + b;
}
```

### 2. Risoluzione delle Dipendenze Circolari

I prototipi sono essenziali quando due funzioni si chiamano a vicenda (dipendenza circolare).

```cpp
#include <iostream>

// Prototipi necessari per risolvere la dipendenza circolare
bool èPari(int n);
bool èDispari(int n);

bool èPari(int n) {
    if (n == 0) return true;
    return èDispari(n - 1);
}

bool èDispari(int n) {
    if (n == 0) return false;
    return èPari(n - 1);
}

int main() {
    std::cout << "15 è pari? " << (èPari(15) ? "Sì" : "No") << std::endl;
    std::cout << "16 è pari? " << (èPari(16) ? "Sì" : "No") << std::endl;
    return 0;
}
```

### 3. Separazione dell'Interfaccia dall'Implementazione

I prototipi permettono di separare l'interfaccia (cosa fa una funzione) dall'implementazione (come lo fa), un principio fondamentale della programmazione modulare.

```cpp
// matematica.h - File header con prototipi (interfaccia)
#ifndef MATEMATICA_H
#define MATEMATICA_H

int somma(int a, int b);
int sottrazione(int a, int b);
int moltiplicazione(int a, int b);
float divisione(int a, int b);

#endif // MATEMATICA_H
```

```cpp
// matematica.cpp - File di implementazione con definizioni
#include "matematica.h"
#include <stdexcept>

int somma(int a, int b) {
    return a + b;
}

int sottrazione(int a, int b) {
    return a - b;
}

int moltiplicazione(int a, int b) {
    return a * b;
}

float divisione(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("Divisione per zero");
    }
    return static_cast<float>(a) / b;
}
```

### 4. Controllo dei Tipi

I prototipi permettono al compilatore di verificare che le chiamate alle funzioni siano corrette in termini di numero e tipo di parametri, anche prima di vedere la definizione completa della funzione.

```cpp
#include <iostream>

// Prototipo
double calcolaMedia(int a, int b);

int main() {
    double media = calcolaMedia(10, 20);  // OK
    // double errore = calcolaMedia(10);  // Errore: numero errato di argomenti
    // double errore2 = calcolaMedia("dieci", 20);  // Errore: tipo errato di argomenti
    std::cout << "Media: " << media << std::endl;
    return 0;
}

double calcolaMedia(int a, int b) {
    return (a + b) / 2.0;
}
```

## Caratteristiche dei Prototipi

### Nomi dei Parametri Opzionali

Nei prototipi, i nomi dei parametri sono opzionali. Il compilatore si preoccupa solo dei tipi dei parametri.

```cpp
// Tutti questi prototipi sono equivalenti
int somma(int a, int b);
int somma(int x, int y);
int somma(int, int);
```

### Coerenza con la Definizione

Il prototipo deve essere coerente con la definizione della funzione in termini di tipo di ritorno e tipi dei parametri.

```cpp
// Prototipo
int funzione(double x);

// Definizione - ERRORE: tipo di ritorno diverso dal prototipo
// double funzione(double x) {
//     return x * 2;
// }

// Definizione - ERRORE: tipo di parametro diverso dal prototipo
// int funzione(int x) {
//     return x * 2;
// }

// Definizione corretta
int funzione(double x) {
    return static_cast<int>(x * 2);
}
```

### Parametri di Default nei Prototipi

I valori di default per i parametri possono (e dovrebbero) essere specificati nel prototipo.

```cpp
// Prototipo con parametri di default
void stampaInfo(std::string nome, int età = 0, std::string città = "Non specificata");

int main() {
    stampaInfo("Mario");  // Usa i valori di default per età e città
    stampaInfo("Luigi", 25);  // Usa il valore di default per città
    stampaInfo("Giovanni", 30, "Roma");  // Non usa valori di default
    return 0;
}

// Definizione - non è necessario ripetere i valori di default
void stampaInfo(std::string nome, int età, std::string città) {
    std::cout << "Nome: " << nome << std::endl;
    std::cout << "Età: " << (età > 0 ? std::to_string(età) : "Non specificata") << std::endl;
    std::cout << "Città: " << città << std::endl;
}
```

## Best Practices

1. **Dichiara prima di usare**: Dichiara sempre le funzioni prima di utilizzarle, anche se la definizione appare prima dell'uso nel codice.

2. **Usa i file header**: Per progetti di grandi dimensioni, organizza i prototipi in file header (`.h`) e le definizioni in file di implementazione (`.cpp`).

3. **Documenta i prototipi**: Aggiungi commenti che descrivono lo scopo, i parametri e il valore di ritorno nei prototipi, non nelle definizioni.

   ```cpp
   /**
    * Calcola l'area di un rettangolo.
    * @param lunghezza La lunghezza del rettangolo.
    * @param larghezza La larghezza del rettangolo.
    * @return L'area del rettangolo (lunghezza * larghezza).
    */
   int calcolaArea(int lunghezza, int larghezza);
   ```

4. **Usa le guardie di inclusione**: Quando crei file header, usa sempre le guardie di inclusione (`#ifndef`, `#define`, `#endif`) per evitare inclusioni multiple.

5. **Mantieni coerenza**: Assicurati che il tipo di ritorno e i tipi dei parametri siano identici nella dichiarazione e nella definizione.

6. **Specifica i parametri di default solo nel prototipo**: Se una funzione ha parametri di default, specificali solo nel prototipo, non nella definizione.

## Conclusione

I prototipi di funzione sono uno strumento essenziale in C++ per la gestione delle dipendenze, la separazione dell'interfaccia dall'implementazione e il controllo dei tipi. Utilizzarli correttamente migliora la struttura, la leggibilità e la manutenibilità del codice, specialmente in progetti di grandi dimensioni con molte funzioni e file.