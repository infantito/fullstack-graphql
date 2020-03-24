const { gql } = require('apollo-server');

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }

  input PetInput {
    name: String
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  input UpdatePetInput {
    id: ID!
    name: String!
    type: String!
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet!
    updatePet(input: UpdatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
