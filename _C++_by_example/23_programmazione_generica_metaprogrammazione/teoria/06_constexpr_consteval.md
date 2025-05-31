# Constexpr e Consteval in C++

## Introduzione a Constexpr e Consteval

Le parole chiave `constexpr` e `consteval` sono caratteristiche moderne di C++ che permettono di eseguire calcoli a tempo di compilazione, migliorando le prestazioni e la sicurezza del codice. Queste caratteristiche sono fondamentali per la metaprogrammazione moderna e rappresentano un'alternativa più leggibile e manutenibile rispetto alla metaprogrammazione template tradizionale.

## Constexpr

### Cos'è Constexpr?

`constexpr` è una parola chiave introdotta in C++11 e potenziata nelle versioni successive che indica al compilatore che una funzione o una variabile può essere valutata a tempo di compilazione. Una funzione o variabile `constexpr` può essere utilizzata in contesti che richiedono espressioni costanti, come dimensioni di array, valori di template non-type, o altre espressioni `constexpr`.

### Evoluzione di Constexpr

- **C++11**: Introduzione di `constexpr` con limitazioni significative (una sola istruzione return, niente cicli, ecc.)
- **C++14**: Rimozione di molte limitazioni, permettendo cicli, variabili locali, e più istruzioni
- **C++17**: Ulteriori miglioramenti, inclusa la possibilità di usare `if constexpr`
- **C++20**: Aggiunta di `consteval` e ulteriori miglioramenti a `constexpr`

### Esempi di Funzioni Constexpr

```cpp
// Funzione constexpr semplice (C++11)
constexpr int quadrato(int n) {
    return n * n;
}

// Funzione constexpr più complessa (C++14)
constexpr int fattoriale(int n) {
    int risultato = 1;
    for (int i = 2; i <= n; ++i) {
        risultato *= i;
    }
    return risultato;
}

// Utilizzo di if constexpr (C++17)
template <typename T>
constexpr auto processa(T valore) {
    if constexpr (std::is_integral_v<T>) {
        return valore * 2;
    } else if constexpr (std::is_floating_point_v<T>) {
        return valore * 2.5;
    } else {
        return valore;
    }
}
```

### Variabili Constexpr

```cpp
constexpr int dimensione = 10;
int array[dimensione]; // OK: dimensione è una costante a tempo di compilazione

constexpr double pi = 3.14159265358979323846;
constexpr double circonferenza(double raggio) {
    return 2 * pi * raggio;
}

constexpr double raggio = 5.0;
constexpr double circ = circonferenza(raggio); // Calcolato a tempo di compilazione
```

## Consteval (C++20)

### Cos'è Consteval?

`consteval` è una parola chiave introdotta in C++20 che specifica che una funzione deve essere valutata a tempo di compilazione. A differenza di `constexpr`, che permette la valutazione sia a tempo di compilazione che a runtime, `consteval` garantisce che la funzione sia sempre valutata a tempo di compilazione.

### Esempi di Funzioni Consteval

```cpp
consteval int cubo(int n) {
    return n * n * n;
}

const int x = 3;
int array[cubo(x)]; // OK: cubo(x) è valutato a tempo di compilazione

int y = 4;
// int z = cubo(y); // Errore: y non è una costante a tempo di compilazione
```

## If Constexpr

`if constexpr` è una caratteristica introdotta in C++17 che permette di selezionare a tempo di compilazione quale ramo di un'istruzione if eseguire, basandosi su espressioni costanti. Questo è particolarmente utile nei template per evitare la compilazione di codice che non sarebbe valido per certi tipi.

```cpp
template <typename T>
void processa(T valore) {
    if constexpr (std::is_integral_v<T>) {
        // Questo codice è compilato solo se T è un tipo intero
        std::cout << "Valore intero: " << valore << std::endl;
    } else if constexpr (std::is_floating_point_v<T>) {
        // Questo codice è compilato solo se T è un tipo a virgola mobile
        std::cout << "Valore floating point: " << std::fixed << valore << std::endl;
    } else {
        // Questo codice è compilato solo per altri tipi
        std::cout << "Altro tipo" << std::endl;
    }
}
```

## Constexpr Lambda (C++17 e C++20)

A partire da C++17, le espressioni lambda possono essere dichiarate `constexpr`, e in C++20 lo sono implicitamente quando possibile.

```cpp
// C++17: Lambda constexpr esplicita
auto quadrato = [](int n) constexpr { return n * n; };

// C++20: Lambda constexpr implicita
auto cubo = [](int n) { return n * n * n; }; // constexpr implicito se possibile

constexpr int x = quadrato(5); // OK: valutato a tempo di compilazione
constexpr int y = cubo(3);     // OK in C++20
```

## Constexpr Containers (C++20)

C++20 ha esteso il supporto `constexpr` a molti container della libreria standard e ai loro algoritmi, permettendo operazioni complesse a tempo di compilazione.

```cpp
constexpr std::vector<int> crea_vettore() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    v.push_back(6);
    return v;
}

constexpr auto v = crea_vettore();
constexpr int terzo_elemento = v[2]; // 3, calcolato a tempo di compilazione
```

## Vantaggi di Constexpr e Consteval

1. **Prestazioni**: Il codice valutato a tempo di compilazione non ha overhead a runtime.
2. **Sicurezza**: Gli errori vengono rilevati a tempo di compilazione anziché a runtime.
3. **Ottimizzazione**: Il compilatore può ottimizzare meglio il codice conoscendo i valori a tempo di compilazione.
4. **Leggibilità**: Rispetto alla metaprogrammazione template tradizionale, `constexpr` e `consteval` offrono una sintassi più chiara e familiare.

## Limitazioni e Considerazioni

1. **Compatibilità**: Le funzionalità più avanzate richiedono compilatori recenti che supportino C++17 o C++20.
2. **Tempo di Compilazione**: L'uso eccessivo di calcoli a tempo di compilazione può aumentare significativamente il tempo di compilazione.
3. **Debugging**: Il debugging di codice eseguito a tempo di compilazione può essere più complesso.

## Esempi Pratici

### Calcolo di Numeri di Fibonacci a Tempo di Compilazione

```cpp
constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// Utilizzo
constexpr int fib10 = fibonacci(10); // Calcolato a tempo di compilazione
static_assert(fib10 == 55, "Errore nel calcolo di Fibonacci");
```

### Generazione di Tabelle di Lookup a Tempo di Compilazione

```cpp
template<size_t N>
constexpr std::array<int, N> crea_tabella_quadrati() {
    std::array<int, N> risultato = {};
    for (size_t i = 0; i < N; ++i) {
        risultato[i] = i * i;
    }
    return risultato;
}

// Utilizzo
constexpr auto tabella = crea_tabella_quadrati<100>();
constexpr int quadrato_di_7 = tabella[7]; // 49, calcolato a tempo di compilazione
```

## Domande di Autovalutazione

1. Qual è la differenza principale tra `constexpr` e `consteval`?
2. Come è evoluto il supporto per `constexpr` da C++11 a C++20?
3. In quali situazioni è preferibile usare `if constexpr` rispetto a SFINAE?
4. Quali sono i vantaggi dell'utilizzo di funzioni `constexpr` rispetto alle normali funzioni?
5. Come possono i container `constexpr` in C++20 migliorare le prestazioni del codice?

## Esercizi Proposti

1. Implementa una funzione `constexpr` per calcolare il massimo comun divisore (MCD) di due numeri.
2. Crea una classe `Point2D` con operazioni `constexpr` per calcolare la distanza tra punti.
3. Utilizza `if constexpr` per implementare una funzione template che si comporta diversamente per tipi numerici e non numerici.
4. Implementa una funzione `consteval` che genera una tabella di potenze a tempo di compilazione.
5. Crea una struttura dati `constexpr` per rappresentare e manipolare frazioni a tempo di compilazione.

## Conclusione

`constexpr` e `consteval` rappresentano un'evoluzione significativa nella metaprogrammazione C++, offrendo un approccio più intuitivo e potente per eseguire calcoli a tempo di compilazione. Queste caratteristiche, insieme ad altre innovazioni come `if constexpr` e i container `constexpr`, stanno trasformando il modo in cui i programmatori C++ pensano all'ottimizzazione e alla generazione di codice, rendendo la metaprogrammazione più accessibile e pratica.