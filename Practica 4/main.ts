import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import addCoche from "./resolvers/addCoche.ts";
import addConcesionario from "./resolvers/addConcesionario.ts";
import addCliente from "./resolvers/addCliente.ts";
import addCocheToConcesionario from "./resolvers/addCocheToConcesionario.ts";
import getCochesConcesionario from "./resolvers/getCochesConcesionario.ts";
import deleteCocheConcesionario from "./resolvers/deleteCocheConcesionario.ts";
import addCocheToCliente from "./resolvers/addCocheToCliente.ts";
import getCochesCliente from "./resolvers/getCochesCliente.ts";
import deleteCocheCliente from "./resolvers/deleteCocheCliente.ts";
import moverCocheClienteCliente from "./resolvers/moverCocheClienteCliente.ts";
import addDineroCliente from "./resolvers/addDineroCliente.ts";
import blockSellConcesionario from "./resolvers/blockSellConcesionario.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  
}



//sistema en el que si tu introduces un id como "1" te lo cambia a "000000000000000000000001"
function formatId(id: number | string): string {
    const idString = id.toString();
    const cerosNecesarios = 24 - idString.length;
    const formattedId = '0'.repeat(cerosNecesarios) + idString;
    //console.log("El numero inicial era: " + idString + " y despues de haber sido transformado es:" + formattedId);
    return formattedId;
  }

export default formatId;


const app = express();

try {
    await mongoose.connect(MONGO_URL);
    console.info("Connected to MongoDB");

    app.use(express.json());


    app.get("/test", (req: Request, res: Response) => {
        res.send("Express funciona correctamente");
    })  
        .post("/addCoche", addCoche)
        .post("/addCliente", addCliente)
        .post("/addConcesionario", addConcesionario)
        .post("/addCocheToConcesionario", addCocheToConcesionario)
        .get("/getCochesConcesionario/:concesionarioId", getCochesConcesionario)
        .delete("/deleteCocheConcesionario/:concesionarioId/:cocheId", deleteCocheConcesionario)
        .post("/addCocheToCliente/:concesionarioId/:cocheId/:clienteId", addCocheToCliente)
        .get("/getCochesCliente/:clienteId", getCochesCliente)
        .delete("/deleteCocheCliente/:clienteId/:cocheId", deleteCocheCliente)
        .post("/moverCocheClienteCliente/:clienteOrigenId/:clienteDestinoId/:cocheId", moverCocheClienteCliente)
        .put("/addDineroCliente/:clienteId/:cantidad", addDineroCliente)
        .put("/blockSellConcesionario/:concesionarioId", blockSellConcesionario)


} catch (e) {
    console.error(e);
}

app.listen(3000, () => console.info("Server running on port 3000"));