#ifndef CONTO_BANCARIO_H
#define CONTO_BANCARIO_H

#include <string>

class ContoBancario {
public:
    ContoBancario(int numero, const std::string& titolare, double saldoIniziale);
    ~ContoBancario();

    void deposita(double importo);
    void preleva(double importo);
    double ottieniSaldo() const;

private:
    class DettagliConto; // Dichiarazione della classe interna opaca
    DettagliConto* dettagli; // Puntatore alla classe dei dettagli nascosti
};

#endif