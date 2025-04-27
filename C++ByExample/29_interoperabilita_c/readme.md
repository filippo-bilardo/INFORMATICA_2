# Esercitazione 29: Interoperabilità con C

## Obiettivo

L'obiettivo di questa esercitazione è esplorare le tecniche per l'interoperabilità tra C++ e C. Imparerai come integrare codice C in progetti C++ e viceversa, comprendendo le differenze tra i due linguaggi e come superare le sfide di integrazione.

## Argomenti Trattati

- Differenze fondamentali tra C e C++
- Dichiarazione `extern "C"`
- Wrapping di codice C in classi C++
- Gestione della memoria tra C e C++
- Conversione di tipi di dati tra i due linguaggi
- Compilazione e linking di codice misto C/C++

## Esercizi

### Esercizio 1: Utilizzo di Funzioni C in C++

Crea un'interfaccia C++ per una libreria C.

**File C (math_lib.c):**

```c
#include "math_lib.h"
#include <stdlib.h>
#include <math.h>

/* Implementazione di funzioni matematiche in C */
double* create_array(int size) {
    return (double*)malloc(size * sizeof(double));
}

void free_array(double* array) {
    free(array);
}

void fill_array(double* array, int size, double value) {
    for (int i = 0; i < size; i++) {
        array[i] = value;
    }
}

double sum_array(const double* array, int size) {
    double sum = 0.0;
    for (int i = 0; i < size; i++) {
        sum += array[i];
    }
    return sum;
}

double average_array(const double* array, int size) {
    if (size <= 0) return 0.0;
    return sum_array(array, size) / size;
}
```

**Header C (math_lib.h):**

```c
#ifndef MATH_LIB_H
#define MATH_LIB_H

#ifdef __cplusplus
extern "C" {
#endif

/* Funzioni per la gestione di array */
double* create_array(int size);
void free_array(double* array);
void fill_array(double* array, int size, double value);
double sum_array(const double* array, int size);
double average_array(const double* array, int size);

#ifdef __cplusplus
}
#endif

#endif /* MATH_LIB_H */
```

**Wrapper C++ (MathLibWrapper.hpp):**

```cpp
#ifndef MATH_LIB_WRAPPER_HPP
#define MATH_LIB_WRAPPER_HPP

#include <vector>
#include <memory>

extern "C" {
#include "math_lib.h"
}

class MathArray {
private:
    double* m_data;
    int m_size;

public:
    // Costruttore
    MathArray(int size) : m_size(size) {
        m_data = create_array(size);
    }
    
    // Distruttore
    ~MathArray() {
        free_array(m_data);
    }
    
    // Disabilita copia
    MathArray(const MathArray&) = delete;
    MathArray& operator=(const MathArray&) = delete;
    
    // Abilita move
    MathArray(MathArray&& other) noexcept : m_data(other.m_data), m_size(other.m_size) {
        other.m_data = nullptr;
        other.m_size = 0;
    }
    
    MathArray& operator=(MathArray&& other) noexcept {
        if (this != &other) {
            free_array(m_data);
            m_data = other.m_data;
            m_size = other.m_size;
            other.m_data = nullptr;
            other.m_size = 0;
        }
        return *this;
    }
    
    // Metodi wrapper
    void fill(double value) {
        fill_array(m_data, m_size, value);
    }
    
    double sum() const {
        return sum_array(m_data, m_size);
    }
    
    double average() const {
        return average_array(m_data, m_size);
    }
    
    // Accesso agli elementi
    double& operator[](int index) {
        return m_data[index];
    }
    
    const double& operator[](int index) const {
        return m_data[index];
    }
    
    int size() const {
        return m_size;
    }
};

#endif /* MATH_LIB_WRAPPER_HPP */
```

**Programma C++ (main.cpp):**

```cpp
#include <iostream>
#include "MathLibWrapper.hpp"

int main() {
    // Utilizzo della classe wrapper C++
    MathArray array(5);
    array.fill(3.14);
    
    std::cout << "Array riempito con 3.14" << std::endl;
    std::cout << "Somma: " << array.sum() << std::endl;
    std::cout << "Media: " << array.average() << std::endl;
    
    // Modifica di un elemento
    array[2] = 10.0;
    
    std::cout << "\nDopo la modifica dell'elemento 2:" << std::endl;
    for (int i = 0; i < array.size(); ++i) {
        std::cout << "array[" << i << "] = " << array[i] << std::endl;
    }
    
    std::cout << "Nuova somma: " << array.sum() << std::endl;
    std::cout << "Nuova media: " << array.average() << std::endl;
    
    return 0;
}
```

### Esercizio 2: Utilizzo di Classi C++ in C

Esporta funzionalità C++ per l'uso in codice C.

**Classe C++ (Vector3D.hpp):**

```cpp
#ifndef VECTOR3D_HPP
#define VECTOR3D_HPP

#include <cmath>

class Vector3D {
private:
    double x, y, z;

public:
    Vector3D(double x = 0.0, double y = 0.0, double z = 0.0) : x(x), y(y), z(z) {}
    
    double getX() const { return x; }
    double getY() const { return y; }
    double getZ() const { return z; }
    
    void setX(double value) { x = value; }
    void setY(double value) { y = value; }
    void setZ(double value) { z = value; }
    
    double length() const {
        return std::sqrt(x*x + y*y + z*z);
    }
    
    void normalize() {
        double len = length();
        if (len > 0) {
            x /= len;
            y /= len;
            z /= len;
        }
    }
    
    Vector3D operator+(const Vector3D& other) const {
        return Vector3D(x + other.x, y + other.y, z + other.z);
    }
    
    Vector3D operator-(const Vector3D& other) const {
        return Vector3D(x - other.x, y - other.y, z - other.z);
    }
    
    double dot(const Vector3D& other) const {
        return x * other.x + y * other.y + z * other.z;
    }
    
    Vector3D cross(const Vector3D& other) const {
        return Vector3D(
            y * other.z - z * other.y,
            z * other.x - x * other.z,
            x * other.y - y * other.x
        );
    }
};

#endif /* VECTOR3D_HPP */
```

**Interfaccia C (vector3d_c_api.h):**

```c
#ifndef VECTOR3D_C_API_H
#define VECTOR3D_C_API_H

#ifdef __cplusplus
extern "C" {
#endif

/* Tipo opaco per il vettore 3D */
typedef struct Vector3D_C Vector3D_C;

/* Funzioni di creazione e distruzione */
Vector3D_C* Vector3D_create(double x, double y, double z);
void Vector3D_destroy(Vector3D_C* vec);

/* Funzioni di accesso */
double Vector3D_getX(const Vector3D_C* vec);
double Vector3D_getY(const Vector3D_C* vec);
double Vector3D_getZ(const Vector3D_C* vec);

void Vector3D_setX(Vector3D_C* vec, double value);
void Vector3D_setY(Vector3D_C* vec, double value);
void Vector3D_setZ(Vector3D_C* vec, double value);

/* Operazioni */
double Vector3D_length(const Vector3D_C* vec);
void Vector3D_normalize(Vector3D_C* vec);
Vector3D_C* Vector3D_add(const Vector3D_C* vec1, const Vector3D_C* vec2);
Vector3D_C* Vector3D_subtract(const Vector3D_C* vec1, const Vector3D_C* vec2);
double Vector3D_dot(const Vector3D_C* vec1, const Vector3D_C* vec2);
Vector3D_C* Vector3D_cross(const Vector3D_C* vec1, const Vector3D_C* vec2);

#ifdef __cplusplus
}
#endif

#endif /* VECTOR3D_C_API_H */
```

**Implementazione C++ dell'API C (vector3d_c_api.cpp):**

```cpp
#include "vector3d_c_api.h"
#include "Vector3D.hpp"

// Definizione del tipo opaco
struct Vector3D_C {
    Vector3D cpp_vector;
};

// Implementazione delle funzioni C
Vector3D_C* Vector3D_create(double x, double y, double z) {
    Vector3D_C* result = new Vector3D_C();
    result->cpp_vector = Vector3D(x, y, z);
    return result;
}

void Vector3D_destroy(Vector3D_C* vec) {
    delete vec;
}

double Vector3D_getX(const Vector3D_C* vec) {
    return vec->cpp_vector.getX();
}

double Vector3D_getY(const Vector3D_C* vec) {
    return vec->cpp_vector.getY();
}

double Vector3D_getZ(const Vector3D_C* vec) {
    return vec->cpp_vector.getZ();
}

void Vector3D_setX(Vector3D_C* vec, double value) {
    vec->cpp_vector.setX(value);
}

void Vector3D_setY(Vector3D_C* vec, double value) {
    vec->cpp_vector.setY(value);
}

void Vector3D_setZ(Vector3D_C* vec, double value) {
    vec->cpp_vector.setZ(value);
}

double Vector3D_length(const Vector3D_C* vec) {
    return vec->cpp_vector.length();
}

void Vector3D_normalize(Vector3D_C* vec) {
    vec->cpp_vector.normalize();
}

Vector3D_C* Vector3D_add(const Vector3D_C* vec1, const Vector3D_C* vec2) {
    Vector3D_C* result = new Vector3D_C();
    result->cpp_vector = vec1->cpp_vector + vec2->cpp_vector;
    return result;
}

Vector3D_C* Vector3D_subtract(const Vector3D_C* vec1, const Vector3D_C* vec2) {
    Vector3D_C* result = new Vector3D_C();
    result->cpp_vector = vec1->cpp_vector - vec2->cpp_vector;
    return result;
}

double Vector3D_dot(const Vector3D_C* vec1, const Vector3D_C* vec2) {
    return vec1->cpp_vector.dot(vec2->cpp_vector);
}

Vector3D_C* Vector3D_cross(const Vector3D_C* vec1, const Vector3D_C* vec2) {
    Vector3D_C* result = new Vector3D_C();
    result->cpp_vector = vec1->cpp_vector.cross(vec2->cpp_vector);
    return result;
}
```

**Programma C (main.c):**

```c
#include <stdio.h>
#include "vector3d_c_api.h"

int main() {
    // Creazione di vettori
    Vector3D_C* v1 = Vector3D_create(1.0, 2.0, 3.0);
    Vector3D_C* v2 = Vector3D_create(4.0, 5.0, 6.0);
    
    printf("Vettore v1: (%.2f, %.2f, %.2f)\n", 
           Vector3D_getX(v1), Vector3D_getY(v1), Vector3D_getZ(v1));
    printf("Vettore v2: (%.2f, %.2f, %.2f)\n", 
           Vector3D_getX(v2), Vector3D_getY(v2), Vector3D_getZ(v2));
    
    // Calcolo della lunghezza
    printf("Lunghezza v1: %.2f\n", Vector3D_length(v1));
    
    // Normalizzazione
    Vector3D_normalize(v1);
    printf("v1 normalizzato: (%.2f, %.2f, %.2f)\n", 
           Vector3D_getX(v1), Vector3D_getY(v1), Vector3D_getZ(v1));
    
    // Operazioni vettoriali
    Vector3D_C* sum = Vector3D_add(v1, v2);
    printf("v1 + v2: (%.2f, %.2f, %.2f)\n", 
           Vector3D_getX(sum), Vector3D_getY(sum), Vector3D_getZ(sum));
    
    double dot_product = Vector3D_dot(v1, v2);
    printf("Prodotto scalare v1 · v2: %.2f\n", dot_product);
    
    Vector3D_C* cross_product = Vector3D_cross(v1, v2);
    printf("Prodotto vettoriale v1 × v2: (%.2f, %.2f, %.2f)\n", 
           Vector3D_getX(cross_product), Vector3D_getY(cross_product), Vector3D_getZ(cross_product));
    
    // Pulizia della memoria
    Vector3D_destroy(v1);
    Vector3D_destroy(v2);
    Vector3D_destroy(sum);
    Vector3D_destroy(cross_product);
    
    return 0;
}
```

## Approfondimenti

- [Differenze tra C e C++](teoria/differenze_c_cpp.md)
- [Tecniche di Interoperabilità](teoria/tecniche_interoperabilita.md)
- [Gestione della Memoria tra C e C++](teoria/gestione_memoria_c_cpp.md)
- [Compilazione e Linking di Codice Misto](teoria/compilazione_linking_misto.md)

## Risorse Aggiuntive

- [C++ and C Interoperability](https://isocpp.org/wiki/faq/mixing-c-and-cpp)
- [Interfacing C++ With C](https://www.drdobbs.com/cpp/interfacing-c-with-c/184403768)
- [Mixing C and C++ Code in the Same Program](https://www.oracle.com/technical-resources/articles/it-infrastructure/mixing-c-and-cplusplus.html)