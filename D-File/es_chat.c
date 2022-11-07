#include <stdio.h>
#include <stdlib.h>

#define NEMAIL 256
#define NMAX 300

typedef struct {
    char email[NEMAIL];
    char tipo;
    int n_accessi;
} partecipante;

int leggi_partecipanti(char *nomefile, partecipante *lista) {
    /* preparo le variabili */
    FILE *fp;
    char s_tipo[2];
    int i;
    partecipante p;

    /* apro il file */
    if((fp = fopen(nomefile, "r")) == NULL) {
        fprintf(stderr, "Impossibile aprire %s\n", nomefile);
        exit(1);
    }

    /* leggo i dati sui partecipanti
     * NOTA: per leggere il tipo uso una stringa, di cui
     * recupererò il primo carattere */
    i = 0;
    while(fscanf(fp, "%s%s%d", p.email, s_tipo, &p.n_accessi) == 3) {
        /* recupero il tipo */
        p.tipo = s_tipo[0];
        /* copio i dati nell'array */
        lista[i++] = p;
    }

    /* chiudo il file */
    fclose(fp);

    /* restituisco il numero di partecipanti letti */
    return i;
}

int main() {
    partecipante lista[NMAX];
    int i, n;

    n = leggi_partecipanti("partecipanti.txt", lista);

    printf("LISTA:\n");
    for(i = 0; i < n; ++i) {
        printf("%s %c %d\n", lista[i].email, lista[i].tipo, lista[i].n_accessi);
    }
}


