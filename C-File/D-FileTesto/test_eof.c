/*
*/
#include <stdio.h>

int main(int argc, char *argv[]) {

    FILE *prtFileIn = fopen("in.txt", "r");
    FILE *prtFileOut = fopen("out.txt", "w");
    if(prtFileIn == NULL) {
        perror("Errore nell'apertura del file.\n");
        return 1;
    }

    char ch;
    //printf("EOF = %c %03d\n", EOF, EOF);
    int finefile = 0;
    while(!finefile) {
        ch = fgetc(prtFileIn);
        printf(" %c %03d - ", ch, ch);

        if(ch == EOF) {
            printf("EOF\n");
            break;
        }
        fputc(ch, prtFileOut);


        finefile=feof(prtFileIn);
        printf("finefile = %d\n", finefile);    
    }

    fclose(prtFileIn);
    
    return 0;
}
