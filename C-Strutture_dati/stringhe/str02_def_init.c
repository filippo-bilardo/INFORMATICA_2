/* str02_def_init.c - © FB - 08/12/20
 * Creazione e inizializzazione di un vettore stringa
 */
#include <stdio.h> //printf

int main(int argc, char *argv[]) {
  
  //Creiamo un vettore di caratteri di 30 elementi
  //e gli assegnamo la stringa "Ciao mondo"
  //alla fine della stringa verrà aggiunto automanticamente il valore 0
  //allo stesso modo dell'istruzione str[10]='\0';
  char str[30]="Ciao mondo";
  
  //Stampiamo la stringa e terminiamo il programma
  printf("str[30]=%s\n", str);  
  return 0;
} 