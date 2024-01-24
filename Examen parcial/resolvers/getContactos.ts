import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";
import { getCiudad } from "../getCiudad.ts";
import { getPais } from "../getPais.ts";
import { getHora } from "../getHora.ts";

const getContactos = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactoModel.find({}).exec();
    if (!contactos || contactos.length === 0) {
      res.status(404).send("No contacts found");
      return;
    }

    const contactosList = await Promise.all(
      contactos.map(async (contacto) => ({
        dni: contacto.dni,
        nombreApellidos: contacto.nombreApellidos,
        correo: contacto.correo,
        codigoPostal: contacto.codigoPostal,
        ciudad: await getCiudad(contacto.iso, contacto.codigoPostal.toString()),
        pais: await getPais(contacto.iso),
        //hora: await getHora(await getCiudad(contacto.iso, contacto.codigoPostal.toString())),
        id: contacto._id.toString(),
      }))
    );

    res.status(200).send(contactosList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getContactos;
