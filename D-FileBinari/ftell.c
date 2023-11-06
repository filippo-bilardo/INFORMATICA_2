#include <stdio.h>


int main(int argc, char *argv[]) {
    FILE *file = fopen("a.out", "rb"); // Apri il file binario in modalità lettura

    if (file == NULL) {
        perror("Errore durante l'apertura del file binario");
        return 1;
    }

    // Sposta il cursore all'offset 50 byte dalla posizione corrente
    fseek(file, 50, SEEK_CUR);
    // Ottieni la posizione corrente del cursore
    long posizione = ftell(file);

    printf("Posizione corrente del cursore: %ld\n", posizione);

    fclose(file);
    return 0;
}
