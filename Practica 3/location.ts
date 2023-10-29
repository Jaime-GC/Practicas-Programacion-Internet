type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
}

const getLocation = async (id: number):Promise<Location> => {
    const BASE_URL = "https://rickandmortyapi.com/api/location";    

    const url = `${BASE_URL}/${id}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    const json = await data.json(); 
    const location: Location = {
        id: json.id,
        name: json.name,
        type: json.type,
        dimension: json.dimension,
        created: json.created.substring(0,10)
    }

    return location;

}

export { getLocation, Location };

