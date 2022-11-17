#include <stdio.h>
#include <stdlib.h>
#define MAX 50 //lunghezza 

int main()
{
	char pfile[MAX+1];
	char pfile2[MAX+1];	
	char c;
	
	FILE *FileIN,*FileOUT;
	
	printf("Nome del file da leggere:");
	scanf("%s",pfile);
	printf("Nome del file destinazione:");
	scanf("%s",pfile2);
	
	FileIN=fopen(pfile,"r");
	FileOUT=fopen(pfile2,"a");
	
	if (FileIN != NULL && FileOUT != NULL)
	{
		while(!feof(FileIN))
		{
			c=fgetc(FileIN);
			if(c>='a' && c<='z')
			c-=32;
			fputc(c,FileOUT);
		}
		fclose(FileIN);
		fclose(FileOUT);
		
	}
	
	else
    	printf("errore nell'apertura del file\n");
}