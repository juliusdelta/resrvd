import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
  });

  const context = (req: any) => ({
    req: req.request,
  });

  const server = new GraphQLServer({
    schema,
    context
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "resid",
      secret: "asdf", // TODO place in environment file
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24
      }
    })
  );

  const options = {
    port: 4000,
    cors: {
      credentials: true,
      origin: ['http://localhost:7777']
    },
    formatError: formatArgumentValidationError
  };

  createConnection()
    .then(() => {
      server.start(options, () =>
        console.log("Server is running on localhost:4000")
      );
    })
    .catch(error => console.log(error));
};

main();
