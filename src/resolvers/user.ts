import User from "../models/User";
import { UserDocument } from "../models/User";

const userResolvers = {
  Query: {
    getUser: async (
      parent,
      args: { id: string }
    ): Promise<UserDocument | null> => {
      try {
        return await User.findById(args.id);
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
    getUsers: async (
      parent,
      args: { limit: number; offset: number }
    ): Promise<UserDocument[]> => {
      try {
        const { limit = 10, offset = 0 } = args;
        return await User.find().skip(offset).limit(limit);
      } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    },
    // TODO more query resolvers
  },
  Mutation: {
    addUser: async (
      parent,
      args: { name: string; dateOfBirth: string; sex: string }
    ): Promise<UserDocument> => {
      try {
        const user = new User(args);
        return await user.save();
      } catch (error) {
        throw new Error(`Error adding user: ${error.message}`);
      }
    },
    likeUser: async (
      parent,
      args: { userId: string; likedUserId: string }
    ): Promise<UserDocument> => {
      try {
        return await User.findByIdAndUpdate(
          args.userId,
          { $addToSet: { likedUsers: args.likedUserId } },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Error liking user: ${error.message}`);
      }
    },
    dislikeUser: async (
      parent,
      args: { userId: string; dislikedUserId: string }
    ): Promise<UserDocument> => {
      try {
        return await User.findByIdAndUpdate(
          args.userId,
          { $addToSet: { dislikedUsers: args.dislikedUserId } },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Error disliking user: ${error.message}`);
      }
    },
    // TODO more mutation resolvers
  },
};

export default userResolvers;
