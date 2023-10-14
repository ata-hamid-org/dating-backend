import { GraphQLObjectType, GraphQLSchema } from "graphql";
import UserType from "./user";
import userResolvers from "../resolvers/user";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // queries here
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // mutations here
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
