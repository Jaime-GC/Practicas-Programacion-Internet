import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts"
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addCoche = async (req: Request, res: Response) => {
  try {
    const { id, matricula, marca, precio } = req.body;

    if (!id || !matricula || !marca || !precio) {
      res.status(500).send("id, matricula, marca and precio are required");
      return;
    }
  

    const idModificado = formatId(id);

    const objectId = new mongoose.Types.ObjectId(idModificado);    

    const alreadyExists = await CocheModel.findOne({ _id: objectId }).exec();    

    if (alreadyExists) {
      res.status(400).send("Coche already exists");
      return;
    }

    const newCoche = new CocheModel({ _id: idModificado, matricula, marca, precio });
    await newCoche.save();

    res.status(200).send({
      id: newCoche._id.toString(),
      matricula: newCoche.matricula,
      marca: newCoche.marca,
      precio: newCoche.precio, 
    });

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addCoche;


