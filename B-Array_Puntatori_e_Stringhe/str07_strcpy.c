/* str07_strcpy.c - © FB - 08/12/20
 * Copia di una stringa
 */
#include <stdio.h>   //printf
#include <string.h>  //strcpy

int main(int argc, char *argv[]) {

  //Dichiariamo un vettore di 30 char
  char dest[30];
  //Inseriamo una stringa nel vettore dest, scrivendo ogni
  //singolo elemento e inserendo lo 0 finale
  dest[0]='H';
  dest[1]='o';
  dest[2]='l';
  dest[3]='a';
  dest[4]='\0';
  printf("dest[30]=%s\n", dest);

  //Utilizziamo la funzione strcpy della libreria string.h
  //per copiare la stringa ""Ciao ragazzi!" nella stringa dest, 
  //incluso il carattere terminatore '\0'
  strcpy(dest, "Ciao ragazzi!");
  printf("dest[30]=%s\n", dest);  

  return 0;
} 
