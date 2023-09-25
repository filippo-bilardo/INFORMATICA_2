/* str05_len_string.c - © FB - 08/12/20
 * Calcolo della lunghezza di una stringa
 */
#include <stdio.h> //printf

int main(int argc, char *argv[]) {
  
  //Dichiariamo i e la stringa str
  int i; char str[]="Ciao mondo";
  printf("str[]=%s\n", str);
  
  //stampiamo i singoli elementi del vettore
  printf("str[]=");
  for(i=0; str[i]!='\0'; i++) 
    printf("%c", str[i]);
  printf("Il vettore str[] contiene %d caratteri\n\n", i);
  
  //stampiamo i singoli elementi del vettore
  for(i=0; str[i]!='\0'; i++) 
    printf("str[%d]=%c\n",i, str[i]);
  printf("\nIl vettore str[] contiene %d elementi\n", i+1);
  
  return 0;
} 
