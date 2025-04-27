// Proxy e Reflect in JavaScript - Esempio 2: Validazione delle proprietà con Proxy

/**
 * Questo esempio mostra come utilizzare i Proxy per implementare
 * la validazione delle proprietà di un oggetto.
 */

console.log('=== VALIDAZIONE DELLE PROPRIETÀ CON PROXY ===');

// Funzione per creare un oggetto con validazione
function creaOggettoConValidazione(schema) {
  return function(target) {
    return new Proxy(target, {
      set(oggetto, proprietà, valore, receiver) {
        // Verifica se la proprietà esiste nello schema
        if (!schema[proprietà]) {
          throw new Error(`La proprietà '${proprietà}' non è definita nello schema`);
        }
        
        // Ottieni il validatore per questa proprietà
        const validatore = schema[proprietà].validatore;
        const tipo = schema[proprietà].tipo;
        
        // Verifica il tipo di dato
        if (typeof valore !== tipo) {
          throw new Error(`La proprietà '${proprietà}' deve essere di tipo '${tipo}'`);
        }
        
        // Esegui la validazione personalizzata se presente
        if (validatore && !validatore(valore)) {
          throw new Error(`Valore '${valore}' non valido per la proprietà '${proprietà}'`);
        }
        
        // Se la validazione passa, imposta il valore
        console.log(`✓ Validazione passata per '${proprietà}': ${valore}`);
        return Reflect.set(oggetto, proprietà, valore, receiver);
      }
    });
  };
}

// Definizione dello schema per un utente
const schemaUtente = {
  nome: {
    tipo: 'string',
    validatore: (valore) => valore.length >= 3
  },
  email: {
    tipo: 'string',
    validatore: (valore) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valore)
  },
  età: {
    tipo: 'number',
    validatore: (valore) => valore >= 18 && valore <= 120
  }
};

// Creazione di un oggetto utente con validazione
const creaUtente = creaOggettoConValidazione(schemaUtente);
const utente = creaUtente({});

console.log('\n--- Impostazione di valori validi ---');
try {
  utente.nome = 'Mario';
  utente.email = 'mario@example.com';
  utente.età = 30;
  
  console.log('Utente creato con successo:', utente);
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

console.log('\n--- Tentativi con valori non validi ---');

// Prova con nome troppo corto
try {
  utente.nome = 'Jo';
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

// Prova con email non valida
try {
  utente.email = 'email-non-valida';
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

// Prova con età fuori range
try {
  utente.età = 15;
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

// Prova con proprietà non definita nello schema
try {
  utente.indirizzo = 'Via Roma, 1';
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

// Prova con tipo di dato errato
try {
  utente.età = '30';
} catch (errore) {
  console.error(`Errore: ${errore.message}`);
}

console.log('\n--- Stato finale dell\'utente ---');
console.log(utente);

/**
 * Questo pattern di validazione è utile per:
 * - Garantire l'integrità dei dati
 * - Implementare contratti di interfaccia
 * - Creare modelli di dati con regole di business
 * - Prevenire errori di runtime dovuti a dati non validi
 */