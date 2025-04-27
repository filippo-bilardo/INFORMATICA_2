# Esercitazione 28: WebSockets

## Descrizione

Benvenuti alla ventottesima esercitazione del nostro corso di JavaScript! In questa lezione, esploreremo i WebSockets, una tecnologia che permette la comunicazione bidirezionale in tempo reale tra client e server.

I WebSockets rappresentano un'evoluzione significativa rispetto alle tradizionali richieste HTTP, consentendo una connessione persistente che facilita lo scambio di dati in tempo reale. Questa tecnologia è fondamentale per applicazioni moderne come chat, giochi multiplayer, dashboard di dati live e qualsiasi scenario che richieda aggiornamenti istantanei.

In questa esercitazione, impareremo come stabilire connessioni WebSocket, gestire eventi di comunicazione, implementare pattern di scambio messaggi e creare applicazioni interattive in tempo reale.

## Indice degli Argomenti

1. [Introduzione ai WebSockets](./teoria/01_Introduzione_WebSockets.md)
   - Cosa sono i WebSockets
   - Differenze tra HTTP e WebSockets
   - Vantaggi e casi d'uso

2. [Il Protocollo WebSocket](./teoria/02_Protocollo_WebSocket.md)
   - Handshake e stabilimento della connessione
   - Formato dei frame WebSocket
   - Sicurezza e WebSockets (WSS)

3. [L'API WebSocket in JavaScript](./teoria/03_API_WebSocket.md)
   - Creazione di una connessione WebSocket
   - Eventi principali (open, message, error, close)
   - Invio e ricezione di messaggi

4. [Pattern di Comunicazione](./teoria/04_Pattern_Comunicazione.md)
   - Publish/Subscribe
   - Request/Response
   - Broadcast e messaggi mirati
   - Heartbeat e riconnessione automatica

5. [Implementazioni Server-Side](./teoria/05_Server_WebSocket.md)
   - Node.js con ws o Socket.io
   - Implementazioni in altri linguaggi
   - Scalabilità e considerazioni di performance

6. [Casi d'Uso Reali](./teoria/06_Casi_Uso.md)
   - Chat in tempo reale
   - Dashboard di dati live
   - Giochi multiplayer
   - Notifiche push

## Esempi Pratici

1. **Chat in Tempo Reale**: Implementazione di una semplice chat room utilizzando WebSockets.
   - [Codice Client](./esempio1.html)
   - [Codice Server](./esempio1.js)

2. **Dashboard Dati Live**: Creazione di un pannello che visualizza dati aggiornati in tempo reale.
   - [Codice Client](./esempio2.html)
   - [Codice Server](./esempio2.js)

3. **Notifiche in Tempo Reale**: Sistema di notifiche push per aggiornamenti istantanei.
   - [Codice Client](./esempio3.html)
   - [Codice Server](./esempio3.js)

4. **Gioco Multiplayer Semplice**: Un gioco basico che dimostra la sincronizzazione in tempo reale.
   - [Codice Client](./esempio4.html)
   - [Codice Server](./esempio4.js)

5. **WebSocket con Autenticazione**: Implementazione di WebSockets con sistema di autenticazione.
   - [Codice Client](./esempio5.html)
   - [Codice Server](./esempio5.js)

## Esercizi

1. Modifica l'applicazione di chat per supportare stanze di chat multiple.
2. Implementa un sistema di typing indicator ("X sta scrivendo...") nella chat.
3. Crea una dashboard che visualizzi dati simulati di borsa o meteo in tempo reale.
4. Sviluppa un semplice gioco multiplayer (es. tic-tac-toe) utilizzando WebSockets.
5. Implementa un sistema di riconnessione automatica in caso di perdita della connessione.

## Risorse Aggiuntive

- [MDN Web Docs: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Socket.io Documentation](https://socket.io/docs/v4)
- [WebSocket Protocol RFC 6455](https://tools.ietf.org/html/rfc6455)

---

Prosegui con la lettura delle guide teoriche per approfondire ogni aspetto dei WebSockets e sperimenta con gli esempi pratici per consolidare le tue conoscenze.