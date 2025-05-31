# Definizione e Dichiarazione di Funzioni

In questa guida, esploreremo la differenza tra definizione e dichiarazione di funzioni in C++ e come utilizzarle correttamente.

## Dichiarazione di Funzioni

La dichiarazione di una funzione (o prototipo) informa il compilatore dell'esistenza di una funzione, specificando il suo nome, il tipo di ritorno e i parametri, senza fornire il corpo della funzione. È come un "annuncio" che dice: "Questa funzione esiste e sarà definita da qualche parte".

### Sintassi della Dichiarazione

```cpp
tipo_ritorno nome_funzione(tipo_parametro1 parametro1, tipo_parametro2 parametro2, ...);
```

Esempio:

```cpp
int somma(int a, int b);  // Dichiarazione della funzione somma
```

### Caratteristiche della Dichiarazione

1. **Termina con punto e virgola**: A differenza della definizione, la dichiarazione termina con un punto e virgola.
2. **Non contiene il corpo**: Non include le istruzioni che la funzione eseguirà.
3. **Può essere ripetuta**: La stessa funzione può essere dichiarata più volte (ma definita solo una volta).
4. **I nomi dei parametri sono opzionali**: Nella dichiarazione, i nomi dei parametri possono essere omessi.
   ```cpp
   int somma(int, int);  // Dichiarazione valida senza nomi dei parametri
   ```

## Definizione di Funzioni

La definizione di una funzione fornisce l'implementazione completa, includendo il corpo della funzione con tutte le istruzioni che verranno eseguite quando la funzione viene chiamata.

### Sintassi della Definizione

```cpp
tipo_ritorno nome_funzione(tipo_parametro1 parametro1, tipo_parametro2 parametro2, ...) {
    // Corpo della funzione
    // Istruzioni
    return valore;  // Se la funzione non è void
}
```

Esempio:

```cpp
int somma(int a, int b) {
    return a + b;  // Definizione della funzione somma
}
```

### Caratteristiche della Definizione

1. **Include il corpo**: Contiene le istruzioni che la funzione eseguirà.
2. **Deve essere unica**: Una funzione può essere definita solo una volta in tutto il programma.
3. **I nomi dei parametri sono obbligatori**: Nella definizione, i nomi dei parametri devono essere specificati.
4. **Può includere variabili locali**: All'interno del corpo della funzione, è possibile dichiarare variabili locali.

## Perché Separare Dichiarazione e Definizione?

La separazione tra dichiarazione e definizione offre diversi vantaggi:

1. **Risolve il problema delle dipendenze circolari**: Quando due funzioni si chiamano a vicenda, le dichiarazioni permettono al compilatore di conoscere entrambe le funzioni prima di vedere le loro definizioni.

2. **Facilita la compilazione separata**: Le dichiarazioni possono essere raccolte in file header (`.h`), mentre le definizioni possono essere in file di implementazione (`.cpp`), permettendo la compilazione separata.

3. **Migliora la leggibilità**: I prototipi all'inizio del file forniscono una panoramica delle funzioni disponibili senza dover leggere le implementazioni complete.

4. **Nasconde i dettagli implementativi**: Gli utenti di una libreria possono vedere solo le dichiarazioni (interfaccia) senza conoscere i dettagli implementativi.

## Esempi Pratici

### Esempio 1: Dichiarazione e Definizione nello Stesso File

```cpp
#include <iostream>

// Dichiarazioni (prototipi)
int somma(int a, int b);
void stampaMessaggio(std::string messaggio);

int main() {
    int risultato = somma(5, 3);
    stampaMessaggio("Il risultato è: " + std::to_string(risultato));
    return 0;
}

// Definizioni
int somma(int a, int b) {
    return a + b;
}

void stampaMessaggio(std::string messaggio) {
    std::cout << messaggio << std::endl;
}
```

### Esempio 2: Dichiarazione in Header e Definizione in File di Implementazione

**matematica.h** (file header con dichiarazioni)
```cpp
#ifndef MATEMATICA_H
#define MATEMATICA_H

int somma(int a, int b);
int sottrazione(int a, int b);
int moltiplicazione(int a, int b);
float divisione(int a, int b);

#endif // MATEMATICA_H
```

**matematica.cpp** (file di implementazione con definizioni)
```cpp
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

**main.cpp** (file principale che utilizza le funzioni)
```cpp
#include <iostream>
#include "matematica.h"

int main() {
    std::cout << "Somma: " << somma(10, 5) << std::endl;
    std::cout << "Sottrazione: " << sottrazione(10, 5) << std::endl;
    std::cout << "Moltiplicazione: " << moltiplicazione(10, 5) << std::endl;
    
    try {
        std::cout << "Divisione: " << divisione(10, 5) << std::endl;
        std::cout << "Divisione per zero: " << divisione(10, 0) << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Best Practices

1. **Usa sempre i prototipi**: Dichiara sempre le funzioni prima di utilizzarle, anche se la definizione appare prima dell'uso.

2. **Organizza il codice in modo logico**: Raggruppa le dichiarazioni all'inizio del file e le definizioni alla fine, o usa file header e di implementazione separati.

3. **Usa le guardie di inclusione**: Quando crei file header, usa sempre le guardie di inclusione (`#ifndef`, `#define`, `#endif`) per evitare inclusioni multiple.

4. **Mantieni coerenza tra dichiarazione e definizione**: Assicurati che il tipo di ritorno e i parametri siano identici nella dichiarazione e nella definizione.

5. **Documenta le funzioni nella dichiarazione**: Aggiungi commenti che descrivono lo scopo, i parametri e il valore di ritorno nella dichiarazione, non nella definizione.

## Conclusione

Comprendere la differenza tra dichiarazione e definizione di funzioni è fondamentale per scrivere codice C++ ben strutturato e modulare. La separazione tra interfaccia (dichiarazioni) e implementazione (definizioni) è un principio chiave della programmazione che favorisce la manutenibilità, la riusabilità e la chiarezza del codice.