const typeDefs = `
  type User {
    _id: ID
    fullName: String!
    email: String!
    password: String!
    gender: String
    phone: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(email: String!): User
  }

  type Mutation {
    addUser(
      fullName: String!,
      email: String!,
      password: String!,
      gender: String,
      phone: String
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
