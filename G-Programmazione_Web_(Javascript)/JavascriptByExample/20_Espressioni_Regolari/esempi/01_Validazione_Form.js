/**
 * Esempio di validazione di form con espressioni regolari
 * 
 * Questo script dimostra come utilizzare le espressioni regolari per validare
 * i campi di input comuni nei form web come email, password e numeri di telefono.
 */

// Validazione Email
function validaEmail(email) {
  // Pattern per email valida
  // Spiega: deve iniziare con caratteri alfanumerici, punti, trattini o underscore
  // seguiti da @ e un dominio valido
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  return emailRegex.test(email);
}

// Validazione Password
function validaPassword(password) {
  // Pattern per password sicura:
  // - Almeno 8 caratteri
  // - Almeno una lettera maiuscola
  // - Almeno una lettera minuscola
  // - Almeno un numero
  // - Almeno un carattere speciale
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  return passwordRegex.test(password);
}

// Validazione Numero di Telefono (formato italiano)
function validaTelefono(telefono) {
  // Pattern per numeri di telefono italiani
  // Accetta formati come: +39 123 456 7890, 0123-456789, 3331234567
  const telefonoRegex = /^(\+39\s?)?((\d{3}[\s-]?){2,3}\d{3}|\d{10})$/;
  
  return telefonoRegex.test(telefono);
}

// Validazione Codice Fiscale italiano
function validaCodiceFiscale(cf) {
  // Pattern per codice fiscale italiano
  const cfRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
  
  return cfRegex.test(cf);
}

// Esempio di utilizzo
const esempiEmail = [
  'utente@dominio.com',       // Valido
  'nome.cognome@azienda.it',  // Valido
  'utente@.com',              // Non valido
  'utente@dominio',           // Non valido
  '@dominio.com'              // Non valido
];

const esempiPassword = [
  'Password1!',               // Valido
  'Abcdef1!',                 // Valido
  'password',                 // Non valido (manca maiuscola, numero e carattere speciale)
  'Password',                 // Non valido (manca numero e carattere speciale)
  'Pass1!'                    // Non valido (meno di 8 caratteri)
];

const esempiTelefono = [
  '+39 123 456 7890',         // Valido
  '0123-456789',              // Valido
  '3331234567',               // Valido
  '123456',                   // Non valido (troppo corto)
  '+39 123 45a 7890'          // Non valido (contiene lettere)
];

// Funzione per testare e mostrare i risultati
function testaValidazione() {
  console.log('=== Test Validazione Email ===');
  esempiEmail.forEach(email => {
    console.log(`${email}: ${validaEmail(email) ? 'Valido' : 'Non valido'}`);
  });
  
  console.log('\n=== Test Validazione Password ===');
  esempiPassword.forEach(password => {
    console.log(`${password}: ${validaPassword(password) ? 'Valido' : 'Non valido'}`);
  });
  
  console.log('\n=== Test Validazione Telefono ===');
  esempiTelefono.forEach(telefono => {
    console.log(`${telefono}: ${validaTelefono(telefono) ? 'Valido' : 'Non valido'}`);
  });
}

// Esegui i test
testaValidazione();

/**
 * Nota: Questi pattern sono esempi e potrebbero richiedere modifiche
 * per adattarsi a requisiti specifici. Ad esempio, la regex per le email
 * è una versione semplificata e potrebbe non catturare tutti i casi validi
 * o rifiutare alcuni indirizzi email validi ma insoliti.
 */