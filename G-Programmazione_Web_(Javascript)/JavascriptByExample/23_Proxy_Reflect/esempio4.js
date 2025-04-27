// Proxy e Reflect in JavaScript - Esempio 4: Controllo degli accessi e sicurezza

/**
 * Questo esempio mostra come utilizzare i Proxy per implementare
 * meccanismi di controllo degli accessi e sicurezza per gli oggetti.
 */

console.log('=== CONTROLLO DEGLI ACCESSI E SICUREZZA ===');

// Funzione per creare un oggetto con controllo degli accessi
function creaOggettoProtetto(target, { proprietàPrivate = [], proprietàSoloLettura = [], ruoli = {} } = {}) {
  // Mappa per memorizzare i ruoli degli utenti
  const mappaRuoli = new Map(Object.entries(ruoli));
  
  // Utente corrente (in un'applicazione reale, questo verrebbe dal sistema di autenticazione)
  let utenteCorrente = null;
  
  // Proxy per il controllo degli accessi
  return new Proxy(target, {
    // API per l'autenticazione
    get(target, proprietà, receiver) {
      // Metodi speciali per l'autenticazione
      if (proprietà === 'login') {
        return function(utente) {
          utenteCorrente = utente;
          console.log(`Utente ${utente} ha effettuato l'accesso`);
          return true;
        };
      }
      
      if (proprietà === 'logout') {
        return function() {
          const vecchioUtente = utenteCorrente;
          utenteCorrente = null;
          console.log(`Utente ${vecchioUtente} ha effettuato il logout`);
          return true;
        };
      }
      
      if (proprietà === 'utenteCorrente') {
        return utenteCorrente;
      }
      
      // Verifica se la proprietà è privata
      if (proprietàPrivate.includes(proprietà)) {
        // Verifica se l'utente è autenticato e ha i permessi necessari
        if (!utenteCorrente) {
          console.error(`Accesso negato: è necessario effettuare l'accesso per accedere a ${proprietà}`);
          return undefined;
        }
        
        const ruoloUtente = mappaRuoli.get(utenteCorrente);
        if (!ruoloUtente || ruoloUtente !== 'admin') {
          console.error(`Accesso negato: sono necessari privilegi di amministratore per accedere a ${proprietà}`);
          return undefined;
        }
      }
      
      return Reflect.get(target, proprietà, receiver);
    },
    
    set(target, proprietà, valore, receiver) {
      // Verifica se la proprietà è di sola lettura
      if (proprietàSoloLettura.includes(proprietà)) {
        console.error(`Accesso negato: la proprietà ${proprietà} è di sola lettura`);
        return false;
      }
      
      // Verifica se la proprietà è privata
      if (proprietàPrivate.includes(proprietà)) {
        // Verifica se l'utente è autenticato e ha i permessi necessari
        if (!utenteCorrente) {
          console.error(`Accesso negato: è necessario effettuare l'accesso per modificare ${proprietà}`);
          return false;
        }
        
        const ruoloUtente = mappaRuoli.get(utenteCorrente);
        if (!ruoloUtente || ruoloUtente !== 'admin') {
          console.error(`Accesso negato: sono necessari privilegi di amministratore per modificare ${proprietà}`);
          return false;
        }
      }
      
      return Reflect.set(target, proprietà, valore, receiver);
    },
    
    // Impedisce l'enumerazione di proprietà private
    ownKeys(target) {
      const chiavi = Reflect.ownKeys(target);
      
      // Se l'utente non è admin, nascondi le proprietà private
      if (!utenteCorrente || mappaRuoli.get(utenteCorrente) !== 'admin') {
        return chiavi.filter(chiave => !proprietàPrivate.includes(chiave));
      }
      
      return chiavi;
    },
    
    // Impedisce la verifica dell'esistenza di proprietà private
    has(target, proprietà) {
      if (proprietàPrivate.includes(proprietà) && 
          (!utenteCorrente || mappaRuoli.get(utenteCorrente) !== 'admin')) {
        return false;
      }
      
      return Reflect.has(target, proprietà);
    }
  });
}

// Creazione di un oggetto con controllo degli accessi
const datiSensibili = {
  nome: 'Sistema di Gestione',
  versione: '1.0.0',
  datiPubblici: 'Questi dati sono accessibili a tutti',
  datiUtente: 'Questi dati sono accessibili agli utenti registrati',
  chiaveAPI: 'sk_test_abcdefghijklmnopqrstuvwxyz',
  configurazioneSicurezza: {
    timeout: 3600,
    tentativi: 3
  }
};

const sistemaProtetto = creaOggettoProtetto(datiSensibili, {
  proprietàPrivate: ['chiaveAPI', 'configurazioneSicurezza'],
  proprietàSoloLettura: ['versione'],
  ruoli: {
    'admin': 'admin',
    'utente1': 'utente',
    'utente2': 'utente'
  }
});

console.log('\n--- Accesso senza autenticazione ---');
console.log('Nome:', sistemaProtetto.nome);
console.log('Dati pubblici:', sistemaProtetto.datiPubblici);

// Tentativo di accesso a proprietà private senza autenticazione
console.log('Tentativo di accesso alla chiave API:', sistemaProtetto.chiaveAPI);

// Tentativo di modifica di proprietà di sola lettura
sistemaProtetto.versione = '2.0.0';
console.log('Versione dopo tentativo di modifica:', sistemaProtetto.versione);

console.log('\n--- Accesso come utente normale ---');
sistemaProtetto.login('utente1');
console.log('Dati utente:', sistemaProtetto.datiUtente);

// Tentativo di accesso a proprietà private come utente normale
console.log('Tentativo di accesso alla chiave API:', sistemaProtetto.chiaveAPI);

console.log('\n--- Accesso come amministratore ---');
sistemaProtetto.login('admin');
console.log('Chiave API:', sistemaProtetto.chiaveAPI);
console.log('Configurazione sicurezza:', sistemaProtetto.configurazioneSicurezza);

// Modifica di proprietà private come amministratore
sistemaProtetto.configurazioneSicurezza.timeout = 7200;
console.log('Configurazione sicurezza dopo modifica:', sistemaProtetto.configurazioneSicurezza);

console.log('\n--- Enumerazione delle proprietà ---');
console.log('Proprietà visibili come admin:', Object.keys(sistemaProtetto));

sistemaProtetto.logout();
console.log('Proprietà visibili dopo logout:', Object.keys(sistemaProtetto));

/**
 * Questo pattern di controllo degli accessi è utile per:
 * - Implementare sistemi di autorizzazione basati sui ruoli
 * - Proteggere dati sensibili
 * - Creare API con diversi livelli di accesso
 * - Implementare oggetti immutabili o parzialmente immutabili
 */