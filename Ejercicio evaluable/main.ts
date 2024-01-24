import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMascota from "./resolvers/getMascota.ts";
import addMascota from "./resolvers/addMascota.ts";
import updateMascota from "./resolvers/updateMascota.ts";
import deleteMascota from "./resolvers/deleteMascota.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");


if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}


    //sistema en el que si tu introduces un id como "1" te lo cambia a "000000000000000000000001"
    function formatId(id: number | string): string {
      const idString = id.toString();
      const zerosNeeded = 24 - idString.length;
      const formattedId = '0'.repeat(zerosNeeded) + idString;
      //console.log("El numero inicial era: " + idString + " y despues de haber sido transformado es:" + formattedId);
      return formattedId;
    }

    export default formatId;


const app = express();

try {
  await mongoose.connect(MONGO_URL);
  console.info("Connected to MongoDB");

  
  app.use(express.json());

  app.get("/test", (req: Request, res: Response) =>  res.send("Hello world"))
  .get("/getMascota/:id", getMascota)
  .post("/addMascota", addMascota)
  .put("/updateMascota/:id", updateMascota)
  .delete("/deleteMascota/:id", deleteMascota);

} catch (e) {
  console.error(e);
}




  

app.listen(3000, () => console.info("Server running on port 3000"));
