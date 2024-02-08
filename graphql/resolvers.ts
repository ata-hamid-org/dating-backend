import { createMatch, filterMatches } from "../services/matchService";

const resolvers = {
  Query: {
    findMatches: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      return await filterMatches(user);
    },
    // ... other query resolvers
  },
  Mutation: {
    matchUsers: async (_, { userId1, userId2 }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      // Ensure that the logged-in user is one of the matched users
      if (user._id.toString() !== userId1 && user._id.toString() !== userId2) {
        throw new Error("Unauthorized");
      }

      const [user1, user2] = await createMatch(userId1, userId2);

      // Return the updated user profiles or any necessary data
      return [user1, user2];
    },
    // ... other mutation resolvers
  },
};

export default resolvers;
