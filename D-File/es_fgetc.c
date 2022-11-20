#include <stdio.h>
#include <stdlib.h>
 
int main(void)
{
    int ret_val = EXIT_FAILURE;
    const char* fname = "conta.c";
    FILE* fp = fopen(fname, "r");
    if(!fp) {
        perror("File opening failed");
        return ret_val;
    }
 
    int c; // note: int, not char, required to handle EOF
    while ((c = fgetc(fp)) != EOF) { // standard C I/O file reading loop
       putchar(c);
    }
 
    if (ferror(fp)) {
        puts("I/O error when reading");
    } else if (feof(fp)) {
        puts("End of file reached successfully");
        ret_val = EXIT_SUCCESS;
    }
 
    fclose(fp);
    return ret_val;
}