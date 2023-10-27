import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMascota from "./resolvers/getMascota.ts";
import addMascota from "./resolvers/addMascota.ts";
import updateMascota from "./resolvers/updateMascota.ts";
import deleteMascota from "./resolvers/deleteMascota.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

//const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

const MONGO_URL = "mongodb+srv://jaime:<12345678>@cluster0.tpucgci.mongodb.net/?retryWrites=true&w=majority";

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/getMascota/:id", getMascota)
  .post("/addMascota", addMascota)
  .put("/updateMascota/:id", updateMascota)
  .delete("/deleteMascota/:id", deleteMascota);

app.listen(3000);
