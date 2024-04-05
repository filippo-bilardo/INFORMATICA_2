// -------------------------------------------------------------------
// coda dove entrano da sinistra <coda> 4 ->3 ->2 ->1 -> NUll pTesta
// -------------------------------------------------------------------
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
// FUNZIONE DI CREAZIONE DELLA CODA VUOTA
pNodo creaPila(void)
{
    return NULL;
}

// funzione che crea la coda
pNodo creaCoda(pNodo pTesta)
{
    pTesta = NULL;
    return (pTesta);
}
// FUNZIONE DI VERIFICA PILA VUOTA
bool isVuota(pNodo pila1)
{
    if (pila1 == NULL)
        return true;
    else
        return false;
}

// FUNZIONE DI STAMPA A VIDEO DEI NODI DELLA CODA
void stampa_coda(pNodo prec)
{
    int i, n;
    pNodo pAppo = NULL;
    if (!isVuota(prec))
    { // ossia if(prec != NULL)
        // conto i nodi per ottimizzare i motivi grafici
        pAppo = prec;
        n = 1;
        while (pAppo != NULL)
        {
            pAppo = pAppo->next;
            n = n + 1;
        }
        // stampo la cornice superiore adattandola al numero di nodi dell coda
        printf("\t");
        for (i = 1; i <= n; i++)
            printf("-----");
        printf("\n");
        // stampo i nodi della coda
        printf("        Last In ");
        printf("\n[pCoda]->");
        i = 1;
        while (prec != NULL)
        {
            cout << "[" << prec->info << "]->";
            prec = prec->next;
            i = i + 1;
        }
        printf(" NULL");
        printf("\n");
        for (i = 1; i < n; i++)
            printf("     ");
        printf("  [pTesta]");
        printf("\n\t");
        // stampo la cornice inferiore adattandola al numero di nodi della coda
        for (i = 1; i <= n; i++)
            printf("-----");
    }
    else
        cout << "\n\tLa coda e' vuota!\n\t";
    return;
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

// prelievo di un nodo dalla Testa  pCoda -> 4 ->3 ->2 ->NUll pTesta
pNodo dequeue(pNodo pTesta)
{
    pNodo prec;
    pNodo temp = pTesta;
    while (temp->next != NULL)
    {
        prec = temp;
        temp = temp->next;
    }
    prec->next = NULL; // tolgo l'ultimo nodo a dx
    return pTesta;
}

// inserimento di un nodo nella coda                         pCoda -> 4 ->3 ->2 ->1 ->NUll
pNodo enqueue(pNodo pTesta, int elemento)
{
    pNodo pNuovo = new nodo; // nuovo nodo
    pNuovo->info = elemento;
    pNuovo->next = pTesta; // collego alla vecchia coda
    pTesta = pNuovo;       // aggiorno testa della coda
    return pTesta;
}

pNodo creaCoda(pNodo pTesta1, pNodo pCoda1, int quanti)
{
    int x, dato;
    pNodo temp, pTesta;
    pTesta = creaCoda(pTesta1); // crea pila vuota
    for (x = 0; x < quanti; x++)
    {
        dato = rand() % 9 + 1;          // genero casualmente il dato
        pTesta = enqueue(pTesta, dato); // lo inserisco nella coda
    }
    return pTesta;
}; /* crea pila di quantie lementi  */

int main()
{
    pNodo pTesta1; // definisco due punta a coda
    pTesta1 = creaCoda(pTesta1);
    cout << "\ninserisco quattro elementi" << endl;
    pTesta1 = enqueue(pTesta1, 1);
    pTesta1 = enqueue(pTesta1, 2);
    pTesta1 = enqueue(pTesta1, 3);
    pTesta1 = enqueue(pTesta1, 4);
    stampa_coda(pTesta1); // visualizza la coda
    cout << "\n\nrimuovo due elementi" << endl;
    pTesta1 = dequeue(pTesta1);
    pTesta1 = dequeue(pTesta1);
    stampa_coda(pTesta1); // visualizza la coda
}
