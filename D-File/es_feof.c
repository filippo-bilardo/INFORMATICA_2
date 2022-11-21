#include <stdio.h>
#include <stdlib.h>
 
int main(void)
{
	const char* fname = "/tmp/unique_name.txt"; // or tmpnam(NULL);
	FILE* fp = fopen(fname, "w+");
	if(!fp) {
		perror("File opening failed");
		return EXIT_FAILURE;
	}
	fputs("Hello!\t~\n 0123\n", fp);
	rewind(fp);
 
	int c; // note: int, not char, required to handle EOF
	while (1) { // standard C I/O file reading loop
		c = fgetc(fp);
		printf("Carattere letto = %c, ", c); //putchar(c);
		printf("(fgetc(fp)==EOF) = %d, ", c==EOF);
		printf("feof(fp) = %d \n", feof(fp));
		if(feof(fp)) break;
	}

	fclose(fp);
	remove(fname);
	return EXIT_SUCCESS;
}