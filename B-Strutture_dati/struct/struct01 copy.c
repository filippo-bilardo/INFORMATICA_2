#include <stdio.h>

#define DIM_COGN 50
#define NUM_VOTI 5
#define NUM_STUD 5

// Struttura per la data
typedef struct Data {
  int giorno;
  int mese;
  int anno;
} data;

// Struttura per lo studente
typedef struct Studente {
  char cognome[DIM_COGN];
  data data_nascita;
  int voti[NUM_VOTI];
} studente;

int main() {
  
  
}