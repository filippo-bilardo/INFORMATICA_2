# Delega degli Eventi (Event Delegation)

La delega degli eventi è un pattern potente in JavaScript che sfrutta il meccanismo di propagazione degli eventi (bubbling) per gestire eventi su più elementi con un singolo gestore collegato a un antenato comune. Questo approccio offre numerosi vantaggi in termini di prestazioni, manutenibilità e flessibilità del codice.

## Concetto di Base

Invece di assegnare gestori di eventi a ciascun elemento individualmente, con la delega degli eventi si assegna un singolo gestore a un elemento genitore. Quando un evento si verifica su un elemento figlio, l'evento si propaga verso l'alto (bubbling) attraverso il DOM fino a raggiungere l'elemento genitore, dove viene gestito.

```javascript
// Approccio tradizionale (senza delega)
const elementi = document.querySelectorAll('.elemento');
elements.forEach(elemento => {
  elemento.addEventListener('click', function() {
    console.log('Elemento cliccato:', this.textContent);
  });
});

// Approccio con delega degli eventi
document.getElementById('contenitore').addEventListener('click', function(evento) {
  if (evento.target.matches('.elemento')) {
    console.log('Elemento cliccato:', evento.target.textContent);
  }
});
```

## Vantaggi della Delega degli Eventi

### 1. Migliori Prestazioni

La delega degli eventi riduce significativamente il numero di gestori di eventi attivi nella pagina. Invece di avere un gestore per ogni elemento, ne abbiamo uno solo per l'elemento genitore. Questo comporta:

- Minor consumo di memoria
- Inizializzazione più rapida della pagina
- Riduzione del carico di lavoro del browser

### 2. Gestione Dinamica degli Elementi

Uno dei principali vantaggi della delega degli eventi è la capacità di gestire automaticamente elementi che vengono aggiunti dinamicamente al DOM dopo il caricamento iniziale della pagina:

```javascript
const lista = document.getElementById('lista');

// Gestore delegato per tutti gli elementi della lista
lista.addEventListener('click', function(evento) {
  if (evento.target.tagName === 'LI') {
    console.log('Elemento cliccato:', evento.target.textContent);
  }
});

// Aggiunta di un nuovo elemento - funzionerà automaticamente con il gestore esistente
const nuovoElemento = document.createElement('li');
nuovoElemento.textContent = 'Nuovo elemento';
lista.appendChild(nuovoElemento);
```

### 3. Codice più Pulito e Manutenibile

La delega degli eventi centralizza la logica di gestione degli eventi, rendendo il codice più facile da mantenere e aggiornare. Invece di avere gestori sparsi in tutto il codice, la logica è concentrata in un unico punto.

## Implementazione della Delega degli Eventi

### Pattern Base

```javascript
contenitore.addEventListener('evento', function(e) {
  // Verifica se l'elemento che ha generato l'evento (e.target) 
  // è del tipo che ci interessa
  if (e.target.matches(selettore)) {
    // Esegui la logica specifica per questo tipo di elemento
  }
});
```

### Metodi per Identificare gli Elementi Target

1. **Usando `matches()`**:
   ```javascript
   if (evento.target.matches('.classe-elemento')) {
     // Logica per elementi con classe 'classe-elemento'
   }
   ```

2. **Usando `tagName`**:
   ```javascript
   if (evento.target.tagName === 'BUTTON') {
     // Logica per elementi <button>
   }
   ```

3. **Usando attributi**:
   ```javascript
   if (evento.target.hasAttribute('data-action')) {
     const action = evento.target.getAttribute('data-action');
     // Logica basata sul valore dell'attributo data-action
   }
   ```

4. **Usando `closest()`** per gestire eventi su elementi annidati:
   ```javascript
   const elemento = evento.target.closest('.elemento-interattivo');
   if (elemento) {
     // Logica per l'elemento o il suo antenato più vicino con classe 'elemento-interattivo'
   }
   ```

## Esempi Pratici

### Esempio 1: Gestione di una Lista di Elementi

```html
<ul id="lista-compiti">
  <li>
    <span class="testo-compito">Completare il progetto</span>
    <button class="btn-elimina">Elimina</button>
    <button class="btn-completa">Completa</button>
  </li>
  <!-- Altri elementi della lista -->
</ul>
```

```javascript
const listaCompiti = document.getElementById('lista-compiti');

listaCompiti.addEventListener('click', function(evento) {
  // Gestione del pulsante Elimina
  if (evento.target.classList.contains('btn-elimina')) {
    const elementoLista = evento.target.closest('li');
    elementoLista.remove();
  }
  
  // Gestione del pulsante Completa
  else if (evento.target.classList.contains('btn-completa')) {
    const elementoLista = evento.target.closest('li');
    const testoCompito = elementoLista.querySelector('.testo-compito');
    testoCompito.classList.toggle('completato');
  }
});

// Funzione per aggiungere nuovi elementi alla lista
function aggiungiCompito(testo) {
  const nuovoElemento = document.createElement('li');
  nuovoElemento.innerHTML = `
    <span class="testo-compito">${testo}</span>
    <button class="btn-elimina">Elimina</button>
    <button class="btn-completa">Completa</button>
  `;
  listaCompiti.appendChild(nuovoElemento);
}
```

### Esempio 2: Tabella Interattiva

```html
<table id="tabella-dati">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Azioni</th>
    </tr>
  </thead>
  <tbody>
    <tr data-id="1">
      <td>Mario Rossi</td>
      <td>mario@example.com</td>
      <td>
        <button data-action="modifica">Modifica</button>
        <button data-action="elimina">Elimina</button>
      </td>
    </tr>
    <!-- Altre righe -->
  </tbody>
</table>
```

```javascript
const tabella = document.getElementById('tabella-dati');

tabella.addEventListener('click', function(evento) {
  // Verifica se l'elemento cliccato è un pulsante con attributo data-action
  if (evento.target.hasAttribute('data-action')) {
    const azione = evento.target.getAttribute('data-action');
    const riga = evento.target.closest('tr');
    const id = riga.getAttribute('data-id');
    
    // Esegui l'azione appropriata
    switch (azione) {
      case 'modifica':
        modificaRiga(id, riga);
        break;
      case 'elimina':
        eliminaRiga(id, riga);
        break;
    }
  }
});

function modificaRiga(id, riga) {
  // Implementazione della modifica
  console.log('Modifica riga con ID:', id);
}

function eliminaRiga(id, riga) {
  // Implementazione dell'eliminazione
  console.log('Elimina riga con ID:', id);
  riga.remove();
}
```

## Considerazioni Avanzate

### Gestione di Eventi Multipli

È possibile utilizzare la delega degli eventi per gestire più tipi di eventi sullo stesso contenitore:

```javascript
const galleria = document.getElementById('galleria');

// Gestione di clic sulle immagini
galleria.addEventListener('click', function(evento) {
  if (evento.target.tagName === 'IMG') {
    mostraImmagineIngrandita(evento.target.src);
  }
});

// Gestione di hover sulle immagini
galleria.addEventListener('mouseover', function(evento) {
  if (evento.target.tagName === 'IMG') {
    mostraDescrizione(evento.target.dataset.descrizione);
  }
});

galleria.addEventListener('mouseout', function(evento) {
  if (evento.target.tagName === 'IMG') {
    nascondiDescrizione();
  }
});
```

### Gestione di Eventi Annidati

Quando si lavora con elementi annidati, è importante considerare la propagazione degli eventi e utilizzare `closest()` o altre tecniche per identificare correttamente l'elemento target:

```javascript
const menu = document.getElementById('menu');

menu.addEventListener('click', function(evento) {
  // Gestione del clic su elementi del menu
  const voceMenu = evento.target.closest('.voce-menu');
  if (voceMenu) {
    // Attiva la voce di menu
    attivaVoceMenu(voceMenu);
    
    // Verifica se è stato cliccato il pulsante di espansione
    if (evento.target.classList.contains('btn-espandi')) {
      espandiSottomenu(voceMenu);
    }
  }
});
```

### Limitazioni della Delega degli Eventi

Nonostante i numerosi vantaggi, la delega degli eventi presenta alcune limitazioni:

1. **Eventi che non si propagano**: Alcuni eventi come `focus`, `blur` e `change` non si propagano per impostazione predefinita (non fanno bubbling). Per questi eventi, è possibile utilizzare la fase di cattura o altre tecniche.

2. **Complessità in strutture DOM profonde**: In strutture DOM molto complesse, potrebbe essere difficile determinare l'origine esatta dell'evento.

3. **Eventi specifici dell'elemento**: Alcuni eventi sono specifici per determinati tipi di elementi e non possono essere delegati facilmente.

## Best Practices

1. **Usa selettori efficienti**: Utilizza selettori semplici e specifici per identificare gli elementi target.

2. **Limita la profondità della delega**: Evita di delegare eventi a elementi troppo in alto nella gerarchia del DOM, come `document` o `body`, a meno che non sia necessario.

3. **Usa attributi `data-*`**: Gli attributi `data-*` sono utili per memorizzare informazioni aggiuntive sugli elementi e facilitare la gestione degli eventi.

4. **Considera la fase di cattura per eventi che non si propagano**: Per eventi come `focus` che non fanno bubbling, puoi utilizzare la fase di cattura impostando il terzo parametro di `addEventListener` a `true`.

5. **Documenta la logica di delega**: Poiché la delega centralizza la gestione degli eventi, è importante documentare chiaramente come funziona per facilitare la manutenzione futura.

## Conclusione

La delega degli eventi è una tecnica potente che può migliorare significativamente le prestazioni e la manutenibilità delle applicazioni web. Sfruttando il meccanismo di propagazione degli eventi, è possibile gestire in modo efficiente numerosi elementi con un codice minimo, anche quando gli elementi vengono aggiunti o rimossi dinamicamente.

Padroneggiare questa tecnica è essenziale per sviluppare applicazioni web moderne e reattive, specialmente quelle con interfacce utente complesse e dinamiche.

[Torna all'indice](../README.md) | [Prossimo argomento: Eventi Personalizzati](./02_Eventi_Personalizzati.md)