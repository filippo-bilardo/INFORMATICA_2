#ifndef OGGETTO_H
#define OGGETTO_H

#include <iostream>

class Oggetto {
public:
    Oggetto() { std::cout << "Oggetto creato\n"; }
    ~Oggetto() { std::cout << "Oggetto distrutto\n"; }
    void metodo() const { std::cout << "Metodo chiamato\n"; }
};

#endif