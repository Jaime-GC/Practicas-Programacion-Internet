
const getPais = async (iso: string):Promise<string> => {
    const BASE_URL = "https://restcountries.com/v3.1/alpha/";    

    const url = `${BASE_URL}/${iso}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data of getPais');
    }

    const json = await data.json(); 
    const nombre: string = json[0].name.common;
    console.log(nombre);



    return nombre;
}

export {getPais};


