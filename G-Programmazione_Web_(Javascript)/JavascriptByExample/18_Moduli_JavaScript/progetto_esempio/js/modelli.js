// modelli.js
// Modulo che definisce la struttura dati per le attività

// Classe che rappresenta una singola attività
export class Attivita {
  constructor(id, testo) {
    this.id = id;
    this.testo = testo;
    this.completata = false;
    this.dataCreazione = new Date();
  }

  toggle() {
    this.completata = !this.completata;
    return this.completata;
  }
}

// Classe che gestisce la collezione di attività
export class GestoreAttivita {
  constructor() {
    this.attivita = [];
    this.prossimoId = 1;
  }

  aggiungi(testo) {
    const nuovaAttivita = new Attivita(this.prossimoId++, testo);
    this.attivita.push(nuovaAttivita);
    return nuovaAttivita;
  }

  rimuovi(id) {
    const indice = this.attivita.findIndex(attivita => attivita.id === id);
    if (indice !== -1) {
      this.attivita.splice(indice, 1);
      return true;
    }
    return false;
  }

  toggle(id) {
    const attivita = this.attivita.find(attivita => attivita.id === id);
    if (attivita) {
      return attivita.toggle();
    }
    return null;
  }

  filtra(filtro) {
    switch(filtro) {
      case 'attive':
        return this.attivita.filter(attivita => !attivita.completata);
      case 'completate':
        return this.attivita.filter(attivita => attivita.completata);
      default:
        return [...this.attivita]; // Restituisce una copia dell'array originale
    }
  }

  contaAttive() {
    return this.attivita.filter(attivita => !attivita.completata).length;
  }

  rimuoviCompletate() {
    this.attivita = this.attivita.filter(attivita => !attivita.completata);
  }
}