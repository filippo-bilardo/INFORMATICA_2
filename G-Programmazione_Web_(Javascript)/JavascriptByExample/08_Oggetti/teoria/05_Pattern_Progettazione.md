# Pattern di Progettazione in JavaScript

I pattern di progettazione (design patterns) sono soluzioni consolidate a problemi ricorrenti nello sviluppo software. In JavaScript, grazie alla sua natura flessibile e alla sua capacità di supportare diversi paradigmi di programmazione, è possibile implementare una vasta gamma di pattern di progettazione.

## Perché Utilizzare i Pattern di Progettazione?

- **Riusabilità del codice**: I pattern offrono soluzioni testate che possono essere adattate a diversi contesti.
- **Comunicazione**: Forniscono un vocabolario comune che facilita la comunicazione tra sviluppatori.
- **Manutenibilità**: Seguire pattern consolidati rende il codice più prevedibile e facile da mantenere.
- **Scalabilità**: I pattern aiutano a strutturare il codice in modo che possa crescere senza diventare ingestibile.

## Categorie di Pattern di Progettazione

I pattern di progettazione sono tradizionalmente suddivisi in tre categorie principali:

1. **Pattern Creazionali**: Si occupano del processo di creazione degli oggetti.
2. **Pattern Strutturali**: Si concentrano sulla composizione di classi e oggetti.
3. **Pattern Comportamentali**: Definiscono il modo in cui gli oggetti interagiscono e distribuiscono le responsabilità.

## Pattern Creazionali

### Singleton

Il pattern Singleton garantisce che una classe abbia una sola istanza e fornisce un punto di accesso globale a essa.

```javascript
class Database {
  constructor(connectionString) {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connectionString = connectionString;
    this.connected = false;
    Database.instance = this;
  }
  
  connect() {
    if (!this.connected) {
      console.log(`Connessione al database con: ${this.connectionString}`);
      this.connected = true;
    } else {
      console.log('Già connesso al database');
    }
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('Devi connetterti prima di eseguire una query');
    }
    console.log(`Esecuzione query: ${sql}`);
    return [`Risultato1`, `Risultato2`];
  }
}

// Utilizzo
const db1 = new Database('mongodb://localhost:27017');
db1.connect(); // Output: "Connessione al database con: mongodb://localhost:27017"

const db2 = new Database('altra-stringa'); // Restituisce la stessa istanza
console.log(db2.connectionString); // Output: "mongodb://localhost:27017"
db2.connect(); // Output: "Già connesso al database"

console.log(db1 === db2); // Output: true
```

### Factory

Il pattern Factory fornisce un'interfaccia per creare oggetti in una superclasse, ma consente alle sottoclassi di alterare il tipo di oggetti che verranno creati.

```javascript
// Prodotti
class Veicolo {
  constructor(modello, anno) {
    this.modello = modello;
    this.anno = anno;
  }
  
  getInfo() {
    return `${this.constructor.name}: ${this.modello} (${this.anno})`;
  }
}

class Auto extends Veicolo {
  constructor(modello, anno, porte) {
    super(modello, anno);
    this.porte = porte;
  }
  
  getInfo() {
    return `${super.getInfo()}, ${this.porte} porte`;
  }
}

class Moto extends Veicolo {
  constructor(modello, anno, cilindrata) {
    super(modello, anno);
    this.cilindrata = cilindrata;
  }
  
  getInfo() {
    return `${super.getInfo()}, ${this.cilindrata}cc`;
  }
}

// Factory
class VeicoloFactory {
  creaVeicolo(tipo, ...args) {
    switch (tipo.toLowerCase()) {
      case 'auto':
        return new Auto(...args);
      case 'moto':
        return new Moto(...args);
      default:
        throw new Error(`Tipo di veicolo non supportato: ${tipo}`);
    }
  }
}

// Utilizzo
const factory = new VeicoloFactory();

const auto = factory.creaVeicolo('auto', 'Fiat Panda', 2020, 5);
console.log(auto.getInfo()); // Output: "Auto: Fiat Panda (2020), 5 porte"

const moto = factory.creaVeicolo('moto', 'Ducati Monster', 2021, 900);
console.log(moto.getInfo()); // Output: "Moto: Ducati Monster (2021), 900cc"
```

### Builder

Il pattern Builder separa la costruzione di un oggetto complesso dalla sua rappresentazione, permettendo di creare diverse rappresentazioni utilizzando lo stesso processo di costruzione.

```javascript
class PizzaBuilder {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.pizza = {
      impasto: '',
      salsa: '',
      ingredienti: [],
      extra: []
    };
  }
  
  setImpasto(impasto) {
    this.pizza.impasto = impasto;
    return this;
  }
  
  setSalsa(salsa) {
    this.pizza.salsa = salsa;
    return this;
  }
  
  addIngrediente(ingrediente) {
    this.pizza.ingredienti.push(ingrediente);
    return this;
  }
  
  addExtra(extra) {
    this.pizza.extra.push(extra);
    return this;
  }
  
  build() {
    const pizza = this.pizza;
    this.reset();
    return pizza;
  }
}

// Utilizzo
const builder = new PizzaBuilder();

const margherita = builder
  .setImpasto('normale')
  .setSalsa('pomodoro')
  .addIngrediente('mozzarella')
  .addIngrediente('basilico')
  .build();

console.log(margherita);
/* Output:
{
  impasto: 'normale',
  salsa: 'pomodoro',
  ingredienti: ['mozzarella', 'basilico'],
  extra: []
}
*/

const quattroFormaggi = builder
  .setImpasto('integrale')
  .setSalsa('bianca')
  .addIngrediente('mozzarella')
  .addIngrediente('gorgonzola')
  .addIngrediente('fontina')
  .addIngrediente('parmigiano')
  .addExtra('crosta ripiena')
  .build();

console.log(quattroFormaggi);
/* Output:
{
  impasto: 'integrale',
  salsa: 'bianca',
  ingredienti: ['mozzarella', 'gorgonzola', 'fontina', 'parmigiano'],
  extra: ['crosta ripiena']
}
*/
```

## Pattern Strutturali

### Adapter

Il pattern Adapter permette a interfacce incompatibili di lavorare insieme, convertendo l'interfaccia di una classe in un'altra interfaccia che i client si aspettano.

```javascript
// Interfaccia esistente
class VecchioSistema {
  constructor() {
    this.operazioni = [];
  }
  
  aggiungiOperazione(importo, descrizione) {
    this.operazioni.push({ importo, descrizione, data: new Date() });
  }
  
  ottieniSaldo() {
    return this.operazioni.reduce((saldo, op) => saldo + op.importo, 0);
  }
  
  ottieniOperazioni() {
    return this.operazioni;
  }
}

// Nuova interfaccia richiesta
class InterfacciaNuovaSistema {
  addTransaction(amount, description, date) {
    throw new Error('Metodo non implementato');
  }
  
  getBalance() {
    throw new Error('Metodo non implementato');
  }
  
  getTransactionHistory() {
    throw new Error('Metodo non implementato');
  }
}

// Adapter
class SistemaAdapter extends InterfacciaNuovaSistema {
  constructor(vecchioSistema) {
    super();
    this.vecchioSistema = vecchioSistema;
  }
  
  addTransaction(amount, description, date = new Date()) {
    this.vecchioSistema.aggiungiOperazione(amount, description);
  }
  
  getBalance() {
    return this.vecchioSistema.ottieniSaldo();
  }
  
  getTransactionHistory() {
    return this.vecchioSistema.ottieniOperazioni().map(op => ({
      amount: op.importo,
      description: op.descrizione,
      date: op.data
    }));
  }
}

// Utilizzo
const vecchioSistema = new VecchioSistema();
vecchioSistema.aggiungiOperazione(100, 'Deposito iniziale');
vecchioSistema.aggiungiOperazione(-30, 'Prelievo');

const sistemaAdattato = new SistemaAdapter(vecchioSistema);
sistemaAdattato.addTransaction(50, 'Bonifico ricevuto');

console.log(sistemaAdattato.getBalance()); // Output: 120
console.log(sistemaAdattato.getTransactionHistory());
```

### Decorator

Il pattern Decorator permette di aggiungere nuove funzionalità a oggetti esistenti dinamicamente, senza alterare la loro struttura.

```javascript
// Componente base
class Caffè {
  getCosto() {
    return 1.0;
  }
  
  getDescrizione() {
    return 'Caffè base';
  }
}

// Decorator base
class CaffèDecorator {
  constructor(caffè) {
    this.caffè = caffè;
  }
  
  getCosto() {
    return this.caffè.getCosto();
  }
  
  getDescrizione() {
    return this.caffè.getDescrizione();
  }
}

// Decoratori concreti
class ConLatte extends CaffèDecorator {
  constructor(caffè) {
    super(caffè);
  }
  
  getCosto() {
    return this.caffè.getCosto() + 0.5;
  }
  
  getDescrizione() {
    return `${this.caffè.getDescrizione()}, con latte`;
  }
}

class ConZucchero extends CaffèDecorator {
  constructor(caffè) {
    super(caffè);
  }
  
  getCosto() {
    return this.caffè.getCosto() + 0.2;
  }
  
  getDescrizione() {
    return `${this.caffè.getDescrizione()}, con zucchero`;
  }
}

class ConPanna extends CaffèDecorator {
  constructor(caffè) {
    super(caffè);
  }
  
  getCosto() {
    return this.caffè.getCosto() + 0.7;
  }
  
  getDescrizione() {
    return `${this.caffè.getDescrizione()}, con panna`;
  }
}

// Utilizzo
let myCaffè = new Caffè();
console.log(`${myCaffè.getDescrizione()} costa €${myCaffè.getCosto().toFixed(2)}`);
// Output: "Caffè base costa €1.00"

// Aggiungiamo decoratori
myCaffè = new ConLatte(myCaffè);
console.log(`${myCaffè.getDescrizione()} costa €${myCaffè.getCosto().toFixed(2)}`);
// Output: "Caffè base, con latte costa €1.50"

myCaffè = new ConZucchero(myCaffè);
console.log(`${myCaffè.getDescrizione()} costa €${myCaffè.getCosto().toFixed(2)}`);
// Output: "Caffè base, con latte, con zucchero costa €1.70"

myCaffè = new ConPanna(myCaffè);
console.log(`${myCaffè.getDescrizione()} costa €${myCaffè.getCosto().toFixed(2)}`);
// Output: "Caffè base, con latte, con zucchero, con panna costa €2.40"
```

### Proxy

Il pattern Proxy fornisce un sostituto o un segnaposto per un altro oggetto per controllare l'accesso ad esso.

```javascript
// Oggetto reale
class ImmagineReale {
  constructor(filename) {
    this.filename = filename;
    this.carica();
  }
  
  carica() {
    console.log(`Caricamento dell'immagine ${this.filename}...`);
    // Simulazione di un caricamento lento
    const start = Date.now();
    while (Date.now() - start < 1000) {
      // Attesa di 1 secondo per simulare il caricamento
    }
    console.log(`Immagine ${this.filename} caricata.`);
  }
  
  mostra() {
    console.log(`Visualizzazione dell'immagine ${this.filename}`);
  }
}

// Proxy
class ImmagineProxy {
  constructor(filename) {
    this.filename = filename;
    this.immagineReale = null;
  }
  
  mostra() {
    if (this.immagineReale === null) {
      this.immagineReale = new ImmagineReale(this.filename);
    }
    this.immagineReale.mostra();
  }
}

// Utilizzo
console.log('Creazione della galleria...');
const galleria = [
  new ImmagineProxy('immagine1.jpg'),
  new ImmagineProxy('immagine2.jpg'),
  new ImmagineProxy('immagine3.jpg')
];
console.log('Galleria creata, nessuna immagine caricata ancora.');

// Le immagini vengono caricate solo quando necessario
console.log('Visualizzazione della prima immagine:');
galleria[0].mostra();

console.log('Visualizzazione della prima immagine di nuovo:');
galleria[0].mostra(); // Non viene ricaricata

console.log('Visualizzazione della seconda immagine:');
galleria[1].mostra();
```

## Pattern Comportamentali

### Observer

Il pattern Observer definisce una dipendenza uno-a-molti tra oggetti, in modo che quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} ha ricevuto l'aggiornamento: ${data}`);
  }
}

// Implementazione concreta: Newsletter
class Newsletter extends Subject {
  constructor() {
    super();
    this.latestArticle = null;
  }
  
  publishArticle(title) {
    this.latestArticle = title;
    console.log(`Nuovo articolo pubblicato: ${title}`);
    this.notify(title);
  }
}

// Utilizzo
const techNewsletter = new Newsletter();

const subscriber1 = new Observer('Mario');
const subscriber2 = new Observer('Luigi');
const subscriber3 = new Observer('Giovanna');

techNewsletter.subscribe(subscriber1);
techNewsletter.subscribe(subscriber2);
techNewsletter.subscribe(subscriber3);

techNewsletter.publishArticle('JavaScript Design Patterns');
// Output:
// "Nuovo articolo pubblicato: JavaScript Design Patterns"
// "Mario ha ricevuto l'aggiornamento: JavaScript Design Patterns"
// "Luigi ha ricevuto l'aggiornamento: JavaScript Design Patterns"
// "Giovanna ha ricevuto l'aggiornamento: JavaScript Design Patterns"

techNewsletter.unsubscribe(subscriber2);

techNewsletter.publishArticle('Novità di ES2022');
// Output:
// "Nuovo articolo pubblicato: Novità di ES2022"
// "Mario ha ricevuto l'aggiornamento: Novità di ES2022"
// "Giovanna ha ricevuto l'aggiornamento: Novità di ES2022"
```

### Strategy

Il pattern Strategy definisce una famiglia di algoritmi, incapsula ciascuno di essi e li rende intercambiabili. Permette all'algoritmo di variare indipendentemente dai client che lo utilizzano.

```javascript
// Strategie
class PagamentoStrategy {
  paga(importo) {
    throw new Error('Metodo paga() deve essere implementato');
  }
}

class PagamentoCartaCredito extends PagamentoStrategy {
  constructor(nome, numerocarta, cvv, dataScadenza) {
    super();
    this.nome = nome;
    this.numeroCartaMascherato = `xxxx-xxxx-xxxx-${numerocarta.slice(-4)}`;
    this.cvv = cvv;
    this.dataScadenza = dataScadenza;
  }
  
  paga(importo) {
    console.log(`Pagamento di €${importo} effettuato con carta di credito ${this.numeroCartaMascherato}`);
    return true;
  }
}

class PagamentoPayPal extends PagamentoStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  paga(importo) {
    console.log(`Pagamento di €${importo} effettuato con PayPal usando l'account ${this.email}`);
    return true;
  }
}

class PagamentoBonifico extends PagamentoStrategy {
  constructor(iban, nomeBanca) {
    super();
    this.iban = iban;
    this.nomeBanca = nomeBanca;
  }
  
  paga(importo) {
    console.log(`Richiesta di bonifico di €${importo} all'IBAN ${this.iban} (${this.nomeBanca})`);
    console.log('Il pagamento sarà completato entro 2-3 giorni lavorativi');
    return true;
  }
}

// Contesto
class Carrello {
  constructor() {
    this.prodotti = [];
    this.strategiaPagamento = null;
  }
  
  aggiungiProdotto(prodotto) {
    this.prodotti.push(prodotto);
  }
  
  calcolaTotale() {
    return this.prodotti.reduce((totale, prodotto) => totale + prodotto.prezzo, 0);
  }
  
  setStrategiaPagamento(strategia) {
    this.strategiaPagamento = strategia;
  }
  
  checkout() {
    if (!this.strategiaPagamento) {
      throw new Error('Nessuna strategia di pagamento selezionata');
    }
    
    const importo = this.calcolaTotale();
    return this.strategiaPagamento.paga(importo);
  }
}

// Utilizzo
const carrello = new Carrello();
carrello.aggiungiProdotto({ nome: 'Laptop', prezzo: 1200 });
carrello.aggiungiProdotto({ nome: 'Mouse', prezzo: 25 });
carrello.aggiungiProdotto({ nome: 'Tastiera', prezzo: 50 });

console.log(`Totale carrello: €${carrello.calcolaTotale()}`);

// Pagamento con carta di credito
carrello.setStrategiaPagamento(new PagamentoCartaCredito('Mario Rossi', '1234567890123456', '123', '12/25'));
carrello.checkout();

// Cambio strategia di pagamento
carrello.setStrategiaPagamento(new PagamentoPayPal('mario.rossi@example.com', 'password'));
carrello.checkout();
```

### Command

Il pattern Command incapsula una richiesta come oggetto, permettendo di parametrizzare i client con diverse richieste, accodare o registrare le richieste e supportare operazioni annullabili.

```javascript
// Receiver
class EditorTesto {
  constructor() {
    this.testo = '';
    this.selezionato = '';
    this.clipboard = '';
  }
  
  scrivi(testo) {
    this.testo += testo;
    console.log(`Testo scritto: "${testo}"`);
    console.log(`Testo attuale: "${this.testo}"`);
  }
  
  cancella(lunghezza) {
    const testoRimosso = this.testo.slice(-lunghezza);
    this.testo = this.testo.slice(0, -lunghezza);
    console.log(`Testo cancellato: "${testoRimosso}"`);
    console.log(`Testo attuale: "${this.testo}"`);
    return testoRimosso;
  }
  
  seleziona(inizio, fine) {
    this.selezionato = this.testo.substring(inizio, fine);
    console.log(`Testo selezionato: "${this.selezionato}"`);
    return this.selezionato;
  }
  
  copia() {
    this.clipboard = this.selezionato;
    console.log(`Testo copiato negli appunti: "${this.clipboard}"`);
  }
  
  incolla() {
    if (this.clipboard) {
      this.scrivi(this.clipboard);
    }
  }
}

// Command interface
class Command {
  execute() {
    throw new Error('Metodo execute() deve essere implementato');
  }
  
  undo() {
    throw new Error('Metodo undo() deve essere implementato');
  }
}

// Concrete Commands
class ScriviCommand extends Command {
  constructor(editor, testo) {
    super();
    this.editor = editor;
    this.testo = testo;
  }
  
  execute() {
    this.editor.scrivi(this.testo);
  }
  
  undo() {
    this.editor.cancella(this.testo.length);
  }
}

class CancellaCommand extends Command {
  constructor(editor, lunghezza) {
    super();
    this.editor = editor;
    this.lunghezza = lunghezza;
    this.testoCancellato = '';
  }
  
  execute() {
    this.testoCancellato = this.editor.cancella(this.lunghezza);
  }
  
  undo() {
    this.editor.scrivi(this.testoCancellato);
  }
}

class CopiaIncollaCommand extends Command {
  constructor(editor, inizio, fine) {
    super();
    this.editor = editor;
    this.inizio = inizio;
    this.fine = fine;
    this.lunghezzaIncollata = 0;
  }
  
  execute() {
    this.editor.seleziona(this.inizio, this.fine);
    this.editor.copia();
    this.editor.incolla();
    this.lunghezzaIncollata = this.editor.clipboard.length;
  }
  
  undo() {
    this.editor.cancella(this.lunghezzaIncollata);
  }
}

// Invoker
class EditorInvoker {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  execute(command) {
    // Rimuovi comandi annullati se stiamo eseguendo un nuovo comando dopo un undo
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }
  
  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
    } else {
      console.log('Niente da annullare');
    }
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
    } else {
      console.log('Niente da ripetere');
    }
  }
}

// Utilizzo
const editor = new EditorTesto();
const invoker = new EditorInvoker();

invoker.execute(new ScriviCommand(editor, 'Ciao, '));
invoker.execute(new ScriviCommand(editor, 'mondo!'));
invoker.execute(new CopiaIncollaCommand(editor, 0, 5)); // Copia e incolla "Ciao,"

console.log('\nAnnullamento ultima operazione:');
invoker.undo();

console.log('\nAnnullamento operazione precedente:');
invoker.undo();

console.log('\nRipetizione operazione:');
invoker.redo();
```

## Conclusione

I pattern di progettazione sono strumenti potenti che possono migliorare significativamente la qualità del codice JavaScript. Tuttavia, è importante ricordare che non sono soluzioni universali e dovrebbero essere applicati solo quando appropriato.

Alcuni consigli per l'utilizzo dei pattern di progettazione in JavaScript:

1. **Comprendi il problema prima di applicare un pattern**: Non utilizzare un pattern solo perché è famoso o popolare.
2. **Mantieni la semplicità**: A volte una soluzione semplice è migliore di un pattern complesso.
3. **Considera le peculiarità di JavaScript**: Alcuni pattern tradizionali possono essere implementati in modo più elegante sfruttando le caratteristiche uniche di JavaScript.
4. **Documenta l'uso dei pattern**: Quando utilizzi un pattern, assicurati che altri sviluppatori possano comprendere facilmente la tua implementazione.

Padroneggiare i pattern di progettazione ti permetterà di scrivere codice JavaScript più robusto, manutenibile e scalabile, migliorando la tua efficacia come sviluppatore.

[Torna all'indice](../README.md) | [Argomento precedente: Oggetti Avanzati](./04_Oggetti_Avanzati.md)