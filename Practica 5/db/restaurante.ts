import mongoose from "npm:mongoose@7.6.3";
import { Restaurante } from "../types.ts";

const Schema = mongoose.Schema;

const restauranteSchema = new Schema(
{
    name: { type: String, required: true, unique: true },
    CIF: { type: String, required: true, unique: true,
      match: /^[A-Z]\d{7}[A-Z\d]$/ 
    },
    address: { type: String, required: true },
    bookings: { type: Array, required: true },
},
  { timestamps: true, collection: "restaurantes" }
);

export type RestauranteModelType = mongoose.Document & Omit<Restaurante, "id">;

export default mongoose.model<RestauranteModelType>("Restaurante", restauranteSchema);