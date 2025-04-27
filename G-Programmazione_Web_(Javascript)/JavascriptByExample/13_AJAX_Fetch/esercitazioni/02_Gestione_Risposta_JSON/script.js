// Seleziona gli elementi del DOM
const loadPostButton = document.getElementById('load-post');
const postDetailsContainer = document.getElementById('post-details');
const loadingIndicator = document.getElementById('loading-indicator');

// Aggiungi l'event listener al pulsante
loadPostButton.addEventListener('click', fetchRandomPost);

function fetchRandomPost() {
    // Mostra l'indicatore di caricamento e pulisci il contenitore
    loadingIndicator.style.display = 'block';
    postDetailsContainer.innerHTML = '';

    // Genera un ID post casuale tra 1 e 100
    const randomPostId = Math.floor(Math.random() * 100) + 1;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${randomPostId}`;

    console.log(`Tentativo di caricare il post con ID: ${randomPostId}`);

    fetch(apiUrl)
        .then(response => {
            console.log('Risposta ricevuta:', response);
            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(post => {
            // Nascondi l'indicatore di caricamento
            loadingIndicator.style.display = 'none';

            console.log('Dettagli post ricevuti:', post);

            // Visualizza i dettagli del post
            displayPostDetails(post);

            // --- BONUS: Carica il nome dell'autore --- 
            return fetchAuthorName(post.userId);
        })
        .then(authorName => {
            // Aggiorna l'UI con il nome dell'autore
            const authorElement = postDetailsContainer.querySelector('.author-info');
            if (authorElement) {
                authorElement.textContent = `Scritto da: ${authorName}`;
            }
        })
        .catch(error => {
            // Nascondi l'indicatore di caricamento
            loadingIndicator.style.display = 'none';

            // Gestisci errori
            console.error('Errore durante il fetch del post o dell\'autore:', error);
            postDetailsContainer.innerHTML = `<p style="color: red;">Errore nel caricamento del post: ${error.message}</p>`;
        });
}

function displayPostDetails(post) {
    // Pulisci il contenitore (potrebbe essere già stato fatto, ma è sicuro ripeterlo)
    postDetailsContainer.innerHTML = '';

    // Crea gli elementi HTML
    const titleElement = document.createElement('h2');
    titleElement.textContent = post.title;

    const bodyElement = document.createElement('p');
    bodyElement.textContent = post.body;

    const postIdElement = document.createElement('p');
    postIdElement.innerHTML = `<em>Post ID: ${post.id}</em>`;

    // Elemento per l'autore (verrà aggiornato dal bonus)
    const authorElement = document.createElement('p');
    authorElement.className = 'author-info'; // Aggiungi una classe per selezionarlo dopo
    authorElement.innerHTML = `<em>Scritto da Utente ID: ${post.userId} (Caricamento nome...)</em>`;

    // Aggiungi gli elementi al contenitore
    postDetailsContainer.appendChild(titleElement);
    postDetailsContainer.appendChild(bodyElement);
    postDetailsContainer.appendChild(authorElement);
    postDetailsContainer.appendChild(postIdElement);
}

// Funzione per il Bonus: recuperare il nome dell'autore
function fetchAuthorName(userId) {
    const userApiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    console.log(`Tentativo di caricare l'autore con ID: ${userId}`);

    return fetch(userApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP nel caricare l'utente! Stato: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            console.log('Dati autore:', user);
            return user.name; // Restituisce solo il nome dell'utente
        });
        // L'errore specifico del fetch dell'utente verrà catturato dal .catch() principale
}