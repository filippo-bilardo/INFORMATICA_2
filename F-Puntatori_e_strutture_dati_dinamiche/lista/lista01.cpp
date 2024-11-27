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

// visualizzazione della lista
void stampa_lista(pNodo p)
{ // versione iterativa
    while (p != NULL)
    {
        cout << "[" << p->info << "]->";
        p = p->next;
    }
    cout << "NULL \n\n";
}

void stampa_listaR(pNodo p)
{ // versione ricorsiva
    if (p != NULL)
    {
        cout << "[" << p->info << "]->";
        // cout << p->val ;
        stampa_listaR(p->next);
    }
    else
        cout << "NULL \n\n";

} // è tail recursive

// ricerca di un elemento nella lista
bool cerca_eleR(pNodo p, int e)
{ // versione ricorsiva
    if (p == NULL)
        return (false);
    else if (p->info == e)
        return (true);
    else
        return (cerca_eleR(p->next, e));
} // è tail recursive

bool cerca_ele(pNodo p, int e)
{ // versione iterativa
    bool f = false;
    while ((p != NULL) && (!f))
    {
        if (p->info == e)
            f = true;
        else
            p = p->next;
    }
    return (f);
}

pNodo trova_pos_ele(pNodo p, int e)
{               // versione iterativa
    pNodo prec; // serve se non viene trovato
    while (p != NULL)
    {
        if (p->info == e)
            return (p);
        else
        {
            prec = p; // lo salvo nel caso finisse la lista
            p = p->next;
        }
    }
    return (prec); // ultimo elemento
}

int main()
{
    // dichiarazioni e inizializzazioni
    pNodo pTesta, p1, p2, p3, ptempo; // definisco tre puntatori al tipo nodo
    p1 = new nodo;                    // creo il primo nodo
    p1->info = 1;                     // scrivo il dato nel nodo - notazione C++
    p2 = new nodo;                    // creo il secondo nodo nodo
    (*p2).info = 2;                   // scrivo il dato nel nodo - notazione C

    p3 = p2;

    // collegamento tra nodi
    p1->next = p2; // notazione C++

    // quattro modi per accedere al campo val del secondo nodo
    cout << p2->info << endl; // notazione C++
    cout << (p1->next)->info << endl;

    cout << (*p2).info << endl; // notazione C
    cout << (*((*p1).next)).info << endl;

    // aggiunta di un nodo in coda
    p2->next = new nodo;
    (p2->next)->info = 3;
    // ultimo elemento della lista: si memorizza nel campo next il valore NULL
    (p2->next)->next = NULL;
    stampa_lista(p1); // visualizza la lista

    cout << "\n\ninserimento di un elemento in testa " << endl;
    // inserimento di un elemento in testa
    pTesta = p1; //

    ptempo = new nodo;     // creo un nuovo nodo
    ptempo->info = 0;      // inserisco il dato
    ptempo->next = pTesta; // accodo la liste precedente
    pTesta = ptempo;       // aggiorna puntatore alla testa
    stampa_lista(pTesta);  // visualizza la lista

    cout << "\n\ninserimento di un elemento tra il primo e il secondo\n " << endl;
    // inserimento di un elemento tra il primo e il secondo
    p2 = new nodo;
    p2->info = 4;
    p2->next = pTesta->next;
    pTesta->next = p2;
    stampa_lista(pTesta); // visualizza la lista

    cout << "\ninserimento di un elemento in coda\n " << endl;
    // inserimento di un elemento in coda:
    p1 = pTesta;
    while (p1->next != NULL) // cerco l'ultimo elemento
        p1 = p1->next;
    p1->next = new nodo;  // creo un nuovo nodo
    p1 = p1->next;        // p1 ora punta all'ultimo
    p1->info = 5;         // inserisco il dato
    p1->next = NULL;      // aggiorno il puntatore finale
    stampa_lista(pTesta); // visualizza la lista

    /*
    cout <<"\n\ninserimento di un elemento in coda\n " <<endl;
      // inserimento di un elemento in coda - seconda versione
    p1 = new nodo;           // creo un nuovo nodo
    p1->info = 6;            // inserisco il dato
    p1->next = NULL;         // aggiorno puntatore finale
    p2 = pTesta;
      while (p2->next != NULL) // cerco l'ultimo elemento
      p2 = p2->next ;
    p2->next = p1;           // attacco il nuovo nodo
    stampa_lista(pTesta);    // visualizza la lista
    */

    cout << "\n\nrimozione di un elemento in testa\n " << endl;
    // rimozione dell’elemento di testa:
    pTesta = pTesta->next;
    stampa_lista(pTesta); // visualizza la lista

    cout << "\n\nrimozione del secondo elemento\n " << endl;
    // rimozione del secondo elemento:
    pTesta->next = (pTesta->next)->next;
    stampa_lista(pTesta); // visualizza la lista

    cout << "\nrimozione di un elemento dalla coda\n " << endl;
    // rimozione dell’elemento di coda:
    p2 = pTesta;
    while ((p2->next)->next != NULL) // cerco l'ultimo elemento
        p2 = p2->next;
    p2->next = NULL;      // lo cancello
    stampa_lista(pTesta); // visualizza la lista

    /*
     // ricerca di un elemento
     int voluto, nuovo;
     cout << "\nNumero da ricercare : ";
     cin >> voluto;
     if (cerca_ele(pTesta, voluto))
       cout << " e' presente nella lista!";
     else
      cout << " NON e' presente nella lista!";

       cout << "\nNumero da ricercare : ";
     cin >> voluto;
       if (cerca_eleR(pTesta, voluto))
       cout << " e' presente nella lista!";
     else
      cout << " NON e' presente nella lista!";
    */

    // ricerca di un elemento
    int voluto, nuovo;
    cout << "\nNumero da inserire: ";
    cin >> nuovo;
    cout << "\nNumero da ricercare: ";
    cin >> voluto;
    p1 = trova_pos_ele(pTesta, voluto);
    p2 = new nodo; // creo il nuovo nodo
    p2->info = nuovo;
    p2->next = p1->next; // lo inserisco nella posizione corrente
    p1->next = p2;
    stampa_lista(pTesta); // visualizza la lista
}
