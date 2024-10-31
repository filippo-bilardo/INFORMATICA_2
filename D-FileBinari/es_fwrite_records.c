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
    printf("Apertura del file per la scrittura...\n"); 
    FILE *fp = fopen("records.bin", "wb");
    if (fp == NULL) {
        perror("Errore nell'apertura del file");
        return EXIT_FAILURE;
    }

    // Scrittura dei record nel file
    printf("Scrittura dei record nel file...\n");
    size_t NUM_REC_TO_WRITE = 2;
    size_t num_written = fwrite(records, sizeof(struct Record), 2, fp);
    //size_t NUM_REC_TO_WRITE = num_records;
    //size_t num_written = fwrite(records, sizeof(struct Record), NUM_REC_TO_WRITE, fp);
    if (num_written != NUM_REC_TO_WRITE) {
        perror("Errore nella scrittura del file");
        fclose(fp);
        return EXIT_FAILURE;
    }

    // Chiusura del file
    fclose(fp);
    printf("Scrittura dei record completata con successo.\n");

    // Verifica della corretta scrittura del file
    printf("Lettura dei record dal file...\n");
    // Lettura dei record dal file
    fp = fopen("records.bin", "rb");
    if (fp == NULL) {
        perror("Errore nell'apertura del file");
        return EXIT_FAILURE;
    }

    // Creazione di una variabile per contenere il record letto dal file
    struct Record r;

    // Lettura dei record dal file uno alla volta
    while (fread(&r, sizeof(struct Record), 1, fp) == 1) {
        printf("Nome: %s\n", r.name);
        printf("Età: %d\n", r.age);
    }

    // Chiusura del file e uscita dal programma
    fclose(fp);
    return EXIT_SUCCESS;
}