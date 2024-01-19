//types.ts

import mongoose from "npm:mongoose@8.0.1";


export type Contact = {
    nombreApellidos: string,
    numero: string,
    pais: string, 
    hora: string,
    id: mongoose.Types.ObjectId
}