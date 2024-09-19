/**
 * c++ array1.c 
 */
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
  int a[10];
  
  //per memorizzare
  for(int i=0;i<10;i++)
  {
      a[i]=i;
  }
  
  //per stampare quanto memorizzato
  for(int i=0;i<10;i++)
  {
      cout<<a[i]<<" ";
  } 
}
