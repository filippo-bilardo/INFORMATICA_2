#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE* fp;
    int n;
    char nome[] = "numeri.txt";
    if((fp = fopen(nome, "r")) == NULL) {
        fprintf(stderr, "Errore nell'apertura di %s\n", nome);
        exit(1);
    }

    while(fscanf(fp, "%d", &n) == 1) {
        printf("%d\n", n);
    }

    fclose(fp);
}


