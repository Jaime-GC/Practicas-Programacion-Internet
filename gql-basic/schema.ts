// The GraphQL schema
const typeDefs = `#graphql
  type Pet {
    id: ID! # la exclamacion significa obligatorio
    name: String!
    breed: String!
  }
  type Query { #Equivalente a get en api rest
    hello: String!
    pets(breed: String): [Pet!]!
    pet(id: ID!): Pet!
  }
  type Mutation { #Equivalente a post put y delete
    addPet(id: ID!, name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String!, breed: String!): Pet!
  }
`;

export { typeDefs };