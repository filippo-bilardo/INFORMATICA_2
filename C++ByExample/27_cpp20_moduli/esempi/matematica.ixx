// matematica.ixx - File di interfaccia del modulo
export module matematica;

#include <stdexcept>

// Esportiamo le funzioni matematiche di base
export int somma(int a, int b) {
    return a + b;
}

export int sottrazione(int a, int b) {
    return a - b;
}

export int moltiplicazione(int a, int b) {
    return a * b;
}

export int divisione(int a, int b) {
    if (b == 0) throw std::invalid_argument("Divisione per zero");
    return a / b;
}

// Esportiamo una classe per operazioni matematiche più complesse
export class Calcolatrice {
private:
    int memoria;

public:
    Calcolatrice() : memoria(0) {}
    
    void imposta_memoria(int valore) {
        memoria = valore;
    }
    
    int ottieni_memoria() const {
        return memoria;
    }
    
    int aggiungi_a_memoria(int valore) {
        memoria += valore;
        return memoria;
    }
    
    int sottrai_da_memoria(int valore) {
        memoria -= valore;
        return memoria;
    }
    
    void azzera_memoria() {
        memoria = 0;
    }
};

// Funzione interna al modulo (non esportata)
int quadrato(int x) {
    return x * x;
}

// Esportiamo una funzione che usa la funzione interna
export int calcola_area_quadrato(int lato) {
    return quadrato(lato);
}

/*
Note sulla compilazione:
I moduli C++20 richiedono un supporto specifico dal compilatore e dal sistema di build.

Per compilare con GCC (versione 11 o superiore):
  g++ -std=c++20 -fmodules-ts matematica.ixx -c
  g++ -std=c++20 -fmodules-ts main.cpp matematica.o -o programma

Per compilare con Clang (versione 14 o superiore):
  clang++ -std=c++20 -fmodules matematica.ixx -c
  clang++ -std=c++20 -fmodules main.cpp matematica.o -o programma

Per compilare con MSVC (Visual Studio 2019 16.11 o superiore):
  cl /std:c++latest /experimental:module /c matematica.ixx
  cl /std:c++latest /experimental:module main.cpp matematica.obj
*/