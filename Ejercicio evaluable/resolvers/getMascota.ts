import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";
import mongoose from "npm:mongoose@7.6.3";


const getMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    const objectId = new mongoose.Types.ObjectId(id);
    
    const mascota = await MascotaModel.findOne({ _id:objectId }).exec();
    if (!mascota) {
      res.status(404).send("Mascota no encontrada");
      return;
    }
    res.status(200).send({
      nombre: mascota.nombre,
      dni: mascota.descripcion,
      tipo: mascota.tipo,
      id: mascota._id,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMascota;
