import mongoose from "npm:mongoose@8.0.1";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
  },
  { timestamps: true }
);

export type PetModelType = mongoose.Document & Omit<Pet, "id">;

export default mongoose.model<PetModelType>("Pet", petSchema);
