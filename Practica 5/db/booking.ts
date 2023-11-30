import mongoose from "npm:mongoose@7.6.3";
import { Booking } from "../types.ts";
import ClientModel from "../db/client.ts";
import RestauranteModel from "../db/restaurante.ts";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    client: { type: String, required: true },
    restaurante: { type: String, required: true },
  },
  { timestamps: true, collection: "bookings" }
);

// Middleware para agregar una reserva
bookingSchema.pre('save', async function(next) {
  try {
    console.log("Guardando reserva");
    const client = await ClientModel.findOneAndUpdate(
      { _id: this.client },
      { $push: { bookings: this._id } },
      { new: true }
    );

    const restaurante = await RestauranteModel.findOneAndUpdate(
      { _id: this.restaurante },
      { $push: { bookings: this._id } },
      { new: true }
    );

    next();
  } catch (error) {
    next(error);
  }
});

// Middleware para eliminar una reserva
bookingSchema.pre('findOneAndDelete', { document: true, query: false }, async function (next) {
  try {
    const booking = this as BookingModelType;
    console.log("Borrando reserva");

    await ClientModel.findOneAndUpdate(
      { _id: booking.client },
      { $pull: { bookings: booking._id } }
    );

    await RestauranteModel.findOneAndUpdate(
      { _id: booking.restaurante },
      { $pull: { bookings: booking._id } }
    );

    next();
  } catch (error) {
    next(error);
  }
});


export type BookingModelType = mongoose.Document & Omit<Booking, "id">;

export default mongoose.model<BookingModelType>("Booking", bookingSchema);
