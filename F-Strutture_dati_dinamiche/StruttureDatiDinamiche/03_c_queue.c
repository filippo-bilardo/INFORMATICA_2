#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the maximum size for the array-based queue
#define MAX_SIZE 100

/*
 * Simple Array-based Queue Implementation
 */
typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
} SimpleQueue;

// Initialize the simple queue
void initSimpleQueue(SimpleQueue* queue) {
    queue->front = -1;
    queue->rear = -1;
}

// Check if the simple queue is empty
bool isSimpleQueueEmpty(SimpleQueue* queue) {
    return queue->front == -1;
}

// Check if the simple queue is full
bool isSimpleQueueFull(SimpleQueue* queue) {
    return queue->rear == MAX_SIZE - 1;
}

// Enqueue an element to the simple queue
bool simpleQueueEnqueue(SimpleQueue* queue, int value) {
    if (isSimpleQueueFull(queue)) {
        printf("Queue Overflow! Cannot enqueue %d\n", value);
        return false;
    }
    
    // If queue is empty, set front to 0
    if (queue->front == -1) {
        queue->front = 0;
    }
    
    queue->items[++(queue->rear)] = value;
    return true;
}

// Dequeue an element from the simple queue
bool simpleQueueDequeue(SimpleQueue* queue, int* value) {
    if (isSimpleQueueEmpty(queue)) {
        printf("Queue Underflow! Cannot dequeue from an empty queue\n");
        return false;
    }
    
    *value = queue->items[queue->front];
    
    // If front and rear are at the same position, reset the queue
    if (queue->front == queue->rear) {
        queue->front = -1;
        queue->rear = -1;
    } else {
        // Shift all elements to the left
        for (int i = 0; i < queue->rear; i++) {
            queue->items[i] = queue->items[i + 1];
        }
        queue->rear--;
    }
    
    return true;
}

// Peek at the front element of the simple queue without removing it
bool simpleQueueFront(SimpleQueue* queue, int* value) {
    if (isSimpleQueueEmpty(queue)) {
        printf("Queue is empty! Cannot peek\n");
        return false;
    }
    
    *value = queue->items[queue->front];
    return true;
}

// Get the size of the simple queue
int simpleQueueSize(SimpleQueue* queue) {
    if (isSimpleQueueEmpty(queue)) {
        return 0;
    }
    return queue->rear - queue->front + 1;
}

// Display the simple queue
void displaySimpleQueue(SimpleQueue* queue) {
    if (isSimpleQueueEmpty(queue)) {
        printf("Queue is empty!\n");
        return;
    }
    
    printf("Queue (front to rear): ");
    for (int i = queue->front; i <= queue->rear; i++) {
        printf("%d ", queue->items[i]);
    }
    printf("\n");
}

/*
 * Circular Queue Implementation
 */
typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
    int size;
} CircularQueue;

// Initialize the circular queue
void initCircularQueue(CircularQueue* queue) {
    queue->front = -1;
    queue->rear = -1;
    queue->size = 0;
}

// Check if the circular queue is empty
bool isCircularQueueEmpty(CircularQueue* queue) {
    return queue->size == 0;
}

// Check if the circular queue is full
bool isCircularQueueFull(CircularQueue* queue) {
    return queue->size == MAX_SIZE;
}

// Enqueue an element to the circular queue
bool circularQueueEnqueue(CircularQueue* queue, int value) {
    if (isCircularQueueFull(queue)) {
        printf("Queue Overflow! Cannot enqueue %d\n", value);
        return false;
    }
    
    // If queue is empty, set front to 0
    if (queue->front == -1) {
        queue->front = 0;
    }
    
    // Circular increment of rear
    queue->rear = (queue->rear + 1) % MAX_SIZE;
    queue->items[queue->rear] = value;
    queue->size++;
    return true;
}

// Dequeue an element from the circular queue
bool circularQueueDequeue(CircularQueue* queue, int* value) {
    if (isCircularQueueEmpty(queue)) {
        printf("Queue Underflow! Cannot dequeue from an empty queue\n");
        return false;
    }
    
    *value = queue->items[queue->front];
    
    // If there's only one element, reset the queue
    if (queue->front == queue->rear) {
        queue->front = -1;
        queue->rear = -1;
    } else {
        // Circular increment of front
        queue->front = (queue->front + 1) % MAX_SIZE;
    }
    
    queue->size--;
    return true;
}

// Peek at the front element of the circular queue without removing it
bool circularQueueFront(CircularQueue* queue, int* value) {
    if (isCircularQueueEmpty(queue)) {
        printf("Queue is empty! Cannot peek\n");
        return false;
    }
    
    *value = queue->items[queue->front];
    return true;
}

// Get the size of the circular queue
int circularQueueSize(CircularQueue* queue) {
    return queue->size;
}

// Display the circular queue
void displayCircularQueue(CircularQueue* queue) {
    if (isCircularQueueEmpty(queue)) {
        printf("Queue is empty!\n");
        return;
    }
    
    printf("Queue (front to rear): ");
    int i = queue->front;
    int count = 0;
    
    while (count < queue->size) {
        printf("%d ", queue->items[i]);
        i = (i + 1) % MAX_SIZE;
        count++;
    }
    
    printf("\n");
}

/*
 * Linked List-based Queue Implementation
 */
typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* front;
    Node* rear;
} LinkedQueue;

// Initialize the linked list-based queue
void initLinkedQueue(LinkedQueue* queue) {
    queue->front = NULL;
    queue->rear = NULL;
}

// Check if the linked list-based queue is empty
bool isLinkedQueueEmpty(LinkedQueue* queue) {
    return queue->front == NULL;
}

// Enqueue an element to the linked list-based queue
bool linkedQueueEnqueue(LinkedQueue* queue, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed! Cannot enqueue %d\n", value);
        return false;
    }
    
    newNode->data = value;
    newNode->next = NULL;
    
    // If queue is empty, set both front and rear to the new node
    if (isLinkedQueueEmpty(queue)) {
        queue->front = newNode;
        queue->rear = newNode;
    } else {
        // Add the new node at the end and update rear
        queue->rear->next = newNode;
        queue->rear = newNode;
    }
    
    return true;
}

// Dequeue an element from the linked list-based queue
bool linkedQueueDequeue(LinkedQueue* queue, int* value) {
    if (isLinkedQueueEmpty(queue)) {
        printf("Queue Underflow! Cannot dequeue from an empty queue\n");
        return false;
    }
    
    Node* temp = queue->front;
    *value = temp->data;
    
    // Update front to point to the next node
    queue->front = queue->front->next;
    
    // If front becomes NULL, set rear to NULL as well
    if (queue->front == NULL) {
        queue->rear = NULL;
    }
    
    free(temp);
    return true;
}

// Peek at the front element of the linked list-based queue without removing it
bool linkedQueueFront(LinkedQueue* queue, int* value) {
    if (isLinkedQueueEmpty(queue)) {
        printf("Queue is empty! Cannot peek\n");
        return false;
    }
    
    *value = queue->front->data;
    return true;
}

// Get the size of the linked list-based queue
int linkedQueueSize(LinkedQueue* queue) {
    if (isLinkedQueueEmpty(queue)) {
        return 0;
    }
    
    int count = 0;
    Node* current = queue->front;
    
    while (current != NULL) {
        count++;
        current = current->next;
    }
    
    return count;
}

// Display the linked list-based queue
void displayLinkedQueue(LinkedQueue* queue) {
    if (isLinkedQueueEmpty(queue)) {
        printf("Queue is empty!\n");
        return;
    }
    
    Node* current = queue->front;
    printf("Queue (front to rear): ");
    
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    
    printf("\n");
}

// Free the memory allocated for the linked list-based queue
void freeLinkedQueue(LinkedQueue* queue) {
    Node* current = queue->front;
    Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    queue->front = NULL;
    queue->rear = NULL;
}

// Main function to demonstrate the queue operations
int main() {
    int choice, value;
    
    // Simple array-based queue
    SimpleQueue simpleQueue;
    initSimpleQueue(&simpleQueue);
    
    // Circular queue
    CircularQueue circularQueue;
    initCircularQueue(&circularQueue);
    
    // Linked list-based queue
    LinkedQueue linkedQueue;
    initLinkedQueue(&linkedQueue);
    
    printf("\n*** Queue Operations ***\n");
    
    do {
        printf("\n1. Enqueue to Simple Queue");
        printf("\n2. Dequeue from Simple Queue");
        printf("\n3. Display Simple Queue");
        printf("\n4. Enqueue to Circular Queue");
        printf("\n5. Dequeue from Circular Queue");
        printf("\n6. Display Circular Queue");
        printf("\n7. Enqueue to Linked Queue");
        printf("\n8. Dequeue from Linked Queue");
        printf("\n9. Display Linked Queue");
        printf("\n0. Exit");
        
        printf("\n\nEnter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter the value to enqueue: ");
                scanf("%d", &value);
                if (simpleQueueEnqueue(&simpleQueue, value)) {
                    printf("%d enqueued to Simple Queue\n", value);
                }
                break;
                
            case 2:
                if (simpleQueueDequeue(&simpleQueue, &value)) {
                    printf("%d dequeued from Simple Queue\n", value);
                }
                break;
                
            case 3:
                displaySimpleQueue(&simpleQueue);
                break;
                
            case 4:
                printf("Enter the value to enqueue: ");
                scanf("%d", &value);
                if (circularQueueEnqueue(&circularQueue, value)) {
                    printf("%d enqueued to Circular Queue\n", value);
                }
                break;
                
            case 5:
                if (circularQueueDequeue(&circularQueue, &value)) {
                    printf("%d dequeued from Circular Queue\n", value);
                }
                break;
                
            case 6:
                displayCircularQueue(&circularQueue);
                break;
                
            case 7:
                printf("Enter the value to enqueue: ");
                scanf("%d", &value);
                if (linkedQueueEnqueue(&linkedQueue, value)) {
                    printf("%d enqueued to Linked Queue\n", value);
                }
                break;
                
            case 8:
                if (linkedQueueDequeue(&linkedQueue, &value)) {
                    printf("%d dequeued from Linked Queue\n", value);
                }
                break;
                
            case 9:
                displayLinkedQueue(&linkedQueue);
                break;
                
            case 0:
                printf("Exiting...\n");
                break;
                
            default:
                printf("Invalid choice!\n");
        }
    } while (choice != 0);
    
    // Free the memory allocated for the linked queue
    freeLinkedQueue(&linkedQueue);
    
    return 0;
}