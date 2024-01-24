import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import getClient from "./resolvers/getClient.ts";
import addClient from "./resolvers/addClient.ts";
import addRestaurante from "./resolvers/addRestaurante.ts";
import getRestaurante from "./resolvers/getRestaurante.ts";
import getBooking from "./resolvers/getBooking.ts";
import addBooking from "./resolvers/addBooking.ts";
import deleteBooking from "./resolvers/deleteBooking.ts";
import deleteRestaurante from "./resolvers/deleteRestaurante.ts";
import deleteClient from "./resolvers/deleteClient.ts";
import deleteRestaurantes from "./resolvers/deleteRestaurantes.ts";
import getClients from "./resolvers/getClients.ts";



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
      .get("/getClient/:clienteId/:countrycode/:zipcode", getClient)
      .get("/getClients", getClients)
      .get("/getRestaurante/:restauranteId", getRestaurante)
      .get("/getBooking/:bookingId", getBooking)
      .post("/addClient", addClient)
      .post("/addRestaurante", addRestaurante)
      .post("/addBooking", addBooking)
      .delete("/deleteBooking/:bookingId", deleteBooking)
      .delete("/deleteRestaurante/:restauranteId", deleteRestaurante)
      .delete("/deleteRestaurantes", deleteRestaurantes)
      .delete("/deleteClient/:clientId", deleteClient)
      
      

      


} catch (e) {
  console.error(e);
}

app.listen(3000, () => console.info("Server running on port 3000"));