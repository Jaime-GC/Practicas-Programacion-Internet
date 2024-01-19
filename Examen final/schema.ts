export const typeDefs = `#graphql
    type Query {
        getContacts: [Contact!]!
        getContact(id: String!): Contact!
    }

    type Mutation {
        addContact(nombreApellidos: String!, numero: String!): Contact!
        deleteContact(id: String!): Contact!
        updateContact(id: String!, nombreApellidos: String!, numero: String!): Boolean!
    }

    type Contact {
        nombreApellidos: String,
        numero: String,
        pais: String, 
        hora: String,
        id: String, 
    }


`