/*
Scrivere un programma per Arduino, che modificando il valore di un potenziometro collegato 
al pin A3, modifichi la luminosità di un led collegato al pin 9, creando le classi Led e 
Poteziometro. Commentare adeguatamente il codice (doxygen) e creare moduli separati.

Il codice crea due classi: Potenziometro e Led. La classe Potenziometro gestisce la lettura 
del valore del potenziometro collegato al pin A3, mentre la classe Led gestisce la modifica 
della luminosità del LED collegato al pin 9. Il metodo setup() è utilizzato per la configurazione 
iniziale, mentre il metodo loop() legge il valore del potenziometro e lo utilizza per impostare 
la luminosità del LED.

Il codice è stato commentato con Doxygen e sono stati creati moduli separati per le classi 
Potenziometro e Led.
Inoltre, nella classe Potenziometro, il metodo leggiValore() è stato creato per leggere il valore 
del potenziometro e restituirlo come un valore intero. In questo modo, è possibile utilizzare 
questo valore per impostare la luminosità del LED nella classe Led.

In generale, questo programma mostra come utilizzare le classi per organizzare il codice e rendere
 più semplice la gestione dei dispositivi collegati ad Arduino, in questo caso un potenziometro e un LED.

Inoltre, l'uso delle classi rende il codice più facile da comprendere e modificare in futuro, in 
quanto consente di separare la logica di gestione dei dispositivi dalla logica principale del programma.
*/
// File main.ino
#include "Potenziometro.h"
#include "Led.h"

Potenziometro potenziometro(A3);
Led led(9);

void setup() {
  // configurazione iniziale
}

void loop() {
  int valorePot = potenziometro.leggiValore();
  led.impostaLuminosita(valorePot);
}
