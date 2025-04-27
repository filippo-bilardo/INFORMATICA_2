// main.cpp - Programma che utilizza il modulo matematica
import matematica;  // Importa il modulo matematica

#include <iostream>
#include <stdexcept>

int main() {
    try {
        // Utilizzo delle funzioni esportate dal modulo
        std::cout << "Operazioni matematiche di base:" << std::endl;
        std::cout << "5 + 3 = " << somma(5, 3) << std::endl;
        std::cout << "5 - 3 = " << sottrazione(5, 3) << std::endl;
        std::cout << "5 * 3 = " << moltiplicazione(5, 3) << std::endl;
        std::cout << "6 / 3 = " << divisione(6, 3) << std::endl;
        
        // Utilizzo della classe esportata dal modulo
        std::cout << "\nUtilizzo della classe Calcolatrice:" << std::endl;
        Calcolatrice calc;
        
        std::cout << "Memoria iniziale: " << calc.ottieni_memoria() << std::endl;
        
        calc.imposta_memoria(10);
        std::cout << "Memoria dopo impostazione: " << calc.ottieni_memoria() << std::endl;
        
        std::cout << "Aggiungo 5 alla memoria: " << calc.aggiungi_a_memoria(5) << std::endl;
        std::cout << "Sottraggo 3 dalla memoria: " << calc.sottrai_da_memoria(3) << std::endl;
        
        // Utilizzo della funzione che usa funzionalità interne del modulo
        int lato = 4;
        std::cout << "\nArea di un quadrato con lato " << lato << ": " << calcola_area_quadrato(lato) << std::endl;
        
        // Test della gestione delle eccezioni
        try {
            std::cout << "Tentativo di divisione per zero: " << divisione(10, 0) << std::endl;
        } catch (const std::invalid_argument& e) {
            std::cout << "Eccezione catturata: " << e.what() << std::endl;
        }
        
    } catch (const std::exception& e) {
        std::cerr << "Errore: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}

/*
Output atteso:

Operazioni matematiche di base:
5 + 3 = 8
5 - 3 = 2
5 * 3 = 15
6 / 3 = 2

Utilizzo della classe Calcolatrice:
Memoria iniziale: 0
Memoria dopo impostazione: 10
Aggiungo 5 alla memoria: 15
Sottraggo 3 dalla memoria: 12

Area di un quadrato con lato 4: 16
Eccezione catturata: Divisione per zero
*/