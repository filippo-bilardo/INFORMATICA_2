const loadDataBtn = document.getElementById('loadDataBtn');
const outputDiv = document.getElementById('output');
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

// Funzione asincrona per caricare i dati
const fetchData = async () => {
    outputDiv.innerHTML = 'Caricamento...'; // Messaggio di caricamento
    outputDiv.classList.remove('error'); // Rimuove la classe errore se presente

    try {
        // Effettua la richiesta GET con await
        const response = await fetch(apiUrl);

        // Controlla se la risposta è OK (status 200-299)
        if (!response.ok) {
            // Se non è OK, lancia un errore con lo status HTTP
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        // Converte la risposta in JSON con await
        const data = await response.json();

        // Visualizza i dati nell'elemento output
        outputDiv.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;

    } catch (error) {
        // Gestisce qualsiasi errore (di rete o lanciato da noi)
        console.error('Errore durante il fetch:', error);
        outputDiv.innerHTML = `Si è verificato un errore: ${error.message}`;
        outputDiv.classList.add('error'); // Aggiunge stile per l'errore
    }
};

// Aggiunge l'event listener al pulsante
loadDataBtn.addEventListener('click', fetchData);