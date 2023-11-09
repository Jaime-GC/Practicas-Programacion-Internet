import mongoose from "npm:mongoose@7.6.3";

export type Coche = {
  id: mongoose.Types.ObjectId;
  matricula: string;
  marca: string;
  precio: number;
};

export type Concesionario = {
  id: mongoose.Types.ObjectId;
  nombre: string;
  dinero: number;
  coches: Coche[];
  ventaBloqueada: boolean;
  
};

export type Cliente = {
  id: mongoose.Types.ObjectId;
  nombre: string;
  dinero: number;
  coches: Coche[];
  
};
