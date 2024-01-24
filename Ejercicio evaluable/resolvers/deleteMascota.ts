import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";
import mongoose from "npm:mongoose@7.6.3";


const deleteMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const objectId = new mongoose.Types.ObjectId(id);

    const mascota = await MascotaModel.findOneAndDelete({ _id:objectId }).exec();
    if (!mascota) {
      res.status(404).send("Mascota no encontrada");
      return;
    }
    res.status(200).send("Mascota eliminada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMascota;
