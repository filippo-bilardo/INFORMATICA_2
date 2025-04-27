# Introduzione al Web Storage

## Cos'è il Web Storage?

Il Web Storage è un'API JavaScript che consente alle applicazioni web di memorizzare dati nel browser dell'utente. Introdotto con HTML5, il Web Storage offre un meccanismo più intuitivo e potente rispetto ai cookie per salvare informazioni lato client.

L'API Web Storage include due meccanismi di memorizzazione:

1. **localStorage**: memorizza i dati senza data di scadenza. I dati persistono anche dopo la chiusura del browser e restano disponibili finché non vengono esplicitamente rimossi.

2. **sessionStorage**: memorizza i dati per una singola sessione. I dati vengono cancellati quando l'utente chiude la scheda o la finestra del browser.

## Perché utilizzare il Web Storage?

Rispetto ai cookie, il Web Storage offre diversi vantaggi:

- **Maggiore capacità di memorizzazione**: mentre i cookie sono limitati a circa 4KB di dati, il Web Storage può generalmente memorizzare fino a 5MB per dominio (la quantità esatta varia a seconda del browser).

- **Migliori prestazioni**: i dati memorizzati nel Web Storage non vengono inviati al server con ogni richiesta HTTP, riducendo il traffico di rete.

- **API più semplice**: il Web Storage offre un'interfaccia più intuitiva e facile da usare rispetto ai cookie.

- **Maggiore sicurezza**: i dati nel Web Storage sono accessibili solo dal dominio che li ha creati, offrendo una protezione contro attacchi XSS (Cross-Site Scripting).

## Browser supportati

L'API Web Storage è supportata da tutti i browser moderni, inclusi:

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Internet Explorer 8+
- Opera 10.5+
- Edge

## Quando utilizzare il Web Storage

Il Web Storage è particolarmente utile per:

- Memorizzare preferenze utente (tema, lingua, impostazioni di visualizzazione)
- Salvare lo stato di un'applicazione o di un gioco
- Memorizzare dati di form per evitare la perdita in caso di ricarica della pagina
- Implementare funzionalità offline di base
- Memorizzare dati di sessione (carrello della spesa, stato di login temporaneo)

## Limitazioni del Web Storage

Nonostante i suoi vantaggi, il Web Storage presenta alcune limitazioni:

- È limitato a stringhe di testo (per memorizzare oggetti complessi è necessario utilizzare JSON)
- Non è adatto per grandi quantità di dati strutturati (per questo scopo è preferibile IndexedDB)
- È sincrono, quindi operazioni su grandi quantità di dati possono bloccare il thread principale
- Non è accessibile dai Web Workers
- Non offre funzionalità di query o indicizzazione

## Esempio base

```javascript
// Salvare un dato nel localStorage
localStorage.setItem('username', 'Mario');

// Recuperare un dato dal localStorage
const username = localStorage.getItem('username');
console.log(username); // Output: Mario

// Rimuovere un dato dal localStorage
localStorage.removeItem('username');

// Cancellare tutti i dati nel localStorage
localStorage.clear();
```

Nel prossimo capitolo, esploreremo le differenze tra localStorage e sessionStorage e quando è più appropriato utilizzare l'uno o l'altro.