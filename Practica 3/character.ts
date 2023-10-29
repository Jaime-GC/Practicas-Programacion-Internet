type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: Origin;
    location: Location;
    created: string;
}

type Location = {
    name: string;
}

type Origin = {
    name: string;
}



const getCharacter = async (id: number):Promise<Character> => {
    const BASE_URL = "https://rickandmortyapi.com/api/character";    

    const url = `${BASE_URL}/${id}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    const json = await data.json(); 
    const character: Character = {
        id: json.id,
        name: json.name,
        status: json.status,
        species: json.species,
        gender: json.gender,
        origin: json.origin.name,
        location: json.location.name,
        created: json.created.substring(0,10)
    }


    return character;
}





export { getCharacter, Character };
