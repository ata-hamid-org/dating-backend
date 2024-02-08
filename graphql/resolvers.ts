import { createMatch, filterMatches } from "../services/matchService";
import User, { IUser } from "../models/User";
import { AuthenticationError, UserInputError } from "apollo-server-express";

const resolvers = {
  Query: {
    findMatches: async (_, __, { user }): Promise<IUser[]> => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }
      // Assuming 'filterMatches' is properly typed to return Promise<IUser[]>
      return await filterMatches(user);
    },
  },
  Mutation: {
    matchUsers: async (_, { userId1, userId2 }, { user }): Promise<IUser[]> => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }
      if (!userId1 || !userId2) {
        throw new UserInputError("Both userId1 and userId2 are required");
      }
      if (user._id.toString() !== userId1 && user._id.toString() !== userId2) {
        throw new AuthenticationError("Unauthorized action");
      }
      const users = await Promise.all([
        User.findById(userId1).exec(),
        User.findById(userId2).exec(),
      ]);
      
      const [user1Doc, user2Doc] = users as [IUser, IUser];

      if (!user1Doc || !user2Doc) {
        throw new Error("One or both users not found");
      }

      const matchedUsers = await createMatch(user1Doc, user2Doc);
      if (!matchedUsers) {
        throw new Error("Failed to create a match");
      }

      return matchedUsers;
    },
  },
};

export default resolvers;
