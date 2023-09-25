/* str04_def_init.c - © FB - 08/12/20
 * Creazione e inizializzazione di un vettore stringa
 */
#include <stdio.h> //printf

int main(int argc, char *argv[]) {
  
  int vet[]={1,2,3};
  //Usiamo questo tipo di dichiarazione, quando vogliamo che la 
  //dimensione massima del vettore stringa sia uguale a quella 
  //della stringa specificata.
  char stringa[]="Ciao mondo";
  
  printf("stringa[]=%s\n", stringa);
  printf("vet[2]=%d\n", vet[2]);
   
  return 0;
} 