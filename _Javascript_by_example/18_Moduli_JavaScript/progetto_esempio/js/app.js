// app.js
// Modulo principale dell'applicazione che funge da controller

// Importiamo i moduli necessari
import { GestoreAttivita } from './modelli.js';
import Vista from './vista.js';

// Classe Controller che collega il modello alla vista
class Controller {
  constructor() {
    // Inizializza il modello e la vista
    this.gestoreAttivita = new GestoreAttivita();
    this.vista = new Vista();
    
    // Collega il controller alla vista
    this.vista.setGestoreEventi({
      onAggiungi: this.aggiungiAttivita.bind(this),
      onRimuovi: this.rimuoviAttivita.bind(this),
      onToggle: this.toggleAttivita.bind(this),
      onFiltro: this.filtraAttivita.bind(this),
      onPulisciCompletate: this.pulisciCompletate.bind(this)
    });
    
    // Inizializza la vista con il filtro predefinito
    this.filtraAttivita('tutte');
  }
  
  // Metodi per gestire le azioni dell'utente
  aggiungiAttivita(testo) {
    this.gestoreAttivita.aggiungi(testo);
    this.aggiornaVista();
  }
  
  rimuoviAttivita(id) {
    this.gestoreAttivita.rimuovi(id);
    this.aggiornaVista();
  }
  
  toggleAttivita(id) {
    this.gestoreAttivita.toggle(id);
    this.aggiornaVista();
  }
  
  filtraAttivita(filtro) {
    const attivitaFiltrate = this.gestoreAttivita.filtra(filtro);
    this.vista.renderizzaLista(attivitaFiltrate);
    this.aggiornaContatore();
  }
  
  pulisciCompletate() {
    this.gestoreAttivita.rimuoviCompletate();
    this.aggiornaVista();
  }
  
  // Metodi di supporto
  aggiornaVista() {
    // Riapplica il filtro corrente
    this.filtraAttivita(this.vista.filtroCorrente);
  }
  
  aggiornaContatore() {
    const conteggio = this.gestoreAttivita.contaAttive();
    this.vista.aggiornaContatore(conteggio);
  }
}

// Inizializza l'applicazione quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
  // Crea un'istanza del controller per avviare l'applicazione
  const app = new Controller();
  
  // Aggiungiamo alcune attività di esempio
  app.aggiungiAttivita('Studiare i moduli JavaScript');
  app.aggiungiAttivita('Completare l\'esercitazione');
  app.aggiungiAttivita('Creare un progetto personale');
});

// Esportiamo il controller per eventuali usi esterni
export default Controller;