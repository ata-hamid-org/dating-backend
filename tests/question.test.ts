import mongoose from "mongoose";
import Question, { IQuestion } from "../models/Question";

describe("Question Model", () => {
  // Before and after hooks for database connection
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create and save a question successfully", async () => {
    const questionData: IQuestion = {
      text: "What is your favorite color?",
    };

    const question = new Question(questionData);
    const savedQuestion = await question.save();

    expect(savedQuestion._id).toBeDefined();
    expect(savedQuestion.text).toBe(questionData.text);
  });

  it("should fail to save a question without text", async () => {
    const questionData: Partial<IQuestion> = {};

    const question = new Question(questionData);

    await expect(question.save()).rejects.toThrow();
  });

  // Add more tests for other validation rules and scenarios
});
