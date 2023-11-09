import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addDineroCliente = async (req: Request, res: Response) => {
  try {
    const { clienteId, cantidad } = req.params;

    if (!clienteId || !cantidad || isNaN(parseFloat(cantidad))) {
        res.status(400).send("clienteId and valid cantidad are required");
        return;
      }
  
      const formattedClienteId = formatId(clienteId);
      const clienteObjectId = new mongoose.Types.ObjectId(formattedClienteId);
  
      const cliente = await ClienteModel.findById(clienteObjectId).exec();
  
      if (!cliente) {
        res.status(404).send("Cliente not found");
        return;
      }
  
      cliente.dinero += parseFloat(cantidad);
      await cliente.save();

    res.status(200).send("Dinero añadido correctamente a la cuenta del cliente, saldo actual: " + cliente.dinero + "€");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addDineroCliente;
