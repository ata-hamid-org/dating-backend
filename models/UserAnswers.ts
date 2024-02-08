import mongoose, { Document, Schema } from "mongoose";

export interface IUserAnswer extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  questionId: mongoose.Schema.Types.ObjectId;
  answer: string; // Consider changing to string[] if multiple answers are allowed
}

const userAnswersSchema = new Schema<IUserAnswer>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User", // Adding reference to User model
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Question ID is required"],
      ref: "Question", // Adding reference to Question model
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      // Add validation logic here if necessary
    },
  },
  { timestamps: true, index: { userId: 1, questionId: 1 } }
); // Adding timestamps and indexing

export default mongoose.model<IUserAnswer>("UserAnswer", userAnswersSchema);
