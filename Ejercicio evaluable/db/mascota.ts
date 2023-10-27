import mongoose from "npm:mongoose@7.6.3";
import { Mascota } from "../types.ts";
import { Animal } from "../types.ts";

const Schema = mongoose.Schema;

const mascotaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
  },
  { timestamps: true }
);

export type MascotaModelType = mongoose.Document & Omit<Mascota, "id">;

export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema);
