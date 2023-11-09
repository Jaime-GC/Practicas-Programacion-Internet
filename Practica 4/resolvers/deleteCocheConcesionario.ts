import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const deleteCocheConcesionario = async (req: Request, res: Response) => {
  try {
    const { concesionarioId, cocheId } = req.params;

    if (!concesionarioId || !cocheId) {
      res.status(400).send("concesionarioId and cocheId are required");
      return;
    }

    const formattedConcesionarioId = formatId(concesionarioId);
    const formattedCocheId = formatId(cocheId);

    const concesionarioObjectId = new mongoose.Types.ObjectId(formattedConcesionarioId);
    const cocheObjectId = new mongoose.Types.ObjectId(formattedCocheId);

    const concesionario = await ConcesionarioModel.findById(concesionarioObjectId).exec();

    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }

    //Lo que hace esta funcion es que filtra el array de coches del concesionario y elimina el coche que tenga el mismo id que el coche que se le pasa por parametro
    concesionario.coches = concesionario.coches.filter(coche => coche.id.toString() !== cocheObjectId.toString());
    await concesionario.save();

    res.status(200).send("Coche eliminado del concesionario correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteCocheConcesionario;
