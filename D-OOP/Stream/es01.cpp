/**
 * Esempio di codice che utilizza gli stream di input/output.
 * Questo codice è stato scritto per essere compilato ed eseguito in ambiente Linux.
 * Per compilarlo digitare da terminale:
 * g++ es01.cpp
 * Per eseguirlo digitare:
 * ./a.out
 * 
 * @version 1.0 08/01/2024
 */
#include <iostream>
#include <fstream> // Per l'input/output su file
#include <sstream> // Per l'input/output su stringhe

using namespace std;

int main() {
    // Stream di input dalla console (cin)
    int numero;
    cout << "Inserisci un numero: ";
    cin >> numero;
    cout << "Hai inserito il numero: " << numero << endl;

    // Stream di output sulla console (cout)
    cout << "Questo è un messaggio di output." << endl;

    // Stream di output su file
    ofstream file_output("output.txt");
    if (file_output.is_open()) {
        file_output << "Questo è un messaggio scritto su un file." << endl;
        file_output.close();
    } else {
        cerr << "Errore nell'apertura del file." << endl;
    }

    // Stream di input da una stringa
    string input_string = "123 4.56";
    istringstream string_stream(input_string);
    int intero_da_stringa;
    double double_da_stringa;

    string_stream >> intero_da_stringa >> double_da_stringa;

    cout << "Valori letti dalla stringa: " << intero_da_stringa << " e " << double_da_stringa << endl;

    return 0;
}
