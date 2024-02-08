import User, { IUser } from "../models/User";

export async function createMatch(
  user1: IUser,
  user2: IUser
): Promise<IUser[]> {
  const roomId = generateUniqueRoomId();

  user1.matches.push({ matchId: user2._id, roomId });
  user2.matches.push({ matchId: user1._id, roomId });

  await Promise.all([user1.save(), user2.save()]);

  return [user1, user2];
}

export async function filterMatches(user: IUser): Promise<IUser[]> {
  const matches = await User.find({
    _id: { $in: user.matches.map((match) => match.matchId) },
    "preferences.location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: user.preferences.location.coordinates,
        },
        $maxDistance: user.preferences.location.maxDistance * 1000, // Convert to meters
      },
    },
  });

  return matches;
}

function generateUniqueRoomId() {
  // Implement logic to generate a unique room ID
}
