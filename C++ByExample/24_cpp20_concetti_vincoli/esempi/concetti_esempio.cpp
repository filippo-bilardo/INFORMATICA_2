// Esempio di utilizzo dei concetti in C++20
#include <iostream>
#include <string>
#include <vector>
#include <list>
#include <concepts>
#include <type_traits>

// Definizione di concetti personalizzati

// Concetto che verifica se un tipo supporta l'operazione di addizione
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// Concetto che verifica se un tipo è un contenitore
template<typename T>
concept Container = requires(T c) {
    typename T::value_type;
    typename T::iterator;
    typename T::const_iterator;
    { c.begin() } -> std::same_as<typename T::iterator>;
    { c.end() } -> std::same_as<typename T::iterator>;
    { c.size() } -> std::convertible_to<std::size_t>;
    { c.empty() } -> std::convertible_to<bool>;
};

// Concetto che verifica se un tipo è un numero intero positivo
template<typename T>
concept PositiveInteger = std::integral<T> && requires(T n) {
    requires n > 0;
};

// Funzioni che utilizzano i concetti

// Funzione che somma due valori di tipo Addable
template<Addable T>
T somma(T a, T b) {
    return a + b;
}

// Funzione che stampa gli elementi di un Container
template<Container C>
void stampa_contenitore(const C& contenitore) {
    std::cout << "Contenuto del contenitore:";
    for (const auto& elemento : contenitore) {
        std::cout << " " << elemento;
    }
    std::cout << std::endl;
}

// Funzione che calcola il fattoriale di un PositiveInteger
template<PositiveInteger T>
T fattoriale(T n) {
    if (n == 1) return 1;
    return n * fattoriale(n - 1);
}

// Utilizzo dei concetti predefiniti di C++20

// Funzione che accetta solo tipi numerici
template<std::integral T>
void stampa_numero_intero(T n) {
    std::cout << "Numero intero: " << n << std::endl;
}

// Funzione che accetta solo tipi in virgola mobile
template<std::floating_point T>
void stampa_numero_float(T n) {
    std::cout << "Numero in virgola mobile: " << n << std::endl;
}

// Funzione che accetta solo tipi che supportano il confronto di uguaglianza
template<std::equality_comparable T>
bool sono_uguali(const T& a, const T& b) {
    return a == b;
}

// Classe che utilizza vincoli sui parametri di template
template<typename T>
    requires std::copyable<T> && std::default_initializable<T>
class Buffer {
private:
    std::vector<T> data;

public:
    Buffer(size_t size) : data(size) {}
    
    void fill(const T& value) {
        std::fill(data.begin(), data.end(), value);
    }
    
    void print() const {
        for (const auto& item : data) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
    }
};

// Utilizzo della sintassi abbreviata per i vincoli
template<std::integral auto N>
void stampa_sequenza() {
    for (int i = 0; i < N; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
}

int main() {
    // Test delle funzioni con concetti personalizzati
    std::cout << "=== Test dei concetti personalizzati ===" << std::endl;
    
    // Test di Addable
    std::cout << "Somma di interi: " << somma(5, 3) << std::endl;
    std::cout << "Somma di double: " << somma(2.5, 3.7) << std::endl;
    std::cout << "Somma di stringhe: " << somma(std::string("Hello, "), std::string("World!")) << std::endl;
    
    // Test di Container
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<double> l = {1.1, 2.2, 3.3, 4.4};
    stampa_contenitore(v);
    stampa_contenitore(l);
    
    // Test di PositiveInteger
    std::cout << "Fattoriale di 5: " << fattoriale(5) << std::endl;
    
    // Test dei concetti predefiniti
    std::cout << "\n=== Test dei concetti predefiniti ===" << std::endl;
    
    stampa_numero_intero(42);
    stampa_numero_float(3.14159);
    
    std::cout << "10 == 10? " << (sono_uguali(10, 10) ? "Sì" : "No") << std::endl;
    std::cout << "'a' == 'b'? " << (sono_uguali('a', 'b') ? "Sì" : "No") << std::endl;
    
    // Test della classe con vincoli
    Buffer<int> buffer_int(5);
    buffer_int.fill(42);
    std::cout << "Buffer di interi: ";
    buffer_int.print();
    
    // Test della sintassi abbreviata
    std::cout << "Sequenza di numeri (0-4): ";
    stampa_sequenza<5>();
    
    return 0;
}

/*
Note per la compilazione:
Questo esempio richiede un compilatore che supporti C++20 con i concetti.
Per compilare con GCC (versione 10 o superiore):
  g++ -std=c++20 concetti_esempio.cpp -o concetti_esempio

Per compilare con Clang (versione 10 o superiore):
  clang++ -std=c++20 concetti_esempio.cpp -o concetti_esempio

Per compilare con MSVC (Visual Studio 2019 16.8 o superiore):
  cl /std:c++latest /EHsc concetti_esempio.cpp
*/