import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const { nombre, id, descripcion, tipo } = req.body;
    if (!nombre || !id || !descripcion || !tipo) {
      res.status(400).send("Nombre, id, descripcion y tipo son obligatorios");
      return;
    }

    const alreadyExists = await MascotaModel.findOne({ id }).exec();
    if (alreadyExists) {
      res.status(400).send("Mascota ya existe");
      return;
    }

    const newMascota = new MascotaModel({ nombre, id, descripcion, tipo });
    await newMascota.save();

    res.status(200).send({
      nombre: newMascota.nombre,
      id: newMascota.id,
      dni: newMascota.descripcion,
      tipo: newMascota.tipo,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;
