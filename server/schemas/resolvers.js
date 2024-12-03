const { User, Doctor } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    // users: [User]
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        console.log("error in users controller", error.message);
      }
    },
    // user(_id: ID!): User
    user: async (parent, { _id }) => {
      try {
        return await User.findOne({ _id });
      } catch (error) {
        console.log("error in user resolver:", error.message);
      }
    },
    // doctors: [Doctor]
    doctors: async () => {
      try {
        return await Doctor.find({});
      } catch (error) {
        console.log("error in doctors query", error.message);
      }
    },
    // doctor(_id: ID!): Doctor
    doctor: async (parent, { _id }) => {
      try {
        return await Doctor.findOne({ _id });
      } catch (error) {
        console.log("error in doctor resolver", error.message);
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
