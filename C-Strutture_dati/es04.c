#include <stdio.h>

struct Persona {
    char nome[50];
    int età;
    float altezza;
};

int main() {
    // Dichiarazione e inizializzazione di una struttura
    struct Persona persona1;

    // Assegnazione dei valori ai membri della struttura
    sprintf(persona1.nome, "Mario Rossi"); // non è possibile l'assegnazione diretta
    persona1.età = 30;
    persona1.altezza = 1.75;

    // Stampa dei valori
    printf("Nome: %s\n", persona1.nome);
    printf("Età: %d\n", persona1.età);
    printf("Altezza: %.2f metri\n", persona1.altezza);

    return 0;
}
