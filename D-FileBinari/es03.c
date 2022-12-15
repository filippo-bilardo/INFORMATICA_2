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

  // Crea un array di record
  struct Record records[] = {
    { .name = "John Doe", .age = 32 },
    { .name = "Jane Doe", .age = 30 },
    { .name = "Joe Doe", .age = 28 }
  };

  // Scrive i record nel file
  size_t num_records = sizeof(records) / sizeof(struct Record);
  size_t num_bytes_written = fwrite(records, sizeof(struct Record), num_records, fp);
  if (num_bytes_written != num_records) {
    perror("Errore nella scrittura dei record nel file");
    exit(EXIT_FAILURE);
  }

  // Chiude il file
  fclose(fp);

  return 0;
}
