import mongoose from "npm:mongoose@7.6.3";
export type Mascota = {
  nombre: string;
  id: mongoose.Types.ObjectId;
  descripcion: string;
  tipo: Animal;
};

export type Animal = "perros" | "gatos" | "serpientes"; // de esta forma obligamos a que solo sean validos esos animales


