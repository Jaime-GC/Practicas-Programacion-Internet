//Quicksort recursivo
const numeros = [8,1,5,14,4,15,12,6,2,11,10,7,9]; 


const QuickSort = (arr: number[]): number[] => {
    
    //Si el array tiene un elemento o menos devolvemos el array (Condicion de salida del bucle recursivo)
    if (arr.length <= 1 ){
        return arr;
    }
    
    //Establecemeos el pivote como el primer elemento del array
    const pivote = arr[0];

    //Creamos dos arrays, uno con los elementos menores que el pivote y otro con los mayores
    const izqTemp: Array <number> = arr.filter((num) => num < pivote);
    const derTemp: Array <number> = arr.filter((num) => num > pivote);
 
    const izqOrdenado: Array <number> = QuickSort(izqTemp);
    const derOrdenado: Array <number> = QuickSort(derTemp);

    //Creamos un array que se llama ordenado en el que juntaremos el array izquierdo el pivote y el array derecho 
    const ordenado: Array <number> = [];

    for (let i = 0; i < izqOrdenado.length; i++){
        ordenado.push(izqOrdenado[i]);
    }
    
    ordenado.push(pivote);

    for (let i = 0; i < derOrdenado.length; i++){
        ordenado.push(derOrdenado[i]);
    }

    return ordenado;

}



console.log(QuickSort(numeros));


