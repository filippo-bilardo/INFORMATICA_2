/* str01_def_init.c - © FB - 08/12/20
 * Creazione e inizializzazione di un vettore stringa
 */
#include <stdio.h> //printf

int main(int argc, char *argv[]) {
  
  //Creiamo un vettore di caratteri di 30 elementi
  char stringa[30];
  
  //Assegnamo i caratteri della stringa ai singoli elementi del vettore
  //In un vettore contenente una stringa l'ultimo elemento deve essere = a 0
  stringa[0]='C';
  stringa[1]='i';
  stringa[2]='a';
  stringa[3]='o';
  stringa[4]='\0';
  
  //Stampiamo la stringa e terminiamo il programma
  printf("stringa[30]=%s\n", stringa);
  return 0;
} 