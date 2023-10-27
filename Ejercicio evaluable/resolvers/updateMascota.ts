import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const updateMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tipo } = req.body;
    if (!nombre || !descripcion || !tipo) {
      res.status(400).send("Nombre, descripcion y tipo son obligatorios");
      return;
    }

    const updatedMascota = await MascotaModel.findOneAndUpdate(
      { id },
      { nombre, descripcion, tipo },
      { new: true }
    ).exec();

    if (!updatedMascota) {
      res.status(404).send("Mascota no encontrada");
      return;
    }

    res.status(200).send({
      nombre: updatedMascota.nombre,
      id: updatedMascota.id,
      dni: updatedMascota.descripcion,
      tipo: updatedMascota.tipo,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMascota;
