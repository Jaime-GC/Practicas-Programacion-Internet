import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "../db/restaurante.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const deleteRestaurantes = async (req: Request, res: Response) => {
  try {

    //Elimina todos los restaurantes

    await RestauranteModel.deleteMany({});

    res.status(200).send("Todos los restaurantes han sido eliminados");

    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteRestaurantes;
