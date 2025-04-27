# Future e Promise in C++

## Introduzione

Le classi `std::future` e `std::promise` sono componenti della libreria di concorrenza C++ che forniscono un meccanismo per accedere in modo asincrono ai risultati di operazioni eseguite in thread separati. Questi strumenti offrono un'astrazione di alto livello per la comunicazione tra thread, focalizzandosi sul risultato dell'operazione piuttosto che sui dettagli di sincronizzazione.

Questi componenti sono definiti nella header `<future>`.

## std::future

Un oggetto `std::future` rappresenta un risultato che sarà disponibile in futuro. È un modo per recuperare il valore restituito da un'operazione asincrona.

Caratteristiche principali:

- Fornisce un meccanismo per accedere al risultato di un'operazione asincrona
- Permette di verificare se il risultato è disponibile
- Consente di attendere il completamento dell'operazione
- Può propagare le eccezioni dal thread produttore al thread consumatore

## std::promise

Un oggetto `std::promise` è il complemento di `std::future`. Rappresenta il "lato produttore" di un risultato asincrono, permettendo di impostare il valore che sarà recuperato tramite il corrispondente `std::future`.

Caratteristiche principali:

- Permette di impostare un valore o un'eccezione che sarà recuperata tramite `std::future`
- Può essere utilizzato per comunicare il completamento di un'operazione
- Fornisce un canale di comunicazione unidirezionale tra thread

## Utilizzo Base di Future e Promise

```cpp
#include <iostream>
#include <future>
#include <thread>

void calculate(std::promise<int> promise) {
    // Simula un calcolo complesso
    std::this_thread::sleep_for(std::chrono::seconds(2));
    
    // Imposta il risultato nella promise
    promise.set_value(42);
}

int main() {
    // Crea una promise
    std::promise<int> promise;
    
    // Ottiene il future associato alla promise
    std::future<int> future = promise.get_future();
    
    // Avvia un thread che eseguirà il calcolo
    std::thread t(calculate, std::move(promise));
    
    // Fa qualcos'altro mentre il calcolo è in corso
    std::cout << "In attesa del risultato..." << std::endl;
    
    // Attende e recupera il risultato
    int result = future.get();
    std::cout << "Risultato: " << result << std::endl;
    
    // Attende il completamento del thread
    t.join();
    
    return 0;
}
```

In questo esempio:

1. Creiamo una `promise<int>` e otteniamo il suo `future<int>` associato
2. Passiamo la promise a un thread che eseguirà un calcolo
3. Il thread principale continua l'esecuzione e poi attende il risultato chiamando `future.get()`
4. Il thread di calcolo imposta il risultato chiamando `promise.set_value()`
5. Quando il risultato è disponibile, `future.get()` restituisce il valore e il thread principale può continuare

## Metodi Principali di std::future

### get

```cpp
T get();
```

Recupera il valore dal future. Se il valore non è ancora disponibile, blocca il thread corrente fino a quando non lo diventa. Può essere chiamato una sola volta per ogni future.

### wait

```cpp
void wait() const;
```

Attende che il risultato diventi disponibile senza recuperarlo.

### wait_for e wait_until

```cpp
template <class Rep, class Period>
future_status wait_for(const std::chrono::duration<Rep, Period>& rel_time) const;

template <class Clock, class Duration>
future_status wait_until(const std::chrono::time_point<Clock, Duration>& abs_time) const;
```

Attendono il risultato con un timeout, restituendo uno stato che indica se il risultato è disponibile.

### valid

```cpp
bool valid() const;
```

Verifica se il future è valido, cioè se è associato a un risultato che non è ancora stato recuperato.

## Metodi Principali di std::promise

### set_value

```cpp
void set_value(const T& value);
void set_value(T&& value);
```

Imposta il valore che sarà recuperato dal future associato.

### set_exception

```cpp
void set_exception(std::exception_ptr p);
```

Imposta un'eccezione che sarà lanciata quando il future associato chiamerà `get()`.

### get_future

```cpp
std::future<T> get_future();
```

Restituisce il future associato alla promise. Può essere chiamato una sola volta.

## Gestione delle Eccezioni

Uno dei vantaggi di future e promise è la possibilità di propagare le eccezioni tra thread:

```cpp
#include <iostream>
#include <future>
#include <thread>
#include <stdexcept>

void calculate(std::promise<int> promise) {
    try {
        // Simula un errore
        throw std::runtime_error("Errore durante il calcolo");
    } catch (...) {
        // Cattura l'eccezione e la imposta nella promise
        promise.set_exception(std::current_exception());
    }
}

int main() {
    std::promise<int> promise;
    std::future<int> future = promise.get_future();
    
    std::thread t(calculate, std::move(promise));
    
    try {
        // Tenta di recuperare il risultato
        int result = future.get();
        std::cout << "Risultato: " << result << std::endl;
    } catch (const std::exception& e) {
        // Cattura l'eccezione propagata dal thread
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    t.join();
    
    return 0;
}
```

In questo esempio, un'eccezione lanciata nel thread di calcolo viene propagata al thread principale tramite il meccanismo future/promise.

## std::shared_future

A differenza di `std::future`, che può essere utilizzato una sola volta per recuperare un risultato, `std::shared_future` permette a più thread di attendere e recuperare lo stesso risultato:

```cpp
#include <iostream>
#include <future>
#include <thread>
#include <vector>

void wait_for_result(std::shared_future<int> future, int id) {
    std::cout << "Thread " << id << " in attesa del risultato..." << std::endl;
    int result = future.get(); // Più thread possono chiamare get()
    std::cout << "Thread " << id << " ha ricevuto il risultato: " << result << std::endl;
}

int main() {
    std::promise<int> promise;
    std::shared_future<int> shared_future = promise.get_future().share();
    
    std::vector<std::thread> threads;
    for (int i = 0; i < 5; ++i) {
        threads.push_back(std::thread(wait_for_result, shared_future, i));
    }
    
    std::cout << "Impostazione del risultato..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));
    promise.set_value(42);
    
    for (auto& t : threads) {
        t.join();
    }
    
    return 0;
}
```

In questo esempio, cinque thread attendono lo stesso risultato utilizzando un `shared_future`.

## std::packaged_task

`std::packaged_task` è un wrapper che incapsula una funzione callable e permette di recuperare il suo risultato tramite un future:

```cpp
#include <iostream>
#include <future>
#include <thread>

int calculate(int a, int b) {
    std::this_thread::sleep_for(std::chrono::seconds(1));
    return a + b;
}

int main() {
    // Crea un packaged_task che incapsula la funzione calculate
    std::packaged_task<int(int, int)> task(calculate);
    
    // Ottiene il future associato al task
    std::future<int> future = task.get_future();
    
    // Avvia un thread che eseguirà il task
    std::thread t(std::move(task), 10, 20);
    
    // Attende e recupera il risultato
    int result = future.get();
    std::cout << "Risultato: " << result << std::endl;
    
    t.join();
    
    return 0;
}
```

`std::packaged_task` è particolarmente utile quando si vuole eseguire una funzione in modo asincrono e recuperare il suo risultato in un secondo momento.

## Best Practices

1. **Usa std::move per le promise**: Le promise non sono copiabili, quindi usa `std::move` quando le passi a una funzione o a un thread.
2. **Gestisci sempre le eccezioni**: Assicurati di gestire le eccezioni sia nel thread produttore che nel thread consumatore.
3. **Verifica la validità del future**: Prima di chiamare `get()`, verifica che il future sia valido con `valid()`.
4. **Usa shared_future per risultati condivisi**: Se più thread devono accedere allo stesso risultato, usa `std::shared_future`.
5. **Considera alternative più semplici**: Per casi semplici, considera l'uso di `std::async` che gestisce automaticamente future e promise.

## Esercizi Proposti

1. **Calcolo Parallelo**: Implementa un programma che calcola la somma di un grande array dividendo il lavoro tra più thread e raccogliendo i risultati parziali usando future e promise.
2. **Task Pipeline**: Crea una pipeline di elaborazione dove ogni stage è eseguito in un thread separato e i risultati sono passati da uno stage all'altro usando future e promise.
3. **Web Crawler**: Implementa un semplice web crawler che scarica pagine in parallelo e utilizza future per gestire i risultati delle richieste HTTP.
4. **Timeout Handling**: Scrivi un programma che esegue un'operazione con un timeout, utilizzando `wait_for` per interrompere l'attesa se l'operazione impiega troppo tempo.

## Domande di Autovalutazione

1. Qual è la differenza principale tra `std::future` e `std::shared_future`?
2. Cosa succede se chiami `get()` su un future più di una volta?
3. Come puoi propagare un'eccezione da un thread a un altro usando future e promise?
4. In quali situazioni è preferibile usare `std::packaged_task` rispetto a una combinazione di future e promise?
5. Come puoi implementare un timeout quando attendi il risultato di un'operazione asincrona?

## Conclusione

Future e promise forniscono un potente meccanismo per la comunicazione asincrona tra thread, focalizzandosi sul risultato dell'operazione piuttosto che sui dettagli di sincronizzazione. Sono particolarmente utili quando si desidera eseguire operazioni in background e recuperare i risultati in un secondo momento, gestendo in modo elegante anche le eccezioni.

Nella prossima sezione, esploreremo `std::async` e gli algoritmi paralleli, che offrono un'astrazione ancora più alta per l'esecuzione di codice in parallelo.