// Seleziona gli elementi del DOM
const loadUsersButton = document.getElementById('load-users');
const userListContainer = document.getElementById('user-list');
const loadingIndicator = document.getElementById('loading-indicator');

// Aggiungi l'event listener al pulsante
loadUsersButton.addEventListener('click', fetchUsers);

function fetchUsers() {
    // Mostra l'indicatore di caricamento
    loadingIndicator.style.display = 'block';
    userListContainer.innerHTML = ''; // Pulisci il contenitore

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            console.log('Risposta ricevuta:', response);
            if (!response.ok) {
                // Se la risposta HTTP non è OK, lancia un errore
                throw new Error(`Errore HTTP! Stato: ${response.status} ${response.statusText}`);
            }
            // Altrimenti, procedi a leggere il corpo come JSON
            return response.json();
        })
        .then(users => {
            // Nascondi l'indicatore di caricamento
            loadingIndicator.style.display = 'none';

            console.log('Utenti ricevuti:', users);

            // Verifica se l'array di utenti è vuoto
            if (users.length === 0) {
                userListContainer.innerHTML = '<p>Nessun utente trovato.</p>';
                return;
            }

            // Crea una lista non ordinata per gli utenti
            const ul = document.createElement('ul');

            // Itera sull'array di utenti e crea elementi della lista
            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${user.name}</strong> (${user.email})`;
                ul.appendChild(li);
            });

            // Aggiungi la lista al contenitore
            userListContainer.appendChild(ul);
        })
        .catch(error => {
            // Nascondi l'indicatore di caricamento anche in caso di errore
            loadingIndicator.style.display = 'none';

            // Gestisci errori di rete o errori lanciati
            console.error('Errore durante il fetch degli utenti:', error);
            userListContainer.innerHTML = `<p style="color: red;">Errore nel caricamento degli utenti: ${error.message}</p>`;
        });
}