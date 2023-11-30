import mongoose from "npm:mongoose@7.6.3";

export type Client = {
    id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    DNI: string;
    bookings: Booking[];
  };
  

export type Restaurante = {
    id: mongoose.Types.ObjectId;
    name: string;
    CIF: string;
    address: string;
    bookings: Booking[];
};

export type Booking = {
    id: mongoose.Types.ObjectId;
    date: Date;
    client: string;
    restaurante: string;

};