/**
 * Esempio di come utilizzare la funzione fwrite per scrivere i record 
 * di un vettore di record in un file binario
 * 
 * @file es_fwrite_records.c
 * @author Filippo Bilardo
 * @date 31.10.2024
 * @version 1.0
 */
#include <stdio.h>  // FILE, fopen, fwrite, fclose, perror, printf
#include <stdlib.h> // EXIT_FAILURE

/// Struttura per rappresentare un record
struct Record {
    char name[32];
    int age;
};

int main() {
    // Creazione di un vettore di record
    struct Record records[] = {
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35}
    };
    size_t num_records = sizeof(records) / sizeof(records[0]);

    // Apertura del file in modalità scrittura binaria
    FILE *fp = fopen("records.bin", "wb");
    if (fp == NULL) {
        perror("Errore nell'apertura del file");
        return EXIT_FAILURE;
    }

    // Scrittura dei record nel file
    size_t num_written = fwrite(records, sizeof(struct Record), 2, fp);
    //size_t num_written = fwrite(records, sizeof(struct Record), num_records, fp);
    if (num_written != num_records) {
        perror("Errore nella scrittura del file");
        fclose(fp);
        return EXIT_FAILURE;
    }

    // Chiusura del file
    fclose(fp);

    printf("Scrittura dei record completata con successo.\n");
    return 0;
}