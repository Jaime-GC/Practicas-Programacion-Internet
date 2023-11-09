import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const moverCocheClienteCliente = async (req: Request, res: Response) => {
  try {
    const { clienteOrigenId, clienteDestinoId, cocheId } = req.params;

    if (!clienteOrigenId || !clienteDestinoId || !cocheId) {
      res.status(400).send("clienteOrigenId, clienteDestinoId, and cocheId are required");
      return;
    }

    const formattedClienteOrigenId = formatId(clienteOrigenId);
    const formattedClienteDestinoId = formatId(clienteDestinoId);
    const formattedCocheId = formatId(cocheId);

    const clienteOrigenObjectId = new mongoose.Types.ObjectId(formattedClienteOrigenId);
    const clienteDestinoObjectId = new mongoose.Types.ObjectId(formattedClienteDestinoId);
    const cocheObjectId = new mongoose.Types.ObjectId(formattedCocheId);

    const clienteOrigen = await ClienteModel.findById(clienteOrigenObjectId).exec();

    if (!clienteOrigen) {
      res.status(404).send("Cliente de origen not found");
      return;
    }

    const clienteDestino = await ClienteModel.findById(clienteDestinoObjectId).exec();

    if (!clienteDestino) {
      res.status(404).send("Cliente de destino not found");
      return;
    }

    // Buscar el coche en el array de coches del cliente de origen
    const cocheATransferir = clienteOrigen.coches.find(coche => coche.id.toString() === cocheObjectId.toString());

    if (!cocheATransferir) {
      res.status(404).send("Coche not found in source client");
      return;
    }

    // Eliminar el coche del array de coches del cliente de origen
    clienteOrigen.coches = clienteOrigen.coches.filter(coche => coche.id.toString() !== cocheObjectId.toString());

    // Agregar el coche al array de coches del cliente de destino
    clienteDestino.coches.push(cocheATransferir);

    await clienteOrigen.save();
    await clienteDestino.save();

    res.status(200).send("Coche transferido entre clientes correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default moverCocheClienteCliente;
