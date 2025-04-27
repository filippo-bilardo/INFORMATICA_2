# Operatori Bit a Bit in C++

In questa guida, esploreremo gli operatori bit a bit disponibili in C++ e come utilizzarli per manipolare i singoli bit all'interno dei valori interi.

## Cos'è un Operatore Bit a Bit?

Gli operatori bit a bit lavorano sui singoli bit che compongono un valore intero. Questi operatori sono particolarmente utili per:
- Manipolazione di flag e stati
- Ottimizzazione di memoria
- Operazioni a basso livello
- Algoritmi crittografici

## Rappresentazione Binaria

Per comprendere gli operatori bit a bit, è importante capire come i numeri sono rappresentati in formato binario. Ad esempio, il numero decimale 42 in binario è rappresentato come:

```
42 (decimale) = 00101010 (binario)
```

Ogni posizione rappresenta una potenza di 2, da destra a sinistra: 2^0, 2^1, 2^2, ecc.

## Operatori Bit a Bit Disponibili

C++ fornisce i seguenti operatori bit a bit:

| Operatore | Nome | Descrizione |
|-----------|------|-------------|
| `&` | AND bit a bit | Restituisce 1 se entrambi i bit sono 1 |
| `\|` | OR bit a bit | Restituisce 1 se almeno uno dei bit è 1 |
| `^` | XOR bit a bit | Restituisce 1 se i bit sono diversi |
| `~` | NOT bit a bit | Inverte tutti i bit (complemento a uno) |
| `<<` | Shift a sinistra | Sposta i bit a sinistra |
| `>>` | Shift a destra | Sposta i bit a destra |

### AND Bit a Bit (`&`)

L'operatore AND bit a bit confronta ciascuna coppia di bit e restituisce 1 solo se entrambi i bit sono 1.

```cpp
int a = 12;  // 1100 in binario
int b = 10;  // 1010 in binario
int c = a & b;  // 1000 in binario = 8 in decimale
```

Tabella di verità per AND bit a bit:

| Bit A | Bit B | A & B |
|-------|-------|-------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

#### Casi d'uso comuni:
- Mascheramento di bit (isolare specifici bit)
- Verificare se un bit è impostato
- Azzerare specifici bit

```cpp
// Verificare se un numero è pari (il bit meno significativo è 0)
bool isPari = ((numero & 1) == 0);

// Isolare i 4 bit meno significativi
int ultimi4Bit = numero & 0x0F;  // 0x0F = 00001111 in binario
```

### OR Bit a Bit (`|`)

L'operatore OR bit a bit confronta ciascuna coppia di bit e restituisce 1 se almeno uno dei bit è 1.

```cpp
int a = 12;  // 1100 in binario
int b = 10;  // 1010 in binario
int c = a | b;  // 1110 in binario = 14 in decimale
```

Tabella di verità per OR bit a bit:

| Bit A | Bit B | A \| B |
|-------|-------|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

#### Casi d'uso comuni:
- Impostare specifici bit
- Combinare flag
- Unire set di bit

```cpp
// Impostare il terzo bit (posizione 2, contando da 0)
int risultato = numero | (1 << 2);  // Imposta il bit in posizione 2

// Combinare flag
int opzioni = FLAG_LETTURA | FLAG_SCRITTURA;  // Attiva entrambi i flag
```

### XOR Bit a Bit (`^`)

L'operatore XOR (OR esclusivo) bit a bit confronta ciascuna coppia di bit e restituisce 1 solo se i bit sono diversi.

```cpp
int a = 12;  // 1100 in binario
int b = 10;  // 1010 in binario
int c = a ^ b;  // 0110 in binario = 6 in decimale
```

Tabella di verità per XOR bit a bit:

| Bit A | Bit B | A ^ B |
|-------|-------|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### Casi d'uso comuni:
- Invertire specifici bit
- Semplici algoritmi di crittografia
- Calcolo di parità
- Scambio di valori senza variabile temporanea

```cpp
// Invertire il quarto bit (posizione 3, contando da 0)
int risultato = numero ^ (1 << 3);

// Scambio di valori senza variabile temporanea
a = a ^ b;
b = a ^ b;  // b diventa il valore originale di a
a = a ^ b;  // a diventa il valore originale di b
```

### NOT Bit a Bit (`~`)

L'operatore NOT bit a bit inverte tutti i bit di un valore (complemento a uno).

```cpp
int a = 12;  // 00001100 in binario (assumendo int a 8 bit per semplicità)
int b = ~a;  // 11110011 in binario = -13 in decimale (con complemento a due)
```

Tabella di verità per NOT bit a bit:

| Bit A | ~A |
|-------|----|
| 0 | 1 |
| 1 | 0 |

#### Casi d'uso comuni:
- Invertire tutti i bit
- Creare maschere di bit complementari

```cpp
// Creare una maschera che ha tutti i bit a 1 tranne i 4 bit meno significativi
int maschera = ~0x0F;  // ~00001111 = 11110000
```

### Shift a Sinistra (`<<`)

L'operatore di shift a sinistra sposta tutti i bit verso sinistra del numero specificato di posizioni. I bit vuoti a destra vengono riempiti con zeri.

```cpp
int a = 5;    // 00000101 in binario
int b = a << 2;  // 00010100 in binario = 20 in decimale
```

#### Casi d'uso comuni:
- Moltiplicazione rapida per potenze di 2
- Creazione di maschere di bit
- Impostazione di bit specifici

```cpp
// Moltiplicare per 4 (2^2)
int risultato = numero << 2;  // Equivalente a numero * 4

// Creare una maschera con un bit in una posizione specifica
int maschera = 1 << posizione;
```

### Shift a Destra (`>>`)

L'operatore di shift a destra sposta tutti i bit verso destra del numero specificato di posizioni. Per i tipi senza segno, i bit vuoti a sinistra vengono riempiti con zeri. Per i tipi con segno, il comportamento dipende dall'implementazione (può essere aritmetico o logico).

```cpp
unsigned int a = 20;  // 00010100 in binario
unsigned int b = a >> 2;  // 00000101 in binario = 5 in decimale
```

#### Casi d'uso comuni:
- Divisione rapida per potenze di 2
- Estrazione di bit specifici

```cpp
// Dividere per 4 (2^2)
int risultato = numero >> 2;  // Approssimazione di numero / 4

// Estrarre il bit in una posizione specifica
bool bitValue = (numero >> posizione) & 1;
```

## Operatori di Assegnazione Bit a Bit

Come per gli operatori aritmetici, C++ fornisce operatori di assegnazione composti per gli operatori bit a bit:

| Operatore | Equivalente a | Esempio |
|-----------|---------------|--------|
| `&=` | `a = a & b` | `a &= b` |
| `\|=` | `a = a \| b` | `a \|= b` |
| `^=` | `a = a ^ b` | `a ^= b` |
| `<<=` | `a = a << b` | `a <<= b` |
| `>>=` | `a = a >> b` | `a >>= b` |

```cpp
int flags = 0;
flags |= 0x01;  // Imposta il primo bit
flags |= 0x04;  // Imposta il terzo bit
flags &= ~0x01;  // Cancella il primo bit
```

## Esempi Pratici

### Utilizzo di Flag Bit

```cpp
// Definizione di flag come costanti
const unsigned char FLAG_READ = 0x01;    // 00000001
const unsigned char FLAG_WRITE = 0x02;   // 00000010
const unsigned char FLAG_EXECUTE = 0x04; // 00000100

// Impostazione di flag
unsigned char permissions = 0;
permissions |= FLAG_READ;    // Aggiunge permesso di lettura
permissions |= FLAG_WRITE;   // Aggiunge permesso di scrittura

// Verifica di flag
if (permissions & FLAG_READ) {
    std::cout << "Permesso di lettura attivo" << std::endl;
}

// Rimozione di flag
permissions &= ~FLAG_WRITE;  // Rimuove permesso di scrittura

// Inversione di flag
permissions ^= FLAG_EXECUTE;  // Inverte lo stato del permesso di esecuzione
```

### Manipolazione di Colori RGB

```cpp
// Rappresentazione di un colore RGB in un singolo intero a 32 bit
// Formato: 0x00RRGGBB
unsigned int colore = 0;

// Impostazione dei componenti
unsigned char rosso = 255;
unsigned char verde = 128;
unsigned char blu = 64;

colore = (rosso << 16) | (verde << 8) | blu;

// Estrazione dei componenti
unsigned char r = (colore >> 16) & 0xFF;
unsigned char g = (colore >> 8) & 0xFF;
unsigned char b = colore & 0xFF;
```

## Best Practices

1. **Usa Costanti per Chiarezza**: Definisci costanti con nomi significativi per le maschere di bit e i flag.

2. **Commenta le Operazioni Complesse**: Le operazioni bit a bit possono essere difficili da comprendere a prima vista, quindi è utile commentarle.

3. **Attenzione ai Tipi con Segno**: Gli operatori di shift su tipi con segno possono comportarsi in modo diverso su piattaforme diverse.

4. **Considera la Portabilità**: La dimensione dei tipi interi può variare tra piattaforme diverse, influenzando il comportamento degli operatori bit a bit.

5. **Usa Parentesi per Chiarezza**: Le operazioni bit a bit hanno precedenze diverse, quindi usa le parentesi per rendere chiaro l'ordine delle operazioni.

## Domande di Autovalutazione

1. Qual è la differenza tra gli operatori OR (`|`) e XOR (`^`) bit a bit?
2. Come si può utilizzare l'operatore AND bit a bit per verificare se un numero è pari o dispari?
3. Perché lo shift a sinistra di n posizioni equivale a moltiplicare per 2^n?
4. Come si può impostare, cancellare e invertire un bit specifico in una posizione data?
5. Quali sono i vantaggi dell'utilizzo degli operatori bit a bit rispetto ad altre operazioni?

## Esercizi Proposti

1. Scrivi una funzione che conti il numero di bit impostati a 1 in un intero (noto come "population count" o "Hamming weight").
2. Implementa un insieme di funzioni per manipolare singoli bit: impostare, cancellare, invertire e verificare un bit in una posizione specifica.
3. Crea un programma che utilizzi operatori bit a bit per codificare e decodificare un messaggio semplice (cifrario XOR).
4. Scrivi una funzione che determini se un numero è una potenza di 2 utilizzando una singola operazione bit a bit.