/**
 * Esempio di sostituzione di stringhe con espressioni regolari
 * 
 * Questo script dimostra come utilizzare le espressioni regolari per sostituire
 * parti di testo in modo avanzato utilizzando pattern e riferimenti.
 */

// Esempio 1: Sostituzione semplice
function sostituisciParola(testo, parolaDaCercare, parolaSostitutiva) {
  // Crea un pattern che cerca la parola con confini di parola (\b)
  // per evitare sostituzioni parziali
  const pattern = new RegExp(`\\b${parolaDaCercare}\\b`, 'gi');
  
  return testo.replace(pattern, parolaSostitutiva);
}

// Esempio 2: Formattazione di numeri di telefono
function formattaTelefono(numero) {
  // Rimuove tutti i caratteri non numerici e formatta il numero
  // in formato italiano: +39 XXX XXX XXXX
  const soloNumeri = numero.replace(/\D/g, '');
  
  if (soloNumeri.length === 10) {
    return soloNumeri.replace(/(\d{3})(\d{3})(\d{4})/, '+39 $1 $2 $3');
  } else if (soloNumeri.length === 11 && soloNumeri.startsWith('3')) {
    return soloNumeri.replace(/(\d{3})(\d{4})(\d{4})/, '+39 $1 $2 $3');
  }
  
  return numero; // Ritorna l'originale se non corrisponde ai formati previsti
}

// Esempio 3: Conversione da camelCase a snake_case
function camelCaseToSnakeCase(testo) {
  return testo.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

// Esempio 4: Conversione da snake_case a camelCase
function snakeCaseToCamelCase(testo) {
  return testo.replace(/_([a-z])/g, (match, gruppo) => gruppo.toUpperCase());
}

// Esempio 5: Censura di informazioni sensibili
function censuraInformazioni(testo) {
  // Censura numeri di carta di credito (formato semplificato)
  let testoCensurato = testo.replace(/(\d{4})[\s-]?(\d{4})[\s-]?(\d{4})[\s-]?(\d{4})/, '$1-XXXX-XXXX-$4');
  
  // Censura indirizzi email
  testoCensurato = testoCensurato.replace(/([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g, 
                                         (match, username, dominio) => {
    // Mostra solo la prima lettera dell'username e il dominio
    return `${username.charAt(0)}${'*'.repeat(username.length - 1)}@${dominio}`;
  });
  
  return testoCensurato;
}

// Esempio 6: Sostituzione con funzione di callback
function evidenziaParoleChiave(testo, paroleChiave) {
  const pattern = new RegExp(`\\b(${paroleChiave.join('|')})\\b`, 'gi');
  
  return testo.replace(pattern, (match) => `**${match}**`);
}

// Esempio 7: Rimozione di tag HTML
function rimuoviTagHTML(testo) {
  return testo.replace(/<[^>]*>/g, '');
}

// Esempio 8: Formattazione di date
function formattaData(data) {
  // Converte date in formato MM/DD/YYYY a DD-MM-YYYY
  return data.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$2-$1-$3');
}

// Test delle funzioni di sostituzione
const testoOriginale = `
JavaScript è un linguaggio di programmazione molto potente.
Il mio numero di telefono è 3331234567 e la mia email è mario.rossi@example.com.
La mia carta di credito è 1234 5678 9012 3456.
Ho acquistato il prodotto il 05/20/2023.

<div>Questo è un esempio di <strong>HTML</strong> che vogliamo rimuovere.</div>

Alcune variabili in camelCase: nomeUtente, indirizzoEmail, codiceFiscale.
Alcune variabili in snake_case: user_name, email_address, tax_code.
`;

console.log('=== Sostituzione Semplice ===');
console.log(sostituisciParola(testoOriginale, 'javascript', 'TypeScript'));

console.log('\n=== Formattazione Telefono ===');
console.log(formattaTelefono('3331234567'));
console.log(formattaTelefono('333-123-4567'));

console.log('\n=== Conversione Case ===');
console.log(`camelCase -> snake_case: ${camelCaseToSnakeCase('nomeUtente')}`);
console.log(`snake_case -> camelCase: ${snakeCaseToCamelCase('user_name')}`);

console.log('\n=== Censura Informazioni ===');
console.log(censuraInformazioni(testoOriginale));

console.log('\n=== Evidenzia Parole Chiave ===');
console.log(evidenziaParoleChiave(testoOriginale, ['javascript', 'email', 'html']));

console.log('\n=== Rimozione Tag HTML ===');
console.log(rimuoviTagHTML(testoOriginale));

console.log('\n=== Formattazione Date ===');
console.log(formattaData('05/20/2023'));

/**
 * Nota: Le espressioni regolari per la sostituzione possono diventare molto
 * complesse. In scenari reali, potrebbe essere necessario considerare più
 * casi limite e ottimizzare i pattern per prestazioni migliori.
 */