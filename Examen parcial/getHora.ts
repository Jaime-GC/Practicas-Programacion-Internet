const getHora = async (ciudad: string):Promise<string> => {
    const BASE_URL = "https://worldtimeapi.org/api/timezone/Europe/";    

    const url = `${BASE_URL}/${ciudad}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data of getHora');
    }

    const json = await data.json(); 
    const hora: string = json.datetime.slice(11, 16);
    console.log("La hora actual es: " + hora);



    return hora;
}

export {getHora};



