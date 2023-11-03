import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts"


const addContacto = async (req: Request, res: Response) => {
  try {
    const { dni, nombreApellidos, correo, codigoPostal, iso } = req.body;
    
    if (!dni || !nombreApellidos || !correo || !codigoPostal || !iso ) {
      res.status(500).send("dni, nombreApellidos, correo, codigoPostal and iso are required");
      return;
    }

    const alreadyExists = await ContactoModel.findOne({ dni }).exec();
    if (alreadyExists) {
      res.status(400).send("Contacto already exists");
      return;
    }

    const newContacto = new ContactoModel({ dni, nombreApellidos, correo, codigoPostal, iso });
    await newContacto.save();

    res.status(200).send({
      dni: newContacto.dni,
      nombreApellidos: newContacto.nombreApellidos,
      correo: newContacto.correo,
      codigoPostal: newContacto.codigoPostal,
      iso: newContacto.iso,
      id: newContacto._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addContacto;
