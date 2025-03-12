#include <iostream>
#include <memory>

class Node {
public:
    int data;
    std::shared_ptr<Node> next;
    
    // Constructor
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    std::shared_ptr<Node> head;
    
public:
    // Constructor
    LinkedList() : head(nullptr) {}
    
    // Insert at the beginning
    void insertAtBeginning(int data) {
        std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at the end
    void insertAtEnd(int data) {
        std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
        
        // If the list is empty
        if (head == nullptr) {
            head = newNode;
            return;
        }
        
        // Traverse to the end of the list
        std::shared_ptr<Node> current = head;
        while (current->next != nullptr) {
            current = current->next;
        }
        
        // Link the new node at the end
        current->next = newNode;
    }
    
    // Insert at a specific position
    void insertAtPosition(int data, int position) {
        // If position is 0, insert at the beginning
        if (position == 0) {
            insertAtBeginning(data);
            return;
        }
        
        std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
        std::shared_ptr<Node> current = head;
        int i = 0;
        
        // Traverse to the position - 1
        while (current != nullptr && i < position - 1) {
            current = current->next;
            i++;
        }
        
        // If position is beyond the end of the list
        if (current == nullptr) {
            std::cout << "Position out of range!" << std::endl;
            return;
        }
        
        // Insert the new node
        newNode->next = current->next;
        current->next = newNode;
    }
    
    // Delete from the beginning
    void deleteFromBeginning() {
        if (head == nullptr) {
            std::cout << "List is empty!" << std::endl;
            return;
        }
        
        head = head->next;
    }
    
    // Delete from the end
    void deleteFromEnd() {
        if (head == nullptr) {
            std::cout << "List is empty!" << std::endl;
            return;
        }
        
        // If there is only one node
        if (head->next == nullptr) {
            head = nullptr;
            return;
        }
        
        // Traverse to the second last node
        std::shared_ptr<Node> current = head;
        while (current->next->next != nullptr) {
            current = current->next;
        }
        
        // Delete the last node
        current->next = nullptr;
    }
    
    // Delete from a specific position
    void deleteFromPosition(int position) {
        if (head == nullptr) {
            std::cout << "List is empty!" << std::endl;
            return;
        }
        
        // If position is 0, delete from the beginning
        if (position == 0) {
            deleteFromBeginning();
            return;
        }
        
        std::shared_ptr<Node> current = head;
        int i = 0;
        
        // Traverse to the position - 1
        while (current != nullptr && i < position - 1) {
            current = current->next;
            i++;
        }
        
        // If position is beyond the end of the list or the next node is NULL
        if (current == nullptr || current->next == nullptr) {
            std::cout << "Position out of range!" << std::endl;
            return;
        }
        
        // Delete the node at position
        current->next = current->next->next;
    }
    
    // Search for an element
    int search(int key) {
        std::shared_ptr<Node> current = head;
        int position = 0;
        
        while (current != nullptr) {
            if (current->data == key) {
                return position;  // Return the position if found
            }
            current = current->next;
            position++;
        }
        
        return -1;  // Return -1 if not found
    }
    
    // Display the list
    void display() {
        if (head == nullptr) {
            std::cout << "List is empty!" << std::endl;
            return;
        }
        
        std::shared_ptr<Node> current = head;
        std::cout << "Linked List: ";
        while (current != nullptr) {
            std::cout << current->data << " -> ";
            current = current->next;
        }
        std::cout << "NULL" << std::endl;
    }
};

// Main function to demonstrate the linked list operations
int main() {
    LinkedList list;
    int choice, data, position, result;
    
    // Definizione dei codici colore ANSI
    const char* VERDE = "\033[1;32m";
    const char* AZZURRO = "\033[1;36m";
    const char* GIALLO = "\033[1;33m";
    const char* ROSSO = "\033[1;31m";
    const char* RESET = "\033[0m";
    
    std::cout << "\n" << VERDE << "*** Operazioni su Lista Collegata Singola (C++) ***" << RESET << std::endl;
    
    do {
        std::cout << "\n" << AZZURRO << "1. Inserisci all'inizio" << RESET;
        std::cout << "\n" << AZZURRO << "2. Inserisci alla fine" << RESET;
        std::cout << "\n" << AZZURRO << "3. Inserisci in una posizione specifica" << RESET;
        std::cout << "\n" << ROSSO << "4. Elimina dall'inizio" << RESET;
        std::cout << "\n" << ROSSO << "5. Elimina dalla fine" << RESET;
        std::cout << "\n" << ROSSO << "6. Elimina da una posizione specifica" << RESET;
        std::cout << "\n" << GIALLO << "7. Cerca un elemento" << RESET;
        std::cout << "\n" << GIALLO << "8. Visualizza la lista" << RESET;
        std::cout << "\n" << VERDE << "0. Esci" << RESET;
        
        std::cout << "\n\n" << VERDE << "Inserisci la tua scelta: " << RESET;
        std::cin >> choice;
        
        switch (choice) {
            case 1:
                std::cout << AZZURRO << "Inserisci il dato da inserire: " << RESET;
                std::cin >> data;
                list.insertAtBeginning(data);
                break;
                
            case 2:
                std::cout << AZZURRO << "Inserisci il dato da inserire: " << RESET;
                std::cin >> data;
                list.insertAtEnd(data);
                break;
                
            case 3:
                std::cout << AZZURRO << "Inserisci il dato da inserire: " << RESET;
                std::cin >> data;
                std::cout << AZZURRO << "Inserisci la posizione: " << RESET;
                std::cin >> position;
                list.insertAtPosition(data, position);
                break;
                
            case 4:
                list.deleteFromBeginning();
                break;
                
            case 5:
                list.deleteFromEnd();
                break;
                
            case 6:
                std::cout << ROSSO << "Inserisci la posizione: " << RESET;
                std::cin >> position;
                list.deleteFromPosition(position);
                break;
                
            case 7:
                std::cout << GIALLO << "Inserisci l'elemento da cercare: " << RESET;
                std::cin >> data;
                result = list.search(data);
                if (result == -1) {
                    std::cout << ROSSO << "Elemento non trovato!" << RESET << std::endl;
                } else {
                    std::cout << VERDE << "Elemento trovato alla posizione " << result << RESET << std::endl;
                }
                break;
                
            case 8:
                list.display();
                break;
                
            case 0:
                std::cout << VERDE << "Uscita in corso..." << RESET << std::endl;
                break;
                
            default:
                std::cout << ROSSO << "Scelta non valida!" << RESET << std::endl;
        }
    } while (choice != 0);
    
    return 0;
}