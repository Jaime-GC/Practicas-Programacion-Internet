import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const getCochesConcesionario = async (req: Request, res: Response) => {
  try {
    const { concesionarioId } = req.params;

    if (!concesionarioId) {
      res.status(400).send("concesionarioId is required");
      return;
    }

    const formattedConcesionarioId = formatId(concesionarioId);
    const concesionarioObjectId = new mongoose.Types.ObjectId(formattedConcesionarioId);

    const concesionario = await ConcesionarioModel.findOne({_id: concesionarioObjectId}).exec();

    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }

    res.status(200).send(concesionario.coches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getCochesConcesionario;
