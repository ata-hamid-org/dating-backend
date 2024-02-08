// tests/user.test.ts
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
    // Test code for creating and saving a user (unchanged)
  });

  it("should fail to save a user with an invalid email format", async () => {
    // Test code for invalid email format (unchanged)
  });

  it("should create a match and add it to both users", async () => {
    const user1Data: IUser = {
      email: "user1@example.com",
      password: "password123",
    };

    const user2Data: IUser = {
      email: "user2@example.com",
      password: "password456",
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
