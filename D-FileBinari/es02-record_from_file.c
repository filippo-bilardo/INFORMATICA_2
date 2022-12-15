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

  // Legge il record dal file
  size_t num_bytes_read = fread(&r, sizeof(struct Record), 1, fp);
  if (num_bytes_read != 1) {
    perror("Errore nella lettura del record dal file");
    exit(EXIT_FAILURE);
  }

  // Stampa il record letto
  printf("Nome: %s\n", r.name);
  printf("Età: %d\n", r.age);

  // Chiude il file
  fclose(fp);

  return 0;
}
