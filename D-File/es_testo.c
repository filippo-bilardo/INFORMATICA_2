#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE* fp;
    char c, nome[] = "testo.txt";
    if((fp = fopen(nome, "r")) == NULL) {
        fprintf(stderr, "Errore nell'apertura di %s\n", nome);
        exit(1);
    }

    while(fscanf(fp, "%c", &c) == 1) {
        printf("%c", c);
    }

    fclose(fp);
}


