import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addClient = async (req: Request, res: Response) => {
  try {
    const {id, firstName, lastName, email, phoneNumber, DNI } = req.body;

    let { bookings } = req.body;

    if (!id || !firstName || !lastName || !email || !phoneNumber || !DNI) {
        res.status(400).send("id, firstName, lastName, email, phoneNumber, DNI and bookings are required");
        return;
    }

    if (bookings === undefined) {
      bookings = [];
    }

    const idModificado = formatId(id); 

    const alreadyExists = await ClientModel.findOne({ _id: idModificado }).exec();

    if (alreadyExists) {
      res.status(400).send("Cliente already exists");
      return;
    }

    const newCliente = new ClientModel({_id: idModificado, firstName, lastName, email, phoneNumber, DNI, bookings });
    await newCliente.save();

    res.status(200).send({
        id: newCliente._id.toString(),
        firstName: newCliente.firstName,
        lastName: newCliente.lastName,
        email: newCliente.email,
        phoneNumber: newCliente.phoneNumber,
        DNI: newCliente.DNI,
        bookings: newCliente.bookings,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addClient;
