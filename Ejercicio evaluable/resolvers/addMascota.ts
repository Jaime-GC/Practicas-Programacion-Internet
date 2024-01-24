import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, tipo, id } = req.body;
    if (!nombre || !descripcion || !tipo ) {
      res.status(400).send("Nombre, id, descripcion y tipo son obligatorios");
      return;
    }



    const idModificado = formatId(id);
    

    const objectId = new mongoose.Types.ObjectId(idModificado);

    const mascota = await MascotaModel.findOne({ _id: objectId }).exec();
    if (mascota) {
      res.status(400).send("Mascota ya existe");
      return;
    }


    const newMascota = new MascotaModel({ nombre, descripcion, tipo, _id: idModificado }); // Create a new document

    await newMascota.save(); // Save it to database

    res.status(200).send({
      nombre: newMascota.nombre,
      descripcion: newMascota.descripcion,
      tipo: newMascota.tipo,
      id: newMascota.id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;
