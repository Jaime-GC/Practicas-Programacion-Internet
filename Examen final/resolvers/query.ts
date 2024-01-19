//query.ts
import { ContactModel, ContactModelType } from "../db/mongoTypes.ts";
import { GraphQLError } from "graphql";

export const Query = {
    getContact: async (_:unknown, args: {id: string}): Promise<ContactModelType> => {
        try {
            const { id } = args;

            const contactExist = await ContactModel.findOne({ _id:id }).exec();

            if (!contactExist){
                throw new GraphQLError("Contacto no encontrado");
            }

            return contactExist;

        } catch (e) {
            throw new GraphQLError(e);
        }
    },

    getContacts: async (_:unknown ): Promise<Array<ContactModelType>> => {
        try {

            const contacts = await ContactModel.find().exec();

            if (!contacts || contacts.length === 0){
                throw new GraphQLError("Contactos no encontrados");
            }

            console.log(contacts);

            return contacts;

        } catch (e) {
            console.error(e);
            throw new GraphQLError("Error obteniendo los contactos" + e.message);
        }
    },
};