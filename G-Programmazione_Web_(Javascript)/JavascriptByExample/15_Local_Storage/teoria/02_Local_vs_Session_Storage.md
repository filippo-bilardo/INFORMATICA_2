# Local Storage vs Session Storage

## Confronto tra localStorage e sessionStorage

Come abbiamo visto nel capitolo precedente, l'API Web Storage offre due meccanismi di memorizzazione: localStorage e sessionStorage. Sebbene condividano la stessa interfaccia e sintassi, differiscono significativamente nella durata di vita dei dati memorizzati.

## Persistenza dei dati

### localStorage

- **Persistenza**: I dati memorizzati in localStorage persistono indefinitamente, anche dopo la chiusura del browser.
- **Scadenza**: I dati rimangono memorizzati finché non vengono esplicitamente rimossi tramite JavaScript o l'utente non cancella manualmente i dati di navigazione.
- **Ambito**: I dati sono condivisi tra tutte le schede e finestre dello stesso dominio.

### sessionStorage

- **Persistenza**: I dati memorizzati in sessionStorage persistono solo per la durata della sessione della pagina.
- **Scadenza**: I dati vengono automaticamente cancellati quando l'utente chiude la scheda o la finestra del browser.
- **Ambito**: I dati sono limitati alla singola scheda o finestra in cui sono stati creati. Anche altre schede dello stesso dominio non possono accedervi.

## Quando utilizzare localStorage

Il localStorage è ideale per:

- **Preferenze utente persistenti**: temi, impostazioni di visualizzazione, lingua preferita.
- **Dati di autenticazione non sensibili**: token di accesso (con le dovute precauzioni di sicurezza).
- **Stato dell'applicazione**: salvare lo stato di un'applicazione o di un gioco per ripristinarlo in sessioni future.
- **Dati di form**: salvare bozze di contenuti che l'utente sta compilando.
- **Dati di cache**: memorizzare dati che cambiano raramente per ridurre le richieste al server.

## Quando utilizzare sessionStorage

Il sessionStorage è ideale per:

- **Dati temporanei di sessione**: informazioni rilevanti solo per la sessione corrente.
- **Carrelli della spesa temporanei**: articoli aggiunti durante la navigazione ma che non devono persistere tra sessioni.
- **Wizard multi-step**: mantenere i dati tra i passaggi di un processo che deve essere completato in una singola sessione.
- **Stato di navigazione**: memorizzare la posizione corrente in un'applicazione a pagina singola.
- **Prevenzione del ripristino dei form**: evitare che i dati di un form vengano ripristinati quando l'utente torna indietro nella cronologia.

## Sintassi e utilizzo

Entrambi i meccanismi condividono la stessa interfaccia e sintassi:

```javascript
// localStorage
localStorage.setItem('chiave', 'valore');
const valore = localStorage.getItem('chiave');
localStorage.removeItem('chiave');
localStorage.clear();

// sessionStorage
sessionStorage.setItem('chiave', 'valore');
const valore = sessionStorage.getItem('chiave');
sessionStorage.removeItem('chiave');
sessionStorage.clear();
```

## Esempio pratico: confronto diretto

Ecco un esempio che mostra la differenza di comportamento tra localStorage e sessionStorage:

```javascript
// Memorizza dati in entrambi i meccanismi
localStorage.setItem('persistente', 'Questo dato rimarrà anche dopo la chiusura del browser');
sessionStorage.setItem('temporaneo', 'Questo dato scomparirà alla chiusura della scheda');

// Funzione per verificare i dati memorizzati
function verificaDati() {
  console.log('localStorage:', localStorage.getItem('persistente'));
  console.log('sessionStorage:', sessionStorage.getItem('temporaneo'));
}

// Verifica immediata
verificaDati();

// Istruzioni per l'utente
console.log('Ora prova a:');
console.log('1. Chiudere questa scheda e riaprirla');
console.log('2. Eseguire nuovamente verificaDati()');
console.log('Noterai che il dato in localStorage è ancora presente, mentre quello in sessionStorage è scomparso');
```

## Considerazioni sulla sicurezza

È importante notare che né localStorage né sessionStorage sono adatti per memorizzare dati sensibili come password o informazioni personali identificabili. Entrambi i meccanismi memorizzano i dati in chiaro e sono vulnerabili a attacchi XSS (Cross-Site Scripting).

Per dati sensibili, è sempre consigliabile utilizzare meccanismi di memorizzazione più sicuri come i cookie HttpOnly con flag Secure, o affidarsi a soluzioni lato server.

Nel prossimo capitolo, esploreremo in dettaglio i metodi disponibili per interagire con il localStorage e come utilizzarli efficacemente nelle applicazioni web.