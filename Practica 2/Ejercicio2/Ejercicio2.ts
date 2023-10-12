
type Pokemon = {
    nombre: string,
    tipo: string,
    id: number
};

const fetchData = async (pokemonNom: string): Promise<Pokemon | undefined> => {
    try {
        const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
        const url = `${baseUrl}/${pokemonNom}`;
        const response = await fetch(url);

        if (response.status === 404) {
            console.log("Pokemon no encontrado");
            return undefined;
        }

        const dataJson = await response.json();

       
        const pokemon: Pokemon = {
            nombre: dataJson.name,
            tipo: dataJson.types[0].type.name,
            id: dataJson.id
        };

        return pokemon;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const pokemonNom: string | null = prompt("Introduce el nombre del Pokémon: ");

if (pokemonNom !== null) {
    console.log(await fetchData(pokemonNom));
} else {
    console.log("No has introducido nada");
}


export { }; 

