import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import UserType from "../types/User";
import userResolvers from "../resolvers/user";
import User from "../models/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    getUsers: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const { limit = 10, offset = 0 } = args;
        return User.find().skip(offset).limit(limit);
      },
    },
    // TODO: more queries
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) }, // handle dates
        sex: { type: new GraphQLNonNull(GraphQLString) },
        // TODO: other fields
      },
      resolve(parent, args) {
        const user = new User(args);
        return user.save();
      },
    },
    likeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        likedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { userId, likedUserId } = args;
        const user = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { likedUsers: likedUserId } },
          { new: true }
        );
        return user;
      },
    },
    dislikeUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        dislikedUserId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { userId, dislikedUserId } = args;
        const user = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { dislikedUsers: dislikedUserId } },
          { new: true }
        );
        return user;
      },
    },
    // TODO: more mutations
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
