// Esempio 4: Gestione degli errori nel parsing JSON

// Funzione per il parsing sicuro di JSON
function parseJSONSicuro(stringa) {
  // Verifica che l'input sia una stringa non vuota
  if (typeof stringa !== 'string' || stringa.trim() === '') {
    return { successo: false, errore: 'Input non valido: deve essere una stringa non vuota', dati: null };
  }
  
  try {
    // Tenta il parsing
    const dati = JSON.parse(stringa);
    return { successo: true, errore: null, dati };
  } catch (errore) {
    // Gestisce l'errore di parsing
    return { successo: false, errore: errore.message, dati: null };
  }
}

// Esempi di utilizzo con diversi tipi di errori

// 1. JSON valido
const jsonValido = '{"nome":"Mario","età":30}';
const risultato1 = parseJSONSicuro(jsonValido);
console.log('Esempio 1 - JSON valido:');
console.log(risultato1);

// 2. Errore di sintassi: virgola in eccesso
const jsonSintassiErrata = '{"nome":"Mario","età":30,}';
const risultato2 = parseJSONSicuro(jsonSintassiErrata);
console.log('\nEsempio 2 - Errore di sintassi:');
console.log(risultato2);

// 3. Errore di sintassi: virgolette singole
const jsonVirgoletteSingole = "{'nome':'Mario','età':30}";
const risultato3 = parseJSONSicuro(jsonVirgoletteSingole);
console.log('\nEsempio 3 - Virgolette singole:');
console.log(risultato3);

// 4. Input non valido: undefined
const risultato4 = parseJSONSicuro(undefined);
console.log('\nEsempio 4 - Input undefined:');
console.log(risultato4);

// 5. Input non valido: stringa vuota
const risultato5 = parseJSONSicuro('');
console.log('\nEsempio 5 - Stringa vuota:');
console.log(risultato5);

// 6. Input non valido: numero
const risultato6 = parseJSONSicuro(42);
console.log('\nEsempio 6 - Numero invece di stringa:');
console.log(risultato6);

// Funzione avanzata per la validazione di JSON con schema
function validaJSON(json, schema) {
  // Parsing sicuro del JSON
  const risultatoParsing = parseJSONSicuro(json);
  if (!risultatoParsing.successo) {
    return risultatoParsing;
  }
  
  const dati = risultatoParsing.dati;
  const errori = [];
  
  // Validazione semplificata basata su schema
  for (const campo in schema) {
    // Verifica presenza campi obbligatori
    if (schema[campo].required && (dati[campo] === undefined || dati[campo] === null)) {
      errori.push(`Campo obbligatorio mancante: ${campo}`);
      continue;
    }
    
    // Se il campo è presente, verifica il tipo
    if (dati[campo] !== undefined) {
      const tipoDato = typeof dati[campo];
      const tipoAtteso = schema[campo].tipo;
      
      if (tipoDato !== tipoAtteso) {
        errori.push(`Tipo non valido per ${campo}: atteso ${tipoAtteso}, ricevuto ${tipoDato}`);
      }
      
      // Validazione aggiuntiva per le stringhe
      if (tipoAtteso === 'string' && schema[campo].pattern) {
        const pattern = new RegExp(schema[campo].pattern);
        if (!pattern.test(dati[campo])) {
          errori.push(`Valore non valido per ${campo}: non corrisponde al pattern richiesto`);
        }
      }
      
      // Validazione per i numeri
      if (tipoAtteso === 'number') {
        if (schema[campo].min !== undefined && dati[campo] < schema[campo].min) {
          errori.push(`Valore troppo piccolo per ${campo}: minimo ${schema[campo].min}`);
        }
        if (schema[campo].max !== undefined && dati[campo] > schema[campo].max) {
          errori.push(`Valore troppo grande per ${campo}: massimo ${schema[campo].max}`);
        }
      }
    }
  }
  
  // Risultato della validazione
  if (errori.length > 0) {
    return { successo: false, errore: errori.join('; '), dati: null };
  }
  
  return { successo: true, errore: null, dati };
}

// Esempio di utilizzo della validazione con schema
const schemaUtente = {
  nome: { tipo: 'string', required: true },
  email: { tipo: 'string', required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
  età: { tipo: 'number', required: false, min: 18, max: 120 }
};

// JSON valido secondo lo schema
const utenteValido = '{"nome":"Mario Rossi","email":"mario@example.com","età":35}';
const risultatoValido = validaJSON(utenteValido, schemaUtente);
console.log('\nValidazione con schema - Utente valido:');
console.log(risultatoValido);

// JSON non valido secondo lo schema (email non valida)
const utenteNonValido = '{"nome":"Mario Rossi","email":"mario.example.com","età":35}';
const risultatoNonValido = validaJSON(utenteNonValido, schemaUtente);
console.log('\nValidazione con schema - Email non valida:');
console.log(risultatoNonValido);

// JSON non valido secondo lo schema (età fuori range)
const utenteTroppoGiovane = '{"nome":"Mario Rossi","email":"mario@example.com","età":15}';
const risultatoTroppoGiovane = validaJSON(utenteTroppoGiovane, schemaUtente);
console.log('\nValidazione con schema - Età troppo bassa:');
console.log(risultatoTroppoGiovane);