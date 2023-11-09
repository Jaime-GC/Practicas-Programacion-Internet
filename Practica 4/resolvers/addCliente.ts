import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addCliente = async (req: Request, res: Response) => {
  try {
    const { id, nombre, dinero } = req.body;

    let { coches } = req.body;

    if (!id || !nombre || dinero === undefined ) {
      res.status(400).send("id, nombre, dinero, and coches are required");
      return;
    }

    if (coches === undefined) {
      coches = [];
    }

    const idModificado = formatId(id);

    const objectId = new mongoose.Types.ObjectId(idModificado);    

    const alreadyExists = await ClienteModel.findOne({ _id: objectId }).exec();

    if (alreadyExists) {
      res.status(400).send("Cliente already exists");
      return;
    }

    const newCliente = new ClienteModel({ _id: idModificado, nombre, dinero, coches });
    await newCliente.save();

    res.status(200).send({
      id: newCliente._id.toString(),
      nombre: newCliente.nombre,
      dinero: newCliente.dinero,
      coches: newCliente.coches,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addCliente;
