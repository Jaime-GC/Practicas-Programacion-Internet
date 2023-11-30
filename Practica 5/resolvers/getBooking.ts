import { Request, Response } from "npm:express@4.18.2";
import BookingModel from "../db/booking.ts";
import mongoose from "npm:mongoose@7.6.3";
import formatId from "../main.ts";

const getBooking = async (req: Request, res: Response) => {
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
    
    res.status(200).send({
        id: booking._id.toString(),
        date: booking.date,
        client: booking.client,
        restaurante: booking.restaurante,
    });
  } catch (error) {
        res.status(500).send(error.message);
  }
}

export default getBooking;