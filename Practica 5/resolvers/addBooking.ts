import { Request, Response } from "npm:express@4.18.2";
import BookingModel from "../db/booking.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const addBooking = async (req: Request, res: Response) => {
  try {
    const { id, date, clientId, restauranteId } = req.body;

    if (!id || !clientId || !restauranteId) {
      res.status(400).send("date, clientId, and restauranteId are required");
      return;
    }

    const idModificado = formatId(id); 

    const alreadyExists = await BookingModel.findOne({ _id: idModificado }).exec();

    if (alreadyExists) {
    res.status(400).send("Restaurante already exists");
    return;
    }

   
    const booking = new BookingModel({ _id: idModificado, date, client: formatId(clientId), restaurante: formatId(restauranteId)});

    await booking.save();

    res.status(200).send({
      id: booking._id.toString(),
      date: booking.date,
      client: booking.client,
      restaurante: booking.restaurante,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addBooking;
