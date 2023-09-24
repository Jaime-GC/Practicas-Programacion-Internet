//Hacer una función que tenga por parámetro de entrada un numero y devuelva un array. 
//Dicho array deberá contener un listado de todos los números que sean múltiplos de 3 o de 5 que haya desde el 0 hasta el parámetro de entrada, 
//en caso de que sea múltiplo de ambos solo aparecerá una vez


const Mult = (num: number): Array <number> => {

    const multiplos: Array <number> = [];

    let existen: boolean = false;

    for (let i = 0; i <= num; i++){
        if (i % 3 === 0 || i % 5 === 0){

            multiplos.forEach((elem: number, index: number) => {
                if (i === elem){
                    existen = true;
                }
                else existen = false;
                
            });
            
            if (!existen) {
                multiplos.push(i);
            }

            
        } 
    }
    return  multiplos;
}



console.log(Mult(50));