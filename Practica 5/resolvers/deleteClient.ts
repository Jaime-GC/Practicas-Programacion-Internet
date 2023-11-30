import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";
import RestauranteModel from "../db/restaurante.ts";
import BookingModel from "../db/booking.ts";

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    
    if (!clientId) {
      res.status(400).send("clientId is required");
      return;
    }
    
    const client = await ClientModel.findOne({_id: formatId(clientId)}).populate('bookings').exec();
    
    if (!client) {
      res.status(404).send("Client not found");
      return;
    }
    
    // Iteramos sobre las reservas del cliente y obtener el ID del restaurante de cada reserva
    for (let booking of client.bookings) {
      const restauranteId = booking.restaurante;
      const bookingId = booking.id.toString().at(22);

      console.log(bookingId);

      
      // Eliminar la reserva del array de reservas del restaurante
      await RestauranteModel.findOneAndUpdate(
        { _id: restauranteId },
        { $pull: { bookings: booking.id } }
      );

      // Eliminar la reserva de la base de datos
      await BookingModel.findOneAndDelete({_id: formatId(bookingId)});
    }

    await ClientModel.deleteOne({_id: formatId(clientId)});
    
    res.status(200).send(`El cliente con id ${clientId} ha sido eliminado`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteClient;