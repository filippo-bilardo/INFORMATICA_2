// Direttive di preprocessore
#include <iostream> //cout, cin

using namespace std; // Per le funzioni cout e cin

// Definizione della classe
class Frazione {
private:
	// Definizione degli attributi di classe
	int numeratore;
	int denominatore;

public:
	// Costruttore di default
	Frazione() {}

	// Metodi setters
	void setNumeratore(int n) {
		numeratore = n;
	}

	void setDenominatore(int n) {
		denominatore = n;
	}

	// Metodi getters
	int getNumeratore() {
		return numeratore;
	}

	int getDenominatore() {
		return denominatore;
	}

	// Definizione dei metodi
	void stampa() {  // Metodo che stampa a video la frazione
		/* quando l'invocazione di un metodo è all'interno della  
		classe non usiamo la dot notation (spiegata in seguito) */
		//semplifica();
		cout << numeratore << "/" << denominatore << endl;
	}

	void semplifica() { // Metodo che semplifica gli argomenti della frazione
		int min;
		min = MCD(numeratore, denominatore);
		numeratore = numeratore / min;
		denominatore = denominatore / min;
	}

	int MCD(int a, int b) { // Metodo che calcola il MCD (algoritmo di Euclide)
	
		return 0;
	}
};

int main() { // Funzione principale
	Frazione f1; 			// Definizione di un oggetto di classe Frazione
	//f1.numeratore=5;   	// ERRATA perché numeratore è private
	f1.setNumeratore(15); 	// Chiamata del metodo setNumeratore sull'oggetto
	f1.setDenominatore(5);
	f1.stampa(); 	// Semplificazione automatica (stampa chiama semplifica: f1 vale 4)
	return 0;
}
