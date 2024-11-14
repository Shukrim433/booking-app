const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    // user(email: String!): User
    user: async (parent, { email }) => {
      try {
        return await User.findOne({ email });
      } catch (error) {
        console.log("error in user resolver:", error.message);
      }
    },
  },
  Mutation: {
    // addUser(fullName: String!, email: String!, password: String!, gender: String, phone: String) : Auth
    addUser: async (parent, { fullName, email, password, gender, phone }) => {
      try {
        const user = await User.create({
          fullName,
          email,
          password,
          gender,
          phone,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("error in addUser resolver:", error.message);
      }
    },
    // login(email: String!, password: String!): Auth
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log("error in login resolver:", error.message);
      }
    },
  },
};

module.exports = resolvers;
