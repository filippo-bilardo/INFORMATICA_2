/**
 * Esempio di utilizzo della funzione fwrite per scrivere un array di interi in un 
 * file binario e della funzione fread per leggere i dati dal file binario.
 * 
 * @file es_fwrite_array.c
 * @date 31.10.2024
 * @version 1.0
 * @author Filippo Bilardo
 * 
 * @see https://www.tutorialspoint.com/c_standard_library/c_function_fopen.htm
 * @see https://www.tutorialspoint.com/c_standard_library/c_function_fclose.htm
 * @see https://www.tutorialspoint.com/c_standard_library/c_function_perror.htm
 * @see https://www.tutorialspoint.com/c_standard_library/c_function_fwrite.htm
 * @see https://www.tutorialspoint.com/c_standard_library/c_function_fread.htm
 */
#include <stdio.h>  // FILE, fopen, fwrite, fclose, perror, printf
#include <stdlib.h> // EXIT_FAILURE

int main() {

    // Apre il file binario in modalità scrittura
    FILE *file = fopen("file_binario.bin", "wb"); // Apri il file binario in modalità scrittura
    if (file == NULL) {
        perror("Errore durante l'apertura del file binario");
        return EXIT_FAILURE;
    }

    // Dati da scrivere nel file binario
    int dati_da_scrivere[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // Scrivi 7 interi nel file binario
    size_t NUM_EL_TO_WRITE = 7;
    size_t elementi_scritti = fwrite(dati_da_scrivere, sizeof(int), NUM_EL_TO_WRITE, file);
    if (elementi_scritti != NUM_EL_TO_WRITE) {
        perror("Errore durante la scrittura del file binario");
        fclose(file);
        return EXIT_FAILURE;
    }

    // Chiude il file binario 
    fclose(file);
    printf("Dati scritti con successo nel file binario.\n");

    // Verifica la corretta scrittura del file binario
    // Apre il file binario in modalità lettura
    file = fopen("file_binario.bin", "rb");
    if (file == NULL) {
        perror("Errore durante l'apertura del file binario");
        return EXIT_FAILURE;
    }

    // Leggo tutti i dati dal file binario
    // Dichiaro un array per contenere i dati da leggere dal file binario
    int dati_letti[10];
    // Leggi 4 interi dal file binario
    size_t NUM_EL_TO_READ = 4;
    size_t elementi_letti = fread(dati_letti, sizeof(int), NUM_EL_TO_READ, file);
    if (elementi_letti != NUM_EL_TO_READ) {
        perror("Errore durante la lettura del file binario");
        fclose(file);
        return EXIT_FAILURE;
    }
    // Stampa i dati letti dal file binario
    printf("Dati letti dal file binario:\n");
    for (size_t i = 0; i < NUM_EL_TO_READ; i++) {
        printf("%d ", dati_letti[i]);
    }
    printf("\n");

    // Metodo alternativo per leggere i dati dal file binario
    printf("Dati letti dal file binario (metodo alternativo):\n");
    // Resetta il puntatore del file all'inizio del file
    rewind(file);
    // Leggo i dati dal file binario uno alla volta
    int dato;
    while (fread(&dato, sizeof(int), 1, file) == 1) {
        printf("%d ", dato);
    }
    printf("\n");

    // Chiude il file binario
    fclose(file);



    return EXIT_SUCCESS;
}
