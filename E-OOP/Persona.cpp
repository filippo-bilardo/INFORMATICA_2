#include <iostream> //cout, cin

using namespace std; // Per le funzioni cout e cin

// Definizione della classe Persona
class Persona {
  
  public:
    Persona() {}
    Persona(int e) {
        eta = e;
    }
    // Proprietà (campi o attributi)
    int eta;

    // Metodo (funzione o comportamento)
    void saluta() {
      cout << "Ciao, ho " << eta << " anni." << endl;
    }
};

int main() {
  // Dichiarazione e Istanziazione della classe
  Persona gianni(30);

  Persona mario;
  mario.eta=15;

  // Stampa l'età della persona
  cout << "Età di Gianni: " << gianni.eta << endl;
  gianni.saluta();
  cout << "Età di Mario: " << mario.eta << endl;
  mario.saluta();

  return 0;
}
