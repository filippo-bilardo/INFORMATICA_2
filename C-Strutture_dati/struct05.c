#include <stdio.h>
#include <string.h>

struct Studente {
    char nome[50];
    int eta;
    float media;
};

void stampaStudente(struct Studente s) {
    printf("Nome: %s, Età: %d, Media: %.2f\n", s.nome, s.eta, s.media);
}

int main() {
    struct Studente s1 = {"Mario Rossi", 20, 27.5};
    struct Studente s2;

    strcpy(s2.nome, "Lucia Bianchi");
    s2.eta = 22;
    s2.media = 29.0;

    stampaStudente(s1);
    stampaStudente(s2);

    return 0;
}