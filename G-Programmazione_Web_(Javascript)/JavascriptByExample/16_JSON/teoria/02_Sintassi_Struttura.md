# Sintassi e struttura JSON

## Regole di sintassi di base

JSON (JavaScript Object Notation) segue una sintassi semplice ma rigorosa. Ecco le regole fondamentali:

- I dati sono rappresentati in coppie nome/valore
- Le coppie nome/valore sono separate da virgole
- Gli oggetti sono racchiusi tra parentesi graffe `{}`
- Gli array sono racchiusi tra parentesi quadre `[]`
- I nomi (chiavi) devono essere stringhe racchiuse tra virgolette doppie `""`
- I valori possono essere di diversi tipi (stringhe, numeri, booleani, null, oggetti, array)

## Tipi di dati supportati

JSON supporta un insieme limitato di tipi di dati:

1. **Stringhe**: Sequenze di caratteri racchiuse tra virgolette doppie
   ```json
   "Questo è un esempio di stringa"
   ```

2. **Numeri**: Interi o decimali, positivi o negativi, senza virgolette
   ```json
   42
   3.14
   -273.15
   ```

3. **Booleani**: I valori `true` o `false`, senza virgolette
   ```json
   true
   false
   ```

4. **null**: Il valore `null`, senza virgolette
   ```json
   null
   ```

5. **Array**: Collezioni ordinate di valori racchiusi tra parentesi quadre
   ```json
   [1, 2, 3, 4, 5]
   ["rosso", "verde", "blu"]
   ```

6. **Oggetti**: Collezioni non ordinate di coppie nome/valore racchiuse tra parentesi graffe
   ```json
   {"nome": "Mario", "età": 30, "città": "Roma"}
   ```

## Struttura degli oggetti JSON

Gli oggetti JSON sono collezioni di coppie nome/valore. Ogni nome è seguito da `:` e poi dal valore corrispondente.

```json
{
  "nome": "Mario Rossi",
  "età": 35,
  "attivo": true,
  "indirizzo": {
    "via": "Via Roma 123",
    "città": "Milano",
    "cap": "20100"
  },
  "telefoni": ["02-1234567", "333-1234567"],
  "note": null
}
```

## Struttura degli array JSON

Gli array JSON sono collezioni ordinate di valori. Possono contenere valori di qualsiasi tipo supportato da JSON, inclusi altri array o oggetti.

```json
[
  "mela",
  42,
  true,
  null,
  {"chiave": "valore"},
  [1, 2, 3]
]
```

## Annidamento di strutture

Una delle caratteristiche più potenti di JSON è la possibilità di annidare strutture. Oggetti possono contenere altri oggetti o array, e array possono contenere altri array o oggetti, creando strutture dati complesse e gerarchiche.

```json
{
  "azienda": "Tech Solutions",
  "dipendenti": [
    {
      "nome": "Mario",
      "ruolo": "Sviluppatore",
      "competenze": ["JavaScript", "HTML", "CSS"]
    },
    {
      "nome": "Laura",
      "ruolo": "Designer",
      "competenze": ["Photoshop", "Illustrator", "Figma"],
      "progetti": [
        {"nome": "Redesign Sito", "completato": true},
        {"nome": "App Mobile", "completato": false}
      ]
    }
  ],
  "sede": {
    "principale": {
      "città": "Milano",
      "indirizzo": "Via Tecnologica 42"
    },
    "filiali": ["Roma", "Torino", "Napoli"]
  }
}
```

## Errori comuni di sintassi

Ecco alcuni errori comuni da evitare quando si scrive JSON:

1. **Virgole finali**: Non è consentito lasciare una virgola dopo l'ultimo elemento di un oggetto o array
   ```json
   // Errato
   {"nome": "Mario", "età": 30,}
   
   // Corretto
   {"nome": "Mario", "età": 30}
   ```

2. **Virgolette singole**: Le chiavi e le stringhe devono utilizzare virgolette doppie, non singole
   ```json
   // Errato
   {'nome': 'Mario'}
   
   // Corretto
   {"nome": "Mario"}
   ```

3. **Commenti**: JSON non supporta commenti
   ```json
   // Errato
   {
     "nome": "Mario", // Nome dell'utente
     "età": 30
   }
   ```

4. **Nomi senza virgolette**: Tutte le chiavi devono essere stringhe racchiuse tra virgolette doppie
   ```json
   // Errato
   {nome: "Mario"}
   
   // Corretto
   {"nome": "Mario"}
   ```

5. **Valori non validi**: I valori devono essere uno dei tipi supportati
   ```json
   // Errato
   {"data": new Date()}
   
   // Corretto (rappresentare come stringa)
   {"data": "2023-05-15T14:30:00Z"}
   ```

Comprendere la sintassi e la struttura di JSON è fondamentale per utilizzarlo correttamente nelle applicazioni web moderne. Nella prossima sezione, esploreremo i metodi disponibili in JavaScript per lavorare con JSON.