#include <stdio.h>
#include <stdlib.h>

// Define the structure for a node in the linked list
typedef struct Node {
    int data;           // Data stored in the node
    struct Node* next;  // Pointer to the next node
} Node;

// Function to create a new node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a node at the beginning of the list
Node* insertAtBeginning(Node* head, int data) {
    Node* newNode = createNode(data);
    newNode->next = head;
    return newNode;  // New node becomes the head
}

// Function to insert a node at the end of the list
Node* insertAtEnd(Node* head, int data) {
    Node* newNode = createNode(data);
    
    // If the list is empty, new node becomes the head
    if (head == NULL) {
        return newNode;
    }
    
    // Traverse to the end of the list
    Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    // Link the new node at the end
    current->next = newNode;
    return head;
}

// Function to insert a node at a specific position
Node* insertAtPosition(Node* head, int data, int position) {
    // If position is 0, insert at the beginning
    if (position == 0) {
        return insertAtBeginning(head, data);
    }
    
    Node* newNode = createNode(data);
    Node* current = head;
    int i = 0;
    
    // Traverse to the position - 1
    while (current != NULL && i < position - 1) {
        current = current->next;
        i++;
    }
    
    // If position is beyond the end of the list
    if (current == NULL) {
        printf("Position out of range!\n");
        free(newNode);  // Free the allocated memory
        return head;
    }
    
    // Insert the new node
    newNode->next = current->next;
    current->next = newNode;
    return head;
}

// Function to delete a node from the beginning
Node* deleteFromBeginning(Node* head) {
    if (head == NULL) {
        printf("List is empty!\n");
        return NULL;
    }
    
    Node* temp = head;
    head = head->next;
    free(temp);  // Free the memory of the deleted node
    return head;
}

// Function to delete a node from the end
Node* deleteFromEnd(Node* head) {
    if (head == NULL) {
        printf("List is empty!\n");
        return NULL;
    }
    
    // If there is only one node
    if (head->next == NULL) {
        free(head);
        return NULL;
    }
    
    // Traverse to the second last node
    Node* current = head;
    while (current->next->next != NULL) {
        current = current->next;
    }
    
    // Delete the last node
    free(current->next);
    current->next = NULL;
    return head;
}

// Function to delete a node from a specific position
Node* deleteFromPosition(Node* head, int position) {
    if (head == NULL) {
        printf("List is empty!\n");
        return NULL;
    }
    
    // If position is 0, delete from the beginning
    if (position == 0) {
        return deleteFromBeginning(head);
    }
    
    Node* current = head;
    int i = 0;
    
    // Traverse to the position - 1
    while (current != NULL && i < position - 1) {
        current = current->next;
        i++;
    }
    
    // If position is beyond the end of the list or the next node is NULL
    if (current == NULL || current->next == NULL) {
        printf("Position out of range!\n");
        return head;
    }
    
    // Delete the node at position
    Node* temp = current->next;
    current->next = temp->next;
    free(temp);  // Free the memory of the deleted node
    return head;
}

// Function to search for an element in the list
int search(Node* head, int key) {
    Node* current = head;
    int position = 0;
    
    while (current != NULL) {
        if (current->data == key) {
            return position;  // Return the position if found
        }
        current = current->next;
        position++;
    }
    
    return -1;  // Return -1 if not found
}

// Function to display the list
void display(Node* head) {
    if (head == NULL) {
        printf("List is empty!\n");
        return;
    }
    
    Node* current = head;
    printf("Linked List: ");
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}

// Function to free the memory allocated for the list
void freeList(Node* head) {
    Node* current = head;
    Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}

// Funzione principale per dimostrare le operazioni sulla lista collegata
int main() {
    Node* head = NULL;  // Inizializza una lista vuota
    int choice, data, position, result;
    
    // Definizione dei codici colore ANSI
    const char* VERDE = "\033[1;32m";
    const char* AZZURRO = "\033[1;36m";
    const char* GIALLO = "\033[1;33m";
    const char* ROSSO = "\033[1;31m";
    const char* RESET = "\033[0m";
    
    printf("\n%s*** Operazioni su Lista Collegata Singola ***%s\n", VERDE, RESET);
    
    do {
        printf("\n%s1. Inserisci all'inizio%s", AZZURRO, RESET);
        printf("\n%s2. Inserisci alla fine%s", AZZURRO, RESET);
        printf("\n%s3. Inserisci in una posizione specifica%s", AZZURRO, RESET);
        printf("\n%s4. Elimina dall'inizio%s", ROSSO, RESET);
        printf("\n%s5. Elimina dalla fine%s", ROSSO, RESET);
        printf("\n%s6. Elimina da una posizione specifica%s", ROSSO, RESET);
        printf("\n%s7. Cerca un elemento%s", GIALLO, RESET);
        printf("\n%s8. Visualizza la lista%s", GIALLO, RESET);
        printf("\n%s0. Esci%s", VERDE, RESET);
        
        printf("\n\n%sInserisci la tua scelta: %s", VERDE, RESET);
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("%sInserisci il dato da inserire: %s", AZZURRO, RESET);
                scanf("%d", &data);
                head = insertAtBeginning(head, data);
                break;
                
            case 2:
                printf("%sInserisci il dato da inserire: %s", AZZURRO, RESET);
                scanf("%d", &data);
                head = insertAtEnd(head, data);
                break;
                
            case 3:
                printf("%sInserisci il dato da inserire: %s", AZZURRO, RESET);
                scanf("%d", &data);
                printf("%sInserisci la posizione: %s", AZZURRO, RESET);
                scanf("%d", &position);
                head = insertAtPosition(head, data, position);
                break;
                
            case 4:
                head = deleteFromBeginning(head);
                break;
                
            case 5:
                head = deleteFromEnd(head);
                break;
                
            case 6:
                printf("%sInserisci la posizione: %s", ROSSO, RESET);
                scanf("%d", &position);
                head = deleteFromPosition(head, position);
                break;
                
            case 7:
                printf("%sInserisci l'elemento da cercare: %s", GIALLO, RESET);
                scanf("%d", &data);
                result = search(head, data);
                if (result == -1) {
                    printf("%sElemento non trovato!%s\n", ROSSO, RESET);
                } else {
                    printf("%sElemento trovato alla posizione %d%s\n", VERDE, result, RESET);
                }
                break;
                
            case 8:
                display(head);
                break;
                
            case 0:
                printf("%sUscita in corso...%s\n", VERDE, RESET);
                break;
                
            default:
                printf("%sScelta non valida!%s\n", ROSSO, RESET);
        }
    } while (choice != 0);
    
    // Libera la memoria allocata per la lista
    freeList(head);
    
    return 0;
}