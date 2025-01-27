#include "ContoBancario.h"
#include <iostream>

// Classe interna definita solo nel file di implementazione
class ContoBancario::DettagliConto {
private:
    int numeroConto;
    std::string titolare;
    double saldo;

public:
    DettagliConto(int numero, const std::string& tit, double saldoIniziale)
        : numeroConto(numero), titolare(tit), saldo(saldoIniziale) {}

    int getNumeroConto() const { return numeroConto; }
    const std::string& getTitolare() const { return titolare; }
    double getSaldo() const { return saldo; }

    void aggiungiSaldo(double importo) { saldo += importo; }
    void riduciSaldo(double importo) { saldo -= importo; }
};

ContoBancario::ContoBancario(int numero, const std::string& titolare, double saldoIniziale)
    : dettagli(new DettagliConto(numero, titolare, saldoIniziale)) {}

ContoBancario::~ContoBancario() {
    delete dettagli;
}

void ContoBancario::deposita(double importo) {
    if (importo > 0) {
        dettagli->aggiungiSaldo(importo);
    } else {
        std::cerr << "Errore: l'importo del deposito deve essere positivo.\n";
    }
}

void ContoBancario::preleva(double importo) {
    if (importo > 0 && importo <= dettagli->getSaldo()) {
        dettagli->riduciSaldo(importo);
    } else {
        std::cerr << "Errore: l'importo non è valido o il saldo è insufficiente.\n";
    }
}

double ContoBancario::ottieniSaldo() const {
    return dettagli->getSaldo();
}