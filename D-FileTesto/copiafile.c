/*
copiafile.c
25/10/23

NOTA: il carattere letto è un char ma lo definiamo int per 
poter riconoscere la costante EOF
vedi https://en.cppreference.com/w/c/io/fgetc 
*/
#include <stdio.h>

void copyFile(char src[], char dst[]) {

    FILE *inputFile, *outputFile;
    int ch; 

    inputFile = fopen(src, "r");
    outputFile = fopen(dst, "w");

    if (inputFile == NULL || outputFile == NULL) {
        printf("Errore nell'apertura dei file.\n");
        return;
    }

    while ((ch = fgetc(inputFile)) != EOF) {
        fputc(ch, outputFile);
    }

    fclose(inputFile);
    fclose(outputFile);
}

int main(int argc, char *argv[]) {

    if (argc == 1) {
        printf("Utilizzo: \n%s SOURCE [DESTINATION]\n", argv[0]);
        return 1;
    }

    if (argc != 3) {
        copyFile(argv[1], "out.txt");
    } else {
        copyFile(argv[1], argv[2]);
    }
    
    return 0;
}
