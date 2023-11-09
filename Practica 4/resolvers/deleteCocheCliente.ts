import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const deleteCocheCliente = async (req: Request, res: Response) => {
  try {
    const { clienteId, cocheId } = req.params;

    if (!clienteId || !cocheId) {
      res.status(400).send("clienteId and cocheId are required");
      return;
    }

    const formattedClienteId = formatId(clienteId);
    const formattedCocheId = formatId(cocheId);

    const clienteObjectId = new mongoose.Types.ObjectId(formattedClienteId);
    const cocheObjectId = new mongoose.Types.ObjectId(formattedCocheId);

    const cliente = await ClienteModel.findById(clienteObjectId).exec();

    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }

    // Filtrar el array de coches del cliente y eliminar el coche con el ID proporcionado
    cliente.coches = cliente.coches.filter(coche => coche.id.toString() !== cocheObjectId.toString());
    await cliente.save();

    res.status(200).send("Coche eliminado del cliente correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteCocheCliente;
