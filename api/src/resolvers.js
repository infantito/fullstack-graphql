/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your schema
 */

module.exports = {
  Query: {
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input || {});
    },
    pet(_, { id }, { models }) {
      return models.Pet.findOne({ id });
    },
    user(_, __, { models }) {
      return models.User.findOne();
    },
  },
  Mutation: {
    addPet(_, { input }, { models, user }) {
      return models.Pet.create({ ...input, user: user.id });
    },
    updatePet(_, { input }, { models }) {
      return models.Pet.update(input);
    },
  },
  Pet: {
    owner(pet, __, ctx) {
      return ctx.models.User.findOne({ id: pet.user });
    },
    img({ type }) {
      return `https://source.unsplash.com/300x300/?${type.toLowerCase()}`;
    },
  },
  User: {
    pets(user, __, { models }) {
      return models.Pet.findMany({ user: user.id });
    },
  },
};
