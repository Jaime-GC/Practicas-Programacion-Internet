import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

import { Pet } from "./types.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";
import mongoose from "npm:mongoose@8.0.1";


import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
}

await mongoose.connect(MONGO_URL);
console.info("Connected to MongoDB");






// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 9000,
  }
});
console.log(`🚀 Server ready at ${url}`);
