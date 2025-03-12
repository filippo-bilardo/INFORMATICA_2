#include <iostream>
#include <memory>
#include <string>

// Define the maximum size for the array-based stack
const int MAX_SIZE = 100;

/*
 * Array-based Stack Implementation
 */
class ArrayStack {
private:
    int items[MAX_SIZE];
    int top;
    
public:
    // Constructor
    ArrayStack() : top(-1) {}
    
    // Check if the stack is empty
    bool isEmpty() const {
        return top == -1;
    }
    
    // Check if the stack is full
    bool isFull() const {
        return top == MAX_SIZE - 1;
    }
    
    // Push an element onto the stack
    bool push(int value) {
        if (isFull()) {
            std::cout << "Stack Overflow! Cannot push " << value << std::endl;
            return false;
        }
        
        items[++top] = value;
        return true;
    }
    
    // Pop an element from the stack
    bool pop(int& value) {
        if (isEmpty()) {
            std::cout << "Stack Underflow! Cannot pop from an empty stack" << std::endl;
            return false;
        }
        
        value = items[top--];
        return true;
    }
    
    // Peek at the top element without removing it
    bool peek(int& value) const {
        if (isEmpty()) {
            std::cout << "Stack is empty! Cannot peek" << std::endl;
            return false;
        }
        
        value = items[top];
        return true;
    }
    
    // Get the size of the stack
    int size() const {
        return top + 1;
    }
    
    // Display the stack
    void display() const {
        if (isEmpty()) {
            std::cout << "Stack is empty!" << std::endl;
            return;
        }
        
        std::cout << "Stack (top to bottom): ";
        for (int i = top; i >= 0; i--) {
            std::cout << items[i] << " ";
        }
        std::cout << std::endl;
    }
};

/*
 * Linked List-based Stack Implementation
 */
class LinkedStack {
private:
    struct Node {
        int data;
        std::shared_ptr<Node> next;
        
        // Constructor
        Node(int val) : data(val), next(nullptr) {}
    };
    
    std::shared_ptr<Node> top;
    
public:
    // Constructor
    LinkedStack() : top(nullptr) {}
    
    // Check if the stack is empty
    bool isEmpty() const {
        return top == nullptr;
    }
    
    // Push an element onto the stack
    bool push(int value) {
        std::shared_ptr<Node> newNode = std::make_shared<Node>(value);
        newNode->next = top;
        top = newNode;
        return true;
    }
    
    // Pop an element from the stack
    bool pop(int& value) {
        if (isEmpty()) {
            std::cout << "Stack Underflow! Cannot pop from an empty stack" << std::endl;
            return false;
        }
        
        value = top->data;
        top = top->next;
        return true;
    }
    
    // Peek at the top element without removing it
    bool peek(int& value) const {
        if (isEmpty()) {
            std::cout << "Stack is empty! Cannot peek" << std::endl;
            return false;
        }
        
        value = top->data;
        return true;
    }
    
    // Get the size of the stack
    int size() const {
        int count = 0;
        std::shared_ptr<Node> current = top;
        
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        
        return count;
    }
    
    // Display the stack
    void display() const {
        if (isEmpty()) {
            std::cout << "Stack is empty!" << std::endl;
            return;
        }
        
        std::shared_ptr<Node> current = top;
        std::cout << "Stack (top to bottom): ";
        
        while (current != nullptr) {
            std::cout << current->data << " ";
            current = current->next;
        }
        
        std::cout << std::endl;
    }
};

// Application: Check if parentheses in an expression are balanced
bool areParenthesesBalanced(const std::string& expr) {
    ArrayStack stack;
    
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{') {
            // Push the opening bracket onto the stack
            stack.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            // If the stack is empty, there's no matching opening bracket
            if (stack.isEmpty()) {
                return false;
            }
            
            int top;
            stack.pop(top);
            
            // Check if the popped bracket matches the current closing bracket
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    
    // If the stack is empty, all brackets are matched
    return stack.isEmpty();
}

// Function to reverse a string using a stack
std::string reverseString(const std::string& str) {
    LinkedStack stack;
    std::string reversed;
    
    // Push all characters onto the stack
    for (char c : str) {
        stack.push(c);
    }
    
    // Pop characters from the stack to get the reversed string
    int value;
    while (stack.pop(value)) {
        reversed += static_cast<char>(value);
    }
    
    return reversed;
}

// Main function to demonstrate the stack operations
int main() {
    int choice, value;
    std::string expr, str;
    
    // Array-based stack
    ArrayStack arrayStack;
    
    // Linked list-based stack
    LinkedStack linkedStack;
    
    std::cout << "\n*** Stack Operations (C++) ***" << std::endl;
    
    do {
        std::cout << "\n1. Push to Array Stack";
        std::cout << "\n2. Pop from Array Stack";
        std::cout << "\n3. Peek at Array Stack";
        std::cout << "\n4. Display Array Stack";
        std::cout << "\n5. Push to Linked Stack";
        std::cout << "\n6. Pop from Linked Stack";
        std::cout << "\n7. Peek at Linked Stack";
        std::cout << "\n8. Display Linked Stack";
        std::cout << "\n9. Check Parentheses Balance";
        std::cout << "\n10. Reverse a String";
        std::cout << "\n0. Exit";
        
        std::cout << "\n\nEnter your choice: ";
        std::cin >> choice;
        
        switch (choice) {
            case 1:
                std::cout << "Enter the value to push: ";
                std::cin >> value;
                if (arrayStack.push(value)) {
                    std::cout << value << " pushed to Array Stack" << std::endl;
                }
                break;
                
            case 2:
                if (arrayStack.pop(value)) {
                    std::cout << value << " popped from Array Stack" << std::endl;
                }
                break;
                
            case 3:
                if (arrayStack.peek(value)) {
                    std::cout << "Top element of Array Stack: " << value << std::endl;
                }
                break;
                
            case 4:
                arrayStack.display();
                break;
                
            case 5:
                std::cout << "Enter the value to push: ";
                std::cin >> value;
                if (linkedStack.push(value)) {
                    std::cout << value << " pushed to Linked Stack" << std::endl;
                }
                break;
                
            case 6:
                if (linkedStack.pop(value)) {
                    std::cout << value << " popped from Linked Stack" << std::endl;
                }
                break;
                
            case 7:
                if (linkedStack.peek(value)) {
                    std::cout << "Top element of Linked Stack: " << value << std::endl;
                }
                break;
                
            case 8:
                linkedStack.display();
                break;
                
            case 9:
                std::cout << "Enter an expression with parentheses: ";
                std::cin.ignore(); // Clear the input buffer
                std::getline(std::cin, expr);
                if (areParenthesesBalanced(expr)) {
                    std::cout << "Parentheses are balanced!" << std::endl;
                } else {
                    std::cout << "Parentheses are NOT balanced!" << std::endl;
                }
                break;
                
            case 10:
                std::cout << "Enter a string to reverse: ";
                std::cin.ignore(); // Clear the input buffer
                std::getline(std::cin, str);
                std::cout << "Reversed string: " << reverseString(str) << std::endl;
                break;
                
            case 0:
                std::cout << "Exiting..." << std::endl;
                break;
                
            default:
                std::cout << "Invalid choice!" << std::endl;
        }
    } while (choice != 0);
    
    return 0;
}