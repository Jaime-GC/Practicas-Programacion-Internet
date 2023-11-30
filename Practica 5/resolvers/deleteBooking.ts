import { Request, Response } from "npm:express@4.18.2";
import BookingModel from "../db/booking.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts"
import ClientModel from "../db/client.ts";
import RestauranteModel from "../db/restaurante.ts";


const deleteBooking = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params;
      
      if (!bookingId) {
          res.status(400).send("bookingId is required");
          return;
      }
      
      const booking = await BookingModel.findOne({_id: formatId(bookingId)}).exec();
      
      if (!booking) {
        res.status(404).send("Booking not found");
        return;
      }
      
      
      await BookingModel.findOneAndDelete({_id: formatId(bookingId)});
  
      // Middleware para eliminar la reserva de los arrays de bookings de cliente y restaurante
      await ClientModel.findOneAndUpdate(
        { _id: booking.client },
        { $pull: { bookings: booking._id } }
      );
  
      await RestauranteModel.findOneAndUpdate(
        { _id: booking.restaurante },
        { $pull: { bookings: booking._id } }
      );
      
      res.status(200).send(`La reserva con id ${bookingId} ha sido eliminada`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export default deleteBooking;
  