# Type Traits in C++

## Introduzione ai Type Traits

I Type Traits sono strumenti fondamentali nella programmazione generica in C++ che permettono di ottenere informazioni sui tipi di dati a tempo di compilazione. Introdotti nella libreria standard con C++11 e migliorati nelle versioni successive, i type traits consentono di eseguire query e trasformazioni sui tipi, facilitando la scrittura di codice generico robusto ed efficiente.

I type traits sono implementati principalmente come template di classi nella libreria `<type_traits>` e forniscono un'interfaccia uniforme per interrogare e manipolare i tipi.

## Categorie di Type Traits

I type traits possono essere suddivisi in diverse categorie in base alla loro funzione:

### 1. Traits di Query

Questi traits restituiscono informazioni sulle proprietà di un tipo.

```cpp
#include <type_traits>
#include <iostream>

template <typename T>
void analizza_tipo() {
    std::cout << "Tipo: " << typeid(T).name() << std::endl;
    std::cout << "È intero? " << std::is_integral<T>::value << std::endl;
    std::cout << "È in virgola mobile? " << std::is_floating_point<T>::value << std::endl;
    std::cout << "È un puntatore? " << std::is_pointer<T>::value << std::endl;
    std::cout << "È una classe? " << std::is_class<T>::value << std::endl;
    std::cout << "È const? " << std::is_const<T>::value << std::endl;
    std::cout << "-------------------" << std::endl;
}

int main() {
    analizza_tipo<int>();
    analizza_tipo<float>();
    analizza_tipo<int*>();
    analizza_tipo<const double>();
    analizza_tipo<std::string>();
    return 0;
}
```

### 2. Traits di Trasformazione

Questi traits modificano un tipo in un altro tipo correlato.

```cpp
#include <type_traits>
#include <iostream>

template <typename T>
void mostra_trasformazioni() {
    std::cout << "Tipo originale: " << typeid(T).name() << std::endl;
    
    // Rimuove const/volatile
    using TipoSenzaCV = typename std::remove_cv<T>::type;
    std::cout << "Senza CV: " << typeid(TipoSenzaCV).name() << std::endl;
    
    // Aggiunge const
    using TipoConst = typename std::add_const<T>::type;
    std::cout << "Con const: " << typeid(TipoConst).name() << std::endl;
    
    // Rimuove riferimento
    using TipoSenzaRef = typename std::remove_reference<T>::type;
    std::cout << "Senza riferimento: " << typeid(TipoSenzaRef).name() << std::endl;
    
    // Rimuove puntatore
    using TipoSenzaPtr = typename std::remove_pointer<T>::type;
    std::cout << "Senza puntatore: " << typeid(TipoSenzaPtr).name() << std::endl;
    
    std::cout << "-------------------" << std::endl;
}

int main() {
    mostra_trasformazioni<int>();
    mostra_trasformazioni<const float&>();
    mostra_trasformazioni<int*>();
    mostra_trasformazioni<const char*>();
    return 0;
}
```

### 3. Traits di Relazione tra Tipi

Questi traits verificano le relazioni tra tipi diversi.

```cpp
#include <type_traits>
#include <iostream>

class Base {};
class Derivata : public Base {};
class NonCorrelata {};

template <typename T, typename U>
void verifica_relazione() {
    std::cout << "Tipi: " << typeid(T).name() << " e " << typeid(U).name() << std::endl;
    std::cout << "Sono lo stesso tipo? " << std::is_same<T, U>::value << std::endl;
    std::cout << "Uno è base dell'altro? " << std::is_base_of<T, U>::value << std::endl;
    std::cout << "Uno è convertibile nell'altro? " << std::is_convertible<T, U>::value << std::endl;
    std::cout << "-------------------" << std::endl;
}

int main() {
    verifica_relazione<int, int>();
    verifica_relazione<int, double>();
    verifica_relazione<Base, Derivata>();
    verifica_relazione<Derivata, Base>();
    verifica_relazione<Base, NonCorrelata>();
    return 0;
}
```

## Utilizzo dei Type Traits con SFINAE

I type traits sono spesso utilizzati insieme a SFINAE (Substitution Failure Is Not An Error) per abilitare o disabilitare funzioni template in base alle proprietà dei tipi.

```cpp
#include <type_traits>
#include <iostream>

// Versione per tipi numerici
template <typename T>
typename std::enable_if<std::is_arithmetic<T>::value, T>::type
somma(T a, T b) {
    std::cout << "Versione numerica chiamata" << std::endl;
    return a + b;
}

// Versione per stringhe
template <typename T>
typename std::enable_if<std::is_same<T, std::string>::value, T>::type
somma(T a, T b) {
    std::cout << "Versione stringa chiamata" << std::endl;
    return a + b;
}

int main() {
    std::cout << somma(5, 3) << std::endl;
    std::cout << somma(4.2, 2.1) << std::endl;
    std::cout << somma(std::string("Hello, "), std::string("World!")) << std::endl;
    
    // Errore di compilazione: nessuna funzione somma per vettori
    // std::vector<int> v1, v2;
    // somma(v1, v2);
    
    return 0;
}
```

## Type Traits in C++17 e C++20

C++17 ha introdotto la variabile template `_v` per semplificare l'uso dei type traits:

```cpp
// Prima di C++17
if (std::is_integral<T>::value) { /* ... */ }

// Con C++17
if (std::is_integral_v<T>) { /* ... */ }
```

C++20 ha introdotto i concetti (concepts) che offrono un modo più elegante per esprimere vincoli sui template:

```cpp
#include <concepts>
#include <iostream>

// Utilizzo dei concetti invece di SFINAE con type traits
template <typename T>
requires std::integral<T> || std::floating_point<T>
T somma_moderna(T a, T b) {
    std::cout << "Versione numerica chiamata" << std::endl;
    return a + b;
}

int main() {
    std::cout << somma_moderna(5, 3) << std::endl;
    std::cout << somma_moderna(4.2, 2.1) << std::endl;
    return 0;
}
```

## Implementazione di Custom Type Traits

È possibile implementare type traits personalizzati per i propri tipi:

```cpp
#include <type_traits>
#include <iostream>

// Definizione di una classe
class MiaClasse {
public:
    void metodo() {}
};

// Type trait personalizzato per verificare se un tipo ha un metodo specifico
template <typename T, typename = void>
struct ha_metodo : std::false_type {};

template <typename T>
struct ha_metodo<T, std::void_t<decltype(std::declval<T>().metodo())>> : std::true_type {};

// Helper variable template (stile C++17)
template <typename T>
inline constexpr bool ha_metodo_v = ha_metodo<T>::value;

int main() {
    std::cout << "MiaClasse ha il metodo? " << ha_metodo_v<MiaClasse> << std::endl;
    std::cout << "int ha il metodo? " << ha_metodo_v<int> << std::endl;
    return 0;
}
```

## Applicazioni Pratiche dei Type Traits

### Ottimizzazione di Algoritmi

```cpp
#include <type_traits>
#include <iostream>
#include <vector>

// Implementazione ottimizzata per tipi POD (Plain Old Data)
template <typename T>
typename std::enable_if<std::is_trivially_copyable<T>::value>::type
copia_dati(T* dest, const T* src, size_t count) {
    std::cout << "Utilizzo memcpy per tipi POD" << std::endl;
    std::memcpy(dest, src, count * sizeof(T));
}

// Implementazione generica per tipi non-POD
template <typename T>
typename std::enable_if<!std::is_trivially_copyable<T>::value>::type
copia_dati(T* dest, const T* src, size_t count) {
    std::cout << "Utilizzo copy constructor per tipi non-POD" << std::endl;
    for (size_t i = 0; i < count; ++i) {
        dest[i] = src[i];
    }
}

int main() {
    int numeri_src[5] = {1, 2, 3, 4, 5};
    int numeri_dest[5];
    copia_dati(numeri_dest, numeri_src, 5);
    
    std::vector<int> vettori_src[3] = {{1, 2}, {3, 4}, {5, 6}};
    std::vector<int> vettori_dest[3];
    copia_dati(vettori_dest, vettori_src, 3);
    
    return 0;
}
```

### Implementazione di Funzioni Sicure per Tipo

```cpp
#include <type_traits>
#include <iostream>

template <typename T>
void stampa_sicura(const T& valore) {
    if constexpr (std::is_arithmetic_v<T>) {
        std::cout << "Valore numerico: " << valore << std::endl;
    } else if constexpr (std::is_same_v<T, std::string>) {
        std::cout << "Stringa: " << valore << std::endl;
    } else if constexpr (std::is_pointer_v<T>) {
        if (valore == nullptr) {
            std::cout << "Puntatore nullo" << std::endl;
        } else {
            std::cout << "Puntatore valido all'indirizzo: " << valore << std::endl;
        }
    } else {
        std::cout << "Tipo non supportato" << std::endl;
    }
}

int main() {
    stampa_sicura(42);
    stampa_sicura(3.14);
    stampa_sicura(std::string("Hello"));
    int x = 10;
    stampa_sicura(&x);
    stampa_sicura(nullptr);
    stampa_sicura(std::vector<int>{1, 2, 3});
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è lo scopo principale dei type traits in C++?
2. Quali sono le principali categorie di type traits disponibili nella libreria standard?
3. Come si può utilizzare `std::enable_if` con i type traits per implementare la specializzazione di template?
4. Quali miglioramenti sono stati introdotti in C++17 e C++20 per l'utilizzo dei type traits?
5. Come si può implementare un type trait personalizzato per verificare una proprietà specifica di un tipo?
6. In che modo i type traits possono migliorare le prestazioni del codice?
7. Qual è la differenza tra `std::is_same` e `std::is_base_of`?
8. Come si può utilizzare `if constexpr` insieme ai type traits?

## Esercizi Proposti

1. Implementa una funzione template `somma_sicura` che accetta due parametri dello stesso tipo e restituisce la loro somma solo se il tipo è numerico o una stringa.

2. Crea un type trait personalizzato `has_to_string` che verifica se un tipo ha un metodo `to_string()`.

3. Implementa una classe template `SafeContainer` che utilizza type traits per garantire che solo tipi copiabili possano essere memorizzati.

4. Scrivi una funzione template `converti` che converte un tipo in un altro solo se la conversione è sicura, utilizzando `std::is_convertible`.

5. Implementa un algoritmo di ordinamento generico che utilizza `std::is_trivially_copyable` per ottimizzare lo scambio di elementi.

6. Crea una funzione template `crea_copia_profonda` che crea una copia profonda di un oggetto se contiene puntatori, altrimenti una copia normale.

7. Implementa un wrapper di funzione che verifica a tempo di compilazione se i tipi degli argomenti sono compatibili con i parametri della funzione.

8. Scrivi un type trait personalizzato che verifica se un tipo è serializzabile (ha operatori di input e output).