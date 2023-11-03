import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const updateContacto = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const { nombreApellidos, correo, codigoPostal, iso } = req.body;
    if (!nombreApellidos || !correo || !codigoPostal || !iso) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedContacto = await ContactoModel.findOneAndUpdate(
      { dni },
      { nombreApellidos, correo, codigoPostal, iso },
      { new: true }
    ).exec();

    if (!updatedContacto) {
      res.status(404).send("Contacto not found");
      return;
    }

    res.status(200).send({
      dni: updatedContacto.dni,
      nombreApellidos: updatedContacto.nombreApellidos,
      correo: updatedContacto.correo,
      codigoPostal: updatedContacto.codigoPostal,
      iso: updatedContacto.iso,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateContacto;
