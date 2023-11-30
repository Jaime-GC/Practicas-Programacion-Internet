import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "../db/restaurante.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const getRestaurante = async (req: Request, res: Response) => {
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

    res.status(200).send({
        id: restaurante._id.toString(),
        name: restaurante.name,
        CIF: restaurante.CIF,
        address: restaurante.address,
        bookings: restaurante.bookings,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getRestaurante;