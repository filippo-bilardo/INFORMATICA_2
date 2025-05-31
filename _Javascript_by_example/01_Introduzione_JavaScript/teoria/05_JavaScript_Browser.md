# JavaScript nel Browser

JavaScript è nato come linguaggio di scripting per il web e, nonostante la sua evoluzione in altri ambiti, il browser rimane il suo ambiente nativo principale. In questa guida, esploreremo come JavaScript interagisce con il browser e quali API fondamentali sono disponibili per gli sviluppatori web.

## Il modello di esecuzione di JavaScript nel browser

Quando un browser carica una pagina HTML con script JavaScript, segue questo processo:

1. Analizza il documento HTML
2. Crea il DOM (Document Object Model)
3. Carica gli script esterni
4. Esegue gli script nell'ordine in cui appaiono nel documento
5. Continua a renderizzare la pagina

È importante notare che JavaScript è single-threaded nel browser, il che significa che può eseguire solo un'operazione alla volta. Tuttavia, il browser stesso è multi-threaded, permettendo operazioni asincrone.

## Window: l'oggetto globale

L'oggetto `window` rappresenta la finestra del browser e funge da oggetto globale per JavaScript nel browser:

```javascript
// Questi sono equivalenti nel contesto del browser
window.alert("Ciao");
alert("Ciao");

// Proprietà e metodi utili dell'oggetto window
console.log(window.innerHeight); // Altezza della finestra del browser
console.log(window.innerWidth);  // Larghezza della finestra del browser
window.open("https://example.com"); // Apre una nuova finestra/tab
window.close(); // Chiude la finestra corrente
```

## Document Object Model (DOM)

Il DOM è una rappresentazione ad albero della struttura HTML della pagina, che JavaScript può manipolare:

```javascript
// Selezionare elementi
const titolo = document.getElementById("titolo");
const paragrafi = document.getElementsByTagName("p");
const elementi = document.getElementsByClassName("evidenziato");
const primoLink = document.querySelector("a"); // Selettore CSS
const tuttiILink = document.querySelectorAll("a"); // Tutti gli elementi che corrispondono

// Modificare contenuto
titolo.textContent = "Nuovo titolo"; // Solo testo
titolo.innerHTML = "Nuovo <em>titolo</em>"; // HTML interpretato

// Modificare attributi
const immagine = document.querySelector("img");
immagine.src = "nuova-immagine.jpg";
immagine.alt = "Descrizione immagine";

// Modificare stili
titolo.style.color = "blue";
titolo.style.fontSize = "24px";

// Aggiungere/rimuovere classi CSS
titolo.classList.add("evidenziato");
titolo.classList.remove("nascosto");
titolo.classList.toggle("selezionato"); // Aggiunge se assente, rimuove se presente

// Creare nuovi elementi
const nuovoParagrafo = document.createElement("p");
nuovoParagrafo.textContent = "Questo è un nuovo paragrafo.";
document.body.appendChild(nuovoParagrafo); // Aggiunge alla fine di body

// Rimuovere elementi
const elementoDaRimuovere = document.querySelector(".temporaneo");
elementoDaRimuovere.parentNode.removeChild(elementoDaRimuovere);
// Oppure con il metodo più moderno
elementoDaRimuovere.remove();
```

## Browser Object Model (BOM)

Il BOM fornisce oggetti aggiuntivi forniti dal browser per interagire con la finestra:

```javascript
// Navigazione
console.log(location.href); // URL corrente
location.href = "https://example.com"; // Reindirizza a un nuovo URL

// Informazioni sul browser
console.log(navigator.userAgent); // Informazioni sul browser
console.log(navigator.language); // Lingua preferita dell'utente
console.log(navigator.onLine); // Stato della connessione

// Cronologia di navigazione
history.back(); // Equivalente al pulsante "Indietro"
history.forward(); // Equivalente al pulsante "Avanti"
history.go(-2); // Torna indietro di 2 pagine
```

## Gestione degli eventi

JavaScript può rispondere a eventi generati dall'utente o dal browser:

```javascript
// Metodo moderno: addEventListener
const bottone = document.querySelector("#mioBottone");

bottone.addEventListener("click", function(evento) {
  console.log("Bottone cliccato!");
  console.log(evento); // Oggetto evento con informazioni dettagliate
});

// Eventi comuni:
// click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
// keydown, keyup, keypress
// submit, change, input, focus, blur
// load, unload, resize, scroll

// Rimuovere un listener (deve essere la stessa funzione)
function gestoreClick(e) {
  console.log("Click gestito");
}

bottone.addEventListener("click", gestoreClick);
// Più tardi...
bottone.removeEventListener("click", gestoreClick);
```

## Temporizzazione

JavaScript offre funzioni per eseguire codice dopo un ritardo o a intervalli regolari:

```javascript
// Esegue una volta dopo un ritardo (in millisecondi)
const timerUnico = setTimeout(() => {
  console.log("Questo messaggio appare dopo 2 secondi");
}, 2000);

// Per annullare il timer prima che si attivi
clearTimeout(timerUnico);

// Esegue ripetutamente a intervalli regolari
const timerRipetuto = setInterval(() => {
  console.log("Questo messaggio appare ogni 3 secondi");
}, 3000);

// Per fermare l'esecuzione ripetuta
clearInterval(timerRipetuto);
```

## Storage nel browser

JavaScript può memorizzare dati nel browser:

```javascript
// localStorage: persistente fino a cancellazione esplicita
localStorage.setItem("username", "Mario");
const username = localStorage.getItem("username");
localStorage.removeItem("username");
localStorage.clear(); // Rimuove tutti i dati

// sessionStorage: persistente solo per la sessione corrente
sessionStorage.setItem("temporaneo", "valore");

// Cookies: più versatili ma con capacità limitata
document.cookie = "nome=valore; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
```

## Fetch API per richieste HTTP

La moderna Fetch API permette di effettuare richieste HTTP:

```javascript
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }
    return response.json(); // Parsing della risposta JSON
  })
  .then(data => {
    console.log("Dati ricevuti:", data);
  })
  .catch(error => {
    console.error("Si è verificato un errore:", error);
  });
```

## Sicurezza nel browser

JavaScript nel browser opera all'interno di un "sandbox" di sicurezza con restrizioni importanti:

- **Same-Origin Policy**: Limita l'accesso a risorse provenienti da domini diversi
- **Content Security Policy (CSP)**: Limita le fonti da cui possono essere caricati script e altre risorse
- **Nessun accesso diretto al filesystem**: Per proteggere i dati dell'utente
- **Limitazioni alle API**: Alcune API richiedono l'autorizzazione dell'utente (geolocalizzazione, notifiche, ecc.)

## Conclusione

JavaScript nel browser offre un potente set di API per creare applicazioni web interattive e dinamiche. Comprendere come JavaScript interagisce con il DOM, il BOM e le altre API del browser è fondamentale per lo sviluppo web efficace. Man mano che acquisirai familiarità con queste funzionalità, potrai creare esperienze web sempre più sofisticate e reattive.

[Torna all'indice dell'esercitazione](../README.md) | [Vai al precedente argomento teorico](./04_Strumenti_Debugging.md)