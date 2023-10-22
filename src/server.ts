import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  // Optional, context, data sources, etc.
});

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
