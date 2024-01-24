import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/client.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";
import { getCiudad } from "../getCiudad.ts";
import { getWeather } from "../getweather.ts";

const getClient = async (req: Request, res: Response) => {
  try {
    const { clienteId, countrycode, zipcode } = req.params;

    if (!clienteId) {
      res.status(400).send("clienteId is required");
      return;
    }


    const cliente = await ClienteModel.findOne({_id: formatId(clienteId)}).exec();

    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }

    res.status(200).send({
        id: cliente._id.toString(),
        firstName: cliente.firstName,
        lastName: cliente.lastName,
        email: cliente.email,
        phoneNumber: cliente.phoneNumber,
        DNI: cliente.DNI,
        bookings: cliente.bookings,
        ciudad: await getCiudad(countrycode, zipcode),
        meteorologia: await getWeather(await getCiudad(countrycode, zipcode)),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getClient;
