import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/client.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";
import { getCiudad } from "../getCiudad.ts";
import { getWeather } from "../getweather.ts";

const getClient = async (req: Request, res: Response) => {
  try {

    const clientes = await ClienteModel.find({}).exec();
    if (!clientes || clientes.length === 0) {
      res.status(404).send("No contacts found");
      return;
    }

    const clientesList = await Promise.all(

        clientes.map(async (cliente) => ({
            id: cliente._id.toString(),
            firstName: cliente.firstName,
            lastName: cliente.lastName,
            email: cliente.email,
            phoneNumber: cliente.phoneNumber,
            DNI: cliente.DNI,
            bookings: cliente.bookings,
        }))

        );

    res.status(200).send(   { clientesList,}  );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getClient;
