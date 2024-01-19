//mongoTypes.ts
import mongoose from "mongoose";
import { Contact } from "../types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        nombreApellidos: { type: String, required: true },
        numero: { type: String, required: true, unique: true, 
        //match: /^\d{11}$/,  
    },
        pais: { type: String },
        hora: { type: String}, 

    },
    { timestamps: true, collection: "contacts" }
);


export type ContactModelType = mongoose.Document & Omit<Contact, "id">;
export const ContactModel = mongoose.model<ContactModelType>("Contact", contactSchema);

