#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the maximum size for the array-based stack
#define MAX_SIZE 100

/*
 * Array-based Stack Implementation
 */
typedef struct {
    int items[MAX_SIZE];
    int top;
} ArrayStack;

// Initialize the array-based stack
void initArrayStack(ArrayStack* stack) {
    stack->top = -1;
}

// Check if the array-based stack is empty
bool isArrayStackEmpty(ArrayStack* stack) {
    return stack->top == -1;
}

// Check if the array-based stack is full
bool isArrayStackFull(ArrayStack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// Push an element onto the array-based stack
bool arrayStackPush(ArrayStack* stack, int value) {
    if (isArrayStackFull(stack)) {
        printf("Stack Overflow! Cannot push %d\n", value);
        return false;
    }
    
    stack->items[++(stack->top)] = value;
    return true;
}

// Pop an element from the array-based stack
bool arrayStackPop(ArrayStack* stack, int* value) {
    if (isArrayStackEmpty(stack)) {
        printf("Stack Underflow! Cannot pop from an empty stack\n");
        return false;
    }
    
    *value = stack->items[(stack->top)--];
    return true;
}

// Peek at the top element of the array-based stack without removing it
bool arrayStackPeek(ArrayStack* stack, int* value) {
    if (isArrayStackEmpty(stack)) {
        printf("Stack is empty! Cannot peek\n");
        return false;
    }
    
    *value = stack->items[stack->top];
    return true;
}

// Get the size of the array-based stack
int arrayStackSize(ArrayStack* stack) {
    return stack->top + 1;
}

// Display the array-based stack
void displayArrayStack(ArrayStack* stack) {
    if (isArrayStackEmpty(stack)) {
        printf("Stack is empty!\n");
        return;
    }
    
    printf("Stack (top to bottom): ");
    for (int i = stack->top; i >= 0; i--) {
        printf("%d ", stack->items[i]);
    }
    printf("\n");
}

/*
 * Linked List-based Stack Implementation
 */
typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* top;
} LinkedStack;

// Initialize the linked list-based stack
void initLinkedStack(LinkedStack* stack) {
    stack->top = NULL;
}

// Check if the linked list-based stack is empty
bool isLinkedStackEmpty(LinkedStack* stack) {
    return stack->top == NULL;
}

// Push an element onto the linked list-based stack
bool linkedStackPush(LinkedStack* stack, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed! Cannot push %d\n", value);
        return false;
    }
    
    newNode->data = value;
    newNode->next = stack->top;
    stack->top = newNode;
    return true;
}

// Pop an element from the linked list-based stack
bool linkedStackPop(LinkedStack* stack, int* value) {
    if (isLinkedStackEmpty(stack)) {
        printf("Stack Underflow! Cannot pop from an empty stack\n");
        return false;
    }
    
    Node* temp = stack->top;
    *value = temp->data;
    stack->top = temp->next;
    free(temp);
    return true;
}

// Peek at the top element of the linked list-based stack without removing it
bool linkedStackPeek(LinkedStack* stack, int* value) {
    if (isLinkedStackEmpty(stack)) {
        printf("Stack is empty! Cannot peek\n");
        return false;
    }
    
    *value = stack->top->data;
    return true;
}

// Get the size of the linked list-based stack
int linkedStackSize(LinkedStack* stack) {
    int count = 0;
    Node* current = stack->top;
    
    while (current != NULL) {
        count++;
        current = current->next;
    }
    
    return count;
}

// Display the linked list-based stack
void displayLinkedStack(LinkedStack* stack) {
    if (isLinkedStackEmpty(stack)) {
        printf("Stack is empty!\n");
        return;
    }
    
    Node* current = stack->top;
    printf("Stack (top to bottom): ");
    
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    
    printf("\n");
}

// Free the memory allocated for the linked list-based stack
void freeLinkedStack(LinkedStack* stack) {
    Node* current = stack->top;
    Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    stack->top = NULL;
}

// Application: Check if parentheses in an expression are balanced
bool areParenthesesBalanced(char* expr) {
    ArrayStack stack;
    initArrayStack(&stack);
    
    for (int i = 0; expr[i] != '\0'; i++) {
        if (expr[i] == '(' || expr[i] == '[' || expr[i] == '{') {
            // Push the opening bracket onto the stack
            arrayStackPush(&stack, expr[i]);
        } else if (expr[i] == ')' || expr[i] == ']' || expr[i] == '}') {
            // If the stack is empty, there's no matching opening bracket
            if (isArrayStackEmpty(&stack)) {
                return false;
            }
            
            int top;
            arrayStackPop(&stack, &top);
            
            // Check if the popped bracket matches the current closing bracket
            if ((expr[i] == ')' && top != '(') ||
                (expr[i] == ']' && top != '[') ||
                (expr[i] == '}' && top != '{')) {
                return false;
            }
        }
    }
    
    // If the stack is empty, all brackets are matched
    return isArrayStackEmpty(&stack);
}

// Main function to demonstrate the stack operations
int main() {
    int choice, value, result;
    char expr[100];
    
    // Array-based stack
    ArrayStack arrayStack;
    initArrayStack(&arrayStack);
    
    // Linked list-based stack
    LinkedStack linkedStack;
    initLinkedStack(&linkedStack);
    
    printf("\n*** Stack Operations ***\n");
    
    do {
        printf("\n1. Push to Array Stack");
        printf("\n2. Pop from Array Stack");
        printf("\n3. Peek at Array Stack");
        printf("\n4. Display Array Stack");
        printf("\n5. Push to Linked Stack");
        printf("\n6. Pop from Linked Stack");
        printf("\n7. Peek at Linked Stack");
        printf("\n8. Display Linked Stack");
        printf("\n9. Check Parentheses Balance");
        printf("\n0. Exit");
        
        printf("\n\nEnter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter the value to push: ");
                scanf("%d", &value);
                if (arrayStackPush(&arrayStack, value)) {
                    printf("%d pushed to Array Stack\n", value);
                }
                break;
                
            case 2:
                if (arrayStackPop(&arrayStack, &value)) {
                    printf("%d popped from Array Stack\n", value);
                }
                break;
                
            case 3:
                if (arrayStackPeek(&arrayStack, &value)) {
                    printf("Top element of Array Stack: %d\n", value);
                }
                break;
                
            case 4:
                displayArrayStack(&arrayStack);
                break;
                
            case 5:
                printf("Enter the value to push: ");
                scanf("%d", &value);
                if (linkedStackPush(&linkedStack, value)) {
                    printf("%d pushed to Linked Stack\n", value);
                }
                break;
                
            case 6:
                if (linkedStackPop(&linkedStack, &value)) {
                    printf("%d popped from Linked Stack\n", value);
                }
                break;
                
            case 7:
                if (linkedStackPeek(&linkedStack, &value)) {
                    printf("Top element of Linked Stack: %d\n", value);
                }
                break;
                
            case 8:
                displayLinkedStack(&linkedStack);
                break;
                
            case 9:
                printf("Enter an expression with parentheses: ");
                scanf(" %[^\n]", expr);
                if (areParenthesesBalanced(expr)) {
                    printf("Parentheses are balanced!\n");
                } else {
                    printf("Parentheses are NOT balanced!\n");
                }
                break;
                
            case 0:
                printf("Exiting...\n");
                break;
                
            default:
                printf("Invalid choice!\n");
        }
    } while (choice != 0);
    
    // Free the memory allocated for the linked stack
    freeLinkedStack(&linkedStack);
    
    return 0;
}