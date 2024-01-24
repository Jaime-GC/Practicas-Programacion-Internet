//main.ts
import mongoose from "npm:mongoose@8.0.1";
import { ApolloServer } from "npm:@apollo/server@^4.9.5";
import startStandaloneServer from "npm:@apollo/server@^4.9.5/standalone"

import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";


const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
}

//Connect to MongoDB
await mongoose.connect(MONGO_URL);
console.info("Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query, 
    Mutation
  },
});

const { url } = await startStandaloneServer(server);
console.info(`Server ready at ${url}`);





