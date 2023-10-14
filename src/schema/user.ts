import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import UserType from "./types";
import userResolvers from "../resolvers/user";

const UserQuery = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    getUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userResolvers.getUser(args.id);
      },
    },
    getUsers: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return userResolvers.getUsers(args.limit, args.offset);
      },
    },
    // TODO more queries
  },
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) }, // TODO: might need to handle dates differently
        sex: { type: new GraphQLNonNull(GraphQLString) },
        // ... other fields
      },
      resolve(parent, args) {
        return userResolvers.addUser(args);
      },
    },
    likeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        likedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return userResolvers.likeUser(args.userId, args.likedUserId);
      },
    },
    dislikeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        dislikedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return userResolvers.dislikeUser(args.userId, args.dislikedUserId);
      },
    },
    // Add more mutations as needed
  },
});

export { UserQuery, UserMutation };
