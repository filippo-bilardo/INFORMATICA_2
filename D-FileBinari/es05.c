#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Struttura per rappresentare un record
struct Record {
  char name[32];
  int age;
};

int main() {
  // Apre il file in modalità lettura
  FILE *fp = fopen("records.txt", "r");
  if (fp == NULL) {
    perror("Errore nell'apertura del file");
    exit(EXIT_FAILURE);
  }

  // Crea una variabile per contenere il record letto dal file
  struct Record r;

  // Legge i record dal file uno alla volta
  while (fread(&r, sizeof(struct Record), 1, fp) == 1) {
    // Verifica se il campo age corrisponde al valore cercato
    if (r.age == 30) {
     
