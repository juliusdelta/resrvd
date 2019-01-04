import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { ResolverMap } from "./types/ResolverTypes";
import { User } from "./entity/User";

const typeDefs = `
  type User {
    id: String!
    firstName: String
    lastName: String
    email: String!
  }

  type Query {
    hello(name: String): String!
    user(id: String!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String, lastName: String, email: String!): User!
  }
`;

const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    user: (_, { id }) => User.findOne({ id }),
    users: () => User.find()
  },
  Mutation: {
    createUser: (_, args) => User.create(args).save()
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
}).catch(error => console.log(error));
