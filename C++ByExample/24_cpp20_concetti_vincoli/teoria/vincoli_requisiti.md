# Vincoli e Requisiti in C++20

## Introduzione ai Vincoli

I vincoli (constraints) in C++20 sono condizioni che devono essere soddisfatte dai parametri di template. Essi rappresentano il meccanismo sottostante ai concetti e permettono di specificare in modo preciso quali proprietà deve avere un tipo per essere utilizzato in un contesto generico.

## Tipi di Vincoli

### Vincoli Semplici

I vincoli più semplici verificano proprietà di base dei tipi:

```cpp
template<typename T>
concept Numerico = std::is_arithmetic_v<T>;
```

Questo concetto è soddisfatto solo se `T` è un tipo aritmetico (intero o a virgola mobile).

### Vincoli Composti

I vincoli possono essere combinati utilizzando operatori logici:

```cpp
template<typename T>
concept InteroPositivo = std::integral<T> && requires(T x) { requires x > 0; };
```

Questo concetto richiede che `T` sia un tipo intero e che il valore sia positivo.

## La Clausola `requires`

La clausola `requires` è il cuore del sistema di vincoli in C++20. Essa permette di specificare requisiti complessi sui tipi.

### Sintassi di Base

```cpp
requires (parametri) { requisiti };
```

Dove `requisiti` può essere uno o più dei seguenti:

### 1. Requisiti di Espressione Semplice

Verificano che una determinata espressione sia valida:

```cpp
template<typename T>
concept Incrementabile = requires(T x) {
    x++; // Verifica che x++ sia un'espressione valida
};
```

### 2. Requisiti di Tipo

Verificano l'esistenza di un tipo:

```cpp
template<typename T>
concept ContieneValueType = requires {
    typename T::value_type; // Verifica che T::value_type esista
};
```

### 3. Requisiti di Espressione con Tipo

Verificano che un'espressione sia valida e che il suo tipo soddisfi determinate condizioni:

```cpp
template<typename T>
concept Sommabile = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>; // Verifica che a + b sia convertibile a T
};
```

### 4. Requisiti Nidificati

Permettono di specificare condizioni booleane aggiuntive:

```cpp
template<typename T>
concept TipoInteroNonNegativo = std::integral<T> && requires(T x) {
    requires std::is_unsigned_v<T> || (std::is_signed_v<T> && x >= 0);
};
```

## Vincoli sui Parametri di Template

I vincoli possono essere applicati ai parametri di template in diversi modi:

### 1. Utilizzo Diretto di Concetti

```cpp
template<Numerico T>
void funzione(T valore) {
    // Implementazione per tipi numerici
}
```

### 2. Clausola `requires` dopo la Dichiarazione

```cpp
template<typename T>
    requires Numerico<T>
void funzione(T valore) {
    // Implementazione per tipi numerici
}
```

### 3. Vincoli su Funzioni Membro

```cpp
template<typename T>
class Contenitore {
    // Metodo disponibile solo se T è copiabile
    void copia(const T& altro) requires std::copyable<T>;
};
```

## Subsumption (Sussunzione)

Un concetto importante nel sistema di vincoli è la sussunzione, che determina quando un concetto è più specifico di un altro. Questo è fondamentale per la risoluzione dell'overloading:

```cpp
template<typename T>
concept Intero = std::integral<T>;

template<typename T>
concept InteroSigned = Intero<T> && std::is_signed_v<T>;

// Funzione generica per qualsiasi intero
template<Intero T>
void processa(T valore) {
    std::cout << "Versione per interi generici" << std::endl;
}

// Funzione specializzata per interi con segno
template<InteroSigned T>
void processa(T valore) {
    std::cout << "Versione per interi con segno" << std::endl;
}
```

In questo esempio, quando si chiama `processa` con un intero con segno, viene selezionata la seconda funzione perché `InteroSigned` è più specifico di `Intero`.

## Vantaggi dei Vincoli Espliciti

1. **Chiarezza del Codice**: I vincoli rendono espliciti i requisiti sui tipi.
2. **Migliori Messaggi di Errore**: Quando un tipo non soddisfa un vincolo, il compilatore può fornire messaggi di errore più chiari.
3. **Documentazione Implicita**: I vincoli servono come documentazione sui requisiti dei tipi.
4. **Overloading Più Preciso**: Permettono di definire funzioni sovraccaricate basate su proprietà specifiche dei tipi.

## Esempio Completo

```cpp
#include <iostream>
#include <concepts>
#include <type_traits>

// Concetto per tipi che supportano l'operazione di somma
template<typename T>
concept Sommabile = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// Concetto per tipi che supportano tutte le operazioni aritmetiche di base
template<typename T>
concept AritmeticoCompleto = Sommabile<T> && requires(T a, T b) {
    { a - b } -> std::convertible_to<T>;
    { a * b } -> std::convertible_to<T>;
    { a / b } -> std::convertible_to<T>;
};

// Funzione che richiede solo la somma
template<Sommabile T>
T aggiungi(T a, T b) {
    return a + b;
}

// Funzione che richiede tutte le operazioni aritmetiche
template<AritmeticoCompleto T>
T operazioneComplessa(T a, T b) {
    return (a + b) * (a - b) / (a * b);
}

int main() {
    // Utilizzo con tipi che soddisfano entrambi i concetti
    std::cout << "Somma: " << aggiungi(5, 3) << std::endl;
    std::cout << "Operazione complessa: " << operazioneComplessa(5.0, 3.0) << std::endl;
    
    // Utilizzo con un tipo che soddisfa solo Sommabile
    struct SoloSommabile {
        int valore;
        
        SoloSommabile(int v) : valore(v) {}
        
        SoloSommabile operator+(const SoloSommabile& altro) const {
            return SoloSommabile(valore + altro.valore);
        }
        
        // Mancano le altre operazioni aritmetiche
    };
    
    SoloSommabile a(5), b(3);
    std::cout << "Somma di tipi personalizzati: " << aggiungi(a, b).valore << std::endl;
    
    // Il seguente codice genererebbe un errore di compilazione
    // operazioneComplessa(a, b);
    
    return 0;
}
```

## Conclusione

I vincoli e i requisiti in C++20 rappresentano un potente strumento per la programmazione generica. Essi permettono di specificare in modo chiaro e preciso quali proprietà deve avere un tipo per essere utilizzato in un contesto generico, migliorando la leggibilità, la manutenibilità e la diagnostica degli errori del codice.