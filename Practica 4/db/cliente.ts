import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../types.ts";

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
{
    nombre: { type: String, required: true },
    dinero: { type: Number, required: true },
    coches: { type: Array, required: true },

},
  { timestamps: true, collection: "clientes" }
);

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;

export default mongoose.model<ClienteModelType>("Cliente", clienteSchema);