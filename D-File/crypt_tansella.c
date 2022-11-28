//Andrea Tansella 4H
#include <stdio.h>

#define CRIPT_KEY  3
#define FILE_NAME_IN    "nomi.txt"
#define FILE_NAME_CRIPT "crypt.txt"



void cryptCes(char testo []);//funzone criptaggio
void decryptCes(char testo []);//funzione decriptaggio

int main()
{
	
	char t[]=FILE_NAME_IN;
	char t2[]=FILE_NAME_CRIPT;

	cryptCes(t);
	decryptCes(t2);
	
}

void cryptCes(char t [])
{
	char r;
	FILE *pfile,*pfile2;				//puntatori file
	pfile=fopen(t,"r"); 		//apertura primo file in modalità read
	pfile2=fopen("crypt.txt","w");	//apertura file crypt in modalità write
	
	if(pfile!=0&&pfile2!=0)            //controllo  file apertura senza problemi
	{
		while(!feof(pfile))		//ciclo fino a quando non finisce il file
		{
			r=fgetc(pfile);  	//prende il carattere
		
            //Controllo se il carattere letto appartiene alle lettere dell'alfabeto,
            //qualunque altro carattere non deve essere criptato
            //
			if(r>='a'&&r<='w'||r>='A'&&r<='W')		
			{
				r+=CRIPT_KEY;
				fputc(r,pfile2);	//inserisce carattere nel nuovo file		
			}
			else 
			{
				switch (r)
				{
					case 88: r=97;
					break;
					
					case 89: r=98;
					break;
					
					case 90: r=99;
					break;
					
					case 120: r=65;
					break;
					
					case 121: r=66;
					break;
					
					case 122: r=67;
					break;					
				}
				fputc(r,pfile2);//inserisce carattere nel nuovo file	
			}	
		}
	}
	else 
	{
		printf("errore");//errore
	}
	
	fclose(pfile);
	fclose(pfile2);// chiusura dei file
}

void decryptCes(char t2 [])
{
	char r;
	FILE *pfile,*pfile2;					//puntatori ai file
	pfile=fopen(t2,"r");				//apertura primo file in modalità read
	pfile2=fopen("decrypt.txt","w");	//apertura file crypt in modalità write
	
	if(pfile!=0&&pfile2!=0)					//controllo se i file si sono aperti senza problemi
	{
		while(!feof(pfile))				//esegue ciclo fino a quando non finisce il file
		{
			r=fgetc(pfile);				  //prende il carattere
		
			if((r>='d'&&r<='z')||(r>='D'&&r<='Z'))	//controllo  carattere è minuscolo
			{
				r-=3;
				fputc(r,pfile2);	//ineserisce carattere nel nuovo file		
			}
			else 
			{
				switch (r)
				{
					case 97: r= 88;
					break;
					
					case 98: r= 89;
					break;
					
					case 99: r= 90;
					break;
					
					case 65: r= 120;
					break;
					
					case 66: r= 121;
					break;
					
					case 67: r= 122;
					break;					
				}
				fputc(r,pfile2);		//inserisce carattere nel nuovo file	
			}	
		}
	}
	else 
	{
		printf("errore di apertura");	//errore durante apertura
	}

	fclose(pfile);
	fclose(pfile2);// chiusure dei file
}