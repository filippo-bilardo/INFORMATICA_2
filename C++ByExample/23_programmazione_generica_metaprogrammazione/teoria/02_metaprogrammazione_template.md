# Metaprogrammazione Template in C++

## Introduzione alla Metaprogrammazione

La metaprogrammazione template è una tecnica avanzata in C++ che permette di eseguire calcoli a tempo di compilazione. Questo approccio consente di generare codice ottimizzato, implementare algoritmi che vengono eseguiti durante la compilazione e creare strutture di dati e algoritmi generici altamente efficienti.

## Calcoli a Tempo di Compilazione

Uno degli usi più comuni della metaprogrammazione è l'esecuzione di calcoli durante la compilazione anziché a runtime.

### Calcolo del Fattoriale

```cpp
template <unsigned int N>
struct Fattoriale {
    static constexpr unsigned int valore = N * Fattoriale<N-1>::valore;
};

// Caso base per terminare la ricorsione
template <>
struct Fattoriale<0> {
    static constexpr unsigned int valore = 1;
};

// Utilizzo
constexpr unsigned int risultato = Fattoriale<5>::valore;  // Calcolato a tempo di compilazione
std::cout << "5! = " << risultato << std::endl;  // Stampa: 5! = 120
```

### Sequenza di Fibonacci

```cpp
template <unsigned int N>
struct Fibonacci {
    static constexpr unsigned int valore = Fibonacci<N-1>::valore + Fibonacci<N-2>::valore;
};

// Casi base
template <>
struct Fibonacci<0> {
    static constexpr unsigned int valore = 0;
};

template <>
struct Fibonacci<1> {
    static constexpr unsigned int valore = 1;
};

// Utilizzo
constexpr unsigned int fib6 = Fibonacci<6>::valore;  // Calcolato a tempo di compilazione
std::cout << "Fibonacci(6) = " << fib6 << std::endl;  // Stampa: Fibonacci(6) = 8
```

## Metafunzioni

Le metafunzioni sono template che operano su tipi anziché su valori, trasformando tipi in altri tipi o in valori costanti.

### Metafunzioni per Manipolazione di Tipi

```cpp
// Metafunzione che rimuove il qualificatore const da un tipo
template <typename T>
struct RemoveConst {
    using type = T;
};

template <typename T>
struct RemoveConst<const T> {
    using type = T;
};

// Utilizzo
using Tipo1 = RemoveConst<const int>::type;  // Tipo1 è int
using Tipo2 = RemoveConst<int>::type;        // Tipo2 è int
```

### Metafunzioni per Proprietà dei Tipi

```cpp
// Metafunzione che verifica se un tipo è un puntatore
template <typename T>
struct IsPuntatore {
    static constexpr bool valore = false;
};

template <typename T>
struct IsPuntatore<T*> {
    static constexpr bool valore = true;
};

// Utilizzo
constexpr bool test1 = IsPuntatore<int*>::valore;  // true
constexpr bool test2 = IsPuntatore<int>::valore;    // false
```

## Tecniche di Selezione a Tempo di Compilazione

La metaprogrammazione permette di selezionare implementazioni diverse in base a condizioni valutate a tempo di compilazione.

### Selezione Condizionale di Tipi

```cpp
// Metafunzione per selezionare un tipo in base a una condizione
template <bool Condizione, typename TipoSe, typename TipoAltro>
struct SelezionaTipo {
    using type = TipoSe;
};

template <typename TipoSe, typename TipoAltro>
struct SelezionaTipo<false, TipoSe, TipoAltro> {
    using type = TipoAltro;
};

// Utilizzo
using Tipo = SelezionaTipo<sizeof(int) == 4, float, double>::type;
// Se int è 4 byte, Tipo sarà float, altrimenti double
```

### Dispatch in Base al Tipo

```cpp
template <typename T>
struct TipoDispatch {
    static void processa(const T& valore) {
        std::cout << "Tipo generico: " << valore << std::endl;
    }
};

template <>
struct TipoDispatch<std::string> {
    static void processa(const std::string& valore) {
        std::cout << "Tipo stringa: " << valore << std::endl;
    }
};

template <typename T>
void elabora(const T& valore) {
    TipoDispatch<T>::processa(valore);
}

// Utilizzo
elabora(42);              // Stampa: Tipo generico: 42
elabora(std::string("Hello"));  // Stampa: Tipo stringa: Hello
```

## Liste di Tipi e Variadic Templates

I variadic templates permettono di creare metafunzioni che operano su un numero arbitrario di tipi.

### Lista di Tipi

```cpp
// Definizione di una lista di tipi
template <typename... Ts>
struct ListaTipi {};

// Metafunzione per ottenere il primo tipo dalla lista
template <typename Primo, typename... Resto>
struct PrimoTipo {
    using type = Primo;
};

// Utilizzo
using Primo = PrimoTipo<int, double, char>::type;  // Primo è int
```

### Conteggio dei Tipi

```cpp
// Metafunzione per contare il numero di tipi in una lista
template <typename... Ts>
struct ContaTipi {
    static constexpr size_t valore = sizeof...(Ts);
};

// Utilizzo
constexpr size_t numero = ContaTipi<int, double, char>::valore;  // numero è 3
```

## Vantaggi della Metaprogrammazione

1. **Ottimizzazione a Tempo di Compilazione**: I calcoli vengono eseguiti durante la compilazione, eliminando l'overhead a runtime.
2. **Generazione di Codice**: Permette di generare automaticamente codice specializzato per diversi tipi.
3. **Type Safety**: Garantisce controlli di tipo più rigorosi a tempo di compilazione.
4. **Polimorfismo Statico**: Implementa comportamenti polimorfici senza l'overhead del polimorfismo dinamico.

## Limitazioni della Metaprogrammazione

1. **Complessità**: Il codice di metaprogrammazione può essere difficile da leggere e mantenere.
2. **Tempi di Compilazione**: L'uso intensivo di metaprogrammazione può aumentare significativamente i tempi di compilazione.
3. **Messaggi di Errore**: Gli errori nei template possono generare messaggi di errore molto complessi.
4. **Curva di Apprendimento**: Richiede una comprensione profonda del sistema di tipi di C++.

## Esercizi

1. Implementa una metafunzione `Potenza<Base, Esponente>` che calcoli Base^Esponente a tempo di compilazione.
2. Crea una metafunzione `IsArray<T>` che determini se un tipo è un array.
3. Implementa una metafunzione `TuttiUguali<T1, T2, ...>` che verifichi se tutti i tipi nella lista sono uguali.
4. Sviluppa una metafunzione `Massimo<N1, N2, ...>` che trovi il valore massimo tra un insieme di numeri interi costanti.

## Domande di Autovalutazione

1. Qual è la differenza tra programmazione generica e metaprogrammazione template?
2. Come funziona la ricorsione nei template e come viene terminata?
3. Quali sono i vantaggi dell'esecuzione di calcoli a tempo di compilazione rispetto all'esecuzione a runtime?
4. Come si può utilizzare la metaprogrammazione per implementare pattern di design come il Factory Method?
5. Quali sono le principali differenze tra la metaprogrammazione in C++11 e le nuove funzionalità introdotte in C++14, C++17 e C++20?