/**
 * @file fileShow.c
 * @date 15/10/2023
 * 
 * @brief Stampa il contenuto di un file in esadecimale e ASCII.
 * 
 * Il programma prende in input il nome di un file e stampa il suo contenuto
 * in esadecimale e ASCII.
 * 
 * @versione 1.0
 */
#include <stdio.h>

void printHexAndAscii(FILE *file);

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Utilizzo: %s <nome_del_file>\n", argv[0]);
        return 1;
    }

    FILE *file;
    file = fopen(argv[1], "rb");

    if (file == NULL) {
        perror("Errore nell'apertura del file");
        return 1;
    }

    printHexAndAscii(file);
    fclose(file);

    return 0;
}

void printHexAndAscii(FILE *file) {
    unsigned char buffer[16];
    size_t bytesRead;
    size_t address = 0;

    while ((bytesRead = fread(buffer, 1, sizeof(buffer), file)) > 0) {
        printf("%08zx: ", address);

        for (int i = 0; i < 16; i++) {
            if (i < bytesRead) {
                printf("%02x ", buffer[i]);
            } else {
                printf("   "); // Stampa spazi per byte mancanti
            }

            if (i == 7) {
                printf(" "); // Spazio aggiuntivo tra i primi 8 byte
            }
        }

        printf(" ");

        for (size_t i = 0; i < bytesRead; i++) {
            if (buffer[i] >= 32 && buffer[i] <= 126) {
                printf("%c", buffer[i]); // Caratteri ASCII stampati
            } else {
                printf("."); // Caratteri non stampabili sostituiti con un punto
            }
        }

        printf("\n");
        address += bytesRead;
    }
}
