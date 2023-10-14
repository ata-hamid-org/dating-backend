import geolib from "geolib";
import User from "../models/User";
import { UserDocument } from "../models/User";
import type { DatingPreferences } from "../models/User";

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
      args: { userId: string; limit: number; offset: number }
    ) => {
      try {
        const viewer = await User.findById(args.userId);
        if (!viewer) {
          throw new Error("Viewer not found");
        }

        const {
          ageRange,
          distance,
          sex,
          relationshipGoal,
          relationshipType,
          children,
          sexualOrientation,
        } = viewer.datingPreferences;

        const users: UserDocument[] = await User.find({
          _id: { $ne: viewer._id }, // Exclude the viewer user
          sex,
          "datingPreferences.relationshipGoal": relationshipGoal,
          "datingPreferences.relationshipType": relationshipType,
          "datingPreferences.children": children,
          "datingPreferences.sexualOrientation": sexualOrientation,
        })
          .where("dateOfBirth")
          .gte(new Date(new Date().getFullYear() - ageRange.max, 0, 1)) // Max age
          .lte(new Date(new Date().getFullYear() - ageRange.min, 11, 31)) // Min age
          .limit(args.limit)
          .skip(args.offset);

        const filteredUsers = users.filter((user) => {
          const distanceInKm = geolib.getDistance(
            {
              latitude: viewer.profile.location.coordinates[1],
              longitude: viewer.profile.location.coordinates[0],
            },
            {
              latitude: user.profile.location.coordinates[1],
              longitude: user.profile.location.coordinates[0],
            }
          );

          return distanceInKm <= distance * 1000; // Convert distance from kilometers to meters
        });

        return filteredUsers;
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
