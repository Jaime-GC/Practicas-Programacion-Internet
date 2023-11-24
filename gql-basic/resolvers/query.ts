import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import PetModel  from "../db/pet.ts";


export const Query = {
    hello: () => {
        console.log("Querying hello");
        return "Hello world!";
    },
    
    pets: async(_parent: unknown, args: {breed?: string}) => {
        console.log("Querying pets");
        try {
           if (args.breed) {
            return await PetModel.find({breed: args.breed});
           }
        return PetModel.find(); 
        } catch (error) {
            throw new GraphQLError(error);
        }
    }, 

    pet: async (_parent: unknown, args: { id: string }) => {
        console.log("Querying pet");
        try {
        const pet = await PetModel.findById(args.id);
        if (!pet) {
            throw new GraphQLError(`No pet found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
            });
        }
        return pet;
        } catch (error) {
            throw new GraphQLError(error);
        }
    },
}
    