const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoesInput {
    brand: String
    size: Int
  }

  input NewShoeInput {
    brand: String!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: 'infantito@gmail.com',
        avatar: 'https://avatars0.githubusercontent.com/u/9045302',
        friends: [],
      };
    },
    shoes(_, { input }) {
      return [
        { brand: 'nike', size: 12 },
        { brand: 'adidas', size: 14 },
      ].filter(shoe => (input ? shoe.brand === input.brand : true));
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log('On port 4000'));
