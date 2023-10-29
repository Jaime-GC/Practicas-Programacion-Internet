const getPageCharacter = async (page: number):Promise<string[]> => {

    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;

    const data = await fetch(url); 

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    const json = await data.json(); 
    

    const characters: string[] = json.results.map((character: any) => {
        return character.name;
    });

    return characters;

}


const getPageLocation = async (page: number):Promise<string[]> => {
    const url = `https://rickandmortyapi.com/api/location/?page=${page}`;

    const data = await fetch(url);

    if (data.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    const json = await data.json();

    const locations: string[] = json.results.map((location: any) => {
        return location.name;
    });

    return locations;

}


export { getPageCharacter, getPageLocation };