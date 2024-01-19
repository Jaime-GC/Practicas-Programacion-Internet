import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import mongoose from "npm:mongoose@8.0.1";
import express, {Request, Response} from "npm:express@4.18.2";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
}

await mongoose.connect(MONGO_URL);
console.info("Connected to MongoDB");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express funciona correctamente");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});