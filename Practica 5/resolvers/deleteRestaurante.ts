import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "../db/restaurante.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const deleteRestaurante = async (req: Request, res: Response) => {
  try {
    const { restauranteId } = req.params;
    
    if (!restauranteId) {
      res.status(400).send("restauranteId is required");
      return;
    }
    
    const restaurante = await RestauranteModel.findOne({_id: formatId(restauranteId)}).exec();
    
    if (!restaurante) {
      res.status(404).send("Restaurante not found");
      return;
    }
    
    await RestauranteModel.deleteOne({_id: formatId(restauranteId)});
    
    res.status(200).send(`El restaurante con id ${restauranteId} ha sido eliminado`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteRestaurante;
