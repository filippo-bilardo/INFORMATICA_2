### 1.3 Come funziona: esecuzione lato client e lato server

JavaScript è un linguaggio versatile che può essere eseguito sia **lato client** (nel browser dell'utente) sia **lato server** (su un server remoto). Questo approccio ha trasformato JavaScript in un linguaggio di programmazione full-stack, utilizzato per lo sviluppo completo di applicazioni web. Vediamo in dettaglio come funziona l'esecuzione lato client e lato server di JavaScript e quali sono i loro vantaggi e utilizzi.

#### JavaScript Lato Client

Quando JavaScript è eseguito lato client, viene eseguito direttamente nel **browser web dell'utente**. Questo approccio sfrutta la potenza di calcolo del dispositivo dell'utente e permette una **navigazione dinamica** e **interattiva** senza richiedere un continuo invio di richieste al server.

**Processo di esecuzione lato client:**
1. Il browser carica la pagina web dal server, includendo il codice HTML, CSS e JavaScript.
2. Quando il codice JavaScript viene caricato, il **motore JavaScript** del browser (come V8 per Chrome, SpiderMonkey per Firefox) lo interpreta ed esegue.
3. JavaScript può quindi manipolare l'HTML e il CSS della pagina utilizzando il **DOM** (Document Object Model), rispondendo alle azioni dell'utente (click, scroll, input) e aggiornando il contenuto della pagina in tempo reale.

**Esempi di uso di JavaScript lato client:**
- **Validazione dei moduli**: Verifica dell’input dell’utente (ad esempio, se un campo email è valido) prima di inviare i dati al server.
- **Aggiornamento dinamico della pagina**: Cambiare il contenuto della pagina senza ricaricarla, come nel caso di AJAX.
- **Animazioni e transizioni**: Effetti visivi, animazioni e transizioni per migliorare l’esperienza utente.
- **Interazione con API del browser**: Utilizzo di API come `Geolocation`, `LocalStorage`, `WebRTC`, che permettono di accedere a funzionalità avanzate del browser.

**Vantaggi di JavaScript lato client:**
- **Velocità**: L'elaborazione avviene sul dispositivo dell'utente, riducendo il carico sul server.
- **Interattività**: Possibilità di reagire immediatamente alle azioni dell'utente, migliorando l’esperienza di navigazione.
- **Riduzione delle richieste al server**: Le modifiche possono avvenire direttamente nel browser, riducendo la necessità di aggiornamenti da parte del server.

#### JavaScript Lato Server con Node.js

Con l'introduzione di **Node.js** nel 2009, JavaScript è stato esteso al lato server, ovvero alla parte che gestisce le richieste e le risposte del sito web o applicazione web. Node.js è costruito sul motore V8 di Google e permette a JavaScript di eseguire operazioni server-side, come l’accesso al file system, la gestione delle connessioni di rete e la comunicazione con i database.

**Processo di esecuzione lato server:**
1. Il server Node.js riceve una richiesta HTTP da parte del client (ad esempio, quando l'utente visita una pagina web).
2. Node.js elabora la richiesta, eseguendo il codice JavaScript lato server.
3. Node.js può accedere al database, effettuare calcoli, leggere o scrivere file, o eseguire altre operazioni server-side.
4. Una volta completata l'elaborazione, Node.js invia una risposta al client, che può essere una pagina HTML, un JSON (in caso di API) o altri dati.

**Esempi di uso di JavaScript lato server:**
- **Gestione di API RESTful**: Creazione di API per fornire dati a un'applicazione front-end o mobile.
- **Applicazioni in tempo reale**: Chat in tempo reale, notifiche, e altre funzionalità interattive utilizzando WebSocket.
- **Accesso al database**: Esecuzione di query e gestione di dati con database relazionali (come MySQL) o NoSQL (come MongoDB).
- **Elaborazione dati**: Aggregazione e manipolazione di dati provenienti da diverse fonti prima di inviarli al client.

**Vantaggi di JavaScript lato server:**
- **JavaScript full-stack**: Gli sviluppatori possono utilizzare lo stesso linguaggio per il frontend e il backend, semplificando lo sviluppo e la manutenzione del codice.
- **Asincronia**: Node.js è ottimizzato per operazioni I/O asincrone, rendendolo altamente efficiente per gestire applicazioni che richiedono molte connessioni simultanee.
- **Ecosistema vasto**: Grazie a npm (Node Package Manager), esiste una libreria per quasi ogni esigenza, riducendo i tempi di sviluppo.

#### Differenze tra Esecuzione Lato Client e Lato Server

| Caratteristica                    | Lato Client                             | Lato Server                              |
|-----------------------------------|-----------------------------------------|------------------------------------------|
| **Esecuzione**                    | Nel browser dell'utente                 | Sul server remoto                        |
| **Responsabilità**                | Interattività, gestione dell’interfaccia| Elaborazione dati, accesso a database    |
| **Accesso al Sistema**            | Limitato (solo API browser)             | Completo (file system, rete, database)   |
| **Tempo di Risposta**             | Rapido (minore latenza)                 | Potrebbe essere più lento (dipende dalla rete) |
| **Sicurezza**                     | Accesso limitato, visibile all'utente   | Più sicuro (codice non visibile al client) |

#### Esempio di Interazione Client-Server

Immaginiamo un’applicazione web per cercare libri. Il client invia una richiesta al server con i termini di ricerca, e il server risponde con i risultati:

1. **Richiesta Client**: L'utente inserisce il titolo di un libro in un modulo e clicca su "Cerca". Il codice JavaScript lato client invia i termini di ricerca al server tramite una richiesta HTTP.
2. **Elaborazione Server**: Node.js riceve la richiesta, esegue una query sul database e ottiene i dati dei libri corrispondenti.
3. **Risposta al Client**: Il server invia i risultati in formato JSON al client, dove JavaScript li visualizza aggiornando dinamicamente la pagina senza ricaricarla completamente.

#### Conclusione

L'esecuzione di JavaScript lato client e lato server offre agli sviluppatori la possibilità di creare applicazioni web potenti, interattive e scalabili. La versatilità di JavaScript, combinata con la possibilità di eseguirlo su entrambi i lati, rende possibile il cosiddetto sviluppo **full-stack JavaScript**, consentendo la creazione di esperienze utente avanzate che possono sfruttare la potenza sia del client sia del server.

--- 
[INDICE](README.md) 