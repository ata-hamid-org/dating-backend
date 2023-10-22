// src/schema/user.ts

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import userResolvers from "../resolvers/user";
import ConversationType from "./conversation";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString }, // TODO: Handle dates appropriately
    sex: { type: GraphQLString },
    // ... other fields
    likedUsers: { type: new GraphQLList(GraphQLID) },
    dislikedUsers: { type: new GraphQLList(GraphQLID) },
    conversations: { type: new GraphQLList(ConversationType) }, // Conversations associated with the user
  },
});

const UserQuery = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    getUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userResolvers.Query.getUser(parent, args);
      },
    },
    getUsers: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return userResolvers.Query.getUsers(parent, args);
      },
    },
    // More user-related queries can be added here
  },
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) }, // TODO: Handle dates appropriately
        sex: { type: new GraphQLNonNull(GraphQLString) },
        // ... other fields
      },
      resolve(parent, args) {
        return userResolvers.Mutation.addUser(parent, args);
      },
    },
    likeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        likedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Handle liking a user (call the appropriate resolver function)
        return userResolvers.Mutation.likeUser(parent, args);
      },
    },
    dislikeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        dislikedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Handle disliking a user (call the appropriate resolver function)
        return userResolvers.Mutation.dislikeUser(parent, args);
      },
    },
    // More user-related mutations can be added here
  },
});

export { UserType, UserQuery, UserMutation };
