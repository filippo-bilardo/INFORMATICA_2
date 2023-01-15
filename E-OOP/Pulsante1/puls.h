#ifndef PULSANTE_H
#define PULSANTE_H

class Pulsante {
 public:
  /**
   * Costruttore della classe Pulsante
   * @param pin Pin su cui è collegato il pulsante
   */
  Pulsante(int pin);
  /**
   * Metodo per verificare se il pulsante è stato premuto
   * @return true se il pulsante è stato premuto, false altrimenti
   */
  bool press();
  /**
   * Metodo per verificare se è stato effettuato un click
   * @return true se è stato effettuato un click, false altrimenti
   */
  bool click();
  /**
   * Metodo per verificare se è stato effettuato un doppio click
   * @return true se è stato effettuato un doppio click, false altrimenti
   */
  bool doppio_click();
  /**
   * Metodo per testare le funzionalità della classe
   * @param numero_test numero del test da eseguire (1: press, 2: click, 3: doppio_click)
   */
  void test(int numero_test);
 private:
  int pin_;
  bool statoPrecedente_;
  bool statoAttuale_;
  unsigned long ultimoClick_;
  unsigned long ultimoDoppioClick_;
};

#endif
