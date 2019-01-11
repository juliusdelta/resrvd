import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });
  const server = new GraphQLServer({ schema });

  createConnection().then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
  }).catch(error => console.log(error));
}

main();

