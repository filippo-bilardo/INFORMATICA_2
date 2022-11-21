/** ****************************************************************************************
* \mainpage conta.c
*
* @brief Conteggio numero di caratteri, parole e righe
* 
* @author 	
* @date 	
* @version 	1.0  14/11/2022 Versione iniziale
*/

#include <stdio.h>  //fopen, printf, ...
#include <limits.h>

int main ()
{
	char nomeFileIN[]="conta.c";
	int c, err, contChar=0, c2=0, contRighe=0; 
	FILE *fileIN;
	
	/*Apertura del file in lettura + controllo 
	che sia andato a buon fine*/
	fileIN = fopen(nomeFileIN, "r");
	if(fileIN==NULL) {
		printf("\nErrore nell'apertura del file %s\n", nomeFileIN);
        return 1;
	} else {
		printf("\nFile %s aperto correttamente.\n", nomeFileIN);
	} 
	
	//Leggiamo tutti i caratteri fino alla fine
	//del file
	while((c=fgetc(fileIN))!=EOF)
	{	
        putchar(c);
		printf("%c ",(char)c);
		//Considero come carettere i codici ascii
		//tra 32 (lo spazio) e 126 (~)
	    if(c>=32 && c<=126) {
			contChar++;
		}
		//Se troviamo un a capo significa che abbiamo una
		//nuova riga
		if (c=='\n') {
			contRighe++;
		}
	}
	//Controllo che il file si sia chiuso senza problemi
	err=fclose(fileIN);
	if(err!=0) {
		printf("\nErrore nella chiusura del fileIN\n");
	} 
	
	printf ("I caratteri sono: %d\n", contChar);
	printf ("Le parole sono: %d\n", c2);
	printf ("Le righe sono: %d\n", contRighe);
	return 0;
}
