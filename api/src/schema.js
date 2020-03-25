const { gql } = require('apollo-server');

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    CAT
    DOG
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    type: PetType!
    name: String!
    owner: User!
    img: String
    createdAt: String!
  }

  input PetInput {
    name: String
    type: PetType
  }

  input NewPetInput {
    name: String!
    type: PetType!
  }

  input UpdatePetInput {
    id: ID!
    name: String!
    type: PetType!
  }

  type Query {
    user: User!
    pets(input: PetInput): [Pet]!
    pet(id: ID): Pet!
  }

  type Mutation {
    addPet(input: NewPetInput!): Pet!
    updatePet(input: UpdatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
