# Guida 5: Comunicazione Wireless (Bluetooth & Wi-Fi)

Il brick EV3 è dotato di funzionalità di comunicazione wireless integrate, principalmente Bluetooth, e può essere esteso con un dongle Wi-Fi USB per la connettività di rete. Queste capacità aprono un mondo di possibilità per il controllo remoto, l'interazione con altri dispositivi e l'accesso a risorse online.

## Bluetooth

Il Bluetooth è la forma di comunicazione wireless predefinita e più comunemente usata con l'EV3.

### Caratteristiche Principali:
*   **Portata**: Tipicamente fino a 10-15 metri, a seconda dell'ambiente.
*   **Connessioni**: Può connettersi ad altri brick EV3, computer, smartphone e tablet.
*   **Utilizzi Comuni**:
    *   Controllo remoto del robot da un'app mobile o da un altro EV3.
    *   Scambio di dati tra robot (messaggistica).
    *   Programmazione e download di programmi in modalità wireless da un computer.
    *   Streaming di dati dai sensori a un dispositivo esterno.

### Configurazione sul Brick EV3:
1.  Accedere al menu "Settings" (Impostazioni) sul display del brick.
2.  Navigare fino alla sezione "Bluetooth".
3.  Assicurarsi che il Bluetooth sia "On" (Acceso) e "Visible" (Visibile) se si desidera che altri dispositivi lo scoprano.
4.  È possibile associare (pair) dispositivi da questo menu.

### Utilizzo in MakeCode (JavaScript) - Messaggistica Bluetooth

MakeCode supporta la messaggistica Bluetooth tra brick EV3. Questo permette ai robot di coordinare azioni o scambiarsi informazioni.

```javascript
// Invia un messaggio numerico sul canale 1
bluetooth.sendMessageNumber(1, 42);

// Invia un messaggio testuale sul canale "comando"
bluetooth.sendMessageString("comando", "avanti");

// Invia una coppia nome-valore (numero) sul canale 3
bluetooth.sendMessageNameValue("sensore", 123, 3);

// Quando si riceve un messaggio numerico sul canale 1
bluetooth.onMessageReceivedNumber(1, function (numero) {
    brick.showString("Num: " + numero, 1);
});

// Quando si riceve un messaggio testuale sul canale "comando"
bluetooth.onMessageReceivedString("comando", function (testo) {
    if (testo == "avanti") {
        // Esegui azione
    }
});

// Quando si riceve una coppia nome-valore sul canale 3
bluetooth.onMessageReceivedNameValue("sensore", 3, function (nome, valore) {
    brick.showString(nome + ": " + valore, 2);
});
```
*   **Canali**: I messaggi vengono inviati e ricevuti su "canali" specifici (numerici o stringhe) per organizzarli.
*   **Tipi di Dati**: Si possono inviare numeri, stringhe o coppie nome-valore.

## Wi-Fi (con Dongle USB)

Per utilizzare il Wi-Fi, è necessario un dongle Wi-Fi USB compatibile (ad esempio, il NETGEAR N150 WNA1100).

### Caratteristiche Principali:
*   **Portata**: Superiore al Bluetooth, dipende dalla rete Wi-Fi.
*   **Connessioni**: Permette al brick EV3 di connettersi a una rete locale (LAN) e, potenzialmente, a Internet.
*   **Utilizzi Comuni**:
    *   Accesso a servizi web (API, dati online).
    *   Controllo remoto su una rete più ampia.
    *   Aggiornamenti firmware (se supportato direttamente).
    *   Comunicazione con sistemi domotici o IoT.

### Configurazione sul Brick EV3:
1.  Inserire il dongle Wi-Fi in una porta USB del brick.
2.  Accedere al menu "Settings" (Impostazioni) e navigare su "Wi-Fi".
3.  Attivare il Wi-Fi e cercare le reti disponibili.
4.  Selezionare la rete desiderata e inserire la password, se richiesta.

### Utilizzo in MakeCode (JavaScript)

Il supporto diretto per funzionalità di rete Wi-Fi complesse (come richieste HTTP) in MakeCode per EV3 potrebbe essere limitato o richiedere estensioni specifiche. La funzionalità principale fornita dal firmware EV3 tramite Wi-Fi è spesso legata alla connessione a software di programmazione o al controllo remoto tramite app specifiche LEGO.

Per interazioni di rete avanzate, si potrebbe dover ricorrere a sistemi operativi alternativi per EV3 (come ev3dev) che offrono un accesso più completo alle capacità di rete del Linux sottostante.

## Considerazioni sulla Sicurezza

*   **Bluetooth**:
    *   Utilizzare l'associazione (pairing) con PIN per evitare connessioni non autorizzate.
    *   Rendere il brick non visibile ("Visible: Off") quando non si cercano attivamente nuove connessioni.
*   **Wi-Fi**:
    *   Connettersi solo a reti Wi-Fi fidate e protette da password (WPA2/WPA3).
    *   Essere consapevoli dei rischi se il brick è esposto a Internet.

## Scegliere tra Bluetooth e Wi-Fi

*   **Bluetooth**: Ideale per comunicazioni a corto raggio, semplici, tra EV3 o con dispositivi mobili/PC vicini, e per un basso consumo energetico.
*   **Wi-Fi**: Necessario per connettività di rete più ampia, accesso a Internet, o quando la portata del Bluetooth non è sufficiente. Richiede un dongle aggiuntivo e consuma più energia.

La comunicazione wireless espande notevolmente le capacità del robot EV3, permettendo interazioni più complesse e autonome.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 08](../README.md)
[Torna alla Home del Corso](../../../README.md)