import express, {Request, Response} from "npm:express@4.18.2";
import { getCharacter, Character } from "./character.ts";


//array de personajes
const characters: Character[] = [];

const app = express();


app.get("/", (req: Request, res: Response) => {
    res.send("Introduce en la url despues de /character/ el id del personaje que quieres buscar");
})
.get("/character/:id", async (req: Request, res: Response) => {
    try {
        
        const Id: number = parseInt(req.params.id);

        console.log(characters);

        let exists: Character | undefined = characters.find ((character: Character ) => {
            return character.id === Id;
        });

        

        //mostrar contenido de Exists
        console.log(exists);

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
});




     


app.listen(3000); 