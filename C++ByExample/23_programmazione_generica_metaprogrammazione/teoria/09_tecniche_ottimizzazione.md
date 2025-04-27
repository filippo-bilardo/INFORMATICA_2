# Tecniche di Ottimizzazione con Template Metaprogramming

## Introduzione

La metaprogrammazione template in C++ non è solo uno strumento per la programmazione generica, ma anche un potente mezzo per implementare ottimizzazioni a tempo di compilazione. Queste tecniche permettono di spostare calcoli dal runtime al compile-time, eliminare overhead di funzioni, specializzare algoritmi per tipi specifici e molto altro.

## Ottimizzazioni a Tempo di Compilazione

### Calcoli a Tempo di Compilazione

Uno dei vantaggi più evidenti della metaprogrammazione template è la possibilità di eseguire calcoli complessi durante la compilazione, riducendo il carico a runtime.

```cpp
// Calcolo del fattoriale a tempo di compilazione
template<unsigned N>
struct Fattoriale {
    static constexpr unsigned value = N * Fattoriale<N-1>::value;
};

template<>
struct Fattoriale<0> {
    static constexpr unsigned value = 1;
};

// Utilizzo
constexpr unsigned risultato = Fattoriale<5>::value;  // Calcolato a tempo di compilazione
```

Con C++14 e versioni successive, possiamo utilizzare `constexpr` per ottenere lo stesso risultato in modo più leggibile:

```cpp
constexpr unsigned fattoriale(unsigned n) {
    return (n <= 1) ? 1 : n * fattoriale(n - 1);
}

// Utilizzo
constexpr unsigned risultato = fattoriale(5);  // Calcolato a tempo di compilazione
```

### Unrolling dei Cicli

L'unrolling dei cicli è una tecnica di ottimizzazione che consiste nel sostituire un ciclo con una sequenza di istruzioni ripetute, eliminando l'overhead del controllo del ciclo.

```cpp
// Implementazione tradizionale
template<typename T>
void sommaVettori(const T* a, const T* b, T* risultato, size_t n) {
    for (size_t i = 0; i < n; ++i) {
        risultato[i] = a[i] + b[i];
    }
}

// Implementazione con unrolling tramite metaprogrammazione
template<size_t I, size_t N, typename T>
struct UnrollSomma {
    static void esegui(const T* a, const T* b, T* risultato) {
        risultato[I] = a[I] + b[I];
        UnrollSomma<I+1, N, T>::esegui(a, b, risultato);
    }
};

template<size_t N, typename T>
struct UnrollSomma<N, N, T> {
    static void esegui(const T*, const T*, T*) {}
};

template<size_t N, typename T>
void sommaVettoriUnrolled(const T* a, const T* b, T* risultato) {
    UnrollSomma<0, N, T>::esegui(a, b, risultato);
}

// Utilizzo
int a[4] = {1, 2, 3, 4};
int b[4] = {5, 6, 7, 8};
int c[4];
sommaVettoriUnrolled<4>(a, b, c);  // Il ciclo è "srotolato" a tempo di compilazione
```

Con C++17, possiamo utilizzare fold expressions per semplificare ulteriormente:

```cpp
template<size_t... Is, typename T>
void sommaVettoriUnrolled(const T* a, const T* b, T* risultato, std::index_sequence<Is...>) {
    ((risultato[Is] = a[Is] + b[Is]), ...);
}

template<size_t N, typename T>
void sommaVettoriUnrolled(const T* a, const T* b, T* risultato) {
    sommaVettoriUnrolled(a, b, risultato, std::make_index_sequence<N>{});
}
```

## Specializzazione di Template per Tipi Specifici

La specializzazione di template permette di fornire implementazioni ottimizzate per tipi specifici.

```cpp
// Implementazione generica
template<typename T>
class Vettore {
public:
    void aggiungi(const T& a, const T& b) {
        // Implementazione generica
    }
};

// Specializzazione per float con istruzioni SIMD
template<>
class Vettore<float> {
public:
    void aggiungi(const float& a, const float& b) {
        // Implementazione ottimizzata con istruzioni SIMD
    }
};
```

### Ottimizzazione con Tag Dispatching

Il tag dispatching è una tecnica che utilizza tipi di tag per selezionare l'implementazione più efficiente a tempo di compilazione.

```cpp
// Tag per diverse strategie di implementazione
struct ImplementazioneGenerica {};
struct ImplementazioneOttimizzata {};

// Trait per selezionare la strategia appropriata
template<typename T>
struct StrategiaImplementazione {
    using type = ImplementazioneGenerica;
};

template<>
struct StrategiaImplementazione<float> {
    using type = ImplementazioneOttimizzata;
};

// Implementazioni specifiche
template<typename T>
void algoritmo_impl(const T* dati, size_t n, ImplementazioneGenerica) {
    // Implementazione generica
}

template<typename T>
void algoritmo_impl(const T* dati, size_t n, ImplementazioneOttimizzata) {
    // Implementazione ottimizzata
}

// Funzione principale che seleziona l'implementazione appropriata
template<typename T>
void algoritmo(const T* dati, size_t n) {
    algoritmo_impl(dati, n, typename StrategiaImplementazione<T>::type());
}
```

## Ottimizzazione della Memoria

### Tecniche di Compressione dei Dati

La metaprogrammazione template può essere utilizzata per implementare tecniche di compressione dei dati a tempo di compilazione.

```cpp
// Esempio: Ottimizzazione di una struttura di bit flags
template<typename... Flags>
class BitFlags {
private:
    using StorageType = std::conditional_t<
        (sizeof...(Flags) <= 8),
        uint8_t,
        std::conditional_t<
            (sizeof...(Flags) <= 16),
            uint16_t,
            std::conditional_t<
                (sizeof...(Flags) <= 32),
                uint32_t,
                uint64_t
            >
        >
    >;
    
    StorageType flags_ = 0;
    
    // Implementazione dei metodi per impostare/controllare i flag
};
```

### Small Object Optimization

La Small Object Optimization (SOO) è una tecnica che evita allocazioni dinamiche per oggetti piccoli.

```cpp
template<typename T, size_t InlineSize = 16>
class OptimizedStorage {
private:
    union {
        T* ptr_;
        std::aligned_storage_t<InlineSize, alignof(T)> buffer_;
    };
    bool isInline_;

public:
    // Implementazione dei metodi per gestire lo storage
};
```

## Ottimizzazione di Algoritmi

### Selezione di Algoritmi a Tempo di Compilazione

La metaprogrammazione template permette di selezionare l'algoritmo più efficiente in base alle proprietà dei tipi.

```cpp
// Trait per verificare se un tipo supporta un'operazione efficiente
template<typename T>
struct SupportaOperazioneEfficiente {
    static constexpr bool value = false;
};

template<>
struct SupportaOperazioneEfficiente<float> {
    static constexpr bool value = true;
};

// Selezione dell'algoritmo in base alle proprietà del tipo
template<typename T>
void algoritmo(const T* dati, size_t n) {
    if constexpr (SupportaOperazioneEfficiente<T>::value) {
        // Algoritmo ottimizzato
    } else {
        // Algoritmo generico
    }
}
```

### Ottimizzazione di Espressioni Template

Le espressioni template permettono di ottimizzare operazioni su strutture dati complesse evitando oggetti temporanei.

```cpp
// Esempio semplificato di espressione template per vettori
template<typename E>
class VectorExpression {
public:
    // Restituisce il valore dell'espressione all'indice i
    double operator[](size_t i) const {
        return static_cast<const E&>(*this)[i];
    }
    
    // Restituisce la dimensione dell'espressione
    size_t size() const {
        return static_cast<const E&>(*this).size();
    }
    
    // Converte l'espressione al tipo concreto
    const E& derived() const {
        return static_cast<const E&>(*this);
    }
};

// Classe concreta Vector
template<typename T>
class Vector : public VectorExpression<Vector<T>> {
private:
    std::vector<T> data_;

public:
    // Costruttori e altri metodi
    
    T operator[](size_t i) const {
        return data_[i];
    }
    
    T& operator[](size_t i) {
        return data_[i];
    }
    
    size_t size() const {
        return data_.size();
    }
};

// Espressione per la somma di vettori
template<typename E1, typename E2>
class VectorSum : public VectorExpression<VectorSum<E1, E2>> {
private:
    const E1& u_;
    const E2& v_;

public:
    VectorSum(const E1& u, const E2& v) : u_(u), v_(v) {
        assert(u.size() == v.size());
    }
    
    double operator[](size_t i) const {
        return u_[i] + v_[i];
    }
    
    size_t size() const {
        return u_.size();
    }
};

// Operatore di somma che restituisce un'espressione
template<typename E1, typename E2>
VectorSum<E1, E2> operator+(const VectorExpression<E1>& u, const VectorExpression<E2>& v) {
    return VectorSum<E1, E2>(u.derived(), v.derived());
}

// Utilizzo
Vector<double> a(100, 1.0);  // Vettore di 100 elementi con valore 1.0
Vector<double> b(100, 2.0);  // Vettore di 100 elementi con valore 2.0
Vector<double> c(100, 3.0);  // Vettore di 100 elementi con valore 3.0

// Questa espressione non crea vettori temporanei
Vector<double> risultato = a + b + c;
```

## Tecniche Avanzate

### Metafunzioni per l'Ottimizzazione

Le metafunzioni possono essere utilizzate per calcolare parametri ottimali a tempo di compilazione.

```cpp
// Calcolo della dimensione ottimale del blocco per un algoritmo
template<typename T, size_t CacheLine = 64>
struct OptimalBlockSize {
    static constexpr size_t value = CacheLine / sizeof(T);
};

template<typename T>
void algoritmoBloccato(const T* dati, size_t n) {
    constexpr size_t blockSize = OptimalBlockSize<T>::value;
    // Implementazione dell'algoritmo con blocchi di dimensione ottimale
}
```

### Ottimizzazione con Traits Personalizzati

I traits personalizzati possono essere utilizzati per fornire informazioni specifiche sui tipi che guidano le ottimizzazioni.

```cpp
// Trait per le caratteristiche di performance di un tipo
template<typename T>
struct PerformanceTraits {
    static constexpr bool supportsSIMD = false;
    static constexpr bool isContiguous = true;
    static constexpr size_t optimalAlignment = alignof(T);
};

// Specializzazione per float
template<>
struct PerformanceTraits<float> {
    static constexpr bool supportsSIMD = true;
    static constexpr bool isContiguous = true;
    static constexpr size_t optimalAlignment = 16;  // Per istruzioni SSE
};

// Utilizzo dei traits per ottimizzazioni
template<typename T>
void processDati(T* dati, size_t n) {
    if constexpr (PerformanceTraits<T>::supportsSIMD) {
        // Implementazione SIMD
    } else {
        // Implementazione standard
    }
}
```

## Best Practices

1. **Misura Prima di Ottimizzare**: Assicurati che l'ottimizzazione sia necessaria e che porti a miglioramenti significativi.
2. **Mantieni la Leggibilità**: Le ottimizzazioni non dovrebbero rendere il codice incomprensibile.
3. **Documenta le Ottimizzazioni**: Spiega perché e come funzionano le ottimizzazioni implementate.
4. **Considera le Alternative Moderne**: In C++17 e C++20, molte ottimizzazioni possono essere implementate con costrutti più semplici.
5. **Testa su Diverse Piattaforme**: Le ottimizzazioni possono avere effetti diversi su diverse architetture.

## Domande di Autovalutazione

1. Quali sono i vantaggi principali dell'esecuzione di calcoli a tempo di compilazione?
2. Come può la specializzazione di template migliorare le prestazioni per tipi specifici?
3. In quali scenari l'unrolling dei cicli tramite metaprogrammazione è particolarmente utile?
4. Come funzionano le espressioni template e quali problemi risolvono?
5. Quali sono i compromessi tra ottimizzazione e leggibilità/manutenibilità del codice?

## Esercizi Proposti

1. **Ottimizzazione di Algoritmi Matematici**: Implementa versioni ottimizzate di algoritmi matematici comuni (moltiplicazione di matrici, FFT, ecc.) utilizzando tecniche di metaprogrammazione.
2. **Libreria di Espressioni Template**: Crea una semplice libreria di espressioni template per operazioni su vettori e matrici.
3. **Ottimizzazione di Strutture Dati**: Implementa una struttura dati (ad esempio, una lista o un albero) con ottimizzazioni specifiche per diversi tipi di dati.
4. **Benchmark di Ottimizzazioni**: Crea un benchmark per confrontare le prestazioni di diverse tecniche di ottimizzazione su vari tipi di dati e dimensioni.
5. **Ottimizzazione con SIMD**: Utilizza la metaprogrammazione template per selezionare automaticamente implementazioni SIMD quando disponibili.

## Conclusione

Le tecniche di ottimizzazione basate sulla metaprogrammazione template rappresentano uno strumento potente per migliorare le prestazioni del codice C++. Spostando calcoli a tempo di compilazione, specializzando algoritmi per tipi specifici e eliminando overhead, è possibile ottenere significativi miglioramenti di prestazioni senza sacrificare la flessibilità e la riusabilità del codice. Tuttavia, è importante bilanciare l'ottimizzazione con la leggibilità e la manutenibilità, e utilizzare queste tecniche solo quando i benefici superano i costi in termini di complessità.