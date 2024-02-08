import mongoose from "mongoose";
import UserAnswer, { IUserAnswer } from "../models/UserAnswers";

describe("UserAnswer Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create and save a user answer successfully", async () => {
    const userAnswerData: IUserAnswer = {
      userId: mongoose.Types.ObjectId(), // Create a new ObjectId instance
      questionId: mongoose.Types.ObjectId(), // Create a new ObjectId instance
      answer: "Sample answer",
    };

    const userAnswer = new UserAnswer(userAnswerData);
    const savedUserAnswer = await userAnswer.save();

    expect(savedUserAnswer._id).toBeDefined();
    expect(savedUserAnswer.userId).toEqual(userAnswerData.userId);
    expect(savedUserAnswer.questionId).toEqual(userAnswerData.questionId);
    expect(savedUserAnswer.answer).toEqual(userAnswerData.answer);
  });

  it("should fail to save a user answer without a user ID", async () => {
    const userAnswerData: Partial<IUserAnswer> = {
      // Omitting userId intentionally
      questionId: mongoose.Types.ObjectId(), // Create a new ObjectId instance
      answer: "Sample answer",
    };

    const userAnswer = new UserAnswer(userAnswerData);

    await expect(userAnswer.save()).rejects.toThrow();
  });

  // Add more tests for other validation rules and scenarios
});
