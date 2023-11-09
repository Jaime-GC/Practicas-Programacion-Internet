import mongoose from "npm:mongoose@7.6.3";
import { Concesionario } from "../types.ts";

const Schema = mongoose.Schema;

const concesionarioSchema = new Schema(
{
    nombre: { type: String, required: true },
    dinero: { type: Number, required: true },
    coches: { type: Array, required: true },
    ventaBloqueada: { type: Boolean, required: true },
},
  { timestamps: true, collection: "concesionarios" }
);

export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">;

export default mongoose.model<ConcesionarioModelType>("Concesionario", concesionarioSchema);
