// Proxy e Reflect in JavaScript - Esempio 3: Logging automatico delle operazioni

/**
 * Questo esempio mostra come utilizzare i Proxy per implementare
 * un sistema di logging automatico per tutte le operazioni su un oggetto.
 */

console.log('=== LOGGING AUTOMATICO DELLE OPERAZIONI ===');

// Funzione per creare un proxy di logging
function creaProxyDiLogging(target, nome = 'Oggetto') {
  return new Proxy(target, {
    get(target, proprietà, receiver) {
      const valore = Reflect.get(target, proprietà, receiver);
      // Non logghiamo Symbol e proprietà speciali
      if (typeof proprietà === 'symbol' || proprietà === 'then') {
        return valore;
      }
      
      console.log(`[LOG] ${nome}.${proprietà} letto: ${JSON.stringify(valore)}`);
      
      // Se il valore è un oggetto, creiamo un proxy anche per esso (logging annidato)
      if (typeof valore === 'object' && valore !== null) {
        return creaProxyDiLogging(valore, `${nome}.${proprietà}`);
      }
      
      return valore;
    },
    
    set(target, proprietà, valore, receiver) {
      const vecchioValore = Reflect.get(target, proprietà, receiver);
      const risultato = Reflect.set(target, proprietà, valore, receiver);
      
      console.log(
        `[LOG] ${nome}.${proprietà} modificato: ${JSON.stringify(vecchioValore)} => ${JSON.stringify(valore)}`
      );
      
      return risultato;
    },
    
    deleteProperty(target, proprietà) {
      const vecchioValore = Reflect.get(target, proprietà);
      const risultato = Reflect.deleteProperty(target, proprietà);
      
      console.log(`[LOG] ${nome}.${proprietà} eliminato (valore: ${JSON.stringify(vecchioValore)})`);
      
      return risultato;
    },
    
    apply(target, thisArg, args) {
      // Per funzioni, logghiamo l'invocazione e il risultato
      console.log(`[LOG] ${nome} chiamato con argomenti: ${JSON.stringify(args)}`);
      
      try {
        const risultato = Reflect.apply(target, thisArg, args);
        console.log(`[LOG] ${nome} ha restituito: ${JSON.stringify(risultato)}`);
        return risultato;
      } catch (errore) {
        console.log(`[LOG] ${nome} ha generato un errore: ${errore.message}`);
        throw errore;
      }
    }
  });
}

// Esempio con un oggetto semplice
const database = {
  utenti: [
    { id: 1, nome: 'Mario', ruolo: 'admin' },
    { id: 2, nome: 'Luigi', ruolo: 'utente' }
  ],
  trovaUtente(id) {
    return this.utenti.find(utente => utente.id === id);
  },
  aggiungiUtente(utente) {
    this.utenti.push(utente);
    return utente.id;
  }
};

// Creiamo un proxy di logging per il database
const dbLogger = creaProxyDiLogging(database, 'Database');

console.log('\n--- Operazioni sul database ---');

// Lettura di proprietà
console.log('Numero di utenti:', dbLogger.utenti.length);

// Chiamata di metodi
const utenteTrovato = dbLogger.trovaUtente(1);
console.log('Utente trovato:', utenteTrovato);

// Modifica di proprietà annidate
dbLogger.utenti[0].ruolo = 'superadmin';

// Aggiunta di nuovi elementi
dbLogger.aggiungiUtente({ id: 3, nome: 'Giovanna', ruolo: 'utente' });

// Eliminazione di proprietà
delete dbLogger.utenti[1].ruolo;

console.log('\n--- Stato finale del database ---');
console.log(database);

/**
 * Questo pattern di logging è utile per:
 * - Debugging e tracciamento delle operazioni
 * - Audit trail per operazioni sensibili
 * - Monitoraggio delle prestazioni
 * - Comprensione del flusso di dati in applicazioni complesse
 */