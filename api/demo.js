const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
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
        { brand: 'NIKE', size: 12, sport: 'Basketball' },
        { brand: 'TIMBERLAND', size: 14, hasGrip: true },
      ];
      // .filter(shoe => (input ? shoe.brand === input.brand : true));
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker';

      return 'Boot';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log('On port 4000'));
