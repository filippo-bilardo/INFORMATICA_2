/** ****************************************************************************************
* \mainpage a_divisoreNumero.c
*
* @brief programma che utilizza funzioni
* 
* @author Tommaso Sollo
* @date 30/11/2022
*/

#include <stdio.h>
#include <limits.h>
#include <stdlib.h>


/**
 * @brief Calcola il massimo comune divisore tra due numeri 
 *        utilizzando l'algoritmo di Euclide.
 * @param a primo numero
 * @param b secondo numero
 * @return il massimo comune divisore tra a e b
 */
int MCD(int, int);

/**
 * @brief Calcola la somma di tutti i divisori del parametro
 *        
 * @param a numero
 * @return la somma dei divisori del numero
 */
int sommaDivisori(int);

/**
 * @brief Calcola l'area di un rettangolo che ha per base e 
 *        per altezza i parametri 
 * @param a base
 * @param b altezza
 * @return l'area del rettangolo
 */
int areaRettangolo(int, int);

/**
 * @brief Funzione menu
 */
 int menu(void);



int main()
{
    int r;              //variabile che conterrà i risultati delle funzioni
    int n1, n2;         //varibili di input
    int esci=0;

    while(esci==0)
    {
        r = menu();     //chiamata funzione menu

        //switch che chiama la funzione giusta in base alla scelta dell'utente
        switch(r)   
        {   
            //caso 1: l'utente ha scelto la funzione MCD
            case 1:     
                printf("--Funzione MCD--\n\n");
                printf("Inserisci due numeri: \n");         //chiedo i due numeri
                scanf("%d%d", &n1, &n2);
                r=MCD(n1, n2);      //chiamo la funzione
                printf("\nMCD = %d\n\n", r);        //stampa risultato
                getchar();
                break;
            //caso 2: l'utente ha scelto la funzione Somma Divisori
            case 2:     
                printf("--Funzione Somma Divisori--\n\n");
                printf("Inserisci un numero: \n");      //chiedo il numero
                scanf("%d", &n1);
                r=sommaDivisori(n1);    //chiamo la funzione
                printf("\nSomma dei divisori di %d = %d\n", n1, r);     //stampa risultato
                getchar();
                break;
            //caso 3: l'utente ha scelto la funzione Area Rettangolo
            case 3:     
                printf("--Funzione Area Rettangolo--\n\n");
                printf("Inserisci due numeri: \n");         //chiedo i due numeri
                scanf("%d%d", &n1, &n2);
                r=areaRettangolo(n1, n2);       //chiamo la funzione
                printf("\narea di un rettangolo con base %d e altezza %d = %d\n\n", n1, n2, r);     //stampa risultato
                break;
            //caso 0: l'utente ha scelto di uscire dal programma
            case 0:     
                printf("\nCiao\n\n");   
                esci=1;
                break;
            default:    //default: L'utente ha sbagliato a digitare
                printf("\n\nHai sbagliato a digitare");
                break;
        }

        printf("\n\nPremi invio per continuare...");    
        getchar();
        getchar();
        system("clear");
    }    
}

int menu()
{
    int r;

    printf("\n--Esercizio Sollo Tommaso--\n\n");

    printf("\n-----------------------------------------------------------------");
    printf("\nInserisci il valore corrispondente alle funzione da utilizzare\n");
    printf("\n1 - MCD");
    printf("\n2 - Somma Divisori");
    printf("\n3 - Area Rettangolo");
    printf("\n0 - Esci");
    printf("\n\n>>> ");

    scanf("%d", &r);

    printf("\n\n");

    return r;
}

int MCD(int x, int y)
{
    float r;    //conterrà il resto
    int c;      //variabile utilizata per scambiare i valori di x e y

    //se y è magiore di x scambio i valori delle variabili
    if(y>x){
        c=x;
        x=y;
        y=c;
    }

    //algoritmo di Euclide per trovare l'MCD
    while(y!=0)
    {
        r = x%y;
        x=y;
        y=r;
    }

    //restituisco il risultato
    return x;
    
}

int sommaDivisori(int x)
{
    int r = 0;  //conterrà la somma di tutti i divisori

    //itero tutti i numeri tra 1 e il numero
    for(int i = 1; i<=x; i++)
    {
        if(x%i==0) 
            r += i;    //se l'indice del ciclo è un divisore lo sommo  
    }

    //restituisco il risultato
    return r;
}

int areaRettangolo(int x, int y)
{
    int area = x * y;   //calcolo l'area

    //restituisco il risultato
    return area;
}