// vista.js
// Modulo che gestisce l'interfaccia utente

// Funzione per creare un elemento della lista attività
function creaElementoAttivita(attivita, gestoreEventi) {
  const li = document.createElement('li');
  li.dataset.id = attivita.id;
  if (attivita.completata) {
    li.classList.add('completata');
  }

  // Checkbox per lo stato di completamento
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = attivita.completata;
  checkbox.addEventListener('change', () => {
    gestoreEventi.onToggle(attivita.id);
  });

  // Testo dell'attività
  const span = document.createElement('span');
  span.textContent = attivita.testo;

  // Pulsante di eliminazione
  const button = document.createElement('button');
  button.textContent = 'Elimina';
  button.addEventListener('click', () => {
    gestoreEventi.onRimuovi(attivita.id);
  });

  // Assembla l'elemento
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);

  return li;
}

// Classe principale per la gestione della vista
export default class Vista {
  constructor() {
    // Elementi DOM
    this.nuovaAttivitaInput = document.getElementById('nuovaAttivita');
    this.aggiungiBtn = document.getElementById('aggiungiBtn');
    this.listaAttivita = document.getElementById('listaAttivita');
    this.contatore = document.getElementById('contatore');
    this.pulisciBtn = document.getElementById('pulisciBtn');
    
    // Pulsanti filtro
    this.tutteBtn = document.getElementById('tutteBtn');
    this.attiveBtn = document.getElementById('attiveBtn');
    this.completateBtn = document.getElementById('completateBtn');
    
    // Filtro corrente
    this.filtroCorrente = 'tutte';
    
    // Gestore eventi (sarà impostato dal controller)
    this.gestoreEventi = null;
  }

  // Imposta il gestore eventi
  setGestoreEventi(gestoreEventi) {
    this.gestoreEventi = gestoreEventi;
    this.bindEvents();
  }

  // Collega gli eventi agli elementi DOM
  bindEvents() {
    // Evento per aggiungere una nuova attività
    this.aggiungiBtn.addEventListener('click', () => {
      this.aggiungiAttivita();
    });

    this.nuovaAttivitaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.aggiungiAttivita();
      }
    });

    // Eventi per i filtri
    this.tutteBtn.addEventListener('click', () => {
      this.setFiltro('tutte');
    });

    this.attiveBtn.addEventListener('click', () => {
      this.setFiltro('attive');
    });

    this.completateBtn.addEventListener('click', () => {
      this.setFiltro('completate');
    });

    // Evento per pulire le attività completate
    this.pulisciBtn.addEventListener('click', () => {
      this.gestoreEventi.onPulisciCompletate();
    });
  }

  // Aggiunge una nuova attività
  aggiungiAttivita() {
    const testo = this.nuovaAttivitaInput.value.trim();
    if (testo) {
      this.gestoreEventi.onAggiungi(testo);
      this.nuovaAttivitaInput.value = '';
      this.nuovaAttivitaInput.focus();
    }
  }

  // Imposta il filtro corrente
  setFiltro(filtro) {
    this.filtroCorrente = filtro;
    
    // Aggiorna la classe attiva sui pulsanti
    this.tutteBtn.classList.toggle('attivo', filtro === 'tutte');
    this.attiveBtn.classList.toggle('attivo', filtro === 'attive');
    this.completateBtn.classList.toggle('attivo', filtro === 'completate');
    
    // Richiede l'aggiornamento della lista
    this.gestoreEventi.onFiltro(filtro);
  }

  // Renderizza la lista delle attività
  renderizzaLista(attivita) {
    // Pulisce la lista corrente
    this.listaAttivita.innerHTML = '';
    
    // Aggiunge ogni attività alla lista
    attivita.forEach(attivita => {
      const li = creaElementoAttivita(attivita, this.gestoreEventi);
      this.listaAttivita.appendChild(li);
    });
  }

  // Aggiorna il contatore delle attività rimaste
  aggiornaContatore(conteggio) {
    this.contatore.textContent = `${conteggio} attività rimaste`;
  }
}