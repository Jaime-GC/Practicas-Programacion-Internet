//mutation.ts
import { ContactModel, ContactModelType } from "../db/mongoTypes.ts";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";

export const Mutation = {

    deleteContact: async (_:unknown, args: {id: string}): Promise<Boolean> => {
        try {
            const { id } = args;
            const contact = await ContactModel.findOneAndDelete({ _id:id }).exec();

            if (!contact){
                throw new GraphQLError("Contacto no encontrado");
                return false;
            }

            return true;
            
        } catch (e) {
            throw new GraphQLError(e);
        }
    }, 



    addContact: async (_:unknown, args: { id: string, nombreApellidos: string, numero: string}): Promise<ContactModelType> => {
        try {
            const { id, nombreApellidos, numero } = args;

            const contactExist = await ContactModel.findOne({ _id:id }).exec();

            if (contactExist){
                throw new GraphQLError("Ya existe este contacto");
            }
            
            const url = "https://api.api-ninjas.com/v1/validatephone?number=" + numero;
            const response = await fetch(url, {headers: { 'X-Api-Key': 'V/AZysRk7IEjaum+dF6iGw==b1La0nrmwotORirj'}});

            const json = await response.json();
            const pais = json.country 
            


            const newContact = new ContactModel({ _id:id, nombreApellidos, numero, pais });
            await newContact.save();

            return newContact;
        } catch (e) {
            throw new GraphQLError(e);
        }
    },
    
    

    updateContact: async (_:unknown, args: {id: string, nombreApellidos: string, numero: string}): Promise<ContactModelType> => {
        try {
            const { id, nombreApellidos, numero } = args;

            const contactExist = await ContactModel.findOne({ _id:id }).exec();

            if (!contactExist){
                throw new GraphQLError("No existe este contacto");
            }
            
            const contactUpdate = await ContactModel.findOneAndUpdate(
                { id }, 
                { nombreApellidos, numero },
                { new: true }
            ).exec();

            if (!contactUpdate){
                throw new GraphQLError("Contacto no encontrado");
            }            

            return contactUpdate;

        } catch (e) {
            throw new GraphQLError(e);
        }
    },
};