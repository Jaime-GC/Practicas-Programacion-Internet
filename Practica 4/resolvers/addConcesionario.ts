import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addConcesionario = async (req: Request, res: Response) => {
  try {
    const { id, nombre, dinero,  } = req.body;

    let { coches, ventaBloqueada } = req.body;

    if (!id || !nombre || dinero === undefined ) {
      res.status(400).send("id, nombre, dinero, and coches are required");
      return;
    }

    if (coches === undefined) {
      coches = [];
    }

    if (ventaBloqueada === undefined) {
      ventaBloqueada = false;
    }

  
    const idModificado = formatId(id);

    const objectId = new mongoose.Types.ObjectId(idModificado);


    const alreadyExists = await ConcesionarioModel.findOne({ _id: objectId }).exec();

    if (alreadyExists) {
      res.status(400).send("Concesionario already exists");
      return;
    }

    const newConcesionario = new ConcesionarioModel({ _id: idModificado, nombre, dinero, coches, ventaBloqueada });
    await newConcesionario.save();

    res.status(200).send({
      id: newConcesionario._id.toString(),
      nombre: newConcesionario.nombre,
      dinero: newConcesionario.dinero,
      coches: newConcesionario.coches,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addConcesionario;
