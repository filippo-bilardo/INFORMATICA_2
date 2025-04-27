# Template Variadic in C++11

In questa guida, esploreremo i template variadic introdotti in C++11, una potente caratteristica che permette di creare template con un numero variabile di parametri.

## Cos'è un Template Variadic?

Un template variadic è un template che può accettare un numero arbitrario di parametri di tipo o non-tipo. Prima di C++11, i template potevano accettare solo un numero fisso di parametri. Con l'introduzione dei template variadic, è possibile scrivere funzioni e classi generiche che lavorano con un numero variabile di argomenti.

## Sintassi di Base

La sintassi per dichiarare un template variadic utilizza i puntini di sospensione (`...`) in due posizioni diverse:

```cpp
// Template variadic di funzione
template <typename... Ts>
void funzione(Ts... args) {
    // Implementazione
}
```

In questo esempio:
- `typename... Ts` dichiara un "parameter pack" di tipi
- `Ts... args` dichiara un "parameter pack" di valori

## Parameter Pack

Un "parameter pack" è un gruppo di zero o più parametri di template. Ci sono due tipi di parameter pack:

1. **Template parameter pack**: Un gruppo di zero o più parametri di template
2. **Function parameter pack**: Un gruppo di zero o più parametri di funzione

## Espansione del Parameter Pack

Per utilizzare i valori contenuti in un parameter pack, è necessario "espanderlo". L'espansione avviene utilizzando i puntini di sospensione dopo il nome del parameter pack:

```cpp
template <typename... Ts>
void stampa(Ts... args) {
    // Utilizzo dell'operatore fold (C++17)
    ((std::cout << args << " "), ...);
    std::cout << std::endl;
}
```

Prima di C++17, l'espansione del parameter pack richiedeva tecniche più complesse, come la ricorsione o l'utilizzo di funzioni ausiliarie.

## Ricorsione con Template Variadic

Una tecnica comune per elaborare un parameter pack è la ricorsione di template:

```cpp
// Caso base (termina la ricorsione)
template <typename T>
void stampa_ricorsiva(T valore) {
    std::cout << valore << std::endl;
}

// Caso ricorsivo
template <typename T, typename... Resto>
void stampa_ricorsiva(T primo, Resto... resto) {
    std::cout << primo << " ";
    stampa_ricorsiva(resto...);  // Chiamata ricorsiva con il resto dei parametri
}
```

Questo approccio funziona "sbucciando" un parametro alla volta dal parameter pack e passando il resto alla chiamata ricorsiva.

## Operatori Fold (C++17)

C++17 ha introdotto gli operatori fold, che semplificano notevolmente l'utilizzo dei parameter pack:

```cpp
template <typename... Ts>
auto somma(Ts... args) {
    return (... + args);  // Fold unario sinistro: ((a1 + a2) + ...) + aN
}

template <typename... Ts>
auto prodotto(Ts... args) {
    return (args * ...);  // Fold unario destro: a1 * (a2 * (... * aN))
}

template <typename... Ts>
void stampa_fold(Ts... args) {
    ((std::cout << args << " "), ...);  // Fold unario sinistro con operatore virgola
    std::cout << std::endl;
}
```

Gli operatori fold possono essere:
- **Unari**: Operano solo sui parametri del pack
- **Binari**: Includono un valore iniziale

E possono essere:
- **Sinistri**: L'operazione procede da sinistra a destra
- **Destri**: L'operazione procede da destra a sinistra

## Sizeof... Operator

L'operatore `sizeof...` restituisce il numero di elementi in un parameter pack:

```cpp
template <typename... Ts>
void conta_parametri(Ts... args) {
    std::cout << "Numero di parametri: " << sizeof...(args) << std::endl;
}
```

## Template Variadic di Classe

Anche le classi possono essere template variadic:

```cpp
template <typename... Ts>
class Tuple {
    // Implementazione
};

// Utilizzo
Tuple<int, double, std::string> t;
```

## Ereditarietà Variadic

Un uso comune dei template variadic è l'ereditarietà multipla:

```cpp
template <typename... Basi>
class Derivata : public Basi... {
public:
    Derivata(const Basi&... basi) : Basi(basi)... {}
};
```

Questo permette di creare una classe che eredita da un numero arbitrario di classi base.

## Perfect Forwarding con Template Variadic

I template variadic sono spesso utilizzati insieme al perfect forwarding per implementare funzioni di inoltro:

```cpp
template <typename... Args>
void inoltra_a_funzione(Args&&... args) {
    funzione(std::forward<Args>(args)...);
}
```

Questo pattern è alla base di molte funzioni della libreria standard come `std::make_shared`, `std::make_unique` e `std::emplace_back`.

## Implementazione di una Funzione Printf-like

Un esempio classico di utilizzo dei template variadic è l'implementazione di una funzione simile a `printf` ma type-safe:

```cpp
#include <iostream>

// Caso base: nessun argomento da formattare
void printf_safe(const char* formato) {
    while (*formato) {
        if (*formato == '%' && *(formato + 1) != '%') {
            throw std::runtime_error("Argomenti insufficienti per il formato");
        }
        std::cout << *formato++;
    }
}

// Caso ricorsivo: almeno un argomento da formattare
template <typename T, typename... Args>
void printf_safe(const char* formato, T valore, Args... args) {
    while (*formato) {
        if (*formato == '%' && *(formato + 1) != '%') {
            std::cout << valore;
            printf_safe(formato + 1, args...);
            return;
        }
        std::cout << *formato++;
    }
    throw std::runtime_error("Troppi argomenti per il formato");
}
```

## Implementazione di una Classe Tuple

Un altro esempio avanzato è l'implementazione di una classe `Tuple` semplificata:

```cpp
// Dichiarazione forward
template <typename... Ts>
class Tuple;

// Caso base: Tuple vuota
template <>
class Tuple<> {};

// Caso ricorsivo: Tuple con almeno un elemento
template <typename Head, typename... Tail>
class Tuple<Head, Tail...> {
private:
    Head head;
    Tuple<Tail...> tail;
    
public:
    Tuple(const Head& h, const Tail&... t) : head(h), tail(t...) {}
    
    Head& getHead() { return head; }
    const Head& getHead() const { return head; }
    
    Tuple<Tail...>& getTail() { return tail; }
    const Tuple<Tail...>& getTail() const { return tail; }
};
```

## Accesso agli Elementi di un Parameter Pack

Accedere a un elemento specifico di un parameter pack non è diretto. Una tecnica comune è utilizzare una funzione ausiliaria con un indice:

```cpp
template <size_t N, typename... Ts>
struct NthElement;

// Specializzazione per il primo elemento
template <typename T, typename... Ts>
struct NthElement<0, T, Ts...> {
    using type = T;
    
    static T& get(T& first, Ts&...) {
        return first;
    }
};

// Specializzazione per gli elementi successivi
template <size_t N, typename T, typename... Ts>
struct NthElement<N, T, Ts...> {
    using type = typename NthElement<N-1, Ts...>::type;
    
    static type& get(T&, Ts&... rest) {
        return NthElement<N-1, Ts...>::get(rest...);
    }
};

// Funzione helper
template <size_t N, typename... Ts>
typename NthElement<N, Ts...>::type& get(Ts&... args) {
    return NthElement<N, Ts...>::get(args...);
}
```

## Casi d'Uso Comuni

### 1. Factory Functions

Le funzioni factory come `std::make_shared` e `std::make_unique` utilizzano template variadic per inoltrare argomenti al costruttore:

```cpp
template <typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
```

### 2. Contenitori Eterogenei

I template variadic permettono di creare contenitori che possono memorizzare elementi di tipi diversi, come `std::tuple`:

```cpp
std::tuple<int, std::string, double> t(42, "Hello", 3.14);
```

### 3. Callback e Event Handlers

I template variadic sono utili per implementare sistemi di callback con firme di funzione diverse:

```cpp
template <typename... Args>
class EventHandler {
public:
    using Callback = std::function<void(Args...)>;
    
    void addListener(Callback callback) {
        listeners.push_back(callback);
    }
    
    void trigger(Args... args) {
        for (auto& listener : listeners) {
            listener(args...);
        }
    }
    
private:
    std::vector<Callback> listeners;
};
```

## Vantaggi dei Template Variadic

1. **Flessibilità**: Permettono di scrivere codice generico che funziona con un numero arbitrario di argomenti.
2. **Type Safety**: A differenza di `va_args`, i template variadic sono type-safe.
3. **Efficienza**: Non c'è overhead a runtime, poiché tutto viene risolto a tempo di compilazione.
4. **Espressività**: Permettono di esprimere algoritmi complessi in modo conciso.

## Limitazioni e Considerazioni

1. **Complessità del Codice**: I template variadic possono rendere il codice più difficile da leggere e debuggare.
2. **Tempi di Compilazione**: L'uso estensivo di template variadic può aumentare i tempi di compilazione.
3. **Messaggi di Errore**: Gli errori nei template variadic possono generare messaggi di errore molto complessi.
4. **Supporto del Compilatore**: Richiedono un compilatore conforme a C++11 o successivo.

## Domande di Autovalutazione

1. Qual è la differenza tra un template parameter pack e un function parameter pack?
2. Come si può determinare il numero di elementi in un parameter pack?
3. Quali sono i diversi tipi di operatori fold introdotti in C++17?
4. Come si può accedere a un elemento specifico di un parameter pack?
5. Quali sono i vantaggi dei template variadic rispetto alle funzioni con un numero variabile di argomenti tradizionali (va_args)?
6. Come si può implementare la ricorsione con template variadic?
7. Quali sono i casi d'uso comuni per i template variadic nella programmazione C++ moderna?

## Esercizi Proposti

1. Implementa una funzione `somma_variadic` che calcoli la somma di un numero arbitrario di argomenti di qualsiasi tipo numerico.
2. Crea una funzione `concatena` che concateni un numero arbitrario di stringhe.
3. Implementa una versione semplificata di `std::make_unique` utilizzando template variadic.
4. Crea una classe `VariadicPrinter` che stampi un numero arbitrario di elementi di tipi diversi, separati da un delimitatore specificato.
5. Implementa una funzione `applica` che applichi una funzione a ciascun elemento di un parameter pack.

## Prossimo Argomento

Nel prossimo argomento, esploreremo le best practices e le considerazioni sulle prestazioni nell'uso dei template in C++, fornendo linee guida per scrivere codice template efficiente e manutenibile.