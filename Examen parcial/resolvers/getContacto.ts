import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";
import { getCiudad } from "../getCiudad.ts";
import { getPais } from "../getPais.ts";
import { getHora } from "../getHora.ts";

const getContacto = async (req: Request, res: Response) => {
  try {

    
    const { dni } = req.params;
    const contacto = await ContactoModel.findOne({ dni }).exec();
    if (!contacto) {
      res.status(404).send("Contacto not found");
      return;
    }

    res.status(200).send({
      dni: contacto.dni,
      nombreApellidos: contacto.nombreApellidos,
      correo: contacto.correo,
      codigoPostal: contacto.codigoPostal,
      ciudad: await getCiudad(contacto.iso, contacto.codigoPostal.toString()),
      pais: await getPais(contacto.iso),
      hora: await getHora(await getCiudad(contacto.iso, contacto.codigoPostal.toString())),
      id: contacto._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getContacto;
