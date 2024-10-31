/**
 * Esempio di come verificare la corretta scrittura dei record
 * 
 * @file es_fwrite_records_test.c
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
    // Lettura dei record dal file
    FILE *fp = fopen("records.bin", "rb");
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
    return 0;
}