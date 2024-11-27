/* str03_errore.c - © FB - 08/12/20
 * Creazione e inizializzazione di un vettore stringa
 */
#include <stdio.h> //printf

int main(int argc, char *argv[]) {

  char destinazione[30];
  
  //Modalita' di assegnazione accettata solo in fase di dichiarazione
  destinazione="Ciao mondo"; //error: assignment to expression with array type
  
  printf("destinazione[30]=%s\n", destinazione);
  return 0;
} 