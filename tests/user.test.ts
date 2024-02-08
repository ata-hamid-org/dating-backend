import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import { createMatch } from "../services/matchService";

describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create and save a user successfully", async () => {
    const userData: IUser = {
      email: "user@example.com",
      password: "password123",
      preferences: {
        location: {
          coordinates: [0, 0],
          maxDistance: 10,
        },
      },
      matches: [],
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    // Add additional assertions for preferences and other fields if needed
  });

  it("should fail to save a user with an invalid email format", async () => {
    const userData: Partial<IUser> = {
      email: "invalid-email", // Invalid email format
      password: "password123",
    };

    const user = new User(userData);

    await expect(user.save()).rejects.toThrow();
  });

  it("should create a match and add it to both users", async () => {
    const user1Data: IUser = {
      email: "user1@example.com",
      password: "password123",
      preferences: {
        location: {
          coordinates: [0, 0],
          maxDistance: 10,
        },
      },
      matches: [],
    };

    const user2Data: IUser = {
      email: "user2@example.com",
      password: "password456",
      preferences: {
        location: {
          coordinates: [0, 0],
          maxDistance: 10,
        },
      },
      matches: [],
    };

    const user1 = new User(user1Data);
    const user2 = new User(user2Data);

    await Promise.all([user1.save(), user2.save()]);

    const [updatedUser1, updatedUser2] = await createMatch(user1, user2);

    expect(updatedUser1.matches).toHaveLength(1);
    expect(updatedUser2.matches).toHaveLength(1);
    expect(updatedUser1.matches[0].matchId).toEqual(updatedUser2._id);
  });

  // Add more tests for other validation rules and scenarios
});
