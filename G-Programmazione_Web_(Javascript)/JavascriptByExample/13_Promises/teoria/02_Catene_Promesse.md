# Catene di Promesse in JavaScript

Uno dei vantaggi più potenti delle Promesse è la capacità di essere concatenate per creare sequenze di operazioni asincrone. Questo capitolo esplora come utilizzare le catene di promesse per gestire flussi di lavoro asincroni complessi in modo elegante e leggibile.

## Il Concetto di Concatenamento

Il concatenamento delle promesse si basa su una caratteristica fondamentale: il metodo `.then()` restituisce sempre una nuova promessa. Questo permette di collegare più operazioni asincrone in sequenza, dove ogni operazione inizia solo quando la precedente è completata.

## Sintassi Base delle Catene di Promesse

```javascript
primaOperazione()
  .then(risultato => secondaOperazione(risultato))
  .then(nuovoRisultato => terzaOperazione(nuovoRisultato))
  .then(risultatoFinale => {
    console.log('Risultato finale:', risultatoFinale);
  })
  .catch(errore => {
    console.error('Si è verificato un errore:', errore);
  });
```

## Passaggio dei Dati Attraverso la Catena

Ogni funzione di callback in una catena `.then()` riceve come argomento il valore restituito dalla promessa precedente. Questo permette di passare dati attraverso la catena di operazioni.

```javascript
fetch('https://api.example.com/utenti/1')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    return response.json(); // Restituisce una promessa che risolve i dati JSON
  })
  .then(utente => {
    console.log('Dati utente:', utente);
    // Utilizziamo l'ID dell'utente per recuperare i suoi ordini
    return fetch(`https://api.example.com/utenti/${utente.id}/ordini`);
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(ordini => {
    console.log('Ordini dell\'utente:', ordini);
  })
  .catch(errore => {
    console.error('Errore durante il recupero dei dati:', errore);
  });
```

## Trasformazione dei Dati

Una delle potenzialità delle catene di promesse è la capacità di trasformare i dati ad ogni passaggio.

```javascript
fetch('https://api.example.com/prodotti')
  .then(response => response.json())
  .then(prodotti => {
    // Trasformiamo l'array di prodotti in un array di nomi
    return prodotti.map(prodotto => prodotto.nome);
  })
  .then(nomiProdotti => {
    // Filtriamo solo i nomi che iniziano con 'A'
    return nomiProdotti.filter(nome => nome.startsWith('A'));
  })
  .then(nomiProdottiFiltrati => {
    console.log('Prodotti che iniziano con A:', nomiProdottiFiltrati);
  })
  .catch(errore => {
    console.error('Errore:', errore);
  });
```

## Gestione degli Errori nelle Catene

Un aspetto fondamentale delle catene di promesse è la gestione degli errori. Quando si verifica un errore in qualsiasi punto della catena, l'esecuzione salta direttamente al primo `.catch()` disponibile.

```javascript
recuperaDati()
  .then(dati => {
    if (!dati) {
      throw new Error('Dati non validi'); // Genera un errore
    }
    return elaboraDati(dati);
  })
  .then(risultato => {
    // Questo blocco viene saltato se si verifica un errore sopra
    return formattaRisultato(risultato);
  })
  .catch(errore => {
    // Gestisce qualsiasi errore verificatosi nei blocchi .then() precedenti
    console.error('Si è verificato un errore:', errore);
    return risultatoPredefinito(); // Fornisce un valore di fallback
  })
  .then(risultatoFinale => {
    // Questo viene eseguito sia dopo un successo che dopo un errore gestito
    console.log('Risultato finale:', risultatoFinale);
  });
```

## Posizionamento Strategico dei `.catch()`

È possibile posizionare più gestori `.catch()` in punti strategici della catena per gestire errori specifici e continuare l'esecuzione.

```javascript
recuperaUtente(userId)
  .then(utente => {
    return recuperaOrdini(utente.id);
  })
  .catch(errore => {
    // Gestisce errori specifici del recupero utente
    console.warn('Impossibile recuperare l\'utente:', errore);
    return { id: userId, ordini: [] }; // Valore di fallback
  })
  .then(risultato => {
    return calcolaTotaleOrdini(risultato.ordini);
  })
  .catch(errore => {
    // Gestisce errori nel calcolo del totale
    console.warn('Errore nel calcolo del totale:', errore);
    return 0; // Valore di fallback per il totale
  })
  .then(totale => {
    console.log('Totale ordini:', totale);
  })
  .catch(errore => {
    // Gestisce qualsiasi altro errore non gestito
    console.error('Errore non gestito:', errore);
  });
```

## Ritorno di Promesse all'interno di `.then()`

Quando si restituisce una promessa all'interno di un callback `.then()`, la catena attende che quella promessa si risolva prima di continuare.

```javascript
fetch('https://api.example.com/autenticazione')
  .then(response => response.json())
  .then(datiAuth => {
    // Restituiamo una nuova promessa
    return fetch('https://api.example.com/dati', {
      headers: { 'Authorization': `Bearer ${datiAuth.token}` }
    });
  })
  .then(response => response.json())
  .then(datiFinali => {
    console.log('Dati recuperati:', datiFinali);
  })
  .catch(errore => {
    console.error('Errore:', errore);
  });
```

## Promesse Parallele all'interno di Catene

A volte è necessario eseguire più operazioni asincrone in parallelo all'interno di una catena di promesse.

```javascript
fetch('https://api.example.com/utente')
  .then(response => response.json())
  .then(utente => {
    // Eseguiamo più richieste in parallelo
    return Promise.all([
      fetch(`https://api.example.com/utenti/${utente.id}/profilo`).then(res => res.json()),
      fetch(`https://api.example.com/utenti/${utente.id}/preferenze`).then(res => res.json()),
      fetch(`https://api.example.com/utenti/${utente.id}/ordini`).then(res => res.json())
    ]);
  })
  .then(([profilo, preferenze, ordini]) => {
    // Utilizziamo la destrutturazione per accedere ai risultati
    console.log('Profilo:', profilo);
    console.log('Preferenze:', preferenze);
    console.log('Ordini:', ordini);
    
    // Combiniamo i dati
    return {
      ...profilo,
      preferenze,
      numeroOrdini: ordini.length
    };
  })
  .then(datiCompleti => {
    console.log('Dati completi dell\'utente:', datiCompleti);
  })
  .catch(errore => {
    console.error('Si è verificato un errore:', errore);
  });
```

## Pattern di Catene Avanzati

### Esecuzione Sequenziale di un Array di Promesse

A volte è necessario eseguire una serie di promesse in sequenza, dove ogni promessa dipende dal risultato della precedente.

```javascript
// Funzione per eseguire promesse in sequenza
function eseguiInSequenza(arrayDiFunzioni) {
  return arrayDiFunzioni.reduce(
    (promessaAccumulata, funzioneCorrente) => {
      return promessaAccumulata.then(risultato => {
        return funzioneCorrente(risultato);
      });
    },
    Promise.resolve(null) // Valore iniziale
  );
}

// Esempio di utilizzo
const funzioni = [
  () => recuperaPrimiDati(),
  risultato => elaboraPrimiDati(risultato),
  nuovoRisultato => recuperaDatiAggiuntivi(nuovoRisultato),
  datiCompleti => formattaDatiFinali(datiCompleti)
];

eseguiInSequenza(funzioni)
  .then(risultatoFinale => {
    console.log('Processo completato:', risultatoFinale);
  })
  .catch(errore => {
    console.error('Errore durante il processo:', errore);
  });
```

### Retry Pattern con Promesse

Un pattern comune è ritentare un'operazione asincrona in caso di fallimento.

```javascript
function eseguiConRetry(funzione, maxTentativi = 3, ritardoMs = 1000) {
  return new Promise((resolve, reject) => {
    function tentativo(numeroTentativo) {
      funzione()
        .then(resolve) // Successo: risolve la promessa esterna
        .catch(errore => {
          if (numeroTentativo < maxTentativi) {
            console.warn(`Tentativo ${numeroTentativo} fallito. Riprovo tra ${ritardoMs}ms...`);
            // Attendi e riprova
            setTimeout(() => tentativo(numeroTentativo + 1), ritardoMs);
          } else {
            // Numero massimo di tentativi raggiunto
            reject(errore);
          }
        });
    }
    
    // Inizia con il primo tentativo
    tentativo(1);
  });
}

// Esempio di utilizzo
eseguiConRetry(() => fetch('https://api.example.com/dati-instabili'))
  .then(response => response.json())
  .then(dati => {
    console.log('Dati recuperati con successo:', dati);
  })
  .catch(errore => {
    console.error('Tutti i tentativi sono falliti:', errore);
  });
```

## Best Practices per le Catene di Promesse

1. **Mantieni le catene leggibili**: Usa l'indentazione e i commenti per rendere chiaro il flusso della catena.

2. **Restituisci sempre valori**: Assicurati di restituire sempre un valore o una promessa da ogni callback `.then()` per mantenere la catena.

3. **Gestisci sempre gli errori**: Includi almeno un `.catch()` alla fine di ogni catena di promesse.

4. **Evita catene troppo lunghe**: Se una catena diventa troppo lunga, considera di suddividerla in funzioni più piccole.

5. **Usa `.finally()` per la pulizia**: Utilizza `.finally()` per operazioni di pulizia che devono essere eseguite indipendentemente dal successo o dal fallimento.

## Conclusione

Le catene di promesse sono uno strumento potente per gestire flussi di lavoro asincroni complessi in JavaScript. Permettono di scrivere codice più leggibile, manutenibile e robusto rispetto all'annidamento di callback.

Nel prossimo capitolo, approfondiremo le tecniche avanzate per la gestione degli errori con le promesse.

[Torna all'indice](../README.md) | [Argomento precedente: Concetti Fondamentali](./01_Concetti_Fondamentali.md) | [Prossimo argomento: Gestione degli Errori](./03_Gestione_Errori.md)