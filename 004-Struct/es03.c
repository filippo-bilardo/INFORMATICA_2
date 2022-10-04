/**
 * Ricorda che le stringhe in C sono in realtà una matrice di caratteri e, 
 * sfortunatamente, non puoi assegnare un valore a una matrice come questa
 */
#include <stdio.h>
#include <string.h>

struct myStructure {
  int myNum;
  char myLetter;
  char myString[30];  // String
};

int main() {
  struct myStructure s1;

  // Trying to assign a value to the string
  //s1.myString = "Some text";  //Error
  // Assign a value to the string using the strcpy function
  strcpy(s1.myString, "Some text");

  // Trying to print the value
  printf("My string: %s\n", s1.myString);
  
  return 0;
}