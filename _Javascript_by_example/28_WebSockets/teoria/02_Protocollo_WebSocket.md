# Il Protocollo WebSocket

## Introduzione al Protocollo

Il protocollo WebSocket è definito nella RFC 6455 e fornisce un meccanismo standardizzato per stabilire connessioni bidirezionali persistenti tra client e server. Questo protocollo opera su TCP e utilizza la porta 80 (per ws://) o 443 (per wss://, la versione sicura).

Il protocollo WebSocket è stato progettato per essere compatibile con l'infrastruttura web esistente, inclusi proxy e firewall, pur offrendo funzionalità che vanno ben oltre quelle del tradizionale HTTP.

## Handshake e Stabilimento della Connessione

L'apertura di una connessione WebSocket inizia con un processo chiamato "handshake", che avviene tramite HTTP. Questo approccio garantisce compatibilità con l'infrastruttura web esistente.

### Processo di Handshake

1. **Richiesta di Upgrade dal Client**:
   Il client invia una normale richiesta HTTP con intestazioni speciali che indicano la volontà di passare al protocollo WebSocket:

   ```
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Origin: http://example.com
   Sec-WebSocket-Protocol: chat, superchat
   Sec-WebSocket-Version: 13
   ```

   Le intestazioni chiave sono:
   - `Upgrade: websocket`: Indica la richiesta di passare al protocollo WebSocket
   - `Connection: Upgrade`: Specifica che la connessione deve essere aggiornata
   - `Sec-WebSocket-Key`: Una chiave casuale codificata in base64 utilizzata per la verifica
   - `Sec-WebSocket-Protocol`: Protocolli applicativi opzionali
   - `Sec-WebSocket-Version`: Versione del protocollo WebSocket (13 è la versione corrente)

2. **Risposta dal Server**:
   Se il server supporta WebSocket e accetta la connessione, risponde con:

   ```
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   Sec-WebSocket-Protocol: chat
   ```

   Il valore `Sec-WebSocket-Accept` è calcolato concatenando il valore di `Sec-WebSocket-Key` con una GUID specifica ("258EAFA5-E914-47DA-95CA-C5AB0DC85B11"), applicando SHA-1 e codificando il risultato in base64.

3. **Connessione Stabilita**:
   Dopo questo scambio, la connessione HTTP viene "aggiornata" a una connessione WebSocket e rimane aperta per la comunicazione bidirezionale.

## Formato dei Frame WebSocket

Una volta stabilita la connessione, i dati vengono trasmessi in unità chiamate "frame". Il protocollo WebSocket definisce diversi tipi di frame per gestire vari tipi di comunicazione.

### Struttura di un Frame

Un frame WebSocket ha la seguente struttura:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

### Componenti Principali

1. **FIN (1 bit)**: Indica se questo è l'ultimo frame di un messaggio (1) o se seguiranno altri frame (0)

2. **RSV1, RSV2, RSV3 (1 bit ciascuno)**: Riservati per estensioni del protocollo, normalmente impostati a 0

3. **Opcode (4 bit)**: Definisce il tipo di frame:
   - 0x0: Frame di continuazione
   - 0x1: Frame di testo (UTF-8)
   - 0x2: Frame binario
   - 0x8: Frame di chiusura
   - 0x9: Frame ping
   - 0xA: Frame pong

4. **MASK (1 bit)**: Indica se i dati sono mascherati (1) o no (0). I client DEVONO mascherare i dati inviati al server.

5. **Payload Length (7 bit + estensioni opzionali)**: Lunghezza dei dati:
   - 0-125: Lunghezza effettiva
   - 126: I successivi 2 byte indicano la lunghezza
   - 127: I successivi 8 byte indicano la lunghezza

6. **Masking Key (32 bit, opzionale)**: Chiave utilizzata per mascherare i dati

7. **Payload Data**: I dati effettivi trasmessi

### Tipi di Frame

1. **Frame di Testo (0x1)**: Contiene dati in formato UTF-8, utilizzati per messaggi di testo

2. **Frame Binari (0x2)**: Contiene dati binari, utilizzati per trasferire file o altri dati non testuali

3. **Frame di Controllo**:
   - **Close (0x8)**: Inizia la chiusura della connessione
   - **Ping (0x9)**: Verifica che la connessione sia ancora attiva
   - **Pong (0xA)**: Risposta a un frame ping

## Sicurezza e WebSockets (WSS)

Come per HTTP e HTTPS, esistono due varianti del protocollo WebSocket:

1. **ws://** - WebSocket non crittografato (porta 80)
2. **wss://** - WebSocket Secure, crittografato tramite TLS (porta 443)

### Importanza di WSS

L'utilizzo di WSS (WebSocket Secure) è fortemente raccomandato per diverse ragioni:

1. **Protezione dei dati**: WSS cripta tutti i dati trasmessi, proteggendoli da intercettazioni

2. **Integrità dei dati**: Previene la manomissione dei dati durante la trasmissione

3. **Autenticazione**: Verifica l'identità del server

4. **Compatibilità con HTTPS**: I siti serviti tramite HTTPS possono connettersi solo a WebSocket sicuri (WSS) a causa delle restrizioni di contenuto misto

5. **Proxy e firewall**: Alcuni proxy e firewall bloccano le connessioni WebSocket non sicure

### Considerazioni di Sicurezza Aggiuntive

1. **Autenticazione**: Il protocollo WebSocket non include meccanismi di autenticazione nativi. È responsabilità dell'applicazione implementare l'autenticazione appropriata.

2. **Autorizzazione**: Verificare che i client abbiano l'autorizzazione per eseguire le azioni richieste.

3. **Convalida dei dati**: Tutti i dati ricevuti tramite WebSocket dovrebbero essere validati per prevenire attacchi come l'iniezione di codice.

4. **Rate limiting**: Implementare limiti di frequenza per prevenire abusi.

5. **Origine (Origin)**: Verificare l'intestazione Origin durante l'handshake per prevenire connessioni non autorizzate.

## Conclusione

Il protocollo WebSocket fornisce un meccanismo robusto e standardizzato per la comunicazione bidirezionale in tempo reale sul web. Comprendere il processo di handshake, la struttura dei frame e le considerazioni di sicurezza è fondamentale per implementare correttamente e in modo sicuro le applicazioni WebSocket.

Nella prossima sezione, esploreremo l'API WebSocket in JavaScript, che fornisce un'interfaccia semplice per utilizzare questa potente tecnologia nelle applicazioni web.