#include <stdio.h>
#include <stdlib.h>
#include <vector>
#include <iostream>


using namespace std;

struct s_nodo
{
    int info;
    s_nodo *next;
};
typedef struct s_nodo nodo;
typedef nodo *pNodo;

//==================================================
// FUNZIONE DI CREAZIONE DELLA PILA VUOTA
pNodo creaPila(void)
{
    return NULL;
}

// FUNZIONE DI VERIFICA PILA VUOTA
bool isVuota(pNodo pila1)
{
    if (pila1 == NULL)
        return true;
    else
        return false;
}

// visualizzazione della lista
void stampa_pila(pNodo pila1)
{ // versione iterativa
    while (pila1 != NULL)
    {
        cout << "\n| " << pila1->info << " |";
        pila1 = pila1->next;
    }
    cout << "\n|____|\n\n";
}

// FUNZIONE DI PRELEVAMENTO DI UN NODO DALLA TESTA DELLA PILA  (senza comunicazioni)

pNodo pop1(pNodo pTesta)
{
    if (pTesta != NULL)
    {
        if (pTesta->next != NULL)
            pTesta = pTesta->next;
        else
            pTesta = NULL;
    }
    return pTesta;
}

pNodo pop(pNodo pTesta)
{                        // con rilascio RAM
    pNodo pTempo = NULL; // variabile temporanea
    if (pTesta != NULL)
    {
        pTempo = pTesta;
        if (pTesta->next != NULL)
            pTesta = pTesta->next;
        else
            pTesta = NULL;
        free(pTempo); // dealloco lo spazio
    }
    return pTesta;
}

// FUNZIONE DI INSERIMENTO DI UN NODO IN TESTA DELLA PILA

pNodo push(pNodo pTesta, int elemento)
{
    pNodo pNuovo = new nodo; // nuovo nodo                         //pNuovo = (pNodo) malloc(sizeof(nodo));
    pNuovo->info = elemento;
    pNuovo->next = pTesta; // collego alla vecchia pila
    pTesta = pNuovo;       // aggiorno testa della pila
    return pTesta;
}

pNodo creaPilaRandom(int quanti)
{
    int x, dato;
    pNodo temp, pTesta;
    pTesta = creaPila(); // crea pila vuota
    for (x = 0; x < quanti; x++)
    {
        dato = rand() % 9 + 1;       // genero casualmente il dato
        pTesta = push(pTesta, dato); // lo inserisco nell pila
    }
    return pTesta;
}; /* crea pila di quantie lementi  */

// FUNZIONE DI STAMPA A VIDEO DEI NODI DELLA PILA
void stampa_pila_grafica(pNodo pTesta)
{
    int x, num;
    pNodo ptemp;
    if (!isVuota(pTesta))
    { // oppure (*pPrec != NULL){
        ptemp = pTesta;
        num = 1;
        while (ptemp != NULL)
        {
            ptemp = ptemp->next;
            num = num + 1;
        }
        // stampo la pila
        system("clear"); // CLS per Windows
        x = 1;
        printf("\n\n\n\t_                       _ \n\t");
        printf("|                       |  Testa della pila\n\t");
        while (pTesta != NULL)
        {
            printf("| %2d^ nodo = %3d\t|\n\t", --num, pTesta->info);
            pTesta = pTesta->next;
            x = x + 1;
        }
        printf("|_______________________|  Fondo della pila\n\n\t");
    }
    else
    {
        printf("\n\tOPERAZIONE IMPOSSIBILE: La pila e' vuota \n\n\t");
    }
    return;
}

int main()
{
    // dichiarazioni e inizializzazioni
    pNodo pTesta1, pTesta2; // definisco due punta a pile
    pTesta1 = creaPila();
    cout << "\ninserisco tre elementi" << endl;
    pTesta1 = push(pTesta1, 10);
    pTesta1 = push(pTesta1, 20);
    pTesta1 = push(pTesta1, 30);

    stampa_pila(pTesta1); // visualizza la lista

    cout << "\nrimozione di un elemento" << endl;
    pTesta1 = pop(pTesta1);
    stampa_pila(pTesta1); // visualizza la lista

    system("sleep 2"); // pausa di 2 secondi // pause per Windows
    pTesta2 = creaPilaRandom(4);
    stampa_pila_grafica(pTesta2); // visualizza la lista
}
