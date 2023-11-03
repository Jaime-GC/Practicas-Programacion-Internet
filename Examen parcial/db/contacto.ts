import mongoose from "npm:mongoose@7.6.3";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    dni: { type: String, required: true, unique: true },
    nombreApellidos: { type: String, required: true },
    correo: { type: String, required: true },
    codigoPostal: { type: Number, required: true },
    iso: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactoModelType = mongoose.Document & Omit<Contacto, "id">;

export default mongoose.model<ContactoModelType>("Contacto", contactoSchema);
