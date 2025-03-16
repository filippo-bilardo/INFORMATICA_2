#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>
#include <windows.h>

// Definizione dei codici colore ANSI
#define VERDE "\033[1;32m"
#define AZZURRO "\033[1;36m"
#define GIALLO "\033[1;33m"
#define ROSSO "\033[1;31m"
#define RESET "\033[0m"

// Struttura per rappresentare un cliente nella lista d'attesa
typedef struct Cliente {
    int numero;             // Numero assegnato al cliente
    time_t orario_arrivo;   // Timestamp dell'arrivo
    struct Cliente* next;   // Puntatore al prossimo cliente
} Cliente;

// Struttura per rappresentare uno sportello
typedef struct {
    int numero_sportello;   // Numero dello sportello
    int cliente_corrente;   // Numero del cliente attualmente servito
    time_t inizio_servizio; // Timestamp dell'inizio del servizio corrente
    bool attivo;            // Indica se lo sportello sta servendo un cliente
} Sportello;

// Struttura per gestire la lista d'attesa
typedef struct {
    Cliente* testa;         // Puntatore al primo cliente in attesa
    Cliente* coda;          // Puntatore all'ultimo cliente in attesa
    int prossimo_numero;    // Prossimo numero da assegnare
    int clienti_in_attesa;  // Numero di clienti attualmente in attesa
} ListaAttesa;

// Funzione per inizializzare la lista d'attesa
void inizializzaListaAttesa(ListaAttesa* lista) {
    lista->testa = NULL;
    lista->coda = NULL;
    lista->prossimo_numero = 1;
    lista->clienti_in_attesa = 0;
}

// Funzione per inizializzare uno sportello
void inizializzaSportello(Sportello* sportello, int numero) {
    sportello->numero_sportello = numero;
    sportello->cliente_corrente = 0;
    sportello->inizio_servizio = 0;
    sportello->attivo = false;
}

// Funzione per aggiungere un nuovo cliente alla lista d'attesa
void aggiungiCliente(ListaAttesa* lista) {
    // Crea un nuovo nodo cliente
    Cliente* nuovo = (Cliente*)malloc(sizeof(Cliente));
    if (nuovo == NULL) {
        printf("%sErrore: Allocazione memoria fallita!%s\n", ROSSO, RESET);
        return;
    }
    
    // Inizializza il nuovo cliente
    nuovo->numero = lista->prossimo_numero++;
    nuovo->orario_arrivo = time(NULL);
    nuovo->next = NULL;
    
    // Aggiunge il cliente alla lista
    if (lista->testa == NULL) {
        // Lista vuota
        lista->testa = nuovo;
        lista->coda = nuovo;
    } else {
        // Aggiunge alla fine della lista
        lista->coda->next = nuovo;
        lista->coda = nuovo;
    }
    
    lista->clienti_in_attesa++;
    printf("%sNuovo cliente aggiunto con numero: %d%s\n", VERDE, nuovo->numero, RESET);
}

// Funzione per servire il prossimo cliente a uno sportello
bool serviProssimoCliente(ListaAttesa* lista, Sportello* sportello) {
    if (lista->testa == NULL) {
        printf("%sNessun cliente in attesa!%s\n", GIALLO, RESET);
        return false;
    }
    
    // Prende il primo cliente dalla lista
    Cliente* cliente = lista->testa;
    lista->testa = lista->testa->next;
    
    // Se la lista è ora vuota, aggiorna anche la coda
    if (lista->testa == NULL) {
        lista->coda = NULL;
    }
    
    // Aggiorna lo sportello
    sportello->cliente_corrente = cliente->numero;
    sportello->inizio_servizio = time(NULL);
    sportello->attivo = true;
    
    // Calcola il tempo di attesa
    double tempo_attesa = difftime(sportello->inizio_servizio, cliente->orario_arrivo);
    
    printf("%sCliente numero %d servito allo sportello %d%s\n", AZZURRO, cliente->numero, sportello->numero_sportello, RESET);
    printf("%sTempo di attesa: %.0f secondi%s\n", GIALLO, tempo_attesa, RESET);
    
    // Libera la memoria del cliente servito
    free(cliente);
    lista->clienti_in_attesa--;
    
    return true;
}

// Funzione per calcolare il tempo medio di attesa stimato
double calcolaTempoMedioAttesa(ListaAttesa* lista) {
    if (lista->clienti_in_attesa == 0) {
        return 0.0;
    }
    
    // Assumiamo un tempo medio di servizio di 2 minuti per cliente
    const double TEMPO_MEDIO_SERVIZIO = 120.0; // secondi
    
    // Calcola il tempo medio di attesa basato sul numero di clienti in attesa
    // e assumendo che entrambi gli sportelli siano attivi
    return (lista->clienti_in_attesa / 2.0) * TEMPO_MEDIO_SERVIZIO;
}

// Funzione per visualizzare lo stato corrente
void visualizzaStatoCorrente(ListaAttesa* lista, Sportello* sportello1, Sportello* sportello2) {
    system("cls"); // Pulisce lo schermo (Windows)
    
    printf("%s===== SISTEMA GESTIONE LISTA D'ATTESA =====%s\n\n", VERDE, RESET);
    
    // Visualizza lo stato degli sportelli
    printf("%sSportello 1: %s", AZZURRO, RESET);
    if (sportello1->attivo) {
        printf("Servendo cliente numero %s%d%s\n", VERDE, sportello1->cliente_corrente, RESET);
    } else {
        printf("%sInattivo%s\n", GIALLO, RESET);
    }
    
    printf("%sSportello 2: %s", AZZURRO, RESET);
    if (sportello2->attivo) {
        printf("Servendo cliente numero %s%d%s\n", VERDE, sportello2->cliente_corrente, RESET);
    } else {
        printf("%sInattivo%s\n", GIALLO, RESET);
    }
    
    // Visualizza informazioni sulla lista d'attesa
    printf("\n%sClienti in attesa: %d%s\n", GIALLO, lista->clienti_in_attesa, RESET);
    
    if (lista->clienti_in_attesa > 0) {
        double tempo_medio = calcolaTempoMedioAttesa(lista);
        printf("%sTempo medio di attesa stimato: %.0f secondi%s\n", GIALLO, tempo_medio, RESET);
        printf("%sProssimo numero da servire: %d%s\n", VERDE, lista->testa->numero, RESET);
    }
    
    printf("\n");
}

// Funzione per visualizzare il menu
void visualizzaMenu() {
    printf("%s1. Servi prossimo cliente allo Sportello 1%s\n", AZZURRO, RESET);
    printf("%s2. Servi prossimo cliente allo Sportello 2%s\n", AZZURRO, RESET);
    printf("%s3. Aggiungi nuovo cliente%s\n", VERDE, RESET);
    printf("%s0. Esci%s\n\n", ROSSO, RESET);
    printf("%sScelta: %s", GIALLO, RESET);
}

// Funzione per liberare la memoria della lista d'attesa
void liberaListaAttesa(ListaAttesa* lista) {
    Cliente* corrente = lista->testa;
    Cliente* prossimo;
    
    while (corrente != NULL) {
        prossimo = corrente->next;
        free(corrente);
        corrente = prossimo;
    }
    
    lista->testa = NULL;
    lista->coda = NULL;
}

int main() {
    // Abilita i codici ANSI su Windows
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    SetConsoleMode(hOut, dwMode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);
    
    // Inizializza la lista d'attesa e gli sportelli
    ListaAttesa lista;
    Sportello sportello1, sportello2;
    
    inizializzaListaAttesa(&lista);
    inizializzaSportello(&sportello1, 1);
    inizializzaSportello(&sportello2, 2);
    
    int scelta;
    bool continua = true;
    
    // Loop principale
    while (continua) {
        visualizzaStatoCorrente(&lista, &sportello1, &sportello2);
        visualizzaMenu();
        
        scanf("%d", &scelta);
        
        switch (scelta) {
            case 1: // Servi cliente allo sportello 1
                serviProssimoCliente(&lista, &sportello1);
                break;
                
            case 2: // Servi cliente allo sportello 2
                serviProssimoCliente(&lista, &sportello2);
                break;
                
            case 3: // Aggiungi nuovo cliente
                aggiungiCliente(&lista);
                break;
                
            case 0: // Esci
                continua = false;
                break;
                
            default:
                printf("%sScelta non valida!%s\n", ROSSO, RESET);
                break;
        }
        
        // Pausa per visualizzare i messaggi
        if (continua) {
            printf("\nPremi Enter per continuare...");
            getchar(); // Consuma il newline rimasto nel buffer
            getchar(); // Attendi l'input dell'utente
        }
    }
    
    // Libera la memoria
    liberaListaAttesa(&lista);
    
    printf("%sGrazie per aver utilizzato il sistema di gestione della lista d'attesa!%s\n", VERDE, RESET);
    
    return 0;
}