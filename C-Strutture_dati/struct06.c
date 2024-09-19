#include <stdio.h>
#include <string.h>

//Definizione della struttura
struct indirizzo { 
  char citta[128]; 
  char via[128]; 
  int civico; 
};

int main(int argc, char **argv) {
    
    printf("Numero di parametri passati %d\n", argc);
    for(int i=0; i<argc; i++){
        printf("Parametro %d: %s\n", i, argv[i]);
    }

    // Creiamo la variabile strutture e assegniamo dei valori
    struct indirizzo ind1 = {"Arese", "via Matteotti", 5};

    // Solo dicharazione
    struct indirizzo ind2; //ind2 è un record
    struct indirizzo ind3;
    struct indirizzo ind4[10]; //ind3 è una tabella, ogni elem. è un record

    strcpy(ind2.citta, argv[1]);
    strcpy(ind2.via, argv[2]);
    ind2.civico = 20;
    printf("Civico = %d\n", ind1.civico);
    printf("Indirizzo 2: %s %s %d\n", ind2.citta, ind2.via, ind2.civico);
  
    return 0;
}