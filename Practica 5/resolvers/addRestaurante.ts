    import { Request, Response } from "npm:express@4.18.2";
    import RestauranteModel from "../db/restaurante.ts";
    import mongoose from "npm:mongoose@7.6.3";
    import formatId from "../main.ts";

    const addRestaurante = async (req: Request, res: Response) => {
    try {
        const {id,  name, CIF, address } = req.body;
        
        let { bookings } = req.body;

        if (!id || !name || !CIF || !address ) {
        res.status(400).send("name, CIF, address, and bookings are required");
        return;
        }


        if (bookings === undefined) {
        bookings = [];
        }

        const idModificado = formatId(id); 

        const alreadyExists = await RestauranteModel.findOne({ _id: idModificado }).exec();

        if (alreadyExists) {
            res.status(400).send("Restaurante already exists");
            return;
        }

        const newRestaurante = new RestauranteModel({ _id: idModificado, name, CIF, address, bookings });
        await newRestaurante.save();

        res.status(200).send({
        id: newRestaurante._id.toString(),
        name: newRestaurante.name,
        CIF: newRestaurante.CIF,
        address: newRestaurante.address,
        bookings: newRestaurante.bookings,
        });
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
    };

    export default addRestaurante;
