
//Hacer una función que tenga un parámetro de entrada que sea un array de strings, el cual se deberá ordenar alfabéticamente y 
//devolver el primer valor que haya separando sus letras con espacios.x

function ordenaAlf(palabras: Array <string>):string[]{
    const abecedario: Array <string> = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    //bucle doble en el que recorra el abecedarrio y el array de palabras

    let ordenado: Array <string> = [];
    let palabra: string = "";

    for (let i = 0; i < abecedario.length; i++){
        for (let j = 0; j < palabras.length; j++){
            if (palabras[j].charAt(0) === abecedario[i]){
                palabra = palabras[j];
                ordenado.push(palabra);
            }
        }
    }

    return ordenado;

}


function separaPalabra (word: string):string{

    let separada:string = "";
    for (let i = 0; i < word.length; i++) {
       
        if (i !== word.length - 1) {
            // introducimos valores en el string separada
            separada = separada.concat(word[i], " ");
        } else separada = separada.concat(word[i]);   
    }

    return separada;
}

//Array de palabras de prueba
const arrayPalabras: Array <string> = ["hola","adios","casa","perro"];


const palabrasOrdenadas: Array <string> = ordenaAlf(arrayPalabras);
console.log(palabrasOrdenadas);

const palabraSeparada: string = separaPalabra(palabrasOrdenadas[0]);
console.log(palabraSeparada);

  