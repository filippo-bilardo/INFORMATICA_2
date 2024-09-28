#include <stdio.h>

#define DIM_COGN 50
#define NUM_VOTI 5

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
  // Create a structure variable of myStructure called s1
  struct myStructure s1;

  // Assign values to members of s1
  s1.myNum = 13;
  s1.myLetter = 'B';

  // Print values
  printf("My number: %d\n", s1.myNum);
  printf("My letter: %c\n", s1.myLetter);

  return 0;
}