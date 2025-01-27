#include "numeri.hpp"
#include <iostream>

void Numeri::aggiungiNumero(int numero) {
    elencoNumeri.push_back(numero);
}

void Numeri::stampaNumeri() const {
    for (int numero : elencoNumeri) {
        std::cout << numero << " ";
    }
    std::cout << std::endl;
}