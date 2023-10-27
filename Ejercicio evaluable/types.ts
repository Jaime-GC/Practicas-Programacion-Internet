export type Mascota = {
  nombre: string;
  id: string;
  descripcion: string;
  tipo: Animal;
};

export type Animal = "perros" | "gatos" | "serpientes"; // de esta forma obligamos a que solo sean validos esos animales


