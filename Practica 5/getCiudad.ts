
const getCiudad = async (iso: string, zipcode: string):Promise<string> => {
    const BASE_URL = "https://zip-api.eu/api/v1/info";  
    
    const dir: string = iso + "-" + zipcode;

    console.log(dir);

    

    const url = `${BASE_URL}/${dir}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    const json = await data.json(); 
    const nombre: string = json.place_name;
    console.log(nombre);



    return nombre;
}

//console.log(await getCiudad("ES", "28001"));
export {getCiudad};


