/** ****************************************************************************************
* \mainpage <nome del progetto>
*
* @brief MCD
* 
* <specifiche del progetto>
*MCD
* 
* @author lorenzo zanirato, 3H
* @date 13/01/2023
* @version 1.0 <data> <Descrivere le modifiche apportate>
* @version 1.1 <data> <Descrivere le modifiche apportate>
*/
#include <stdio.h>
#include <stdlib.h> 
#include <unistd.h> //sleep
/*
calcola l'MCD di due parametri in input
*/
int MCD (int,int); 
/*
Scrivere una funzione chiamata "somma_divisori" che prende in input un numero intero e restituisce la somma dei suoi divisori.
*/
int somma_divisori(int);
/*
Scrivere una funzione chiamata "area_rettangolo" che prende in input la base e l'altezza di un rettangolo e restituisce l'area. 
*/
int area_rettangolo (int,int);
/*
questo serve per fare un menù 
*/
int menu (void);

int main ()
{
	int f=0,b=0,h=0,n1,n2,r=0;// b=base,h=altezza
	
	do
	{
		r=menu();
		switch (r)
		{
		case 0: printf ("uscita dal programma");
				fflush(stdout);
				sleep(1);
				
				printf(".");
				
				fflush(stdout);
				sleep(1);
				
				printf(".");
				
				fflush(stdout);
				sleep(1);
				
				printf(".");
			    break;
		case 1:	printf("\ninserire il primo numero\t");
				scanf("%d",&n1);
				printf("inserire il secondo numero\t");
				scanf("%d",&n2);
	
	    		f=MCD(n1,n2);
				printf("\nl'MCD di %d e %d='%d\n\n",n1,n2,f);
				break;
		case 2:	printf("\ninserire un numero\t");
				scanf("%d",&n1);
	
				f=somma_divisori(n1);
				printf("la somma dei divisori di %d= %d\n\n",n1,f);
				break;
		case 3: printf("\ninserire il valore della base\t");
				scanf("%d",&b);
				printf("\ninserire il valore dell'altezza\t");
				scanf("%d",&h);
	
				f=area_rettangolo(b,h);
				printf("\nl'area del rettangolo e'%d\n\n",f);
				break;
		default:printf("\nscelta non valida\n");
	
		}
		system("pause");//blocca quanto sullo schermo				
	}while (r!=0);		
}

int menu (void)
{
	int risp;
	
	//system("cls");// serve per pulire lo schermo
	printf("\e[2J\e[H");
	printf ("\n\n\n");
	printf ("\n\tdigita 1 per fare l'MCD\n");
	printf ("\n\tdigita 2 per fare la somma dei divisori\n");
	printf ("\n\tdigita 3 per fare l'area del rettangolo\n");
	printf ("\n\tdigita 0 per uscire dal programma\n\n");
	scanf("%d",&risp);
	return risp;
}



int area_rettangolo (int x,int y)
{ 
	int r;
	r=x*y;
	return r;
}


int somma_divisori(int x)
{
	int cont;
	int ris=0;
	
	for(cont=1;cont<=x;cont++)
	{
		if(x%cont==0)
			ris+=cont;
	}
	return ris;
}

int MCD (int a,int b)
{
	int r=0;
	while(b!=0)
	{
		r=a%b;
		a=b;
		b=r;
    } 
	return a;	
}