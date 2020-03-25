const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  # union Footwear = Sneaker | Boot

  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
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

const user = {
  id: Date.now(),
  email: 'infantito@gmail.com',
  avatar: 'https://avatars0.githubusercontent.com/u/9045302',
  shoes: [],
};

const shoes = [
  { brand: 'NIKE', size: 12, sport: 'Basketball', user: Date.now() },
  { brand: 'TIMBERLAND', size: 14, hasGrip: true, user: Date.now() },
];

const resolvers = {
  Query: {
    me() {
      return {
        id: Date.now(),
        email: 'infantito@gmail.com',
        avatar: 'https://avatars0.githubusercontent.com/u/9045302',
        shoes: [],
      };
    },
    shoes(_, { input }) {
      return shoes;
      // .filter(shoe => (input ? shoe.brand === input.brand : true));
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  User: {
    shoes() {
      return shoes;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker';

      return 'Boot';
    },
  },
  Sneaker: {
    user(shoe) {
      return user;
    },
  },
  Boot: {
    user(shoe) {
      return user;
    },
  },
  // Footwear: {
  //   __resolveType(shoe) {
  //     if (shoe.sport) return 'Sneaker';

  //     return 'Boot';
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log('On port 4000'));
