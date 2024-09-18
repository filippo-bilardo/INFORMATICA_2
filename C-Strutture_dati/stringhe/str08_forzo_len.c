/* str08_forzo_len.c - © FB - 08/12/20
 * Lunghezza di una stringa
 */
#include <stdio.h>   //printf
#include <string.h>  //strlen

int main(int argc, char *argv[]) {

  //Inserisco il carattere terminatore prima della fine della stringa
  char str[30];
  strcpy(str, "Ciao mondo");
  str[3]=0;
  printf("str[30]=%s\n", str);

  //La lunghezza è calcolata dal primo elemento del vettore fino al terminatore
  int len=strlen(str);
  printf("Il vettore str[30] contiene una stringa %d caratteri\n", len);
   
  return 0;
} 
