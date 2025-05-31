// Seleziona gli elementi del DOM
const newPostForm = document.getElementById('new-post-form');
const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
const userIdInput = document.getElementById('user-id');
const responseMessageContainer = document.getElementById('response-message');
const submitButton = document.getElementById('submit-button');

// Aggiungi l'event listener al form per l'evento 'submit'
newPostForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    // Previeni il comportamento predefinito del form (ricaricamento pagina)
    event.preventDefault();

    // Disabilita il pulsante e mostra messaggio di caricamento (opzionale)
    submitButton.disabled = true;
    responseMessageContainer.textContent = 'Invio in corso...';
    responseMessageContainer.className = ''; // Rimuovi classi precedenti

    // Recupera i valori dal form
    const title = postTitleInput.value.trim();
    const body = postBodyInput.value.trim();
    const userId = parseInt(userIdInput.value, 10);

    // Validazione base (opzionale ma consigliata)
    if (!title || !body || isNaN(userId) || userId < 1) {
        displayMessage('Per favore, compila tutti i campi correttamente.', 'error');
        submitButton.disabled = false;
        return;
    }

    // Crea l'oggetto dati da inviare
    const postData = {
        title: title,
        body: body,
        userId: userId,
    };

    // Effettua la richiesta POST
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(postData), // Converte l'oggetto in stringa JSON
    })
    .then(response => {
        console.log('Risposta ricevuta:', response);
        // JSONPlaceholder risponde con 201 Created per POST riusciti
        if (!response.ok || response.status !== 201) {
            throw new Error(`Errore HTTP! Stato: ${response.status} ${response.statusText}`);
        }
        return response.json(); // Leggi il corpo della risposta (il post creato)
    })
    .then(createdPost => {
        console.log('Post creato:', createdPost);
        // Mostra messaggio di successo
        displayMessage(`Post creato con successo! ID: ${createdPost.id}`, 'success');
        // Pulisci il form (opzionale)
        newPostForm.reset();
    })
    .catch(error => {
        console.error('Errore durante l\'invio del post:', error);
        // Mostra messaggio di errore
        displayMessage(`Errore nell'invio del post: ${error.message}`, 'error');
    })
    .finally(() => {
        // Riabilita il pulsante in ogni caso (successo o errore)
        submitButton.disabled = false;
        // Rimuovi il messaggio di caricamento se non è stato sovrascritto
        if (responseMessageContainer.textContent === 'Invio in corso...') {
             responseMessageContainer.textContent = '';
        }
    });
}

// Funzione helper per visualizzare messaggi
function displayMessage(message, type) {
    responseMessageContainer.textContent = message;
    responseMessageContainer.className = type; // Applica classe 'success' o 'error'
}