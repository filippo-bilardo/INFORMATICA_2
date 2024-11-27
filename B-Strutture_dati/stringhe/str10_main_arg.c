/* str10_main_arg.c - © FB - 08/12/20
 * Passaggio di argomenti alla funzione main tramite 
 * linea di comando
 */
#include <stdio.h>  //printf
#include <stdlib.h> //exit
#include <string.h> 

int main(int argc, char **argv) 
//int main(int argc, char *argv[])
//int main(int argc, char argv[][MAX_ARG_LENGTH])
{
  // Verifica argomenti passati al main
  int i;
  printf("\nNumero di argomenti passati, argc=%d\n", argc);
  
  // Stampa gli argomenti passati
  for(i=0; i<argc; ++i) {
    printf("argv[%d]:=%s\n", i, argv[i]);
  }
  printf("\n");

  return EXIT_SUCCESS;
} 
 