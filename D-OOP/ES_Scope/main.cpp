/**
 * @file main.cpp
 * Esempio di scope e durata degli oggetti
 * 
 * g++ -o main main.cpp
 * 
 * @date 11/12/2024
 */
#include "Oggetto.h"

Oggetto globale; // Scope globale, durata statica

void esempio() {
    static Oggetto statico; // Durata statica, scope locale
    Oggetto locale;         // Durata automatica, scope locale

    statico.metodo();
    locale.metodo();
}

int main() {
    esempio();

    Oggetto* dinamico = new Oggetto(); // Durata dinamica
    dinamico->metodo();
    delete dinamico; // Deallocazione

    return 0;
}