#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int valore;
    struct Nodo *next;
} Nodo;

// Prototipi delle funzioni
Nodo* creaNodo(int valore);
Nodo* inserisciInTesta(Nodo* testa, int valore);
Nodo* inserisciInCoda(Nodo* testa, int valore);
Nodo* inserisciInPosizione(Nodo* testa, int valore, int posizione);
Nodo* eliminaTesta(Nodo* testa);
Nodo* eliminaNodo(Nodo* testa, int valore);
Nodo* cercaNodo(Nodo* testa, int valore);
void visualizzaLista(Nodo* testa);
void liberaLista(Nodo* testa);

int main() {
    Nodo* lista = NULL; // Iniziamo con una lista vuota
    
    // Inseriamo alcuni elementi
    lista = inserisciInTesta(lista, 10);
    lista = inserisciInTesta(lista, 5);
    lista = inserisciInCoda(lista, 15);
    lista = inserisciInPosizione(lista, 7, 1);
    
    // Visualizziamo la lista
    visualizzaLista(lista); // Output: 5 -> 7 -> 10 -> 15 -> NULL
    
    // Cerchiamo un elemento
    Nodo* trovato = cercaNodo(lista, 10);
    if (trovato != NULL) {
        printf("Elemento 10 trovato nella lista\n");
    } else {
        printf("Elemento 10 non trovato\n");
    }
    
    // Eliminiamo un elemento
    lista = eliminaNodo(lista, 7);
    visualizzaLista(lista); // Output: 5 -> 10 -> 15 -> NULL
    
    // Eliminiamo la testa
    lista = eliminaTesta(lista);
    visualizzaLista(lista); // Output: 10 -> 15 -> NULL
    
    // Liberiamo la memoria
    liberaLista(lista);
    
    return 0;
}

// Implementazioni delle funzioni
// ...