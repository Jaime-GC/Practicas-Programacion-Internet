import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const getCochesCliente = async (req: Request, res: Response) => {
  try {
    const { clienteId } = req.params;

    if (!clienteId) {
      res.status(400).send("clienteId is required");
      return;
    }

    const formattedClienteId = formatId(clienteId);
    const clienteObjectId = new mongoose.Types.ObjectId(formattedClienteId);

    const cliente = await ClienteModel.findOne({_id: clienteObjectId}).exec();

    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }

    res.status(200).send(cliente.coches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getCochesCliente;
