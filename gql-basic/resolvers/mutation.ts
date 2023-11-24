import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import PetModel from "../db/pet.ts";


 export const Mutation = {
    addPet: async (_: unknown, args: { id: string; name: string; breed: string }) => {
        console.log("Adding pet");
        const pet = {
            id: args.id,
            name: args.name,
            breed: args.breed,
        };
        

        try {
            const alreadyExists = await PetModel.findOne({ id: args.id});
            if (alreadyExists) {
                throw new GraphQLError(`Pet with id ${args.id} already exists`, {
                    extensions: { code: "ALREADY_EXISTS" },
                });
            }
            const newPet = new PetModel(pet);
            await newPet.save();
        } catch (error) {
            throw new GraphQLError(error);
        }
      return pet;
    },




    deletePet: async(_: unknown, args: { id: string }) => {
        console.log("Deleting pet");
        try {
            const alreadyExists = await PetModel.findOneAndDelete({ id: args.id});
            if (!alreadyExists) {
                throw new GraphQLError(`Pet with id ${args.id} not exists`, {
                    extensions: { code: "NOT_EXISTS" },
                });
            }
            //Indicamos que se ha borrado correctamente
            return `Pet with id ${args.id} deleted`;
            
        } catch (error) {
            throw new GraphQLError(error);
            return;
        }
    },



    updatePet: async (
        _: unknown,
        args: { id: string; name: string; breed: string }
      ) => {
        console.log("Updating pet");
        try {
          
          
          const updatedPet = await PetModel.findOneAndUpdate(
            {id: args.id},
            {name : args.name}, {breed: args.breed},
            { new: true }
          ).exec();
      
          if (!updatedPet) {
            throw new GraphQLError(`No pet found with id ${id}`, {
              extensions: { code: "NOT_FOUND" },
            });
          }
      
          return updatedPet;
        } catch (error) {
          throw new GraphQLError(error.message, { extensions: { code: "INTERNAL_SERVER_ERROR" } });
        }
      }
      ,
  }