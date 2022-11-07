#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    FILE* fp;
    char s[256], nome[] = "out.txt";
    if((fp = fopen(nome, "w")) == NULL) {
        fprintf(stderr, "Errore nell'apertura di %s\n", nome);
        exit(1);
    }

    do {
        scanf("%s", s);
        fprintf(fp, "%s\n", s);
    } while(strcmp(s, "fine") != 0);

    fclose(fp);
}


