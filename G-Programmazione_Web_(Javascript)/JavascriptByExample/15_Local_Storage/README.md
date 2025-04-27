# Esercitazione 15: Local Storage

## Descrizione

Benvenuti alla quindicesima esercitazione del nostro corso di JavaScript! In questa lezione, esploreremo il Local Storage, una delle API di Web Storage che permette di memorizzare dati nel browser dell'utente in modo persistente.

Il Local Storage è un meccanismo semplice ma potente che consente alle applicazioni web di salvare coppie chiave-valore nel browser dell'utente. A differenza dei cookie, i dati memorizzati nel Local Storage non vengono inviati al server con ogni richiesta HTTP, e possono contenere quantità di dati significativamente maggiori (generalmente fino a 5MB).

## Obiettivi dell'esercitazione

- Comprendere i concetti fondamentali del Local Storage
- Imparare a salvare, recuperare e rimuovere dati
- Gestire dati complessi con JSON
- Comprendere le limitazioni e le considerazioni di sicurezza
- Implementare funzionalità pratiche utilizzando il Local Storage

## Indice degli argomenti teorici

1. [Introduzione al Web Storage](./teoria/01_Introduzione_Web_Storage.md)
2. [Local Storage vs Session Storage](./teoria/02_Local_vs_Session_Storage.md)
3. [Metodi del Local Storage](./teoria/03_Metodi_Local_Storage.md)
4. [Memorizzare oggetti complessi](./teoria/04_Memorizzare_Oggetti.md)
5. [Eventi di storage](./teoria/05_Eventi_Storage.md)
6. [Limitazioni e considerazioni](./teoria/06_Limitazioni_Considerazioni.md)

## Esempi pratici

In questa esercitazione, troverai diversi esempi pratici che ti aiuteranno a comprendere e applicare i concetti del Local Storage:

- `01_basic_storage.html`: Esempio base di utilizzo del Local Storage
- `02_storing_objects.html`: Come memorizzare e recuperare oggetti JSON
- `03_storage_events.html`: Utilizzo degli eventi di storage
- `04_todo_app.html`: Una semplice applicazione Todo che utilizza il Local Storage
- `05_theme_switcher.html`: Un selettore di tema che ricorda la preferenza dell'utente

## Risorse aggiuntive

- [MDN Web Docs: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN Web Docs: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JavaScript.info: LocalStorage, sessionStorage](https://javascript.info/localstorage)

## Esercizi

1. Crea un form che salva i dati inseriti nel Local Storage e li recupera quando la pagina viene ricaricata.
2. Implementa un sistema di preferenze utente (tema scuro/chiaro, dimensione del testo, ecc.) utilizzando il Local Storage.
3. Crea una semplice applicazione di carrello della spesa che memorizza gli articoli nel Local Storage.
4. Implementa un sistema di autenticazione simulato che utilizza il Local Storage per mantenere lo stato di login.
5. Crea un'applicazione di note che permette all'utente di creare, modificare ed eliminare note, salvandole nel Local Storage.

Buon lavoro con il Local Storage!