/** ****************************************************************************************
* @file Pulsante.H
* @brief <inserire una breve descrizione del modulo>
* <specifiche del progetto>
* <specifiche del collaudo>
* 
https://github.com/evert-arias/EasyButton 
https://github.com/JChristensen/JC_Button 
https://github.com/mathertel/OneButton
https://github.com/bxparks/AceButton
https://github.com/LennartHennigs/Button2
https://github.com/filippo-bilardo/ESP32-TTGO-T-Display/blob/main/003-ButtonsTest/MyBtn.cpp
https://github.com/filippo-bilardo/TPSIT_2/blob/main/008/pulsanti.c

* @author Filippo Bilardo
* @date 26/02/23
* @version 1.0 26/02/23 Versione iniziale
*/
#ifndef PULSANTE_H
#define PULSANTE_H

class Pulsante {
  public:
    /**
    * @brief Costruttore della classe Pulsante
    * @param pin Pin del pulsante su Arduino
    *
    * Inizializza il pin del pulsante come input con pull-up e gli altri membri della classe 
    */
    Pulsante(int pin);
    Pulsante(int pin, bool activeLow);  
    
    /**
    * @brief Metodo per verificare se il pulsante è stato premuto
    * @return true se il pulsante è stato premuto, false altrimenti
    *
    * Legge lo stato attuale del pin del pulsante e confronta con lo stato precedente.
    * Se lo stato attuale è LOW e quello precedente è HIGH, il pulsante è stato premuto.
    * Aggiorna lo stato precedente con quello attuale.
    */
    bool press();
    bool onePress();
    /**
    * @brief Metodo per verificare se è stato effettuato un click
    * @return true se il pulsante è stato cliccato, false altrimenti
    *
    * Utilizza il metodo press() per verificare se il pulsante è stato premuto e controlla che sia 
    * trascorso un tempo sufficientemente lungo dall'ultimo click.
    * Aggiorna l'ultimo click.
    */
    bool click();

    /**
    * @brief Metodo per verificare se è stato effettuato un doppio click
    * @return true se il pulsante è stato cliccato due volte in rapida successione, false altrimenti
    *
    * Utilizza il metodo click() per verificare se il pulsante è stato cliccato e controlla che sia trascorso un tempo sufficientemente breve dall'ultimo doppio click.
    * Aggiorna l'ultimo doppio click.
    */
    bool doppio_click();
  
    /**
    * @brief Metodo per testare le funzionalità della classe
    * @param numero_test numero del test da eseguire (1-3)
    *
    * Esegue i test del pulsante in base al numero passato come parametro.
    * 1: test press()
    * 2: test click()
    * 3: test doppio_click()
    * Qualsiasi altro valore mostra un messaggio di errore
    */
    void test(int numero_test);

  private:
    int pin_;
    bool statoPrecedente_;
    bool statoAttuale_;
    unsigned long ultimoPress_;
    unsigned long ultimoClick_;
    unsigned long ultimoDoppioClick_;
};

#endif