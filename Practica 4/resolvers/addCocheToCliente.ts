import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addCocheToCliente = async (req: Request, res: Response) => {
  try {
    const { concesionarioId, cocheId, clienteId } = req.params;

    if (!concesionarioId || !cocheId || !clienteId) {
      res.status(400).send("concesionarioId, cocheId, and clienteId are required");
      return;
    }

    const formattedConcesionarioId = formatId(concesionarioId);
    const formattedCocheId = formatId(cocheId);
    const formattedClienteId = formatId(clienteId);

    const concesionarioObjectId = new mongoose.Types.ObjectId(formattedConcesionarioId);
    const cocheObjectId = new mongoose.Types.ObjectId(formattedCocheId);
    const clienteObjectId = new mongoose.Types.ObjectId(formattedClienteId);

    const concesionario = await ConcesionarioModel.findById(concesionarioObjectId).exec();

    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }

    const cliente = await ClienteModel.findById(clienteObjectId).exec();

    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }

    const coche = concesionario.coches.find(coche => coche.id.toString() === cocheObjectId.toString());

    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }

    if (cliente.dinero < coche.precio) {
      res.status(400).send("EL cliente no tiene suficiente dinero para comprar el coche");
      return;
    }

    // Eliminamos el coche de la lista de coches del concesionario
    concesionario.coches = concesionario.coches.filter(coche => coche.id.toString() !== cocheObjectId.toString());

    // Actualizamos el dinero del cliente y añadimos el coche a su lista
    cliente.dinero -= coche.precio;
    cliente.coches.push(coche);

    await concesionario.save();
    await cliente.save();

    res.status(200).send("El coche se ha vendido correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addCocheToCliente;
