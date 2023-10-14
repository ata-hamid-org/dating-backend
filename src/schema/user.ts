import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import UserType from "./types";
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

export { RootQuery, Mutation };
