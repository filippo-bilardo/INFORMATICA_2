/**
 * Esempio di parsing di testo con espressioni regolari
 * 
 * Questo script dimostra come utilizzare le espressioni regolari per estrarre
 * informazioni strutturate da testo non strutturato.
 */

// Esempio 1: Estrazione di date da un testo
function estraiDate(testo) {
  // Pattern per date in formato italiano (GG/MM/AAAA)
  const patternData = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g;
  
  return testo.match(patternData) || [];
}

// Esempio 2: Estrazione di indirizzi email
function estraiEmail(testo) {
  const patternEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
  
  return testo.match(patternEmail) || [];
}

// Esempio 3: Estrazione di URL
function estraiURL(testo) {
  const patternURL = /(https?:\/\/[^\s]+)/g;
  
  return testo.match(patternURL) || [];
}

// Esempio 4: Estrazione di hashtag (stile social media)
function estraiHashtag(testo) {
  const patternHashtag = /#[\w\d]+/g;
  
  return testo.match(patternHashtag) || [];
}

// Esempio 5: Parsing di un log di server
function analizzaLogServer(logLine) {
  // Pattern per log in formato: [DATA] [LIVELLO] [SERVIZIO] - Messaggio
  const patternLog = /\[(.*?)\]\s*\[(.*?)\]\s*\[(.*?)\]\s*-\s*(.*)/;
  
  const match = logLine.match(patternLog);
  if (match) {
    return {
      data: match[1],
      livello: match[2],
      servizio: match[3],
      messaggio: match[4]
    };
  }
  
  return null;
}

// Esempio 6: Estrazione di informazioni strutturate da un testo
function estraiInformazioniPersona(testo) {
  // Estrai nome e cognome (formato: Nome: [nome], Cognome: [cognome])
  const nomeMatch = testo.match(/Nome:\s*([^,\n]+)/);
  const cognomeMatch = testo.match(/Cognome:\s*([^,\n]+)/);
  
  // Estrai età (formato: Età: [numero] anni)
  const etaMatch = testo.match(/Età:\s*(\d+)/);
  
  // Estrai email
  const emailMatch = testo.match(/Email:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/);
  
  return {
    nome: nomeMatch ? nomeMatch[1].trim() : null,
    cognome: cognomeMatch ? cognomeMatch[1].trim() : null,
    eta: etaMatch ? parseInt(etaMatch[1]) : null,
    email: emailMatch ? emailMatch[1] : null
  };
}

// Test dei vari parser
const testoEsempio = `
Questo è un testo di esempio scritto il 15/04/2023 e aggiornato il 20-05-2023.
Contiene informazioni di contatto come mario.rossi@example.com e supporto@azienda.it.
Puoi visitare i nostri siti web: https://www.example.com e http://blog.example.org.
Seguici sui social con gli hashtag #javascript #regex #programmazione.

[2023-04-15 10:30:45] [ERROR] [AuthService] - Tentativo di accesso fallito per l'utente admin.
[2023-04-15 10:35:12] [INFO] [UserService] - Utente mario.rossi ha effettuato l'accesso.

Scheda Utente:
Nome: Mario, Cognome: Rossi, Età: 35 anni, Email: mario.rossi@example.com
`;

console.log('=== Date trovate ===');
console.log(estraiDate(testoEsempio));

console.log('\n=== Email trovate ===');
console.log(estraiEmail(testoEsempio));

console.log('\n=== URL trovati ===');
console.log(estraiURL(testoEsempio));

console.log('\n=== Hashtag trovati ===');
console.log(estraiHashtag(testoEsempio));

console.log('\n=== Analisi log server ===');
const logLines = testoEsempio.split('\n').filter(line => line.match(/^\[.*\]/));
logLines.forEach(line => {
  const logInfo = analizzaLogServer(line);
  if (logInfo) {
    console.log(logInfo);
  }
});

console.log('\n=== Informazioni persona ===');
console.log(estraiInformazioniPersona(testoEsempio));

/**
 * Nota: Le espressioni regolari utilizzate in questi esempi sono semplificate
 * per scopi didattici. In un'applicazione reale, potresti aver bisogno di pattern
 * più complessi e robusti per gestire tutti i casi possibili.
 */