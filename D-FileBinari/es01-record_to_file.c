#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Struttura per rappresentare un record
struct Record {
  char name[32];
  int age;
};

int main() {
  // Apre il file in modalità scrittura
  FILE *fp = fopen("records.txt", "w");
  if (fp == NULL) {
    perror("Errore nell'apertura del file");
    exit(EXIT_FAILURE);
  }

  // Crea un nuovo record
  struct Record r = {
    .name = "John Doe",
    .age = 32
  };

  // Scrive il record nel file
  size_t num_bytes_written = fwrite(&r, sizeof(struct Record), 1, fp);
  if (num_bytes_written != 1) {
    perror("Errore nella scrittura del record nel file");
    exit(EXIT_FAILURE);
  }

  // Chiude il file
  fclose(fp);

  return 0;
}
