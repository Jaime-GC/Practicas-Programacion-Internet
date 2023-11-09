import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";
import ConcesionarioModel from "../db/concesionario.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";
import { Coche } from "../types.ts";

const addCocheToConcesionario = async (req: Request, res: Response) => {
  try {
    const { concesionarioId, cocheId } = req.body;

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

    const coche = await CocheModel.findOne({ _id: cocheObjectId }).exec();
    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }

    //comprobar si ya existe el coche en el concesionario
    const cocheExists = concesionario.coches.find(coche => coche.id.toString() === cocheObjectId.toString());
    if (cocheExists) {
      res.status(400).send("Este coche ya existe en el concesionario");
      return;
    }

    if (concesionario.coches.length >= 10) {
      res.status(400).send("El concesionario tiene el numero maximo de coches (10)");
      return;
    }


    const cocheToAdd: Coche = {
        id: coche._id.toString(),
        matricula: coche.matricula,
        marca: coche.marca,
        precio: coche.precio,
    };

    concesionario.coches.push(cocheToAdd);
    await concesionario.save();

    res.status(200).send("Coche añadido al concesionario correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addCocheToConcesionario;
