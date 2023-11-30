import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../types.ts";
import RestauranteModel from "../db/restaurante.ts";
import BookingModel from "./booking.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
      type: String, required: true, unique: true,
      match: /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/, // Email con un formato válido
    },
    phoneNumber: { 
      type: String, required: true, unique: true,
      match: /^\d{9}$/, // Número de teléfono con 9 dígitos
    },
    DNI: { 
      type: String, required: true, unique: true,
      match: /^\d{8}[A-Z]$/, // DNI con 8 dígitos seguidos de una letra mayúscula
    },
    bookings: { type: Array, required: true },
  },
  { timestamps: true, collection: "clients" }
);


export type ClientModelType = mongoose.Document & Omit<Client, "id">;

export default mongoose.model<ClientModelType>("Client", clientSchema);
