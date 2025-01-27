#include "ContoBancario.h"
#include <iostream>

int main() {
    ContoBancario conto(12345, "Mario Rossi", 1000.0);

    conto.deposita(500.0);
    std::cout << "Saldo dopo il deposito: " << conto.ottieniSaldo() << " euro\n";

    conto.preleva(200.0);
    std::cout << "Saldo dopo il prelievo: " << conto.ottieniSaldo() << " euro\n";

    conto.preleva(1500.0); // Saldo insufficiente
    return 0;
}