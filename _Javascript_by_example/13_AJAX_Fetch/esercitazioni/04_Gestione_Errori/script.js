// Seleziona gli elementi del DOM
const fetch404Button = document.getElementById('fetch-404');
const fetchNetworkErrorButton = document.getElementById('fetch-network-error');
const fetchSuccessButton = document.getElementById('fetch-success'); // Pulsante per test successo
const messageArea = document.getElementById('message-area');

// Aggiungi event listener ai pulsanti
fetch404Button.addEventListener('click', () => {
    makeFetchRequest('https://jsonplaceholder.typicode.com/posts/9999'); // ID probabilmente inesistente
});

fetchNetworkErrorButton.addEventListener('click', () => {
    makeFetchRequest('https://indirizzo-inesistente-per-test.xyz'); // Dominio non valido
});

fetchSuccessButton.addEventListener('click', () => {
    makeFetchRequest('https://jsonplaceholder.typicode.com/posts/1'); // URL valido
});

// Funzione generica per effettuare richieste Fetch e gestire errori
function makeFetchRequest(url) {
    // Pulisci l'area messaggi e mostra indicatore di caricamento
    messageArea.textContent = 'Richiesta in corso...';
    messageArea.className = 'loading'; // Applica stile per caricamento

    fetch(url)
        .then(response => {
            console.log('Risposta ricevuta:', response);
            // Controlla se la risposta HTTP è OK (status 200-299)
            if (!response.ok) {
                // Se non è OK, lancia un errore specifico per errori HTTP
                throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
            }
            // Se OK, prova a leggere il corpo come testo (o JSON se appropriato)
            // Per questo esercizio, il testo è sufficiente per il caso di successo
            return response.text(); 
        })
        .then(data => {
            // Questo blocco viene eseguito solo se la richiesta ha avuto successo (response.ok era true)
            console.log('Dati ricevuti (testo):', data.substring(0, 100) + '...'); // Logga solo una parte
            displayMessage('Richiesta completata con successo!', 'success');
        })
        .catch(error => {
            // Cattura sia errori di rete (fetch fallito) sia errori HTTP (lanciati manualmente)
            console.error('Errore durante la richiesta fetch:', error);

            // Mostra un messaggio di errore all'utente
            let userMessage = '';
            if (error.message.startsWith('Errore HTTP:')) {
                // Errore HTTP specifico
                userMessage = `Errore dal server: ${error.message}`;
            } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
                // Errore di rete comune
                userMessage = 'Errore di rete: Impossibile raggiungere il server. Controlla la connessione o l\'URL.';
            } else {
                // Altri errori (es. problemi di parsing se usassimo .json())
                userMessage = `Si è verificato un errore: ${error.message}`;
            }
            displayMessage(userMessage, 'error');
        })
        .finally(() => {
            // Questo blocco viene eseguito sempre, sia in caso di successo che di errore
            console.log('Richiesta fetch terminata.');
            // Rimuovi il messaggio di caricamento se è ancora presente
            if (messageArea.textContent === 'Richiesta in corso...') {
                messageArea.textContent = ''; // Pulisci se non è stato sovrascritto da successo/errore
                messageArea.className = '';
            }
        });
}

// Funzione helper per visualizzare messaggi nell'area dedicata
function displayMessage(message, type) {
    messageArea.textContent = message;
    messageArea.className = type; // Applica classe 'success', 'error', o 'loading'
}