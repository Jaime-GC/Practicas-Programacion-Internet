import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const deleteContacto = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const contacto = await ContactoModel.findOneAndDelete({ dni }).exec();
    if (!contacto) {
      res.status(404).send("Contacto not found");
      return;
    }
    res.status(200).send("Contacto deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteContacto;
