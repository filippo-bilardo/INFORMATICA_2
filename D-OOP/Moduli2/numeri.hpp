#ifndef NUMERI_HPP
#define NUMERI_HPP

#include <vector>

class Numeri {
public:
    void aggiungiNumero(int numero);
    void stampaNumeri() const;

private:
    std::vector<int> elencoNumeri;
};

#endif // NUMERI_HPP