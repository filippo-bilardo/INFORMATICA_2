/** ****************************************************************************************
* \mainpage <esercizo_sui_file_e.c>
*
* @brief <cryptare e decryptare un file di testo>
* <specifiche del progetto>
* <specifiche del collaudo>
* 
* @author <Golzi Riccardo>
* @date <28/11/2022> 
*/


#include "stdio.h"
#include "stdlib.h"

#define max 50

void crypt(char[],char[]);   //funzione che crypta un file di testo 
void decrypt(char[],char[]);	//funzione che decrypta un file di testo

int main()
{
	char puntaFile[max+1];
	char puntaFile2[max+1];
	char puntaFile3[max+1];
	char c;
	
	printf("inserire il nome del file da cryptare:");
	scanf("%s",puntaFile);
	printf("inserire il nome del file destinazione:");		//qua andrà il testo cryptato
	scanf("%s",puntaFile2);
	printf("inserire il nome del file destinazione 2:");		//qua si passerà dal testo cryptato a quellodi partenza
	scanf("%s",puntaFile3);

	
	crypt(puntaFile,puntaFile2);
	decrypt(puntaFile2,puntaFile3);
	
	return 0;
	
}

/** ****************************************************************************************
* @brief <funzione che serve per cryptare un file di testo aumentando di tre la posizione delle lettere dell'alfabeto tramite il codice ascii>
* @param  <f1=file sorgente, f2 file destinazione>
* @retval <nessuno>
*
* @author <Golzi Riccardo>
* @version 1.0 <data> <Descrivere le modifiche apportate>
* @version 1.1 <data> <Descrivere le modifiche apportate>
*/

void crypt (char f1[],char f2[])
{
	int key=3;		//key è la chiave di criptatura e decriptatura, il valore tre è dato dalla consegna
	char c;		//variabile che serve per gestire i caratteri del file, assume il valore di ogni lettera del file sorgente
	FILE *fileIN,*fileOUT;
	
	fileIN= fopen(f1,"r");
	fileOUT= fopen(f2,"w");
	
	if(fileIN != NULL && fileOUT != NULL)	
	{
		while(!feof(fileIN))		
		{
			c= fgetc(fileIN);
			if(c>='a' && c<='w' || c>='A' && c<='W') // se le lettere vanno dalla a alla w usa la chiave di criptatura
			{
			c+=key;
		    }
		    else		//se invece vanno dalla x alla z toglie 23 cosi da poter ritornare all'inzio dell'alfabeto secondo il codice ascii
		    c-=23;
		    
		    fputc(c,fileOUT);
		}
		fclose(fileIN);
		fclose(fileOUT);
	}
	else
	printf("\nerrore in apertura file !");
	
	printf("\n");
	system("pause");
}

/** ****************************************************************************************
* @brief <funzione che serve per decryptare un file di testo diminuendo di tre la posizione delle lettere dell'alfabeto tramite il codice ascii>
* @param  <f1=file sorgente, f2 file destinazione>
* @retval <nessuno>
*
* @author <Golzi Riccardo>
*/

void decrypt (char f1[],char f2[])
{
	int key=3;
	char c;
	FILE *fileIN,*fileOUT;
	
	fileIN= fopen(f1,"r");
	fileOUT= fopen(f2,"w");
	
	if(fileIN != NULL && fileOUT != NULL)
	{
		while(!feof(fileIN))
		{
			c= fgetc(fileIN);
			if(c>='d' && c<='z' || c>='D' && c<='Z')
			{
			c-=key;
		    }
		    else
		    c+=23;
		    
		    fputc(c,fileOUT);
		}
		fclose(fileIN);
		fclose(fileOUT);
	}
	else
	printf("\nerrore in apertura file !");
	
	printf("\n");
	system("pause");
}


