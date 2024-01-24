import express, {Request, Response} from "npm:express@4.18.2";
import { getCharacter, Character } from "./character.ts";
import { getLocation, Location } from "./location.ts";
import { getPageCharacter, getPageLocation } from "./page.ts";


//array de personajes
const characters: Character[] = [];
const locations: Location[] = [];

const app = express();


app.get("/", (req: Request, res: Response) => {
    res.send("Introduce en la url despues de /character/ el id del personaje que quieres buscar");
})
.get("/character/:id", async (req: Request, res: Response) => {
    try {
        
        const Id: number = parseInt(req.params.id);

        const exists: Character | undefined = characters.find ((character: Character ) => {
            return character.id === Id;
        });


        if (exists !== undefined) { //si no recibe undefined quiere decir que existe por lo tanto lo envia
            res.send(exists); 
            console.log("existe");
        } else {
            const character = await getCharacter(Id); //si no existe lo busca en la api
            characters.push(character); //lo memetemos en el array
            res.send(character);  //lo enviamos con express
            console.log("no existe");
        }
        
    } 
    catch (e) {
        res.status(500).send("Error 500");
    }   
})

.get("/location/:id", async (req: Request, res: Response) => {
    try {
        
        const Id: number = parseInt(req.params.id);

        const exists: Location | undefined = locations.find ((location: Location ) => {
            return location.id === Id;
        });


        if (exists !== undefined) { //si no recibe undefined quiere decir que existe por lo tanto lo envia
            res.send(exists); 
            console.log("existe");
        } else {
            const location = await getLocation(Id); //si no existe lo busca en la api
            locations.push(location); //lo memetemos en el array
            res.send(location);  //lo enviamos con express
            console.log("no existe");
        }
        
    } 
    catch (e) {
        res.status(500).send("Error 500");
    }   
})


.get("/character/pagina/:page", async (req: Request, res: Response) => {

    try {
        const page: number = parseInt(req.params.page);

        const characters = await getPageCharacter(page);

        res.send(characters);       
        
    } 
    catch (e) {
        res.status(500).send("Error 500");
    }   
})

.get("/location/page/:page", async (req: Request, res: Response) => {
    
        try {            
            const page: number = parseInt(req.params.page);
    
            const locations = await getPageLocation(page);
    
            res.send(locations);
        } 
        catch (e) {
            res.status(500).send("Error 500");
        }   
})

.get("/character/filter/status/:status", (req: Request, res: Response) => {


    const status: string = req.params.status;

    

    const filterStatus = characters.filter((character: Character) => {

        const estado = character.status.toLowerCase();
        
        if (estado === status) { return character;}

    });

    res.send(filterStatus);
})

.get("/character/filter/gender/:gender", (req: Request, res: Response) => {

    const gender: string = req.params.gender;

    const filterGender = characters.filter((character: Character) => {

        const genero =  character.gender.toLowerCase();

        if (genero === gender) { return character;}

    });

    res.send(filterGender);
})

.get("/location/filter/type/:type", (req: Request, res: Response) => {

    const type: string = req.params.type;

    const filterType = locations.filter((location: Location) => {

        const tipo =  location.type.toLowerCase();

        if (tipo === type) { return location;}

    });

    res.send(filterType);
})

.get("/location/filter/dimension/:dimension", (req: Request, res: Response) => {

    const dimension: string = req.params.dimension;

    const filterDimension = locations.filter((location: Location) => {

        const Dimension =  location.dimension.toLowerCase();

        if (Dimension === dimension) { return location;}

    });

    res.send(filterDimension);
})


.get("/character/delete/:id", (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    const index = characters.findIndex((character: Character) => { //busca el indice del personaje que le pasamos en el array de personajes
        return character.id === id;
    });

    characters.splice(index, 1); //splice elimina el personaje del array

    res.send(`Personaje ${id} eliminado`);
})

.get("/location/delete/:id", (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    const index = locations.findIndex((location: Location) => { //busca el indice de la localizacion que le pasamos en el array de localizaciones
        return location.id === id;
    });

    locations.splice(index, 1); //splice elimina la localizacion del array

    res.send(`Localizacion ${id} eliminada`);
})




     


app.listen(3000); 